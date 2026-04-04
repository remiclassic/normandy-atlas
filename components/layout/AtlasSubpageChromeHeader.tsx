'use client';

import { memo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';
import TextSizeMenu from '@/components/ui/TextSizeMenu';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import BasemapSwitcher from '@/components/ui/BasemapSwitcher';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { BackgroundMusic } from '@/components/audio/BackgroundMusic';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { AtlasHeaderBrandLockup } from '@/components/layout/AtlasHeaderBrandLockup';

/** Shared with `ReferenceHubTabs` back-to-map control */
export const atlasSubpageBackChipClass =
  'flex shrink-0 items-center gap-1.5 rounded-md border border-chrome-border bg-chrome-fill px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-text-muted transition-colors duration-200 hover:border-gold/35 hover:bg-chrome-fill-active hover:text-parchment sm:gap-1.5 sm:px-2.5 sm:text-[11px]';

const chromeToolsRowClass =
  'flex shrink-0 items-center gap-1';

/**
 * Map-aligned header for /journal, /companion, /reference, etc.: Norman Atlas brand strip,
 * same inline tools as the map (text, theme, basemap, music, language), optional TOC toggle, then hamburger.
 * Page title and back-to-map live in the tab row (`ReferenceHubTabs`).
 */
const AtlasSubpageChromeHeader = memo(function AtlasSubpageChromeHeader({
  onOpenToolsMenu,
  mobileToc,
}: {
  onOpenToolsMenu: () => void;
  mobileToc?: {
    open: boolean;
    onToggle: () => void;
    openLabel: string;
    closeLabel: string;
  };
}) {
  const locale = useLocale();

  const chromePill = (
    <div className={chromeToolsRowClass} data-onboarding="theme">
      <ChromeIconTooltip label={t('textSize.tooltip.label', locale)} hint={t('textSize.tooltip.hint', locale)}>
        <TextSizeMenu />
      </ChromeIconTooltip>
      <div className="h-4 w-px shrink-0 bg-chrome-divider" aria-hidden />
      <ThemeSwitcher embedded />
      <div className="h-4 w-px shrink-0 bg-chrome-divider" aria-hidden />
      <BasemapSwitcher embedded />
      <div className="h-4 w-px shrink-0 bg-chrome-divider" aria-hidden />
      <BackgroundMusic floating={false} />
      <div className="h-4 w-px shrink-0 bg-chrome-divider" aria-hidden />
      <LanguageSwitcher />
    </div>
  );

  return (
    <header className="relative z-30 w-full shrink-0 border-b border-chrome-border bg-background/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="pointer-events-auto flex flex-col">
        <div
          className="flex min-w-0 items-center gap-2 px-4 py-1.5 sm:gap-3 sm:px-5"
          style={{ background: 'var(--color-chrome-fill)' }}
        >
          <ChromeIconTooltip
            label={t('credits.eyebrow', locale)}
            hint={t('header.tagline', locale)}
            wrapperClassName="hidden shrink-0 md:inline-flex"
          >
            <Link
              href="/"
              className="flex min-w-0 max-w-full flex-col gap-0"
              aria-label={`${t('credits.eyebrow', locale)} — ${t('header.tagline', locale)}`}
            >
              <AtlasHeaderBrandLockup subtitle={t('header.tagline', locale)} />
            </Link>
          </ChromeIconTooltip>
          <div className="hidden h-8 w-px shrink-0 bg-chrome-divider md:block" aria-hidden />

          <div className="min-w-0 flex-1" aria-hidden />

          <div className="hidden shrink-0 items-center gap-2.5 md:flex">
            {chromePill}
            <ChromeIconTooltip label={t('header.settingsMenu', locale)} hint={t('header.settingsMenu.hint', locale)}>
              <button
                type="button"
                onClick={onOpenToolsMenu}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-text-muted/70 transition-colors duration-200 hover:bg-chrome-fill hover:text-parchment"
                aria-label={t('header.settingsMenu', locale)}
              >
                <Menu className="h-[15px] w-[15px]" strokeWidth={1.5} aria-hidden />
              </button>
            </ChromeIconTooltip>
          </div>

          {mobileToc && (
            <button
              type="button"
              onClick={mobileToc.onToggle}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-dim transition-colors hover:bg-chrome-fill hover:text-text-muted md:hidden"
              aria-label={mobileToc.open ? mobileToc.closeLabel : mobileToc.openLabel}
            >
              {mobileToc.open ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}

          <ChromeIconTooltip
            label={t('header.settingsMenu', locale)}
            hint={t('header.settingsMenu.hint', locale)}
            wrapperClassName="md:hidden"
          >
            <button
              type="button"
              onClick={onOpenToolsMenu}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-text-muted/70 transition-colors duration-200 hover:bg-chrome-fill hover:text-parchment md:hidden"
              aria-label={t('header.settingsMenu', locale)}
            >
              <Menu className="h-[15px] w-[15px]" strokeWidth={1.5} aria-hidden />
            </button>
          </ChromeIconTooltip>
        </div>

        <div
          className="flex min-w-0 border-t border-chrome-border/40 px-3 py-2 md:hidden"
          style={{ background: 'var(--color-chrome-fill)' }}
        >
          <div className="flex w-full min-w-0 justify-center overflow-x-auto [-webkit-overflow-scrolling:touch]">
            <div className="inline-flex shrink-0">{chromePill}</div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default AtlasSubpageChromeHeader;
