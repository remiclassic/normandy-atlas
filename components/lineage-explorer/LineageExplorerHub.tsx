'use client';

import Link from 'next/link';
import { memo, useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Dna, Heart, Map as MapIcon, MapPin, Search } from 'lucide-react';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import GenealogySubnav from '@/components/layout/GenealogySubnav';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import { LINEAGE_EXPLORER_RULES, LINEAGE_EXPLORER_FORBIDDEN } from '@/lib/lineage-explorer-contract';
import { searchHaplogroupProfiles, type HaplogroupSearchFilters } from '@/core/lineage/search';
import type { LineageDepthFilter, LineageLineageFilter } from '@/core/types';
import { readLineageFavorites, toggleLineageFavorite, writeLineageFavorites } from '@/lib/lineage-favorites';
import { getHaplogroupProfile } from '@/core';
import RegionalHaplogroupPiePanel from '@/components/lineage-explorer/RegionalHaplogroupPiePanel';
import AtlasSelect from '@/components/ui/AtlasSelect';

const EXAMPLE_QUERIES = ['R1b', 'R1b-U106', 'I1', 'H1', 'U5', 'mtDNA H', 'Y-DNA R1a'];

const LineageExplorerHub = memo(function LineageExplorerHub() {
  const locale = useLocale();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const dq = useDeferredValue(query);
  const [lineageFilter, setLineageFilter] = useState<LineageLineageFilter>('all');
  const [depthFilter, setDepthFilter] = useState<LineageDepthFilter>('all');
  const [favorites, setFavorites] = useState<string[]>(() => readLineageFavorites());

  const filters: HaplogroupSearchFilters = useMemo(
    () => ({ lineage: lineageFilter, depth: depthFilter, limit: 40 }),
    [lineageFilter, depthFilter],
  );

  const results = useMemo(() => searchHaplogroupProfiles(dq.trim(), filters), [dq, filters]);

  const onToggleFavorite = useCallback((id: string) => {
    setFavorites(toggleLineageFavorite(id));
  }, []);

  const favProfiles = useMemo(
    () => favorites.map((id) => getHaplogroupProfile(id)).filter(Boolean),
    [favorites],
  );

  const lineageSelectOptions = useMemo(
    () => [
      { value: 'all', label: locale === 'fr' ? 'Toutes' : 'All' },
      { value: 'paternal', label: 'Y-DNA' },
      { value: 'maternal', label: 'mtDNA' },
    ],
    [locale],
  );

  const depthSelectOptions = useMemo(
    () => [
      { value: 'all', label: locale === 'fr' ? 'Tout' : 'All branches' },
      { value: 'major', label: locale === 'fr' ? 'Clades majeurs' : 'Major clades' },
      { value: 'sub', label: locale === 'fr' ? 'Sous-clades' : 'Subclades' },
    ],
    [locale],
  );

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <a
        href="#lineage-explorer-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-[13px]"
        style={{ background: 'var(--color-surface)', color: 'var(--color-gold)' }}
      >
        Skip to content
      </a>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
        <AtlasSubpageChromeHeader onOpenToolsMenu={() => setToolsOpen(true)} />
        <ReferenceHubTabs />
        <GenealogySubnav />
        <main
          id="lineage-explorer-main"
          className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin pb-[max(4rem,env(safe-area-inset-bottom)+2rem)] pt-8 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pb-20 md:pt-12"
        >
          <div className="mx-auto max-w-3xl">
            <header className="mb-8 text-center md:mb-10">
              <p
                className="mb-2 font-sans text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'var(--color-gold-muted)' }}
              >
                — {t('lineageExplorer.navLabel', locale)} —
              </p>
              <h1
                className="font-display text-[clamp(1.5rem,4vw,2.4rem)] font-semibold uppercase tracking-[0.06em] text-[var(--color-gold)]"
                style={{
                  textShadow:
                    '0 1px 0 rgba(255,255,255,0.06), 0 -1px 0 rgba(0,0,0,0.4), 0 0 18px rgba(196,169,98,0.07)',
                }}
              >
                {t('lineageExplorer.hubTitle', locale)}
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-[length:var(--atlas-text-md)] leading-relaxed text-[var(--color-text-muted)]">
                {t('lineageExplorer.navHint', locale)}
              </p>
              <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-text-dim">
                <Link
                  href="/journal#lineage-citations-policy"
                  className="text-gold/80 underline decoration-gold/30 underline-offset-2 hover:text-gold"
                >
                  {t('lineageExplorer.hubMethodologyLink', locale)}
                </Link>
              </p>
              <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-text-dim">
                <Link
                  href="/lineage-explorer/migration-map"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gold/25 bg-chrome-fill-raised/40 px-3 py-2 font-medium text-gold/90 hover:border-gold/45 hover:bg-chrome-fill-raised/55"
                >
                  <MapPin className="h-3.5 w-3.5 opacity-85" aria-hidden />
                  {t('lineageExplorer.migrationMapLink', locale)}
                </Link>
              </p>
            </header>

            <RegionalHaplogroupPiePanel />

            <p className="mx-auto mt-3 max-w-xl text-center text-[13px] leading-relaxed text-text-dim">
              <Link
                href="/lineage-explorer/norman-y-dna"
                className="text-gold/85 underline decoration-gold/30 underline-offset-2 hover:text-gold"
              >
                {t('lineageExplorer.normanYdnaHubLink', locale)}
              </Link>
            </p>

            <div
              className="rounded-xl border border-chrome-border-strong/50 bg-chrome-fill/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-5"
            >
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-dim">
                  <Search className="h-3 w-3 opacity-60" strokeWidth={2} aria-hidden />
                  {locale === 'fr' ? 'Rechercher' : 'Search'}
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={locale === 'fr' ? 'ex. R1b-U106, H1, mtDNA U5' : 'e.g. R1b-U106, H1, mtDNA U5'}
                  className="w-full rounded-lg border border-chrome-border bg-chrome-fill-raised px-3 py-2.5 text-[14px] text-parchment placeholder:text-text-dim/50 focus:border-gold/35 focus:outline-none"
                />
              </label>

              <div className="mt-3 flex flex-wrap gap-2">
                {EXAMPLE_QUERIES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setQuery(ex)}
                    className="rounded-md border border-chrome-border/80 px-2 py-1 text-[11px] text-text-muted transition-colors hover:border-gold/25 hover:text-parchment"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
                  {locale === 'fr' ? 'Lignée' : 'Lineage'}
                  <AtlasSelect
                    value={lineageFilter}
                    onValueChange={(v) => setLineageFilter(v as LineageLineageFilter)}
                    options={lineageSelectOptions}
                  />
                </label>
                <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
                  {locale === 'fr' ? 'Profondeur' : 'Branch depth'}
                  <AtlasSelect
                    value={depthFilter}
                    onValueChange={(v) => setDepthFilter(v as LineageDepthFilter)}
                    options={depthSelectOptions}
                  />
                </label>
              </div>
            </div>

            <section className="mt-8" aria-label={locale === 'fr' ? 'Résultats' : 'Results'}>
              <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {locale === 'fr' ? 'Résultats' : 'Results'}
              </h2>
              <ul className="space-y-2">
                {results.map(({ profile, fallbackFromQuery }) => (
                  <li key={profile.id}>
                    <Link
                      href={`/lineage-explorer/${encodeURIComponent(profile.id)}`}
                      className="group flex items-start gap-3 rounded-lg border border-chrome-border/60 bg-chrome-fill/20 p-3 transition-colors hover:border-gold/20 hover:bg-chrome-fill/35"
                    >
                      <Dna className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" strokeWidth={1.5} aria-hidden />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-parchment">{profile.name}</span>
                          <span className="rounded bg-chrome-fill-badge px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-text-dim">
                            {profile.lineageType === 'paternal' ? 'Y-DNA' : 'mtDNA'}
                          </span>
                          {fallbackFromQuery ? (
                            <span className="text-[10px] text-amber-400/80">
                              {locale === 'fr'
                                ? `Parent le plus proche pour « ${fallbackFromQuery} »`
                                : `Closest curated profile for “${fallbackFromQuery}”`}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-[12px] leading-snug text-text-muted line-clamp-2">
                          {pickI18n(profile.shortSummary, locale)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onToggleFavorite(profile.id);
                        }}
                        className="shrink-0 rounded p-1 text-text-dim hover:text-gold"
                        aria-label={locale === 'fr' ? 'Favori' : 'Favorite'}
                      >
                        <Heart
                          className={`h-4 w-4 ${favorites.includes(profile.id) ? 'fill-gold/50 text-gold' : ''}`}
                          strokeWidth={1.5}
                        />
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
              {results.length === 0 ? (
                <p className="text-[13px] text-text-dim">{locale === 'fr' ? 'Aucun résultat.' : 'No matches.'}</p>
              ) : null}
            </section>

            {favProfiles.length > 0 ? (
              <section className="mt-10">
                <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                  {locale === 'fr' ? 'Favoris' : 'Saved lineages'}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {favProfiles.map((p) =>
                    p ? (
                      <Link
                        key={p.id}
                        href={`/lineage-explorer/${p.id}`}
                        className="rounded-md border border-gold/20 bg-gold/[0.06] px-2.5 py-1 text-[12px] text-parchment"
                      >
                        {p.name}
                      </Link>
                    ) : null,
                  )}
                </div>
                <button
                  type="button"
                  className="mt-2 text-[11px] text-text-dim hover:text-parchment"
                  onClick={() => {
                    writeLineageFavorites([]);
                    setFavorites([]);
                  }}
                >
                  {locale === 'fr' ? 'Effacer les favoris' : 'Clear favorites'}
                </button>
              </section>
            ) : null}

            <section className="mt-10 rounded-lg border border-chrome-border/60 bg-chrome-fill/15 p-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-muted">
                {locale === 'fr' ? 'Comment lire ceci' : 'How to read this'}
              </h2>
              <ul className="mt-2 space-y-2 text-[12px] leading-relaxed text-text-muted">
                {LINEAGE_EXPLORER_RULES.map((rule, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-gold/50">◆</span>
                    <span>{pickI18n(rule, locale)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] font-medium text-amber-400/90">
                {locale === 'fr' ? 'À éviter :' : 'Avoid implying:'}{' '}
                {LINEAGE_EXPLORER_FORBIDDEN.map((f) => pickI18n(f, locale)).join(' · ')}
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {locale === 'fr' ? 'Glossaire rapide' : 'Quick glossary'}
              </h2>
              <dl className="mt-2 space-y-2 text-[12px] text-text-muted">
                <div>
                  <dt className="font-medium text-parchment">Y-DNA / mtDNA</dt>
                  <dd className="mt-0.5">
                    {locale === 'fr'
                      ? 'Lignée paternelle (chr. Y) ou maternelle (ADN mitochondrial) uniquement.'
                      : 'Paternal (Y chromosome) or maternal (mitochondrial DNA) line only.'}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-parchment">SNP / Clade</dt>
                  <dd className="mt-0.5">
                    {locale === 'fr'
                      ? 'Marqueur génétique et branche sur l’arbre phylogénétique — les noms évoluent.'
                      : 'Genetic marker and branch on the phylogenetic tree — names change over time.'}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-parchment">MRCA</dt>
                  <dd className="mt-0.5">
                    {locale === 'fr'
                      ? 'Ancêtre commun le plus récent pour cette branche — souvent bien avant l’histoire écrite.'
                      : 'Most recent common ancestor for that branch — often long before written history.'}
                  </dd>
                </div>
              </dl>
            </section>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/lineage-explorer/compare"
                className="inline-flex items-center gap-2 rounded-lg border border-chrome-border px-3 py-2 text-[13px] text-parchment transition-colors hover:border-gold/30"
              >
                <Dna className="h-4 w-4 opacity-70" />
                {t('lineageExplorer.compareLink', locale)}
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-chrome-border px-3 py-2 text-[13px] text-text-muted transition-colors hover:border-gold/25 hover:text-parchment"
              >
                <MapIcon className="h-4 w-4 opacity-70" />
                {locale === 'fr' ? 'Carte' : 'Map'}
              </Link>
            </div>
          </div>
        </main>
      </div>
      <AtlasSubpageToolsMenu open={toolsOpen} onClose={() => setToolsOpen(false)} />
    </div>
  );
});

export default LineageExplorerHub;
