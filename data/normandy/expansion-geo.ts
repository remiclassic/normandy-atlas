// Political expansion polygons for the Norman territorial build-out.
// Phase property drives filter-based visibility on the timeline slider.

export interface NormandyExpansionFeature {
  type: 'Feature';
  properties: {
    id: string;
    label: string;
    expansionYear: number;
    phase: number;
    sourceNote: string;
    fillIntent: 'treaty' | 'annexation' | 'consolidation';
  };
  geometry: { type: 'Polygon'; coordinates: number[][][] };
}

export interface NormandyExpansionCollection {
  type: 'FeatureCollection';
  features: NormandyExpansionFeature[];
}

export const normandyExpansionGeoJson: NormandyExpansionCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'expansion-911',
        label: '911 — Rollo Grant (Upper Normandy)',
        expansionYear: 911,
        phase: 1,
        sourceNote: 'Treaty of Saint-Clair-sur-Epte, 911. Charles the Simple ceded the lower Seine region to Rollo.',
        fillIntent: 'treaty',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [0.00, 49.75],
          [0.38, 49.78],
          [0.80, 49.89],
          [1.08, 49.93],
          [1.40, 49.95],
          [1.72, 49.85],
          [1.75, 49.60],
          [1.65, 49.26],
          [1.50, 49.08],
          [1.15, 49.02],
          [0.60, 49.08],
          [0.23, 49.15],
          [-0.05, 49.42],
          [0.00, 49.75],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'expansion-924',
        label: '924 — Bessin & Hiémois',
        expansionYear: 924,
        phase: 2,
        sourceNote: 'Bessin and Hiémois annexed ~924, extending Norman control westward to Bayeux and south toward Falaise.',
        fillIntent: 'annexation',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [0.23, 49.15],
          [-0.05, 49.42],
          [-0.25, 49.36],
          [-0.55, 49.35],
          [-0.80, 49.30],
          [-0.92, 49.22],
          [-0.92, 48.98],
          [-0.75, 48.78],
          [-0.30, 48.75],
          [-0.10, 48.80],
          [0.15, 48.90],
          [0.40, 49.00],
          [0.23, 49.15],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'expansion-933',
        label: '933 — Cotentin & Avranchin',
        expansionYear: 933,
        phase: 3,
        sourceNote: 'William Longsword acquired the Cotentin peninsula and Avranchin in 933, completing western Normandy.',
        fillIntent: 'annexation',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-0.92, 49.22],
          [-0.95, 49.35],
          [-1.00, 49.55],
          [-1.20, 49.68],
          [-1.55, 49.70],
          [-1.78, 49.65],
          [-1.90, 49.45],
          [-1.85, 49.18],
          [-1.70, 48.95],
          [-1.55, 48.85],
          [-1.35, 48.65],
          [-1.18, 48.62],
          [-1.00, 48.60],
          [-0.92, 48.75],
          [-0.92, 48.98],
          [-0.92, 49.22],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'expansion-1050',
        label: '~1050 — Southern Consolidation',
        expansionYear: 1050,
        phase: 4,
        sourceNote: 'By the mid-11th century the duchy\'s southern frontier stabilized, absorbing borderlands near the Perche and Maine marches.',
        fillIntent: 'consolidation',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [1.15, 49.02],
          [0.40, 49.00],
          [0.15, 48.90],
          [-0.10, 48.80],
          [-0.30, 48.75],
          [-0.75, 48.78],
          [-0.92, 48.75],
          [-1.00, 48.60],
          [-1.00, 48.45],
          [-0.72, 48.35],
          [-0.35, 48.38],
          [0.05, 48.45],
          [0.40, 48.52],
          [0.75, 48.60],
          [1.00, 48.72],
          [1.15, 48.85],
          [1.15, 49.02],
        ]],
      },
    },
  ],
};
