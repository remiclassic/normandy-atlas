'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { ArcLayer, PathLayer } from '@deck.gl/layers';
import { PathStyleExtension } from '@deck.gl/extensions';
import { motion, AnimatePresence } from 'motion/react';

import { useMapStore } from '@/lib/store';
import { DARK_BASEMAP_URL, PARCHMENT_BASEMAP_URL } from './map-style';
import { layerConfigs } from '@/data/layers';
import { normanAtlanticStory } from '@/data/stories';
import { flyToCamera } from '@/lib/geo';
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
  REGION_SOURCE,
  SETTLEMENT_SOURCE,
} from './map-layers';
import { addAllNormandyLayers, setExpansionYearFilter, EVIDENCE_CIRCLES, EVIDENCE_ICONS, TOPONYMY_CIRCLES, TOPONYMY_LABELS, DENSITY_CIRCLES } from './normandy-layers';
import { addAllNormanExpansionLayers, NORMAN_NODES_CIRCLES, NORMAN_NODES_SOURCE, setNormanNodePeriodFilter } from './norman-expansion-layers';
import { addAllPrehistoryLayers, PREHISTORIC_SITES_CIRCLES, HILLFORTS_CIRCLES } from './prehistory-layers';
import { addNewFranceTerritoryLayers, updateNewFranceTerritorySource } from './new-france-territory-layers';
import { isColonialEra, colonialYearFromEra, getPhaseForYear } from '@/data/atlas/new-france-timeline';
import { getTerritoryForYear } from '@/data/atlas/new-france-territory-geo';
import { normanExpansionRoutes } from '@/data/norman-expansion';
import type { NormanExpansionRoute } from '@/data/norman-expansion';
import MapTooltip from './MapTooltip';
import type { TooltipData } from './MapTooltip';
import { NORMANDY_ERA_IDS, VIKING_MOVEMENT_ERA_IDS } from '@/lib/store';

import {
  getActiveSegments,
  getAtlasRegionsGeoJsonForEra,
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
} from '@/core';
import type { ResolvedSegment, MigrationOverlayContext, MigrationDataset } from '@/core/types';
import type { ResolvedFlowArc } from '@/core/migration/engine';
import type { RouteRecord } from '@/types';

const ATLAS_ROUTE_LAYER_IDS = ['atlas-route-polylines', 'atlas-route-arcs', 'atlas-route-paths'] as const;

