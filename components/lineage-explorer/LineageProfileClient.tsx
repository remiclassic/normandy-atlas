'use client';

import Link from 'next/link';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Copy, Dna, ExternalLink, Heart, Map, GitBranch } from 'lucide-react';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import { buildMapHref } from '@/lib/map-deep-link';
import { LINEAGE_EXPLORER_RULES } from '@/lib/lineage-explorer-contract';
import { readLineageFavorites, toggleLineageFavorite } from '@/lib/lineage-favorites';
import { getHaplogroupChildren, getAncestorChain } from '@/core';
import type {
  AtlasLocale,
  HaplogroupProfile,
  HaplogroupSourceRef,
  NormanAtlasLineageFocus,
  LineageEraLens,
} from '@/core/types';
import { buildLineageProfileMarkdown } from '@/lib/lineage-profile-markdown';
import { copyToClipboard } from '@/lib/progress/share';
import {
  resolveLineageHistoricalGroups,
  resolveLineageRegions,
  resolveLineageJourneys,
  resolveLineageStoryArcs,
} from '@/core/lineage/related';
import { LineageConfidenceDot } from '@/components/lineage-explorer/ConfidenceDot';
import { useMapStore } from '@/lib/store';

const LENS_OPTS: { id: LineageEraLens; labelEn: string }[] = [
  { id: 'deep', labelEn: 'Deep prehistory' },
  { id: 'antiquity', labelEn: 'Antiquity' },
  { id: 'early_medieval', labelEn: 'Early Medieval' },
  { id: 'high_medieval', labelEn: 'High Medieval' },
  { id: 'colonial', labelEn: 'Colonial / New France lens' },
];

function lensOptionLabel(o: (typeof LENS_OPTS)[number], locale: ReturnType<typeof useLocale>) {
  return locale === 'fr' ? o.id.replace(/_/g, ' ') : o.labelEn;
}

