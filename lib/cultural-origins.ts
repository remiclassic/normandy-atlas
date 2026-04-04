import type { CulturalStrand, CulturalBlendEntry, I18nString, AtlasLocale } from '@/core/types';
import { pickI18n } from '@/lib/locale';

// ---------------------------------------------------------------------------
// Strand metadata: labels, colors (dark-mode primary + parchment variant)
// ---------------------------------------------------------------------------

export interface StrandMeta {
  label: I18nString;
  colorDark: string;
  colorParchment: string;
}

export const STRAND_META: Record<CulturalStrand, StrandMeta> = {
  norse: {
    label: { en: 'Norse', fr: 'Scandinave', es: 'Nórdico', it: 'Norreno', de: 'Nordisch' },
    colorDark: '#d9863a',
    colorParchment: '#b36820',
  },
  frankish: {
    label: { en: 'Frankish', fr: 'Franc', es: 'Franco', it: 'Franco', de: 'Fränkisch' },
    colorDark: '#5b8fc4',
    colorParchment: '#3a6a9e',
  },
  breton: {
    label: { en: 'Breton', fr: 'Breton', es: 'Bretón', it: 'Bretone', de: 'Bretonisch' },
    colorDark: '#6bb88c',
    colorParchment: '#3e8a5e',
  },
  flemish: {
    label: { en: 'Flemish', fr: 'Flamand', es: 'Flamenco', it: 'Fiammingo', de: 'Flämisch' },
    colorDark: '#c9a84c',
    colorParchment: '#a08030',
  },
  picard: {
    label: { en: 'Picard', fr: 'Picard', es: 'Picardo', it: 'Piccardo', de: 'Pikardisch' },
    colorDark: '#b07cc8',
    colorParchment: '#8a5aa0',
  },
  anglo_saxon: {
    label: { en: 'Anglo-Saxon', fr: 'Anglo-Saxon', es: 'Anglosajón', it: 'Anglosassone', de: 'Angelsächsisch' },
    colorDark: '#c75b5b',
    colorParchment: '#993e3e',
  },
  gallo_roman: {
    label: { en: 'Gallo-Roman', fr: 'Gallo-romain', es: 'Galorromano', it: 'Gallo-romano', de: 'Gallorömisch' },
    colorDark: '#8c9e5a',
    colorParchment: '#6a7a3e',
  },
  irish: {
    label: { en: 'Irish', fr: 'Irlandais', es: 'Irlandés', it: 'Irlandese', de: 'Irisch' },
    colorDark: '#4ec4a8',
    colorParchment: '#2e9a80',
  },
  scottish: {
    label: { en: 'Scottish', fr: 'Écossais', es: 'Escocés', it: 'Scozzese', de: 'Schottisch' },
    colorDark: '#5a8eb0',
    colorParchment: '#3c6a88',
  },
  welsh: {
    label: { en: 'Welsh', fr: 'Gallois', es: 'Galés', it: 'Gallese', de: 'Walisisch' },
    colorDark: '#c44e7a',
    colorParchment: '#9a3058',
  },
  other: {
    label: { en: 'Other', fr: 'Autre', es: 'Otro', it: 'Altro', de: 'Andere' },
    colorDark: '#8a8a8a',
    colorParchment: '#6a6a6a',
  },
};

// ---------------------------------------------------------------------------
// Normalize / sort blend entries
// ---------------------------------------------------------------------------

export function normalizeBlend(entries: CulturalBlendEntry[]): CulturalBlendEntry[] {
  if (entries.length === 0) return entries;
  const sorted = [...entries].sort((a, b) => b.weight - a.weight);
  const total = sorted.reduce((s, e) => s + e.weight, 0);
  if (total <= 0) return sorted;
  if (Math.abs(total - 1) < 0.01) return sorted;
  return sorted.map((e) => ({ strand: e.strand, weight: e.weight / total }));
}

// ---------------------------------------------------------------------------
// Bar-segment data for a stacked horizontal bar
// ---------------------------------------------------------------------------

export interface BarSegment {
  strand: CulturalStrand;
  weight: number;
  color: string;
  label: string;
}

export function blendToBarSegments(
  entries: CulturalBlendEntry[],
  locale: AtlasLocale,
  basemap: 'dark' | 'parchment' = 'dark',
): BarSegment[] {
  const norm = normalizeBlend(entries);
  return norm.map((e) => ({
    strand: e.strand,
    weight: e.weight,
    color: basemap === 'parchment' ? STRAND_META[e.strand].colorParchment : STRAND_META[e.strand].colorDark,
    label: pickI18n(STRAND_META[e.strand].label, locale),
  }));
}

// ---------------------------------------------------------------------------
// Dominant-strand summaries for tooltips and one-liners
// ---------------------------------------------------------------------------

export function pickDominantStrands(entries: CulturalBlendEntry[], n = 2): CulturalBlendEntry[] {
  return normalizeBlend(entries).slice(0, n);
}

export function dominantStrandsSummary(
  entries: CulturalBlendEntry[],
  locale: AtlasLocale,
  n = 2,
): string {
  const top = pickDominantStrands(entries, n);
  return top.map((e) => pickI18n(STRAND_META[e.strand].label, locale)).join(' + ');
}

// ---------------------------------------------------------------------------
// Blend color for map tints — weighted average of strand RGB anchors
// ---------------------------------------------------------------------------

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('');
}

export function blendTintColor(
  entries: CulturalBlendEntry[],
  basemap: 'dark' | 'parchment' = 'dark',
): string {
  const norm = normalizeBlend(entries);
  if (norm.length === 0) return basemap === 'parchment' ? '#8a7a5a' : '#c4a962';
  let r = 0, g = 0, b = 0;
  for (const e of norm) {
    const rgb = hexToRgb(basemap === 'parchment' ? STRAND_META[e.strand].colorParchment : STRAND_META[e.strand].colorDark);
    r += rgb[0] * e.weight;
    g += rgb[1] * e.weight;
    b += rgb[2] * e.weight;
  }
  return rgbToHex(r, g, b);
}

export function resolveStrandLabel(strand: CulturalStrand, locale: AtlasLocale): string {
  return pickI18n(STRAND_META[strand].label, locale);
}
