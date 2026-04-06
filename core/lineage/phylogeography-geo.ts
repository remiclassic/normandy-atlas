import type {
  HaplogroupMajorLetter,
  PhylogeographyEdge,
  PhylogeographyLetterDataset,
  PhylogeographyMapFocusId,
  PhylogeographyNode,
} from '@/core/types';

/** MapLibre GeoJSON feature `properties.kind` for phylogeography layers. */
export type PhylogeographyFeatureKind = 'phylo-edge' | 'phylo-node';

type PhyloNodeProps = {
  id: string;
  kind: 'phylo-node';
  label: string;
  profileId?: string;
};

type PhyloEdgeProps = {
  id: string;
  kind: 'phylo-edge';
};

const D2R = Math.PI / 180;

function sphericalInterp(
  lng1: number,
  lat1: number,
  lng2: number,
  lat2: number,
  segments: number,
): [number, number][] {
  const φ1 = lat1 * D2R;
  const λ1 = lng1 * D2R;
  const φ2 = lat2 * D2R;
  const λ2 = lng2 * D2R;
  const cx1 = Math.cos(φ1) * Math.cos(λ1);
  const cy1 = Math.cos(φ1) * Math.sin(λ1);
  const cz1 = Math.sin(φ1);
  const cx2 = Math.cos(φ2) * Math.cos(λ2);
  const cy2 = Math.cos(φ2) * Math.sin(λ2);
  const cz2 = Math.sin(φ2);
  const d = Math.sqrt((cx2 - cx1) ** 2 + (cy2 - cy1) ** 2 + (cz2 - cz1) ** 2);
  if (d < 1e-9) {
    return [
      [lng1, lat1],
      [lng2, lat2],
    ];
  }
  const out: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = cx1 + t * (cx2 - cx1);
    const y = cy1 + t * (cy2 - cy1);
    const z = cz1 + t * (cz2 - cz1);
    const len = Math.sqrt(x * x + y * y + z * z);
    const nx = x / len;
    const ny = y / len;
    const nz = z / len;
    const φ = Math.asin(Math.max(-1, Math.min(1, nz)));
    const λ = Math.atan2(ny, nx);
    out.push([λ / D2R, φ / D2R]);
  }
  return out;
}

function edgeSegments(lng1: number, lat1: number, lng2: number, lat2: number): number {
  const dx = Math.abs(lng2 - lng1);
  const dy = Math.abs(lat2 - lat1);
  const approxDeg = Math.sqrt(dx * dx + dy * dy);
  return Math.max(8, Math.min(64, Math.round(approxDeg / 3)));
}

export function isHaplogroupMajorLetter(v: string): v is HaplogroupMajorLetter {
  return v.length === 1 && v >= 'A' && v <= 'Z';
}

const PHYLO_MAP_FOCUS_IDS: readonly PhylogeographyMapFocusId[] = ['norman-normandy'];

export function isPhylogeographyMapFocusId(v: string): v is PhylogeographyMapFocusId {
  return (PHYLO_MAP_FOCUS_IDS as readonly string[]).includes(v);
}

function isPhyloNodeInView(n: PhylogeographyNode, focus: PhylogeographyMapFocusId | null): boolean {
  if (focus == null) {
    return n.onlyWhenFocus == null;
  }
  if (n.onlyWhenFocus != null) {
    return n.onlyWhenFocus === focus;
  }
  return n.omitWhenFocus !== focus;
}

function isPhyloEdgeInView(e: PhylogeographyEdge, focus: PhylogeographyMapFocusId | null): boolean {
  if (focus == null) {
    return e.onlyWhenFocus == null;
  }
  if (e.onlyWhenFocus != null) {
    return e.onlyWhenFocus === focus;
  }
  return e.omitWhenFocus !== focus;
}

/** Focus options implied by this dataset (any node or edge using `onlyWhenFocus`). */
export function listPhylogeographyMapFocusIds(ds: PhylogeographyLetterDataset): PhylogeographyMapFocusId[] {
  const out = new Set<PhylogeographyMapFocusId>();
  for (const n of ds.nodes) {
    if (n.onlyWhenFocus) out.add(n.onlyWhenFocus);
  }
  for (const e of ds.edges) {
    if (e.onlyWhenFocus) out.add(e.onlyWhenFocus);
  }
  return [...out];
}

export function phylogeographyDatasetHasGeometry(
  ds: PhylogeographyLetterDataset,
  focus: PhylogeographyMapFocusId | null = null,
): boolean {
  return ds.nodes.some((n) => isPhyloNodeInView(n, focus));
}

export function buildPhylogeographyGeoJson(
  ds: PhylogeographyLetterDataset,
  focus: PhylogeographyMapFocusId | null = null,
): GeoJSON.FeatureCollection {
  const nodes = ds.nodes.filter((n) => isPhyloNodeInView(n, focus));
  const byId = new Map(nodes.map((n) => [n.id, n] as const));
  const features: GeoJSON.Feature[] = [];
  let edgeIdx = 0;

  for (const e of ds.edges) {
    if (!isPhyloEdgeInView(e, focus)) continue;
    const a = byId.get(e.fromId);
    const b = byId.get(e.toId);
    if (!a || !b) continue;
    const coords = sphericalInterp(a.lng, a.lat, b.lng, b.lat, edgeSegments(a.lng, a.lat, b.lng, b.lat));
    const fid = `edge-${e.fromId}-${e.toId}-${edgeIdx++}`;
    const props: PhyloEdgeProps = { id: fid, kind: 'phylo-edge' };
    features.push({
      type: 'Feature',
      id: fid,
      properties: props,
      geometry: { type: 'LineString', coordinates: coords },
    });
  }

  for (const n of ds.nodes) {
    const np: PhyloNodeProps = {
      id: n.id,
      kind: 'phylo-node',
      label: n.label,
      ...(n.profileId ? { profileId: n.profileId } : {}),
    };
    features.push({
      type: 'Feature',
      id: n.id,
      properties: np,
      geometry: { type: 'Point', coordinates: [n.lng, n.lat] },
    });
  }

  return { type: 'FeatureCollection', features };
}

export function bboxForPhylogeographyFeatures(
  fc: GeoJSON.FeatureCollection,
): [[number, number], [number, number]] | undefined {
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
