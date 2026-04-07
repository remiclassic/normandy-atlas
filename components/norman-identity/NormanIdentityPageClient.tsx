'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import AtlasHubPageShell, {
  ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS,
} from '@/components/layout/AtlasHubPageShell';
import GenealogySubnav, { genealogyHubSplitClassName } from '@/components/layout/GenealogySubnav';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import {
  computeNormanIdentity,
  type IdentityResult,
  type NormanIdentityInput,
} from '@/lib/norman-identity-engine';
import { NORMAN_IDENTITY_MAP_BEATS, uiKeyForStoryBeat } from '@/lib/norman-identity-story-beats';
import { t } from '@/lib/ui-strings';
import NormanIdentityResult from './NormanIdentityResult';
import NormanIdentityWizard from './NormanIdentityWizard';

const NormanIdentityPageClient = memo(function NormanIdentityPageClient() {
  const locale = useLocale();
  const [submitted, setSubmitted] = useState<NormanIdentityInput | null>(null);

  const result = useMemo((): IdentityResult | null => {
    if (!submitted) return null;
    return computeNormanIdentity(submitted);
  }, [submitted]);

  const storyParagraphs = useMemo(() => {
    if (!result) return [];
    return NORMAN_IDENTITY_MAP_BEATS.map((beat) => t(uiKeyForStoryBeat(beat.storyKey), locale));
  }, [result, locale]);

  const onComplete = useCallback((input: NormanIdentityInput) => {
    setSubmitted(input);
  }, []);

  const onRestart = useCallback(() => setSubmitted(null), []);

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <AtlasHubPageShell>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
          <AtlasSubpageChromeHeader mobilePageTitle={t('normanIdentity.pageTitle', locale)} />
          <ReferenceHubTabs />
          <div className={genealogyHubSplitClassName}>
            <GenealogySubnav />
            <main
              id="norman-identity-main"
              className={`relative z-10 min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin pt-8 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pt-12 ${ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS}`}
            >
          <div
            className="mx-auto max-w-3xl"
            style={{ '--norman-identity-accent': '#00D3F3' } as React.CSSProperties}
          >
            <header className="mb-8 text-center md:mb-10">
              <p
                className="mb-2 font-sans text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'var(--color-gold-muted)' }}
              >
                — {t('normanIdentity.pageTitle', locale)} —
              </p>
              <h1
                className="font-display text-[clamp(1.35rem,3.5vw,2rem)] font-semibold uppercase tracking-[0.06em] text-[var(--color-gold)]"
                style={{
                  textShadow:
                    '0 1px 0 rgba(255,255,255,0.06), 0 -1px 0 rgba(0,0,0,0.4), 0 0 18px rgba(196,169,98,0.07)',
                }}
              >
                {t('normanIdentity.pageTitle', locale)}
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-[length:var(--atlas-text-md)] leading-relaxed text-[var(--color-text-muted)]">
                {t('normanIdentity.pageSubtitle', locale)}
              </p>
            </header>

            {!result && (
              <NormanIdentityWizard
                locale={locale}
                onComplete={onComplete}
                accentStyle={{ ['--norman-identity-accent' as string]: '#00D3F3' }}
              />
            )}
            {result && (
              <NormanIdentityResult
                locale={locale}
                result={result}
                storyParagraphs={storyParagraphs}
                onRestart={onRestart}
              />
            )}
            </div>
            </main>
          </div>
        </div>
      </AtlasHubPageShell>
    </div>
  );
});

export default NormanIdentityPageClient;
