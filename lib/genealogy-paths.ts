/** Canonical routes for the unified Genealogy hub (see ReferenceHubTabs + grouped GenealogySubnav). */

export const GENEALOGY_HUB_PATH = '/genealogy';

export const GENEALOGY_DEEP_ORIGINS_PATH = '/genealogy/deep-origins';

export const GENEALOGY_NORMAN_IDENTITY_PATH = '/genealogy/norman-identity';

/** Paths that show GenealogySubnav below ReferenceHubTabs. */
export function isGenealogySubnavPath(pathname: string): boolean {
  if (!pathname) return false;
  return (
    pathname === GENEALOGY_HUB_PATH ||
    pathname.startsWith(`${GENEALOGY_HUB_PATH}/`) ||
    pathname === '/lineage-explorer' ||
    pathname.startsWith('/lineage-explorer/')
  );
}

/** Single “Genealogy” top tab is active for hub + lineage + legacy /ancestry URLs. */
export function isGenealogyHubTabMatch(pathname: string): boolean {
  if (!pathname) return false;
  return (
    isGenealogySubnavPath(pathname) ||
    pathname === '/ancestry' ||
    pathname.startsWith('/ancestry/')
  );
}
