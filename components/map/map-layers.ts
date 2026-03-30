import type { Map as MaplibreMap, GeoJSONSource } from 'maplibre-gl';
import type { RegionFeatureCollection } from '@/types';
import { settlements } from '@/data/settlements';

export const REGION_SOURCE = 'regions';
export const SETTLEMENT_SOURCE = 'settlements';

export function addRegionLayers(map: MaplibreMap, geojson: RegionFeatureCollection, eraId: string) {
  map.addSource(REGION_SOURCE, {
    type: 'geojson',
    data: geojson,
    promoteId: 'id',
  });

  map.addLayer({
    id: 'regions-fill',
    type: 'fill',
    source: REGION_SOURCE,
    paint: {
      'fill-color': ['coalesce', ['get', 'color'], '#c4a962'],
      'fill-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        3, [
          'case',
          ['boolean', ['feature-state', 'selected'], false], 0.35,
          ['boolean', ['feature-state', 'hover'], false], 0.25,
          0.08,
        ],
        8, [
          'case',
          ['boolean', ['feature-state', 'selected'], false], 0.4,
          ['boolean', ['feature-state', 'hover'], false], 0.3,
          0.12,
        ],
      ],
    },
  });

  map.addLayer({
    id: 'regions-stroke',
    type: 'line',
    source: REGION_SOURCE,
    paint: {
      'line-color': ['coalesce', ['get', 'color'], '#c4a962'],
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 2.5,
        ['boolean', ['feature-state', 'hover'], false], 1.8,
        0.8,
      ],
      'line-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 0.85,
        ['boolean', ['feature-state', 'hover'], false], 0.55,
        0.2,
      ],
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  map.addLayer({
    id: 'regions-glow',
    type: 'line',
    source: REGION_SOURCE,
    paint: {
      'line-color': ['coalesce', ['get', 'color'], '#c4a962'],
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 10,
        ['boolean', ['feature-state', 'hover'], false], 6,
        0,
      ],
      'line-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 0.08,
        ['boolean', ['feature-state', 'hover'], false], 0.05,
        0,
      ],
      'line-blur': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 8,
        ['boolean', ['feature-state', 'hover'], false], 5,
        0,
      ],
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  map.addLayer({
    id: 'regions-labels',
    type: 'symbol',
    source: REGION_SOURCE,
    layout: {
      'text-field': ['coalesce', ['get', eraId, ['get', 'namesByEra']], ['get', 'name']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 4, 10, 7, 14, 10, 18],
      'text-font': ['Noto Sans Regular'],
      'text-letter-spacing': 0.12,
      'text-max-width': 8,
      'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#d4c9a8',
      'text-halo-color': 'rgba(10, 12, 18, 0.9)',
      'text-halo-width': 2.5,
      'text-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        3, 0.6,
        6, 0.85,
        10, 0.95,
      ],
    },
  });
}

export function addSettlementLayers(map: MaplibreMap) {
  const geojson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: settlements.map((s) => ({
      type: 'Feature' as const,
      properties: {
        id: s.id,
        name: s.name,
        regionId: s.regionId,
        category: s.category ?? 'other',
      },
      geometry: {
        type: 'Point' as const,
        coordinates: s.coordinates,
      },
    })),
  };

  map.addSource(SETTLEMENT_SOURCE, {
    type: 'geojson',
    data: geojson,
    promoteId: 'id',
  });

  map.addLayer({
    id: 'settlements-circles',
    type: 'circle',
    source: SETTLEMENT_SOURCE,
    paint: {
      'circle-radius': [
        'interpolate', ['linear'], ['zoom'],
        4, ['case', ['boolean', ['feature-state', 'selected'], false], 5, ['boolean', ['feature-state', 'hover'], false], 3.5, 2],
        8, ['case', ['boolean', ['feature-state', 'selected'], false], 7, ['boolean', ['feature-state', 'hover'], false], 5.5, 4.5],
        12, ['case', ['boolean', ['feature-state', 'selected'], false], 9, ['boolean', ['feature-state', 'hover'], false], 8, 7],
      ],
      'circle-color': '#d4c9a8',
      'circle-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 0.95,
        ['boolean', ['feature-state', 'hover'], false], 0.85,
        0.6,
      ],
      'circle-stroke-width': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 2,
        1.5,
      ],
      'circle-stroke-color': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], '#c4a962',
        'rgba(10, 12, 18, 0.5)',
      ],
      'circle-blur': 0.1,
    },
    layout: {
      visibility: 'none',
    },
  });

  map.addLayer({
    id: 'settlements-glow',
    type: 'circle',
    source: SETTLEMENT_SOURCE,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 6, 8, 12, 12, 18],
      'circle-color': '#d4c9a8',
      'circle-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 0.12,
        ['boolean', ['feature-state', 'hover'], false], 0.08,
        0.06,
      ],
      'circle-blur': 1,
    },
    layout: {
      visibility: 'none',
    },
  });

  map.addLayer({
    id: 'settlements-labels',
    type: 'symbol',
    source: SETTLEMENT_SOURCE,
    layout: {
      'text-field': ['get', 'name'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 6, 9, 10, 12],
      'text-font': ['Noto Sans Regular'],
      'text-offset': [0, 1.3],
      'text-anchor': 'top',
      visibility: 'none',
    },
    paint: {
      'text-color': '#a89e82',
      'text-halo-color': 'rgba(10, 12, 18, 0.85)',
      'text-halo-width': 1.8,
      'text-opacity': 0.75,
    },
  });
}

