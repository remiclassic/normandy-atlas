import type { I18nString } from '@/core/types';

export interface JournalSectionCopy {
  id: string;
  heading: I18nString;
  body: I18nString;
}

export const journalSections: JournalSectionCopy[] = [
  {
    id: 'welcome',
    heading: {
      en: 'Atlas Journal',
      fr: 'Journal de l\u2019Atlas',
    },
    body: {
      en: 'This journal is your companion guide to the Norman Atlas. Browse the timeline of eras, explore Norman-origin surnames carried to the New World, look up historical terms in the glossary, and learn how the atlas works.',
      fr: 'Ce journal est votre guide compagnon de l\u2019Atlas normand. Parcourez la chronologie des \u00e9poques, explorez les patronymes d\u2019origine normande port\u00e9s jusqu\u2019au Nouveau Monde, consultez les termes historiques dans le glossaire et d\u00e9couvrez le fonctionnement de l\u2019atlas.',
    },
  },
  {
    id: 'how-to-use',
    heading: {
      en: 'How to use the Atlas',
      fr: 'Comment utiliser l\u2019Atlas',
    },
    body: {
      en: 'The map is organized by eras \u2014 each one shows different settlements, routes, and regions. Use the timeline bar at the top to move through time. Click any point or region to see historical details. The Layers panel lets you toggle exploration routes, colonial claims, forts, and more. Story mode guides you through curated narrative chapters with animated camera movement.',
      fr: 'La carte est organis\u00e9e par \u00e9poques \u2014 chacune affiche diff\u00e9rents \u00e9tablissements, routes et r\u00e9gions. Utilisez la barre chronologique en haut pour voyager dans le temps. Cliquez sur un point ou une r\u00e9gion pour voir les d\u00e9tails historiques. Le panneau Couches vous permet d\u2019activer les routes d\u2019exploration, les revendications coloniales, les forts, etc. Le mode histoire vous guide \u00e0 travers des chapitres narratifs avec des mouvements de cam\u00e9ra anim\u00e9s.',
    },
  },
  {
    id: 'methodology',
    heading: {
      en: 'Methodology & confidence',
      fr: 'M\u00e9thodologie et confiance',
    },
    body: {
      en: 'Every claim in this atlas carries a provenance level. "Documented" entries are backed by primary records \u2014 parish registers, ship manifests, colonial censuses. "Network" entries are inferred from known migration patterns and scholarly analysis. "Uncertain" entries are plausible but await further confirmation. We aim for transparency: the atlas shows what is known, what is modeled, and where gaps remain.',
      fr: 'Chaque affirmation dans cet atlas porte un niveau de provenance. Les entr\u00e9es \u00ab document\u00e9es \u00bb s\u2019appuient sur des sources primaires \u2014 registres paroissiaux, manifestes de navires, recensements coloniaux. Les entr\u00e9es \u00ab r\u00e9seau \u00bb sont d\u00e9duites de sch\u00e9mas migratoires connus et d\u2019analyses savantes. Les entr\u00e9es \u00ab incertaines \u00bb sont plausibles mais en attente de confirmation. Nous visons la transparence\u00a0: l\u2019atlas montre ce qui est connu, ce qui est mod\u00e9lis\u00e9 et o\u00f9 subsistent des lacunes.',
    },
  },
];
