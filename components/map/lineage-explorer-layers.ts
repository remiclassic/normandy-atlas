import type { Map as MaplibreMap, GeoJSONSource } from 'maplibre-gl';
import type { MapDataTheme } from './map-layers';

export const LINEAGE_EXPLORER_SOURCE = 'lineage-explorer';
export const LINEAGE_EXPLORER_LINE = 'lineage-explorer-corridor';
export const LINEAGE_EXPLORER_CIRCLES = 'lineage-explorer-nodes';

function insertBeforeSettlements(map: MaplibreMap): string | undefined {
  return map.getLayer('settlements-circles') ? 'settlements-circles' : undefined;
}

const confidenceOpacity: Record<string, number> = { high: 0.9, medium: 0.65, low: 0.45 };

export function addLineageExplorerLayers(map: MaplibreMap, theme: MapDataTheme) {
  if (map.getSource(LINEAGE_EXPLORER_SOURCE)) return;

  const beforeId = insertBeforeSettlements(map);
  const lineHue = theme === 'parchment' ? '#6b5344' : '#c4a574';
  const nodeFill = theme === 'parchment' ? '#8b6a4a' : '#d4b87a';

  map.addSource(LINEAGE_EXPLORER_SOURCE, {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
    promoteId: 'id',
  });

  map.addLayer(
    {
      id: LINEAGE_EXPLORER_LINE,
      type: 'line',
      source: LINEAGE_EXPLORER_SOURCE,
      filter: ['==', ['get', 'kind'], 'lineage-corridor'],
      paint: {
        'line-color': lineHue,
        'line-width': 3,
        'line-opacity': [
          'match',
          ['get', 'confidence'],
          'high',
          0.55,
          'medium',
          0.42,
          'low',
          0.28,
          0.35,
        ],
        'line-dasharray': [2, 1.5],
      },
      layout: { visibility: 'none', 'line-cap': 'round', 'line-join': 'round' },
    },
    beforeId,
  );

  map.addLayer(
    {
      id: LINEAGE_EXPLORER_CIRCLES,
      type: 'circle',
      source: LINEAGE_EXPLORER_SOURCE,
      filter: ['==', ['get', 'kind'], 'lineage-region'],
      paint: {
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 2, 4, 6, 8, 10, 11],
        'circle-color': nodeFill,
        'circle-stroke-width': 1.5,
        'circle-stroke-color': theme === 'parchment' ? 'rgba(20,14,12,0.45)' : 'rgba(10,12,18,0.55)',
        'circle-opacity': [
          'match',
          ['get', 'confidence'],
          'high',
          confidenceOpacity.high,
          'medium',
          confidenceOpacity.medium,
          'low',
          confidenceOpacity.low,
          0.5,
        ],
      },
      layout: { visibility: 'none' },
    },
    beforeId,
  );
}

export function updateLineageExplorerSource(map: MaplibreMap, geojson: GeoJSON.FeatureCollection) {
  const src = map.getSource(LINEAGE_EXPLORER_SOURCE) as GeoJSONSource | undefined;
  if (src) src.setData(geojson);
}

export function setLineageExplorerLayersVisible(map: MaplibreMap, visible: boolean) {
  const vis = visible ? 'visible' : 'none';
  if (map.getLayer(LINEAGE_EXPLORER_LINE)) map.setLayoutProperty(LINEAGE_EXPLORER_LINE, 'visibility', vis);
  if (map.getLayer(LINEAGE_EXPLORER_CIRCLES)) map.setLayoutProperty(LINEAGE_EXPLORER_CIRCLES, 'visibility', vis);
}
