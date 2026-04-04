import { atlasRegions } from '@/data/atlas/regions';
import { atlasRegionsGeoJson } from '@/data/atlas/regions-geo';
import { COLONIAL_ERA_IDS } from '@/data/atlas/new-france-timeline';
import { VIKING_TERRITORY_TIME_RULES } from '@/data/atlas/viking-timeline-phases';
import type { AtlasRegion, RegionEraState, RegionWithState } from '@/core/types';
import type { RegionFeatureCollection } from '@/types';
import { blendTintColor, dominantStrandsSummary } from '@/lib/cultural-origins';
import type { AtlasLocale } from '@/core/types';

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

const vikingRuleMap = new Map(VIKING_TERRITORY_TIME_RULES.map((r) => [r.regionId, r]));

const _vikingFadeRegionIds: readonly string[] = VIKING_TERRITORY_TIME_RULES.map((r) => r.regionId);

/** All region IDs governed by Viking territory time rules (for clearing fade state). */
export function getVikingTerritoryFadeRegionIds(): readonly string[] {
  return _vikingFadeRegionIds;
}

export type VikingFadeState = 'none' | 'before' | 'after';

/**
 * For each region that has a Viking territory time rule, compute whether it is
 * in faded-before, faded-after, or active (none) state for the given sim year.
 * Returns a Map of regionId → numeric opacity multiplier (0 = fully faded, 1 = active).
 */
export function getVikingTerritoryFadeStates(year: number): Map<string, number> {
  const result = new Map<string, number>();
  for (const rule of VIKING_TERRITORY_TIME_RULES) {
    let fade = 1;
    if (rule.fadedBefore != null && year < rule.fadedBefore) {
      fade = 0.35;
    } else if (rule.fadedAfter != null && year >= rule.fadedAfter) {
      fade = 0.35;
    }
    result.set(rule.regionId, fade);
  }
  return result;
}

/**
 * Year-aware variant for Viking-movement eras. Hides or includes influence-zone
 * regions (Danelaw, Kievan Rus, Normandy, etc.) depending on `simYear`.
 */
export function getAtlasRegionsForVikingSimYear(eraId: string, year: number): RegionFeatureCollection {
  const base = getAtlasRegionsGeoJsonForEra(eraId);

  return {
    type: 'FeatureCollection',
    features: base.features.filter((f) => {
      const rule = vikingRuleMap.get(f.properties.id);
      if (!rule) return true;
      if (rule.visibleAfter != null && year < rule.visibleAfter) return false;
      if (rule.visibleBefore != null && year >= rule.visibleBefore) return false;
      return true;
    }),
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

/**
 * Enrich a RegionFeatureCollection with cultural-origin tint colors and
 * hover summary strings for the given era + locale. Properties `culturalTint`
 * and `culturalHoverSummary` are attached only to features whose AtlasRegion
 * has culturalInfluenceByEra data for the era.
 */
export function enrichRegionsWithCulturalOrigins(
  geojson: RegionFeatureCollection,
  eraId: string,
  locale: AtlasLocale,
  basemap: 'dark' | 'parchment' = 'dark',
): RegionFeatureCollection {
  return {
    type: 'FeatureCollection',
    features: geojson.features.map((f) => {
      const region = regionMap.get(f.properties.id);
      const blend = region?.culturalInfluenceByEra?.[eraId];
      if (!blend || blend.length === 0) return f;
      return {
        ...f,
        properties: {
          ...f.properties,
          culturalTint: blendTintColor(blend, basemap),
          culturalHoverSummary: dominantStrandsSummary(blend, locale, 3),
        },
      };
    }),
  };
}
