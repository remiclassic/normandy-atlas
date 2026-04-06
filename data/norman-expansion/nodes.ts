// Key Norman settlement nodes for the Norman Expansion layer (911–1204+).

import type { NormanSiteKind } from '@/types';

export interface NormanNode {
  type: 'Feature';
  properties: {
    id: string;
    name: string;
    role: string;
    date: string;
    siteKind: NormanSiteKind;
    yearStart: number;
    yearEnd: number;
  };
  geometry: { type: 'Point'; coordinates: [number, number] };
}

export interface NormanNodeCollection {
  type: 'FeatureCollection';
  features: NormanNode[];
}

export const normanNodesGeoJson: NormanNodeCollection = {
  type: 'FeatureCollection',
  features: [
    // ── Normandy (Core) ──
    {
      type: 'Feature',
      properties: { id: 'node-rouen', name: 'Rouen', role: 'Capital of Normandy', date: '911+', siteKind: 'city', yearStart: 911, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [1.0993, 49.4431] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-caen', name: 'Caen', role: 'Ducal seat, abbey center', date: '1060+', siteKind: 'city', yearStart: 1060, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-0.3707, 49.1829] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-falaise', name: 'Falaise Castle', role: 'Birthplace of William the Conqueror', date: '1027+', siteKind: 'castle', yearStart: 1027, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-0.1953, 48.8922] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-bayeux', name: 'Bayeux', role: 'Cathedral city, tapestry site', date: '911+', siteKind: 'city', yearStart: 911, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-0.7025, 49.2768] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-mont-saint-michel', name: 'Mont-Saint-Michel', role: 'Fortified abbey on the frontier', date: '966+', siteKind: 'monastery', yearStart: 966, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-1.5115, 48.6360] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-avranches', name: 'Avranches', role: 'Border stronghold, episcopal see', date: '933+', siteKind: 'city', yearStart: 933, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-1.3566, 48.6862] },
    },

    // ── England ──
    {
      type: 'Feature',
      properties: { id: 'node-london', name: 'London (Tower)', role: 'Capital of Norman England', date: '1066+', siteKind: 'castle', yearStart: 1066, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-0.0759, 51.5081] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-hastings', name: 'Hastings', role: 'Battle site, 1066', date: '1066', siteKind: 'battlefield', yearStart: 1066, yearEnd: 1066 },
      geometry: { type: 'Point', coordinates: [0.5730, 50.8573] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-windsor', name: 'Windsor Castle', role: 'Royal residence', date: '1070+', siteKind: 'castle', yearStart: 1070, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-0.6044, 51.4839] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-dover', name: 'Dover Castle', role: 'Strategic coastal fortress', date: '1066+', siteKind: 'castle', yearStart: 1066, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [1.3210, 51.1290] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-york', name: 'York', role: 'Northern administrative center', date: '1068+', siteKind: 'city', yearStart: 1068, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-1.0815, 53.9590] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-durham', name: 'Durham Castle', role: 'Prince-Bishops stronghold', date: '1072+', siteKind: 'castle', yearStart: 1072, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-1.5750, 54.7730] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-norwich', name: 'Norwich Castle', role: 'East Anglian administrative seat', date: '1067+', siteKind: 'castle', yearStart: 1067, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [1.2946, 52.6285] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-warwick', name: 'Warwick Castle', role: 'Midlands stronghold', date: '1068+', siteKind: 'castle', yearStart: 1068, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-1.5849, 52.2792] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-lincoln', name: 'Lincoln Castle', role: 'Strategic hilltop fortress', date: '1068+', siteKind: 'castle', yearStart: 1068, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-0.5402, 53.2347] },
    },

    // ── Wales & Scotland ──
    {
      type: 'Feature',
      properties: { id: 'node-chepstow', name: 'Chepstow Castle', role: 'First Norman stone castle in Wales', date: '1067+', siteKind: 'castle', yearStart: 1067, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-2.6743, 51.6423] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-cardiff', name: 'Cardiff Castle', role: 'Welsh Marcher stronghold', date: '1081+', siteKind: 'castle', yearStart: 1081, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-3.1810, 51.4821] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-pembroke', name: 'Pembroke Castle', role: 'Gateway to Ireland', date: '1093+', siteKind: 'castle', yearStart: 1093, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-4.9184, 51.6742] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-edinburgh', name: 'Edinburgh', role: 'Norman feudal influence in Scotland', date: '1093+', siteKind: 'city', yearStart: 1093, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-3.1883, 55.9486] },
    },

    // ── Ireland ──
    {
      type: 'Feature',
      properties: { id: 'node-dublin', name: 'Dublin', role: 'Anglo-Norman foothold in Ireland', date: '1170+', siteKind: 'city', yearStart: 1170, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-6.2603, 53.3498] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-trim', name: 'Trim Castle', role: 'Largest Anglo-Norman castle in Ireland', date: '1172+', siteKind: 'castle', yearStart: 1172, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-6.7893, 53.5551] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-wexford', name: 'Wexford', role: 'Early Anglo-Norman landing site', date: '1169+', siteKind: 'port', yearStart: 1169, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-6.4575, 52.3361] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-waterford', name: 'Waterford', role: 'Strongbow capture, key port', date: '1170+', siteKind: 'port', yearStart: 1170, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-7.1101, 52.2593] },
    },

    // ── Italy & Sicily ──
    {
      type: 'Feature',
      properties: { id: 'node-palermo', name: 'Palermo', role: 'Capital of Norman Sicily', date: '1072+', siteKind: 'city', yearStart: 1072, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [13.3615, 38.1157] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-melfi', name: 'Melfi', role: 'Early Norman capital in Italy', date: '1043+', siteKind: 'castle', yearStart: 1043, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [15.6530, 40.9950] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-bari', name: 'Bari', role: 'Apulian port, Norman conquest', date: '1071+', siteKind: 'port', yearStart: 1071, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [16.8719, 41.1171] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-salerno', name: 'Salerno', role: 'Principality, early Norman base', date: '1077+', siteKind: 'city', yearStart: 1077, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [14.7681, 40.6824] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-messina', name: 'Messina', role: 'Sicilian port, invasion staging', date: '1061+', siteKind: 'port', yearStart: 1061, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [15.5540, 38.1938] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-naples', name: 'Naples', role: 'Southern Italian stronghold', date: '1140+', siteKind: 'city', yearStart: 1140, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [14.2681, 40.8518] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-catania', name: 'Catania', role: 'Sicilian episcopal city', date: '1071+', siteKind: 'city', yearStart: 1071, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [15.0870, 37.5024] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-reggio-calabria', name: 'Reggio Calabria', role: 'Toe of Italy, staging for Sicily', date: '1060+', siteKind: 'city', yearStart: 1060, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [15.6493, 38.1147] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-aversa', name: 'Aversa', role: 'First Norman county in Italy', date: '1030+', siteKind: 'city', yearStart: 1030, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [14.2069, 40.9730] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-cefalu', name: 'Cefalù', role: 'Norman cathedral city', date: '1131+', siteKind: 'city', yearStart: 1131, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [14.0234, 38.0397] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-monreale', name: 'Monreale', role: 'Royal abbey and cathedral', date: '1174+', siteKind: 'monastery', yearStart: 1174, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [13.2914, 38.0819] },
    },

    // ── Crusader States ──
    {
      type: 'Feature',
      properties: { id: 'node-antioch', name: 'Antioch', role: 'Norman-led Crusader principality', date: '1098+', siteKind: 'crusader', yearStart: 1098, yearEnd: 1268 },
      geometry: { type: 'Point', coordinates: [36.1500, 36.2000] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-tripoli', name: 'Tripoli', role: 'Crusader county with Norman ties', date: '1109+', siteKind: 'crusader', yearStart: 1109, yearEnd: 1289 },
      geometry: { type: 'Point', coordinates: [35.8333, 34.4333] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-edessa', name: 'Edessa', role: 'First Crusader state', date: '1098+', siteKind: 'crusader', yearStart: 1098, yearEnd: 1144 },
      geometry: { type: 'Point', coordinates: [38.7955, 37.1591] },
    },

    // ── Other expansion ──
    {
      type: 'Feature',
      properties: { id: 'node-tunis', name: 'Tunis', role: 'Norman Ifriqiya coastal holding', date: '1148', siteKind: 'city', yearStart: 1148, yearEnd: 1160 },
      geometry: { type: 'Point', coordinates: [10.1658, 36.8065] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-dyrrachium', name: 'Dyrrachium', role: 'Battle site, Byzantine frontier', date: '1081', siteKind: 'battlefield', yearStart: 1081, yearEnd: 1081 },
      geometry: { type: 'Point', coordinates: [19.4514, 41.3246] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-lisbon', name: 'Lisbon', role: 'Norman participation in siege', date: '1147', siteKind: 'city', yearStart: 1147, yearEnd: 1147 },
      geometry: { type: 'Point', coordinates: [-9.1393, 38.7223] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-tarragona', name: 'Tarragona', role: 'Norman Reconquista involvement', date: '1129', siteKind: 'city', yearStart: 1129, yearEnd: 1129 },
      geometry: { type: 'Point', coordinates: [1.2445, 41.1189] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-limassol', name: 'Limassol', role: 'Richard I conquest of Cyprus', date: '1191', siteKind: 'port', yearStart: 1191, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [33.0420, 34.6841] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-mahdia', name: 'Mahdia', role: 'Norman conquest in Ifriqiya', date: '1148', siteKind: 'port', yearStart: 1148, yearEnd: 1160 },
      geometry: { type: 'Point', coordinates: [11.0622, 35.5047] },
    },

    // ── Norman Castles — England ──
    {
      type: 'Feature',
      properties: { id: 'node-colchester-castle', name: 'Colchester Castle', role: 'Largest Norman keep in England, built over a Roman temple', date: '1069+', siteKind: 'castle', yearStart: 1069, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [0.9030, 51.8906] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-rochester-castle', name: 'Rochester Castle', role: 'Tallest Norman keep in England at 113 feet', date: '1087+', siteKind: 'castle', yearStart: 1087, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [0.5015, 51.3900] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-arundel-castle', name: 'Arundel Castle', role: 'Major motte-and-bailey on a towering mound', date: '1068+', siteKind: 'castle', yearStart: 1068, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-0.5534, 50.8558] },
    },

    // ── Norman Castles — France ──
    {
      type: 'Feature',
      properties: { id: 'node-chateau-gaillard', name: 'Château Gaillard', role: 'Richard the Lionheart\'s fortress defending the Seine valley', date: '1196+', siteKind: 'castle', yearStart: 1196, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [1.4025, 49.2380] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-gisors', name: 'Gisors Castle', role: 'Major frontier fortress with motte-and-bailey core', date: '1097+', siteKind: 'castle', yearStart: 1097, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [1.7730, 49.2799] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-pirou', name: 'Château de Pirou', role: 'Well-preserved 12th-century castle with triple moats', date: '1135+', siteKind: 'castle', yearStart: 1135, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-1.5736, 49.1614] },
    },

    // ── Norman Castles — Italy & Sicily ──
    {
      type: 'Feature',
      properties: { id: 'node-palazzo-normanni', name: 'Palazzo dei Normanni', role: 'Norman seat of power in Sicily, adapted from an Arab palace', date: '1072+', siteKind: 'castle', yearStart: 1072, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [13.3531, 38.1108] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-caccamo-castle', name: 'Caccamo Castle', role: 'One of the largest Norman castles in Italy, perched on a cliff', date: '1094+', siteKind: 'castle', yearStart: 1094, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [13.6601, 37.9318] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-aci-castello', name: 'Aci Castello', role: 'Lava-stone fortress on a rocky outcrop above the sea', date: '1076+', siteKind: 'castle', yearStart: 1076, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [15.1498, 37.5543] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-erice-castle-of-venus', name: 'Castle of Venus, Erice', role: 'Norman fortification on the site of an ancient sacred complex', date: '1100+', siteKind: 'castle', yearStart: 1100, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [12.5922, 38.0354] },
    },

    // ── Norman Castles — Ireland ──
    {
      type: 'Feature',
      properties: { id: 'node-carrickfergus-castle', name: 'Carrickfergus Castle', role: 'Best-preserved Norman castle on the island of Ireland', date: '1177+', siteKind: 'castle', yearStart: 1177, yearEnd: 1204 },
      geometry: { type: 'Point', coordinates: [-5.8065, 54.7134] },
    },

    // ── Norman-linked Crusader Castles — Levant ──
    {
      type: 'Feature',
      properties: { id: 'node-krak-des-chevaliers', name: 'Krak des Chevaliers', role: 'One of the most famous Crusader castles in the world', date: '1099+', siteKind: 'castle', yearStart: 1099, yearEnd: 1271 },
      geometry: { type: 'Point', coordinates: [36.2948, 34.7571] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-sahyun-saladin-castle', name: 'Saône / Saladin Citadel', role: 'Byzantine site transformed under Crusader rule with Norman-style keep', date: '1108+', siteKind: 'castle', yearStart: 1108, yearEnd: 1188 },
      geometry: { type: 'Point', coordinates: [36.0553, 35.5950] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-margat-marqab', name: 'Marqab Castle', role: 'Major fortress within the Principality of Antioch', date: '1118+', siteKind: 'castle', yearStart: 1118, yearEnd: 1285 },
      geometry: { type: 'Point', coordinates: [35.9496, 35.1510] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-safita-chastel-blanc', name: 'Chastel Blanc / Safita', role: 'Rectangular keep closely resembling classic Norman tower design', date: '1112+', siteKind: 'castle', yearStart: 1112, yearEnd: 1271 },
      geometry: { type: 'Point', coordinates: [36.1167, 34.8207] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-bagras-gaston', name: 'Bagras / Gaston', role: 'Strategic mountain fortress controlling the Belen Pass', date: '1153+', siteKind: 'castle', yearStart: 1153, yearEnd: 1268 },
      geometry: { type: 'Point', coordinates: [36.2249, 36.4269] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-anavarza', name: 'Anavarza', role: 'Ancient site strengthened by Crusaders with heavy stone defenses', date: '1100+', siteKind: 'castle', yearStart: 1100, yearEnd: 1375 },
      geometry: { type: 'Point', coordinates: [35.9018, 37.2523] },
    },
    {
      type: 'Feature',
      properties: { id: 'node-kerak', name: 'Kerak Castle', role: 'Crusader fortress reflecting Norman and Frankish military traditions', date: '1142+', siteKind: 'castle', yearStart: 1142, yearEnd: 1189 },
      geometry: { type: 'Point', coordinates: [35.7016, 31.1806] },
    },

    // ── Norman Malta ──
    {
      type: 'Feature',
      properties: { id: 'node-mdina-norman', name: 'Mdina', role: 'Norman-era fortified city; Palazz ta\' Santa Sofia and Palazzo Falson survive', date: '1091+', siteKind: 'fortress', yearStart: 1091, yearEnd: 1194 },
      geometry: { type: 'Point', coordinates: [14.4025, 35.8859] },
    },
  ],
};

/** Center [lng, lat] for a Norman Expansion node id, if it exists. */
export function getNormanNodeCenter(nodeId: string): [number, number] | undefined {
  const f = normanNodesGeoJson.features.find((x) => x.properties.id === nodeId);
  if (!f?.geometry || f.geometry.type !== 'Point') return undefined;
  return f.geometry.coordinates as [number, number];
}
