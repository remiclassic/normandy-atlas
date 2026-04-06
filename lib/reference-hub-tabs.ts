import type { AtlasLocale } from '@/core/types';
import { ATLAS_REFERENCE_HUB_PATH } from '@/lib/atlas-reference-routes';
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

/** Ordered hub tabs (Library overview, then digital guides when public, journal, readings, genealogy, companion). */
export function getReferenceHubTabDefs(locale: AtlasLocale): ReferenceHubTabDef[] {
  const libraryHome: ReferenceHubTabDef = {
    href: ATLAS_REFERENCE_HUB_PATH,
    label: t('referenceHub.homeTab', locale),
    match: (p) => p === ATLAS_REFERENCE_HUB_PATH,
  };
  const journal: ReferenceHubTabDef = {
    href: '/journal',
    label: t('atlasJournal.tooltip.label', locale),
    match: (p) => p === '/journal' || p.startsWith('/journal/'),
  };
  const readings: ReferenceHubTabDef = {
    href: '/norman-readings',
    label: t('toolsMenu.normanReadingsLabel', locale),
    match: (p) => p === '/norman-readings' || p.startsWith('/norman-readings/'),
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
    return [libraryHome, guides, journal, readings, genealogy, companion];
  }
  return [libraryHome, journal, readings, genealogy, companion];
}
