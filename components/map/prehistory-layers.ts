import type { Map as MaplibreMap } from 'maplibre-gl';
import { atlasPlaces } from '@/data/atlas/places';
import type { Place } from '@/core/types';
import { getFeatureIconType } from '@/lib/atlas/getFeatureIconType';
import type { MapDataTheme } from './map-layers';

// ---------------------------------------------------------------------------
// Source IDs
// ---------------------------------------------------------------------------
export const PREHISTORIC_SITES_SOURCE = 'prehistoric-sites';
export const HILLFORTS_SOURCE = 'hillforts';
export const ANCIENT_TERRAIN_SOURCE = 'ancient-terrain';

// ---------------------------------------------------------------------------
// Layer IDs — referenced by layerConfigs for toggle wiring
// ---------------------------------------------------------------------------
export const PREHISTORIC_SITES_CIRCLES = 'prehistoric-sites-circles';
export const PREHISTORIC_SITES_LABELS = 'prehistoric-sites-labels';
export const HILLFORTS_CIRCLES = 'hillforts-circles';
export const HILLFORTS_LABELS = 'hillforts-labels';
export const ANCIENT_TERRAIN_FILL = 'ancient-terrain-fill';

// ---------------------------------------------------------------------------
// GeoJSON builders — derive from atlas places at boot time
// ---------------------------------------------------------------------------

function buildSitesGeoJson(kind: Place['kind']): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: atlasPlaces
      .filter((p) => p.kind === kind && p.coordinates)
      .map((p) => {
        const eraKeys = Object.keys(p.eraStates);
        const firstState = p.eraStates[eraKeys[0]];
        return {
          type: 'Feature' as const,
          properties: {
            id: p.id,
            name: firstState?.label ?? p.id,
            tags: firstState?.affiliationTags?.join(', ') ?? '',
            atlasIcon: getFeatureIconType({ kind, label: firstState?.label }),
          },
          geometry: {
            type: 'Point' as const,
            coordinates: p.coordinates!,
          },
        };
      }),
  };
}

const ANCIENT_FOREST_TERRAIN: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { kind: 'forest', label: 'Ancient forests' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.8, 48.7],
            [-0.3, 48.6],
            [0.2, 48.8],
            [0.5, 49.1],
            [0.3, 49.3],
            [-0.2, 49.3],
            [-0.6, 49.1],
            [-0.8, 48.7],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { kind: 'marsh', label: 'Seine marshlands' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0.0, 49.35],
            [0.5, 49.30],
            [0.9, 49.38],
            [1.2, 49.50],
            [0.8, 49.55],
            [0.3, 49.50],
            [0.0, 49.35],
          ],
        ],
      },
    },
  ],
};

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
// Layer registration
// ---------------------------------------------------------------------------

function addPrehistoricSiteLayers(map: MaplibreMap, theme: MapDataTheme) {
  const imgTheme = theme === 'parchment' ? 'parchment' : 'dark';

  safeAddSource(map, PREHISTORIC_SITES_SOURCE, {
    type: 'geojson',
    data: buildSitesGeoJson('megalith'),
  });

  safeAddLayer(map, {
    id: PREHISTORIC_SITES_CIRCLES,
    type: 'symbol',
    source: PREHISTORIC_SITES_SOURCE,
    layout: {
      'icon-image': ['concat', 'atlas-icon-', ['get', 'atlasIcon'], `-${imgTheme}`],
      'icon-size': ['interpolate', ['linear'], ['zoom'], 4, 0.4, 8, 0.55, 12, 0.7],
      'icon-allow-overlap': true,
      visibility: 'none',
    },
    paint: {
      'icon-opacity': 0.85,
    },
  });

  safeAddLayer(map, {
    id: PREHISTORIC_SITES_LABELS,
    type: 'symbol',
    source: PREHISTORIC_SITES_SOURCE,
    layout: {
      visibility: 'none',
      'text-field': ['get', 'name'],
      'text-font': ['Open Sans Semibold'],
      'text-size': 10,
      'text-offset': [0, 1.2],
      'text-anchor': 'top',
      'text-max-width': 12,
    },
    paint: {
      'text-color': '#d4c8a0',
      'text-opacity': 0.75,
      'text-halo-color': 'rgba(0,0,0,0.7)',
      'text-halo-width': 1,
    },
  });
}

function addHillfortLayers(map: MaplibreMap, theme: MapDataTheme) {
  const imgTheme = theme === 'parchment' ? 'parchment' : 'dark';

  safeAddSource(map, HILLFORTS_SOURCE, {
    type: 'geojson',
    data: buildSitesGeoJson('hillfort'),
  });

  safeAddLayer(map, {
    id: HILLFORTS_CIRCLES,
    type: 'symbol',
    source: HILLFORTS_SOURCE,
    layout: {
      'icon-image': ['concat', 'atlas-icon-', ['get', 'atlasIcon'], `-${imgTheme}`],
      'icon-size': ['interpolate', ['linear'], ['zoom'], 4, 0.45, 8, 0.6, 12, 0.75],
      'icon-allow-overlap': true,
      visibility: 'none',
    },
    paint: {
      'icon-opacity': 0.9,
    },
  });

  safeAddLayer(map, {
    id: HILLFORTS_LABELS,
    type: 'symbol',
    source: HILLFORTS_SOURCE,
    layout: {
      visibility: 'none',
      'text-field': ['get', 'name'],
      'text-font': ['Open Sans Semibold'],
      'text-size': 11,
      'text-offset': [0, 1.3],
      'text-anchor': 'top',
      'text-max-width': 12,
    },
    paint: {
      'text-color': '#c49a6c',
      'text-opacity': 0.8,
      'text-halo-color': 'rgba(0,0,0,0.7)',
      'text-halo-width': 1,
    },
  });
}

function addAncientTerrainLayers(map: MaplibreMap) {
  safeAddSource(map, ANCIENT_TERRAIN_SOURCE, {
    type: 'geojson',
    data: ANCIENT_FOREST_TERRAIN,
  });

  safeAddLayer(map, {
    id: ANCIENT_TERRAIN_FILL,
    type: 'fill',
    source: ANCIENT_TERRAIN_SOURCE,
    paint: {
      'fill-color': [
        'match',
        ['get', 'kind'],
        'forest', '#2d4a1e',
        'marsh', '#3a4a3a',
        '#3a3a2a',
      ],
      'fill-opacity': 0.15,
    },
    layout: { visibility: 'none' },
  });
}

// ---------------------------------------------------------------------------
// Composite registration — called from MapCanvas
// ---------------------------------------------------------------------------

export function addAllPrehistoryLayers(map: MaplibreMap, theme: MapDataTheme = 'dark') {
  addPrehistoricSiteLayers(map, theme);
  addHillfortLayers(map, theme);
  addAncientTerrainLayers(map);
}
