import type { Map as MaplibreMap, GeoJSONSource } from 'maplibre-gl';
import type { RegionFeatureCollection } from '@/types';
import type { MapDataTheme } from './map-layers';

export const HISTORICAL_PRESENCE_SOURCE = 'historical-presence-macro';
export const HISTORICAL_PRESENCE_FILL = 'historical-presence-fill';
export const HISTORICAL_PRESENCE_UNCERTAINTY = 'historical-presence-uncertainty';

export const HISTORICAL_PRESENCE_COMPARE_SOURCE = 'historical-presence-macro-compare';
export const HISTORICAL_PRESENCE_COMPARE_FILL = 'historical-presence-compare-fill';

/** Empty GeoJSON for compare layer when compare mode is off. */
export const EMPTY_HISTORICAL_PRESENCE_GEO: RegionFeatureCollection = {
  type: 'FeatureCollection',
  features: [],
};

function insertBeforeSettlements(map: MaplibreMap): string | undefined {
  return map.getLayer('settlements-circles') ? 'settlements-circles' : undefined;
}

export function addHistoricalPresenceLayers(
  map: MaplibreMap,
  primaryGeo: RegionFeatureCollection,
  compareGeo: RegionFeatureCollection,
  theme: MapDataTheme,
) {
  const beforeId = insertBeforeSettlements(map);
  const lineColor = theme === 'parchment' ? 'rgba(20,14,12,0.35)' : 'rgba(212,201,168,0.4)';

  if (!map.getSource(HISTORICAL_PRESENCE_COMPARE_SOURCE)) {
    map.addSource(HISTORICAL_PRESENCE_COMPARE_SOURCE, {
      type: 'geojson',
      data: compareGeo,
      promoteId: 'id',
    });

    map.addLayer(
      {
        id: HISTORICAL_PRESENCE_COMPARE_FILL,
        type: 'fill',
        source: HISTORICAL_PRESENCE_COMPARE_SOURCE,
        paint: {
          'fill-color': ['coalesce', ['get', 'presenceColor'], 'transparent'],
          'fill-opacity': [
            'case',
            ['==', ['coalesce', ['get', 'dominantGroupId'], ''], ''],
            0.015,
            ['*', ['coalesce', ['get', 'presenceOpacity'], 0.15], 0.4],
          ],
        },
        layout: { visibility: 'none' },
      },
      beforeId,
    );
  }

  if (map.getSource(HISTORICAL_PRESENCE_SOURCE)) return;

  map.addSource(HISTORICAL_PRESENCE_SOURCE, {
    type: 'geojson',
    data: primaryGeo,
    promoteId: 'id',
  });

  map.addLayer(
    {
      id: HISTORICAL_PRESENCE_FILL,
      type: 'fill',
      source: HISTORICAL_PRESENCE_SOURCE,
      paint: {
        'fill-color': ['coalesce', ['get', 'presenceColor'], 'transparent'],
        'fill-opacity': [
          'case',
          ['==', ['coalesce', ['get', 'dominantGroupId'], ''], ''],
          0.04,
          [
            '*',
            ['coalesce', ['get', 'presenceOpacity'], 0.15],
            [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1.05,
              ['boolean', ['feature-state', 'selected'], false],
              1.08,
              1,
            ],
          ],
        ],
      },
      layout: { visibility: 'none' },
    },
    beforeId,
  );

  map.addLayer(
    {
      id: HISTORICAL_PRESENCE_UNCERTAINTY,
      type: 'line',
      source: HISTORICAL_PRESENCE_SOURCE,
      paint: {
        'line-color': lineColor,
        'line-width': [
          'case',
          ['==', ['get', 'lowConfidenceHatch'], 1],
          1.2,
          0,
        ],
        'line-dasharray': [3, 2],
        'line-opacity': [
          'case',
          ['==', ['get', 'lowConfidenceHatch'], 1],
          0.55,
          0,
        ],
      },
      layout: { visibility: 'none', 'line-join': 'round' },
    },
    beforeId,
  );
}

export function updateHistoricalPresenceSource(map: MaplibreMap, geojson: RegionFeatureCollection) {
  const src = map.getSource(HISTORICAL_PRESENCE_SOURCE) as GeoJSONSource | undefined;
  if (src) src.setData(geojson as GeoJSON.FeatureCollection);
}

export function updateHistoricalPresenceCompareSource(map: MaplibreMap, geojson: RegionFeatureCollection) {
  const src = map.getSource(HISTORICAL_PRESENCE_COMPARE_SOURCE) as GeoJSONSource | undefined;
  if (src) src.setData(geojson as GeoJSON.FeatureCollection);
}

export function setHistoricalPresenceCompareLayerVisibility(map: MaplibreMap, visible: boolean) {
  if (!map.getLayer(HISTORICAL_PRESENCE_COMPARE_FILL)) return;
  map.setLayoutProperty(HISTORICAL_PRESENCE_COMPARE_FILL, 'visibility', visible ? 'visible' : 'none');
}