/** Custom listbox — native select option menus are OS-themed and ignore app CSS on Windows. */
const LineageEraLensSelect = memo(function LineageEraLensSelect({
  value,
  onChange,
  locale,
}: {
  value: LineageEraLens;
  onChange: (v: LineageEraLens) => void;
  locale: ReturnType<typeof useLocale>;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocMouse = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDocMouse);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouse);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = useMemo(() => LENS_OPTS.find((o) => o.id === value), [value]);
  const currentLabel = current ? lensOptionLabel(current, locale) : '';

  const toggle = useCallback(() => setOpen((o) => !o), []);
  const pick = useCallback(
    (id: LineageEraLens) => {
      onChange(id);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <div ref={rootRef} className="relative mt-1 w-full max-w-md">
      <button
        ref={triggerRef}
        type="button"
        id="lineage-era-lens-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="lineage-era-lens-listbox"
        onClick={toggle}
        className="flex w-full items-center justify-between gap-2 rounded-md border border-chrome-border bg-chrome-fill-raised px-2 py-1.5 text-left text-[12px] text-parchment outline-none transition-colors focus-visible:border-gold/35 focus-visible:ring-1 focus-visible:ring-gold/25"
      >
        <span className="min-w-0 truncate">{currentLabel}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`shrink-0 text-text-dim/60 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <path
            d="M2 3.5L5 6.5L8 3.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <AnimatePresence>
        {open ? (
          <motion.ul
            id="lineage-era-lens-listbox"
            role="listbox"
            aria-labelledby="lineage-era-lens-trigger"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-y-auto rounded-md border border-chrome-border-strong bg-chrome-popover py-1 shadow-atlas-popover backdrop-blur-xl scrollbar-thin"
          >
            {LENS_OPTS.map((o) => {
              const selected = o.id === value;
              return (
                <li key={o.id} role="presentation" className="px-0.5">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => pick(o.id)}
                    className={`w-full rounded px-2 py-1.5 text-left text-[12px] transition-colors ${
                      selected
                        ? 'bg-gold/20 text-parchment'
                        : 'text-text-muted hover:bg-chrome-fill-hover hover:text-parchment'
                    }`}
                  >
                    {lensOptionLabel(o, locale)}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
});

const FOCUS_I18N: Record<NormanAtlasLineageFocus, { en: string; fr: string }> = {
  viking_age_scandinavia: {
    en: 'Possible relevance to Viking Age Scandinavian activity (population patterns, not identity).',
    fr: 'Pertinence possible à l’activité scandinave de l’âge des Vikings (schémas de population, pas identité).',
  },
  frankish_regions: {
    en: 'May connect to Frankish-era northern Gaul and Rhine corridors.',
    fr: 'Peut relier à la Gaule du nord et aux corridors rhénans à l’époque franque.',
  },
  normandy: {
    en: 'Themes tied to Normandy’s formation and ducal period may be worth exploring next.',
    fr: 'Des thèmes liés à la formation de la Normandie et à la période ducale méritent d’être explorés.',
  },
  anglo_norman: {
    en: 'Possible links to Anglo-Norman expansion narratives (cautious overlap).',
    fr: 'Liens possibles aux récits d’expansion anglo-normande (chevauchement prudent).',
  },
  british_isles: {
    en: 'British Isles medieval contexts often overlap many lineages.',
    fr: 'Les contextes médiévaux des îles britanniques chevauchent souvent de nombreuses lignées.',
  },
  new_france: {
    en: 'Colonial New France corridor — more about settlement history than haplogroup proof.',
    fr: 'Corridor de la Nouvelle-France coloniale — plutôt l’histoire de peuplement qu’une preuve par haplogroupe.',
  },
  baltic_slavic: {
    en: 'Eastern Baltic / Slavic-zone historiography may offer useful comparisons.',
    fr: 'L’historiographie de la Baltique orientale / zone slave peut offrir des comparaisons utiles.',
  },
  eastern_steppe_corridors: {
    en: 'Broad steppe and river-trade imaginaries — high uncertainty at individual level.',
    fr: 'Imaginaires larges de steppe et de commerce fluvial — forte incertitude au niveau individuel.',
  },
};

const LineageSourceList = memo(function LineageSourceList({
  sources,
  locale,
}: {
  sources: HaplogroupSourceRef[];
  locale: AtlasLocale;
}) {
  if (sources.length === 0) return null;
  return (
    <ul className="mt-2 space-y-2 border-t border-chrome-border/35 pt-2">
      {sources.map((s) => (
        <li key={s.id} className="text-[11px] leading-snug text-text-muted">
          <span className="font-medium text-parchment/90">{s.title}</span>
          {s.kind ? (
            <span className="ml-1.5 rounded border border-chrome-border/60 px-1 py-0.5 text-[9px] uppercase tracking-wide text-text-dim">
              {s.kind}
            </span>
          ) : null}
          {s.note ? <span className="mt-0.5 block text-text-dim">{s.note}</span> : null}
          {s.url ? (
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-gold/75 hover:text-gold hover:underline"
            >
              <ExternalLink className="h-3 w-3 shrink-0 opacity-70" strokeWidth={2} aria-hidden />
              {locale === 'fr' ? 'Lien public' : 'Open link'}
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
});

const LineageProfileClient = memo(function LineageProfileClient({ profile }: { profile: HaplogroupProfile }) {
  const locale = useLocale();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [eraLens, setEraLens] = useState<LineageEraLens>('early_medieval');
  const [fav, setFav] = useState(() => readLineageFavorites().includes(profile.id));
  const [copyState, setCopyState] = useState<'idle' | 'done'>('idle');

  const groups = useMemo(() => resolveLineageHistoricalGroups(profile), [profile]);
  const regions = useMemo(() => resolveLineageRegions(profile), [profile]);
  const journeys = useMemo(() => resolveLineageJourneys(profile), [profile]);
  const arcs = useMemo(() => resolveLineageStoryArcs(profile), [profile]);
  const children = useMemo(() => getHaplogroupChildren(profile.id), [profile.id]);
  const ancestors = useMemo(() => getAncestorChain(profile).slice(1), [profile]);

  const onViewMap = useCallback(() => {
    useMapStore.getState().setLayerVisibility('lineage-explorer', true);
    useMapStore.getState().setLineageExplorerContext({ profileId: profile.id, eraLens });
  }, [profile.id, eraLens]);

  const mapHref = useMemo(
    () => buildMapHref({ lineage: profile.id, lineageLens: eraLens, era: 'viking-age' }),
    [profile.id, eraLens],
  );

  const mapWithMacroHref = useMemo(
    () =>
      buildMapHref({
        lineage: profile.id,
        lineageLens: eraLens,
        era: 'viking-age',
        macro: true,
        hpY: 800,
        hpV: 'peoples',
      }),
    [profile.id, eraLens],
  );

  const onViewMapWithMacro = useCallback(() => {
    const st = useMapStore.getState();
    st.setLayerVisibility('lineage-explorer', true);
    st.setLayerVisibility('historical-presence', true);
    st.setLineageExplorerContext({ profileId: profile.id, eraLens });
    st.setHistoricalPresenceYear(800);
    st.setHistoricalPresenceView('peoples');
    st.setHistoricalPresenceCompare(false);
  }, [profile.id, eraLens]);

  const onCopyMarkdown = useCallback(async () => {
    const ok = await copyToClipboard(buildLineageProfileMarkdown(profile, locale));
    if (ok) {
      setCopyState('done');
      window.setTimeout(() => setCopyState('idle'), 2000);
    }
  }, [profile, locale]);

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
        <AtlasSubpageChromeHeader onOpenToolsMenu={() => setToolsOpen(true)} />
        <ReferenceHubTabs />
        <main className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin pb-24 pt-8 px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pt-10">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/lineage-explorer"
              className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-text-dim hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
              {locale === 'fr' ? 'Retour à la recherche' : 'Back to search'}
            </Link>

            <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Dna className="mt-1 h-7 w-7 text-gold/70" strokeWidth={1.25} aria-hidden />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                    {profile.lineageType === 'paternal' ? 'Y-DNA' : 'mtDNA'}
                  </p>
                  <h1 className="font-display text-2xl font-semibold uppercase tracking-[0.05em] text-[var(--color-gold)] md:text-3xl">
                    {profile.name}
                  </h1>
                  {profile.phylogenyVersionNote ? (
                    <p className="mt-1 text-[11px] text-text-dim">{pickI18n(profile.phylogenyVersionNote, locale)}</p>
                  ) : null}
                  {(profile.lastReviewed || profile.phylogenyAlignedTo) && (
                    <div className="mt-3 rounded-md border border-chrome-border/50 bg-chrome-fill/15 px-2.5 py-2 text-[10px] text-text-dim">
                      {profile.lastReviewed ? (
                        <p>
                          <span className="font-semibold text-gold/60">{t('lineageExplorer.trustReviewed', locale)}: </span>
                          {profile.lastReviewed}
                        </p>
                      ) : null}
                      {profile.phylogenyAlignedTo ? (
                        <p className={profile.lastReviewed ? 'mt-1' : ''}>
                          <span className="font-semibold text-gold/60">{t('lineageExplorer.phylogenyAligned', locale)}: </span>
                          {pickI18n(profile.phylogenyAlignedTo, locale)}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const ids = toggleLineageFavorite(profile.id);
                  setFav(ids.includes(profile.id));
                }}
                className="rounded-lg border border-chrome-border px-2.5 py-2 text-text-dim hover:text-gold"
                aria-label={locale === 'fr' ? 'Favori' : 'Favorite'}
              >
                <Heart className={`h-5 w-5 ${fav ? 'fill-gold/40 text-gold' : ''}`} strokeWidth={1.5} />
              </button>
            </header>

            <div className="mb-6 flex flex-wrap gap-2">
              <Link
                href={mapHref}
                onClick={onViewMap}
                className="inline-flex items-center gap-2 rounded-lg bg-gold/20 px-3 py-2 text-[13px] font-medium text-parchment"
              >
                <Map className="h-4 w-4" />
                {t('lineageExplorer.viewOnMap', locale)}
              </Link>
              <Link
                href={mapWithMacroHref}
                onClick={onViewMapWithMacro}
                className="inline-flex items-center gap-2 rounded-lg border border-gold/25 bg-gold/[0.06] px-3 py-2 text-[12px] font-medium text-parchment hover:border-gold/40"
              >
                <Map className="h-4 w-4 text-gold/70" />
                {t('lineageExplorer.viewMapWithMacro', locale)}
              </Link>
              <Link
                href={`/lineage-explorer/compare?a=${encodeURIComponent(profile.id)}`}
                className="inline-flex items-center gap-2 rounded-lg border border-chrome-border px-3 py-2 text-[12px] text-text-muted hover:border-gold/25"
              >
                {t('lineageExplorer.compareLink', locale)}
              </Link>
              <button
                type="button"
                onClick={() => void onCopyMarkdown()}
                className="inline-flex items-center gap-2 rounded-lg border border-chrome-border px-3 py-2 text-[12px] text-text-muted hover:border-gold/25"
              >
                <Copy className="h-3.5 w-3.5" strokeWidth={2} />
                {copyState === 'done' ? t('lineageExplorer.copyMarkdownDone', locale) : t('lineageExplorer.copyMarkdown', locale)}
              </button>
            </div>

            <div className="mb-6 rounded-lg border border-chrome-border/70 bg-chrome-fill/20 p-3">
              <label
                htmlFor="lineage-era-lens-trigger"
                className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-dim"
              >
                {locale === 'fr' ? 'Focalisation temporelle (carte illustrative)' : 'Time focus (illustrative map)'}
              </label>
              <LineageEraLensSelect value={eraLens} onChange={setEraLens} locale={locale} />
            </div>

            <section className="mb-8 rounded-xl border border-chrome-border/60 bg-gold/[0.04] p-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-muted">
                {locale === 'fr' ? 'Ce que cela peut suggérer' : 'What this may suggest'}
              </h2>
              <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-text-muted">
                {profile.estimatedOriginRegion ? (
                  <li>
                    <span className="text-text-dim">{locale === 'fr' ? 'Origine profonde (large) : ' : 'Deep origin (broad): '}</span>
                    {pickI18n(profile.estimatedOriginRegion, locale)}
                  </li>
                ) : null}
                {profile.migrationSummary ? (
                  <li>{pickI18n(profile.migrationSummary, locale)}</li>
                ) : null}
                {profile.estimatedOriginTime ? (
                  <li>{pickI18n(profile.estimatedOriginTime, locale)}</li>
                ) : null}
              </ul>
              <div className="mt-3 border-t border-chrome-border/50 pt-3">
                <p className="text-[11px] font-semibold text-amber-400/90">
                  {locale === 'fr' ? 'Note importante' : 'Important note'}
                </p>
                <ul className="mt-1 space-y-1 text-[12px] text-text-muted">
                  {(profile.cautionNotes ?? []).map((n, i) => (
                    <li key={i}>• {pickI18n(n, locale)}</li>
                  ))}
                  <li>
                    •{' '}
                    {locale === 'fr'
                      ? 'Une seule lignée directe — pas toute votre ascendance.'
                      : 'One direct lineage only — not your full ancestry.'}
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {locale === 'fr' ? 'Vue d’ensemble' : 'Overview'}
              </h2>
              <p className="text-[length:var(--atlas-text-md)] leading-relaxed text-text-muted">
                {pickI18n(profile.longSummary, locale)}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {locale === 'fr' ? 'Récit migratoire' : 'Migration story'}
              </h2>
              <p className="text-[length:var(--atlas-text-md)] leading-relaxed text-text-muted">
                {pickI18n(
                  profile.migrationSummary ?? {
                    en: 'See linked regions on the map for broad, low-resolution corridors.',
                    fr: 'Voir les régions liées sur la carte pour des corridors larges et basse résolution.',
                  },
                  locale,
                )}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                Norman Atlas — {locale === 'fr' ? 'pertinence possible' : 'possible relevance'}
              </h2>
              <ul className="space-y-2">
                {(profile.normanAtlasFocus ?? []).map((f) => (
                  <li key={f} className="flex gap-2 text-[13px] leading-snug text-text-muted">
                    <span className="text-gold/50">◇</span>
                    {locale === 'fr' ? FOCUS_I18N[f].fr : FOCUS_I18N[f].en}
                  </li>
                ))}
                {(profile.normanAtlasFocus ?? []).length === 0 ? (
                  <li className="text-[13px] text-text-dim">
                    {locale === 'fr'
                      ? 'Pertinence indirecte ou générale — explorez les cartes et récits connexes.'
                      : 'Indirect or general relevance — explore linked maps and stories.'}
                  </li>
                ) : null}
              </ul>
            </section>

            {(profile.timelineEvents ?? []).length > 0 ? (
              <section className="mb-8">
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                  {locale === 'fr' ? 'Chronologie' : 'Timeline'}
                </h2>
                <ul className="space-y-3">
                  {(profile.timelineEvents ?? []).map((ev) => (
                    <li key={ev.id} className="rounded-lg border border-chrome-border/50 bg-chrome-fill/15 p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <LineageConfidenceDot level={ev.confidence} />
                        <span className="font-medium text-parchment">{pickI18n(ev.title, locale)}</span>
                        {ev.startYear != null ? (
                          <span className="text-[11px] tabular-nums text-text-dim">
                            {ev.startYear}
                            {ev.endYear != null ? `–${ev.endYear}` : ''}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-[12px] leading-relaxed text-text-muted">
                        {pickI18n(ev.description, locale)}
                      </p>
                      <LineageSourceList sources={ev.sources} locale={locale} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {(profile.associatedRegionLinks ?? []).length > 0 ? (
              <section className="mb-8">
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                  {locale === 'fr' ? 'Régions liées (avec prudence)' : 'Linked regions (careful wording)'}
                </h2>
                <ul className="space-y-2">
                  {(profile.associatedRegionLinks ?? []).map((link, i) => (
                    <li
                      key={`${link.regionId}-${i}`}
                      className="rounded-md border border-chrome-border/40 bg-chrome-fill/10 px-3 py-2 text-[12px]"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <LineageConfidenceDot level={link.confidence} />
                        <span className="font-mono text-[11px] text-gold/80">{link.regionId}</span>
                        <span className="text-text-dim">{link.relevanceType}</span>
                      </div>
                      {link.notes ? (
                        <p className="mt-1 text-text-muted">{pickI18n(link.notes, locale)}</p>
                      ) : null}
                      <LineageSourceList sources={link.sources} locale={locale} />
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="mb-8">
              <h2 className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                <GitBranch className="h-3.5 w-3.5" />
                {locale === 'fr' ? 'Peuples & couches historiques (liens doux)' : 'Related peoples & historical layers'}
              </h2>
              <p className="mb-2 text-[11px] text-text-dim">
                {locale === 'fr'
                  ? 'Aucun groupe ici ne « correspond » à votre haplogroupe : ce sont des entrées de l’atlas pour poursuivre la lecture.'
                  : 'No group here “maps to” your haplogroup — these are atlas entries for further reading.'}
              </p>
              <ul className="space-y-2">
                {groups.map(({ id, group }) => (
                  <li key={id}>
                    <span className="text-[13px] font-medium text-parchment">{pickI18n(group.name, locale)}</span>
                    <p className="text-[11px] text-text-dim line-clamp-2">{pickI18n(group.description, locale)}</p>
                    <p className="text-[10px] text-text-dim/80">
                      {locale === 'fr'
                        ? 'Voir la couche « Peuples (macro) » sur la carte — ne confondez pas avec la génétique.'
                        : 'See the Historical peoples (macro) layer on the map — not the same as genetics.'}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {locale === 'fr' ? 'Régions de l’atlas' : 'Atlas regions'}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {regions.map(({ id, region }) => (
                  <li key={id}>
                    <span className="rounded-md bg-chrome-fill-badge px-2 py-1 text-[11px] text-text-muted">
                      {pickI18n(region.name, locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {locale === 'fr' ? 'Voyages & routes' : 'Journeys'}
              </h2>
              <ul className="space-y-1">
                {journeys.map(({ id, journey }) => (
                  <li key={id}>
                    <Link href={`/?journey=${encodeURIComponent(id)}`} className="text-[13px] text-gold/80 hover:underline">
                      {pickI18n(journey.name, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {locale === 'fr' ? 'Récits' : 'Stories'}
              </h2>
              <ul className="space-y-1">
                {arcs.map((arc) => (
                  <li key={arc.arcId}>
                    <Link
                      href={`/?story=${encodeURIComponent(arc.arcId ?? '')}`}
                      className="text-[13px] text-gold/80 hover:underline"
                    >
                      {arc.displayTitle ? pickI18n(arc.displayTitle, locale) : arc.arcId}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {locale === 'fr' ? 'Navigation des branches' : 'Branch navigation'}
              </h2>
              {ancestors.length > 0 ? (
                <p className="mb-2 text-[12px] text-text-dim">
                  {locale === 'fr' ? 'Ancêtres (clades parents) :' : 'Ancestor clades:'}{' '}
                  {ancestors.map((a) => (
                    <Link key={a.id} href={`/lineage-explorer/${a.id}`} className="mx-1 text-gold/80 hover:underline">
                      {a.name}
                    </Link>
                  ))}
                </p>
              ) : null}
              {children.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {children.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/lineage-explorer/${c.id}`}
                        className="rounded-md border border-chrome-border px-2 py-1 text-[12px] hover:border-gold/30"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[12px] text-text-dim">
                  {locale === 'fr' ? 'Pas de sous-clade listé dans ce lot de données.' : 'No subclades listed in this seed dataset.'}
                </p>
              )}
            </section>

            <section className="mb-8 rounded-lg border border-amber-400/20 bg-amber-400/[0.06] p-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200/90">
                {locale === 'fr' ? 'Interprétation & confiance' : 'Interpretation & confidence'}
              </h2>
              <ul className="mt-2 space-y-1 text-[12px] text-text-muted">
                {LINEAGE_EXPLORER_RULES.slice(0, 3).map((r, i) => (
                  <li key={i}>• {pickI18n(r, locale)}</li>
                ))}
              </ul>
              {(profile.confidenceNotes ?? []).map((n, i) => (
                <p key={i} className="mt-2 text-[12px] text-text-muted">
                  {pickI18n(n, locale)}
                </p>
              ))}
            </section>

            <section>
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {t('lineageExplorer.sectionBibliography', locale)}
              </h2>
              <LineageSourceList sources={profile.sources} locale={locale} />
            </section>
          </div>
        </main>
      </div>
      <AtlasSubpageToolsMenu open={toolsOpen} onClose={() => setToolsOpen(false)} />
    </div>
  );
});

export default LineageProfileClient;
