import type { AtlasContract } from '@/core/types';

export const atlasContract: AtlasContract = {
  id: 'default',
  rules: [
    'Routes represent historical corridors and movement patterns, not guaranteed one-to-one documented individual voyages.',
    'Pedagogical intensity ranks relative importance or interpretive weight, not exact population totals.',
    'The atlas is an educational and exploratory tool, not a definitive genealogical proof system.',
    'Narrative emphasis may foreground Normandy, but the broader Atlantic and French world must remain visible.',
    'Migration percentages are scholarly estimates derived from partial records, not complete census data. Always display cohort, date range, and what population is being counted.',
    'Sub-regional origin breakdowns within broad museum categories carry lower confidence than the aggregate figures.',
    'Port of embarkation is distinct from birth region — La Rochelle was the primary departure hub but drew settlers from across France.',
    'Strong Norman or northwestern French signals in modern French Canadian genealogy reflect 17th–18th-century recruitment and founder effects, not an exclusively "Norman" colony or a claim that every settler was born in Normandy.',
    'Colonial settlement followed seigneurial geography, not ethnic clustering. Do not map settler origins onto specific colonial zones without explicit sourcing.',
    'Viking-era sea routes follow known navigation patterns, coastlines, and river systems. They are historically inferred corridors, not GPS-verified tracks.',
    'Influence zones (Danelaw, Norse-Gaelic sphere, Kievan Rus) represent probabilistic zones of cultural and political impact, not precise administrative boundaries.',
    'Confirmed Viking sites are drawn only from verified archaeological or documentary sources. No speculative "unknown settlements" are placed on the map.',
    'Evidence levels (documentary, archaeological, synthesis, tradition) are displayed on every route segment so users can assess confidence themselves.',
  ],
  forbiddenClaims: [
    'Do not claim that every rendered route corresponds to a fully documented individual voyage.',
    'Do not present pedagogical intensity as raw census or exact migration totals.',
    'Do not imply that Normandy alone created French Canada or New France.',
    'Do not present migration share percentages as exact census figures.',
    'Do not conflate port of embarkation with settler birth region.',
    'Do not claim that French Canadian identity or ancestry is exclusively or predominantly "medieval Norman" rather than early modern French with regional clustering.',
    'Do not claim ethnic enclaves in the colony without specific documentary evidence.',
    'Do not invent or place undiscovered Viking settlements on the map.',
    'Do not draw straight lines across land masses ignoring geography for Viking routes.',
    'Do not exaggerate Viking expansion beyond what the evidence supports.',
  ],
};
