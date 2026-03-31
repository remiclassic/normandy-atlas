import type { AtlasEvent, Aggregates, EntityEngagement } from './schema';

// ---------------------------------------------------------------------------
// Fold a single event into the running aggregates (mutating for performance).
// ---------------------------------------------------------------------------

function touchEntity(
  map: Record<string, EntityEngagement>,
  id: string,
  dwellMs: number,
  at: number,
): void {
  const prev = map[id];
  if (prev) {
    prev.opens += 1;
    prev.dwellMs += dwellMs;
  } else {
    map[id] = { opens: 1, dwellMs, firstSeen: at };
  }
}

export function foldEvent(agg: Aggregates, e: AtlasEvent): void {
  const dwell = e.dwellMs ?? 0;

  switch (e.t) {
    case 'place_open':
      touchEntity(agg.places, e.id, dwell, e.at);
      break;
    case 'region_open':
      touchEntity(agg.regions, e.id, dwell, e.at);
      break;
    case 'segment_open':
      touchEntity(agg.segments, e.id, dwell, e.at);
      break;
    case 'journey_open':
      touchEntity(agg.journeys, e.id, dwell, e.at);
      break;
    case 'era_visit':
      agg.eraCoverage[e.id] = (agg.eraCoverage[e.id] ?? 0) + 1;
      break;
    case 'story_step':
    case 'story_arc_complete':
      break;
    case 'journal_section_view':
      break;
  }

  agg.totalSessionMs += dwell;
}

// --- Derived selectors (pure) ----------------------------------------------

export function countDistinctPlaces(agg: Aggregates): number {
  return Object.keys(agg.places).length;
}

export function countDistinctRegions(agg: Aggregates): number {
  return Object.keys(agg.regions).length;
}

export function countDistinctJourneys(agg: Aggregates): number {
  return Object.keys(agg.journeys).length;
}

export function countDistinctSegments(agg: Aggregates): number {
  return Object.keys(agg.segments).length;
}

export function countErasVisited(agg: Aggregates): number {
  return Object.keys(agg.eraCoverage).length;
}

export function hasEngagedEntity(
  agg: Aggregates,
  kind: 'places' | 'regions' | 'segments' | 'journeys',
  id: string,
): boolean {
  return id in agg[kind];
}

export function hasEngagedAllInSet(
  agg: Aggregates,
  kind: 'places' | 'regions' | 'segments' | 'journeys',
  ids: readonly string[],
): boolean {
  return ids.every((id) => id in agg[kind]);
}

export function countEngagedInSet(
  agg: Aggregates,
  kind: 'places' | 'regions' | 'segments' | 'journeys',
  ids: readonly string[],
): number {
  return ids.filter((id) => id in agg[kind]).length;
}
