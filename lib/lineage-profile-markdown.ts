import type { AtlasLocale, HaplogroupProfile, HaplogroupSourceRef } from '@/core/types';
import { pickI18n } from '@/lib/locale';
import { LINEAGE_EXPLORER_RULES } from '@/lib/lineage-explorer-contract';

function fmtSources(sources: HaplogroupSourceRef[]): string {
  return sources
    .map((s) => {
      let line = `- ${s.title}`;
      if (s.url) line += ` (${s.url})`;
      if (s.note) line += ` — ${s.note}`;
      if (s.kind) line += ` [${s.kind}]`;
      return line;
    })
    .join('\n');
}

/** Plain-text / Markdown-friendly export for readers (clipboard, notes). */
export function buildLineageProfileMarkdown(profile: HaplogroupProfile, locale: AtlasLocale): string {
  const lines: string[] = [];
  const L = (x: Parameters<typeof pickI18n>[0]) => pickI18n(x, locale);

  lines.push(`# ${profile.name} (${profile.lineageType === 'paternal' ? 'Y-DNA' : 'mtDNA'})`);
  lines.push('');
  lines.push(L(profile.shortSummary));
  lines.push('');
  lines.push(`## ${locale === 'fr' ? 'Vue d’ensemble' : 'Overview'}`);
  lines.push(L(profile.longSummary));
  lines.push('');

  if (profile.estimatedOriginRegion || profile.migrationSummary || profile.estimatedOriginTime) {
    lines.push(`## ${locale === 'fr' ? 'Contexte' : 'Context'}`);
    if (profile.estimatedOriginRegion) lines.push(L(profile.estimatedOriginRegion));
    if (profile.migrationSummary) lines.push(L(profile.migrationSummary));
    if (profile.estimatedOriginTime) lines.push(L(profile.estimatedOriginTime));
    lines.push('');
  }

  if ((profile.cautionNotes?.length ?? 0) > 0) {
    lines.push(`## ${locale === 'fr' ? 'Mises en garde' : 'Cautions'}`);
    for (const n of profile.cautionNotes ?? []) {
      lines.push(`- ${L(n)}`);
    }
    lines.push('');
  }

  lines.push(`## ${locale === 'fr' ? 'Règles d’interprétation (Atlas)' : 'Interpretation rules (Atlas)'}`);
  for (const r of LINEAGE_EXPLORER_RULES) {
    lines.push(`- ${L(r)}`);
  }
  lines.push('');

  if ((profile.timelineEvents ?? []).length > 0) {
    lines.push(`## ${locale === 'fr' ? 'Chronologie' : 'Timeline'}`);
    for (const ev of profile.timelineEvents ?? []) {
      const yr =
        ev.startYear != null
          ? `${ev.startYear}${ev.endYear != null ? `–${ev.endYear}` : ''}`
          : '';
      lines.push(`### ${L(ev.title)}${yr ? ` (${yr})` : ''}`);
      lines.push(L(ev.description));
      lines.push(fmtSources(ev.sources));
      lines.push('');
    }
  }

  if ((profile.associatedRegionLinks ?? []).length > 0) {
    lines.push(`## ${locale === 'fr' ? 'Régions liées' : 'Linked regions'}`);
    for (const link of profile.associatedRegionLinks ?? []) {
      lines.push(`### ${link.regionId} (${link.relevanceType}, ${link.confidence})`);
      if (link.notes) lines.push(L(link.notes));
      lines.push(fmtSources(link.sources));
      lines.push('');
    }
  }

  lines.push(`## ${locale === 'fr' ? 'Bibliographie' : 'Bibliography'}`);
  lines.push(fmtSources(profile.sources));

  if (profile.lastReviewed) {
    lines.push('');
    lines.push(
      locale === 'fr'
        ? `_Dernière revue éditoriale : ${profile.lastReviewed}_`
        : `_Last editorial review: ${profile.lastReviewed}_`,
    );
  }
  if (profile.phylogenyAlignedTo) {
    lines.push(L(profile.phylogenyAlignedTo));
  }

  return lines.join('\n').trim() + '\n';
}
