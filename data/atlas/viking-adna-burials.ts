import { getFeatureIconType } from '@/lib/atlas/getFeatureIconType';

// ---------------------------------------------------------------------------
// Viking-world archaeogenomics burial dataset (Margaryan et al. 2020).
// Site-aggregated for map display; individual samples listed per site.
// ---------------------------------------------------------------------------

export interface VikingAdnaSample {
  sampleId: string;
  yDnaHaplogroup: string | null;
  mtDnaHaplogroup: string | null;
}

export interface VikingAdnaExternalLink {
  label: string;
  url: string;
}

export interface VikingAdnaSite {
  id: string;
  siteName: string;
  country: string;
  region: string | null;
  coordinates: [number, number] | null;
  coordinatesCertainty: 'confirmed' | 'probable';
  dateStart: number;
  dateEnd: number;
  periodLabel: string;
  burialContextType: string | null;
  burialDescription: string | null;
  assemblageSizeNote: string | null;
  traumaNote: string | null;
  isotopeNote: string | null;
  tags: string[];
  samples: VikingAdnaSample[];
  sourceCitation: string;
  doi?: string;
  studyLabel?: string;
  significanceNote?: string;
  dataQualityNote?: string;
  externalLinks?: VikingAdnaExternalLink[];
}

const MARGARYAN_CITATION =
  'Margaryan et al., Nature (2020), doi:10.1038/s41586-020-2688-8';
const MARGARYAN_DOI = '10.1038/s41586-020-2688-8';

