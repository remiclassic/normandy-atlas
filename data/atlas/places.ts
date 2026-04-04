import type { Place } from '@/core/types';

export const atlasPlaces: Place[] = [
  {
    id: 'paris',
    kind: 'city',
    coordinates: [2.35, 48.86],
    regionId: 'frankish-core',
    layer: 'europe',
    eraStates: {
      'iron-age-gaul': { visibility: 'normal', label: 'Lutetia (Parisii)', affiliationTags: ['Parisii', 'Celtic'], pedagogyIndex: 4 },
      'roman-gaul': { visibility: 'emphasized', label: 'Lutetia', affiliationTags: ['Roman'], pedagogyIndex: 5 },
      'post-roman-gaul': { visibility: 'emphasized', label: 'Lutetia / Paris', affiliationTags: ['Frankish'], pedagogyIndex: 5 },
      'neustria': { visibility: 'emphasized', label: 'Paris', affiliationTags: ['Neustria', 'Frankish'], pedagogyIndex: 5 },
      'frankish-carolingian': { visibility: 'emphasized', label: 'Paris', affiliationTags: ['Carolingian'], pedagogyIndex: 5 },
      'viking-age': { visibility: 'emphasized', label: 'Paris', affiliationTags: ['Frankish', 'besieged'], pedagogyIndex: 5 },
      'age-of-exploration': { visibility: 'normal', label: 'Paris', affiliationTags: ['France', 'capital'], pedagogyIndex: 3 },
      'new-france-foundations': { visibility: 'normal', label: 'Paris', affiliationTags: ['France', 'capital'], pedagogyIndex: 3 },
      'royal-new-france': { visibility: 'normal', label: 'Paris', affiliationTags: ['France', 'capital'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'rouen',
    kind: 'city',
    coordinates: [1.10, 49.44],
    regionId: 'lower-seine',
    layer: 'europe',
    eraStates: {
      'iron-age-gaul': { visibility: 'emphasized', label: 'Rotomagus (Veliocasses)', affiliationTags: ['Veliocasses', 'Celtic', 'oppidum'], pedagogyIndex: 5 },
      'roman-gaul': { visibility: 'emphasized', label: 'Rotomagus', affiliationTags: ['Roman', 'provincial capital'], pedagogyIndex: 5 },
      'post-roman-gaul': { visibility: 'normal', label: 'Rotomagus', affiliationTags: ['Gallo-Roman'], pedagogyIndex: 4 },
      'neustria': { visibility: 'emphasized', label: 'Rouen', affiliationTags: ['Neustria', 'Frankish'], pedagogyIndex: 5 },
      'frankish-carolingian': { visibility: 'emphasized', label: 'Rouen', affiliationTags: ['Carolingian'], pedagogyIndex: 5 },
      'viking-age': { visibility: 'emphasized', label: 'Rouen', affiliationTags: ['Viking', 'contested'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'emphasized', label: 'Rouen', affiliationTags: ['Normandy', 'capital'], pedagogyIndex: 5 },
      'norman-expansion': { visibility: 'emphasized', label: 'Rouen', affiliationTags: ['Normandy'], pedagogyIndex: 4 },
      'age-of-exploration': { visibility: 'normal', label: 'Rouen', affiliationTags: ['France', 'Normandy'], pedagogyIndex: 4 },
      'new-france-foundations': { visibility: 'emphasized', label: 'Rouen', affiliationTags: ['France'], pedagogyIndex: 4 },
      'royal-new-france': { visibility: 'normal', label: 'Rouen', affiliationTags: ['France'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'jumieges',
    kind: 'settlement',
    coordinates: [0.82, 49.43],
    regionId: 'lower-seine',
    layer: 'europe',
    eraStates: {
      'neustria': { visibility: 'normal', label: 'Jumièges Abbey', affiliationTags: ['Neustria', 'monastic'], pedagogyIndex: 3 },
      'frankish-carolingian': { visibility: 'normal', label: 'Jumièges Abbey', affiliationTags: ['Carolingian', 'monastic'], pedagogyIndex: 4 },
      'viking-age': { visibility: 'emphasized', label: 'Jumièges (sacked)', affiliationTags: ['Viking', 'raided'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'seine-estuary',
    kind: 'abstract_node',
    coordinates: [0.12, 49.48],
    regionId: 'lower-seine',
    layer: 'europe',
    eraStates: {
      'bronze-age-channel': { visibility: 'normal', label: 'Seine Mouth', affiliationTags: ['trade landing'], pedagogyIndex: 4 },
      'iron-age-gaul': { visibility: 'normal', label: 'Seine Mouth', affiliationTags: ['Celtic', 'trade'], pedagogyIndex: 3 },
      'roman-gaul': { visibility: 'normal', label: 'Seine Estuary', affiliationTags: ['Roman', 'port'], pedagogyIndex: 3 },
      'frankish-carolingian': { visibility: 'normal', label: 'Seine Mouth', affiliationTags: ['Carolingian', 'maritime'], pedagogyIndex: 3 },
      'viking-age': { visibility: 'emphasized', label: 'Seine Mouth', affiliationTags: ['Viking', 'entry point'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Seine Estuary', affiliationTags: ['Normandy'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'nantes',
    kind: 'city',
    coordinates: [-1.55, 47.22],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'neustria': { visibility: 'normal', label: 'Nantes', affiliationTags: ['Neustria', 'Frankish'], pedagogyIndex: 3 },
      'frankish-carolingian': { visibility: 'normal', label: 'Nantes', affiliationTags: ['Carolingian', 'Breton march'], pedagogyIndex: 4 },
      'viking-age': { visibility: 'normal', label: 'Nantes', affiliationTags: ['raided'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'caen',
    kind: 'city',
    coordinates: [-0.37, 49.18],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-origins': { visibility: 'normal', label: 'Caen', affiliationTags: ['Normandy'], pedagogyIndex: 3 },
      'norman-expansion': { visibility: 'emphasized', label: 'Caen', affiliationTags: ['Normandy'], pedagogyIndex: 4 },
      'age-of-exploration': { visibility: 'normal', label: 'Caen', affiliationTags: ['Normandy', 'France'], pedagogyIndex: 3 },
      'new-france-foundations': { visibility: 'normal', label: 'Caen', affiliationTags: ['France'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'quentovic',
    kind: 'port',
    coordinates: [1.64, 50.52],
    regionId: 'channel-coast',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'emphasized', label: 'Quentovic', affiliationTags: ['Carolingian', 'emporium'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'dieppe',
    kind: 'port',
    coordinates: [1.08, 49.92],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'age-of-exploration': { visibility: 'emphasized', label: 'Dieppe', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 5 },
      'new-france-foundations': { visibility: 'emphasized', label: 'Dieppe', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 4 },
      'royal-new-france': { visibility: 'normal', label: 'Dieppe', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'honfleur',
    kind: 'port',
    coordinates: [0.23, 49.42],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', label: 'Honfleur', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 4 },
      'new-france-foundations': { visibility: 'normal', label: 'Honfleur', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'saint-peter-port',
    kind: 'port',
    coordinates: [-2.535, 49.455],
    regionId: 'channel-coast',
    layer: 'europe',
    eraStates: {
      'norman-origins': {
        visibility: 'normal',
        label: 'Saint Peter Port (Guernsey)',
        affiliationTags: ['Channel Islands', 'Normandy', 'ducal'],
        pedagogyIndex: 3,
      },
      'norman-expansion': {
        visibility: 'normal',
        label: 'Saint Peter Port (Guernsey)',
        affiliationTags: ['Channel Islands', 'Anglo-Norman', 'Crown'],
        pedagogyIndex: 3,
      },
      'new-france-foundations': {
        visibility: 'normal',
        label: 'Saint Peter Port (Guernsey)',
        affiliationTags: ['Channel Islands', 'Norman world', 'not a mass embarkation port'],
        pedagogyIndex: 3,
      },
      'royal-new-france': {
        visibility: 'normal',
        label: 'Saint Peter Port',
        affiliationTags: ['Channel Islands', 'Norman world'],
        pedagogyIndex: 2,
      },
    },
  },
  {
    id: 'mont-orgueil',
    kind: 'fort',
    coordinates: [-2.012, 49.198],
    regionId: 'channel-coast',
    layer: 'europe',
    eraStates: {
      'norman-expansion': {
        visibility: 'emphasized',
        label: 'Mont Orgueil (Jersey)',
        affiliationTags: ['Channel Islands', 'Anglo-Norman', 'fortress'],
        pedagogyIndex: 5,
      },
    },
  },
  {
    id: 'mortagne-au-perche',
    kind: 'city',
    coordinates: [0.55, 48.52],
    regionId: 'perche',
    layer: 'europe',
    eraStates: {
      'new-france-foundations': { visibility: 'emphasized', label: 'Mortagne-au-Perche', affiliationTags: ['Perche'], pedagogyIndex: 5 },
      'royal-new-france': { visibility: 'normal', label: 'Mortagne-au-Perche', affiliationTags: ['Perche'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'la-rochelle',
    kind: 'port',
    coordinates: [-1.15, 46.16],
    regionId: 'aunis',
    layer: 'europe',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', label: 'La Rochelle', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 4 },
      'new-france-foundations': { visibility: 'emphasized', label: 'La Rochelle', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 5 },
      'royal-new-france': { visibility: 'emphasized', label: 'La Rochelle', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'saint-malo',
    kind: 'port',
    coordinates: [-2.02, 48.65],
    regionId: 'brittany',
    layer: 'europe',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', label: 'Saint-Malo', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 4 },
      'royal-new-france': { visibility: 'emphasized', label: 'Saint-Malo', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 5 },
      'atlantic-imprint': { visibility: 'normal', label: 'Saint-Malo', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'mid-atlantic-passage',
    kind: 'abstract_node',
    coordinates: [-28.0, 47.0],
    regionId: 'atlantic-basin',
    layer: 'atlantic',
    eraStates: {
      'age-of-exploration': { visibility: 'emphasized', label: 'Atlantic Passage', affiliationTags: ['Atlantic corridor'], pedagogyIndex: 5 },
      'new-france-foundations': { visibility: 'emphasized', label: 'Atlantic Passage', affiliationTags: ['Atlantic corridor'], pedagogyIndex: 5 },
      'royal-new-france': { visibility: 'normal', label: 'Atlantic Passage', affiliationTags: ['Atlantic corridor'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'quebec-city',
    kind: 'settlement',
    coordinates: [-71.21, 46.81],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', label: 'Stadacona', affiliationTags: ['St. Lawrence Iroquoians'], pedagogyIndex: 4 },
      'new-france-foundations': { visibility: 'emphasized', label: 'Québec', affiliationTags: ['New France'], pedagogyIndex: 5 },
      'royal-new-france': { visibility: 'emphasized', label: 'Québec', affiliationTags: ['New France'], pedagogyIndex: 5 },
      'atlantic-imprint': { visibility: 'normal', label: 'Québec', affiliationTags: ['New France'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'pointe-levis',
    kind: 'settlement',
    coordinates: [-71.17, 46.74],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'new-france-foundations': {
        visibility: 'normal',
        label: 'Pointe-Lévy (seigneury of Lauzon)',
        affiliationTags: ['New France', 'habitant'],
        pedagogyIndex: 4,
      },
      'royal-new-france': {
        visibility: 'normal',
        label: 'Pointe-Lévy / Lévis shore',
        affiliationTags: ['New France'],
        pedagogyIndex: 3,
      },
    },
  },
  {
    id: 'montreal',
    kind: 'settlement',
    coordinates: [-73.57, 45.50],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', label: 'Hochelaga', affiliationTags: ['St. Lawrence Iroquoians'], pedagogyIndex: 4 },
      'new-france-foundations': { visibility: 'normal', label: 'Montréal', affiliationTags: ['New France'], pedagogyIndex: 4 },
      'royal-new-france': { visibility: 'emphasized', label: 'Montréal', affiliationTags: ['New France'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'trois-rivieres',
    kind: 'settlement',
    coordinates: [-72.55, 46.35],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'new-france-foundations': { visibility: 'normal', label: 'Trois-Rivières', affiliationTags: ['New France'], pedagogyIndex: 4 },
      'royal-new-france': { visibility: 'normal', label: 'Trois-Rivières', affiliationTags: ['New France'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'beauport',
    kind: 'settlement',
    coordinates: [-71.19, 46.88],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'new-france-foundations': { visibility: 'normal', label: 'Beauport', affiliationTags: ['New France'], pedagogyIndex: 4 },
      'royal-new-france': { visibility: 'normal', label: 'Beauport', affiliationTags: ['New France'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'port-royal',
    kind: 'settlement',
    coordinates: [-65.52, 44.74],
    regionId: 'acadia',
    layer: 'americas',
    eraStates: {
      'new-france-foundations': { visibility: 'normal', label: 'Port-Royal', affiliationTags: ['Acadia'], pedagogyIndex: 4 },
      'royal-new-france': { visibility: 'emphasized', label: 'Port-Royal', affiliationTags: ['Acadia'], pedagogyIndex: 4 },
      'atlantic-imprint': { visibility: 'normal', label: 'Port-Royal', affiliationTags: ['Acadia'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'louisbourg',
    kind: 'fort',
    coordinates: [-59.98, 45.89],
    regionId: 'acadia',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'emphasized', label: 'Louisbourg', affiliationTags: ['Île Royale'], pedagogyIndex: 5 },
      'atlantic-imprint': { visibility: 'emphasized', label: 'Louisbourg', affiliationTags: ['Île Royale'], pedagogyIndex: 5 },
    },
  },
  // --- Megalithic / Neolithic sites ---
  {
    id: 'dolmen-vauville',
    kind: 'megalith',
    coordinates: [-1.84, 49.64],
    regionId: 'normandy-neolithic-zone',
    layer: 'europe',
    eraStates: {
      'neolithic-normandy': { visibility: 'emphasized', label: 'Vauville Dolmen', affiliationTags: ['burial', 'ritual', 'Neolithic'], pedagogyIndex: 5 },
      'bronze-age-channel': { visibility: 'faded', label: 'Vauville Dolmen', affiliationTags: ['Neolithic remnant'], pedagogyIndex: 2 },
    },
  },
  {
    id: 'megaliths-fontenay',
    kind: 'megalith',
    coordinates: [-0.36, 49.13],
    regionId: 'normandy-neolithic-zone',
    layer: 'europe',
    eraStates: {
      'neolithic-normandy': { visibility: 'emphasized', label: 'Fontenay-le-Marmion', affiliationTags: ['burial', 'cluster', 'Neolithic'], pedagogyIndex: 5 },
      'bronze-age-channel': { visibility: 'faded', label: 'Fontenay megaliths', affiliationTags: ['Neolithic remnant'], pedagogyIndex: 2 },
    },
  },
  {
    id: 'cairon-site',
    kind: 'megalith',
    coordinates: [-0.45, 49.22],
    regionId: 'normandy-neolithic-zone',
    layer: 'europe',
    eraStates: {
      'neolithic-normandy': { visibility: 'normal', label: 'Cairon burial site', affiliationTags: ['burial', 'Neolithic'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'dolmen-passais',
    kind: 'megalith',
    coordinates: [-0.52, 48.53],
    regionId: 'normandy-neolithic-zone',
    layer: 'europe',
    eraStates: {
      'neolithic-normandy': { visibility: 'normal', label: 'Table du Diable (Passais)', affiliationTags: ['burial', 'ritual', 'Neolithic'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'menhir-dol',
    kind: 'megalith',
    coordinates: [-1.75, 48.55],
    regionId: 'normandy-neolithic-zone',
    layer: 'europe',
    eraStates: {
      'neolithic-normandy': { visibility: 'normal', label: 'Menhir de Dol', affiliationTags: ['standing stone', 'ritual', 'Neolithic'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'allee-couverte-bretteville',
    kind: 'megalith',
    coordinates: [-0.48, 49.20],
    regionId: 'normandy-neolithic-zone',
    layer: 'europe',
    eraStates: {
      'neolithic-normandy': { visibility: 'normal', label: 'Allée couverte (Bretteville)', affiliationTags: ['passage tomb', 'Neolithic'], pedagogyIndex: 4 },
    },
  },
  // --- Channel Islands megalithic sites ---
  {
    id: 'hougue-bie',
    kind: 'megalith',
    coordinates: [-2.0588, 49.2077],
    regionId: 'channel-islands-neolithic',
    layer: 'europe',
    eraStates: {
      'neolithic-normandy': { visibility: 'emphasized', label: 'La Hougue Bie (Jersey)', affiliationTags: ['passage grave', 'ritual', 'Neolithic', 'Channel Islands'], pedagogyIndex: 5 },
      'bronze-age-channel': { visibility: 'faded', label: 'La Hougue Bie', affiliationTags: ['Neolithic remnant', 'Channel Islands'], pedagogyIndex: 2 },
    },
  },
  {
    id: 'faldouet-dolmen',
    kind: 'megalith',
    coordinates: [-2.0220, 49.2148],
    regionId: 'channel-islands-neolithic',
    layer: 'europe',
    eraStates: {
      'neolithic-normandy': { visibility: 'normal', label: 'La Pouquelaye de Faldouet (Jersey)', affiliationTags: ['dolmen', 'passage grave', 'Neolithic', 'Channel Islands'], pedagogyIndex: 4 },
      'bronze-age-channel': { visibility: 'faded', label: 'Faldouet Dolmen', affiliationTags: ['Neolithic remnant', 'Channel Islands'], pedagogyIndex: 2 },
    },
  },
  {
    id: 'le-dehus',
    kind: 'megalith',
    coordinates: [-2.5735, 49.4790],
    regionId: 'channel-islands-neolithic',
    layer: 'europe',
    eraStates: {
      'neolithic-normandy': { visibility: 'normal', label: 'Le Déhus (Guernsey)', affiliationTags: ['passage grave', 'Neolithic', 'Channel Islands'], pedagogyIndex: 4 },
      'bronze-age-channel': { visibility: 'faded', label: 'Le Déhus', affiliationTags: ['Neolithic remnant', 'Channel Islands'], pedagogyIndex: 2 },
    },
  },
  // --- Bronze Age coastal settlements ---
  {
    id: 'bronze-cotentin-coast',
    kind: 'settlement',
    coordinates: [-1.62, 49.63],
    regionId: 'normandy-neolithic-zone',
    layer: 'europe',
    eraStates: {
      'bronze-age-channel': { visibility: 'emphasized', label: 'Cotentin Coast (trade landing)', affiliationTags: ['maritime', 'metal trade'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'bronze-caux-coast',
    kind: 'settlement',
    coordinates: [0.50, 49.85],
    regionId: 'normandy-neolithic-zone',
    layer: 'europe',
    eraStates: {
      'bronze-age-channel': { visibility: 'normal', label: 'Caux Coast', affiliationTags: ['maritime', 'metal trade'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'cornwall-tin',
    kind: 'abstract_node',
    coordinates: [-5.05, 50.26],
    regionId: 'channel-trade-zone',
    layer: 'europe',
    eraStates: {
      'bronze-age-channel': { visibility: 'emphasized', label: 'Cornwall (tin source)', affiliationTags: ['tin', 'metal', 'British'], pedagogyIndex: 5 },
    },
  },
  // --- Iron Age hillforts / oppida ---
  {
    id: 'oppidum-rouen',
    kind: 'hillfort',
    coordinates: [1.05, 49.46],
    regionId: 'veliocasses',
    layer: 'europe',
    eraStates: {
      'iron-age-gaul': { visibility: 'emphasized', label: 'Oppidum of Rotomagus', affiliationTags: ['Veliocasses', 'oppidum', 'capital'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'hillfort-duclair',
    kind: 'hillfort',
    coordinates: [0.87, 49.48],
    regionId: 'veliocasses',
    layer: 'europe',
    eraStates: {
      'iron-age-gaul': { visibility: 'normal', label: 'Duclair hillfort', affiliationTags: ['Veliocasses', 'defensive'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'oppidum-lillebonne',
    kind: 'hillfort',
    coordinates: [0.53, 49.52],
    regionId: 'caletes',
    layer: 'europe',
    eraStates: {
      'iron-age-gaul': { visibility: 'emphasized', label: 'Juliobona (Caletes)', affiliationTags: ['Caletes', 'oppidum'], pedagogyIndex: 5 },
      'roman-gaul': { visibility: 'normal', label: 'Juliobona', affiliationTags: ['Roman', 'amphitheatre'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'cosedia-coutances',
    kind: 'hillfort',
    coordinates: [-1.44, 49.05],
    regionId: 'unelli',
    layer: 'europe',
    eraStates: {
      'iron-age-gaul': { visibility: 'emphasized', label: 'Cosedia (Unelli)', affiliationTags: ['Unelli', 'capital'], pedagogyIndex: 5 },
      'roman-gaul': { visibility: 'normal', label: 'Cosedia / Constantia', affiliationTags: ['Roman'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'avranches-abrincates',
    kind: 'hillfort',
    coordinates: [-1.36, 48.68],
    regionId: 'abrincates',
    layer: 'europe',
    eraStates: {
      'iron-age-gaul': { visibility: 'emphasized', label: 'Abrincae (Abrincates)', affiliationTags: ['Abrincates', 'capital'], pedagogyIndex: 5 },
      'roman-gaul': { visibility: 'normal', label: 'Abrincae / Avranches', affiliationTags: ['Roman'], pedagogyIndex: 4 },
    },
  },
  // --- Rollo arc places ---
  {
    id: 'chartres',
    kind: 'city',
    coordinates: [1.49, 48.45],
    regionId: 'frankish-core',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Chartres', affiliationTags: ['Frankish', 'besieged'], pedagogyIndex: 4 },
      'norman-origins': { visibility: 'normal', label: 'Chartres', affiliationTags: ['Frankish'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'saint-clair-sur-epte',
    kind: 'settlement',
    coordinates: [1.78, 49.22],
    regionId: 'lower-seine',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Saint-Clair-sur-Epte', affiliationTags: ['Frankish', 'treaty'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Saint-Clair-sur-Epte', affiliationTags: ['Normandy', 'treaty'], pedagogyIndex: 4 },
    },
  },
  // --- William the Conqueror arc places ---
  {
    id: 'falaise',
    kind: 'settlement',
    coordinates: [-0.20, 48.89],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-origins': { visibility: 'emphasized', label: 'Falaise', affiliationTags: ['Normandy', 'ducal castle'], pedagogyIndex: 5 },
      'norman-expansion': { visibility: 'normal', label: 'Falaise', affiliationTags: ['Normandy'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'val-es-dunes',
    kind: 'abstract_node',
    coordinates: [-0.30, 49.12],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-origins': { visibility: 'emphasized', label: 'Val-ès-Dunes', affiliationTags: ['Normandy', 'battle'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'saint-valery-sur-somme',
    kind: 'port',
    coordinates: [1.63, 50.19],
    regionId: 'channel-coast',
    layer: 'europe',
    eraStates: {
      'norman-origins': { visibility: 'normal', label: 'Saint-Valéry-sur-Somme', affiliationTags: ['assembly port'], pedagogyIndex: 4 },
      'norman-expansion': { visibility: 'emphasized', label: 'Saint-Valéry-sur-Somme', affiliationTags: ['Norman', 'invasion fleet'], pedagogyIndex: 5 },
    },
  },
  // --- Migration-flow origin nodes (Viking / Norman era) ---
  {
    id: 'denmark-origin',
    kind: 'abstract_node',
    coordinates: [10.5, 55.7],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Denmark', affiliationTags: ['Danish'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Denmark', affiliationTags: ['Danish'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'norway-origin',
    kind: 'abstract_node',
    coordinates: [8.0, 60.5],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Norway', affiliationTags: ['Norwegian'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Norway', affiliationTags: ['Norwegian'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'danelaw-origin',
    kind: 'abstract_node',
    coordinates: [-0.5, 53.0],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'norman-origins': { visibility: 'emphasized', label: 'Danelaw (England)', affiliationTags: ['Anglo-Scandinavian'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'cotentin-landing',
    kind: 'abstract_node',
    coordinates: [-1.62, 49.63],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'normal', label: 'Cotentin Coast', affiliationTags: ['Norwegian', 'landing'], pedagogyIndex: 4 },
      'norman-origins': { visibility: 'normal', label: 'Cotentin Coast', affiliationTags: ['Norwegian'], pedagogyIndex: 3 },
    },
  },
  // --- Celtic Sea route (hidden nodes — routing geometry only) ---
  {
    id: 'scotland-northern-approach',
    kind: 'abstract_node',
    coordinates: [-4.2, 58.35],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'hidden', label: 'Northern Scotland approach', affiliationTags: [], pedagogyIndex: 0 },
      'norman-origins': { visibility: 'hidden', label: 'Northern Scotland approach', affiliationTags: [], pedagogyIndex: 0 },
    },
  },
  {
    id: 'hebrides-node',
    kind: 'abstract_node',
    coordinates: [-6.85, 57.25],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'faded', label: 'Hebrides', affiliationTags: ['Norse-Gaelic'], pedagogyIndex: 3 },
      'norman-origins': { visibility: 'faded', label: 'Hebrides', affiliationTags: ['Norse-Gaelic'], pedagogyIndex: 2 },
    },
  },
  {
    id: 'isle-of-man-node',
    kind: 'abstract_node',
    coordinates: [-4.55, 54.32],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'faded', label: 'Isle of Man', affiliationTags: ['Norse-Gaelic'], pedagogyIndex: 3 },
      'norman-origins': { visibility: 'faded', label: 'Isle of Man', affiliationTags: ['Norse-Gaelic'], pedagogyIndex: 2 },
    },
  },
  {
    id: 'irish-sea-mid',
    kind: 'abstract_node',
    coordinates: [-5.05, 53.05],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'hidden', label: 'Irish Sea', affiliationTags: [], pedagogyIndex: 0 },
      'norman-origins': { visibility: 'hidden', label: 'Irish Sea', affiliationTags: [], pedagogyIndex: 0 },
    },
  },
  {
    id: 'celtic-sea-mid',
    kind: 'abstract_node',
    coordinates: [-6.05, 50.45],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'hidden', label: 'Celtic Sea', affiliationTags: [], pedagogyIndex: 0 },
      'norman-origins': { visibility: 'hidden', label: 'Celtic Sea', affiliationTags: [], pedagogyIndex: 0 },
    },
  },
  {
    id: 'southwest-approach',
    kind: 'abstract_node',
    coordinates: [-5.52, 50.06],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'hidden', label: 'Southwest Approaches', affiliationTags: [], pedagogyIndex: 0 },
      'norman-origins': { visibility: 'hidden', label: 'Southwest Approaches', affiliationTags: [], pedagogyIndex: 0 },
    },
  },
  {
    id: 'western-channel-node',
    kind: 'abstract_node',
    coordinates: [-3.78, 49.86],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'hidden', label: 'Western Channel', affiliationTags: [], pedagogyIndex: 0 },
      'norman-origins': { visibility: 'hidden', label: 'Western Channel', affiliationTags: [], pedagogyIndex: 0 },
    },
  },
  {
    id: 'channel-islands-node',
    kind: 'abstract_node',
    coordinates: [-2.35, 49.45],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'faded', label: 'Channel Islands', affiliationTags: ['Norse'], pedagogyIndex: 2 },
      'norman-origins': { visibility: 'normal', label: 'Channel Islands', affiliationTags: ['Normandy', 'ducal'], pedagogyIndex: 4 },
      'norman-expansion': { visibility: 'normal', label: 'Channel Islands', affiliationTags: ['Anglo-Norman', 'Crown'], pedagogyIndex: 4 },
    },
  },
  // --- Confirmed Viking-era sites (global) ---
  {
    id: 'hedeby',
    kind: 'port',
    coordinates: [9.57, 54.49],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'emphasized', label: 'Hedeby', affiliationTags: ['Danish', 'trade emporium'], pedagogyIndex: 5 },
      'viking-age': { visibility: 'emphasized', label: 'Hedeby', affiliationTags: ['Danish', 'trade emporium'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Hedeby', affiliationTags: ['Danish'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'birka',
    kind: 'port',
    coordinates: [17.55, 59.33],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'normal', label: 'Birka', affiliationTags: ['Swedish', 'trade'], pedagogyIndex: 4 },
      'viking-age': { visibility: 'emphasized', label: 'Birka', affiliationTags: ['Swedish', 'trade emporium'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Birka', affiliationTags: ['Swedish'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'lindisfarne',
    kind: 'settlement',
    coordinates: [-1.676, 55.671],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'emphasized', label: 'Lindisfarne', affiliationTags: ['793', 'Northumbria'], pedagogyIndex: 5 },
      'viking-age': { visibility: 'emphasized', label: 'Lindisfarne', affiliationTags: ['Northumbria'], pedagogyIndex: 4 },
      'norman-origins': { visibility: 'normal', label: 'Lindisfarne', affiliationTags: [], pedagogyIndex: 2 },
    },
  },
  {
    id: 'faroe-islands',
    kind: 'abstract_node',
    coordinates: [-6.91, 62.01],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'hidden', label: 'Faroe Islands', affiliationTags: [], pedagogyIndex: 0 },
      'viking-age': { visibility: 'faded', label: 'Faroe Islands', affiliationTags: ['Norse', 'stepping stone'], pedagogyIndex: 3 },
      'norman-origins': { visibility: 'faded', label: 'Faroe Islands', affiliationTags: ['Norse'], pedagogyIndex: 2 },
    },
  },
  {
    id: 'gibraltar-strait',
    kind: 'abstract_node',
    coordinates: [-5.35, 36.14],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'hidden', label: 'Strait of Gibraltar', affiliationTags: [], pedagogyIndex: 0 },
      'viking-age': { visibility: 'hidden', label: 'Strait of Gibraltar', affiliationTags: [], pedagogyIndex: 0 },
      'norman-origins': { visibility: 'hidden', label: 'Strait of Gibraltar', affiliationTags: [], pedagogyIndex: 0 },
    },
  },
  {
    id: 'seville-guadalquivir',
    kind: 'port',
    coordinates: [-5.99, 37.39],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'hidden', label: 'Seville', affiliationTags: [], pedagogyIndex: 0 },
      'viking-age': { visibility: 'emphasized', label: 'Seville (Ishbīliya)', affiliationTags: ['844 raid', 'Guadalquivir'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Seville', affiliationTags: [], pedagogyIndex: 3 },
    },
  },
  {
    id: 'western-mediterranean-node',
    kind: 'abstract_node',
    coordinates: [8.35, 40.22],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'hidden', label: 'Western Mediterranean', affiliationTags: [], pedagogyIndex: 0 },
      'norman-origins': { visibility: 'hidden', label: 'Western Mediterranean', affiliationTags: [], pedagogyIndex: 0 },
    },
  },
  {
    id: 'rome-tiber',
    kind: 'city',
    coordinates: [12.48, 41.90],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Rome', affiliationTags: ['Italian raids'], pedagogyIndex: 4 },
      'norman-origins': { visibility: 'normal', label: 'Rome', affiliationTags: [], pedagogyIndex: 3 },
    },
  },
  {
    id: 'caspian-south-trade',
    kind: 'abstract_node',
    coordinates: [49.85, 40.38],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'hidden', label: 'Caspian south', affiliationTags: [], pedagogyIndex: 0 },
      'norman-origins': { visibility: 'hidden', label: 'Caspian south', affiliationTags: [], pedagogyIndex: 0 },
    },
  },
  {
    id: 'baghdad-silver-node',
    kind: 'abstract_node',
    coordinates: [44.366, 33.312],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'hidden', label: 'Baghdad (trade sphere)', affiliationTags: [], pedagogyIndex: 0 },
      'norman-origins': { visibility: 'hidden', label: 'Baghdad (trade sphere)', affiliationTags: [], pedagogyIndex: 0 },
    },
  },
  {
    id: 'york-jorvik',
    kind: 'city',
    coordinates: [-1.08, 53.96],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Jórvík (York)', affiliationTags: ['Danelaw', 'Viking capital'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'York', affiliationTags: ['Anglo-Scandinavian'], pedagogyIndex: 4 },
      'norman-expansion': { visibility: 'emphasized', label: 'York', affiliationTags: ['Anglo-Norman', 'north', 'Harrying'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'dublin',
    kind: 'city',
    coordinates: [-6.26, 53.35],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Dublin (Dyflinn)', affiliationTags: ['Norse-Gaelic', 'longphort'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Dublin', affiliationTags: ['Norse-Gaelic'], pedagogyIndex: 4 },
      'norman-expansion': { visibility: 'normal', label: 'Dublin', affiliationTags: ['Anglo-Norman'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'orkney',
    kind: 'settlement',
    coordinates: [-3.0, 58.98],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Orkney', affiliationTags: ['Norwegian', 'jarldom'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Orkney', affiliationTags: ['Norwegian'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'novgorod',
    kind: 'city',
    coordinates: [31.28, 58.52],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Novgorod (Holmgarðr)', affiliationTags: ['Varangian', 'Rus'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Novgorod', affiliationTags: ['Kievan Rus'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'kiev',
    kind: 'city',
    coordinates: [30.52, 50.45],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Kiev (Kœnugarðr)', affiliationTags: ['Varangian', 'Rus'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Kiev', affiliationTags: ['Kievan Rus'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'constantinople',
    kind: 'city',
    coordinates: [28.98, 41.01],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Constantinople (Miklagarðr)', affiliationTags: ['Byzantine', 'Varangian Guard'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'Constantinople', affiliationTags: ['Byzantine'], pedagogyIndex: 4 },
      'norman-expansion': { visibility: 'emphasized', label: 'Constantinople', affiliationTags: ['Byzantine', 'Crusader', 'oaths'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'iceland',
    kind: 'settlement',
    coordinates: [-21.93, 64.15],
    regionId: 'neustria',
    layer: 'atlantic',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Iceland (Reykjavík)', affiliationTags: ['Norwegian', 'settlement'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'emphasized', label: 'Iceland', affiliationTags: ['Norse'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'greenland',
    kind: 'settlement',
    coordinates: [-45.0, 61.0],
    regionId: 'neustria',
    layer: 'atlantic',
    eraStates: {
      'norman-origins': { visibility: 'emphasized', label: 'Greenland (Brattahlíð)', affiliationTags: ['Norse', 'settlement'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'vinland',
    kind: 'settlement',
    coordinates: [-55.53, 51.59],
    regionId: 'neustria',
    layer: 'atlantic',
    eraStates: {
      'norman-origins': { visibility: 'emphasized', label: "L'Anse aux Meadows (Vinland)", affiliationTags: ['Norse', 'exploration'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'vestfold',
    kind: 'settlement',
    coordinates: [10.4, 59.27],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'emphasized', label: 'Vestfold', affiliationTags: ['Norwegian', 'royal centre'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'trondheim',
    kind: 'city',
    coordinates: [10.4, 63.43],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'normal', label: 'Trondheim (Nidaros)', affiliationTags: ['Norwegian'], pedagogyIndex: 4 },
      'norman-origins': { visibility: 'normal', label: 'Trondheim', affiliationTags: ['Norwegian'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'staraya-ladoga',
    kind: 'settlement',
    coordinates: [32.30, 59.99],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'normal', label: 'Staraya Ladoga (Aldeigjuborg)', affiliationTags: ['Varangian', 'trade'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'bulgar-on-volga',
    kind: 'port',
    coordinates: [49.05, 54.98],
    regionId: 'neustria',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'normal', label: 'Bulgar (Volga trade)', affiliationTags: ['Varangian', 'trade terminus'], pedagogyIndex: 4 },
    },
  },
  // --- Interior North American waypoints (exploration era) ---
  {
    id: 'tadoussac',
    kind: 'settlement',
    coordinates: [-69.72, 48.15],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'new-france-foundations': { visibility: 'normal', label: 'Tadoussac', affiliationTags: ['fur trade', 'New France'], pedagogyIndex: 4 },
      'royal-new-france': { visibility: 'faded', label: 'Tadoussac', affiliationTags: ['New France'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'great-lakes-hub',
    kind: 'abstract_node',
    coordinates: [-82.0, 44.5],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'emphasized', label: 'Great Lakes', affiliationTags: ['exploration', 'New France'], pedagogyIndex: 5 },
      'atlantic-imprint': { visibility: 'normal', label: 'Great Lakes', affiliationTags: ['New France'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'sault-ste-marie',
    kind: 'settlement',
    coordinates: [-84.35, 46.50],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Sault Ste. Marie', affiliationTags: ['mission', 'fur trade'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'fort-detroit',
    kind: 'fort',
    coordinates: [-83.04, 42.33],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Fort Détroit', affiliationTags: ['New France', 'fort'], pedagogyIndex: 4 },
      'atlantic-imprint': { visibility: 'normal', label: 'Fort Détroit', affiliationTags: ['New France'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'mississippi-confluence',
    kind: 'abstract_node',
    coordinates: [-90.18, 38.63],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Mississippi Confluence', affiliationTags: ['exploration'], pedagogyIndex: 4 },
      'atlantic-imprint': { visibility: 'faded', label: 'Mississippi Confluence', affiliationTags: ['New France'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'gulf-of-mexico-node',
    kind: 'abstract_node',
    coordinates: [-89.5, 29.5],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Gulf of Mexico', affiliationTags: ['exploration', 'Louisiana'], pedagogyIndex: 4 },
      'atlantic-imprint': { visibility: 'faded', label: 'Gulf of Mexico', affiliationTags: ['Louisiana'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'new-orleans',
    kind: 'settlement',
    coordinates: [-90.07, 29.95],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'atlantic-imprint': { visibility: 'emphasized', label: 'New Orleans', affiliationTags: ['Louisiana', 'New France'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'green-bay',
    kind: 'settlement',
    coordinates: [-88.01, 44.51],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Green Bay (Baie des Puants)', affiliationTags: ['mission', 'fur trade'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'michilimackinac',
    kind: 'fort',
    coordinates: [-84.73, 45.78],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'emphasized', label: 'Michilimackinac', affiliationTags: ['fur trade', 'New France', 'mission'], pedagogyIndex: 5 },
      'atlantic-imprint': { visibility: 'normal', label: 'Michilimackinac', affiliationTags: ['New France'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'lake-huron-node',
    kind: 'abstract_node',
    coordinates: [-81.0, 45.0],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'new-france-foundations': { visibility: 'faded', label: 'Lake Huron', affiliationTags: ['exploration'], pedagogyIndex: 3 },
      'royal-new-france': { visibility: 'normal', label: 'Lake Huron', affiliationTags: ['exploration'], pedagogyIndex: 4 },
    },
  },
  // --- Norman Expansion anchor nodes ---
  {
    id: 'hastings',
    kind: 'abstract_node',
    coordinates: [0.57, 50.86],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-origins': { visibility: 'normal', label: 'Hastings', affiliationTags: ['Saxon', 'target'], pedagogyIndex: 4 },
      'norman-expansion': { visibility: 'emphasized', label: 'Hastings', affiliationTags: ['Norman', 'battle'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'london',
    kind: 'city',
    coordinates: [-0.13, 51.51],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'faded', label: 'London (Lundenwic)', affiliationTags: ['wic'], pedagogyIndex: 3 },
      'viking-age': { visibility: 'emphasized', label: 'London', affiliationTags: ['wintering', 'Thames'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'normal', label: 'London', affiliationTags: ['England'], pedagogyIndex: 4 },
      'norman-expansion': { visibility: 'emphasized', label: 'London', affiliationTags: ['Norman England', 'capital'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'palermo',
    kind: 'city',
    coordinates: [13.36, 38.12],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'faded', label: 'Palermo', affiliationTags: ['Mediterranean raids'], pedagogyIndex: 3 },
      'norman-origins': { visibility: 'faded', label: 'Palermo', affiliationTags: ['Italy'], pedagogyIndex: 2 },
      'norman-expansion': { visibility: 'emphasized', label: 'Palermo', affiliationTags: ['Kingdom of Sicily'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'antioch',
    kind: 'abstract_node',
    coordinates: [36.15, 36.20],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Antioch', affiliationTags: ['Crusader', 'Norman'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'bari',
    kind: 'city',
    coordinates: [16.87, 41.12],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Bari', affiliationTags: ['Norman Italy'], pedagogyIndex: 4 },
    },
  },
  // --- Bohemond arc places ---
  {
    id: 'taranto',
    kind: 'port',
    coordinates: [17.24, 40.47],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Taranto', affiliationTags: ['Norman Italy', 'principality'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'nicaea',
    kind: 'city',
    coordinates: [29.72, 40.43],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Nicaea', affiliationTags: ['Byzantine', 'Crusader siege'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'dorylaeum',
    kind: 'abstract_node',
    coordinates: [30.52, 39.78],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Dorylaeum', affiliationTags: ['battle', 'Crusader'], pedagogyIndex: 5 },
    },
  },
  // --- Crusade Levant / Cyprus places ---
  {
    id: 'jerusalem',
    kind: 'city',
    coordinates: [35.23, 31.78],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Jerusalem', affiliationTags: ['Crusader', 'Kingdom of Jerusalem'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'edessa',
    kind: 'city',
    coordinates: [38.79, 37.17],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Edessa', affiliationTags: ['Crusader', 'Armenian', 'county'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'tiberias',
    kind: 'city',
    coordinates: [35.53, 32.79],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Tiberias (Galilee)', affiliationTags: ['Crusader', 'Norman', 'Galilee'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'limassol',
    kind: 'port',
    coordinates: [33.04, 34.68],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Limassol (Cyprus)', affiliationTags: ['Third Crusade', 'Angevin', 'Cyprus'], pedagogyIndex: 4 },
    },
  },
  // --- Robert Guiscard arc places ---
  {
    id: 'aversa',
    kind: 'settlement',
    coordinates: [14.21, 40.97],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Aversa', affiliationTags: ['Norman Italy', 'first county'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'salerno',
    kind: 'city',
    coordinates: [14.77, 40.68],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Salerno', affiliationTags: ['Norman Italy', 'capital'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'durazzo',
    kind: 'port',
    coordinates: [19.45, 41.32],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Durazzo (Dyrrachium)', affiliationTags: ['Byzantine', 'Norman battle'], pedagogyIndex: 5 },
    },
  },
  // --- Roger II arc places ---
  {
    id: 'messina',
    kind: 'port',
    coordinates: [15.55, 38.19],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Messina', affiliationTags: ['Norman Italy', 'port'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'melfi',
    kind: 'settlement',
    coordinates: [15.53, 40.99],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Melfi', affiliationTags: ['Norman Italy', 'council'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'cefalu',
    kind: 'settlement',
    coordinates: [14.02, 38.04],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Cefalù', affiliationTags: ['Kingdom of Sicily', 'cathedral'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'mahdia',
    kind: 'port',
    coordinates: [11.06, 35.50],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'faded', label: 'Mahdia', affiliationTags: ['Ifriqiya', 'Mediterranean'], pedagogyIndex: 3 },
      'norman-origins': { visibility: 'faded', label: 'Mahdia', affiliationTags: ['North Africa'], pedagogyIndex: 2 },
      'norman-expansion': { visibility: 'normal', label: 'Mahdia', affiliationTags: ['Kingdom of Africa', 'Norman'], pedagogyIndex: 4 },
    },
  },
  // --- Additional Norman / French Atlantic ports ---
  {
    id: 'le-havre',
    kind: 'port',
    coordinates: [0.11, 49.49],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', label: 'Le Havre', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 4 },
      'new-france-foundations': { visibility: 'normal', label: 'Le Havre', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 3 },
      'royal-new-france': { visibility: 'normal', label: 'Le Havre', affiliationTags: ['France', 'Atlantic port'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'barfleur',
    kind: 'port',
    coordinates: [-1.26, 49.67],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-origins': { visibility: 'normal', label: 'Barfleur', affiliationTags: ['Normandy', 'port'], pedagogyIndex: 4 },
      'norman-expansion': { visibility: 'emphasized', label: 'Barfleur', affiliationTags: ['Normandy', 'invasion port'], pedagogyIndex: 5 },
    },
  },
  // --- Additional Acadia / Louisiana settlements ---
  {
    id: 'fort-frontenac',
    kind: 'fort',
    coordinates: [-76.48, 44.23],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Fort Frontenac', affiliationTags: ['New France', 'fort', 'La Salle'], pedagogyIndex: 4 },
      'atlantic-imprint': { visibility: 'faded', label: 'Fort Frontenac', affiliationTags: ['New France'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'chateau-richer',
    kind: 'settlement',
    coordinates: [-71.03, 46.96],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'new-france-foundations': { visibility: 'normal', label: 'Château-Richer', affiliationTags: ['New France', 'Beaupré coast'], pedagogyIndex: 4 },
      'royal-new-france': { visibility: 'normal', label: 'Château-Richer', affiliationTags: ['New France'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'ile-dorleans',
    kind: 'settlement',
    coordinates: [-70.95, 46.90],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'new-france-foundations': { visibility: 'normal', label: "Île d'Orléans", affiliationTags: ['New France', 'seigneury'], pedagogyIndex: 4 },
      'royal-new-france': { visibility: 'normal', label: "Île d'Orléans", affiliationTags: ['New France'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'mobile',
    kind: 'fort',
    coordinates: [-88.04, 30.69],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Fort Louis de la Mobile', affiliationTags: ['Louisiana', 'New France'], pedagogyIndex: 4 },
      'atlantic-imprint': { visibility: 'normal', label: 'Mobile', affiliationTags: ['Louisiana'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'fort-niagara',
    kind: 'fort',
    coordinates: [-79.06, 43.26],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Fort Niagara', affiliationTags: ['New France', 'fort'], pedagogyIndex: 4 },
      'atlantic-imprint': { visibility: 'normal', label: 'Fort Niagara', affiliationTags: ['New France'], pedagogyIndex: 4 },
    },
  },
  // --- Cartier-era waypoints ---
  {
    id: 'gaspe-peninsula',
    kind: 'abstract_node',
    coordinates: [-64.48, 48.83],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', label: 'Gaspé', affiliationTags: ['Cartier landfall', 'Mi\'kmaq territory'], pedagogyIndex: 4 },
      'new-france-foundations': { visibility: 'faded', label: 'Gaspé', affiliationTags: ['Gulf of St. Lawrence'], pedagogyIndex: 3 },
    },
  },
  // --- Verrazzano-era waypoints ---
  {
    id: 'atlantic-coast-carolina',
    kind: 'abstract_node',
    coordinates: [-78.0, 34.0],
    regionId: 'atlantic-basin',
    layer: 'americas',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', label: 'Cape Fear Coast', affiliationTags: ['Verrazzano landfall'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'new-york-harbor',
    kind: 'abstract_node',
    coordinates: [-74.0, 40.7],
    regionId: 'atlantic-basin',
    layer: 'americas',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', label: 'Angoulême (New York)', affiliationTags: ['Verrazzano', 'Atlantic coast'], pedagogyIndex: 4 },
    },
  },
  // --- Couture-era waypoints ---
  {
    id: 'mohawk-territory',
    kind: 'abstract_node',
    coordinates: [-74.0, 42.9],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'new-france-foundations': { visibility: 'normal', label: 'Mohawk Territory', affiliationTags: ['Iroquois Confederacy'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'lake-mistassini',
    kind: 'abstract_node',
    coordinates: [-73.8, 50.8],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'new-france-foundations': { visibility: 'normal', label: 'Lake Mistassini', affiliationTags: ['Cree territory', 'northern exploration'], pedagogyIndex: 4 },
    },
  },
  // --- Hennepin-era waypoints ---
  {
    id: 'fort-crevecoeur',
    kind: 'fort',
    coordinates: [-89.6, 40.7],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Fort Crèvecoeur', affiliationTags: ['La Salle', 'New France'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'falls-st-anthony',
    kind: 'abstract_node',
    coordinates: [-93.26, 44.98],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Falls of St. Anthony', affiliationTags: ['Hennepin', 'upper Mississippi'], pedagogyIndex: 4 },
    },
  },
  // --- d'Iberville-era waypoints ---
  {
    id: 'biloxi',
    kind: 'fort',
    coordinates: [-88.89, 30.40],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'royal-new-france': { visibility: 'normal', label: 'Fort Maurepas (Biloxi)', affiliationTags: ['Louisiana', 'd\'Iberville'], pedagogyIndex: 4 },
    },
  },
  // --- La Vérendrye-era waypoints ---
  {
    id: 'lake-winnipeg',
    kind: 'abstract_node',
    coordinates: [-96.8, 52.0],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'atlantic-imprint': { visibility: 'normal', label: 'Lake Winnipeg', affiliationTags: ['La Vérendrye', 'western exploration'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'mandan-country',
    kind: 'abstract_node',
    coordinates: [-101.0, 47.3],
    regionId: 'new-france',
    layer: 'americas',
    eraStates: {
      'atlantic-imprint': { visibility: 'normal', label: 'Mandan Country', affiliationTags: ['La Vérendrye', 'upper Missouri'], pedagogyIndex: 4 },
    },
  },
  // --- Viking expansion: Frisian coast, White Sea, Channel mesh ---
  {
    id: 'dorestad',
    kind: 'trading_post',
    coordinates: [5.34, 51.97],
    regionId: 'frankish-empire',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'emphasized', label: 'Dorestad', affiliationTags: ['Carolingian', 'Frisian'], pedagogyIndex: 2 },
      'viking-age': { visibility: 'normal', label: 'Dorestad (raided)', affiliationTags: ['raided', 'Frisian'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'utrecht',
    kind: 'city',
    coordinates: [5.12, 52.09],
    regionId: 'frankish-empire',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'normal', label: 'Utrecht', affiliationTags: ['Carolingian', 'Frisian'], pedagogyIndex: 3 },
      'viking-age': { visibility: 'normal', label: 'Utrecht', affiliationTags: ['Frisian'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'hamburg',
    kind: 'city',
    coordinates: [9.99, 53.55],
    regionId: 'frankish-empire',
    layer: 'europe',
    eraStates: {
      'frankish-carolingian': { visibility: 'normal', label: 'Hamburg', affiliationTags: ['Carolingian', 'Saxon'], pedagogyIndex: 3 },
      'viking-age': { visibility: 'normal', label: 'Hamburg', affiliationTags: ['raided', 'Saxon'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'white-sea-node',
    kind: 'abstract_node',
    coordinates: [38.0, 65.5],
    regionId: 'scandinavian-homeland',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'faded', label: 'White Sea / Bjarmaland', affiliationTags: ['Norse exploration', 'fur trade'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'south-england-coast-node',
    kind: 'abstract_node',
    coordinates: [-1.4, 50.8],
    regionId: 'channel-coastal',
    layer: 'europe',
    eraStates: {
      'viking-age': { visibility: 'faded', label: 'South English Coast', affiliationTags: ['Anglo-Saxon'], pedagogyIndex: 5 },
      'norman-origins': { visibility: 'faded', label: 'South English Coast', affiliationTags: ['Anglo-Saxon'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'bayeux',
    kind: 'city',
    coordinates: [-0.70, 49.28],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-origins': { visibility: 'normal', label: 'Bayeux', affiliationTags: ['Norman', 'bishopric'], pedagogyIndex: 4 },
      'norman-expansion': { visibility: 'emphasized', label: 'Bayeux', affiliationTags: ['Norman', 'Tapestry'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'ely',
    kind: 'abstract_node',
    coordinates: [0.26, 52.40],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Ely', affiliationTags: ['English resistance', 'fenland'], pedagogyIndex: 4 },
    },
  },
  // --- 1066 campaign & early conquest places ---
  {
    id: 'pevensey',
    kind: 'abstract_node',
    coordinates: [0.33, 50.82],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Pevensey', affiliationTags: ['Norman', 'landing', '1066'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'stamford-bridge',
    kind: 'abstract_node',
    coordinates: [-0.92, 53.99],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Stamford Bridge', affiliationTags: ['battle', 'Norwegian defeat', '1066'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'westminster',
    kind: 'abstract_node',
    coordinates: [-0.14, 51.50],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Westminster', affiliationTags: ['coronation', 'Anglo-Norman', 'abbey'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'dover',
    kind: 'city',
    coordinates: [1.31, 51.13],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Dover', affiliationTags: ['Anglo-Norman', 'Channel crossing', 'Kent'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'durham',
    kind: 'city',
    coordinates: [-1.57, 54.78],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Durham', affiliationTags: ['Anglo-Norman', 'prince-bishopric', 'cathedral'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'exeter',
    kind: 'city',
    coordinates: [-3.53, 50.72],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Exeter', affiliationTags: ['Anglo-Norman', 'siege', 'southwest'], pedagogyIndex: 4 },
    },
  },
  // --- Anglo-Norman expansion places ---
  {
    id: 'winchester',
    kind: 'city',
    coordinates: [-1.31, 51.06],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Winchester', affiliationTags: ['Anglo-Norman', 'capital', 'treasury'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'oxford',
    kind: 'city',
    coordinates: [-1.26, 51.75],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Oxford', affiliationTags: ['Anglo-Norman', 'castle'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'lincoln',
    kind: 'city',
    coordinates: [-0.54, 53.23],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Lincoln', affiliationTags: ['Anglo-Norman', 'battle'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'canterbury',
    kind: 'city',
    coordinates: [1.08, 51.28],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Canterbury', affiliationTags: ['Anglo-Norman', 'archbishopric'], pedagogyIndex: 5 },
    },
  },
  {
    id: 'chepstow',
    kind: 'abstract_node',
    coordinates: [-2.67, 51.64],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Chepstow', affiliationTags: ['Anglo-Norman', 'marcher castle'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'cardiff',
    kind: 'city',
    coordinates: [-3.18, 51.48],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Cardiff', affiliationTags: ['Anglo-Norman', 'marcher castle'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'pembroke',
    kind: 'abstract_node',
    coordinates: [-4.95, 51.67],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Pembroke', affiliationTags: ['Anglo-Norman', 'marcher castle'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'rhuddlan',
    kind: 'abstract_node',
    coordinates: [-3.47, 53.29],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Rhuddlan', affiliationTags: ['Anglo-Norman', 'north march'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'wexford',
    kind: 'city',
    coordinates: [-6.46, 52.34],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Wexford', affiliationTags: ['Anglo-Norman', 'Ireland'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'waterford',
    kind: 'city',
    coordinates: [-7.11, 52.26],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Waterford', affiliationTags: ['Anglo-Norman', 'Ireland'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'ferns',
    kind: 'abstract_node',
    coordinates: [-6.50, 52.59],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Ferns', affiliationTags: ['Leinster', 'Ireland'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'carrickfergus',
    kind: 'city',
    coordinates: [-5.81, 54.71],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Carrickfergus', affiliationTags: ['Anglo-Norman', 'Ireland', 'Ulster'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'kilkenny',
    kind: 'city',
    coordinates: [-7.25, 52.65],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Kilkenny', affiliationTags: ['Anglo-Norman', 'Ireland'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'dundalk',
    kind: 'abstract_node',
    coordinates: [-6.40, 54.00],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Dundalk', affiliationTags: ['Anglo-Norman', 'Ireland'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'edinburgh',
    kind: 'city',
    coordinates: [-3.19, 55.95],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Edinburgh', affiliationTags: ['Scotland', 'Anglo-Norman court'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'jedburgh',
    kind: 'abstract_node',
    coordinates: [-2.55, 55.48],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Jedburgh', affiliationTags: ['Scotland', 'Anglo-Norman abbey'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'dunfermline',
    kind: 'abstract_node',
    coordinates: [-3.44, 56.07],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Dunfermline', affiliationTags: ['Scotland', 'royal burgh'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'northallerton',
    kind: 'abstract_node',
    coordinates: [-1.43, 54.34],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Northallerton', affiliationTags: ['Anglo-Norman', 'Battle of the Standard'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'northampton',
    kind: 'abstract_node',
    coordinates: [-0.90, 52.24],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Northampton', affiliationTags: ['Anglo-Norman', 'council'], pedagogyIndex: 3 },
    },
  },
  // ── Additional places for notable-figures batch ───────────────────
  {
    id: 'poitiers',
    kind: 'city',
    coordinates: [0.34, 46.58],
    regionId: 'frankish-core',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Poitiers', affiliationTags: ['Aquitaine', 'Angevin'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'le-mans',
    kind: 'city',
    coordinates: [0.20, 47.99],
    regionId: 'frankish-core',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Le Mans', affiliationTags: ['Anjou', 'Plantagenet'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'boulogne',
    kind: 'city',
    coordinates: [1.61, 50.73],
    regionId: 'frankish-core',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Boulogne', affiliationTags: ['County of Boulogne', 'ally'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'pavia',
    kind: 'city',
    coordinates: [9.16, 45.19],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'faded', label: 'Pavia', affiliationTags: ['Lombard Italy', 'scholar'], pedagogyIndex: 2 },
    },
  },
  {
    id: 'aosta',
    kind: 'city',
    coordinates: [7.32, 45.74],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'faded', label: 'Aosta', affiliationTags: ['Alpine', 'scholar'], pedagogyIndex: 2 },
    },
  },
  {
    id: 'montfort-lamaury',
    kind: 'abstract_node',
    coordinates: [1.82, 48.78],
    regionId: 'frankish-core',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'faded', label: 'Montfort-l\'Amaury', affiliationTags: ['Île-de-France', 'baronial'], pedagogyIndex: 2 },
    },
  },
  // ── Mediterranean: places aligned with norman-expansion nodes ──
  {
    id: 'naples',
    kind: 'city',
    coordinates: [14.25, 40.85],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Naples', affiliationTags: ['Norman Italy', 'Hauteville', 'duchy'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'catania',
    kind: 'city',
    coordinates: [15.09, 37.50],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Catania', affiliationTags: ['Norman Sicily', 'Hauteville', 'bishopric'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'reggio-calabria',
    kind: 'city',
    coordinates: [15.65, 38.11],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Reggio Calabria', affiliationTags: ['Norman Italy', 'strait crossing', 'Guiscard'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'monreale',
    kind: 'abstract_node',
    coordinates: [13.29, 38.08],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Monreale', affiliationTags: ['Norman Sicily', 'cathedral', 'mosaics'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'mileto',
    kind: 'abstract_node',
    coordinates: [16.07, 38.61],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Mileto', affiliationTags: ['Norman Italy', 'Roger I', 'capital'], pedagogyIndex: 3 },
    },
  },
  {
    id: 'mdina',
    kind: 'city',
    coordinates: [14.40, 35.89],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'faded', label: 'Mdina', affiliationTags: ['Malta', 'Norman outpost'], pedagogyIndex: 2 },
    },
  },
  // ── Anglo-Norman institutional places ──
  {
    id: 'clarendon',
    kind: 'abstract_node',
    coordinates: [-1.76, 51.05],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'normal', label: 'Clarendon', affiliationTags: ['Anglo-Norman', 'royal palace', 'assize'], pedagogyIndex: 4 },
    },
  },
  {
    id: 'runnymede',
    kind: 'abstract_node',
    coordinates: [-0.56, 51.44],
    regionId: 'normandy',
    layer: 'europe',
    eraStates: {
      'norman-expansion': { visibility: 'emphasized', label: 'Runnymede', affiliationTags: ['Anglo-Norman', 'Magna Carta', 'charter'], pedagogyIndex: 5 },
    },
  },
];
