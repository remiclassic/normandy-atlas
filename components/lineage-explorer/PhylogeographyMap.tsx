'use client';

import { useEffect, useMemo, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { DARK_BASEMAP_URL } from '@/components/map/map-style';
import type { PhylogeographyLetterDataset, PhylogeographyMapFocusId } from '@/core/types';
import {
  bboxForPhylogeographyFeatures,
  buildPhylogeographyGeoJson,
  phylogeographyDatasetHasGeometry,
} from '@/core/lineage/phylogeography-geo';
import {
  PHYLOGEOGRAPHY_SOURCE,
  addPhylogeographyLayers,
  updatePhylogeographySource,
} from '@/components/lineage-explorer/phylogeography-map-layers';

const WORLD_BOUNDS: maplibregl.LngLatBoundsLike = [
  [-32, -38],
  [142, 76],
];

function applyCamera(
  map: maplibregl.Map,
  dataset: PhylogeographyLetterDataset,
  fc: GeoJSON.FeatureCollection,
  focus: PhylogeographyMapFocusId | null,
) {
  if (!phylogeographyDatasetHasGeometry(dataset, focus)) {
    map.fitBounds(WORLD_BOUNDS, { padding: 40, duration: 500, maxZoom: 2.8 });
    return;
  }
  const bb = bboxForPhylogeographyFeatures(fc);
  if (bb) {
    map.fitBounds(bb, { padding: 60, duration: 550, maxZoom: 5.4 });
  }
}

export type PhylogeographyMapProps = {
  dataset: PhylogeographyLetterDataset;
  focus: PhylogeographyMapFocusId | null;
};

export default function PhylogeographyMap({ dataset, focus }: PhylogeographyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const datasetRef = useRef(dataset);
  datasetRef.current = dataset;
  const focusRef = useRef(focus);
  focusRef.current = focus;

  const geojson = useMemo(() => buildPhylogeographyGeoJson(dataset, focus), [dataset, focus]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const map = new maplibregl.Map({
      container: el,
      style: DARK_BASEMAP_URL,
      center: [24, 34],
      zoom: 2.05,
      minZoom: 1.15,
      maxZoom: 10,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    mapRef.current = map;

    const onLoad = () => {
      addPhylogeographyLayers(map);
      const ds = datasetRef.current;
      const fc = buildPhylogeographyGeoJson(ds, focusRef.current);
      updatePhylogeographySource(map, fc);
      applyCamera(map, ds, fc, focusRef.current);
    };

    map.on('load', onLoad);

    return () => {
      map.off('load', onLoad);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    if (!map.getSource(PHYLOGEOGRAPHY_SOURCE)) return;
    updatePhylogeographySource(map, geojson);
    applyCamera(map, dataset, geojson, focus);
  }, [geojson, dataset, focus]);

  return (
    <div
      ref={containerRef}
      className="h-[min(56vh,520px)] w-full min-h-[280px] overflow-hidden rounded-lg border border-chrome-border-strong/40"
      role="presentation"
    />
  );
}
