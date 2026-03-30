// Rich content for Norman expansion node detail panels.
// Keyed by the same id used in nodes.ts GeoJSON properties.

export interface NormanSiteTimelineEntry {
  year: number;
  text: string;
}

export interface NormanSiteArticle {
  id: string;
  overview: string;
  significance?: string[];
  architecture?: string[];
  timeline?: NormanSiteTimelineEntry[];
  sources?: string[];
}

const articles: NormanSiteArticle[] = [
  // ── Normandy (Core) ──
  {
    id: 'node-rouen',
    overview:
      'Rouen served as the capital of the Duchy of Normandy from its founding by Rollo in 911. As the political and ecclesiastical heart of the duchy, it housed the ducal palace and the metropolitan archbishopric that crowned Norman identity. The city remained the administrative center throughout the dynasty\'s continental rule.',
    significance: ['Ducal capital since 911', 'Seat of the Archbishop of Normandy', 'Commercial hub on the Seine'],
    architecture: ['Romanesque cathedral (rebuilt Gothic after 1200)', 'Ducal palace complex', 'City walls and river quays'],
    timeline: [
      { year: 911, text: 'Treaty of Saint-Clair-sur-Epte grants Rollo the city' },
      { year: 1030, text: 'Robert the Magnificent rebuilds cathedral' },
      { year: 1066, text: 'William musters invasion fleet from Normandy' },
      { year: 1204, text: 'Philip II of France captures the city' },
    ],
    sources: ['David Bates, "Normandy Before 1066" (1982)', 'Lucien Musset, "Les peuples scandinaves" (1951)'],
  },
  {
    id: 'node-caen',
    overview:
      'William the Conqueror transformed Caen into his preferred residence and administrative center, founding twin abbeys — the Abbaye-aux-Hommes and Abbaye-aux-Dames — as penance for his marriage to Matilda of Flanders. The massive castle he built dominates the city to this day and is one of the largest medieval enclosures in Europe.',
    significance: ['William\'s favored seat of power', 'Twin abbeys as dynastic monuments', 'Key garrison controlling lower Normandy'],
    architecture: ['Caen Castle (stone keep and curtain wall)', 'Abbaye-aux-Hommes (Saint-Étienne)', 'Abbaye-aux-Dames (La Trinité)'],
    timeline: [
      { year: 1060, text: 'Castle construction begins under William' },
      { year: 1066, text: 'Abbey of Saint-Étienne consecrated' },
      { year: 1087, text: 'William buried at Saint-Étienne' },
    ],
    sources: ['David C. Douglas, "William the Conqueror" (1964)'],
  },
  {
    id: 'node-falaise',
    overview:
      'Falaise Castle is the legendary birthplace of William the Conqueror, where his father Duke Robert I is said to have seen Herleva. The massive stone keep, expanded by Henry I and later Henry II Plantagenet, remains one of the best-preserved Norman castles in France.',
    significance: ['Birthplace of William the Conqueror', 'Ducal dynastic seat', 'Symbol of Norman ducal authority'],
    architecture: ['Grand rectangular keep', 'Talbot tower (13th century)', 'Defensive enceinte'],
    timeline: [
      { year: 1028, text: 'William born at Falaise' },
      { year: 1123, text: 'Henry I rebuilds the keep in stone' },
    ],
    sources: ['Joseph Decaëns, "Le château de Falaise" (2000)'],
  },
  {
    id: 'node-bayeux',
    overview:
      'Bayeux was one of the earliest Norse-settled towns in Normandy and became an important episcopal center. It is world-famous for the Bayeux Tapestry, an embroidered narrative of the Norman Conquest of England, likely commissioned by Bishop Odo, half-brother of William.',
    significance: ['Home of the Bayeux Tapestry', 'Important Norman bishopric', 'Seat of Bishop Odo'],
    timeline: [
      { year: 911, text: 'Part of the initial Viking grant' },
      { year: 1077, text: 'Bayeux Cathedral consecrated; tapestry likely displayed' },
    ],
    sources: ['Shirley Ann Brown, "The Bayeux Tapestry" (1988)'],
  },
  {
    id: 'node-mont-saint-michel',
    overview:
      'Mont-Saint-Michel is a tidal island abbey that served as a spiritual and military stronghold on the frontier between Normandy and Brittany. The Benedictine abbey, continuously expanded through the Romanesque and Gothic periods, became a major pilgrimage destination and a symbol of Norman religious patronage.',
    significance: ['Major pilgrimage site', 'Strategic frontier fortress', 'Architectural masterpiece spanning centuries'],
    architecture: ['Romanesque nave', 'Gothic "La Merveille" cloister and refectory', 'Fortified ramparts'],
    timeline: [
      { year: 966, text: 'Benedictine monastery established' },
      { year: 1023, text: 'Romanesque church construction begins' },
      { year: 1204, text: 'Breton allies of Philip II burn the mount; rebuilt in Gothic style' },
    ],
    sources: ['Henry Adams, "Mont-Saint-Michel and Chartres" (1904)'],
  },
  {
    id: 'node-avranches',
    overview:
      'Avranches was a key border stronghold controlling the frontier between Normandy and Brittany. Its episcopal see and castle made it important for both spiritual and military authority along the duchy\'s southwestern margin.',
    significance: ['Border fortress with Brittany', 'Episcopal see'],
    timeline: [
      { year: 933, text: 'Cotentin and Avranchin annexed to Normandy' },
      { year: 1172, text: 'Henry II performs penance here for Becket\'s murder' },
    ],
  },

  // ── England ──
  {
    id: 'node-london',
    overview:
      'The Tower of London was begun by William the Conqueror in 1066 to dominate London after the Conquest. The White Tower, completed around 1078, is the finest surviving example of a Norman keep in England. It served as a royal residence, treasury, and symbol of the new Norman ruling class.',
    significance: ['Supreme symbol of Norman control over England', 'Royal fortress and treasury', 'Prison and execution site in later centuries'],
    architecture: ['White Tower (Caen-stone keep)', 'Inner and outer curtain walls (expanded later)', 'Chapel of St John (Romanesque)'],
    timeline: [
      { year: 1066, text: 'William orders construction after coronation' },
      { year: 1078, text: 'White Tower largely complete' },
      { year: 1097, text: 'William Rufus adds walls and hall' },
    ],
    sources: ['R. Allen Brown, "The Tower of London" (1984)'],
  },
  {
    id: 'node-hastings',
    overview:
      'The Battle of Hastings on 14 October 1066 was the decisive engagement that placed William, Duke of Normandy, on the English throne. Harold Godwinson was killed and the Anglo-Saxon ruling class shattered. A prefabricated motte-and-bailey castle was raised on the site within days.',
    significance: ['Decisive battle of the Norman Conquest', 'End of Anglo-Saxon kingship', 'Beginning of Norman England'],
    timeline: [
      { year: 1066, text: 'Battle fought on Senlac Hill, 14 October' },
    ],
    sources: ['M. K. Lawson, "The Battle of Hastings 1066" (2003)'],
  },
  {
    id: 'node-windsor',
    overview:
      'Windsor Castle was founded by William the Conqueror shortly after 1066 as one of a ring of fortifications around London. It has been continuously occupied as a royal residence ever since, making it the longest-occupied palace in Europe.',
    significance: ['Royal residence for nearly a millennium', 'Strategic Thames-valley fortress'],
    architecture: ['Motte and bailey (original)', 'Round Tower on the motte', 'St George\'s Chapel (later)'],
    timeline: [
      { year: 1070, text: 'William founds the castle' },
      { year: 1110, text: 'Henry I establishes residence' },
    ],
    sources: ['Steven Brindle, "Windsor Castle" (2020)'],
  },
  {
    id: 'node-dover',
    overview:
      'Dover Castle guarded the shortest Channel crossing and was vital to the defense of England. William strengthened existing Anglo-Saxon fortifications after 1066, and Henry II later rebuilt it as one of the most powerful concentric castles in England.',
    significance: ['Key to England — controlled the Channel crossing', 'Strategic defense against continental invasion'],
    architecture: ['Great Tower (Henry II)', 'Roman lighthouse within the walls', 'Tunnels and outer defenses (later)'],
    timeline: [
      { year: 1066, text: 'William secures Dover after Hastings' },
      { year: 1180, text: 'Henry II begins massive stone rebuilding' },
    ],
    sources: ['R. Allen Brown, "Dover Castle" (1974)'],
  },
  {
    id: 'node-york',
    overview:
      'York was the largest city in northern England and resisted Norman rule fiercely. William built two motte-and-bailey castles here and brutally suppressed the northern rebellion of 1069–70 in the Harrying of the North, devastating the region for a generation.',
    significance: ['Key to controlling northern England', 'Scene of major Anglo-Norse resistance'],
    timeline: [
      { year: 1068, text: 'William builds first castle' },
      { year: 1069, text: 'Danish-backed revolt; William retaliates with the Harrying of the North' },
    ],
    sources: ['William E. Kapelle, "The Norman Conquest of the North" (1979)'],
  },
  {
    id: 'node-durham',
    overview:
      'Durham Castle was built in 1072 to control the route between England and Scotland. The Norman Prince-Bishops of Durham wielded near-royal powers, ruling the palatinate as a buffer zone. The castle and cathedral form one of the finest Norman architectural ensembles in England.',
    significance: ['Seat of the Prince-Bishops', 'Northern frontier fortress', 'UNESCO World Heritage Site (with cathedral)'],
    architecture: ['Norman chapel (one of the oldest in England)', 'Great hall', 'Keep and curtain wall'],
    timeline: [
      { year: 1072, text: 'Walcher, first Norman bishop, begins construction' },
      { year: 1093, text: 'Cathedral construction begins nearby' },
    ],
    sources: ['M. Bonney, "Lordship and the Urban Community: Durham and its Overlords" (1990)'],
  },
  {
    id: 'node-norwich',
    overview:
      'Norwich Castle was raised in 1067 to dominate East Anglia. The massive stone keep built under Henry I is one of the most decorated Norman secular buildings in England, with elaborate blind arcading on all facades.',
    significance: ['Administrative center of East Anglia', 'Decorated Norman keep'],
    architecture: ['Stone keep with elaborate arcading', 'Motte and bailey'],
    timeline: [
      { year: 1067, text: 'Motte-and-bailey castle raised' },
      { year: 1100, text: 'Stone keep begun under Henry I' },
    ],
  },
  {
    id: 'node-warwick',
    overview:
      'Warwick Castle was established in 1068 by William the Conqueror on a bend of the River Avon. It controlled the Midlands and became the seat of the powerful Earls of Warwick.',
    significance: ['Midlands control point', 'Seat of the Earls of Warwick'],
    timeline: [
      { year: 1068, text: 'William builds motte-and-bailey' },
    ],
  },
  {
    id: 'node-lincoln',
    overview:
      'Lincoln Castle was built on a Roman hilltop site in 1068. Unusually, it has two mottes. It housed one of only four surviving copies of Magna Carta and served as a prison into the modern era.',
    significance: ['Unusual two-motte plan', 'Housed a copy of Magna Carta'],
    timeline: [
      { year: 1068, text: 'Castle built by William' },
      { year: 1141, text: 'Battle of Lincoln during the Anarchy' },
    ],
  },

  // ── Wales & Scotland ──
  {
    id: 'node-chepstow',
    overview:
      'Chepstow Castle, begun by William FitzOsbern in 1067, was the first Norman stone castle in Wales. Perched above the River Wye, it anchored the southern end of the Welsh Marches and controlled the crossing into Wales.',
    significance: ['First stone castle in Wales', 'Anchor of the Welsh Marches', 'Built by William FitzOsbern'],
    architecture: ['Great Tower (among the oldest surviving in Britain)', 'Curtain walls along the cliff'],
    timeline: [
      { year: 1067, text: 'FitzOsbern begins building in stone' },
      { year: 1189, text: 'William Marshal expands the castle' },
    ],
    sources: ['Rick Turner, "Chepstow Castle" (2006)'],
  },
  {
    id: 'node-cardiff',
    overview:
      'Cardiff Castle was established by the Normans in 1081 within the walls of a Roman fort. It served as the principal seat of Norman lordship in Glamorgan and later became the core of the Welsh Marcher lordships.',
    significance: ['Chief Norman stronghold in south Wales', 'Built over a Roman fort'],
    timeline: [
      { year: 1081, text: 'William the Conqueror establishes the castle' },
      { year: 1091, text: 'Robert FitzHamon seizes Glamorgan' },
    ],
  },
  {
    id: 'node-pembroke',
    overview:
      'Pembroke Castle was founded in 1093 by Arnulf de Montgomery. Its massive round keep, added later, became a launch point for the Anglo-Norman invasion of Ireland. It remained a powerful Marcher fortress throughout the medieval period.',
    significance: ['Staging point for Irish invasion', 'Seat of the earldom of Pembroke'],
    architecture: ['Great round keep', 'Natural limestone cave beneath the hall'],
    timeline: [
      { year: 1093, text: 'Arnulf de Montgomery founds the castle' },
      { year: 1138, text: 'Gilbert de Clare begins stone keep' },
    ],
  },
  {
    id: 'node-edinburgh',
    overview:
      'Norman influence in Scotland came through marriage and feudal invitation rather than conquest. Queen Margaret (d. 1093) and especially her sons David I and his successors introduced Norman families and institutions, transforming Scottish governance along continental lines.',
    significance: ['Norman feudal influence via the Scottish crown', 'David I introduced Norman barons'],
    timeline: [
      { year: 1093, text: 'Margaret dies at Edinburgh; Norman influence deepens under her sons' },
      { year: 1124, text: 'David I becomes king, accelerates feudal reform' },
    ],
  },

  // ── Ireland ──
  {
    id: 'node-dublin',
    overview:
      'Anglo-Norman adventurers under Strongbow (Richard de Clare) captured Dublin in 1170, transforming the old Hiberno-Norse city into the center of English lordship in Ireland. Dublin Castle, built from 1204, became the administrative headquarters of the English colony for centuries.',
    significance: ['Center of Anglo-Norman lordship in Ireland', 'Former Viking trading town'],
    timeline: [
      { year: 1170, text: 'Strongbow captures the city' },
      { year: 1171, text: 'Henry II arrives to assert royal authority' },
      { year: 1204, text: 'Dublin Castle construction begins' },
    ],
    sources: ['Seán Duffy, "Ireland in the Middle Ages" (1997)'],
  },
  {
    id: 'node-trim',
    overview:
      'Trim Castle is the largest Anglo-Norman fortification in Ireland. Built by Hugh de Lacy from 1172, its twenty-sided keep is unique in the British Isles. The castle was a key administrative center for the Anglo-Norman Lordship of Meath.',
    significance: ['Largest Anglo-Norman castle in Ireland', 'Unique twenty-sided keep', 'Center of the Lordship of Meath'],
    architecture: ['Cruciform keep with projecting towers', 'Extensive curtain walls and barbican'],
    timeline: [
      { year: 1172, text: 'Hugh de Lacy begins construction' },
      { year: 1176, text: 'Destroyed by Rory O\'Connor; rebuilt' },
    ],
    sources: ['Tadhg O\'Keeffe, "Medieval Ireland: An Archaeology" (2001)'],
  },
  {
    id: 'node-wexford',
    overview:
      'Wexford was where the first Anglo-Norman expedition landed in Ireland in May 1169, led by Robert FitzStephen. The town was quickly taken and became a bridgehead for the wider invasion that followed.',
    significance: ['Landing site of the first Anglo-Norman expedition', 'Former Viking longphort'],
    timeline: [
      { year: 1169, text: 'Robert FitzStephen lands with the first Anglo-Norman force' },
    ],
  },
  {
    id: 'node-waterford',
    overview:
      'Waterford was captured by Strongbow in 1170 as a strategic prize. The Hiberno-Norse port city controlled the southeastern coast and its capture cemented Anglo-Norman dominance over southern Ireland.',
    significance: ['Major Hiberno-Norse port', 'Captured by Strongbow'],
    timeline: [
      { year: 1170, text: 'Strongbow seizes the city' },
    ],
  },

  // ── Italy & Sicily ──
  {
    id: 'node-palermo',
    overview:
      'Palermo became the capital of the Norman Kingdom of Sicily after its capture in 1072 by Robert Guiscard and Roger I. Under Roger II and his successors, the city became one of the most cosmopolitan in the medieval Mediterranean, blending Norman, Arab, Byzantine, and Latin cultures in art, architecture, and governance.',
    significance: ['Capital of Norman Sicily', 'Multicultural court and administration', 'Center of Mediterranean trade and diplomacy'],
    architecture: ['Palazzo dei Normanni (Royal Palace)', 'Palatine Chapel (Byzantine mosaics)', 'Cathedral of Palermo'],
    timeline: [
      { year: 1072, text: 'Robert Guiscard and Roger I capture the city' },
      { year: 1130, text: 'Roger II crowned King of Sicily' },
      { year: 1140, text: 'Palatine Chapel completed' },
      { year: 1194, text: 'Henry VI of Hohenstaufen ends Norman dynasty' },
    ],
    sources: ['John Julius Norwich, "The Kingdom in the Sun" (1970)'],
  },
  {
    id: 'node-melfi',
    overview:
      'Melfi served as the first Norman capital in southern Italy. Here, in a series of councils (1042–1059), the Norman adventurers formalized their conquests. Pope Nicholas II invested Robert Guiscard as Duke of Apulia and Calabria at Melfi in 1059, legitimizing Norman rule.',
    significance: ['First Norman capital in Italy', 'Site of papal investiture of Robert Guiscard', 'Councils that formalized Norman conquests'],
    architecture: ['Norman castle on volcanic ridge', 'Cathedral'],
    timeline: [
      { year: 1043, text: 'William Iron Arm makes Melfi his capital' },
      { year: 1059, text: 'Council of Melfi — Pope invests Robert Guiscard' },
    ],
    sources: ['G. A. Loud, "The Age of Robert Guiscard" (2000)'],
  },
  {
    id: 'node-bari',
    overview:
      'Bari was the last major Byzantine stronghold in southern Italy. Robert Guiscard besieged and captured it in 1071, ending five centuries of East Roman rule in the peninsula. The port became a major embarkation point for crusaders.',
    significance: ['Last Byzantine stronghold in Italy', 'Crusader embarkation port', 'Relics of St Nicholas'],
    timeline: [
      { year: 1071, text: 'Robert Guiscard captures Bari from the Byzantines' },
      { year: 1087, text: 'Relics of St Nicholas brought from Myra' },
    ],
    sources: ['G. A. Loud, "The Age of Robert Guiscard" (2000)'],
  },
  {
    id: 'node-salerno',
    overview:
      'Salerno was the seat of the Lombard Principality of Salerno before Norman absorption. It housed the famous Schola Medica Salernitana, Europe\'s first medical school. Robert Guiscard took the city in 1077 and made it a key Norman administrative center.',
    significance: ['Europe\'s first medical school', 'Former Lombard principality', 'Key Norman administrative center'],
    timeline: [
      { year: 1077, text: 'Robert Guiscard conquers Salerno' },
    ],
    sources: ['G. A. Loud, "The Age of Robert Guiscard" (2000)'],
  },
  {
    id: 'node-messina',
    overview:
      'Messina was the Norman point of entry for the conquest of Sicily. Roger I crossed the Strait of Messina in 1061 and used the city as a staging ground for the thirty-year campaign that brought all of Sicily under Norman rule.',
    significance: ['Entry point for Norman Sicily conquest', 'Strategic strait crossing'],
    timeline: [
      { year: 1061, text: 'Roger I crosses to Sicily' },
      { year: 1091, text: 'Conquest of Sicily completed' },
    ],
  },
  {
    id: 'node-naples',
    overview:
      'Naples remained largely independent until incorporated into the Norman Kingdom of Sicily by Roger II in 1140. It was a prosperous port city with strong Byzantine cultural ties that enriched Norman governance in the south.',
    significance: ['Major southern Italian port', 'Late addition to Norman kingdom'],
    timeline: [
      { year: 1140, text: 'Roger II absorbs Naples into the Kingdom of Sicily' },
    ],
  },
  {
    id: 'node-catania',
    overview:
      'Catania, at the foot of Mount Etna, was an important episcopal see under Norman rule. Roger I established a Benedictine monastery here and the city became a center of Norman administration in eastern Sicily.',
    significance: ['Episcopal see in eastern Sicily', 'Benedictine monastery under Roger I'],
    timeline: [
      { year: 1071, text: 'Normans capture Catania' },
      { year: 1091, text: 'Benedictine abbey of Sant\'Agata founded' },
    ],
  },
  {
    id: 'node-reggio-calabria',
    overview:
      'Reggio Calabria, at the toe of Italy directly across the Strait of Messina, was the staging ground for the Norman invasion of Sicily. Robert Guiscard captured it in 1060, establishing a forward base for his brother Roger\'s campaigns.',
    significance: ['Staging ground for Sicilian invasion', 'First major mainland conquest near Sicily'],
    timeline: [
      { year: 1060, text: 'Robert Guiscard captures Reggio' },
    ],
  },
  {
    id: 'node-aversa',
    overview:
      'Aversa was the first Norman territory in Italy, granted to Rainulf Drengot in 1030 by Duke Sergius IV of Naples. This small county north of Naples became the seed from which Norman power in southern Italy grew.',
    significance: ['First Norman territory in southern Italy', 'Seed of Norman expansion'],
    timeline: [
      { year: 1030, text: 'Rainulf Drengot receives the County of Aversa' },
    ],
    sources: ['G. A. Loud, "The Age of Robert Guiscard" (2000)'],
  },
  {
    id: 'node-cefalu',
    overview:
      'Cefalù\'s famous Norman cathedral was built by Roger II beginning in 1131, intended as a royal mausoleum. The apse mosaic of Christ Pantocrator is one of the finest surviving examples of Norman-Byzantine art.',
    significance: ['Royal cathedral of Roger II', 'Christ Pantocrator mosaic'],
    architecture: ['Norman cathedral (1131+)', 'Byzantine-style apse mosaics', 'Twin-tower facade'],
    timeline: [
      { year: 1131, text: 'Roger II begins cathedral construction' },
    ],
  },
  {
    id: 'node-monreale',
    overview:
      'The Cathedral and Benedictine cloister at Monreale, near Palermo, was built by William II of Sicily from 1174. Its interior is covered with over 6,000 square meters of gold-ground mosaics, making it one of the supreme achievements of Norman art and architecture.',
    significance: ['Greatest Norman mosaic ensemble', 'Royal Benedictine foundation'],
    architecture: ['Cathedral with 6,000 m² of mosaics', 'Cloistered Benedictine monastery', 'Pointed arches blending Norman and Islamic forms'],
    timeline: [
      { year: 1174, text: 'William II begins construction' },
      { year: 1182, text: 'Cathedral largely completed' },
    ],
    sources: ['John Julius Norwich, "The Kingdom in the Sun" (1970)'],
  },

  // ── Crusader States ──
  {
    id: 'node-antioch',
    overview:
      'The Principality of Antioch was established by Bohemond of Taranto, a Norman lord, after the siege of Antioch during the First Crusade in 1098. It was the most "Norman" of the Crusader states, with a feudal structure transplanted directly from southern Italy. The principality survived until 1268.',
    significance: ['Norman-founded Crusader principality', 'Longest-lasting Norman polity in the Levant', 'Strategic control of northern Syria'],
    timeline: [
      { year: 1098, text: 'Bohemond seizes Antioch after long siege' },
      { year: 1119, text: 'Battle of Ager Sanguinis — Roger of Salerno killed' },
      { year: 1268, text: 'Baibars captures and destroys Antioch' },
    ],
    sources: ['Thomas Asbridge, "The Creation of the Principality of Antioch" (2000)'],
  },
  {
    id: 'node-tripoli',
    overview:
      'The County of Tripoli was established in 1109 by Raymond of Saint-Gilles\' heirs, with significant Norman-Provençal ties. Bohemond of Antioch exercised influence here, and Norman lords held fiefs within the county.',
    significance: ['Crusader county with Norman feudal ties', 'Strategic Levantine port'],
    timeline: [
      { year: 1109, text: 'County of Tripoli established' },
      { year: 1289, text: 'Mamluk conquest ends the county' },
    ],
  },
  {
    id: 'node-edessa',
    overview:
      'The County of Edessa, established in 1098, was the first Crusader state and the most exposed. While primarily associated with Baldwin of Boulogne, it had links to Norman networks through intermarriage and military alliance. Its fall in 1144 triggered the Second Crusade.',
    significance: ['First Crusader state', 'Its fall triggered the Second Crusade'],
    timeline: [
      { year: 1098, text: 'Baldwin of Boulogne establishes the county' },
      { year: 1144, text: 'Zengi captures Edessa' },
    ],
    sources: ['Jonathan Riley-Smith, "The First Crusade and the Idea of Crusading" (1986)'],
  },

  // ── Other expansion ──
  {
    id: 'node-tunis',
    overview:
      'Roger II of Sicily conquered parts of the Ifriqiyan coast including Tunis in 1148, briefly creating a Norman "Kingdom of Africa." The venture was short-lived: Muslim resistance and the Almohad advance forced Norman withdrawal by 1160.',
    significance: ['Norman foothold in North Africa', 'Part of Roger II\'s Mediterranean ambitions'],
    timeline: [
      { year: 1148, text: 'Norman fleet captures coastal Ifriqiya' },
      { year: 1160, text: 'Almohad advance forces Norman withdrawal' },
    ],
    sources: ['Alex Metcalfe, "The Muslims of Medieval Italy" (2009)'],
  },
  {
    id: 'node-dyrrachium',
    overview:
      'The Battle of Dyrrachium (modern Durrës, Albania) in 1081 saw Robert Guiscard defeat the Byzantine Emperor Alexios I Komnenos. This audacious campaign on the Via Egnatia demonstrated Norman willingness to challenge the Eastern Roman Empire directly.',
    significance: ['Major Norman victory over Byzantium', 'Demonstrated Norman Mediterranean ambitions'],
    timeline: [
      { year: 1081, text: 'Robert Guiscard defeats Alexios I at Dyrrachium' },
    ],
    sources: ['Anna Komnene, "Alexiad" (c. 1148)'],
  },
  {
    id: 'node-lisbon',
    overview:
      'During the Second Crusade in 1147, a fleet of northern European crusaders — including Normans and Anglo-Normans — assisted Afonso Henriques in the siege and capture of Lisbon from the Moors. Norman participants played a notable military role.',
    significance: ['Norman participation in the Reconquista', 'Combined crusade–Reconquista operation'],
    timeline: [
      { year: 1147, text: 'Crusader fleet helps capture Lisbon' },
    ],
    sources: ['Charles Wendell David (ed.), "De expugnatione Lyxbonensi" (1936)'],
  },
  {
    id: 'node-tarragona',
    overview:
      'Robert Bordet, a Norman knight, helped restore Tarragona as a Christian city in the Reconquista. He was appointed Prince of Tarragona around 1129, illustrating how individual Norman warriors shaped the Iberian frontier.',
    significance: ['Norman knight as Prince of Tarragona', 'Individual Norman participation in the Reconquista'],
    timeline: [
      { year: 1129, text: 'Robert Bordet appointed Prince of Tarragona' },
    ],
  },
  {
    id: 'node-limassol',
    overview:
      'Richard I of England (of Norman descent) conquered Cyprus from the Byzantine rebel Isaac Komnenos in 1191 during the Third Crusade. The island became a Crusader stronghold under the Lusignan dynasty and served as a supply base for the Holy Land.',
    significance: ['Crusader conquest of Cyprus', 'Strategic eastern Mediterranean base'],
    timeline: [
      { year: 1191, text: 'Richard I captures Cyprus' },
    ],
  },
  {
    id: 'node-mahdia',
    overview:
      'Mahdia, the Fatimid-era capital of Ifriqiya, was captured by Roger II\'s forces in 1148 as part of the Norman African venture. Like Tunis, the Norman hold was brief, ending by 1160 with the Almohad reconquest.',
    significance: ['Part of Norman "Kingdom of Africa"', 'Former Fatimid capital'],
    timeline: [
      { year: 1148, text: 'Norman forces capture Mahdia' },
      { year: 1160, text: 'Almohad reconquest' },
    ],
  },

  // ── Norman Castles — England ──
  {
    id: 'node-colchester-castle',
    overview:
      'Colchester Castle was built by William the Conqueror around 1069 on the foundations of the Roman Temple of Claudius. It contains the largest surviving Norman keep in England, even larger in footprint than the Tower of London\'s White Tower. The reuse of Roman brick and tile gives the keep its distinctive reddish appearance.',
    significance: ['Largest Norman keep in England by floor area', 'Built over the Roman Temple of Claudius', 'Key fortress securing East Anglia after the Conquest'],
    architecture: ['Massive rectangular keep with Roman-material walls', 'Apsidal chapel projection', 'Surrounding bailey and later town defenses'],
    timeline: [
      { year: 1069, text: 'Construction begins under William the Conqueror' },
      { year: 1076, text: 'Keep largely complete; used to suppress East Anglian revolts' },
      { year: 1216, text: 'Besieged during the First Barons\' War' },
    ],
    sources: ['Philip Crummy, "City of Victory: The Story of Colchester" (1997)'],
  },
  {
    id: 'node-rochester-castle',
    overview:
      'Rochester Castle boasts the tallest Norman keep in England, rising to 113 feet. Built from the 1080s onward and given its great tower by Archbishop William de Corbeil in 1127, it guards the crossing of the River Medway on the road from London to Dover. The castle endured two famous sieges, the most dramatic in 1215 when King John undermined its south tower with a mine fuelled by pig fat.',
    significance: ['Tallest Norman keep in England', 'Controlled the strategic Medway crossing', 'Scene of a legendary siege in 1215'],
    architecture: ['Rectangular great tower with cross-wall dividing the interior', 'Round replacement tower on the undermined south corner', 'Curtain wall with flanking towers'],
    timeline: [
      { year: 1087, text: 'Bishop Gundulf begins the stone castle for William Rufus' },
      { year: 1127, text: 'Archbishop William de Corbeil builds the great tower' },
      { year: 1215, text: 'King John besieges the castle; south tower undermined' },
    ],
    sources: ['R. Allen Brown, "Rochester Castle" (English Heritage guidebook, 1986)'],
  },
  {
    id: 'node-arundel-castle',
    overview:
      'Arundel Castle was established in 1068 by Roger de Montgomery, one of William the Conqueror\'s closest companions, as a motte-and-bailey fortification guarding the Arun valley. The castle\'s massive artificial mound still dominates the West Sussex skyline. It has been the seat of the Dukes of Norfolk since the 15th century and was extensively restored in the Victorian period.',
    significance: ['One of the earliest Norman motte-and-bailey castles in England', 'Guards the Arun river gap through the South Downs', 'Continuous aristocratic residence for nearly a millennium'],
    architecture: ['Large motte with shell keep', 'Twin-bailey plan', 'Victorian Gothic restoration overlaying the Norman core'],
    timeline: [
      { year: 1068, text: 'Roger de Montgomery builds the motte-and-bailey' },
      { year: 1138, text: 'Besieged during the Anarchy' },
    ],
    sources: ['John Goodall, "The English Castle" (2011)'],
  },

  // ── Norman Castles — France ──
  {
    id: 'node-chateau-gaillard',
    overview:
      'Château Gaillard was built in just two years (1196–1198) by Richard the Lionheart to defend the Seine valley and the eastern frontier of Normandy against the French king Philip II. Its concentric design and use of machicolations were revolutionary in Western Europe, reflecting lessons from Crusader castle-building. Philip II captured it in 1204 after a prolonged siege, sealing the French conquest of Normandy.',
    significance: ['Revolutionary concentric design in Western Europe', 'Richard I\'s personal military masterpiece', 'Its fall in 1204 marked the end of the Duchy of Normandy as an English possession'],
    architecture: ['Three concentric baileys on a limestone spur', 'Corrugated inner curtain wall to deflect missiles', 'Rock-cut ditch isolating the inner ward'],
    timeline: [
      { year: 1196, text: 'Richard I begins rapid construction' },
      { year: 1198, text: 'Castle completed' },
      { year: 1204, text: 'Philip II captures the castle after siege' },
    ],
    sources: ['Jean Mesqui, "Château Gaillard: étude de castellologie médiévale" (2002)'],
  },
  {
    id: 'node-gisors',
    overview:
      'Gisors Castle was a major frontier fortress in the Norman Vexin, the contested border zone between the Duchy of Normandy and the Kingdom of France. Begun in 1097 by William Rufus, its motte-and-bailey core was later enclosed in powerful stone defenses and a great octagonal keep. The castle frequently changed hands during the Plantagenet–Capetian wars.',
    significance: ['Key fortress on the Norman–French frontier', 'Symbol of the long struggle for control of the Vexin', 'Site of multiple diplomatic meetings between kings'],
    architecture: ['Large motte with octagonal shell keep', 'Stone enceinte with flanking towers', 'Prisoners\' Tower with carved graffiti'],
    timeline: [
      { year: 1097, text: 'William Rufus establishes the castle' },
      { year: 1161, text: 'Henry II strengthens the defenses' },
      { year: 1193, text: 'Philip II seizes Gisors while Richard is captive' },
    ],
    sources: ['Jean Mesqui, "Île-de-France gothique, vol. 2" (1988)'],
  },
  {
    id: 'node-pirou',
    overview:
      'Château de Pirou is a well-preserved 12th-century Norman castle in the Cotentin Peninsula, surrounded by three concentric moats fed by marshland. According to legend, its defenders turned into wild geese to escape a Viking siege—a story illustrated in a modern tapestry displayed inside the castle. The site preserves an unusually complete picture of a smaller Norman fortified manor.',
    significance: ['One of the best-preserved small Norman castles in Normandy', 'Triple-moat defensive system unique in the region', 'Living example of a fortified seigneurial residence'],
    architecture: ['Stone hall and chapel within a walled enclosure', 'Three concentric water-filled moats', 'Gatehouse with drawbridge'],
    timeline: [
      { year: 1135, text: 'Stone castle constructed' },
      { year: 1944, text: 'Damaged in World War II; later restored' },
    ],
    sources: ['Lucien Musset, "Normandie Romane" (1967)'],
  },

  // ── Norman Castles — Italy & Sicily ──
  {
    id: 'node-palazzo-normanni',
    overview:
      'The Palazzo dei Normanni (Norman Palace) in Palermo was originally a 9th-century Arab fortress that the Norman conquerors transformed into the seat of the Kingdom of Sicily. Roger II commissioned the Cappella Palatina within its walls, a chapel whose golden Byzantine mosaics and Arab muqarnas ceiling form one of the supreme artistic achievements of the Middle Ages. The blending of Arab, Byzantine, and Norman traditions here epitomizes the multicultural brilliance of Norman Sicily.',
    significance: ['Seat of the Norman Kingdom of Sicily', 'Houses the Cappella Palatina, a masterpiece of Arab-Norman art', 'Symbol of the multicultural fusion under Norman rule'],
    architecture: ['Cappella Palatina with gold mosaics and muqarnas ceiling', 'Torre Pisana (Pisan Tower)', 'Sala di Re Ruggero with secular mosaics'],
    timeline: [
      { year: 1072, text: 'Normans capture Palermo; take over the Arab qasr' },
      { year: 1132, text: 'Roger II consecrates the Cappella Palatina' },
      { year: 1140, text: 'Palace expanded as royal administrative center' },
    ],
    sources: ['William Tronzo, "The Cultures of His Kingdom" (1997)'],
  },
  {
    id: 'node-caccamo-castle',
    overview:
      'Caccamo Castle is one of the largest and best-preserved Norman castles in Italy, dramatically positioned on a limestone cliff overlooking the San Leonardo river valley. It was built by the Norman knight Matthew Bonellus in the late 11th century and later became a center of baronial conspiracy against the Sicilian crown. The castle\'s sheer size and its cliff-edge setting make it one of the most visually striking medieval fortresses in Sicily.',
    significance: ['One of the largest Norman castles in Italy', 'Dramatic cliff-top setting', 'Center of the 1160 baronial conspiracy against William I'],
    architecture: ['Massive rectangular keep', 'Multiple concentric curtain walls', 'Great hall and chapel complex'],
    timeline: [
      { year: 1094, text: 'Castle established by Norman lords' },
      { year: 1160, text: 'Matthew Bonellus conspires against King William I here' },
    ],
    sources: ['G.L. Ferrario, "I castelli di Sicilia" (2002)'],
  },
  {
    id: 'node-aci-castello',
    overview:
      'Aci Castello is a Norman-era castle built from local black lava stone on a rocky basalt outcrop jutting into the Ionian Sea north of Catania. The fortress was constructed over earlier fortifications and served as a strategic coastal defense point. Its dramatic volcanic-rock setting and commanding sea views make it one of the most distinctive castles in Sicily.',
    significance: ['Built from volcanic lava stone on a basalt promontory', 'Key coastal defense north of Catania', 'Dramatically sited above the sea'],
    architecture: ['Lava-stone walls on a volcanic rock platform', 'Norman-era keep and enceinte', 'Natural cliff defenses on three sides'],
    timeline: [
      { year: 1076, text: 'Norman fortification of the site' },
      { year: 1169, text: 'Damaged by earthquake; rebuilt' },
    ],
  },
  {
    id: 'node-erice-castle-of-venus',
    overview:
      'The Castle of Venus (Castello di Venere) at Erice crowns the summit of Monte Erice in western Sicily, built by the Normans on the site of the ancient Temple of Venus Erycina, sacred since Phoenician times. The castle reused ancient masonry and commands sweeping views over the Tyrrhenian Sea. It served both as a fortress and as a symbol of Norman dominion over the former Muslim strongholds of western Sicily.',
    significance: ['Built on the site of the ancient Temple of Venus Erycina', 'Commands strategic views over western Sicily', 'Symbol of Norman control after the Muslim period'],
    architecture: ['Norman towers and curtain wall on ancient foundations', 'Reused Phoenician and Roman masonry', 'Pozzo di Venere (Venus Well) within the precinct'],
    timeline: [
      { year: 1100, text: 'Norman fortification constructed' },
      { year: 1314, text: 'Castle involved in the Wars of the Sicilian Vespers' },
    ],
  },

  // ── Norman Castles — Ireland ──
  {
    id: 'node-carrickfergus-castle',
    overview:
      'Carrickfergus Castle is one of the best-preserved Norman castles in Ireland, built from 1177 by John de Courcy after his conquest of eastern Ulster. Its great rectangular keep, constructed of local basalt, overlooks Belfast Lough and controlled the sea approach to the region. The castle remained in continuous military use for over 750 years, only being decommissioned in 1928.',
    significance: ['Best-preserved Norman castle in Ireland', 'Controlled the sea approach to Belfast Lough', 'In continuous military use from 1177 to 1928'],
    architecture: ['Rectangular great keep in local basalt', 'Inner and outer wards', 'Gatehouse and curtain wall enclosing the promontory'],
    timeline: [
      { year: 1177, text: 'John de Courcy begins construction' },
      { year: 1210, text: 'King John besieges and captures the castle' },
      { year: 1928, text: 'Castle decommissioned from military use' },
    ],
    sources: ['T.E. McNeill, "Carrickfergus Castle" (HMSO, 1981)'],
  },

  // ── Norman-linked Crusader Castles — Levant ──
  {
    id: 'node-krak-des-chevaliers',
    overview:
      'Krak des Chevaliers is widely regarded as the finest surviving example of Crusader military architecture. Originally a small Kurdish fortress captured during the First Crusade in 1099, it was massively expanded by the Knights Hospitaller into a concentric castle capable of housing a garrison of 2,000. Its double ring of walls, massive talus, and sophisticated water-supply systems made it virtually impregnable until Baybars captured it through a ruse in 1271.',
    significance: ['Often called the finest Crusader castle ever built', 'Garrisoned by the Knights Hospitaller', 'UNESCO World Heritage Site'],
    architecture: ['Concentric double curtain walls', 'Massive glacis (talus) on the inner wall', 'Great hall, chapel, and extensive vaulted storage'],
    timeline: [
      { year: 1099, text: 'Captured during the First Crusade' },
      { year: 1142, text: 'Granted to the Knights Hospitaller' },
      { year: 1271, text: 'Baybars captures the castle' },
    ],
    sources: ['Hugh Kennedy, "Crusader Castles" (1994)'],
  },
  {
    id: 'node-sahyun-saladin-castle',
    overview:
      'Saône (Qal\'at Salah ad-Din) is a vast Crusader-Byzantine fortress perched on a narrow ridge between two deep ravines in the coastal mountains of Syria. A Byzantine fortification was expanded under Crusader rule with a great square keep showing strong Norman-style influence. The castle is famous for its enormous rock-cut ditch, spanned by a needle of living rock that once supported a drawbridge. Saladin captured it in 1188.',
    significance: ['Great square keep with Norman architectural influence', 'Enormous rock-cut ditch is an engineering marvel', 'UNESCO World Heritage Site'],
    architecture: ['Great square tower-keep in Norman style', 'Rock-cut ditch 28 meters deep with stone needle', 'Byzantine cisterns and Crusader chapel'],
    timeline: [
      { year: 1108, text: 'Crusaders take and expand the Byzantine fort' },
      { year: 1188, text: 'Saladin captures the castle after a three-day siege' },
    ],
    sources: ['Hugh Kennedy, "Crusader Castles" (1994)'],
  },
  {
    id: 'node-margat-marqab',
    overview:
      'Marqab (Margat) Castle is a massive black-basalt fortress on a volcanic hilltop overlooking the Syrian coast, within the orbit of the Principality of Antioch. Held by the Knights Hospitaller from 1186, it was one of the most powerful Crusader strongholds in the Levant, dominating the coastal road between Tortosa and Latakia. Its dark volcanic stone gives it a brooding, imposing presence unique among Crusader castles.',
    significance: ['Major Hospitaller fortress built of black basalt', 'Dominated the coastal road of the County of Tripoli', 'One of the last Crusader castles to fall'],
    architecture: ['Black basalt construction on volcanic hilltop', 'Concentric plan with massive round donjon', 'Great hall, chapel, and extensive storage vaults'],
    timeline: [
      { year: 1118, text: 'Crusader fortification established' },
      { year: 1186, text: 'Knights Hospitaller take over the castle' },
      { year: 1285, text: 'Sultan Qalawun captures Marqab' },
    ],
    sources: ['Hugh Kennedy, "Crusader Castles" (1994)'],
  },
  {
    id: 'node-safita-chastel-blanc',
    overview:
      'Chastel Blanc (the White Castle), known today as Safita, features a striking rectangular tower-keep that closely resembles a classic Norman donjon transplanted to the Levant. Held by the Knights Templar, the keep served both as a fortress and as a chapel — its ground floor is the Chapel of St. Michael, still used as a church. The tower\'s simple, powerful design makes it one of the clearest examples of Norman architectural influence in the Crusader states.',
    significance: ['Rectangular keep in classic Norman tower style', 'Templar fortress-chapel still in use', 'Clearest Norman architectural echo in the Levant'],
    architecture: ['Rectangular tower-keep (Norman donjon form)', 'Ground-floor chapel of St. Michael', 'Walls up to 3 meters thick'],
    timeline: [
      { year: 1112, text: 'Crusader fortification established' },
      { year: 1171, text: 'Damaged by earthquake; rebuilt by the Templars' },
      { year: 1271, text: 'Baybars captures the castle' },
    ],
    sources: ['Hugh Kennedy, "Crusader Castles" (1994)'],
  },
  {
    id: 'node-bagras-gaston',
    overview:
      'Bagras (also called Gaston by the Crusaders) is a strategic mountain fortress controlling the Belen Pass, the main route between Cilician Armenia and the Principality of Antioch. The Templars held the castle for much of the Crusader period, and its position made it a constant flashpoint between Crusaders, Armenians, and Muslim forces. The ruins, perched on a forested ridge, remain impressively intact.',
    significance: ['Controlled the vital Belen Pass between Cilicia and Antioch', 'Templar stronghold for much of the Crusader era', 'Strategic flashpoint between multiple powers'],
    architecture: ['Mountain-top fortress with multiple defensive circuits', 'Keep and curtain wall following the ridge line', 'Cisterns cut into rock'],
    timeline: [
      { year: 1153, text: 'Templars garrison the fortress' },
      { year: 1188, text: 'Saladin captures Bagras' },
      { year: 1191, text: 'Armenian forces recapture it' },
      { year: 1268, text: 'Baybars destroys the castle' },
    ],
    sources: ['Thomas S. Asbridge, "The Principality of Antioch" (2000)'],
  },
  {
    id: 'node-anavarza',
    overview:
      'Anavarza (Anazarbus) is a fortified hilltop site in Cilicia (modern Adana Province, Turkey) with ancient Roman origins. Crusaders strengthened it with heavy stone defensive works during the period of Armenian-Crusader cooperation, and it served as a capital of the Armenian Kingdom of Cilicia. The site features massive walls climbing a sheer rock escarpment, with Crusader and Armenian building phases layered over Roman and Byzantine foundations.',
    significance: ['Capital of Armenian Cilicia with Crusader-strengthened defenses', 'Massive walls on a sheer rock escarpment', 'Layers of Roman, Byzantine, Armenian, and Crusader construction'],
    architecture: ['Rock-cut fortifications climbing the escarpment', 'Crusader-era keep and gate towers', 'Roman triumphal arch and stadium below the castle'],
    timeline: [
      { year: 1100, text: 'Crusader forces strengthen the fortifications' },
      { year: 1375, text: 'Falls with the end of the Armenian Kingdom of Cilicia' },
    ],
  },
  {
    id: 'node-kerak',
    overview:
      'Kerak Castle (Crac des Moabites) is a large Crusader fortress in modern Jordan, built by Pagan the Butler, Lord of Oultrejordain, in 1142. Perched on a triangular plateau, it controlled the trade and pilgrimage routes between Damascus and Egypt. The castle became famous under Raynald de Châtillon, whose provocative raids on Muslim caravans from Kerak helped trigger Saladin\'s decisive campaign against the Crusader states.',
    significance: ['Controlled trade routes between Damascus and Egypt', 'Raynald de Châtillon\'s infamous stronghold', 'Key target in Saladin\'s campaign against the Crusader kingdom'],
    architecture: ['Triangular plan exploiting the plateau\'s natural defenses', 'Deep rock-cut fosse on the south side', 'Crusader and later Ayyubid/Mamluk building phases'],
    timeline: [
      { year: 1142, text: 'Pagan the Butler constructs the castle' },
      { year: 1183, text: 'Saladin besieges Kerak during a wedding feast' },
      { year: 1189, text: 'Saladin captures the castle after a prolonged siege' },
    ],
    sources: ['Hugh Kennedy, "Crusader Castles" (1994)'],
  },

  // ── Norman Malta ──
  {
    id: 'node-mdina-norman',
    overview:
      'Mdina, the ancient fortified hilltop city of Malta, was the island\'s capital when the Normans conquered it in 1091 under Count Roger I. The Norman period left lasting traces in the city\'s architecture, including the Palazz ta\' Santa Sofia — one of the oldest surviving buildings in Mdina, with parts dating to the Norman era — and Palazzo Falson, a fortified townhouse preserving strong medieval and Norman-influenced features. The Normans also reduced the city\'s footprint by cutting it off from the suburb of Rabat with a new ditch.',
    significance: ['Capital of Malta under Norman rule', 'Palazz ta\' Santa Sofia preserves Norman-era fabric', 'Palazzo Falson retains medieval Norman-influenced features'],
    architecture: ['Fortified hilltop city with narrow streets', 'Palazz ta\' Santa Sofia (partly Norman-period)', 'Palazzo Falson (medieval fortified townhouse)'],
    timeline: [
      { year: 1091, text: 'Count Roger I conquers Malta and takes Mdina' },
      { year: 1194, text: 'Norman rule ends with the Hohenstaufen succession' },
    ],
  },
];

const articleMap = new Map<string, NormanSiteArticle>(articles.map((a) => [a.id, a]));

export function getNormanSiteArticle(id: string): NormanSiteArticle | undefined {
  return articleMap.get(id);
}
