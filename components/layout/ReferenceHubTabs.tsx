'use client';

import { memo, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { atlasSubpageBackChipClass } from '@/components/layout/AtlasSubpageChromeHeader';
import { useLocale } from '@/hooks/use-atlas';
import { getReferenceHubTabDefs } from '@/lib/reference-hub-tabs';
import { t } from '@/lib/ui-strings';

const tabActive =
  'bg-chrome-fill-active text-parchment shadow-[inset_0_0_0_1px_rgba(196,169,98,0.25)]';
const tabInactive = 'text-text-muted hover:bg-chrome-fill-badge hover:text-parchment';

const tabLinkClass =
  'flex min-h-11 touch-manipulation items-center justify-center rounded-md text-center text-[length:var(--atlas-text-sm)] font-semibold uppercase tracking-wide transition-colors sm:text-[length:var(--atlas-text-base)]' +
  ' min-w-0 flex-1 px-2 py-2.5 md:min-h-10 md:flex-none md:snap-start md:shrink-0 md:px-3 md:py-1.5';

/**
 * Hub tabs; back-to-map on `md+` lives here, on smaller viewports in `AtlasSubpageChromeHeader`.
 * Below `md`, tabs are a full-width segmented row (no horizontal scroll). From `md`, back + hub links are centered as a group. Prefs/tools stay in the menu.
 */
const ReferenceHubTabs = memo(function ReferenceHubTabs() {
  const pathname = usePathname() ?? '';
  const locale = useLocale();

  const tabs = useMemo(() => getReferenceHubTabDefs(locale), [locale]);

  const backLabel = t('companion.back', locale);

  return (
    <nav
      aria-label={t('referenceHub.tabsAria', locale)}
      className="relative hidden w-full shrink-0 border-b border-chrome-border/60 md:block"
      style={{ background: 'var(--color-chrome-fill)' }}
    >
      <div className="mx-auto flex w-full max-w-6xl min-w-0 flex-col items-stretch gap-2 py-2 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:gap-3 sm:py-2.5 md:flex-row md:flex-nowrap md:items-center md:justify-center md:gap-2 md:overflow-x-auto md:overscroll-x-contain md:px-8 md:[scrollbar-width:thin]">
        <Link
          href="/"
          className={`${atlasSubpageBackChipClass} hidden max-w-[min(46vw,10.5rem)] shrink-0 touch-manipulation items-center justify-center max-sm:min-h-11 md:inline-flex md:max-w-none`}
          aria-label={backLabel}
        >
          <ArrowLeft className="h-3.5 w-3.5 shrink-0 opacity-80 sm:h-3.5 sm:w-3.5" strokeWidth={2.25} aria-hidden />
          <span className="min-w-0 truncate">{backLabel}</span>
        </Link>

        <div
          className="flex min-h-11 min-w-0 w-full justify-center gap-1.5 md:min-h-0 md:w-auto md:flex-none md:flex-nowrap md:justify-center"
          role="presentation"
        >
          {tabs.map((tab) => {
            const active = tab.match(pathname);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`${tabLinkClass} truncate ${active ? tabActive : tabInactive}`}
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
