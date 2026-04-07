'use client';

import Link from 'next/link';
import Image from 'next/image';
import { memo, useCallback, useMemo, type ReactNode } from 'react';
import { ArrowRight, Library } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import type { AtlasLocale } from '@/core/types';
import { pickI18n } from '@/lib/locale';
import {
  digitalGuidesTooltipHint,
  digitalGuidesTooltipLabel,
} from '@/lib/digital-guides-ui';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { GENEALOGY_HUB_PATH } from '@/lib/genealogy-paths';
import { publicAssetUrl } from '@/lib/public-asset-url';
import { useMapStore } from '@/lib/store';
import { t } from '@/lib/ui-strings';

type HubVisual =
  | 'guides'
  | 'readings'
  | 'companion'
  | 'journal'
  | 'genealogy';

type HubCardDef = {
  key: string;
  visual: HubVisual;
  href: string;
  title: string;
  description: string;
  disabled?: boolean;
  onNavigate?: () => void;
};

const hubCardImageSrc: Record<HubVisual, string> = {
  guides: publicAssetUrl('/reference-hub/reference-hub-guides.png'),
  readings: publicAssetUrl('/reference-hub/reference-hub-norman-readings.png'),
  companion: publicAssetUrl('/reference-hub/reference-hub-companion.png'),
  journal: publicAssetUrl('/reference-hub/reference-hub-journal.png'),
  genealogy: publicAssetUrl('/reference-hub/reference-hub-genealogy.png'),
};

const imageVisualSurface: Record<HubVisual, { cornerGlow: string }> = {
  guides: { cornerGlow: 'from-emerald-500/14 to-transparent' },
  readings: { cornerGlow: 'from-amber-500/14 to-transparent' },
  companion: { cornerGlow: 'from-amber-500/12 to-transparent' },
  journal: { cornerGlow: 'from-indigo-500/15 to-transparent' },
  genealogy: { cornerGlow: 'from-violet-500/14 to-transparent' },
};

const frameClass =
  'group relative flex h-full min-h-[20rem] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-chrome-border-strong/90 bg-[var(--color-surface)] shadow-[var(--shadow-panel)] transition-[border-color,box-shadow] duration-300 md:min-h-0 hover:border-gold/35 hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background';

type ReferenceHubCardLiProps = {
  card: HubCardDef;
  locale: AtlasLocale;
  priorityImageKeys: ReadonlySet<string>;
};

