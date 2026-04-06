import { getStoryBeats, getBeatCount } from '@/core/story/engine';
import { atlasEraArcs, type EraArcEntry } from '@/data/atlas/era-arcs';
import {
  storyLibraryMetaList,
  STORY_CATEGORY_ORDER,
  libraryCategoryMembership,
  type StoryCategory,
  type StoryLibraryMeta,
} from '@/data/atlas/story-library-meta';
import type { AtlasLocale, StoryBeat } from '@/core/types';
import { pickI18n } from '@/lib/locale';
import { STORY_BEAT_TITLES_ES } from '@/data/atlas/story-beat-bodies-es';
import { STORY_BEAT_TITLES_IT } from '@/data/atlas/story-beat-bodies-it';
import { STORY_BEAT_TITLES_DE } from '@/data/atlas/story-beat-titles-de';
import { arcIdToProgressKey } from '@/lib/story-progress';
import { getAtlasEra, getAtlasEras, getEraRange } from '@/core/era/engine';
import type { AtlasEra } from '@/core/types';

export interface FocusStats {
  uniquePlaces: number;
  uniqueRegions: number;
  uniqueRoutes: number;
}

export interface StoryLibraryRowModel {
  meta: StoryLibraryMeta;
  arcEntry: EraArcEntry | null;
  sceneCount: number;
  chapterTitles: string[];
  chapterTitlesExtended: string[];
  progressKey: string;
  /** Resolved poster image — meta.thumb if set, else first illustrated beat's src. */
  resolvedPosterSrc: string | null;
  /** Timeline year range derived from beats, if computable. */
  timelineRange: { start: number; end: number } | null;
  /** Counts of unique map features referenced by beats. */
  focusStats: FocusStats;
  /** Poster credit string (already locale-resolved). */
  posterCredit: string | null;
  /** Atlas era ids touched by this arc’s beats (for library filters). */
  relatedEraIds: string[];
}

function resolveBeatTitle(beat: StoryBeat, locale: AtlasLocale): string {
  if (locale === 'es') {
    const t = STORY_BEAT_TITLES_ES[beat.id];
    if (t) return t;
  }
  if (locale === 'it') {
    const t = STORY_BEAT_TITLES_IT[beat.id];
    if (t) return t;
  }
  if (locale === 'de') {
    const t = STORY_BEAT_TITLES_DE[beat.id];
    if (t) return t;
  }
  return beat.copy.title;
}

function chapterPreviewForArc(arcId: string | null, locale: AtlasLocale, take = 3): string[] {
  const beats = getStoryBeats(arcId).slice(0, take);
  return beats.map((b) => resolveBeatTitle(b, locale));
}

function chapterExtendedForArc(arcId: string | null, locale: AtlasLocale, take = 12): string[] {
  const beats = getStoryBeats(arcId).slice(0, take);
  return beats.map((b) => resolveBeatTitle(b, locale));
}

function findArcEntry(arcId: string | null): EraArcEntry | null {
  if (!arcId) return null;
  return atlasEraArcs.find((a) => a.arcId === arcId) ?? null;
}

function resolvePosterSrc(meta: StoryLibraryMeta): string | null {
  if (meta.thumb) return meta.thumb;
  const beats = getStoryBeats(meta.arcId);
  for (const b of beats) {
    if (b.illustration?.src) return b.illustration.src;
  }
  return null;
}

function computeTimelineRange(
  beats: StoryBeat[],
): { start: number; end: number } | null {
  let min = Infinity;
  let max = -Infinity;

  for (const b of beats) {
    if (b.anchorYear != null) {
      if (b.anchorYear < min) min = b.anchorYear;
      if (b.anchorYear > max) max = b.anchorYear;
    } else {
      const range = getEraRange(b.eraId);
      if (range) {
        if (range.start < min) min = range.start;
        if (range.end > max) max = range.end;
      }
    }
  }

  if (!isFinite(min) || !isFinite(max)) return null;
  return { start: min, end: max };
}

function relatedEraIdsForRow(meta: StoryLibraryMeta, beats: StoryBeat[]): string[] {
  const s = new Set<string>();
  for (const b of beats) {
    if (b.eraId) s.add(b.eraId);
  }
  if (meta.recommendedEraId) s.add(meta.recommendedEraId);
  return [...s].sort();
}

function computeFocusStats(beats: StoryBeat[]): FocusStats {
  const places = new Set<string>();
  const regions = new Set<string>();
  const routes = new Set<string>();

  for (const b of beats) {
    for (const id of b.focus.placeIds) places.add(id);
    for (const id of b.focus.regionIds) regions.add(id);
    for (const id of b.focus.routeSegmentIds) routes.add(id);
  }

  return {
    uniquePlaces: places.size,
    uniqueRegions: regions.size,
    uniqueRoutes: routes.size,
  };
}

