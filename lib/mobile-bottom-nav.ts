import type { LucideIcon } from 'lucide-react';
import { BookMarked, Compass, Dna, LibraryBig, MoreHorizontal } from 'lucide-react';
import { ATLAS_REFERENCE_HUB_PATH } from '@/lib/atlas-reference-routes';
import { isGenealogyHubTabMatch } from '@/lib/genealogy-paths';
import type { UiStringKey } from '@/lib/ui-strings';

/** Primary sections reachable from the bottom tab bar (mobile). */
export const MOBILE_MORE_ROUTE_PREFIXES = [
  '/companion',
  '/norman-readings',
  '/guides',
  '/stories',
  '/norman-names',
  '/profile',
] as const;

function pathStartsWithAny(pathname: string, prefixes: readonly string[]): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/** Routes that belong to the “More” tab (not Explore / Library / Genealogy / Journal). */
export function isMobileMoreTabMatch(pathname: string): boolean {
  if (!pathname) return false;
  if (pathname === '/' || pathname.startsWith('/_')) return false;
  if (pathname === ATLAS_REFERENCE_HUB_PATH) return false;
  if (isGenealogyHubTabMatch(pathname)) return false;
  if (pathname === '/journal' || pathname.startsWith('/journal/')) return false;
  return pathStartsWithAny(pathname, MOBILE_MORE_ROUTE_PREFIXES);
}

export type MobileBottomTabId = 'explore' | 'library' | 'genealogy' | 'journal' | 'more';

export type MobileBottomTabDef = {
  id: MobileBottomTabId;
  href: string | null;
  labelKey: UiStringKey;
  icon: LucideIcon;
  match: (pathname: string) => boolean;
};

export function getMobileBottomTabDefs(): readonly MobileBottomTabDef[] {
  return [
    {
      id: 'explore',
      href: '/',
      labelKey: 'mobileNav.explore',
      icon: Compass,
      match: (p) => p === '/' || p === '',
    },
    {
      id: 'library',
      href: ATLAS_REFERENCE_HUB_PATH,
      labelKey: 'mobileNav.library',
      icon: LibraryBig,
      match: (p) => p === ATLAS_REFERENCE_HUB_PATH,
    },
    {
      id: 'genealogy',
      href: '/genealogy',
      labelKey: 'mobileNav.genealogy',
      icon: Dna,
      match: (p) => isGenealogyHubTabMatch(p),
    },
    {
      id: 'journal',
      href: '/journal',
      labelKey: 'mobileNav.journal',
      icon: BookMarked,
      match: (p) => p === '/journal' || p.startsWith('/journal/'),
    },
    {
      id: 'more',
      href: null,
      labelKey: 'mobileNav.more',
      icon: MoreHorizontal,
      match: (p) => isMobileMoreTabMatch(p),
    },
  ] as const;
}
