/* eslint-disable @typescript-eslint/no-unused-vars -- section builders share a common signature */
import type { AtlasLocale } from '@/core/types';
import { getBeatCount } from '@/core/story/engine';
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
  FULL_TIMELINE_PROGRESS_KEY,
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

function progressBadge(
  progress: StoryProgressRecord | undefined,
  locale: AtlasLocale,
): string | undefined {
  if (!progress) return undefined;
  if (progress.completed) return t('launcher.badge.completed', locale);
  if (progress.lastStep > 0) return t('launcher.badge.continue', locale);
  return undefined;
}

// ---------------------------------------------------------------------------
// Section builders (registered in order)
// ---------------------------------------------------------------------------

type SectionBuilder = (
  ctx: StoryLauncherContextInput,
  progressMap: Record<string, StoryProgressRecord>,
  heroArcIds: Set<string | null>,
) => StoryLauncherSection | null;

/** 1. Contextual / hero cards based on the current era. */
function buildContextualSection(
  ctx: StoryLauncherContextInput,
  progressMap: Record<string, StoryProgressRecord>,
  heroArcIds: Set<string | null>,
): StoryLauncherSection | null {
  const { eraId, locale } = ctx;
  const items: StoryLauncherItem[] = [];

  const eraArcs = getArcEntriesForEra(eraId);

  for (const arc of eraArcs) {
    const key = arcIdToProgressKey(arc.arcId);
    const progress = progressMap[key];
    const meta = metaForArc(arc.arcId);
    if (meta && getBeatCount(meta.arcId) === 0) continue;

    const isResumable = progress && !progress.completed && progress.lastStep > 0;
    const title = isResumable
      ? `${t('launcher.contextual.continue', locale)} ${resolveArcTitle(meta, arc, locale)}`
      : resolveArcTitle(meta, arc, locale);

    items.push({
      id: `ctx-${arc.arcId}`,
      title,
      subtitle: meta?.hook ? pickI18n(meta.hook, locale) : undefined,
      kind: 'contextual',
      launch: {
        type: 'story',
        arcId: arc.arcId,
        resumeStep: isResumable ? progress.lastStep : undefined,
      },
      badge: progressBadge(progress, locale),
      thumb: meta?.thumb ?? null,
      tone: meta?.tone,
      estimatedMinutes: meta?.estimatedMinutes,
    });
    heroArcIds.add(arc.arcId);
  }

  // If no era-scoped arcs, try the featured / recommended meta rows
  if (items.length === 0) {
    const recommended = storyLibraryMetaList.find(
      (m) => m.recommendedEraId === eraId && m.arcId !== null,
    );
    if (recommended && getBeatCount(recommended.arcId) > 0) {
      const arc = arcEntryFor(recommended.arcId!);
      const key = arcIdToProgressKey(recommended.arcId);
      const progress = progressMap[key];
      const isResumable = progress && !progress.completed && progress.lastStep > 0;
      items.push({
        id: `ctx-rec-${recommended.arcId}`,
        title: isResumable
          ? `${t('launcher.contextual.continue', locale)} ${resolveArcTitle(recommended, arc, locale)}`
          : resolveArcTitle(recommended, arc, locale),
        subtitle: recommended.hook ? pickI18n(recommended.hook, locale) : undefined,
        kind: 'contextual',
        launch: {
          type: 'story',
          arcId: recommended.arcId,
          resumeStep: isResumable ? progress.lastStep : undefined,
        },
        badge: progressBadge(progress, locale),
        thumb: recommended.thumb ?? null,
        tone: recommended.tone,
        estimatedMinutes: recommended.estimatedMinutes,
      });
      heroArcIds.add(recommended.arcId);
    }
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

/** 2. Arcs not mapped to the current era in `atlasEraArcs` (vs “In this era”). */
function buildArcsSection(
  ctx: StoryLauncherContextInput,
  progressMap: Record<string, StoryProgressRecord>,
  heroArcIds: Set<string | null>,
): StoryLauncherSection | null {
  const { locale } = ctx;
  const items: StoryLauncherItem[] = [];

  const sorted = [...storyLibraryMetaList]
    .filter((m) => m.arcId !== null)
    .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));

  for (const meta of sorted) {
    if (heroArcIds.has(meta.arcId)) continue;
    if (getBeatCount(meta.arcId) === 0) continue;

    const arc = arcEntryFor(meta.arcId!);
    const key = arcIdToProgressKey(meta.arcId);
    const progress = progressMap[key];

    items.push({
      id: `arc-${meta.arcId}`,
      title: resolveArcTitle(meta, arc, locale),
      subtitle: pickI18n(meta.blurb, locale),
      kind: 'story_arc',
      launch: {
        type: 'story',
        arcId: meta.arcId,
        resumeStep: progress && !progress.completed && progress.lastStep > 0
          ? progress.lastStep
          : undefined,
      },
      badge: progressBadge(progress, locale),
      thumb: meta.thumb ?? null,
      tone: meta.tone,
      estimatedMinutes: meta.estimatedMinutes,
    });
  }

  if (items.length === 0) return null;

  return {
    sectionId: 'arcs',
    title: t('launcher.section.otherPeriodsArcs', locale),
    variant: 'list',
    items,
    emphasis: 'atlas',
  };
}

/** 3. Full Journeys — long-form atlas-wide experiences. */
function buildJourneysSection(
  ctx: StoryLauncherContextInput,
  progressMap: Record<string, StoryProgressRecord>,
  _heroArcIds: Set<string | null>,
): StoryLauncherSection | null {
  const { locale } = ctx;
  const items: StoryLauncherItem[] = [];

  const journeyMetas = storyLibraryMetaList.filter((m) => m.arcId === null);

  for (const meta of journeyMetas) {
    if (getBeatCount(meta.arcId) === 0) continue;

    const key = FULL_TIMELINE_PROGRESS_KEY;
    const progress = progressMap[key];

    items.push({
      id: 'journey-full',
      title: meta.displayTitle ? pickI18n(meta.displayTitle, locale) : t('launcher.journey.full', locale),
      subtitle: pickI18n(meta.blurb, locale),
      kind: 'full_journey',
      launch: {
        type: 'story',
        arcId: null,
        resumeStep: progress && !progress.completed && progress.lastStep > 0
          ? progress.lastStep
          : undefined,
      },
      badge: progressBadge(progress, locale),
      thumb: meta.thumb ?? null,
      tone: meta.tone,
      estimatedMinutes: meta.estimatedMinutes,
    });
  }

  if (items.length === 0) return null;

  return {
    sectionId: 'journeys',
    title: t('launcher.section.journeys', locale),
    variant: 'list',
    items,
    emphasis: 'atlas',
  };
}

/** 4. Cinematic flythroughs visible in the current era. */
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

/** Era-scoped blocks first, then atlas-wide catalog (clearer hierarchy in the sheet). */
const SECTION_BUILDERS: SectionBuilder[] = [
  buildContextualSection,
  buildFlythroughsSection,
  buildArcsSection,
  buildJourneysSection,
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
