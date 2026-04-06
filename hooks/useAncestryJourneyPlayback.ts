'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useMapStore } from '@/lib/store';
import { getPlaceCoords } from '@/core/places/engine';
import type { AncestryJourneyPlan, AncestryJourneyStep } from '@/core/ancestry/types';
import { ANCESTRY_JOURNEY_MAX_STEPS } from '@/lib/ancestry-feature-flags';

function applyJourneyStep(step: AncestryJourneyStep, previousStep: AncestryJourneyStep | undefined) {
  if (previousStep?.kind === 'storyBeat') {
    useMapStore.getState().stopStory();
  }

  const st = useMapStore.getState();

  switch (step.kind) {
    case 'narrativeCard':
      break;
    case 'mapEra': {
      st.setEra(step.eraId);
      if (step.atlasSimYear != null) st.setAtlasSimYear(step.atlasSimYear);
      if (step.layerPatch) {
        for (const [layerId, vis] of Object.entries(step.layerPatch)) {
          st.setLayerVisibility(layerId, vis);
        }
      }
      break;
    }
    case 'mapFly': {
      let center: [number, number] | undefined;
      if (step.placeId) center = getPlaceCoords(step.placeId) ?? undefined;
      if (!center && step.center) center = step.center;
      if (center) {
        st.setPendingFlyTarget({
          center,
          zoom: step.zoom,
          bearing: 0,
          pitch: 0,
          ...(step.durationMs != null ? { duration: step.durationMs } : {}),
        });
      }
      break;
    }
    case 'lineageOverlay': {
      st.setLayerVisibility('lineage-explorer', true);
      st.setLineageExplorerContext({ profileId: step.profileId, eraLens: step.eraLens });
      if (step.enableMacro) {
        st.setLayerVisibility('historical-presence', true);
        if (step.macroYear != null) st.setHistoricalPresenceYear(step.macroYear);
      }
      break;
    }
    case 'storyBeat': {
      st.startStory(step.arcId, { stepIndex: step.stepIndex });
      break;
    }
    default:
      break;
  }
}

/**
 * Applies the current step from {@link useAncestryStore}'s active journey when `stepIndex` changes.
 * Keep mounted on the map shell (or any route that should react to journey playback).
 */
export function useAncestryJourneyPlayback(
  plan: AncestryJourneyPlan | null,
  stepIndex: number,
  enabled: boolean,
) {
  const lastAppliedRef = useRef<{ key: string; stepKind: AncestryJourneyStep['kind'] | null }>({
    key: '',
    stepKind: null,
  });

  const maxSteps = ANCESTRY_JOURNEY_MAX_STEPS;
  const capped = useMemo(
    () =>
      plan && plan.steps.length > maxSteps ? { ...plan, steps: plan.steps.slice(0, maxSteps) } : plan,
    [plan, maxSteps],
  );

  const apply = useCallback(() => {
    if (!enabled || !capped || capped.steps.length === 0) return;
    const idx = Math.max(0, Math.min(stepIndex, capped.steps.length - 1));
    const step = capped.steps[idx];
    const key = `${capped.id}:${idx}:${step.id}`;
    if (lastAppliedRef.current.key === key) return;
    const prevIdx = idx - 1;
    const previousStep = prevIdx >= 0 ? capped.steps[prevIdx] : undefined;
    applyJourneyStep(step, previousStep);
    lastAppliedRef.current = { key, stepKind: step.kind };
  }, [enabled, capped, stepIndex]);

  useEffect(() => {
    apply();
  }, [apply]);

  useEffect(() => {
    if (!enabled) {
      const prev = lastAppliedRef.current.stepKind;
      if (prev === 'storyBeat') useMapStore.getState().stopStory();
      lastAppliedRef.current = { key: '', stepKind: null };
    }
  }, [enabled]);
}
