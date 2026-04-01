import type { Map as MaplibreMap } from 'maplibre-gl';
import { buildVikingArchGeoJson } from '@/data/atlas/viking-archaeology-sites';
import type { MapDataTheme } from './map-layers';

// ---------------------------------------------------------------------------
// Source + Layer IDs
// ---------------------------------------------------------------------------

export const VIKING_ARCH_SOURCE = 'viking-arch-sites';
export const VIKING_ARCH_CIRCLES = 'viking-arch-circles';
export const VIKING_ARCH_LABELS = 'viking-arch-labels';

// ---------------------------------------------------------------------------
// Palette — siteType keyed
// ---------------------------------------------------------------------------

export const VIKING_ARCH_SITE_COLORS: Record<string, string> = {
  emporium: '#d4a843',
  fortification: '#c45a5a',
  assembly: '#6eb86e',
  hoard: '#e8c547',
  settlement: '#7a9ec4',
  burial_mound: '#a67ac4',
  monastery: '#9db89d',
  runestone: '#c4a07a',
  ship_find: '#5aadad',
};
export const VIKING_ARCH_FALLBACK_COLOR = '#889098';

const PARCHMENT_INK = '#140e0c';
const LABEL_FONT: string[] = ['Noto Sans Regular'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeAddSource(map: MaplibreMap, id: string, spec: maplibregl.SourceSpecification) {
  if (!map.getSource(id)) map.addSource(id, spec);
}

function safeAddLayer(map: MaplibreMap, layer: maplibregl.LayerSpecification) {
  if (!map.getLayer(layer.id)) map.addLayer(layer);
}

function buildSiteTypeColorExpr(): maplibregl.ExpressionSpecification {
  const stops: (string | maplibregl.ExpressionSpecification)[] = [
    'match',
    ['get', 'siteType'],
  ];
  for (const [key, color] of Object.entries(VIKING_ARCH_SITE_COLORS)) {
    stops.push(key, color);
  }
  stops.push(VIKING_ARCH_FALLBACK_COLOR);
  return stops as unknown as maplibregl.ExpressionSpecification;
}

// ---------------------------------------------------------------------------
// Year overlap filter
// ---------------------------------------------------------------------------

export function setVikingArchYearFilter(map: MaplibreMap, simYear: number) {
  const filter: maplibregl.FilterSpecification = [
    'all',
    ['<=', ['get', 'dateStart'], simYear],
    ['>=', ['get', 'dateEnd'], simYear],
  ];
  if (map.getLayer(VIKING_ARCH_CIRCLES)) map.setFilter(VIKING_ARCH_CIRCLES, filter);
  if (map.getLayer(VIKING_ARCH_LABELS)) map.setFilter(VIKING_ARCH_LABELS, filter);
}

// ---------------------------------------------------------------------------
// Layer construction
// ---------------------------------------------------------------------------

export function addVikingArchLayers(map: MaplibreMap, theme: MapDataTheme = 'dark') {
  safeAddSource(map, VIKING_ARCH_SOURCE, {
    type: 'geojson',
    data: buildVikingArchGeoJson() as unknown as GeoJSON.FeatureCollection,
    promoteId: 'id',
  });

  const isParchment = theme === 'parchment';

  safeAddLayer(map, {
    id: VIKING_ARCH_CIRCLES,
    type: 'circle',
    source: VIKING_ARCH_SOURCE,
    layout: { visibility: 'none' },
    paint: {
      'circle-radius': [
        'interpolate', ['linear'], ['zoom'],
        3, 4,
        6, 6,
        10, 9,
      ],
      'circle-color': buildSiteTypeColorExpr(),
      'circle-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 1,
        ['boolean', ['feature-state', 'hover'], false], 0.95,
        isParchment ? 0.75 : 0.7,
      ],
      'circle-stroke-width': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 2.5,
        ['boolean', ['feature-state', 'hover'], false], 1.8,
        isParchment ? 0.8 : 1,
      ],
      'circle-stroke-color': isParchment ? PARCHMENT_INK : 'rgba(255,255,255,0.6)',
    },
  });

  safeAddLayer(map, {
    id: VIKING_ARCH_LABELS,
    type: 'symbol',
    source: VIKING_ARCH_SOURCE,
    minzoom: 6,
    layout: {
      'text-field': ['get', 'name'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 6, 9, 9, 12],
      'text-font': LABEL_FONT,
      'text-offset': [0, 1.4],
      'text-anchor': 'top',
      'text-allow-overlap': false,
      visibility: 'none',
    },
    paint: {
      'text-color': isParchment ? PARCHMENT_INK : '#d4c9a8',
      'text-halo-color': isParchment
        ? 'rgba(255,247,235,0.95)'
        : 'rgba(10,12,18,0.85)',
      'text-halo-width': 1.5,
      'text-opacity': 0.85,
    },
  });
}
