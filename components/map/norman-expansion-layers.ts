import type { Map as MaplibreMap } from 'maplibre-gl';
import {
  normanRealmsGeoJson,
  normanNodesGeoJson,
} from '@/data/norman-expansion';
import type { MapDataTheme } from './map-layers';

// ---------------------------------------------------------------------------
// Source IDs
// ---------------------------------------------------------------------------

export const NORMAN_REALMS_SOURCE = 'norman-realms';
export const NORMAN_NODES_SOURCE = 'norman-nodes';

// ---------------------------------------------------------------------------
// Layer IDs — referenced by layerConfigs for toggle wiring
// ---------------------------------------------------------------------------

// Direct territories (tier === 'direct')
export const NORMAN_REALMS_FILL = 'norman-realms-fill';
export const NORMAN_REALMS_STROKE = 'norman-realms-stroke';
export const NORMAN_REALMS_LABELS = 'norman-realms-labels';

// Crusader territories (tier === 'crusader')
export const NORMAN_CRUSADER_FILL = 'norman-crusader-fill';
export const NORMAN_CRUSADER_STROKE = 'norman-crusader-stroke';
export const NORMAN_CRUSADER_LABELS = 'norman-crusader-labels';

// Influence / feudal / participation zones (tier === 'influence')
export const NORMAN_INFLUENCE_FILL = 'norman-influence-fill';
export const NORMAN_INFLUENCE_STROKE = 'norman-influence-stroke';
export const NORMAN_INFLUENCE_LABELS = 'norman-influence-labels';

// Settlement / hub nodes
export const NORMAN_NODES_CIRCLES = 'norman-nodes-circles';
export const NORMAN_NODES_LABELS = 'norman-nodes-labels';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeAddSource(map: MaplibreMap, id: string, spec: maplibregl.SourceSpecification) {
  if (!map.getSource(id)) map.addSource(id, spec);
}

function safeAddLayer(map: MaplibreMap, layer: maplibregl.LayerSpecification) {
  if (!map.getLayer(layer.id)) map.addLayer(layer);
}

// ---------------------------------------------------------------------------
// Filters (tier-based)
// ---------------------------------------------------------------------------

const DIRECT_FILTER: maplibregl.FilterSpecification = ['==', ['get', 'tier'], 'direct'];
const CRUSADER_FILTER: maplibregl.FilterSpecification = ['==', ['get', 'tier'], 'crusader'];
const INFLUENCE_FILTER: maplibregl.FilterSpecification = ['==', ['get', 'tier'], 'influence'];

// ---------------------------------------------------------------------------
// Color palette — magenta/pink family, distinct from Normandy-duchy golds
// ---------------------------------------------------------------------------

const REALM_COLOR = '#c94080';
const CRUSADER_COLOR = '#d06090';
const INFLUENCE_COLOR = '#a868b8';
const NODE_COLOR = '#e060a0';
const HALO_BG = 'rgba(10, 12, 18, 0.9)';
const PARCHMENT_INK = '#140e0c';
const PARCHMENT_LABEL_HALO = 'rgba(255, 247, 235, 0.98)';
const LABEL_FONT_DARK: string[] = ['Noto Sans Regular'];
const LABEL_FONT_PARCHMENT: string[] = ['Open Sans Semibold', 'Noto Sans Regular'];

function normanLabelFont(theme: MapDataTheme): string[] {
  return theme === 'parchment' ? LABEL_FONT_PARCHMENT : LABEL_FONT_DARK;
}

function normanRealmLabelPaint(
  theme: MapDataTheme,
  variant: 'direct' | 'crusader' | 'influence',
): Record<string, string | number> {
  if (theme === 'parchment') {
    return {
      'text-color': PARCHMENT_INK,
      'text-halo-color': PARCHMENT_LABEL_HALO,
      'text-halo-width': 3,
      'text-halo-blur': 0.45,
      'text-opacity': variant === 'influence' ? 0.92 : 0.98,
    };
  }
  const light: Record<typeof variant, Record<string, string | number>> = {
    direct: {
      'text-color': '#e8b0c8',
      'text-halo-color': HALO_BG,
      'text-halo-width': 2,
      'text-opacity': 0.85,
    },
    crusader: {
      'text-color': '#e0a0c0',
      'text-halo-color': HALO_BG,
      'text-halo-width': 2,
      'text-opacity': 0.85,
    },
    influence: {
      'text-color': '#c8a0d0',
      'text-halo-color': HALO_BG,
      'text-halo-width': 2,
      'text-opacity': 0.75,
    },
  };
  return light[variant];
}

