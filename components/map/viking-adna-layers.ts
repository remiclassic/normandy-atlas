import type { Map as MaplibreMap } from 'maplibre-gl';
import { buildVikingAdnaGeoJson } from '@/data/atlas/viking-adna-burials';
import type { MapDataTheme } from './map-layers';

// ---------------------------------------------------------------------------
// Source + Layer IDs
// ---------------------------------------------------------------------------

export const VIKING_ADNA_SOURCE = 'viking-adna-burials';
export const VIKING_ADNA_CIRCLES = 'viking-adna-circles';
export const VIKING_ADNA_LABELS = 'viking-adna-labels';

// ---------------------------------------------------------------------------
// Palette — burial-context keyed
// ---------------------------------------------------------------------------

export const VIKING_ADNA_CONTEXT_COLORS: Record<string, string> = {
  'mass grave': '#c44040',
  cemetery: '#4898e0',
  'churchyard cemetery': '#60a0d0',
};
export const VIKING_ADNA_FALLBACK_COLOR = '#889098';

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

function buildContextColorExpr(): maplibregl.ExpressionSpecification {
  const stops: (string | maplibregl.ExpressionSpecification)[] = [
    'match',
    ['get', 'burialContextType'],
  ];
  for (const [key, color] of Object.entries(VIKING_ADNA_CONTEXT_COLORS)) {
    stops.push(key, color);
  }
  stops.push(VIKING_ADNA_FALLBACK_COLOR);
  return stops as unknown as maplibregl.ExpressionSpecification;
}

// ---------------------------------------------------------------------------
// Combined filter — year overlap + optional country / burial context
// ---------------------------------------------------------------------------

export interface VikingAdnaMapFilter {
  simYear: number;
  country?: string;
  burialContext?: string;
}

export function setVikingAdnaFilters(map: MaplibreMap, opts: VikingAdnaMapFilter) {
  const clauses: maplibregl.ExpressionSpecification[] = [
    ['<=', ['get', 'dateStart'], opts.simYear],
    ['>=', ['get', 'dateEnd'], opts.simYear],
  ];
  if (opts.country && opts.country !== 'all') {
    clauses.push(['==', ['get', 'country'], opts.country]);
  }
  if (opts.burialContext && opts.burialContext !== 'all') {
    clauses.push(['==', ['get', 'burialContextType'], opts.burialContext]);
  }
  const filter: maplibregl.FilterSpecification = ['all', ...clauses];
  if (map.getLayer(VIKING_ADNA_CIRCLES)) map.setFilter(VIKING_ADNA_CIRCLES, filter);
  if (map.getLayer(VIKING_ADNA_LABELS)) map.setFilter(VIKING_ADNA_LABELS, filter);
}

/** @deprecated Use setVikingAdnaFilters instead. Kept for backwards compatibility. */
export function setVikingAdnaYearFilter(map: MaplibreMap, simYear: number) {
  setVikingAdnaFilters(map, { simYear });
}

// ---------------------------------------------------------------------------
// Layer construction
// ---------------------------------------------------------------------------

export function addVikingAdnaLayers(map: MaplibreMap, theme: MapDataTheme = 'dark') {
  safeAddSource(map, VIKING_ADNA_SOURCE, {
    type: 'geojson',
    data: buildVikingAdnaGeoJson() as unknown as GeoJSON.FeatureCollection,
    promoteId: 'id',
  });

  const isParchment = theme === 'parchment';

  safeAddLayer(map, {
    id: VIKING_ADNA_CIRCLES,
    type: 'circle',
    source: VIKING_ADNA_SOURCE,
    layout: { visibility: 'none' },
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        3, ['interpolate', ['linear'], ['get', 'sampleCount'], 1, 3.5, 12, 6],
        6, ['interpolate', ['linear'], ['get', 'sampleCount'], 1, 5, 12, 9],
        10, ['interpolate', ['linear'], ['get', 'sampleCount'], 1, 7, 12, 12],
      ],
      'circle-color': buildContextColorExpr(),
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
    id: VIKING_ADNA_LABELS,
    type: 'symbol',
    source: VIKING_ADNA_SOURCE,
    minzoom: 6,
    layout: {
      'text-field': [
        'concat',
        ['get', 'siteName'],
        ' (',
        ['to-string', ['get', 'sampleCount']],
        ')',
      ],
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