export const vikingAdnaSites: VikingAdnaSite[] = [
  {
    id: 'ridgeway-hill',
    siteName: 'Ridgeway Hill Mass Grave',
    country: 'United Kingdom',
    region: 'England, Dorset',
    coordinates: [-2.47, 50.67],
    coordinatesCertainty: 'confirmed',
    dateStart: 970,
    dateEnd: 1025,
    periodLabel: 'Viking Age',
    burialContextType: 'mass grave',
    burialDescription:
      'Execution-pit mass grave of decapitated individuals; skulls deposited separately and bodies thrown into the pit.',
    assemblageSizeNote: '~54 individuals',
    traumaNote: 'Systematic decapitation (execution).',
    isotopeNote: null,
    tags: ['mass_grave', 'execution', 'decapitation', 'viking_age_england'],
    samples: [
      { sampleId: 'VK256', yDnaHaplogroup: 'R1a1a1b1a3a1', mtDnaHaplogroup: 'H1c7' },
      { sampleId: 'VK257', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK258', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK259', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK261', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK262', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK263', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK264', yDnaHaplogroup: 'R1a1a1', mtDnaHaplogroup: 'N1a1a1a2' },
      { sampleId: 'VK449', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: 'The largest genetically analysed Viking-age execution site in England. DNA shows the men came from across Scandinavia, not a single warband — revealing the diverse origins of late Viking raiders.',
  },
  {
    id: 'st-johns-oxford',
    siteName: "St John's College Oxford Mass Burial",
    country: 'United Kingdom',
    region: 'England, Oxford',
    coordinates: [-1.26, 51.76],
    coordinatesCertainty: 'confirmed',
    dateStart: 880,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'mass grave',
    burialDescription:
      "Mass burial beneath St John's College associated with the St Brice's Day massacre (AD 1002) context; evidence of extreme interpersonal violence.",
    assemblageSizeNote: 'At least 35 individuals',
    traumaNote: 'Extreme violence (stabbing and decapitation).',
    isotopeNote: 'Origins include the UK, Denmark, and Germany.',
    tags: ['mass_grave', 'oxford', 'st_brices_day', 'violence'],
    samples: [
      { sampleId: 'VK143', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK145', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK146', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK150', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK151', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK165', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK166', yDnaHaplogroup: 'R1b1a1b1a1a2a1b1a1a~', mtDnaHaplogroup: 'H3ag*' },
      { sampleId: 'VK168', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK172', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK173', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK176', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK177', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: "Likely linked to the St Brice's Day massacre of 1002, when Aethelred II ordered the killing of Danes in England. Isotope data show victims originated from multiple regions including Denmark and Germany.",
  },
  {
    id: 'newark-deerness',
    siteName: 'Newark, Deerness Cemetery',
    country: 'United Kingdom',
    region: 'Scotland, Orkney',
    coordinates: [-2.75, 58.93],
    coordinatesCertainty: 'confirmed',
    dateStart: 890,
    dateEnd: 970,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription:
      'Multi-period cemetery at Newark, Deerness; most burials date to the Norse period.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['cemetery', 'orkney', 'norse_period'],
    samples: [
      { sampleId: 'VK205', yDnaHaplogroup: 'R1a1a1b1a3a1a3b2~', mtDnaHaplogroup: 'H3' },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'buckquoy-birsay',
    siteName: 'Buckquoy, Birsay',
    country: 'United Kingdom',
    region: 'Scotland, Orkney',
    coordinates: [-3.33, 59.13],
    coordinatesCertainty: 'probable',
    dateStart: 850,
    dateEnd: 950,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: null,
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['cemetery', 'orkney'],
    samples: [
      { sampleId: 'I2984', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'R-A151', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'karda-sweden',
    siteName: 'Karda',
    country: 'Sweden',
    region: null,
    coordinates: [13.93, 57.18],
    coordinatesCertainty: 'confirmed',
    dateStart: 800,
    dateEnd: 1100,
    periodLabel: 'Viking Age',
    burialContextType: null,
    burialDescription: null,
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['sweden', 'viking_age_sweden'],
    samples: [
      { sampleId: 'VK266', yDnaHaplogroup: null, mtDnaHaplogroup: 'V' },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'varnhem-skara',
    siteName: 'Varnhem',
    country: 'Sweden',
    region: 'Skara',
    coordinates: [13.67, 58.39],
    coordinatesCertainty: 'probable',
    dateStart: 850,
    dateEnd: 950,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: null,
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['sweden', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK42', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK303', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK29', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK399', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'kopparsvik-gotland',
    siteName: 'Kopparsvik',
    country: 'Sweden',
    region: 'Gotland',
    coordinates: [18.27, 57.63],
    coordinatesCertainty: 'probable',
    dateStart: 850,
    dateEnd: 950,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: null,
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['sweden', 'gotland', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK475', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK468', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK50', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK479', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK474', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'frojel-gotland',
    siteName: 'Frojel',
    country: 'Sweden',
    region: 'Gotland',
    coordinates: [18.13, 57.50],
    coordinatesCertainty: 'probable',
    dateStart: 850,
    dateEnd: 950,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: null,
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['sweden', 'gotland', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK58', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK429', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK433', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK455', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'oland-sweden',
    siteName: 'Oland',
    country: 'Sweden',
    region: 'Oland',
    coordinates: [16.66, 56.66],
    coordinatesCertainty: 'probable',
    dateStart: 750,
    dateEnd: 850,
    periodLabel: 'Viking Age',
    burialContextType: null,
    burialDescription: null,
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['sweden', 'oland', 'viking_age'],
    samples: [
      { sampleId: 'VK533', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK443', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'sigtuna-nunnan',
    siteName: 'Cemetery 1 (Nunnan), Sigtuna',
    country: 'Sweden',
    region: 'Sigtuna',
    coordinates: [17.72, 59.62],
    coordinatesCertainty: 'probable',
    dateStart: 870,
    dateEnd: 920,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: null,
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['sweden', 'sigtuna', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'vik_84001', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'sigtuna-st-gertrud',
    siteName: 'Church 1 (St. Gertrud), Sigtuna',
    country: 'Sweden',
    region: 'Sigtuna',
    coordinates: [17.72, 59.62],
    coordinatesCertainty: 'probable',
    dateStart: 860,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'churchyard cemetery',
    burialDescription: null,
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['sweden', 'sigtuna', 'church', 'viking_age'],
    samples: [
      { sampleId: 'vik_grt035', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'vik_stg021', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'vik_grt036', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },

  // ── Denmark ─────────────────────────────────────────────────────────
  {
    id: 'galgedil-funen',
    siteName: 'Galgedil',
    country: 'Denmark',
    region: 'Funen',
    coordinates: [10.37, 55.39],
    coordinatesCertainty: 'confirmed',
    dateStart: 775,
    dateEnd: 900,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription:
      'Viking-age cemetery on the island of Funen; multiple inhumations with Scandinavian cultural affiliation.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['denmark', 'funen', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK1', yDnaHaplogroup: 'I1a2a1a1c', mtDnaHaplogroup: 'H1e8a' },
      { sampleId: 'VK2', yDnaHaplogroup: 'I1a2a1a1a', mtDnaHaplogroup: 'J1c2e' },
      { sampleId: 'VK3', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'langeland-denmark',
    siteName: 'Langeland',
    country: 'Denmark',
    region: 'Langeland',
    coordinates: [10.72, 54.85],
    coordinatesCertainty: 'confirmed',
    dateStart: 800,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription:
      'Viking-age burials on the island of Langeland in the Danish archipelago.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['denmark', 'langeland', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK4', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK5', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK6', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK7', yDnaHaplogroup: 'I1a1b1a', mtDnaHaplogroup: 'K1a4a1' },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'kongemarken-roskilde',
    siteName: 'Kongemarken, Roskilde',
    country: 'Denmark',
    region: 'Sjaelland',
    coordinates: [12.08, 55.64],
    coordinatesCertainty: 'confirmed',
    dateStart: 900,
    dateEnd: 1050,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription:
      'Cemetery near Roskilde on Sjaelland; part of the wider Roskilde-area Viking-age burial landscape.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['denmark', 'sjaelland', 'roskilde', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK10', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK11', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK12', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'trelleborg-slagelse',
    siteName: 'Trelleborg',
    country: 'Denmark',
    region: 'Sjaelland',
    coordinates: [11.26, 55.40],
    coordinatesCertainty: 'confirmed',
    dateStart: 980,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'ring fortress',
    burialDescription:
      "One of Harald Bluetooth's ring fortresses (Trelleborg type). Cemetery associated with the garrison; burials date to the fortress's brief operational period c. 980.",
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['denmark', 'sjaelland', 'ring_fortress', 'trelleborg', 'viking_age'],
    samples: [
      { sampleId: 'VK15', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK16', yDnaHaplogroup: 'R1b1a1b1a1a1', mtDnaHaplogroup: 'T2b' },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: "One of Harald Bluetooth's ring fortresses, built c. 980 as part of a network of royal military installations. The geometric precision of the fortress plan reveals centralised state power in late Viking-age Denmark.",
  },
  {
    id: 'kumle-hoje-odense',
    siteName: 'Kumle Hoje',
    country: 'Denmark',
    region: 'Funen, Odense',
    coordinates: [10.39, 55.40],
    coordinatesCertainty: 'probable',
    dateStart: 850,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'burial mound',
    burialDescription:
      'Burial mound near Odense on Funen; Viking-age mound inhumation.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['denmark', 'funen', 'odense', 'burial_mound', 'viking_age'],
    samples: [
      { sampleId: 'VK17', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK18', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'nonnebakken-odense',
    siteName: 'Nonnebakken',
    country: 'Denmark',
    region: 'Funen, Odense',
    coordinates: [10.39, 55.39],
    coordinatesCertainty: 'confirmed',
    dateStart: 980,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'ring fortress',
    burialDescription:
      "Ring fortress in Odense, one of Harald Bluetooth's network of circular fortresses. Burial associated with the garrison.",
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['denmark', 'funen', 'odense', 'ring_fortress', 'viking_age'],
    samples: [
      { sampleId: 'VK19', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'kalmergarden-tisso',
    siteName: 'Kalmergarden, Tisso',
    country: 'Denmark',
    region: 'Sjaelland',
    coordinates: [11.30, 55.55],
    coordinatesCertainty: 'confirmed',
    dateStart: 750,
    dateEnd: 900,
    periodLabel: 'Viking Age',
    burialContextType: 'elite cemetery',
    burialDescription:
      'Burials associated with the Tisso elite residence complex on western Sjaelland. One of the richest Viking-age magnate sites in Scandinavia.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['denmark', 'sjaelland', 'elite', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK21', yDnaHaplogroup: 'R1a1a1b', mtDnaHaplogroup: 'H6a1a' },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'skarup-funen',
    siteName: 'Skarup',
    country: 'Denmark',
    region: 'Funen',
    coordinates: [10.53, 55.01],
    coordinatesCertainty: 'probable',
    dateStart: 850,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: 'Viking-age cemetery on southern Funen.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['denmark', 'funen', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK22', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'hedeby-haithabu',
    siteName: 'Hedeby (Haithabu)',
    country: 'Denmark',
    region: 'Schleswig',
    coordinates: [9.57, 54.49],
    coordinatesCertainty: 'confirmed',
    dateStart: 800,
    dateEnd: 1066,
    periodLabel: 'Viking Age',
    burialContextType: 'trade town cemetery',
    burialDescription:
      'Major Viking-age trade emporium on the Schlei inlet. One of the largest and best-documented Norse urban centres; multi-ethnic population attested by genetics and isotopes.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: 'Multi-ethnic population indicated by isotope and genetic analyses.',
    tags: ['denmark', 'schleswig', 'trade_town', 'hedeby', 'viking_age'],
    samples: [
      { sampleId: 'VK90', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK91', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK92', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: 'Scandinavia\'s largest Viking-age urban centre and a key junction between North Sea and Baltic trade networks. Genetic diversity confirms a cosmopolitan population drawn from across Northern Europe.',
  },
  {
    id: 'ribe-denmark',
    siteName: 'Ribe',
    country: 'Denmark',
    region: 'Jutland',
    coordinates: [8.77, 55.33],
    coordinatesCertainty: 'confirmed',
    dateStart: 750,
    dateEnd: 900,
    periodLabel: 'Viking Age',
    burialContextType: 'trade town cemetery',
    burialDescription:
      "Denmark's oldest market town, founded c. 710. Viking-age burials near the emporium centre.",
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['denmark', 'jutland', 'trade_town', 'ribe', 'viking_age'],
    samples: [
      { sampleId: 'VK344', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK345', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'bodstrup-sjaelland',
    siteName: 'Bodstrup',
    country: 'Denmark',
    region: 'Sjaelland',
    coordinates: [11.76, 55.30],
    coordinatesCertainty: 'probable',
    dateStart: 900,
    dateEnd: 1050,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: 'Viking-age cemetery on Sjaelland.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['denmark', 'sjaelland', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK24', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK25', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },

  // ── Norway ──────────────────────────────────────────────────────────
  {
    id: 'nordre-kjolen-soler',
    siteName: 'Nordre Kjolen',
    country: 'Norway',
    region: 'Soler, Hedmark',
    coordinates: [11.73, 60.67],
    coordinatesCertainty: 'probable',
    dateStart: 800,
    dateEnd: 900,
    periodLabel: 'Viking Age',
    burialContextType: 'boat burial',
    burialDescription:
      'Furnished Norse boat grave in the inland Soler region. Boat burials signal elite status in Viking-age Scandinavia.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['norway', 'boat_burial', 'elite', 'viking_age'],
    samples: [
      { sampleId: 'VK515', yDnaHaplogroup: 'R1a1a1b1a3a', mtDnaHaplogroup: 'I1a1' },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'kaupang-vestfold',
    siteName: 'Kaupang',
    country: 'Norway',
    region: 'Vestfold',
    coordinates: [10.04, 59.05],
    coordinatesCertainty: 'confirmed',
    dateStart: 800,
    dateEnd: 950,
    periodLabel: 'Viking Age',
    burialContextType: 'trade town cemetery',
    burialDescription:
      "Norway's earliest known market town. Cemetery associated with the trading settlement on the western shore of the Oslofjord.",
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['norway', 'vestfold', 'trade_town', 'kaupang', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK526', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK527', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK528', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: "Norway's earliest known market town and a major port on the North Sea trade network. International goods from the British Isles, Frankia, and the Middle East attest to Kaupang's far-reaching commercial connections.",
  },
  {
    id: 'setre-hordaland',
    siteName: 'Setre',
    country: 'Norway',
    region: 'Hordaland',
    coordinates: [5.40, 60.30],
    coordinatesCertainty: 'probable',
    dateStart: 850,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: 'Viking-age burial site in western Norway (Hordaland).',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['norway', 'hordaland', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK530', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'bodogaard-nordland',
    siteName: 'Bodogaard',
    country: 'Norway',
    region: 'Nordland',
    coordinates: [14.40, 67.28],
    coordinatesCertainty: 'probable',
    dateStart: 800,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: 'Viking-age cemetery in northern Norway, well above the Arctic Circle.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['norway', 'nordland', 'arctic', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK537', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK538', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK539', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'ytre-elgsnes-troms',
    siteName: 'Ytre Elgsnes',
    country: 'Norway',
    region: 'Troms',
    coordinates: [16.80, 68.77],
    coordinatesCertainty: 'probable',
    dateStart: 800,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: 'Viking-age burial in far northern Norway (Troms county).',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['norway', 'troms', 'arctic', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK543', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },

  // ── Iceland ─────────────────────────────────────────────────────────
  {
    id: 'hofstadir-myvatnssveit',
    siteName: 'Hofstadir',
    country: 'Iceland',
    region: 'Myvatnssveit',
    coordinates: [-15.93, 65.63],
    coordinatesCertainty: 'confirmed',
    dateStart: 870,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'farmstead burial',
    burialDescription:
      'Burials at the Hofstadir longhouse site near Lake Myvatn. One of the most-excavated Viking-age farmsteads in Iceland.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['iceland', 'farmstead', 'settlement', 'viking_age'],
    samples: [
      { sampleId: 'VK70', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK71', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'dalvik-eyjafjordur',
    siteName: 'Dalvik',
    country: 'Iceland',
    region: 'Eyjafjordur',
    coordinates: [-18.53, 65.97],
    coordinatesCertainty: 'probable',
    dateStart: 900,
    dateEnd: 1050,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription: 'Viking-age cemetery in the Eyjafjordur region of northern Iceland.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['iceland', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK73', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK74', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },
  {
    id: 'keldudalur-iceland',
    siteName: 'Keldudalur',
    country: 'Iceland',
    region: null,
    coordinates: [-18.44, 65.70],
    coordinatesCertainty: 'probable',
    dateStart: 870,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'settlement burial',
    burialDescription: 'Viking-age settlement burial in Iceland.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['iceland', 'settlement', 'viking_age'],
    samples: [
      { sampleId: 'VK78', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },

  // ── Greenland ───────────────────────────────────────────────────────
  {
    id: 'brattahlid-greenland',
    siteName: 'Eastern Settlement (Brattahlid)',
    country: 'Greenland',
    region: 'Qassiarsuk',
    coordinates: [-45.52, 61.15],
    coordinatesCertainty: 'confirmed',
    dateStart: 985,
    dateEnd: 1300,
    periodLabel: 'Viking Age / Norse',
    burialContextType: 'farmstead cemetery',
    burialDescription:
      "Cemetery at Erik the Red's farmstead at Brattahlid in the Eastern Settlement. The founding site of Norse Greenland (c. 985).",
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['greenland', 'norse', 'farmstead', 'cemetery', 'eastern_settlement'],
    samples: [
      { sampleId: 'VK234', yDnaHaplogroup: null, mtDnaHaplogroup: 'J1c1b1a' },
      { sampleId: 'VK235', yDnaHaplogroup: 'I1a2a1', mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: "The founding site of Norse Greenland, established by Erik the Red c. 985. The farthest permanent Norse settlement in the west, representing the outermost reach of Viking-age expansion across the North Atlantic.",
  },
  {
    id: 'sandnes-greenland',
    siteName: 'Western Settlement (Sandnes)',
    country: 'Greenland',
    region: 'Kilaarsarfik',
    coordinates: [-50.18, 64.24],
    coordinatesCertainty: 'confirmed',
    dateStart: 1000,
    dateEnd: 1350,
    periodLabel: 'Norse',
    burialContextType: 'farmstead cemetery',
    burialDescription:
      'Norse farmstead cemetery at Sandnes in the Western Settlement. The settlement was abandoned by the mid-14th century.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['greenland', 'norse', 'farmstead', 'cemetery', 'western_settlement'],
    samples: [
      { sampleId: 'VK237', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK238', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },

  // ── Faroe Islands ───────────────────────────────────────────────────
  {
    id: 'aedukollar-sandoy',
    siteName: 'Aedukollar',
    country: 'Faroe Islands',
    region: 'Sandoy',
    coordinates: [-6.82, 61.83],
    coordinatesCertainty: 'probable',
    dateStart: 900,
    dateEnd: 1100,
    periodLabel: 'Viking Age',
    burialContextType: 'farmstead burial',
    burialDescription: 'Norse farmstead burial on the island of Sandoy in the Faroe Islands.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['faroe_islands', 'farmstead', 'norse', 'viking_age'],
    samples: [
      { sampleId: 'VK437', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
  },

  // ── Estonia ─────────────────────────────────────────────────────────
  {
    id: 'salme-saaremaa',
    siteName: 'Salme Ship Burials',
    country: 'Estonia',
    region: 'Saaremaa',
    coordinates: [22.25, 58.22],
    coordinatesCertainty: 'confirmed',
    dateStart: 750,
    dateEnd: 775,
    periodLabel: 'Late Iron Age / Viking Age',
    burialContextType: 'ship burial',
    burialDescription:
      'Two ship graves containing 41 slain warriors, discovered at Salme on the island of Saaremaa. Kinship analysis shows close relatives buried together. One of the earliest known Scandinavian ship burials outside Scandinavia.',
    assemblageSizeNote: '41 individuals across two ships',
    traumaNote: 'Lethal weapon trauma on all individuals; interpreted as a failed raiding party.',
    isotopeNote: 'Isotope and genetic data indicate Swedish (Malar region) origin.',
    tags: ['estonia', 'saaremaa', 'ship_burial', 'elite', 'raid', 'violence', 'viking_age'],
    samples: [
      { sampleId: 'VK484', yDnaHaplogroup: 'R1a1a1b', mtDnaHaplogroup: 'U5b2b1a' },
      { sampleId: 'VK485', yDnaHaplogroup: 'R1a1a1b', mtDnaHaplogroup: 'K1c1h' },
      { sampleId: 'VK486', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: 'The earliest known Scandinavian ship burial outside Scandinavia. Kinship analysis revealed four brothers buried side by side — the first direct evidence of family-based raiding parties in Viking-age warfare.',
  },

  // ── Poland ──────────────────────────────────────────────────────────
  {
    id: 'bodzia-kuyavia',
    siteName: 'Bodzia',
    country: 'Poland',
    region: 'Kuyavia',
    coordinates: [18.56, 52.52],
    coordinatesCertainty: 'confirmed',
    dateStart: 1000,
    dateEnd: 1050,
    periodLabel: 'Viking Age',
    burialContextType: 'elite cemetery',
    burialDescription:
      'Multicultural elite cemetery near the Vistula river. Grave goods and genetics indicate a mix of Scandinavian, Slavic, and Kievan Rus\u2019 affiliations. One of the key sites for understanding Viking-age cultural mixing in eastern Europe.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: 'Diverse isotopic signatures suggesting multiple geographic origins.',
    tags: ['poland', 'kuyavia', 'elite', 'cemetery', 'slavic_contact', 'viking_age'],
    samples: [
      { sampleId: 'VK157', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK158', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK159', yDnaHaplogroup: 'R1a1a1b', mtDnaHaplogroup: 'H1a3' },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: 'One of the key sites for understanding Viking-age cultural mixing in eastern Europe. Genetics and grave goods reveal Scandinavian, Slavic, and Kievan Rus\u2019 identities coexisting in a single elite community.',
  },

  // ── Ukraine ─────────────────────────────────────────────────────────
  {
    id: 'shestovitsa-chernihiv',
    siteName: 'Shestovitsa',
    country: 'Ukraine',
    region: 'Chernihiv',
    coordinates: [31.55, 51.50],
    coordinatesCertainty: 'confirmed',
    dateStart: 900,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'elite warrior cemetery',
    burialDescription:
      'Elite warrior cemetery of the Kievan Rus\u2019 era near Chernihiv. Norse warrior graves along the Dnieper trade route connecting Scandinavia to Constantinople.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['ukraine', 'chernihiv', 'varangian', 'elite', 'warrior', 'kievan_rus', 'viking_age'],
    samples: [
      { sampleId: 'VK160', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK161', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: 'A Varangian stronghold along the Dnieper route linking Scandinavia to Constantinople. Elite warrior burials illustrate how Norse military culture was transplanted deep into eastern Europe.',
  },

  // ── Russia ──────────────────────────────────────────────────────────
  {
    id: 'staraya-ladoga',
    siteName: 'Staraya Ladoga',
    country: 'Russia',
    region: 'Leningrad Oblast',
    coordinates: [32.30, 59.99],
    coordinatesCertainty: 'confirmed',
    dateStart: 750,
    dateEnd: 950,
    periodLabel: 'Viking Age',
    burialContextType: 'trade settlement cemetery',
    burialDescription:
      'One of the earliest Varangian settlements in Eastern Europe. Key gateway site between Scandinavia and the Kievan Rus\u2019 along the Volkhov river route.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['russia', 'varangian', 'trade_town', 'ladoga', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK162', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK163', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: 'Founded c. 753, Staraya Ladoga is arguably the earliest Scandinavian settlement in Eastern Europe and the gateway to the Volga and Dnieper trade routes that connected the Norse world to the Islamic caliphates and Byzantium.',
  },

  // ── Ireland ─────────────────────────────────────────────────────────
  {
    id: 'dublin-ship-street',
    siteName: 'Ship Street Great, Dublin',
    country: 'Ireland',
    region: 'Dublin',
    coordinates: [-6.27, 53.34],
    coordinatesCertainty: 'confirmed',
    dateStart: 850,
    dateEnd: 1050,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription:
      'Viking-age cemetery in the heart of Norse Dublin. Excavations revealed burials with Scandinavian cultural markers near the site of the original longphort.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: 'Mixed Scandinavian and local Irish isotopic signatures.',
    tags: ['ireland', 'dublin', 'cemetery', 'norse_town', 'viking_age'],
    samples: [
      { sampleId: 'VK180', yDnaHaplogroup: null, mtDnaHaplogroup: null },
      { sampleId: 'VK181', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: 'Norse Dublin was one of the most important Viking settlements outside Scandinavia and a key hub of the slave and silver trade connecting the Irish Sea to the wider Viking world.',
  },
  {
    id: 'islandbridge-kilmainham',
    siteName: 'Islandbridge–Kilmainham',
    country: 'Ireland',
    region: 'Dublin',
    coordinates: [-6.32, 53.35],
    coordinatesCertainty: 'confirmed',
    dateStart: 840,
    dateEnd: 950,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription:
      'Large Viking warrior cemetery near the River Liffey, the principal burial ground of the earliest Norse settlers in Dublin.',
    assemblageSizeNote: 'Several hundred burials excavated across multiple campaigns.',
    traumaNote: null,
    isotopeNote: null,
    tags: ['ireland', 'dublin', 'warrior', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK182', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: "The largest-known Viking-age burial ground in Ireland, yielding rich weapon burials and oval brooches that signal the community's strong ties to Norway and the Norse diaspora in Scotland.",
  },

  // ── Isle of Man ───────────────────────────────────────────────────────
  {
    id: 'ballateare-man',
    siteName: 'Ballateare',
    country: 'Isle of Man',
    region: null,
    coordinates: [-4.50, 54.32],
    coordinatesCertainty: 'confirmed',
    dateStart: 900,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'burial mound',
    burialDescription:
      'Viking-age mound burial on the Isle of Man with a male interment accompanied by weapons and possible female sacrifice.',
    assemblageSizeNote: null,
    traumaNote: 'Possible ritual killing of accompanying female.',
    isotopeNote: null,
    tags: ['isle_of_man', 'burial_mound', 'elite', 'viking_age'],
    samples: [
      { sampleId: 'VK119', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: "The Isle of Man was a strategic Viking-age crossroads between Ireland, Scotland, and northern England. Ballateare's mound burial reflects a transplanted Scandinavian mortuary tradition in the Irish Sea zone.",
  },

  // ── Italy ─────────────────────────────────────────────────────────────
  {
    id: 'foggia-italy',
    siteName: 'Foggia (Siponto area)',
    country: 'Italy',
    region: 'Puglia',
    coordinates: [15.55, 41.46],
    coordinatesCertainty: 'probable',
    dateStart: 1000,
    dateEnd: 1100,
    periodLabel: 'Norman / Post-Viking',
    burialContextType: 'cemetery',
    burialDescription:
      'Burials in the Siponto–Foggia area of Puglia, attributed to Norman settlers in southern Italy who descended from Scandinavian stock.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['italy', 'puglia', 'norman', 'post_viking', 'southern_italy'],
    samples: [
      { sampleId: 'VK546', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
    significanceNote: 'A rare genetic window into the Norman colonisation of southern Italy. These Norman settlers carried Viking-era Scandinavian ancestry southward into the Mediterranean, connecting the Norse world to the kingdom of Sicily.',
  },

  // ── Lithuania ─────────────────────────────────────────────────────────
  {
    id: 'palanga-lithuania',
    siteName: 'Palanga',
    country: 'Lithuania',
    region: null,
    coordinates: [20.93, 55.92],
    coordinatesCertainty: 'confirmed',
    dateStart: 850,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    burialContextType: 'cemetery',
    burialDescription:
      'Cemetery on the Baltic coast of Lithuania. Burial culture reflects both local Baltic and Scandinavian influence during the Viking age.',
    assemblageSizeNote: null,
    traumaNote: null,
    isotopeNote: null,
    tags: ['lithuania', 'baltic', 'cemetery', 'viking_age'],
    samples: [
      { sampleId: 'VK550', yDnaHaplogroup: null, mtDnaHaplogroup: null },
    ],
    sourceCitation: MARGARYAN_CITATION,
    doi: MARGARYAN_DOI,
  },
];

// ---------------------------------------------------------------------------
// Filter option derivation — used by LayerPanel UI
// ---------------------------------------------------------------------------

export function getVikingAdnaFilterOptions() {
  const countries = new Set<string>();
  const contexts = new Set<string>();
  const tags = new Set<string>();
  for (const s of vikingAdnaSites) {
    countries.add(s.country);
    if (s.burialContextType) contexts.add(s.burialContextType);
    for (const t of s.tags) tags.add(t);
  }
  return {
    countries: Array.from(countries).sort(),
    contexts: Array.from(contexts).sort(),
    tags: Array.from(tags).sort(),
  };
}

// ---------------------------------------------------------------------------
// GeoJSON builder — one Feature per site with coordinates.
// ---------------------------------------------------------------------------

export interface VikingAdnaFeatureProperties {
  id: string;
  siteName: string;
  country: string;
  region: string | null;
  dateStart: number;
  dateEnd: number;
  periodLabel: string;
  burialContextType: string | null;
  tags: string;
  sampleCount: number;
  sampleIds: string;
  atlasIcon: string;
  coordinatesCertainty: string;
}

export function buildVikingAdnaGeoJson(): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: vikingAdnaSites
      .filter((s) => s.coordinates !== null)
      .map((s) => ({
        type: 'Feature' as const,
        properties: {
          id: s.id,
          siteName: s.siteName,
          country: s.country,
          region: s.region,
          dateStart: s.dateStart,
          dateEnd: s.dateEnd,
          periodLabel: s.periodLabel,
          burialContextType: s.burialContextType,
          tags: s.tags.join(', '),
          sampleCount: s.samples.length,
          sampleIds: s.samples.map((sm) => sm.sampleId).join(', '),
          atlasIcon: getFeatureIconType({ tags: s.tags, label: s.siteName }),
          coordinatesCertainty: s.coordinatesCertainty,
        } satisfies VikingAdnaFeatureProperties,
        geometry: {
          type: 'Point' as const,
          coordinates: s.coordinates!,
        },
      })),
  };
}
