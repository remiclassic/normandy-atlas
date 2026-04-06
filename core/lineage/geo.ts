import { atlasRegionsGeoJson } from '@/data/atlas/regions-geo';
import type {
  HaplogroupProfile,
  LineageConfidenceLevel,
  LineageEraLens,
  LineageRegionRelevance,
} from '@/core/types';

const LINEAGE_LENS_SET = new Set<LineageEraLens>([
  'deep',
  'antiquity',
  'early_medieval',
  'high_medieval',
  'colonial',
]);

export function isValidLineageEraLens(v: string | null | undefined): v is LineageEraLens {
  return typeof v === 'string' && LINEAGE_LENS_SET.has(v as LineageEraLens);
}

type LineageGeoFeature = GeoJSON.Feature<
  GeoJSON.Point | GeoJSON.LineString,
  | {
      id: string;
      kind: 'lineage-region';
      profileId: string;
      regionId: string;
      relevanceType: LineageRegionRelevance;
      confidence: LineageConfidenceLevel;
    }
  | {
      id: string;
      kind: 'lineage-corridor';
      profileId: string;
      confidence: LineageConfidenceLevel;
    }
>;

const LENS_RANGES: Record<LineageEraLens, readonly [number, number]> = {
  deep: [-100_000, -3000],
  antiquity: [-3000, 500],
  early_medieval: [500, 1000],
  high_medieval: [1000, 1350],
  colonial: [1500, 1800],
};

function overlapsLens(start?: number, end?: number, lens?: LineageEraLens): boolean {
  if (!lens) return true;
  const [lo, hi] = LENS_RANGES[lens];
  const s = start ?? lo;
  const e = end ?? hi;
  return e >= lo && s <= hi;
}

function ringCentroid(ring: [number, number][]): [number, number] {
  let x = 0;
  let y = 0;
  for (const [lng, lat] of ring) {
    x += lng;
    y += lat;
  }
  const n = ring.length || 1;
  return [x / n, y / n];
}

export function getRegionCentroid(regionId: string): [number, number] | undefined {
  const f = atlasRegionsGeoJson.features.find((x) => (x.properties as { id?: string })?.id === regionId);
  if (!f) return undefined;
  const g = f.geometry;
  if (g.type === 'Polygon') return ringCentroid(g.coordinates[0] as [number, number][]);
  if (g.type === 'MultiPolygon') return ringCentroid((g.coordinates[0] as [number, number][][])[0]);
  return undefined;
}

export function buildLineageMapGeoJson(
  profile: HaplogroupProfile,
  eraLens?: LineageEraLens
): GeoJSON.FeatureCollection {
  const features: LineageGeoFeature[] = [];
  const links = profile.associatedRegionLinks ?? [];
  const corridorCoords: [number, number][] = [];
  let idx = 0;

  for (const link of links) {
    if (!overlapsLens(link.startYear, link.endYear, eraLens)) continue;
    const c = getRegionCentroid(link.regionId);
    if (!c) continue;
    const fid = `${profile.id}-${link.regionId}-${idx++}`;
    features.push({
      type: 'Feature',
      id: fid,
      properties: {
        id: fid,
        kind: 'lineage-region',
        profileId: profile.id,
        regionId: link.regionId,
        relevanceType: link.relevanceType,
        confidence: link.confidence,
      },
      geometry: { type: 'Point', coordinates: c },
    });
    if (link.relevanceType === 'migration' || link.relevanceType === 'origin') corridorCoords.push(c);
  }

  if (corridorCoords.length >= 2) {
    const cid = `${profile.id}-corridor`;
    features.push({
      type: 'Feature',
      id: cid,
      properties: {
        id: cid,
        kind: 'lineage-corridor',
        profileId: profile.id,
        confidence:
          corridorCoords.length > 0
            ? links.find((l) => l.relevanceType === 'migration')?.confidence ?? 'medium'
            : 'low',
      },
      geometry: { type: 'LineString', coordinates: corridorCoords },
    });
  }

  return { type: 'FeatureCollection', features };
}

export function bboxForLineageFeatures(fc: GeoJSON.FeatureCollection): [[number, number], [number, number]] | undefined {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const f of fc.features) {
    const g = f.geometry as GeoJSON.Geometry;
    if (g.type === 'Point') {
      const [lng, lat] = g.coordinates as [number, number];
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    }
    if (g.type === 'LineString') {
      for (const [lng, lat] of g.coordinates as [number, number][]) {
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      }
    }
  }
  if (!Number.isFinite(minLng)) return undefined;
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}
