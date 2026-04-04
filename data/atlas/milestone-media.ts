// ---------------------------------------------------------------------------
// Milestone artwork registry — maps milestone IDs to static image paths.
//
// Assets live in public/achievements/{id}.webp (woodcut / sepia achievement art).
// ---------------------------------------------------------------------------

export interface MilestoneMedia {
  /** Path relative to public/, e.g. "/achievements/chrono-first-era.webp" */
  src: string;
  /** Optional alt override (defaults to milestone title). */
  alt?: string;
}

export const milestoneMedia: Partial<Record<string, MilestoneMedia>> = {
  'chrono-first-era': { src: '/achievements/chrono-first-era.webp' },
  'chrono-three-eras': { src: '/achievements/chrono-three-eras.webp' },
  'chrono-all-eras': { src: '/achievements/chrono-all-eras.webp' },
  'carto-first-place': { src: '/achievements/carto-first-place.webp' },
  'carto-ten-places': { src: '/achievements/carto-ten-places.webp' },
  'carto-twentyfive-places': { src: '/achievements/carto-twentyfive-places.webp' },
  'carto-first-region': { src: '/achievements/carto-first-region.webp' },
  'carto-five-regions': { src: '/achievements/carto-five-regions.webp' },
  'itin-first-journey': { src: '/achievements/itin-first-journey.webp' },
  'itin-five-journeys': { src: '/achievements/itin-five-journeys.webp' },
  'itin-seine-corridor': { src: '/achievements/itin-seine-corridor.webp' },
  'itin-viking-normandy': { src: '/achievements/itin-viking-normandy.webp' },
  'itin-new-france-path': { src: '/achievements/itin-new-france-path.webp' },
  'itin-celtic-sea': { src: '/achievements/itin-celtic-sea.webp' },
  'itin-atlantic-arc': { src: '/achievements/itin-atlantic-arc.webp' },
  'people-first-story': { src: '/achievements/people-first-story.webp' },
  'people-couture': { src: '/achievements/people-couture.webp' },
  'people-three-arcs': { src: '/achievements/people-three-arcs.webp' },
  'people-all-arcs': { src: '/achievements/people-all-arcs.webp' },
  'evidence-ten-segments': { src: '/achievements/evidence-ten-segments.webp' },
  'evidence-deep-dwell': { src: '/achievements/evidence-deep-dwell.webp' },
  'evidence-scholar': { src: '/achievements/evidence-scholar.webp' },
};
