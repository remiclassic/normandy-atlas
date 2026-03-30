export interface EraArcEntry {
  arcId: string;
  eraIds: string[];
  label: { en: string; fr: string };
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
    label: { en: 'New France Arc', fr: 'Arc Nouvelle-France' },
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
    arcId: 'neolithic-normandy',
    eraIds: ['neolithic-normandy'],
    label: { en: 'Neolithic Normandy Arc', fr: 'Arc de la Normandie n\u00e9olithique' },
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
    label: { en: 'Bronze Age Channel Arc', fr: 'Arc de la Manche \u00e0 l\'\u00e2ge du bronze' },
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
    label: { en: 'Iron Age Gaul Arc', fr: 'Arc de la Gaule de l\'âge du fer' },
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
    label: { en: 'Roman Gaul Arc', fr: 'Arc de la Gaule romaine' },
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
    label: { en: 'Post-Roman Gaul Arc', fr: 'Arc de la Gaule post-romaine' },
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
    label: { en: 'Neustria Arc', fr: 'Arc de la Neustrie' },
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
    label: { en: 'Carolingian Frontier Arc', fr: 'Arc de la fronti\u00e8re carolingienne' },
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
    label: { en: 'Viking Age Arc', fr: "Arc de l'\u00e8re viking" },
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
    label: { en: 'Norman Origins Arc', fr: 'Arc des origines normandes' },
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
    label: { en: 'Norman Expansion Arc', fr: "Arc de l'expansion normande" },
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
