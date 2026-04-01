import { getFeatureIconType } from '@/lib/atlas/getFeatureIconType';

// ---------------------------------------------------------------------------
// Viking-age archaeology sites (non-genetic). Well-attested sites only,
// with explicit citations. These do NOT overlap with the aDNA dataset
// except where noted via relatedAdnaSiteIds.
// ---------------------------------------------------------------------------

export type VikingArchSiteType =
  | 'emporium'
  | 'fortification'
  | 'assembly'
  | 'hoard'
  | 'settlement'
  | 'burial_mound'
  | 'monastery'
  | 'runestone'
  | 'ship_find';

export interface VikingArchExternalLink {
  label: string;
  url: string;
}

export interface VikingArchaeologySite {
  id: string;
  name: string;
  country: string;
  region: string | null;
  coordinates: [number, number];
  dateStart: number;
  dateEnd: number;
  periodLabel: string;
  siteType: VikingArchSiteType;
  description: string;
  significanceNote?: string;
  citation: string;
  wikipediaUrl?: string;
  externalLinks?: VikingArchExternalLink[];
  relatedAdnaSiteIds?: string[];
  tags: string[];
}

export const vikingArchaeologySites: VikingArchaeologySite[] = [
  // ── Scandinavia — Emporia & Urban ─────────────────────────────────
  {
    id: 'birka-sweden',
    name: 'Birka',
    country: 'Sweden',
    region: 'Björkö, Lake Mälaren',
    coordinates: [17.55, 59.33],
    dateStart: 750,
    dateEnd: 975,
    periodLabel: 'Viking Age',
    siteType: 'emporium',
    description: 'Major Viking-age trading town on the island of Björkö. UNESCO World Heritage Site. One of the earliest urban centres in Scandinavia with a permanent garrison and international trade connections.',
    significanceNote: 'Birka was the prototype Viking trade town — the first Swedish site with a permanent urban population, drawing merchants from the Caliphate, Byzantium, and western Europe.',
    citation: 'Ambrosiani & Clarke, Birka Studies (1992–2003); UNESCO WHS nomination.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Birka',
    tags: ['sweden', 'trade_town', 'unesco', 'viking_age'],
  },
  {
    id: 'uppakra-sweden',
    name: 'Uppåkra',
    country: 'Sweden',
    region: 'Scania',
    coordinates: [13.21, 55.60],
    dateStart: 100,
    dateEnd: 1050,
    periodLabel: 'Iron Age – Viking Age',
    siteType: 'settlement',
    description: 'One of the largest and longest-lived central places in southern Scandinavia, occupied from the Roman Iron Age through the Viking period. Richly furnished cult house and elite metalwork.',
    citation: 'Larsson (ed.), Continuity for Centuries: A Ceremonial Building and its Context at Uppåkra, Almqvist & Wiksell (2004).',
    tags: ['sweden', 'scania', 'central_place', 'cult_site', 'viking_age'],
  },
  {
    id: 'jelling-denmark',
    name: 'Jelling Monuments',
    country: 'Denmark',
    region: 'Jutland',
    coordinates: [9.42, 55.75],
    dateStart: 935,
    dateEnd: 985,
    periodLabel: 'Viking Age',
    siteType: 'burial_mound',
    description: 'Royal monument complex with two massive mounds, runestones, and a wooden palisade. The larger runestone, raised by Harald Bluetooth, proclaims the Christianisation of Denmark. UNESCO World Heritage Site.',
    significanceNote: "Jelling is Denmark's 'royal birth certificate' — Harald Bluetooth's runestone is the first written record naming Denmark as a kingdom and marking its conversion to Christianity.",
    citation: 'Krogh, The Royal Viking-Age Monuments at Jelling, Copenhagen (1982); UNESCO WHS.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Jelling_stones',
    tags: ['denmark', 'jutland', 'royal', 'runestone', 'burial_mound', 'unesco', 'viking_age'],
  },
  {
    id: 'fyrkat-denmark',
    name: 'Fyrkat',
    country: 'Denmark',
    region: 'Jutland, Hobro',
    coordinates: [9.77, 56.63],
    dateStart: 980,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    siteType: 'fortification',
    description: "One of Harald Bluetooth's ring fortresses (c. 980) near Hobro. Geometric circular enclosure with four gateways, axial roads, and 16 longhouses.",
    citation: 'Olsen & Schmidt, Fyrkat: en jysk vikingeborg, Copenhagen (1977).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Fyrkat',
    relatedAdnaSiteIds: ['trelleborg-slagelse'],
    tags: ['denmark', 'jutland', 'ring_fortress', 'military', 'viking_age'],
  },
  {
    id: 'aggersborg-denmark',
    name: 'Aggersborg',
    country: 'Denmark',
    region: 'Jutland, Limfjord',
    coordinates: [9.25, 56.99],
    dateStart: 980,
    dateEnd: 1000,
    periodLabel: 'Viking Age',
    siteType: 'fortification',
    description: 'The largest of the Trelleborg-type ring fortresses, with an inner diameter of 240 m. Located at a strategic crossing of the Limfjord. 48 longhouses in the interior.',
    citation: 'Roesdahl, Aggersborg — The Viking-Age Settlement and Fortress, Jutland Archaeological Society (2014).',
    tags: ['denmark', 'jutland', 'ring_fortress', 'military', 'viking_age'],
  },
  {
    id: 'thingvellir-iceland',
    name: 'Þingvellir (Thingvellir)',
    country: 'Iceland',
    region: null,
    coordinates: [-21.12, 64.26],
    dateStart: 930,
    dateEnd: 1262,
    periodLabel: 'Viking Age – Medieval',
    siteType: 'assembly',
    description: 'Site of the Althing, the Icelandic general assembly founded in 930 — one of the oldest parliamentary institutions in the world. UNESCO World Heritage Site.',
    significanceNote: "The Althing at Þingvellir is the cradle of Icelandic democracy. Viking-age settlers created a decentralised legal system here that governed the island without a king for over three centuries.",
    citation: 'Byock, Viking Age Iceland, Penguin (2001); UNESCO WHS.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/%C3%9Eingvellir',
    tags: ['iceland', 'assembly', 'unesco', 'viking_age'],
  },
  {
    id: 'gokstad-norway',
    name: 'Gokstad Ship Mound',
    country: 'Norway',
    region: 'Vestfold',
    coordinates: [10.24, 59.15],
    dateStart: 900,
    dateEnd: 910,
    periodLabel: 'Viking Age',
    siteType: 'burial_mound',
    description: 'Ship burial containing a clinker-built vessel (c. 23.2 m) and a high-status male. The Gokstad ship is one of the finest preserved Viking ships and is displayed at the Viking Ship Museum, Oslo.',
    significanceNote: 'The Gokstad ship demonstrated that Viking vessels were genuinely ocean-capable — a replica crossed the Atlantic in 1893.',
    citation: 'Nicolaysen, The Viking-Ship Discovered at Gokstad, Kristiania (1882).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Gokstad_ship',
    tags: ['norway', 'vestfold', 'ship_burial', 'elite', 'viking_age'],
  },
  {
    id: 'oseberg-norway',
    name: 'Oseberg Ship Mound',
    country: 'Norway',
    region: 'Vestfold',
    coordinates: [10.23, 59.31],
    dateStart: 834,
    dateEnd: 834,
    periodLabel: 'Viking Age',
    siteType: 'burial_mound',
    description: 'Richly furnished ship burial of two women, sealed in blue clay in 834. The Oseberg ship, with its elaborate carvings and large assemblage of grave goods (textiles, a cart, animal-head posts), is one of the most spectacular finds of the Viking age.',
    significanceNote: 'Oseberg is the richest Viking-age female burial ever found, redefining scholarly understanding of women\'s status and ritual roles in Norse society.',
    citation: 'Brøgger et al., Osebergfundet, Universitetets Oldsaksamling (1917–28).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Oseberg_ship',
    tags: ['norway', 'vestfold', 'ship_burial', 'elite', 'female', 'viking_age'],
  },
  {
    id: 'borg-lofoten',
    name: 'Borg (Lofoten Chieftain\'s Hall)',
    country: 'Norway',
    region: 'Lofoten, Nordland',
    coordinates: [14.16, 68.25],
    dateStart: 500,
    dateEnd: 950,
    periodLabel: 'Migration – Viking Age',
    siteType: 'settlement',
    description: 'The largest known Viking-age longhouse (83 m). An elite chieftain\'s hall with imported glass and gold-foil gullgubber, located well above the Arctic Circle.',
    citation: 'Munch et al., Borg in Lofoten: A Chieftain\'s Farm in North Norway, Tapir Academic Press (2003).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Borg,_Lofoten',
    tags: ['norway', 'lofoten', 'arctic', 'longhouse', 'elite', 'viking_age'],
  },

  // ── British Isles ──────────────────────────────────────────────────
  {
    id: 'jorvik-york',
    name: 'Jórvík (York)',
    country: 'United Kingdom',
    region: 'England, Yorkshire',
    coordinates: [-1.08, 53.96],
    dateStart: 866,
    dateEnd: 954,
    periodLabel: 'Viking Age',
    siteType: 'settlement',
    description: 'Capital of the Viking kingdom of Jórvík, based at the Coppergate excavation site. Preserved waterlogged organic deposits revealed an entire Viking-age streetscape with workshops, trade goods, and everyday objects.',
    significanceNote: 'Coppergate is one of the most important urban archaeological excavations in northern Europe, providing an unparalleled snapshot of daily life in a Viking-age city.',
    citation: 'Hall, Viking Age York, Batsford (1994).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Jorvik',
    tags: ['england', 'yorkshire', 'danelaw', 'trade_town', 'viking_age'],
  },
  {
    id: 'repton-derbyshire',
    name: 'Repton',
    country: 'United Kingdom',
    region: 'England, Derbyshire',
    coordinates: [-1.55, 52.84],
    dateStart: 873,
    dateEnd: 874,
    periodLabel: 'Viking Age',
    siteType: 'fortification',
    description: 'Winter camp of the Great Heathen Army in 873–874, built around the Anglo-Saxon royal monastery. A charnel deposit nearby contained the disarticulated remains of at least 264 individuals.',
    significanceNote: 'Repton is the best-documented winter camp of the Great Heathen Army, proving the scale of the Scandinavian military incursion that conquered most of Anglo-Saxon England.',
    citation: 'Biddle & Kjølbye-Biddle, Repton Studies (1985–2001).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Repton',
    tags: ['england', 'derbyshire', 'great_heathen_army', 'fortification', 'viking_age'],
  },
  {
    id: 'tynwald-man',
    name: 'Tynwald Hill',
    country: 'Isle of Man',
    region: null,
    coordinates: [-4.65, 54.19],
    dateStart: 900,
    dateEnd: 1100,
    periodLabel: 'Viking Age – Medieval',
    siteType: 'assembly',
    description: 'Tiered artificial mound used as the assembly site of the Manx parliament (Tynwald), one of the oldest continuously functioning legislative bodies in the world. Norse-origin institution.',
    citation: 'Broderick & Stowell, Tynwald: A Celebration of 1000 Years, Tynwald (1979).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Tynwald',
    tags: ['isle_of_man', 'assembly', 'parliament', 'norse', 'viking_age'],
  },

  // ── Eastern Viking world ──────────────────────────────────────────
  {
    id: 'gnezdovo-russia',
    name: 'Gnezdovo',
    country: 'Russia',
    region: 'Smolensk Oblast',
    coordinates: [31.87, 54.78],
    dateStart: 850,
    dateEnd: 1050,
    periodLabel: 'Viking Age',
    siteType: 'settlement',
    description: 'Massive settlement and burial complex on the Dnieper route. Over 3,000 burial mounds — the largest concentration of Viking-age barrows in Eastern Europe. Mixed Scandinavian, Slavic, and Finnic material culture.',
    significanceNote: 'Gnezdovo is the key archaeological demonstration of the Varangian presence along the river routes between the Baltic and Byzantium, containing the largest Viking-age barrow cemetery in the world.',
    citation: 'Pushkina et al., Gnezdovo: Results of Archaeological Research, Moscow University (2012).',
    tags: ['russia', 'smolensk', 'varangian', 'settlement', 'barrow_cemetery', 'viking_age'],
  },
  {
    id: 'rurikovo-gorodishche',
    name: 'Rurikovo Gorodishche',
    country: 'Russia',
    region: 'Novgorod Oblast',
    coordinates: [31.39, 58.49],
    dateStart: 850,
    dateEnd: 1050,
    periodLabel: 'Viking Age',
    siteType: 'fortification',
    description: 'Fortified settlement at the outflow of the Volkhov from Lake Ilmen. Traditionally identified as the seat of Rurik, legendary founder of the Rus dynasty. Rich Scandinavian material culture.',
    citation: 'Nosov, Rurikovo Gorodishche: New Discoveries, Novgorod Museum (2005).',
    tags: ['russia', 'novgorod', 'varangian', 'fortification', 'viking_age'],
  },

  // ── Hoards ────────────────────────────────────────────────────────
  {
    id: 'cuerdale-hoard',
    name: 'Cuerdale Hoard',
    country: 'United Kingdom',
    region: 'England, Lancashire',
    coordinates: [-2.70, 53.76],
    dateStart: 903,
    dateEnd: 910,
    periodLabel: 'Viking Age',
    siteType: 'hoard',
    description: 'The largest Viking silver hoard found outside Russia — over 8,600 items (c. 40 kg) including hack-silver, ingots, coins, and jewellery. Deposited near the River Ribble c. 905–910.',
    significanceNote: 'The Cuerdale hoard reveals the massive wealth circulating in the Danelaw at the height of Viking power in England, and the economic networks linking York, Dublin, and the Continent.',
    citation: 'Graham-Campbell (ed.), The Cuerdale Hoard, British Museum (2011).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cuerdale_Hoard',
    tags: ['england', 'lancashire', 'hoard', 'silver', 'danelaw', 'viking_age'],
  },
  {
    id: 'spillings-hoard',
    name: 'Spillings Hoard',
    country: 'Sweden',
    region: 'Gotland',
    coordinates: [18.67, 57.77],
    dateStart: 850,
    dateEnd: 870,
    periodLabel: 'Viking Age',
    siteType: 'hoard',
    description: 'The largest known Viking-age silver hoard — over 67 kg of silver including Islamic dirhams, Frankish coins, and Baltic arm-rings, buried in two bronze vessels.',
    significanceNote: 'Spillings demonstrates the extraordinary volume of Islamic silver flowing into Scandinavia via the Volga trade route, making Gotland one of the wealthiest places in the Viking world.',
    citation: 'Östergren, "The Spillings Hoard", Gotlandica (2009).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Spillings_Hoard',
    tags: ['sweden', 'gotland', 'hoard', 'silver', 'dirhams', 'viking_age'],
  },
  {
    id: 'galloway-hoard',
    name: 'Galloway Hoard',
    country: 'United Kingdom',
    region: 'Scotland, Dumfries & Galloway',
    coordinates: [-4.07, 54.94],
    dateStart: 900,
    dateEnd: 910,
    periodLabel: 'Viking Age',
    siteType: 'hoard',
    description: 'Extraordinary mixed hoard combining Anglo-Saxon, Carolingian, Byzantine, and Irish objects — the richest collection of rare Viking-age gold and silver found in Britain or Ireland in over 150 years.',
    citation: 'Goldberg et al., The Galloway Hoard, National Museums Scotland (2021).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Galloway_Hoard',
    tags: ['scotland', 'galloway', 'hoard', 'gold', 'silver', 'viking_age'],
  },

  // ── Normandy / France ──────────────────────────────────────────────
  {
    id: 'camp-de-peran',
    name: 'Camp de Péran',
    country: 'France',
    region: 'Brittany, Côtes-d\'Armor',
    coordinates: [-2.83, 48.45],
    dateStart: 900,
    dateEnd: 940,
    periodLabel: 'Viking Age',
    siteType: 'fortification',
    description: 'Viking-age fortified camp in Brittany, one of the rare archaeologically attested Norse fortifications in France. Excavations revealed a rampart with vitrified stone and Scandinavian metalwork.',
    citation: 'Nicolardot & Guigon, "Le Camp de Péran", Dossiers du CeRAA (1991).',
    tags: ['france', 'brittany', 'fortification', 'viking_age'],
  },
  {
    id: 'ile-de-groix',
    name: 'Île de Groix Ship Burial',
    country: 'France',
    region: 'Brittany, Morbihan',
    coordinates: [-3.45, 47.63],
    dateStart: 900,
    dateEnd: 950,
    periodLabel: 'Viking Age',
    siteType: 'burial_mound',
    description: 'The only known Viking ship burial in France. A cremation grave containing a clinker-built vessel, weapons, and personal items was discovered on the island of Groix in 1906.',
    significanceNote: 'The sole Viking ship burial in continental western Europe south of the Channel, Île de Groix is tangible proof that Norse military elites established themselves along the Breton coast.',
    citation: 'Du Chatellier & Le Pontois, "La sépulture scandinave à barque de l\'Île de Groix", Bulletin de la Société Archéologique du Finistère (1908).',
    tags: ['france', 'brittany', 'ship_burial', 'elite', 'viking_age'],
  },

  // ── Ship finds ─────────────────────────────────────────────────────
  {
    id: 'roskilde-skuldelev',
    name: 'Skuldelev Ships',
    country: 'Denmark',
    region: 'Roskilde Fjord',
    coordinates: [12.07, 55.74],
    dateStart: 1030,
    dateEnd: 1060,
    periodLabel: 'Late Viking Age',
    siteType: 'ship_find',
    description: 'Five vessels deliberately scuttled as a blockade in Roskilde Fjord c. 1070. Ranging from a warship (Skuldelev 2, c. 30 m) to small cargo boats, they illustrate the full spectrum of late Viking-age shipbuilding.',
    significanceNote: 'The Skuldelev ships revolutionised our understanding of Viking naval technology — one of them (Skuldelev 2) was built in Dublin, proving the scale of cross-sea Viking shipbuilding networks.',
    citation: 'Crumlin-Pedersen & Olsen, The Skuldelev Ships I, Viking Ship Museum (2002).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Skuldelev_ships',
    tags: ['denmark', 'roskilde', 'ship_find', 'blockade', 'late_viking_age'],
  },

  // ── Runestones ─────────────────────────────────────────────────────
  {
    id: 'rok-runestone',
    name: 'Rök Runestone',
    country: 'Sweden',
    region: 'Östergötland',
    coordinates: [14.78, 58.30],
    dateStart: 800,
    dateEnd: 850,
    periodLabel: 'Viking Age',
    siteType: 'runestone',
    description: 'The longest known runic inscription (over 760 runes), carved on a 2.5 m tall granite slab. The text references legendary and historical events, including Theodoric the Great.',
    significanceNote: 'The Rök runestone is the most complex runic text ever carved. Recent reinterpretation links its enigmatic verses to climate anxiety after the catastrophic volcanic winters of 536–540.',
    citation: 'Holmberg et al., "The Rök runestone and the end of the world", Futhark (2020).',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/R%C3%B6k_runestone',
    tags: ['sweden', 'ostergotland', 'runestone', 'inscription', 'viking_age'],
  },
];

// ---------------------------------------------------------------------------
// GeoJSON builder
// ---------------------------------------------------------------------------

export interface VikingArchFeatureProperties {
  id: string;
  name: string;
  country: string;
  region: string | null;
  dateStart: number;
  dateEnd: number;
  periodLabel: string;
  siteType: VikingArchSiteType;
  tags: string;
  atlasIcon: string;
}

export function buildVikingArchGeoJson(): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: vikingArchaeologySites.map((s) => ({
      type: 'Feature' as const,
      properties: {
        id: s.id,
        name: s.name,
        country: s.country,
        region: s.region,
        dateStart: s.dateStart,
        dateEnd: s.dateEnd,
        periodLabel: s.periodLabel,
        siteType: s.siteType,
        tags: s.tags.join(', '),
        atlasIcon: getFeatureIconType({ tags: s.tags, label: s.name }),
      } satisfies VikingArchFeatureProperties,
      geometry: {
        type: 'Point' as const,
        coordinates: s.coordinates,
      },
    })),
  };
}
