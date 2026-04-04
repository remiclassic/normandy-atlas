import type { I18nString } from '@/core/types';

export interface ChangelogEntry {
  id: string;
  date: string;
  title: I18nString;
  summary: I18nString;
}

/** Newest first. Append to the top when shipping a feature. */
export const atlasChangelog: ChangelogEntry[] = [
  {
    id: 'roadmap-cleared-content-phases',
    date: '2026-04-04',
    title: {
      en: 'Anglo-Norman, Mediterranean, and atlas-wide content expansion',
      fr: 'Expansion du contenu anglo-normand, m\u00e9diterran\u00e9en et pan-atlas',
    },
    summary: {
      en: 'Henry II, Ranulf de Glanvill, Roger I of Sicily, and other figures join the atlas alongside new Mediterranean places (Naples, Catania, Monreale, Mileto, Mdina), Anglo-Norman institutional sites (Clarendon, Runnymede), story arcs for Domesday, Magna Carta, and Norman Sicily\u2019s multicultural kingdom, five new glossary entries, and region narratives for the duchy and exploration eras.',
      fr: 'Henri II, Ranulf de Glanvill, Roger Ier de Sicile et d\u2019autres figures rejoignent l\u2019atlas avec de nouveaux lieux m\u00e9diterran\u00e9ens (Naples, Catane, Monreale, Mileto, Mdina), des sites institutionnels anglo-normands (Clarendon, Runnymede), des arcs narratifs pour Domesday, la Magna Carta et le royaume multiculturel normand de Sicile, cinq nouvelles entr\u00e9es de glossaire et des r\u00e9cits de r\u00e9gion pour les \u00e9poques ducale et d\u2019exploration.',
    },
  },
  {
    id: 'a11y-touch-polish',
    date: '2026-04-04',
    title: {
      en: 'Accessibility and touch-target improvements',
      fr: 'Am\u00e9liorations d\u2019accessibilit\u00e9 et des zones tactiles',
    },
    summary: {
      en: 'Map tooltips now carry proper ARIA roles, the text-size menu manages focus on open and close, and the timeline rail has an expanded touch area for easier mobile scrubbing.',
      fr: 'Les infobulles de la carte portent d\u00e9sormais les bons r\u00f4les ARIA, le menu de taille de texte g\u00e8re le focus \u00e0 l\u2019ouverture et la fermeture, et la barre chronologique dispose d\u2019une zone tactile \u00e9largie pour un d\u00e9filement mobile plus facile.',
    },
  },
  {
    id: 'changelog-replaces-roadmap',
    date: '2026-04-04',
    title: {
      en: 'Recent updates replace the roadmap',
      fr: 'Les mises \u00e0 jour r\u00e9centes remplacent la feuille de route',
    },
    summary: {
      en: 'The speculative roadmap has been replaced by a dated changelog of shipped features. What you see listed here is what actually landed in the atlas.',
      fr: 'La feuille de route sp\u00e9culative a \u00e9t\u00e9 remplac\u00e9e par un journal dat\u00e9 des fonctionnalit\u00e9s livr\u00e9es. Ce que vous voyez ici est ce qui a r\u00e9ellement \u00e9t\u00e9 d\u00e9ploy\u00e9 dans l\u2019atlas.',
    },
  },
  {
    id: 'shareable-urls-retention',
    date: '2026-04-04',
    title: {
      en: 'Shareable map links and retention strip',
      fr: 'Liens de carte partageables et bande de rétention',
    },
    summary: {
      en: 'You can now copy a URL that restores the exact map position, era, and layers you are viewing. A retention strip reminds returning visitors where they left off.',
      fr: 'Vous pouvez désormais copier un lien qui restaure la position exacte, l\u2019époque et les couches que vous consultez. Une bande de rétention rappelle aux visiteurs de retour où ils se sont arrêtés.',
    },
  },
  {
    id: 'story-launcher-era-intro',
    date: '2026-04-01',
    title: {
      en: 'Era-first story launcher and cinematic intros',
      fr: 'Lanceur d\u2019histoires par époque et introductions cinématiques',
    },
    summary: {
      en: 'Stories now launch from an era-grouped panel with poster tiles, and each era opens with a full-screen cinematic intro overlay before the first beat begins.',
      fr: 'Les histoires se lancent depuis un panneau regroupé par époque avec affiches, et chaque époque s\u2019ouvre par une introduction cinématique plein écran avant le premier temps.',
    },
  },
  {
    id: 'biography-arcs',
    date: '2026-03-28',
    title: {
      en: 'Guided biography arcs for anchor figures',
      fr: 'Arcs biographiques guidés pour les figures majeures',
    },
    summary: {
      en: 'New France settlers, William Iron Arm, Sichelgaita, Odo of Bayeux, and Hereward the Wake now have full guided story arcs you can follow on the map with sourced beat-by-beat narration.',
      fr: 'Les colons de Nouvelle-France, Guillaume Bras-de-Fer, Sichelgaite, Odon de Bayeux et Hereward le Veilleur disposent désormais d\u2019arcs narratifs guidés à suivre sur la carte avec narration sourcée étape par étape.',
    },
  },
  {
    id: 'story-illustrations',
    date: '2026-03-25',
    title: {
      en: 'Story beat illustrations across all eras',
      fr: 'Illustrations des étapes narratives pour toutes les époques',
    },
    summary: {
      en: 'Every era from Neolithic through the Atlantic Imprint now has photo-pin illustrations on each story beat, giving visual anchoring to the places and events described in the narrative.',
      fr: 'Chaque époque, du Néolithique à l\u2019Empreinte atlantique, dispose désormais d\u2019illustrations sur chaque étape narrative, offrant un ancrage visuel aux lieux et événements décrits.',
    },
  },
  {
    id: 'progress-milestones',
    date: '2026-03-20',
    title: {
      en: 'Expedition progress, challenges, and milestones',
      fr: 'Progression d\u2019expédition, défis et jalons',
    },
    summary: {
      en: 'A new progress system tracks eras explored, stories completed, and places visited. Challenges and milestones reward sustained exploration, with shareable moment cards and a persistent ledger.',
      fr: 'Un nouveau système de progression suit les époques explorées, les histoires terminées et les lieux visités. Défis et jalons récompensent l\u2019exploration soutenue, avec cartes de moments partageables et un registre persistant.',
    },
  },
];

export const changelogFootnote: I18nString = {
  en: 'Have a correction, source, or family line worth documenting? The atlas grows through research and community input; the support and creator links in the header show how you can help.',
  fr: 'Une correction, une source ou une lignée à documenter ? L\u2019atlas grandit grâce à la recherche et aux contributions ; les liens soutien et créateur du menu proposent comment aider.',
  es: '\u00bfCorrecci\u00f3n, fuente o linaje que valga documentar? El atlas crece con investigaci\u00f3n y aportes; los enlaces de apoyo y creador en el men\u00fa explican c\u00f3mo colaborar.',
  it: 'Correzione, fonte o lignaggio da documentare? L\u2019atlante cresce con ricerca e contributi; dal menu, sostegno e creatore indicano come aiutare.',
};
