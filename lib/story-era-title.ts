import type { AtlasLocale } from '@/core/types';
import { getAtlasEra } from '@/core';
import { pickI18n } from '@/lib/locale';
import { getEra } from '@/data/eras';

const TIMELINE_GROUP_DISPLAY: Record<string, string> = {
  'deep-time': 'Ancient',
  medieval: 'Medieval',
  atlantic: 'Atlantic & Colonial',
};

const SUMMARY_TEASER_MAX = 180;

function teaserFromSummary(full: string): string {
  if (!full) return '';
  const sentenceEnd = full.indexOf('. ');
  if (sentenceEnd !== -1 && sentenceEnd + 1 <= SUMMARY_TEASER_MAX) {
    const twoSentEnd = full.indexOf('. ', sentenceEnd + 2);
    if (twoSentEnd !== -1 && twoSentEnd + 1 <= SUMMARY_TEASER_MAX) return full.slice(0, twoSentEnd + 1);
    return full.slice(0, sentenceEnd + 1);
  }
  if (full.length <= SUMMARY_TEASER_MAX) return full;
  return full.slice(0, SUMMARY_TEASER_MAX).replace(/\s+\S*$/, '') + '\u2026';
}

/**
 * Resolve a human-readable era title for the story intro overlay.
 * Atlas eras carry full i18n labels; legacy eras are English-only.
 */
export function getStoryEraDisplayTitle(
  eraId: string,
  locale: AtlasLocale,
  atlasMode: boolean,
): string {
  if (atlasMode) {
    const era = getAtlasEra(eraId);
    if (era) return pickI18n(era.label, locale);
  }
  return getEra(eraId)?.label ?? eraId;
}

export function getStoryEraDateRange(
  eraId: string,
  atlasMode: boolean,
): { start: number; end: number } | null {
  if (atlasMode) {
    return getAtlasEra(eraId)?.range ?? null;
  }
  const yr = getEra(eraId)?.yearRange;
  return yr ? { start: yr[0], end: yr[1] } : null;
}

export function getStoryEraSummary(
  eraId: string,
  locale: AtlasLocale,
  atlasMode: boolean,
): string {
  if (atlasMode) {
    const era = getAtlasEra(eraId);
    if (era?.summary) return teaserFromSummary(pickI18n(era.summary, locale));
  }
  return teaserFromSummary(getEra(eraId)?.summary ?? '');
}

export function getStoryEraGroupLabel(
  eraId: string,
  atlasMode: boolean,
): string {
  if (atlasMode) {
    const group = getAtlasEra(eraId)?.timelineGroup;
    if (group) return TIMELINE_GROUP_DISPLAY[group] ?? group;
  }
  return getEra(eraId)?.timelineGroup ?? '';
}
