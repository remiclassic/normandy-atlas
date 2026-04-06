import type { MapLngLatBounds } from '@/lib/map-view-reader';
import type { RegionFeatureCollection } from '@/types';

type BBox = { minLng: number; minLat: number; maxLng: number; maxLat: number };

function ringBBox(ring: number[][]): BBox {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const pt of ring) {
    const lng = pt[0];
    const lat = pt[1];
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return { minLng, minLat, maxLng, maxLat };
}

function mergeIntoBox(box: BBox, r: BBox): void {
  box.minLng = Math.min(box.minLng, r.minLng);
  box.minLat = Math.min(box.minLat, r.minLat);
  box.maxLng = Math.max(box.maxLng, r.maxLng);
  box.maxLat = Math.max(box.maxLat, r.maxLat);
}

function geometryBBox(geometry: RegionFeatureCollection['features'][0]['geometry']): BBox | null {
  if (geometry.type === 'Polygon') {
    let box: BBox | null = null;
    for (const ring of geometry.coordinates) {
      const r = ringBBox(ring as number[][]);
      if (!box) box = { ...r };
      else mergeIntoBox(box, r);
    }
    return box;
  }
  if (geometry.type === 'MultiPolygon') {
    let box: BBox | null = null;
    for (const poly of geometry.coordinates) {
      for (const ring of poly) {
        const r = ringBBox(ring as number[][]);
        if (!box) box = { ...r };
        else mergeIntoBox(box, r);
      }
    }
    return box;
  }
  return null;
}

function bboxesOverlap(a: BBox, view: MapLngLatBounds): boolean {
  return !(
    a.maxLng < view.west ||
    a.minLng > view.east ||
    a.maxLat < view.south ||
    a.minLat > view.north
  );
}

/** Region feature IDs whose polygon AABB overlaps the map viewport (fast heuristic). */
export function listRegionIdsIntersectingBounds(
  fc: RegionFeatureCollection,
  bounds: MapLngLatBounds,
  maxResults = 8,
): string[] {
  const ids: string[] = [];
  for (const f of fc.features) {
    const id = f.properties?.id;
    if (!id || typeof id !== 'string') continue;
    const bb = geometryBBox(f.geometry);
    if (!bb || !bboxesOverlap(bb, bounds)) continue;
    ids.push(id);
    if (ids.length >= maxResults) break;
  }
  return ids;
}
