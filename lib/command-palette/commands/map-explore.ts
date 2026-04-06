import type { Command } from '@/lib/command-palette/types';
import { useMapStore } from '@/lib/store';
import { CAMERA_PRESETS } from '@/lib/geo';

const atlasSurface = (ctx: { atlasMode: boolean; pathname: string }) =>
  ctx.atlasMode && ctx.pathname === '/';

export const mapExploreCommands: Command[] = [
  {
    id: 'explore-norman-sites',
    label: 'Show Norman sites & castles',
    keywords: ['norman', 'castle', 'sites', 'fort'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx),
    action: () => {
      const st = useMapStore.getState();
      st.setLayerVisibility('norman-expansion-nodes', true);
      st.setLayerVisibility('norman-expansion-territories', true);
    },
  },
  {
    id: 'explore-norman-routes',
    label: 'Show Norman conquest routes',
    keywords: ['routes', 'conquest', 'invasion'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx),
    action: () => {
      useMapStore.getState().setLayerVisibility('norman-expansion-routes', true);
    },
  },
  {
    id: 'explore-migration-routes',
    label: 'Show migration & exploration routes',
    keywords: ['migration', 'voyage', 'ships'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx),
    action: () => {
      const st = useMapStore.getState();
      st.setLayerVisibility('exploration-routes', true);
      st.setLayerVisibility('routes', true);
    },
  },
  {
    id: 'explore-historical-peoples',
    label: 'Show historical peoples (macro regions)',
    keywords: ['peoples', 'macro', 'dna', 'admixture'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx),
    action: () => {
      useMapStore.getState().setLayerVisibility('historical-presence', true);
    },
  },
  {
    id: 'explore-route-flow',
    label: 'Animate route flow',
    keywords: ['animate', 'flow', 'motion'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx) && (ctx.selectionKind === 'atlas-route' || ctx.selectionKind === 'atlas-journey'),
    action: () => {
      useMapStore.getState().setLayerVisibility('route-flow-animation', true);
    },
  },
  {
    id: 'fly-homeland',
    label: 'Fly to Normandy homeland',
    keywords: ['normandy', 'fly', 'home'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx),
    action: () => {
      const p = CAMERA_PRESETS.homeland;
      useMapStore.getState().setPendingFlyTarget({ center: p.center, zoom: p.zoom });
    },
  },
  {
    id: 'fly-atlantic',
    label: 'Fly to Atlantic view',
    keywords: ['atlantic', 'ocean'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx),
    action: () => {
      const p = CAMERA_PRESETS.atlantic;
      useMapStore.getState().setPendingFlyTarget({ center: p.center, zoom: p.zoom });
    },
  },
  {
    id: 'fly-new-france',
    label: 'Fly to New France',
    keywords: ['canada', 'quebec', 'colonial'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx),
    action: () => {
      const p = CAMERA_PRESETS['new-france'];
      useMapStore.getState().setPendingFlyTarget({ center: p.center, zoom: p.zoom });
    },
  },
  {
    id: 'fly-st-lawrence',
    label: 'Fly to St. Lawrence',
    keywords: ['st lawrence', 'river'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx),
    action: () => {
      const p = CAMERA_PRESETS['st-lawrence'];
      useMapStore.getState().setPendingFlyTarget({ center: p.center, zoom: p.zoom });
    },
  },
  {
    id: 'region-key-sites',
    label: 'Show key Norman sites here',
    keywords: ['here', 'local', 'nearby'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx) && !!ctx.currentRegion,
    action: (ctx) => {
      const st = useMapStore.getState();
      st.setLayerVisibility('norman-expansion-nodes', true);
      if (ctx.currentRegion?.id) {
        st.selectFeature(ctx.currentRegion.id, 'region', { expandDetail: true });
      }
    },
  },
  {
    id: 'region-start-story',
    label: 'Start story for this region',
    keywords: ['narrative', 'cinematic', 'play'],
    group: 'story',
    isVisible: (ctx) => atlasSurface(ctx) && !!ctx.currentRegion && !ctx.storyMode,
    action: (ctx) => {
      useMapStore.getState().requestStoryLibraryOpen({ openDetail: false });
      if (ctx.currentRegion?.id) {
        useMapStore.getState().selectFeature(ctx.currentRegion.id, 'region', { expandDetail: false });
      }
    },
  },
  {
    id: 'place-open-detail',
    label: 'Open historical details',
    keywords: ['panel', 'details', 'info'],
    group: 'explore',
    isVisible: (ctx) =>
      atlasSurface(ctx) &&
      !!ctx.selectedEntity &&
      ['settlement', 'region', 'norman-site', 'atlas-person', 'atlas-route', 'atlas-journey', 'historical-macro-region'].includes(
        ctx.selectedEntity.kind,
      ),
    action: () => {
      const st = useMapStore.getState();
      st.openDetail();
    },
  },
  {
    id: 'place-select-route-layers',
    label: 'Show connected routes on the map',
    keywords: ['path', 'journey'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx) && ctx.selectionKind === 'settlement',
    action: () => {
      const st = useMapStore.getState();
      st.setLayerVisibility('exploration-routes', true);
      st.setLayerVisibility('routes', true);
    },
  },
  {
    id: 'person-lineage-context',
    label: 'Highlight routes & story library',
    keywords: ['people', 'figure'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx) && ctx.selectionKind === 'atlas-person',
    action: () => {
      const st = useMapStore.getState();
      st.setLayerVisibility('exploration-routes', true);
      st.requestStoryLibraryOpen({ openDetail: false });
    },
  },
  {
    id: 'era-key-events-hint',
    label: 'Browse stories for this era',
    keywords: ['events', '1066', 'timeline'],
    group: 'explore',
    isVisible: (ctx) => atlasSurface(ctx) && !!ctx.currentEra && !ctx.storyMode,
    action: () => {
      useMapStore.getState().requestStoryLibraryOpen({ openDetail: false });
    },
  },
];
