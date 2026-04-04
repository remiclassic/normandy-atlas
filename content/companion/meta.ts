/**
 * Two-level navigation: campaigns (information architecture) → scenario sections (`##` ids).
 * Each `sectionId` must match slugify(heading) from combined companion Markdown.
 */
export interface CompanionCampaignNav {
  id: string;
  label: string;
  sectionIds: readonly string[];
}

export const companionCampaignNav: readonly CompanionCampaignNav[] = [
  {
    id: 'campaign-orientation',
    label: 'Campaign — Orientation',
    sectionIds: [
      'a-guide-to-places-time-and-evidence',
      'scenario-the-atlas-as-argument',
      'scenario-the-atlas-contract',
      'scenario-time-and-the-timeline',
    ],
  },
  {
    id: 'campaign-map-literacy',
    label: 'Campaign — Map literacy',
    sectionIds: [
      'scenario-regions-fills-borders-intentions',
      'scenario-places-and-settlement-types',
      'scenario-routes-and-movement',
      'scenario-evidence-on-the-map',
    ],
  },
  {
    id: 'campaign-geography-spine',
    label: 'Campaign — Geography spine',
    sectionIds: [
      'scenario-water-soil-and-corridors',
      'scenario-from-civitas-to-duchy',
      'scenario-expansion-beyond-the-duchy',
    ],
  },
  {
    id: 'campaign-expert-runs',
    label: 'Campaign — Expert runs',
    sectionIds: [
      'scenario-the-carolingian-strain',
      'scenario-mapping-uncertainty',
      'scenario-conclusion-research-teaching-genealogy',
    ],
  },
];
