import type { StoryProgressRecord } from '@/lib/story-progress';
import type { ProgressV2, EntityEngagement, Gamification } from './schema';
import {
  SCHEMA_VERSION,
  MAX_EVENT_TAIL,
  createEmptyProgress,
  createEmptyGamification,
} from './schema';

function mergeStoryRecord(
  a: StoryProgressRecord | undefined,
  b: StoryProgressRecord | undefined,
): StoryProgressRecord | undefined {
  if (!a) return b;
  if (!b) return a;
  const completed = Boolean(a.completed || b.completed);
  const lastPlayedAt = Math.max(a.lastPlayedAt, b.lastPlayedAt);
  const lastStep = Math.max(a.lastStep, b.lastStep);
  return { completed, lastPlayedAt, lastStep };
}

function mergeEntityMaps(
  a: Record<string, EntityEngagement>,
  b: Record<string, EntityEngagement>,
): Record<string, EntityEngagement> {
  const result = { ...a };
  for (const [id, eng] of Object.entries(b)) {
    const prev = result[id];
    if (!prev) {
      result[id] = eng;
    } else {
      result[id] = {
        opens: Math.max(prev.opens, eng.opens),
        dwellMs: Math.max(prev.dwellMs, eng.dwellMs),
        firstSeen: Math.min(prev.firstSeen, eng.firstSeen),
      };
    }
  }
  return result;
}

function mergeGamification(
  a: Gamification | undefined,
  b: Gamification | undefined,
): Gamification {
  const base = createEmptyGamification();
  if (!a && !b) return base;
  const la = a ?? base;
  const lb = b ?? base;

  const longestStreak = Math.max(la.streaks.longestStreak, lb.streaks.longestStreak);
  const streaks = la.streaks.lastActiveLocalDate >= lb.streaks.lastActiveLocalDate
    ? { ...la.streaks, longestStreak }
    : { ...lb.streaks, longestStreak };

  const challenges = la.challenges.active && lb.challenges.active
    ? (la.challenges.active.startedAtLocalDate >= lb.challenges.active.startedAtLocalDate ? la.challenges : lb.challenges)
    : la.challenges.active ? la.challenges : lb.challenges;

  const historyIds = new Set<string>();
  const history = [...(la.challenges.history ?? []), ...(lb.challenges.history ?? [])]
    .sort((x, y) => y.completedAt - x.completedAt)
    .filter((h) => { if (historyIds.has(h.id)) return false; historyIds.add(h.id); return true; })
    .slice(0, 24);

  return { streaks, challenges: { ...challenges, history } };
}

/** Migrate a v2 blob to v3 in-place, adding missing fields with defaults. */
export function migrateV2toV3(blob: Record<string, unknown>): ProgressV2 {
  const p = blob as unknown as ProgressV2;
  (p as { schemaVersion: number }).schemaVersion = SCHEMA_VERSION;
  if (!p.aggregates.journalSections) p.aggregates.journalSections = {};
  if (!p.gamification) p.gamification = createEmptyGamification();
  return p;
}

/**
 * Merges remote progress into local: per-arc story state uses max step / completion union;
 * milestones keep the later `unlockedAt`; aggregates prefer higher numeric coverage;
 * events are concatenated and tail-trimmed.
 */
export function mergeProgressV2(local: ProgressV2, remote: ProgressV2): ProgressV2 {
  const rVersion = (remote as { schemaVersion: number }).schemaVersion;
  if (rVersion !== SCHEMA_VERSION && rVersion !== 2) return local;

  const r = rVersion === 2 ? migrateV2toV3(remote as unknown as Record<string, unknown>) : remote;

  const story: Record<string, StoryProgressRecord> = { ...local.story };
  for (const [k, rec] of Object.entries(r.story)) {
    story[k] = mergeStoryRecord(story[k], rec) ?? rec;
  }

  const milestones = { ...local.milestones };
  for (const [id, rec] of Object.entries(r.milestones)) {
    const prev = milestones[id];
    if (!prev || rec.unlockedAt > prev.unlockedAt) milestones[id] = rec;
  }

  const eraCoverage = { ...local.aggregates.eraCoverage };
  for (const [k, v] of Object.entries(r.aggregates.eraCoverage)) {
    eraCoverage[k] = Math.max(eraCoverage[k] ?? 0, v);
  }

  const shareMoments = {
    firstExplorationShown: Boolean(
      local.shareMoments?.firstExplorationShown ||
      r.shareMoments?.firstExplorationShown,
    ),
  };

  const merged: ProgressV2 = {
    schemaVersion: SCHEMA_VERSION,
    story,
    milestones,
    aggregates: {
      places: mergeEntityMaps(local.aggregates.places, r.aggregates.places),
      regions: mergeEntityMaps(local.aggregates.regions, r.aggregates.regions),
      segments: mergeEntityMaps(local.aggregates.segments, r.aggregates.segments),
      journeys: mergeEntityMaps(local.aggregates.journeys, r.aggregates.journeys),
      journalSections: mergeEntityMaps(
        local.aggregates.journalSections ?? {},
        r.aggregates.journalSections ?? {},
      ),
      eraCoverage,
      totalSessionMs: Math.max(
        local.aggregates.totalSessionMs,
        r.aggregates.totalSessionMs,
      ),
    },
    events: [...local.events, ...r.events]
      .sort((x, y) => x.at - y.at)
      .slice(-MAX_EVENT_TAIL),
    lastPersistedAt: new Date().toISOString(),
    shareMoments,
    gamification: mergeGamification(local.gamification, r.gamification),
  };

  return merged;
}

export function parseProgressV2Json(json: string): ProgressV2 | null {
  try {
    const obj = JSON.parse(json);
    const v = obj?.schemaVersion;
    if (v === SCHEMA_VERSION) return obj as ProgressV2;
    if (v === 2) return migrateV2toV3(obj);
    return null;
  } catch {
    return null;
  }
}

export function safeProgressOrEmpty(raw: unknown): ProgressV2 {
  if (raw && typeof raw === 'object') {
    const v = (raw as { schemaVersion?: number }).schemaVersion;
    if (v === SCHEMA_VERSION) return raw as ProgressV2;
    if (v === 2) return migrateV2toV3(raw as Record<string, unknown>);
  }
  return createEmptyProgress();
}
