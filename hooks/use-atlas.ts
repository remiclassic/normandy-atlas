'use client';

import { useMemo } from 'react';
import { useMapStore } from '@/lib/store';
import {
  getVisiblePlaces,
  buildPlacesGeoJson,
  getActiveSegments,
  getActiveJourneys,
  getSegmentsForJourney,
  getVisibleRegions,
  getAtlasRegionsGeoJsonForEra,
  getStoryBeats,
  getBeat,
  getBeatCount,
  getAtlasEras,
} from '@/core';
import type {
  PlaceWithState,
  ResolvedSegment,
  ResolvedJourney,
  RegionWithState,
  StoryBeat,
  AtlasEra,
} from '@/core/types';
import type { RegionFeatureCollection } from '@/types';

export function useAtlasMode(): boolean {
  return useMapStore((s) => s.atlasMode);
}

export function useAtlasEras(): AtlasEra[] {
  return useMemo(() => getAtlasEras(), []);
}

export function useVisiblePlaces(): PlaceWithState[] {
  const eraId = useMapStore((s) => s.eraId);
  const atlasMode = useMapStore((s) => s.atlasMode);
  return useMemo(
    () => (atlasMode ? getVisiblePlaces(eraId) : []),
    [eraId, atlasMode],
  );
}

export function useAtlasPlacesGeoJson(): GeoJSON.FeatureCollection {
  const places = useVisiblePlaces();
  return useMemo(() => buildPlacesGeoJson(places), [places]);
}

export function useActiveSegments(): ResolvedSegment[] {
  const eraId = useMapStore((s) => s.eraId);
  const atlasMode = useMapStore((s) => s.atlasMode);
  return useMemo(
    () => (atlasMode ? getActiveSegments(eraId) : []),
    [eraId, atlasMode],
  );
}

export function useActiveJourneys(): ResolvedJourney[] {
  const eraId = useMapStore((s) => s.eraId);
  const atlasMode = useMapStore((s) => s.atlasMode);
  return useMemo(
    () => (atlasMode ? getActiveJourneys(eraId) : []),
    [eraId, atlasMode],
  );
}

export function useActiveJourneySegments(): ResolvedSegment[] {
  const journeyId = useMapStore((s) => s.activeJourneyId);
  return useMemo(
    () => (journeyId ? getSegmentsForJourney(journeyId) : []),
    [journeyId],
  );
}

export function useVisibleRegions(): RegionWithState[] {
  const eraId = useMapStore((s) => s.eraId);
  const atlasMode = useMapStore((s) => s.atlasMode);
  return useMemo(
    () => (atlasMode ? getVisibleRegions(eraId) : []),
    [eraId, atlasMode],
  );
}

export function useAtlasRegionsGeoJson(): RegionFeatureCollection {
  const eraId = useMapStore((s) => s.eraId);
  const atlasMode = useMapStore((s) => s.atlasMode);
  return useMemo(
    () =>
      atlasMode
        ? getAtlasRegionsGeoJsonForEra(eraId)
        : { type: 'FeatureCollection' as const, features: [] },
    [eraId, atlasMode],
  );
}

export function useCurrentStoryBeat(): StoryBeat | undefined {
  const stepIndex = useMapStore((s) => s.storyStepIndex);
  const storyMode = useMapStore((s) => s.storyMode);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const storyArc = useMapStore((s) => s.storyArc);
  return useMemo(
    () => (storyMode && atlasMode ? getBeat(stepIndex, storyArc) : undefined),
    [stepIndex, storyMode, atlasMode, storyArc],
  );
}

export function useAtlasBeatCount(): number {
  const storyArc = useMapStore((s) => s.storyArc);
  return useMemo(() => getBeatCount(storyArc), [storyArc]);
}

export function useAtlasStoryBeats(): StoryBeat[] {
  const storyArc = useMapStore((s) => s.storyArc);
  return useMemo(() => getStoryBeats(storyArc), [storyArc]);
}