function normanNodeLabelPaint(theme: MapDataTheme): Record<string, string | number> {
  if (theme === 'parchment') {
    return {
      'text-color': PARCHMENT_INK,
      'text-halo-color': PARCHMENT_LABEL_HALO,
      'text-halo-width': 3.4,
      'text-halo-blur': 0.5,
      'text-opacity': 1,
    };
  }
  return {
    'text-color': '#e8b8d0',
    'text-halo-color': HALO_BG,
    'text-halo-width': 1.8,
    'text-opacity': 0.85,
  };
}

function nodeCircleStrokeColor(theme: MapDataTheme): maplibregl.ExpressionSpecification {
  if (theme === 'parchment') {
    return [
      'case',
      ['boolean', ['feature-state', 'selected'], false],
      '#f0a0d0',
      '#2a2018',
    ];
  }
  return ['case', ['boolean', ['feature-state', 'selected'], false], '#f0a0d0', HALO_BG];
}

// ---------------------------------------------------------------------------
// Direct territory layers
// ---------------------------------------------------------------------------

function addDirectTerritoryLayers(map: MaplibreMap, theme: MapDataTheme) {
  safeAddSource(map, NORMAN_REALMS_SOURCE, {
    type: 'geojson',
    data: normanRealmsGeoJson as unknown as GeoJSON.FeatureCollection,
    promoteId: 'id',
  });

  safeAddLayer(map, {
    id: NORMAN_REALMS_FILL,
    type: 'fill',
    source: NORMAN_REALMS_SOURCE,
    filter: DIRECT_FILTER,
    paint: {
      'fill-color': REALM_COLOR,
      'fill-opacity': 0.12,
    },
    layout: { visibility: 'none' },
  });

  safeAddLayer(map, {
    id: NORMAN_REALMS_STROKE,
    type: 'line',
    source: NORMAN_REALMS_SOURCE,
    filter: DIRECT_FILTER,
    paint: {
      'line-color': REALM_COLOR,
      'line-width': 1.8,
      'line-opacity': 0.5,
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  safeAddLayer(map, {
    id: NORMAN_REALMS_LABELS,
    type: 'symbol',
    source: NORMAN_REALMS_SOURCE,
    filter: DIRECT_FILTER,
    layout: {
      'text-field': ['concat', ['get', 'name'], '\n', ['get', 'period']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 3, 10, 6, 13, 9, 15],
      'text-font': normanLabelFont(theme),
      'text-allow-overlap': false,
      'text-max-width': 12,
      visibility: 'none',
    },
    paint: normanRealmLabelPaint(theme, 'direct'),
  });
}

// ---------------------------------------------------------------------------
// Crusader territory layers
// ---------------------------------------------------------------------------

function addCrusaderLayers(map: MaplibreMap, theme: MapDataTheme) {
  safeAddLayer(map, {
    id: NORMAN_CRUSADER_FILL,
    type: 'fill',
    source: NORMAN_REALMS_SOURCE,
    filter: CRUSADER_FILTER,
    paint: {
      'fill-color': CRUSADER_COLOR,
      'fill-opacity': 0.14,
    },
    layout: { visibility: 'none' },
  });

  safeAddLayer(map, {
    id: NORMAN_CRUSADER_STROKE,
    type: 'line',
    source: NORMAN_REALMS_SOURCE,
    filter: CRUSADER_FILTER,
    paint: {
      'line-color': CRUSADER_COLOR,
      'line-width': 1.6,
      'line-opacity': 0.5,
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  safeAddLayer(map, {
    id: NORMAN_CRUSADER_LABELS,
    type: 'symbol',
    source: NORMAN_REALMS_SOURCE,
    filter: CRUSADER_FILTER,
    layout: {
      'text-field': ['concat', ['get', 'name'], '\n', ['get', 'period']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 3, 10, 6, 13, 9, 15],
      'text-font': normanLabelFont(theme),
      'text-allow-overlap': false,
      'text-max-width': 12,
      visibility: 'none',
    },
    paint: normanRealmLabelPaint(theme, 'crusader'),
  });
}

// ---------------------------------------------------------------------------
// Influence / feudal / participation layers — softer visual treatment
// ---------------------------------------------------------------------------

function addInfluenceLayers(map: MaplibreMap, theme: MapDataTheme) {
  safeAddLayer(map, {
    id: NORMAN_INFLUENCE_FILL,
    type: 'fill',
    source: NORMAN_REALMS_SOURCE,
    filter: INFLUENCE_FILTER,
    paint: {
      'fill-color': INFLUENCE_COLOR,
      'fill-opacity': 0.08,
    },
    layout: { visibility: 'none' },
  });

  safeAddLayer(map, {
    id: NORMAN_INFLUENCE_STROKE,
    type: 'line',
    source: NORMAN_REALMS_SOURCE,
    filter: INFLUENCE_FILTER,
    paint: {
      'line-color': INFLUENCE_COLOR,
      'line-width': 1.4,
      'line-opacity': 0.35,
      'line-dasharray': [6, 4],
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  safeAddLayer(map, {
    id: NORMAN_INFLUENCE_LABELS,
    type: 'symbol',
    source: NORMAN_REALMS_SOURCE,
    filter: INFLUENCE_FILTER,
    layout: {
      'text-field': ['concat', ['get', 'name'], '\n', ['get', 'period']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 3, 9, 6, 12, 9, 14],
      'text-font': normanLabelFont(theme),
      'text-allow-overlap': false,
      'text-max-width': 12,
      visibility: 'none',
    },
    paint: normanRealmLabelPaint(theme, 'influence'),
  });
}

// ---------------------------------------------------------------------------
// Node layers (settlement hubs)
// ---------------------------------------------------------------------------

function addNodeLayers(map: MaplibreMap, theme: MapDataTheme) {
  safeAddSource(map, NORMAN_NODES_SOURCE, {
    type: 'geojson',
    data: normanNodesGeoJson as unknown as GeoJSON.FeatureCollection,
    promoteId: 'id',
  });

  safeAddLayer(map, {
    id: NORMAN_NODES_CIRCLES,
    type: 'circle',
    source: NORMAN_NODES_SOURCE,
    paint: {
      // Single zoom interpolate only — MapLibre forbids multiple interpolate/step on zoom in one expression.
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        3,
        [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          7,
          ['boolean', ['feature-state', 'hover'], false],
          5.5,
          4,
        ],
        6,
        [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          9,
          ['boolean', ['feature-state', 'hover'], false],
          7.5,
          6,
        ],
        10,
        [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          12,
          ['boolean', ['feature-state', 'hover'], false],
          10.5,
          9,
        ],
      ],
      'circle-color': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], '#f080c0',
        ['boolean', ['feature-state', 'hover'], false], '#e878b4',
        NODE_COLOR,
      ],
      'circle-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 1,
        ['boolean', ['feature-state', 'hover'], false], 0.95,
        0.8,
      ],
      'circle-stroke-width': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 2.5,
        ['boolean', ['feature-state', 'hover'], false], 2,
        1.5,
      ],
      'circle-stroke-color': nodeCircleStrokeColor(theme),
    },
    layout: { visibility: 'none' },
  });

  safeAddLayer(map, {
    id: NORMAN_NODES_LABELS,
    type: 'symbol',
    source: NORMAN_NODES_SOURCE,
    layout: {
      'text-field': ['concat', ['get', 'name'], '\n', ['get', 'role']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 3, 9, 6, 11, 10, 13],
      'text-font': normanLabelFont(theme),
      'text-offset': [0, 1.4],
      'text-anchor': 'top',
      'text-allow-overlap': false,
      'text-max-width': 14,
      visibility: 'none',
    },
    paint: normanNodeLabelPaint(theme),
  });
}

// ---------------------------------------------------------------------------
// Period filter for Norman nodes
// ---------------------------------------------------------------------------

export function setNormanNodePeriodFilter(
  map: MaplibreMap,
  range: { min: number; max: number },
) {
  const filter: maplibregl.FilterSpecification = [
    'all',
    ['<=', ['get', 'yearStart'], range.max],
    ['>=', ['get', 'yearEnd'], range.min],
  ];
  if (map.getLayer(NORMAN_NODES_CIRCLES)) map.setFilter(NORMAN_NODES_CIRCLES, filter);
  if (map.getLayer(NORMAN_NODES_LABELS)) map.setFilter(NORMAN_NODES_LABELS, filter);
}

// ---------------------------------------------------------------------------
// Master initializer
// ---------------------------------------------------------------------------

export function addAllNormanExpansionLayers(map: MaplibreMap, theme: MapDataTheme = 'dark') {
  addDirectTerritoryLayers(map, theme);
  addCrusaderLayers(map, theme);
  addInfluenceLayers(map, theme);
  addNodeLayers(map, theme);
}
