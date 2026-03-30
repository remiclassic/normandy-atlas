// Schematic polygons for the full Norman sphere of power (911–1204+).
// Boundaries are illustrative outlines, not survey-grade.

export type NormanRealmTier = 'direct' | 'crusader' | 'influence';

export interface NormanRealmFeature {
  type: 'Feature';
  properties: {
    id: string;
    name: string;
    period: string;
    tier: NormanRealmTier;
  };
  geometry: { type: 'Polygon'; coordinates: number[][][] };
}

export interface NormanRealmCollection {
  type: 'FeatureCollection';
  features: NormanRealmFeature[];
}

export const normanRealmsGeoJson: NormanRealmCollection = {
  type: 'FeatureCollection',
  features: [
    // -----------------------------------------------------------------------
    // DIRECT — homelands and ruled kingdoms / polities
    // -----------------------------------------------------------------------
    {
      type: 'Feature',
      properties: { id: 'realm-normandy', name: 'Normandy', period: '911–1204', tier: 'direct' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-1.95, 48.65], [-1.55, 48.50], [-1.10, 48.45], [-0.40, 48.45],
          [0.10, 48.55], [0.70, 48.80], [1.20, 49.00], [1.72, 49.20],
          [1.78, 49.55], [1.75, 49.85], [1.40, 49.95], [0.80, 49.90],
          [0.10, 49.80], [-0.50, 49.70], [-1.10, 49.65], [-1.85, 49.20],
          [-1.95, 48.65],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-england', name: 'England', period: '1066–1154', tier: 'direct' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-5.70, 50.05], [-5.05, 50.05], [-3.50, 50.35], [-1.50, 50.70],
          [0.50, 51.10], [1.45, 51.35], [1.70, 51.80], [1.40, 52.50],
          [0.50, 52.95], [0.30, 53.40], [-0.30, 53.75], [-0.80, 54.50],
          [-1.20, 55.00], [-1.65, 55.60], [-2.60, 55.80], [-3.05, 55.05],
          [-3.10, 54.10], [-3.40, 53.30], [-3.10, 52.55], [-4.10, 52.30],
          [-5.25, 51.85], [-5.30, 51.45], [-4.30, 51.40], [-3.60, 51.20],
          [-3.90, 50.70], [-5.10, 50.40], [-5.70, 50.05],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-southern-italy', name: 'Southern Italy', period: '1016–1194', tier: 'direct' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [14.50, 41.60], [15.50, 41.90], [16.50, 41.80], [17.10, 41.25],
          [17.95, 40.65], [18.50, 40.15], [18.20, 39.80], [17.10, 39.60],
          [16.60, 39.10], [16.10, 38.90], [15.65, 38.25], [15.65, 38.00],
          [15.90, 37.95], [15.65, 37.92], [15.50, 38.60], [15.20, 39.20],
          [14.85, 39.90], [14.30, 40.60], [14.10, 40.85], [14.20, 41.10],
          [14.50, 41.60],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-sicily', name: 'Sicily', period: '1130–1194', tier: 'direct' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [12.45, 37.80], [13.00, 37.55], [13.35, 37.35], [14.00, 36.95],
          [14.50, 36.75], [15.10, 36.70], [15.60, 37.00], [15.30, 37.50],
          [15.65, 38.00], [15.20, 38.25], [14.50, 38.20], [13.40, 38.15],
          [12.70, 38.05], [12.45, 37.80],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-ireland-pale', name: 'Ireland (The Pale)', period: '1169–1200+', tier: 'direct' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-6.60, 53.60], [-6.10, 53.65], [-5.95, 53.45], [-6.05, 53.20],
          [-6.15, 53.00], [-6.40, 52.80], [-6.70, 52.85], [-6.85, 53.05],
          [-6.80, 53.30], [-6.60, 53.60],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-ifriqiya', name: 'Kingdom of Africa', period: '1135–1160', tier: 'direct' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [8.20, 37.30], [9.20, 37.10], [10.30, 37.00], [10.90, 36.85],
          [11.10, 36.50], [11.00, 35.80], [10.60, 35.20], [10.10, 34.80],
          [9.50, 34.60], [8.80, 34.70], [8.30, 35.20], [8.10, 35.80],
          [8.00, 36.50], [8.20, 37.30],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-cyprus', name: 'Cyprus', period: '1191–1192', tier: 'direct' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [32.30, 35.15], [32.90, 35.40], [33.60, 35.35], [34.10, 35.65],
          [34.60, 35.60], [34.55, 35.15], [33.90, 34.95], [33.10, 34.90],
          [32.50, 34.95], [32.30, 35.15],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-balkans', name: 'Adriatic Holdings', period: '1081–1085', tier: 'direct' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [19.40, 41.40], [19.80, 41.50], [20.10, 41.15], [20.20, 40.60],
          [20.00, 40.10], [19.75, 39.80], [19.45, 39.60], [19.20, 39.80],
          [19.20, 40.20], [19.30, 40.80], [19.40, 41.40],
        ]],
      },
    },
    // -----------------------------------------------------------------------
    // CRUSADER — Norman-led or Norman-influenced Levant states
    // -----------------------------------------------------------------------
    {
      type: 'Feature',
      properties: { id: 'realm-antioch', name: 'Principality of Antioch', period: '1098–1268', tier: 'crusader' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [35.50, 36.50], [36.10, 36.60], [36.60, 36.50], [36.80, 36.20],
          [36.50, 35.70], [36.25, 35.40], [35.90, 35.20], [35.50, 35.50],
          [35.35, 35.90], [35.40, 36.20], [35.50, 36.50],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-tripoli', name: 'County of Tripoli', period: '1109–1289', tier: 'crusader' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [35.40, 35.20], [35.90, 35.20], [36.10, 34.80], [36.20, 34.40],
          [36.00, 34.10], [35.60, 34.00], [35.30, 34.30], [35.20, 34.70],
          [35.25, 35.00], [35.40, 35.20],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-edessa', name: 'County of Edessa', period: '1098–1144', tier: 'crusader' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [37.00, 37.50], [37.90, 37.60], [38.60, 37.30], [38.80, 36.80],
          [38.50, 36.40], [37.80, 36.30], [37.20, 36.50], [36.90, 36.90],
          [37.00, 37.50],
        ]],
      },
    },
    // -----------------------------------------------------------------------
    // INFLUENCE — feudal spread, partial control, military participation
    // -----------------------------------------------------------------------
    {
      type: 'Feature',
      properties: { id: 'realm-scotland', name: 'Scotland (feudal influence)', period: '1070s–1200+', tier: 'influence' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-5.60, 55.90], [-4.80, 55.80], [-3.30, 55.80], [-2.60, 55.80],
          [-2.00, 56.10], [-1.80, 56.60], [-2.30, 57.10], [-3.00, 57.70],
          [-5.00, 58.50], [-5.60, 57.80], [-5.90, 57.10], [-5.80, 56.40],
          [-5.60, 55.90],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-wales-marches', name: 'Welsh Marches', period: '1067–1200+', tier: 'influence' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-3.10, 52.55], [-3.00, 52.20], [-2.80, 51.80], [-3.10, 51.50],
          [-3.60, 51.20], [-4.30, 51.40], [-5.25, 51.85], [-5.00, 52.20],
          [-4.50, 52.40], [-4.10, 52.30], [-3.10, 52.55],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'realm-iberia', name: 'Iberian participation', period: '1064–1147', tier: 'influence' },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-9.50, 38.50], [-9.10, 38.80], [-8.50, 39.20], [-8.80, 39.60],
          [-9.30, 39.50], [-9.60, 39.20], [-9.80, 38.90], [-9.50, 38.50],
        ]],
      },
    },
  ],
};
