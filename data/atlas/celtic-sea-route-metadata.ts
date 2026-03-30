/**
 * Canonical metadata for the Celtic–Norse maritime corridor into Normandy.
 * Use for AI context, copy, or future APIs; journey + segments drive map rendering.
 */
export const celticSeaRouteMetadata = {
  id: 'celtic_sea_route',
  type: 'maritime_route' as const,
  origin: 'Scandinavia',
  intermediary_regions: ['Scotland', 'Ireland', 'Irish Sea'],
  destination: 'Normandy',
  sub_destinations: ['Cotentin', 'Channel Islands', 'Rouen'],
  cultural_context: ['Norse', 'Celtic', 'Norse-Gaelic'],
  period: '8th–10th century',
  description:
    'Secondary Viking route used primarily by Norwegian settlers traveling through the Celtic world into West Normandy.',
} as const;

export const CELTIC_SEA_JOURNEY_ID = 'journey-celtic-sea-route' as const;
