// Historical pays (micro-regions) of Normandy, approximated from known
// geographic anchors (river mouths, headlands, major settlements).
// These are NOT modern admin boundaries — they trace early-medieval
// territorial divisions attested in Carolingian and ducal sources.

export interface MicroRegionFeature {
  type: 'Feature';
  properties: {
    id: string;
    name: string;
    summary: string;
    sourceNote: string;
  };
  geometry: { type: 'Polygon'; coordinates: number[][][] };
}

export interface MicroRegionCollection {
  type: 'FeatureCollection';
  features: MicroRegionFeature[];
}

export const microRegionsGeoJson: MicroRegionCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'region-cotentin',
        name: 'Cotentin',
        summary:
          'The Cotentin peninsula, dominated by Norwegian settlers with strong links to the Irish Sea Viking world. La Hague and Barfleur are key coastal anchors.',
        sourceNote:
          'Boundaries approximate the medieval pagus Constantinus. Northern limit at Cap de la Hague; eastern edge follows the Vire corridor.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-1.94, 49.73],
          [-1.55, 49.72],
          [-1.26, 49.67],
          [-1.08, 49.55],
          [-1.02, 49.35],
          [-1.02, 49.05],
          [-1.20, 49.00],
          [-1.44, 49.05],
          [-1.70, 49.10],
          [-1.88, 49.20],
          [-1.92, 49.42],
          [-1.94, 49.73],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'region-avranchin',
        name: 'Avranchin',
        summary:
          'The southernmost territory of Normandy, centered on Avranches and bordering Brittany. Acquired by William Longsword in 933, it includes Mont-Saint-Michel.',
        sourceNote:
          'Boundaries approximate the medieval pagus Abrincatinus. Southern limit at Mont-Saint-Michel bay; eastern edge along the Sée and Sélune valleys.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-1.44, 49.05],
          [-1.20, 49.00],
          [-1.02, 49.05],
          [-1.00, 48.75],
          [-1.00, 48.55],
          [-1.18, 48.45],
          [-1.50, 48.44],
          [-1.60, 48.55],
          [-1.55, 48.70],
          [-1.55, 48.85],
          [-1.70, 49.10],
          [-1.44, 49.05],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'region-bessin',
        name: 'Bessin',
        summary:
          'The region around Bayeux, annexed ~924. Medium Scandinavian settlement density, blending Danish, Anglo-Scandinavian, and Frankish populations.',
        sourceNote:
          'Boundaries approximate the medieval pagus Baiocassinus. Coastal edge from the Vire estuary to the Orne mouth; southern limit at the Bocage hills.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-1.02, 49.35],
          [-0.55, 49.35],
          [-0.26, 49.30],
          [-0.20, 49.15],
          [-0.20, 48.95],
          [-0.55, 48.85],
          [-0.80, 48.85],
          [-1.02, 49.05],
          [-1.02, 49.35],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'region-hiemois',
        name: 'Hiémois / Caen',
        summary:
          'The south-central interior around Caen, Falaise, and Sées. Lower Viking settlement density; later became the political heartland under William the Conqueror.',
        sourceNote:
          'Boundaries approximate the medieval pagus Oximensis (Hiémois) plus the Caen plain. Northern edge near Caen; southern limit near Sées and the Perche marches.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-0.20, 49.15],
          [0.10, 49.10],
          [0.40, 49.00],
          [0.50, 48.80],
          [0.30, 48.60],
          [-0.10, 48.50],
          [-0.55, 48.55],
          [-0.80, 48.60],
          [-1.00, 48.75],
          [-1.00, 48.55],
          [-1.00, 48.75],
          [-0.80, 48.85],
          [-0.55, 48.85],
          [-0.20, 48.95],
          [-0.20, 49.15],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'region-pays-de-caux',
        name: 'Pays de Caux',
        summary:
          'The high chalk plateau of northeastern Normandy, from Fécamp to Dieppe. One of the densest zones of Scandinavian place names (-tot, -bec, -dalle), settled primarily by Danes.',
        sourceNote:
          'Boundaries approximate the medieval pagus Caletensis. Coastal edge from the Seine estuary to Dieppe; southern limit at the Seine valley.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [0.00, 49.50],
          [0.12, 49.72],
          [0.36, 49.78],
          [0.80, 49.89],
          [1.08, 49.93],
          [1.30, 49.90],
          [1.15, 49.55],
          [1.00, 49.48],
          [0.50, 49.48],
          [0.00, 49.50],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'region-roumois-seine',
        name: 'Rouen / Seine Valley',
        summary:
          'The political core of early Normandy: Rouen (ducal capital), Jumièges, Oissel, and the lower Seine corridor. Very high Danish settlement density. Boundary with the Carolingian Empire at the Epte river.',
        sourceNote:
          'Encompasses the medieval Roumois and Vexin normand. Eastern limit at the Epte (Saint-Clair-sur-Epte); western edge at the Risle valley.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [0.50, 49.48],
          [1.00, 49.48],
          [1.15, 49.55],
          [1.40, 49.52],
          [1.72, 49.42],
          [1.72, 49.26],
          [1.50, 49.08],
          [1.15, 49.02],
          [0.80, 49.00],
          [0.40, 49.00],
          [0.10, 49.10],
          [-0.20, 49.15],
          [-0.26, 49.30],
          [-0.10, 49.42],
          [0.00, 49.50],
          [0.50, 49.48],
        ]],
      },
    },
  ],
};

// Simplified modern Normandy boundary (admin outline for reference context).
export const normandyBoundaryGeoJson: MicroRegionCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'normandy-boundary',
        name: 'Normandy',
        summary: 'Approximate outline of the historical Duchy of Normandy at its fullest extent (~1050).',
        sourceNote: 'Simplified from the combined expansion phases. Not a modern administrative boundary.',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-1.94, 49.73],
          [-1.55, 49.72],
          [-1.26, 49.67],
          [-1.08, 49.55],
          [-0.95, 49.38],
          [-0.55, 49.35],
          [-0.26, 49.30],
          [0.00, 49.50],
          [0.12, 49.72],
          [0.36, 49.78],
          [0.80, 49.89],
          [1.08, 49.93],
          [1.40, 49.95],
          [1.72, 49.85],
          [1.75, 49.60],
          [1.72, 49.26],
          [1.50, 49.08],
          [1.15, 49.02],
          [0.80, 49.00],
          [0.50, 48.80],
          [0.30, 48.60],
          [-0.10, 48.50],
          [-0.55, 48.55],
          [-0.72, 48.40],
          [-1.18, 48.45],
          [-1.50, 48.44],
          [-1.60, 48.55],
          [-1.55, 48.70],
          [-1.55, 48.85],
          [-1.70, 49.10],
          [-1.88, 49.20],
          [-1.92, 49.42],
          [-1.94, 49.73],
        ]],
      },
    },
  ],
};
