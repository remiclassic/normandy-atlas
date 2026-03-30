import { atlasRouteSegments } from '@/data/atlas/route-segments';
import { atlasJourneys } from '@/data/atlas/journeys';
import { getPlaceCoords } from '@/core/places/engine';
import type {
  RouteSegment,
  ResolvedSegment,
  Journey,
  ResolvedJourney,
  SegmentKind,
} from '@/core/types';

const segmentMap = new Map<string, RouteSegment>(atlasRouteSegments.map((s) => [s.id, s]));
const journeyMap = new Map<string, Journey>(atlasJourneys.map((j) => [j.id, j]));

function resolveSegment(segment: RouteSegment): ResolvedSegment | null {
  const path = segment.pathCoordinates;
  if (path && path.length >= 2) {
    const sourceCoords = path[0];
    const targetCoords = path[path.length - 1];
    return { ...segment, sourceCoords, targetCoords };
  }
  const sourceCoords = getPlaceCoords(segment.fromPlaceId);
  const targetCoords = getPlaceCoords(segment.toPlaceId);
  if (!sourceCoords || !targetCoords) return null;
  return { ...segment, sourceCoords, targetCoords };
}

export function getSegment(segmentId: string): RouteSegment | undefined {
  return segmentMap.get(segmentId);
}

export interface GetActiveSegmentsOptions {
  /**
   * When true, `yearRange` on exploration segments filters by simulation year (strict timeline).
   * When false (default), exploration routes show for the whole era; other kinds still respect `yearRange`.
   */
  explorationYearStrict?: boolean;
}

export function getActiveSegments(
  eraId: string,
  simYear?: number,
  options?: GetActiveSegmentsOptions,
): ResolvedSegment[] {
  const explorationStrict = options?.explorationYearStrict === true;
  const results: ResolvedSegment[] = [];
  for (const seg of atlasRouteSegments) {
    if (!seg.eraIds.includes(eraId)) continue;
    if (simYear != null && seg.yearRange) {
      const skipYearForExploration = seg.kind === 'exploration' && !explorationStrict;
      if (!skipYearForExploration) {
        if (simYear < seg.yearRange[0] || simYear > seg.yearRange[1]) continue;
      }
    }
    const resolved = resolveSegment(seg);
    if (resolved) results.push(resolved);
  }
  return results;
}

export function getSegmentsByKind(eraId: string, kind: SegmentKind): ResolvedSegment[] {
  return getActiveSegments(eraId).filter((s) => s.kind === kind);
}

export function getSegmentsForJourney(journeyId: string): ResolvedSegment[] {
  const journey = journeyMap.get(journeyId);
  if (!journey) return [];

  const results: ResolvedSegment[] = [];
  for (const segId of journey.segmentIds) {
    const seg = segmentMap.get(segId);
    if (!seg) continue;
    const resolved = resolveSegment(seg);
    if (resolved) results.push(resolved);
  }
  return results;
}

export function getJourney(journeyId: string): Journey | undefined {
  return journeyMap.get(journeyId);
}

export function getActiveJourneys(eraId: string): ResolvedJourney[] {
  const results: ResolvedJourney[] = [];
  for (const journey of atlasJourneys) {
    if (!journey.eraIds.includes(eraId)) continue;
    const segments = getSegmentsForJourney(journey.id);
    if (segments.length > 0) {
      results.push({ ...journey, segments });
    }
  }
  return results;
}

export function getAllJourneys(): Journey[] {
  return atlasJourneys;
}

export function isOceanCrossing(segment: ResolvedSegment): boolean {
  if (segment.pathCoordinates?.length) return false;
  const longDiff = Math.abs(segment.sourceCoords[0] - segment.targetCoords[0]);
  return longDiff > 10;
}
