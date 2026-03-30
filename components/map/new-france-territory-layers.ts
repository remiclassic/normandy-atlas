import type { Map as MaplibreMap, GeoJSONSource } from 'maplibre-gl';
import type { NFTerritoryCollection } from '@/data/atlas/new-france-territory-geo';

export const NF_TERRITORY_SOURCE = 'new-france-territory';
export const NF_TERRITORY_FILL = 'nf-territory-fill';
/** Three stroke layers — MapLibre does not support data-driven `line-dasharray`. */
export const NF_TERRITORY_STROKE_CORE = 'nf-territory-stroke-core';
export const NF_TERRITORY_STROKE_CLAIM = 'nf-territory-stroke-claim';
export const NF_TERRITORY_STROKE_INFLUENCE = 'nf-territory-stroke-influence';
export const NF_TERRITORY_STROKE_LAYERS = [
  NF_TERRITORY_STROKE_CORE,
  NF_TERRITORY_STROKE_CLAIM,
  NF_TERRITORY_STROKE_INFLUENCE,
] as const;
export const NF_TERRITORY_LABELS = 'nf-territory-labels';

const EMPTY_COLLECTION: NFTerritoryCollection = { type: 'FeatureCollection', features: [] };

const KIND_OPACITY: Record<string, number> = {
  core: 0.22,
  claim: 0.10,
  influence: 0.05,
};

const KIND_STROKE_OPACITY: Record<string, number> = {
  core: 0.5,
  claim: 0.3,
  influence: 0.15,
};

export function addNewFranceTerritoryLayers(map: MaplibreMap) {
  map.addSource(NF_TERRITORY_SOURCE, {
    type: 'geojson',
    data: EMPTY_COLLECTION as GeoJSON.FeatureCollection,
  });

  map.addLayer({
    id: NF_TERRITORY_FILL,
    type: 'fill',
    source: NF_TERRITORY_SOURCE,
    paint: {
      'fill-color': ['get', 'color'],
      'fill-opacity': [
        'match', ['get', 'kind'],
        'core', KIND_OPACITY.core,
        'claim', KIND_OPACITY.claim,
        KIND_OPACITY.influence,
      ],
    },
    layout: { visibility: 'none' },
  });

  // Separate line layers: dash pattern must be static (no data expressions on line-dasharray).
  map.addLayer({
    id: NF_TERRITORY_STROKE_CORE,
    type: 'line',
    source: NF_TERRITORY_SOURCE,
    filter: ['==', ['get', 'kind'], 'core'],
    paint: {
      'line-color': ['get', 'color'],
      'line-opacity': KIND_STROKE_OPACITY.core,
      'line-width': 2,
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  map.addLayer({
    id: NF_TERRITORY_STROKE_CLAIM,
    type: 'line',
    source: NF_TERRITORY_SOURCE,
    filter: ['==', ['get', 'kind'], 'claim'],
    paint: {
      'line-color': ['get', 'color'],
      'line-opacity': KIND_STROKE_OPACITY.claim,
      'line-width': 1.5,
      'line-dasharray': [4, 3],
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  map.addLayer({
    id: NF_TERRITORY_STROKE_INFLUENCE,
    type: 'line',
    source: NF_TERRITORY_SOURCE,
    filter: ['==', ['get', 'kind'], 'influence'],
    paint: {
      'line-color': ['get', 'color'],
      'line-opacity': KIND_STROKE_OPACITY.influence,
      'line-width': 1,
      'line-dasharray': [2, 4],
    },
    layout: {
      visibility: 'none',
      'line-join': 'round',
      'line-cap': 'round',
    },
  });

  map.addLayer({
    id: NF_TERRITORY_LABELS,
    type: 'symbol',
    source: NF_TERRITORY_SOURCE,
    layout: {
      visibility: 'none',
      'text-field': ['get', 'label'],
      'text-size': ['interpolate', ['linear'], ['zoom'], 3, 9, 6, 12, 9, 15],
      'text-font': ['Noto Sans Regular'],
      'text-letter-spacing': 0.08,
      'text-max-width': 10,
      'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#e0d6b8',
      'text-halo-color': 'rgba(10, 12, 18, 0.85)',
      'text-halo-width': 2,
      'text-opacity': 0.7,
    },
  });
}

export function updateNewFranceTerritorySource(map: MaplibreMap, geojson: NFTerritoryCollection) {
  const source = map.getSource(NF_TERRITORY_SOURCE) as GeoJSONSource | undefined;
  if (source) source.setData(geojson);
}
