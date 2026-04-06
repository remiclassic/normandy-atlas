import type { Feature, FeatureCollection } from 'geojson';
import type { DeepOriginMigrationDef, DeepOriginSiteDef } from './types';

export type TimelineWindowBP = { min: number; max: number };

export const DEEP_ORIGINS_TIMELINE_FULL: TimelineWindowBP = { min: 0, max: 48_000 };

function overlaps(a: { min: number; max: number }, b: { min: number; max: number }): boolean {
  return a.min <= b.max && a.max >= b.min;
}

export function siteVisibleInTimeline(site: DeepOriginSiteDef, window: TimelineWindowBP): boolean {
  const y = site.approxYearBP;
  return y >= window.min && y <= window.max;
}

export function migrationVisibleInTimeline(
  mig: DeepOriginMigrationDef,
  window: TimelineWindowBP,
): boolean {
  return overlaps(
    { min: mig.minYearBP, max: mig.maxYearBP },
    { min: window.min, max: window.max },
  );
}

export function buildDeepOriginsSitesGeoJson(
  sites: DeepOriginSiteDef[],
  opts: {
    timeline: TimelineWindowBP;
    categoryId: string | null;
    selectedId: string | null;
  },
): FeatureCollection {
  const { timeline, categoryId, selectedId } = opts;
  const features: Feature[] = [];

  for (const s of sites) {
    if (!siteVisibleInTimeline(s, timeline)) continue;
    const showAllSites = categoryId === 'archaeology' || categoryId === 'non_european';
    if (categoryId && !showAllSites && !s.categoryIds.includes(categoryId as never)) continue;
    features.push({
      type: 'Feature',
      id: s.id,
      geometry: { type: 'Point', coordinates: [s.lng, s.lat] },
      properties: {
        id: s.id,
        kind: 'deep-site',
        name: s.name,
        approxYearBP: s.approxYearBP,
        selected: s.id === selectedId ? 1 : 0,
      },
    });
  }

  return { type: 'FeatureCollection', features };
}

export function buildDeepOriginsMigrationsGeoJson(
  migrations: DeepOriginMigrationDef[],
  opts: { timeline: TimelineWindowBP; categoryId: string | null },
): FeatureCollection {
  const { timeline, categoryId } = opts;
  const features: Feature[] = [];

  for (const m of migrations) {
    if (!migrationVisibleInTimeline(m, timeline)) continue;
    if (categoryId && categoryId !== 'archaeology' && m.categoryId !== categoryId) continue;
    if (categoryId === 'archaeology' || categoryId === 'non_european') continue;
    if (m.coordinates.length < 2) continue;
    features.push({
      type: 'Feature',
      id: m.id,
      geometry: {
        type: 'LineString',
        coordinates: m.coordinates,
      },
      properties: {
        id: m.id,
        kind: 'deep-migration',
        categoryId: m.categoryId,
      },
    });
  }

  return { type: 'FeatureCollection', features };
}
