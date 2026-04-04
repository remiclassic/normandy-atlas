import type {
  MigrationDataset,
  MigrationCohortId,
  I18nString,
  MigrationFlowEdge,
  MigrationShareRow,
} from '@/core/types';

const MUSEUM_SOURCE = {
  shortCitation: 'Canadian Museum of History — Virtual Museum of New France, Immigration',
  url: 'https://www.historymuseum.ca/virtual-museum-of-new-france/population/immigration/',
};

const PERCHE_SOURCE = {
  shortCitation: 'Perche-Québec — Emigration from Perche',
  url: 'https://www.perche-quebec.com/perche/lieux/emigration-en.htm',
};

/** Context-only row — not a museum percentage category. */
const CHANNEL_ISLANDS_ORIGIN_CALLOUT: MigrationShareRow = {
  entityId: 'channel-islands-context',
  kind: 'callout',
  label: {
    en: 'Channel Islands (Guernsey, Jersey, etc.)',
    fr: 'Îles Anglo-Normandes (Guernesey, Jersey, etc.)',
    it: 'Isole del Canale (Guernsey, Jersey, ecc.)',
  },
  confidence: 'low',
  note: {
    en: 'Historically part of the Norman world, but not a major documented mass embarkation zone for New France. After 1204, when continental Normandy fell to France, the islands remained tied to the English crown and developed separately from the mainland. Islanders who crossed to New France usually appear in records under broader French or Norman labels. Lighter flow lines on the map show illustrative routing via mainland ports (Dieppe, Honfleur, La Rochelle) — not census shares.',
    fr: 'Historiquement dans la sphère normande, mais sans zone d\'embarquement de masse documentée vers la Nouvelle-France. Après 1204, lorsque la Normandie continentale tomba sous la couronne de France, les îles restèrent liées à la couronne anglaise et se développèrent séparément du continent. Les îliens qui traversèrent apparaissent souvent dans les registres sous des étiquettes « françaises » ou « normandes » plus larges. Les flux plus pâles sur la carte illustrent un acheminement plausible par les ports continentaux (Dieppe, Honfleur, La Rochelle) — pas des parts recensées.',
    it: 'Storicamente parte del mondo normanno, ma non una zona documentata di imbarco di massa verso la Nuova Francia. Dopo il 1204, quando la Normandia continentale cadde in mano alla Francia, le isole restarono legate alla corona inglese e si svilupparono separatamente dal continente. Gli isolani compaiono spesso nelle fonti con etichette francesi o normanne più generiche. I flussi più chiari sulla carta illustrano un percorso plausibile via porti continentali (Dieppe, Honfleur, La Rochelle) — non quote censuarie.',
  },
};

const MAINLAND_EMBARKATION_PORT_CALLOUT: MigrationShareRow = {
  entityId: 'mainland-embarkation-note',
  kind: 'callout',
  label: {
    en: 'Where ships actually left',
    fr: 'D\'où partaient les navires',
    it: 'Da dove salpavano davvero le navi',
  },
  confidence: 'low',
  note: {
    en: 'Documented group traffic used mainland French harbours — especially La Rochelle, Dieppe, Honfleur, and Saint-Malo. Acadia leaned heavily on La Rochelle and Saint-Malo; the St. Lawrence corridor also drew Norman embarkations. Insular ports such as Saint Peter Port were not primary terminals for New France.',
    fr: 'Le trafic groupé documenté passait par des havres français continentaux — surtout La Rochelle, Dieppe, Honfleur et Saint-Malo. L\'Acadie dépendait fortement de La Rochelle et de Saint-Malo ; le Saint-Laurent puisait aussi aux embarquements normands. Des ports insulaires comme Saint-Pierre-Port n\'étaient pas les terminaux principaux de la Nouvelle-France.',
    it: 'Il traffico di gruppi documentato passava dai porti della Francia continentale — in particolare La Rochelle, Dieppe, Honfleur e Saint-Malo. L\'Acadia dipendeva soprattutto da La Rochelle e Saint-Malo; anche il corridoio del San Lorenzo attingeva agli imbarchi normanni. Porti insulari come Saint Peter Port non erano terminali principali per la Nuova Francia.',
  },
};

const CHANNEL_ISLANDS_FLOW_ST_LAWRENCE: MigrationFlowEdge[] = [
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'dieppe',
    colonyZoneId: 'colony-zone-quebec',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'honfleur',
    colonyZoneId: 'colony-zone-quebec',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
];

