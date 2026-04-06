/* eslint-disable @typescript-eslint/no-unused-vars -- section builders share a common signature */
import type { AtlasLocale } from '@/core/types';
import { getBeatCount, getStoryBeats } from '@/core/story/engine';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import {
  getArcEntriesForEra,
  atlasEraArcs,
  type EraArcEntry,
} from '@/data/atlas/era-arcs';
import {
  storyLibraryMetaList,
  type StoryLibraryMeta,
} from '@/data/atlas/story-library-meta';
import {
  flythroughPresets,
  isFlythroughPresetVisibleInEra,
} from '@/data/atlas/flythrough-presets';
import {
  readStoryProgressMap,
  arcIdToProgressKey,
  type StoryProgressRecord,
} from '@/lib/story-progress';

import type {
  StoryLauncherContextInput,
  StoryLauncherItem,
  StoryLauncherSection,
  StoryLauncherModel,
} from './types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveArcTitle(
  meta: StoryLibraryMeta | undefined,
  arcEntry: EraArcEntry | undefined,
  locale: AtlasLocale,
): string {
  if (meta?.displayTitle) return pickI18n(meta.displayTitle, locale);
  if (arcEntry) return pickI18n(arcEntry.label, locale);
  return '';
}

function metaForArc(arcId: string | null): StoryLibraryMeta | undefined {
  return storyLibraryMetaList.find((m) => m.arcId === arcId);
}

function arcEntryFor(arcId: string): EraArcEntry | undefined {
  return atlasEraArcs.find((a) => a.arcId === arcId);
}

function posterForMeta(
  meta: StoryLibraryMeta | undefined,
  arcId: string | null,
): string | null {
  if (!meta) return null;
  if (meta.thumb) return meta.thumb;
  const beats = getStoryBeats(arcId);
  for (const b of beats) {
    if (b.illustration?.src) return b.illustration.src;
  }
  return null;
}

function progressBadge(
  progress: StoryProgressRecord | undefined,
  locale: AtlasLocale,
): string | undefined {
  if (!progress) return undefined;
  if (progress.completed) return t('launcher.badge.completed', locale);
  if (progress.lastStep > 0) return t('launcher.badge.continue', locale);
  return undefined;
}

/** Eras covered by the flagship `new-france` story arc (arcId ≠ atlas era id). */
const NEW_FRANCE_ERA_IDS = new Set([
  'new-france-foundations',
  'royal-new-france',
  'atlantic-imprint',
]);

const ATLAS_ARC_CATALOG_ORDER = new Map(
  atlasEraArcs.map((a, i) => [a.arcId, i] as const),
);

/**
 * Order arcs so the map era feels “primary”: flagship arc for the era first,
 * strong deprioritization when story meta `recommendedEraId` points at another era
 * (e.g. Viking-titled mega-arc on New France).
 */
function launcherArcPriority(
  entry: EraArcEntry,
  eraId: string,
  meta: StoryLibraryMeta | undefined,
  catalogIndex: number,
): number {
  let score = 0;

  if (meta?.recommendedEraId && meta.recommendedEraId !== eraId) {
    score -= 2500;
  }

  if (meta?.recommendedEraId === eraId) {
    score += 4000 - Math.min(meta.sortOrder ?? 500, 350);
  }

  if (entry.arcId === eraId) {
    score += 5000;
  }

  if (NEW_FRANCE_ERA_IDS.has(eraId) && entry.arcId === 'new-france') {
    score += 5000;
  }

  if (entry.eraIds.length === 1 && entry.eraIds[0] === eraId) {
    score += 800;
  }

  score += Math.max(0, 80 - entry.eraIds.length * 15);
  score -= catalogIndex * 1e-6;

  return score;
}

function sortArcEntriesForLauncher(entries: EraArcEntry[], eraId: string): EraArcEntry[] {
  return [...entries]
    .map((entry, idx) => ({
      entry,
      idx,
      catalogIndex: ATLAS_ARC_CATALOG_ORDER.get(entry.arcId) ?? idx,
    }))
    .sort((a, b) => {
      const pa = launcherArcPriority(
        a.entry,
        eraId,
        metaForArc(a.entry.arcId),
        a.catalogIndex,
      );
      const pb = launcherArcPriority(
        b.entry,
        eraId,
        metaForArc(b.entry.arcId),
        b.catalogIndex,
      );
      if (pb !== pa) return pb - pa;
      return a.idx - b.idx;
    })
    .map((x) => x.entry);
}

// ---------------------------------------------------------------------------
// Section builders (registered in order)
// ---------------------------------------------------------------------------

type SectionBuilder = (
  ctx: StoryLauncherContextInput,
  progressMap: Record<string, StoryProgressRecord>,
  heroArcIds: Set<string | null>,
) => StoryLauncherSection | null;

/**
 * Era-scoped contextual story rows (same ordering as the launcher hero list).
 * Used by the launcher model and by map idle CTAs that need the flagship arc.
 */