export function updateEraLabels(map: MaplibreMap, eraId: string) {
  if (!map.getLayer('regions-labels')) return;
  map.setLayoutProperty('regions-labels', 'text-field', [
    'coalesce',
    ['get', eraId, ['get', 'namesByEra']],
    ['get', 'name'],
  ]);
}

export function updateRegionSource(map: MaplibreMap, geojson: RegionFeatureCollection) {
  const source = map.getSource(REGION_SOURCE) as GeoJSONSource | undefined;
  if (source) source.setData(geojson);
}

export function updateSettlementSource(map: MaplibreMap, geojson: GeoJSON.FeatureCollection) {
  const source = map.getSource(SETTLEMENT_SOURCE) as GeoJSONSource | undefined;
  if (source) source.setData(geojson);
}

export function setFeatureState(
  map: MaplibreMap,
  featureId: string,
  state: Record<string, boolean>,
  source: string = REGION_SOURCE,
) {
  map.setFeatureState({ source, id: featureId }, state);
}

export function clearAllFeatureStates(map: MaplibreMap, geojson: RegionFeatureCollection) {
  for (const feature of geojson.features) {
    map.removeFeatureState({ source: REGION_SOURCE, id: feature.properties.id });
  }
}

// ---------------------------------------------------------------------------
// Migration overlay
// ---------------------------------------------------------------------------

const MIGRATION_FILL_OPACITY: maplibregl.ExpressionSpecification = [
  'case',
  ['boolean', ['feature-state', 'selected'], false],
  ['max', 0.35, ['*', ['coalesce', ['feature-state', 'migrationWeight'], 0], 0.55]],
  ['boolean', ['feature-state', 'hover'], false],
  ['max', 0.25, ['*', ['coalesce', ['feature-state', 'migrationWeight'], 0], 0.5]],
  ['max', 0.03, ['*', ['coalesce', ['feature-state', 'migrationWeight'], 0], 0.45]],
];

const DEFAULT_FILL_OPACITY: maplibregl.ExpressionSpecification = [
  'interpolate',
  ['linear'],
  ['zoom'],
  3, [
    'case',
    ['boolean', ['feature-state', 'selected'], false], 0.35,
    ['boolean', ['feature-state', 'hover'], false], 0.25,
    0.08,
  ],
  8, [
    'case',
    ['boolean', ['feature-state', 'selected'], false], 0.4,
    ['boolean', ['feature-state', 'hover'], false], 0.3,
    0.12,
  ],
];

/**
 * Set migration weights on region features and switch to migration paint.
 * weightMap: entityId → normalized 0–1 weight.
 */
export function applyMigrationOverlay(
  map: MaplibreMap,
  geojson: RegionFeatureCollection,
  weightMap: Map<string, number>,
) {
  for (const feature of geojson.features) {
    const id = feature.properties.id;
    const w = weightMap.get(id) ?? 0;
    map.setFeatureState(
      { source: REGION_SOURCE, id },
      { migrationWeight: w, migrationActive: true },
    );
  }
  if (map.getLayer('regions-fill')) {
    map.setPaintProperty('regions-fill', 'fill-opacity', MIGRATION_FILL_OPACITY);
  }
}

/**
 * Clear migration weights and restore default paint.
 */
export function clearMigrationOverlay(
  map: MaplibreMap,
  geojson: RegionFeatureCollection,
) {
  for (const feature of geojson.features) {
    map.setFeatureState(
      { source: REGION_SOURCE, id: feature.properties.id },
      { migrationWeight: 0, migrationActive: false },
    );
  }
  if (map.getLayer('regions-fill')) {
    map.setPaintProperty('regions-fill', 'fill-opacity', DEFAULT_FILL_OPACITY);
  }
}

/**
 * Apply port-weight scaling on settlement circles.
 * weightMap: placeId → normalized 0–1 weight.
 */
export function applyPortWeights(
  map: MaplibreMap,
  weightMap: Map<string, number>,
  placeIds: string[],
) {
  for (const pid of placeIds) {
    const w = weightMap.get(pid) ?? 0;
    map.setFeatureState(
      { source: SETTLEMENT_SOURCE, id: pid },
      { portWeight: w },
    );
  }
}

export function clearPortWeights(
  map: MaplibreMap,
  placeIds: string[],
) {
  for (const pid of placeIds) {
    map.setFeatureState(
      { source: SETTLEMENT_SOURCE, id: pid },
      { portWeight: 0 },
    );
  }
}

export function setLayerVisibility(
  map: MaplibreMap,
  layerIds: string[],
  visible: boolean,
) {
  const allIds = [...layerIds];
  if (layerIds.includes('settlements-circles') && !layerIds.includes('settlements-glow')) {
    allIds.push('settlements-glow');
  }

  for (const id of allIds) {
    if (map.getLayer(id)) {
      map.setLayoutProperty(id, 'visibility', visible ? 'visible' : 'none');
    }
  }
}
