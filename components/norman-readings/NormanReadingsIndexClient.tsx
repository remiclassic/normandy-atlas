'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, List, Share2 } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import NormanReadingsNavList from '@/components/norman-readings/NormanReadingsNavList';
import NormanReadingsBrowseDrawer from '@/components/norman-readings/NormanReadingsBrowseDrawer';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import type { NormanReadingEntry } from '@/lib/norman-readings/types';
import { useLocale } from '@/hooks/use-atlas';
import { useIsMobile } from '@/hooks/use-responsive';
import { t } from '@/lib/ui-strings';
import { shareOrCopy } from '@/lib/progress/share';

type Props = {
  readings: NormanReadingEntry[];
};

const NormanReadingsIndexClient = memo(function NormanReadingsIndexClient({ readings }: Props) {
  const locale = useLocale();
  const isMobile = useIsMobile();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const backLabel = locale === 'fr' ? 'Journal' : 'Journal';
  const hubTitle = locale === 'fr' ? 'Lectures normandes' : 'Norman readings';
  const hubLead =
    locale === 'fr'
      ? 'Essais longs sur les Normands : contexte historique lié à la carte quand c’est possible.'
      : 'Long-form essays on Norman history — map-linked where a site article exists.';
  const shareHubLabel = t('normanReadings.shareHub', locale);
  const browseLabel = t('normanReadings.browseArticles', locale);

  const shareHub = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    await shareOrCopy({ title: `${hubTitle} | Norman Atlas`, text: hubLead, url });
  }, [hubTitle, hubLead]);

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
        <AtlasSubpageChromeHeader onOpenToolsMenu={() => setToolsOpen(true)} />
        <ReferenceHubTabs />
        <div className="relative flex min-h-0 flex-1 flex-col md:flex-row">
          <aside
            className="hidden min-h-0 w-[min(288px,34vw)] shrink-0 flex-col border-chrome-border bg-chrome-fill/[0.05] md:flex md:border-r"
            aria-label={t('normanReadings.navAria', locale)}
          >
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin px-3 py-6">
              <p className="mb-3 px-2 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/70">
                {hubTitle}
              </p>
              <NormanReadingsNavList readings={readings} />
            </div>
          </aside>

          <main className="relative min-h-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin pb-[max(4rem,env(safe-area-inset-bottom)+2rem)] pt-8 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pb-20 md:pt-10">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/journal"
                className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-text-dim hover:text-gold"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {backLabel}
              </Link>

              {isMobile && (
                <div className="mb-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setBrowseOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-chrome-border bg-chrome-fill-badge/40 px-3 py-2 text-[12px] font-medium text-text-muted transition-colors hover:border-gold/25 hover:bg-gold/[0.04]"
                  >
                    <List className="h-3.5 w-3.5 shrink-0 text-gold/70" aria-hidden />
                    {browseLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => void shareHub()}
                    className="inline-flex items-center gap-2 rounded-lg border border-chrome-border bg-chrome-fill-badge/40 px-3 py-2 text-[12px] font-medium text-text-muted transition-colors hover:border-gold/25 hover:bg-gold/[0.04]"
                  >
                    <Share2 className="h-3.5 w-3.5 shrink-0 text-gold/70" aria-hidden />
                    {shareHubLabel}
                  </button>
                </div>
              )}

              <header className="mb-10 text-center">
                <p
                  className="mb-2 font-sans text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: 'var(--color-gold-muted)' }}
                >
                  — Reference —
                </p>
                <h1
                  className="font-display text-[clamp(1.35rem,3.5vw,2rem)] font-semibold uppercase tracking-[0.06em] text-[var(--color-gold)]"
                  style={{
                    textShadow:
                      '0 1px 0 rgba(255,255,255,0.06), 0 -1px 0 rgba(0,0,0,0.4), 0 0 18px rgba(196,169,98,0.07)',
                  }}
                >
                  {hubTitle}
                </h1>
                <p
                  className="mt-4 text-[length:var(--atlas-text-md)] leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {hubLead}
                </p>
                {!isMobile && (
                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => void shareHub()}
                      className="inline-flex items-center gap-2 rounded-lg border border-chrome-border bg-chrome-fill-badge/40 px-4 py-2.5 text-[13px] text-text/85 transition-colors hover:border-gold/25 hover:bg-gold/[0.04]"
                    >
                      <Share2 className="h-4 w-4 shrink-0 text-gold/70" aria-hidden />
                      {shareHubLabel}
                    </button>
                  </div>
                )}
                {!isMobile && (
                  <p className="mx-auto mt-6 max-w-md text-[length:var(--atlas-text-sm)] leading-relaxed text-text-dim">
                    {locale === 'fr'
                      ? 'Choisissez un titre dans la colonne de gauche. L’icône carte ouvre l’atlas sur le lieu (ou l’ère) correspondant.'
                      : 'Choose a title in the left column. The map icon opens the atlas on that place (or era) when linked.'}
                  </p>
                )}
              </header>

              {isMobile ? (
                <ul className="space-y-4">
                  {readings.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/norman-readings/${r.slug}`}
                        className="group flex gap-4 rounded-xl border border-chrome-border bg-chrome-fill-badge/30 p-5 transition-colors hover:border-gold/20 hover:bg-gold/[0.03]"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/15 bg-gold/[0.06] text-gold/80">
                          <BookOpen className="h-5 w-5" aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="font-display text-[length:var(--atlas-text-lg)] font-semibold text-parchment transition-colors group-hover:text-gold">
                            {r.title}
                          </h2>
                          <p
                            className="mt-1.5 text-[length:var(--atlas-text-sm)] leading-relaxed"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            {r.description}
                          </p>
                          {r.tags && r.tags.length > 0 && (
                            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/45">
                              {r.tags.join(' · ')}
                            </p>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </main>
        </div>
      </div>
      <AtlasSubpageToolsMenu open={toolsOpen} onClose={() => setToolsOpen(false)} />
      <NormanReadingsBrowseDrawer
        open={browseOpen}
        onClose={() => setBrowseOpen(false)}
        readings={readings}
      />
    </div>
  );
});

export default NormanReadingsIndexClient;
