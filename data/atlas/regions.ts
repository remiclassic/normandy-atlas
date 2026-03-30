import type { AtlasRegion } from '@/core/types';

export const atlasRegions: AtlasRegion[] = [
  // ── Pre-Roman tribal / cultural regions ───────────────────────────
  {
    id: 'normandy-neolithic-zone',
    name: { en: 'Armorican Coastal Plain', fr: 'Plaine côtière armoricaine' },
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
      },
    },
  },
  {
    id: 'channel-trade-zone',
    name: { en: 'Channel Trade Corridor', fr: 'Corridor commercial de la Manche' },
    layer: 'europe',
    geometryRef: 'region-channel-trade-zone',
    eraStates: {
      'bronze-age-channel': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'frontier' },
    },
    narrativeByEra: {
      'bronze-age-channel': {
        en: 'The English Channel functioned as a maritime highway long before the Vikings. Tin from Cornwall, copper from Iberia, and amber from the Baltic all passed through Channel waters. Normandy\'s coast was a natural waypoint — the same harbours and estuaries that later received Viking longships had already served Bronze Age trading vessels for over a millennium.',
        fr: 'La Manche fonctionnait comme une autoroute maritime bien avant les Vikings. L\'étain de Cornouailles, le cuivre d\'Ibérie et l\'ambre de la Baltique traversaient tous les eaux de la Manche. La côte normande était un point de passage naturel — les mêmes ports et estuaires qui recevraient plus tard les drakkars vikings avaient déjà servi aux navires marchands de l\'âge du bronze pendant plus d\'un millénaire.',
      },
    },
  },
  {
    id: 'caletes',
    name: { en: 'Caletes', fr: 'Calètes' },
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
      },
    },
  },
  {
    id: 'veliocasses',
    name: { en: 'Veliocasses', fr: 'Véliocasses' },
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
      },
    },
  },
  {
    id: 'unelli',
    name: { en: 'Unelli', fr: 'Unelles' },
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
      },
    },
  },
  {
    id: 'abrincates',
    name: { en: 'Abrincates', fr: 'Abrincates' },
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
      },
    },
  },
  {
    id: 'lugdunensis-secunda',
    name: { en: 'Lugdunensis Secunda', fr: 'Lyonnaise seconde' },
    layer: 'europe',
    geometryRef: 'region-lugdunensis-secunda',
    eraStates: {
      'roman-gaul': { visibility: 'emphasized', borderStyle: 'hard', fillIntent: 'polity' },
    },
    narrativeByEra: {
      'roman-gaul': {
        en: 'The Roman province of Lugdunensis Secunda encompassed most of what would become Normandy. Rotomagus (Rouen) served as provincial capital, connected by Roman roads to Lutetia (Paris) and the Channel ports. Roman infrastructure — roads, aqueducts, amphitheatres — overlaid the Celtic landscape, but tribal identities persisted beneath a thin Roman veneer well into the 4th century.',
        fr: 'La province romaine de Lyonnaise seconde englobait l\'essentiel de la future Normandie. Rotomagus (Rouen) en était la capitale provinciale, reliée par les voies romaines à Lutetia (Paris) et aux ports de la Manche. Les infrastructures romaines — routes, aqueducs, amphithéâtres — se superposèrent au paysage celte, mais les identités tribales persistèrent sous un mince vernis romain jusqu\'au IVe siècle.',
      },
    },
  },
  // ── Post-Roman → Medieval regions ─────────────────────────────────
  {
    id: 'neustria',
    name: { en: 'Neustria', fr: 'Neustrie' },
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
      },
    },
  },
  {
    id: 'lower-seine',
    name: { en: 'Lower Seine', fr: 'Basse-Seine' },
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
      },
    },
  },
  {
    id: 'frankish-core',
    name: { en: 'Frankish Heartland', fr: 'Cœur franc' },
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
      },
    },
  },
  {
    id: 'channel-coast',
    name: { en: 'Channel Coast', fr: 'Côte de la Manche' },
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
      },
    },
  },
  {
    id: 'normandy',
    name: { en: 'Normandy', fr: 'Normandie' },
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
    name: { en: 'Perche', fr: 'Perche' },
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
    name: { en: 'Aunis / La Rochelle', fr: 'Aunis / La Rochelle' },
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
    name: { en: 'Brittany', fr: 'Bretagne' },
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
    name: { en: 'New France', fr: 'Nouvelle-France' },
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
    name: { en: 'Acadia', fr: 'Acadie' },
    layer: 'americas',
    geometryRef: 'region-acadia',
    eraStates: {
      'new-france-foundations': { visibility: 'normal', borderStyle: 'soft', fillIntent: 'polity' },
      'royal-new-france': { visibility: 'emphasized', borderStyle: 'soft', fillIntent: 'polity' },
      'atlantic-imprint': { visibility: 'normal', borderStyle: 'disputed', fillIntent: 'pressure' },
    },
  },
  {
    id: 'atlantic-basin',
    name: { en: 'North Atlantic', fr: 'Atlantique Nord' },
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
    name: { en: 'Danelaw', fr: 'Danelaw' },
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
      },
    },
  },
  {
    id: 'norse-gaelic-sphere',
    name: { en: 'Norse-Gaelic Sphere', fr: 'Sphère norso-gaélique' },
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
      },
    },
  },
  {
    id: 'kievan-rus-zone',
    name: { en: 'Kievan Rus', fr: 'Rus de Kiev' },
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
      },
    },
  },
  // ── Colonial settlement zones (migration explorer) ─────────────────
  {
    id: 'colony-zone-quebec',
    name: { en: 'Québec Region', fr: 'Région de Québec' },
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
      },
    },
  },
  {
    id: 'colony-zone-trois-rivieres',
    name: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières' },
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
      },
    },
  },
  {
    id: 'colony-zone-montreal',
    name: { en: 'Montréal Region', fr: 'Région de Montréal' },
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
      },
    },
  },
];
