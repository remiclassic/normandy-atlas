/**
 * Static catalog for digital guides (Lemon Squeezy / external checkout).
 * Checkout URLs are merged at runtime in `lib/digital-guides-resolve.ts` from optional env vars.
 */

export type GuideCoverVariant = 'blue' | 'brown' | 'maroon' | 'green';

/** Stable id for React keys and `NEXT_PUBLIC_LS_GUIDE_*` env mapping. */
export type DigitalGuideProductId =
  | 'companion'
  | 'origins'
  | 'lineage'
  | 'conquest'
  | 'mediterranean'
  | 'crusader'
  | 'castles'
  | 'newFrance'
  | 'angevin'
  | 'celticMarches'
  | 'channelIslands'
  | 'atlanticTrade'
  | 'acadia'
  | 'louisiana'
  | 'deepTimeNormandy'
  | 'genealogistWorkbook'
  | 'genealogyManyPaths'
  | 'educatorPack'
  | 'sourcesMethodology'
  | 'printableEraSheets'
  | 'bundleEngland'
  | 'bundleColonial'
  | 'bundleMediterranean';

export interface DigitalGuideProduct {
  id: DigitalGuideProductId;
  seriesLabel: string;
  title: string;
  description: string;
  priceLabel: string;
  coverVariant: GuideCoverVariant;
}

export interface DigitalGuideArchive {
  /** URL-safe unique id for anchors and React keys. */
  slug: string;
  eyebrow: string;
  title: string;
  taglines: [string, string];
  watermark: string;
  products: DigitalGuideProduct[];
}

export const normanArchivesCatalog: DigitalGuideArchive = {
  slug: 'norman-archives',
  eyebrow: 'Digital collection',
  title: 'The Norman Archives',
  taglines: [
    'Meticulously researched. Beautifully designed.',
    'Built for collectors and historians alike.',
  ],
  watermark: 'MCMLXVI',
  products: [
    {
      id: 'companion',
      seriesLabel: 'Complete edition',
      title: 'The Norman Atlas companion',
      description:
        'A definitive print-minded companion to the atlas: eras, layers, settlement grades, and how we weigh evidence. Use it alongside the map or on its own for a structured tour of the Norman world.',
      priceLabel: '$32',
      coverVariant: 'blue',
    },
    {
      id: 'origins',
      seriesLabel: 'Origins series',
      title: 'From the Seine to the duchy',
      description:
        'From Norse raids along the Seine to the treaty that shaped Normandy—political turning points, key places on the atlas, and how a frontier became a duchy.',
      priceLabel: '$24',
      coverVariant: 'brown',
    },
    {
      id: 'lineage',
      seriesLabel: 'Lineage series',
      title: 'Norman surnames and family origins',
      description:
        'Patronymics, locative names, and Norman dispersal—with patterns you can trace on the map. Written for family historians who want context, not just lists.',
      priceLabel: '$22',
      coverVariant: 'maroon',
    },
    {
      id: 'conquest',
      seriesLabel: 'Visual breakdown',
      title: '1066: conquest and the Anglo-Norman world',
      description:
        'A focused narrative of the Conquest and what followed: Harald, Hardrada, Hastings, and the institutions that tied England to Normandy—aligned with the atlas story beats.',
      priceLabel: '$28',
      coverVariant: 'green',
    },
  ],
};

/** Mediterranean, crusades, fortification, and New France—aligned with atlas era arcs. */
export const normanWorldsCatalog: DigitalGuideArchive = {
  slug: 'norman-worlds',
  eyebrow: 'Volume II',
  title: 'Norman Worlds',
  taglines: [
    'The Mediterranean frontier, crusader principalities, and the Norman Atlantic.',
    'Follow the same rigour as the map—from Palermo and Antioch to the St. Lawrence.',
  ],
  watermark: 'MDC',
  products: [
    {
      id: 'mediterranean',
      seriesLabel: 'Mediterranean series',
      title: 'Normans in Sicily and southern Italy',
      description:
        'The Hauteville ascent: mercenaries to monarchs, Roger II’s kingdom, and how Norman rule reshaped the central Mediterranean—places and power centres you can relate to the wider atlas.',
      priceLabel: '$26',
      coverVariant: 'blue',
    },
    {
      id: 'crusader',
      seriesLabel: 'Levant series',
      title: 'Antioch and the First Crusade',
      description:
        'Bohemond, the principality of Antioch, and Norman ambition in the East: politics, logistics, and the military culture that crossed from Apulia to the Orontes.',
      priceLabel: '$24',
      coverVariant: 'maroon',
    },
    {
      id: 'castles',
      seriesLabel: 'Landscape series',
      title: 'Castles, frontiers, and the Norman military landscape',
      description:
        'From motte-and-bailey to stone enceintes: how fortification expressed lordship along contested edges—Wales, the marches, and cross-Channel security in atlas terms.',
      priceLabel: '$22',
      coverVariant: 'brown',
    },
    {
      id: 'newFrance',
      seriesLabel: 'Atlantic series',
      title: 'Normandy to New France',
      description:
        'Seafaring Normans, the St. Lawrence corridor, seigneuries, and the people who carried Norman names and law into North America—built to pair with the “Normandy to the New World” arc.',
      priceLabel: '$28',
      coverVariant: 'green',
    },
  ],
};