export function getContextualStoryItems(
  ctx: StoryLauncherContextInput,
  progressMap: Record<string, StoryProgressRecord>,
): StoryLauncherItem[] {
  const { eraId, locale } = ctx;
  const items: StoryLauncherItem[] = [];

  const eraArcs = sortArcEntriesForLauncher(getArcEntriesForEra(eraId), eraId);

  for (const arc of eraArcs) {
    const key = arcIdToProgressKey(arc.arcId);
    const progress = progressMap[key];
    const meta = metaForArc(arc.arcId);
    if (meta && getBeatCount(meta.arcId) === 0) continue;

    const isResumable = progress && !progress.completed && progress.lastStep > 0;
    const arcTitle = resolveArcTitle(meta, arc, locale);
    const title = isResumable
      ? `${t('launcher.contextual.continue', locale)} ${arcTitle}`
      : arcTitle;

    items.push({
      id: `ctx-${arc.arcId}`,
      title,
      heroHeadline: arcTitle,
      subtitle: meta?.hook ? pickI18n(meta.hook, locale) : undefined,
      kind: 'contextual',
      launch: {
        type: 'story',
        arcId: arc.arcId,
        resumeStep: isResumable ? progress.lastStep : undefined,
      },
      badge: progressBadge(progress, locale),
      thumb: meta?.thumb ?? null,
      posterSrc: posterForMeta(meta, arc.arcId),
      tone: meta?.tone,
      estimatedMinutes: meta?.estimatedMinutes,
    });
  }

  if (items.length === 0) {
    const recommended = storyLibraryMetaList.find(
      (m) => m.recommendedEraId === eraId && m.arcId !== null,
    );
    if (recommended && getBeatCount(recommended.arcId) > 0) {
      const arc = arcEntryFor(recommended.arcId!);
      const key = arcIdToProgressKey(recommended.arcId);
      const progress = progressMap[key];
      const isResumable = progress && !progress.completed && progress.lastStep > 0;
      const arcTitle = resolveArcTitle(recommended, arc, locale);
      items.push({
        id: `ctx-rec-${recommended.arcId}`,
        title: isResumable
          ? `${t('launcher.contextual.continue', locale)} ${arcTitle}`
          : arcTitle,
        heroHeadline: arcTitle,
        subtitle: recommended.hook ? pickI18n(recommended.hook, locale) : undefined,
        kind: 'contextual',
        launch: {
          type: 'story',
          arcId: recommended.arcId,
          resumeStep: isResumable ? progress.lastStep : undefined,
        },
        badge: progressBadge(progress, locale),
        thumb: recommended.thumb ?? null,
        posterSrc: posterForMeta(recommended, recommended.arcId),
        tone: recommended.tone,
        estimatedMinutes: recommended.estimatedMinutes,
      });
    }
  }

  return items;
}

/** First contextual story for the era (`null` if none — e.g. flythrough-only eras). */
export function getEraFlagshipStoryItem(
  ctx: StoryLauncherContextInput,
): StoryLauncherItem | null {
  const items = getContextualStoryItems(ctx, readStoryProgressMap());
  return items[0] ?? null;
}

/** 1. Contextual / hero cards based on the current era. */
function buildContextualSection(
  ctx: StoryLauncherContextInput,
  progressMap: Record<string, StoryProgressRecord>,
  heroArcIds: Set<string | null>,
): StoryLauncherSection | null {
  const { locale } = ctx;
  const items = getContextualStoryItems(ctx, progressMap);
  for (const item of items) {
    if (item.launch.type === 'story') heroArcIds.add(item.launch.arcId);
  }

  if (items.length === 0) return null;

  return {
    sectionId: 'contextual',
    title: t('launcher.section.thisEra', locale),
    variant: 'hero',
    items,
    emphasis: 'era',
  };
}

/** 2. Cinematic flythroughs visible in the current era. */
function buildFlythroughsSection(
  ctx: StoryLauncherContextInput,
  _progressMap: Record<string, StoryProgressRecord>,
  _heroArcIds: Set<string | null>,
): StoryLauncherSection | null {
  const { eraId, locale } = ctx;
  const visible = flythroughPresets.filter((p) => isFlythroughPresetVisibleInEra(p, eraId));

  if (visible.length === 0) return null;

  const items: StoryLauncherItem[] = visible.map((p) => ({
    id: `fly-${p.id}`,
    title: pickI18n(p.title, locale),
    subtitle: pickI18n(p.subtitle, locale),
    kind: 'flythrough' as const,
    launch: { type: 'flythrough' as const, presetId: p.id },
  }));

  return {
    sectionId: 'flythroughs',
    title: t('launcher.section.flythroughs', locale),
    variant: 'list',
    items,
    emphasis: 'era',
  };
}

// ---------------------------------------------------------------------------
// Section registry — ordered; empty sections are omitted.
// ---------------------------------------------------------------------------

/** Era-scoped picks and flythroughs; full arc catalog lives in Story Library. */
const SECTION_BUILDERS: SectionBuilder[] = [
  buildContextualSection,
  buildFlythroughsSection,
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function buildStoryLauncherModel(
  ctx: StoryLauncherContextInput,
): StoryLauncherModel {
  const progressMap = readStoryProgressMap();
  const heroArcIds = new Set<string | null>();

  const sections: StoryLauncherSection[] = [];
  for (const builder of SECTION_BUILDERS) {
    const section = builder(ctx, progressMap, heroArcIds);
    if (section && section.items.length > 0) {
      sections.push(section);
    }
  }

  return { sections };
}
