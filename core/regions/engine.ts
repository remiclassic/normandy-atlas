import { atlasRegions } from '@/data/atlas/regions';
import { atlasRegionsGeoJson } from '@/data/atlas/regions-geo';
import { COLONIAL_ERA_IDS } from '@/data/atlas/new-france-timeline';
import type { AtlasRegion, RegionEraState, RegionWithState } from '@/core/types';
import type { RegionFeatureCollection } from '@/types';

const regionMap = new Map<string, AtlasRegion>(atlasRegions.map((r) => [r.id, r]));

export function getAtlasRegion(regionId: string): AtlasRegion | undefined {
  return regionMap.get(regionId);
}

export function getRegionEraState(regionId: string, eraId: string): RegionEraState | undefined {
  return regionMap.get(regionId)?.eraStates[eraId];
}

export function getVisibleRegions(eraId: string): RegionWithState[] {
  const results: RegionWithState[] = [];
  for (const region of atlasRegions) {
    const state = region.eraStates[eraId];
    if (state && state.visibility !== 'hidden') {
      results.push({ ...region, currentState: state });
    }
  }
  return results;
}

export function getAtlasRegionsGeoJsonForEra(eraId: string): RegionFeatureCollection {
  const visibleIds = new Set<string>();
  for (const region of atlasRegions) {
    if (region.eraStates[eraId]) {
      visibleIds.add(region.id);
    }
  }

  return {
    type: 'FeatureCollection',
    features: atlasRegionsGeoJson.features.filter((f) => visibleIds.has(f.properties.id)),
  };
}

/**
 * Year-aware variant for colonial eras.  Post-Utrecht (1713+) hides the full
 * Acadia polygon and shows only Île Royale & Île Saint-Jean.
 */
export function getAtlasRegionsForColonialYear(eraId: string, year: number): RegionFeatureCollection {
  if (!COLONIAL_ERA_IDS.has(eraId)) return getAtlasRegionsGeoJsonForEra(eraId);

  const visibleIds = new Set<string>();
  for (const region of atlasRegions) {
    if (region.eraStates[eraId]) {
      visibleIds.add(region.id);
    }
  }

  if (year >= 1713) {
    visibleIds.delete('acadia');
    visibleIds.add('ile-royale');
  } else {
    visibleIds.delete('ile-royale');
  }

  return {
    type: 'FeatureCollection',
    features: atlasRegionsGeoJson.features.filter((f) => visibleIds.has(f.properties.id)),
  };
}

export function getRegionsByLayer(layer: string, eraId: string): RegionWithState[] {
  const results: RegionWithState[] = [];
  for (const region of atlasRegions) {
    if (region.layer !== layer) continue;
    const state = region.eraStates[eraId];
    if (state && state.visibility !== 'hidden') {
      results.push({ ...region, currentState: state });
    }
  }
  return results;
}
