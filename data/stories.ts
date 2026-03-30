import type { StoryStep } from '@/types';

export const normanAtlanticStory: StoryStep[] = [
  // ──── Chapter 1: Origins ────
  {
    id: 'step-viking-raids',
    eraId: 'viking',
    chapterId: 'origins',
    chapterTitle: 'Origins',
    title: 'The Northmen Arrive',
    body: 'In the late 8th century, Norse warriors began raiding the coasts of Francia. Their longships penetrated deep inland via the Seine, devastating monasteries and towns. The Frankish kingdom, weakened by civil war, struggled to respond.',
    focus: {
      type: 'route',
      routeIds: ['viking-seine'],
    },
    camera: {
      center: [1.0, 53.0],
      zoom: 4.5,
    },
    highlightRouteIds: ['viking-seine'],
  },
  {
    id: 'step-rollo-treaty',
    eraId: 'early-normandy',
    chapterId: 'origins',
    chapterTitle: 'Origins',
    title: 'Rollo and the Birth of Normandy',
    body: 'In 911, the Frankish king Charles the Simple struck a deal: he granted the Norse chieftain Rollo lands around Rouen in exchange for loyalty and defense against other Vikings. The Treaty of Saint-Clair-sur-Epte created what would become Normandy — the land of the Northmen.',
    focus: {
      type: 'region',
      regionIds: ['normandy'],
    },
    camera: {
      center: [0.0, 49.3],
      zoom: 7,
    },
    highlightRegionIds: ['normandy'],
  },

  // ──── Chapter 2: Norman Power ────
  {
    id: 'step-conquest',
    eraId: 'duchy',
    chapterId: 'norman-power',
    chapterTitle: 'Norman Power',
    title: 'The Conquest of England',
    body: 'William, Duke of Normandy, claimed the English throne and crossed the Channel in September 1066 with 7,000 men. At Hastings on October 14, he defeated King Harold II and changed the course of English history forever.',
    focus: {
      type: 'route',
      routeIds: ['norman-conquest-1066'],
    },
    camera: {
      center: [0.1, 50.0],
      zoom: 6.5,
    },
    highlightRouteIds: ['norman-conquest-1066'],
  },
  {
    id: 'step-norman-world',
    eraId: 'norman-expansion',
    chapterId: 'norman-power',
    chapterTitle: 'Norman Power',
    title: 'A Norman World',
    body: 'Norman influence radiated outward — to England, southern Italy, Sicily, the Crusader states, and Scotland. Everywhere they went, the Normans built castles, founded churches, imposed feudal law, and left a legacy still visible today.',
    focus: {
      type: 'bbox',
      bbox: [-5, 38, 20, 58],
    },
    camera: {
      center: [5.0, 48.0],
      zoom: 4.2,
    },
    highlightRouteIds: ['norman-conquest-1066', 'norman-sicily'],
  },

  // ──── Chapter 3: The Atlantic Turn ────
  {
    id: 'step-atlantic-imagination',
    eraId: 'age-of-exploration',
    chapterId: 'atlantic',
    chapterTitle: 'The Atlantic Turn',
    title: 'France Looks Westward',
    body: 'By the late 15th century, the great age of Atlantic exploration was underway. French mariners from Normandy and Brittany — fishing the Grand Banks and probing unfamiliar coasts — would soon carry the kingdom\'s ambitions across the ocean.',
    focus: {
      type: 'bbox',
      bbox: [-10, 42, 5, 55],
    },
    camera: {
      center: [-5.0, 48.0],
      zoom: 5.0,
      duration: 3000,
    },
    highlightRegionIds: ['normandy', 'brittany'],
  },
  {
    id: 'step-cartier',
    eraId: 'age-of-exploration',
    chapterId: 'atlantic',
    chapterTitle: 'The Atlantic Turn',
    title: 'Cartier Crosses the Atlantic',
    body: 'In 1534, Jacques Cartier sailed from Saint-Malo and entered the Gulf of St. Lawrence, claiming the land for the King of France. His voyages opened the door to a century of French exploration and eventual colonization.',
    focus: {
      type: 'route',
      routeIds: ['cartier-voyage-1534'],
    },
    camera: {
      center: [-30.0, 48.0],
      zoom: 3.0,
      duration: 4500,
    },
    highlightRouteIds: ['cartier-voyage-1534'],
  },

  // ──── Chapter 4: New France ────
  {
    id: 'step-quebec-founded',
    eraId: 'new-france',
    chapterId: 'new-france',
    chapterTitle: 'New France',
    title: 'Champlain Founds Quebec',
    body: 'In 1608, Samuel de Champlain established a fortified habitation on the St. Lawrence at Quebec. This small outpost would become the capital of a vast colonial territory — New France — stretching from the Atlantic to the heart of the continent.',
    focus: {
      type: 'settlement',
      settlementIds: ['quebec-city'],
    },
    camera: {
      center: [-71.2, 46.8],
      zoom: 7.0,
      duration: 4500,
    },
    highlightSettlementIds: ['quebec-city'],
    highlightRouteIds: ['champlain-quebec-1608'],
  },
  {
    id: 'step-st-lawrence',
    eraId: 'new-france',
    chapterId: 'new-france',
    chapterTitle: 'New France',
    title: 'The River of Canada',
    body: 'The St. Lawrence was the lifeline of New France. Quebec, Trois-Rivières, and Montreal anchored a thin ribbon of settlement along its banks. Furs flowed east, settlers and supplies flowed west, and the river connected the colony to France.',
    focus: {
      type: 'route',
      routeIds: ['st-lawrence-corridor'],
    },
    camera: {
      center: [-72.0, 46.2],
      zoom: 6.0,
      duration: 3000,
    },
    highlightRouteIds: ['st-lawrence-corridor'],
    highlightSettlementIds: ['quebec-city', 'montreal', 'trois-rivieres'],
  },

  // ──── Chapter 5: Acadia & the Frontier ────
  {
    id: 'step-acadia',
    eraId: 'acadia-atlantic',
    chapterId: 'acadia',
    chapterTitle: 'Acadia & the Frontier',
    title: 'Acadia: The Atlantic Frontier',
    body: 'Port Royal, founded in 1605, was the seed of French Acadia — a scattered network of farming, fishing, and trading communities along the maritime coast. Caught between French and British claims, the Acadians forged a resilient identity of their own.',
    focus: {
      type: 'region',
      regionIds: ['acadia'],
    },
    camera: {
      center: [-64.0, 45.0],
      zoom: 5.5,
      duration: 3500,
    },
    highlightRegionIds: ['acadia'],
    highlightSettlementIds: ['port-royal', 'louisbourg'],
  },

  // ──── Chapter 6: The Interior ────
  {
    id: 'step-louisiana',
    eraId: 'louisiana-interior',
    chapterId: 'interior',
    chapterTitle: 'The Interior',
    title: 'Louisiana and the Mississippi',
    body: 'In 1682, La Salle descended the Mississippi to the Gulf, claiming the vast interior for France. New Orleans, founded in 1718, anchored the southern end of a continental arc of forts and trading posts stretching from the Great Lakes to the Gulf of Mexico.',
    focus: {
      type: 'route',
      routeIds: ['mississippi-corridor'],
    },
    camera: {
      center: [-90.0, 35.0],
      zoom: 4.5,
      duration: 4000,
    },
    highlightRouteIds: ['mississippi-corridor'],
    highlightSettlementIds: ['new-orleans'],
  },

  // ──── Chapter 7: The Fall ────
  {
    id: 'step-fall',
    eraId: 'seven-years-war',
    chapterId: 'fall',
    chapterTitle: 'The Fall of New France',
    title: 'The End of an Empire',
    body: 'The Seven Years\' War decided the fate of French North America. Outnumbered and outspent, New France fought desperately but could not hold. Quebec fell in 1759, and the Treaty of Paris (1763) ended the French colonial empire on the continent. The people, the language, and the memory endured.',
    focus: {
      type: 'multi',
      regionIds: ['new-france-core', 'acadia', 'louisiana-colony'],
    },
    camera: {
      center: [-68.0, 46.0],
      zoom: 4.0,
      duration: 4000,
    },
    highlightRegionIds: ['new-france-core', 'acadia', 'louisiana-colony'],
    highlightSettlementIds: ['quebec-city'],
  },
];
