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

  if (!agg.journalSections) agg.journalSections = {};

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
      touchEntity(agg.journalSections, e.id, dwell, e.at);
      break;
  }

  agg.totalSessionMs += dwell;
}

// --- Derived selectors (pure) ----------------------------------------------

export type EntityKind = 'places' | 'regions' | 'segments' | 'journeys' | 'journalSections';

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

export function countDistinctJournalSections(agg: Aggregates): number {
  return Object.keys(agg.journalSections ?? {}).length;
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

// --- Depth helpers (dwell-time analysis) -----------------------------------

export function sumDwellMsForKind(agg: Aggregates, kind: EntityKind): number {
  const bucket = agg[kind];
  if (!bucket || typeof bucket !== 'object') return 0;
  let total = 0;
  for (const e of Object.values(bucket as Record<string, EntityEngagement>)) {
    total += e.dwellMs;
  }
  return total;
}

export function countEntitiesWithMinDwell(
  agg: Aggregates,
  kind: EntityKind,
  minDwellMs: number,
): number {
  const bucket = agg[kind];
  if (!bucket || typeof bucket !== 'object') return 0;
  let count = 0;
  for (const e of Object.values(bucket as Record<string, EntityEngagement>)) {
    if (e.dwellMs >= minDwellMs) count++;
  }
  return count;
}

export function totalEngagedEntities(agg: Aggregates): number {
  return (
    Object.keys(agg.places).length +
    Object.keys(agg.regions).length +
    Object.keys(agg.journeys).length +
    Object.keys(agg.segments).length
  );
}
