import type { RegionRecord } from '@/types';

const ALL_ERAS = [
  'roman-gaul', 'frankish', 'viking', 'early-normandy', 'duchy', 'norman-expansion',
  'late-medieval-france', 'age-of-exploration', 'early-french-colonial',
  'new-france', 'acadia-atlantic', 'louisiana-interior', 'seven-years-war',
];

export const regionRecords: RegionRecord[] = [
  {
    id: 'normandy',
    slug: 'normandy',
    historicalNames: [
      { eraId: 'roman-gaul', name: 'Lugdunensis Secunda' },
      { eraId: 'frankish', name: 'Neustria' },
      { eraId: 'viking', name: 'Neustria' },
      { eraId: 'early-normandy', name: 'Normandy' },
      { eraId: 'duchy', name: 'Duchy of Normandy' },
      { eraId: 'norman-expansion', name: 'Duchy of Normandy' },
      { eraId: 'late-medieval-france', name: 'Normandy' },
      { eraId: 'age-of-exploration', name: 'Normandy' },
      { eraId: 'new-france-foundations', name: 'Normandy' },
      { eraId: 'royal-new-france', name: 'Normandy' },
    ],
    eraVisibility: [...ALL_ERAS],
    politicalEntity: {
      'roman-gaul': 'Roman Empire',
      frankish: 'Frankish Kingdom',
      viking: 'Frankish Kingdom (under Norse raids)',
      'early-normandy': 'Duchy of Normandy',
      duchy: 'Duchy of Normandy',
      'norman-expansion': 'Duchy of Normandy',
      'late-medieval-france': 'Kingdom of France',
      'age-of-exploration': 'Kingdom of France',
      'early-french-colonial': 'Kingdom of France',
      'new-france': 'Kingdom of France',
      'new-france-foundations': 'Kingdom of France',
      'royal-new-france': 'Kingdom of France',
      'seven-years-war': 'Kingdom of France',
    },
    ruler: {
      'roman-gaul': 'Roman Governor',
      frankish: 'Frankish Kings',
      viking: 'Frankish Kings / Norse war-bands',
      'early-normandy': 'Rollo → Richard I',
      duchy: 'William the Conqueror',
      'norman-expansion': 'Henry I Beauclerc',
      'late-medieval-france': 'French Crown',
      'age-of-exploration': 'French Crown',
      'new-france-foundations': 'French Crown',
      'royal-new-france': 'French Crown',
    },
    summary: {
      'roman-gaul':
        'Under Rome, this region was Lugdunensis Secunda, administered from Rotomagus (Rouen). Roman villas, roads, and trade flourished.',
      frankish:
        'Part of Neustria, the western Frankish realm. Rouen remained an important administrative center under Carolingian rule.',
      viking:
        'Norse raiders devastated the Seine valley from the 840s. Monasteries burned, towns were sacked, and Frankish defenses crumbled.',
      'early-normandy':
        'After the Treaty of Saint-Clair-sur-Epte (911), Rollo and his descendants forged a powerful duchy blending Norse vigor with Frankish institutions.',
      duchy:
        'At its zenith under William, Normandy was the most dynamic territory in Western Europe — seat of cross-Channel power, great abbeys, and castle-building.',
      'norman-expansion':
        'Normandy remained the continental anchor of a sprawling Norman world stretching from England to Sicily.',
      'late-medieval-france':
        'After Philip II seized the duchy in 1204, Normandy became a province of the French crown. Its ports would later launch Atlantic ventures.',
      'age-of-exploration':
        'Norman ports like Honfleur and Dieppe sent ships across the Atlantic. The region\'s maritime tradition fed France\'s age of exploration.',
      'new-france-foundations':
        'Normandy\'s ports — Dieppe, Honfleur, and Rouen — were the departure points for settlers, traders, and missionaries heading to New France. The region supplied both ships and people to the fledgling colony.',
      'royal-new-france':
        'Normandy continued to supply settlers and maritime expertise to New France. Norman surnames became deeply embedded in the colonial population along the St. Lawrence.',
    },
    article: {
      duchy: `The Duchy of Normandy reached its apex in the 11th century. William the Bastard, later the Conqueror, unified fractious Norman barons and launched the most famous amphibious invasion of the medieval world in 1066.

The duchy's administrative innovations — the Exchequer, itinerant justices, detailed land surveys — set models copied across Europe. Its Romanesque churches at Caen, Jumièges, and Mont-Saint-Michel remain architectural marvels.

Norman society was militaristic, pious, and ambitious. Knights held land in return for military service, monasteries served as centers of learning, and the ducal court attracted scholars, builders, and adventurers from across Christendom.

After the Conquest, Normandy and England were governed as a single cross-Channel realm, though tensions between continental and insular interests would eventually pull them apart. Philip II of France seized the duchy in 1204, ending its independence.`,
      'new-france-foundations': `By the 17th century, Normandy was a French province — not the medieval duchy — but it kept dense river-and-port ties to the Atlantic. Rouen, Dieppe, and Honfleur were routine points of embarkation for ships bound for Canada, and Norman mariners, merchants, and clerics were heavily involved in the early fur trade and missions.

Recruitment did not pick settlers at random from all of France. Seigneurs, family chains, and parish networks often drew people from northwestern France into the same colonial neighbourhoods. That is one reason Norman and near-Norman surnames show up so often in Québec founding families: the colony was small, and repeated regional channels left an outsized mark compared with France as a whole.

This is not the same as saying "French Canadians are Vikings." It means many lineages pass through early modern Normandy — a population already blended from Norse, Frankish, and broader French roots — on their way to the St. Lawrence.`,
      'royal-new-france': `After 1663, royal policy flooded the colony with structured migration: the Filles du Roi, soldiers who stayed, engagés, and officials. La Rochelle and other western ports handled much of that traffic, but Normandy still supplied people and skills, and Norman place names and families remained conspicuous along the St. Lawrence.

Historians and genealogists often note how a modest number of 17th-century immigrants became ancestors to very large modern French Canadian populations — a founder effect amplified by endogamy within Catholic parish society. Normandy appears prominently in that story because of maritime access and recruitment patterns, alongside Perche, Brittany, and the Centre-West, not because the colony was exclusively Norman.`,
    },
    notableSettlements: ['Rouen', 'Caen', 'Bayeux', 'Falaise', 'Honfleur'],
    relatedEventIds: ['treaty-saint-clair', 'battle-hastings'],
    relatedRouteIds: ['viking-seine', 'norman-conquest-1066', 'champlain-quebec-1608'],
  },
  {
    id: 'perche',
    slug: 'perche',
    historicalNames: [
      { eraId: 'new-france-foundations', name: 'Perche' },
      { eraId: 'royal-new-france', name: 'Perche' },
    ],
    eraVisibility: ['age-of-exploration', 'new-france-foundations', 'royal-new-france'],
    politicalEntity: {
      'age-of-exploration': 'Kingdom of France',
      'new-france-foundations': 'Kingdom of France',
      'royal-new-france': 'Kingdom of France',
    },
    ruler: {
      'new-france-foundations': 'French Crown',
    },
    summary: {
      'new-france-foundations':
        'The Perche, a small region south of Normandy, supplied a disproportionate share of New France\'s founding settlers. Recruiters like Robert Giffard drew entire families from Mortagne-au-Perche and Tourouvre, creating a "founder effect" that shaped Québec genealogy for centuries.',
      'age-of-exploration':
        'A rural region on the Norman-Maine border, the Perche was home to minor nobility and peasant farmers. Its dense social networks would later make it an ideal recruitment ground for colonial ventures.',
    },
    article: {
      'new-france-foundations': `The Perche was not a major province — it had no great cities or ports. But its dense web of family, parish, and seigneurial ties made it the single most important recruitment zone for New France's founding population.

Robert Giffard, seigneur of Beauport, personally recruited dozens of families from Mortagne-au-Perche and the surrounding parishes in the 1630s. The Cloutier, Guyon, Tremblay, Côté, Gagnon, and Boucher families all trace their Canadian roots to this corridor.

Demographic studies show that a remarkably small number of Percheron settlers — perhaps 200–300 individuals — are ancestral to millions of modern Québécois. This "founder effect" means that the Perche's genetic and cultural imprint on French Canada is vastly out of proportion to its size.`,
    },
    notableSettlements: ['Mortagne-au-Perche', 'Tourouvre'],
    relatedEventIds: [],
    relatedRouteIds: [],
  },
  {
    id: 'aunis',
    slug: 'aunis',
    historicalNames: [
      { eraId: 'new-france-foundations', name: 'Aunis / La Rochelle' },
      { eraId: 'royal-new-france', name: 'Aunis / La Rochelle' },
    ],
    eraVisibility: ['age-of-exploration', 'new-france-foundations', 'royal-new-france'],
    politicalEntity: {
      'age-of-exploration': 'Kingdom of France',
      'new-france-foundations': 'Kingdom of France',
      'royal-new-france': 'Kingdom of France',
    },
    ruler: {
      'new-france-foundations': 'French Crown',
      'royal-new-france': 'French Crown',
    },
    summary: {
      'new-france-foundations':
        'La Rochelle and the Aunis coast were the primary embarkation point for colonists, supplies, and trade goods heading to New France. The port handled more transatlantic colonial traffic than any other French harbour during this period.',
      'age-of-exploration':
        'A Protestant stronghold and major Atlantic port, La Rochelle\'s merchants were early investors in the fur trade and fishing expeditions to the Grand Banks.',
      'royal-new-france':
        'Under Louis XIV, La Rochelle was the official port of departure for the Filles du Roi and the Carignan-Salières Regiment. Its role as the colonial gateway reached its peak.',
    },
    article: {
      'new-france-foundations': `La Rochelle was, in many ways, the umbilical cord of New France. Nearly every ship carrying colonists, soldiers, supplies, and correspondence to Québec sailed from its harbour or from nearby Rochefort.

The city's Protestant merchant class had invested heavily in Atlantic ventures since the 16th century. After the Siege of La Rochelle (1628) broke Huguenot power, the crown redirected the port's commercial energy toward the colonies.

The Compagnie des Cent-Associés, the Compagnie de la Nouvelle-France, and later royal administrators all operated through La Rochelle's infrastructure. Ships departed in spring, crossed in six to twelve weeks, and returned in autumn with furs. The rhythm of this Atlantic shuttle shaped the colony's calendar and economy.`,
    },
    notableSettlements: ['La Rochelle'],
    relatedEventIds: [],
    relatedRouteIds: [],
  },
  {
    id: 'brittany',
    slug: 'brittany',
    historicalNames: [
      { eraId: 'roman-gaul', name: 'Armorica' },
      { eraId: 'frankish', name: 'Brittany' },
      { eraId: 'duchy', name: 'Duchy of Brittany' },
      { eraId: 'late-medieval-france', name: 'Duchy of Brittany' },
      { eraId: 'new-france-foundations', name: 'Brittany' },
      { eraId: 'royal-new-france', name: 'Brittany' },
    ],
    eraVisibility: [...ALL_ERAS],
    politicalEntity: {
      'roman-gaul': 'Roman Empire',
      frankish: 'Semi-independent Breton principality',
      viking: 'Breton Kingdom (contested)',
      'early-normandy': 'Duchy of Brittany',
      duchy: 'Duchy of Brittany',
      'norman-expansion': 'Duchy of Brittany',
      'late-medieval-france': 'Duchy of Brittany',
      'age-of-exploration': 'Kingdom of France',
      'new-france-foundations': 'Kingdom of France',
      'royal-new-france': 'Kingdom of France',
    },
    ruler: {
      'roman-gaul': 'Roman Governor',
      frankish: 'Breton Chieftains',
      duchy: 'Breton Dukes',
      'late-medieval-france': 'Breton Dukes → French Crown',
    },
    summary: {
      'roman-gaul':
        'Known as Armorica under Rome, this western peninsula was lightly Romanized. Brythonic settlers from Britain gave it its lasting Celtic character.',
      frankish:
        'Brittany resisted Frankish domination fiercely. Its rulers maintained a distinct Celtic identity, language, and legal tradition.',
      duchy:
        'A proudly independent duchy, Brittany maintained its own institutions and Celtic heritage while navigating between Norman and French power.',
      'age-of-exploration':
        'Breton sailors from Saint-Malo were among the first Europeans to fish the Grand Banks and explore the St. Lawrence.',
      'new-france-foundations':
        'Saint-Malo remained a major embarkation port. Breton merchants and fishermen sustained the Atlantic cod trade that ran parallel to the colony\'s development.',
      'royal-new-france':
        'Brittany\'s Atlantic ports continued to supply ships, sailors, and some settlers to New France, though La Rochelle dominated official colonial traffic.',
    },
    article: {
      duchy: `Brittany preserved a remarkable Celtic identity through centuries of Frankish, Viking, and Norman pressure. Its dukes walked a careful line between independence and submission to more powerful neighbors.

The Breton language and legal customs set it apart from surrounding territories. Its coastline provided both isolation and vulnerability — Norse raiders struck hard here, but the Bretons eventually recovered.

Relations with Normandy were complex: sometimes allied, sometimes hostile, always defined by the border marches.`,
    },
    notableSettlements: ['Rennes', 'Nantes', 'Vannes', 'Saint-Malo'],
    relatedEventIds: [],
    relatedRouteIds: ['cartier-voyage-1534'],
  },
  {
    id: 'ile-de-france',
    slug: 'ile-de-france',
    historicalNames: [
      { eraId: 'roman-gaul', name: 'Lutetia Region' },
      { eraId: 'frankish', name: 'Francia' },
      { eraId: 'duchy', name: 'Royal Domain' },
    ],
    eraVisibility: [...ALL_ERAS],
    politicalEntity: {
      'roman-gaul': 'Roman Empire',
      frankish: 'Heart of the Frankish Kingdom',
      duchy: 'Capetian Royal Domain',
      'late-medieval-france': 'Kingdom of France',
      'age-of-exploration': 'Kingdom of France',
    },
    ruler: {
      'roman-gaul': 'Roman Prefect',
      frankish: 'Frankish Kings',
      duchy: 'Capetian Kings of France',
      'late-medieval-france': 'Valois Kings',
      'age-of-exploration': 'French Crown',
    },
    summary: {
      'roman-gaul':
        'Lutetia (Paris) was a modest but strategically placed Roman city on the Seine. The surrounding territory served as agricultural hinterland.',
      frankish:
        'Paris became the Frankish capital. The surrounding region — Francia — was the kernel of what would become the French kingdom.',
      duchy:
        'The Île-de-France was the direct royal domain of the Capetian kings, the small but strategic heartland from which they gradually extended power over all of France.',
      'late-medieval-france':
        'Under the Valois, Paris grew into the largest city in Christendom. The crown consolidated control and began looking outward.',
      'age-of-exploration':
        'Paris directed the expansion overseas. Royal charters and trading companies organized the colonization of New France.',
    },
    article: {
      duchy: `The Île-de-France, though small, was the nucleus of French royal power. The Capetian kings ruled directly here while their nominal vassals — including the Dukes of Normandy — often wielded more real power.

Paris, with its university, cathedral, and markets, was becoming the intellectual and economic center of northern Europe. The tension between the ambitious Capetians and the mighty Norman dukes shaped the politics of the era.`,
    },
    notableSettlements: ['Paris', 'Saint-Denis', 'Senlis', 'Melun'],
    relatedEventIds: [],
    relatedRouteIds: [],
  },
  {
    id: 'flanders',
    slug: 'flanders',
    historicalNames: [
      { eraId: 'roman-gaul', name: 'Belgica Secunda' },
      { eraId: 'frankish', name: 'County of Flanders' },
      { eraId: 'duchy', name: 'County of Flanders' },
    ],
    eraVisibility: [...ALL_ERAS],
    politicalEntity: {
      'roman-gaul': 'Roman Empire',
      frankish: 'Frankish County',
      duchy: 'County of Flanders',
      'late-medieval-france': 'Burgundian Netherlands',
      'age-of-exploration': 'Habsburg Netherlands',
    },
    ruler: {
      'roman-gaul': 'Roman Governor',
      frankish: 'Counts of Flanders',
      duchy: 'Counts of Flanders',
      'late-medieval-france': 'Dukes of Burgundy',
    },
    summary: {
      'roman-gaul':
        'Part of Belgica Secunda, the low-lying coastal region was thinly settled but strategically important for Channel crossings.',
      frankish:
        'The County of Flanders emerged as one of the wealthiest and most urbanized territories in northern Europe, driven by the wool trade.',
      duchy:
        'Flanders was a major economic power, its cities rivaling any in Europe. Its counts were key players in the complex feudal politics between France, England, and the Empire.',
    },
    article: {
      duchy: `Flanders was medieval Europe's industrial powerhouse. Ghent, Bruges, and Ypres were among the largest and richest cities north of the Alps, driven by textile manufacturing and trade.

The counts of Flanders were technically French vassals but wielded enormous independent power. Their territory sat at the crossroads of France, England, and the Holy Roman Empire — a position that made them indispensable allies and dangerous enemies.`,
    },
    notableSettlements: ['Bruges', 'Ghent', 'Ypres', 'Lille'],
    relatedEventIds: [],
    relatedRouteIds: [],
  },
  {
    id: 'southern-england',
    slug: 'southern-england',
    historicalNames: [
      { eraId: 'roman-gaul', name: 'Britannia' },
      { eraId: 'frankish', name: 'Anglo-Saxon Kingdoms' },
      { eraId: 'viking', name: 'Wessex & Danelaw' },
      { eraId: 'duchy', name: 'Kingdom of England' },
      { eraId: 'norman-expansion', name: 'Norman England' },
      { eraId: 'late-medieval-france', name: 'Kingdom of England' },
    ],
    eraVisibility: [...ALL_ERAS],
    politicalEntity: {
      'roman-gaul': 'Roman Empire',
      frankish: 'Anglo-Saxon Heptarchy',
      viking: 'Wessex / Danelaw',
      duchy: 'Kingdom of England',
      'norman-expansion': 'Norman Kingdom of England',
      'late-medieval-france': 'Kingdom of England',
      'age-of-exploration': 'Kingdom of England',
      'seven-years-war': 'Kingdom of Great Britain',
    },
    ruler: {
      'roman-gaul': 'Roman Governor of Britannia',
      frankish: 'Anglo-Saxon Kings',
      viking: 'Alfred the Great → successors',
      duchy: 'William I the Conqueror',
      'norman-expansion': 'Norman Kings',
      'late-medieval-france': 'Plantagenet / Tudor Kings',
      'seven-years-war': 'George II / George III',
    },
    summary: {
      'roman-gaul':
        'Britannia was Rome\'s northernmost major province. Southern England was heavily Romanized with towns, roads, and villas.',
      viking:
        'Vikings carved out the Danelaw in eastern England while Wessex, under Alfred, held the south and west. The struggle shaped English identity.',
      duchy:
        'After 1066, England was ruled by a Norman dynasty. William replaced the Anglo-Saxon aristocracy, built castles, commissioned the Domesday Book, and transformed English governance.',
      'norman-expansion':
        'Norman England was a powerful, centralized kingdom whose institutions — the Exchequer, common law, castle network — became models of medieval governance.',
      'seven-years-war':
        'Britain defeated France in North America, seizing Canada and effectively ending French colonial power on the continent.',
    },
    article: {
      duchy: `The Norman Conquest of 1066 was one of the most consequential events in European history. William landed at Pevensey, defeated Harold at Hastings, and within five years had subdued all of England.

The Normans built over 500 castles, replaced nearly every English bishop and abbot with Normans, introduced feudal land tenure, and compiled the Domesday Book — a comprehensive survey of English wealth without parallel in Europe.

Yet the Conquest was also a cultural fusion. Norman French, Anglo-Saxon English, and Scandinavian traditions blended over generations into something new — the foundation of medieval English civilization.`,
    },
    notableSettlements: ['London', 'Winchester', 'Canterbury', 'Hastings', 'Dover'],
    relatedEventIds: ['battle-hastings'],
    relatedRouteIds: ['norman-conquest-1066'],
  },

  // ──────────── New World ────────────
  {
    id: 'new-france',
    slug: 'new-france',
    historicalNames: [
      { eraId: 'new-france-foundations', name: 'New France' },
      { eraId: 'royal-new-france', name: 'New France' },
      { eraId: 'atlantic-imprint', name: 'New France' },
    ],
    eraVisibility: ['new-france-foundations', 'royal-new-france', 'atlantic-imprint'],
    politicalEntity: {
      'new-france-foundations': 'Colony of New France',
      'royal-new-france': 'Colony of New France (Crown colony)',
      'atlantic-imprint': 'Colony of New France (besieged)',
    },
    ruler: {
      'new-france-foundations': 'Governor of New France / Trading companies',
      'royal-new-france': 'Governor-General of New France',
      'atlantic-imprint': 'Governor-General of New France',
    },
    summary: {
      'new-france-foundations':
        'Champlain founded Québec in 1608, anchoring a thin ribbon of French settlement along the St. Lawrence. The colony survived through the fur trade, alliances with Indigenous nations, and a trickle of settlers recruited from Normandy, Perche, and the Atlantic ports.',
      'royal-new-france':
        'Under royal control after 1663, New France grew rapidly. Jean Talon organized the Filles du Roi migration and the Carignan-Salières Regiment, tripling the colony\'s population. The seigneurial system and the Church defined colonial society.',
      'atlantic-imprint':
        'At its widest extent New France spanned a continental arc, yet the British conquest of 1759–1760 ended French rule. The people of the St. Lawrence remained; their language, parish registers, and family lines preserved a French Atlantic heritage drawn from many provinces, including a strong northwestern imprint.',
    },
    article: {
      'new-france-foundations': `New France began as a commercial venture, not a settlement colony. The fur trade drove everything — alliances, exploration, and the precarious finances that kept the colony alive.

Québec, Trois-Rivières, and Montréal formed a chain along the St. Lawrence, each serving a different function: Québec as the administrative capital and port of entry, Trois-Rivières as a fur-trade rendezvous, and Montréal (founded 1642) as both a religious mission and the gateway to the interior.

The founding population was tiny — perhaps 3,000 people by 1663. Many came from Normandy, the Perche, and the Atlantic ports. Entire families were recruited by seigneurs like Robert Giffard, creating tight-knit parish communities that would shape Québec for centuries.

Life was hard: the climate was brutal, the Iroquois wars threatened survival, and France's attention was often elsewhere. But the settlers who stayed forged a society that blended French institutions, Catholic faith, and the hard-won knowledge of the land.

Why do so many French Canadians today trace lineages through Normandy or neighbouring regions? The colony drew migrants from across France, but northwestern channels — ports, recruiters, and chain migration — fed the St. Lawrence disproportionately. A small founding pool meant those regional signals stayed visible in surnames and genealogy even though the French Atlantic world was always broader than any one province.`,
      'royal-new-france': `Royal takeover after 1663 turned New France into a state project. Intendant Jean Talon promoted industry, censuses, and aggressive settlement; shiploads of Filles du Roi and demobilized soldiers from the Carignan-Salières Regiment reshaped demography. The seigneurial grid filled in along the river, and the Church anchored parish life from birth records to education.

Embarkation increasingly ran through major royal ports — La Rochelle chief among them — while Normandy and Brittany still supplied large shares of migrants. The same structural fact holds: a limited immigrant base and parish endogamy magnified certain regional origins in modern French Canadian family trees. That helps explain why "Norman" roots feel common without meaning the colony was ethnically Norman in a medieval sense.`,
      'atlantic-imprint': `The Seven Years' War stripped France of its North American empire, but it did not erase the society that 17th- and 18th-century migration had built. Parish registers, notarial acts, and family memory kept traceable paths back to embarkation ports and, behind them, to regions such as Normandy, Perche, Brittany, and the western river valleys.

When people today speak of "Norman" ancestry in French Canada, they usually mean early modern northwestern France — maritime connections, repeated recruitment, and the demographic mathematics of a small colonial founder population — rather than a direct line to Rollo's war-band. The imprint is real; the shorthand is often oversimplified.`,
    },
    notableSettlements: ['Québec', 'Montréal', 'Trois-Rivières'],
    relatedEventIds: ['founding-quebec', 'founding-montreal'],
    relatedRouteIds: ['champlain-quebec-1608', 'st-lawrence-corridor'],
  },
  {
    id: 'new-france-core',
    slug: 'new-france-core',
    historicalNames: [
      { eraId: 'early-french-colonial', name: 'Canada' },
      { eraId: 'new-france', name: 'New France' },
      { eraId: 'seven-years-war', name: 'New France' },
    ],
    eraVisibility: ['early-french-colonial', 'new-france', 'acadia-atlantic', 'louisiana-interior', 'seven-years-war'],
    politicalEntity: {
      'early-french-colonial': 'Kingdom of France (colonial claim)',
      'new-france': 'Colony of New France',
      'acadia-atlantic': 'Colony of New France',
      'louisiana-interior': 'Colony of New France',
      'seven-years-war': 'Colony of New France (besieged)',
    },
    ruler: {
      'early-french-colonial': 'French Crown / Trading companies',
      'new-france': 'Governor-General of New France',
      'seven-years-war': 'Marquis de Vaudreuil',
    },
    summary: {
      'early-french-colonial':
        'Cartier explored the St. Lawrence in the 1530s, but permanent settlement would not come until Champlain founded Quebec in 1608.',
      'new-france':
        'The heart of French North America, stretching along the St. Lawrence from Quebec to Montreal. A thin ribbon of settlement sustained by the fur trade, the Church, and the seigneurial system.',
      'seven-years-war':
        'New France, outnumbered twenty to one by the British colonies, fought desperately but fell after the British captured Quebec in 1759.',
    },
    article: {
      'new-france': `New France was never a mass-settlement colony. By 1760, its population was roughly 70,000 — a fraction of the 1.5 million in British North America. Yet this small population controlled a vast territory through alliances with Indigenous nations, the fur trade, and a network of forts and missions stretching from the Atlantic to the Great Lakes and down the Mississippi.

The colony's society was shaped by the seigneurial land system, the Catholic Church, and the fur trade. Habitants farmed long, narrow lots along the St. Lawrence while coureurs des bois ventured deep into the interior.

Quebec and Montreal anchored the colony — one as the administrative and military capital, the other as the commercial gateway to the interior.

Most colonists arrived from Atlantic France before 1760; northwestern regions (including Normandy) and the western ports appear repeatedly in immigrant studies, so many present-day French Canadian lineages pass through those areas — a demographic pattern, not proof that the colony was ethnically homogeneous.`,
    },
    notableSettlements: ['Quebec City', 'Montreal', 'Trois-Rivières'],
    relatedEventIds: ['founding-quebec', 'founding-montreal', 'fall-of-quebec'],
    relatedRouteIds: ['champlain-quebec-1608', 'st-lawrence-corridor', 'atlantic-trade-route'],
  },
  {
    id: 'acadia',
    slug: 'acadia',
    historicalNames: [
      { eraId: 'early-french-colonial', name: 'Acadia' },
      { eraId: 'new-france', name: 'Acadia' },
      { eraId: 'new-france-foundations', name: 'Acadia' },
      { eraId: 'royal-new-france', name: 'Acadia' },
      { eraId: 'acadia-atlantic', name: 'Acadia' },
      { eraId: 'seven-years-war', name: 'Nova Scotia' },
    ],
    eraVisibility: ['early-french-colonial', 'new-france', 'new-france-foundations', 'royal-new-france', 'acadia-atlantic', 'seven-years-war'],
    politicalEntity: {
      'early-french-colonial': 'Kingdom of France (colonial claim)',
      'new-france': 'Colony of Acadia',
      'new-france-foundations': 'Colony of Acadia',
      'royal-new-france': 'Colony of Acadia',
      'acadia-atlantic': 'Colony of Acadia',
      'seven-years-war': 'British Nova Scotia',
    },
    ruler: {
      'early-french-colonial': 'Pierre Dugua de Mons',
      'new-france-foundations': 'French Governor of Acadia',
      'royal-new-france': 'French Governor of Acadia',
      'acadia-atlantic': 'French Governor of Acadia',
      'seven-years-war': 'British Crown',
    },
    summary: {
      'early-french-colonial':
        'The first French settlement in North America — Port Royal, founded in 1605 — anchored a scattered network of fishing, farming, and trading communities.',
      'new-france-foundations':
        'Port Royal and its surrounding settlements formed the nucleus of Acadia — a frontier society built on farming, fishing, and trade with the Mi\'kmaq. Repeatedly fought over by France and England.',
      'royal-new-france':
        'Acadia grew slowly under French rule, its population developing a distinct Acadian identity. The fortress of Louisbourg rose on Cape Breton after 1713 as France\'s Atlantic sentinel.',
      'acadia-atlantic':
        'Acadia was a contested borderland between French and British claims. Its population — the Acadians — developed a distinct identity rooted in marshland farming and the fisheries.',
      'seven-years-war':
        'The British expelled most of the Acadian population in the Grand Dérangement (1755–1764), one of the era\'s great forced migrations.',
    },
    article: {
      'acadia-atlantic': `Acadia occupied the maritime fringes of French North America — present-day Nova Scotia, New Brunswick, Prince Edward Island, and parts of Maine. Its settlers, the Acadians, created a distinctive society based on dyked marshland agriculture, the cod fishery, and trade with Indigenous peoples.

Geographically exposed and strategically vital, Acadia changed hands between France and England multiple times. The fortress of Louisbourg, built on Cape Breton after 1713, was France's answer to British naval dominance in the region.

The Acadian expulsion of 1755 scattered the population to Louisiana, France, and other colonies — a diaspora that shaped Cajun culture and remains central to Acadian memory.`,
    },
    notableSettlements: ['Port Royal', 'Louisbourg'],
    relatedEventIds: ['founding-port-royal'],
    relatedRouteIds: [],
  },
  {
    id: 'atlantic-basin',
    slug: 'atlantic-basin',
    historicalNames: [
      { eraId: 'age-of-exploration', name: 'North Atlantic' },
      { eraId: 'new-france-foundations', name: 'North Atlantic' },
      { eraId: 'royal-new-france', name: 'North Atlantic' },
    ],
    eraVisibility: ['age-of-exploration', 'new-france-foundations', 'royal-new-france'],
    politicalEntity: {
      'age-of-exploration': 'Contested waters',
      'new-france-foundations': 'French / English / Dutch maritime space',
      'royal-new-france': 'French / English maritime space',
    },
    ruler: {},
    summary: {
      'age-of-exploration':
        'The North Atlantic was the highway connecting France to its claims in the New World. Norman, Breton, and Basque fishermen had worked the Grand Banks since the late 1400s.',
      'new-france-foundations':
        'Crossings took six to twelve weeks depending on weather and season. Ships departed La Rochelle, Dieppe, or Honfleur in spring and returned in autumn, carrying furs back to France.',
      'royal-new-france':
        'The Atlantic shuttle intensified under royal administration. Convoys carried soldiers, Filles du Roi, supplies, and correspondence, while returning with beaver pelts and colonial products.',
    },
    article: {},
    notableSettlements: [],
    relatedEventIds: [],
    relatedRouteIds: [],
  },
  {
    id: 'louisiana-colony',
    slug: 'louisiana-colony',
    historicalNames: [
      { eraId: 'louisiana-interior', name: 'Louisiane' },
      { eraId: 'seven-years-war', name: 'Louisiane' },
    ],
    eraVisibility: ['louisiana-interior', 'seven-years-war'],
    politicalEntity: {
      'louisiana-interior': 'Colony of Louisiana (France)',
      'seven-years-war': 'Colony of Louisiana (ceded to Spain, 1762)',
    },
    ruler: {
      'louisiana-interior': 'Governor of Louisiana',
      'seven-years-war': 'French → Spanish Crown',
    },
    summary: {
      'louisiana-interior':
        'La Salle claimed the Mississippi basin for France in 1682. Louisiana grew slowly around New Orleans, Mobile, and a chain of forts linking the Gulf to the Great Lakes.',
      'seven-years-war':
        'France secretly ceded Louisiana to Spain in 1762 to keep it from British hands. The colony\'s French character persisted for decades under Spanish rule.',
    },
    article: {
      'louisiana-interior': `Louisiana was the ambitious southern anchor of New France's continental strategy — a chain of forts and settlements linking the Great Lakes fur trade to the Gulf of Mexico via the Mississippi River.

New Orleans, founded in 1718, became the colony's capital and its only significant urban center. The rest of Louisiana was thinly settled — a scattering of forts, missions, and plantation concessions sustained by enslaved labor, trade with Indigenous nations, and subsidies from France.

Louisiana's cultural legacy endures in the Creole and Cajun traditions of the Gulf Coast.`,
    },
    notableSettlements: ['New Orleans', 'Mobile'],
    relatedEventIds: ['la-salle-mississippi'],
    relatedRouteIds: ['mississippi-corridor'],
  },
];

export function getRegionRecord(id: string): RegionRecord | undefined {
  return regionRecords.find((r) => r.id === id);
}
