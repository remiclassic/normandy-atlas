'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import {
  digitalGuidesTooltipHint,
  digitalGuidesTooltipLabel,
} from '@/lib/digital-guides-ui';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { publicAssetUrl } from '@/lib/public-asset-url';
import { useMapStore } from '@/lib/store';
import { t } from '@/lib/ui-strings';

type CardVisual = 'journal' | 'companion' | 'guides';

const hubCardImageSrc: Record<CardVisual, string> = {
  journal: publicAssetUrl('/reference-hub/reference-hub-journal.png'),
  companion: publicAssetUrl('/reference-hub/reference-hub-companion.png'),
  guides: publicAssetUrl('/reference-hub/reference-hub-guides.png'),
};

const visualSurface: Record<CardVisual, { cornerGlow: string }> = {
  journal: { cornerGlow: 'from-indigo-500/15 to-transparent' },
  companion: { cornerGlow: 'from-amber-500/12 to-transparent' },
  guides: { cornerGlow: 'from-emerald-500/14 to-transparent' },
};

const ReferenceHubCards = memo(function ReferenceHubCards() {
  const locale = useLocale();
  const guidesPublic = isDigitalGuidesPublic();

  const onJournalNavigate = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
  }, []);

  const cards = [
    {
      key: 'guides',
      href: '/guides',
      visual: 'guides' as const,
      title: pickI18n(digitalGuidesTooltipLabel, locale),
      description: guidesPublic
        ? pickI18n(digitalGuidesTooltipHint, locale)
        : t('referenceHub.digitalGuidesLockedHint', locale),
      disabled: !guidesPublic,
      onNavigate: undefined as (() => void) | undefined,
    },
    {
      key: 'journal',
      href: '/journal',
      visual: 'journal' as const,
      title: t('atlasJournal.tooltip.label', locale),
      description: t('atlasJournal.tooltip.hint', locale),
      disabled: false,
      onNavigate: onJournalNavigate,
    },
    {
      key: 'companion',
      href: '/companion',
      visual: 'companion' as const,
      title: t('companion.title', locale),
      description: t('companion.tooltip', locale),
      disabled: false,
      onNavigate: undefined as (() => void) | undefined,
    },
  ];

  return (
    <section
      className="w-full"
      aria-label={t('referenceHub.cardsNavAria', locale)}
    >
      <header className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
        <p
          className="mb-3 font-sans text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-[0.28em] sm:text-[length:var(--atlas-text-sm)]"
          style={{ color: 'var(--color-gold-muted)' }}
        >
          — {t('referenceHub.heroEyebrow', locale)} —
        </p>
        <h1
          className="mb-5 font-display text-[clamp(1.65rem,4.8vw,2.85rem)] font-semibold uppercase leading-tight tracking-[0.07em] text-[var(--color-gold)] sm:mb-6"
          style={{
            textShadow:
              '0 1px 0 rgba(255,255,255,0.07), 0 -1px 0 rgba(0,0,0,0.42), 0 0 20px rgba(196,169,98,0.08)',
          }}
        >
          {t('referenceHub.heroTitle', locale)}
        </h1>
        <div className="mx-auto max-w-xl space-y-2">
          <p
            className="text-[length:var(--atlas-text-md)] leading-relaxed sm:text-[length:var(--atlas-text-lg)]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t('referenceHub.heroTagline1', locale)}
          </p>
          <p
            className="text-[length:var(--atlas-text-md)] leading-relaxed sm:text-[length:var(--atlas-text-lg)]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t('referenceHub.heroTagline2', locale)}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl rounded-xl border border-chrome-border-strong/50 bg-chrome-fill/25 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-5 md:p-6">
        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:gap-6 md:grid-cols-3 md:items-stretch md:gap-5">
        {cards.map((card, index) => {
          const v = visualSurface[card.visual];
          const imgSrc = hubCardImageSrc[card.visual];

          const inner = (
            <>
              <div
                className={`pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${v.cornerGlow} blur-3xl`}
                aria-hidden
              />
              <div
                className={`relative aspect-[3/3.75] w-full shrink-0 overflow-hidden border-b border-chrome-border-strong/50 ${card.disabled ? 'grayscale-[0.45] saturate-[0.65]' : ''}`}
              >
                <div
                  className="absolute inset-0 motion-safe:origin-[50%_58%] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.045]"
                  aria-hidden
                >
                  <Image
                    src={imgSrc}
                    alt=""
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-chrome-fill/90 to-transparent"
                  aria-hidden
                />
              </div>
              <div className="relative flex min-h-0 min-w-0 flex-1 flex-col gap-3.5 border-t border-chrome-border bg-[var(--color-background)] px-4 py-4 sm:px-5 sm:py-5">
                <h2 className="font-display text-[length:var(--atlas-text-xl)] font-semibold uppercase leading-snug tracking-[0.05em] text-[var(--color-gold)] sm:text-[length:var(--atlas-text-2xl)]">
                  {card.title}
                </h2>
                <div className="flex min-h-[7.25rem] flex-1 flex-col sm:min-h-[8rem]">
                  <p
                    className="text-[length:var(--atlas-text-md)] font-medium leading-relaxed sm:text-[length:var(--atlas-text-lg)]"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {card.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 pt-1 text-[length:var(--atlas-text-sm)] font-bold uppercase tracking-wide text-gold/90 sm:text-[length:var(--atlas-text-base)]">
                  {card.disabled ? (
                    <span>{t('referenceHub.cardLockedCta', locale)}</span>
                  ) : (
                    <>
                      <span>{t('referenceHub.cardOpenCta', locale)}</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </>
                  )}
                </div>
              </div>
            </>
          );

          const frameClass = `group relative flex h-full min-h-[22rem] w-full min-w-0 flex-col overflow-hidden rounded-lg border border-chrome-border-strong bg-[var(--color-surface)] shadow-[var(--shadow-panel)] transition-[border-color,box-shadow] duration-300 md:min-h-0 hover:border-gold/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background`;

          if (card.disabled) {
            return (
              <li key={card.key} className="flex h-full min-h-[22rem] md:min-h-0">
                <div
                  className={`${frameClass} cursor-not-allowed opacity-[0.72] hover:border-chrome-border-strong hover:shadow-[var(--shadow-panel)]`}
                  aria-disabled="true"
                >
                  {inner}
                </div>
              </li>
            );
          }

          return (
            <li key={card.key} className="flex h-full min-h-[22rem] md:min-h-0">
              <Link
                href={card.href}
                onClick={card.onNavigate}
                className={frameClass}
              >
                {inner}
              </Link>
            </li>
          );
        })}
        </ul>
      </div>
    </section>
  );
});

export default ReferenceHubCards;
