import type { Map as MaplibreMap } from 'maplibre-gl';
import {
  normandyExpansionGeoJson,
  normandyRiversGeoJson,
  culturalZonesGeoJson,
  buildDensityGeoJson,
  buildEvidenceGeoJson,
  buildToponymGeoJson,
  microRegionsGeoJson,
  normandyBoundaryGeoJson,
} from '@/data/normandy';

// Source IDs
export const NORMANDY_BOUNDARY_SOURCE = 'normandy-boundary';
export const NORMANDY_MICRO_REGIONS_SOURCE = 'normandy-micro-regions';
export const NORMANDY_EXPANSION_SOURCE = 'normandy-expansion';
export const NORMANDY_RIVERS_SOURCE = 'normandy-rivers';
export const NORMANDY_CULTURE_SOURCE = 'normandy-culture';
export const NORMANDY_DENSITY_SOURCE = 'normandy-density';
export const NORMANDY_EVIDENCE_SOURCE = 'normandy-evidence';
export const NORMANDY_TOPONYMY_SOURCE = 'normandy-toponymy';

// Layer IDs — referenced by layerConfigs for toggle wiring
export const BOUNDARY_STROKE = 'normandy-boundary-stroke';
export const MICRO_REGION_FILL = 'normandy-micro-regions-fill';
export const MICRO_REGION_STROKE = 'normandy-micro-regions-stroke';
export const MICRO_REGION_LABELS = 'normandy-micro-regions-labels';
export const EXPANSION_FILL = 'normandy-expansion-fill';
export const EXPANSION_STROKE = 'normandy-expansion-stroke';
export const EXPANSION_LABELS = 'normandy-expansion-labels';
export const RIVER_LINE = 'normandy-rivers-line';
export const RIVER_GLOW = 'normandy-rivers-glow';
export const RIVER_LABELS = 'normandy-rivers-labels';
export const CULTURE_FILL = 'normandy-culture-fill';
export const CULTURE_STROKE = 'normandy-culture-stroke';
export const CULTURE_LABELS = 'normandy-culture-labels';
export const DENSITY_HEAT = 'normandy-density-heat';
export const DENSITY_CIRCLES = 'normandy-density-circles';
export const EVIDENCE_CIRCLES = 'normandy-evidence-circles';
export const EVIDENCE_ICONS = 'normandy-evidence-icons';
export const EVIDENCE_LABELS = 'normandy-evidence-labels';
export const TOPONYMY_CIRCLES = 'normandy-toponymy-circles';
export const TOPONYMY_LABELS = 'normandy-toponymy-labels';

const FILL_INTENT_COLORS: Record<string, string> = {
  treaty: '#d4b872',
  annexation: '#c48a52',
  consolidation: '#7a8fa5',
};

const EVIDENCE_COLORS: Record<string, string> = {
  burial: '#1a1a1a',
  weapon: '#2a2a2a',
  fortification: '#333333',
};

const EVIDENCE_ICON_TEXT: Record<string, string> = {
  burial: '†',
  weapon: '◆',
  fortification: '✕',
};

const SUFFIX_COLORS: Record<string, string> = {
  tot: '#c4a962',
  bec: '#5b9bd5',
  dalle: '#a3d977',
  hogue: '#e07c4c',
  thuit: '#ba68c8',
  londe: '#66bb6a',
  mare: '#4dd0e1',
  other: '#9e9e9e',
};

function safeAddSource(map: MaplibreMap, id: string, spec: maplibregl.SourceSpecification) {
  if (!map.getSource(id)) map.addSource(id, spec);
}

function safeAddLayer(map: MaplibreMap, layer: maplibregl.LayerSpecification) {
  if (!map.getLayer(layer.id)) map.addLayer(layer);
}

// ---------------------------------------------------------------------------
// 0. Normandy boundary + micro-region layers
// ---------------------------------------------------------------------------

