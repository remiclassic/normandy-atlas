import type { EventRecord } from '@/types';

export const eventRecords: EventRecord[] = [
  // --- Medieval ---
  {
    id: 'treaty-saint-clair',
    eraId: 'early-normandy',
    title: 'Treaty of Saint-Clair-sur-Epte',
    year: 911,
    summary:
      'Charles the Simple ceded the lower Seine region to the Viking chieftain Rollo, founding what became Normandy.',
    relatedRegionIds: ['normandy'],
    relatedRouteIds: ['viking-seine'],
  },
  {
    id: 'battle-hastings',
    eraId: 'duchy',
    title: 'Battle of Hastings',
    year: 1066,
    summary:
      'William, Duke of Normandy, defeated King Harold II of England, beginning the Norman Conquest.',
    relatedRegionIds: ['normandy', 'southern-england'],
    relatedRouteIds: ['norman-conquest-1066'],
  },
  {
    id: 'siege-paris',
    eraId: 'viking',
    title: 'Siege of Paris',
    year: 885,
    summary:
      'A massive Viking fleet besieged Paris for over a year. Count Odo\'s defense made him a hero and eventually king of Francia.',
    relatedRegionIds: ['ile-de-france'],
    relatedRouteIds: ['viking-seine'],
  },

  // --- Exploration & Colonial ---
  {
    id: 'cartier-first-voyage',
    eraId: 'age-of-exploration',
    title: 'Cartier Reaches the Gulf of St. Lawrence',
    year: 1534,
    summary:
      'Jacques Cartier sailed from Saint-Malo and explored the Gulf of St. Lawrence, claiming the territory for the King of France and opening the path to New France.',
    relatedRegionIds: ['new-france-core'],
    relatedRouteIds: ['cartier-voyage-1534'],
    relatedSettlementIds: [],
    geographicScope: 'atlantic',
  },
  {
    id: 'founding-port-royal',
    eraId: 'early-french-colonial',
    title: 'Founding of Port Royal',
    year: 1605,
    summary:
      'Pierre Dugua de Mons established Port Royal in Acadia — the first sustained French settlement in North America.',
    relatedRegionIds: ['acadia'],
    relatedRouteIds: [],
    relatedSettlementIds: ['port-royal'],
    geographicScope: 'new_world',
  },
  {
    id: 'founding-quebec',
    eraId: 'new-france',
    title: 'Founding of Quebec',
    year: 1608,
    summary:
      'Samuel de Champlain established a fortified habitation at Quebec, beginning permanent French settlement on the St. Lawrence.',
    relatedRegionIds: ['new-france-core'],
    relatedRouteIds: ['champlain-quebec-1608'],
    relatedSettlementIds: ['quebec-city'],
    geographicScope: 'new_world',
  },
  {
    id: 'founding-montreal',
    eraId: 'new-france',
    title: 'Founding of Ville-Marie (Montreal)',
    year: 1642,
    summary:
      'Paul de Chomedey de Maisonneuve and Jeanne Mance founded Ville-Marie as a Catholic mission. It quickly grew into the fur trade capital of New France.',
    relatedRegionIds: ['new-france-core'],
    relatedRouteIds: ['st-lawrence-corridor'],
    relatedSettlementIds: ['montreal'],
    geographicScope: 'new_world',
  },
  {
    id: 'la-salle-mississippi',
    eraId: 'louisiana-interior',
    title: 'La Salle Claims Louisiana',
    year: 1682,
    summary:
      'René-Robert Cavelier de La Salle descended the Mississippi River to its mouth and claimed the entire drainage basin for France, naming it Louisiana.',
    relatedRegionIds: ['louisiana-colony'],
    relatedRouteIds: ['mississippi-corridor'],
    relatedSettlementIds: [],
    geographicScope: 'new_world',
  },
  {
    id: 'fall-of-quebec',
    eraId: 'seven-years-war',
    title: 'Fall of Quebec',
    year: 1759,
    summary:
      'British forces under General Wolfe defeated Montcalm on the Plains of Abraham, capturing Quebec and sealing the fate of New France.',
    relatedRegionIds: ['new-france-core'],
    relatedRouteIds: [],
    relatedSettlementIds: ['quebec-city'],
    geographicScope: 'new_world',
  },
  {
    id: 'treaty-paris-1763',
    eraId: 'seven-years-war',
    title: 'Treaty of Paris',
    year: 1763,
    summary:
      'France ceded nearly all of its North American territories to Britain and Spain, ending the French colonial empire on the continent.',
    relatedRegionIds: ['new-france-core', 'acadia', 'louisiana-colony'],
    relatedRouteIds: [],
    relatedSettlementIds: [],
    geographicScope: 'global',
  },
];
