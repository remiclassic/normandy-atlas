import type { Command } from '@/lib/command-palette/types';
import { useMapStore } from '@/lib/store';
import { useAncestryStore } from '@/lib/ancestry-store';
import { GENEALOGY_HUB_PATH } from '@/lib/genealogy-paths';
import { resolveHaplogroupQuery, buildLineageMapGeoJson, bboxForLineageFeatures } from '@/core';
import { getHaplogroupProfile } from '@/core/lineage/engine';
import { CAMERA_PRESETS } from '@/lib/geo';

export const genealogyCommands: Command[] = [
  {
    id: 'gen-tree',
    label: 'Build my family tree',
    keywords: ['pedigree', 'ancestors'],
    group: 'genealogy',
    isVisible: (ctx) =>
      !ctx.pathname.startsWith('/genealogy') && !ctx.pathname.startsWith('/ancestry'),
    action: (_, runtime) => runtime.navigate(GENEALOGY_HUB_PATH),
  },
  {
    id: 'gen-migration-new-france',
    label: 'Trace migration to New France',
    keywords: ['canada', 'colony', 'settlers'],
    group: 'genealogy',
    isVisible: (ctx) => ctx.pathname === '/' && ctx.atlasMode,
    action: (_, runtime) => {
      runtime.navigate('/');
      const st = useMapStore.getState();
      st.setMigrationExplorerOpen(true);
      st.setMigrationBranch('st_lawrence');
      st.setMigrationMapMode('origins');
      const p = CAMERA_PRESETS['new-france'];
      st.setPendingFlyTarget({ center: p.center, zoom: p.zoom });
    },
  },
  {
    id: 'gen-match-haplogroup',
    label: 'Match my Y-DNA haplogroup on the map',
    keywords: ['ydna', 'snp', 'haplo'],
    group: 'genealogy',
    isVisible: () => !!useAncestryStore.getState().profile.yDnaRaw?.trim(),
    action: (_, runtime) => {
      const raw = useAncestryStore.getState().profile.yDnaRaw?.trim();
      if (!raw) return;
      const match = resolveHaplogroupQuery(raw, { lineage: 'all', depth: 'all' });
      if (!match) return;
      runtime.navigate('/');
      const apply = () => {
        const st = useMapStore.getState();
        st.setLayerVisibility('lineage-explorer', true);
        st.setLineageExplorerContext({ profileId: match.profile.id, eraLens: 'early_medieval' });
        const fc = buildLineageMapGeoJson(match.profile, st.lineageExplorerEraLens);
        const bb = bboxForLineageFeatures(fc);
        if (bb) {
          const [sw, ne] = bb;
          st.setPendingFlyTarget({
            center: [(sw[0] + ne[0]) / 2, (sw[1] + ne[1]) / 2],
            zoom: 4.2,
          });
        }
      };
      queueMicrotask(() => setTimeout(apply, 50));
    },
  },
  {
    id: 'gen-highlight-lineage',
    label: 'Highlight lineage profile on map',
    keywords: ['phylogeography', 'overlay'],
    group: 'genealogy',
    isVisible: (ctx) => {
      if (ctx.pathname !== '/' || !ctx.atlasMode) return false;
      const id = useMapStore.getState().lineageExplorerProfileId;
      if (!id) return false;
      return !!getHaplogroupProfile(id);
    },
    action: () => {
      const st = useMapStore.getState();
      const id = st.lineageExplorerProfileId;
      if (!id) return;
      const p = getHaplogroupProfile(id);
      if (!p) return;
      st.setLayerVisibility('lineage-explorer', true);
      const fc = buildLineageMapGeoJson(p, st.lineageExplorerEraLens);
      const bb = bboxForLineageFeatures(fc);
      if (bb) {
        const [sw, ne] = bb;
        st.setPendingFlyTarget({
          center: [(sw[0] + ne[0]) / 2, (sw[1] + ne[1]) / 2],
          zoom: 4.4,
        });
      }
    },
  },
];
