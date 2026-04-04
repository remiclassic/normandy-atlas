import type { I18nString } from '@/core/types';
import type { MapDeepLinkParams } from '@/lib/map-deep-link';

// ---------------------------------------------------------------------------
// Curator's weekly pick — deterministic rotation based on week index.
// Same for all users in a given week, zero backend required.
// ---------------------------------------------------------------------------

export interface CuratorPick {
  id: string;
  title: I18nString;
  teaser: I18nString;
  deepLink: MapDeepLinkParams;
}

export const curatorPicks: CuratorPick[] = [
  {
    id: 'pick-seine-raids',
    title: { en: 'Viking Seine Raids', fr: 'Raids vikings sur la Seine', de: 'Wikingerüberfälle auf die Seine', nb: 'Viking Seine Raids', sv: 'Viking Seine Raids', da: 'Viking Seine Raids' },
    teaser: {
      en: 'Trace the repeated Norse incursions from the estuary to the gates of Paris.',
      fr: 'Retracez les incursions nordiques répétées de l\'estuaire jusqu\'aux portes de Paris.',
      de: 'Verfolgen Sie die wiederholten Einfälle des Nordens von der Flussmündung bis zu den Toren von Paris.',
      nb: 'Spor de gjentatte norrøne inngrepene fra elvemunningen til portene til Paris.',
      sv: 'Spåra de upprepade nordiska infallen från mynningen till Paris portar.',
      da: 'Spor de gentagne nordiske indfald fra flodmundingen til Paris\' porte.',
    },
    deepLink: { era: 'viking-age', journey: 'journey-seine-raids' },
  },
  {
    id: 'pick-celtic-sea',
    title: { en: 'The Celtic Sea Route', fr: 'La route de la mer Celtique', de: 'Die Keltische Seeroute', nb: 'Den keltiske sjøruten', sv: 'Den keltiska sjövägen', da: 'Den keltiske sørute' },
    teaser: {
      en: 'A secondary Norse migration path through the Celtic world to western Normandy.',
      fr: 'Une voie migratoire norroise secondaire à travers le monde celtique vers l\'ouest normand.',
      de: 'Eine sekundäre nordische Migrationsroute durch die keltische Welt in die westliche Normandie.',
      nb: 'En sekundær norrøn migrasjonsvei gjennom den keltiske verden til det vestlige Normandie.',
      sv: 'En sekundär nordisk migrationsväg genom den keltiska världen till västra Normandie.',
      da: 'En sekundær nordisk migrationssti gennem den keltiske verden til det vestlige Normandiet.',
    },
    deepLink: { era: 'viking-age', journey: 'journey-celtic-sea-route' },
  },
  {
    id: 'pick-perche-quebec',
    title: { en: 'From the Perche to Québec', fr: 'Du Perche à Québec', de: 'Von Perche nach Quebec', nb: 'Fra Perche til Québec', sv: 'Från Perche till Québec', da: 'Fra Perche til Québec' },
    teaser: {
      en: 'Follow the inland recruitment corridor from Normandy to the St. Lawrence.',
      fr: 'Suivez le corridor de recrutement intérieur de la Normandie au Saint-Laurent.',
      de: 'Folgen Sie dem inneren Rekrutierungskorridor von der Normandie bis zum Sankt-Lorenz-Strom.',
      nb: 'Følg rekrutteringskorridoren i innlandet fra Normandie til St. Lawrence.',
      sv: 'Följ rekryteringskorridoren i inlandet från Normandie till St. Lawrence.',
      da: 'Følg rekrutteringskorridoren ind i landet fra Normandiet til St. Lawrence.',
    },
    deepLink: { era: 'new-france-foundations', journey: 'journey-perche-quebec' },
  },
  {
    id: 'pick-verrazzano',
    title: { en: 'Verrazzano\'s Voyage', fr: 'Le voyage de Verrazzano', de: 'Verrazzanos Reise', nb: 'Verrazzanos reise', sv: 'Verrazzanos resa', da: 'Verrazzanos rejse' },
    teaser: {
      en: 'The first continuous charting of the Atlantic seaboard, launched from Dieppe in 1524.',
      fr: 'La première cartographie continue du littoral atlantique, partie de Dieppe en 1524.',
      de: 'Die erste kontinuierliche Kartierung der Atlantikküste begann 1524 in Dieppe.',
      nb: 'Den første kontinuerlige kartleggingen av Atlanterhavskysten, lansert fra Dieppe i 1524.',
      sv: 'Den första kontinuerliga kartläggningen av Atlantkusten, sjösatt från Dieppe 1524.',
      da: 'Den første kontinuerlige kortlægning af Atlanterhavskysten, opsendt fra Dieppe i 1524.',
    },
    deepLink: { era: 'age-of-exploration', journey: 'journey-verrazzano' },
  },
  {
    id: 'pick-eastern-rivers',
    title: { en: 'Varangians to the Greeks', fr: 'Des Varègues aux Grecs', de: 'Von den Warägern bis zu den Griechen', nb: 'Varangians til grekerne', sv: 'Varangians till grekerna', da: 'Varangians til grækerne' },
    teaser: {
      en: 'The Dnieper route from Novgorod to Constantinople — the lifeline of the Kievan Rus.',
      fr: 'La route du Dniepr de Novgorod à Constantinople — l\'artère vitale de la Rus\' kiévienne.',
      de: 'Die Dnjepr-Straße von Nowgorod nach Konstantinopel – die Lebensader der Kiewer Rus.',
      nb: 'Dnepr-ruten fra Novgorod til Konstantinopel - livlinen til Kievan Rus.',
      sv: 'Dneprvägen från Novgorod till Konstantinopel — Kievruss livlina.',
      da: 'Dnepr-ruten fra Novgorod til Konstantinopel - Kievan Rus\' livline.',
    },
    deepLink: { era: 'viking-age', journey: 'journey-dnieper-route' },
  },
  {
    id: 'pick-bronze-age-trade',
    title: { en: 'Bronze Age Channel Trade', fr: 'Commerce transmanche à l\'âge du bronze', de: 'Kanalübergreifender Handel in der Bronzezeit', nb: 'Kanalhandel i bronsealderen', sv: 'Bronsåldern Channel Trade', da: 'Kanalhandel i bronzealderen' },
    teaser: {
      en: 'Tin from Cornwall crossed the Channel via Normandy three thousand years before the Vikings.',
      fr: 'L\'étain de Cornouailles traversait la Manche via la Normandie trois mille ans avant les Vikings.',
      de: 'Dreitausend Jahre vor den Wikingern überquerte kornisches Zinn den Ärmelkanal über die Normandie.',
      nb: 'Tin fra Cornwall krysset kanalen via Normandie tre tusen år før vikingene.',
      sv: 'Tenn från Cornwall korsade kanalen via Normandie tre tusen år före vikingarna.',
      da: 'Tin fra Cornwall krydsede kanalen via Normandiet tre tusinde år før vikingerne.',
    },
    deepLink: { era: 'bronze-age-channel', journey: 'journey-channel-trade' },
  },
  {
    id: 'pick-guillaume-couture',
    title: { en: 'Guillaume Couture', fr: 'Guillaume Couture', de: 'Guillaume Couture', nb: 'Guillaume Couture', sv: 'Guillaume Couture', da: 'Guillaume Couture' },
    teaser: {
      en: 'A Norman settler who became one of New France\'s most remarkable figures.',
      fr: 'Un colon normand devenu l\'une des figures les plus remarquables de la Nouvelle-France.',
      de: 'Ein normannischer Siedler, der zu einer der bemerkenswertesten Figuren Neufrankreichs wurde.',
      nb: 'En normannisk nybygger som ble en av New Frances mest bemerkelsesverdige skikkelser.',
      sv: 'En normandisk nybyggare som blev en av Nya Frankrikes mest anmärkningsvärda gestalter.',
      da: 'En normannisk nybygger, der blev en af ​​New Frances mest bemærkelsesværdige skikkelser.',
    },
    deepLink: { story: 'guillaume-couture' },
  },
  {
    id: 'pick-atlantic-norse',
    title: { en: 'Iceland to Vinland', fr: 'De l\'Islande au Vinland', de: 'Von Island nach Vinland', nb: 'Island til Vinland', sv: 'Island till Vinland', da: 'Island til Vinland' },
    teaser: {
      en: 'The farthest extent of Viking expansion — across the open Atlantic.',
      fr: 'L\'étendue maximale de l\'expansion viking — à travers l\'Atlantique ouvert.',
      de: 'Das maximale Ausmaß der Viking-Expansion – über den offenen Atlantik.',
      nb: 'Den fjerneste utstrekningen av Viking-ekspansjon — over det åpne Atlanterhavet.',
      sv: 'Den längsta omfattningen av Viking-expansion — över den öppna Atlanten.',
      da: 'Den fjerneste udstrækning af vikingeudvidelse - på tværs af det åbne Atlanterhav.',
    },
    deepLink: { era: 'viking-age', journey: 'journey-atlantic-norse' },
  },
];

const EPOCH_OFFSET = 1704067200_000; // 2024-01-01 UTC
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export function getCuratorPickForThisWeek(): CuratorPick {
  const weekIndex = Math.floor((Date.now() - EPOCH_OFFSET) / WEEK_MS);
  return curatorPicks[weekIndex % curatorPicks.length];
}
