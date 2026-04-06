import type { Command } from '@/lib/command-palette/types';
import { useMapStore } from '@/lib/store';
import { readMapView } from '@/lib/map-view-reader';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { GENEALOGY_HUB_PATH, GENEALOGY_NORMAN_IDENTITY_PATH } from '@/lib/genealogy-paths';

export const navigationCommands: Command[] = [
  {
    id: 'nav-map-home',
    label: 'Go to map',
    description: 'Open the atlas map',
    keywords: ['home', 'atlas', 'map'],
    group: 'navigation',
    isVisible: (ctx) => ctx.pathname !== '/',
    action: (_, runtime) => runtime.navigate('/'),
  },
  {
    id: 'nav-journal',
    label: 'Open Journal',
    keywords: ['journal', 'notes'],
    group: 'navigation',
    isVisible: () => true,
    action: (_, runtime) => runtime.navigate('/journal'),
  },
  {
    id: 'nav-norman-readings',
    label: 'Norman readings',
    description: 'Long-form essays on Norman history',
    keywords: ['norman', 'readings', 'articles', 'essays', 'history'],
    group: 'navigation',
    isVisible: (ctx) => !ctx.pathname.startsWith('/norman-readings'),
    action: (_, runtime) => runtime.navigate('/norman-readings'),
  },
  {
    id: 'nav-norman-identity',
    label: 'Open Norman identity',
    description: 'Historical identity sketch without DNA',
    keywords: ['norman', 'identity', 'roots', 'ancestry', 'quiz'],
    group: 'navigation',
    isVisible: (ctx) => ctx.pathname !== GENEALOGY_NORMAN_IDENTITY_PATH,
    action: (_, runtime) => runtime.navigate(GENEALOGY_NORMAN_IDENTITY_PATH),
  },
  {
    id: 'nav-ancestry',
    label: 'Genealogy workspace',
    description: 'Family tree and journeys',
    keywords: ['genealogy', 'family', 'tree', 'ancestry'],
    group: 'navigation',
    isVisible: (ctx) =>
      !ctx.pathname.startsWith('/genealogy') && !ctx.pathname.startsWith('/ancestry'),
    action: (_, runtime) => runtime.navigate(GENEALOGY_HUB_PATH),
  },
  {
    id: 'nav-lineage-explorer',
    label: 'Genetic Lineage Explorer',
    keywords: ['haplogroup', 'ydna', 'mtdna', 'lineage'],
    group: 'navigation',
    isVisible: (ctx) => !ctx.pathname.startsWith('/lineage-explorer'),
    action: (_, runtime) => runtime.navigate('/lineage-explorer'),
  },
  {
    id: 'nav-guides',
    label: 'Digital guides',
    keywords: ['guides', 'learn'],
    group: 'navigation',
    isVisible: () => isDigitalGuidesPublic(),
    action: (_, runtime) => runtime.navigate('/guides'),
  },
  {
    id: 'nav-reference',
    label: 'Reference hub',
    keywords: ['reference', 'docs'],
    group: 'navigation',
    isVisible: () => true,
    action: (_, runtime) => runtime.navigate('/reference'),
  },
  {
    id: 'map-zoom-deeper',
    label: 'Zoom deeper into this view',
    keywords: ['zoom', 'closer', 'in'],
    group: 'explore',
    isVisible: (ctx) => ctx.atlasMode && ctx.pathname === '/',
    action: () => {
      const cam = readMapView();
      if (!cam) return;
      useMapStore.getState().setPendingFlyTarget({
        center: [cam.lng, cam.lat],
        zoom: Math.min(cam.zoom + 1.2, 14),
      });
    },
  },
];
