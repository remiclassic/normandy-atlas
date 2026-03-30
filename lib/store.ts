import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { defaultEraId } from '@/data/eras';
import { getDefaultLayerState, getAtlasLayerPreset } from '@/data/layers';
import { getDefaultAtlasEraId, isValidAtlasEra, getEraRange } from '@/core/era/engine';
import { isMigrationEra } from '@/core/migration/engine';
import { COLONIAL_ERA_IDS, COLONIAL_SIM_YEAR_RANGE } from '@/data/atlas/new-france-timeline';
import type { SelectionKind } from '@/types';
import type { MigrationMapMode, MigrationBranchId, MigrationCohortId, AtlasLocale } from '@/core/types';
import { DEFAULT_LOCALE, readStoredLocale, persistLocale } from '@/lib/locale';

export { COLONIAL_ERA_IDS };
export const NORMANDY_ERA_IDS = new Set(['norman-origins', 'viking-age']);
export const VIKING_MOVEMENT_ERA_IDS = new Set(['frankish-carolingian', 'viking-age', 'norman-origins']);
export const NORMANDY_SIM_YEAR_DEFAULT = 1066;

export type NormanExpansionPreset = 'conquest' | 'influence' | 'full';

const NORMAN_EXPANSION_PRESET_MATRIX: Record<NormanExpansionPreset, Record<string, boolean>> = {
  conquest: {
    'norman-expansion-territories': true,
    'norman-expansion-crusader': false,
    'norman-expansion-influence': false,
    'norman-expansion-routes': true,
    'norman-expansion-nodes': true,
  },
  influence: {
    'norman-expansion-territories': false,
    'norman-expansion-crusader': false,
    'norman-expansion-influence': true,
    'norman-expansion-routes': false,
    'norman-expansion-nodes': true,
  },
  full: {
    'norman-expansion-territories': true,
    'norman-expansion-crusader': true,
    'norman-expansion-influence': true,
    'norman-expansion-routes': true,
    'norman-expansion-nodes': true,
  },
};

export type BasemapMode = 'dark' | 'parchment';

export type OnboardingPhase = 'intro' | 'flying' | 'guided' | 'complete';

export interface NormanNodePeriod {
  min: number;
  max: number;
}

export const NORMAN_NODE_PERIOD_DEFAULT: NormanNodePeriod = { min: 911, max: 1204 };

export const DEEP_TIME_ERA_IDS = new Set([
  'neolithic-normandy',
  'bronze-age-channel',
  'iron-age-gaul',
  'roman-gaul',
]);

function eraMidpoint(eraId: string): number {
  const r = getEraRange(eraId);
  return r ? Math.round((r.start + r.end) / 2) : 0;
}

function clampToEra(year: number, eraId: string): number {
  if (COLONIAL_ERA_IDS.has(eraId)) {
    return Math.max(COLONIAL_SIM_YEAR_RANGE.start, Math.min(COLONIAL_SIM_YEAR_RANGE.end, year));
  }
  const r = getEraRange(eraId);
  if (!r) return year;
  return Math.max(r.start, Math.min(r.end, year));
}

interface MapStore {
  atlasMode: boolean;
  eraId: string;
  layers: Record<string, boolean>;
  normandySimYear: number;
  atlasSimYear: number;
  normanNodePeriod: NormanNodePeriod;
  basemapMode: BasemapMode;
  selectedFeatureId: string | null;
  selectionKind: SelectionKind | null;
  hoveredFeatureId: string | null;
  hoveredKind: SelectionKind | null;
  detailPanelOpen: boolean;
  storyMode: boolean;
  storyStepIndex: number;
  storyArc: string | null;
  activeJourneyId: string | null;

  migrationExplorerOpen: boolean;
  migrationMapMode: MigrationMapMode;
  migrationBranch: MigrationBranchId;
  migrationCohortId: MigrationCohortId;
  migrationFlowEnabled: boolean;
  /** When true, Carto basemap shows cities, countries, roads, water names, and admin boundaries. */
  modernBasemapOverlays: boolean;
  /**
   * When true, exploration route segments respect `yearRange` vs simulation year.
   * When false (default), exploration lines stay visible for the whole era (easier to compare routes).
   */
  explorationRoutesYearStrict: boolean;

