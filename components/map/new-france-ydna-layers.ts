import type { Map as MaplibreMap } from 'maplibre-gl';
import { nfYdnaCombinedGeoJson } from '@/lib/nf-ydna-combined';
import type { GfnaYdnaMapConfidenceFilter } from '@/data/atlas/gfna-dna-types';
import type { MapDataTheme } from './map-layers';

// ---------------------------------------------------------------------------
// Source + Layer IDs
// ---------------------------------------------------------------------------

export const NF_YDNA_SOURCE = 'nf-ydna-lineages';
export const NF_YDNA_CIRCLES = 'nf-ydna-circles';
export const NF_YDNA_LABELS = 'nf-ydna-labels';

// ---------------------------------------------------------------------------
// Palette — haplogroup-keyed, distinct from expansion pinks / settlement golds
// ---------------------------------------------------------------------------

export const HAPLO_COLORS: Record<string, string> = {
  R1b:   '#e05555',
  R1a:   '#d47040',
  I1:    '#4898e0',
  I2:    '#3070b0',
  G2:    '#3cb870',
  J1:    '#a855f8',
  J2:    '#8860d0',
  E1b:   '#d0a030',
  N:     '#50b8b8',
  C:     '#68c0a0',
  Q:     '#c87858',
  T:     '#a09060',
  L:     '#908870',
  Other: '#889098',
};

const HALO_BG = 'rgba(10, 12, 18, 0.9)';
const PARCHMENT_INK = '#140e0c';
const PARCHMENT_LABEL_HALO = 'rgba(255, 247, 235, 0.98)';
const LABEL_FONT_DARK: string[] = ['Noto Sans Regular'];
const LABEL_FONT_PARCHMENT: string[] = ['Open Sans Semibold', 'Noto Sans Regular'];

const SCANDINAVIAN_ORIGINS = ['scandinavian', 'possible-scandinavian'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function safeAddSource(map: MaplibreMap, id: string, spec: maplibregl.SourceSpecification) {
  if (!map.getSource(id)) map.addSource(id, spec);
}

function safeAddLayer(map: MaplibreMap, layer: maplibregl.LayerSpecification) {
  if (!map.getLayer(layer.id)) map.addLayer(layer);
}

function buildColorExpression(): maplibregl.ExpressionSpecification {
  const stops: (string | maplibregl.ExpressionSpecification)[] = ['match', ['get', 'yMajor']];
  for (const [key, color] of Object.entries(HAPLO_COLORS)) {
    stops.push(key, color);
  }
  stops.push(HAPLO_COLORS.Other); // fallback
  return stops as unknown as maplibregl.ExpressionSpecification;
}

function buildNfYdnaFilterParts(options: {
  scandinavianOnly: boolean;
  gfnaConfidence: GfnaYdnaMapConfidenceFilter;
}): maplibregl.FilterSpecification[] {
  const parts: maplibregl.FilterSpecification[] = [['!=', ['get', 'excludeFromMap'], true]];

  if (options.gfnaConfidence === 'confirmed') {
    parts.push([
      'any',
      ['==', ['get', 'gfnaStatus'], 'confirmed'],
      ['!', ['has', 'gfnaStatus']],
    ] as unknown as maplibregl.FilterSpecification);
  } else if (options.gfnaConfidence === 'presumed') {
    parts.push(['==', ['get', 'gfnaStatus'], 'presumed'] as maplibregl.FilterSpecification);
  }

  if (options.scandinavianOnly) {
    parts.push(['in', ['get', 'geneticOrigin'], ['literal', SCANDINAVIAN_ORIGINS]] as unknown as maplibregl.FilterSpecification);
  }

  return parts;
}

export function buildNfYdnaLayerFilter(options: {
  scandinavianOnly: boolean;
  gfnaConfidence: GfnaYdnaMapConfidenceFilter;
}): maplibregl.FilterSpecification {
  const parts = buildNfYdnaFilterParts(options);
  if (parts.length === 1) return parts[0];
  return ['all', ...parts] as maplibregl.FilterSpecification;
}

/** Applies Scandinavian origin + Francogene confidence filters to Y-DNA dot layers. */
export function applyNfYdnaMapFilters(
  map: MaplibreMap,
  options: { scandinavianOnly: boolean; gfnaConfidence: GfnaYdnaMapConfidenceFilter },
) {
  const filter = buildNfYdnaLayerFilter(options);
  if (map.getLayer(NF_YDNA_CIRCLES)) map.setFilter(NF_YDNA_CIRCLES, filter);
  if (map.getLayer(NF_YDNA_LABELS)) map.setFilter(NF_YDNA_LABELS, filter);
}

/** @deprecated Prefer {@link applyNfYdnaMapFilters} with full store options. */
export function applyNfYdnaOriginFilter(map: MaplibreMap, scandinavianOnly: boolean) {
  applyNfYdnaMapFilters(map, { scandinavianOnly, gfnaConfidence: 'all' });
}

// ---------------------------------------------------------------------------
// Layer construction
// ---------------------------------------------------------------------------

export function addNfYdnaLayers(map: MaplibreMap, theme: MapDataTheme = 'dark') {
  safeAddSource(map, NF_YDNA_SOURCE, {
    type: 'geojson',
    data: nfYdnaCombinedGeoJson as unknown as GeoJSON.FeatureCollection,
    promoteId: 'id',
  });

  const isParchment = theme === 'parchment';

  const defaultFilter = buildNfYdnaLayerFilter({ scandinavianOnly: false, gfnaConfidence: 'all' });

  safeAddLayer(map, {
    id: NF_YDNA_CIRCLES,
    type: 'circle',
    source: NF_YDNA_SOURCE,
    filter: defaultFilter,
    layout: { visibility: 'none' },
    paint: {
      'circle-radius': [
        'interpolate', ['linear'], ['zoom'],
        3, 2.5,
        6, 4,
        9, 6,
        12, 8,
      ],
      'circle-color': buildColorExpression(),
      'circle-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 1,
        ['boolean', ['feature-state', 'hover'], false], 0.95,
        0.7,
      ],
      'circle-stroke-width': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 2.5,
        ['boolean', ['feature-state', 'hover'], false], 1.8,
        isParchment ? 0.8 : 1,
      ],
      'circle-stroke-color': isParchment
        ? ([
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            '#d06040',
            PARCHMENT_INK,
          ] as unknown as maplibregl.ExpressionSpecification)
        : ([
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            '#ff8866',
            HALO_BG,
          ] as unknown as maplibregl.ExpressionSpecification),
    },
  });

  safeAddLayer(map, {
    id: NF_YDNA_LABELS,
    type: 'symbol',
    source: NF_YDNA_SOURCE,
    filter: defaultFilter,
    minzoom: 7,
    layout: {
      'text-field': ['concat', ['get', 'displayLabel'], '\n', ['get', 'yMajor']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 7, 9, 10, 11, 13, 13],
      'text-font': isParchment ? LABEL_FONT_PARCHMENT : LABEL_FONT_DARK,
      'text-offset': [0, 1.2],
      'text-anchor': 'top',
      'text-allow-overlap': false,
      'text-max-width': 14,
      visibility: 'none',
    },
    paint: isParchment
      ? {
          'text-color': PARCHMENT_INK,
          'text-halo-color': PARCHMENT_LABEL_HALO,
          'text-halo-width': 3,
          'text-halo-blur': 0.4,
          'text-opacity': 0.95,
        }
      : {
          'text-color': '#d0c8c0',
          'text-halo-color': HALO_BG,
          'text-halo-width': 1.8,
          'text-opacity': 0.85,
        },
  });
}
