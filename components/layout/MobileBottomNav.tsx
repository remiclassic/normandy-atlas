'use client';

import Link from 'next/link';
import { memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/hooks/use-atlas';
import { getMobileBottomTabDefs } from '@/lib/mobile-bottom-nav';
import { t } from '@/lib/ui-strings';
import { useHubMobileChrome } from '@/components/layout/HubMobileChromeContext';

const MobileBottomNav = memo(function MobileBottomNav() {
  const pathname = usePathname() ?? '';
  const locale = useLocale();
  const hubMobile = useHubMobileChrome();

  const tabs = useMemo(() => getMobileBottomTabDefs(), []);

  return (
    <nav
      aria-label={t('mobileNav.bottomAria', locale)}
      className="fixed inset-x-0 bottom-0 z-[40] border-t border-chrome-border-strong/60 bg-chrome-popover/95 shadow-[0_-4px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around gap-0.5 px-1 pt-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const routeActive = tab.match(pathname);
          const moreActive = tab.id === 'more' && Boolean(hubMobile?.moreSheetOpen);
          const active = tab.id === 'more' ? routeActive || moreActive : routeActive;

          if (tab.href === null) {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => hubMobile?.openMoreSheet()}
                className={`flex min-h-[3rem] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-semibold uppercase tracking-wide transition-colors touch-manipulation ${
                  active
                    ? 'text-gold shadow-[inset_0_0_0_1px_rgba(196,169,98,0.35),0_0_20px_rgba(196,169,98,0.12)]'
                    : 'text-text-dim hover:bg-chrome-fill/80 hover:text-text-muted'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="h-5 w-5 shrink-0 opacity-90" strokeWidth={1.5} aria-hidden />
                <span className="max-w-full truncate">{t(tab.labelKey, locale)}</span>
              </button>
            );
          }

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex min-h-[3rem] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-semibold uppercase tracking-wide transition-colors touch-manipulation ${
                active
                  ? 'text-gold shadow-[inset_0_0_0_1px_rgba(196,169,98,0.35),0_0_20px_rgba(196,169,98,0.12)]'
                  : 'text-text-dim hover:bg-chrome-fill/80 hover:text-text-muted'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-5 w-5 shrink-0 opacity-90" strokeWidth={1.5} aria-hidden />
              <span className="max-w-full truncate">{t(tab.labelKey, locale)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
});

export default MobileBottomNav;
