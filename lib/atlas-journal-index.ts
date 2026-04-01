import type { AtlasLocale, Place, AtlasRegion, Journey, RouteSegment, StoryBeat } from '@/core/types';
import { vikingAdnaSites } from '@/data/atlas/viking-adna-burials';
import { vikingArchaeologySites } from '@/data/atlas/viking-archaeology-sites';
import { atlasGlossary } from '@/data/atlas/glossary';
import { atlasPlaces } from '@/data/atlas/places';
import { atlasRegions } from '@/data/atlas/regions';
import { atlasJourneys } from '@/data/atlas/journeys';
import { atlasRouteSegments } from '@/data/atlas/route-segments';
import { getStoryBeats, getStoryStepForBeatId } from '@/core/story/engine';
import { atlasEraArcs } from '@/data/atlas/era-arcs';
import { STORY_BEAT_TITLES_ES, STORY_BEAT_BODIES_ES } from '@/data/atlas/story-beat-bodies-es';
import { STORY_BEAT_TITLES_IT, STORY_BEAT_BODIES_IT } from '@/data/atlas/story-beat-bodies-it';
import { pickI18n } from '@/lib/locale';
import { buildMapHref } from '@/lib/map-deep-link';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type JournalCategory = 'concept' | 'place' | 'region' | 'journey' | 'segment' | 'story' | 'viking-site';

export interface JournalIndexRow {
  category: JournalCategory;
  id: string;
  title: string;
  excerpt: string;
  searchText: string;
  mapLink: string;
  meta?: { eraId?: string; regionId?: string; arcId?: string | null; kind?: string };
}

// ---------------------------------------------------------------------------
// Derivation helpers
// ---------------------------------------------------------------------------

const EXCERPT_MAX = 180;

function truncate(s: string, max = EXCERPT_MAX): string {
  if (s.length <= max) return s;
  const cut = s.lastIndexOf(' ', max);
  return s.slice(0, cut > 0 ? cut : max) + '…';
}

function haystack(...parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(' ').toLowerCase();
}

/**
 * Pick the "best" era label for a place: prefer the latest era
 * with non-hidden visibility; tie-break by higher pedagogyIndex.
 */
function bestPlaceLabel(place: Place): { label: string; eraId: string } {
  let best: { label: string; eraId: string; pIdx: number } | undefined;
  for (const [eraId, st] of Object.entries(place.eraStates)) {
    if (st.visibility === 'hidden') continue;
    if (!best || st.pedagogyIndex > best.pIdx || (st.pedagogyIndex === best.pIdx && eraId > best.eraId)) {
      best = { label: st.label, eraId, pIdx: st.pedagogyIndex };
    }
  }
  return best ?? { label: place.id, eraId: Object.keys(place.eraStates)[0] ?? '' };
}

/**
 * Pick a deterministic era for a region's narrative:
 * first "emphasized" era, else first key in file order.
 */
function bestRegionEra(region: AtlasRegion): string | undefined {
  const narrativeKeys = region.narrativeByEra ? Object.keys(region.narrativeByEra) : [];
  if (narrativeKeys.length === 0) return Object.keys(region.eraStates)[0];
  for (const eraId of narrativeKeys) {
    if (region.eraStates[eraId]?.visibility === 'emphasized') return eraId;
  }
  return narrativeKeys[0];
}

