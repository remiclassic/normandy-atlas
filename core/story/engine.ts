import { atlasStoryBeats } from '@/data/atlas/story-beats';
import { getPlace, getPlaceCoords } from '@/core/places/engine';
import { getAtlasRegion } from '@/core/regions/engine';
import { getSegment } from '@/core/routes/engine';
import type {
  StoryBeat,
  PlaceWithState,
  RegionWithState,
  ResolvedSegment,
} from '@/core/types';

export function getStoryBeats(arcId?: string | null): StoryBeat[] {
  if (!arcId) return atlasStoryBeats;
  return atlasStoryBeats.filter((b) => b.arcId === arcId);
}

export function getBeat(index: number, arcId?: string | null): StoryBeat | undefined {
  const beats = getStoryBeats(arcId);
  return beats[index];
}

export function getBeatCount(arcId?: string | null): number {
  return getStoryBeats(arcId).length;
}

export interface ResolvedStoryFocus {
  places: PlaceWithState[];
  regions: RegionWithState[];
  segments: ResolvedSegment[];
  journeyIds: string[];
}

export function resolveStoryFocus(beat: StoryBeat): ResolvedStoryFocus {
  const places: PlaceWithState[] = [];
  for (const placeId of beat.focus.placeIds) {
    const place = getPlace(placeId);
    if (!place) continue;
    const state = place.eraStates[beat.eraId];
    if (state) {
      places.push({ ...place, currentState: state });
    }
  }

  const regions: RegionWithState[] = [];
  for (const regionId of beat.focus.regionIds) {
    const region = getAtlasRegion(regionId);
    if (!region) continue;
    const state = region.eraStates[beat.eraId];
    if (state) {
      regions.push({ ...region, currentState: state });
    }
  }

  const segments: ResolvedSegment[] = [];
  for (const segId of beat.focus.routeSegmentIds) {
    const seg = getSegment(segId);
    if (!seg) continue;
    const sourceCoords = getPlaceCoords(seg.fromPlaceId);
    const targetCoords = getPlaceCoords(seg.toPlaceId);
    if (sourceCoords && targetCoords) {
      segments.push({ ...seg, sourceCoords, targetCoords });
    }
  }

  return {
    places,
    regions,
    segments,
    journeyIds: beat.focus.journeyIds ?? [],
  };
}