function resolvePosterCredit(
  meta: StoryLibraryMeta,
  resolvedSrc: string | null,
  locale: AtlasLocale,
): string | null {
  if (meta.posterCredit) return pickI18n(meta.posterCredit, locale);
  if (!resolvedSrc || meta.thumb) return null;
  const beats = getStoryBeats(meta.arcId);
  for (const b of beats) {
    if (b.illustration?.src === resolvedSrc && b.illustration.credit) {
      return pickI18n(b.illustration.credit, locale);
    }
  }
  return null;
}

/**
 * Merged rows for the library: metadata + arc chrome + beat-derived counts and chapter lines.
 * Omits arcs with zero beats (data mismatch guard).
 */
export function buildStoryLibraryRows(locale: AtlasLocale): StoryLibraryRowModel[] {
  const rows: StoryLibraryRowModel[] = [];

  for (const meta of storyLibraryMetaList) {
    const sceneCount = getBeatCount(meta.arcId);
    if (sceneCount === 0) continue;

    const beats = getStoryBeats(meta.arcId);
    const resolvedSrc = resolvePosterSrc(meta);

    rows.push({
      meta,
      arcEntry: findArcEntry(meta.arcId),
      sceneCount,
      chapterTitles: chapterPreviewForArc(meta.arcId, locale),
      chapterTitlesExtended: chapterExtendedForArc(meta.arcId, locale),
      progressKey: arcIdToProgressKey(meta.arcId),
      resolvedPosterSrc: resolvedSrc,
      timelineRange: computeTimelineRange(beats),
      focusStats: computeFocusStats(beats),
      posterCredit: resolvePosterCredit(meta, resolvedSrc, locale),
      relatedEraIds: relatedEraIdsForRow(meta, beats),
    });
  }

  return rows;
}

/** Atlas eras that appear in at least one library row, in default atlas order. */
export function storyLibraryAtlasErasWithStories(rows: StoryLibraryRowModel[]): AtlasEra[] {
  const used = new Set<string>();
  for (const r of rows) {
    for (const id of r.relatedEraIds) used.add(id);
  }
  return getAtlasEras().filter((e) => used.has(e.id));
}

export function pickFeaturedRow(rows: StoryLibraryRowModel[]): StoryLibraryRowModel | null {
  const featured = rows.filter((r) => r.meta.featured);
  if (featured.length === 0) return null;
  featured.sort((a, b) => (a.meta.sortOrder ?? 99) - (b.meta.sortOrder ?? 99));
  return featured[0] ?? null;
}

export function groupRowsByCategory(
  rows: StoryLibraryRowModel[],
  excludeKeys: Set<string>,
  locale: AtlasLocale,
): Map<StoryCategory, StoryLibraryRowModel[]> {
  const map = new Map<StoryCategory, StoryLibraryRowModel[]>();
  for (const c of STORY_CATEGORY_ORDER) {
    map.set(c, []);
  }

  for (const row of rows) {
    if (excludeKeys.has(row.progressKey)) continue;
    for (const cat of libraryCategoryMembership(row.meta)) {
      const list = map.get(cat);
      if (list) list.push(row);
    }
  }

  for (const list of map.values()) {
    list.sort((a, b) => {
      const oa = a.meta.sortOrder ?? 50;
      const ob = b.meta.sortOrder ?? 50;
      if (oa !== ob) return oa - ob;
      const ta = pickI18n(a.arcEntry?.label ?? { en: '' }, locale) || pickI18n(a.meta.displayTitle ?? { en: '' }, locale);
      const tb = pickI18n(b.arcEntry?.label ?? { en: '' }, locale) || pickI18n(b.meta.displayTitle ?? { en: '' }, locale);
      return ta.localeCompare(tb);
    });
  }

  return map;
}

/** Normalized text for filtering the story library (title, hook, blurb, chapter titles). */
export function storyLibraryRowSearchHaystack(row: StoryLibraryRowModel, locale: AtlasLocale): string {
  const title = row.meta.displayTitle
    ? pickI18n(row.meta.displayTitle, locale)
    : row.arcEntry
      ? pickI18n(row.arcEntry.label, locale)
      : '';
  const hook = row.meta.hook ? pickI18n(row.meta.hook, locale) : '';
  const blurb = pickI18n(row.meta.blurb, locale);
  const chapters = row.chapterTitles.join(' ');
  const eraLabels = row.relatedEraIds
    .map((id) => {
      const era = getAtlasEra(id);
      return era ? pickI18n(era.label, locale) : '';
    })
    .join(' ');
  return `${title} ${hook} ${blurb} ${chapters} ${eraLabels}`.toLowerCase();
}
