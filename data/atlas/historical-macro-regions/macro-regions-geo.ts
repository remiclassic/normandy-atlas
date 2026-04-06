import type { RegionFeatureCollection } from '@/types';

/**
 * Approximate macro-zones for cultural/political presence — not tribal micro-borders.
 */
export const historicalMacroRegionsGeoJson: RegionFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'neustria',
        name: 'Neustria',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-2.2, 47.4],
            [2.8, 47.4],
            [2.8, 50.6],
            [-2.2, 50.6],
            [-2.2, 47.4],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'austrasia',
        name: 'Austrasia',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2.6, 47.5],
            [10.2, 47.5],
            [10.2, 51.2],
            [2.6, 51.2],
            [2.6, 47.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'burgundy-macro',
        name: 'Burgundy',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2.4, 45.6],
            [7.2, 45.6],
            [7.2, 47.9],
            [2.4, 47.9],
            [2.4, 45.6],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'aquitaine',
        name: 'Aquitaine',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.8, 43.4],
            [2.8, 43.2],
            [2.9, 45.6],
            [-0.8, 46.0],
            [-2.2, 45.0],
            [-1.8, 43.4],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'septimania',
        name: 'Septimania',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-0.2, 42.2],
            [4.2, 42.2],
            [4.2, 44.2],
            [0.4, 44.2],
            [-0.2, 42.2],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'lombard-italy',
        name: 'Lombard Italy',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [6.4, 43.0],
            [14.0, 43.0],
            [14.0, 46.4],
            [11.0, 47.5],
            [8.0, 46.0],
            [6.4, 44.8],
            [6.4, 43.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'carpathian-basin',
        name: 'Carpathian Basin',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [15.0, 44.5],
            [23.0, 44.5],
            [23.0, 49.0],
            [16.0, 49.0],
            [15.0, 46.2],
            [15.0, 44.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'baltic-coast',
        name: 'Baltic coast',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [13.0, 53.0],
            [25.0, 53.0],
            [25.0, 56.0],
            [14.0, 56.0],
            [13.0, 54.5],
            [13.0, 53.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'lower-seine',
        name: 'Lower Seine',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-1.15, 49.0],
            [1.25, 49.0],
            [1.25, 50.25],
            [-1.15, 50.25],
            [-1.15, 49.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'danelaw',
        name: 'Danelaw',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-4.0, 52.0],
            [2.0, 52.0],
            [2.0, 55.5],
            [-4.0, 55.5],
            [-4.0, 52.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'novgorod-sphere',
        name: 'Novgorod sphere',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [27.0, 56.0],
            [38.0, 56.0],
            [38.0, 61.0],
            [27.0, 61.0],
            [27.0, 56.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'kyiv-sphere',
        name: 'Kyiv sphere',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [22.0, 48.0],
            [33.0, 48.0],
            [33.0, 53.0],
            [22.0, 53.0],
            [22.0, 48.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'galicia-iberia',
        name: 'Galicia–Iberia (NW)',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-9.5, 41.0],
            [-1.5, 41.0],
            [-1.5, 44.0],
            [-6.0, 44.5],
            [-9.5, 43.5],
            [-9.5, 41.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'brittany',
        name: 'Brittany',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-5.2, 47.2],
            [-0.9, 47.2],
            [-0.9, 48.9],
            [-5.2, 48.9],
            [-5.2, 47.2],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'flanders',
        name: 'Flanders',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [1.5, 50.0],
            [5.5, 50.0],
            [5.5, 52.0],
            [1.5, 52.0],
            [1.5, 50.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'saxony',
        name: 'Saxony',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [5.5, 50.0],
            [15.0, 50.0],
            [15.0, 54.0],
            [8.0, 54.0],
            [5.5, 52.0],
            [5.5, 50.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'bohemia-moravia',
        name: 'Bohemia–Moravia',
        namesByEra: {},
        color: '#6b7280',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [11.0, 48.0],
            [19.0, 48.0],
            [19.0, 51.5],
            [11.0, 51.5],
            [11.0, 48.0],
          ],
        ],
      },
    },
  ],
};
