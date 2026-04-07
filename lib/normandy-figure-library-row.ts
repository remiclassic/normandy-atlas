import { getAtlasEra } from '@/core/era/engine';
import type { AtlasLocale, I18nString } from '@/core/types';
import type { StoryLibraryMeta, StoryCategory } from '@/data/atlas/story-library-meta';
import { NORMANDY_STORY_FIGURES } from '@/data/normandy-story-figures';
import { storyLibraryMetaList } from '@/data/atlas/story-library-meta';
import { eras } from '@/data/eras';
import { arcIdToProgressKey } from '@/lib/story-progress';
import type { NormandyStoryFigure } from '@/types';
import type { StoryLibraryRowModel } from '@/lib/story-library-build';
import { fallbackPosterForAtlasEraId, fallbackPosterForCategory } from '@/lib/story-library-poster-fallback';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';

/** Synthetic `arcId` so figure rows never collide with real arcs or `null` full timeline. */
export const NORMANDY_FIGURE_ARC_PREFIX = 'normandy-figure:' as const;

export function normandyFigureArcId(figureId: string): string {
  return `${NORMANDY_FIGURE_ARC_PREFIX}${figureId}`;
}

export function isNormandyFigureArcId(arcId: string | null | undefined): boolean {
  return arcId != null && arcId.startsWith(NORMANDY_FIGURE_ARC_PREFIX);
}

function i18nFromNote(text: string): I18nString {
  return { en: text };
}

function timelineRangeForFigure(f: NormandyStoryFigure): { start: number; end: number } | null {
  if (f.eraSource === 'atlas') {
    const e = getAtlasEra(f.eraId);
    return e ? { start: e.range.start, end: e.range.end } : null;
  }
  const e = eras.find((er) => er.id === f.eraId);
  if (!e) return null;
  return { start: e.yearRange[0], end: e.yearRange[1] };
}

/** Atlas era ids for the library era icon strip (`StoryLibraryEraFilterBar`). */
export function relatedAtlasEraIdsForFigure(f: NormandyStoryFigure): string[] {
  if (f.eraSource === 'atlas') {
    return getAtlasEra(f.eraId) ? [f.eraId] : [];
  }
  switch (f.eraId) {
    case 'roman-gaul':
      return ['roman-gaul'];
    case 'frankish':
      return ['neustria', 'frankish-carolingian'];
    case 'viking':
      return ['viking-age'];
    case 'early-normandy':
      return ['norman-origins'];
    case 'duchy':
      return ['norman-origins', 'norman-expansion'];
    case 'norman-expansion':
      return ['norman-expansion'];
    case 'late-medieval-france':
      return ['norman-expansion'];
    case 'age-of-exploration':
      return ['age-of-exploration'];
    case 'early-french-colonial':
      return ['age-of-exploration', 'new-france-foundations'];
    case 'new-france':
      return ['new-france-foundations', 'royal-new-france'];
    case 'acadia-atlantic':
      return ['new-france-foundations', 'royal-new-france'];
    case 'louisiana-interior':
      return ['royal-new-france', 'atlantic-imprint'];
    case 'seven-years-war':
      return ['atlantic-imprint'];
    default:
      return [];
  }
}

/** Secondary library category filters (primary row category remains `People`). */
export function librarySecondaryCategoriesForFigure(f: NormandyStoryFigure): StoryCategory[] {
  if (f.eraSource === 'atlas') {
    switch (f.eraId) {
      case 'neolithic-normandy':
      case 'bronze-age-channel':
      case 'iron-age-gaul':
      case 'roman-gaul':
      case 'post-roman-gaul':
      case 'neustria':
      case 'frankish-carolingian':
      case 'viking-age':
      case 'norman-origins':
        return ['Origins'];
      case 'norman-expansion':
        return ['Expansion'];
      case 'age-of-exploration':
        return ['Exploration'];
      case 'new-france-foundations':
      case 'royal-new-france':
      case 'atlantic-imprint':
        return ['New France'];
      default:
        return ['Origins'];
    }
  }
  switch (f.eraId) {
    case 'roman-gaul':
    case 'frankish':
    case 'viking':
    case 'early-normandy':
      return ['Origins'];
    case 'duchy':
      return ['Conquest'];
    case 'norman-expansion':
    case 'late-medieval-france':
      return ['Expansion'];
    case 'age-of-exploration':
    case 'early-french-colonial':
      return ['Exploration'];
    case 'new-france':
    case 'acadia-atlantic':
    case 'louisiana-interior':
    case 'seven-years-war':
      return ['New France'];
    default:
      return ['Origins'];
  }
}

