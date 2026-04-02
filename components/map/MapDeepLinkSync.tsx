'use client';

import { useEffect, useRef } from 'react';
import { useMapStore } from '@/lib/store';
import { isValidAtlasEra } from '@/core/era/engine';
import { getBeatCount } from '@/core/story/engine';

/**
 * Reads URL query parameters once on mount, applies them to the map store,
 * then strips them from the address bar to avoid re-firing on SPA navigation.
 */
export default function MapDeepLinkSync() {
  const applied = useRef(false);

  useEffect(() => {
    if (applied.current) return;
    applied.current = true;

    const params = new URLSearchParams(window.location.search);
    if (params.size === 0) return;

    const {
      setEra,
      selectFeature,
      startStory,
    } = useMapStore.getState();

    const era = params.get('era');
    if (era && isValidAtlasEra(era)) {
      setEra(era);
    }

    const place = params.get('place');
    const region = params.get('region');
    const segment = params.get('segment');
    const journey = params.get('journey');
    const ydna = params.get('ydna');
    const vikingAdna = params.get('vikingAdna');
    const vikingArch = params.get('vikingArch');

    if (vikingAdna) {
      if (!era) setEra('viking-age');
      useMapStore.getState().setLayerVisibility('viking-adna-burials', true);
      selectFeature(vikingAdna, 'viking-adna-site');
    } else if (vikingArch) {
      if (!era) setEra('viking-age');
      useMapStore.getState().setLayerVisibility('viking-archaeology-sites', true);
      selectFeature(vikingArch, 'viking-archaeology-site');
    } else if (ydna) {
      useMapStore.getState().setLayerVisibility('new-france-ydna-lineages', true);
      selectFeature(ydna, 'nf-ydna-lineage');
    } else if (place) selectFeature(place, 'settlement');
    else if (region) selectFeature(region, 'region');
    else if (segment) selectFeature(segment, 'atlas-route');
    else if (journey) selectFeature(journey, 'atlas-journey');

    const storyParam = params.get('story');
    if (storyParam !== null) {
      const arcId = storyParam || undefined;
      const stepParam = params.get('step');
      let stepIndex = 0;
      if (stepParam != null) {
        const idx = Math.max(0, Math.min(Number(stepParam), getBeatCount(arcId ?? null) - 1));
        if (Number.isFinite(idx)) stepIndex = idx;
      }
      startStory(arcId ?? null, { stepIndex });
    }

    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  return null;
}