const ReferenceHubCardLi = memo(function ReferenceHubCardLi({
  card,
  locale,
  priorityImageKeys,
}: ReferenceHubCardLiProps) {
  const bodyFooter = (
    <div className="relative flex min-h-0 min-w-0 flex-1 flex-col gap-3 border-t border-chrome-border bg-[var(--color-background)] px-4 py-4 sm:gap-3.5 sm:px-5 sm:py-5">
      <h2 className="font-display text-[length:var(--atlas-text-lg)] font-semibold uppercase leading-snug tracking-[0.05em] text-[var(--color-gold)] sm:text-[length:var(--atlas-text-xl)] md:text-[length:var(--atlas-text-2xl)]">
        {card.title}
      </h2>
      <div className="flex min-h-[6.5rem] flex-1 flex-col sm:min-h-[7.25rem]">
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
  );

  const v = imageVisualSurface[card.visual];
  const imgSrc = hubCardImageSrc[card.visual];
  const usePriority = priorityImageKeys.has(card.key);

  const topBlock: ReactNode = (
    <>
      <div
        className={`pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${v.cornerGlow} blur-3xl`}
        aria-hidden
      />
      <div
        className={`relative aspect-[3/3.5] w-full shrink-0 overflow-hidden border-b border-chrome-border-strong/50 ${card.disabled ? 'grayscale-[0.45] saturate-[0.65]' : ''}`}
      >
        <div
          className="absolute inset-0 motion-safe:origin-[50%_58%] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.045]"
          aria-hidden
        >
          <Image
            src={imgSrc}
            alt=""
            fill
            priority={usePriority && !card.disabled}
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
    </>
  );

  const inner = (
    <>
      {topBlock}
      {bodyFooter}
    </>
  );

  if (card.disabled) {
    return (
      <li className="flex h-full min-h-[20rem] md:min-h-0">
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
    <li className="flex h-full min-h-[20rem] md:min-h-0">
      <Link
        href={card.href}
        onClick={card.onNavigate}
        className={frameClass}
      >
        {inner}
      </Link>
    </li>
  );
});

const ReferenceHubCards = memo(function ReferenceHubCards() {
  const locale = useLocale();
  const guidesPublic = isDigitalGuidesPublic();

  const onJournalNavigate = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
  }, []);

  const { shelfRead, shelfWorkspace, priorityImageKeys } = useMemo(() => {
    const guides: HubCardDef = {
      key: 'guides',
      visual: 'guides',
      href: '/guides',
      title: pickI18n(digitalGuidesTooltipLabel, locale),
      description: guidesPublic
        ? pickI18n(digitalGuidesTooltipHint, locale)
        : t('referenceHub.digitalGuidesLockedHint', locale),
      disabled: !guidesPublic,
    };
    const readings: HubCardDef = {
      key: 'readings',
      visual: 'readings',
      href: '/norman-readings',
      title: t('toolsMenu.normanReadingsLabel', locale),
      description: t('toolsMenu.normanReadingsHint', locale),
    };
    const companion: HubCardDef = {
      key: 'companion',
      visual: 'companion',
      href: '/companion',
      title: t('companion.title', locale),
      description: t('companion.tooltip', locale),
    };
    const journal: HubCardDef = {
      key: 'journal',
      visual: 'journal',
      href: '/journal',
      title: t('atlasJournal.tooltip.label', locale),
      description: t('atlasJournal.tooltip.hint', locale),
      onNavigate: onJournalNavigate,
    };
    const genealogy: HubCardDef = {
      key: 'genealogy',
      visual: 'genealogy',
      href: GENEALOGY_HUB_PATH,
      title: t('genealogy.navLabel', locale),
      description: t('referenceHub.cardGenealogyHint', locale),
    };

    const shelfReadCards: HubCardDef[] = [guides, readings, companion];
    const shelfWorkspaceCards: HubCardDef[] = [journal, genealogy];

    const priorityImageKeys = new Set<string>();
    for (const c of [...shelfReadCards, ...shelfWorkspaceCards]) {
      if (!c.disabled && priorityImageKeys.size < 2) {
        priorityImageKeys.add(c.key);
      }
    }
    return {
      shelfRead: shelfReadCards,
      shelfWorkspace: shelfWorkspaceCards,
      priorityImageKeys,
    };
  }, [guidesPublic, locale, onJournalNavigate]);

  return (
    <section
      className="w-full"
      aria-label={t('referenceHub.cardsNavAria', locale)}
    >
      <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
        <div className="mb-5 flex justify-center md:mb-6">
          <div
            className="rounded-full border border-gold/25 bg-chrome-fill/35 p-3.5 text-gold/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            aria-hidden
          >
            <Library className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.35} />
          </div>
        </div>
        <p
          className="mb-2 font-sans text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-[0.28em] sm:text-[length:var(--atlas-text-sm)]"
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
        <p
          className="mx-auto max-w-2xl text-[length:var(--atlas-text-md)] leading-relaxed sm:text-[length:var(--atlas-text-lg)]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {t('referenceHub.intro', locale)}
        </p>
      </header>

      <div className="mx-auto max-w-6xl space-y-12 md:space-y-14">
        <div>
          <div className="mb-5 flex items-center gap-3 md:mb-6">
            <span
              className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold-muted)] sm:text-[length:var(--atlas-text-xs)]"
              id="reference-hub-shelf-read"
            >
              {t('referenceHub.shelfReadTitle', locale)}
            </span>
            <span
              className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-chrome-border-strong/55 to-transparent"
              aria-hidden
            />
          </div>
          <ul
            className="grid list-none grid-cols-1 gap-5 p-0 sm:gap-6 md:grid-cols-2 md:gap-5 xl:grid-cols-3"
            aria-labelledby="reference-hub-shelf-read"
          >
            {shelfRead.map((card) => (
              <ReferenceHubCardLi
                key={card.key}
                card={card}
                locale={locale}
                priorityImageKeys={priorityImageKeys}
              />
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3 md:mb-6">
            <span
              className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-gold-muted)] sm:text-[length:var(--atlas-text-xs)]"
              id="reference-hub-shelf-workspace"
            >
              {t('referenceHub.shelfWorkspaceTitle', locale)}
            </span>
            <span
              className="h-px min-w-[2rem] flex-1 bg-gradient-to-r from-chrome-border-strong/55 to-transparent"
              aria-hidden
            />
          </div>
          <ul
            className="grid list-none grid-cols-1 gap-5 p-0 sm:gap-6 md:grid-cols-2 md:gap-5"
            aria-labelledby="reference-hub-shelf-workspace"
          >
            {shelfWorkspace.map((card) => (
              <ReferenceHubCardLi
                key={card.key}
                card={card}
                locale={locale}
                priorityImageKeys={priorityImageKeys}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default ReferenceHubCards;
