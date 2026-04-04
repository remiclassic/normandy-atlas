import type {
  DigitalGuideArchive,
  DigitalGuideProduct,
  DigitalGuideProductId,
} from '@/data/digital-guides';

export type ResolvedDigitalGuideProduct = DigitalGuideProduct & { checkoutUrl: string };

/** Merge static catalog with optional Lemon Squeezy (or other) checkout URLs from env. */
export function resolveDigitalGuideArchive(archive: DigitalGuideArchive): {
  archive: DigitalGuideArchive;
  products: ResolvedDigitalGuideProduct[];
} {
  const products: ResolvedDigitalGuideProduct[] = archive.products.map((p) => ({
    ...p,
    checkoutUrl: resolveCheckoutUrl(p.id).trim(),
  }));
  return { archive, products };
}

export type ResolvedGuideSection = ReturnType<typeof resolveDigitalGuideArchive>;

export function resolveAllGuideArchives(
  archives: DigitalGuideArchive[],
): ResolvedGuideSection[] {
  return archives.map((a) => resolveDigitalGuideArchive(a));
}

function resolveCheckoutUrl(id: DigitalGuideProductId): string {
  const fromEnv: Record<DigitalGuideProductId, string | undefined> = {
    companion: process.env.NEXT_PUBLIC_LS_GUIDE_COMPANION,
    origins: process.env.NEXT_PUBLIC_LS_GUIDE_ORIGINS,
    lineage: process.env.NEXT_PUBLIC_LS_GUIDE_LINEAGE,
    conquest: process.env.NEXT_PUBLIC_LS_GUIDE_CONQUEST,
    mediterranean: process.env.NEXT_PUBLIC_LS_GUIDE_MEDITERRANEAN,
    crusader: process.env.NEXT_PUBLIC_LS_GUIDE_CRUSADER,
    castles: process.env.NEXT_PUBLIC_LS_GUIDE_CASTLES,
    newFrance: process.env.NEXT_PUBLIC_LS_GUIDE_NEW_FRANCE,
    angevin: process.env.NEXT_PUBLIC_LS_GUIDE_ANGEVIN,
    celticMarches: process.env.NEXT_PUBLIC_LS_GUIDE_CELTIC_MARCHES,
    channelIslands: process.env.NEXT_PUBLIC_LS_GUIDE_CHANNEL_ISLANDS,
    atlanticTrade: process.env.NEXT_PUBLIC_LS_GUIDE_ATLANTIC_TRADE,
    acadia: process.env.NEXT_PUBLIC_LS_GUIDE_ACADIA,
    louisiana: process.env.NEXT_PUBLIC_LS_GUIDE_LOUISIANA,
    deepTimeNormandy: process.env.NEXT_PUBLIC_LS_GUIDE_DEEP_TIME_NORMANDY,
    genealogistWorkbook: process.env.NEXT_PUBLIC_LS_GUIDE_GENEALOGIST_WORKBOOK,
    genealogyManyPaths: process.env.NEXT_PUBLIC_LS_GUIDE_GENEALOGY_MANY_PATHS,
    educatorPack: process.env.NEXT_PUBLIC_LS_GUIDE_EDUCATOR_PACK,
    sourcesMethodology: process.env.NEXT_PUBLIC_LS_GUIDE_SOURCES_METHODOLOGY,
    printableEraSheets: process.env.NEXT_PUBLIC_LS_GUIDE_PRINTABLE_ERA_SHEETS,
    bundleEngland: process.env.NEXT_PUBLIC_LS_GUIDE_BUNDLE_ENGLAND,
    bundleColonial: process.env.NEXT_PUBLIC_LS_GUIDE_BUNDLE_COLONIAL,
    bundleMediterranean: process.env.NEXT_PUBLIC_LS_GUIDE_BUNDLE_MEDITERRANEAN,
  };
  return fromEnv[id]?.trim() ?? '';
}
