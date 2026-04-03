import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { defaultEraId } from '@/data/eras';
import { getDefaultLayerState, getAtlasLayerPreset } from '@/data/layers';
import { getDefaultAtlasEraId, isValidAtlasEra, getEraRange } from '@/core/era/engine';
import { getBeatCount } from '@/core/story/engine';
import { isMigrationEra } from '@/core/migration/engine';
import { COLONIAL_ERA_IDS, COLONIAL_SIM_YEAR_RANGE } from '@/data/atlas/new-france-timeline';
import type { SelectionKind } from '@/types';
import type { MigrationMapMode, MigrationBranchId, MigrationCohortId, AtlasLocale } from '@/core/types';
import { DEFAULT_LOCALE, readStoredLocale, persistLocale } from '@/lib/locale';
import type { UiTheme } from '@/lib/ui-theme';
import { DEFAULT_UI_THEME, persistUiTheme, applyUiThemeToDocument } from '@/lib/ui-theme';
import type { TextSizeMode } from '@/lib/text-size';
import { DEFAULT_TEXT_SIZE, persistTextSize, applyTextSizeToDocument } from '@/lib/text-size';

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

/** `overlay` = story seal modal; icon pulse uses `ledgerAttentionActive` + 10s timer. */
export type LedgerCelebrationPhase = 'idle' | 'overlay';

const LEDGER_ATTENTION_MS = 10_000;
let ledgerAttentionTimer: ReturnType<typeof setTimeout> | undefined;

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

export interface VikingAdnaFilter {
  country: string;
  burialContext: string;
}

const DEFAULT_VIKING_ADNA_FILTER: VikingAdnaFilter = { country: 'all', burialContext: 'all' };

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
  /** Whether the desktop detail aside is expanded (full width) vs collapsed (slim rail). */
  detailPanelExpanded: boolean;
  storyMode: boolean;
  storyStepIndex: number;
  storyArc: string | null;
  /** When false, camera does not follow story beat changes (user exploring freely). */
  storyMapFollow: boolean;
  /** Toggle between exploration and historical-impact views within cinematic arcs. */
  storyViewMode: 'exploration' | 'impact';
  /** Image gallery state for multi-slide story illustrations. */
  storyImageGallery: { open: boolean; activeIndex: number; beatId: string | null };
  activeJourneyId: string | null;

  migrationExplorerOpen: boolean;
  migrationMapMode: MigrationMapMode;
  migrationBranch: MigrationBranchId;
  migrationCohortId: MigrationCohortId;
  migrationFlowEnabled: boolean;
  /** When true, Carto basemap shows cities, countries, roads, water names, and admin boundaries. */
  modernBasemapOverlays: boolean;
  /** When true (manuscript basemap only), a subtle animated cool wash adds sea-like motion. */
  parchmentWaterAtmosphere: boolean;
  /**
   * When true, exploration route segments respect `yearRange` vs simulation year.
   * When false (default), exploration lines stay visible for the whole era (easier to compare routes).
   */
  explorationRoutesYearStrict: boolean;
  /** When true, only Scandinavian-linked Y-DNA lineages (I1, Norse R1a) are shown on the map. */
  ydnaScandinavianFilter: boolean;
  /** When true, 3D terrain (elevation + hillshade + fog) is active on the map. */
  terrain3dEnabled: boolean;
  vikingAdnaFilter: VikingAdnaFilter;

  /** One-shot camera fly request from UI (consumed by MapCanvas). */
  pendingFlyTarget: { center: [number, number]; zoom: number } | null;
  setPendingFlyTarget: (target: { center: [number, number]; zoom: number } | null) => void;

  /** Active cinematic flythrough preset, or null when not flying. */
  cinematicFlythrough: { presetId: string; actIndex: number } | null;
  /** Throttled progress [0–1] for the flythrough UI bar. */
  cinematicFlythroughProgress: number;

  locale: AtlasLocale;
  onboardingPhase: OnboardingPhase;
  /** App chrome only — map basemap uses `basemapMode`. */
  uiTheme: UiTheme;
  textSize: TextSizeMode;

  ledgerCelebrationPhase: LedgerCelebrationPhase;
  /** True while the Atlas Ledger chrome icon should pulse (auto-clears after 10s). */
  ledgerAttentionActive: boolean;
  startLedgerCelebration: () => void;
  advanceLedgerCelebration: () => void;
  endLedgerCelebration: () => void;
  pulseLedgerAttention: () => void;

  setLocale: (locale: AtlasLocale) => void;
  setUiTheme: (theme: UiTheme) => void;
  setTextSize: (mode: TextSizeMode) => void;
  setAtlasMode: (enabled: boolean) => void;
  setEra: (id: string) => void;
  toggleLayer: (id: string) => void;
  setLayerVisibility: (id: string, visible: boolean) => void;
  setNormandySimYear: (year: number) => void;
  setAtlasSimYear: (year: number) => void;
  setNormanNodePeriod: (period: NormanNodePeriod) => void;
  setBasemapMode: (mode: BasemapMode) => void;
  selectFeature: (id: string | null, kind?: SelectionKind, options?: { expandDetail?: boolean }) => void;
  hoverFeature: (id: string | null, kind?: SelectionKind) => void;
  openDetail: () => void;
  closeDetail: () => void;
  setDetailPanelExpanded: (expanded: boolean) => void;
  startStory: (arcId?: string | null, options?: { stepIndex?: number }) => void;
  stopStory: () => void;
  nextStoryStep: () => void;
  prevStoryStep: () => void;
  goToStoryStep: (index: number) => void;
  setStoryMapFollow: (follow: boolean) => void;
  setStoryViewMode: (mode: 'exploration' | 'impact') => void;
  openStoryImageGallery: (beatId: string, index?: number) => void;
  setStoryImageGalleryIndex: (index: number) => void;
  closeStoryImageGallery: () => void;
  setActiveJourney: (journeyId: string | null) => void;
  applyNormanExpansionPreset: (preset: NormanExpansionPreset) => void;
  setMigrationExplorerOpen: (open: boolean) => void;
  setMigrationMapMode: (mode: MigrationMapMode) => void;
  setMigrationBranch: (branch: MigrationBranchId) => void;
  setMigrationCohortId: (cohortId: MigrationCohortId) => void;
  setMigrationFlowEnabled: (enabled: boolean) => void;
  setModernBasemapOverlays: (visible: boolean) => void;
  setParchmentWaterAtmosphere: (enabled: boolean) => void;
  setExplorationRoutesYearStrict: (strict: boolean) => void;
  setYdnaScandinavianFilter: (enabled: boolean) => void;
  setTerrain3dEnabled: (enabled: boolean) => void;
  setVikingAdnaFilter: (filter: Partial<VikingAdnaFilter>) => void;
  startCinematicFlythrough: (presetId: string) => void;
  stopCinematicFlythrough: () => void;
  setCinematicFlythroughProgress: (progress: number) => void;
  setCinematicFlythroughAct: (actIndex: number) => void;
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