/** Crown, marcher zones, and insular Normandy. */
export const britishIslesFrontiersCatalog: DigitalGuideArchive = {
  slug: 'british-isles-frontiers',
  eyebrow: 'Volume III',
  title: 'Crown, March, and Sea',
  taglines: [
    'The Angevin empire and Norman reach in Wales, Ireland, Scotland, and the Channel Islands.',
    'Political narrative keyed to the same geography you explore on the atlas.',
  ],
  watermark: 'MCLIV',
  products: [
    {
      id: 'angevin',
      seriesLabel: 'Empire series',
      title: 'The Angevin world',
      description:
        'Henry II, Eleanor, and the cross-Channel state: Anjou, Normandy, England, and Aquitaine in tension with Capetian France—how institutions and itineraries looked from Rouen to Westminster.',
      priceLabel: '$26',
      coverVariant: 'blue',
    },
    {
      id: 'celticMarches',
      seriesLabel: 'Periphery series',
      title: 'Normans in Wales, Ireland, and Scotland',
      description:
        'Invasion routes, marcher lordships, burghs, and Gaelic response: a comparative arc for readers who want the British and Irish experience beyond Hastings—without duplicating a pure “castles only” lens.',
      priceLabel: '$24',
      coverVariant: 'maroon',
    },
    {
      id: 'channelIslands',
      seriesLabel: 'Insular series',
      title: 'The Channel Islands',
      description:
        'Insular Normandy: law, language, and identity where the duchy met the sea. A focused guide for visitors, diaspora readers, and anyone tracing family ties to Guernsey and Jersey.',
      priceLabel: '$18',
      coverVariant: 'green',
    },
  ],
};

/** Trade, Acadia, and Louisiana as distinct North Atlantic products. */
export const atlanticCorridorsCatalog: DigitalGuideArchive = {
  slug: 'atlantic-corridors',
  eyebrow: 'Volume IV',
  title: 'Atlantic Corridors',
  taglines: [
    'Cod, ships, and merchants—then Acadian and Louisiana stories in atlas depth.',
    'Pairs with colonial eras and routes without repeating the general New France volume wholesale.',
  ],
  watermark: 'MDCX',
  products: [
    {
      id: 'atlanticTrade',
      seriesLabel: 'Maritime series',
      title: 'Trade, ships, and the Atlantic before New France',
      description:
        'Ports, navigation, fisheries, and mercantile circuits that tied Normandy to the wider Atlantic—context for why Norman names and ships show up in colonial sources.',
      priceLabel: '$22',
      coverVariant: 'blue',
    },
    {
      id: 'acadia',
      seriesLabel: 'Colonial series',
      title: 'Acadia and the northeast',
      description:
        'Settlement patterns, deportation and return, and the Acadian arc as it intersects French and British imperial space—written for family historians who want place-based narrative.',
      priceLabel: '$20',
      coverVariant: 'brown',
    },
    {
      id: 'louisiana',
      seriesLabel: 'Colonial series',
      title: 'Louisiana and the Gulf',
      description:
        'From Mississippi corridors to Creole worlds: how French and Norman legal culture left traces in names, land tenure, and memory—aligned with interior and Gulf-facing atlas content.',
      priceLabel: '$20',
      coverVariant: 'maroon',
    },
  ],
};

/** Pre-Viking deep time on the map. */
export const deepRootsCatalog: DigitalGuideArchive = {
  slug: 'deep-roots',
  eyebrow: 'Deep time',
  title: 'Before the duchy',
  taglines: [
    'Neolithic monuments to Roman Gaul and the Frankish centuries—prelude to the Viking story.',
    'For readers who start the atlas in deep-time eras and want a coherent book-length path.',
  ],
  watermark: 'NEO',
  products: [
    {
      id: 'deepTimeNormandy',
      seriesLabel: 'Origins primer',
      title: 'Deep-time Normandy',
      description:
        'Megalithic landscapes, Roman roads and civitas, then Frankish Neustria: how the physical map of Normandy was set long before Rollo—tied to atlas layers and era transitions.',
      priceLabel: '$24',
      coverVariant: 'brown',
    },
  ],
};

