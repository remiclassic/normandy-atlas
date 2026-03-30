// Scandinavian-derived place names — strongest evidence of Viking settlement density.
// Suffix patterns: -tot (farmstead), -bec (stream), -dalle/-dal (valley),
// -hogue (mound/hill), -thuit (clearing), -londe (grove), -mare (pond).

export type ToponymSuffix = 'tot' | 'bec' | 'dalle' | 'hogue' | 'thuit' | 'londe' | 'mare' | 'other';

const ETYMOLOGY: Record<ToponymSuffix, string> = {
  tot: 'ON topt — farmstead, homestead plot',
  bec: 'ON bekkr — stream, brook',
  dalle: 'ON dalr — valley',
  hogue: 'ON haugr — mound, burial hill',
  thuit: 'ON þveit — clearing, assart',
  londe: 'ON lundr — grove, sacred wood',
  mare: 'ON marr — pond, lake, wetland',
  other: 'Other Scandinavian-derived element',
};

export interface ToponymPoint {
  id: string;
  name: string;
  coordinates: [number, number];
  suffix: ToponymSuffix;
  etymology: string;
  regionId?: string;
}

export const toponymPoints: ToponymPoint[] = [
  // -tot (ON topt, farmstead) — densest in Caux
  { id: 'top-yvetot', name: 'Yvetot', coordinates: [0.76, 49.62], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-pays-de-caux' },
  { id: 'top-criquetot', name: 'Criquetot-l\'Esneval', coordinates: [0.28, 49.64], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-pays-de-caux' },
  { id: 'top-ecalletot', name: 'Écalletot', coordinates: [0.55, 49.70], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-pays-de-caux' },
  { id: 'top-routot', name: 'Routot', coordinates: [0.73, 49.38], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-roumois-seine' },
  { id: 'top-lanquetot', name: 'Lanquetot', coordinates: [0.55, 49.55], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-pays-de-caux' },
  { id: 'top-sassetot', name: 'Sassetot-le-Mauconduit', coordinates: [0.36, 49.78], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-pays-de-caux' },
  { id: 'top-etaintot', name: 'Étaintot', coordinates: [0.90, 49.55], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-pays-de-caux' },
  { id: 'top-robertot', name: 'Robertot', coordinates: [0.72, 49.72], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-pays-de-caux' },
  { id: 'top-appetot', name: 'Appétot', coordinates: [0.48, 49.42], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-roumois-seine' },
  { id: 'top-tournetot', name: 'Tournétot', coordinates: [0.58, 49.62], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-pays-de-caux' },
  { id: 'top-gonnetot', name: 'Gonnetot', coordinates: [0.85, 49.78], suffix: 'tot', etymology: ETYMOLOGY.tot, regionId: 'region-pays-de-caux' },

  // -bec (ON bekkr, stream)
  { id: 'top-caudebec', name: 'Caudebec-en-Caux', coordinates: [0.53, 49.52], suffix: 'bec', etymology: ETYMOLOGY.bec, regionId: 'region-pays-de-caux' },
  { id: 'top-bolbec', name: 'Bolbec', coordinates: [0.47, 49.57], suffix: 'bec', etymology: ETYMOLOGY.bec, regionId: 'region-pays-de-caux' },
  { id: 'top-houlbec', name: 'Houlbec-Cocherel', coordinates: [1.35, 49.06], suffix: 'bec', etymology: ETYMOLOGY.bec, regionId: 'region-roumois-seine' },
  { id: 'top-orbec', name: 'Orbec', coordinates: [0.41, 49.02], suffix: 'bec', etymology: ETYMOLOGY.bec, regionId: 'region-hiemois' },
  { id: 'top-foulbec', name: 'Foulbec', coordinates: [0.42, 49.38], suffix: 'bec', etymology: ETYMOLOGY.bec, regionId: 'region-roumois-seine' },
  { id: 'top-clarbec', name: 'Clarbec', coordinates: [0.08, 49.20], suffix: 'bec', etymology: ETYMOLOGY.bec, regionId: 'region-bessin' },
  { id: 'top-elbeuf', name: 'Elbeuf (Wellebou)', coordinates: [1.01, 49.29], suffix: 'bec', etymology: ETYMOLOGY.bec, regionId: 'region-roumois-seine' },

  // -dalle / -dal (ON dalr, valley)
  { id: 'top-dieppedalle', name: 'Dieppedalle', coordinates: [0.52, 49.53], suffix: 'dalle', etymology: ETYMOLOGY.dalle, regionId: 'region-pays-de-caux' },
  { id: 'top-oudalle', name: 'Oudalle', coordinates: [0.27, 49.50], suffix: 'dalle', etymology: ETYMOLOGY.dalle, regionId: 'region-pays-de-caux' },
  { id: 'top-breaute-dalle', name: 'Bréauté (La Dalle)', coordinates: [0.38, 49.60], suffix: 'dalle', etymology: ETYMOLOGY.dalle, regionId: 'region-pays-de-caux' },
  { id: 'top-longuedalle', name: 'Longuedalle', coordinates: [0.60, 49.65], suffix: 'dalle', etymology: ETYMOLOGY.dalle, regionId: 'region-pays-de-caux' },

  // -hogue (ON haugr, mound/hill) — strong in Cotentin
  { id: 'top-la-hogue', name: 'La Hougue', coordinates: [-1.25, 49.58], suffix: 'hogue', etymology: ETYMOLOGY.hogue, regionId: 'region-cotentin' },
  { id: 'top-haguenau', name: 'La Hague', coordinates: [-1.90, 49.72], suffix: 'hogue', etymology: ETYMOLOGY.hogue, regionId: 'region-cotentin' },
  { id: 'top-hougue-bie', name: 'La Hougue (Bie)', coordinates: [-1.18, 49.52], suffix: 'hogue', etymology: ETYMOLOGY.hogue, regionId: 'region-cotentin' },

  // -thuit (ON þveit, clearing) — Seine valley
  { id: 'top-lethuit', name: 'Le Thuit-Signol', coordinates: [1.00, 49.30], suffix: 'thuit', etymology: ETYMOLOGY.thuit, regionId: 'region-roumois-seine' },
  { id: 'top-bourgtheroulde', name: 'Bourg-Achard (Le Thuit)', coordinates: [0.82, 49.35], suffix: 'thuit', etymology: ETYMOLOGY.thuit, regionId: 'region-roumois-seine' },
  { id: 'top-thuit-hebert', name: 'Le Thuit-Hébert', coordinates: [0.90, 49.32], suffix: 'thuit', etymology: ETYMOLOGY.thuit, regionId: 'region-roumois-seine' },

  // -londe (ON lundr, grove/wood)
  { id: 'top-la-londe', name: 'La Londe', coordinates: [0.95, 49.34], suffix: 'londe', etymology: ETYMOLOGY.londe, regionId: 'region-roumois-seine' },
  { id: 'top-londe-rouvray', name: 'La Londe (forêt de Rouvray)', coordinates: [1.05, 49.36], suffix: 'londe', etymology: ETYMOLOGY.londe, regionId: 'region-roumois-seine' },

  // -mare (ON marr, pond/lake)
  { id: 'top-etretat-mare', name: 'La Mare (Étretat)', coordinates: [0.20, 49.71], suffix: 'mare', etymology: ETYMOLOGY.mare, regionId: 'region-pays-de-caux' },
  { id: 'top-longuemare', name: 'Longuemare', coordinates: [0.65, 49.60], suffix: 'mare', etymology: ETYMOLOGY.mare, regionId: 'region-pays-de-caux' },
  { id: 'top-ymare', name: 'Ymare', coordinates: [1.12, 49.38], suffix: 'mare', etymology: ETYMOLOGY.mare, regionId: 'region-roumois-seine' },
];

export function buildToponymGeoJson(): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: toponymPoints.map((p) => ({
      type: 'Feature' as const,
      properties: {
        id: p.id,
        name: p.name,
        suffix: p.suffix,
        etymology: p.etymology,
        regionId: p.regionId ?? '',
      },
      geometry: {
        type: 'Point' as const,
        coordinates: p.coordinates,
      },
    })),
  };
}
