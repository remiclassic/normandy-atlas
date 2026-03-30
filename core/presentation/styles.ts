import type {
  SegmentKind,
  EvidenceLevel,
  PlaceKind,
  PlaceEraState,
  RegionEraState,
  RouteVisualStyle,
  RegionVisualStyle,
  PlaceVisualStyle,
  VisibilityLevel,
} from '@/core/types';

// --- Route Styles ---

const ROUTE_COLORS: Record<SegmentKind, [number, number, number]> = {
  migration: [196, 169, 98],
  trade: [168, 92, 59],
  exploration: [91, 127, 165],
  military: [139, 58, 58],
  invasion: [139, 58, 58],
  expansion: [168, 92, 59],
  settlement: [196, 169, 98],
  settlement_corridor: [196, 169, 98],
  river_corridor: [122, 114, 101],
  raid: [60, 160, 200],
  incursion: [80, 140, 180],
  maritime_corridor: [42, 190, 200],
};

/** Gold/amber override for Norman-origin exploration segments. */
export const NORMAN_ROUTE_COLOR: [number, number, number] = [212, 175, 55];

const BASE_ROUTE_WIDTH = 2;

export function getRouteStyle(kind: SegmentKind, weight: number): RouteVisualStyle {
  const color = ROUTE_COLORS[kind] ?? [122, 114, 101];
  return {
    color,
    width: BASE_ROUTE_WIDTH + (weight - 1) * 0.8,
    opacity: 0.7 + weight * 0.06,
    animated:
      kind === 'exploration' ||
      kind === 'migration' ||
      kind === 'raid' ||
      kind === 'incursion' ||
      kind === 'maritime_corridor',
  };
}

const EVIDENCE_OPACITY_SCALE: Record<EvidenceLevel, number> = {
  documentary_cluster: 1.0,
  archaeological: 0.9,
  synthesis: 0.72,
  tradition: 0.55,
};

const EVIDENCE_WIDTH_SCALE: Record<EvidenceLevel, number> = {
  documentary_cluster: 1.0,
  archaeological: 0.95,
  synthesis: 0.85,
  tradition: 0.7,
};

export const EVIDENCE_LABELS: Record<EvidenceLevel, string> = {
  documentary_cluster: 'High — multiple documentary sources',
  archaeological: 'High — archaeological evidence',
  synthesis: 'Medium — historical synthesis',
  tradition: 'Low — oral tradition / inference',
};

export function getRouteStyleWithEvidence(
  kind: SegmentKind,
  weight: number,
  evidence: EvidenceLevel,
): RouteVisualStyle {
  const base = getRouteStyle(kind, weight);
  return {
    ...base,
    opacity: base.opacity * EVIDENCE_OPACITY_SCALE[evidence],
    width: base.width * EVIDENCE_WIDTH_SCALE[evidence],
  };
}

export function getRouteHighlightStyleWithEvidence(
  kind: SegmentKind,
  weight: number,
  evidence: EvidenceLevel,
): RouteVisualStyle {
  const base = getRouteStyleWithEvidence(kind, weight, evidence);
  return {
    ...base,
    width: base.width * 1.6,
    opacity: Math.min(1, base.opacity + 0.2),
  };
}

export function getRouteDimStyleWithEvidence(
  kind: SegmentKind,
  weight: number,
  evidence: EvidenceLevel,
): RouteVisualStyle {
  const base = getRouteStyleWithEvidence(kind, weight, evidence);
  return {
    ...base,
    opacity: base.opacity * 0.25,
  };
}

export function getRouteHighlightStyle(kind: SegmentKind, weight: number): RouteVisualStyle {
  const base = getRouteStyle(kind, weight);
  return {
    ...base,
    width: base.width * 1.6,
    opacity: Math.min(1, base.opacity + 0.2),
  };
}

export function getRouteDimStyle(kind: SegmentKind, weight: number): RouteVisualStyle {
  const base = getRouteStyle(kind, weight);
  return {
    ...base,
    opacity: base.opacity * 0.25,
  };
}

// --- Region Styles ---

const FILL_INTENT_COLORS: Record<string, string> = {
  culture: '#c4a962',
  polity: '#5b7fa5',
  pressure: '#a85c3b',
  neutral: '#3d5670',
  frontier: '#6b5a3e',
  contested: '#8b4a3a',
};

const VISIBILITY_FILL_OPACITY: Record<VisibilityLevel, number> = {
  emphasized: 0.18,
  normal: 0.08,
  faded: 0.03,
  hidden: 0,
};

const VISIBILITY_STROKE_OPACITY: Record<VisibilityLevel, number> = {
  emphasized: 0.5,
  normal: 0.2,
  faded: 0.08,
  hidden: 0,
};

const BORDER_STYLE_WIDTH: Record<string, number> = {
  hard: 2.0,
  soft: 0.8,
  disputed: 1.5,
};

export function getRegionStyle(state: RegionEraState): RegionVisualStyle {
  const fillColor = FILL_INTENT_COLORS[state.fillIntent] ?? FILL_INTENT_COLORS.neutral;
  return {
    fillColor,
    fillOpacity: VISIBILITY_FILL_OPACITY[state.visibility],
    strokeColor: fillColor,
    strokeWidth: BORDER_STYLE_WIDTH[state.borderStyle] ?? 0.8,
    strokeOpacity: VISIBILITY_STROKE_OPACITY[state.visibility],
  };
}

// --- Place Styles ---

const KIND_BASE_RADIUS: Record<PlaceKind, number> = {
  port: 5,
  city: 4.5,
  settlement: 4,
  fort: 5,
  abstract_node: 3,
  megalith: 5,
  hillfort: 5.5,
};

const KIND_COLORS: Record<PlaceKind, string> = {
  port: '#5b7fa5',
  city: '#d4c9a8',
  settlement: '#c4a962',
  fort: '#a85c3b',
  abstract_node: '#3d5670',
  megalith: '#a8926a',
  hillfort: '#8b5e3c',
};

const VISIBILITY_SCALE: Record<VisibilityLevel, number> = {
  emphasized: 1.4,
  normal: 1.0,
  faded: 0.7,
  hidden: 0,
};

const VISIBILITY_OPACITY: Record<VisibilityLevel, number> = {
  emphasized: 0.95,
  normal: 0.7,
  faded: 0.35,
  hidden: 0,
};

export function getPlaceStyle(kind: PlaceKind, state: PlaceEraState): PlaceVisualStyle {
  const scale = VISIBILITY_SCALE[state.visibility];
  const baseRadius = KIND_BASE_RADIUS[kind];
  const pedagogyBoost = state.pedagogyIndex >= 5 ? 1.5 : state.pedagogyIndex >= 4 ? 0.5 : 0;

  return {
    radius: (baseRadius + pedagogyBoost) * scale,
    color: KIND_COLORS[kind],
    opacity: VISIBILITY_OPACITY[state.visibility],
    glowRadius: state.visibility === 'emphasized' ? (baseRadius + pedagogyBoost) * 2 : 0,
    glowOpacity: state.visibility === 'emphasized' ? 0.12 : 0,
  };
}
