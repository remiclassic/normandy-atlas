import type { DeepOriginCategoryDef } from '@/core/deep-origins/types';

export const DEEP_ORIGIN_CATEGORIES: DeepOriginCategoryDef[] = [
  {
    id: 'hunter_gatherer',
    label: { en: 'Hunter-Gatherer', fr: 'Chasseurs-cueilleurs' },
    shortLabel: { en: 'HG', fr: 'CC' },
    accentColor: '#e06b9a',
    icon: 'bow',
    heroImage: '/deep-origins/hunter-gatherer-hero.png',
    demoPercent: 41,
    showMigrations: true,
    mapLinked: true,
    body: [
      {
        en: 'Upper Paleolithic modern humans spread into ice-age Europe carrying ancestries related to earlier populations of western and central Eurasia. Genomes from sites like Loschbour (Luxembourg) and Villabruna (Italy) helped define what population geneticists often summarize as “Western hunter-gatherer” ancestries in broad-brush European models.',
        fr: 'Les humains anatomiquement modernes du Paléolithique supérieur se répandent dans une Europe glaciaire avec des affinités génétiques liées à d’anciennes populations d’Eurasie occidentale et centrale. Des génomes de sites comme Loschbour (Luxembourg) et Villabruna (Italie) ont contribué à décrire ce que les modèles résument souvent comme l’ancêtre « chasseur-cueilleur ouest-européen » — un raccourci pédagogique, pas une tribu unique.',
      },
      {
        en: 'This Atlas view is a schematic teaching map: arrow paths are not measured individual trajectories, and percentages do not come from your DNA unless you enter a personal blend below.',
        fr: 'Cette vue de l’Atlas est pédagogique : les flèches ne sont pas des trajectoires mesurées individuellement, et les pourcentages ne proviennent pas de votre ADN tant que vous n’avez pas saisi un mélange personnel.',
      },
    ],
  },
  {
    id: 'early_farmer',
    label: { en: 'Farmer', fr: 'Agriculteur néolithique' },
    shortLabel: { en: 'Farm', fr: 'Agri.' },
    accentColor: '#3dad6c',
    icon: 'wheat',
    heroImage: '/deep-origins/early-farmer-hero.png',
    demoPercent: 48,
    showMigrations: true,
    mapLinked: true,
    body: [
      {
        en: 'Neolithic farming lifeways spread from Anatolia and the Aegean into Europe, mixing with local hunter-gatherer communities at different tempos depending on region. Ancient DNA from early agricultural settlements (for example Stuttgart-related contexts in models of European prehistory) illustrates how farmer-associated ancestries became a major fraction of many later European populations.',
        fr: 'Les modes de vie agricoles du Néolithique se diffusent depuis l’Anatolie et l’Égée vers l’Europe, en se mélangeant aux communautés de chasseurs-cueilleurs à des rythmes variables. L’ADN ancien de premiers établissements agricoles illustre comment des ancestres « agriculteurs » devinrent une grande part de nombreuses populations ultérieures.',
      },
      {
        en: 'Interpretation here is simplified for exploration; cite primary archaeological and ancient-genomics literature for any precise claim.',
        fr: 'L’interprétation est ici simplifiée ; appuyez-vous sur la littérature archéologique et paléogénomique pour toute affirmation précise.',
      },
    ],
  },
  {
    id: 'metal_age',
    label: { en: 'Metal Age', fr: 'Âge des métaux' },
    shortLabel: { en: 'Metal', fr: 'Métal' },
    accentColor: '#4a90d9',
    icon: 'anvil',
    heroImage: '/deep-origins/metal-age-hero.png',
    demoPercent: 11,
    showMigrations: true,
    mapLinked: true,
    body: [
      {
        en: 'Steppe-related ancestries associated with Yamnaya and related pastoralist populations became influential in many parts of Europe during the Copper and Bronze Ages, carrying with them economic and social changes often summarized as “Metal Age” mobility in popular accounts.',
        fr: 'Des ancestres liés à la steppe et aux pasteurs yamnaya devinrent influents dans une grande partie de l’Europe aux Âges du cuivre et du bronze, accompagnant des changements souvent résumés comme des mouvements d’« Âge des métaux ».',
      },
      {
        en: 'The blue arrows are a cartoon summary of widely discussed patterns, not a single invasion story that fits every region.',
        fr: 'Les flèches bleues résument des schémas souvent discutés ; elles ne décrivent pas une invasion unique valable partout.',
      },
    ],
  },
  {
    id: 'non_european',
    label: { en: 'non-European', fr: 'non européen' },
    shortLabel: { en: 'Other', fr: 'Autre' },
    accentColor: '#8a8580',
    icon: 'globe',
    heroImage: '/deep-origins/non-european-hero.png',
    demoPercent: 0,
    showMigrations: false,
    mapLinked: false,
    body: [
      {
        en: 'Many commercial reports split European-like components from other world regions. This educational module focuses on three widely used European schematic ancestries plus a site index; it does not evaluate your genome. For deeply personal interpretation, use reports from a licensed testing provider.',
        fr: 'Plusieurs rapports commerciaux distinguent des composantes « européennes » d’autres régions. Ce module pédagogique se concentre sur trois schémas courants et une liste de sites ; il n’analyse pas votre génome.',
      },
    ],
  },
  {
    id: 'archaeology',
    label: { en: 'Archaeology', fr: 'Archéologie' },
    shortLabel: { en: 'Sites', fr: 'Sites' },
    accentColor: '#a67c52',
    icon: 'shovel',
    heroImage: '/deep-origins/archaeology-hero.png',
    demoPercent: 0,
    showMigrations: false,
    mapLinked: true,
    body: [
      {
        en: 'Key ancient-DNA samples and type localities mentioned in lectures and popular accounts — select a pin for context. Use the timeline to narrow by approximate age.',
        fr: 'Sites et échantillons d’ADN anciens souvent cités : sélectionnez une épingle pour le contexte. Utilisez la frise chronologique pour filtrer par âge approximatif.',
      },
    ],
  },
];

export function getDeepOriginCategory(id: string): DeepOriginCategoryDef | undefined {
  return DEEP_ORIGIN_CATEGORIES.find((c) => c.id === id);
}
