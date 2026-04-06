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
import { CommandPaletteHeaderTrigger } from '@/components/command-palette/CommandPaletteHeaderTrigger';

/** Shared with `ReferenceHubTabs` back-to-map control */
export const atlasSubpageBackChipClass =
  'flex shrink-0 items-center gap-1.5 rounded-md border border-chrome-border bg-chrome-fill px-2 py-2 text-[10px] font-bold uppercase tracking-wide text-text-muted transition-colors duration-200 hover:border-gold/35 hover:bg-chrome-fill-active hover:text-parchment sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[11px]';

/** Icon-only back for narrow chrome rows (`md:hidden` in subpage header). */
export const atlasSubpageBackIconOnlyClass =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-chrome-border bg-chrome-fill text-text-muted transition-colors duration-200 hover:border-gold/35 hover:bg-chrome-fill-active hover:text-parchment touch-manipulation';

const chromeToolsRowClass =
  'flex shrink-0 items-center gap-1';

/**
 * Map-aligned header for /journal, /companion, /reference, etc.: Norman Atlas brand strip,
 * same inline tools as the map (text, theme, basemap, music, language), optional TOC toggle, then hamburger.
 * On viewports below `md`, back-to-map lives in this row (left); hub tabs are in `ReferenceHubTabs`.
 */
const AtlasSubpageChromeHeader = memo(function AtlasSubpageChromeHeader({
  onOpenToolsMenu,
  mobileToc,
  /** Omit the vertical rule after the brand (avoids a bar sitting flush after the tagline on md+). */
  hidePostBrandDivider = true,
}: {
  onOpenToolsMenu: () => void;
  hidePostBrandDivider?: boolean;
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
          className="flex min-w-0 items-center gap-2 py-1.5 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:gap-3 sm:px-5"
          style={{ background: 'var(--color-chrome-fill)' }}
        >
          <Link
            href="/"
            className={`${atlasSubpageBackIconOnlyClass} md:hidden`}
            aria-label={t('companion.back', locale)}
          >
            <ArrowLeft className="h-4 w-4 shrink-0 opacity-80" strokeWidth={2.25} aria-hidden />
          </Link>

          <ChromeIconTooltip
            label={t('credits.eyebrow', locale)}
            hint={t('header.tagline', locale)}
            wrapperClassName="inline-flex min-w-0 flex-1 md:shrink-0 md:flex-initial"
          >
            <Link
              href="/"
              className="flex min-w-0 max-w-full flex-col justify-center gap-0 py-0.5"
              aria-label={`${t('credits.eyebrow', locale)} — ${t('header.tagline', locale)}`}
            >
              <AtlasHeaderBrandLockup
                collapseSubtitleNarrow
                subtitle={t('header.tagline', locale)}
              />
            </Link>
          </ChromeIconTooltip>
          {!hidePostBrandDivider && (
            <div className="hidden h-8 w-px shrink-0 bg-chrome-divider md:block" aria-hidden />
          )}

          <div className="hidden min-w-0 flex-1 md:block" aria-hidden />

          <div className="hidden shrink-0 items-center gap-2.5 md:flex">
            <div className="hidden shrink-0 xl:flex">{chromePill}</div>
            <CommandPaletteHeaderTrigger />
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
              className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg text-text-dim transition-colors hover:bg-chrome-fill hover:text-text-muted md:hidden"
              aria-label={mobileToc.open ? mobileToc.closeLabel : mobileToc.openLabel}
            >
              {mobileToc.open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          )}

          <div className="flex shrink-0 items-center gap-1 md:hidden">
            <CommandPaletteHeaderTrigger size="mobileTouch" />
            <ChromeIconTooltip label={t('header.settingsMenu', locale)} hint={t('header.settingsMenu.hint', locale)}>
              <button
                type="button"
                onClick={onOpenToolsMenu}
                className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-md text-text-muted/70 transition-colors duration-200 hover:bg-chrome-fill hover:text-parchment"
                aria-label={t('header.settingsMenu', locale)}
              >
                <Menu className="h-[17px] w-[17px]" strokeWidth={1.5} aria-hidden />
              </button>
            </ChromeIconTooltip>
          </div>
        </div>
      </div>
    </header>
  );
});

export default AtlasSubpageChromeHeader;
