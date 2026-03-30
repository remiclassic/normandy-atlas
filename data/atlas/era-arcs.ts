import type { I18nString } from '@/core/types';

export interface EraArcEntry {
  arcId: string;
  eraIds: string[];
  label: I18nString;
  /** Pre-built Tailwind classes for the arc button. */
  style: {
    text: string;
    textHover: string;
    border: string;
    borderHover: string;
    iconBg: string;
    iconBgHover: string;
  };
}

export const atlasEraArcs: EraArcEntry[] = [
  {
    arcId: 'new-france',
    eraIds: ['new-france-foundations', 'royal-new-france', 'atlantic-imprint'],
    label: {
      en: 'New France Arc',
      fr: 'Arc Nouvelle-France',
      es: 'Arco de Nueva Francia',
      it: 'Arco della Nuova Francia',
    },
    style: {
      text: 'text-cyan-300/80',
      textHover: 'hover:text-cyan-200',
      border: 'border-cyan-400/15',
      borderHover: 'hover:border-cyan-400/25',
      iconBg: 'bg-cyan-400/10',
      iconBgHover: 'group-hover:bg-cyan-400/15',
    },
  },
  {
    arcId: 'guillaume-couture',
    eraIds: ['new-france-foundations'],
    label: {
      en: 'Guillaume Couture — life on the map',
      fr: 'Guillaume Couture — le parcours sur la carte',
      es: 'Guillaume Couture — la vida en el mapa',
      it: 'Guillaume Couture — il percorso sulla mappa',
    },
    style: {
      text: 'text-amber-200/85',
      textHover: 'hover:text-amber-100',
      border: 'border-amber-400/20',
      borderHover: 'hover:border-amber-400/35',
      iconBg: 'bg-amber-400/12',
      iconBgHover: 'group-hover:bg-amber-400/18',
    },
  },
  {
    arcId: 'neolithic-normandy',
    eraIds: ['neolithic-normandy'],
    label: {
      en: 'Neolithic Normandy Arc',
      fr: 'Arc de la Normandie n\u00e9olithique',
      es: 'Arco de la Normandía neolítica',
      it: 'Arco della Normandia neolitica',
    },
    style: {
      text: 'text-teal-300/80',
      textHover: 'hover:text-teal-200',
      border: 'border-teal-400/15',
      borderHover: 'hover:border-teal-400/25',
      iconBg: 'bg-teal-400/10',
      iconBgHover: 'group-hover:bg-teal-400/15',
    },
  },
  {
    arcId: 'bronze-age-channel',
    eraIds: ['bronze-age-channel'],
    label: {
      en: 'Bronze Age Channel Arc',
      fr: 'Arc de la Manche \u00e0 l\'\u00e2ge du bronze',
      es: 'Arco del canal en la Edad del Bronce',
      it: 'Arco della Manica nell\'età del bronzo',
    },
    style: {
      text: 'text-yellow-300/80',
      textHover: 'hover:text-yellow-200',
      border: 'border-yellow-400/15',
      borderHover: 'hover:border-yellow-400/25',
      iconBg: 'bg-yellow-400/10',
      iconBgHover: 'group-hover:bg-yellow-400/15',
    },
  },
  {
    arcId: 'iron-age-gaul',
    eraIds: ['iron-age-gaul'],
    label: {
      en: 'Iron Age Gaul Arc',
      fr: 'Arc de la Gaule de l\'âge du fer',
      es: 'Arco de la Galia de la Edad del Hierro',
      it: 'Arco della Gallia dell\'età del ferro',
    },
    style: {
      text: 'text-lime-300/80',
      textHover: 'hover:text-lime-200',
      border: 'border-lime-400/15',
      borderHover: 'hover:border-lime-400/25',
      iconBg: 'bg-lime-400/10',
      iconBgHover: 'group-hover:bg-lime-400/15',
    },
  },
  {
    arcId: 'roman-gaul',
    eraIds: ['roman-gaul'],
    label: {
      en: 'Roman Gaul Arc',
      fr: 'Arc de la Gaule romaine',
      es: 'Arco de la Galia romana',
      it: 'Arco della Gallia romana',
    },
    style: {
      text: 'text-rose-300/80',
      textHover: 'hover:text-rose-200',
      border: 'border-rose-400/15',
      borderHover: 'hover:border-rose-400/25',
      iconBg: 'bg-rose-400/10',
      iconBgHover: 'group-hover:bg-rose-400/15',
    },
  },
  {
    arcId: 'post-roman-gaul',
    eraIds: ['post-roman-gaul'],
    label: {
      en: 'Post-Roman Gaul Arc',
      fr: 'Arc de la Gaule post-romaine',
      es: 'Arco de la Galia posromana',
      it: 'Arco della Gallia post-romana',
    },
    style: {
      text: 'text-stone-300/80',
      textHover: 'hover:text-stone-200',
      border: 'border-stone-400/15',
      borderHover: 'hover:border-stone-400/25',
      iconBg: 'bg-stone-400/10',
      iconBgHover: 'group-hover:bg-stone-400/15',
    },
  },
  {
    arcId: 'neustria',
    eraIds: ['neustria'],
    label: {
      en: 'Neustria Arc',
      fr: 'Arc de la Neustrie',
      es: 'Arco de Neustria',
      it: 'Arco della Neustria',
    },
    style: {
      text: 'text-emerald-300/80',
      textHover: 'hover:text-emerald-200',
      border: 'border-emerald-400/15',
      borderHover: 'hover:border-emerald-400/25',
      iconBg: 'bg-emerald-400/10',
      iconBgHover: 'group-hover:bg-emerald-400/15',
    },
  },
  {
    arcId: 'frankish-carolingian',
    eraIds: ['frankish-carolingian'],
    label: {
      en: 'Carolingian Frontier Arc',
      fr: 'Arc de la fronti\u00e8re carolingienne',
      es: 'Arco de la frontera carolingia',
      it: 'Arco della frontiera carolingia',
    },
    style: {
      text: 'text-violet-300/80',
      textHover: 'hover:text-violet-200',
      border: 'border-violet-400/15',
      borderHover: 'hover:border-violet-400/25',
      iconBg: 'bg-violet-400/10',
      iconBgHover: 'group-hover:bg-violet-400/15',
    },
  },
  {
    arcId: 'viking-age',
    eraIds: ['viking-age'],
    label: {
      en: 'Viking Age Arc',
      fr: "Arc de l'\u00e8re viking",
      es: 'Arco de la era vikinga',
      it: "Arco dell'età vichinga",
    },
    style: {
      text: 'text-red-300/80',
      textHover: 'hover:text-red-200',
      border: 'border-red-400/15',
      borderHover: 'hover:border-red-400/25',
      iconBg: 'bg-red-400/10',
      iconBgHover: 'group-hover:bg-red-400/15',
    },
  },
  {
    arcId: 'norman-origins',
    eraIds: ['norman-origins'],
    label: {
      en: 'Norman Origins Arc',
      fr: 'Arc des origines normandes',
      es: 'Arco de los orígenes normandos',
      it: 'Arco delle origini normanne',
    },
    style: {
      text: 'text-amber-300/80',
      textHover: 'hover:text-amber-200',
      border: 'border-amber-400/15',
      borderHover: 'hover:border-amber-400/25',
      iconBg: 'bg-amber-400/10',
      iconBgHover: 'group-hover:bg-amber-400/15',
    },
  },
  {
    arcId: 'norman-expansion',
    eraIds: ['norman-expansion'],
    label: {
      en: 'Norman Expansion Arc',
      fr: "Arc de l'expansion normande",
      es: 'Arco de la expansión normanda',
      it: 'Arco dell\'espansione normanna',
    },
    style: {
      text: 'text-orange-300/80',
      textHover: 'hover:text-orange-200',
      border: 'border-orange-400/15',
      borderHover: 'hover:border-orange-400/25',
      iconBg: 'bg-orange-400/10',
      iconBgHover: 'group-hover:bg-orange-400/15',
    },
  },
];

export function getArcEntriesForEra(eraId: string): EraArcEntry[] {
  return atlasEraArcs.filter((a) => a.eraIds.includes(eraId));
}
