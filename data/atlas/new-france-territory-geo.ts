// ---------------------------------------------------------------------------
// New France territorial GeoJSON by phase
//
// Approximate polygons at synthesis-level confidence. These represent
// pedagogical extents (core settlement, claimed territory, zones of
// influence) — not cadastral boundaries.
// ---------------------------------------------------------------------------

import type { NewFrancePhaseId, TerritoryKind } from './new-france-timeline';

export interface NFTerritoryFeatureProperties {
  id: string;
  phaseId: NewFrancePhaseId;
  kind: TerritoryKind;
  label: string;
  color: string;
}

export interface NFTerritoryFeature extends GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, NFTerritoryFeatureProperties> {}

export interface NFTerritoryCollection extends GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, NFTerritoryFeatureProperties> {}

// Palette: core = gold, claim = teal, influence = slate-blue
const C_CORE = '#c4a962';
const C_CLAIM = '#3b8ea5';
const C_INFLUENCE = '#5b7fa5';

export const newFranceTerritoryGeoJson: NFTerritoryCollection = {
  type: 'FeatureCollection',
  features: [
    // ── Phase 1: Early Foothold (1608–1627) ─────────────────────────
    {
      type: 'Feature',
      properties: { id: 'nf-p1-core', phaseId: 'early-foothold', kind: 'core', label: 'Québec & Tadoussac', color: C_CORE },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-71.5, 46.6], [-70.8, 46.7], [-69.5, 48.0], [-70.0, 48.5], [-71.5, 47.5], [-71.5, 46.6],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p1-claim', phaseId: 'early-foothold', kind: 'claim', label: 'St. Lawrence Claim', color: C_CLAIM },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-75.0, 44.5], [-73.0, 45.0], [-71.0, 46.0], [-69.0, 47.0],
          [-67.0, 49.0], [-69.0, 49.8], [-72.0, 48.5], [-75.5, 47.0], [-76.0, 45.5], [-75.0, 44.5],
        ]],
      },
    },

    // ── Phase 2: Company Era (1627–1663) ────────────────────────────
    {
      type: 'Feature',
      properties: { id: 'nf-p2-core', phaseId: 'company-era', kind: 'core', label: 'St. Lawrence Corridor', color: C_CORE },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-74.0, 45.2], [-73.0, 45.5], [-71.5, 46.5], [-70.5, 47.0], [-69.5, 48.0],
          [-70.0, 48.5], [-71.5, 47.5], [-73.5, 46.5], [-74.5, 45.8], [-74.0, 45.2],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p2-claim', phaseId: 'company-era', kind: 'claim', label: 'New France Claim', color: C_CLAIM },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-76.0, 43.5], [-73.0, 44.0], [-69.0, 46.0], [-67.0, 48.0],
          [-66.0, 49.5], [-70.0, 50.0], [-75.0, 48.0], [-78.0, 46.0], [-76.0, 43.5],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p2-acadia', phaseId: 'company-era', kind: 'influence', label: 'Acadia', color: C_INFLUENCE },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-67.0, 43.5], [-65.0, 44.0], [-63.0, 44.5], [-60.0, 45.5],
          [-59.5, 46.5], [-61.0, 47.0], [-64.0, 47.5], [-67.5, 45.5], [-67.0, 43.5],
        ]],
      },
    },

    // ── Phase 3: Royal Colony (1663–1701) ───────────────────────────
    {
      type: 'Feature',
      properties: { id: 'nf-p3-core', phaseId: 'royal-colony', kind: 'core', label: 'Seigneurial Corridor', color: C_CORE },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-74.5, 45.0], [-73.0, 45.3], [-71.0, 46.0], [-70.0, 47.0],
          [-69.0, 48.0], [-70.0, 49.0], [-72.0, 48.0], [-74.5, 46.5], [-75.5, 45.5], [-74.5, 45.0],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p3-claim', phaseId: 'royal-colony', kind: 'claim', label: 'Great Lakes – St. Lawrence', color: C_CLAIM },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-84.0, 41.5], [-80.0, 42.0], [-76.0, 43.0], [-73.0, 44.0],
          [-69.0, 46.0], [-66.0, 49.0], [-70.0, 50.5], [-78.0, 48.0],
          [-84.0, 46.0], [-86.0, 44.0], [-84.0, 41.5],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p3-influence', phaseId: 'royal-colony', kind: 'influence', label: 'Inland Exploration Zone', color: C_INFLUENCE },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-90.0, 42.0], [-84.0, 41.5], [-80.0, 42.0], [-76.0, 43.0],
          [-76.0, 45.0], [-84.0, 46.0], [-90.0, 45.0], [-92.0, 43.0], [-90.0, 42.0],
        ]],
      },
    },

    // ── Phase 4: Continental Expansion (1701–1754) ──────────────────
    {
      type: 'Feature',
      properties: { id: 'nf-p4-core', phaseId: 'continental-expansion', kind: 'core', label: 'St. Lawrence Core', color: C_CORE },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-75.0, 45.0], [-73.0, 45.3], [-71.0, 46.0], [-70.0, 47.0],
          [-69.0, 48.5], [-70.5, 49.5], [-72.5, 48.5], [-75.0, 46.5], [-76.0, 45.5], [-75.0, 45.0],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p4-claim', phaseId: 'continental-expansion', kind: 'claim', label: 'Interior French Claim', color: C_CLAIM },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          // Great Lakes + St. Lawrence
          [[
            [-90.0, 41.0], [-84.0, 41.0], [-78.0, 42.0], [-73.0, 44.0],
            [-69.0, 46.0], [-66.0, 49.0], [-70.0, 51.0], [-80.0, 49.0],
            [-88.0, 47.0], [-92.0, 45.0], [-92.0, 42.0], [-90.0, 41.0],
          ]],
          // Mississippi Valley + Louisiana
          [[
            [-92.0, 42.0], [-90.0, 41.0], [-88.0, 38.0], [-90.0, 35.0],
            [-91.0, 32.0], [-92.0, 30.0], [-90.0, 29.0], [-88.5, 30.0],
            [-87.0, 31.0], [-89.0, 34.0], [-90.5, 37.0], [-93.0, 39.0],
            [-95.0, 41.0], [-92.0, 42.0],
          ]],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p4-influence', phaseId: 'continental-expansion', kind: 'influence', label: 'Western Influence', color: C_INFLUENCE },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-95.0, 41.0], [-92.0, 42.0], [-88.0, 47.0], [-92.0, 49.0],
          [-100.0, 49.0], [-100.0, 43.0], [-95.0, 41.0],
        ]],
      },
    },

    // ── Phase 5: Seven Years' War (1754–1763) ───────────────────────
    {
      type: 'Feature',
      properties: { id: 'nf-p5-core', phaseId: 'seven-years-war', kind: 'core', label: 'Shrinking Core', color: C_CORE },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-74.0, 45.2], [-72.5, 45.5], [-71.0, 46.2], [-70.5, 47.0],
          [-70.0, 48.0], [-71.0, 48.5], [-73.0, 47.5], [-74.5, 46.0], [-74.0, 45.2],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p5-claim', phaseId: 'seven-years-war', kind: 'claim', label: 'Contested Territory', color: C_CLAIM },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-82.0, 42.0], [-78.0, 42.5], [-75.0, 43.5], [-73.0, 44.5],
          [-70.0, 46.0], [-68.0, 48.0], [-70.0, 50.0], [-76.0, 48.0],
          [-82.0, 46.0], [-84.0, 44.0], [-82.0, 42.0],
        ]],
      },
    },
  ],
};

/** Return features matching a given phase. */
export function getTerritoryForPhase(phaseId: NewFrancePhaseId): NFTerritoryCollection {
  return {
    type: 'FeatureCollection',
    features: newFranceTerritoryGeoJson.features.filter((f) => f.properties.phaseId === phaseId),
  };
}

/** Return features visible at a specific calendar year (active phase). */
export function getTerritoryForYear(year: number): NFTerritoryCollection {
  const phase = resolvePhaseId(year);
  if (!phase) return { type: 'FeatureCollection', features: [] };
  return getTerritoryForPhase(phase);
}

function resolvePhaseId(year: number): NewFrancePhaseId | undefined {
  if (year < 1608) return undefined;
  if (year < 1627) return 'early-foothold';
  if (year < 1663) return 'company-era';
  if (year < 1701) return 'royal-colony';
  if (year < 1754) return 'continental-expansion';
  return 'seven-years-war';
}
