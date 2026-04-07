'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { memo } from 'react';

import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import GenealogySubnav, { genealogyHubSplitClassName } from '@/components/layout/GenealogySubnav';
import AtlasHubPageShell, {
  ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS,
} from '@/components/layout/AtlasHubPageShell';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { CompanionMarkdown } from '@/lib/companion-markdown';
import { getNormanYdnaArticleMarkdown } from '@/lib/lineage-articles/norman-y-dna';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

import '@/app/companion/companion-tactical.css';

const NormanYdnaArticlePageClient = memo(function NormanYdnaArticlePageClient() {
  const locale = useLocale();
  const body = getNormanYdnaArticleMarkdown(locale);

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <AtlasHubPageShell>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
          <AtlasSubpageChromeHeader mobilePageTitle={t('genealogy.subnav.normanYdna', locale)} />
          <ReferenceHubTabs />
          <div className={genealogyHubSplitClassName}>
            <GenealogySubnav />
            <main
              id="norman-y-dna-article"
              className={`relative z-10 min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin pt-8 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pt-10 ${ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS}`}
            >
          <div className="mx-auto max-w-3xl">
            <Link
              href="/lineage-explorer"
              className="mb-5 inline-flex items-center gap-1.5 text-[12px] text-text-dim hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t('lineageExplorer.normanYdnaBackLink', locale)}
            </Link>

            <header className="mb-8 text-center md:mb-10">
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
                {t('lineageExplorer.normanYdnaPageTitle', locale)}
              </h1>
            </header>

            <CompanionMarkdown source={body} />
            </div>
            </main>
          </div>
        </div>
      </AtlasHubPageShell>
    </div>
  );
});

export default NormanYdnaArticlePageClient;
