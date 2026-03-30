// Archaeological evidence layer — burials, weapons finds, fortifications.
// Each site carries a dateRange (clamped to the Viking Age where applicable),
// certainty level, and optional bibliographic stub.

export type EvidenceKind = 'burial' | 'weapon' | 'fortification';

export interface EvidencePoint {
  id: string;
  coordinates: [number, number];
  kind: EvidenceKind;
  label: string;
  note: string;
  dateRange: [number, number];
  certainty: 'confirmed' | 'probable';
  sources?: string;
}

export const evidencePoints: EvidencePoint[] = [
  // Burials — Scandinavian-rite or mixed
  { id: 'ev-bur-pitres', coordinates: [1.22, 49.32], kind: 'burial', label: 'Pîtres', note: 'Carolingian fortification site with nearby Scandinavian-era burials.', dateRange: [860, 920], certainty: 'confirmed', sources: 'Renoux 1991; Le Maho 2006' },
  { id: 'ev-bur-rouen-cathedral', coordinates: [1.10, 49.44], kind: 'burial', label: 'Rouen Cathedral', note: 'Rollo\'s traditional burial place (baptized Robert I). Heart of Danish political power in Normandy.', dateRange: [911, 932], certainty: 'confirmed', sources: 'Dudo of Saint-Quentin; Musset 1954' },
  { id: 'ev-bur-envermeu', coordinates: [1.28, 49.88], kind: 'burial', label: 'Envermeu', note: 'Scandinavian boat-grave site in Pays de Caux. One of the clearest Norse burial rites found in Normandy.', dateRange: [880, 950], certainty: 'confirmed', sources: 'Lorren 1977' },
  { id: 'ev-bur-herouvillette', coordinates: [-0.28, 49.22], kind: 'burial', label: 'Hérouvillette', note: 'Viking-era inhumation near Caen with Scandinavian grave goods.', dateRange: [850, 950], certainty: 'confirmed', sources: 'Decaens 1971' },
  { id: 'ev-bur-reville', coordinates: [-1.25, 49.62], kind: 'burial', label: 'Réville', note: 'Nordic-style burial on the Cotentin coast, indicating Norwegian settlement.', dateRange: [870, 950], certainty: 'confirmed', sources: 'Renaud 2000' },
  { id: 'ev-bur-isigny', coordinates: [-1.10, 49.32], kind: 'burial', label: 'Isigny-sur-Mer', note: 'Early medieval graves with Norse cultural markers at the Bessin-Cotentin border.', dateRange: [880, 960], certainty: 'probable', sources: 'Musset 1976' },

  // Weapons — swords, axes, spearheads
  { id: 'ev-wpn-seine-dredge', coordinates: [0.85, 49.44], kind: 'weapon', label: 'Seine dredge finds', note: 'Viking-type swords and axes recovered from the Seine riverbed near Rouen.', dateRange: [850, 950], certainty: 'confirmed', sources: 'Pedersen 2008' },
  { id: 'ev-wpn-caudebec', coordinates: [0.53, 49.52], kind: 'weapon', label: 'Caudebec-en-Caux', note: 'Spearheads and scramasax finds along the Seine.', dateRange: [860, 940], certainty: 'confirmed', sources: 'Le Maho 2006' },
  { id: 'ev-wpn-barfleur', coordinates: [-1.26, 49.67], kind: 'weapon', label: 'Barfleur', note: 'Maritime weapon deposits found along the Cotentin coast.', dateRange: [870, 960], certainty: 'probable' },
  { id: 'ev-wpn-bayeux', coordinates: [-0.70, 49.28], kind: 'weapon', label: 'Bayeux', note: 'Scattered Norse weaponry finds in the Bessin.', dateRange: [880, 950], certainty: 'probable', sources: 'Musset 1976' },

  // Fortifications — mottes, ringworks, coastal defences
  { id: 'ev-fort-rouen-castle', coordinates: [1.09, 49.43], kind: 'fortification', label: 'Rouen ducal castle', note: 'Seat of Norman ducal power from the early 10th century.', dateRange: [911, 1000], certainty: 'confirmed', sources: 'Le Maho 2001' },
  { id: 'ev-fort-falaise', coordinates: [-0.20, 48.89], kind: 'fortification', label: 'Falaise Castle', note: 'Birthplace of William the Conqueror; early motte-and-bailey. Post-Viking era construction.', dateRange: [1000, 1060], certainty: 'confirmed', sources: 'Impey 2002' },
  { id: 'ev-fort-avranches', coordinates: [-1.35, 48.68], kind: 'fortification', label: 'Avranches', note: 'Frontier stronghold at the Avranchin border.', dateRange: [933, 1000], certainty: 'probable' },
  { id: 'ev-fort-cherbourg', coordinates: [-1.62, 49.63], kind: 'fortification', label: 'Cherbourg', note: 'Coastal fortification in the northern Cotentin.', dateRange: [933, 1000], certainty: 'probable' },
  { id: 'ev-fort-caen', coordinates: [-0.37, 49.18], kind: 'fortification', label: 'Caen Castle', note: 'Major ducal castle built by William the Conqueror, c. 1060. Post-Viking era.', dateRange: [1050, 1080], certainty: 'confirmed', sources: 'Baylé 2001' },
  { id: 'ev-fort-arques', coordinates: [1.14, 49.88], kind: 'fortification', label: 'Arques-la-Bataille', note: 'Early Norman fortification in the Pays de Caux.', dateRange: [1000, 1050], certainty: 'confirmed' },

  // New sites from the spec
  { id: 'ev-bur-jumieges', coordinates: [0.82, 49.43], kind: 'burial', label: 'Jumièges', note: 'Abbey refounded under ducal patronage. Scandinavian finds in the vicinity; key ecclesiastical site of early Norman power.', dateRange: [860, 960], certainty: 'confirmed', sources: 'Le Maho 2006; Musset 1954' },
  { id: 'ev-fort-fecamp', coordinates: [0.38, 49.76], kind: 'fortification', label: 'Fécamp', note: 'Ducal palace and fortified site on the Caux coast. Center of Norman comital/ducal power before Rouen\'s dominance.', dateRange: [920, 1000], certainty: 'confirmed', sources: 'Renoux 1991' },
  { id: 'ev-wpn-la-hague', coordinates: [-1.90, 49.72], kind: 'weapon', label: 'La Hague', note: 'Norse weapon and metalwork finds at the northwestern tip of the Cotentin, indicating sustained Norwegian maritime presence.', dateRange: [870, 960], certainty: 'confirmed', sources: 'Renaud 2000; Ridel 2009' },
];

export function buildEvidenceGeoJson(): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: evidencePoints.map((p) => ({
      type: 'Feature' as const,
      properties: {
        id: p.id,
        kind: p.kind,
        label: p.label,
        note: p.note,
        dateStart: p.dateRange[0],
        dateEnd: p.dateRange[1],
        certainty: p.certainty,
        sources: p.sources ?? '',
        vikingEra: p.dateRange[0] <= 1000 ? 1 : 0,
      },
      geometry: {
        type: 'Point' as const,
        coordinates: p.coordinates,
      },
    })),
  };
}