export const useMapStore = create<MapStore>()(subscribeWithSelector((set) => {
  const stopLedgerAttention = () => {
    if (ledgerAttentionTimer) {
      clearTimeout(ledgerAttentionTimer);
      ledgerAttentionTimer = undefined;
    }
    set({ ledgerAttentionActive: false });
  };

  const pulseLedgerAttention = () => {
    if (ledgerAttentionTimer) {
      clearTimeout(ledgerAttentionTimer);
      ledgerAttentionTimer = undefined;
    }
    set({ ledgerAttentionActive: true });
    ledgerAttentionTimer = setTimeout(() => {
      ledgerAttentionTimer = undefined;
      set({ ledgerAttentionActive: false });
    }, LEDGER_ATTENTION_MS);
  };

  return {
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
  detailPanelExpanded: true,
  storyMode: false,
  storyStepIndex: 0,
  storyArc: null,
  storyMapFollow: true,
  storyViewMode: 'exploration' as 'exploration' | 'impact',
  storyImageGallery: { open: false, activeIndex: 0, beatId: null },
  activeJourneyId: null,

  migrationExplorerOpen: false,
  migrationMapMode: 'origins' as MigrationMapMode,
  migrationBranch: 'st_lawrence' as MigrationBranchId,
  migrationCohortId: 'all_immigrants' as MigrationCohortId,
  migrationFlowEnabled: false,
  modernBasemapOverlays: false,
  parchmentWaterAtmosphere: false,
  explorationRoutesYearStrict: false,
  ydnaScandinavianFilter: false,
  terrain3dEnabled: false,
  vikingAdnaFilter: DEFAULT_VIKING_ADNA_FILTER,
  pendingFlyTarget: null,
  setPendingFlyTarget: (target) => set({ pendingFlyTarget: target }),
  cinematicFlythrough: null,
  cinematicFlythroughProgress: 0,
  locale: DEFAULT_LOCALE,
  onboardingPhase: 'intro' as OnboardingPhase,
  uiTheme: DEFAULT_UI_THEME,
  textSize: DEFAULT_TEXT_SIZE,
  ledgerCelebrationPhase: 'idle' as LedgerCelebrationPhase,
  ledgerAttentionActive: false,

  startLedgerCelebration: () => set({ ledgerCelebrationPhase: 'overlay' }),

  advanceLedgerCelebration: () => {
    set({ storyMode: false, storyArc: null, storyMapFollow: true, storyViewMode: 'exploration' as 'exploration' | 'impact', activeJourneyId: null, ledgerCelebrationPhase: 'idle' });
    pulseLedgerAttention();
  },

  endLedgerCelebration: () => {
    set({ ledgerCelebrationPhase: 'idle' });
    stopLedgerAttention();
  },

  pulseLedgerAttention,

  setLocale: (locale) => {
    persistLocale(locale);
    set({ locale });
  },

  setUiTheme: (theme) => {
    persistUiTheme(theme);
    applyUiThemeToDocument(theme);
    set({ uiTheme: theme });
  },

  setTextSize: (mode) => {
    persistTextSize(mode);
    applyTextSizeToDocument(mode);
    set({ textSize: mode });
  },

  setAtlasMode: (enabled) =>
    set({
      atlasMode: enabled,
      eraId: enabled ? getDefaultAtlasEraId() : defaultEraId,
      layers: enabled ? initialAtlasLayers() : getDefaultLayerState(),
      storyMode: false,
      storyStepIndex: 0,
      storyArc: null,
      storyMapFollow: true,
      storyViewMode: 'exploration' as 'exploration' | 'impact',
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

  selectFeature: (id, kind, options) =>
    set({
      selectedFeatureId: id,
      selectionKind: id ? (kind ?? 'region') : null,
      detailPanelOpen: id !== null,
      detailPanelExpanded: id !== null ? (options?.expandDetail ?? true) : true,
    }),

  hoverFeature: (id, kind) =>
    set({
      hoveredFeatureId: id,
      hoveredKind: id ? (kind ?? 'region') : null,
    }),

  openDetail: () => set({ detailPanelOpen: true, detailPanelExpanded: true }),
  closeDetail: () => set({ detailPanelOpen: false, detailPanelExpanded: true, selectedFeatureId: null, selectionKind: null }),
  setDetailPanelExpanded: (expanded) => set({ detailPanelExpanded: expanded }),

  startStory: (arcId?: string | null, options?: { stepIndex?: number }) => {
    const arc = arcId ?? null;
    const maxIdx = Math.max(0, getBeatCount(arc) - 1);
    const raw = options?.stepIndex ?? 0;
    const stepIndex = Number.isFinite(raw)
      ? Math.max(0, Math.min(raw, maxIdx))
      : 0;
    set({
      storyMode: true,
      storyStepIndex: stepIndex,
      storyArc: arc,
      storyMapFollow: true,
      storyViewMode: 'exploration',
      activeJourneyId: null,
      cinematicFlythrough: null,
      cinematicFlythroughProgress: 0,
      storyImageGallery: { open: false, activeIndex: 0, beatId: null },
    });
  },
  stopStory: () => set({ storyMode: false, storyArc: null, storyMapFollow: true, storyViewMode: 'exploration', activeJourneyId: null, storyImageGallery: { open: false, activeIndex: 0, beatId: null } }),

  nextStoryStep: () =>
    set((s) => ({
      storyStepIndex: s.storyStepIndex + 1,
      storyMapFollow: true,
      storyImageGallery: { open: false, activeIndex: 0, beatId: null },
    })),

  prevStoryStep: () =>
    set((s) => ({
      storyStepIndex: Math.max(0, s.storyStepIndex - 1),
      storyMapFollow: true,
      storyImageGallery: { open: false, activeIndex: 0, beatId: null },
    })),

  goToStoryStep: (index) =>
    set({ storyStepIndex: index, storyMapFollow: true, storyImageGallery: { open: false, activeIndex: 0, beatId: null } }),

  setStoryMapFollow: (follow) => set({ storyMapFollow: follow }),
  setStoryViewMode: (mode) => set({ storyViewMode: mode }),

  openStoryImageGallery: (beatId, index = 0) =>
    set({ storyImageGallery: { open: true, activeIndex: index, beatId } }),

  setStoryImageGalleryIndex: (index) =>
    set((s) => ({
      storyImageGallery: { ...s.storyImageGallery, activeIndex: index },
    })),

  closeStoryImageGallery: () =>
    set({ storyImageGallery: { open: false, activeIndex: 0, beatId: null } }),

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

  setParchmentWaterAtmosphere: (enabled) => set({ parchmentWaterAtmosphere: enabled }),

  setExplorationRoutesYearStrict: (strict) => set({ explorationRoutesYearStrict: strict }),

  setYdnaScandinavianFilter: (enabled) => set({ ydnaScandinavianFilter: enabled }),

  setTerrain3dEnabled: (enabled) => set({ terrain3dEnabled: enabled }),

  setVikingAdnaFilter: (partial) =>
    set((s) => ({ vikingAdnaFilter: { ...s.vikingAdnaFilter, ...partial } })),

  startCinematicFlythrough: (presetId) =>
    set({
      cinematicFlythrough: { presetId, actIndex: 0 },
      cinematicFlythroughProgress: 0,
      storyMode: false,
      storyArc: null,
      storyMapFollow: true,
      storyViewMode: 'exploration' as 'exploration' | 'impact',
    }),

  stopCinematicFlythrough: () =>
    set({ cinematicFlythrough: null, cinematicFlythroughProgress: 0, activeJourneyId: null }),

  setCinematicFlythroughProgress: (progress) =>
    set({ cinematicFlythroughProgress: progress }),

  setCinematicFlythroughAct: (actIndex) =>
    set((s) => s.cinematicFlythrough
      ? { cinematicFlythrough: { ...s.cinematicFlythrough, actIndex } }
      : s,
    ),

  setOnboardingPhase: (phase) => {
    try {
      if (phase === 'complete') localStorage.setItem(ONBOARDING_KEY, 'done');
      else localStorage.removeItem(ONBOARDING_KEY);
    } catch { /* SSR / quota */ }
    set({ onboardingPhase: phase });
  },
  };
}));