function resolveStoryTitle(beat: StoryBeat, locale: AtlasLocale): string {
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

function resolveStoryBody(beat: StoryBeat, locale: AtlasLocale): string {
  if (locale === 'es') {
    const b = STORY_BEAT_BODIES_ES[beat.id];
    if (b) return b;
  }
  if (locale === 'it') {
    const b = STORY_BEAT_BODIES_IT[beat.id];
    if (b) return b;
  }
  return pickI18n(beat.copy.body, locale);
}

// ---------------------------------------------------------------------------
// Row builders per category
// ---------------------------------------------------------------------------

function buildConceptRows(locale: AtlasLocale): JournalIndexRow[] {
  return atlasGlossary.map((entry) => {
    const title = pickI18n(entry.term, locale);
    const excerpt = truncate(pickI18n(entry.definition, locale));
    return {
      category: 'concept',
      id: entry.id,
      title,
      excerpt,
      searchText: haystack(title, excerpt, entry.id),
      mapLink: `/journal#glossary-${entry.id}`,
    };
  });
}

function buildPlaceRows(locale: AtlasLocale): JournalIndexRow[] {
  return atlasPlaces.map((place) => {
    const { label, eraId } = bestPlaceLabel(place);
    const allLabels = Object.values(place.eraStates)
      .map((s) => s.label)
      .filter((l, i, a) => a.indexOf(l) === i);
    const kindLabel = place.kind.replace(/_/g, ' ');
    const excerpt = allLabels.length > 1
      ? `${kindLabel} — also: ${allLabels.filter((l) => l !== label).slice(0, 3).join(', ')}`
      : kindLabel;
    return {
      category: 'place',
      id: place.id,
      title: label,
      excerpt,
      searchText: haystack(label, ...allLabels, kindLabel, place.id, place.regionId),
      mapLink: buildMapHref({ era: eraId, place: place.id }),
      meta: { eraId, regionId: place.regionId, kind: place.kind },
    };
  });
}

function buildRegionRows(locale: AtlasLocale): JournalIndexRow[] {
  return atlasRegions.map((region) => {
    const title = pickI18n(region.name, locale);
    const eraId = bestRegionEra(region);
    let excerpt = '';
    if (eraId && region.narrativeByEra?.[eraId]) {
      excerpt = truncate(pickI18n(region.narrativeByEra[eraId], locale));
    }
    return {
      category: 'region',
      id: region.id,
      title,
      excerpt,
      searchText: haystack(title, excerpt, region.id),
      mapLink: buildMapHref({ era: eraId, region: region.id }),
      meta: { eraId },
    };
  });
}

function buildJourneyRows(locale: AtlasLocale): JournalIndexRow[] {
  return atlasJourneys.map((j: Journey) => {
    const title = pickI18n(j.name, locale);
    const excerpt = truncate(pickI18n(j.summary, locale));
    const eraId = j.eraIds[0];
    return {
      category: 'journey',
      id: j.id,
      title,
      excerpt,
      searchText: haystack(title, excerpt, j.id, ...j.eraIds),
      mapLink: buildMapHref({ era: eraId, journey: j.id }),
      meta: { eraId },
    };
  });
}

function buildSegmentRows(locale: AtlasLocale): JournalIndexRow[] {
  return atlasRouteSegments
    .filter((s: RouteSegment) => s.segmentTooltip || s.segmentDetail)
    .map((s: RouteSegment) => {
      const tooltip = s.segmentTooltip ? pickI18n(s.segmentTooltip, locale) : '';
      const detail = s.segmentDetail ? pickI18n(s.segmentDetail, locale) : '';
      const title = tooltip || s.id;
      const excerpt = truncate(detail || tooltip);
      const eraId = s.eraIds[0];
      return {
        category: 'segment',
        id: s.id,
        title,
        excerpt,
        searchText: haystack(title, excerpt, s.id, s.kind, ...s.eraIds),
        mapLink: buildMapHref({ era: eraId, segment: s.id }),
        meta: { eraId, kind: s.kind },
      };
    });
}

const arcLabelMap = new Map(atlasEraArcs.map((a) => [a.arcId, a.label]));

function buildStoryRows(locale: AtlasLocale): JournalIndexRow[] {
  const beats = getStoryBeats(null);
  return beats.map((beat: StoryBeat) => {
    const title = resolveStoryTitle(beat, locale);
    const excerpt = truncate(resolveStoryBody(beat, locale));
    const step = getStoryStepForBeatId(beat.id);
    const arcLabel = beat.arcId && arcLabelMap.has(beat.arcId)
      ? pickI18n(arcLabelMap.get(beat.arcId)!, locale)
      : undefined;

    return {
      category: 'story',
      id: beat.id,
      title,
      excerpt,
      searchText: haystack(title, excerpt, beat.id, beat.eraId, arcLabel),
      mapLink: step
        ? buildMapHref({ story: step.arc ?? '', step: step.stepIndex })
        : buildMapHref({ era: beat.eraId }),
      meta: { eraId: beat.eraId, arcId: beat.arcId ?? null },
    };
  });
}

function buildVikingSiteRows(_locale: AtlasLocale): JournalIndexRow[] {
  const adnaRows: JournalIndexRow[] = vikingAdnaSites.map((s) => ({
    category: 'viking-site' as const,
    id: s.id,
    title: s.siteName,
    excerpt: truncate(s.burialDescription ?? `${s.periodLabel} · ${s.country}`),
    searchText: haystack(s.siteName, s.country, s.region ?? '', s.periodLabel, ...s.tags),
    mapLink: buildMapHref({ era: 'viking-age', vikingAdna: s.id }),
    meta: { eraId: 'viking-age', kind: 'adna' },
  }));

  const archRows: JournalIndexRow[] = vikingArchaeologySites.map((s) => ({
    category: 'viking-site' as const,
    id: s.id,
    title: s.name,
    excerpt: truncate(s.description),
    searchText: haystack(s.name, s.country, s.region ?? '', s.periodLabel, ...s.tags, s.siteType),
    mapLink: buildMapHref({ era: 'viking-age', vikingArch: s.id }),
    meta: { eraId: 'viking-age', kind: 'archaeology' },
  }));

  return [...adnaRows, ...archRows];
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function buildJournalIndex(
  locale: AtlasLocale,
  categories?: JournalCategory[],
): JournalIndexRow[] {
  const include = categories ? new Set(categories) : null;
  const rows: JournalIndexRow[] = [];

  if (!include || include.has('concept')) rows.push(...buildConceptRows(locale));
  if (!include || include.has('place')) rows.push(...buildPlaceRows(locale));
  if (!include || include.has('region')) rows.push(...buildRegionRows(locale));
  if (!include || include.has('journey')) rows.push(...buildJourneyRows(locale));
  if (!include || include.has('segment')) rows.push(...buildSegmentRows(locale));
  if (!include || include.has('story')) rows.push(...buildStoryRows(locale));
  if (!include || include.has('viking-site')) rows.push(...buildVikingSiteRows(locale));

  return rows;
}
