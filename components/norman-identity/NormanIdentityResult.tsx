'use client';

import { memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { AtlasLocale } from '@/core/types';
import type { IdentityResult } from '@/lib/norman-identity-engine';
import { NORMAN_IDENTITY_MAP_BEATS } from '@/lib/norman-identity-story-beats';
import { clearNormanIdentityStorySession, writeNormanIdentityStoryPayload } from '@/lib/norman-identity-session';
import { t } from '@/lib/ui-strings';
import { normanArchetypeKey, normanLayerBlurbKey, normanLayerTitleKey } from './layer-ui';

function strengthBarClass(strength: 'low' | 'medium' | 'high'): string {
  switch (strength) {
    case 'high':
      return 'w-full max-w-[100%] opacity-100 shadow-[0_0_20px_rgba(0,211,243,0.22)]';
    case 'medium':
      return 'w-[72%] opacity-85';
    default:
      return 'w-[44%] opacity-55';
  }
}

export type NormanIdentityResultProps = {
  locale: AtlasLocale;
  result: IdentityResult;
  storyParagraphs: string[];
  onRestart: () => void;
};

const NormanIdentityResult = memo(function NormanIdentityResult({
  locale,
  result,
  storyParagraphs,
  onRestart,
}: NormanIdentityResultProps) {
  const router = useRouter();

  const playStory = useCallback(() => {
    clearNormanIdentityStorySession();
    writeNormanIdentityStoryPayload({ version: 1, paragraphs: storyParagraphs });
    router.push('/?identityStory=1');
  }, [router, storyParagraphs]);

  const archetypeKey = normanArchetypeKey(result.archetypeId);

  return (
    <div className="space-y-8">
      <div className="rounded-none border border-chrome-border-strong/50 bg-chrome-fill/25 p-6 shadow-[inset_0_0_0_1px_rgba(0,211,243,0.1)]">
        <p className="font-display text-[clamp(1.05rem,2.8vw,1.35rem)] font-semibold uppercase leading-snug tracking-[0.05em] text-parchment">
          {t('normanIdentity.result.headline', locale)}
        </p>
        <p className="mt-4 text-[length:var(--atlas-text-xs)] leading-relaxed text-text-dim">
          {t('normanIdentity.meta.disclaimer', locale)}
        </p>
      </div>

      <div className="rounded-none border border-chrome-border-strong/45 bg-chrome-fill/20 px-5 py-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/85">{t('normanIdentity.result.layersTitle', locale)}</p>
        <p className="mt-2 font-display text-sm font-semibold text-[var(--color-gold)]">{t(archetypeKey, locale)}</p>
      </div>

      <div className="space-y-4">
        {result.layers.map((layer) => (
          <div
            key={layer.name}
            className="rounded-none border border-chrome-border-strong/40 bg-chrome-fill/15 px-4 py-3"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-[length:var(--atlas-text-sm)] font-semibold text-parchment">
                {t(normanLayerTitleKey(layer.name), locale)}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-cyan-300/70">{layer.strength}</span>
            </div>
            <div className="mb-2 h-1.5 w-full bg-chrome-border-strong/35">
              <div
                className={`h-1.5 bg-gradient-to-r from-cyan-400/35 to-cyan-300/90 transition-all ${strengthBarClass(layer.strength)}`}
              />
            </div>
            <p className="text-[length:var(--atlas-text-xs)] leading-relaxed text-text-dim">
              {t(normanLayerBlurbKey(layer.name), locale)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={playStory}
          className="rounded-none border border-cyan-400/40 bg-cyan-400/12 px-5 py-3 text-[length:var(--atlas-text-sm)] font-semibold text-cyan-100 transition-colors hover:bg-cyan-400/18"
        >
          {t('normanIdentity.cta.playStory', locale)}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-none border border-chrome-border-strong/60 bg-chrome-fill/20 px-5 py-3 text-[length:var(--atlas-text-sm)] font-semibold text-text-muted transition-colors hover:border-gold/30 hover:text-parchment"
        >
          {t('normanIdentity.nav.restart', locale)}
        </button>
      </div>

      {/* Narrative preview (same order as map beats) */}
      <section aria-label={t('normanIdentity.cta.playStory', locale)} className="rounded-none border border-chrome-border-strong/35 bg-background/40 p-4">
        <ol className="list-decimal space-y-2 pl-4 text-[length:var(--atlas-text-xs)] leading-relaxed text-text-muted">
          {NORMAN_IDENTITY_MAP_BEATS.map((beat, i) => (
            <li key={beat.storyKey}>{storyParagraphs[i] ?? '—'}</li>
          ))}
        </ol>
      </section>
    </div>
  );
});

export default NormanIdentityResult;