/** Workbooks and methodology. */
export const researchTeachingCatalog: DigitalGuideArchive = {
  slug: 'research-teaching',
  eyebrow: 'Resources',
  title: 'Research, teaching, and evidence',
  taglines: [
    'Practical tools for genealogists, teachers, and critical readers of the atlas.',
    'Honest about what the map shows, illustrates, and does not claim.',
  ],
  watermark: 'FONS',
  products: [
    {
      id: 'genealogistWorkbook',
      seriesLabel: 'Workbook',
      title: 'Genealogist’s atlas workbook',
      description:
        'How to read eras and layers alongside parish and notarial research: note-taking templates, uncertainty labels, and a suggested reading order with the surname guide.',
      priceLabel: '$16',
      coverVariant: 'green',
    },
    {
      id: 'genealogyManyPaths',
      seriesLabel: 'Genealogy series',
      title: 'Your Norman background, whatever path it took',
      description:
        'For readers whose family identity is Irish, Scots, Welsh, English, Channel Islands, colonial North American, or Mediterranean—yet Norman ancestors appear in the tree. Maps those journeys to atlas eras and points you to the right companion volumes, alongside the surname guide and workbook.',
      priceLabel: '$22',
      coverVariant: 'brown',
    },
    {
      id: 'educatorPack',
      seriesLabel: 'Classroom pack',
      title: 'Educator and classroom companion',
      description:
        'Modular chapters keyed to atlas eras and story beats: discussion prompts, map-led activities, and fair-use guidance for projecting or assigning the experience.',
      priceLabel: '$28',
      coverVariant: 'blue',
    },
    {
      id: 'sourcesMethodology',
      seriesLabel: 'Methodology',
      title: 'Sources and how we decide',
      description:
        'A compact methodology booklet: types of evidence, weighting conflicting accounts, and how narrative on the site relates to scholarship—ideal for historians who want the fine print.',
      priceLabel: '$14',
      coverVariant: 'maroon',
    },
  ],
};

/** Printables and curated PDF bundles. */
export const printAndBundlesCatalog: DigitalGuideArchive = {
  slug: 'print-bundles',
  eyebrow: 'Print and bundles',
  title: 'Maps, sheets, and curated sets',
  taglines: [
    'Print-at-home era sheets and poster-friendly timelines—plus money-saving bundles.',
    'Checkout delivers PDFs; print locally or use in teaching and research walls.',
  ],
  watermark: 'TAB',
  products: [
    {
      id: 'printableEraSheets',
      seriesLabel: 'Printables',
      title: 'Printable map era sheets',
      description:
        'High-resolution era overview sheets and timeline spreads derived from the atlas visual language—designed for A3/A2 home printing and classroom display.',
      priceLabel: '$12',
      coverVariant: 'blue',
    },
    {
      id: 'bundleEngland',
      seriesLabel: 'Bundle',
      title: 'England bundle',
      description:
        'Curated set: 1066 guide plus castles and frontiers volume at a bundle price—one checkout for the core Anglo-Norman shelf.',
      priceLabel: '$42',
      coverVariant: 'maroon',
    },
    {
      id: 'bundleColonial',
      seriesLabel: 'Bundle',
      title: 'Colonial bundle',
      description:
        'New France overview plus Acadia and Louisiana volumes together—for readers tracing North American Norman and French colonial lines.',
      priceLabel: '$48',
      coverVariant: 'green',
    },
    {
      id: 'bundleMediterranean',
      seriesLabel: 'Bundle',
      title: 'Mediterranean bundle',
      description:
        'Sicily and southern Italy plus Antioch and the First Crusade—two books, one southern Norman story from palace to principality.',
      priceLabel: '$42',
      coverVariant: 'brown',
    },
  ],
};

/** All shelves shown on `/guides`, in order. */
export const allGuideArchives: DigitalGuideArchive[] = [
  normanArchivesCatalog,
  normanWorldsCatalog,
  britishIslesFrontiersCatalog,
  atlanticCorridorsCatalog,
  deepRootsCatalog,
  researchTeachingCatalog,
  printAndBundlesCatalog,
];
