import type { I18nString } from '@/core/types';

// ---------------------------------------------------------------------------
// Curated multi-step guided expeditions — each is a checklist of content
// the user should engage to "complete" the expedition. Deep links drive
// the map to the right context.
// ---------------------------------------------------------------------------

export interface ExpeditionStep {
  /** ID of the target entity (place / journey / region). */
  entityId: string;
  entityKind: 'place' | 'journey' | 'region' | 'story' | 'viking-adna-site' | 'viking-archaeology-site';
  label: I18nString;
  /** Era to fly the map to when this step is activated. */
  eraId?: string;
}

export interface ExpeditionDef {
  id: string;
  title: I18nString;
  description: I18nString;
  steps: ExpeditionStep[];
}

export const atlasExpeditions: ExpeditionDef[] = [
  {
    id: 'exp-viking-to-normandy',
    title: {
      en: 'Follow the Vikings to Normandy',
      fr: 'Suivre les Vikings en Normandie',
      de: 'Folgen Sie den Wikingern in der Normandie',
      nb: 'Følg vikingene til Normandie',
      sv: 'Följ vikingarna till Normandie',
      da: 'Følg vikingerne til Normandiet',
    },
    description: {
      en: 'Retrace the route from Scandinavia through the Seine to the founding of the Duchy.',
      fr: 'Retracez l\'itinéraire de la Scandinavie à la fondation du Duché via la Seine.',
      de: 'Verfolgen Sie den Weg von Skandinavien bis zur Gründung des Herzogtums über die Seine.',
      nb: 'Følg ruten fra Skandinavia gjennom Seinen til grunnleggelsen av hertugdømmet.',
      sv: 'Följ rutten från Skandinavien genom Seine till grundandet av hertigdömet.',
      da: 'Gå tilbage på ruten fra Skandinavien gennem Seinen til grundlæggelsen af ​​hertugdømmet.',
    },
    steps: [
      { entityId: 'journey-danish-migration', entityKind: 'journey', label: { en: 'Danish Migration to Seine', fr: 'Migration danoise vers la Seine', de: 'Dänische Migration an die Seine', nb: 'Dansk migrasjon til Seine', sv: 'Dansk migration till Seine', da: 'Dansk Migration til Seine' }, eraId: 'viking-age' },
      { entityId: 'journey-seine-raids', entityKind: 'journey', label: { en: 'Viking Seine Raids', fr: 'Raids vikings sur la Seine', de: 'Wikingerüberfälle auf die Seine', nb: 'Viking Seine Raids', sv: 'Viking Seine Raids', da: 'Viking Seine Raids' }, eraId: 'viking-age' },
      { entityId: 'hedeby-haithabu', entityKind: 'viking-adna-site', label: { en: 'Hedeby aDNA — the trade hub', fr: 'ADN ancien de Hedeby — le centre commercial', de: 'Alte DNA von Haithabu – das Einkaufszentrum', nb: 'Hedeby aDNA — handelsknutepunktet', sv: 'Hedeby aDNA — handelsnavet', da: 'Hedeby aDNA — handelscentret' }, eraId: 'viking-age' },
      { entityId: 'ile-de-groix', entityKind: 'viking-archaeology-site', label: { en: 'Île de Groix Ship Burial', fr: 'Sépulture navale de l\'Île de Groix', de: 'Marinebegräbnis auf der Insel Groix', nb: 'Île de Groix skipsbegravelse', sv: 'Île de Groix skeppsbegravning', da: 'Île de Groix skibsbegravelse' }, eraId: 'viking-age' },
      { entityId: 'rouen', entityKind: 'place', label: { en: 'Rouen — heart of the duchy', fr: 'Rouen — cœur du duché', de: 'Rouen – Herz des Herzogtums', nb: 'Rouen - hjertet av hertugdømmet', sv: 'Rouen — hertigdömets hjärta', da: 'Rouen - hertugdømmets hjerte' }, eraId: 'norman-origins' },
      { entityId: 'journey-viking-settlement', entityKind: 'journey', label: { en: 'Viking Settlement', fr: 'Implantation viking', de: 'Wikingersiedlung', nb: 'Vikingoppgjør', sv: 'Vikingabosättning', da: 'Vikingeboplads' }, eraId: 'norman-origins' },
    ],
  },
  {
    id: 'exp-normandy-to-new-france',
    title: {
      en: 'Normandy to New France',
      fr: 'De la Normandie à la Nouvelle-France',
      de: 'Von der Normandie bis Neufrankreich',
      nb: 'Normandie til New France',
      sv: 'Normandie till Nya Frankrike',
      da: 'Normandiet til Ny Frankrig',
    },
    description: {
      en: 'Follow the Atlantic corridor from Norman ports to the St. Lawrence colony.',
      fr: 'Suivez le corridor atlantique des ports normands à la colonie du Saint-Laurent.',
      de: 'Folgen Sie dem Atlantikkorridor von den Häfen der Normandie bis zur Kolonie St. Lawrence.',
      nb: 'Følg Atlanterhavskorridoren fra normanniske havner til St. Lawrence-kolonien.',
      sv: 'Följ Atlantkorridoren från normandiska hamnar till St. Lawrence-kolonin.',
      da: 'Følg Atlanterhavskorridoren fra normanniske havne til St. Lawrence-kolonien.',
    },
    steps: [
      { entityId: 'journey-perche-quebec', entityKind: 'journey', label: { en: 'Perche–Québec Corridor', fr: 'Corridor Perche–Québec', de: 'Perche-Quebec-Korridor', nb: 'Perche–Québec-korridoren', sv: 'Perche–Québec-korridoren', da: 'Perche-Québec korridor' }, eraId: 'new-france-foundations' },
      { entityId: 'journey-honfleur-montreal', entityKind: 'journey', label: { en: 'Honfleur–Montréal Route', fr: 'Route Honfleur–Montréal', de: 'Straße Honfleur–Montreal', nb: 'Honfleur–Montréal-ruten', sv: 'Route Honfleur–Montréal', da: 'Honfleur-Montréal-ruten' }, eraId: 'royal-new-france' },
      { entityId: 'journey-la-rochelle-acadia', entityKind: 'journey', label: { en: 'La Rochelle–Acadia', fr: 'La Rochelle–Acadie', de: 'La Rochelle–Acadia', nb: 'La Rochelle – Acadia', sv: 'La Rochelle–Acadia', da: 'La Rochelle-Acadia' }, eraId: 'new-france-foundations' },
      { entityId: 'guillaume-couture', entityKind: 'story', label: { en: 'Guillaume Couture\'s story', fr: 'Le récit de Guillaume Couture', de: 'Die Geschichte von Guillaume Couture', nb: 'Guillaume Coutures historie', sv: 'Guillaume Coutures berättelse', da: 'Guillaume Coutures historie' } },
    ],
  },
  {
    id: 'exp-celtic-sea',
    title: {
      en: 'The Celtic Sea Route',
      fr: 'La route de la mer Celtique',
      de: 'Die Keltische Seeroute',
      nb: 'Den keltiske sjøruten',
      sv: 'Den keltiska sjövägen',
      da: 'Den keltiske sørute',
    },
    description: {
      en: 'Trace the secondary Norse migration via the Celtic world to western Normandy.',
      fr: 'Retracez la migration secondaire des Norrois via le monde celtique vers l\'ouest normand.',
      de: 'Verfolgen Sie die Sekundärwanderung der Nordmänner über die keltische Welt in die westliche Normandie.',
      nb: 'Spor den sekundære norrøne migrasjonen via den keltiske verden til det vestlige Normandie.',
      sv: 'Spåra den sekundära nordiska migrationen via den keltiska världen till västra Normandie.',
      da: 'Spor den sekundære nordiske migration via den keltiske verden til det vestlige Normandiet.',
    },
    steps: [
      { entityId: 'journey-celtic-sea-route', entityKind: 'journey', label: { en: 'Celtic Sea Route', fr: 'Route de la mer Celtique', de: 'Keltische Seeroute', nb: 'Celtic Sea Route', sv: 'Celtic Sea Route', da: 'Keltiske sørute' }, eraId: 'viking-age' },
      { entityId: 'journey-anglo-scandinavian-migration', entityKind: 'journey', label: { en: 'Anglo-Scandinavian Settlement', fr: 'Colonisation anglo-scandinave', de: 'Anglo-skandinavische Kolonisierung', nb: 'anglo-skandinavisk bosetning', sv: 'Anglo-skandinavisk bosättning', da: 'anglo-skandinavisk bosættelse' }, eraId: 'norman-origins' },
    ],
  },
  {
    id: 'exp-deep-time',
    title: {
      en: 'Before the Vikings',
      fr: 'Avant les Vikings',
      de: 'Vor den Wikingern',
      nb: 'Før vikingene',
      sv: 'Före vikingarna',
      da: 'Før vikingerne',
    },
    description: {
      en: 'Explore the deep history — megalithic monuments, bronze trade, Celtic tribes, and Roman roads.',
      fr: 'Explorez l\'histoire profonde — monuments mégalithiques, commerce du bronze, tribus celtes et voies romaines.',
      de: 'Entdecken Sie die tiefe Geschichte – Megalithdenkmäler, Bronzehandel, keltische Stämme und römische Straßen.',
      nb: 'Utforsk den dype historien - megalittiske monumenter, bronsehandel, keltiske stammer og romerske veier.',
      sv: 'Utforska den djupa historien - megalitiska monument, bronshandel, keltiska stammar och romerska vägar.',
      da: 'Udforsk den dybe historie - megalitiske monumenter, bronzehandel, keltiske stammer og romerske veje.',
    },
    steps: [
      { entityId: 'journey-channel-trade', entityKind: 'journey', label: { en: 'Bronze Age Channel Trade', fr: 'Commerce transmanche à l\'âge du bronze', de: 'Kanalübergreifender Handel in der Bronzezeit', nb: 'Kanalhandel i bronsealderen', sv: 'Bronsåldern Channel Trade', da: 'Kanalhandel i bronzealderen' }, eraId: 'bronze-age-channel' },
      { entityId: 'journey-seine-deep-time', entityKind: 'journey', label: { en: 'Seine Corridor (Deep Time)', fr: 'Corridor de la Seine (temps profond)', de: 'Seine-Korridor (tiefe Zeit)', nb: 'Seine Corridor (Deep Time)', sv: 'Seine Corridor (Deep Time)', da: 'Seine Corridor (Deep Time)' }, eraId: 'iron-age-gaul' },
      { entityId: 'rouen', entityKind: 'place', label: { en: 'Rouen — from Rotomagus', fr: 'Rouen — depuis Rotomagus', de: 'Rouen – von Rotomagus', nb: 'Rouen - fra Rotomagus', sv: 'Rouen — från Rotomagus', da: 'Rouen - fra Rotomagus' }, eraId: 'roman-gaul' },
    ],
  },
  {
    id: 'exp-eastern-rivers',
    title: {
      en: 'Varangian Trade Routes',
      fr: 'Routes commerciales des Varègues',
      de: 'Varangianische Handelsrouten',
      nb: 'Varangian handelsruter',
      sv: 'Varangian handelsvägar',
      da: 'Varangian handelsruter',
    },
    description: {
      en: 'Follow the eastern Scandinavian expansion from the Baltic to Constantinople.',
      fr: 'Suivez l\'expansion scandinave orientale de la Baltique à Constantinople.',
      de: 'Verfolgen Sie die ostskandinavische Expansion von der Ostsee bis nach Konstantinopel.',
      nb: 'Følg den østlige skandinaviske ekspansjonen fra Østersjøen til Konstantinopel.',
      sv: 'Följ den östra skandinaviska expansionen från Östersjön till Konstantinopel.',
      da: 'Følg den østlige skandinaviske ekspansion fra Østersøen til Konstantinopel.',
    },
    steps: [
      { entityId: 'journey-eastern-rivers', entityKind: 'journey', label: { en: 'Baltic to Novgorod', fr: 'Baltique vers Novgorod', de: 'Ostsee nach Nowgorod', nb: 'Baltic til Novgorod', sv: 'Baltic till Novgorod', da: 'Baltic til Novgorod' }, eraId: 'viking-age' },
      { entityId: 'journey-dnieper-route', entityKind: 'journey', label: { en: 'Dnieper Route', fr: 'Route du Dniepr', de: 'Dnjepr-Straße', nb: 'Dnepr-ruten', sv: 'Dneprvägen', da: 'Dnepr-ruten' }, eraId: 'viking-age' },
      { entityId: 'journey-volga-route', entityKind: 'journey', label: { en: 'Volga Trade Route', fr: 'Route de la Volga', de: 'Wolgastraße', nb: 'Volga handelsrute', sv: 'Volga handelsväg', da: 'Volga handelsrute' }, eraId: 'viking-age' },
    ],
  },
];
