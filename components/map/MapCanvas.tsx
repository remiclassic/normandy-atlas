'use client';

import { useEffect, useRef, useCallback, useState, useReducer, memo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { ArcLayer, PathLayer } from '@deck.gl/layers';
import { PathStyleExtension } from '@deck.gl/extensions';
import { motion, AnimatePresence } from 'motion/react';

import { useMapStore, isOnboardingDone } from '@/lib/store';
import { getFlythroughPreset } from '@/data/atlas/flythrough-presets';
import { getJourneyPolyline } from '@/lib/flythrough-path';
import { runMultiActFlythrough } from '@/lib/flythrough-camera';
import { DARK_BASEMAP_URL, PARCHMENT_BASEMAP_URL } from './map-style';
import { loadParchmentAtlasStyle } from './parchment-atlas-style';
import ParchmentMapChrome from './ParchmentMapChrome';
import { layerConfigs, getHiddenSegmentKinds } from '@/data/layers';
import { normanAtlanticStory } from '@/data/stories';
import { flyToCamera } from '@/lib/geo';
import { readStoredReduceMotionForced, computeEffectiveReducedMotion } from '@/lib/reduced-motion';
import { isMaplibreMapRenderable } from '@/lib/map-mobile-recovery';
import {
  getRegionsGeoJsonForEra,
  getSettlementsGeoJsonForEra,
  getRoutesForEra,
} from '@/lib/content-builders';
import {
  addRegionLayers,
  addSettlementLayers,
  updateEraLabels,
  updateRegionSource,
  updateSettlementSource,
  setFeatureState,
  setLayerVisibility,
  applyMigrationOverlay,
  clearMigrationOverlay,
  applyPortWeights,
  clearPortWeights,
  applyVikingTerritoryFade,
  clearVikingTerritoryFade,
  addVikingExpansionZoneLayers,
  addVikingBattleLayers,
  updateVikingBattleSource,
  REGION_SOURCE,
  SETTLEMENT_SOURCE,
  CULTURAL_ORIGINS_FILL,
} from './map-layers';
import {
  addHistoricalPresenceLayers,
  updateHistoricalPresenceSource,
  updateHistoricalPresenceCompareSource,
  setHistoricalPresenceCompareLayerVisibility,
  EMPTY_HISTORICAL_PRESENCE_GEO,
  HISTORICAL_PRESENCE_SOURCE,
  HISTORICAL_PRESENCE_COMPARE_SOURCE,
  HISTORICAL_PRESENCE_FILL,
} from './historical-presence-layers';
import { setCartoModernBasemapOverlaysVisible } from './basemap-modern-overlays';
import {
  ensureTerrainInfrastructure,
  applyTerrainRuntimeState,
  MAP_MAX_ZOOM_FLAT,
} from './map-terrain';
import TerrainToggle from './TerrainToggle';
import { addAllNormandyLayers, setExpansionYearFilter, EVIDENCE_CIRCLES, EVIDENCE_ICONS, TOPONYMY_CIRCLES, TOPONYMY_LABELS, DENSITY_CIRCLES } from './normandy-layers';
import { addAllNormanExpansionLayers, NORMAN_NODES_CIRCLES, NORMAN_NODES_SOURCE, setNormanNodePeriodFilter } from './norman-expansion-layers';
import { applyParchmentOverlayLabelStyles } from './apply-parchment-overlay-labels';
import { addAllPrehistoryLayers, PREHISTORIC_SITES_CIRCLES, HILLFORTS_CIRCLES } from './prehistory-layers';
import { addNewFranceTerritoryLayers, updateNewFranceTerritorySource } from './new-france-territory-layers';
import { addNfYdnaLayers, applyNfYdnaOriginFilter, NF_YDNA_CIRCLES, NF_YDNA_SOURCE } from './new-france-ydna-layers';
import { addVikingAdnaLayers, VIKING_ADNA_CIRCLES, VIKING_ADNA_SOURCE, setVikingAdnaFilters } from './viking-adna-layers';
import { addVikingArchLayers, VIKING_ARCH_CIRCLES, VIKING_ARCH_SOURCE, setVikingArchYearFilter } from './viking-archaeology-layers';
import { isColonialEra, colonialYearFromEra } from '@/data/atlas/new-france-timeline';
import { vikingExpansionZonesGeoJson } from '@/data/atlas/viking-expansion-zones-geo';
import { buildVikingBattleGeoJson } from '@/data/atlas/viking-battle-markers';
import { getTerritoryForYear } from '@/data/atlas/new-france-territory-geo';
import { normanExpansionRoutes } from '@/data/norman-expansion';
import type { NormanExpansionRoute } from '@/data/norman-expansion';
import MapTooltip from './MapTooltip';
import type { TooltipData } from './MapTooltip';
import { syncMapLabelTextSize } from './map-label-text-size';
import { NORMANDY_ERA_IDS, VIKING_MOVEMENT_ERA_IDS } from '@/lib/store';
import { pickI18n } from '@/lib/locale';
import { registerAtlasMapIcons } from '@/lib/atlas/mapIcons';
import { StoryIllustrationMapOverlay } from '@/components/map/StoryIllustrationMapOverlay';
import StoryImageGallery from '@/components/story/StoryImageGallery';

import {
  getActiveSegments,
  getAtlasRegionsGeoJsonForEra,
  getAtlasRegionsForColonialYear,
  getAtlasRegionsForVikingSimYear,
  getVikingTerritoryFadeStates,
  getVikingTerritoryFadeRegionIds,
  getVisiblePlaces,
  buildPlacesGeoJson,
  isOceanCrossing,
  getRouteStyle,
  getRouteHighlightStyle,
  getRouteDimStyle,
  getRouteStyleWithEvidence,
  getRouteHighlightStyleWithEvidence,
  getRouteDimStyleWithEvidence,
  getAtlasEra,
  getBeat,
  resolveDataset,
  buildMigrationWeightMap,
  resolveFlowArcs,
  getBeatCount,
  getJourney,
  getEffectiveStoryBeat,
  resolveSlideAnchor,
  enrichRegionsWithCulturalOrigins,
  buildHistoricalPresenceGeoJson,
  getHaplogroupProfile,
  buildLineageMapGeoJson,
} from '@/core';
import {
  addLineageExplorerLayers,
  updateLineageExplorerSource,
  LINEAGE_EXPLORER_SOURCE,
} from './lineage-explorer-layers';
import {
  addUserAncestryPinLayers,
  updateUserAncestryPinsSource,
  USER_ANCESTRY_SOURCE,
  USER_ANCESTRY_CIRCLES,
} from './user-ancestry-pins-layers';
import { useAncestryStore } from '@/lib/ancestry-store';
import { buildUserAncestryPinsGeoJson } from '@/core/ancestry/geo';
import { useAncestryJourneyPlayback } from '@/hooks/useAncestryJourneyPlayback';
import { NORMAN_ROUTE_COLOR } from '@/core/presentation/styles';
import {
  registerMapViewReader,
  unregisterMapViewReader,
  registerMapBoundsReader,
  unregisterMapBoundsReader,
  type MapLngLatBounds,
} from '@/lib/map-view-reader';
import type { ResolvedSegment, MigrationOverlayContext, MigrationDataset } from '@/core/types';
import type { ResolvedFlowArc } from '@/core/migration/engine';
import type { RouteRecord } from '@/types';

const ATLAS_ROUTE_LAYER_IDS = ['atlas-route-polylines', 'atlas-route-polylines-norman', 'atlas-route-arcs', 'atlas-route-paths'] as const;

function syncLineageExplorerMap(map: maplibregl.Map) {
  if (!map.getSource(LINEAGE_EXPLORER_SOURCE)) return;
  const s = useMapStore.getState();
  const layerOn = s.layers['lineage-explorer'] ?? false;
  const show = layerOn && !!s.lineageExplorerProfileId && s.atlasMode;
  if (show) {
    const p = getHaplogroupProfile(s.lineageExplorerProfileId!);
    if (p) {
      updateLineageExplorerSource(map, buildLineageMapGeoJson(p, s.lineageExplorerEraLens));
      return;
    }
  }
  updateLineageExplorerSource(map, { type: 'FeatureCollection', features: [] });
}

function syncUserAncestryPins(map: maplibregl.Map) {
  if (!map.getSource(USER_ANCESTRY_SOURCE)) return;
  const s = useMapStore.getState();
  const layerOn = s.layers['user-ancestry-pins'] ?? false;
  const show = layerOn && s.atlasMode;
  const people = useAncestryStore.getState().people;
  if (show && Object.keys(people).length > 0) {
    updateUserAncestryPinsSource(map, buildUserAncestryPinsGeoJson(people));
  } else {
    updateUserAncestryPinsSource(map, { type: 'FeatureCollection', features: [] });
  }
}

function pickAtlasRouteSegment(
  overlay: MapboxOverlay,
  map: maplibregl.Map,
  e: maplibregl.MapMouseEvent,
): ResolvedSegment | null {
  const rect = map!.getCanvas().getBoundingClientRect();
  const cx = e.originalEvent.clientX - rect.left;
  const cy = e.originalEvent.clientY - rect.top;
  const r = 14;
  const picks = overlay.pickObjects({
    x: cx - r,
    y: cy - r,
    width: r * 2,
    height: r * 2,
    layerIds: [...ATLAS_ROUTE_LAYER_IDS],
  });
  if (!picks.length) return null;
  return picks[0].object as ResolvedSegment;
}

function atlasRouteTooltipFields(seg: ResolvedSegment): Pick<TooltipData, 'title' | 'subtitle' | 'detail' | 'hint'> {
  const locale = useMapStore.getState().locale;
  const journeyName = seg.journeyId ? pickI18n(getJourney(seg.journeyId)?.name ?? { en: '' }, locale) || undefined : undefined;
  const normanNote = seg.normanOriginNote ? pickI18n(seg.normanOriginNote, locale) : undefined;
  const subtitle = normanNote ? (journeyName ? `${journeyName} · ${normanNote}` : normanNote) : journeyName;
  return {
    title: seg.segmentTooltip ? pickI18n(seg.segmentTooltip, locale) : seg.id.replace(/^seg-/, '').replace(/-/g, ' '),
    subtitle,
    detail: seg.segmentDetail ? pickI18n(seg.segmentDetail, locale) : undefined,
    hint: seg.readingLinks?.length ? 'Click for details & sources' : undefined,
  };
}

function buildLegacyDeckLayers(routes: RouteRecord[], visible: boolean) {
  if (!visible || routes.length === 0) return [];

  const arcRoutes = routes.filter((r) => !r.geometry || r.geometry === 'arc');
  const pathRoutes = routes.filter((r) => r.geometry === 'path');
  const layers: (ArcLayer<RouteRecord> | PathLayer<RouteRecord>)[] = [];

  if (arcRoutes.length > 0) {
    layers.push(
      new ArcLayer<RouteRecord>({
        id: 'route-arcs',
        data: arcRoutes,
        getSourcePosition: (d) => d.source,
        getTargetPosition: (d) => d.target,
        getSourceColor: (d) => [...d.color, 180] as [number, number, number, number],
        getTargetColor: (d) => [...d.color, 80] as [number, number, number, number],
        getWidth: (d) => d.width,
        greatCircle: true,
        widthMinPixels: 1.5,
        widthMaxPixels: 8,
      }),
    );
  }

  if (pathRoutes.length > 0) {
    layers.push(
      new PathLayer<RouteRecord>({
        id: 'route-paths',
        data: pathRoutes,
        getPath: (d) => d.coordinates ?? [d.source, ...(d.waypoints ?? []), d.target],
        getColor: (d) => [...d.color, 160] as [number, number, number, number],
        getWidth: (d) => d.width,
        widthMinPixels: 1.5,
        widthMaxPixels: 6,
        jointRounded: true,
        capRounded: true,
      }),
    );
  }

  return layers;
}

// ---------------------------------------------------------------------------
// Migration flow arcs (origin → port → colony)
// ---------------------------------------------------------------------------

interface FlowArcDatum {
  source: [number, number];
  target: [number, number];
  weight: number;
  hop: 'origin_to_port' | 'port_to_colony';
  tier: 'primary' | 'secondary';
}

const FLOW_ORIGIN_COLOR: [number, number, number, number] = [196, 169, 98, 160];
const FLOW_ORIGIN_TARGET: [number, number, number, number] = [196, 169, 98, 80];
const FLOW_COLONY_COLOR: [number, number, number, number] = [91, 127, 165, 160];
const FLOW_COLONY_TARGET: [number, number, number, number] = [91, 127, 165, 80];

const FLOW_ORIGIN_COLOR_SECONDARY: [number, number, number, number] = [196, 169, 98, 88];
const FLOW_ORIGIN_TARGET_SECONDARY: [number, number, number, number] = [196, 169, 98, 44];
const FLOW_COLONY_COLOR_SECONDARY: [number, number, number, number] = [91, 127, 165, 88];
const FLOW_COLONY_TARGET_SECONDARY: [number, number, number, number] = [91, 127, 165, 44];

function buildMigrationFlowLayers(arcs: ResolvedFlowArc[]): ArcLayer<FlowArcDatum>[] {
  if (arcs.length === 0) return [];

  const primary: FlowArcDatum[] = [];
  const secondary: FlowArcDatum[] = [];
  for (const arc of arcs) {
    const bucket = arc.tier === 'secondary' ? secondary : primary;
    bucket.push({
      source: arc.originCoords,
      target: arc.portCoords,
      weight: arc.weight,
      hop: 'origin_to_port',
      tier: arc.tier,
    });
    bucket.push({
      source: arc.portCoords,
      target: arc.colonyCoords,
      weight: arc.weight,
      hop: 'port_to_colony',
      tier: arc.tier,
    });
  }

  const makeLayer = (
    id: string,
    data: FlowArcDatum[],
    opts: { widthScale: number; widthMin: number; widthMax: number },
  ) =>
    new ArcLayer<FlowArcDatum>({
      id,
      data,
      getSourcePosition: (d) => d.source,
      getTargetPosition: (d) => d.target,
      getSourceColor: (d) => {
        const sec = d.tier === 'secondary';
        if (d.hop === 'origin_to_port') {
          return sec ? FLOW_ORIGIN_COLOR_SECONDARY : FLOW_ORIGIN_COLOR;
        }
        return sec ? FLOW_COLONY_COLOR_SECONDARY : FLOW_COLONY_COLOR;
      },
      getTargetColor: (d) => {
        const sec = d.tier === 'secondary';
        if (d.hop === 'origin_to_port') {
          return sec ? FLOW_ORIGIN_TARGET_SECONDARY : FLOW_ORIGIN_TARGET;
        }
        return sec ? FLOW_COLONY_TARGET_SECONDARY : FLOW_COLONY_TARGET;
      },
      getWidth: (d) => Math.max(opts.widthMin, d.weight * opts.widthScale),
      greatCircle: true,
      widthMinPixels: opts.widthMin,
      widthMaxPixels: opts.widthMax,
    });

  const layers: ArcLayer<FlowArcDatum>[] = [];
  if (primary.length > 0) {
    layers.push(makeLayer('migration-flow-arcs-primary', primary, { widthScale: 1.2, widthMin: 1.5, widthMax: 6 }));
  }
  if (secondary.length > 0) {
    layers.push(
      makeLayer('migration-flow-arcs-secondary', secondary, { widthScale: 0.55, widthMin: 0.75, widthMax: 2.5 }),
    );
  }
  return layers;
}

const pathStyleExt = new PathStyleExtension({ dash: true, offset: true });

function buildAtlasDeckLayers(
  segments: ResolvedSegment[],
  visible: boolean,
  activeJourneyId: string | null,
  flowAnimation = false,
  dashOffset = 0,
) {
  if (!visible || segments.length === 0) return [];

  const polylineSegments = segments.filter((s) => (s.pathCoordinates?.length ?? 0) >= 2);
  const linearSegments = segments.filter((s) => (s.pathCoordinates?.length ?? 0) < 2);
  const arcSegments = linearSegments.filter((s) => isOceanCrossing(s));
  const pathSegments = linearSegments.filter((s) => !isOceanCrossing(s));
  const layers: (ArcLayer<ResolvedSegment> | PathLayer<ResolvedSegment>)[] = [];

  const getStyle = (seg: ResolvedSegment) => {
    let style;
    if (!activeJourneyId) style = getRouteStyleWithEvidence(seg.kind, seg.weight, seg.evidence);
    else if (seg.journeyId === activeJourneyId) style = getRouteHighlightStyleWithEvidence(seg.kind, seg.weight, seg.evidence);
    else style = getRouteDimStyleWithEvidence(seg.kind, seg.weight, seg.evidence);
    if (seg.normanRelated) return { ...style, color: NORMAN_ROUTE_COLOR };
    return style;
  };

  if (arcSegments.length > 0) {
    layers.push(
      new ArcLayer<ResolvedSegment>({
        id: 'atlas-route-arcs',
        pickable: true,
        data: arcSegments,
        getSourcePosition: (d) => d.sourceCoords,
        getTargetPosition: (d) => d.targetCoords,
        getSourceColor: (d) => {
          const s = getStyle(d);
          return [...s.color, Math.round(s.opacity * 255)] as [number, number, number, number];
        },
        getTargetColor: (d) => {
          const s = getStyle(d);
          return [...s.color, Math.round(s.opacity * 140)] as [number, number, number, number];
        },
        getWidth: (d) => getStyle(d).width,
        greatCircle: true,
        widthMinPixels: 1.5,
        widthMaxPixels: 8,
      }),
    );
  }

  if (pathSegments.length > 0) {
    layers.push(
      new PathLayer<ResolvedSegment>({
        id: 'atlas-route-paths',
        pickable: true,
        data: pathSegments,
        getPath: (d) => [d.sourceCoords, d.targetCoords],
        getColor: (d) => {
          const s = getStyle(d);
          return [...s.color, Math.round(s.opacity * 220)] as [number, number, number, number];
        },
        getWidth: (d) => getStyle(d).width,
        widthMinPixels: 1.5,
        widthMaxPixels: 6,
        jointRounded: false,
        capRounded: false,
      }),
    );
  }

  if (polylineSegments.length > 0) {
    const normanPolylines = polylineSegments.filter((s) => s.normanRelated);
    const regularPolylines = polylineSegments.filter((s) => !s.normanRelated);

    // Glow layer — all polylines (color already gold for Norman via getStyle)
    layers.push(
      new PathLayer<ResolvedSegment>({
        id: 'atlas-route-polylines-glow',
        pickable: false,
        data: polylineSegments,
        getPath: (d) => d.pathCoordinates!,
        getColor: (d) => {
          const s = getStyle(d);
          return [...s.color, Math.round(s.opacity * 50)] as [number, number, number, number];
        },
        getWidth: (d) => Math.max(6, getStyle(d).width * 3),
        widthMinPixels: 4,
        widthMaxPixels: 18,
        jointRounded: false,
        capRounded: false,
      }),
    );

    if (regularPolylines.length > 0) {
      layers.push(
        new PathLayer<ResolvedSegment>({
          id: 'atlas-route-polylines',
          pickable: true,
          data: regularPolylines,
          getPath: (d) => d.pathCoordinates!,
          getColor: (d) => {
            const s = getStyle(d);
            return [...s.color, Math.round(s.opacity * 235)] as [number, number, number, number];
          },
          getWidth: (d) => Math.max(2, getStyle(d).width * 1.05),
          widthMinPixels: 2,
          widthMaxPixels: 7,
          jointRounded: false,
          capRounded: false,
          ...(flowAnimation
            ? {
                extensions: [pathStyleExt],
                getDashArray: [12, 6],
                getOffset: dashOffset,
                dashJustified: true,
                dashGapPickable: true,
              }
            : {}),
        }),
      );
    }

    // Norman-origin polylines — gold color (via getStyle) + always-dashed
    if (normanPolylines.length > 0) {
      layers.push(
        new PathLayer<ResolvedSegment>({
          id: 'atlas-route-polylines-norman',
          pickable: true,
          data: normanPolylines,
          getPath: (d) => d.pathCoordinates!,
          getColor: (d) => {
            const s = getStyle(d);
            return [...s.color, Math.round(s.opacity * 235)] as [number, number, number, number];
          },
          getWidth: (d) => Math.max(2, getStyle(d).width * 1.15),
          widthMinPixels: 2,
          widthMaxPixels: 7,
          jointRounded: false,
          capRounded: false,
          ...{
            extensions: [pathStyleExt],
            getDashArray: [8, 4],
            getOffset: flowAnimation ? dashOffset : 0,
            dashJustified: true,
            dashGapPickable: true,
          },
        }),
      );
    }
  }

  return layers;
}

const NORMAN_EXP_PRIMARY_ID = 'norman-expansion-arcs-primary';
const NORMAN_EXP_SECONDARY_ID = 'norman-expansion-arcs-secondary';
const NORMAN_EXP_ARC_LAYER_IDS = [NORMAN_EXP_PRIMARY_ID, NORMAN_EXP_SECONDARY_ID] as const;

function buildNormanExpansionDeckLayers(
  routes: NormanExpansionRoute[],
  visible: boolean,
): ArcLayer<NormanExpansionRoute>[] {
  if (!visible || routes.length === 0) return [];
  const primary = routes.filter((r) => r.routeTier === 'primary');
  const secondary = routes.filter((r) => r.routeTier === 'secondary');
  const layers: ArcLayer<NormanExpansionRoute>[] = [];

  if (primary.length > 0) {
    layers.push(
      new ArcLayer<NormanExpansionRoute>({
        id: NORMAN_EXP_PRIMARY_ID,
        pickable: true,
        data: primary,
        getSourcePosition: (d) => d.source,
        getTargetPosition: (d) => d.target,
        getSourceColor: [201, 64, 128, 200],
        getTargetColor: [201, 64, 128, 90],
        getWidth: (d) => d.weight,
        greatCircle: true,
        widthMinPixels: 2,
        widthMaxPixels: 8,
      }),
    );
  }

  if (secondary.length > 0) {
    layers.push(
      new ArcLayer<NormanExpansionRoute>({
        id: NORMAN_EXP_SECONDARY_ID,
        pickable: true,
        data: secondary,
        getSourcePosition: (d) => d.source,
        getTargetPosition: (d) => d.target,
        getSourceColor: [168, 104, 184, 180],
        getTargetColor: [168, 104, 184, 70],
        getWidth: (d) => d.weight,
        greatCircle: true,
        widthMinPixels: 1.5,
        widthMaxPixels: 6,
      }),
    );
  }

  return layers;
}

let onboardingEntranceFlyStarted = false;

function resetOnboardingEntranceFly() {
  onboardingEntranceFlyStarted = false;
}

/**
 * Neolithic fly-in after Enter Atlas. Runs once per onboarding run.
 * Allowed while phase is `flying` or `guided` so a slow map `load` still triggers the fly after the tutorial appears.
 */
function tryRunOnboardingFly(map: maplibregl.Map | null) {
  if (!map || onboardingEntranceFlyStarted) return;
  const { onboardingPhase, eraId } = useMapStore.getState();
  if (onboardingPhase !== 'flying' && onboardingPhase !== 'guided') return;
  const era = getAtlasEra(eraId);
  if (!era?.defaultCamera) return;
  onboardingEntranceFlyStarted = true;
  flyToCamera(map, {
    center: era.defaultCamera.center,
    zoom: era.defaultCamera.zoom,
    duration: 4000,
  });
}

const CINEMATIC_OCEAN_ARC_IDS = new Set(['leif-erikson']);

const AncestryJourneyPlaybackBridge = memo(function AncestryJourneyPlaybackBridge() {
  const plan = useAncestryStore((s) => s.activeJourney);
  const stepIndex = useAncestryStore((s) => s.journeyStepIndex);
  useAncestryJourneyPlayback(plan, stepIndex, plan != null);
  return null;
});

const CinematicOceanOverlay = memo(function CinematicOceanOverlay() {
  const storyArc = useMapStore((s) => s.storyArc);
  const storyMode = useMapStore((s) => s.storyMode);
  const basemapMode = useMapStore((s) => s.basemapMode);
  const active = storyMode && storyArc != null && CINEMATIC_OCEAN_ARC_IDS.has(storyArc) && basemapMode === 'dark';

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% 60%, transparent 40%, rgba(6,28,40,0.35) 100%)',
            mixBlendMode: 'multiply',
          }}
        >
          <div
            className="absolute inset-[-10%] cinematic-ocean-drift-motion"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'f\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.015\' numOctaves=\'3\' seed=\'7\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23f)\'/%3E%3C/svg%3E")',
              backgroundSize: '512px 512px',
              opacity: 0.08,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default function MapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const viewportBoundsRef = useRef<MapLngLatBounds | null>(null);
  const overlayRef = useRef<MapboxOverlay | null>(null);
  const hoveredRegionRef = useRef<string | null>(null);
  const hoveredSettlementRef = useRef<string | null>(null);
  const selectedRegionRef = useRef<string | null>(null);
  const selectedSettlementRef = useRef<string | null>(null);
  const selectedNormanNodeRef = useRef<string | null>(null);
  const hoveredNormanNodeRef = useRef<string | null>(null);
  const selectedYdnaRef = useRef<string | null>(null);
  const hoveredYdnaRef = useRef<string | null>(null);
  const selectedVikingAdnaRef = useRef<string | null>(null);
  const hoveredVikingAdnaRef = useRef<string | null>(null);
  const selectedVikingArchRef = useRef<string | null>(null);
  const hoveredVikingArchRef = useRef<string | null>(null);
  const hoveredHistoricalMacroRef = useRef<string | null>(null);
  const selectedHistoricalMacroRef = useRef<string | null>(null);
  const selectedUserAncestryPinRef = useRef<string | null>(null);
  const hoveredUserAncestryPinRef = useRef<string | null>(null);
  const readyRef = useRef(false);
  const interactionsAttachedRef = useRef(false);
  const rebuildMapDataLayersRef = useRef<(map: maplibregl.Map) => void>(() => {});
  const tooltipRef = useRef<TooltipData | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [eraTransition, setEraTransition] = useState(false);
  const [mapBearing, setMapBearing] = useState(0);
  /** Bumps when the MapLibre instance is created or torn down so story pins re-sync (mapRef is not reactive). */
  const [mapInstanceGeneration, bumpMapInstance] = useReducer((n: number) => n + 1, 0);

  // Hoisted so the basemap-switch handler can also clear the tooltip
  const showTooltip = useCallback((data: TooltipData | null) => {
    tooltipRef.current = data;
    setTooltip(data);
  }, []);

  const selectFeature = useMapStore((s) => s.selectFeature);
  const hoverFeature = useMapStore((s) => s.hoverFeature);

  const syncOverlay = useCallback((eraId: string, layersState: Record<string, boolean>) => {
    if (!overlayRef.current) return;
    const routesVisible = layersState['routes'] ?? true;
    const {
      atlasMode,
      activeJourneyId,
      atlasSimYear,
      explorationRoutesYearStrict,
      migrationExplorerOpen,
      migrationFlowEnabled,
      migrationBranch,
      migrationCohortId,
    } = useMapStore.getState();

    const normanExpRoutesVisible = layersState['norman-expansion-routes'] ?? false;
    const normanExpDeckLayers = buildNormanExpansionDeckLayers(normanExpansionRoutes, normanExpRoutesVisible);

    let migrationFlowDeckLayers: ArcLayer<FlowArcDatum>[] = [];
    if (atlasMode && migrationExplorerOpen && migrationFlowEnabled) {
      const ds = resolveDataset({ eraId, branch: migrationBranch, cohortId: migrationCohortId });
      if (ds) {
        migrationFlowDeckLayers = buildMigrationFlowLayers(resolveFlowArcs(ds));
      }
    }

    if (atlasMode) {
      const simYear = isColonialEra(eraId)
        ? colonialYearFromEra(eraId, atlasSimYear)
        : VIKING_MOVEMENT_ERA_IDS.has(eraId)
          ? atlasSimYear
          : undefined;
      let segments = getActiveSegments(eraId, simYear, {
        explorationYearStrict: explorationRoutesYearStrict,
      });
      const hiddenKinds = getHiddenSegmentKinds(layersState);
      if (hiddenKinds) {
        segments = segments.filter((s) => !hiddenKinds.has(s.kind));
      }
      const flowOn = layersState['route-flow-animation'] ?? false;
      const dashOff = flowOn ? ((Date.now() / 40) % 18) / 18 : 0;
      overlayRef.current.setProps({
        layers: [...buildAtlasDeckLayers(segments, routesVisible, activeJourneyId, flowOn, dashOff), ...normanExpDeckLayers, ...migrationFlowDeckLayers],
      });
    } else {
      const eraRoutes = getRoutesForEra(eraId);
      overlayRef.current.setProps({
        layers: [...buildLegacyDeckLayers(eraRoutes, routesVisible), ...normanExpDeckLayers],
      });
    }
  }, []);

  const getVikingRegionsFiltered = useCallback((eraId: string, simYear: number) => {
    const base = getAtlasRegionsForVikingSimYear(eraId, simYear);
    const homelandOn = useMapStore.getState().layers['viking-norse-homeland'] ?? true;
    if (homelandOn) return base;
    return {
      type: 'FeatureCollection' as const,
      features: base.features.filter((f) => f.properties.id !== 'scandinavian-homeland'),
    };
  }, []);

  const syncSources = useCallback((eraId: string) => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    const { atlasMode, atlasSimYear, layers: layersState, locale, basemapMode } = useMapStore.getState();
    const culturalOn = layersState['cultural-origins'] ?? false;
    const bm = basemapMode === 'parchment' ? 'parchment' as const : 'dark' as const;

    const maybeEnrich = (geojson: import('@/types').RegionFeatureCollection) =>
      culturalOn ? enrichRegionsWithCulturalOrigins(geojson, eraId, locale, bm) : geojson;

    if (atlasMode) {
      if (isColonialEra(eraId)) {
        clearVikingTerritoryFade(map, [...getVikingTerritoryFadeRegionIds()]);
        const colYear = colonialYearFromEra(eraId, atlasSimYear);
        updateRegionSource(map, maybeEnrich(getAtlasRegionsForColonialYear(eraId, colYear)));
        updateNewFranceTerritorySource(map, getTerritoryForYear(colYear));
      } else if (VIKING_MOVEMENT_ERA_IDS.has(eraId)) {
        updateRegionSource(map, maybeEnrich(getVikingRegionsFiltered(eraId, atlasSimYear)));
        applyVikingTerritoryFade(map, getVikingTerritoryFadeStates(atlasSimYear));
        updateNewFranceTerritorySource(map, { type: 'FeatureCollection', features: [] });
      } else {
        clearVikingTerritoryFade(map, [...getVikingTerritoryFadeRegionIds()]);
        updateRegionSource(map, maybeEnrich(getAtlasRegionsGeoJsonForEra(eraId)));
        updateNewFranceTerritorySource(map, { type: 'FeatureCollection', features: [] });
      }

      const places = getVisiblePlaces(eraId);
      updateSettlementSource(map, buildPlacesGeoJson(places));
    } else {
      clearVikingTerritoryFade(map, [...getVikingTerritoryFadeRegionIds()]);
      updateRegionSource(map, getRegionsGeoJsonForEra(eraId));
      updateSettlementSource(map, getSettlementsGeoJsonForEra(eraId));
      updateNewFranceTerritorySource(map, { type: 'FeatureCollection', features: [] });
    }

    updateEraLabels(map, eraId);

    if (atlasMode) applyNfYdnaOriginFilter(map, useMapStore.getState().ydnaScandinavianFilter);
  }, []);

  rebuildMapDataLayersRef.current = (map) => {
    const state = useMapStore.getState();
    const theme = state.basemapMode === 'parchment' ? 'parchment' : 'dark';
    try {
      ensureTerrainInfrastructure(map);

      if (state.atlasMode) {
        const regionsGeoJson = VIKING_MOVEMENT_ERA_IDS.has(state.eraId)
          ? getVikingRegionsFiltered(state.eraId, state.atlasSimYear)
          : getAtlasRegionsGeoJsonForEra(state.eraId);
        addRegionLayers(map, regionsGeoJson, state.eraId, theme);
        addSettlementLayers(map, theme);
        const places = getVisiblePlaces(state.eraId);
        updateSettlementSource(map, buildPlacesGeoJson(places));
      } else {
        addRegionLayers(map, getRegionsGeoJsonForEra(state.eraId), state.eraId, theme);
        addSettlementLayers(map, theme);
        updateSettlementSource(map, getSettlementsGeoJsonForEra(state.eraId));
      }

      if (state.atlasMode) {
        const hpGeo = buildHistoricalPresenceGeoJson(
          state.historicalPresenceYear,
          state.historicalPresenceView,
          state.locale,
        );
        const hpCompareGeo =
          state.historicalPresenceCompareEnabled
            ? buildHistoricalPresenceGeoJson(
                state.historicalPresenceCompareYear,
                state.historicalPresenceView,
                state.locale,
              )
            : EMPTY_HISTORICAL_PRESENCE_GEO;
        addHistoricalPresenceLayers(map, hpGeo, hpCompareGeo, theme);
        const macroOn = state.layers['historical-presence'] ?? false;
        setHistoricalPresenceCompareLayerVisibility(
          map,
          macroOn && state.historicalPresenceCompareEnabled,
        );
      }

      addAllNormandyLayers(map, theme);
      addAllNormanExpansionLayers(map, theme);
      addAllPrehistoryLayers(map, theme);
      addNewFranceTerritoryLayers(map);
      addNfYdnaLayers(map, theme);
      applyNfYdnaOriginFilter(map, state.ydnaScandinavianFilter);
      addVikingAdnaLayers(map, theme);
      addVikingArchLayers(map, theme);
      addLineageExplorerLayers(map, theme);
      syncLineageExplorerMap(map);
      addUserAncestryPinLayers(map, theme);
      syncUserAncestryPins(map);
      addVikingExpansionZoneLayers(map, vikingExpansionZonesGeoJson);
      addVikingBattleLayers(map, buildVikingBattleGeoJson(
        VIKING_MOVEMENT_ERA_IDS.has(state.eraId) ? state.atlasSimYear : undefined,
      ));
      applyParchmentOverlayLabelStyles(map, theme);
      setExpansionYearFilter(map, state.normandySimYear);

      if (state.atlasMode && isColonialEra(state.eraId)) {
        const colYear = colonialYearFromEra(state.eraId, state.atlasSimYear);
        updateNewFranceTerritorySource(map, getTerritoryForYear(colYear));
      }

      if (state.atlasMode && VIKING_MOVEMENT_ERA_IDS.has(state.eraId)) {
        applyVikingTerritoryFade(map, getVikingTerritoryFadeStates(state.atlasSimYear));
        const vf = state.vikingAdnaFilter;
        setVikingAdnaFilters(map, { simYear: state.atlasSimYear, country: vf.country, burialContext: vf.burialContext });
        setVikingArchYearFilter(map, state.atlasSimYear);
      } else {
        clearVikingTerritoryFade(map, [...getVikingTerritoryFadeRegionIds()]);
      }

      for (const cfg of layerConfigs) {
        if (cfg.deckLayer) continue;
        setLayerVisibility(map, cfg.mapLayerIds, state.layers[cfg.id] ?? cfg.defaultOn);
      }

      setNormanNodePeriodFilter(map, state.normanNodePeriod);

      syncOverlay(state.eraId, state.layers);
      setCartoModernBasemapOverlaysVisible(map, state.modernBasemapOverlays);

      applyTerrainRuntimeState(map, state.terrain3dEnabled, {
        basemapMode: state.basemapMode,
        skipCameraAnimation: true,
      });
    } catch (err) {
      console.error('[MapCanvas] rebuild map layers failed:', err);
    }
  };

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl || mapRef.current) return;

    let map: maplibregl.Map | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let mapBootGeneration = 0;
    let canvasRecoveryCleanup: (() => void) | null = null;

    function teardownMap() {
      mapBootGeneration += 1;
      resetOnboardingEntranceFly();
      resizeObserver?.disconnect();
      resizeObserver = null;
      canvasRecoveryCleanup?.();
      canvasRecoveryCleanup = null;
      readyRef.current = false;
      interactionsAttachedRef.current = false;
      unregisterMapViewReader();
      unregisterMapBoundsReader();
      const m = mapRef.current;
      if (m) {
        try {
          m.remove();
        } catch {
          /* map may already be torn down */
        }
        mapRef.current = null;
        bumpMapInstance();
      }
      overlayRef.current = null;
      map = null;
    }

    function recoverMapIfNeeded(force: boolean) {
      const container = containerRef.current;
      if (!container) return;
      if (force || !isMaplibreMapRenderable(mapRef.current, container)) {
        teardownMap();
        void boot(0);
        return;
      }
      const softRecover = () => {
        mapRef.current?.resize();
        mapRef.current?.triggerRepaint();
      };
      requestAnimationFrame(softRecover);
      setTimeout(softRecover, 250);
    }

    function attachCanvasRecovery(mapInstance: maplibregl.Map) {
      canvasRecoveryCleanup?.();
      const canvas = mapInstance.getCanvas();
      const onLost = (e: Event) => {
        e.preventDefault();
        recoverMapIfNeeded(true);
      };
      const onRestored = () => {
        recoverMapIfNeeded(false);
      };
      canvas.addEventListener('webglcontextlost', onLost);
      canvas.addEventListener('webglcontextrestored', onRestored);
      canvasRecoveryCleanup = () => {
        canvas.removeEventListener('webglcontextlost', onLost);
        canvas.removeEventListener('webglcontextrestored', onRestored);
      };
    }

    async function boot(layoutAttempt = 0) {
      const myGen = mapBootGeneration;
      const stale = () => myGen !== mapBootGeneration;

      const host = containerRef.current;
      if (!host) return;
      const layout = host.getBoundingClientRect();
      if (layout.width < 1 || layout.height < 1) {
        if (layoutAttempt < 30 && !stale()) {
          setTimeout(() => {
            if (!stale()) void boot(layoutAttempt + 1);
          }, 50);
        }
        return;
      }

      const { atlasMode, eraId: initialEra, basemapMode, onboardingPhase } = useMapStore.getState();
      const atlasEra = atlasMode ? getAtlasEra(initialEra) : null;
      const onboarding = onboardingPhase !== 'complete' && !isOnboardingDone();
      const initialCenter: [number, number] = onboarding
        ? [2.0, 48.5]
        : atlasEra ? atlasEra.defaultCamera.center : [0.0, 49.2];
      const initialZoom = onboarding ? 4.2 : atlasEra ? atlasEra.defaultCamera.zoom : 5.8;

      let initialStyle: string | maplibregl.StyleSpecification = DARK_BASEMAP_URL;
      if (basemapMode === 'parchment') {
        try {
          initialStyle = await loadParchmentAtlasStyle();
        } catch (e) {
          console.warn('[MapCanvas] Parchment style fetch failed, using Voyager URL', e);
          initialStyle = PARCHMENT_BASEMAP_URL;
        }
      }

      if (stale() || !containerRef.current) return;

      map = new maplibregl.Map({
        container: containerRef.current,
        style: initialStyle,
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 2,
        maxZoom: MAP_MAX_ZOOM_FLAT,
        attributionControl: false,
        fadeDuration: 300,
      });

      map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');
      map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

      const overlay = new MapboxOverlay({ layers: [] });
      map.addControl(overlay as unknown as maplibregl.IControl);
      overlayRef.current = overlay;

      if (stale()) {
        map.remove();
        overlayRef.current = null;
        return;
      }

      mapRef.current = map;
      bumpMapInstance();
      attachCanvasRecovery(map);

      registerMapViewReader(() => {
        const m = mapRef.current;
        if (!m) return null;
        const c = m.getCenter();
        return { lng: c.lng, lat: c.lat, zoom: m.getZoom(), bearing: m.getBearing(), pitch: m.getPitch() };
      });

      const flushViewportBounds = () => {
        const m = mapRef.current;
        if (!m) return;
        const b = m.getBounds();
        viewportBoundsRef.current = {
          west: b.getWest(),
          south: b.getSouth(),
          east: b.getEast(),
          north: b.getNorth(),
        };
      };
      let boundsThrottleTimer: ReturnType<typeof setTimeout> | null = null;
      const scheduleViewportBoundsUpdate = () => {
        if (boundsThrottleTimer != null) return;
        boundsThrottleTimer = setTimeout(() => {
          boundsThrottleTimer = null;
          flushViewportBounds();
        }, 120);
      };
      registerMapBoundsReader(() => viewportBoundsRef.current);
      map.on('moveend', scheduleViewportBoundsUpdate);
      flushViewportBounds();

      map.on('load', async () => {
        if (!map) return;
        if (stale()) return;
        const theme = useMapStore.getState().basemapMode === 'parchment' ? 'parchment' : 'dark';
        await registerAtlasMapIcons(map, theme);
        if (stale() || !map) return;
        rebuildMapDataLayersRef.current(map);
        flushViewportBounds();

        syncMapLabelTextSize(map, useMapStore.getState().textSize);

        if (!interactionsAttachedRef.current) {
          interactionsAttachedRef.current = true;

      map.on('mousemove', 'regions-fill', (e) => {
        if (!e.features?.length) return;
        const id = e.features[0].properties?.id as string;

        if (hoveredRegionRef.current && hoveredRegionRef.current !== id) {
          setFeatureState(map!, hoveredRegionRef.current, { hover: false }, REGION_SOURCE);
        }
        hoveredRegionRef.current = id;
        setFeatureState(map!, id, { hover: true }, REGION_SOURCE);
        if (!hoveredSettlementRef.current) {
          hoverFeature(id, 'region');
          map!.getCanvas().style.cursor = 'pointer';

          const lState = useMapStore.getState().layers;
          if (lState['cultural-origins']) {
            const props = e.features[0].properties;
            const summary = props?.culturalHoverSummary as string | undefined;
            if (summary) {
              showTooltip({
                x: e.point.x,
                y: e.point.y,
                title: (props?.name as string) ?? id,
                detail: summary,
                hint: 'Click for full cultural breakdown',
              });
            }
          }
        }
      });

      map.on('mouseleave', 'regions-fill', () => {
        if (hoveredRegionRef.current) {
          setFeatureState(map!, hoveredRegionRef.current, { hover: false }, REGION_SOURCE);
          hoveredRegionRef.current = null;
        }
        if (!hoveredSettlementRef.current) {
          hoverFeature(null);
          map!.getCanvas().style.cursor = '';
        }
        if (tooltipRef.current && useMapStore.getState().layers['cultural-origins']) {
          showTooltip(null);
        }
      });

      map.on('mousemove', HISTORICAL_PRESENCE_FILL, (e) => {
        if (!e.features?.length) return;
        if (!useMapStore.getState().layers['historical-presence']) return;
        const id = e.features[0].properties?.id as string;
        const props = e.features[0].properties;
        if (hoveredHistoricalMacroRef.current && hoveredHistoricalMacroRef.current !== id) {
          setFeatureState(map!, hoveredHistoricalMacroRef.current, { hover: false }, HISTORICAL_PRESENCE_SOURCE);
        }
        hoveredHistoricalMacroRef.current = id;
        setFeatureState(map!, id, { hover: true }, HISTORICAL_PRESENCE_SOURCE);
        hoverFeature(id, 'historical-macro-region');
        map!.getCanvas().style.cursor = 'pointer';
        const summary = props?.hoverSummary as string | undefined;
        if (summary) {
          showTooltip({
            x: e.point.x,
            y: e.point.y,
            title: (props?.name as string) ?? id,
            detail: summary,
            hint: 'Click for sources & breakdown — weights are relative prominence, not DNA %',
          });
        }
      });

      map.on('mouseleave', HISTORICAL_PRESENCE_FILL, () => {
        if (hoveredHistoricalMacroRef.current) {
          setFeatureState(map!, hoveredHistoricalMacroRef.current, { hover: false }, HISTORICAL_PRESENCE_SOURCE);
          hoveredHistoricalMacroRef.current = null;
        }
        hoverFeature(null);
        map!.getCanvas().style.cursor = '';
        if (tooltipRef.current && useMapStore.getState().layers['historical-presence']) {
          showTooltip(null);
        }
      });

      map.on('mousemove', 'settlements-circles', (e) => {
        if (!e.features?.length) return;
        const id = e.features[0].properties?.id as string;

        if (hoveredSettlementRef.current && hoveredSettlementRef.current !== id) {
          setFeatureState(map!, hoveredSettlementRef.current, { hover: false }, SETTLEMENT_SOURCE);
        }
        hoveredSettlementRef.current = id;
        setFeatureState(map!, id, { hover: true }, SETTLEMENT_SOURCE);
        hoverFeature(id, 'settlement');
        map!.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'settlements-circles', () => {
        if (hoveredSettlementRef.current) {
          setFeatureState(map!, hoveredSettlementRef.current, { hover: false }, SETTLEMENT_SOURCE);
          hoveredSettlementRef.current = null;
        }
        if (hoveredRegionRef.current) {
          hoverFeature(hoveredRegionRef.current, 'region');
        } else {
          hoverFeature(null);
          map!.getCanvas().style.cursor = '';
        }
      });

      const normandyHoverLayers = [EVIDENCE_CIRCLES, EVIDENCE_ICONS, TOPONYMY_CIRCLES, DENSITY_CIRCLES];

      map.on('mousemove', (e) => {
        const validLayers = normandyHoverLayers.filter((lid) => map!.getLayer(lid));
        const features =
          validLayers.length > 0
            ? map!.queryRenderedFeatures(e.point, { layers: validLayers })
            : [];

        if (features.length > 0) {
          const f = features[0];
          const props = f.properties ?? {};
          const layerId = f.layer?.id ?? '';
          const pt = e.point;

          if (layerId === EVIDENCE_CIRCLES || layerId === EVIDENCE_ICONS) {
            const kind = props.kind as string;
            const kindLabel = kind === 'burial' ? 'Burial Site' : kind === 'weapon' ? 'Weapon Find' : 'Fortification';
            showTooltip({
              x: pt.x,
              y: pt.y,
              title: props.label as string,
              subtitle: `${kindLabel} · ${props.dateStart}–${props.dateEnd}`,
              detail: props.certainty === 'probable' ? 'Probable identification' : undefined,
            });
          } else if (layerId === TOPONYMY_CIRCLES) {
            const hasCount = props.point_count != null;
            if (hasCount) {
              showTooltip({
                x: pt.x,
                y: pt.y,
                title: `${props.point_count} Norse place names`,
                subtitle: 'Zoom in for details',
              });
            } else {
              showTooltip({
                x: pt.x,
                y: pt.y,
                title: props.name as string,
                subtitle: `-${props.suffix}`,
                detail: props.etymology as string,
              });
            }
          } else if (layerId === DENSITY_CIRCLES) {
            showTooltip({
              x: pt.x,
              y: pt.y,
              title: `${props.cluster} · ${(props.density as string).replace('_', ' ')}`,
              subtitle: props.presence === 'confirmed' ? 'Confirmed presence' : 'Probable presence',
              detail: props.rationale as string,
            });
          }
          map!.getCanvas().style.cursor = 'pointer';
          return;
        }

        const store = useMapStore.getState();
        if (store.atlasMode && (store.layers['routes'] ?? true) && overlayRef.current) {
          const seg = pickAtlasRouteSegment(overlayRef.current, map!, e);
          if (seg) {
            showTooltip({
              x: e.point.x,
              y: e.point.y,
              ...atlasRouteTooltipFields(seg),
            });
            map!.getCanvas().style.cursor = 'pointer';
            return;
          }
        }

        if ((store.layers['norman-expansion-routes'] ?? false) && overlayRef.current) {
          const rect = map!.getCanvas().getBoundingClientRect();
          const cx = e.originalEvent.clientX - rect.left;
          const cy = e.originalEvent.clientY - rect.top;
          const r = 14;
          const picks = overlayRef.current.pickObjects({ x: cx - r, y: cy - r, width: r * 2, height: r * 2, layerIds: [...NORMAN_EXP_ARC_LAYER_IDS] });
          if (picks.length) {
            const d = picks[0].object as NormanExpansionRoute;
            showTooltip({ x: e.point.x, y: e.point.y, title: d.label, subtitle: d.subtitle });
            map!.getCanvas().style.cursor = 'pointer';
            return;
          }
        }

        if (map!.getLayer(NORMAN_NODES_CIRCLES)) {
          const nodeFeats = map!.queryRenderedFeatures(e.point, { layers: [NORMAN_NODES_CIRCLES] });
          if (nodeFeats.length) {
            const p = nodeFeats[0].properties!;
            const nodeId = p.id as string;
            if (hoveredNormanNodeRef.current && hoveredNormanNodeRef.current !== nodeId) {
              setFeatureState(map!, hoveredNormanNodeRef.current, { hover: false }, NORMAN_NODES_SOURCE);
            }
            hoveredNormanNodeRef.current = nodeId;
            setFeatureState(map!, nodeId, { hover: true }, NORMAN_NODES_SOURCE);
            showTooltip({ x: e.point.x, y: e.point.y, title: p.name as string, subtitle: p.role as string, detail: p.date as string });
            map!.getCanvas().style.cursor = 'pointer';
            return;
          } else if (hoveredNormanNodeRef.current) {
            setFeatureState(map!, hoveredNormanNodeRef.current, { hover: false }, NORMAN_NODES_SOURCE);
            hoveredNormanNodeRef.current = null;
          }
        }

        if (map!.getLayer(NF_YDNA_CIRCLES)) {
          const ydnaFeats = map!.queryRenderedFeatures(e.point, { layers: [NF_YDNA_CIRCLES] });
          if (ydnaFeats.length) {
            const p = ydnaFeats[0].properties!;
            const fid = p.id as string;
            if (hoveredYdnaRef.current && hoveredYdnaRef.current !== fid) {
              setFeatureState(map!, hoveredYdnaRef.current, { hover: false }, NF_YDNA_SOURCE);
            }
            hoveredYdnaRef.current = fid;
            setFeatureState(map!, fid, { hover: true }, NF_YDNA_SOURCE);
            showTooltip({ x: e.point.x, y: e.point.y, title: p.displayLabel as string, subtitle: p.yMajor as string, detail: `m. ${p.marriageYear}` });
            map!.getCanvas().style.cursor = 'pointer';
            return;
          } else if (hoveredYdnaRef.current) {
            setFeatureState(map!, hoveredYdnaRef.current, { hover: false }, NF_YDNA_SOURCE);
            hoveredYdnaRef.current = null;
          }
        }

        if ((store.layers['user-ancestry-pins'] ?? false) && map!.getLayer(USER_ANCESTRY_CIRCLES)) {
          const uFeats = map!.queryRenderedFeatures(e.point, { layers: [USER_ANCESTRY_CIRCLES] });
          if (uFeats.length) {
            const p = uFeats[0].properties!;
            const fid = p.id as string;
            if (hoveredUserAncestryPinRef.current && hoveredUserAncestryPinRef.current !== fid) {
              setFeatureState(map!, hoveredUserAncestryPinRef.current, { hover: false }, USER_ANCESTRY_SOURCE);
            }
            hoveredUserAncestryPinRef.current = fid;
            setFeatureState(map!, fid, { hover: true }, USER_ANCESTRY_SOURCE);
            showTooltip({
              x: e.point.x,
              y: e.point.y,
              title: p.name as string,
              subtitle: p.pinKind === 'birth' ? 'Birth (your tree)' : 'Death (your tree)',
              detail: p.label as string,
            });
            map!.getCanvas().style.cursor = 'pointer';
            return;
          } else if (hoveredUserAncestryPinRef.current) {
            setFeatureState(map!, hoveredUserAncestryPinRef.current, { hover: false }, USER_ANCESTRY_SOURCE);
            hoveredUserAncestryPinRef.current = null;
          }
        }

        if (map!.getLayer(VIKING_ADNA_CIRCLES)) {
          const vaFeats = map!.queryRenderedFeatures(e.point, { layers: [VIKING_ADNA_CIRCLES] });
          if (vaFeats.length) {
            const p = vaFeats[0].properties!;
            const fid = p.id as string;
            if (hoveredVikingAdnaRef.current && hoveredVikingAdnaRef.current !== fid) {
              setFeatureState(map!, hoveredVikingAdnaRef.current, { hover: false }, VIKING_ADNA_SOURCE);
            }
            hoveredVikingAdnaRef.current = fid;
            setFeatureState(map!, fid, { hover: true }, VIKING_ADNA_SOURCE);
            showTooltip({
              x: e.point.x, y: e.point.y,
              title: p.siteName as string,
              subtitle: (p.burialContextType as string) ?? 'Burial site',
              detail: `${p.sampleCount} sample${(p.sampleCount as number) > 1 ? 's' : ''} · ${p.dateStart}–${p.dateEnd} CE`,
              hint: 'Click for genetics, archaeology & sources',
            });
            map!.getCanvas().style.cursor = 'pointer';
            return;
          } else if (hoveredVikingAdnaRef.current) {
            setFeatureState(map!, hoveredVikingAdnaRef.current, { hover: false }, VIKING_ADNA_SOURCE);
            hoveredVikingAdnaRef.current = null;
          }
        }

        if (map!.getLayer(VIKING_ARCH_CIRCLES)) {
          const archFeats = map!.queryRenderedFeatures(e.point, { layers: [VIKING_ARCH_CIRCLES] });
          if (archFeats.length) {
            const p = archFeats[0].properties!;
            const fid = p.id as string;
            if (hoveredVikingArchRef.current && hoveredVikingArchRef.current !== fid) {
              setFeatureState(map!, hoveredVikingArchRef.current, { hover: false }, VIKING_ARCH_SOURCE);
            }
            hoveredVikingArchRef.current = fid;
            setFeatureState(map!, fid, { hover: true }, VIKING_ARCH_SOURCE);
            showTooltip({
              x: e.point.x, y: e.point.y,
              title: p.name as string,
              subtitle: (p.siteType as string).replace(/_/g, ' '),
              detail: `${p.dateStart}–${p.dateEnd} CE`,
              hint: 'Click for details & sources',
            });
            map!.getCanvas().style.cursor = 'pointer';
            return;
          } else if (hoveredVikingArchRef.current) {
            setFeatureState(map!, hoveredVikingArchRef.current, { hover: false }, VIKING_ARCH_SOURCE);
            hoveredVikingArchRef.current = null;
          }
        }

        if (tooltipRef.current) showTooltip(null);
        if (!hoveredSettlementRef.current && !hoveredRegionRef.current) {
          map!.getCanvas().style.cursor = '';
        }
      });

      map.on('mouseleave', EVIDENCE_CIRCLES, () => { if (tooltipRef.current) showTooltip(null); });
      map.on('mouseleave', TOPONYMY_CIRCLES, () => { if (tooltipRef.current) showTooltip(null); });
      map.on('mouseleave', DENSITY_CIRCLES, () => { if (tooltipRef.current) showTooltip(null); });
      map.on('mouseleave', NORMAN_NODES_CIRCLES, () => {
        if (tooltipRef.current) showTooltip(null);
        if (hoveredNormanNodeRef.current && map!.getSource(NORMAN_NODES_SOURCE)) {
          setFeatureState(map!, hoveredNormanNodeRef.current, { hover: false }, NORMAN_NODES_SOURCE);
          hoveredNormanNodeRef.current = null;
        }
      });
      map.on('mouseleave', NF_YDNA_CIRCLES, () => {
        if (tooltipRef.current) showTooltip(null);
        if (hoveredYdnaRef.current && map!.getSource(NF_YDNA_SOURCE)) {
          setFeatureState(map!, hoveredYdnaRef.current, { hover: false }, NF_YDNA_SOURCE);
          hoveredYdnaRef.current = null;
        }
      });
      map.on('mouseleave', USER_ANCESTRY_CIRCLES, () => {
        if (tooltipRef.current) showTooltip(null);
        if (hoveredUserAncestryPinRef.current && map!.getSource(USER_ANCESTRY_SOURCE)) {
          setFeatureState(map!, hoveredUserAncestryPinRef.current, { hover: false }, USER_ANCESTRY_SOURCE);
          hoveredUserAncestryPinRef.current = null;
        }
      });
      map.on('mouseleave', VIKING_ADNA_CIRCLES, () => {
        if (tooltipRef.current) showTooltip(null);
        if (hoveredVikingAdnaRef.current && map!.getSource(VIKING_ADNA_SOURCE)) {
          setFeatureState(map!, hoveredVikingAdnaRef.current, { hover: false }, VIKING_ADNA_SOURCE);
          hoveredVikingAdnaRef.current = null;
        }
      });
      map.on('mouseleave', VIKING_ARCH_CIRCLES, () => {
        if (tooltipRef.current) showTooltip(null);
        if (hoveredVikingArchRef.current && map!.getSource(VIKING_ARCH_SOURCE)) {
          setFeatureState(map!, hoveredVikingArchRef.current, { hover: false }, VIKING_ARCH_SOURCE);
          hoveredVikingArchRef.current = null;
        }
      });

      map.on('click', (e) => {
        if (!readyRef.current) return;

        const clickStore = useMapStore.getState();
        if (clickStore.atlasMode && (clickStore.layers['routes'] ?? true) && overlayRef.current) {
          const seg = pickAtlasRouteSegment(overlayRef.current, map!, e);
          if (seg) {
            showTooltip({
              x: e.point.x,
              y: e.point.y,
              ...atlasRouteTooltipFields(seg),
            });
            selectFeature(seg.id, 'atlas-route');
            return;
          }
        }

        const clearPrev = () => {
          if (selectedRegionRef.current) {
            setFeatureState(map!, selectedRegionRef.current, { selected: false }, REGION_SOURCE);
            selectedRegionRef.current = null;
          }
          if (selectedSettlementRef.current) {
            setFeatureState(map!, selectedSettlementRef.current, { selected: false }, SETTLEMENT_SOURCE);
            selectedSettlementRef.current = null;
          }
          if (selectedNormanNodeRef.current && map!.getSource(NORMAN_NODES_SOURCE)) {
            setFeatureState(map!, selectedNormanNodeRef.current, { selected: false }, NORMAN_NODES_SOURCE);
            selectedNormanNodeRef.current = null;
          }
          if (selectedYdnaRef.current && map!.getSource(NF_YDNA_SOURCE)) {
            setFeatureState(map!, selectedYdnaRef.current, { selected: false }, NF_YDNA_SOURCE);
            selectedYdnaRef.current = null;
          }
          if (selectedVikingAdnaRef.current && map!.getSource(VIKING_ADNA_SOURCE)) {
            setFeatureState(map!, selectedVikingAdnaRef.current, { selected: false }, VIKING_ADNA_SOURCE);
            selectedVikingAdnaRef.current = null;
          }
          if (selectedVikingArchRef.current && map!.getSource(VIKING_ARCH_SOURCE)) {
            setFeatureState(map!, selectedVikingArchRef.current, { selected: false }, VIKING_ARCH_SOURCE);
            selectedVikingArchRef.current = null;
          }
          if (selectedHistoricalMacroRef.current && map!.getSource(HISTORICAL_PRESENCE_SOURCE)) {
            setFeatureState(map!, selectedHistoricalMacroRef.current, { selected: false }, HISTORICAL_PRESENCE_SOURCE);
            selectedHistoricalMacroRef.current = null;
          }
          if (selectedUserAncestryPinRef.current && map!.getSource(USER_ANCESTRY_SOURCE)) {
            setFeatureState(map!, selectedUserAncestryPinRef.current, { selected: false }, USER_ANCESTRY_SOURCE);
            selectedUserAncestryPinRef.current = null;
          }
        };

        if (map!.getLayer(EVIDENCE_CIRCLES)) {
          const evFeats = map!.queryRenderedFeatures(e.point, { layers: [EVIDENCE_CIRCLES] });
          if (evFeats.length) {
            const id = evFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectFeature(id, 'evidence');
              return;
            }
          }
        }

        const prehistoryClickLayers = [PREHISTORIC_SITES_CIRCLES, HILLFORTS_CIRCLES].filter((l) => map!.getLayer(l));
        if (prehistoryClickLayers.length) {
          const pFeats = map!.queryRenderedFeatures(e.point, { layers: prehistoryClickLayers });
          if (pFeats.length) {
            const id = pFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectFeature(id, 'prehistoric-site');
              return;
            }
          }
        }

        if (map!.getLayer('settlements-circles')) {
          const sFeats = map!.queryRenderedFeatures(e.point, { layers: ['settlements-circles'] });
          if (sFeats.length) {
            const id = sFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedSettlementRef.current = id;
              setFeatureState(map!, id, { selected: true }, SETTLEMENT_SOURCE);
              selectFeature(id, 'settlement');
              return;
            }
          }
        }

        if (map!.getLayer(NORMAN_NODES_CIRCLES)) {
          const nFeats = map!.queryRenderedFeatures(e.point, { layers: [NORMAN_NODES_CIRCLES] });
          if (nFeats.length) {
            const id = nFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedNormanNodeRef.current = id;
              setFeatureState(map!, id, { selected: true }, NORMAN_NODES_SOURCE);
              selectFeature(id, 'norman-site');
              return;
            }
          }
        }

        if (map!.getLayer(NF_YDNA_CIRCLES)) {
          const yFeats = map!.queryRenderedFeatures(e.point, { layers: [NF_YDNA_CIRCLES] });
          if (yFeats.length) {
            const id = yFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedYdnaRef.current = id;
              setFeatureState(map!, id, { selected: true }, NF_YDNA_SOURCE);
              selectFeature(id, 'nf-ydna-lineage');
              return;
            }
          }
        }

        if ((clickStore.layers['user-ancestry-pins'] ?? false) && map!.getLayer(USER_ANCESTRY_CIRCLES)) {
          const uFeats = map!.queryRenderedFeatures(e.point, { layers: [USER_ANCESTRY_CIRCLES] });
          if (uFeats.length) {
            const id = uFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedUserAncestryPinRef.current = id;
              setFeatureState(map!, id, { selected: true }, USER_ANCESTRY_SOURCE);
              selectFeature(id, 'user-ancestry-pin');
              return;
            }
          }
        }

        if (map!.getLayer(VIKING_ADNA_CIRCLES)) {
          const vaFeats = map!.queryRenderedFeatures(e.point, { layers: [VIKING_ADNA_CIRCLES] });
          if (vaFeats.length) {
            const id = vaFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedVikingAdnaRef.current = id;
              setFeatureState(map!, id, { selected: true }, VIKING_ADNA_SOURCE);
              selectFeature(id, 'viking-adna-site');
              return;
            }
          }
        }

        if (map!.getLayer(VIKING_ARCH_CIRCLES)) {
          const archFeats = map!.queryRenderedFeatures(e.point, { layers: [VIKING_ARCH_CIRCLES] });
          if (archFeats.length) {
            const id = archFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedVikingArchRef.current = id;
              setFeatureState(map!, id, { selected: true }, VIKING_ARCH_SOURCE);
              selectFeature(id, 'viking-archaeology-site');
              return;
            }
          }
        }

        if (clickStore.layers['historical-presence'] && map!.getLayer(HISTORICAL_PRESENCE_FILL)) {
          const hFeats = map!.queryRenderedFeatures(e.point, { layers: [HISTORICAL_PRESENCE_FILL] });
          if (hFeats.length) {
            const id = hFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedHistoricalMacroRef.current = id;
              setFeatureState(map!, id, { selected: true }, HISTORICAL_PRESENCE_SOURCE);
              selectFeature(id, 'historical-macro-region');
              return;
            }
          }
        }

        if (map!.getLayer('regions-fill')) {
          const rFeats = map!.queryRenderedFeatures(e.point, { layers: ['regions-fill'] });
          if (rFeats.length) {
            const id = rFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedRegionRef.current = id;
              setFeatureState(map!, id, { selected: true }, REGION_SOURCE);
              selectFeature(id, 'region');
              return;
            }
          }
        }

        clearPrev();
        selectFeature(null);
      });

        }

        const loadState = useMapStore.getState();
        if (loadState.atlasMode && (loadState.onboardingPhase === 'complete' || isOnboardingDone())) {
          const initialAtlasEra = getAtlasEra(loadState.eraId);
          if (initialAtlasEra?.summary) {
            loadState.selectFeature(loadState.eraId, 'era-info', { expandDetail: false });
          }
        }

        const syncMapBearing = () => {
          if (stale() || !map) return;
          setMapBearing(map.getBearing());
        };
        map.on('rotate', syncMapBearing);
        map.on('pitchend', syncMapBearing);
        syncMapBearing();

        readyRef.current = true;
        tryRunOnboardingFly(map);

        // Flush any pending fly target set before the map was ready (e.g. deep link).
        const pending = useMapStore.getState().pendingFlyTarget;
        if (pending) {
          useMapStore.getState().setPendingFlyTarget(null);
          flyToCamera(map, {
            center: pending.center,
            zoom: pending.zoom,
            bearing: pending.bearing,
            pitch: pending.pitch,
          });
        }
      });

      if (containerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          map?.resize();
        });
        resizeObserver.observe(containerRef.current);
      }
    };

    const onVisibility = () => {
      if (document.visibilityState !== 'visible') return;
      requestAnimationFrame(() => recoverMapIfNeeded(false));
      setTimeout(() => recoverMapIfNeeded(false), 50);
      setTimeout(() => recoverMapIfNeeded(false), 250);
    };

    const onPageShow = (e: PageTransitionEvent) => {
      recoverMapIfNeeded(e.persisted);
    };

    const onLayoutShift = () => {
      setTimeout(() => recoverMapIfNeeded(false), 50);
      setTimeout(() => recoverMapIfNeeded(false), 250);
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('resize', onLayoutShift);
    window.addEventListener('orientationchange', onLayoutShift);

    void boot(0);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('resize', onLayoutShift);
      window.removeEventListener('orientationchange', onLayoutShift);
      teardownMap();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.eraId,
      (eraId) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;

        setEraTransition(true);
        const timer = setTimeout(() => setEraTransition(false), 400);

        syncSources(eraId);
        syncOverlay(eraId, useMapStore.getState().layers);

        const { atlasMode, selectFeature, onboardingPhase, storyMode, storyStepIndex } = useMapStore.getState();
        if (atlasMode) {
          const era = getAtlasEra(eraId);
          if (era?.defaultCamera) {
            flyToCamera(map, {
              center: era.defaultCamera.center,
              zoom: era.defaultCamera.zoom,
              duration: era.defaultCamera.durationMs,
            });
          }
          if (era?.summary && onboardingPhase === 'complete') {
            if (storyMode) {
              selectFeature(eraId, 'era-info', {
                expandDetail: storyStepIndex === 0,
              });
            } else {
              selectFeature(eraId, 'era-info');
            }
          }
        }

        return () => clearTimeout(timer);
      },
    );
  }, [syncSources, syncOverlay]);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.onboardingPhase,
      (phase) => {
        if (phase === 'intro') resetOnboardingEntranceFly();
        if (phase === 'flying' || phase === 'guided') tryRunOnboardingFly(mapRef.current);
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.textSize,
      (mode) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        syncMapLabelTextSize(map, mode);
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.layers,
      (layers, prevLayers) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;

        for (const cfg of layerConfigs) {
          if (cfg.deckLayer) continue;
          setLayerVisibility(map, cfg.mapLayerIds, layers[cfg.id] ?? cfg.defaultOn);
        }

        // settler-origin-flows shortcut → open Migration Explorer + enable flow arcs
        const flowsOn = layers['settler-origin-flows'] ?? false;
        const prevFlowsOn = prevLayers['settler-origin-flows'] ?? false;
        if (flowsOn && !prevFlowsOn) {
          const store = useMapStore.getState();
          if (!store.migrationExplorerOpen) store.setMigrationExplorerOpen(true);
          if (!store.migrationFlowEnabled) store.setMigrationFlowEnabled(true);
        }

        const state = useMapStore.getState();
        syncOverlay(state.eraId, layers);

        const homelandChanged = (layers['viking-norse-homeland'] ?? true) !== (prevLayers['viking-norse-homeland'] ?? true);
        const culturalOriginsChanged = (layers['cultural-origins'] ?? false) !== (prevLayers['cultural-origins'] ?? false);
        const hpChanged = (layers['historical-presence'] ?? false) !== (prevLayers['historical-presence'] ?? false);
        if (homelandChanged && VIKING_MOVEMENT_ERA_IDS.has(state.eraId)) {
          syncSources(state.eraId);
        } else if (culturalOriginsChanged && state.atlasMode) {
          syncSources(state.eraId);
        }
        if (hpChanged && state.atlasMode && map.getSource(HISTORICAL_PRESENCE_SOURCE)) {
          updateHistoricalPresenceSource(
            map,
            buildHistoricalPresenceGeoJson(
              state.historicalPresenceYear,
              state.historicalPresenceView,
              state.locale,
            ),
          );
          const macroOn = state.layers['historical-presence'] ?? false;
          const compareGeo =
            macroOn && state.historicalPresenceCompareEnabled
              ? buildHistoricalPresenceGeoJson(
                  state.historicalPresenceCompareYear,
                  state.historicalPresenceView,
                  state.locale,
                )
              : EMPTY_HISTORICAL_PRESENCE_GEO;
          if (map.getSource(HISTORICAL_PRESENCE_COMPARE_SOURCE)) {
            updateHistoricalPresenceCompareSource(map, compareGeo);
          }
          setHistoricalPresenceCompareLayerVisibility(
            map,
            macroOn && state.historicalPresenceCompareEnabled,
          );
        }

        const lineageLayerChanged =
          (layers['lineage-explorer'] ?? false) !== (prevLayers['lineage-explorer'] ?? false);
        if (lineageLayerChanged && map.getSource(LINEAGE_EXPLORER_SOURCE)) {
          syncLineageExplorerMap(map);
        }

        const userAncestryLayerChanged =
          (layers['user-ancestry-pins'] ?? false) !== (prevLayers['user-ancestry-pins'] ?? false);
        if (userAncestryLayerChanged && map.getSource(USER_ANCESTRY_SOURCE)) {
          syncUserAncestryPins(map);
        }
      },
    );
  }, [syncOverlay, syncSources]);

  useEffect(() => {
    return useAncestryStore.subscribe(
      (s) => s.people,
      () => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        if (map.getSource(USER_ANCESTRY_SOURCE)) syncUserAncestryPins(map);
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => ({
        layerOn: s.layers['lineage-explorer'] ?? false,
        pid: s.lineageExplorerProfileId,
        lens: s.lineageExplorerEraLens,
        atlasMode: s.atlasMode,
      }),
      (cur, prev) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        if (
          prev &&
          cur.layerOn === prev.layerOn &&
          cur.pid === prev.pid &&
          cur.lens === prev.lens &&
          cur.atlasMode === prev.atlasMode
        ) {
          return;
        }
        if (map.getSource(LINEAGE_EXPLORER_SOURCE)) syncLineageExplorerMap(map);
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => ({
        y: s.historicalPresenceYear,
        v: s.historicalPresenceView,
        loc: s.locale,
        atlasMode: s.atlasMode,
        ce: s.historicalPresenceCompareEnabled,
        cy: s.historicalPresenceCompareYear,
        macroOn: s.layers['historical-presence'] ?? false,
      }),
      (cur, prev) => {
        const map = mapRef.current;
        if (!map || !readyRef.current || !cur.atlasMode) return;
        if (!map.getSource(HISTORICAL_PRESENCE_SOURCE)) return;
        if (
          prev &&
          cur.y === prev.y &&
          cur.v === prev.v &&
          cur.loc === prev.loc &&
          cur.ce === prev.ce &&
          cur.cy === prev.cy &&
          cur.macroOn === prev.macroOn
        ) {
          return;
        }
        updateHistoricalPresenceSource(map, buildHistoricalPresenceGeoJson(cur.y, cur.v, cur.loc));
        const compareGeo =
          cur.macroOn && cur.ce
            ? buildHistoricalPresenceGeoJson(cur.cy, cur.v, cur.loc)
            : EMPTY_HISTORICAL_PRESENCE_GEO;
        if (map.getSource(HISTORICAL_PRESENCE_COMPARE_SOURCE)) {
          updateHistoricalPresenceCompareSource(map, compareGeo);
        }
        setHistoricalPresenceCompareLayerVisibility(map, cur.macroOn && cur.ce);
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => ({ id: s.selectedFeatureId, kind: s.selectionKind }),
      ({ id: newId, kind }, { id: prevId, kind: prevKind }) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;

        const sourceForKind = (k: typeof kind) => {
          if (k === 'settlement') return SETTLEMENT_SOURCE;
          if (k === 'norman-site') return NORMAN_NODES_SOURCE;
          if (k === 'nf-ydna-lineage') return NF_YDNA_SOURCE;
          if (k === 'user-ancestry-pin') return USER_ANCESTRY_SOURCE;
          if (k === 'region') return REGION_SOURCE;
          if (k === 'historical-macro-region') return HISTORICAL_PRESENCE_SOURCE;
          return null;
        };

        if (prevId && prevId !== newId) {
          const prevSource = sourceForKind(prevKind);
          if (prevSource && map!.getSource(prevSource)) {
            setFeatureState(map!, prevId, { selected: false }, prevSource);
          }
        }
        if (newId) {
          const source = sourceForKind(kind);
          if (source && map!.getSource(source)) {
            setFeatureState(map!, newId, { selected: true }, source);
          }
          if (kind === 'region') selectedRegionRef.current = newId;
          else if (kind === 'norman-site') selectedNormanNodeRef.current = newId;
          else if (kind === 'nf-ydna-lineage') selectedYdnaRef.current = newId;
          else if (kind === 'user-ancestry-pin') selectedUserAncestryPinRef.current = newId;
          else if (kind === 'historical-macro-region') selectedHistoricalMacroRef.current = newId;
          else selectedSettlementRef.current = newId;
        } else {
          selectedRegionRef.current = null;
          selectedSettlementRef.current = null;
          selectedNormanNodeRef.current = null;
          selectedYdnaRef.current = null;
          selectedHistoricalMacroRef.current = null;
          selectedUserAncestryPinRef.current = null;
        }
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => ({ storyMode: s.storyMode, stepIndex: s.storyStepIndex, atlasMode: s.atlasMode, storyArc: s.storyArc, storyMapFollow: s.storyMapFollow, storyViewMode: s.storyViewMode }),
      ({ storyMode, stepIndex, atlasMode, storyArc, storyMapFollow, storyViewMode }) => {
        const map = mapRef.current;
        if (!map || !readyRef.current || !storyMode || !storyMapFollow) return;

        if (atlasMode) {
          const beat = getBeat(Math.min(stepIndex, getBeatCount(storyArc) - 1), storyArc);
          if (!beat?.camera) return;
          const cam = (storyViewMode === 'impact' && beat.impactVariant?.camera)
            ? { ...beat.camera, ...beat.impactVariant.camera }
            : beat.camera;
          flyToCamera(map, {
            center: cam.center,
            zoom: cam.zoom,
            duration: cam.durationMs,
          });
        } else {
          const step = normanAtlanticStory[Math.min(stepIndex, normanAtlanticStory.length - 1)];
          if (!step?.camera) return;
          flyToCamera(map, step.camera);
        }
      },
    );
  }, []);

  // Gallery image cycling — fly map to each slide's anchor
  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.storyImageGallery,
      (gallery, prev) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        const { storyMode, atlasMode, storyArc, storyStepIndex, storyMapFollow, storyViewMode } = useMapStore.getState();

        if (gallery.open && gallery.beatId) {
          const beat = getBeat(Math.min(storyStepIndex, getBeatCount(storyArc) - 1), storyArc);
          if (!beat?.illustrations?.length) return;
          const slide = beat.illustrations[Math.min(gallery.activeIndex, beat.illustrations.length - 1)];
          if (!slide) return;
          const anchor = resolveSlideAnchor(slide, beat);
          if (!anchor) return;
          flyToCamera(map, {
            center: anchor,
            zoom: slide.zoom ?? beat.camera.zoom,
            duration: 1500,
          });
        } else if (!gallery.open && prev.open && storyMode && storyMapFollow) {
          // Gallery just closed — restore beat camera
          if (atlasMode) {
            const beat = getBeat(Math.min(storyStepIndex, getBeatCount(storyArc) - 1), storyArc);
            if (!beat?.camera) return;
            const effective = getEffectiveStoryBeat(beat, {
              cinematic: storyArc != null && CINEMATIC_OCEAN_ARC_IDS.has(storyArc),
              storyViewMode,
            });
            flyToCamera(map, {
              center: effective.camera.center,
              zoom: effective.camera.zoom,
              duration: effective.camera.durationMs,
            });
          }
        }
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.activeJourneyId,
      () => {
        const { eraId, layers } = useMapStore.getState();
        syncOverlay(eraId, layers);
      },
    );
  }, [syncOverlay]);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.explorationRoutesYearStrict,
      () => {
        const { eraId, layers } = useMapStore.getState();
        syncOverlay(eraId, layers);
      },
    );
  }, [syncOverlay]);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.ydnaScandinavianFilter,
      (scandinavianOnly) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        applyNfYdnaOriginFilter(map, scandinavianOnly);
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.normandySimYear,
      (year) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        setExpansionYearFilter(map, year);
      },
    );
  }, []);

  // Sim year → territory overlay + region fills + time-gated routes
  const lastTerritoryKeyRef = useRef<string | null>(null);
  const lastRegionKeyRef = useRef<string | null>(null);
  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.atlasSimYear,
      (simYear) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        const { eraId, atlasMode, layers } = useMapStore.getState();
        if (!atlasMode) return;

        if (isColonialEra(eraId)) {
          const colYear = colonialYearFromEra(eraId, simYear);

          const geojson = getTerritoryForYear(colYear);
          const tKey = geojson.features.map((f) => f.properties.id).join(',');
          if (tKey !== lastTerritoryKeyRef.current) {
            lastTerritoryKeyRef.current = tKey;
            updateNewFranceTerritorySource(map, geojson);
            syncOverlay(eraId, layers);
          }

          const regionsGeoJson = getAtlasRegionsForColonialYear(eraId, colYear);
          const rKey = regionsGeoJson.features.map((f) => f.properties.id).join(',');
          if (rKey !== lastRegionKeyRef.current) {
            lastRegionKeyRef.current = rKey;
            updateRegionSource(map, regionsGeoJson);
          }

        } else if (VIKING_MOVEMENT_ERA_IDS.has(eraId)) {
          const regionsGeoJson = getVikingRegionsFiltered(eraId, simYear);
          const rKey = regionsGeoJson.features.map((f) => f.properties.id).join(',');
          if (rKey !== lastRegionKeyRef.current) {
            lastRegionKeyRef.current = rKey;
            updateRegionSource(map, regionsGeoJson);
          }
          applyVikingTerritoryFade(map, getVikingTerritoryFadeStates(simYear));
          updateVikingBattleSource(map, buildVikingBattleGeoJson(simYear));
          const vf = useMapStore.getState().vikingAdnaFilter;
          setVikingAdnaFilters(map, { simYear, country: vf.country, burialContext: vf.burialContext });
          setVikingArchYearFilter(map, simYear);
          syncOverlay(eraId, layers);
        }
      },
    );
  }, [syncOverlay]);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.normanNodePeriod,
      (period) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        setNormanNodePeriodFilter(map, period);
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.vikingAdnaFilter,
      (filter) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        const { atlasSimYear } = useMapStore.getState();
        setVikingAdnaFilters(map, { simYear: atlasSimYear, country: filter.country, burialContext: filter.burialContext });
      },
    );
  }, []);

  // Route flow animation loop — runs at ~30fps when toggled on
  useEffect(() => {
    let rafId = 0;
    let running = false;

    function tick() {
      if (!running) return;
      const { eraId, layers } = useMapStore.getState();
      syncOverlay(eraId, layers);
      rafId = requestAnimationFrame(tick);
    }

    const unsub = useMapStore.subscribe(
      (s) => s.layers['route-flow-animation'] ?? false,
      (flowOn) => {
        if (flowOn && !running) {
          running = true;
          rafId = requestAnimationFrame(tick);
        } else if (!flowOn && running) {
          running = false;
          cancelAnimationFrame(rafId);
          const { eraId, layers } = useMapStore.getState();
          syncOverlay(eraId, layers);
        }
      },
    );

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      unsub();
    };
  }, [syncOverlay]);

  // --- Pending fly target (one-shot camera requests from UI) ---
  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.pendingFlyTarget,
      (target) => {
        if (!target) return;
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        useMapStore.getState().setPendingFlyTarget(null);
        flyToCamera(map, {
          center: target.center,
          zoom: target.zoom,
          bearing: target.bearing,
          pitch: target.pitch,
        });
      },
    );
  }, []);

  // --- Cinematic flythrough controller ---
  const flythroughAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.cinematicFlythrough?.presetId ?? null,
      (presetId) => {
        // Abort any running flythrough first
        if (flythroughAbortRef.current) {
          flythroughAbortRef.current.abort();
          flythroughAbortRef.current = null;
        }

        const map = mapRef.current;
        if (!map || !readyRef.current || !presetId) {
          // Re-enable interactions when stopping
          try {
            map?.dragPan.enable();
            map?.dragRotate.enable();
            map?.scrollZoom.enable();
            map?.doubleClickZoom.enable();
          } catch { /* map may not be ready */ }
          return;
        }

        const preset = getFlythroughPreset(presetId);
        if (!preset) { useMapStore.getState().stopCinematicFlythrough(); return; }

        const polylines = preset.journeyIds
          .map((jid) => getJourneyPolyline(jid))
          .filter((p): p is NonNullable<typeof p> => p !== null);

        if (polylines.length === 0) { useMapStore.getState().stopCinematicFlythrough(); return; }

        // Set era + first journey for deck highlighting
        useMapStore.getState().setEra(preset.defaultEraId);
        useMapStore.getState().setActiveJourney(preset.journeyIds[0]);

        // Disable user interaction during flythrough
        map.dragPan.disable();
        map.dragRotate.disable();
        map.scrollZoom.disable();
        map.doubleClickZoom.disable();

        const abort = new AbortController();
        flythroughAbortRef.current = abort;

        const { setCinematicFlythroughProgress, setCinematicFlythroughAct, setActiveJourney, stopCinematicFlythrough } = useMapStore.getState();

        runMultiActFlythrough(
          map,
          polylines,
          { durationMs: polylines.length > 1 ? 40_000 : 50_000, interActPauseMs: 2500 },
          (actIndex) => {
            setCinematicFlythroughAct(actIndex);
            if (preset.journeyIds[actIndex]) {
              setActiveJourney(preset.journeyIds[actIndex]);
              syncOverlay(useMapStore.getState().eraId, useMapStore.getState().layers);
            }
          },
          (progress) => setCinematicFlythroughProgress(progress),
          abort.signal,
        ).then(() => {
          stopCinematicFlythrough();
        }).catch((err) => {
          if (err instanceof DOMException && err.name === 'AbortError') return;
          console.error('[MapCanvas] flythrough error:', err);
          stopCinematicFlythrough();
        }).finally(() => {
          try {
            map.dragPan.enable();
            map.dragRotate.enable();
            map.scrollZoom.enable();
            map.doubleClickZoom.enable();
            if (computeEffectiveReducedMotion(readStoredReduceMotionForced())) {
              map.jumpTo({ pitch: 0, bearing: 0, zoom: 5.8 });
            } else {
              map.easeTo({ pitch: 0, bearing: 0, zoom: 5.8, duration: 1800 });
            }
          } catch { /* map may have been destroyed */ }
        });
      },
    );
  }, [syncOverlay]);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.basemapMode,
      (mode) => {
        const map = mapRef.current;
        if (!map) return;
        readyRef.current = false;
        showTooltip(null);

        const finishStyleSwitch = async () => {
          try {
            const t = useMapStore.getState().basemapMode === 'parchment' ? 'parchment' : 'dark';
            await registerAtlasMapIcons(map, t as 'dark' | 'parchment');
            rebuildMapDataLayersRef.current(map);
          } catch (err) {
            console.error('[MapCanvas] style.load rebuild failed:', err);
          } finally {
            readyRef.current = true;
          }
        };

        if (mode === 'dark') {
          map.setStyle(DARK_BASEMAP_URL, { diff: false });
          map.once('style.load', finishStyleSwitch);
          return;
        }

        void loadParchmentAtlasStyle()
          .then((style) => {
            if (mapRef.current !== map) return;
            map.setStyle(style, { diff: false });
            map.once('style.load', finishStyleSwitch);
          })
          .catch((e) => {
            console.warn('[MapCanvas] Parchment style failed, using Voyager URL', e);
            if (mapRef.current !== map) return;
            map.setStyle(PARCHMENT_BASEMAP_URL, { diff: false });
            map.once('style.load', finishStyleSwitch);
          });
      },
    );
  }, [showTooltip]);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.modernBasemapOverlays,
      (on) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        setCartoModernBasemapOverlaysVisible(map, on);
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.terrain3dEnabled,
      (enabled) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        const { basemapMode } = useMapStore.getState();
        applyTerrainRuntimeState(map, enabled, { basemapMode });
      },
    );
  }, []);

  // --- Migration overlay subscription ---
  const prevPortIdsRef = useRef<string[]>([]);

  useEffect(() => {
    const migrationSelector = (s: ReturnType<typeof useMapStore.getState>) => ({
      open: s.migrationExplorerOpen,
      mode: s.migrationMapMode,
      branch: s.migrationBranch,
      cohort: s.migrationCohortId,
      flow: s.migrationFlowEnabled,
      eraId: s.eraId,
    });

    return useMapStore.subscribe(
      migrationSelector,
      (cur) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;

        const geojson = getAtlasRegionsGeoJsonForEra(cur.eraId);

        const bmTheme = useMapStore.getState().basemapMode === 'parchment' ? 'parchment' : 'dark';

        if (!cur.open) {
          clearMigrationOverlay(map, geojson, bmTheme);
          clearPortWeights(map, prevPortIdsRef.current);
          prevPortIdsRef.current = [];
          syncOverlay(cur.eraId, useMapStore.getState().layers);
          return;
        }

        const dataset = resolveDataset({ eraId: cur.eraId, branch: cur.branch, cohortId: cur.cohort });
        if (!dataset) {
          clearMigrationOverlay(map, geojson, bmTheme);
          syncOverlay(cur.eraId, useMapStore.getState().layers);
          return;
        }

        const ctx: MigrationOverlayContext = { mapMode: cur.mode, dataset };
        const weights = buildMigrationWeightMap(ctx);
        applyMigrationOverlay(map, geojson, weights);

        clearPortWeights(map, prevPortIdsRef.current);
        if (cur.mode === 'ports') {
          const portIds = dataset.ports.map((p) => p.entityId);
          const portMax = Math.max(...dataset.ports.map((p) => p.percent ?? 0), 1);
          const portWeights = new Map<string, number>();
          for (const p of dataset.ports) {
            if (p.percent != null) portWeights.set(p.entityId, p.percent / portMax);
          }
          applyPortWeights(map, portWeights, portIds);
          prevPortIdsRef.current = portIds;
        } else {
          prevPortIdsRef.current = [];
        }

        // Refresh deck overlay to include/remove flow arcs
        syncOverlay(cur.eraId, useMapStore.getState().layers);
      },
      {
        equalityFn: (a, b) =>
          a.open === b.open && a.mode === b.mode && a.branch === b.branch &&
          a.cohort === b.cohort && a.flow === b.flow && a.eraId === b.eraId,
      },
    );
  }, [syncOverlay]);

  const basemapMode = useMapStore((s) => s.basemapMode);
  const parchmentWaterAtmosphere = useMapStore((s) => s.parchmentWaterAtmosphere);
  const storyEraIntroActive = useMapStore((s) => s.storyEraIntroActive);

  return (
    <>
      <AncestryJourneyPlaybackBridge />
      <div
        className={`absolute inset-0 w-full h-full transition-[filter] duration-300 ease-out ${
          storyEraIntroActive ? 'blur-[10px] sm:blur-[12px]' : ''
        }`}
        data-basemap={basemapMode}
        style={{ background: basemapMode === 'parchment' ? '#e8dcc8' : '#0a0c12' }}
      >
        <div ref={containerRef} className="atlas-maplibre-host absolute inset-0 z-0 h-full w-full" />
        <StoryIllustrationMapOverlay mapRef={mapRef} mapInstanceGeneration={mapInstanceGeneration} />
        <StoryImageGallery />
        {!storyEraIntroActive ? (
          <div className="pointer-events-auto absolute top-3 left-3 z-20 md:left-auto md:right-3">
            <TerrainToggle />
          </div>
        ) : null}
        {basemapMode === 'parchment' ? (
          <ParchmentMapChrome bearing={mapBearing} waterAtmosphere={parchmentWaterAtmosphere} />
        ) : null}
        <CinematicOceanOverlay />
      </div>

      <MapTooltip data={tooltip} />

      <AnimatePresence>
        {eraTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 pointer-events-none z-[5] bg-background/20"
          />
        )}
      </AnimatePresence>
    </>
  );
}
