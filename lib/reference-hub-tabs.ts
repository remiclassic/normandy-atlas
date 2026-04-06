import type { AtlasLocale } from '@/core/types';
import { pickI18n } from '@/lib/locale';
import { digitalGuidesTooltipLabel } from '@/lib/digital-guides-ui';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { t } from '@/lib/ui-strings';

export type ReferenceHubTabDef = {
  href: string;
  label: string;
  match: (pathname: string) => boolean;
};

/** Ordered hub tabs (Digital guides when public, then Journal, then Companion). */
export function getReferenceHubTabDefs(locale: AtlasLocale): ReferenceHubTabDef[] {
  const journal: ReferenceHubTabDef = {
    href: '/journal',
    label: t('atlasJournal.tooltip.label', locale),
    match: (p) => p === '/journal' || p.startsWith('/journal/'),
  };
  const companion: ReferenceHubTabDef = {
    href: '/companion',
    label: t('companion.title', locale),
    match: (p) => p === '/companion' || p.startsWith('/companion/'),
  };
  const lineage: ReferenceHubTabDef = {
    href: '/lineage-explorer',
    label: t('lineageExplorer.navLabel', locale),
    match: (p) => p === '/lineage-explorer' || p.startsWith('/lineage-explorer/'),
  };
  const ancestry: ReferenceHubTabDef = {
    href: '/ancestry',
    label: t('ancestry.navLabel', locale),
    match: (p) => p === '/ancestry' || p.startsWith('/ancestry/'),
  };
  const guides: ReferenceHubTabDef = {
    href: '/guides',
    label: pickI18n(digitalGuidesTooltipLabel, locale),
    match: (p) => p === '/guides' || p.startsWith('/guides/'),
  };
  if (isDigitalGuidesPublic()) {
    return [guides, journal, ancestry, lineage, companion];
  }
  return [journal, ancestry, lineage, companion];
}