  locale: AtlasLocale;
  onboardingPhase: OnboardingPhase;

  setLocale: (locale: AtlasLocale) => void;
  setAtlasMode: (enabled: boolean) => void;
  setEra: (id: string) => void;
  toggleLayer: (id: string) => void;
  setLayerVisibility: (id: string, visible: boolean) => void;
  setNormandySimYear: (year: number) => void;
  setAtlasSimYear: (year: number) => void;
  setNormanNodePeriod: (period: NormanNodePeriod) => void;
  setBasemapMode: (mode: BasemapMode) => void;
  selectFeature: (id: string | null, kind?: SelectionKind) => void;
  hoverFeature: (id: string | null, kind?: SelectionKind) => void;
  openDetail: () => void;
  closeDetail: () => void;
  startStory: (arcId?: string) => void;
  stopStory: () => void;
  nextStoryStep: () => void;
  prevStoryStep: () => void;
  goToStoryStep: (index: number) => void;
  setActiveJourney: (journeyId: string | null) => void;
  applyNormanExpansionPreset: (preset: NormanExpansionPreset) => void;
  setMigrationExplorerOpen: (open: boolean) => void;
  setMigrationMapMode: (mode: MigrationMapMode) => void;
  setMigrationBranch: (branch: MigrationBranchId) => void;
  setMigrationCohortId: (cohortId: MigrationCohortId) => void;
  setMigrationFlowEnabled: (enabled: boolean) => void;
  setModernBasemapOverlays: (visible: boolean) => void;
  setExplorationRoutesYearStrict: (strict: boolean) => void;
  setOnboardingPhase: (phase: OnboardingPhase) => void;
}

function initialAtlasLayers(): Record<string, boolean> {
  return { ...getDefaultLayerState(), ...getAtlasLayerPreset(getDefaultAtlasEraId()) };
}

export const ONBOARDING_KEY = 'norman-atlas-onboarding-v1';

/** Safe to call anywhere (SSR, client). Reads localStorage directly. */
export function isOnboardingDone(): boolean {
  if (typeof window === 'undefined') return false;
  try { return localStorage.getItem(ONBOARDING_KEY) === 'done'; } catch { return false; }
}