const CHANNEL_ISLANDS_FLOW_ACADIA: MigrationFlowEdge[] = [
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'la-rochelle',
    colonyZoneId: 'acadia',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'dieppe',
    colonyZoneId: 'acadia',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
];

const CHANNEL_ISLANDS_FLOW_FILLES: MigrationFlowEdge[] = [
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'la-rochelle',
    colonyZoneId: 'colony-zone-quebec',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'la-rochelle',
    colonyZoneId: 'colony-zone-montreal',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
];

export const MIGRATION_COHORT_LABELS: Record<MigrationCohortId, I18nString> = {
  all_immigrants: { en: 'All Immigrants', fr: 'Tous les immigrants', it: 'Tutti gli immigrati' },
  founding_immigrants: { en: 'Founding Immigrants', fr: 'Immigrants fondateurs', it: 'Immigrati fondatori' },
  engages: { en: 'Engagés (Indentured Workers)', fr: 'Engagés', it: 'Engagés (lavoratori a contratto)' },
  filles_du_roi: { en: 'Filles du Roi', fr: 'Filles du Roi', it: 'Filles du Roi' },
  carignan_salieres: { en: 'Carignan-Salières Regiment', fr: 'Régiment de Carignan-Salières', it: 'Reggimento Carignan-Salières' },
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
        it: 'Quota di tutti gli immigrati in Canada (San Lorenzo)',
      },
      description: {
        en: 'Percentage of all recorded immigrants who crossed the Atlantic to the St. Lawrence colony, including temporary workers, soldiers, and those who returned to France. The museum groups origins into broad regions; sub-regional estimates within "Northwest France" carry medium confidence. The Channel Islands are not a separate museum category — see the callout under Origins for how they relate to the Norman world without being mass embarkation harbours.',
        fr: 'Pourcentage de tous les immigrants enregistrés ayant traversé l\'Atlantique vers la colonie du Saint-Laurent, y compris travailleurs temporaires, soldats et ceux retournés en France. Le musée regroupe les origines en grandes régions. Les îles Anglo-Normandes ne forment pas une catégorie distincte — voir l\'encadré sous Origines pour leur lien avec la sphère normande sans être des ports d\'embarquement de masse.',
        it: 'Percentuale di tutti gli immigrati registrati che attraversarono l\'Atlantico verso la colonia del San Lorenzo, inclusi lavoratori temporanei, soldati e coloro che fecero ritorno in Francia. Il museo raggruppa le origini in ampie regioni; le stime subregionali nel «Nord-Ovest della Francia» hanno confidenza media. Le Isole del Canale non sono una categoria museale separata — vedi la nota sotto Origini sul loro legame con il mondo normanno senza essere porti di imbarco di massa.',
      },
    },
    sources: [MUSEUM_SOURCE, PERCHE_SOURCE],
    origins: [
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie', it: 'Normandia' }, percent: 19, confidence: 'medium',
        note: { en: 'Estimated within museum "Northwest France" (39% total). Normandy was the single largest source province.', fr: 'Estimé au sein du « Nord-Ouest » du musée (39% total).', it: 'Stima entro il «Nord-Ovest» del museo (39% totale). La Normandia era la provincia di provenienza più numerosa.' } },
      { entityId: 'brittany', label: { en: 'Brittany', fr: 'Bretagne', it: 'Bretagna' }, percent: 16, confidence: 'medium',
        note: { en: 'Estimated within "Northwest France". Many Breton arrivals were temporary (fishermen, engagés).', fr: 'Estimé au sein du « Nord-Ouest ». Beaucoup de Bretons étaient temporaires.', it: 'Stima entro il «Nord-Ovest». Molti bretoni erano arrivi temporanei (pescatori, engagés).' } },
      { entityId: 'perche', label: { en: 'Perche', fr: 'Perche', it: 'Perche' }, percent: 4, confidence: 'medium',
        note: { en: '~4–5% per Perche-Québec studies. Small region with outsized founder impact.', fr: '~4–5% selon les études Perche-Québec. Petite région à l\'impact fondateur démesuré.', it: 'Circa 4–5% secondo gli studi Perche-Québec. Regione piccola con impatto fondatore sproporzionato.' } },
      { entityId: 'aunis', label: { en: 'Centre-West (Aunis, Saintonge, Poitou)', fr: 'Centre-Ouest (Aunis, Saintonge, Poitou)', it: 'Centro-Ovest (Aunis, Saintonge, Poitou)' }, percent: 19, confidence: 'high',
        note: { en: 'Museum "Centre-West" category. La Rochelle was the primary embarkation port.', fr: 'Catégorie « Centre-Ouest » du musée.', it: 'Categoria «Centro-Ovest» del museo. La Rochelle era il principale porto d\'imbarco.' } },
      { entityId: 'ile-de-france', label: { en: 'Paris Region (Île-de-France)', fr: 'Région parisienne (Île-de-France)', it: 'Regione parigina (Île-de-France)' }, percent: 14, confidence: 'high' },
      { entityId: 'southwest-france', label: { en: 'Southwest France', fr: 'Sud-Ouest de la France', it: 'Sud-Ovest della Francia' }, percent: 11, confidence: 'high' },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions', it: 'Altre regioni' }, percent: 17, confidence: 'high' },
      CHANNEL_ISLANDS_ORIGIN_CALLOUT,
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle / Rochefort', fr: 'La Rochelle / Rochefort', it: 'La Rochelle / Rochefort' }, percent: 52, confidence: 'medium',
        note: { en: 'Primary embarkation hub throughout the French regime.', fr: 'Principal port d\'embarquement sous le Régime français.', it: 'Principale snodo d\'imbarco durante il regime francese.' } },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe', it: 'Dieppe' }, percent: 16, confidence: 'medium' },
      { entityId: 'saint-malo', label: { en: 'Saint-Malo', fr: 'Saint-Malo', it: 'Saint-Malo' }, percent: 12, confidence: 'medium' },
      { entityId: 'rouen', label: { en: 'Rouen', fr: 'Rouen', it: 'Rouen' }, percent: 8, confidence: 'low',
        note: { en: 'Often a staging point — many departures recorded at Rouen actually shipped from downstream ports.', fr: 'Souvent un point de transit.', it: 'Spesso punto di transito: molte partenze registrate a Rouen salpavano in realtà da porti a valle.' } },
      { entityId: 'honfleur', label: { en: 'Honfleur', fr: 'Honfleur', it: 'Honfleur' }, percent: 6, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports', it: 'Altri porti' }, percent: 6, confidence: 'low' },
      MAINLAND_EMBARKATION_PORT_CALLOUT,
    ],
    colonies: [
      { entityId: 'colony-zone-quebec', label: { en: 'Québec Region', fr: 'Région de Québec', it: 'Regione di Québec' }, percent: 45, confidence: 'medium',
        note: { en: 'Includes Côte-de-Beaupré, Île d\'Orléans, Beauport seigneuries.', fr: 'Inclut Côte-de-Beaupré, Île d\'Orléans, seigneuries de Beauport.', it: 'Include Côte-de-Beaupré, Île d\'Orléans, signorie di Beauport.' } },
      { entityId: 'colony-zone-montreal', label: { en: 'Montréal Region', fr: 'Région de Montréal', it: 'Regione di Montréal' }, percent: 33, confidence: 'medium' },
      { entityId: 'colony-zone-trois-rivieres', label: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières', it: 'Regione di Trois-Rivières' }, percent: 14, confidence: 'medium' },
      { entityId: 'other-st-lawrence', label: { en: 'Other St. Lawrence', fr: 'Autres Saint-Laurent', it: 'Altri (San Lorenzo)' }, percent: 8, confidence: 'low' },
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
      ...CHANNEL_ISLANDS_FLOW_ST_LAWRENCE,
    ],
  },

  {
    id: 'stl-founding-immigrants',
    eraIds: ['new-france-foundations', 'royal-new-france'],
    branch: 'st_lawrence',
    cohortId: 'founding_immigrants',
    yearRange: [1608, 1760],
    metricDefinition: {
      label: { en: 'Share of founding immigrants to Canada', fr: 'Part des immigrants fondateurs du Canada', it: 'Quota degli immigrati fondatori in Canada' },
      description: {
        en: 'Immigrants who settled permanently and founded lasting families. This population forms the ancestral base of most French-Canadians. "Northwest France" drops from 39% of all immigrants to 28% of founders because many northwestern migrants (especially Bretons) were temporary. Channel Islanders, when present, are folded into broader regional categories in the sources — see the Origins callout.',
        fr: 'Immigrants installés de façon permanente ayant fondé des familles durables. Le « Nord-Ouest » passe de 39% de tous les immigrants à 28% des fondateurs. Les îliens, lorsqu\'ils figurent, sont regroupés dans des catégories régionales plus larges dans les sources — voir l\'encadré sous Origines.',
        it: 'Immigrati che si stabilirono in modo permanente e fondarono famiglie durature. Questa popolazione forma la base ancestrale della maggior parte dei canadesi francofoni. Il «Nord-Ouest» scende dal 39% di tutti gli immigrati al 28% dei fondatori perché molti provenienti dal nord-ovest (soprattutto bretoni) erano temporanei. Gli isolani, quando compaiono, sono ricompresi in categorie regionali più ampie nelle fonti — vedi la nota sotto Origini.',
      },
    },
    sources: [MUSEUM_SOURCE, PERCHE_SOURCE],
    origins: [
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie', it: 'Normandia' }, percent: 14, confidence: 'medium' },
      { entityId: 'brittany', label: { en: 'Brittany', fr: 'Bretagne', it: 'Bretagna' }, percent: 9, confidence: 'medium',
        note: { en: 'Drops sharply from 16% — many Bretons did not settle permanently.', fr: 'Forte baisse depuis 16% — beaucoup de Bretons ne sont pas restés.', it: 'Forte calo rispetto al 16%: molti bretoni non si stabilirono in modo permanente.' } },
      { entityId: 'perche', label: { en: 'Perche', fr: 'Perche', it: 'Perche' }, percent: 5, confidence: 'medium',
        note: { en: 'Rises as a share of founders — Percherons overwhelmingly stayed and formed families.', fr: 'Augmente parmi les fondateurs — les Percherons sont restés.', it: 'Cresce tra i fondatori: i percheroni rimasero quasi tutti e fondarono famiglie.' } },
      { entityId: 'aunis', label: { en: 'Centre-West (Aunis, Saintonge, Poitou)', fr: 'Centre-Ouest', it: 'Centro-Ovest (Aunis, Saintonge, Poitou)' }, percent: 20, confidence: 'high' },
      { entityId: 'ile-de-france', label: { en: 'Paris Region (Île-de-France)', fr: 'Région parisienne', it: 'Regione parigina (Île-de-France)' }, percent: 16, confidence: 'high' },
      { entityId: 'southwest-france', label: { en: 'Southwest France', fr: 'Sud-Ouest', it: 'Sud-Ovest' }, percent: 3, confidence: 'high',
        note: { en: 'Drops from 11% — most southwestern migrants were temporary.', fr: 'Baisse depuis 11% — la plupart des migrants du Sud-Ouest étaient temporaires.', it: 'Calo rispetto all\'11%: la maggior parte dei migranti del sud-ovest era temporanea.' } },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions', it: 'Altre regioni' }, percent: 33, confidence: 'high' },
      CHANNEL_ISLANDS_ORIGIN_CALLOUT,
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle / Rochefort', fr: 'La Rochelle / Rochefort', it: 'La Rochelle / Rochefort' }, percent: 55, confidence: 'medium' },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe', it: 'Dieppe' }, percent: 15, confidence: 'medium' },
      { entityId: 'saint-malo', label: { en: 'Saint-Malo', fr: 'Saint-Malo', it: 'Saint-Malo' }, percent: 10, confidence: 'low' },
      { entityId: 'rouen', label: { en: 'Rouen', fr: 'Rouen', it: 'Rouen' }, percent: 8, confidence: 'low' },
      { entityId: 'honfleur', label: { en: 'Honfleur', fr: 'Honfleur', it: 'Honfleur' }, percent: 6, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports', it: 'Altri porti' }, percent: 6, confidence: 'low' },
      MAINLAND_EMBARKATION_PORT_CALLOUT,
    ],
    colonies: [
      { entityId: 'colony-zone-quebec', label: { en: 'Québec Region', fr: 'Région de Québec', it: 'Regione di Québec' }, percent: 48, confidence: 'medium' },
      { entityId: 'colony-zone-montreal', label: { en: 'Montréal Region', fr: 'Région de Montréal', it: 'Regione di Montréal' }, percent: 30, confidence: 'medium' },
      { entityId: 'colony-zone-trois-rivieres', label: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières', it: 'Regione di Trois-Rivières' }, percent: 15, confidence: 'medium' },
      { entityId: 'other-st-lawrence', label: { en: 'Other St. Lawrence', fr: 'Autres Saint-Laurent', it: 'Altri (San Lorenzo)' }, percent: 7, confidence: 'low' },
    ],
    flowEdges: [
      { originRegionId: 'perche', portPlaceId: 'dieppe', colonyZoneId: 'colony-zone-quebec', weight: 3, confidence: 'medium' },
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-quebec', weight: 4, confidence: 'medium' },
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-montreal', weight: 3, confidence: 'medium' },
      { originRegionId: 'normandy', portPlaceId: 'dieppe', colonyZoneId: 'colony-zone-quebec', weight: 2, confidence: 'medium' },
      { originRegionId: 'ile-de-france', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-montreal', weight: 2, confidence: 'low' },
      ...CHANNEL_ISLANDS_FLOW_ST_LAWRENCE,
    ],
  },

  {
    id: 'stl-filles-du-roi',
    eraIds: ['royal-new-france'],
    branch: 'st_lawrence',
    cohortId: 'filles_du_roi',
    yearRange: [1663, 1673],
    metricDefinition: {
      label: { en: 'Share among Filles du Roi', fr: 'Part parmi les Filles du Roi', it: 'Quota tra le Filles du Roi' },
      description: {
        en: 'Approximately 770 young women sent to New France under royal sponsorship (1663–1673) to marry and settle. Many were recruited from Parisian hospitals and poorhouses, giving Île-de-France a disproportionately large share compared to other cohorts. Most sailed from La Rochelle; lighter map arcs show illustrative Channel Island routing only.',
        fr: 'Environ 770 jeunes femmes envoyées en Nouvelle-France sous parrainage royal (1663–1673). Beaucoup recrutées dans les institutions parisiennes. La plupart embarquèrent à La Rochelle ; les arcs plus pâles sur la carte illustrent seulement un acheminement depuis les îles.',
        it: 'Circa 770 giovani donne inviate in Nuova Francia con patrocinio reale (1663–1673) per sposarsi e stabilirsi. Molte furono reclutate negli ospedali e nei ricoveri parigini, conferendo all\'Île-de-France una quota molto alta rispetto ad altre coorti. La maggior parte salpò da La Rochelle; gli archi più chiari sulla mappa illustrano solo un percorso esemplificativo dalle isole del Canale.',
      },
    },
    sources: [MUSEUM_SOURCE],
    origins: [
      { entityId: 'ile-de-france', label: { en: 'Paris Region (Île-de-France)', fr: 'Région parisienne', it: 'Regione parigina (Île-de-France)' }, percent: 36, confidence: 'medium',
        note: { en: 'Many recruited from Parisian institutions (Salpêtrière, etc.).', fr: 'Beaucoup recrutées dans les institutions parisiennes.', it: 'Molte reclutate nelle istituzioni parigine (Salpêtrière, ecc.).' } },
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie', it: 'Normandia' }, percent: 14, confidence: 'medium' },
      { entityId: 'aunis', label: { en: 'Centre-West', fr: 'Centre-Ouest', it: 'Centro-Ovest' }, percent: 12, confidence: 'medium' },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions', it: 'Altre regioni' }, percent: 38, confidence: 'medium' },
      CHANNEL_ISLANDS_ORIGIN_CALLOUT,
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle', fr: 'La Rochelle', it: 'La Rochelle' }, percent: 65, confidence: 'medium' },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe', it: 'Dieppe' }, percent: 20, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports', it: 'Altri porti' }, percent: 15, confidence: 'low' },
      MAINLAND_EMBARKATION_PORT_CALLOUT,
    ],
    colonies: [
      { entityId: 'colony-zone-quebec', label: { en: 'Québec Region', fr: 'Région de Québec', it: 'Regione di Québec' }, percent: 50, confidence: 'medium' },
      { entityId: 'colony-zone-montreal', label: { en: 'Montréal Region', fr: 'Région de Montréal', it: 'Regione di Montréal' }, percent: 30, confidence: 'medium' },
      { entityId: 'colony-zone-trois-rivieres', label: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières', it: 'Regione di Trois-Rivières' }, percent: 15, confidence: 'medium' },
      { entityId: 'other-st-lawrence', label: { en: 'Other', fr: 'Autres', it: 'Altri' }, percent: 5, confidence: 'low' },
    ],
    flowEdges: [...CHANNEL_ISLANDS_FLOW_FILLES],
  },

  {
    id: 'acadia-all-immigrants',
    eraIds: ['new-france-foundations', 'royal-new-france'],
    branch: 'acadia',
    cohortId: 'all_immigrants',
    yearRange: [1604, 1713],
    metricDefinition: {
      label: { en: 'Share of immigrants to Acadia', fr: 'Part des immigrants en Acadie', it: 'Quota di immigrati in Acadia' },
      description: {
        en: 'Acadian recruitment drew more heavily from western and southwestern France than the St. Lawrence colony. Perhaps 500 founding families formed the core Acadian population, creating a distinct cultural community. Embarkation still ran through mainland ports (especially La Rochelle); see the Ports callout and Channel Islands note under Origins.',
        fr: 'Le recrutement acadien puisait davantage dans l\'ouest et le sud-ouest de la France. Environ 500 familles fondatrices formèrent la population acadienne. Les embarquements passaient tout de même par les ports continentaux (surtout La Rochelle) ; voir l\'encadré Ports et la note sur les îles sous Origines.',
        it: 'Il reclutamento acadiano attingeva più abbondantemente all\'ovest e al sud-ovest della Francia rispetto alla colonia del San Lorenzo. Circa 500 famiglie fondatrici formarono il nucleo della popolazione acadiana, creando una comunità culturale distinta. Gli imbarchi passavano comunque dai porti continentali (in particolare La Rochelle); vedi la nota sui porti e quella sulle isole del Canale sotto Origini.',
      },
    },
    sources: [MUSEUM_SOURCE],
    origins: [
      { entityId: 'aunis', label: { en: 'Centre-West (Aunis, Saintonge, Poitou)', fr: 'Centre-Ouest', it: 'Centro-Ovest (Aunis, Saintonge, Poitou)' }, percent: 28, confidence: 'medium' },
      { entityId: 'southwest-france', label: { en: 'Southwest France', fr: 'Sud-Ouest', it: 'Sud-Ovest' }, percent: 18, confidence: 'medium',
        note: { en: 'Stronger southwestern connection than the St. Lawrence colony.', fr: 'Lien plus fort avec le sud-ouest que la colonie du Saint-Laurent.', it: 'Legame più forte con il sud-ovest rispetto alla colonia del San Lorenzo.' } },
      { entityId: 'brittany', label: { en: 'Brittany', fr: 'Bretagne', it: 'Bretagna' }, percent: 15, confidence: 'medium' },
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie', it: 'Normandia' }, percent: 12, confidence: 'medium' },
      { entityId: 'ile-de-france', label: { en: 'Paris Region', fr: 'Région parisienne', it: 'Regione parigina' }, percent: 10, confidence: 'medium' },
      { entityId: 'perche', label: { en: 'Perche', fr: 'Perche', it: 'Perche' }, percent: 2, confidence: 'low',
        note: { en: 'Perche was far less connected to Acadia than to the St. Lawrence.', fr: 'Le Perche était beaucoup moins lié à l\'Acadie.', it: 'Il Perche era molto meno collegato all\'Acadia che al San Lorenzo.' } },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions', it: 'Altre regioni' }, percent: 15, confidence: 'medium' },
      CHANNEL_ISLANDS_ORIGIN_CALLOUT,
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle', fr: 'La Rochelle', it: 'La Rochelle' }, percent: 55, confidence: 'medium' },
      { entityId: 'saint-malo', label: { en: 'Saint-Malo', fr: 'Saint-Malo', it: 'Saint-Malo' }, percent: 20, confidence: 'medium' },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe', it: 'Dieppe' }, percent: 10, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports', it: 'Altri porti' }, percent: 15, confidence: 'low' },
      MAINLAND_EMBARKATION_PORT_CALLOUT,
    ],
    colonies: [
      { entityId: 'acadia', label: { en: 'Acadia', fr: 'Acadie', it: 'Acadia' }, percent: 100, confidence: 'high' },
    ],
    flowEdges: [
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'acadia', weight: 4, confidence: 'medium' },
      { originRegionId: 'brittany', portPlaceId: 'saint-malo', colonyZoneId: 'acadia', weight: 3, confidence: 'medium' },
      { originRegionId: 'southwest-france', portPlaceId: 'la-rochelle', colonyZoneId: 'acadia', weight: 2, confidence: 'medium' },
      { originRegionId: 'normandy', portPlaceId: 'dieppe', colonyZoneId: 'acadia', weight: 1, confidence: 'low' },
      ...CHANNEL_ISLANDS_FLOW_ACADIA,
    ],
  },
];
