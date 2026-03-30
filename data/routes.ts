import type { RouteRecord } from '@/types';

export const routeRecords: RouteRecord[] = [
  // --- European / Medieval ---
  {
    id: 'viking-seine',
    kind: 'invasion',
    eraId: 'viking',
    title: 'Viking Raids on the Seine',
    summary:
      'From the late 8th century, Norse war-bands sailed south from Scandinavia, raiding coastal settlements and penetrating deep inland via the Seine. Rouen fell in 841, Paris was besieged in 885–886, and the raids only ended when Charles the Simple ceded territory to Rollo in 911.',
    geometry: 'path',
    source: [8.0, 58.0],
    target: [0.15, 49.45],
    coordinates: [
      [8.0, 58.0],
      [6.0, 57.0],
      [4.5, 55.0],
      [2.5, 52.5],
      [1.0, 50.5],
      [0.15, 49.45],
    ],
    animated: true,
    color: [91, 127, 165],
    width: 3,
  },
  {
    id: 'norman-conquest-1066',
    kind: 'invasion',
    eraId: 'duchy',
    title: 'Norman Conquest — 1066',
    summary:
      'On September 28, 1066, William, Duke of Normandy, crossed the Channel with an army of roughly 7,000 men and 700 ships. Landing at Pevensey, he marched to Hastings where he defeated King Harold II on October 14, changing the course of English history.',
    source: [-0.1, 49.3],
    target: [0.35, 50.75],
    animated: true,
    color: [196, 169, 98],
    width: 4,
  },
  {
    id: 'norman-sicily',
    kind: 'expansion',
    eraId: 'norman-expansion',
    title: 'Normans in Southern Italy',
    summary:
      'Norman adventurers began arriving in southern Italy as mercenaries and pilgrims in the early 11th century. By 1130, Roger II had united Norman holdings into the Kingdom of Sicily — a remarkably cosmopolitan state blending Latin, Greek, and Arab cultures.',
    source: [-0.5, 49.1],
    target: [14.25, 40.85],
    animated: true,
    color: [168, 92, 59],
    width: 2.5,
  },

  // --- Atlantic / Exploration ---
  {
    id: 'cartier-voyage-1534',
    kind: 'exploration',
    eraId: 'age-of-exploration',
    title: 'Jacques Cartier — First Voyage (1534)',
    summary:
      'Sailing from Saint-Malo, Cartier crossed the Atlantic and explored the Gulf of St. Lawrence. He claimed the territory for France and made contact with the Mi\'kmaq and Iroquoian peoples.',
    geometry: 'arc',
    source: [-1.98, 48.65],
    target: [-59.0, 49.0],
    animated: true,
    color: [91, 127, 165],
    width: 3,
  },
  {
    id: 'champlain-quebec-1608',
    kind: 'settlement',
    eraId: 'new-france',
    title: 'Champlain Founds Quebec (1608)',
    summary:
      'Samuel de Champlain sailed from Honfleur to establish a permanent habitation at Quebec on the St. Lawrence, beginning the colony of New France in earnest.',
    geometry: 'arc',
    source: [0.23, 49.43],
    target: [-71.21, 46.81],
    animated: true,
    color: [196, 169, 98],
    width: 3.5,
  },
  {
    id: 'atlantic-trade-route',
    kind: 'trade',
    eraId: 'new-france',
    eraIds: ['new-france', 'acadia-atlantic', 'louisiana-interior'],
    title: 'Atlantic Trade Route',
    summary:
      'The regular sailing route connecting French Atlantic ports — La Rochelle, Bordeaux, Nantes — to the St. Lawrence colonies. Ships carried settlers, supplies, and manufactured goods westward, returning with furs, fish, and timber.',
    geometry: 'arc',
    source: [-1.15, 46.16],
    target: [-71.21, 46.81],
    animated: true,
    color: [168, 92, 59],
    width: 2.5,
  },

  // --- Colonial corridors ---
  {
    id: 'st-lawrence-corridor',
    kind: 'river_corridor',
    eraId: 'new-france',
    eraIds: ['new-france', 'acadia-atlantic', 'louisiana-interior', 'seven-years-war'],
    title: 'St. Lawrence River Corridor',
    summary:
      'The St. Lawrence was the lifeline of New France. Canoes, bateaux, and ships carried furs, missionaries, soldiers, and settlers between Quebec, Trois-Rivières, and Montreal.',
    geometry: 'path',
    source: [-69.5, 48.0],
    target: [-73.56, 45.51],
    coordinates: [
      [-69.5, 48.0],
      [-70.2, 47.4],
      [-71.21, 46.81],
      [-72.0, 46.4],
      [-72.55, 46.35],
      [-73.56, 45.51],
    ],
    animated: false,
    color: [91, 127, 165],
    width: 2,
  },
  {
    id: 'mississippi-corridor',
    kind: 'river_corridor',
    eraId: 'louisiana-interior',
    eraIds: ['louisiana-interior', 'seven-years-war'],
    title: 'Mississippi River Corridor',
    summary:
      'La Salle descended the Mississippi in 1682, claiming the vast interior for France. The river became the axis of Louisiana — connecting the Great Lakes fur trade to the Gulf of Mexico.',
    geometry: 'path',
    source: [-87.6, 41.9],
    target: [-90.07, 29.95],
    coordinates: [
      [-87.6, 41.9],
      [-89.0, 39.0],
      [-89.5, 37.0],
      [-90.2, 35.0],
      [-91.1, 33.0],
      [-91.0, 31.0],
      [-90.07, 29.95],
    ],
    animated: false,
    color: [122, 114, 101],
    width: 2,
  },
];

export function getRoutesForEra(eraId: string): RouteRecord[] {
  return routeRecords.filter((r) => r.eraId === eraId || (r.eraIds?.includes(eraId) ?? false));
}
