import type { Map as MaplibreMap, GeoJSONSource } from 'maplibre-gl';
import type { MapDataTheme } from './map-layers';

export const USER_ANCESTRY_SOURCE = 'user-ancestry-pins';
export const USER_ANCESTRY_CIRCLES = 'user-ancestry-circles';
export const USER_ANCESTRY_LABELS = 'user-ancestry-labels';

function insertBeforeSettlements(map: MaplibreMap): string | undefined {
  return map.getLayer('settlements-circles') ? 'settlements-circles' : undefined;
}

export function addUserAncestryPinLayers(map: MaplibreMap, theme: MapDataTheme) {
  if (map.getSource(USER_ANCESTRY_SOURCE)) return;

  const beforeId = insertBeforeSettlements(map);
  const stroke = theme === 'parchment' ? 'rgba(20,14,12,0.5)' : 'rgba(10,12,18,0.65)';

  map.addSource(USER_ANCESTRY_SOURCE, {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
    promoteId: 'id',
  });

  map.addLayer(
    {
      id: USER_ANCESTRY_CIRCLES,
      type: 'circle',
      source: USER_ANCESTRY_SOURCE,
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 2, 4, 6, 7, 10, 10],
        'circle-color': ['coalesce', ['get', 'color'], '#c4a574'],
        'circle-stroke-width': [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          3,
          ['boolean', ['feature-state', 'hover'], false],
          2.2,
          1.5,
        ],
        'circle-stroke-color': stroke,
        'circle-opacity': [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          1,
          ['boolean', ['feature-state', 'hover'], false],
          0.96,
          0.88,
        ],
      },
      layout: { visibility: 'none' },
    },
    beforeId,
  );

  const labelFont: string[] = theme === 'parchment' ? ['Noto Sans Regular'] : ['Open Sans Semibold', 'Noto Sans Regular'];

  map.addLayer(
    {
      id: USER_ANCESTRY_LABELS,
      type: 'symbol',
      source: USER_ANCESTRY_SOURCE,
      layout: {
        'text-field': ['get', 'label'],
        'text-size': 11,
        'text-offset': [0, 1.15],
        'text-anchor': 'top',
        'text-font': labelFont,
        visibility: 'none',
      },
      paint: {
        'text-color': theme === 'parchment' ? '#140e0c' : '#f5f0e6',
        'text-halo-color': theme === 'parchment' ? 'rgba(255,247,235,0.95)' : 'rgba(10,12,18,0.9)',
        'text-halo-width': 1.2,
      },
    },
    beforeId,
  );
}

export function updateUserAncestryPinsSource(map: MaplibreMap, geojson: GeoJSON.FeatureCollection) {
  const src = map.getSource(USER_ANCESTRY_SOURCE) as GeoJSONSource | undefined;
  if (src) src.setData(geojson);
}

export function setUserAncestryPinsLayersVisible(map: MaplibreMap, visible: boolean) {
  const vis = visible ? 'visible' : 'none';
  if (map.getLayer(USER_ANCESTRY_CIRCLES)) {
    map.setLayoutProperty(USER_ANCESTRY_CIRCLES, 'visibility', vis);
  }
  if (map.getLayer(USER_ANCESTRY_LABELS)) {
    map.setLayoutProperty(USER_ANCESTRY_LABELS, 'visibility', vis);
  }
}
