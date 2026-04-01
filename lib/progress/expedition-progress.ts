import type { ProgressV2 } from './schema';
import { atlasExpeditions, type ExpeditionDef } from '@/data/atlas/expeditions';
import type { I18nString } from '@/core/types';

// ---------------------------------------------------------------------------
// Derive the first incomplete expedition (or null) from current progress.
// ---------------------------------------------------------------------------

export interface ActiveExpedition {
  id: string;
  title: I18nString;
  completed: number;
  total: number;
}

function countCompletedSteps(progress: ProgressV2, exp: ExpeditionDef): number {
  const { aggregates, story } = progress;
  let done = 0;
  for (const step of exp.steps) {
    switch (step.entityKind) {
      case 'place':
        if (step.entityId in aggregates.places) done++;
        break;
      case 'journey':
        if (step.entityId in aggregates.journeys) done++;
        break;
      case 'region':
        if (step.entityId in aggregates.regions) done++;
        break;
      case 'story':
        if (story[step.entityId]?.completed) done++;
        break;
      case 'viking-adna-site':
      case 'viking-archaeology-site':
        if (step.entityId in aggregates.places) done++;
        break;
    }
  }
  return done;
}

export function getActiveExpedition(progress: ProgressV2): ActiveExpedition | null {
  for (const exp of atlasExpeditions) {
    const done = countCompletedSteps(progress, exp);
    if (done > 0 && done < exp.steps.length) {
      return { id: exp.id, title: exp.title, completed: done, total: exp.steps.length };
    }
  }
  return null;
}
