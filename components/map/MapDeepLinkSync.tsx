'use client';

import { useEffect, useRef } from 'react';
import { useMapStore } from '@/lib/store';
import { isValidAtlasEra } from '@/core/era/engine';
import { getBeatCount } from '@/core/story/engine';
import { arcIdToProgressKey, FULL_TIMELINE_PROGRESS_KEY } from '@/lib/story-progress';
import { decodeMapView } from '@/lib/map-view-link';

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

    // ── Shared-view payload ─────────────────────────────────────────
    const viewParam = params.get('view');
    const view = viewParam ? decodeMapView(viewParam) : null;

    if (view) {
      const store = useMapStore.getState();

      if (view.base && view.base !== store.basemapMode) {
        store.setBasemapMode(view.base);
      }
      if (view.ay != null) store.setAtlasSimYear(view.ay);
      if (view.ny != null) store.setNormandySimYear(view.ny);

      if (view.ly) {
        for (const [id, on] of Object.entries(view.ly)) {
          store.setLayerVisibility(id, on);
        }
      }

      if (view.sel) {
        selectFeature(view.sel.id, view.sel.kind);
      }

      if (view.cam) {
        store.setPendingFlyTarget({
          center: [view.cam.lng, view.cam.lat],
          zoom: view.cam.z,
          bearing: view.cam.b,
          pitch: view.cam.p,
        });
      }
    } else {
      // Legacy per-param feature selection (only when no view payload).
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

      const lib = params.get('library');
      if (lib === '1' || lib === 'true') {
        let focusProgressKey: string | undefined;
        if (params.has('libraryArc')) {
          const a = params.get('libraryArc') ?? '';
          focusProgressKey =
            a === '' ? FULL_TIMELINE_PROGRESS_KEY : arcIdToProgressKey(a);
        }
        const openDetail = params.get('libraryDetail') === '1';
        useMapStore.getState().requestStoryLibraryOpen({ focusProgressKey, openDetail });
      } else {
        const storyParam = params.get('story');
        if (storyParam !== null) {
          const arcId = storyParam || undefined;
          const stepParam = params.get('step');
          let stepIndex = 0;
          if (stepParam != null) {
            const idx = Math.max(
              0,
              Math.min(Number(stepParam), getBeatCount(arcId ?? null) - 1),
            );
            if (Number.isFinite(idx)) stepIndex = idx;
          }
          startStory(arcId ?? null, { stepIndex });
        }
      }
    }

    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  return null;
}
