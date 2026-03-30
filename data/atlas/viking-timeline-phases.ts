import type { I18nString } from '@/core/types';

export interface VikingPhase {
  id: string;
  yearStart: number;
  yearEnd: number;
  label: I18nString;
  narrative: I18nString;
}

export const VIKING_PHASES: VikingPhase[] = [
  {
    id: 'late-carolingian-raids',
    yearStart: 751,
    yearEnd: 841,
    label: { en: 'Late Carolingian Frontier', fr: 'Frontière carolingienne tardive' },
    narrative: {
      en: 'The Carolingian empire\'s fragmentation exposed wealthy river corridors. Early Norse raids struck Lindisfarne (793) and the Channel coast; the Seine valley\'s monastic riches attracted growing attention.',
      fr: 'La fragmentation de l\'empire carolingien exposa de riches corridors fluviaux. Les premiers raids scandinaves frappèrent Lindisfarne (793) et la côte de la Manche ; les richesses monastiques de la vallée de la Seine attirèrent une attention croissante.',
    },
  },
  {
    id: 'seine-raids',
    yearStart: 841,
    yearEnd: 886,
    label: { en: 'Seine Raids Intensify', fr: 'Intensification des raids sur la Seine' },
    narrative: {
      en: 'Rouen fell to Vikings in 841. Over the next four decades, Norse fleets penetrated deep into Francia via the Seine, Loire, and Garonne. Paris was besieged in 885–886. Monasteries burned; the Carolingian response oscillated between tribute and force.',
      fr: 'Rouen tomba aux mains des Vikings en 841. Pendant les quatre décennies suivantes, les flottes scandinaves pénétrèrent profondément en Francie via la Seine, la Loire et la Garonne. Paris fut assiégé en 885–886. Les monastères brûlèrent ; la réponse carolingienne oscilla entre tribut et force.',
    },
  },
  {
    id: 'negotiation-settlement',
    yearStart: 886,
    yearEnd: 911,
    label: { en: 'Negotiation & Settlement', fr: 'Négociation et implantation' },
    narrative: {
      en: 'After the siege of Paris, Frankish kings increasingly negotiated with Norse war-bands. Viking groups settled semi-permanently along the lower Seine. In 911, Charles the Simple ceded territory to Rollo at Saint-Clair-sur-Epte — the founding act of Normandy.',
      fr: 'Après le siège de Paris, les rois francs négocièrent de plus en plus avec les bandes de guerre scandinaves. Des groupes vikings s\'installèrent semi-durablement le long de la basse Seine. En 911, Charles le Simple céda un territoire à Rollon à Saint-Clair-sur-Epte — l\'acte fondateur de la Normandie.',
    },
  },
  {
    id: 'early-normandy',
    yearStart: 911,
    yearEnd: 965,
    label: { en: 'Early Normandy', fr: 'Normandie primitive' },
    narrative: {
      en: 'Rollo\'s successors consolidated control, absorbing Frankish institutions while maintaining a warrior aristocracy. The territory expanded westward into the Cotentin and Avranchin. Norse settlers mixed with the existing Frankish population.',
      fr: 'Les successeurs de Rollon consolidèrent le contrôle, absorbant les institutions franques tout en maintenant une aristocratie guerrière. Le territoire s\'étendit vers l\'ouest dans le Cotentin et l\'Avranchin. Les colons scandinaves se mêlèrent à la population franque existante.',
    },
  },
  {
    id: 'ducal-consolidation',
    yearStart: 965,
    yearEnd: 1066,
    label: { en: 'Ducal Consolidation', fr: 'Consolidation ducale' },
    narrative: {
      en: 'Under Richard I and his successors, the duchy stabilised. Normandy developed a distinctive identity — Latin-speaking, Christian, but with a Norse warrior ethos. By 1066, William had forged the most militarily effective polity in northern Europe.',
      fr: 'Sous Richard Ier et ses successeurs, le duché se stabilisa. La Normandie développa une identité distincte — latinophone, chrétienne, mais avec un ethos guerrier scandinave. En 1066, Guillaume avait forgé l\'entité politique la plus efficace militairement du nord de l\'Europe.',
    },
  },
];

export const VIKING_TIMELINE_MARKERS: { year: number; label: I18nString }[] = [
  { year: 793, label: { en: 'Lindisfarne Raid', fr: 'Raid de Lindisfarne' } },
  { year: 841, label: { en: 'Rouen Falls', fr: 'Chute de Rouen' } },
  { year: 886, label: { en: 'Siege of Paris', fr: 'Siège de Paris' } },
  { year: 911, label: { en: 'Treaty of Saint-Clair-sur-Epte', fr: 'Traité de Saint-Clair-sur-Epte' } },
  { year: 1066, label: { en: 'Norman Conquest', fr: 'Conquête normande' } },
];

export function getVikingPhaseForYear(year: number): VikingPhase | undefined {
  return VIKING_PHASES.find((p) => year >= p.yearStart && year < p.yearEnd)
    ?? (year >= 1066 ? VIKING_PHASES[VIKING_PHASES.length - 1] : undefined);
}
