'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { atlasSubpageBackChipClass } from '@/components/layout/AtlasSubpageChromeHeader';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { digitalGuidesTooltipLabel } from '@/lib/digital-guides-ui';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { t } from '@/lib/ui-strings';

const tabBtn =
  'shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[length:var(--atlas-text-sm)] font-semibold uppercase tracking-wide transition-colors sm:px-3 sm:text-[length:var(--atlas-text-base)]';

/**
 * Secondary nav: back to map (absolute left); tab cluster centered in the full bar (viewport center, aligned with content below).
 * No hub tab — /reference is reached from the map “Guides & reference” control only.
 */
const ReferenceHubTabs = memo(function ReferenceHubTabs() {
  const pathname = usePathname() ?? '';
  const locale = useLocale();
  const guidesPublic = isDigitalGuidesPublic();

  const tabs = useMemo(() => {
    const journal = {
      href: '/journal',
      label: t('atlasJournal.tooltip.label', locale),
      match: (p: string) => p === '/journal' || p.startsWith('/journal/'),
    };
    const companion = {
      href: '/companion',
      label: t('companion.title', locale),
      match: (p: string) => p === '/companion' || p.startsWith('/companion/'),
    };
    const guides = {
      href: '/guides',
      label: pickI18n(digitalGuidesTooltipLabel, locale),
      match: (p: string) => p === '/guides' || p.startsWith('/guides/'),
    };
    if (guidesPublic) {
      return [guides, journal, companion];
    }
    return [journal, companion];
  }, [guidesPublic, locale]);

  const backLabel = t('companion.back', locale);

  return (
    <nav
      aria-label={t('referenceHub.tabsAria', locale)}
      className="relative w-full shrink-0 border-b border-chrome-border/60 py-2 sm:py-2.5"
      style={{ background: 'var(--color-chrome-fill)' }}
    >
      <Link
        href="/"
        className={`${atlasSubpageBackChipClass} absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-4`}
        aria-label={backLabel}
      >
        <ArrowLeft className="h-3 w-3 shrink-0 opacity-80 sm:h-3.5 sm:w-3.5" strokeWidth={2.25} aria-hidden />
        <span className="max-w-[9rem] truncate sm:max-w-none">{backLabel}</span>
      </Link>
      <div className="mx-auto flex w-full max-w-6xl justify-center px-5 md:px-8">
        <div className="flex max-w-full flex-wrap items-center justify-center gap-1 sm:gap-1.5">
          {tabs.map((tab) => {
            const active = tab.match(pathname);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`${tabBtn} ${
                  active
                    ? 'bg-chrome-fill-active text-parchment shadow-[inset_0_0_0_1px_rgba(196,169,98,0.25)]'
                    : 'text-text-muted hover:bg-chrome-fill-badge hover:text-parchment'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
});

export default ReferenceHubTabs;
