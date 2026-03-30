import { atlasRegions } from '@/data/atlas/regions';
import { atlasRegionsGeoJson } from '@/data/atlas/regions-geo';
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
