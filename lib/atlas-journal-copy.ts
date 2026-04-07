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
      en: 'This journal is your companion guide to the Norman Atlas. Browse the timeline of eras, open the Story Library from the tools menu to explore chronicles and arcs before playback, explore Norman-origin surnames carried to the New World, look up historical terms in the glossary, follow guided expeditions, take on weekly challenges, and learn how the atlas works. For DNA and family history, open the Genealogy hub to search the Francogene/GFNA catalogues and try the Norman Identity path; for deep haplogroup reading separate from settler triangulation, use the Genetic Lineage Explorer.',
      fr: 'Ce journal est votre guide compagnon de l\u2019Atlas normand. Parcourez la chronologie des \u00e9poques, ouvrez la biblioth\u00e8que d\u2019histoires depuis le menu d\u2019outils pour explorer chroniques et arcs avant la lecture, explorez les patronymes d\u2019origine normande port\u00e9s jusqu\u2019au Nouveau Monde, consultez les termes historiques dans le glossaire, suivez des exp\u00e9ditions guid\u00e9es, relevez des d\u00e9fis hebdomadaires et d\u00e9couvrez le fonctionnement de l\u2019atlas. Pour l\u2019ADN et la g\u00e9n\u00e9alogie, ouvrez l\u2019espace G\u00e9n\u00e9alogie pour parcourir les catalogues Francogene/GFNA et le parcours Identit\u00e9 normande ; pour une lecture approfondie des haplogroupes en dehors de la triangulation des colons, utilisez l\u2019explorateur de lign\u00e9es g\u00e9n\u00e9tiques.',
    },
  },
  {
    id: 'how-to-use',
    heading: {
      en: 'How to use the Atlas',
      fr: 'Comment utiliser l\u2019Atlas',
    },
    body: {
      en: 'The map is organized by eras \u2014 each one shows different settlements, routes, and regions. Use the timeline bar at the top to move through time. Click any point or region to see historical details. The Layers panel lets you toggle exploration routes, colonial claims, forts, and more. Route corridors are broken into individual segments, each tagged with an evidence level (documentary, archaeological, synthesis, or tradition). Story playback walks curated beats that move the camera and time for you; the Story Library is the browse-first surface where you can open an arc, filter chronicles, and read detail without starting playback (deep links use `library` and `libraryArc` on the map URL). Guided expeditions offer multi-step tours across the atlas, and weekly challenges on your profile page keep exploration fresh. Use the command palette (keyboard shortcut shown in the tools menu) to jump quickly to places, layers, and reference pages.',
      fr: 'La carte est organis\u00e9e par \u00e9poques \u2014 chacune affiche diff\u00e9rents \u00e9tablissements, routes et r\u00e9gions. Utilisez la barre chronologique en haut pour voyager dans le temps. Cliquez sur un point ou une r\u00e9gion pour voir les d\u00e9tails historiques. Le panneau Couches vous permet d\u2019activer les routes d\u2019exploration, les revendications coloniales, les forts, etc. Les corridors de route sont d\u00e9compos\u00e9s en segments individuels, chacun \u00e9tiquet\u00e9 avec un niveau de preuve (documentaire, arch\u00e9ologique, synth\u00e8se ou tradition). La lecture du mode histoire encha\u00eene des \u00e9tapes qui d\u00e9placent cam\u00e9ra et temps ; la biblioth\u00e8que d\u2019histoires est la vue \u00ab parcourir d\u2019abord \u00bb o\u00f9 l\u2019on ouvre un arc, filtre les chroniques et lit le d\u00e9tail sans lancer la lecture (les liens profonds utilisent `library` et `libraryArc` sur l\u2019URL de la carte). Les exp\u00e9ditions guid\u00e9es offrent des parcours en plusieurs \u00e9tapes \u00e0 travers l\u2019atlas, et les d\u00e9fis hebdomadaires sur votre page de profil renouvellent l\u2019exploration. Utilisez la palette de commandes (raccourci indiqu\u00e9 dans le menu d\u2019outils) pour ouvrir vite lieux, couches et pages de r\u00e9f\u00e9rence.',
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
