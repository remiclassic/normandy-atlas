import type { AtlasRegion } from '@/core/types';

export const atlasRegions: AtlasRegion[] = [
  // ── Pre-Roman tribal / cultural regions ───────────────────────────
  {
    id: 'normandy-neolithic-zone',
    name: { en: 'Armorican Coastal Plain', fr: 'Plaine côtière armoricaine', it: 'Pianura costiera armoricana' },
    layer: 'europe',
    geometryRef: 'region-normandy-neolithic-zone',
    eraStates: {
      'neolithic-normandy': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'culture' },
      'bronze-age-channel': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
    },
    narrativeByEra: {
      'neolithic-normandy': {
        en: 'The coastal plains and river terraces of future Normandy supported some of northern Europe\'s earliest farming communities. Megalithic monuments — dolmens, menhirs, and allées couvertes — marked sacred sites and territorial boundaries across the landscape, especially along the Cotentin peninsula and the limestone plateaus of the Pays de Caux.',
        fr: 'Les plaines côtières et les terrasses fluviales de la future Normandie accueillirent certaines des premières communautés agricoles d\'Europe du Nord. Des monuments mégalithiques — dolmens, menhirs et allées couvertes — marquaient les sites sacrés et les limites territoriales à travers le paysage, particulièrement le long de la presqu\'île du Cotentin et des plateaux calcaires du Pays de Caux.',
        it: 'Le pianure costiere e le terrazze fluviali della futura Normandia ospitarono tra le prime comunità agricole dell\'Europa settentrionale. Monumenti megalitici — dolmen, menhir e allées couvertes — segnavano luoghi sacri e confini territoriali nel paesaggio, in particolare lungo la penisola del Cotentin e i plateau calcarei del Pays de Caux.',
      },
    },
  },
  {
    id: 'channel-islands-neolithic',
    name: { en: 'Channel Islands', fr: 'Îles Anglo-Normandes', it: 'Isole del Canale' },
    layer: 'europe',
    geometryRef: 'region-channel-islands-neolithic',
    eraStates: {
      'neolithic-normandy': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'bronze-age-channel': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'culture' },
    },
    narrativeByEra: {
      'neolithic-normandy': {
        en: 'The Channel Islands shared the same Atlantic-facing megalithic world as the Cotentin coast. Passage graves such as La Hougue Bie in Jersey rank among the finest Neolithic monuments in western Europe.',
        fr: 'Les îles Anglo-Normandes participaient au même monde mégalithique atlantique que la côte du Cotentin. Des tombes à couloir comme La Hougue Bie à Jersey comptent parmi les plus beaux monuments néolithiques d\'Europe occidentale.',
        it: 'Le Isole del Canale condividevano lo stesso mondo megalitico atlantico della costa del Cotentin. Tombe a corridoio come La Hougue Bie a Jersey figurano tra i più bei monumenti neolitici dell\'Europa occidentale.',
      },
    },
  },
  {
    id: 'channel-trade-zone',
    name: { en: 'Channel Trade Corridor', fr: 'Corridor commercial de la Manche', it: 'Corridoio commerciale della Manica' },
    layer: 'europe',
    geometryRef: 'region-channel-trade-zone',
    eraStates: {
      'bronze-age-channel': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'frontier' },
    },
    narrativeByEra: {
      'bronze-age-channel': {
        en: 'The English Channel functioned as a maritime highway long before the Vikings. Tin from Cornwall, copper from Iberia, and amber from the Baltic all passed through Channel waters. Normandy\'s coast was a natural waypoint — the same harbours and estuaries that later received Viking longships had already served Bronze Age trading vessels for over a millennium.',
        fr: 'La Manche fonctionnait comme une autoroute maritime bien avant les Vikings. L\'étain de Cornouailles, le cuivre d\'Ibérie et l\'ambre de la Baltique traversaient tous les eaux de la Manche. La côte normande était un point de passage naturel — les mêmes ports et estuaires qui recevraient plus tard les drakkars vikings avaient déjà servi aux navires marchands de l\'âge du bronze pendant plus d\'un millénaire.',
        it: 'La Manica fungeva da grande via marittima molto prima dei vichinghi. Stagno della Cornovaglia, rame dall\'Iberia e ambra dal Baltico attraversavano quelle acque. La costa normanna era un punto di passaggio naturale: gli stessi porti ed estuari che avrebbero accolto le navi vichinghe avevano già servito, per oltre un millennio, le imbarcazioni mercantili dell\'età del bronzo.',
      },
    },
  },
  {
    id: 'caletes',
    name: { en: 'Caletes', fr: 'Calètes', it: 'Caleti' },
    layer: 'europe',
    geometryRef: 'region-caletes',
    eraStates: {
      'iron-age-gaul': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'polity' },
      'roman-gaul': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
    },
    narrativeByEra: {
      'iron-age-gaul': {
        en: 'The Caletes controlled the Pays de Caux — the chalk plateau between the Seine estuary and the Bresle river. Their territory gave them access to both Channel trade and the rich fishing grounds off the coast. Their capital may have been near modern Lillebonne, later the Roman Juliobona.',
        fr: 'Les Calètes contrôlaient le Pays de Caux — le plateau crayeux entre l\'estuaire de la Seine et la Bresle. Leur territoire leur donnait accès au commerce de la Manche et aux riches zones de pêche au large. Leur capitale se trouvait peut-être près de l\'actuelle Lillebonne, future Juliobona romaine.',
        it: 'I Caleti controllavano il Pays de Caux — l\'altopiano calcareo tra l\'estuario della Senna e la Bresle. Il loro territorio dava accesso al commercio della Manica e a ricche zone di pesca al largo. La capitale poteva trovarsi presso l\'attuale Lillebonne, poi Juliobona romana.',
      },
    },
  },
  {
    id: 'veliocasses',
    name: { en: 'Veliocasses', fr: 'Véliocasses', it: 'Veliocassi' },
    layer: 'europe',
    geometryRef: 'region-veliocasses',
    eraStates: {
      'iron-age-gaul': { visibility: 'emphasized', borderStyle: 'hard', fillIntent: 'polity' },
      'roman-gaul': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
    },
    narrativeByEra: {
      'iron-age-gaul': {
        en: 'The Veliocasses were a powerful Gaulish tribe commanding the Seine valley around their capital Rotomagus (modern Rouen). Control of the Seine gave them a dominant position in inland trade. Their territory would later become the heartland of the Roman civitas of the Veliocasses and, centuries after, the core of the Viking colony that became Normandy.',
        fr: 'Les Véliocasses étaient une puissante tribu gauloise dominant la vallée de la Seine autour de leur capitale Rotomagus (Rouen actuel). Le contrôle de la Seine leur donnait une position dominante dans le commerce intérieur. Leur territoire deviendrait plus tard le cœur de la civitas romaine des Véliocasses puis, des siècles après, le noyau de la colonie viking devenue la Normandie.',
        it: 'I Veliocassi erano una potente tribù gallica che dominava la valle della Senna attorno alla capitale Rotomagus (l\'odierna Rouen). Il controllo della Senna assicurava una posizione dominante nel commercio interno. Il loro territorio divenne poi il cuore della civitas romana dei Veliocassi e, secoli dopo, il nucleo della colonia vichinga che si trasformò in Normandia.',
      },
    },
  },
  {
    id: 'unelli',
    name: { en: 'Unelli', fr: 'Unelles', it: 'Unelli' },
    layer: 'europe',
    geometryRef: 'region-unelli',
    eraStates: {
      'iron-age-gaul': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'polity' },
      'roman-gaul': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
    },
    narrativeByEra: {
      'iron-age-gaul': {
        en: 'The Unelli occupied the Cotentin peninsula and its hinterland. Their strategic position gave them control over Channel crossings to Britain. Under Viridovix, they resisted Caesar\'s conquest in 56 BC before being subdued. Their capital may have been at Cosedia, later Coutances under Roman rule.',
        fr: 'Les Unelles occupaient la presqu\'île du Cotentin et son arrière-pays. Leur position stratégique leur donnait le contrôle des traversées de la Manche vers la Bretagne. Sous Viridovix, ils résistèrent à la conquête de César en 56 av. J.-C. avant d\'être soumis. Leur capitale se trouvait peut-être à Cosedia, future Coutances sous domination romaine.',
        it: 'Gli Unelli occupavano la penisola del Cotentin e il suo entroterra. La posizione strategica consentiva di controllare le traversate della Manica verso la Britannia. Sotto Viridovice resistettero alla conquista di Cesare nel 56 a.C. prima di essere sottomessi. La capitale poteva essere a Cosedia, poi Coutances sotto il dominio romano.',
      },
    },
  },
  {
    id: 'abrincates',
    name: { en: 'Abrincates', fr: 'Abrincates', it: 'Abrincati' },
    layer: 'europe',
    geometryRef: 'region-abrincates',
    eraStates: {
      'iron-age-gaul': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'polity' },
      'roman-gaul': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
    },
    narrativeByEra: {
      'iron-age-gaul': {
        en: 'The Abrincates held the bay of Mont-Saint-Michel and the rolling country around Avranches. Smaller than their neighbours, they nonetheless controlled a key coastal zone connecting Brittany to the rest of Gaul. Their name survived in the city of Avranches — Abrincae in Latin.',
        fr: 'Les Abrincates tenaient la baie du Mont-Saint-Michel et le bocage autour d\'Avranches. Plus petits que leurs voisins, ils contrôlaient néanmoins une zone côtière clé reliant la Bretagne au reste de la Gaule. Leur nom survécut dans la ville d\'Avranches — Abrincae en latin.',
        it: 'Gli Abrincati controllavano la baia del Mont-Saint-Michel e la campagna intorno ad Avranches. Pur più piccoli dei vicini, dominavano una fascia costiera cruciale tra la Bretagna e il resto della Gallia. Il nome sopravvisse nella città di Avranches — Abrincae in latino.',
      },
    },
  },
  {
    id: 'lugdunensis-secunda',
    name: { en: 'Lugdunensis Secunda', fr: 'Lyonnaise seconde', it: 'Lugdunensis secunda' },
    layer: 'europe',
    geometryRef: 'region-lugdunensis-secunda',
    eraStates: {
      'roman-gaul': { visibility: 'emphasized', borderStyle: 'hard', fillIntent: 'polity' },
    },
    narrativeByEra: {
      'roman-gaul': {
        en: 'The Roman province of Lugdunensis Secunda encompassed most of what would become Normandy. Rotomagus (Rouen) served as provincial capital, connected by Roman roads to Lutetia (Paris) and the Channel ports. Roman infrastructure — roads, aqueducts, amphitheatres — overlaid the Celtic landscape, but tribal identities persisted beneath a thin Roman veneer well into the 4th century.',
        fr: 'La province romaine de Lyonnaise seconde englobait l\'essentiel de la future Normandie. Rotomagus (Rouen) en était la capitale provinciale, reliée par les voies romaines à Lutetia (Paris) et aux ports de la Manche. Les infrastructures romaines — routes, aqueducs, amphithéâtres — se superposèrent au paysage celte, mais les identités tribales persistèrent sous un mince vernis romain jusqu\'au IVe siècle.',
        it: 'La provincia romana della Lugdunensis secunda comprendeva gran parte della futura Normandia. Rotomagus (Rouen) ne era la capitale, collegata da strade romane a Lutetia (Parigi) e ai porti della Manica. Strade, acquedotti, anfiteatri si sovrapposero al paesaggio celtico, ma le identità tribali persistettero sotto un sottile velo romano fino al IV secolo.',
      },
    },
  },
  // ── Post-Roman → Medieval regions ─────────────────────────────────
  {
    id: 'neustria',
    name: { en: 'Neustria', fr: 'Neustrie', it: 'Neustria' },
    layer: 'europe',
    geometryRef: 'region-neustria',
    eraStates: {
      'post-roman-gaul': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'frontier' },
      'neustria': { visibility: 'emphasized', borderStyle: 'hard', fillIntent: 'polity' },
      'frankish-carolingian': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'polity' },
    },
    narrativeByEra: {
      'frankish-carolingian': {
        en: 'Under the Carolingians, Neustria lost its identity as a rival sub-kingdom and was absorbed into the broader Frankish empire. The Loire valley and its western cities — especially Nantes — became a frontier zone facing the semi-independent Breton kingdom, while the Seine corridor served as the administrative backbone linking Paris to Channel trade routes.',
        fr: 'Sous les Carolingiens, la Neustrie perdit son identité de sous-royaume rival et fut absorbée dans l\'empire franc. La vallée de la Loire et ses villes occidentales — notamment Nantes — devinrent une zone frontière face au royaume breton semi-indépendant, tandis que le corridor de la Seine servait d\'épine dorsale administrative reliant Paris aux routes commerciales de la Manche.',
        it: 'Sotto i Carolingi la Neustria perse il ruolo di sottoregno rivale e fu assorbita nell\'impero franco. La valle della Loira e le città d\'occidente — in particolare Nantes — divennero zona di frontiera verso il regno bretone semi-indipendente, mentre il corridoio della Senna fungeva da spina dorsale amministrativa tra Parigi e le rotte commerciali della Manica.',
      },
    },
  },
  {
    id: 'lower-seine',
    name: { en: 'Lower Seine', fr: 'Basse-Seine', it: 'Bassa Senna' },
    layer: 'europe',
    geometryRef: 'region-lower-seine',
    eraStates: {
      'iron-age-gaul': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'neutral' },
      'roman-gaul': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'post-roman-gaul': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'neutral' },
      'neustria': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'frankish-carolingian': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'viking-age': { visibility: 'emphasized', borderStyle: 'disputed', fillIntent: 'contested' },
      'norman-origins': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'culture' },
    },
    narrativeByEra: {
      'frankish-carolingian': {
        en: 'The lower Seine was the economic heart of Carolingian Neustria. Great royal abbeys — Jumièges, Saint-Wandrille, Fontenelle — controlled vast estates along the river, generating tolls, tithes, and manuscript production. Rouen served as the main urban node connecting this monastic wealth to the Channel and to Paris. This concentration of undefended riches along a single navigable waterway would prove catastrophic once Norse raiders discovered it.',
        fr: 'La basse Seine était le cœur économique de la Neustrie carolingienne. De grandes abbayes royales — Jumièges, Saint-Wandrille, Fontenelle — contrôlaient de vastes domaines le long du fleuve, générant péages, dîmes et production de manuscrits. Rouen servait de nœud urbain principal reliant cette richesse monastique à la Manche et à Paris. Cette concentration de richesses non défendues le long d\'une seule voie navigable s\'avérerait catastrophique dès que les raiders scandinaves la découvriraient.',
        it: 'La bassa Senna era il cuore economico della Neustria carolingia. Grandi abbazie reali — Jumièges, Saint-Wandrille, Fontenelle — controllavano vasti domini lungo il fiume, generando pedaggi, decime e produzione di manoscritti. Rouen era il principale nodo urbano tra questa ricchezza monastica, la Manica e Parigi. La concentrazione di ricchezze poco difese lungo un\'unica via navigabile si rivelò catastrofica quando i predoni norreni la scoprirono.',
      },
    },
  },
  {
    id: 'frankish-core',
    name: { en: 'Frankish Heartland', fr: 'Cœur franc', it: 'Cuore franco' },
    layer: 'europe',
    geometryRef: 'region-frankish-core',
    eraStates: {
      'roman-gaul': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'neutral' },
      'post-roman-gaul': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'polity' },
      'neustria': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'polity' },
      'frankish-carolingian': { visibility: 'emphasized', borderStyle: 'hard', fillIntent: 'polity' },
      'viking-age': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'pressure' },
    },
    narrativeByEra: {
      'frankish-carolingian': {
        en: 'The Île-de-France around Paris was the political centre of gravity for the Carolingian empire\'s western territories. Royal palaces, chanceries, and assemblies operated from this core, projecting authority outward along the Seine and Loire. When the empire fractured after 840, control of this heartland determined who could claim the crown of West Francia — and who could not defend its rivers.',
        fr: 'L\'Île-de-France autour de Paris était le centre de gravité politique des territoires occidentaux de l\'empire carolingien. Palais royaux, chancelleries et assemblées opéraient depuis ce cœur, projetant l\'autorité le long de la Seine et de la Loire. Lorsque l\'empire se fractura après 840, le contrôle de ce cœur détermina qui pouvait revendiquer la couronne de Francie occidentale — et qui ne pouvait défendre ses fleuves.',
        it: 'L\'Île-de-France intorno a Parigi era il centro di gravità politico dei territori occidentali dell\'impero carolingio. Palazzi, cancellerie e assemblee operavano da quel nucleo, proiettando l\'autorità lungo Senna e Loira. Quando l\'impero si fratturò dopo l\'840, il controllo di questa terra di cuore decise chi poteva rivendicare la corona della Francia occidentale — e chi non riusciva a difendere i fiumi.',
      },
    },
  },
  {
    id: 'channel-coast',
    name: { en: 'Channel Coast', fr: 'Côte de la Manche', it: 'Costa della Manica' },
    layer: 'europe',
    geometryRef: 'region-channel-coast',
    eraStates: {
      'bronze-age-channel': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'frontier' },
      'iron-age-gaul': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'frontier' },
      'roman-gaul': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'frontier' },
      'frankish-carolingian': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'frontier' },
      'viking-age': { visibility: 'emphasized', borderStyle: 'disputed', fillIntent: 'contested' },
      'norman-origins': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
    },
    narrativeByEra: {
      'frankish-carolingian': {
        en: 'The northern Channel coast was Carolingian Gaul\'s main interface with North Sea trade. The emporium at Quentovic — near modern Étaples — handled cross-Channel commerce with Anglo-Saxon England and Frisian merchants. Charlemagne invested in coastal defence, but after 840 these exposed shores became the first targets for Scandinavian raiding fleets.',
        fr: 'La côte nord de la Manche était la principale interface de la Gaule carolingienne avec le commerce de la mer du Nord. L\'emporium de Quentovic — près de l\'actuel Étaples — gérait le commerce transmanche avec l\'Angleterre anglo-saxonne et les marchands frisons. Charlemagne investit dans la défense côtière, mais après 840 ces rivages exposés devinrent les premières cibles des flottes de raiders scandinaves.',
        it: 'La costa settentrionale della Manica era il principale punto di scambio della Gallia carolingia con il commercio del Mare del Nord. L\'emporion di Quentovic — presso l\'odierna Étaples — gestiva il traffico transmanicano con l\'Inghilterra anglosassone e i mercanti frisoni. Carlo Magno investì nella difesa costiera, ma dopo l\'840 quelle rive esposte furono tra i primi obiettivi delle flotte scandinave di razziatori.',
      },
    },
  },
  {
    id: 'normandy',
    name: { en: 'Normandy', fr: 'Normandie', it: 'Normandia' },
    layer: 'europe',
    geometryRef: 'region-normandy',
    eraStates: {
      'viking-age': { visibility: 'faded', borderStyle: 'disputed', fillIntent: 'contested' },
      'norman-origins': { visibility: 'emphasized', borderStyle: 'hard', fillIntent: 'culture' },
      'norman-expansion': { visibility: 'emphasized', borderStyle: 'hard', fillIntent: 'polity' },
      'age-of-exploration': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'new-france-foundations': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'royal-new-france': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'atlantic-imprint': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'culture' },
    },
  },
  {
    id: 'perche',
    name: { en: 'Perche', fr: 'Perche', it: 'Perche' },
    layer: 'europe',
    geometryRef: 'region-perche',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'new-france-foundations': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'pressure' },
      'royal-new-france': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'pressure' },
    },
  },
  {
    id: 'aunis',
    name: { en: 'Aunis / La Rochelle', fr: 'Aunis / La Rochelle', it: 'Aunis / La Rochelle' },
    layer: 'europe',
    geometryRef: 'region-aunis',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'new-france-foundations': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'polity' },
      'royal-new-france': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'polity' },
    },
  },
  {
    id: 'brittany',
    name: { en: 'Brittany', fr: 'Bretagne', it: 'Bretagna' },
    layer: 'europe',
    geometryRef: 'region-brittany',
    eraStates: {
      'age-of-exploration': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'new-france-foundations': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
      'royal-new-france': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'culture' },
    },
  },
  {
    id: 'new-france',
    name: { en: 'New France', fr: 'Nouvelle-France', it: 'Nuova Francia' },
    layer: 'americas',
    geometryRef: 'region-new-france',
    eraStates: {
      'new-france-foundations': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'polity' },
      'royal-new-france': { visibility: 'emphasized', borderStyle: 'hard', fillIntent: 'polity' },
      'atlantic-imprint': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'polity' },
    },
  },
  {
    id: 'acadia',
    name: { en: 'Acadia', fr: 'Acadie', it: 'Acadia' },
    layer: 'americas',
    geometryRef: 'region-acadia',
    eraStates: {
      'new-france-foundations': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'polity' },
      'royal-new-france': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'polity' },
      'atlantic-imprint': { visibility: 'normal', borderStyle: 'disputed', fillIntent: 'pressure' },
    },
  },
  {
    id: 'ile-royale',
    name: { en: 'Île Royale & Île Saint-Jean', fr: 'Île Royale & Île Saint-Jean', it: 'Île Royale e Île Saint-Jean' },
    layer: 'americas',
    geometryRef: 'region-ile-royale',
    eraStates: {
      'atlantic-imprint': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'polity' },
    },
  },
  {
    id: 'atlantic-basin',
    name: { en: 'North Atlantic', fr: 'Atlantique Nord', it: 'Atlantico del Nord' },
    layer: 'atlantic',
    geometryRef: 'region-atlantic-basin',
    eraStates: {
      'age-of-exploration': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'neutral' },
      'new-france-foundations': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'neutral' },
      'royal-new-france': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'neutral' },
    },
  },
  // ── Viking-era influence zones (probabilistic, soft geometry) ───────
  {
    id: 'danelaw',
    name: { en: 'Danelaw', fr: 'Danelaw', it: 'Danelaw' },
    layer: 'europe',
    geometryRef: 'region-danelaw',
    eraStates: {
      'viking-age': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'pressure' },
      'norman-origins': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'pressure' },
    },
    narrativeByEra: {
      'viking-age': {
        en: 'After the Great Heathen Army invaded in 865, much of eastern and northern England fell under Scandinavian law and settlement — the Danelaw. York (Jórvík) became its political capital. This zone of Norse influence persisted into the 11th century and shaped the Anglo-Saxon response that would eventually unify England.',
        fr: 'Après l\'invasion de la Grande Armée païenne en 865, une grande partie de l\'est et du nord de l\'Angleterre passa sous loi et colonisation scandinave — le Danelaw. York (Jórvík) en devint la capitale politique.',
        it: 'Dopo l\'invasione della Grande armata pagana nell\'865, gran parte dell\'Inghilterra orientale e settentrionale passò sotto legge e insediamento scandinavo — il Danelaw. York (Jórvík) ne divenne la capitale politica. Questa zona d\'influenza norrena perdurò fino all\'XI secolo e plasmò la reazione anglosassone che avrebbe infine unificato l\'Inghilterra.',
      },
    },
  },
  {
    id: 'norse-gaelic-sphere',
    name: { en: 'Norse-Gaelic Sphere', fr: 'Sphère norso-gaélique', it: 'Sfera norreno-gaelica' },
    layer: 'europe',
    geometryRef: 'region-norse-gaelic-sphere',
    eraStates: {
      'viking-age': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'pressure' },
      'norman-origins': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'pressure' },
    },
    narrativeByEra: {
      'viking-age': {
        en: 'Norwegian Vikings established a network of bases across Scotland, the Hebrides, Ireland, and the Isle of Man from the late 8th century. Dublin, Orkney, and the Hebrides formed a maritime power sphere where Norse and Gaelic cultures merged into a distinct Norse-Gaelic identity.',
        fr: 'Les Vikings norvégiens établirent un réseau de bases à travers l\'Écosse, les Hébrides, l\'Irlande et l\'île de Man dès la fin du VIIIe siècle. Dublin, les Orcades et les Hébrides formèrent une sphère de pouvoir maritime où les cultures scandinave et gaélique fusionnèrent.',
        it: 'I vichinghi norvegesi crearono una rete di basi tra Scozia, Ebridi, Irlanda e Isola di Man dalla fine dell\'VIII secolo. Dublino, Orcadi ed Ebridi formarono una sfera di potere marittimo in cui culture norrena e gaelica si fusero in un\'identità norreno-gaelica distinta.',
      },
    },
  },
  {
    id: 'kievan-rus-zone',
    name: { en: 'Kievan Rus', fr: 'Rus de Kiev', it: 'Rus\' di Kiev' },
    layer: 'europe',
    geometryRef: 'region-kievan-rus-zone',
    eraStates: {
      'viking-age': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'pressure' },
      'norman-origins': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'pressure' },
    },
    narrativeByEra: {
      'viking-age': {
        en: 'Varangian traders and warriors established control over the Russian river system from the mid-9th century. The Rurikid dynasty founded a polity stretching from Novgorod to Kiev, controlling the lucrative trade routes between the Baltic and the Byzantine and Islamic worlds.',
        fr: 'Les marchands et guerriers varègues établirent le contrôle du réseau fluvial russe dès le milieu du IXe siècle. La dynastie des Riourikides fonda une entité politique s\'étendant de Novgorod à Kiev.',
        it: 'Mercenari e guerrieri variaghi imposero il controllo sulla rete fluviale russa dalla metà del IX secolo. La dinastia dei Rjurikidi fondò un\'entità politica da Novgorod a Kiev, dominando le redditizie rotte commerciali tra Baltico, mondo bizantino e islamico.',
      },
    },
  },
  // ── Colonial settlement zones (migration explorer) ─────────────────
  {
    id: 'colony-zone-quebec',
    name: { en: 'Québec Region', fr: 'Région de Québec', it: 'Regione di Québec' },
    layer: 'americas',
    geometryRef: 'region-colony-zone-quebec',
    eraStates: {
      'new-france-foundations': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'polity' },
      'royal-new-france': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'polity' },
    },
    narrativeByEra: {
      'new-france-foundations': {
        en: 'The Québec region — including Côte-de-Beaupré, Île d\'Orléans, and Beauport — was the earliest and densest settlement corridor, anchored by Champlain\'s 1608 habitation.',
        fr: 'La région de Québec — incluant la Côte-de-Beaupré, l\'Île d\'Orléans et Beauport — fut le premier et le plus dense corridor de peuplement.',
        it: 'La regione di Québec — con la Côte-de-Beaupré, l\'Île d\'Orléans e Beauport — fu il primo e più denso corridoio di insediamento, ancorato all\'abitazione fondata da Champlain nel 1608.',
      },
    },
  },
  {
    id: 'colony-zone-trois-rivieres',
    name: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières', it: 'Regione di Trois-Rivières' },
    layer: 'americas',
    geometryRef: 'region-colony-zone-trois-rivieres',
    eraStates: {
      'new-france-foundations': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'polity' },
      'royal-new-france': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'polity' },
    },
    narrativeByEra: {
      'new-france-foundations': {
        en: 'Founded in 1634, Trois-Rivières served as a fur-trade hub and middle anchor of the St. Lawrence corridor between Québec and Montréal.',
        fr: 'Fondée en 1634, Trois-Rivières servait de plaque tournante du commerce des fourrures entre Québec et Montréal.',
        it: 'Fondata nel 1634, Trois-Rivières fungeva da snodo del commercio delle pellicce e da ancoraggio intermedio del corridoio del San Lorenzo tra Québec e Montréal.',
      },
    },
  },
  {
    id: 'colony-zone-montreal',
    name: { en: 'Montréal Region', fr: 'Région de Montréal', it: 'Regione di Montréal' },
    layer: 'americas',
    geometryRef: 'region-colony-zone-montreal',
    eraStates: {
      'new-france-foundations': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'polity' },
      'royal-new-france': { visibility: 'faded', borderStyle: 'soft', fillIntent: 'polity' },
    },
    narrativeByEra: {
      'new-france-foundations': {
        en: 'Ville-Marie (Montréal) was founded in 1642 as a missionary outpost and grew into the colony\'s western anchor, gateway to the fur-trade interior.',
        fr: 'Ville-Marie (Montréal) fut fondée en 1642 comme avant-poste missionnaire et devint la porte d\'entrée vers l\'intérieur des fourrures.',
        it: 'Ville-Marie (Montréal) fu fondata nel 1642 come avamposto missionario e divenne l\'ancora occidentale della colonia, porta verso l\'interno del commercio delle pellicce.',
      },
    },
  },
];
