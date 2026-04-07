'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Map } from 'lucide-react';

import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import GenealogySubnav, { genealogyHubSplitClassName } from '@/components/layout/GenealogySubnav';
import AtlasHubPageShell, {
  ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS,
} from '@/components/layout/AtlasHubPageShell';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import {
  isHaplogroupMajorLetter,
  isPhylogeographyMapFocusId,
  listPhylogeographyMapFocusIds,
  phylogeographyDatasetHasGeometry,
} from '@/core';
import type { HaplogroupMajorLetter, PhylogeographyMapFocusId } from '@/core/types';
import {
  FIRST_NORMAN_NORMANDY_PHYLO_LETTER,
  HAPLOGROUP_MAJOR_LETTERS,
  NORMAN_NORMANDY_PHYLO_LETTERS,
  getPhylogeographyLetterDataset,
} from '@/data/atlas/lineage/phylogeography';

const PhylogeographyMap = dynamic(() => import('@/components/lineage-explorer/PhylogeographyMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(56vh,520px)] min-h-[280px] items-center justify-center rounded-lg border border-chrome-border-strong/40 bg-chrome-fill/20 text-[13px] text-text-dim">
      Loading map…
    </div>
  ),
});

const MigrationMapPageClient = memo(function MigrationMapPageClient() {
  const locale = useLocale();
  const router = useRouter();
  const sp = useSearchParams();
  const rawLetter = sp.get('letter')?.trim().toUpperCase() ?? '';
  const letterFromUrl: HaplogroupMajorLetter = isHaplogroupMajorLetter(rawLetter) ? rawLetter : 'R';

  const rawFocus = sp.get('focus')?.trim() ?? '';
  /** Empty/missing `focus` defaults to Norman for Normandy; `focus=all` selects All branches. */
  const focus: PhylogeographyMapFocusId | null =
    rawFocus === 'all'
      ? null
      : rawFocus === '' || (isPhylogeographyMapFocusId(rawFocus) && rawFocus === 'norman-normandy')
        ? 'norman-normandy'
        : null;

  const letter = useMemo(() => {
    if (focus === 'norman-normandy' && !NORMAN_NORMANDY_PHYLO_LETTERS.has(letterFromUrl)) {
      return FIRST_NORMAN_NORMANDY_PHYLO_LETTER;
    }
    return letterFromUrl;
  }, [focus, letterFromUrl]);

  useEffect(() => {
    if (letterFromUrl === letter) return;
    const params = new URLSearchParams();
    params.set('letter', letter);
    if (focus === 'norman-normandy') {
      params.set('focus', 'norman-normandy');
    } else {
      params.set('focus', 'all');
    }
    router.replace(`/lineage-explorer/migration-map?${params}`, { scroll: false });
  }, [letter, letterFromUrl, focus, router]);

  const dataset = getPhylogeographyLetterDataset(letter);

  const hasMap = phylogeographyDatasetHasGeometry(dataset, focus);

  const normanMode = focus === 'norman-normandy';

  const selectLetter = useCallback(
    (L: HaplogroupMajorLetter) => {
      if (normanMode && !NORMAN_NORMANDY_PHYLO_LETTERS.has(L)) return;

      const params = new URLSearchParams();
      params.set('letter', L);
      if (normanMode) {
        params.set('focus', 'norman-normandy');
      } else if (isPhylogeographyMapFocusId(rawFocus) && rawFocus !== 'norman-normandy') {
        const nextDs = getPhylogeographyLetterDataset(L);
        if (listPhylogeographyMapFocusIds(nextDs).includes(rawFocus)) params.set('focus', rawFocus);
      } else {
        params.set('focus', 'all');
      }
      router.replace(`/lineage-explorer/migration-map?${params}`, { scroll: false });
    },
    [router, rawFocus, normanMode],
  );

  const setFocus = useCallback(
    (next: PhylogeographyMapFocusId | null) => {
      const params = new URLSearchParams();
      let L = letterFromUrl;
      if (next === 'norman-normandy' && !NORMAN_NORMANDY_PHYLO_LETTERS.has(L)) {
        L = FIRST_NORMAN_NORMANDY_PHYLO_LETTER;
      }
      params.set('letter', L);
      if (next === 'norman-normandy') {
        params.set('focus', 'norman-normandy');
      } else {
        params.set('focus', 'all');
      }
      router.replace(`/lineage-explorer/migration-map?${params}`, { scroll: false });
    },
    [router, letterFromUrl],
  );

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <AtlasHubPageShell>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
          <AtlasSubpageChromeHeader mobilePageTitle={t('lineageExplorer.migrationMapLink', locale)} />
          <ReferenceHubTabs />
          <div className={genealogyHubSplitClassName}>
            <GenealogySubnav />
            <main
              id="migration-map-main"
              className={`relative z-10 min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin pt-8 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pt-10 ${ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS}`}
            >
          <div className="mx-auto max-w-4xl">
            <Link
              href="/lineage-explorer"
              className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-text-dim hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {locale === 'fr' ? 'Retour à l’explorateur' : 'Back to Lineage Explorer'}
            </Link>

            <header className="mb-6 text-center md:mb-8">
              <p
                className="mb-2 font-sans text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'var(--color-gold-muted)' }}
              >
                — {t('lineageExplorer.navLabel', locale)} —
              </p>
              <h1
                className="font-display text-[clamp(1.35rem,3.5vw,2rem)] font-semibold uppercase tracking-[0.06em] text-[var(--color-gold)]"
                style={{
                  textShadow:
                    '0 1px 0 rgba(255,255,255,0.06), 0 -1px 0 rgba(0,0,0,0.4), 0 0 18px rgba(196,169,98,0.07)',
                }}
              >
                {t('lineageExplorer.migrationMapTitle', locale)}
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-[length:var(--atlas-text-md)] leading-relaxed text-[var(--color-text-muted)]">
                {t('lineageExplorer.migrationMapIntro', locale)}
              </p>
              {focus === 'norman-normandy' ? (
                <p className="mx-auto mt-3 max-w-2xl text-[length:var(--atlas-text-md)] leading-relaxed text-gold/90">
                  {t('lineageExplorer.migrationMapFocusNormanNormandyIntro', locale)}
                </p>
              ) : null}
            </header>

            <div className="mb-4 rounded-xl border border-chrome-border-strong/50 bg-chrome-fill/25 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {t('lineageExplorer.migrationMapPickerAria', locale)}
              </p>
              <div
                className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
                role="tablist"
                aria-label={t('lineageExplorer.migrationMapPickerAria', locale)}
              >
                {HAPLOGROUP_MAJOR_LETTERS.map((L) => {
                  const d = getPhylogeographyLetterDataset(L);
                  const curated = phylogeographyDatasetHasGeometry(d, focus);
                  const active = L === letter;
                  const disabled = normanMode && !NORMAN_NORMANDY_PHYLO_LETTERS.has(L);
                  const tabClasses = disabled
                    ? 'cursor-not-allowed border-chrome-border/20 bg-chrome-fill/10 text-text-dim/40 opacity-55'
                    : active
                      ? 'border-gold/60 bg-gold/15 text-gold'
                      : curated
                        ? 'border-chrome-border-strong/40 bg-chrome-fill-raised/50 text-parchment hover:border-gold/35'
                        : 'border-chrome-border/30 bg-chrome-fill/20 text-text-dim/70 hover:border-chrome-border-strong/50';
                  return (
                    <button
                      key={L}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      aria-disabled={disabled}
                      disabled={disabled}
                      tabIndex={active ? 0 : -1}
                      className={[
                        'min-h-[40px] min-w-[2.25rem] rounded-md border px-2 py-1.5 font-mono text-[13px] font-semibold transition-colors',
                        tabClasses,
                      ].join(' ')}
                      onClick={() => selectLetter(L)}
                      title={
                        disabled
                          ? t('lineageExplorer.migrationMapLetterEmptyNormanFocus', locale)
                          : curated
                            ? t('lineageExplorer.migrationMapLetterCurated', locale)
                            : normanMode
                              ? t('lineageExplorer.migrationMapLetterEmptyNormanFocus', locale)
                              : t('lineageExplorer.migrationMapLetterEmpty', locale)
                      }
                    >
                      {L}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim">
                {t('lineageExplorer.migrationMapFocusLabel', locale)}
              </span>
              <div
                className="inline-flex flex-wrap justify-center gap-1 rounded-lg border border-chrome-border-strong/40 bg-chrome-fill/20 p-1"
                role="group"
                aria-label={t('lineageExplorer.migrationMapFocusGroupAria', locale)}
              >
                <button
                  type="button"
                  className={[
                    'rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors',
                    focus == null
                      ? 'bg-gold/15 text-gold shadow-[inset_0_0_0_1px_rgba(196,169,98,0.35)]'
                      : 'text-text-dim hover:bg-chrome-fill-raised/60 hover:text-parchment',
                  ].join(' ')}
                  onClick={() => setFocus(null)}
                >
                  {t('lineageExplorer.migrationMapFocusAll', locale)}
                </button>
                <button
                  type="button"
                  className={[
                    'rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors',
                    focus === 'norman-normandy'
                      ? 'bg-gold/15 text-gold shadow-[inset_0_0_0_1px_rgba(196,169,98,0.35)]'
                      : 'text-text-dim hover:bg-chrome-fill-raised/60 hover:text-parchment',
                  ].join(' ')}
                  onClick={() => setFocus('norman-normandy')}
                  title={t('lineageExplorer.migrationMapFocusNormanNormandyHint', locale)}
                >
                  {t('lineageExplorer.migrationMapFocusNormanNormandy', locale)}
                </button>
              </div>
            </div>

            {hasMap ? (
              <PhylogeographyMap dataset={dataset} focus={focus} />
            ) : (
              <div className="flex h-[min(40vh,360px)] min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-chrome-border-strong/45 bg-chrome-fill/15 px-4 text-center">
                <Map className="h-8 w-8 text-text-dim/50" aria-hidden />
                <p className="max-w-md text-[14px] leading-relaxed text-text-dim">
                  {focus === 'norman-normandy'
                    ? t('lineageExplorer.migrationMapEmptyStateNormanFocus', locale)
                    : t('lineageExplorer.migrationMapEmptyState', locale)}
                </p>
              </div>
            )}

            <section className="mt-6 rounded-xl border border-chrome-border-strong/45 bg-chrome-fill/20 p-5 md:p-6">
              <h2 className="mb-2 font-display text-[15px] font-semibold uppercase tracking-[0.08em] text-[var(--color-gold)]">
                {pickI18n(dataset.title, locale)}
              </h2>
              <p className="text-[14px] leading-relaxed text-[var(--color-text-muted)]">
                {pickI18n(dataset.summary, locale)}
              </p>
              {dataset.sources.length > 0 ? (
                <div className="mt-4 border-t border-chrome-border/40 pt-4">
                  <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-dim">
                    {t('lineageExplorer.migrationMapSources', locale)}
                  </h3>
                  <ul className="space-y-1.5 text-[13px] text-text-dim">
                    {dataset.sources.map((s) => (
                      <li key={s.id}>
                        {s.url ? (
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-gold/85 underline decoration-gold/25 underline-offset-2 hover:text-gold"
                          >
                            {s.title}
                          </a>
                        ) : (
                          <span>{[s.title, s.note].filter(Boolean).join(' — ')}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>

            <p className="mt-6 text-center text-[12px] text-text-dim">
              <Link
                href="/journal#lineage-citations-policy"
                className="text-gold/80 underline decoration-gold/30 underline-offset-2 hover:text-gold"
              >
                {t('lineageExplorer.hubMethodologyLink', locale)}
              </Link>
            </p>
            </div>
            </main>
          </div>
        </div>
      </AtlasHubPageShell>
    </div>
  );
});

export default MigrationMapPageClient;
