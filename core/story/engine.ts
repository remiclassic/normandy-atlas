import { atlasStoryBeats } from '@/data/atlas/story-beats';
import { STORY_BEAT_ILLUSTRATIONS } from '@/data/atlas/story-beat-illustrations';
import { getEraRange } from '@/core/era/engine';
import { getPlace, getPlaceCoords } from '@/core/places/engine';
import { getAtlasRegion } from '@/core/regions/engine';
import { getSegment } from '@/core/routes/engine';
import type {
  StoryBeat,
  PlaceWithState,
  RegionWithState,
  ResolvedSegment,
} from '@/core/types';

/** Original file order — used to break ties when several beats share the same sort year. */
const beatSourceOrder = new Map<StoryBeat, number>(
  atlasStoryBeats.map((beat, index) => [beat, index]),
);

function storyBeatTimelineYear(beat: StoryBeat): number {
  if (beat.anchorYear != null) return beat.anchorYear;
  return getEraRange(beat.eraId)?.start ?? 0;
}

function compareStoryBeatsChronologically(a: StoryBeat, b: StoryBeat): number {
  const ya = storyBeatTimelineYear(a);
  const yb = storyBeatTimelineYear(b);
  if (ya !== yb) return ya - yb;
  return (beatSourceOrder.get(a) ?? 0) - (beatSourceOrder.get(b) ?? 0);
}

export function getStoryBeats(arcId?: string | null): StoryBeat[] {
  const list = !arcId
    ? [...atlasStoryBeats]
    : atlasStoryBeats.filter((b) => b.arcId === arcId);
  list.sort(compareStoryBeatsChronologically);
  return list.map((b) => {
    const ill = STORY_BEAT_ILLUSTRATIONS[b.id];
    return ill ? { ...b, illustration: ill } : b;
  });
}

export function getBeat(index: number, arcId?: string | null): StoryBeat | undefined {
  const beats = getStoryBeats(arcId);
  return beats[index];
}

export function getBeatCount(arcId?: string | null): number {
  return getStoryBeats(arcId).length;
}

/**
 * Resolve a beat id to its arc and chronological step index.
 * Searches the beat's own arc first; falls back to the full timeline.
 */
export function getStoryStepForBeatId(
  beatId: string,
): { arc: string | null; stepIndex: number } | undefined {
  const beat = atlasStoryBeats.find((b) => b.id === beatId);
  if (!beat) return undefined;

  const arc = beat.arcId ?? null;
  const beats = getStoryBeats(arc);
  const idx = beats.findIndex((b) => b.id === beatId);
  if (idx !== -1) return { arc, stepIndex: idx };

  if (arc) {
    const all = getStoryBeats(null);
    const fallbackIdx = all.findIndex((b) => b.id === beatId);
    if (fallbackIdx !== -1) return { arc: null, stepIndex: fallbackIdx };
  }
  return undefined;
}

export interface ResolvedStoryFocus {
  places: PlaceWithState[];
  regions: RegionWithState[];
  segments: ResolvedSegment[];
  journeyIds: string[];
}

/**
 * Apply the impact-variant overlay when appropriate, returning a beat with
 * effective focus / copy / camera.  Pure function — safe to call from any context.
 */
export function getEffectiveStoryBeat(
  beat: StoryBeat,
  opts: { cinematic: boolean; storyViewMode: 'exploration' | 'impact' },
): StoryBeat {
  if (!opts.cinematic || opts.storyViewMode !== 'impact' || !beat.impactVariant) return beat;
  const v = beat.impactVariant;
  return {
    ...beat,
    focus: v.focus ? { ...beat.focus, ...v.focus } : beat.focus,
    copy: {
      title: v.copy?.title ?? beat.copy.title,
      body: v.copy?.body ?? beat.copy.body,
    },
    camera: v.camera ? { ...beat.camera, ...v.camera } : beat.camera,
  };
}

/**
 * Resolve a [lng, lat] anchor for a beat's illustration.
 * Tries focus place coordinates first, then falls back to camera center.
 */
export function resolveStoryIllustrationLngLat(beat: StoryBeat): [number, number] | null {
  for (const placeId of beat.focus.placeIds) {
    const coords = getPlaceCoords(placeId);
    if (coords) return coords;
  }
  if (beat.camera.center) return beat.camera.center;
  return null;
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
