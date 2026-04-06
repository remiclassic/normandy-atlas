'use client';

import { useEffect, useRef } from 'react';
import { useMapStore } from '@/lib/store';
import { isValidAtlasEra } from '@/core/era/engine';
import { getBeatCount } from '@/core/story/engine';
import { arcIdToProgressKey, FULL_TIMELINE_PROGRESS_KEY } from '@/lib/story-progress';
import { decodeMapView, parseHistoricalPresenceSearchParams, type ViewPayloadHistoricalPresence } from '@/lib/map-view-link';
import {
  resolveHaplogroupQuery,
  buildLineageMapGeoJson,
  bboxForLineageFeatures,
  isValidLineageEraLens,
} from '@/core';
import { getNfYdnaFeature } from '@/data/atlas/new-france-ydna';
import { getNfYdnaPresumedFeature } from '@/data/atlas/gfna-ydna-presumed';
import { getNfMtdnaFeature } from '@/data/atlas/gfna-mtdna-lineages';
import { getNormanNodeCenter } from '@/data/norman-expansion/nodes';

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

    if (params.get('identityStory') === '1') {
      useMapStore.getState().openNormanIdentityStoryFromDeepLink();
    }

    const {
      setEra,
      selectFeature,
      startStory,
    } = useMapStore.getState();

    const eraParam = params.get('era');
    const hadEraParam = !!(eraParam && isValidAtlasEra(eraParam));
    if (hadEraParam && eraParam) {
      setEra(eraParam);
    }

    const lineageQ = params.get('lineage');
    if (lineageQ) {
      const match = resolveHaplogroupQuery(lineageQ, { lineage: 'all', depth: 'all' });
      if (match) {
        const lensRaw = params.get('lineageLens');
        const lens = isValidLineageEraLens(lensRaw) ? lensRaw : 'early_medieval';
        const st = useMapStore.getState();
        st.setLayerVisibility('lineage-explorer', true);
        st.setLineageExplorerContext({ profileId: match.profile.id, eraLens: lens });
        const fc = buildLineageMapGeoJson(match.profile, lens);
        const bb = bboxForLineageFeatures(fc);
        if (bb) {
          const [sw, ne] = bb;
          st.setPendingFlyTarget({
            center: [(sw[0] + ne[0]) / 2, (sw[1] + ne[1]) / 2],
            zoom: 4.2,
          });
        }
      }
    }

    // ── Shared-view payload ─────────────────────────────────────────
    const viewParam = params.get('view');
    const view = viewParam ? decodeMapView(viewParam) : null;

    const applyHistoricalPresence = (hp: ViewPayloadHistoricalPresence) => {
      const st = useMapStore.getState();
      st.setLayerVisibility('historical-presence', true);
      st.setHistoricalPresenceYear(hp.y);
      st.setHistoricalPresenceView(hp.v);
      if (hp.ce) {
        st.setHistoricalPresenceCompare(true, hp.cy);
      } else {
        st.setHistoricalPresenceCompare(false);
      }
    };

    if (view) {
      const store = useMapStore.getState();

      if (view.base && view.base !== store.basemapMode) {
        store.setBasemapModePreference(view.base);
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

      if (view.hp) {
        applyHistoricalPresence(view.hp);
      }
    } else {
      // Legacy per-param feature selection (only when no view payload).
      const place = params.get('place');
      const region = params.get('region');
      const segment = params.get('segment');
      const journey = params.get('journey');
      const mtdna = params.get('mtdna');
      const ydna = params.get('ydna');
      const vikingAdna = params.get('vikingAdna');
      const vikingArch = params.get('vikingArch');

      if (vikingAdna) {
        if (!hadEraParam) setEra('viking-age');
        useMapStore.getState().setLayerVisibility('viking-adna-burials', true);
        selectFeature(vikingAdna, 'viking-adna-site');
      } else if (vikingArch) {
        if (!hadEraParam) setEra('viking-age');
        useMapStore.getState().setLayerVisibility('viking-archaeology-sites', true);
        selectFeature(vikingArch, 'viking-archaeology-site');
      } else if (mtdna) {
        const st = useMapStore.getState();
        if (!hadEraParam) st.setEra('new-france-foundations');
        st.setLayerVisibility('new-france-mtdna-lineages', true);
        const feat = getNfMtdnaFeature(mtdna);
        if (feat?.geometry?.type === 'Point') {
          const [lng, lat] = feat.geometry.coordinates;
          st.setPendingFlyTarget({ center: [lng, lat], zoom: 6.25 });
        }
        selectFeature(mtdna, 'nf-mtdna-lineage');
      } else if (ydna) {
        const st = useMapStore.getState();
        if (!hadEraParam) st.setEra('new-france-foundations');
        st.setLayerVisibility('new-france-ydna-lineages', true);
        const feat = getNfYdnaFeature(ydna) ?? getNfYdnaPresumedFeature(ydna);
        if (feat?.geometry?.type === 'Point') {
          const [lng, lat] = feat.geometry.coordinates;
          st.setPendingFlyTarget({ center: [lng, lat], zoom: 6.25 });
        }
        selectFeature(ydna, 'nf-ydna-lineage');
      } else if (params.get('normanSite')) {
        const normanSite = params.get('normanSite')!;
        const coords = getNormanNodeCenter(normanSite);
        if (coords) {
          const st = useMapStore.getState();
          if (!hadEraParam) setEra('norman-expansion');
          st.setLayerVisibility('norman-expansion-nodes', true);
          st.setLayerVisibility('norman-expansion-territories', true);
          st.setLayerVisibility('norman-expansion-routes', true);
          const [lng, lat] = coords;
          st.setPendingFlyTarget({ center: [lng, lat], zoom: 6.75 });
          selectFeature(normanSite, 'norman-site');
        }
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

    const hpQuery = parseHistoricalPresenceSearchParams(params);
    if (!view?.hp && hpQuery) {
      applyHistoricalPresence(hpQuery);
    }

    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  return null;
}
