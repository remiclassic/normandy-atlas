import type { LayerConfig } from '@/types';
import {
  BOUNDARY_STROKE,
  MICRO_REGION_FILL,
  MICRO_REGION_STROKE,
  MICRO_REGION_LABELS,
  EXPANSION_FILL,
  EXPANSION_STROKE,
  EXPANSION_LABELS,
  RIVER_LINE,
  RIVER_GLOW,
  RIVER_LABELS,
  CULTURE_FILL,
  CULTURE_STROKE,
  CULTURE_LABELS,
  DENSITY_HEAT,
  DENSITY_CIRCLES,
  EVIDENCE_CIRCLES,
  EVIDENCE_ICONS,
  EVIDENCE_LABELS,
  TOPONYMY_CIRCLES,
  TOPONYMY_LABELS,
} from '@/components/map/normandy-layers';
import {
  PREHISTORIC_SITES_CIRCLES,
  PREHISTORIC_SITES_LABELS,
  HILLFORTS_CIRCLES,
  HILLFORTS_LABELS,
  ANCIENT_TERRAIN_FILL,
} from '@/components/map/prehistory-layers';
import {
  NF_TERRITORY_FILL,
  NF_TERRITORY_STROKE_LAYERS,
  NF_TERRITORY_LABELS,
} from '@/components/map/new-france-territory-layers';
import {
  NORMAN_REALMS_FILL,
  NORMAN_REALMS_STROKE,
  NORMAN_REALMS_LABELS,
  NORMAN_CRUSADER_FILL,
  NORMAN_CRUSADER_STROKE,
  NORMAN_CRUSADER_LABELS,
  NORMAN_INFLUENCE_FILL,
  NORMAN_INFLUENCE_STROKE,
  NORMAN_INFLUENCE_LABELS,
  NORMAN_NODES_CIRCLES,
  NORMAN_NODES_LABELS,
} from '@/components/map/norman-expansion-layers';

export const layerConfigs: LayerConfig[] = [
  {
    id: 'regions-fill',
    label: 'Region Areas',
    category: 'borders',
    defaultOn: true,
    mapLayerIds: ['regions-fill'],
  },
  {
    id: 'regions-stroke',
    label: 'Borders',
    category: 'borders',
    defaultOn: true,
    mapLayerIds: ['regions-stroke'],
  },
  {
    id: 'regions-labels',
    label: 'Region Names',
    category: 'labels',
    defaultOn: true,
    mapLayerIds: ['regions-labels'],
    dependsOnEra: true,
  },
  {
    id: 'routes',
    label: 'Routes & Movement',
    category: 'routes',
    defaultOn: true,
    mapLayerIds: [],
    deckLayer: true,
    dependsOnEra: true,
  },
  {
    id: 'route-flow-animation',
    label: 'Route Flow Animation',
    category: 'routes',
    defaultOn: false,
    mapLayerIds: [],
    deckLayer: true,
  },
  {
    id: 'settlements',
    label: 'Settlements',
    category: 'settlements',
    defaultOn: true,
    mapLayerIds: ['settlements-circles', 'settlements-labels'],
    dependsOnEra: true,
  },
  // --- Normandy overlay layers ---
  {
    id: 'normandy-micro-regions',
    label: 'Micro-Regions',
    category: 'normandy',
    defaultOn: false,
    mapLayerIds: [BOUNDARY_STROKE, MICRO_REGION_FILL, MICRO_REGION_STROKE, MICRO_REGION_LABELS],
  },
  {
    id: 'normandy-expansion',
    label: 'Territorial Expansion',
    category: 'normandy',
    defaultOn: false,
    mapLayerIds: [EXPANSION_FILL, EXPANSION_STROKE, EXPANSION_LABELS],
  },
  {
    id: 'normandy-rivers',
    label: 'River Systems',
    category: 'normandy',
    defaultOn: false,
    mapLayerIds: [RIVER_LINE, RIVER_GLOW, RIVER_LABELS],
  },
  {
    id: 'normandy-culture',
    label: 'Cultural Zones',
    category: 'normandy',
    defaultOn: false,
    mapLayerIds: [CULTURE_FILL, CULTURE_STROKE, CULTURE_LABELS],
  },
  {
    id: 'normandy-density',
    label: 'Settlement Density',
    category: 'normandy',
    defaultOn: false,
    mapLayerIds: [DENSITY_HEAT, DENSITY_CIRCLES],
  },
  {
    id: 'normandy-evidence',
    label: 'Archaeological Evidence',
    category: 'normandy',
    defaultOn: false,
    mapLayerIds: [EVIDENCE_CIRCLES, EVIDENCE_ICONS, EVIDENCE_LABELS],
  },
  {
    id: 'normandy-toponymy',
    label: 'Norse Place Names',
    category: 'normandy',
    defaultOn: false,
    mapLayerIds: [TOPONYMY_CIRCLES, TOPONYMY_LABELS],
  },
  // --- Prehistory overlay layers ---
  {
    id: 'prehistory-sites',
    label: 'Prehistoric Sites',
    category: 'prehistory',
    defaultOn: false,
    mapLayerIds: [PREHISTORIC_SITES_CIRCLES, PREHISTORIC_SITES_LABELS],
  },
  {
    id: 'prehistory-hillforts',
    label: 'Hillforts & Oppida',
    category: 'prehistory',
    defaultOn: false,
    mapLayerIds: [HILLFORTS_CIRCLES, HILLFORTS_LABELS],
  },
  {
    id: 'prehistory-terrain',
    label: 'Ancient Terrain',
    category: 'prehistory',
    defaultOn: false,
    mapLayerIds: [ANCIENT_TERRAIN_FILL],
  },
  // --- New France overlays ---
  {
    id: 'new-france-territory',
    label: 'Territorial Extent',
    category: 'new-france',
    defaultOn: false,
    mapLayerIds: [NF_TERRITORY_FILL, ...NF_TERRITORY_STROKE_LAYERS, NF_TERRITORY_LABELS],
    dependsOnEra: true,
  },
  {
    id: 'settler-origin-flows',
    label: 'Settler Origin Flows',
    category: 'new-france',
    defaultOn: false,
    mapLayerIds: [],
    deckLayer: true,
    dependsOnEra: true,
  },
  // --- Norman Expansion (1066–1204) overlay layers ---
  {
    id: 'norman-expansion-territories',
    label: 'Territories',
    category: 'norman-expansion',
    defaultOn: false,
    mapLayerIds: [NORMAN_REALMS_FILL, NORMAN_REALMS_STROKE, NORMAN_REALMS_LABELS],
  },
  {
    id: 'norman-expansion-crusader',
    label: 'Crusader States',
    category: 'norman-expansion',
    defaultOn: false,
    mapLayerIds: [NORMAN_CRUSADER_FILL, NORMAN_CRUSADER_STROKE, NORMAN_CRUSADER_LABELS],
  },
  {
    id: 'norman-expansion-influence',
    label: 'Norman Influence',
    category: 'norman-expansion',
    defaultOn: false,
    mapLayerIds: [NORMAN_INFLUENCE_FILL, NORMAN_INFLUENCE_STROKE, NORMAN_INFLUENCE_LABELS],
  },
  {
    id: 'norman-expansion-routes',
    label: 'Conquest Routes',
    category: 'norman-expansion',
    defaultOn: false,
    mapLayerIds: [],
    deckLayer: true,
  },
  {
    id: 'norman-expansion-nodes',
    label: 'Norman sites & castles',
    category: 'norman-expansion',
    defaultOn: false,
    mapLayerIds: [NORMAN_NODES_CIRCLES, NORMAN_NODES_LABELS],
  },
];

