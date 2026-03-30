// Major Norman rivers — primary axes of Viking penetration and settlement.

export interface NormandyRiverFeature {
  type: 'Feature';
  properties: {
    id: string;
    name: string;
    role: 'primary' | 'secondary';
    note: string;
  };
  geometry: { type: 'LineString'; coordinates: number[][] };
}

export interface NormandyRiverCollection {
  type: 'FeatureCollection';
  features: NormandyRiverFeature[];
}

export const normandyRiversGeoJson: NormandyRiverCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'river-seine',
        name: 'Seine',
        role: 'primary',
        note: 'Main artery of Viking penetration. Rouen fell 841; Paris besieged 885–886.',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [2.35, 48.86],
          [2.18, 48.94],
          [1.90, 49.05],
          [1.60, 49.19],
          [1.35, 49.25],
          [1.10, 49.44],
          [0.88, 49.45],
          [0.70, 49.46],
          [0.50, 49.48],
          [0.30, 49.46],
          [0.12, 49.48],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'river-eure',
        name: 'Eure',
        role: 'secondary',
        note: 'Southern tributary joining the Seine near Pont-de-l\'Arche.',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [1.48, 48.44],
          [1.38, 48.62],
          [1.25, 48.80],
          [1.15, 49.02],
          [1.20, 49.22],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'river-orne',
        name: 'Orne',
        role: 'secondary',
        note: 'Flows through Caen to the Channel; axis of Bessin settlement.',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-0.02, 48.44],
          [-0.08, 48.62],
          [-0.20, 48.80],
          [-0.37, 49.18],
          [-0.34, 49.28],
          [-0.26, 49.30],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'river-vire',
        name: 'Vire',
        role: 'secondary',
        note: 'Western river; corridor into the Cotentin and Avranchin.',
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-0.88, 48.55],
          [-0.89, 48.72],
          [-0.89, 48.84],
          [-0.90, 49.00],
          [-1.02, 49.15],
          [-1.10, 49.32],
        ],
      },
    },
  ],
};
