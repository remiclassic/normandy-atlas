import type { AtlasLocale } from '@/core/types';
import { pickI18n } from '@/lib/locale';
import { digitalGuidesTooltipLabel } from '@/lib/digital-guides-ui';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { t } from '@/lib/ui-strings';
import { GENEALOGY_HUB_PATH, isGenealogyHubTabMatch } from '@/lib/genealogy-paths';

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
    match: (p) =>
      p === '/journal' || p.startsWith('/journal/') || p.startsWith('/norman-readings'),
  };
  const companion: ReferenceHubTabDef = {
    href: '/companion',
    label: t('companion.title', locale),
    match: (p) => p === '/companion' || p.startsWith('/companion/'),
  };
  const genealogy: ReferenceHubTabDef = {
    href: GENEALOGY_HUB_PATH,
    label: t('genealogy.navLabel', locale),
    match: (p) => isGenealogyHubTabMatch(p),
  };
  const guides: ReferenceHubTabDef = {
    href: '/guides',
    label: pickI18n(digitalGuidesTooltipLabel, locale),
    match: (p) => p === '/guides' || p.startsWith('/guides/'),
  };
  if (isDigitalGuidesPublic()) {
    return [guides, journal, genealogy, companion];
  }
  return [journal, genealogy, companion];
}