export function getDefaultLayerState(): Record<string, boolean> {
  const state: Record<string, boolean> = {};
  for (const cfg of layerConfigs) {
    state[cfg.id] = cfg.defaultOn;
  }
  return state;
}

/* ── Atlas era → layer presets ────────────────────────────────────── */

const OVERLAY_OFF: Record<string, boolean> = Object.fromEntries(
  layerConfigs
    .filter((c) =>
      c.category === 'normandy' ||
      c.category === 'norman-expansion' ||
      c.category === 'prehistory' ||
      c.category === 'new-france',
    )
    .map((c) => [c.id, false]),
);

function corePreset(): Record<string, boolean> {
  return {
    'regions-fill': true,
    'regions-stroke': true,
    'regions-labels': true,
    'routes': true,
    'settlements': true,
    ...OVERLAY_OFF,
  };
}

const ATLAS_ERA_LAYER_OVERRIDES: Record<string, Record<string, boolean>> = {
  'neolithic-normandy': {
    'prehistory-sites': true,
    'prehistory-terrain': true,
    'normandy-rivers': true,
  },
  'bronze-age-channel': {
    'prehistory-sites': true,
    'prehistory-terrain': true,
    'normandy-rivers': true,
  },
  'iron-age-gaul': {
    'prehistory-hillforts': true,
    'prehistory-terrain': true,
    'normandy-rivers': true,
  },
  'roman-gaul': {
    'prehistory-hillforts': true,
    'normandy-rivers': true,
  },
  'viking-age': {
    'normandy-expansion': true,
    'normandy-rivers': true,
    'normandy-evidence': true,
    'normandy-toponymy': true,
  },
  'norman-origins': {
    'normandy-micro-regions': true,
    'normandy-expansion': true,
    'normandy-rivers': true,
    'normandy-culture': true,
    'normandy-density': true,
    'normandy-evidence': true,
    'normandy-toponymy': true,
    'norman-expansion-nodes': true,
  },
  'norman-expansion': {
    'norman-expansion-territories': true,
    'norman-expansion-crusader': true,
    'norman-expansion-influence': true,
    'norman-expansion-routes': true,
    'norman-expansion-nodes': true,
  },
  'new-france-foundations': {
    'new-france-territory': true,
    'settler-origin-flows': false,
  },
  'royal-new-france': {
    'new-france-territory': true,
    'settler-origin-flows': false,
  },
  'atlantic-imprint': {
    'new-france-territory': true,
    'settler-origin-flows': false,
  },
};

export function getAtlasLayerPreset(eraId: string): Record<string, boolean> {
  const overrides = ATLAS_ERA_LAYER_OVERRIDES[eraId];
  return overrides ? { ...corePreset(), ...overrides } : corePreset();
}
