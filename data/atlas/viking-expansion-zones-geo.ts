/**
 * Coarse polygon zones representing broad areas of Viking activity intensity.
 * Used as a poster-style wash overlay, not precise political boundaries.
 */
export const VIKING_EXPANSION_ZONE_SOURCE = 'viking-expansion-zones';

export interface VikingExpansionZoneProperties {
  id: string;
  zoneKind: 'intensive' | 'sporadic';
  label: string;
}

export const vikingExpansionZonesGeoJson: GeoJSON.FeatureCollection<GeoJSON.Polygon, VikingExpansionZoneProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 'zone-intensive-northwest', zoneKind: 'intensive', label: 'Intensive Norse Activity' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-12, 48], [-5, 43], [5, 43], [15, 48], [15, 55],
          [12, 62], [5, 64], [-5, 62], [-12, 55], [-12, 48],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'zone-intensive-east', zoneKind: 'intensive', label: 'Intensive Rus Activity' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [25, 52], [32, 50], [42, 52], [45, 58],
          [40, 64], [30, 65], [25, 60], [25, 52],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'zone-sporadic-med', zoneKind: 'sporadic', label: 'Sporadic Raids (Mediterranean)' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-10, 35], [0, 33], [15, 35], [20, 38],
          [15, 42], [5, 43], [-5, 43], [-10, 40], [-10, 35],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'zone-sporadic-atlantic', zoneKind: 'sporadic', label: 'Atlantic Exploration' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-30, 55], [-20, 50], [-12, 55], [-15, 62],
          [-20, 67], [-35, 66], [-35, 60], [-30, 55],
        ]],
      },
    },
  ],
};
