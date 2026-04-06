'use client';

import Link from 'next/link';
import { ArrowLeft, List, Map, Share2 } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import NormanReadingsNavList from '@/components/norman-readings/NormanReadingsNavList';
import NormanReadingsBrowseDrawer from '@/components/norman-readings/NormanReadingsBrowseDrawer';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { CompanionMarkdown } from '@/lib/companion-markdown';
import type { NormanReadingEntry } from '@/lib/norman-readings/types';
import { useLocale } from '@/hooks/use-atlas';
import { useIsMobile } from '@/hooks/use-responsive';
import { t } from '@/lib/ui-strings';
import { shareOrCopy } from '@/lib/progress/share';

import '@/app/companion/companion-tactical.css';

type Props = {
  title: string;
  description: string;
  body: string;
  mapHref: string | null;
  allReadings: NormanReadingEntry[];
  currentSlug: string;
};

const NormanReadingArticleClient = memo(function NormanReadingArticleClient({
  title,
  description,
  body,
  mapHref,
  allReadings,
  currentSlug,
}: Props) {
  const locale = useLocale();
  const isMobile = useIsMobile();
  const [toolsOpen, setToolsOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);
  const backLabel = locale === 'fr' ? 'Lectures normandes' : 'Norman readings';
  const mapLabel = locale === 'fr' ? 'Ouvrir sur la carte' : 'Open on map';
  const shareLabel = t('normanReadings.shareArticle', locale);
  const browseLabel = t('normanReadings.browseArticles', locale);

  const shareArticle = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    await shareOrCopy({ title: `${title} | Norman Atlas`, text: description, url });
  }, [title, description]);

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
              <NormanReadingsNavList readings={allReadings} activeSlug={currentSlug} />
            </div>
          </aside>

          <main
            id="norman-reading-article"
            className="relative min-h-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin pb-[max(4rem,env(safe-area-inset-bottom)+2rem)] pt-8 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pb-20 md:pt-10"
          >
            <div className="mx-auto max-w-3xl">
              <Link
                href="/norman-readings"
                className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-text-dim hover:text-gold"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {backLabel}
              </Link>

              {isMobile && (
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => setBrowseOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-chrome-border bg-chrome-fill-badge/40 px-3 py-2 text-[12px] font-medium text-text-muted transition-colors hover:border-gold/25 hover:bg-gold/[0.04]"
                  >
                    <List className="h-3.5 w-3.5 shrink-0 text-gold/70" aria-hidden />
                    {browseLabel}
                  </button>
                </div>
              )}

              <header className="mb-8 text-center md:mb-10">
                <p
                  className="mb-2 font-sans text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-[0.28em]"
                  style={{ color: 'var(--color-gold-muted)' }}
                >
                  — Norman readings —
                </p>
                <h1
                  className="font-display text-[clamp(1.35rem,3.5vw,2rem)] font-semibold uppercase tracking-[0.06em] text-[var(--color-gold)]"
                  style={{
                    textShadow:
                      '0 1px 0 rgba(255,255,255,0.06), 0 -1px 0 rgba(0,0,0,0.4), 0 0 18px rgba(196,169,98,0.07)',
                  }}
                >
                  {title}
                </h1>
                <p
                  className="mt-4 text-[length:var(--atlas-text-md)] leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {description}
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => void shareArticle()}
                    className="inline-flex items-center gap-2 rounded-lg border border-chrome-border bg-chrome-fill-badge/40 px-4 py-2.5 text-[13px] text-text/85 transition-colors hover:border-gold/25 hover:bg-gold/[0.04]"
                  >
                    <Share2 className="h-4 w-4 shrink-0 text-gold/70" aria-hidden />
                    {shareLabel}
                  </button>
                  {mapHref ? (
                    <Link
                      href={mapHref}
                      className="inline-flex items-center gap-2 rounded-lg border border-chrome-border bg-chrome-fill-badge/40 px-4 py-2.5 text-[13px] text-text/85 transition-colors hover:border-gold/25 hover:bg-gold/[0.04]"
                    >
                      <Map className="h-4 w-4 shrink-0 text-gold/70" aria-hidden />
                      {mapLabel}
                    </Link>
                  ) : null}
                </div>
              </header>

              <CompanionMarkdown source={body} />
            </div>
          </main>
        </div>
      </div>
      <AtlasSubpageToolsMenu open={toolsOpen} onClose={() => setToolsOpen(false)} />
      <NormanReadingsBrowseDrawer
        open={browseOpen}
        onClose={() => setBrowseOpen(false)}
        readings={allReadings}
        activeSlug={currentSlug}
      />
    </div>
  );
});

export default NormanReadingArticleClient;
