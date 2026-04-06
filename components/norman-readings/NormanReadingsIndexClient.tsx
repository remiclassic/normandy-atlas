'use client';

import Link from 'next/link';
import { ArrowLeft, List, Share2 } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import NormanReadingsNavList from '@/components/norman-readings/NormanReadingsNavList';
import NormanReadingsBrowseDrawer from '@/components/norman-readings/NormanReadingsBrowseDrawer';
import NormanReadingsNewspaperFront from '@/components/norman-readings/NormanReadingsNewspaperFront';
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
            <div className="mx-auto max-w-5xl">
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

              <div className="mb-6 flex flex-col items-center gap-4 md:mb-8 md:flex-row md:justify-between">
                <p className="hidden text-center text-[length:var(--atlas-text-sm)] text-text-dim md:block md:text-left">
                  {locale === 'fr'
                    ? 'La colonne de gauche reprend toute la liste ; l’icône carte ouvre l’atlas sur le lieu ou l’ère lié.'
                    : 'The left column lists every title; the map icon opens the atlas on the linked place or era.'}
                </p>
                {!isMobile ? (
                  <button
                    type="button"
                    onClick={() => void shareHub()}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-chrome-border bg-chrome-fill-badge/40 px-4 py-2.5 text-[13px] text-text/85 transition-colors hover:border-gold/25 hover:bg-gold/[0.04]"
                  >
                    <Share2 className="h-4 w-4 shrink-0 text-gold/70" aria-hidden />
                    {shareHubLabel}
                  </button>
                ) : null}
              </div>

              <NormanReadingsNewspaperFront readings={readings} locale={locale} />
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
