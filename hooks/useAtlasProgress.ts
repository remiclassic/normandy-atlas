'use client';

import { useSyncExternalStore, useMemo } from 'react';
import {
  readProgress,
  countDistinctPlaces,
  countDistinctRegions,
  countDistinctJourneys,
  countDistinctSegments,
  countErasVisited,
  type ProgressV2,
  type StreakState,
  type ChallengesState,
} from '@/lib/progress';
import { atlasMilestones, type MilestoneTier } from '@/data/atlas/milestones';
import {
  LEDGER_COVERAGE_TOTALS,
  type LedgerCoverageTotals,
} from '@/lib/atlas-ledger-totals';
import type { UiStringKey } from '@/lib/ui-strings';

// ---------------------------------------------------------------------------
// Lightweight subscription to the progress blob — avoids coupling the map
// render to every progress event.
//
// We use a simple version counter + useSyncExternalStore so only components
// that actually read progress re-render.
// ---------------------------------------------------------------------------

let version = 0;
const subs = new Set<() => void>();

function subscribe(cb: () => void): () => void {
  subs.add(cb);
  return () => { subs.delete(cb); };
}

/** Bump the version from anywhere that mutates progress (emit, import, reset). */
export function notifyProgressListeners(): void {
  version++;
  for (const cb of subs) cb();
}

function getSnapshot(): number {
  return version;
}

function getServerSnapshot(): number {
  return 0;
}

/** Read the full progress blob, re-reading on every version bump. */
export function useProgress(): ProgressV2 {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return readProgress();
}

/** Derived stats for the ledger panel. */
export interface LedgerStats {
  places: number;
  regions: number;
  journeys: number;
  segments: number;
  eras: number;
  storiesCompleted: number;
  milestonesUnlocked: number;
  totalDwellMs: number;
  coverageTotals: LedgerCoverageTotals;
}

export function useLedgerStats(): LedgerStats {
  const progress = useProgress();
  return useMemo(() => {
    const { aggregates, milestones, story } = progress;
    return {
      places: countDistinctPlaces(aggregates),
      regions: countDistinctRegions(aggregates),
      journeys: countDistinctJourneys(aggregates),
      segments: countDistinctSegments(aggregates),
      eras: countErasVisited(aggregates),
      storiesCompleted: Object.values(story).filter((r) => r.completed).length,
      milestonesUnlocked: Object.keys(milestones).length,
      totalDwellMs: aggregates.totalSessionMs,
      coverageTotals: LEDGER_COVERAGE_TOTALS,
    };
  }, [progress]);
}

// --- Role inference --------------------------------------------------------

export type AtlasRole = 'explorer' | 'historian' | 'cartographer' | 'chronicler';

export function useInferredRole(): AtlasRole {
  const stats = useLedgerStats();
  return useMemo(() => {
    const exploration = stats.places + stats.regions;
    const routes = stats.journeys + stats.segments;
    const reading = stats.totalDwellMs / 60_000;
    const stories = stats.storiesCompleted;

    if (stories >= 3 && stories >= exploration) return 'chronicler';
    if (routes > exploration && routes > reading) return 'cartographer';
    if (reading > 5 && reading >= exploration) return 'historian';
    return 'explorer';
  }, [stats]);
}

// --- Atlas Rank (cosmetic, derived from milestone score) -------------------

export type AtlasRank =
  | 'novice'
  | 'apprentice'
  | 'journeyman'
  | 'adept'
  | 'scholar'
  | 'master'
  | 'grandMaster';

const TIER_WEIGHT: Record<MilestoneTier, number> = { 1: 1, 2: 3, 3: 6 };

const RANK_THRESHOLDS: [number, AtlasRank][] = [
  [60, 'grandMaster'],
  [40, 'master'],
  [25, 'scholar'],
  [15, 'adept'],
  [8, 'journeyman'],
  [3, 'apprentice'],
  [0, 'novice'],
];

export const RANK_STRING_KEY: Record<AtlasRank, UiStringKey> = {
  novice: 'rank.novice',
  apprentice: 'rank.apprentice',
  journeyman: 'rank.journeyman',
  adept: 'rank.adept',
  scholar: 'rank.scholar',
  master: 'rank.master',
  grandMaster: 'rank.grandMaster',
};

function computeRankScore(unlockedIds: Record<string, unknown>): number {
  let score = 0;
  for (const def of atlasMilestones) {
    if (def.id in unlockedIds) score += TIER_WEIGHT[def.tier];
  }
  return score;
}

function rankFromScore(score: number): AtlasRank {
  for (const [threshold, rank] of RANK_THRESHOLDS) {
    if (score >= threshold) return rank;
  }
  return 'novice';
}

export function useAtlasRank(): { rank: AtlasRank; score: number } {
  const progress = useProgress();
  return useMemo(() => {
    const score = computeRankScore(progress.milestones);
    return { rank: rankFromScore(score), score };
  }, [progress]);
}

// --- Gamification stats (memoised leaf-friendly hook) ----------------------

export interface GamificationStats {
  streak: StreakState;
  rank: AtlasRank;
  rankScore: number;
  challenges: ChallengesState;
  coveragePct: {
    places: number;
    regions: number;
    journeys: number;
    segments: number;
    eras: number;
    stories: number;
    overall: number;
  };
}

function pct(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

export function useGamificationStats(): GamificationStats {
  const progress = useProgress();
  const stats = useLedgerStats();
  return useMemo(() => {
    const T = stats.coverageTotals;
    const score = computeRankScore(progress.milestones);
    const rank = rankFromScore(score);

    const emptyStreak: StreakState = { lastActiveLocalDate: '', currentStreak: 0, longestStreak: 0 };
    const emptyChallenges: ChallengesState = { active: null, history: [] };

    const placesPct = pct(stats.places, T.places);
    const regionsPct = pct(stats.regions, T.regions);
    const journeysPct = pct(stats.journeys, T.journeys);
    const segmentsPct = pct(stats.segments, T.segments);
    const erasPct = pct(stats.eras, T.eras);
    const storiesPct = pct(stats.storiesCompleted, T.stories);
    const total = stats.places + stats.regions + stats.journeys + stats.segments + stats.eras + stats.storiesCompleted;
    const totalPossible = T.places + T.regions + T.journeys + T.segments + T.eras + T.stories;
    const overallPct = pct(total, totalPossible);

    return {
      streak: progress.gamification?.streaks ?? emptyStreak,
      rank,
      rankScore: score,
      challenges: progress.gamification?.challenges ?? emptyChallenges,
      coveragePct: {
        places: placesPct,
        regions: regionsPct,
        journeys: journeysPct,
        segments: segmentsPct,
        eras: erasPct,
        stories: storiesPct,
        overall: overallPct,
      },
    };
  }, [progress, stats]);
}
