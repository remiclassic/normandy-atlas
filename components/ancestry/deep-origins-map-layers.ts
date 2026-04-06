import type { Map as MaplibreMap, GeoJSONSource, ExpressionSpecification } from 'maplibre-gl';

export const DEEP_ORIGINS_LINES_SOURCE = 'deep-origins-lines';
export const DEEP_ORIGINS_LINES_LAYER = 'deep-origins-lines-layer';
export const DEEP_ORIGINS_SITES_SOURCE = 'deep-origins-sites';
export const DEEP_ORIGINS_SITES_CIRCLES = 'deep-origins-sites-circles';
export const DEEP_ORIGINS_SITES_SELECTED = 'deep-origins-sites-selected';
export const DEEP_ORIGINS_SITES_LABELS = 'deep-origins-sites-labels';

const LINE_COLOR_MATCH: ExpressionSpecification = [
  'match',
  ['get', 'categoryId'],
  'hunter_gatherer',
  '#e06b9a',
  'early_farmer',
  '#3dad6c',
  'metal_age',
  '#4a90d9',
  '#888888',
];

export function addDeepOriginsLayers(map: MaplibreMap) {
  if (!map.getSource(DEEP_ORIGINS_LINES_SOURCE)) {
    map.addSource(DEEP_ORIGINS_LINES_SOURCE, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    });
    map.addLayer({
      id: DEEP_ORIGINS_LINES_LAYER,
      type: 'line',
      source: DEEP_ORIGINS_LINES_SOURCE,
      paint: {
        'line-color': LINE_COLOR_MATCH,
        'line-width': 10,
        'line-opacity': 0.38,
        'line-blur': 2,
      },
      layout: { 'line-cap': 'round', 'line-join': 'round' },
    });
  }

  if (!map.getSource(DEEP_ORIGINS_SITES_SOURCE)) {
    map.addSource(DEEP_ORIGINS_SITES_SOURCE, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
      promoteId: 'id',
    });
    map.addLayer({
      id: DEEP_ORIGINS_SITES_CIRCLES,
      type: 'circle',
      source: DEEP_ORIGINS_SITES_SOURCE,
      filter: ['!=', ['get', 'selected'], 1],
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 3, 5, 6, 9, 10, 12],
        'circle-color': '#8b5a3c',
        'circle-opacity': 0.92,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#f5f0e8',
      },
    });
    map.addLayer({
      id: DEEP_ORIGINS_SITES_SELECTED,
      type: 'circle',
      source: DEEP_ORIGINS_SITES_SOURCE,
      filter: ['==', ['get', 'selected'], 1],
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 3, 8, 6, 14, 10, 18],
        'circle-color': '#c44a4a',
        'circle-opacity': 0.95,
        'circle-stroke-width': 3,
        'circle-stroke-color': '#fff8f0',
      },
    });
    map.addLayer({
      id: DEEP_ORIGINS_SITES_LABELS,
      type: 'symbol',
      source: DEEP_ORIGINS_SITES_SOURCE,
      layout: {
        'text-field': ['get', 'name'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 4, 9, 7, 11],
        'text-anchor': 'top',
        'text-offset': [0, 1.15],
        'text-max-width': 8,
        'text-allow-overlap': false,
      },
      paint: {
        'text-color': '#2a2826',
        'text-halo-color': 'rgba(255,250,245,0.95)',
        'text-halo-width': 1.2,
      },
    });
  }
}

export function updateDeepOriginsLines(map: MaplibreMap, data: GeoJSON.FeatureCollection) {
  const src = map.getSource(DEEP_ORIGINS_LINES_SOURCE) as GeoJSONSource | undefined;
  if (src) src.setData(data);
}

export function updateDeepOriginsSites(map: MaplibreMap, data: GeoJSON.FeatureCollection) {
  const src = map.getSource(DEEP_ORIGINS_SITES_SOURCE) as GeoJSONSource | undefined;
  if (src) src.setData(data);
}

export function setDeepOriginsLayerVisibility(
  map: MaplibreMap,
  vis: { migrations: boolean; sites: boolean; labels: boolean },
) {
  const vLine = vis.migrations ? 'visible' : 'none';
  const vSite = vis.sites ? 'visible' : 'none';
  const vLab = vis.labels && vis.sites ? 'visible' : 'none';
  if (map.getLayer(DEEP_ORIGINS_LINES_LAYER)) map.setLayoutProperty(DEEP_ORIGINS_LINES_LAYER, 'visibility', vLine);
  if (map.getLayer(DEEP_ORIGINS_SITES_CIRCLES))
    map.setLayoutProperty(DEEP_ORIGINS_SITES_CIRCLES, 'visibility', vSite);
  if (map.getLayer(DEEP_ORIGINS_SITES_SELECTED))
    map.setLayoutProperty(DEEP_ORIGINS_SITES_SELECTED, 'visibility', vSite);
  if (map.getLayer(DEEP_ORIGINS_SITES_LABELS))
    map.setLayoutProperty(DEEP_ORIGINS_SITES_LABELS, 'visibility', vLab);
}
