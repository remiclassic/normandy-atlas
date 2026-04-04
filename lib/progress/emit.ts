import type { AtlasEvent, AtlasEventType } from './schema';
import { readProgress, updateProgress } from './storage';
import { foldEvent, totalEngagedEntities } from './aggregates';
import { evaluateAllMilestones } from './milestones-eval';
import { notifyProgressListeners } from '@/hooks/useAtlasProgress';
import { useMapStore } from '@/lib/store';
import { enqueueMilestones, enqueueDiscovery } from './toast-queue';
import { enqueueShareMoment } from './share-moment-queue';
import { updateStreak } from './streaks';
import { ensureWeeklyChallenge, maybeCompleteChallengeAndArchive } from './challenges';

// ---------------------------------------------------------------------------
// Single entry point for the UI to record a progress event.
// Debounced persist happens inside storage.ts.
// ---------------------------------------------------------------------------

const DISCOVERY_TYPES = new Set<AtlasEventType>([
  'place_open', 'region_open', 'journey_open', 'segment_open',
]);

let evalScheduled = false;

function scheduleMilestoneEval(): void {
  if (evalScheduled) return;
  evalScheduled = true;

  const run = typeof requestIdleCallback === 'function'
    ? requestIdleCallback
    : (cb: () => void) => setTimeout(cb, 16);

  run(() => {
    evalScheduled = false;
    const progress = readProgress();

    ensureWeeklyChallenge(progress);
    maybeCompleteChallengeAndArchive(progress);

    const newlyUnlocked = evaluateAllMilestones(progress);
    if (newlyUnlocked.length > 0) {
      updateProgress(progress);
      notifyProgressListeners();
      enqueueMilestones(newlyUnlocked);
      useMapStore.getState().pulseLedgerAttention();
    }
  });
}

/**
 * Emit a progress event.
 * Returns `true` if the entity was **first-seen** (useful for toasts).
 */
export function emitProgressEvent(
  type: AtlasEventType,
  id: string,
  extra?: { eraId?: string; dwellMs?: number; step?: number },
): boolean {
  const progress = readProgress();
  const e: AtlasEvent = {
    t: type,
    id,
    eraId: extra?.eraId,
    dwellMs: extra?.dwellMs,
    step: extra?.step,
    at: Date.now(),
  };

  const kindMap: Record<string, keyof typeof progress.aggregates> = {
    place_open: 'places',
    region_open: 'regions',
    segment_open: 'segments',
    journey_open: 'journeys',
  };
  const bucket = kindMap[type];
  const isFirstSeen = bucket
    ? !(id in (progress.aggregates[bucket] as Record<string, unknown>))
    : false;

  const isFirstEverMapTouch =
    Boolean(bucket) &&
    isFirstSeen &&
    DISCOVERY_TYPES.has(type) &&
    totalEngagedEntities(progress.aggregates) === 0 &&
    !progress.shareMoments?.firstExplorationShown;

  foldEvent(progress.aggregates, e);
  progress.events.push(e);

  updateStreak(progress, type);

  if (isFirstEverMapTouch) {
    progress.shareMoments = { ...progress.shareMoments, firstExplorationShown: true };
    enqueueShareMoment({ kind: 'first-exploration', entityId: id, eventType: type });
  }

  updateProgress(progress);
  scheduleMilestoneEval();

  notifyProgressListeners();

  if (isFirstSeen && DISCOVERY_TYPES.has(type) && !isFirstEverMapTouch) {
    enqueueDiscovery(id, type);
  }

  return isFirstSeen;
}
