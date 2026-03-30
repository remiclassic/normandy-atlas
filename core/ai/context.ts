import { getAtlasEra } from '@/core/era/engine';
import { getVisiblePlaces, getPlaceEraState } from '@/core/places/engine';
import { getActiveSegments } from '@/core/routes/engine';
import { getVisibleRegions } from '@/core/regions/engine';
import { getPeopleForEra, getPeopleForPlace } from '@/core/people/engine';
import { atlasContract } from '@/data/atlas/methodology';
import { isColonialEra, colonialYearFromEra } from '@/data/atlas/new-france-timeline';
import { VIKING_MOVEMENT_ERA_IDS } from '@/lib/store';
import type { AIContext, MigrationCohortId, MigrationBranchId, MigrationMapMode } from '@/core/types';

interface AIContextInput {
  eraId: string;
  selectedPlaceIds: string[];
  /** Align route list with map when provided (colonial / Viking movement eras). */
  atlasSimYear?: number;
  explorationRoutesYearStrict?: boolean;
  migration?: {
    cohortId: MigrationCohortId;
    branch: MigrationBranchId;
    mapMode: MigrationMapMode;
    metricLabel: string;
    yearRange: [number, number];
  };
}

export function buildAIContext(input: AIContextInput): AIContext {
  const era = getAtlasEra(input.eraId);
  if (!era) {
    return {
      currentEra: { id: input.eraId, label: { en: 'Unknown', fr: 'Inconnu' }, range: { start: 0, end: 0 } },
      selectedPlaces: [],
      visibleRoutes: [],
      visibleRegions: [],
      notablePeople: [],
      methodologyRules: atlasContract.rules,
      forbiddenClaims: atlasContract.forbiddenClaims,
    };
  }

  const selectedPlaces = input.selectedPlaceIds
    .map((pid) => {
      const state = getPlaceEraState(pid, input.eraId);
      if (!state) return null;
      return {
        id: pid,
        label: state.label,
        kind: getVisiblePlaces(input.eraId).find((p) => p.id === pid)?.kind ?? ('city' as const),
        affiliationTags: state.affiliationTags,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const simYearForRoutes =
    input.atlasSimYear != null && isColonialEra(input.eraId)
      ? colonialYearFromEra(input.eraId, input.atlasSimYear)
      : input.atlasSimYear != null && VIKING_MOVEMENT_ERA_IDS.has(input.eraId)
        ? input.atlasSimYear
        : undefined;

  const visibleRoutes = getActiveSegments(
    input.eraId,
    simYearForRoutes,
    input.explorationRoutesYearStrict != null || simYearForRoutes != null
      ? { explorationYearStrict: input.explorationRoutesYearStrict === true }
      : undefined,
  ).map((seg) => ({
    id: seg.id,
    kind: seg.kind,
    fromPlaceId: seg.fromPlaceId,
    toPlaceId: seg.toPlaceId,
  }));

  const visibleRegions = getVisibleRegions(input.eraId).map((r) => ({
    id: r.id,
    name: r.name,
    state: r.currentState,
  }));

  const placePeople = input.selectedPlaceIds.flatMap(
    (pid) => getPeopleForPlace(pid, input.eraId),
  );
  const eraPeople = getPeopleForEra(input.eraId);
  const seen = new Set<string>();
  const notablePeople = [...placePeople, ...eraPeople]
    .filter((p) => { if (seen.has(p.id)) return false; seen.add(p.id); return true; })
    .map((p) => ({ id: p.id, displayName: p.displayName, roles: p.roles, confidence: p.confidence }));

  return {
    currentEra: {
      id: era.id,
      label: era.label,
      range: era.range,
      summary: era.summary,
    },
    selectedPlaces,
    visibleRoutes,
    visibleRegions,
    notablePeople,
    methodologyRules: atlasContract.rules,
    forbiddenClaims: atlasContract.forbiddenClaims,
    activeMigration: input.migration,
  };
}
