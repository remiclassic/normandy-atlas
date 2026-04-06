'use client';

import Link from 'next/link';
import { memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/hooks/use-atlas';
import {
  GENEALOGY_DEEP_ORIGINS_PATH,
  GENEALOGY_HUB_PATH,
  GENEALOGY_NORMAN_IDENTITY_PATH,
} from '@/lib/genealogy-paths';
import { t, type UiStringKey } from '@/lib/ui-strings';

const tabActive =
  'border-b-gold/60 bg-chrome-fill-active/80 text-parchment shadow-[inset_0_-1px_0_rgba(196,169,98,0.35)]';
const tabInactive = 'border-transparent text-text-muted hover:bg-chrome-fill-badge/80 hover:text-parchment/95';

function pathnameMatchesHref(pathname: string, href: string): boolean {
  if (href === GENEALOGY_HUB_PATH) {
    return pathname === GENEALOGY_HUB_PATH || pathname === '/ancestry';
  }
  if (href === GENEALOGY_DEEP_ORIGINS_PATH) {
    return pathname === GENEALOGY_DEEP_ORIGINS_PATH || pathname === '/ancestry/deep-origins';
  }
  if (href === GENEALOGY_NORMAN_IDENTITY_PATH) {
    return pathname === GENEALOGY_NORMAN_IDENTITY_PATH;
  }
  if (href === '/lineage-explorer') {
    return pathname === '/lineage-explorer';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const GenealogySubnav = memo(function GenealogySubnav() {
  const pathname = usePathname() ?? '';
  const locale = useLocale();

  const items: readonly { href: string; labelKey: UiStringKey }[] = useMemo(
    () => [
      { href: GENEALOGY_HUB_PATH, labelKey: 'genealogy.subnav.workspace' },
      { href: GENEALOGY_NORMAN_IDENTITY_PATH, labelKey: 'genealogy.subnav.normanIdentity' },
      { href: GENEALOGY_DEEP_ORIGINS_PATH, labelKey: 'genealogy.subnav.deepOrigins' },
      { href: '/lineage-explorer', labelKey: 'genealogy.subnav.haplogroups' },
      { href: '/lineage-explorer/migration-map', labelKey: 'genealogy.subnav.migrationMap' },
      { href: '/lineage-explorer/compare', labelKey: 'genealogy.subnav.compare' },
      { href: '/lineage-explorer/norman-y-dna', labelKey: 'genealogy.subnav.normanYdna' },
    ],
    [],
  );

  return (
    <nav
      aria-label={t('genealogy.subnav.aria', locale)}
      className="shrink-0 border-b border-chrome-border/50 bg-chrome-fill/40"
      style={{ background: 'var(--color-chrome-fill)' }}
    >
      <div
        className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto overscroll-x-contain px-[max(0.75rem,env(safe-area-inset-left))] py-1.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] md:flex-wrap md:justify-center md:px-8 md:py-2"
        role="list"
      >
        {items.map((item) => {
          const active = pathnameMatchesHref(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              role="listitem"
              className={`shrink-0 rounded-md border px-2.5 py-2 text-center text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-wide transition-colors sm:text-[11px] md:px-3 md:py-1.5 ${
                active ? tabActive : tabInactive
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {t(item.labelKey, locale)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
});

export default GenealogySubnav;
