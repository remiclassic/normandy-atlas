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
    title: { en: 'Viking Seine Raids', fr: 'Raids vikings sur la Seine' },
    teaser: {
      en: 'Trace the repeated Norse incursions from the estuary to the gates of Paris.',
      fr: 'Retracez les incursions nordiques répétées de l\'estuaire jusqu\'aux portes de Paris.',
    },
    deepLink: { era: 'viking-age', journey: 'journey-seine-raids' },
  },
  {
    id: 'pick-celtic-sea',
    title: { en: 'The Celtic Sea Route', fr: 'La route de la mer Celtique' },
    teaser: {
      en: 'A secondary Norse migration path through the Celtic world to western Normandy.',
      fr: 'Une voie migratoire norroise secondaire à travers le monde celtique vers l\'ouest normand.',
    },
    deepLink: { era: 'viking-age', journey: 'journey-celtic-sea-route' },
  },
  {
    id: 'pick-perche-quebec',
    title: { en: 'From the Perche to Québec', fr: 'Du Perche à Québec' },
    teaser: {
      en: 'Follow the inland recruitment corridor from Normandy to the St. Lawrence.',
      fr: 'Suivez le corridor de recrutement intérieur de la Normandie au Saint-Laurent.',
    },
    deepLink: { era: 'new-france-foundations', journey: 'journey-perche-quebec' },
  },
  {
    id: 'pick-verrazzano',
    title: { en: 'Verrazzano\'s Voyage', fr: 'Le voyage de Verrazzano' },
    teaser: {
      en: 'The first continuous charting of the Atlantic seaboard, launched from Dieppe in 1524.',
      fr: 'La première cartographie continue du littoral atlantique, partie de Dieppe en 1524.',
    },
    deepLink: { era: 'age-of-exploration', journey: 'journey-verrazzano' },
  },
  {
    id: 'pick-eastern-rivers',
    title: { en: 'Varangians to the Greeks', fr: 'Des Varègues aux Grecs' },
    teaser: {
      en: 'The Dnieper route from Novgorod to Constantinople — the lifeline of the Kievan Rus.',
      fr: 'La route du Dniepr de Novgorod à Constantinople — l\'artère vitale de la Rus\' kiévienne.',
    },
    deepLink: { era: 'viking-age', journey: 'journey-dnieper-route' },
  },
  {
    id: 'pick-bronze-age-trade',
    title: { en: 'Bronze Age Channel Trade', fr: 'Commerce transmanche à l\'âge du bronze' },
    teaser: {
      en: 'Tin from Cornwall crossed the Channel via Normandy three thousand years before the Vikings.',
      fr: 'L\'étain de Cornouailles traversait la Manche via la Normandie trois mille ans avant les Vikings.',
    },
    deepLink: { era: 'bronze-age-channel', journey: 'journey-channel-trade' },
  },
  {
    id: 'pick-guillaume-couture',
    title: { en: 'Guillaume Couture', fr: 'Guillaume Couture' },
    teaser: {
      en: 'A Norman settler who became one of New France\'s most remarkable figures.',
      fr: 'Un colon normand devenu l\'une des figures les plus remarquables de la Nouvelle-France.',
    },
    deepLink: { story: 'guillaume-couture' },
  },
  {
    id: 'pick-atlantic-norse',
    title: { en: 'Iceland to Vinland', fr: 'De l\'Islande au Vinland' },
    teaser: {
      en: 'The farthest extent of Viking expansion — across the open Atlantic.',
      fr: 'L\'étendue maximale de l\'expansion viking — à travers l\'Atlantique ouvert.',
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
