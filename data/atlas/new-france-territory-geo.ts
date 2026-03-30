// ---------------------------------------------------------------------------
// New France territorial GeoJSON by year interval
//
// Each feature carries a [yearStart, yearEnd) half-open interval. The resolver
// returns all features active at a given calendar year.  Approximate polygons
// at synthesis-level confidence — pedagogical extents, not cadastral boundaries.
//
// Coordinates reference the Nat Geo "European claims c. 1750" and the
// "French Colonies" maps for scale.  French claims stretched from
// Hudson Bay to the Gulf of Mexico, and from the Appalachians to the
// Great Plains — an enormous continental arc.
// ---------------------------------------------------------------------------

import type { NewFrancePhaseId, TerritoryKind } from './new-france-timeline';

export interface NFTerritoryFeatureProperties {
  id: string;
  phaseId: NewFrancePhaseId;
  kind: TerritoryKind;
  label: string;
  color: string;
  yearStart: number;
  yearEnd: number;
}

export interface NFTerritoryFeature extends GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, NFTerritoryFeatureProperties> {}

export interface NFTerritoryCollection extends GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, NFTerritoryFeatureProperties> {}

const C_CORE = '#c4a962';
const C_CLAIM = '#3b8ea5';
const C_INFLUENCE = '#5b7fa5';

