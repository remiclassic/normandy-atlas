import { getSegmentsForJourney, isOceanCrossing } from '@/core/routes/engine';
import type { ResolvedSegment } from '@/core/types';

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
const EARTH_R = 6371;

function haversine(a: [number, number], b: [number, number]): number {
  const dLat = (b[1] - a[1]) * DEG2RAD;
  const dLon = (b[0] - a[0]) * DEG2RAD;
  const lat1 = a[1] * DEG2RAD;
  const lat2 = b[1] * DEG2RAD;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_R * Math.asin(Math.sqrt(h));
}

/** Sample `n` points along the great-circle arc between two LngLat pairs. */
function sampleGreatCircle(
  from: [number, number],
  to: [number, number],
  n: number,
): [number, number][] {
  const lat1 = from[1] * DEG2RAD;
  const lon1 = from[0] * DEG2RAD;
  const lat2 = to[1] * DEG2RAD;
  const lon2 = to[0] * DEG2RAD;

  const d = 2 * Math.asin(
    Math.sqrt(
      Math.sin((lat2 - lat1) / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2,
    ),
  );

  if (d < 1e-10) return [from, to];

  const points: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    const a = Math.sin((1 - f) * d) / Math.sin(d);
    const b = Math.sin(f * d) / Math.sin(d);
    const x = a * Math.cos(lat1) * Math.cos(lon1) + b * Math.cos(lat2) * Math.cos(lon2);
    const y = a * Math.cos(lat1) * Math.sin(lon1) + b * Math.cos(lat2) * Math.sin(lon2);
    const z = a * Math.sin(lat1) + b * Math.sin(lat2);
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * RAD2DEG;
    const lon = Math.atan2(y, x) * RAD2DEG;
    points.push([lon, lat]);
  }
  return points;
}

function coordsEqual(a: [number, number], b: [number, number], eps = 1e-5): boolean {
  return Math.abs(a[0] - b[0]) < eps && Math.abs(a[1] - b[1]) < eps;
}

export interface FlythroughPolyline {
  /** Ordered lng/lat waypoints forming a continuous path. */
  points: [number, number][];
  /** Cumulative arc-length distances in km, same length as `points`. `distances[0] === 0`. */
  distances: number[];
  /** Total path length in km. */
  totalDistance: number;
}

/**
 * Threshold in km — if a segment's start is this far from the polyline's
 * current tip, it's a "branch from a junction we already passed" rather than
 * a continuation.  The builder will skip the backtracking portion and
 * connect directly to the segment's endpoint, keeping the camera smooth.
 */
const BACKTRACK_THRESHOLD_KM = 30;

/** Build a continuous polyline from an ordered list of resolved segments. */
export function buildPolylineFromSegments(segments: ResolvedSegment[]): FlythroughPolyline | null {
  if (segments.length === 0) return null;

  const points: [number, number][] = [];

  const append = (pt: [number, number]) => {
    if (points.length === 0 || !coordsEqual(points[points.length - 1], pt)) {
      points.push(pt);
    }
  };

  for (const seg of segments) {
    let segPoints: [number, number][];

    if (seg.pathCoordinates && seg.pathCoordinates.length >= 2) {
      segPoints = seg.pathCoordinates;
    } else if (isOceanCrossing(seg)) {
      segPoints = sampleGreatCircle(seg.sourceCoords, seg.targetCoords, 32);
    } else {
      segPoints = [seg.sourceCoords, seg.targetCoords];
    }

    if (points.length > 0) {
      const tip = points[points.length - 1];
      const segStart = segPoints[0];
      const jumpDist = haversine(tip, segStart);

      if (jumpDist > BACKTRACK_THRESHOLD_KM) {
        // Backtracking branch — skip intermediate waypoints and connect
        // directly to the segment endpoint so the camera doesn't bounce.
        append(segPoints[segPoints.length - 1]);
        continue;
      }
    }

    for (const pt of segPoints) {
      append(pt);
    }
  }

  if (points.length < 2) return null;

  const distances: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    distances.push(distances[i - 1] + haversine(points[i - 1], points[i]));
  }

  return { points, distances, totalDistance: distances[distances.length - 1] };
}

/** Convenience: resolve a journey ID into its flythrough polyline. */
export function getJourneyPolyline(journeyId: string): FlythroughPolyline | null {
  return buildPolylineFromSegments(getSegmentsForJourney(journeyId));
}

/** Interpolate a position along the polyline at parameter `t` in [0,1] (by arc-length). */
export function interpolatePolyline(
  poly: FlythroughPolyline,
  t: number,
): [number, number] {
  const d = Math.max(0, Math.min(1, t)) * poly.totalDistance;

  if (d <= 0) return poly.points[0];
  if (d >= poly.totalDistance) return poly.points[poly.points.length - 1];

  let lo = 0;
  let hi = poly.distances.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (poly.distances[mid] <= d) lo = mid;
    else hi = mid;
  }

  const segLen = poly.distances[hi] - poly.distances[lo];
  const f = segLen > 0 ? (d - poly.distances[lo]) / segLen : 0;
  const a = poly.points[lo];
  const b = poly.points[hi];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
}

/** Compute forward bearing (degrees, 0 = north, CW positive) at a polyline position. */
export function bearingAtPolyline(
  poly: FlythroughPolyline,
  t: number,
  lookAheadFraction = 0.02,
): number {
  const tA = Math.max(0, Math.min(1, t));
  const tB = Math.min(1, tA + lookAheadFraction);
  const a = interpolatePolyline(poly, tA);
  const b = interpolatePolyline(poly, tB);

  const dLon = (b[0] - a[0]) * DEG2RAD;
  const lat1 = a[1] * DEG2RAD;
  const lat2 = b[1] * DEG2RAD;
  const x = Math.sin(dLon) * Math.cos(lat2);
  const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return ((Math.atan2(x, y) * RAD2DEG) + 360) % 360;
}
