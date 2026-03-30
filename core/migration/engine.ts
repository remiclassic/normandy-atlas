import { migrationDatasets, MIGRATION_COHORT_LABELS } from '@/data/atlas/migration-datasets';
import { atlasRegionsGeoJson } from '@/data/atlas/regions-geo';
import { getPlaceCoords } from '@/core/places/engine';
import type {
  MigrationDataset,
  MigrationCohortId,
  MigrationBranchId,
  MigrationMapMode,
  MigrationShareRow,
  MigrationOverlayContext,
  I18nString,
} from '@/core/types';

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

const datasetMap = new Map<string, MigrationDataset>(
  migrationDatasets.map((d) => [d.id, d]),
);

const COLONIAL_ERA_IDS = new Set(['new-france-foundations', 'royal-new-france']);

const FALLBACK_CENTROIDS: Record<string, [number, number]> = {
  'ile-de-france': [2.35, 48.86],
  'southwest-france': [-0.58, 44.84],
  'other-france': [2.0, 47.0],
  'other-ports': [-1.0, 47.0],
  'other-st-lawrence': [-72.0, 46.5],
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function isMigrationEra(eraId: string): boolean {
  return COLONIAL_ERA_IDS.has(eraId);
}

export interface CohortOption {
  id: MigrationCohortId;
  label: I18nString;
  available: boolean;
}

export function listCohortsForEra(eraId: string): CohortOption[] {
  const allCohorts: MigrationCohortId[] = [
    'all_immigrants',
    'founding_immigrants',
    'engages',
    'filles_du_roi',
    'carignan_salieres',
  ];

  return allCohorts.map((id) => {
    const hasDataset = migrationDatasets.some(
      (d) => d.cohortId === id && d.eraIds.includes(eraId),
    );
    return {
      id,
      label: MIGRATION_COHORT_LABELS[id],
      available: hasDataset,
    };
  });
}

export function listBranchesForEra(
  eraId: string,
  cohortId: MigrationCohortId,
): MigrationBranchId[] {
  const branches = new Set<MigrationBranchId>();
  for (const d of migrationDatasets) {
    if (d.eraIds.includes(eraId) && d.cohortId === cohortId) {
      branches.add(d.branch);
    }
  }
  return Array.from(branches);
}

export function getDefaultDataset(
  eraId: string,
  branch: MigrationBranchId = 'st_lawrence',
): MigrationDataset | undefined {
  return migrationDatasets.find(
    (d) =>
      d.eraIds.includes(eraId) &&
      d.branch === branch &&
      d.cohortId === 'all_immigrants',
  );
}

export function resolveDataset(params: {
  eraId: string;
  branch: MigrationBranchId;
  cohortId: MigrationCohortId;
}): MigrationDataset | undefined {
  return migrationDatasets.find(
    (d) =>
      d.eraIds.includes(params.eraId) &&
      d.branch === params.branch &&
      d.cohortId === params.cohortId,
  );
}

export function getDatasetById(id: string): MigrationDataset | undefined {
  return datasetMap.get(id);
}

// ---------------------------------------------------------------------------
// View-model helpers
// ---------------------------------------------------------------------------

export function getSharesForMode(
  dataset: MigrationDataset,
  mode: MigrationMapMode,
): MigrationShareRow[] {
  switch (mode) {
    case 'origins':
      return dataset.origins;
    case 'ports':
      return dataset.ports;
    case 'colonies':
      return dataset.colonies;
  }
}

export function getShareForEntity(
  dataset: MigrationDataset,
  mode: MigrationMapMode,
  entityId: string,
): MigrationShareRow | undefined {
  return getSharesForMode(dataset, mode).find((r) => r.entityId === entityId);
}

/**
 * Build a normalized 0–1 weight map from the active dataset + map mode.
 * Used by the map layer to drive choropleth fill-opacity.
 */
export function buildMigrationWeightMap(
  ctx: MigrationOverlayContext,
): Map<string, number> {
  const rows = getSharesForMode(ctx.dataset, ctx.mapMode);
  const maxPercent = Math.max(...rows.map((r) => r.percent ?? 0), 1);
  const weights = new Map<string, number>();
  for (const row of rows) {
    if (row.percent != null) {
      weights.set(row.entityId, row.percent / maxPercent);
    }
  }
  return weights;
}

// ---------------------------------------------------------------------------
// Coordinate resolution for flow arcs
// ---------------------------------------------------------------------------

function computePolygonCentroid(coords: number[][]): [number, number] {
  let sumX = 0;
  let sumY = 0;
  const n = coords.length;
  for (const [x, y] of coords) {
    sumX += x;
    sumY += y;
  }
  return [sumX / n, sumY / n];
}

function resolveRegionCentroid(regionId: string): [number, number] | undefined {
  if (FALLBACK_CENTROIDS[regionId]) return FALLBACK_CENTROIDS[regionId];
  const feature = atlasRegionsGeoJson.features.find(
    (f) => f.properties.id === regionId,
  );
  if (!feature) return undefined;
  const geom = feature.geometry;
  if (geom.type === 'Polygon') {
    return computePolygonCentroid(geom.coordinates[0] as number[][]);
  }
  return undefined;
}

export interface ResolvedFlowArc {
  originCoords: [number, number];
  portCoords: [number, number];
  colonyCoords: [number, number];
  weight: number;
}

export function resolveFlowArcs(
  dataset: MigrationDataset,
): ResolvedFlowArc[] {
  if (!dataset.flowEdges) return [];
  const arcs: ResolvedFlowArc[] = [];
  for (const edge of dataset.flowEdges) {
    const origin = resolveRegionCentroid(edge.originRegionId);
    const port = getPlaceCoords(edge.portPlaceId);
    const colony =
      resolveRegionCentroid(edge.colonyZoneId) ??
      getPlaceCoords(edge.colonyZoneId);
    if (origin && port && colony) {
      arcs.push({ originCoords: origin, portCoords: port, colonyCoords: colony, weight: edge.weight });
    }
  }
  return arcs;
}

// ---------------------------------------------------------------------------
// Validation (dev-time)
// ---------------------------------------------------------------------------

export function validateDatasets(): string[] {
  const warnings: string[] = [];
  for (const ds of migrationDatasets) {
    for (const mode of ['origins', 'ports', 'colonies'] as const) {
      const rows = getSharesForMode(ds, mode);
      const total = rows.reduce((sum, r) => sum + (r.percent ?? 0), 0);
      if (Math.abs(total - 100) > 2) {
        warnings.push(
          `Dataset "${ds.id}" ${mode}: shares sum to ${total}% (expected ~100%)`,
        );
      }
    }
  }
  return warnings;
}
