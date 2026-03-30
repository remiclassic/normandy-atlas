import type { Era } from '@/types';

export const eras: Era[] = [
  // ──────────── Origins ────────────
  {
    id: 'roman-gaul',
    label: 'Roman Gaul',
    yearRange: [-50, 476],
    summary:
      'Gallia under Roman rule. The region that would become Normandy was part of Lugdunensis Secunda, administered from Rotomagus (Rouen). Roman roads, villas, and urban centers shaped the landscape for centuries.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'settlements'],
    timelineGroup: 'Origins',
    geographicScope: 'old_world',
    camera: { center: [0.0, 49.2], zoom: 5.8 },
  },
  {
    id: 'frankish',
    label: 'Frankish Kingdom',
    yearRange: [481, 843],
    summary:
      'After Rome fell, the Franks unified Gaul. The future Normandy was part of Neustria, the western Frankish realm. Carolingian administration divided the territory into counties, but central power weakened after Charlemagne.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'settlements'],
    timelineGroup: 'Origins',
    geographicScope: 'old_world',
    camera: { center: [0.0, 49.2], zoom: 5.8 },
  },
  {
    id: 'viking',
    label: 'Viking Incursions',
    yearRange: [793, 911],
    summary:
      'Norse raiders struck the Seine valley repeatedly from the late 8th century. Rouen fell in 841. Siege of Paris in 885–886. The raids devastated monasteries and towns but also opened trade routes and introduced Scandinavian settlers.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'routes', 'settlements'],
    timelineGroup: 'Origins',
    geographicScope: 'old_world',
    camera: { center: [1.0, 52.0], zoom: 4.8 },
  },

  // ──────────── Medieval ────────────
  {
    id: 'early-normandy',
    label: 'Early Normandy',
    yearRange: [911, 1066],
    summary:
      'In 911, Charles the Simple granted the Seine estuary region to Rollo by the Treaty of Saint-Clair-sur-Epte. The Normans rapidly adopted Frankish language, law, and Christianity while retaining Norse energy and political ambition.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'routes', 'settlements'],
    timelineGroup: 'Medieval',
    geographicScope: 'old_world',
    camera: { center: [0.0, 49.3], zoom: 7 },
  },
  {
    id: 'duchy',
    label: 'Duchy of Normandy',
    yearRange: [1066, 1204],
    summary:
      'William the Conqueror\'s victory at Hastings created a cross-Channel realm. The Duchy became one of the most powerful territories in Western Europe, with advanced administration, monumental architecture, and a vibrant warrior aristocracy.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'routes', 'settlements'],
    timelineGroup: 'Medieval',
    geographicScope: 'old_world',
    camera: { center: [0.0, 50.0], zoom: 5.8 },
  },
  {
    id: 'norman-expansion',
    label: 'Norman World',
    yearRange: [1000, 1200],
    summary:
      'Norman adventurers and settlers spread far beyond Normandy — conquering England, southern Italy, Sicily, and joining the Crusades. Their influence on law, architecture, language, and governance reshaped medieval Europe.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'routes', 'settlements'],
    timelineGroup: 'Medieval',
    geographicScope: 'old_world',
    camera: { center: [5.0, 48.0], zoom: 4.2 },
  },
  {
    id: 'late-medieval-france',
    label: 'Late Medieval France',
    yearRange: [1204, 1492],
    summary:
      'Normandy passed to the French crown in 1204. The Hundred Years\' War ravaged northern France, but by the late 15th century, a unified French kingdom was emerging — and its sailors were beginning to look westward across the Atlantic.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'settlements'],
    timelineGroup: 'Medieval',
    geographicScope: 'old_world',
    camera: { center: [1.0, 48.5], zoom: 5.5 },
  },

  // ──────────── Atlantic ────────────
  {
    id: 'age-of-exploration',
    label: 'Age of Exploration',
    yearRange: [1492, 1604],
    summary:
      'French mariners from Normandy, Brittany, and the Atlantic coast ventured across the ocean. Cartier explored the St. Lawrence in 1534, and Breton fishermen worked the Grand Banks. France staked its claim to a New World.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'routes', 'settlements'],
    timelineGroup: 'Atlantic',
    geographicScope: ['old_world', 'atlantic'],
    camera: { center: [-20.0, 47.0], zoom: 3.2, duration: 3500 },
  },
  {
    id: 'early-french-colonial',
    label: 'Early French Colonial',
    yearRange: [1534, 1608],
    summary:
      'Cartier\'s voyages and early attempts at settlement — including the brief colony at Charlesbourg-Royal — paved the way for permanent French colonization. Port Royal was founded in Acadia in 1605.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'routes', 'settlements'],
    timelineGroup: 'Atlantic',
    geographicScope: ['old_world', 'atlantic', 'new_world'],
    camera: { center: [-40.0, 47.0], zoom: 3.0, duration: 4000 },
  },

  // ──────────── Colonial ────────────
  {
    id: 'new-france',
    label: 'New France',
    yearRange: [1608, 1713],
    summary:
      'Champlain founded Quebec in 1608, anchoring a colony that stretched along the St. Lawrence. Sustained by the fur trade, the Church, and alliances with Indigenous nations, New France grew slowly but its reach was vast.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'routes', 'settlements'],
    timelineGroup: 'Colonial',
    geographicScope: ['old_world', 'new_world'],
    camera: { center: [-68.0, 48.0], zoom: 4.5, duration: 4500 },
  },
  {
    id: 'acadia-atlantic',
    label: 'Acadia & Atlantic',
    yearRange: [1604, 1713],
    summary:
      'Acadia anchored France\'s Atlantic presence — a chain of settlements, fisheries, and fortifications along the maritime approaches. Louisbourg rose as the great sentinel of the Gulf. The Acadians forged a distinct identity.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'routes', 'settlements'],
    timelineGroup: 'Colonial',
    geographicScope: 'new_world',
    camera: { center: [-64.0, 45.0], zoom: 5.5, duration: 3000 },
  },
  {
    id: 'louisiana-interior',
    label: 'Louisiana & Interior',
    yearRange: [1682, 1763],
    summary:
      'La Salle descended the Mississippi in 1682, claiming the interior for France. Louisiana grew around New Orleans and a chain of forts linking the Gulf to the Great Lakes — the ambitious southern arm of New France\'s continental strategy.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'routes', 'settlements'],
    timelineGroup: 'Colonial',
    geographicScope: 'new_world',
    camera: { center: [-85.0, 37.0], zoom: 4.0, duration: 4000 },
  },
  {
    id: 'seven-years-war',
    label: 'Seven Years\' War',
    yearRange: [1754, 1763],
    summary:
      'The final conflict for North America. Outnumbered and outspent, New France fought desperately but fell after Quebec was captured in 1759. The Treaty of Paris (1763) ended the French colonial empire on the continent.',
    visibleLayerDefaults: ['regions-fill', 'regions-stroke', 'regions-labels', 'routes', 'settlements'],
    timelineGroup: 'Colonial',
    geographicScope: ['old_world', 'new_world'],
    camera: { center: [-68.0, 48.0], zoom: 4.0, duration: 3500 },
  },
];

export const defaultEraId = 'duchy';

export function getEra(id: string): Era | undefined {
  return eras.find((e) => e.id === id);
}
