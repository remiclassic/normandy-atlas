import type { ProgressV2, MilestoneRecord } from './schema';
import {
  countDistinctPlaces,
  countDistinctRegions,
  countDistinctJourneys,
  countDistinctSegments,
  countErasVisited,
  hasEngagedAllInSet,
  countEngagedInSet,
} from './aggregates';
import { atlasMilestones, type MilestoneDef } from '@/data/atlas/milestones';

// ---------------------------------------------------------------------------
// Pure evaluation of milestone predicates against progress aggregates.
// ---------------------------------------------------------------------------

export interface NewlyUnlocked {
  def: MilestoneDef;
  record: MilestoneRecord;
}

/**
 * Evaluate all milestones that have not yet been unlocked.
 * **Mutates** `progress.milestones` for newly-unlocked entries.
 * Returns the list of milestones unlocked during this call.
 */
export function evaluateAllMilestones(progress: ProgressV2): NewlyUnlocked[] {
  const { aggregates, milestones, story } = progress;
  const unlocked: NewlyUnlocked[] = [];

  for (const def of atlasMilestones) {
    if (milestones[def.id]) continue;
    if (def.predicate(aggregates, story)) {
      const record: MilestoneRecord = { unlockedAt: Date.now() };
      milestones[def.id] = record;
      unlocked.push({ def, record });
    }
  }
  return unlocked;
}
