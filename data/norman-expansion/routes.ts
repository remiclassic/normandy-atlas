// Expansion route arcs for the Norman Expansion layer (911–1204+).
// Consumed by Deck.gl ArcLayer (great-circle).

export type NormanRouteTier = 'primary' | 'secondary';

export interface NormanExpansionRoute {
  id: string;
  source: [number, number];
  target: [number, number];
  label: string;
  subtitle: string;
  weight: number;
  routeTier: NormanRouteTier;
}

export const normanExpansionRoutes: NormanExpansionRoute[] = [
  // --- Primary conquest routes ---
  {
    id: 'nexp-normandy-england',
    source: [0.10, 49.50],
    target: [0.57, 50.86],
    label: 'Norman Conquest',
    subtitle: '1066',
    weight: 4,
    routeTier: 'primary',
  },
  {
    id: 'nexp-normandy-southern-italy',
    source: [0.10, 49.00],
    target: [16.87, 41.12],
    label: 'Mercenary Expansion',
    subtitle: '1016–1130',
    weight: 3,
    routeTier: 'primary',
  },
  {
    id: 'nexp-southern-italy-sicily',
    source: [16.87, 41.12],
    target: [13.36, 38.12],
    label: 'Kingdom of Sicily',
    subtitle: '1061–1130',
    weight: 3,
    routeTier: 'primary',
  },
  {
    id: 'nexp-normandy-levant',
    source: [0.10, 49.00],
    target: [36.15, 36.20],
    label: 'First Crusade',
    subtitle: '1096–1099',
    weight: 3,
    routeTier: 'primary',
  },
  // --- Secondary / extended routes ---
  {
    id: 'nexp-england-ireland',
    source: [-0.13, 51.51],
    target: [-6.26, 53.35],
    label: 'Anglo-Norman Invasion',
    subtitle: '1169',
    weight: 2,
    routeTier: 'secondary',
  },
  {
    id: 'nexp-england-wales',
    source: [-0.13, 51.51],
    target: [-3.60, 51.90],
    label: 'Marcher Lords',
    subtitle: '1067+',
    weight: 2,
    routeTier: 'secondary',
  },
  {
    id: 'nexp-italy-ifriqiya',
    source: [13.36, 38.12],
    target: [10.17, 36.81],
    label: 'Kingdom of Africa',
    subtitle: '1135–1160',
    weight: 2,
    routeTier: 'secondary',
  },
  {
    id: 'nexp-italy-balkans',
    source: [16.87, 41.12],
    target: [19.45, 41.32],
    label: 'Norman-Byzantine Wars',
    subtitle: '1081–1085',
    weight: 2,
    routeTier: 'secondary',
  },
  {
    id: 'nexp-england-cyprus',
    source: [-0.13, 51.51],
    target: [33.36, 35.17],
    label: 'Conquest of Cyprus',
    subtitle: '1191',
    weight: 2,
    routeTier: 'secondary',
  },
  {
    id: 'nexp-bari-antioch',
    source: [16.87, 41.12],
    target: [36.15, 36.20],
    label: 'Crusade staging',
    subtitle: '1096+',
    weight: 2,
    routeTier: 'secondary',
  },
];
