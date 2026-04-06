import type { Map as MaplibreMap, GeoJSONSource } from 'maplibre-gl';

export const PHYLOGEOGRAPHY_SOURCE = 'phylogeography-source';
export const PHYLOGEOGRAPHY_LINES = 'phylogeography-lines';
export const PHYLOGEOGRAPHY_CIRCLES = 'phylogeography-circles';
export const PHYLOGEOGRAPHY_LABELS = 'phylogeography-labels';

export function addPhylogeographyLayers(map: MaplibreMap) {
  if (map.getSource(PHYLOGEOGRAPHY_SOURCE)) return;

  const lineColor = '#c4a574';
  const nodeFill = '#e8d4a8';
  const strokeCol = 'rgba(12,14,18,0.65)';

  map.addSource(PHYLOGEOGRAPHY_SOURCE, {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
    promoteId: 'id',
  });

  map.addLayer({
    id: PHYLOGEOGRAPHY_LINES,
    type: 'line',
    source: PHYLOGEOGRAPHY_SOURCE,
    filter: ['==', ['get', 'kind'], 'phylo-edge'],
    paint: {
      'line-color': lineColor,
      'line-width': 2.5,
      'line-opacity': 0.78,
      'line-blur': 0.2,
    },
    layout: { 'line-cap': 'round', 'line-join': 'round' },
  });

  map.addLayer({
    id: PHYLOGEOGRAPHY_CIRCLES,
    type: 'circle',
    source: PHYLOGEOGRAPHY_SOURCE,
    filter: ['==', ['get', 'kind'], 'phylo-node'],
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 2, 4, 4, 7, 8, 11],
      'circle-color': nodeFill,
      'circle-stroke-width': 2,
      'circle-stroke-color': strokeCol,
      'circle-opacity': 0.92,
    },
  });

  map.addLayer({
    id: PHYLOGEOGRAPHY_LABELS,
    type: 'symbol',
    source: PHYLOGEOGRAPHY_SOURCE,
    filter: ['==', ['get', 'kind'], 'phylo-node'],
    layout: {
      'text-field': ['get', 'label'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 2, 9, 5, 12, 10, 14],
      'text-anchor': 'top',
      'text-offset': [0, 1.1],
      'text-max-width': 14,
      'text-allow-overlap': false,
      'text-ignore-placement': false,
    },
    paint: {
      'text-color': '#f3ead3',
      'text-halo-color': 'rgba(8,10,14,0.92)',
      'text-halo-width': 1.8,
      'text-halo-blur': 0.4,
    },
  });
}

export function updatePhylogeographySource(map: MaplibreMap, data: GeoJSON.FeatureCollection) {
  const src = map.getSource(PHYLOGEOGRAPHY_SOURCE) as GeoJSONSource | undefined;
  if (!src) return;
  src.setData(data);
}
