import { regionsGeoJson } from '@/data/regions-geo';
import { regionRecords } from '@/data/regions-content';
import { settlements } from '@/data/settlements';
import { routeRecords } from '@/data/routes';
import type { RegionFeatureCollection, Settlement, RouteRecord, RouteKind } from '@/types';
import { getFeatureIconType } from '@/lib/atlas/getFeatureIconType';

export function getRegionsGeoJsonForEra(eraId: string): RegionFeatureCollection {
  const visibleIds = new Set<string>();
  for (const rec of regionRecords) {
    if (rec.eraVisibility.includes(eraId)) {
      visibleIds.add(rec.id);
    }
  }

  return {
    type: 'FeatureCollection',
    features: regionsGeoJson.features.filter((f) => visibleIds.has(f.properties.id)),
  };
}

export function getSettlementsForEra(eraId: string): Settlement[] {
  return settlements.filter((s) => s.eraVisibility.includes(eraId));
}

export function buildSettlementsGeoJson(items: Settlement[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: items.map((s) => ({
      type: 'Feature' as const,
      properties: {
        id: s.id,
        name: s.name,
        regionId: s.regionId,
        category: s.category ?? 'other',
        atlasIcon: getFeatureIconType({ category: s.category, label: s.name }),
      },
      geometry: {
        type: 'Point' as const,
        coordinates: s.coordinates,
      },
    })),
  };
}

export function getSettlementsGeoJsonForEra(eraId: string): GeoJSON.FeatureCollection {
  return buildSettlementsGeoJson(getSettlementsForEra(eraId));
}

export function getRoutesForEra(
  eraId: string,
  categories?: RouteKind[],
): RouteRecord[] {
  return routeRecords.filter((r) => {
    const eraMatch = r.eraId === eraId || (r.eraIds?.includes(eraId) ?? false);
    if (!eraMatch) return false;
    if (categories && categories.length > 0) {
      return categories.includes(r.kind);
    }
    return true;
  });
}
