'use client';

import { useMemo, useEffect, useLayoutEffect } from 'react';
import { useMapStore, VIKING_MOVEMENT_ERA_IDS } from '@/lib/store';
import { isColonialEra, colonialYearFromEra } from '@/data/atlas/new-france-timeline';
import { readStoredLocale, pickI18n as _pickI18n } from '@/lib/locale';
import { readStoredUiTheme, applyUiThemeToDocument } from '@/lib/ui-theme';
import { readStoredTextSize, applyTextSizeToDocument } from '@/lib/text-size';
import type { AtlasLocale, I18nString } from '@/core/types';
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

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Hydrate locale from localStorage once on the client — call in a top-level shell. */
export function useHydrateLocale(): void {
  const setLocale = useMapStore((s) => s.setLocale);
  useIsoLayoutEffect(() => {
    const stored = readStoredLocale();
    if (stored !== useMapStore.getState().locale) {
      setLocale(stored);
    }
  }, [setLocale]);
}

/** Sync UI theme from localStorage with Zustand (blocking script already set `data-ui-theme`). */
export function useHydrateUiTheme(): void {
  useIsoLayoutEffect(() => {
    const stored = readStoredUiTheme();
    applyUiThemeToDocument(stored);
    useMapStore.setState({ uiTheme: stored });
  }, []);
}

/** Sync text-size preference from localStorage with Zustand (blocking script already set classList). */
export function useHydrateTextSize(): void {
  useIsoLayoutEffect(() => {
    const stored = readStoredTextSize();
    applyTextSizeToDocument(stored);
    useMapStore.setState({ textSize: stored });
  }, []);
}

export function useLocale(): AtlasLocale {
  return useMapStore((s) => s.locale);
}

/** Resolve an I18nString to the active locale. */
export function useI18n(str: I18nString): string {
  const locale = useMapStore((s) => s.locale);
  return _pickI18n(str, locale);
}

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
  const atlasSimYear = useMapStore((s) => s.atlasSimYear);
  const explorationRoutesYearStrict = useMapStore((s) => s.explorationRoutesYearStrict);
  return useMemo(() => {
    if (!atlasMode) return [];
    const simYear = isColonialEra(eraId)
      ? colonialYearFromEra(eraId, atlasSimYear)
      : VIKING_MOVEMENT_ERA_IDS.has(eraId)
        ? atlasSimYear
        : undefined;
    return getActiveSegments(eraId, simYear, {
      explorationYearStrict: explorationRoutesYearStrict,
    });
  }, [eraId, atlasMode, atlasSimYear, explorationRoutesYearStrict]);
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
