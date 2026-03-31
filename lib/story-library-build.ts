import { getStoryBeats, getBeatCount } from '@/core/story/engine';
import { atlasEraArcs, type EraArcEntry } from '@/data/atlas/era-arcs';
import {
  storyLibraryMetaList,
  STORY_CATEGORY_ORDER,
  type StoryCategory,
  type StoryLibraryMeta,
} from '@/data/atlas/story-library-meta';
import type { AtlasLocale } from '@/core/types';
import type { StoryBeat } from '@/core/types';
import { pickI18n } from '@/lib/locale';
import { STORY_BEAT_TITLES_ES } from '@/data/atlas/story-beat-bodies-es';
import { STORY_BEAT_TITLES_IT } from '@/data/atlas/story-beat-bodies-it';
import { arcIdToProgressKey } from '@/lib/story-progress';

export interface StoryLibraryRowModel {
  meta: StoryLibraryMeta;
  arcEntry: EraArcEntry | null;
  sceneCount: number;
  chapterTitles: string[];
  progressKey: string;
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
  return beat.copy.title;
}

function chapterPreviewForArc(arcId: string | null, locale: AtlasLocale, take = 3): string[] {
  const beats = getStoryBeats(arcId).slice(0, take);
  return beats.map((b) => resolveBeatTitle(b, locale));
}

function findArcEntry(arcId: string | null): EraArcEntry | null {
  if (!arcId) return null;
  return atlasEraArcs.find((a) => a.arcId === arcId) ?? null;
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

    rows.push({
      meta,
      arcEntry: findArcEntry(meta.arcId),
      sceneCount,
      chapterTitles: chapterPreviewForArc(meta.arcId, locale),
      progressKey: arcIdToProgressKey(meta.arcId),
    });
  }

  return rows;
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
    const list = map.get(row.meta.category);
    if (!list) continue;
    list.push(row);
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