export const newFranceTerritoryGeoJson: NFTerritoryCollection = {
  type: 'FeatureCollection',
  features: [
    // ── Early Foothold (1608–1627) ──────────────────────────────────
    {
      type: 'Feature',
      properties: { id: 'nf-p1-core', phaseId: 'early-foothold', kind: 'core', label: 'Québec & Tadoussac', color: C_CORE, yearStart: 1608, yearEnd: 1627 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-71.5, 46.6], [-70.8, 46.7], [-69.0, 48.2], [-69.5, 48.8],
          [-71.0, 48.0], [-72.0, 47.2], [-71.5, 46.6],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p1-claim', phaseId: 'early-foothold', kind: 'claim', label: 'St. Lawrence Claim', color: C_CLAIM, yearStart: 1608, yearEnd: 1627 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-76.0, 44.0], [-73.5, 44.5], [-70.0, 46.0], [-67.0, 47.5],
          [-64.0, 48.5], [-60.0, 49.0], [-58.0, 50.0], [-60.0, 51.5],
          [-65.0, 51.0], [-70.0, 50.5], [-75.0, 48.5], [-78.0, 46.5],
          [-77.0, 44.5], [-76.0, 44.0],
        ]],
      },
    },

    // ── Company Era (1627–1663) ─────────────────────────────────────
    {
      type: 'Feature',
      properties: { id: 'nf-p2-core', phaseId: 'company-era', kind: 'core', label: 'St. Lawrence Corridor', color: C_CORE, yearStart: 1627, yearEnd: 1663 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-74.5, 45.0], [-73.0, 45.4], [-71.0, 46.3], [-70.0, 47.0],
          [-69.0, 48.2], [-70.0, 49.0], [-72.0, 48.0], [-74.0, 46.8],
          [-75.5, 45.8], [-74.5, 45.0],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p2-claim', phaseId: 'company-era', kind: 'claim', label: 'New France Claim', color: C_CLAIM, yearStart: 1627, yearEnd: 1663 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-80.0, 43.0], [-76.0, 43.5], [-72.0, 44.5], [-68.0, 46.5],
          [-64.0, 48.0], [-60.0, 49.0], [-57.0, 50.0], [-58.0, 52.0],
          [-63.0, 52.0], [-70.0, 51.0], [-78.0, 49.0], [-83.0, 47.0],
          [-85.0, 45.0], [-83.0, 43.0], [-80.0, 43.0],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p2-acadia', phaseId: 'company-era', kind: 'influence', label: 'Acadia', color: C_INFLUENCE, yearStart: 1627, yearEnd: 1713 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-67.5, 43.5], [-65.0, 43.5], [-62.0, 44.0], [-60.0, 45.0],
          [-59.0, 46.5], [-60.0, 47.5], [-62.0, 48.0], [-64.5, 48.0],
          [-67.0, 47.5], [-68.5, 46.0], [-67.5, 43.5],
        ]],
      },
    },

    // ── Royal Colony (1663–1701) ────────────────────────────────────
    {
      type: 'Feature',
      properties: { id: 'nf-p3-core', phaseId: 'royal-colony', kind: 'core', label: 'Seigneurial Corridor', color: C_CORE, yearStart: 1663, yearEnd: 1701 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-75.0, 45.0], [-73.0, 45.3], [-71.0, 46.0], [-70.0, 47.0],
          [-69.0, 48.2], [-70.0, 49.2], [-72.0, 48.5], [-75.0, 47.0],
          [-76.5, 45.8], [-75.0, 45.0],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p3-claim', phaseId: 'royal-colony', kind: 'claim', label: 'Great Lakes – St. Lawrence', color: C_CLAIM, yearStart: 1663, yearEnd: 1701 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-88.0, 41.5], [-84.0, 41.5], [-80.0, 42.0], [-76.0, 43.0],
          [-72.0, 44.5], [-68.0, 46.5], [-64.0, 48.0], [-60.0, 49.5],
          [-57.0, 50.5], [-58.0, 52.5], [-65.0, 52.0], [-72.0, 51.0],
          [-80.0, 49.5], [-85.0, 47.5], [-89.0, 46.0], [-91.0, 44.0],
          [-90.0, 42.0], [-88.0, 41.5],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nf-p3-influence', phaseId: 'royal-colony', kind: 'influence', label: 'Inland Exploration Zone', color: C_INFLUENCE, yearStart: 1663, yearEnd: 1701 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-93.0, 41.0], [-88.0, 41.5], [-84.0, 41.5], [-80.0, 42.0],
          [-80.0, 44.0], [-84.0, 46.0], [-89.0, 46.0], [-93.0, 45.0],
          [-96.0, 43.0], [-93.0, 41.0],
        ]],
      },
    },

    // ── Continental Expansion (1701–1754) ───────────────────────────
    // This is peak New France — continental claim from Hudson Bay to the
    // Gulf of Mexico, Appalachians to the Great Plains.

    // Core: dense seigneurial settlement along the St. Lawrence.
    {
      type: 'Feature',
      properties: { id: 'nf-p4-core', phaseId: 'continental-expansion', kind: 'core', label: 'Canada', color: C_CORE, yearStart: 1701, yearEnd: 1754 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-76.0, 44.8], [-73.5, 45.2], [-71.0, 46.0], [-70.0, 47.0],
          [-69.0, 48.5], [-70.0, 49.5], [-72.5, 49.0], [-75.5, 47.5],
          [-77.0, 46.0], [-76.0, 44.8],
        ]],
      },
    },

    // Claim BEFORE Utrecht (1701–1713): full continental + Maritimes.
    {
      type: 'Feature',
      properties: { id: 'nf-p4-claim-pre-utrecht', phaseId: 'continental-expansion', kind: 'claim', label: 'New France', color: C_CLAIM, yearStart: 1701, yearEnd: 1713 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          // Gulf of St. Lawrence → Labrador → south Hudson Bay
          [-57.0, 49.5], [-55.0, 51.0], [-58.0, 53.0], [-63.0, 53.5],
          [-70.0, 53.0], [-78.0, 52.5], [-85.0, 52.0], [-90.0, 52.0],
          // West across prairies
          [-95.0, 51.0], [-100.0, 49.5], [-104.0, 49.0],
          // South along Great Plains
          [-104.0, 44.0], [-102.0, 40.0], [-100.0, 36.0], [-98.0, 32.0],
          // Gulf coast — Louisiana to Mobile
          [-95.0, 30.0], [-93.0, 29.5], [-91.0, 29.0], [-89.5, 29.0],
          [-88.0, 30.0], [-87.0, 30.5],
          // North along eastern side — Appalachians
          [-83.0, 33.0], [-81.0, 35.0], [-80.0, 37.0], [-79.0, 39.0],
          [-78.0, 41.0], [-77.0, 42.5], [-75.0, 43.5],
          // New England frontier to Gulf of St. Lawrence
          [-72.0, 44.0], [-69.0, 45.5], [-66.0, 47.0], [-63.0, 48.0],
          [-60.0, 48.8], [-57.0, 49.5],
        ]],
      },
    },

    // Claim AFTER Utrecht (1713–1754): Maritimes ceded; eastern edge retreats
    // from Nova Scotia / Newfoundland, but interior remains vast.
    {
      type: 'Feature',
      properties: { id: 'nf-p4-claim-post-utrecht', phaseId: 'continental-expansion', kind: 'claim', label: 'New France', color: C_CLAIM, yearStart: 1713, yearEnd: 1754 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          // Gaspé → north shore → Labrador → south Hudson Bay
          [-64.0, 48.5], [-60.0, 50.0], [-58.0, 53.0], [-63.0, 53.5],
          [-70.0, 53.0], [-78.0, 52.5], [-85.0, 52.0], [-90.0, 52.0],
          // West across prairies
          [-95.0, 51.0], [-100.0, 49.5], [-104.0, 49.0],
          // South along Great Plains
          [-104.0, 44.0], [-102.0, 40.0], [-100.0, 36.0], [-98.0, 32.0],
          // Gulf coast — Louisiana to Mobile
          [-95.0, 30.0], [-93.0, 29.5], [-91.0, 29.0], [-89.5, 29.0],
          [-88.0, 30.0], [-87.0, 30.5],
          // North along eastern side — Appalachians
          [-83.0, 33.0], [-81.0, 35.0], [-80.0, 37.0], [-79.0, 39.0],
          [-78.0, 41.0], [-77.0, 42.5], [-75.0, 43.5],
          // To St. Lawrence and Gaspé (no longer claiming Nova Scotia)
          [-72.0, 44.0], [-69.0, 45.5], [-67.5, 47.0], [-66.0, 48.0],
          [-64.0, 48.5],
        ]],
      },
    },

    // Île Royale (Cape Breton) + Île Saint-Jean (PEI) after Utrecht.
    {
      type: 'Feature',
      properties: { id: 'nf-p4-ile-royale', phaseId: 'continental-expansion', kind: 'influence', label: 'Île Royale & Île Saint-Jean', color: C_INFLUENCE, yearStart: 1713, yearEnd: 1758 },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [[
            [-61.5, 45.5], [-60.0, 45.6], [-59.7, 46.0], [-59.8, 46.3],
            [-60.5, 46.4], [-61.2, 46.2], [-61.5, 45.8], [-61.5, 45.5],
          ]],
          [[
            [-64.2, 46.0], [-63.0, 46.0], [-62.0, 46.3], [-62.5, 46.6],
            [-63.5, 46.7], [-64.5, 46.4], [-64.2, 46.0],
          ]],
        ],
      },
    },

    // Western influence — Pays d'en Haut and trans-Mississippi fur trade.
    {
      type: 'Feature',
      properties: { id: 'nf-p4-influence', phaseId: 'continental-expansion', kind: 'influence', label: 'Pays d\'en Haut', color: C_INFLUENCE, yearStart: 1701, yearEnd: 1754 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-104.0, 49.0], [-95.0, 51.0], [-90.0, 52.0], [-85.0, 52.0],
          [-85.0, 48.0], [-88.0, 46.0], [-90.0, 45.0],
          [-95.0, 44.0], [-100.0, 44.0], [-105.0, 44.0],
          [-110.0, 48.0], [-104.0, 49.0],
        ]],
      },
    },

    // ── Seven Years' War (1754–1763) — sub-steps ────────────────────

    // Core St. Lawrence before Québec falls (1759).
    {
      type: 'Feature',
      properties: { id: 'nf-p5-core', phaseId: 'seven-years-war', kind: 'core', label: 'Canada', color: C_CORE, yearStart: 1754, yearEnd: 1759 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-76.0, 44.8], [-73.5, 45.2], [-71.0, 46.0], [-70.0, 47.0],
          [-69.0, 48.5], [-70.0, 49.5], [-72.5, 49.0], [-75.5, 47.5],
          [-77.0, 46.0], [-76.0, 44.8],
        ]],
      },
    },

    // Contested territory — still enormous but under pressure (1754–1758).
    {
      type: 'Feature',
      properties: { id: 'nf-p5-claim', phaseId: 'seven-years-war', kind: 'claim', label: 'Contested New France', color: C_CLAIM, yearStart: 1754, yearEnd: 1758 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-64.0, 48.5], [-60.0, 50.0], [-58.0, 53.0], [-63.0, 53.5],
          [-70.0, 53.0], [-78.0, 52.5], [-85.0, 52.0], [-90.0, 52.0],
          [-95.0, 51.0], [-100.0, 49.5], [-104.0, 49.0],
          [-104.0, 44.0], [-102.0, 40.0], [-100.0, 36.0], [-98.0, 32.0],
          [-95.0, 30.0], [-93.0, 29.5], [-91.0, 29.0], [-89.5, 29.0],
          [-88.0, 30.0], [-87.0, 30.5],
          [-83.0, 33.0], [-81.0, 35.0], [-80.0, 37.0], [-79.0, 39.0],
          [-78.0, 41.0], [-77.0, 42.5], [-75.0, 43.5],
          [-72.0, 44.0], [-69.0, 45.5], [-67.5, 47.0], [-66.0, 48.0],
          [-64.0, 48.5],
        ]],
      },
    },

    // After Louisbourg falls (1758): claim shrinks — Ohio lost, only
    // St. Lawrence corridor + interior west of the lakes still contested.
    {
      type: 'Feature',
      properties: { id: 'nf-p5-claim-post-louisbourg', phaseId: 'seven-years-war', kind: 'claim', label: 'Remaining French Territory', color: C_CLAIM, yearStart: 1758, yearEnd: 1760 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-66.0, 48.0], [-64.0, 49.0], [-62.0, 50.5], [-65.0, 52.0],
          [-72.0, 51.5], [-80.0, 50.0], [-85.0, 49.0], [-88.0, 47.0],
          [-90.0, 45.0], [-90.0, 42.0], [-88.0, 40.0],
          [-85.0, 38.0], [-88.0, 35.0], [-90.0, 32.0],
          [-92.0, 30.0], [-90.0, 29.0], [-89.0, 29.5],
          [-88.0, 30.5], [-85.0, 33.0], [-82.0, 36.0],
          [-80.0, 38.0], [-78.0, 41.0], [-76.0, 43.5],
          [-73.0, 44.5], [-70.0, 46.0], [-68.0, 47.0],
          [-66.0, 48.0],
        ]],
      },
    },

    // After Québec falls (Sept 1759): only Montréal corridor remains.
    {
      type: 'Feature',
      properties: { id: 'nf-p5-core-montreal', phaseId: 'seven-years-war', kind: 'core', label: 'Montréal Rump', color: C_CORE, yearStart: 1759, yearEnd: 1760 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-75.0, 44.8], [-73.5, 45.0], [-72.0, 45.5], [-72.0, 46.5],
          [-73.0, 47.0], [-74.5, 46.5], [-76.0, 45.8], [-75.0, 44.8],
        ]],
      },
    },

    // After Montréal surrenders (Sept 1760): nothing remains.
    // No features match 1760–1763 — the empty map conveys the cession.
  ],
};

/** Return features matching a given phase (backward compatibility). */
export function getTerritoryForPhase(phaseId: NewFrancePhaseId): NFTerritoryCollection {
  return {
    type: 'FeatureCollection',
    features: newFranceTerritoryGeoJson.features.filter((f) => f.properties.phaseId === phaseId),
  };
}

/** Return all features active at a specific calendar year (half-open: yearStart <= year < yearEnd). */
export function getTerritoryForYear(year: number): NFTerritoryCollection {
  if (year < 1608 || year >= 1763) return { type: 'FeatureCollection', features: [] };
  return {
    type: 'FeatureCollection',
    features: newFranceTerritoryGeoJson.features.filter(
      (f) => year >= f.properties.yearStart && year < f.properties.yearEnd,
    ),
  };
}
