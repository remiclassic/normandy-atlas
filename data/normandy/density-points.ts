// Viking settlement density points — based on toponymic and archaeological evidence.
// Density tiers: very_high (Seine corridor), high (Cotentin, Caux), medium (Bessin/Caen), low (interior).
// Rivers and coastlines produce higher density; inland areas are sparse.

export interface DensityPoint {
  id: string;
  coordinates: [number, number];
  density: 'very_high' | 'high' | 'medium' | 'low';
  presence: 'confirmed' | 'probable';
  cluster: string;
  weight: number;
  rationale: string;
}

export const densityPoints: DensityPoint[] = [
  // Lower Seine / Rouen corridor (VERY HIGH) — political core, river-based Danish settlement
  { id: 'dp-seine-01', coordinates: [1.10, 49.44], density: 'very_high', presence: 'confirmed', cluster: 'Lower Seine', weight: 5, rationale: 'Rouen — ducal capital, dense toponymy and archaeology' },
  { id: 'dp-seine-02', coordinates: [0.82, 49.43], density: 'very_high', presence: 'confirmed', cluster: 'Lower Seine', weight: 5, rationale: 'Jumièges corridor — abbey refoundation, boat-grave evidence' },
  { id: 'dp-seine-03', coordinates: [0.50, 49.48], density: 'very_high', presence: 'confirmed', cluster: 'Lower Seine', weight: 5, rationale: 'Caudebec — weapon finds, river-corridor settlement' },
  { id: 'dp-seine-04', coordinates: [1.30, 49.42], density: 'very_high', presence: 'confirmed', cluster: 'Lower Seine', weight: 4, rationale: 'Pitres / Pont-de-l\'Arche — Carolingian fort site, Scandinavian burials' },
  { id: 'dp-seine-05', coordinates: [0.90, 49.52], density: 'very_high', presence: 'confirmed', cluster: 'Lower Seine', weight: 4, rationale: 'Seine north bank — dense -tot/-bec names along river' },
  { id: 'dp-seine-06', coordinates: [1.05, 49.32], density: 'very_high', presence: 'confirmed', cluster: 'Lower Seine', weight: 4, rationale: 'Oissel — documented Viking winter camp 9th century' },
  { id: 'dp-seine-07', coordinates: [0.65, 49.40], density: 'very_high', presence: 'confirmed', cluster: 'Lower Seine', weight: 4, rationale: 'Routot area — dense -tot names, river-adjacent' },
  { id: 'dp-seine-08', coordinates: [1.45, 49.38], density: 'very_high', presence: 'probable', cluster: 'Lower Seine', weight: 3, rationale: 'Upper Andelle — scattered Norse toponymy near Epte frontier' },
  { id: 'dp-seine-09', coordinates: [0.35, 49.44], density: 'very_high', presence: 'probable', cluster: 'Lower Seine', weight: 3, rationale: 'Risle mouth — estuary settlement zone' },
  { id: 'dp-seine-10', coordinates: [1.18, 49.50], density: 'very_high', presence: 'probable', cluster: 'Lower Seine', weight: 3, rationale: 'Pays de Bray edge — scattered evidence near Dieppe hinterland' },

  // Pays de Caux (HIGH) — densest Scandinavian toponymy plateau
  { id: 'dp-caux-01', coordinates: [0.52, 49.78], density: 'high', presence: 'confirmed', cluster: 'Pays de Caux', weight: 5, rationale: 'Fécamp hinterland — dense -tot cluster' },
  { id: 'dp-caux-02', coordinates: [0.70, 49.82], density: 'high', presence: 'confirmed', cluster: 'Pays de Caux', weight: 5, rationale: 'Central Caux plateau — highest -tot density in Normandy' },
  { id: 'dp-caux-03', coordinates: [0.35, 49.72], density: 'high', presence: 'confirmed', cluster: 'Pays de Caux', weight: 4, rationale: 'Étretat hinterland — coastal toponymy cluster' },
  { id: 'dp-caux-04', coordinates: [0.88, 49.85], density: 'high', presence: 'confirmed', cluster: 'Pays de Caux', weight: 4, rationale: 'Eastern Caux — -tot/-bec names near Dieppe' },
  { id: 'dp-caux-05', coordinates: [0.55, 49.68], density: 'high', presence: 'confirmed', cluster: 'Pays de Caux', weight: 5, rationale: 'Yvetot area — eponymous -tot site, dense settlement' },
  { id: 'dp-caux-06', coordinates: [0.20, 49.70], density: 'high', presence: 'confirmed', cluster: 'Pays de Caux', weight: 4, rationale: 'Le Havre hinterland — coastal naming pattern' },
  { id: 'dp-caux-07', coordinates: [0.45, 49.82], density: 'high', presence: 'probable', cluster: 'Pays de Caux', weight: 3, rationale: 'Sassetot area — secondary -tot cluster' },
  { id: 'dp-caux-08', coordinates: [0.68, 49.75], density: 'high', presence: 'confirmed', cluster: 'Pays de Caux', weight: 4, rationale: 'Robertot / Écalletot area — multiple -tot names' },
  { id: 'dp-caux-09', coordinates: [1.05, 49.88], density: 'high', presence: 'probable', cluster: 'Pays de Caux', weight: 3, rationale: 'Arques hinterland — Scandinavian names near coast' },
  { id: 'dp-caux-10', coordinates: [0.30, 49.62], density: 'high', presence: 'probable', cluster: 'Pays de Caux', weight: 3, rationale: 'Bolbec area — -bec stream names' },

  // Cotentin (HIGH) — Norwegian maritime settlers, Irish Sea links
  { id: 'dp-cot-01', coordinates: [-1.62, 49.62], density: 'high', presence: 'confirmed', cluster: 'Cotentin', weight: 5, rationale: 'Cherbourg area — coastal Norwegian settlement' },
  { id: 'dp-cot-02', coordinates: [-1.45, 49.55], density: 'high', presence: 'confirmed', cluster: 'Cotentin', weight: 4, rationale: 'East Cotentin coast — confirmed Norse place names' },
  { id: 'dp-cot-03', coordinates: [-1.75, 49.50], density: 'high', presence: 'confirmed', cluster: 'Cotentin', weight: 4, rationale: 'West Cotentin — maritime settlement cluster' },
  { id: 'dp-cot-04', coordinates: [-1.30, 49.60], density: 'high', presence: 'confirmed', cluster: 'Cotentin', weight: 3, rationale: 'Barfleur hinterland — Norse harbor settlement' },
  { id: 'dp-cot-05', coordinates: [-1.55, 49.40], density: 'high', presence: 'confirmed', cluster: 'Cotentin', weight: 4, rationale: 'Central Cotentin — Norwegian farming settlement' },
  { id: 'dp-cot-06', coordinates: [-1.80, 49.35], density: 'high', presence: 'probable', cluster: 'Cotentin', weight: 3, rationale: 'La Hague — maritime Norse presence, Gaelic-Norse influence' },
  { id: 'dp-cot-07', coordinates: [-1.20, 49.48], density: 'high', presence: 'probable', cluster: 'Cotentin', weight: 3, rationale: 'SE Cotentin — transitional zone with Bessin' },
  { id: 'dp-cot-08', coordinates: [-1.88, 49.68], density: 'high', presence: 'confirmed', cluster: 'Cotentin', weight: 4, rationale: 'La Hague tip — confirmed Norwegian cemetery at Réville' },
  { id: 'dp-cot-09', coordinates: [-1.40, 49.30], density: 'high', presence: 'probable', cluster: 'Cotentin', weight: 3, rationale: 'Coutances area — mixed Norse-Frankish zone' },

  // Bessin / Caen area (MEDIUM) — mixed population
  { id: 'dp-bes-01', coordinates: [-0.70, 49.28], density: 'medium', presence: 'confirmed', cluster: 'Bessin', weight: 3, rationale: 'Bayeux — attested Norse presence, cathedral foundation' },
  { id: 'dp-bes-02', coordinates: [-0.50, 49.25], density: 'medium', presence: 'probable', cluster: 'Bessin', weight: 2, rationale: 'Coastal Bessin — scattered Scandinavian names' },
  { id: 'dp-bes-03', coordinates: [-0.87, 49.20], density: 'medium', presence: 'probable', cluster: 'Bessin', weight: 3, rationale: 'Isigny area — Norse burial markers' },
  { id: 'dp-bes-04', coordinates: [-0.37, 49.18], density: 'medium', presence: 'confirmed', cluster: 'Bessin', weight: 2, rationale: 'Caen area — Viking-era inhumation at Hérouvillette' },
  { id: 'dp-bes-05', coordinates: [-0.60, 49.10], density: 'medium', presence: 'probable', cluster: 'Bessin', weight: 2, rationale: 'Inland Bessin — Anglo-Scandinavian settler names' },
  { id: 'dp-bes-06', coordinates: [-0.25, 49.28], density: 'medium', presence: 'probable', cluster: 'Bessin', weight: 2, rationale: 'Orne estuary — river-corridor scatter' },

  // Southern Normandy / Interior (LOW) — sparse evidence
  { id: 'dp-south-01', coordinates: [0.20, 48.85], density: 'low', presence: 'probable', cluster: 'Interior', weight: 1, rationale: 'Southern interior — rare isolated names' },
  { id: 'dp-south-02', coordinates: [-0.15, 48.70], density: 'low', presence: 'probable', cluster: 'Interior', weight: 1, rationale: 'Falaise hinterland — sparse scatter' },
  { id: 'dp-south-03', coordinates: [0.50, 48.78], density: 'low', presence: 'probable', cluster: 'Interior', weight: 1, rationale: 'Hiémois south — minimal Scandinavian presence' },
  { id: 'dp-south-04', coordinates: [-0.50, 48.65], density: 'low', presence: 'probable', cluster: 'Interior', weight: 1, rationale: 'Bocage — deep interior, no significant Norse trace' },
  { id: 'dp-south-05', coordinates: [0.85, 49.10], density: 'low', presence: 'probable', cluster: 'Interior', weight: 1, rationale: 'Lieuvin — southern edge of Scandinavian zone' },
  { id: 'dp-south-06', coordinates: [-0.70, 48.55], density: 'low', presence: 'probable', cluster: 'Interior', weight: 1, rationale: 'Southern Bocage — Frankish-dominant zone' },
  { id: 'dp-south-07', coordinates: [-1.35, 48.68], density: 'low', presence: 'probable', cluster: 'Interior', weight: 1, rationale: 'Avranches — frontier zone, thin Norse layer' },
  { id: 'dp-south-08', coordinates: [1.50, 49.20], density: 'low', presence: 'probable', cluster: 'Interior', weight: 1, rationale: 'Vexin frontier — Epte boundary, mainly Frankish' },
];

export function buildDensityGeoJson(): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: densityPoints.map((p) => ({
      type: 'Feature' as const,
      properties: {
        id: p.id,
        density: p.density,
        presence: p.presence,
        cluster: p.cluster,
        weight: p.weight,
        rationale: p.rationale,
      },
      geometry: {
        type: 'Point' as const,
        coordinates: p.coordinates,
      },
    })),
  };
}
