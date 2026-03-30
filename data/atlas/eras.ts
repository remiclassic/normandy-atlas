import type { AtlasEra } from '@/core/types';

export const atlasEras: AtlasEra[] = [
  // ── Pre-Roman deep-time eras ──────────────────────────────────────
  {
    id: 'neolithic-normandy',
    label: { en: 'Neolithic Normandy', fr: 'Normandie néolithique' },
    range: { start: -5000, end: -2000 },
    defaultCamera: { center: [-0.5, 49.1], zoom: 6.8 },
    transitions: [{ toEraId: 'bronze-age-channel', trigger: 'user' }],
    timelineGroup: 'deep-time',
    summary: {
      en: 'The first farming communities settled the river valleys and coastal plains of what would become Normandy. They raised dolmens, menhirs, and allées couvertes — stone monuments that marked burial sites, sacred gathering places, and territorial claims over the landscape for more than three thousand years.',
      fr: 'Les premières communautés agricoles s\'installèrent dans les vallées fluviales et les plaines côtières de la future Normandie. Elles érigèrent dolmens, menhirs et allées couvertes — des monuments de pierre marquant sépultures, lieux de rassemblement sacrés et revendications territoriales sur le paysage pendant plus de trois millénaires.',
    },
  },
  {
    id: 'bronze-age-channel',
    label: { en: 'Bronze Age Channel', fr: 'Manche à l\'âge du bronze' },
    range: { start: -2000, end: -800 },
    defaultCamera: { center: [-1.0, 49.5], zoom: 5.8 },
    transitions: [{ toEraId: 'iron-age-gaul', trigger: 'user' }],
    timelineGroup: 'deep-time',
    summary: {
      en: 'The Channel was not a barrier but a highway. Tin from Cornwall and copper from Iberia crossed the strait, turning Normandy\'s coast into a gateway corridor. Coastal settlements thrived on metal exchange, and the maritime networks that emerged would be reused — millennia later — by Viking longships.',
      fr: 'La Manche n\'était pas une barrière mais une autoroute. L\'étain de Cornouailles et le cuivre d\'Ibérie traversaient le détroit, faisant de la côte normande un corridor de transit. Les établissements côtiers prospéraient grâce au commerce des métaux, et les réseaux maritimes qui en émergèrent seraient réutilisés — des millénaires plus tard — par les drakkars vikings.',
    },
  },
  {
    id: 'iron-age-gaul',
    label: { en: 'Iron Age Gaul', fr: 'Gaule de l\'âge du fer' },
    range: { start: -800, end: -52 },
    defaultCamera: { center: [0.0, 49.2], zoom: 6.4 },
    transitions: [{ toEraId: 'roman-gaul', trigger: 'user' }],
    timelineGroup: 'deep-time',
    summary: {
      en: 'Powerful Celtic tribes — the Caletes, Veliocasses, Unelli, and Abrincates — carved out territories across the region. Fortified hilltop oppida served as proto-cities and defensive strongholds. The Seine valley, already an ancient artery, became the economic backbone of the Veliocasses, whose capital at Rotomagus (Rouen) would outlast all of them.',
      fr: 'De puissantes tribus celtes — les Calètes, les Véliocasses, les Unelles et les Abrincates — découpèrent des territoires à travers la région. Des oppida fortifiés sur les hauteurs servaient de proto-cités et de places fortes défensives. La vallée de la Seine, déjà une artère ancienne, devint l\'épine dorsale économique des Véliocasses, dont la capitale Rotomagus (Rouen) survivrait à tous.',
    },
  },
  {
    id: 'roman-gaul',
    label: { en: 'Roman Gaul', fr: 'Gaule romaine' },
    range: { start: -52, end: 400 },
    defaultCamera: { center: [0.5, 49.0], zoom: 5.8 },
    transitions: [{ toEraId: 'post-roman-gaul', trigger: 'user' }],
    timelineGroup: 'deep-time',
    summary: {
      en: 'After Caesar\'s conquest, tribal territories became Roman civitates. Roads replaced forest trails, amphitheatres rose beside oppida, and Rotomagus grew into a major provincial capital. The same river corridors that had served Celtic trade now carried Roman grain barges — and the same coastal forts would later shelter Saxon Shore defences as the empire crumbled.',
      fr: 'Après la conquête de César, les territoires tribaux devinrent des civitates romaines. Les routes remplacèrent les sentiers forestiers, des amphithéâtres s\'élevèrent à côté des oppida, et Rotomagus devint une grande capitale provinciale. Les mêmes corridors fluviaux qui avaient servi le commerce celte transportaient désormais les péniches de grain romaines — et les mêmes forts côtiers abriteraient plus tard les défenses du Litus Saxonicum alors que l\'empire s\'effondrait.',
    },
  },
  // ── Post-Roman → Medieval ─────────────────────────────────────────
  {
    id: 'post-roman-gaul',
    label: { en: 'Post-Roman Gaul', fr: 'Gaule post-romaine' },
    range: { start: 400, end: 511 },
    defaultCamera: { center: [1.5, 48.8], zoom: 5.0 },
    transitions: [{ toEraId: 'neustria', trigger: 'user' }],
    timelineGroup: 'medieval',
  },
  {
    id: 'neustria',
    label: { en: 'Neustria', fr: 'Neustrie' },
    range: { start: 511, end: 751 },
    defaultCamera: { center: [1.2, 49.0], zoom: 5.4 },
    transitions: [{ toEraId: 'frankish-carolingian', trigger: 'user' }],
    timelineGroup: 'medieval',
  },
  {
    id: 'frankish-carolingian',
    label: { en: 'Frankish & Carolingian Frontier', fr: 'Frontière franque et carolingienne' },
    range: { start: 751, end: 841 },
    defaultCamera: { center: [1.5, 49.0], zoom: 5.2 },
    transitions: [{ toEraId: 'viking-age', trigger: 'user' }],
    timelineGroup: 'medieval',
    summary: {
      en: 'The Carolingian dynasty united Gaul under a single crown, transforming Neustria from a rival sub-kingdom into an administered heartland. Wealthy abbeys like Jumièges and Saint-Wandrille lined the Seine, and the emporium at Quentovic linked the Channel coast to North Sea trade. Yet Carolingian authority frayed after 840 as civil wars fragmented the empire — leaving the Seine corridor and its monastic riches exposed to the first Norse raids.',
      fr: 'La dynastie carolingienne unifia la Gaule sous une seule couronne, transformant la Neustrie d\'un sous-royaume rival en un cœur administré. De riches abbayes comme Jumièges et Saint-Wandrille bordaient la Seine, et l\'emporium de Quentovic reliait la côte de la Manche au commerce de la mer du Nord. Mais l\'autorité carolingienne s\'effrita après 840, les guerres civiles fragmentant l\'empire — laissant le corridor de la Seine et ses richesses monastiques exposés aux premiers raids scandinaves.',
    },
  },
  {
    id: 'viking-age',
    label: { en: 'Viking Age', fr: 'Ère viking' },
    range: { start: 841, end: 911 },
    defaultCamera: { center: [1.0, 49.3], zoom: 5.6 },
    transitions: [{ toEraId: 'norman-origins', trigger: 'user' }],
    timelineGroup: 'medieval',
  },
  {
    id: 'norman-origins',
    label: { en: 'Norman Origins', fr: 'Origines normandes' },
    range: { start: 911, end: 1066 },
    defaultCamera: { center: [1.0, 49.2], zoom: 5.2 },
    transitions: [{ toEraId: 'norman-expansion', trigger: 'user' }],
    timelineGroup: 'medieval',
  },
  {
    id: 'norman-expansion',
    label: { en: 'Norman Expansion', fr: 'Expansion normande' },
    range: { start: 1066, end: 1450 },
    defaultCamera: { center: [0.2, 49.5], zoom: 4.6 },
    transitions: [{ toEraId: 'age-of-exploration', trigger: 'user' }],
    timelineGroup: 'medieval',
  },
  // ── Atlantic / colonial ───────────────────────────────────────────
  {
    id: 'age-of-exploration',
    label: { en: 'Age of Exploration', fr: 'Âge des explorations' },
    range: { start: 1450, end: 1608 },
    defaultCamera: { center: [-25.0, 46.0], zoom: 2.6 },
    transitions: [{ toEraId: 'new-france-foundations', trigger: 'user' }],
    timelineGroup: 'atlantic',
  },
  {
    id: 'new-france-foundations',
    label: { en: 'New France Foundations', fr: 'Fondations de la Nouvelle-France' },
    range: { start: 1608, end: 1663 },
    defaultCamera: { center: [-45.0, 47.0], zoom: 2.9 },
    transitions: [{ toEraId: 'royal-new-france', trigger: 'user' }],
    timelineGroup: 'atlantic',
  },
  {
    id: 'royal-new-france',
    label: { en: 'Royal New France', fr: 'Nouvelle-France royale' },
    range: { start: 1663, end: 1713 },
    defaultCamera: { center: [-61.0, 47.0], zoom: 3.2 },
    transitions: [{ toEraId: 'atlantic-imprint', trigger: 'user' }],
    timelineGroup: 'atlantic',
  },
  {
    id: 'atlantic-imprint',
    label: { en: 'Atlantic Imprint', fr: 'Empreinte atlantique' },
    range: { start: 1713, end: 1763 },
    defaultCamera: { center: [-58.0, 46.5], zoom: 3.1 },
    transitions: [],
    timelineGroup: 'atlantic',
  },
];

export const DEFAULT_ATLAS_ERA_ID = 'neolithic-normandy';
