import type { I18nString } from '@/core/types';

export type StoryCategory =
  | 'Origins'
  | 'Conquest'
  | 'Expansion'
  | 'Exploration'
  | 'New France'
  | 'People'
  | 'Legacy';

export const STORY_CATEGORY_ORDER: StoryCategory[] = [
  'Origins',
  'Conquest',
  'Expansion',
  'Exploration',
  'New France',
  'People',
  'Legacy',
];

export type StoryTone = 'epic' | 'dark' | 'exploratory' | 'foundational' | 'personal';

export interface StoryLibraryMeta {
  arcId: string | null;
  category: StoryCategory;
  displayTitle?: I18nString;
  blurb: I18nString;
  hook?: I18nString;
  featured?: boolean;
  isNew?: boolean;
  thumb?: string;
  estimatedMinutes?: number;
  tone?: StoryTone;
  sortOrder?: number;
  recommendedEraId?: string;
  synopsisExtended?: I18nString;
  posterCredit?: I18nString;
}

/**
 * One meta row per library card. `arcId: null` is the full chronological atlas story.
 * Merge with `atlasEraArcs` for labels and chrome; scene counts come from `getBeatCount`.
 */
export const storyLibraryMetaList: StoryLibraryMeta[] = [
  {
    arcId: null,
    category: 'Legacy',
    sortOrder: 0,
    thumb: '/story/thumbs/full-atlas.jpg',
    displayTitle: {
      en: 'Full atlas chronicle',
      fr: 'Chronique complète de l’atlas',
      es: 'Crónica completa del atlas',
      it: 'Cronaca completa dell’atlante',
    },
    blurb: {
      en: 'Walk the entire deep-time timeline in one continuous journey—from the first stone monuments to the Atlantic imprint.',
      fr: 'Parcourez toute la ligne du temps en un seul récit — des premiers monuments de pierre à l’empreinte atlantique.',
      es: 'Recorre toda la línea temporal en un solo relato continuo.',
      it: 'Percorri l’intera linea del tempo in un unico racconto continuo.',
    },
    hook: {
      en: 'Every era, one uninterrupted narrative across the map.',
      fr: 'Chaque ère, un récit sans coupure sur la carte.',
      es: 'Cada época, una sola narrativa sobre el mapa.',
      it: 'Ogni epoca, un’unica narrazione sulla mappa.',
    },
    estimatedMinutes: 45,
    tone: 'epic',
    posterCredit: { en: 'David Roberts, Public domain' },
  },
  {
    arcId: 'normandy-to-new-world',
    category: 'Legacy',
    featured: true,
    sortOrder: 1,
    thumb: '/story/thumbs/normandy-to-new-world.jpg',
    recommendedEraId: 'norman-origins',
    displayTitle: {
      en: 'From Vikings to the New World',
      fr: 'Des Vikings au Nouveau Monde',
      es: 'De vikingos al Nuevo Mundo',
      it: 'Dai vichinghi al Nuovo Mondo',
    },
    hook: {
      en: 'How raiders became rulers—and how Normandy reached across the Atlantic.',
      fr: 'Comment des raiders devinrent princes — et comment la Normandie franchit l’Atlantique.',
      es: 'De incursiones vikingas a un ducado que se proyectó al Atlántico.',
      it: 'Da predoni vichinghi a duchi che posarono sul Nuovo Mondo.',
    },
    blurb: {
      en: 'The flagship arc: Scandinavian settlement, Norman statecraft, expansion, exploration, and New France—told as one braided story.',
      fr: 'L’arc phare : installation scandinave, État normand, expansion, exploration et Nouvelle-France — comme un seul récit tressé.',
      es: 'El gran arco normando: del asentamiento escandinavo al Atlántico.',
      it: 'Il grande arco: dallo scandinavo al mondo atlantico.',
    },
    estimatedMinutes: 18,
    tone: 'epic',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'neolithic-normandy',
    category: 'Origins',
    sortOrder: 10,
    thumb: '/story/thumbs/neolithic-normandy.jpg',
    blurb: {
      en: 'Megaliths and the first farmers—the deepest layer of human presence in the landscape.',
      fr: 'Mégalithes et premiers agriculteurs — la couche la plus profonde du paysage.',
    },
    estimatedMinutes: 4,
    tone: 'foundational',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'bronze-age-channel',
    category: 'Origins',
    sortOrder: 11,
    thumb: '/story/thumbs/bronze-age-channel.jpg',
    blurb: {
      en: 'The Channel as a Bronze Age highway—metal, exchange, and coastal nodes that prefigure later seafaring.',
      fr: 'La Manche comme route de l’âge du bronze — métaux, échanges et rivages qui annoncent la navigation.',
    },
    estimatedMinutes: 4,
    tone: 'exploratory',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'leif-erikson',
    category: 'Exploration',
    featured: true,
    sortOrder: 5,
    thumb: '/story/thumbs/leif-erikson.jpg',
    recommendedEraId: 'viking-age',
    displayTitle: {
      en: 'Leif Erikson — Vinland and beyond',
      fr: 'Leif Erikson — le Vinland et au-delà',
      es: 'Leif Erikson — Vinlandia y más allá',
      it: 'Leif Erikson — Vinland e oltre',
    },
    hook: {
      en: 'The first European to set foot in the Americas — and why the world forgot.',
      fr: 'Le premier Européen à poser le pied en Amérique — et pourquoi le monde oublia.',
      es: 'El primer europeo en pisar América — y por qué el mundo lo olvidó.',
      it: 'Il primo europeo a mettere piede nelle Americhe — e perché il mondo dimenticò.',
    },
    blurb: {
      en: 'An eight-chapter cinematic journey from the fjords of Norway to L\'Anse aux Meadows — and full circle to New France. Exploration and impact views reveal how the Norse Atlantic failure shaped what came after.',
      fr: 'Un voyage cinématique en huit chapitres, des fjords de Norvège à L\'Anse aux Meadows — et retour vers la Nouvelle-France. Les modes exploration et impact révèlent comment l\'échec atlantique norrois façonna ce qui suivit.',
      es: 'Un viaje cinematográfico en ocho capítulos, de los fiordos de Noruega a L\'Anse aux Meadows — y de vuelta a Nueva Francia.',
      it: 'Un viaggio cinematico in otto capitoli, dai fiordi della Norvegia a L\'Anse aux Meadows — e ritorno alla Nuova Francia.',
    },
    estimatedMinutes: 12,
    tone: 'dark',
    posterCredit: { en: 'Christian Krohg, Public domain' },
  },
  {
    arcId: 'iron-age-gaul',
    category: 'Origins',
    sortOrder: 12,
    thumb: '/story/thumbs/iron-age-gaul.jpg',
    blurb: {
      en: 'Tribes, oppida, and river corridors before Rome remade the map.',
      fr: 'Tribus, oppida et corridors fluviaux avant que Rome remodele la carte.',
    },
    estimatedMinutes: 5,
    tone: 'foundational',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'roman-gaul',
    category: 'Origins',
    sortOrder: 13,
    thumb: '/story/thumbs/roman-gaul.jpg',
    blurb: {
      en: 'Provinces, roads, and Rotomagus—Roman infrastructure over a Celtic landscape.',
      fr: 'Provinces, voies et Rotomagus — la couche romaine sur un paysage celte.',
    },
    estimatedMinutes: 5,
    tone: 'foundational',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'post-roman-gaul',
    category: 'Origins',
    sortOrder: 14,
    thumb: '/story/thumbs/post-roman-gaul.jpg',
    blurb: {
      en: 'After the legions: fragmented power, rising elites, and the shaping of what comes next.',
      fr: 'Après les légions : pouvoir fragmenté, élites nouvelles et préparation des siècles suivants.',
    },
    estimatedMinutes: 4,
    tone: 'dark',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'neustria',
    category: 'Origins',
    sortOrder: 15,
    thumb: '/story/thumbs/neustria.jpg',
    blurb: {
      en: 'The Frankish coastal march: theaters of raid, treaty, and negotiation on the Seine.',
      fr: 'La marche côtière franque : raids, traités et négociations sur la Seine.',
    },
    estimatedMinutes: 4,
    tone: 'dark',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'frankish-carolingian',
    category: 'Origins',
    sortOrder: 16,
    thumb: '/story/thumbs/frankish-carolingian.jpg',
    blurb: {
      en: 'Carolingian frontiers and coastal defense before the longships returned in force.',
      fr: 'Frontières carolingiennes et défense côtière avant le retour des longs navires.',
    },
    estimatedMinutes: 4,
    tone: 'foundational',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'viking-age',
    category: 'Conquest',
    sortOrder: 20,
    thumb: '/story/thumbs/viking-age.jpg',
    blurb: {
      en: 'Raiding, river ascents, and the scramble for tribute along the Channel coast.',
      fr: 'Incursions, remontées de fleuves et quête de tribut le long de la Manche.',
    },
    estimatedMinutes: 6,
    tone: 'epic',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'norman-origins',
    category: 'Conquest',
    sortOrder: 21,
    thumb: '/story/thumbs/norman-origins.jpg',
    hook: {
      en: 'From the treaty of Saint-Clair-sur-Epte to a Christian Norman polity.',
      fr: 'Du traité de Saint-Clair-sur-Epte à une Normandie chrétienne et structurée.',
    },
    blurb: {
      en: 'Rollo’s world: settlement, conversion, and the forging of a hybrid maritime duchy.',
      fr: 'Le monde de Rollo : installation, conversion et forge d’un duché maritime hybride.',
    },
    estimatedMinutes: 7,
    tone: 'epic',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'norman-expansion',
    category: 'Expansion',
    sortOrder: 30,
    thumb: '/story/thumbs/norman-expansion.jpg',
    blurb: {
      en: 'Norman arms and ambition beyond the duchy—England, the Mediterranean, and the wider medieval stage.',
      fr: 'Les armes et l’ambition normandes hors du duché — Angleterre, Méditerranée et scène médiévale.',
    },
    estimatedMinutes: 8,
    tone: 'epic',
    posterCredit: { en: 'Bayeux Tapestry, Public domain' },
  },
  {
    arcId: 'age-of-exploration',
    category: 'Exploration',
    sortOrder: 40,
    thumb: '/story/thumbs/age-of-exploration.jpg',
    blurb: {
      en: 'Maritime discovery, Atlantic crossings, and the geographic imagination of early modern Europe.',
      fr: 'Découvertes maritimes, traversées de l’Atlantique et imaginaire géographique de l’Europe moderne naissante.',
    },
    estimatedMinutes: 6,
    tone: 'exploratory',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'new-france',
    category: 'New France',
    sortOrder: 50,
    thumb: '/story/thumbs/new-france.jpg',
    blurb: {
      en: 'Foundations, royal colony, and the cultural imprint of French North America.',
      fr: 'Fondations, colonie royale et empreinte culturelle de l’Amérique française.',
    },
    estimatedMinutes: 7,
    tone: 'foundational',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'guillaume-couture',
    category: 'People',
    sortOrder: 60,
    isNew: true,
    thumb: '/story/guillaume-couture/voyageur-canoe.jpg',
    blurb: {
      en: 'One documented life—capture, negotiation, and belonging—etched onto the map.',
      fr: 'Une vie documentée — capture, négociation et appartenance — inscrite sur la carte.',
    },
    estimatedMinutes: 5,
    tone: 'personal',
  },
  {
    arcId: 'rollo-lifetime',
    category: 'People',
    sortOrder: 61,
    isNew: true,
    thumb: '/story/thumbs/rollo-lifetime.jpg',
    recommendedEraId: 'viking-age',
    displayTitle: {
      en: 'Rollo — From Viking to Duke',
      fr: 'Rollon — Du Viking au Duc',
      es: 'Rollo — Del vikingo al duque',
      it: 'Rollone — Da vichingo a duca',
    },
    hook: {
      en: 'The Norseman who turned a river of raids into a dynasty.',
      fr: 'Le Nordique qui transforma un fleuve de raids en dynastie.',
      es: 'El nórdico que convirtió un río de raids en una dinastía.',
      it: 'Il nordico che trasformò un fiume di razzie in una dinastia.',
    },
    blurb: {
      en: 'Follow Rollo from uncertain Scandinavian origins through the siege of Chartres, the treaty of Saint-Clair-sur-Epte, baptism at Rouen, and the founding of the Norman dynasty.',
      fr: 'Suivez Rollon de ses origines scandinaves incertaines au siège de Chartres, au traité de Saint-Clair-sur-Epte, au baptême à Rouen et à la fondation de la dynastie normande.',
      es: 'Siga a Rollo desde sus inciertos orígenes escandinavos hasta el sitio de Chartres, el tratado de Saint-Clair-sur-Epte, el bautismo en Rouen y la fundación de la dinastía normanda.',
      it: 'Segui Rollone dalle incerte origini scandinave all\'assedio di Chartres, al trattato di Saint-Clair-sur-Epte, al battesimo a Rouen e alla fondazione della dinastia normanna.',
    },
    estimatedMinutes: 7,
    tone: 'personal',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'william-conqueror',
    category: 'Conquest',
    sortOrder: 22,
    isNew: true,
    thumb: '/story/william-conqueror/bayeux-tapestry-fleet.jpg',
    recommendedEraId: 'norman-origins',
    displayTitle: {
      en: 'William the Conqueror',
      fr: 'Guillaume le Conquérant',
      es: 'Guillermo el Conquistador',
      it: 'Guglielmo il Conquistatore',
    },
    hook: {
      en: 'From bastard child to master of England — the life that changed Europe.',
      fr: 'De l\'enfant bâtard au maître de l\'Angleterre — la vie qui changea l\'Europe.',
      es: 'Del hijo bastardo al dueño de Inglaterra — la vida que cambió Europa.',
      it: 'Da figlio bastardo a signore dell\'Inghilterra — la vita che cambiò l\'Europa.',
    },
    blurb: {
      en: 'Follow William from his precarious birth at Falaise through civil war, the conquest of England at Hastings, and the forging of a cross-Channel empire.',
      fr: 'Suivez Guillaume de sa naissance précaire à Falaise à travers la guerre civile, la conquête de l\'Angleterre à Hastings et la forge d\'un empire transmanche.',
      es: 'Siga a Guillermo desde su precario nacimiento en Falaise a través de la guerra civil, la conquista de Inglaterra en Hastings y la forja de un imperio transmanchino.',
      it: 'Segui Guglielmo dalla nascita precaria a Falaise attraverso la guerra civile, la conquista dell\'Inghilterra a Hastings e la forgiatura di un impero attraverso la Manica.',
    },
    estimatedMinutes: 8,
    tone: 'epic',
  },
  {
    arcId: 'roger-ii',
    category: 'People',
    sortOrder: 31,
    isNew: true,
    thumb: '/story/norman-expansion/monreale-cathedral.jpg',
    recommendedEraId: 'norman-expansion',
    displayTitle: {
      en: 'Roger II — Builder of Sicily',
      fr: 'Roger II — Bâtisseur de Sicile',
      es: 'Roger II — Constructor de Sicilia',
      it: 'Ruggero II — Costruttore di Sicilia',
    },
    hook: {
      en: 'The Norman king who fused three civilizations into one Mediterranean kingdom.',
      fr: 'Le roi normand qui fusionna trois civilisations en un seul royaume méditerranéen.',
      es: 'El rey normando que fusionó tres civilizaciones en un solo reino mediterráneo.',
      it: 'Il re normanno che fuse tre civiltà in un unico regno mediterraneo.',
    },
    blurb: {
      en: 'Follow Roger II from the Hauteville arrival in Italy through the unification of Norman territories, the crowning at Palermo, the multicultural court, African conquests, and the Book of Roger.',
      fr: 'Suivez Roger II de l\'arrivée des Hauteville en Italie à l\'unification des territoires normands, au couronnement à Palerme, à la cour multiculturelle, aux conquêtes africaines et au Livre de Roger.',
      es: 'Siga a Roger II desde la llegada de los Hauteville a Italia hasta la unificación de los territorios normandos, la coronación en Palermo, la corte multicultural, las conquistas africanas y el Libro de Roger.',
      it: 'Segui Ruggero II dall\'arrivo degli Altavilla in Italia all\'unificazione dei territori normanni, all\'incoronazione a Palermo, alla corte multiculturale, alle conquiste africane e al Libro di Ruggero.',
    },
    estimatedMinutes: 7,
    tone: 'epic',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'robert-guiscard',
    category: 'People',
    sortOrder: 32,
    isNew: true,
    thumb: '/story/norman-expansion/melfi-castle-apulia.jpg',
    recommendedEraId: 'norman-expansion',
    displayTitle: {
      en: 'Robert Guiscard — The Wily Conqueror',
      fr: 'Robert Guiscard — Le Conquérant Rusé',
      es: 'Roberto Guiscardo — El Conquistador Astuto',
      it: 'Roberto il Guiscardo — Il Conquistatore Astuto',
    },
    hook: {
      en: 'A landless sixth son who carved an empire from southern Italy to the gates of Constantinople.',
      fr: 'Un sixième fils sans terre qui se tailla un empire de l\'Italie du Sud aux portes de Constantinople.',
      es: 'Un sexto hijo sin tierras que forjó un imperio desde el sur de Italia hasta las puertas de Constantinopla.',
      it: 'Un sesto figlio senza terre che si forgiò un impero dal sud Italia alle porte di Costantinopoli.',
    },
    blurb: {
      en: 'Follow Robert Guiscard from the Hauteville family origins in Normandy to the conquest of Apulia, the papal alliance at Melfi, the fall of Byzantine Bari, the invasion of the Balkans, and his death on Cephalonia.',
      fr: 'Suivez Robert Guiscard des origines familiales des Hauteville en Normandie à la conquête des Pouilles, l\'alliance papale à Melfi, la chute de la Bari byzantine, l\'invasion des Balkans et sa mort à Céphalonie.',
      es: 'Siga a Roberto Guiscardo desde los orígenes familiares de los Hauteville en Normandía hasta la conquista de Apulia, la alianza papal en Melfi, la caída de la Bari bizantina, la invasión de los Balcanes y su muerte en Cefalonia.',
      it: 'Segui Roberto il Guiscardo dalle origini della famiglia Altavilla in Normandia alla conquista della Puglia, all\'alleanza papale a Melfi, alla caduta della Bari bizantina, all\'invasione dei Balcani e alla sua morte a Cefalonia.',
    },
    estimatedMinutes: 8,
    tone: 'epic',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'bohemond-antioch',
    category: 'People',
    sortOrder: 23,
    isNew: true,
    thumb: '/story/norman-expansion/siege-antioch-1098.jpg',
    recommendedEraId: 'norman-expansion',
    displayTitle: {
      en: 'Bohemond — Prince of Antioch',
      fr: 'Bohémond — Prince d\'Antioche',
      es: 'Bohemundo — Príncipe de Antioquía',
      it: 'Boemondo — Principe di Antiochia',
    },
    hook: {
      en: 'A disinherited Norman who seized a Crusader principality at the edge of the known world.',
      fr: 'Un Normand déshérité qui s\'empara d\'une principauté croisée aux confins du monde connu.',
      es: 'Un normando desheredado que se apoderó de un principado cruzado en los confines del mundo conocido.',
      it: 'Un normanno diseredato che si impadronì di un principato crociato ai confini del mondo conosciuto.',
    },
    blurb: {
      en: 'Follow Bohemond from his disinheritance in southern Italy through the First Crusade — Dorylaeum, the siege of Antioch, the Holy Lance, captivity by the Danishmends, and the fateful Treaty of Devol.',
      fr: 'Suivez Bohémond de son déshéritement en Italie du Sud à la Première Croisade — Dorylée, le siège d\'Antioche, la Sainte Lance, la captivité chez les Danishmendides et le fatal Traité de Devol.',
      es: 'Siga a Bohemundo desde su desheredación en el sur de Italia hasta la Primera Cruzada — Dorilea, el asedio de Antioquía, la Santa Lanza, el cautiverio con los danisméndidas y el fatídico Tratado de Devol.',
      it: 'Segui Boemondo dalla sua diseredazione nell\'Italia meridionale alla Prima Crociata — Dorileo, l\'assedio di Antiochia, la Sacra Lancia, la prigionia presso i Danishmendidi e il fatale Trattato di Devol.',
    },
    estimatedMinutes: 8,
    tone: 'epic',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'william-iron-arm',
    category: 'People',
    sortOrder: 63,
    isNew: true,
    thumb: '/story/norman-expansion/melfi-castle-apulia.jpg',
    recommendedEraId: 'norman-expansion',
    displayTitle: {
      en: 'William Iron Arm — First Lord of Apulia',
      fr: 'Guillaume Bras-de-Fer — Premier Seigneur d\'Apulie',
      es: 'Guillermo Brazo de Hierro — Primer Señor de Apulia',
      it: 'Guglielmo Braccio di Ferro — Primo Signore di Puglia',
    },
    hook: {
      en: 'The eldest Hauteville son who turned mercenaries into rulers.',
      fr: 'L\'aîné des fils Hauteville qui transforma des mercenaires en seigneurs.',
      es: 'El mayor de los hijos de Hauteville que convirtió mercenarios en señores.',
      it: 'Il maggiore dei figli di Altavilla che trasformò mercenari in signori.',
    },
    blurb: {
      en: 'Follow William Iron Arm from the Cotentin to southern Italy — mercenary service, the Battle of Olivento, the county of Apulia, and the spark that ignited the Hauteville dynasty.',
      fr: 'Suivez Guillaume Bras-de-Fer du Cotentin à l\'Italie du Sud — service mercenaire, la bataille d\'Olivento, le comté d\'Apulie et l\'étincelle qui embrasa la dynastie Hauteville.',
    },
    estimatedMinutes: 5,
    tone: 'epic',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'sichelgaita',
    category: 'People',
    sortOrder: 62,
    isNew: true,
    thumb: '/story/norman-expansion/salerno-medieval-cityscape.jpg',
    recommendedEraId: 'norman-expansion',
    displayTitle: {
      en: 'Sichelgaita — Warrior Queen of the Normans',
      fr: 'Sichelgaita — Reine Guerrière des Normands',
      es: 'Sichelgaita — Reina Guerrera de los Normandos',
      it: 'Sichelgaita — Regina Guerriera dei Normanni',
    },
    hook: {
      en: 'A Lombard princess who rode into battle in full armour at the side of Robert Guiscard.',
      fr: 'Une princesse lombarde qui chevauchait au combat en armure complète aux côtés de Robert Guiscard.',
      es: 'Una princesa lombarda que cabalgaba a la batalla con armadura completa junto a Roberto Guiscardo.',
      it: 'Una principessa longobarda che cavalcava in battaglia in armatura completa al fianco di Roberto il Guiscardo.',
    },
    blurb: {
      en: 'Follow Sichelgaita from the Lombard court of Salerno through her marriage to Robert Guiscard, battlefield command at Durazzo, and one of the rare documented lives of a medieval female military leader.',
      fr: 'Suivez Sichelgaita de la cour lombarde de Salerne à son mariage avec Robert Guiscard, son commandement à Durazzo et l\'une des rares vies documentées d\'une femme chef militaire médiévale.',
    },
    estimatedMinutes: 5,
    tone: 'personal',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'odo-bayeux',
    category: 'People',
    sortOrder: 64,
    isNew: true,
    thumb: '/story/william-conqueror/bayeux-tapestry-fleet.jpg',
    recommendedEraId: 'norman-expansion',
    displayTitle: {
      en: 'Odo of Bayeux — Bishop, Earl, Warlord',
      fr: 'Odon de Bayeux — Évêque, Comte, Seigneur de Guerre',
      es: 'Odón de Bayeux — Obispo, Conde, Señor de la Guerra',
      it: 'Odone di Bayeux — Vescovo, Conte, Signore della Guerra',
    },
    hook: {
      en: 'Half-brother of the Conqueror, the richest man in England, and possibly the patron behind the Bayeux Tapestry.',
      fr: 'Demi-frère du Conquérant, l\'homme le plus riche d\'Angleterre, et peut-être le commanditaire de la Tapisserie de Bayeux.',
      es: 'Medio hermano del Conquistador, el hombre más rico de Inglaterra, y posiblemente el mecenas del Tapiz de Bayeux.',
      it: 'Fratellastro del Conquistatore, l\'uomo più ricco d\'Inghilterra, e forse il committente dell\'Arazzo di Bayeux.',
    },
    blurb: {
      en: 'Follow Odo from his appointment as Bishop of Bayeux through Hastings, his vast English earldom, the Tapestry tradition, arrest by his own brother, and death on Crusade.',
      fr: 'Suivez Odon de sa nomination comme évêque de Bayeux à Hastings, son vaste comté anglais, la tradition de la Tapisserie, son arrestation par son propre frère et sa mort en Croisade.',
    },
    estimatedMinutes: 5,
    tone: 'epic',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
  {
    arcId: 'hereward-the-wake',
    category: 'People',
    sortOrder: 65,
    isNew: true,
    thumb: '/story/william-conqueror/bayeux-tapestry-hastings.jpg',
    recommendedEraId: 'norman-expansion',
    displayTitle: {
      en: 'Hereward the Wake — The Last Englishman',
      fr: 'Hereward le Veilleur — Le Dernier Anglais',
      es: 'Hereward el Vigía — El Último Inglés',
      it: 'Hereward il Vegliante — L\'Ultimo Inglese',
    },
    hook: {
      en: 'The Anglo-Saxon rebel who held the fenlands against Norman conquest — and became a legend.',
      fr: 'Le rebelle anglo-saxon qui tint les marais contre la conquête normande — et devint une légende.',
      es: 'El rebelde anglosajón que mantuvo los pantanos contra la conquista normanda — y se convirtió en leyenda.',
      it: 'Il ribelle anglosassone che difese le paludi dalla conquista normanna — e divenne una leggenda.',
    },
    blurb: {
      en: 'Follow Hereward from Anglo-Saxon England through the shock of conquest, fenland resistance, the siege of Ely, and the birth of an English outlaw legend that tells the other side of Norman expansion.',
      fr: 'Suivez Hereward de l\'Angleterre anglo-saxonne au choc de la conquête, à la résistance des marais, au siège d\'Ely et à la naissance d\'une légende de hors-la-loi anglais qui raconte l\'autre versant de l\'expansion normande.',
    },
    estimatedMinutes: 6,
    tone: 'dark',
    posterCredit: { en: 'Wikimedia Commons, Public domain' },
  },
];
