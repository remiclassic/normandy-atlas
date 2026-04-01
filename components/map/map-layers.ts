import type { Map as MaplibreMap, GeoJSONSource } from 'maplibre-gl';
import type { RegionFeatureCollection } from '@/types';
import { settlements } from '@/data/settlements';
import { getFeatureIconType } from '@/lib/atlas/getFeatureIconType';

export const REGION_SOURCE = 'regions';
export const SETTLEMENT_SOURCE = 'settlements';

/** Matches atlas basemap mode for label halos and ink-friendly contrast. */
export type MapDataTheme = 'dark' | 'parchment';

const regionLabelTheme = {
  dark: { text: '#d4c9a8', halo: 'rgba(10, 12, 18, 0.9)' },
  /** Near-black ink + opaque cream halo so labels read on colored region fills + parchment grain. */
  parchment: { text: '#140e0c', halo: 'rgba(255, 247, 235, 0.98)' },
} as const;

const regionLabelFont = (theme: MapDataTheme): string[] =>
  theme === 'parchment' ? ['Open Sans Semibold', 'Noto Sans Regular'] : ['Noto Sans Regular'];

export function addRegionLayers(
  map: MaplibreMap,
  geojson: RegionFeatureCollection,
  eraId: string,
  theme: MapDataTheme = 'dark',
) {
  const label = regionLabelTheme[theme];
  const isDark = theme === 'dark';

  const fillBase      = isDark ? 0.14 : 0.08;
  const fillBaseHi    = isDark ? 0.20 : 0.12;
  const fillHomeland  = isDark ? 0.28 : 0.18;
  const fillHomelandHi = isDark ? 0.36 : 0.24;
  const fillHover     = isDark ? 0.32 : 0.25;
  const fillHoverHi   = isDark ? 0.38 : 0.30;
  const fillSelect    = isDark ? 0.42 : 0.35;
  const fillSelectHi  = isDark ? 0.48 : 0.40;

  const strokeBase      = isDark ? 1.0  : 0.8;
  const strokeHomeland  = isDark ? 1.8  : 1.4;
  const strokeOpBase    = isDark ? 0.35 : 0.20;
  const strokeOpHomeland = isDark ? 0.60 : 0.45;

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
          '*',
          ['coalesce', ['feature-state', 'vikingFadeOpacity'], 1],
          [
            'case',
            ['boolean', ['feature-state', 'selected'], false], fillSelect,
            ['boolean', ['feature-state', 'hover'], false], fillHover,
            ['==', ['get', 'fillIntent'], 'homeland'], fillHomeland,
            fillBase,
          ],
        ],
        8, [
          '*',
          ['coalesce', ['feature-state', 'vikingFadeOpacity'], 1],
          [
            'case',
            ['boolean', ['feature-state', 'selected'], false], fillSelectHi,
            ['boolean', ['feature-state', 'hover'], false], fillHoverHi,
            ['==', ['get', 'fillIntent'], 'homeland'], fillHomelandHi,
            fillBaseHi,
          ],
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
        ['==', ['get', 'fillIntent'], 'homeland'], strokeHomeland,
        strokeBase,
      ],
      'line-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 0.85,
        ['boolean', ['feature-state', 'hover'], false], 0.55,
        ['==', ['get', 'fillIntent'], 'homeland'], strokeOpHomeland,
        strokeOpBase,
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
      'text-font': regionLabelFont(theme),
      'text-letter-spacing': 0.12,
      'text-max-width': 8,
      'text-allow-overlap': false,
    },
    paint: {
      'text-color': label.text,
      'text-halo-color': label.halo,
      'text-halo-width': theme === 'parchment' ? 3.2 : 2.5,
      'text-halo-blur': theme === 'parchment' ? 0.4 : 0,
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

// ---------------------------------------------------------------------------
// Viking expansion zones (poster-style wash overlay)
// ---------------------------------------------------------------------------

export const VIKING_ZONES_SOURCE = 'viking-expansion-zones';
export const VIKING_ZONES_FILL = 'viking-zones-fill';
export const VIKING_ZONES_STROKE = 'viking-zones-stroke';

export function addVikingExpansionZoneLayers(
  map: MaplibreMap,
  geojson: GeoJSON.FeatureCollection,
) {
  if (map.getSource(VIKING_ZONES_SOURCE)) return;

  map.addSource(VIKING_ZONES_SOURCE, { type: 'geojson', data: geojson });

  map.addLayer({
    id: VIKING_ZONES_FILL,
    type: 'fill',
    source: VIKING_ZONES_SOURCE,
    paint: {
      'fill-color': [
        'match', ['get', 'zoneKind'],
        'intensive', 'rgba(196,169,98,0.06)',
        'sporadic', 'rgba(196,169,98,0.03)',
        'rgba(196,169,98,0.03)',
      ],
      'fill-opacity': 1,
    },
    layout: { visibility: 'none' },
  });

  map.addLayer({
    id: VIKING_ZONES_STROKE,
    type: 'line',
    source: VIKING_ZONES_SOURCE,
    paint: {
      'line-color': 'rgba(196,169,98,0.15)',
      'line-width': 1,
      'line-dasharray': [4, 3],
    },
    layout: { visibility: 'none', 'line-join': 'round' as const },
  });
}

// ---------------------------------------------------------------------------
// Viking battle / fleet markers (symbol layer)
// ---------------------------------------------------------------------------

export const VIKING_BATTLE_SOURCE = 'viking-battle-markers';
export const VIKING_BATTLE_CIRCLES = 'viking-battle-circles';
export const VIKING_BATTLE_LABELS = 'viking-battle-labels';

export function addVikingBattleLayers(
  map: MaplibreMap,
  geojson: GeoJSON.FeatureCollection,
) {
  if (map.getSource(VIKING_BATTLE_SOURCE)) return;

  map.addSource(VIKING_BATTLE_SOURCE, {
    type: 'geojson',
    data: geojson,
    promoteId: 'id',
  });

  map.addLayer({
    id: VIKING_BATTLE_CIRCLES,
    type: 'circle',
    source: VIKING_BATTLE_SOURCE,
    paint: {
      'circle-radius': [
        'match', ['get', 'kind'],
        'fleet', 5,
        4,
      ],
      'circle-color': [
        'match', ['get', 'kind'],
        'battle', '#ef4444',
        'siege', '#f97316',
        'fleet', '#60a5fa',
        '#c4a962',
      ],
      'circle-opacity': 0.75,
      'circle-stroke-color': 'rgba(0,0,0,0.3)',
      'circle-stroke-width': 0.8,
    },
    layout: { visibility: 'none' },
  });

  map.addLayer({
    id: VIKING_BATTLE_LABELS,
    type: 'symbol',
    source: VIKING_BATTLE_SOURCE,
    layout: {
      'text-field': ['get', 'label'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 5, 8, 8, 10],
      'text-font': ['Noto Sans Regular'],
      'text-offset': [0, 1.2],
      'text-anchor': 'top',
      'text-allow-overlap': false,
      visibility: 'none',
    },
    paint: {
      'text-color': '#d4c9a8',
      'text-halo-color': 'rgba(10, 12, 18, 0.9)',
      'text-halo-width': 2,
      'text-opacity': 0.7,
    },
  });
}

export function updateVikingBattleSource(
  map: MaplibreMap,
  geojson: GeoJSON.FeatureCollection,
) {
  const source = map.getSource(VIKING_BATTLE_SOURCE) as GeoJSONSource | undefined;
  if (source) source.setData(geojson);
}

export function addSettlementLayers(map: MaplibreMap, theme: MapDataTheme = 'dark') {
  const label = regionLabelTheme[theme];
  const imgTheme = theme === 'parchment' ? 'parchment' : 'dark';

  const geojson: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: settlements.map((s) => ({
      type: 'Feature' as const,
      properties: {
        id: s.id,
        name: s.name,
        regionId: s.regionId,
        category: s.category ?? 'other',
        atlasIcon: getFeatureIconType({ category: s.category, label: s.name }),
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
    type: 'symbol',
    source: SETTLEMENT_SOURCE,
    layout: {
      'icon-image': ['concat', 'atlas-icon-', ['get', 'atlasIcon'], `-${imgTheme}`],
      'icon-size': [
        'interpolate', ['linear'], ['zoom'],
        4, 0.35,
        8, 0.55,
        12, 0.7,
      ],
      'icon-allow-overlap': true,
      visibility: 'none',
    },
    paint: {
      'icon-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 1,
        ['boolean', ['feature-state', 'hover'], false], 0.9,
        0.7,
      ],
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
        0.03,
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
      'text-font': regionLabelFont(theme),
      'text-offset': [0, 1.3],
      'text-anchor': 'top',
      visibility: 'none',
    },
    paint: {
      'text-color': theme === 'parchment' ? '#140e0c' : '#a89e82',
      'text-halo-color': label.halo,
      'text-halo-width': theme === 'parchment' ? 2.8 : 1.8,
      'text-halo-blur': theme === 'parchment' ? 0.4 : 0,
      'text-opacity': theme === 'parchment' ? 0.92 : 0.75,
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

function buildDefaultFillOpacity(dark: boolean): maplibregl.ExpressionSpecification {
  const base      = dark ? 0.14 : 0.08;
  const baseHi    = dark ? 0.20 : 0.12;
  const homeland  = dark ? 0.28 : 0.18;
  const homelandHi = dark ? 0.36 : 0.24;
  const hover     = dark ? 0.32 : 0.25;
  const hoverHi   = dark ? 0.38 : 0.30;
  const sel       = dark ? 0.42 : 0.35;
  const selHi     = dark ? 0.48 : 0.40;
  return [
    'interpolate',
    ['linear'],
    ['zoom'],
    3, [
      '*',
      ['coalesce', ['feature-state', 'vikingFadeOpacity'], 1],
      [
        'case',
        ['boolean', ['feature-state', 'selected'], false], sel,
        ['boolean', ['feature-state', 'hover'], false], hover,
        ['==', ['get', 'fillIntent'], 'homeland'], homeland,
        base,
      ],
    ],
    8, [
      '*',
      ['coalesce', ['feature-state', 'vikingFadeOpacity'], 1],
      [
        'case',
        ['boolean', ['feature-state', 'selected'], false], selHi,
        ['boolean', ['feature-state', 'hover'], false], hoverHi,
        ['==', ['get', 'fillIntent'], 'homeland'], homelandHi,
        baseHi,
      ],
    ],
  ];
}

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
  theme: MapDataTheme = 'dark',
) {
  for (const feature of geojson.features) {
    map.setFeatureState(
      { source: REGION_SOURCE, id: feature.properties.id },
      { migrationWeight: 0, migrationActive: false },
    );
  }
  if (map.getLayer('regions-fill')) {
    map.setPaintProperty('regions-fill', 'fill-opacity', buildDefaultFillOpacity(theme === 'dark'));
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

/**
 * Apply per-region opacity multiplier for Viking territory fade rules.
 * fadeMap: regionId → opacity (0–1); regions not in the map get 1.
 */
export function applyVikingTerritoryFade(
  map: MaplibreMap,
  fadeMap: Map<string, number>,
) {
  for (const [regionId, opacity] of fadeMap) {
    map.setFeatureState(
      { source: REGION_SOURCE, id: regionId },
      { vikingFadeOpacity: opacity },
    );
  }
}

export function clearVikingTerritoryFade(
  map: MaplibreMap,
  regionIds: string[],
) {
  for (const id of regionIds) {
    map.setFeatureState(
      { source: REGION_SOURCE, id },
      { vikingFadeOpacity: 1 },
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
