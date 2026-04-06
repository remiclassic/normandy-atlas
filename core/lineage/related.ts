import type { HaplogroupProfile } from '@/core/types';
import { getHistoricalGroup } from '@/core/peoples/engine';
import { getAtlasRegion } from '@/core/regions/engine';
import { getJourney, getSegment } from '@/core/routes/engine';
import type { StoryLibraryMeta } from '@/data/atlas/story-library-meta';
import { storyLibraryMetaList } from '@/data/atlas/story-library-meta';

export type ResolvedStoryArcLink = StoryLibraryMeta & { arcId: string };

export function resolveLineageHistoricalGroups(profile: HaplogroupProfile) {
  return (profile.associatedHistoricalGroupIds ?? [])
    .map((id) => {
      const g = getHistoricalGroup(id);
      return g ? { id, group: g } : null;
    })
    .filter(Boolean) as { id: string; group: NonNullable<ReturnType<typeof getHistoricalGroup>> }[];
}

export function resolveLineageRegions(profile: HaplogroupProfile) {
  const ids = new Set((profile.associatedRegionLinks ?? []).map((l) => l.regionId));
  return [...ids]
    .map((id) => {
      const r = getAtlasRegion(id);
      return r ? { id, region: r } : null;
    })
    .filter(Boolean) as { id: string; region: NonNullable<ReturnType<typeof getAtlasRegion>> }[];
}

export function resolveLineageJourneys(profile: HaplogroupProfile) {
  return (profile.associatedJourneyIds ?? [])
    .map((id) => {
      const j = getJourney(id);
      return j ? { id, journey: j } : null;
    })
    .filter(Boolean) as { id: string; journey: NonNullable<ReturnType<typeof getJourney>> }[];
}

export function resolveLineageRouteSegments(profile: HaplogroupProfile) {
  return (profile.associatedSegmentIds ?? [])
    .map((id) => {
      const s = getSegment(id);
      return s ? { id, segment: s } : null;
    })
    .filter(Boolean) as { id: string; segment: NonNullable<ReturnType<typeof getSegment>> }[];
}

export function resolveLineageStoryArcs(profile: HaplogroupProfile): ResolvedStoryArcLink[] {
  const wanted = new Set(profile.associatedStoryArcIds ?? []);
  return storyLibraryMetaList.filter(
    (m): m is ResolvedStoryArcLink => m.arcId != null && wanted.has(m.arcId)
  );
}
