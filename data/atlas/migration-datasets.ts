import type { MigrationDataset, MigrationCohortId, I18nString } from '@/core/types';

const MUSEUM_SOURCE = {
  shortCitation: 'Canadian Museum of History — Virtual Museum of New France, Immigration',
  url: 'https://www.historymuseum.ca/virtual-museum-of-new-france/population/immigration/',
};

const PERCHE_SOURCE = {
  shortCitation: 'Perche-Québec — Emigration from Perche',
  url: 'https://www.perche-quebec.com/perche/lieux/emigration-en.htm',
};

export const MIGRATION_COHORT_LABELS: Record<MigrationCohortId, I18nString> = {
  all_immigrants: { en: 'All Immigrants', fr: 'Tous les immigrants' },
  founding_immigrants: { en: 'Founding Immigrants', fr: 'Immigrants fondateurs' },
  engages: { en: 'Engagés (Indentured Workers)', fr: 'Engagés' },
  filles_du_roi: { en: 'Filles du Roi', fr: 'Filles du Roi' },
  carignan_salieres: { en: 'Carignan-Salières Regiment', fr: 'Régiment de Carignan-Salières' },
};

export const migrationDatasets: MigrationDataset[] = [
  {
    id: 'stl-all-immigrants',
    eraIds: ['new-france-foundations', 'royal-new-france'],
    branch: 'st_lawrence',
    cohortId: 'all_immigrants',
    yearRange: [1608, 1760],
    metricDefinition: {
      label: {
        en: 'Share of all immigrants to Canada (St. Lawrence)',
        fr: 'Part de tous les immigrants au Canada (Saint-Laurent)',
      },
      description: {
        en: 'Percentage of all recorded immigrants who crossed the Atlantic to the St. Lawrence colony, including temporary workers, soldiers, and those who returned to France. The museum groups origins into broad regions; sub-regional estimates within "Northwest France" carry medium confidence.',
        fr: 'Pourcentage de tous les immigrants enregistrés ayant traversé l\'Atlantique vers la colonie du Saint-Laurent, y compris travailleurs temporaires, soldats et ceux retournés en France.',
      },
    },
    sources: [MUSEUM_SOURCE, PERCHE_SOURCE],
    origins: [
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie' }, percent: 19, confidence: 'medium',
        note: { en: 'Estimated within museum "Northwest France" (39% total). Normandy was the single largest source province.', fr: 'Estimé au sein du « Nord-Ouest » du musée (39% total).' } },
      { entityId: 'brittany', label: { en: 'Brittany', fr: 'Bretagne' }, percent: 16, confidence: 'medium',
        note: { en: 'Estimated within "Northwest France". Many Breton arrivals were temporary (fishermen, engagés).', fr: 'Estimé au sein du « Nord-Ouest ». Beaucoup de Bretons étaient temporaires.' } },
      { entityId: 'perche', label: { en: 'Perche', fr: 'Perche' }, percent: 4, confidence: 'medium',
        note: { en: '~4–5% per Perche-Québec studies. Small region with outsized founder impact.', fr: '~4–5% selon les études Perche-Québec. Petite région à l\'impact fondateur démesuré.' } },
      { entityId: 'aunis', label: { en: 'Centre-West (Aunis, Saintonge, Poitou)', fr: 'Centre-Ouest (Aunis, Saintonge, Poitou)' }, percent: 19, confidence: 'high',
        note: { en: 'Museum "Centre-West" category. La Rochelle was the primary embarkation port.', fr: 'Catégorie « Centre-Ouest » du musée.' } },
      { entityId: 'ile-de-france', label: { en: 'Paris Region (Île-de-France)', fr: 'Région parisienne (Île-de-France)' }, percent: 14, confidence: 'high' },
      { entityId: 'southwest-france', label: { en: 'Southwest France', fr: 'Sud-Ouest de la France' }, percent: 11, confidence: 'high' },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions' }, percent: 17, confidence: 'high' },
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle / Rochefort', fr: 'La Rochelle / Rochefort' }, percent: 52, confidence: 'medium',
        note: { en: 'Primary embarkation hub throughout the French regime.', fr: 'Principal port d\'embarquement sous le Régime français.' } },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe' }, percent: 16, confidence: 'medium' },
      { entityId: 'saint-malo', label: { en: 'Saint-Malo', fr: 'Saint-Malo' }, percent: 12, confidence: 'medium' },
      { entityId: 'rouen', label: { en: 'Rouen', fr: 'Rouen' }, percent: 8, confidence: 'low',
        note: { en: 'Often a staging point — many departures recorded at Rouen actually shipped from downstream ports.', fr: 'Souvent un point de transit.' } },
      { entityId: 'honfleur', label: { en: 'Honfleur', fr: 'Honfleur' }, percent: 6, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports' }, percent: 6, confidence: 'low' },
    ],
    colonies: [
      { entityId: 'colony-zone-quebec', label: { en: 'Québec Region', fr: 'Région de Québec' }, percent: 45, confidence: 'medium',
        note: { en: 'Includes Côte-de-Beaupré, Île d\'Orléans, Beauport seigneuries.', fr: 'Inclut Côte-de-Beaupré, Île d\'Orléans, seigneuries de Beauport.' } },
      { entityId: 'colony-zone-montreal', label: { en: 'Montréal Region', fr: 'Région de Montréal' }, percent: 33, confidence: 'medium' },
      { entityId: 'colony-zone-trois-rivieres', label: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières' }, percent: 14, confidence: 'medium' },
      { entityId: 'other-st-lawrence', label: { en: 'Other St. Lawrence', fr: 'Autres Saint-Laurent' }, percent: 8, confidence: 'low' },
    ],
    flowEdges: [
      { originRegionId: 'normandy', portPlaceId: 'dieppe', colonyZoneId: 'colony-zone-quebec', weight: 3, confidence: 'medium' },
      { originRegionId: 'normandy', portPlaceId: 'honfleur', colonyZoneId: 'colony-zone-quebec', weight: 2, confidence: 'low' },
      { originRegionId: 'perche', portPlaceId: 'dieppe', colonyZoneId: 'colony-zone-quebec', weight: 3, confidence: 'medium' },
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-quebec', weight: 4, confidence: 'medium' },
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-montreal', weight: 3, confidence: 'medium' },
      { originRegionId: 'brittany', portPlaceId: 'saint-malo', colonyZoneId: 'colony-zone-quebec', weight: 2, confidence: 'medium' },
      { originRegionId: 'ile-de-france', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-quebec', weight: 2, confidence: 'low' },
      { originRegionId: 'ile-de-france', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-montreal', weight: 2, confidence: 'low' },
    ],
  },

  {
    id: 'stl-founding-immigrants',
    eraIds: ['new-france-foundations', 'royal-new-france'],
    branch: 'st_lawrence',
    cohortId: 'founding_immigrants',
    yearRange: [1608, 1760],
    metricDefinition: {
      label: { en: 'Share of founding immigrants to Canada', fr: 'Part des immigrants fondateurs du Canada' },
      description: {
        en: 'Immigrants who settled permanently and founded lasting families. This population forms the ancestral base of most French-Canadians. "Northwest France" drops from 39% of all immigrants to 28% of founders because many northwestern migrants (especially Bretons) were temporary.',
        fr: 'Immigrants installés de façon permanente ayant fondé des familles durables. Le « Nord-Ouest » passe de 39% de tous les immigrants à 28% des fondateurs.',
      },
    },
    sources: [MUSEUM_SOURCE, PERCHE_SOURCE],
    origins: [
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie' }, percent: 14, confidence: 'medium' },
      { entityId: 'brittany', label: { en: 'Brittany', fr: 'Bretagne' }, percent: 9, confidence: 'medium',
        note: { en: 'Drops sharply from 16% — many Bretons did not settle permanently.', fr: 'Forte baisse depuis 16% — beaucoup de Bretons ne sont pas restés.' } },
      { entityId: 'perche', label: { en: 'Perche', fr: 'Perche' }, percent: 5, confidence: 'medium',
        note: { en: 'Rises as a share of founders — Percherons overwhelmingly stayed and formed families.', fr: 'Augmente parmi les fondateurs — les Percherons sont restés.' } },
      { entityId: 'aunis', label: { en: 'Centre-West (Aunis, Saintonge, Poitou)', fr: 'Centre-Ouest' }, percent: 20, confidence: 'high' },
      { entityId: 'ile-de-france', label: { en: 'Paris Region (Île-de-France)', fr: 'Région parisienne' }, percent: 16, confidence: 'high' },
      { entityId: 'southwest-france', label: { en: 'Southwest France', fr: 'Sud-Ouest' }, percent: 3, confidence: 'high',
        note: { en: 'Drops from 11% — most southwestern migrants were temporary.', fr: 'Baisse depuis 11% — la plupart des migrants du Sud-Ouest étaient temporaires.' } },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions' }, percent: 33, confidence: 'high' },
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle / Rochefort', fr: 'La Rochelle / Rochefort' }, percent: 55, confidence: 'medium' },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe' }, percent: 15, confidence: 'medium' },
      { entityId: 'saint-malo', label: { en: 'Saint-Malo', fr: 'Saint-Malo' }, percent: 10, confidence: 'low' },
      { entityId: 'rouen', label: { en: 'Rouen', fr: 'Rouen' }, percent: 8, confidence: 'low' },
      { entityId: 'honfleur', label: { en: 'Honfleur', fr: 'Honfleur' }, percent: 6, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports' }, percent: 6, confidence: 'low' },
    ],
    colonies: [
      { entityId: 'colony-zone-quebec', label: { en: 'Québec Region', fr: 'Région de Québec' }, percent: 48, confidence: 'medium' },
      { entityId: 'colony-zone-montreal', label: { en: 'Montréal Region', fr: 'Région de Montréal' }, percent: 30, confidence: 'medium' },
      { entityId: 'colony-zone-trois-rivieres', label: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières' }, percent: 15, confidence: 'medium' },
      { entityId: 'other-st-lawrence', label: { en: 'Other St. Lawrence', fr: 'Autres Saint-Laurent' }, percent: 7, confidence: 'low' },
    ],
    flowEdges: [
      { originRegionId: 'perche', portPlaceId: 'dieppe', colonyZoneId: 'colony-zone-quebec', weight: 3, confidence: 'medium' },
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-quebec', weight: 4, confidence: 'medium' },
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-montreal', weight: 3, confidence: 'medium' },
      { originRegionId: 'normandy', portPlaceId: 'dieppe', colonyZoneId: 'colony-zone-quebec', weight: 2, confidence: 'medium' },
      { originRegionId: 'ile-de-france', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-montreal', weight: 2, confidence: 'low' },
    ],
  },

  {
    id: 'stl-filles-du-roi',
    eraIds: ['royal-new-france'],
    branch: 'st_lawrence',
    cohortId: 'filles_du_roi',
    yearRange: [1663, 1673],
    metricDefinition: {
      label: { en: 'Share among Filles du Roi', fr: 'Part parmi les Filles du Roi' },
      description: {
        en: 'Approximately 770 young women sent to New France under royal sponsorship (1663–1673) to marry and settle. Many were recruited from Parisian hospitals and poorhouses, giving Île-de-France a disproportionately large share compared to other cohorts.',
        fr: 'Environ 770 jeunes femmes envoyées en Nouvelle-France sous parrainage royal (1663–1673). Beaucoup recrutées dans les institutions parisiennes.',
      },
    },
    sources: [MUSEUM_SOURCE],
    origins: [
      { entityId: 'ile-de-france', label: { en: 'Paris Region (Île-de-France)', fr: 'Région parisienne' }, percent: 36, confidence: 'medium',
        note: { en: 'Many recruited from Parisian institutions (Salpêtrière, etc.).', fr: 'Beaucoup recrutées dans les institutions parisiennes.' } },
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie' }, percent: 14, confidence: 'medium' },
      { entityId: 'aunis', label: { en: 'Centre-West', fr: 'Centre-Ouest' }, percent: 12, confidence: 'medium' },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions' }, percent: 38, confidence: 'medium' },
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle', fr: 'La Rochelle' }, percent: 65, confidence: 'medium' },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe' }, percent: 20, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports' }, percent: 15, confidence: 'low' },
    ],
    colonies: [
      { entityId: 'colony-zone-quebec', label: { en: 'Québec Region', fr: 'Région de Québec' }, percent: 50, confidence: 'medium' },
      { entityId: 'colony-zone-montreal', label: { en: 'Montréal Region', fr: 'Région de Montréal' }, percent: 30, confidence: 'medium' },
      { entityId: 'colony-zone-trois-rivieres', label: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières' }, percent: 15, confidence: 'medium' },
      { entityId: 'other-st-lawrence', label: { en: 'Other', fr: 'Autres' }, percent: 5, confidence: 'low' },
    ],
  },

  {
    id: 'acadia-all-immigrants',
    eraIds: ['new-france-foundations', 'royal-new-france'],
    branch: 'acadia',
    cohortId: 'all_immigrants',
    yearRange: [1604, 1713],
    metricDefinition: {
      label: { en: 'Share of immigrants to Acadia', fr: 'Part des immigrants en Acadie' },
      description: {
        en: 'Acadian recruitment drew more heavily from western and southwestern France than the St. Lawrence colony. Perhaps 500 founding families formed the core Acadian population, creating a distinct cultural community.',
        fr: 'Le recrutement acadien puisait davantage dans l\'ouest et le sud-ouest de la France. Environ 500 familles fondatrices formèrent la population acadienne.',
      },
    },
    sources: [MUSEUM_SOURCE],
    origins: [
      { entityId: 'aunis', label: { en: 'Centre-West (Aunis, Saintonge, Poitou)', fr: 'Centre-Ouest' }, percent: 28, confidence: 'medium' },
      { entityId: 'southwest-france', label: { en: 'Southwest France', fr: 'Sud-Ouest' }, percent: 18, confidence: 'medium',
        note: { en: 'Stronger southwestern connection than the St. Lawrence colony.', fr: 'Lien plus fort avec le sud-ouest que la colonie du Saint-Laurent.' } },
      { entityId: 'brittany', label: { en: 'Brittany', fr: 'Bretagne' }, percent: 15, confidence: 'medium' },
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie' }, percent: 12, confidence: 'medium' },
      { entityId: 'ile-de-france', label: { en: 'Paris Region', fr: 'Région parisienne' }, percent: 10, confidence: 'medium' },
      { entityId: 'perche', label: { en: 'Perche', fr: 'Perche' }, percent: 2, confidence: 'low',
        note: { en: 'Perche was far less connected to Acadia than to the St. Lawrence.', fr: 'Le Perche était beaucoup moins lié à l\'Acadie.' } },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions' }, percent: 15, confidence: 'medium' },
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle', fr: 'La Rochelle' }, percent: 55, confidence: 'medium' },
      { entityId: 'saint-malo', label: { en: 'Saint-Malo', fr: 'Saint-Malo' }, percent: 20, confidence: 'medium' },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe' }, percent: 10, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports' }, percent: 15, confidence: 'low' },
    ],
    colonies: [
      { entityId: 'acadia', label: { en: 'Acadia', fr: 'Acadie' }, percent: 100, confidence: 'high' },
    ],
    flowEdges: [
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'acadia', weight: 4, confidence: 'medium' },
      { originRegionId: 'brittany', portPlaceId: 'saint-malo', colonyZoneId: 'acadia', weight: 3, confidence: 'medium' },
      { originRegionId: 'southwest-france', portPlaceId: 'la-rochelle', colonyZoneId: 'acadia', weight: 2, confidence: 'medium' },
      { originRegionId: 'normandy', portPlaceId: 'dieppe', colonyZoneId: 'acadia', weight: 1, confidence: 'low' },
    ],
  },
];