function pickAtlasRouteSegment(
  overlay: MapboxOverlay,
  map: maplibregl.Map,
  e: maplibregl.MapMouseEvent,
): ResolvedSegment | null {
  const rect = map.getCanvas().getBoundingClientRect();
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

function atlasRouteTooltipFields(seg: ResolvedSegment): Pick<TooltipData, 'title' | 'subtitle' | 'detail'> {
  return {
    title: seg.segmentTooltip?.en ?? seg.id.replace(/^seg-/, '').replace(/-/g, ' '),
    subtitle: seg.journeyId ? getJourney(seg.journeyId)?.name.en : undefined,
    detail: seg.segmentDetail?.en,
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
}

const FLOW_ORIGIN_COLOR: [number, number, number, number] = [196, 169, 98, 160];
const FLOW_ORIGIN_TARGET: [number, number, number, number] = [196, 169, 98, 80];
const FLOW_COLONY_COLOR: [number, number, number, number] = [91, 127, 165, 160];
const FLOW_COLONY_TARGET: [number, number, number, number] = [91, 127, 165, 80];

function buildMigrationFlowLayers(arcs: ResolvedFlowArc[]): ArcLayer<FlowArcDatum>[] {
  if (arcs.length === 0) return [];

  const data: FlowArcDatum[] = [];
  for (const arc of arcs) {
    data.push({ source: arc.originCoords, target: arc.portCoords, weight: arc.weight, hop: 'origin_to_port' });
    data.push({ source: arc.portCoords, target: arc.colonyCoords, weight: arc.weight, hop: 'port_to_colony' });
  }

  return [
    new ArcLayer<FlowArcDatum>({
      id: 'migration-flow-arcs',
      data,
      getSourcePosition: (d) => d.source,
      getTargetPosition: (d) => d.target,
      getSourceColor: (d) => (d.hop === 'origin_to_port' ? FLOW_ORIGIN_COLOR : FLOW_COLONY_COLOR),
      getTargetColor: (d) => (d.hop === 'origin_to_port' ? FLOW_ORIGIN_TARGET : FLOW_COLONY_TARGET),
      getWidth: (d) => Math.max(1.5, d.weight * 1.2),
      greatCircle: true,
      widthMinPixels: 1.5,
      widthMaxPixels: 6,
    }),
  ];
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
    if (!activeJourneyId) return getRouteStyleWithEvidence(seg.kind, seg.weight, seg.evidence);
    if (seg.journeyId === activeJourneyId) return getRouteHighlightStyleWithEvidence(seg.kind, seg.weight, seg.evidence);
    return getRouteDimStyleWithEvidence(seg.kind, seg.weight, seg.evidence);
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
    // Glow layer — wider, low-opacity duplicate for the energy-line effect
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

    layers.push(
      new PathLayer<ResolvedSegment>({
        id: 'atlas-route-polylines',
        pickable: true,
        data: polylineSegments,
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

export default function MapCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const overlayRef = useRef<MapboxOverlay | null>(null);
  const hoveredRegionRef = useRef<string | null>(null);
  const hoveredSettlementRef = useRef<string | null>(null);
  const selectedRegionRef = useRef<string | null>(null);
  const selectedSettlementRef = useRef<string | null>(null);
  const selectedNormanNodeRef = useRef<string | null>(null);
  const hoveredNormanNodeRef = useRef<string | null>(null);
  const readyRef = useRef(false);
  const tooltipRef = useRef<TooltipData | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [eraTransition, setEraTransition] = useState(false);

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
    const { atlasMode, activeJourneyId, atlasSimYear, migrationExplorerOpen, migrationFlowEnabled, migrationBranch, migrationCohortId } = useMapStore.getState();

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
      const segments = getActiveSegments(eraId, simYear);
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

  const syncSources = useCallback((eraId: string) => {
    const map = mapRef.current;
    if (!map || !readyRef.current) return;
    const { atlasMode, atlasSimYear } = useMapStore.getState();

    if (atlasMode) {
      const regionsGeoJson = getAtlasRegionsGeoJsonForEra(eraId);
      updateRegionSource(map, regionsGeoJson);

      const places = getVisiblePlaces(eraId);
      const placesGeoJson = buildPlacesGeoJson(places);
      updateSettlementSource(map, placesGeoJson);

      if (isColonialEra(eraId)) {
        const colYear = colonialYearFromEra(eraId, atlasSimYear);
        updateNewFranceTerritorySource(map, getTerritoryForYear(colYear));
      } else {
        updateNewFranceTerritorySource(map, { type: 'FeatureCollection', features: [] });
      }
    } else {
      updateRegionSource(map, getRegionsGeoJsonForEra(eraId));
      updateSettlementSource(map, getSettlementsGeoJsonForEra(eraId));
      updateNewFranceTerritorySource(map, { type: 'FeatureCollection', features: [] });
    }

    updateEraLabels(map, eraId);
  }, []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const { atlasMode, eraId: initialEra, basemapMode } = useMapStore.getState();
    const atlasEra = atlasMode ? getAtlasEra(initialEra) : null;
    const initialCenter = atlasEra
      ? atlasEra.defaultCamera.center
      : [0.0, 49.2] as [number, number];
    const initialZoom = atlasEra ? atlasEra.defaultCamera.zoom : 5.8;
    const initialStyle = basemapMode === 'parchment' ? PARCHMENT_BASEMAP_URL : DARK_BASEMAP_URL;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: initialStyle,
      center: initialCenter,
      zoom: initialZoom,
      minZoom: 2,
      maxZoom: 14,
      attributionControl: false,
      fadeDuration: 300,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), 'bottom-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    const overlay = new MapboxOverlay({ layers: [] });
    map.addControl(overlay as unknown as maplibregl.IControl);
    overlayRef.current = overlay;

    map.on('load', () => {
      const state = useMapStore.getState();

      if (state.atlasMode) {
        const regionsGeoJson = getAtlasRegionsGeoJsonForEra(state.eraId);
        addRegionLayers(map, regionsGeoJson, state.eraId);
        addSettlementLayers(map);
        const places = getVisiblePlaces(state.eraId);
        updateSettlementSource(map, buildPlacesGeoJson(places));
      } else {
        addRegionLayers(map, getRegionsGeoJsonForEra(state.eraId), state.eraId);
        addSettlementLayers(map);
        updateSettlementSource(map, getSettlementsGeoJsonForEra(state.eraId));
      }

      addAllNormandyLayers(map);
      addAllNormanExpansionLayers(map);
      addAllPrehistoryLayers(map);
      addNewFranceTerritoryLayers(map);
      setExpansionYearFilter(map, state.normandySimYear);

      if (state.atlasMode && isColonialEra(state.eraId)) {
        const colYear = colonialYearFromEra(state.eraId, state.atlasSimYear);
        updateNewFranceTerritorySource(map, getTerritoryForYear(colYear));
      }

      for (const cfg of layerConfigs) {
        if (cfg.deckLayer) continue;
        setLayerVisibility(map, cfg.mapLayerIds, state.layers[cfg.id] ?? cfg.defaultOn);
      }

      setNormanNodePeriodFilter(map, state.normanNodePeriod);

      syncOverlay(state.eraId, state.layers);

      if (state.atlasMode) {
        const initialAtlasEra = getAtlasEra(state.eraId);
        if (initialAtlasEra?.summary) {
          state.selectFeature(state.eraId, 'era-info');
        }
      }

      map.on('mousemove', 'regions-fill', (e) => {
        if (!e.features?.length) return;
        const id = e.features[0].properties?.id as string;

        if (hoveredRegionRef.current && hoveredRegionRef.current !== id) {
          setFeatureState(map, hoveredRegionRef.current, { hover: false }, REGION_SOURCE);
        }
        hoveredRegionRef.current = id;
        setFeatureState(map, id, { hover: true }, REGION_SOURCE);
        if (!hoveredSettlementRef.current) {
          hoverFeature(id, 'region');
          map.getCanvas().style.cursor = 'pointer';
        }
      });

      map.on('mouseleave', 'regions-fill', () => {
        if (hoveredRegionRef.current) {
          setFeatureState(map, hoveredRegionRef.current, { hover: false }, REGION_SOURCE);
          hoveredRegionRef.current = null;
        }
        if (!hoveredSettlementRef.current) {
          hoverFeature(null);
          map.getCanvas().style.cursor = '';
        }
      });

      map.on('mousemove', 'settlements-circles', (e) => {
        if (!e.features?.length) return;
        const id = e.features[0].properties?.id as string;

        if (hoveredSettlementRef.current && hoveredSettlementRef.current !== id) {
          setFeatureState(map, hoveredSettlementRef.current, { hover: false }, SETTLEMENT_SOURCE);
        }
        hoveredSettlementRef.current = id;
        setFeatureState(map, id, { hover: true }, SETTLEMENT_SOURCE);
        hoverFeature(id, 'settlement');
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'settlements-circles', () => {
        if (hoveredSettlementRef.current) {
          setFeatureState(map, hoveredSettlementRef.current, { hover: false }, SETTLEMENT_SOURCE);
          hoveredSettlementRef.current = null;
        }
        if (hoveredRegionRef.current) {
          hoverFeature(hoveredRegionRef.current, 'region');
        } else {
          hoverFeature(null);
          map.getCanvas().style.cursor = '';
        }
      });

      const normandyHoverLayers = [EVIDENCE_CIRCLES, EVIDENCE_ICONS, TOPONYMY_CIRCLES, DENSITY_CIRCLES];

      map.on('mousemove', (e) => {
        const validLayers = normandyHoverLayers.filter((lid) => map.getLayer(lid));
        const features =
          validLayers.length > 0
            ? map.queryRenderedFeatures(e.point, { layers: validLayers })
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
          map.getCanvas().style.cursor = 'pointer';
          return;
        }

        const store = useMapStore.getState();
        if (store.atlasMode && (store.layers['routes'] ?? true) && overlayRef.current) {
          const seg = pickAtlasRouteSegment(overlayRef.current, map, e);
          if (seg) {
            showTooltip({
              x: e.point.x,
              y: e.point.y,
              ...atlasRouteTooltipFields(seg),
            });
            map.getCanvas().style.cursor = 'pointer';
            return;
          }
        }

        if ((store.layers['norman-expansion-routes'] ?? false) && overlayRef.current) {
          const rect = map.getCanvas().getBoundingClientRect();
          const cx = e.originalEvent.clientX - rect.left;
          const cy = e.originalEvent.clientY - rect.top;
          const r = 14;
          const picks = overlayRef.current.pickObjects({ x: cx - r, y: cy - r, width: r * 2, height: r * 2, layerIds: [...NORMAN_EXP_ARC_LAYER_IDS] });
          if (picks.length) {
            const d = picks[0].object as NormanExpansionRoute;
            showTooltip({ x: e.point.x, y: e.point.y, title: d.label, subtitle: d.subtitle });
            map.getCanvas().style.cursor = 'pointer';
            return;
          }
        }

        if (map.getLayer(NORMAN_NODES_CIRCLES)) {
          const nodeFeats = map.queryRenderedFeatures(e.point, { layers: [NORMAN_NODES_CIRCLES] });
          if (nodeFeats.length) {
            const p = nodeFeats[0].properties!;
            const nodeId = p.id as string;
            if (hoveredNormanNodeRef.current && hoveredNormanNodeRef.current !== nodeId) {
              setFeatureState(map, hoveredNormanNodeRef.current, { hover: false }, NORMAN_NODES_SOURCE);
            }
            hoveredNormanNodeRef.current = nodeId;
            setFeatureState(map, nodeId, { hover: true }, NORMAN_NODES_SOURCE);
            showTooltip({ x: e.point.x, y: e.point.y, title: p.name as string, subtitle: p.role as string, detail: p.date as string });
            map.getCanvas().style.cursor = 'pointer';
            return;
          } else if (hoveredNormanNodeRef.current) {
            setFeatureState(map, hoveredNormanNodeRef.current, { hover: false }, NORMAN_NODES_SOURCE);
            hoveredNormanNodeRef.current = null;
          }
        }

        if (tooltipRef.current) showTooltip(null);
        if (!hoveredSettlementRef.current && !hoveredRegionRef.current) {
          map.getCanvas().style.cursor = '';
        }
      });

      map.on('mouseleave', EVIDENCE_CIRCLES, () => { if (tooltipRef.current) showTooltip(null); });
      map.on('mouseleave', TOPONYMY_CIRCLES, () => { if (tooltipRef.current) showTooltip(null); });
      map.on('mouseleave', DENSITY_CIRCLES, () => { if (tooltipRef.current) showTooltip(null); });
      map.on('mouseleave', NORMAN_NODES_CIRCLES, () => {
        if (tooltipRef.current) showTooltip(null);
        if (hoveredNormanNodeRef.current && map.getSource(NORMAN_NODES_SOURCE)) {
          setFeatureState(map, hoveredNormanNodeRef.current, { hover: false }, NORMAN_NODES_SOURCE);
          hoveredNormanNodeRef.current = null;
        }
      });

      map.on('click', (e) => {
        if (!readyRef.current) return;

        const clickStore = useMapStore.getState();
        if (clickStore.atlasMode && (clickStore.layers['routes'] ?? true) && overlayRef.current) {
          const seg = pickAtlasRouteSegment(overlayRef.current, map, e);
          if (seg) {
            showTooltip({
              x: e.point.x,
              y: e.point.y,
              ...atlasRouteTooltipFields(seg),
            });
            if (seg.segmentDetail) {
              selectFeature(seg.id, 'atlas-route');
            }
            return;
          }
        }

        const clearPrev = () => {
          if (selectedRegionRef.current) {
            setFeatureState(map, selectedRegionRef.current, { selected: false }, REGION_SOURCE);
            selectedRegionRef.current = null;
          }
          if (selectedSettlementRef.current) {
            setFeatureState(map, selectedSettlementRef.current, { selected: false }, SETTLEMENT_SOURCE);
            selectedSettlementRef.current = null;
          }
          if (selectedNormanNodeRef.current && map.getSource(NORMAN_NODES_SOURCE)) {
            setFeatureState(map, selectedNormanNodeRef.current, { selected: false }, NORMAN_NODES_SOURCE);
            selectedNormanNodeRef.current = null;
          }
        };

        if (map.getLayer(EVIDENCE_CIRCLES)) {
          const evFeats = map.queryRenderedFeatures(e.point, { layers: [EVIDENCE_CIRCLES] });
          if (evFeats.length) {
            const id = evFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectFeature(id, 'evidence');
              return;
            }
          }
        }

        const prehistoryClickLayers = [PREHISTORIC_SITES_CIRCLES, HILLFORTS_CIRCLES].filter((l) => map.getLayer(l));
        if (prehistoryClickLayers.length) {
          const pFeats = map.queryRenderedFeatures(e.point, { layers: prehistoryClickLayers });
          if (pFeats.length) {
            const id = pFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectFeature(id, 'prehistoric-site');
              return;
            }
          }
        }

        if (map.getLayer('settlements-circles')) {
          const sFeats = map.queryRenderedFeatures(e.point, { layers: ['settlements-circles'] });
          if (sFeats.length) {
            const id = sFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedSettlementRef.current = id;
              setFeatureState(map, id, { selected: true }, SETTLEMENT_SOURCE);
              selectFeature(id, 'settlement');
              return;
            }
          }
        }

        if (map.getLayer(NORMAN_NODES_CIRCLES)) {
          const nFeats = map.queryRenderedFeatures(e.point, { layers: [NORMAN_NODES_CIRCLES] });
          if (nFeats.length) {
            const id = nFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedNormanNodeRef.current = id;
              setFeatureState(map, id, { selected: true }, NORMAN_NODES_SOURCE);
              selectFeature(id, 'norman-site');
              return;
            }
          }
        }

        if (map.getLayer('regions-fill')) {
          const rFeats = map.queryRenderedFeatures(e.point, { layers: ['regions-fill'] });
          if (rFeats.length) {
            const id = rFeats[0].properties?.id as string;
            if (id) {
              clearPrev();
              selectedRegionRef.current = id;
              setFeatureState(map, id, { selected: true }, REGION_SOURCE);
              selectFeature(id, 'region');
              return;
            }
          }
        }

        clearPrev();
        selectFeature(null);
      });

      readyRef.current = true;
    });

    mapRef.current = map;

    const containerEl = containerRef.current;
    const resizeObserver =
      containerEl &&
      new ResizeObserver(() => {
        map.resize();
      });
    if (containerEl && resizeObserver) {
      resizeObserver.observe(containerEl);
    }

    return () => {
      resizeObserver?.disconnect();
      readyRef.current = false;
      map.remove();
      mapRef.current = null;
      overlayRef.current = null;
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

        const { atlasMode, selectFeature } = useMapStore.getState();
        if (atlasMode) {
          const era = getAtlasEra(eraId);
          if (era?.defaultCamera) {
            flyToCamera(map, {
              center: era.defaultCamera.center,
              zoom: era.defaultCamera.zoom,
              duration: era.defaultCamera.durationMs,
            });
          }
          if (era?.summary) {
            selectFeature(eraId, 'era-info');
          }
        }

        return () => clearTimeout(timer);
      },
    );
  }, [syncSources, syncOverlay]);

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

        syncOverlay(useMapStore.getState().eraId, layers);
      },
    );
  }, [syncOverlay]);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => ({ id: s.selectedFeatureId, kind: s.selectionKind }),
      ({ id: newId, kind }, { id: prevId, kind: prevKind }) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;

        const sourceForKind = (k: typeof kind) => {
          if (k === 'settlement') return SETTLEMENT_SOURCE;
          if (k === 'norman-site') return NORMAN_NODES_SOURCE;
          if (k === 'region') return REGION_SOURCE;
          return null;
        };

        if (prevId && prevId !== newId) {
          const prevSource = sourceForKind(prevKind);
          if (prevSource && map.getSource(prevSource)) {
            setFeatureState(map, prevId, { selected: false }, prevSource);
          }
        }
        if (newId) {
          const source = sourceForKind(kind);
          if (source && map.getSource(source)) {
            setFeatureState(map, newId, { selected: true }, source);
          }
          if (kind === 'region') selectedRegionRef.current = newId;
          else if (kind === 'norman-site') selectedNormanNodeRef.current = newId;
          else selectedSettlementRef.current = newId;
        } else {
          selectedRegionRef.current = null;
          selectedSettlementRef.current = null;
          selectedNormanNodeRef.current = null;
        }
      },
    );
  }, []);

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => ({ storyMode: s.storyMode, stepIndex: s.storyStepIndex, atlasMode: s.atlasMode, storyArc: s.storyArc }),
      ({ storyMode, stepIndex, atlasMode, storyArc }) => {
        const map = mapRef.current;
        if (!map || !readyRef.current || !storyMode) return;

        if (atlasMode) {
          const beat = getBeat(Math.min(stepIndex, getBeatCount(storyArc) - 1), storyArc);
          if (!beat?.camera) return;
          flyToCamera(map, {
            center: beat.camera.center,
            zoom: beat.camera.zoom,
            duration: beat.camera.durationMs,
          });
        } else {
          const step = normanAtlanticStory[Math.min(stepIndex, normanAtlanticStory.length - 1)];
          if (!step?.camera) return;
          flyToCamera(map, step.camera);
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
      (s) => s.normandySimYear,
      (year) => {
        const map = mapRef.current;
        if (!map || !readyRef.current) return;
        setExpansionYearFilter(map, year);
      },
    );
  }, []);

  // Sim year → territory overlay + time-gated routes (colonial + Viking movement eras)
  const lastColPhaseRef = useRef<string | null>(null);
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
          const phase = getPhaseForYear(colYear);
          const phaseId = phase?.id ?? null;

          if (phaseId !== lastColPhaseRef.current) {
            lastColPhaseRef.current = phaseId;
            updateNewFranceTerritorySource(map, getTerritoryForYear(colYear));
            syncOverlay(eraId, layers);
          }
        } else if (VIKING_MOVEMENT_ERA_IDS.has(eraId)) {
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

  useEffect(() => {
    return useMapStore.subscribe(
      (s) => s.basemapMode,
      (mode) => {
        const map = mapRef.current;
        if (!map) return;
        const styleUrl = mode === 'parchment' ? PARCHMENT_BASEMAP_URL : DARK_BASEMAP_URL;
        readyRef.current = false;
        showTooltip(null);

        // diff: false guarantees a clean slate — no stale sources from the previous style
        map.setStyle(styleUrl, { diff: false });
        map.once('style.load', () => {
          try {
            const state = useMapStore.getState();

            if (state.atlasMode) {
              const regionsGeoJson = getAtlasRegionsGeoJsonForEra(state.eraId);
              addRegionLayers(map, regionsGeoJson, state.eraId);
              addSettlementLayers(map);
              const places = getVisiblePlaces(state.eraId);
              updateSettlementSource(map, buildPlacesGeoJson(places));
            } else {
              addRegionLayers(map, getRegionsGeoJsonForEra(state.eraId), state.eraId);
              addSettlementLayers(map);
              updateSettlementSource(map, getSettlementsGeoJsonForEra(state.eraId));
            }

            addAllNormandyLayers(map);
            addAllNormanExpansionLayers(map);
            addAllPrehistoryLayers(map);
            addNewFranceTerritoryLayers(map);
            setExpansionYearFilter(map, state.normandySimYear);
            updateEraLabels(map, state.eraId);

            if (state.atlasMode && isColonialEra(state.eraId)) {
              const colYear = colonialYearFromEra(state.eraId, state.atlasSimYear);
              updateNewFranceTerritorySource(map, getTerritoryForYear(colYear));
            }

            for (const cfg of layerConfigs) {
              if (cfg.deckLayer) continue;
              setLayerVisibility(map, cfg.mapLayerIds, state.layers[cfg.id] ?? cfg.defaultOn);
            }

            setNormanNodePeriodFilter(map, state.normanNodePeriod);

            syncOverlay(state.eraId, state.layers);
          } catch (err) {
            console.error('[MapCanvas] style.load rebuild failed:', err);
          } finally {
            readyRef.current = true;
          }
        });
      },
    );
  }, [syncOverlay]);

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

        if (!cur.open) {
          clearMigrationOverlay(map, geojson);
          clearPortWeights(map, prevPortIdsRef.current);
          prevPortIdsRef.current = [];
          syncOverlay(cur.eraId, useMapStore.getState().layers);
          return;
        }

        const dataset = resolveDataset({ eraId: cur.eraId, branch: cur.branch, cohortId: cur.cohort });
        if (!dataset) {
          clearMigrationOverlay(map, geojson);
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

  return (
    <>
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: basemapMode === 'parchment' ? '#e8dcc8' : '#0a0c12' }}
      />

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
