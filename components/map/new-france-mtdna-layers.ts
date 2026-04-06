import type { Map as MaplibreMap } from 'maplibre-gl';
import { nfMtdnaGeoJson } from '@/data/atlas/gfna-mtdna-lineages';
import type { MapDataTheme } from './map-layers';

export const NF_MTDNA_SOURCE = 'nf-mtdna-lineages';
export const NF_MTDNA_CIRCLES = 'nf-mtdna-circles';
export const NF_MTDNA_LABELS = 'nf-mtdna-labels';

const MTDNA_FILL = '#e879a8';
const HALO_BG = 'rgba(10, 12, 18, 0.9)';
const PARCHMENT_INK = '#140e0c';
const PARCHMENT_LABEL_HALO = 'rgba(255, 247, 235, 0.98)';
const LABEL_FONT_DARK: string[] = ['Noto Sans Regular'];
const LABEL_FONT_PARCHMENT: string[] = ['Open Sans Semibold', 'Noto Sans Regular'];

function safeAddSource(map: MaplibreMap, id: string, spec: maplibregl.SourceSpecification) {
  if (!map.getSource(id)) map.addSource(id, spec);
}

function safeAddLayer(map: MaplibreMap, layer: maplibregl.LayerSpecification) {
  if (!map.getLayer(layer.id)) map.addLayer(layer);
}

const MTDNA_BASE_FILTER: maplibregl.FilterSpecification = ['!=', ['get', 'excludeFromMap'], true];

export function addNfMtdnaLayers(map: MaplibreMap, theme: MapDataTheme = 'dark') {
  safeAddSource(map, NF_MTDNA_SOURCE, {
    type: 'geojson',
    data: nfMtdnaGeoJson as unknown as GeoJSON.FeatureCollection,
    promoteId: 'id',
  });

  const isParchment = theme === 'parchment';

  safeAddLayer(map, {
    id: NF_MTDNA_CIRCLES,
    type: 'circle',
    source: NF_MTDNA_SOURCE,
    filter: MTDNA_BASE_FILTER,
    layout: { visibility: 'none' },
    paint: {
      'circle-radius': [
        'interpolate', ['linear'], ['zoom'],
        3, 2.2,
        6, 3.6,
        9, 5.5,
        12, 7.5,
      ],
      'circle-color': MTDNA_FILL,
      'circle-opacity': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 1,
        ['boolean', ['feature-state', 'hover'], false], 0.95,
        0.72,
      ],
      'circle-stroke-width': [
        'case',
        ['boolean', ['feature-state', 'selected'], false], 2.2,
        ['boolean', ['feature-state', 'hover'], false], 1.6,
        isParchment ? 0.75 : 1,
      ],
      'circle-stroke-color': isParchment
        ? ([
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            '#c04878',
            PARCHMENT_INK,
          ] as unknown as maplibregl.ExpressionSpecification)
        : ([
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            '#ff9ec8',
            HALO_BG,
          ] as unknown as maplibregl.ExpressionSpecification),
    },
  });

  safeAddLayer(map, {
    id: NF_MTDNA_LABELS,
    type: 'symbol',
    source: NF_MTDNA_SOURCE,
    filter: MTDNA_BASE_FILTER,
    minzoom: 7,
    layout: {
      'text-field': ['concat', ['get', 'displayLabel'], '\n', ['get', 'mtHaplogroup']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 7, 9, 10, 11, 13, 13],
      'text-font': isParchment ? LABEL_FONT_PARCHMENT : LABEL_FONT_DARK,
      'text-offset': [0, 1.15],
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
          'text-color': '#f0c0d8',
          'text-halo-color': HALO_BG,
          'text-halo-width': 1.8,
          'text-opacity': 0.88,
        },
  });
}
