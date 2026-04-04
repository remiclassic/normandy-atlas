import type { ProgressV2, ChallengeActive, ChallengeHistoryEntry } from './schema';
import { createEmptyGamification } from './schema';
import { atlasChallenges, type ChallengeDef } from '@/data/atlas/challenges';

// ---------------------------------------------------------------------------
// Weekly challenge rotation + progress evaluation.
// ---------------------------------------------------------------------------

const MAX_CHALLENGE_HISTORY = 24;

function currentWeekKey(): string {
  const d = new Date();
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((d.getTime() - jan1.getTime()) / 86_400_000 + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

function todayLocalDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Deterministic challenge selection from a week key. */
function selectChallenge(weekKey: string): ChallengeDef {
  let hash = 0;
  for (let i = 0; i < weekKey.length; i++) {
    hash = ((hash << 5) - hash + weekKey.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % atlasChallenges.length;
  return atlasChallenges[idx];
}

/** True if the active challenge belongs to the current week. */
function isCurrent(active: ChallengeActive | null): boolean {
  if (!active) return false;
  const activeWeek = weekKeyFromDate(active.startedAtLocalDate);
  return activeWeek === currentWeekKey();
}

function weekKeyFromDate(isoDate: string): string {
  const d = new Date(isoDate + 'T00:00:00');
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const weekNum = Math.ceil(((d.getTime() - jan1.getTime()) / 86_400_000 + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

/**
 * Ensure the progress blob has a current-week challenge.
 * If the prior week's challenge is still active, archive it.
 * **Mutates** `progress.gamification.challenges`.
 * Returns the active ChallengeDef or null if the pool is empty.
 */
export function ensureWeeklyChallenge(progress: ProgressV2): ChallengeDef | null {
  if (atlasChallenges.length === 0) return null;
  if (!progress.gamification) progress.gamification = createEmptyGamification();
  const challenges = progress.gamification.challenges;

  if (isCurrent(challenges.active)) {
    return atlasChallenges.find((c) => c.id === challenges.active!.id) ?? null;
  }

  if (challenges.active) {
    const entry: ChallengeHistoryEntry = {
      id: challenges.active.id,
      completedAt: Date.now(),
    };
    challenges.history = [entry, ...(challenges.history ?? [])].slice(0, MAX_CHALLENGE_HISTORY);
    challenges.active = null;
  }

  const weekKey = currentWeekKey();
  const def = selectChallenge(weekKey);
  challenges.active = {
    id: def.id,
    startedAtLocalDate: todayLocalDate(),
    progress: {},
  };

  return def;
}

/**
 * Evaluate the active challenge objectives against current aggregates.
 * Returns per-objective progress counts and whether the challenge is fully completed.
 */
export function evaluateChallengeProgress(
  progress: ProgressV2,
): { objectiveProgress: Record<string, number>; completed: boolean; def: ChallengeDef | null } {
  const active = progress.gamification?.challenges.active;
  if (!active) return { objectiveProgress: {}, completed: false, def: null };

  const def = atlasChallenges.find((c) => c.id === active.id);
  if (!def) return { objectiveProgress: {}, completed: false, def: null };

  const objectiveProgress: Record<string, number> = {};
  let allMet = true;

  for (const obj of def.objectives) {
    const current = obj.measure(progress.aggregates, progress.story);
    objectiveProgress[obj.id] = current;
    if (current < obj.target) allMet = false;
  }

  return { objectiveProgress, completed: allMet, def };
}

/**
 * If the active challenge is now completed, archive it and clear active.
 * **Mutates** `progress.gamification.challenges`.
 */
export function maybeCompleteChallengeAndArchive(progress: ProgressV2): boolean {
  const { completed, def } = evaluateChallengeProgress(progress);
  if (!completed || !def) return false;

  const challenges = progress.gamification!.challenges;
  const entry: ChallengeHistoryEntry = {
    id: def.id,
    completedAt: Date.now(),
  };
  challenges.history = [entry, ...(challenges.history ?? [])].slice(0, MAX_CHALLENGE_HISTORY);
  challenges.active = null;
  return true;
}
