import type { RegionFeatureCollection } from '@/types';

export const atlasRegionsGeoJson: RegionFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // ── Pre-Roman tribal / deep-time regions ─────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'normandy-neolithic-zone',
        name: 'Armorican Coastal Plain',
        namesByEra: {
          'neolithic-normandy': 'Armorican Coastal Plain',
          'bronze-age-channel': 'Armorican Coastal Plain',
        },
        color: '#7a6b52',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.95, 48.4],
            [-0.5, 48.3],
            [0.5, 48.6],
            [1.5, 49.1],
            [1.8, 49.5],
            [1.2, 49.9],
            [0.0, 49.8],
            [-0.8, 49.7],
            [-1.85, 49.7],
            [-1.95, 49.0],
            [-1.95, 48.4],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'channel-islands-neolithic',
        name: 'Channel Islands',
        namesByEra: {
          'neolithic-normandy': 'Channel Islands',
          'bronze-age-channel': 'Channel Islands',
        },
        color: '#7a6b52',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-2.65, 49.15],
            [-2.0, 49.15],
            [-2.0, 49.55],
            [-2.65, 49.55],
            [-2.65, 49.15],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'channel-trade-zone',
        name: 'Channel Trade Corridor',
        namesByEra: {
          'bronze-age-channel': 'Channel Maritime Corridor',
        },
        color: '#4a6e8a',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-2.5, 49.5],
            [-1.5, 49.3],
            [0.0, 49.6],
            [1.5, 50.0],
            [2.0, 50.6],
            [1.5, 51.0],
            [0.0, 51.2],
            [-1.5, 50.8],
            [-2.5, 50.3],
            [-2.5, 49.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'caletes',
        name: 'Caletes',
        namesByEra: {
          'iron-age-gaul': 'Caletes',
          'roman-gaul': 'Civitas Caletorum',
        },
        color: '#8b6a3e',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0.5, 49.55],
            [1.1, 49.55],
            [1.5, 49.7],
            [1.4, 49.95],
            [0.9, 49.95],
            [0.4, 49.85],
            [0.2, 49.7],
            [0.5, 49.55],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'veliocasses',
        name: 'Veliocasses',
        namesByEra: {
          'iron-age-gaul': 'Veliocasses',
          'roman-gaul': 'Civitas Veliocassium',
        },
        color: '#a85c3b',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0.5, 49.15],
            [1.1, 49.1],
            [1.7, 49.2],
            [2.0, 49.35],
            [1.7, 49.55],
            [1.1, 49.55],
            [0.5, 49.55],
            [0.2, 49.4],
            [0.5, 49.15],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'unelli',
        name: 'Unelli',
        namesByEra: {
          'iron-age-gaul': 'Unelli',
          'roman-gaul': 'Civitas Unellorum',
        },
        color: '#5b7fa5',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.95, 49.0],
            [-1.6, 48.8],
            [-1.2, 48.9],
            [-1.0, 49.15],
            [-1.1, 49.45],
            [-1.3, 49.7],
            [-1.85, 49.7],
            [-1.95, 49.5],
            [-1.95, 49.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'abrincates',
        name: 'Abrincates',
        namesByEra: {
          'iron-age-gaul': 'Abrincates',
          'roman-gaul': 'Civitas Abrincatum',
        },
        color: '#6b8a5b',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.6, 48.5],
            [-1.2, 48.5],
            [-1.0, 48.7],
            [-1.0, 48.9],
            [-1.2, 48.9],
            [-1.6, 48.8],
            [-1.8, 48.65],
            [-1.6, 48.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'lugdunensis-secunda',
        name: 'Lugdunensis Secunda',
        namesByEra: {
          'roman-gaul': 'Lugdunensis Secunda',
        },
        color: '#8b4a4a',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.95, 48.4],
            [-0.5, 48.3],
            [0.5, 48.5],
            [1.5, 49.0],
            [1.8, 49.5],
            [1.4, 49.95],
            [0.5, 49.9],
            [-0.5, 49.75],
            [-1.85, 49.7],
            [-1.95, 49.0],
            [-1.95, 48.4],
          ],
        ],
      },
    },
    // ── Post-Roman → Medieval ───────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'neustria',
        name: 'Neustria',
        namesByEra: {
          'post-roman-gaul': 'Northern Gaul',
          'neustria': 'Neustria',
          'frankish-carolingian': 'Neustria (Carolingian)',
        },
        color: '#6b5a3e',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.8, 47.2],
            [0.5, 47.0],
            [2.8, 47.5],
            [3.5, 48.2],
            [3.2, 49.0],
            [2.5, 49.8],
            [1.5, 50.0],
            [0.0, 49.9],
            [-1.5, 49.5],
            [-2.5, 48.6],
            [-1.8, 47.2],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'lower-seine',
        name: 'Lower Seine',
        namesByEra: {
          'iron-age-gaul': 'Seine Valley (tribal)',
          'roman-gaul': 'Lower Seine (Roman)',
          'post-roman-gaul': 'Lower Seine',
          'neustria': 'Seine Valley',
          'frankish-carolingian': 'Seine Valley',
          'viking-age': 'Lower Seine (contested)',
          'norman-origins': 'Norman Seine',
        },
        color: '#8b4a3a',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0.1, 49.25],
            [0.6, 49.15],
            [1.0, 49.1],
            [1.6, 49.2],
            [2.0, 49.1],
            [2.4, 48.9],
            [2.5, 49.05],
            [2.1, 49.35],
            [1.6, 49.55],
            [1.1, 49.6],
            [0.5, 49.55],
            [0.1, 49.45],
            [0.1, 49.25],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'frankish-core',
        name: 'Frankish Heartland',
        namesByEra: {
          'roman-gaul': 'Lutetia Region',
          'post-roman-gaul': 'Frankish Heartland',
          'neustria': 'Île-de-France',
          'frankish-carolingian': 'Carolingian Core',
          'viking-age': 'Frankish Île-de-France',
        },
        color: '#5b7fa5',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1.5, 48.3],
            [2.8, 48.3],
            [3.4, 48.7],
            [3.3, 49.2],
            [2.8, 49.5],
            [2.1, 49.5],
            [1.6, 49.2],
            [1.5, 48.7],
            [1.5, 48.3],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'channel-coast',
        name: 'Channel Coast',
        namesByEra: {
          'bronze-age-channel': 'Channel Shore',
          'iron-age-gaul': 'Channel Shore (tribal)',
          'roman-gaul': 'Litus Saxonicum',
          'frankish-carolingian': 'Channel Coast (frontier)',
          'viking-age': 'Channel Coast (raided)',
          'norman-origins': 'Norman Coast',
        },
        color: '#8b4a3a',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.9, 49.6],
            [-1.0, 49.65],
            [0.0, 49.75],
            [0.8, 49.85],
            [1.5, 50.0],
            [1.6, 50.15],
            [0.8, 50.1],
            [0.0, 50.0],
            [-1.0, 49.9],
            [-1.9, 49.85],
            [-1.9, 49.6],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'normandy',
        name: 'Normandy',
        namesByEra: {
          'viking-age': 'Contested Seine territory',
          'norman-origins': 'Normandy',
          'norman-expansion': 'Duchy of Normandy',
          'age-of-exploration': 'Normandy',
          'new-france-foundations': 'Normandy',
          'royal-new-france': 'Normandy',
          'atlantic-imprint': 'Normandy',
        },
        color: '#c4a962',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.9, 48.45],
            [-0.5, 48.35],
            [0.4, 48.55],
            [1.3, 49.0],
            [1.8, 49.4],
            [1.3, 49.85],
            [0.2, 49.75],
            [-0.6, 49.68],
            [-1.2, 49.7],
            [-1.85, 49.7],
            [-1.95, 49.2],
            [-1.9, 48.45],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'perche',
        name: 'Perche',
        namesByEra: {
          'age-of-exploration': 'Perche',
          'new-france-foundations': 'Perche',
          'royal-new-france': 'Perche',
        },
        color: '#a85c3b',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [0.2, 48.2],
            [0.9, 48.2],
            [1.1, 48.4],
            [0.9, 48.7],
            [0.3, 48.7],
            [0.1, 48.5],
            [0.2, 48.2],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'aunis',
        name: 'Aunis / La Rochelle',
        namesByEra: {
          'age-of-exploration': 'Aunis',
          'new-france-foundations': 'Aunis / La Rochelle',
          'royal-new-france': 'Aunis / La Rochelle',
        },
        color: '#5b7fa5',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.4, 45.8],
            [-0.7, 45.8],
            [-0.5, 46.0],
            [-0.6, 46.3],
            [-0.9, 46.5],
            [-1.3, 46.4],
            [-1.5, 46.1],
            [-1.4, 45.8],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'brittany',
        name: 'Brittany',
        namesByEra: {
          'age-of-exploration': 'Brittany',
          'new-france-foundations': 'Brittany',
          'royal-new-france': 'Brittany',
        },
        color: '#5b7fa5',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.9, 48.45],
            [-1.5, 47.8],
            [-2.5, 47.3],
            [-3.5, 47.5],
            [-4.8, 48.0],
            [-4.5, 48.5],
            [-3.5, 48.7],
            [-2.2, 48.65],
            [-1.9, 48.45],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'new-france',
        name: 'New France',
        namesByEra: {
          'new-france-foundations': 'Canada (New France)',
          'royal-new-france': 'Canada (New France)',
          'atlantic-imprint': 'Canada (New France)',
        },
        color: '#c4a962',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-78.0, 43.5],
            [-75.0, 44.0],
            [-72.0, 44.5],
            [-69.0, 46.0],
            [-66.0, 47.5],
            [-63.0, 48.5],
            [-60.0, 49.5],
            [-58.0, 51.0],
            [-62.0, 52.0],
            [-68.0, 51.5],
            [-75.0, 49.5],
            [-80.0, 48.0],
            [-84.0, 46.5],
            [-86.0, 44.5],
            [-83.0, 42.5],
            [-80.0, 42.5],
            [-78.0, 43.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'acadia',
        name: 'Acadia',
        namesByEra: {
          'new-france-foundations': 'Acadie',
          'royal-new-france': 'Acadie',
          'atlantic-imprint': 'Acadie',
        },
        color: '#a85c3b',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-68.0, 43.5],
            [-66.0, 43.0],
            [-63.5, 43.5],
            [-60.5, 44.0],
            [-59.5, 45.0],
            [-59.0, 46.5],
            [-60.0, 47.5],
            [-62.0, 48.2],
            [-64.5, 48.5],
            [-67.0, 48.0],
            [-69.0, 47.0],
            [-69.5, 45.5],
            [-68.0, 43.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'ile-royale',
        name: 'Île Royale & Île Saint-Jean',
        namesByEra: {
          'atlantic-imprint': 'Île Royale & Île Saint-Jean',
        },
        color: '#a85c3b',
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-61.5, 45.5],
              [-60.0, 45.6],
              [-59.7, 46.0],
              [-59.8, 46.3],
              [-60.5, 46.4],
              [-61.2, 46.2],
              [-61.5, 45.8],
              [-61.5, 45.5],
            ],
          ],
          [
            [
              [-64.2, 46.0],
              [-63.0, 46.0],
              [-62.0, 46.3],
              [-62.5, 46.6],
              [-63.5, 46.7],
              [-64.5, 46.4],
              [-64.2, 46.0],
            ],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'atlantic-basin',
        name: 'North Atlantic',
        namesByEra: {
          'age-of-exploration': 'North Atlantic',
          'new-france-foundations': 'North Atlantic',
          'royal-new-france': 'North Atlantic',
        },
        color: '#3d5670',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-5.0, 43.0],
            [-5.0, 52.0],
            [-20.0, 55.0],
            [-40.0, 53.0],
            [-55.0, 50.0],
            [-60.0, 47.0],
            [-55.0, 42.0],
            [-40.0, 40.0],
            [-20.0, 40.0],
            [-5.0, 43.0],
          ],
        ],
      },
    },
    // ── Scandinavian homeland ─────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'scandinavian-homeland',
        name: 'Scandinavian Homeland',
        namesByEra: {
          'frankish-carolingian': 'Scandinavia',
          'viking-age': 'Norse Homelands',
          'norman-origins': 'Scandinavia',
        },
        color: '#2d9e8a',
        fillIntent: 'homeland',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [4.5, 58.0],
            [5.0, 59.0],
            [5.3, 60.5],
            [5.0, 62.0],
            [6.0, 63.5],
            [10.0, 64.5],
            [14.0, 65.0],
            [18.0, 65.5],
            [20.0, 64.0],
            [22.0, 62.0],
            [24.0, 60.5],
            [22.0, 59.0],
            [19.0, 58.5],
            [16.0, 56.5],
            [14.0, 55.5],
            [12.5, 55.3],
            [12.0, 54.5],
            [10.5, 54.8],
            [9.0, 55.5],
            [8.0, 56.5],
            [7.0, 57.5],
            [4.5, 58.0],
          ],
        ],
      },
    },
    // ── Viking influence zones (soft, probabilistic) ──────────────────
    {
      type: 'Feature',
      properties: {
        id: 'danelaw',
        name: 'Danelaw',
        namesByEra: {
          'viking-age': 'Danelaw',
          'norman-origins': 'Danelaw (fading)',
        },
        color: '#5b8fa5',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-2.0, 53.0],
            [-1.0, 52.0],
            [0.5, 52.5],
            [1.8, 52.8],
            [1.5, 54.0],
            [0.5, 55.0],
            [-0.5, 55.5],
            [-2.0, 55.0],
            [-2.5, 54.0],
            [-2.0, 53.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'norse-gaelic-sphere',
        name: 'Norse-Gaelic Sphere',
        namesByEra: {
          'viking-age': 'Norse-Gaelic World',
          'norman-origins': 'Norse-Gaelic Sphere',
        },
        color: '#2a9e94',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-10.0, 55.0],
            [-8.0, 53.0],
            [-5.5, 52.5],
            [-4.0, 53.5],
            [-3.5, 55.0],
            [-5.0, 57.0],
            [-7.0, 58.5],
            [-4.0, 59.0],
            [-2.5, 59.5],
            [-5.0, 60.0],
            [-8.0, 59.0],
            [-10.0, 57.0],
            [-10.0, 55.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'kievan-rus-zone',
        name: 'Kievan Rus',
        namesByEra: {
          'viking-age': 'Varangian / Kievan Rus',
          'norman-origins': 'Kievan Rus',
        },
        color: '#8b5a3a',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [25.0, 58.0],
            [28.0, 60.0],
            [35.0, 61.0],
            [40.0, 58.0],
            [38.0, 55.0],
            [35.0, 52.0],
            [32.0, 49.0],
            [28.0, 48.5],
            [26.0, 50.0],
            [25.0, 53.0],
            [25.0, 58.0],
          ],
        ],
      },
    },
    // ── Colonial settlement zones (pedagogical, low-precision) ───────
    {
      type: 'Feature',
      properties: {
        id: 'colony-zone-quebec',
        name: 'Québec Region',
        namesByEra: {
          'new-france-foundations': 'Québec Region',
          'royal-new-france': 'Québec Region',
        },
        color: '#c4a962',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-71.8, 46.5],
            [-70.8, 46.6],
            [-70.2, 47.0],
            [-70.0, 47.3],
            [-70.5, 47.5],
            [-71.5, 47.2],
            [-72.0, 46.9],
            [-71.8, 46.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'colony-zone-trois-rivieres',
        name: 'Trois-Rivières Region',
        namesByEra: {
          'new-france-foundations': 'Trois-Rivières Region',
          'royal-new-france': 'Trois-Rivières Region',
        },
        color: '#a85c3b',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.0, 46.0],
            [-72.0, 46.1],
            [-71.8, 46.5],
            [-72.0, 46.9],
            [-72.8, 46.7],
            [-73.2, 46.3],
            [-73.0, 46.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'colony-zone-montreal',
        name: 'Montréal Region',
        namesByEra: {
          'new-france-foundations': 'Montréal Region',
          'royal-new-france': 'Montréal Region',
        },
        color: '#5b7fa5',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.2, 45.2],
            [-73.2, 45.3],
            [-73.0, 45.6],
            [-73.0, 46.0],
            [-73.5, 46.1],
            [-74.3, 45.8],
            [-74.5, 45.5],
            [-74.2, 45.2],
          ],
        ],
      },
    },
  ],
};
