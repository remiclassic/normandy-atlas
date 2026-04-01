'use client';

import { useSyncExternalStore, useCallback, useMemo } from 'react';
import {
  readProgress,
  countDistinctPlaces,
  countDistinctRegions,
  countDistinctJourneys,
  countDistinctSegments,
  countErasVisited,
  type ProgressV2,
} from '@/lib/progress';
import {
  LEDGER_COVERAGE_TOTALS,
  type LedgerCoverageTotals,
} from '@/lib/atlas-ledger-totals';

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