export const useMapStore = create<MapStore>()(subscribeWithSelector((set) => ({
  atlasMode: true,
  eraId: getDefaultAtlasEraId(),
  layers: initialAtlasLayers(),
  normandySimYear: NORMANDY_SIM_YEAR_DEFAULT,
  atlasSimYear: eraMidpoint(getDefaultAtlasEraId()),
  normanNodePeriod: NORMAN_NODE_PERIOD_DEFAULT,
  basemapMode: 'dark' as BasemapMode,
  selectedFeatureId: null,
  selectionKind: null,
  hoveredFeatureId: null,
  hoveredKind: null,
  detailPanelOpen: false,
  storyMode: false,
  storyStepIndex: 0,
  storyArc: null,
  activeJourneyId: null,

  migrationExplorerOpen: false,
  migrationMapMode: 'origins' as MigrationMapMode,
  migrationBranch: 'st_lawrence' as MigrationBranchId,
  migrationCohortId: 'all_immigrants' as MigrationCohortId,
  migrationFlowEnabled: false,
  modernBasemapOverlays: false,
  explorationRoutesYearStrict: false,
  locale: DEFAULT_LOCALE,
  onboardingPhase: 'intro' as OnboardingPhase,

  setLocale: (locale) => {
    persistLocale(locale);
    set({ locale });
  },
  setAtlasMode: (enabled) =>
    set({
      atlasMode: enabled,
      eraId: enabled ? getDefaultAtlasEraId() : defaultEraId,
      layers: enabled ? initialAtlasLayers() : getDefaultLayerState(),
      storyMode: false,
      storyStepIndex: 0,
      storyArc: null,
      activeJourneyId: null,
    }),

  setEra: (id) =>
    set((s) => {
      if (s.atlasMode && !isValidAtlasEra(id)) return s;
      const isNormandy = NORMANDY_ERA_IDS.has(id);
      const normandySimYear = isNormandy
        ? (s.normandySimYear === NORMANDY_SIM_YEAR_DEFAULT ? 933 : s.normandySimYear)
        : NORMANDY_SIM_YEAR_DEFAULT;
      const layers = s.atlasMode
        ? { ...getDefaultLayerState(), ...getAtlasLayerPreset(id) }
        : s.layers;
      const enteringColonial = COLONIAL_ERA_IDS.has(id);
      const wasColonial = COLONIAL_ERA_IDS.has(s.eraId);
      const atlasSimYear = enteringColonial && wasColonial
        ? s.atlasSimYear
        : enteringColonial
          ? eraMidpoint(id)
          : eraMidpoint(id);
      const closeMigration = !isMigrationEra(id);
      return {
        eraId: id,
        normandySimYear,
        layers,
        atlasSimYear,
        ...(closeMigration
          ? { migrationExplorerOpen: false, migrationFlowEnabled: false }
          : {}),
      };
    }),

  setNormandySimYear: (year) => set({ normandySimYear: year }),

  setAtlasSimYear: (year) =>
    set((s) => ({ atlasSimYear: clampToEra(year, s.eraId) })),

  setNormanNodePeriod: (period) => set({ normanNodePeriod: period }),

  setBasemapMode: (mode) => set({ basemapMode: mode }),

  toggleLayer: (id) =>
    set((s) => ({
      layers: { ...s.layers, [id]: !s.layers[id] },
    })),

  setLayerVisibility: (id, visible) =>
    set((s) => ({
      layers: { ...s.layers, [id]: visible },
    })),

  selectFeature: (id, kind) =>
    set({
      selectedFeatureId: id,
      selectionKind: id ? (kind ?? 'region') : null,
      detailPanelOpen: id !== null,
    }),

  hoverFeature: (id, kind) =>
    set({
      hoveredFeatureId: id,
      hoveredKind: id ? (kind ?? 'region') : null,
    }),

  openDetail: () => set({ detailPanelOpen: true }),
  closeDetail: () => set({ detailPanelOpen: false, selectedFeatureId: null, selectionKind: null }),

  startStory: (arcId) => set({ storyMode: true, storyStepIndex: 0, storyArc: arcId ?? null, activeJourneyId: null }),
  stopStory: () => set({ storyMode: false, storyArc: null, activeJourneyId: null }),

  nextStoryStep: () =>
    set((s) => ({ storyStepIndex: s.storyStepIndex + 1 })),

  prevStoryStep: () =>
    set((s) => ({ storyStepIndex: Math.max(0, s.storyStepIndex - 1) })),

  goToStoryStep: (index) => set({ storyStepIndex: index }),

  setActiveJourney: (journeyId) => set({ activeJourneyId: journeyId }),

  applyNormanExpansionPreset: (preset) =>
    set((s) => ({
      layers: { ...s.layers, ...NORMAN_EXPANSION_PRESET_MATRIX[preset] },
    })),

  setMigrationExplorerOpen: (open) =>
    set((s) => {
      if (open && !isMigrationEra(s.eraId)) return s;
      return {
        migrationExplorerOpen: open,
        ...(open ? {} : { migrationFlowEnabled: false }),
      };
    }),

  setMigrationMapMode: (mode) => set({ migrationMapMode: mode }),
  setMigrationBranch: (branch) => set({ migrationBranch: branch }),
  setMigrationCohortId: (cohortId) => set({ migrationCohortId: cohortId }),
  setMigrationFlowEnabled: (enabled) => set({ migrationFlowEnabled: enabled }),

  setModernBasemapOverlays: (visible) => set({ modernBasemapOverlays: visible }),

  setExplorationRoutesYearStrict: (strict) => set({ explorationRoutesYearStrict: strict }),

  setOnboardingPhase: (phase) => {
    try {
      if (phase === 'complete') localStorage.setItem(ONBOARDING_KEY, 'done');
      else localStorage.removeItem(ONBOARDING_KEY);
    } catch { /* SSR / quota */ }
    set({ onboardingPhase: phase });
  },
})));