export function addMicroRegionLayers(map: MaplibreMap) {
  safeAddSource(map, NORMANDY_BOUNDARY_SOURCE, {
    type: 'geojson',
    data: normandyBoundaryGeoJson as unknown as GeoJSON.FeatureCollection,
  });

  safeAddLayer(map, {
    id: BOUNDARY_STROKE,
    type: 'line',
    source: NORMANDY_BOUNDARY_SOURCE,
    paint: {
      'line-color': '#8a7a55',
      'line-width': 2,
      'line-opacity': 0.5,
      'line-dasharray': [6, 4],
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  safeAddSource(map, NORMANDY_MICRO_REGIONS_SOURCE, {
    type: 'geojson',
    data: microRegionsGeoJson as unknown as GeoJSON.FeatureCollection,
    promoteId: 'id',
  });

  safeAddLayer(map, {
    id: MICRO_REGION_FILL,
    type: 'fill',
    source: NORMANDY_MICRO_REGIONS_SOURCE,
    paint: {
      'fill-color': '#c4a962',
      'fill-opacity': 0.04,
    },
    layout: { visibility: 'none' },
  });

  safeAddLayer(map, {
    id: MICRO_REGION_STROKE,
    type: 'line',
    source: NORMANDY_MICRO_REGIONS_SOURCE,
    paint: {
      'line-color': '#c4a962',
      'line-width': 1,
      'line-opacity': 0.25,
      'line-dasharray': [3, 2],
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
    },
  });

  safeAddLayer(map, {
    id: MICRO_REGION_LABELS,
    type: 'symbol',
    source: NORMANDY_MICRO_REGIONS_SOURCE,
    layout: {
      'text-field': ['get', 'name'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 5, 9, 8, 12, 11, 14],
      'text-font': ['Noto Sans Regular'],
      'text-allow-overlap': false,
      'text-max-width': 10,
      visibility: 'none',
    },
    paint: {
      'text-color': '#b8a878',
      'text-halo-color': 'rgba(10, 12, 18, 0.9)',
      'text-halo-width': 2,
      'text-opacity': 0.7,
    },
  });
}

// ---------------------------------------------------------------------------
// 1. Political expansion layers
// ---------------------------------------------------------------------------

export function addExpansionLayers(map: MaplibreMap) {
  safeAddSource(map, NORMANDY_EXPANSION_SOURCE, {
    type: 'geojson',
    data: normandyExpansionGeoJson as unknown as GeoJSON.FeatureCollection,
    promoteId: 'id',
  });

  safeAddLayer(map, {
    id: EXPANSION_FILL,
    type: 'fill',
    source: NORMANDY_EXPANSION_SOURCE,
    paint: {
      'fill-color': ['match', ['get', 'fillIntent'],
        'treaty', FILL_INTENT_COLORS.treaty,
        'annexation', FILL_INTENT_COLORS.annexation,
        'consolidation', FILL_INTENT_COLORS.consolidation,
        '#888',
      ],
      'fill-opacity': ['interpolate', ['linear'], ['get', 'phase'],
        1, 0.12,
        2, 0.16,
        3, 0.20,
        4, 0.08,
      ],
    },
    layout: { visibility: 'none' },
  });

  safeAddLayer(map, {
    id: EXPANSION_STROKE,
    type: 'line',
    source: NORMANDY_EXPANSION_SOURCE,
    paint: {
      'line-color': ['match', ['get', 'fillIntent'],
        'treaty', FILL_INTENT_COLORS.treaty,
        'annexation', FILL_INTENT_COLORS.annexation,
        'consolidation', FILL_INTENT_COLORS.consolidation,
        '#888',
      ],
      'line-width': ['match', ['get', 'fillIntent'],
        'treaty', 2.0,
        'annexation', 1.4,
        'consolidation', 1.0,
        1.0,
      ],
      'line-opacity': 0.45,
      'line-dasharray': [4, 3],
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
      'line-cap': 'round',
    } as maplibregl.LineLayerSpecification['layout'],
  });

  safeAddLayer(map, {
    id: EXPANSION_LABELS,
    type: 'symbol',
    source: NORMANDY_EXPANSION_SOURCE,
    layout: {
      'text-field': ['get', 'label'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 5, 9, 8, 12, 11, 14],
      'text-font': ['Noto Sans Regular'],
      'text-allow-overlap': false,
      'text-max-width': 12,
      visibility: 'none',
    },
    paint: {
      'text-color': '#d4c9a8',
      'text-halo-color': 'rgba(10, 12, 18, 0.9)',
      'text-halo-width': 2,
      'text-opacity': 0.8,
    },
  });
}

// ---------------------------------------------------------------------------
// 2. River layers
// ---------------------------------------------------------------------------

export function addRiverLayers(map: MaplibreMap) {
  safeAddSource(map, NORMANDY_RIVERS_SOURCE, {
    type: 'geojson',
    data: normandyRiversGeoJson as unknown as GeoJSON.FeatureCollection,
  });

  safeAddLayer(map, {
    id: RIVER_GLOW,
    type: 'line',
    source: NORMANDY_RIVERS_SOURCE,
    paint: {
      'line-color': '#5b9bd5',
      'line-width': ['match', ['get', 'role'], 'primary', 10, 6],
      'line-opacity': 0.08,
      'line-blur': 6,
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  safeAddLayer(map, {
    id: RIVER_LINE,
    type: 'line',
    source: NORMANDY_RIVERS_SOURCE,
    paint: {
      'line-color': '#5b9bd5',
      'line-width': ['match', ['get', 'role'], 'primary', 2.5, 1.5],
      'line-opacity': ['match', ['get', 'role'], 'primary', 0.6, 0.4],
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  safeAddLayer(map, {
    id: RIVER_LABELS,
    type: 'symbol',
    source: NORMANDY_RIVERS_SOURCE,
    layout: {
      'symbol-placement': 'line-center',
      'text-field': ['get', 'name'],
      'text-size': 11,
      'text-font': ['Noto Sans Regular'],
      'text-letter-spacing': 0.15,
      visibility: 'none',
    },
    paint: {
      'text-color': '#7ab3e0',
      'text-halo-color': 'rgba(10, 12, 18, 0.85)',
      'text-halo-width': 1.8,
      'text-opacity': 0.75,
    },
  });
}

// ---------------------------------------------------------------------------
// 3. Cultural zone layers
// ---------------------------------------------------------------------------

export function addCultureLayers(map: MaplibreMap) {
  safeAddSource(map, NORMANDY_CULTURE_SOURCE, {
    type: 'geojson',
    data: culturalZonesGeoJson as unknown as GeoJSON.FeatureCollection,
    promoteId: 'id',
  });

  safeAddLayer(map, {
    id: CULTURE_FILL,
    type: 'fill',
    source: NORMANDY_CULTURE_SOURCE,
    paint: {
      'fill-color': ['get', 'color'],
      'fill-opacity': 0.10,
    },
    layout: { visibility: 'none' },
  });

  safeAddLayer(map, {
    id: CULTURE_STROKE,
    type: 'line',
    source: NORMANDY_CULTURE_SOURCE,
    paint: {
      'line-color': ['get', 'color'],
      'line-width': 1.5,
      'line-opacity': 0.35,
      'line-dasharray': [4, 3],
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
    },
  });

  safeAddLayer(map, {
    id: CULTURE_LABELS,
    type: 'symbol',
    source: NORMANDY_CULTURE_SOURCE,
    layout: {
      'text-field': ['get', 'name'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 5, 10, 9, 14],
      'text-font': ['Noto Sans Regular'],
      'text-allow-overlap': false,
      'text-max-width': 10,
      visibility: 'none',
    },
    paint: {
      'text-color': ['get', 'color'],
      'text-halo-color': 'rgba(10, 12, 18, 0.9)',
      'text-halo-width': 2,
      'text-opacity': 0.85,
    },
  });
}

// ---------------------------------------------------------------------------
// 4. Settlement density layers
// ---------------------------------------------------------------------------

export function addDensityLayers(map: MaplibreMap) {
  safeAddSource(map, NORMANDY_DENSITY_SOURCE, {
    type: 'geojson',
    data: buildDensityGeoJson(),
  });

  safeAddLayer(map, {
    id: DENSITY_HEAT,
    type: 'heatmap',
    source: NORMANDY_DENSITY_SOURCE,
    paint: {
      'heatmap-weight': ['get', 'weight'],
      'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 5, 0.6, 9, 1.2],
      'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 5, 18, 9, 30],
      'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 5, 0.5, 9, 0.35],
      'heatmap-color': [
        'interpolate', ['linear'], ['heatmap-density'],
        0, 'rgba(0,0,0,0)',
        0.15, 'rgba(140,40,40,0.2)',
        0.35, 'rgba(180,50,50,0.35)',
        0.55, 'rgba(210,60,40,0.5)',
        0.75, 'rgba(230,70,40,0.65)',
        1.0, 'rgba(240,85,45,0.8)',
      ],
    },
    layout: { visibility: 'none' },
  });

  safeAddLayer(map, {
    id: DENSITY_CIRCLES,
    type: 'circle',
    source: NORMANDY_DENSITY_SOURCE,
    minzoom: 7,
    paint: {
      'circle-radius': ['interpolate', ['linear'], ['zoom'],
        7, ['interpolate', ['linear'], ['get', 'weight'], 1, 2, 5, 4],
        10, ['interpolate', ['linear'], ['get', 'weight'], 1, 3, 5, 7],
      ],
      'circle-color': ['match', ['get', 'density'],
        'very_high', '#d43d2f',
        'high', '#c94a3a',
        'medium', '#b85c4a',
        '#a07060',
      ],
      'circle-opacity': ['match', ['get', 'presence'],
        'confirmed', 0.85,
        0.55,
      ],
      'circle-stroke-width': 1,
      'circle-stroke-color': 'rgba(10, 12, 18, 0.5)',
    },
    layout: { visibility: 'none' },
  });
}

// ---------------------------------------------------------------------------
// 5. Archaeological evidence layers
// ---------------------------------------------------------------------------

export function addEvidenceLayers(map: MaplibreMap, theme: 'dark' | 'parchment' = 'dark') {
  const imgTheme = theme === 'parchment' ? 'parchment' : 'dark';

  safeAddSource(map, NORMANDY_EVIDENCE_SOURCE, {
    type: 'geojson',
    data: buildEvidenceGeoJson(),
    promoteId: 'id',
  });

  safeAddLayer(map, {
    id: EVIDENCE_CIRCLES,
    type: 'symbol',
    source: NORMANDY_EVIDENCE_SOURCE,
    layout: {
      'icon-image': ['concat', 'atlas-icon-', ['get', 'atlasIcon'], `-${imgTheme}`],
      'icon-size': ['interpolate', ['linear'], ['zoom'], 5, 0.4, 10, 0.6],
      'icon-allow-overlap': true,
      visibility: 'none',
    },
    paint: {
      'icon-opacity': ['match', ['get', 'certainty'],
        'confirmed', 0.9,
        0.6,
      ],
    },
  });

  // Keep the EVIDENCE_ICONS layer id alive (but as a no-op) so existing
  // references in data/layers.ts don't break layer toggle logic.
  safeAddLayer(map, {
    id: EVIDENCE_ICONS,
    type: 'symbol',
    source: NORMANDY_EVIDENCE_SOURCE,
    layout: {
      visibility: 'none',
      'text-field': '',
    },
    paint: {},
  });

  safeAddLayer(map, {
    id: EVIDENCE_LABELS,
    type: 'symbol',
    source: NORMANDY_EVIDENCE_SOURCE,
    minzoom: 8,
    layout: {
      'text-field': ['concat',
        ['get', 'label'],
        ' (',
        ['to-string', ['get', 'dateStart']],
        '–',
        ['to-string', ['get', 'dateEnd']],
        ')',
      ],
      'text-size': ['interpolate', ['linear'], ['zoom'], 8, 9, 11, 12],
      'text-font': ['Noto Sans Regular'],
      'text-offset': [0, 1.4],
      'text-anchor': 'top',
      'text-allow-overlap': false,
      visibility: 'none',
    },
    paint: {
      'text-color': '#d4c9a8',
      'text-halo-color': 'rgba(10, 12, 18, 0.85)',
      'text-halo-width': 1.5,
      'text-opacity': 0.8,
    },
  });
}

// ---------------------------------------------------------------------------
// 6. Toponymy layers
// ---------------------------------------------------------------------------

export function addToponymyLayers(map: MaplibreMap) {
  safeAddSource(map, NORMANDY_TOPONYMY_SOURCE, {
    type: 'geojson',
    data: buildToponymGeoJson(),
    cluster: true,
    clusterRadius: 30,
    clusterMaxZoom: 10,
  });

  safeAddLayer(map, {
    id: TOPONYMY_CIRCLES,
    type: 'circle',
    source: NORMANDY_TOPONYMY_SOURCE,
    paint: {
      'circle-radius': [
        'case',
        ['has', 'point_count'],
        ['interpolate', ['linear'], ['get', 'point_count'], 2, 8, 10, 16],
        5,
      ],
      'circle-color': [
        'case',
        ['has', 'point_count'],
        '#c4a962',
        ['match', ['get', 'suffix'],
          'tot', SUFFIX_COLORS.tot,
          'bec', SUFFIX_COLORS.bec,
          'dalle', SUFFIX_COLORS.dalle,
          'hogue', SUFFIX_COLORS.hogue,
          'thuit', SUFFIX_COLORS.thuit,
          'londe', SUFFIX_COLORS.londe,
          'mare', SUFFIX_COLORS.mare,
          SUFFIX_COLORS.other,
        ],
      ],
      'circle-opacity': [
        'case',
        ['has', 'point_count'], 0.55,
        0.75,
      ],
      'circle-stroke-width': 1,
      'circle-stroke-color': 'rgba(10, 12, 18, 0.5)',
    },
    layout: { visibility: 'none' },
  });

  safeAddLayer(map, {
    id: TOPONYMY_LABELS,
    type: 'symbol',
    source: NORMANDY_TOPONYMY_SOURCE,
    filter: ['!', ['has', 'point_count']],
    minzoom: 8,
    layout: {
      'text-field': ['concat', ['get', 'name'], '\n', ['get', 'suffix']],
      'text-size': ['interpolate', ['linear'], ['zoom'], 8, 9, 12, 12],
      'text-font': ['Noto Sans Regular'],
      'text-offset': [0, 1.2],
      'text-anchor': 'top',
      'text-allow-overlap': false,
      visibility: 'none',
    },
    paint: {
      'text-color': '#d4c9a8',
      'text-halo-color': 'rgba(10, 12, 18, 0.85)',
      'text-halo-width': 1.5,
      'text-opacity': 0.7,
    },
  });
}

// ---------------------------------------------------------------------------
// Master initializer — call once after base layers are set up
// ---------------------------------------------------------------------------

export function addAllNormandyLayers(map: MaplibreMap, theme: 'dark' | 'parchment' = 'dark') {
  addMicroRegionLayers(map);
  addExpansionLayers(map);
  addRiverLayers(map);
  addCultureLayers(map);
  addDensityLayers(map);
  addEvidenceLayers(map, theme);
  addToponymyLayers(map);
}

// ---------------------------------------------------------------------------
// Expansion filter — driven by normandySimYear from the store
// ---------------------------------------------------------------------------

export function setExpansionYearFilter(map: MaplibreMap, year: number) {
  const filter: maplibregl.FilterSpecification = ['<=', ['get', 'expansionYear'], year];
  for (const layerId of [EXPANSION_FILL, EXPANSION_STROKE, EXPANSION_LABELS]) {
    if (map.getLayer(layerId)) {
      map.setFilter(layerId, filter);
    }
  }
}
