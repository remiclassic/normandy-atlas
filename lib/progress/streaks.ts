import type { AtlasEventType, ProgressV2, StreakState } from './schema';
import { createEmptyGamification, createEmptyStreaks } from './schema';

// ---------------------------------------------------------------------------
// Streak engine — local-calendar day tracking.
// Qualifying events bump the streak when the local date advances.
// ---------------------------------------------------------------------------

const QUALIFYING_EVENTS = new Set<AtlasEventType>([
  'place_open',
  'region_open',
  'journey_open',
  'segment_open',
  'story_step',
  'journal_section_view',
]);

function todayLocalDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

/**
 * Mutates `progress.gamification.streaks` based on an incoming event type.
 * Call once per `emitProgressEvent` — the function is idempotent within
 * the same local calendar day.
 */
export function updateStreak(progress: ProgressV2, eventType: AtlasEventType): void {
  if (!QUALIFYING_EVENTS.has(eventType)) return;

  if (!progress.gamification) progress.gamification = createEmptyGamification();
  const streaks: StreakState = progress.gamification.streaks ?? createEmptyStreaks();
  progress.gamification.streaks = streaks;

  const today = todayLocalDate();

  if (streaks.lastActiveLocalDate === today) return;

  const gap = streaks.lastActiveLocalDate
    ? daysBetween(streaks.lastActiveLocalDate, today)
    : 0;

  if (gap === 1) {
    streaks.currentStreak += 1;
  } else if (gap > 1 || !streaks.lastActiveLocalDate) {
    streaks.currentStreak = 1;
  }

  streaks.lastActiveLocalDate = today;
  if (streaks.currentStreak > streaks.longestStreak) {
    streaks.longestStreak = streaks.currentStreak;
  }
}
