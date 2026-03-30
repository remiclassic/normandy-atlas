// Cultural origin zones — ethnic/settler enclaves within Viking Age Normandy.
// Two headline zones per the scholarly model: Celtic-Norwegian (Cotentin)
// and Danish (Seine Valley / Caux). Anglo-Scandinavian presence noted as
// a secondary characteristic on the Danish zone rather than a standalone area.

export interface CulturalZoneFeature {
  type: 'Feature';
  properties: {
    id: string;
    name: string;
    color: string;
    note: string;
    characteristics: string[];
  };
  geometry: { type: 'Polygon'; coordinates: number[][][] };
}

export interface CulturalZoneCollection {
  type: 'FeatureCollection';
  features: CulturalZoneFeature[];
}

export const culturalZonesGeoJson: CulturalZoneCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'zone-celtic-norwegian',
        name: 'Celtic-Norwegian Zone',
        color: '#3a8fc4',
        note: 'Norwegian settlers dominated the Cotentin coast, with strong links to Norse communities in Ireland, Scotland, and the Hebrides. Gaelic-Norse cultural elements distinguish this zone from the Danish-settled east.',
        characteristics: [
          'Norwegian settlers via the Irish Sea',
          'Gaelic-Scandinavian mixed culture',
          'Distinct place-name patterns (hogue, mare)',
          'Maritime and pastoral economy',
          'Links to Orkney, Hebrides, and Dublin Norse',
        ],
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-0.92, 49.22],
          [-1.00, 49.55],
          [-1.30, 49.70],
          [-1.78, 49.65],
          [-1.90, 49.45],
          [-1.85, 49.18],
          [-1.65, 48.92],
          [-1.40, 48.72],
          [-1.10, 48.65],
          [-0.92, 48.78],
          [-0.92, 49.00],
          [-0.92, 49.22],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'zone-danish',
        name: 'Danish Zone',
        color: '#c44040',
        note: 'Rollo\'s Danes controlled the Seine valley and Pays de Caux from the 911 treaty onward. The political, ecclesiastical, and economic core of early Normandy. Post-911 Anglo-Scandinavian migrants from the Danelaw augmented the Danish population, especially in Bessin and the southern lowlands.',
        characteristics: [
          'Danish Viking political control',
          'Strong river-based settlement along the Seine',
          'Dense -tot/-bec/-dalle toponymy (Pays de Caux)',
          'Ducal capital at Rouen',
          'Key sites: Jumièges, Fécamp, Rouen',
          'Anglo-Scandinavian Danelaw migrants in Bessin',
        ],
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [0.00, 49.75],
          [0.50, 49.82],
          [1.08, 49.93],
          [1.60, 49.70],
          [1.60, 49.25],
          [1.35, 49.10],
          [0.80, 49.08],
          [0.30, 49.08],
          [-0.20, 49.10],
          [-0.60, 49.15],
          [-0.80, 49.30],
          [-0.55, 49.35],
          [-0.10, 49.42],
          [0.00, 49.75],
        ]],
      },
    },
  ],
};
