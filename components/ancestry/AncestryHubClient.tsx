'use client';

import Link from 'next/link';
import { memo, useState } from 'react';
import { MapPin } from 'lucide-react';

import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';

const AncestryHubClient = memo(function AncestryHubClient() {
  const locale = useLocale();
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
        <AtlasSubpageChromeHeader onOpenToolsMenu={() => setToolsOpen(true)} />
        <ReferenceHubTabs />
        <main
          id="ancestry-hub-main"
          className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin pb-[max(4rem,env(safe-area-inset-bottom)+2rem)] pt-8 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pb-20 md:pt-12"
        >
          <div className="mx-auto max-w-3xl">
            <header className="mb-8 text-center md:mb-10">
              <p
                className="mb-2 font-sans text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'var(--color-gold-muted)' }}
              >
                — {t('ancestry.navLabel', locale)} —
              </p>
              <h1
                className="font-display text-[clamp(1.35rem,3.5vw,2rem)] font-semibold uppercase tracking-[0.06em] text-[var(--color-gold)]"
                style={{
                  textShadow:
                    '0 1px 0 rgba(255,255,255,0.06), 0 -1px 0 rgba(0,0,0,0.4), 0 0 18px rgba(196,169,98,0.07)',
                }}
              >
                {t('ancestry.hubTitle', locale)}
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-[length:var(--atlas-text-md)] leading-relaxed text-[var(--color-text-muted)]">
                {t('ancestry.hubHint', locale)}
              </p>
            </header>

            <section className="mb-10 space-y-4 rounded-xl border border-chrome-border-strong/45 bg-chrome-fill/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/70">
                {t('deepOrigins.pageTitle', locale)}
              </h2>
              <p className="text-[13px] leading-relaxed text-text-muted">{t('deepOrigins.pageSubtitle', locale)}</p>
              <Link
                href="/ancestry/deep-origins"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gold/35 bg-gold/10 px-4 py-3 text-[13px] font-medium text-gold hover:border-gold/50 hover:bg-gold/15"
              >
                <MapPin className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                {t('ancestry.deepOriginsLink', locale)}
              </Link>
            </section>

            <section className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/?era=viking-age"
                className="inline-flex items-center justify-center rounded-lg border border-chrome-border-strong/40 bg-chrome-fill-raised/40 px-4 py-3 text-[13px] text-gold/90 hover:border-gold/35"
              >
                {t('ancestry.openMap', locale)}
              </Link>
              <Link
                href="/journal"
                className="inline-flex items-center justify-center rounded-lg border border-chrome-border/35 px-4 py-3 text-[13px] text-text-dim hover:border-chrome-border-strong/50 hover:text-gold/80"
              >
                {t('atlasJournal.tooltip.label', locale)}
              </Link>
            </section>
          </div>
        </main>
      </div>
      <AtlasSubpageToolsMenu open={toolsOpen} onClose={() => setToolsOpen(false)} />
    </div>
  );
});

export default AncestryHubClient;
