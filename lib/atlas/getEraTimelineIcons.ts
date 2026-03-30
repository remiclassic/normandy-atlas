import type { AtlasIconId } from './atlasIconId';
import { getFeatureIconType, markerKindToIconType } from './getFeatureIconType';
import { getVisiblePlaces } from '@/core/places/engine';
import { getSettlementsForEra } from '@/lib/content-builders';
import { getMarkersForEra } from '@/data/atlas/timeline-markers';
import { normanNodesGeoJson } from '@/data/norman-expansion';
import { getAtlasEra } from '@/core/era/engine';

export interface EraIconSummary {
  icon: AtlasIconId;
  count: number;
}

const MAX_ICON_TYPES = 8;

const cache = new Map<string, EraIconSummary[]>();

/**
 * Compute a deduplicated, capped summary of icon types present in a given era.
 * Pure function over static data — results are cached.
 */
export function getEraTimelineIcons(
  eraId: string,
  atlasMode: boolean,
): EraIconSummary[] {
  const key = `${atlasMode ? 'a' : 'l'}:${eraId}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const counts = new Map<AtlasIconId, number>();

  const bump = (id: AtlasIconId) => counts.set(id, (counts.get(id) ?? 0) + 1);

  // 1. Places / settlements
  if (atlasMode) {
    for (const p of getVisiblePlaces(eraId)) {
      bump(getFeatureIconType({ kind: p.kind, tags: p.currentState.affiliationTags, label: p.currentState.label }));
    }
  } else {
    for (const s of getSettlementsForEra(eraId)) {
      bump(getFeatureIconType({ category: s.category, label: s.name }));
    }
  }

  // 2. Timeline markers
  for (const m of getMarkersForEra(eraId)) {
    bump(markerKindToIconType(m.kind));
  }

  // 3. Norman nodes — include if their year range overlaps the era range
  const era = getAtlasEra(eraId);
  if (era) {
    const { start, end } = era.range;
    for (const f of (normanNodesGeoJson as unknown as GeoJSON.FeatureCollection).features) {
      const props = f.properties as { yearStart: number; yearEnd: number; siteKind?: string } | null;
      if (!props) continue;
      if (props.yearStart <= end && props.yearEnd >= start) {
        bump(getFeatureIconType({ siteKind: props.siteKind }));
      }
    }
  }

  // Build sorted summary, cap at MAX_ICON_TYPES
  const sorted = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_ICON_TYPES)
    .map(([icon, count]) => ({ icon, count }));

  cache.set(key, sorted);
  return sorted;
}
