'use client';

import Link from 'next/link';
import { memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/hooks/use-atlas';
import { ATLAS_REFERENCE_HUB_PATH } from '@/lib/atlas-reference-routes';
import {
  GENEALOGY_DEEP_ORIGINS_PATH,
  GENEALOGY_HUB_PATH,
  GENEALOGY_NORMAN_IDENTITY_PATH,
} from '@/lib/genealogy-paths';
import { t, type UiStringKey } from '@/lib/ui-strings';
import type { AtlasLocale } from '@/core/types';

/** Wraps `GenealogySubnav` + main content: sidebar on md+, stacked on small viewports. */
export const genealogyHubSplitClassName = 'flex min-h-0 flex-1 flex-col md:flex-row';

type GenealogySubnavItem =
  | { href: string; labelKey: UiStringKey }
  | { href: string; getLabel: (locale: AtlasLocale) => string };

type GenealogySubnavLayout = 'sidebar' | 'inline';

function itemLabel(item: GenealogySubnavItem, locale: AtlasLocale): string {
  return 'labelKey' in item ? t(item.labelKey, locale) : item.getLabel(locale);
}

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
  if (
    href === ATLAS_REFERENCE_HUB_PATH ||
    href === '/norman-names' ||
    href === '/stories'
  ) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const WORKSPACE_ITEMS: readonly GenealogySubnavItem[] = [
  { href: GENEALOGY_HUB_PATH, labelKey: 'genealogy.subnav.workspace' },
  { href: GENEALOGY_NORMAN_IDENTITY_PATH, labelKey: 'genealogy.subnav.normanIdentity' },
];

const GENETIC_ITEMS: readonly GenealogySubnavItem[] = [
  { href: GENEALOGY_DEEP_ORIGINS_PATH, labelKey: 'genealogy.subnav.deepOrigins' },
  { href: '/lineage-explorer', labelKey: 'genealogy.subnav.haplogroups' },
  { href: '/lineage-explorer/migration-map', labelKey: 'genealogy.subnav.migrationMap' },
  { href: '/lineage-explorer/compare', labelKey: 'genealogy.subnav.compare' },
  { href: '/lineage-explorer/norman-y-dna', labelKey: 'genealogy.subnav.normanYdna' },
];

const RESOURCE_ITEMS: readonly GenealogySubnavItem[] = [
  { href: '/stories', labelKey: 'storyLibrary.title' },
  { href: ATLAS_REFERENCE_HUB_PATH, labelKey: 'genealogy.subnav.reference' },
  { href: '/norman-names', labelKey: 'toolsMenu.normanSurnamesLabel' },
];

const SECTION_DEFS: readonly { titleKey: UiStringKey; items: readonly GenealogySubnavItem[] }[] = [
  { titleKey: 'genealogy.navSection.workspace', items: WORKSPACE_ITEMS },
  { titleKey: 'genealogy.navSection.genetic', items: GENETIC_ITEMS },
  { titleKey: 'genealogy.navSection.resources', items: RESOURCE_ITEMS },
];

const stripActive =
  'border-b-gold/60 bg-chrome-fill-active/80 text-parchment shadow-[inset_0_-1px_0_rgba(196,169,98,0.35)]';
const stripInactive = 'border-transparent text-text-muted hover:bg-chrome-fill-badge/80 hover:text-parchment/95';

const stripLinkClass =
  'shrink-0 rounded-md border px-2.5 py-2 text-center text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-wide transition-colors sm:text-[11px] md:px-3 md:py-1.5';

const railActive =
  'border-l-gold/70 bg-chrome-fill-active/75 text-parchment shadow-[inset_0_0_0_1px_rgba(196,169,98,0.2)]';
const railInactive =
  'border-l-transparent text-text-muted hover:border-l-chrome-border/60 hover:bg-chrome-fill-badge/50 hover:text-parchment/95';

const railLinkClass =
  'block w-full border-l-2 py-2 pl-3 pr-2 text-left text-[11px] font-semibold uppercase tracking-wide transition-colors md:pl-3.5 md:text-[11px]';

type GenealogySubnavProps = {
  /** `inline`: full-width strip (e.g. deep origins + map). `sidebar`: rail on md+, scroll strip on small screens. */
  layout?: GenealogySubnavLayout;
};

const GenealogySubnav = memo(function GenealogySubnav({ layout = 'sidebar' }: GenealogySubnavProps) {
  const pathname = usePathname() ?? '';
  const locale = useLocale();

  const flatItems = useMemo(
    () => SECTION_DEFS.flatMap((s) => [...s.items]),
    [],
  );

  const stripRow = (
    <div
      className="flex w-full flex-nowrap items-center gap-1 overflow-x-auto overscroll-x-contain px-[max(0.75rem,env(safe-area-inset-left))] py-1.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] md:px-3 md:py-2"
      role="list"
    >
      {flatItems.map((item) => {
        const active = pathnameMatchesHref(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            role="listitem"
            className={`${stripLinkClass} ${active ? stripActive : stripInactive}`}
            aria-current={active ? 'page' : undefined}
          >
            {itemLabel(item, locale)}
          </Link>
        );
      })}
    </div>
  );

  if (layout === 'inline') {
    return (
      <nav
        aria-label={t('genealogy.subnav.aria', locale)}
        className="w-full shrink-0 border-b border-chrome-border/50 bg-chrome-fill/40"
        style={{ background: 'var(--color-chrome-fill)' }}
      >
        {stripRow}
      </nav>
    );
  }

  return (
    <div
      className="flex w-full shrink-0 flex-col border-b border-chrome-border/50 bg-chrome-fill/40 md:h-full md:min-h-0 md:w-[min(15rem,30vw)] md:max-w-[16rem] md:border-b-0 md:border-r md:border-chrome-border/50 md:bg-chrome-fill/35"
      style={{ background: 'var(--color-chrome-fill)' }}
    >
      <nav aria-label={t('genealogy.subnav.aria', locale)} className="md:hidden">
        {stripRow}
      </nav>

      <aside
        aria-label={t('genealogy.subnav.aria', locale)}
        className="hidden min-h-0 flex-1 md:block md:h-full md:min-h-0 md:overflow-y-auto md:overscroll-y-contain md:scrollbar-thin"
      >
        <div className="flex flex-col gap-4 px-2 py-3 md:px-3 md:py-4">
          {SECTION_DEFS.map((section) => (
            <div key={section.titleKey}>
              <div className="mb-1.5 px-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-text-dim/90">
                {t(section.titleKey, locale)}
              </div>
              <nav className="flex flex-col gap-0.5" aria-label={t(section.titleKey, locale)}>
                {section.items.map((item) => {
                  const active = pathnameMatchesHref(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${railLinkClass} ${active ? railActive : railInactive}`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {itemLabel(item, locale)}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
});

export default GenealogySubnav;