function sortOrderForFigure(f: NormandyStoryFigure): number {
  return f.editorialPriority === 'primary' ? 63 : 380;
}

function replaceEra(template: string, era: string): string {
  return template.replace(/\{era\}/g, era);
}

function primaryEraLabelForFigure(f: NormandyStoryFigure, locale: AtlasLocale): string | null {
  if (f.eraSource === 'atlas') {
    const e = getAtlasEra(f.eraId);
    return e ? pickI18n(e.label, locale) : null;
  }
  const e = eras.find((er) => er.id === f.eraId);
  return e?.label ?? null;
}

/** Synthetic “stages on this arc” for People rows with a norman reading and/or map chronicle link. */
function linkedFigureArcChapters(f: NormandyStoryFigure, locale: AtlasLocale): string[] {
  const hasReading = Boolean(f.normanReadingSlug);
  const hasMap = Boolean(f.legacyAtlanticStoryStepId);
  if (!hasReading && !hasMap) return [];

  const eraLabel = primaryEraLabelForFigure(f, locale);
  const out: string[] = [];
  if (eraLabel) {
    out.push(replaceEra(t('storyLibrary.figure.arcStage.anchorEra', locale), eraLabel));
  } else {
    out.push(t('storyLibrary.figure.arcStage.context', locale));
  }
  if (hasReading) {
    out.push(t('storyLibrary.figure.arcStage.reading', locale));
  }
  if (hasMap) {
    out.push(t('storyLibrary.figure.arcStage.mapChronicle', locale));
  }
  return out;
}

function buildMeta(f: NormandyStoryFigure): StoryLibraryMeta {
  const secondary = librarySecondaryCategoriesForFigure(f);
  const alsoInCategories = secondary.filter((c) => c !== 'People');
  const relatedIds = relatedAtlasEraIdsForFigure(f);
  const blurbText =
    f.note?.trim() ||
    'Normandy-relevant figure — open a linked reading or map chronicle step when available.';
  const arcId = normandyFigureArcId(f.id);

  return {
    arcId,
    category: 'People',
    alsoInCategories: alsoInCategories.length > 0 ? alsoInCategories : undefined,
    rowKind: 'normandyFigure',
    normandyFigureId: f.id,
    normandyFigureReliability: f.reliability,
    normanReadingSlug: f.normanReadingSlug,
    legacyAtlanticStoryStepId: f.legacyAtlanticStoryStepId,
    displayTitle: i18nFromNote(f.name),
    blurb: i18nFromNote(blurbText),
    tone: 'personal',
    sortOrder: sortOrderForFigure(f),
    thumb: f.portrait?.src,
    recommendedEraId: relatedIds[0],
  };
}

const CURATED_STORY_LIBRARY_ARC_IDS = new Set(
  storyLibraryMetaList.map((m) => m.arcId).filter((id): id is string => Boolean(id)),
);

function isFigureSupersededByCuratedArc(f: NormandyStoryFigure): boolean {
  if (CURATED_STORY_LIBRARY_ARC_IDS.has(f.id)) return true;
  const sup = f.supersededByStoryArcId;
  return Boolean(sup && CURATED_STORY_LIBRARY_ARC_IDS.has(sup));
}

export function buildNormandyFigureLibraryRows(locale: AtlasLocale): StoryLibraryRowModel[] {
  const rows: StoryLibraryRowModel[] = [];

  for (const f of NORMANDY_STORY_FIGURES) {
    if (isFigureSupersededByCuratedArc(f)) continue;
    const meta = buildMeta(f);
    const timelineRange = timelineRangeForFigure(f);
    const relatedEraIds = relatedAtlasEraIdsForFigure(f);
    const posterCredit = f.portrait?.credit?.trim() || null;
    const arcChapters = linkedFigureArcChapters(f, locale);
    const chapterPreview = arcChapters.slice(0, 3);

    rows.push({
      meta,
      arcEntry: null,
      sceneCount: 0,
      chapterTitles: chapterPreview,
      chapterTitlesExtended: arcChapters,
      progressKey: arcIdToProgressKey(meta.arcId),
      resolvedPosterSrc:
        meta.thumb ??
        fallbackPosterForAtlasEraId(relatedEraIds[0]) ??
        fallbackPosterForCategory('People'),
      timelineRange,
      focusStats: { uniquePlaces: 0, uniqueRegions: 0, uniqueRoutes: 0 },
      posterCredit,
      relatedEraIds,
    });
  }

  return rows;
}
