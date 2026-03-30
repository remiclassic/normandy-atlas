import type { StoryBeat } from '@/core/types';

export const atlasStoryBeats: StoryBeat[] = [
  // --- Deep-time continuity beats ---
  {
    id: 'beat-neolithic-monuments',
    eraId: 'neolithic-normandy',
    camera: {
      target: 'bbox',
      center: [-0.5, 49.2],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dolmen-vauville', 'megaliths-fontenay', 'cairon-site'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Stones of the first farmers',
      body: {
        en: 'Long before any written record, Neolithic communities raised stone monuments across what would become Normandy. Dolmens at Vauville, megaliths near Fontenay-le-Marmion, and burial sites at Cairon mark the earliest human imprint on this landscape — a foundation layer that runs beneath everything that follows.',
        fr: 'Bien avant tout document écrit, des communautés néolithiques érigèrent des monuments de pierre à travers la future Normandie. Les dolmens de Vauville, les mégalithes de Fontenay-le-Marmion et les sépultures de Cairon marquent la plus ancienne empreinte humaine sur ce paysage — une couche fondatrice qui sous-tend tout ce qui suit.',
      },
    },
  },
  {
    id: 'beat-bronze-channel',
    eraId: 'bronze-age-channel',
    camera: {
      target: 'bbox',
      center: [-1.5, 49.8],
      zoom: 5.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['cornwall-tin', 'bronze-cotentin-coast', 'seine-estuary'],
      regionIds: ['channel-trade-zone'],
      routeSegmentIds: ['seg-cornwall-cotentin-trade', 'seg-cotentin-seine-trade'],
      journeyIds: ['journey-channel-trade'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Channel was always a highway',
      body: {
        en: 'Tin from Cornwall, copper from Iberia, and amber from the Baltic all crossed the Channel during the Bronze Age. Normandy\'s coast was a natural waypoint — the same harbours that would later receive Viking longships had already served trading vessels for over a millennium.',
        fr: 'L\'étain de Cornouailles, le cuivre d\'Ibérie et l\'ambre de la Baltique traversaient tous la Manche pendant l\'âge du bronze. La côte normande était un point de passage naturel — les mêmes ports qui recevraient plus tard les drakkars vikings avaient déjà accueilli des navires marchands pendant plus d\'un millénaire.',
      },
    },
  },
  {
    id: 'beat-iron-age-tribes',
    eraId: 'iron-age-gaul',
    camera: {
      target: 'bbox',
      center: [0.0, 49.3],
      zoom: 6.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'oppidum-rouen', 'cosedia-coutances', 'avranches-abrincates', 'oppidum-lillebonne'],
      regionIds: ['veliocasses', 'caletes', 'unelli', 'abrincates'],
      routeSegmentIds: ['seg-estuary-rouen-celtic', 'seg-rouen-paris-celtic'],
      journeyIds: ['journey-seine-deep-time'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'The tribes who shaped the land',
      body: {
        en: 'The Caletes, Veliocasses, Unelli, and Abrincates carved out territories that would endure as administrative boundaries under Rome and even beyond. Rotomagus — future Rouen — was already the dominant node on the Seine. The hillforts they built occupied the same strategic heights where Norman castles would later rise.',
        fr: 'Les Calètes, les Véliocasses, les Unelles et les Abrincates découpèrent des territoires qui perdureraient comme limites administratives sous Rome et au-delà. Rotomagus — futur Rouen — dominait déjà la Seine. Les oppida qu\'ils construisirent occupaient les mêmes hauteurs stratégiques où les châteaux normands s\'élèveraient plus tard.',
      },
    },
  },
  {
    id: 'beat-roman-bridge',
    eraId: 'roman-gaul',
    camera: {
      target: 'bbox',
      center: [0.5, 49.1],
      zoom: 6.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'paris', 'oppidum-lillebonne'],
      regionIds: ['lugdunensis-secunda', 'lower-seine'],
      routeSegmentIds: ['seg-paris-rouen-river', 'seg-rouen-estuary-river'],
      journeyIds: ['journey-seine-corridor'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes'],
    },
    copy: {
      title: 'Rome layers over the landscape',
      body: {
        en: 'After Caesar\'s conquest, tribal territories became Roman civitates. Roads replaced forest trails, amphitheatres rose beside oppida, and Rotomagus grew into a provincial capital. The same river corridors that had served Celtic trade now carried Roman grain barges — and the same coastal forts would later shelter Saxon Shore defences as the empire crumbled.',
        fr: 'Après la conquête de César, les territoires tribaux devinrent des civitates romaines. Les routes remplacèrent les sentiers, des amphithéâtres s\'élevèrent à côté des oppida, et Rotomagus devint une capitale provinciale. Les mêmes corridors fluviaux qui servaient le commerce celte transportaient désormais les péniches romaines — et les mêmes forts côtiers abriteraient plus tard les défenses du Litus Saxonicum.',
      },
    },
  },
  // --- Post-Roman → Medieval beats ---
  {
    id: 'beat-neustria',
    eraId: 'neustria',
    camera: {
      target: 'bbox',
      center: [1.5, 48.8],
      zoom: 5.2,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'nantes'],
      regionIds: ['neustria', 'frankish-core'],
      routeSegmentIds: ['seg-paris-rouen-river'],
      journeyIds: ['journey-seine-corridor'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Neustria: the western Frankish kingdom',
      body: {
        en: 'After the fall of Rome, the Franks divided Gaul into sub-kingdoms. Neustria — the western portion — encompassed the Seine basin, with Rouen and Paris as its anchors. This political geography set the stage: the Seine was already a corridor of power long before the Vikings arrived.',
        fr: 'Après la chute de Rome, les Francs divisèrent la Gaule en sous-royaumes. La Neustrie — la partie occidentale — englobait le bassin de la Seine, avec Rouen et Paris comme points d\'ancrage. Cette géographie politique posait les bases : la Seine était déjà un corridor de pouvoir bien avant l\'arrivée des Vikings.',
      },
    },
    aiSlot: 'explain_selection',
  },
  {
    id: 'beat-carolingian-frontier',
    eraId: 'frankish-carolingian',
    camera: {
      target: 'bbox',
      center: [0.0, 49.0],
      zoom: 5.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['nantes', 'rouen', 'quentovic', 'seine-estuary'],
      regionIds: ['neustria', 'channel-coast'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Imperial Neustria and the western frontier',
      body: {
        en: 'Charlemagne\'s empire absorbed Neustria into a vast Frankish state. The Channel emporium at Quentovic linked Gaul to North Sea trade, while Nantes anchored the tense Breton march to the west. Wealthy abbeys prospered along the Seine, but the empire\'s sheer scale strained frontier defence — a vulnerability that would prove fatal once Scandinavian fleets appeared on the horizon.',
        fr: 'L\'empire de Charlemagne absorba la Neustrie dans un vaste État franc. L\'emporium de Quentovic reliait la Gaule au commerce de la mer du Nord, tandis que Nantes ancrait la marche bretonne tendue à l\'ouest. De riches abbayes prospéraient le long de la Seine, mais l\'échelle même de l\'empire mettait à rude épreuve la défense des frontières — une vulnérabilité qui s\'avérerait fatale lorsque les flottes scandinaves apparurent à l\'horizon.',
      },
    },
    aiSlot: 'explain_selection',
  },
  {
    id: 'beat-seine-corridor',
    eraId: 'frankish-carolingian',
    camera: {
      target: 'places',
      center: [1.2, 49.2],
      zoom: 6.0,
      durationMs: 1600,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'jumieges'],
      regionIds: ['lower-seine', 'frankish-core'],
      routeSegmentIds: ['seg-paris-rouen-river', 'seg-rouen-estuary-river'],
      journeyIds: ['journey-seine-corridor'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Seine as strategic artery',
      body: {
        en: 'Under the Carolingians, the lower Seine linked the royal heartland around Paris to the Channel coast via Rouen. Wealthy abbeys like Jumièges lined the river. This concentration of political, economic, and monastic power along a single waterway made the region extraordinarily rich — and extraordinarily vulnerable.',
        fr: 'Sous les Carolingiens, la basse Seine reliait le cœur royal autour de Paris à la côte de la Manche via Rouen. De riches abbayes comme Jumièges bordaient le fleuve. Cette concentration de pouvoir politique, économique et monastique le long d\'une seule voie navigable rendait la région extraordinairement riche — et extraordinairement vulnérable.',
      },
    },
    aiSlot: 'explain_selection',
  },
  {
    id: 'beat-viking-raids',
    eraId: 'viking-age',
    camera: {
      target: 'places',
      center: [0.9, 49.4],
      zoom: 6.2,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['seine-estuary', 'rouen', 'jumieges', 'paris'],
      regionIds: ['lower-seine', 'channel-coast'],
      routeSegmentIds: ['seg-estuary-rouen-raid', 'seg-rouen-jumieges-raid', 'seg-rouen-paris-incursion'],
      journeyIds: ['journey-seine-raids'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'origins'],
    },
    copy: {
      title: 'Viking incursions on the Seine',
      body: {
        en: 'From the 840s onward, Norse fleets entered the Seine estuary and struck upriver with devastating efficiency. Rouen was taken, Jumièges was sacked, and by 885 a massive fleet besieged Paris itself. The Frankish state could not defend its own river corridor — a failure that would reshape the political map of northern France.',
        fr: 'À partir des années 840, les flottes scandinaves entrèrent dans l\'estuaire de la Seine et remontèrent le fleuve avec une efficacité dévastatrice. Rouen fut prise, Jumièges saccagée, et en 885 une flotte massive assiégea Paris même. L\'État franc ne pouvait défendre son propre corridor fluvial — un échec qui allait remodeler la carte politique du nord de la France.',
      },
    },
    aiSlot: 'explain_selection',
  },
  {
    id: 'beat-frankish-weakness',
    eraId: 'viking-age',
    camera: {
      target: 'bbox',
      center: [1.8, 49.0],
      zoom: 5.4,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'seine-estuary'],
      regionIds: ['normandy', 'lower-seine', 'frankish-core'],
      routeSegmentIds: ['seg-rouen-paris-incursion', 'seg-rouen-estuary-river'],
      journeyIds: ['journey-seine-raids', 'journey-seine-corridor'],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins', 'destinations'],
    },
    copy: {
      title: 'From raiding to settlement',
      body: {
        en: 'Repeated incursions turned the lower Seine from a Frankish heartland into a contested frontier. The Carolingian kings, weakened by civil wars and unable to stop the raids, ultimately chose negotiation. In 911, Charles the Simple ceded the lower Seine territory to the Viking leader Rollo in exchange for a defensive buffer — the treaty of Saint-Clair-sur-Epte. This was not a gift. It was the recognition that Frankish power had already lost control of the region.',
        fr: 'Les incursions répétées transformèrent la basse Seine d\'un cœur franc en une frontière contestée. Les rois carolingiens, affaiblis par les guerres civiles et incapables d\'arrêter les raids, choisirent finalement la négociation. En 911, Charles le Simple céda le territoire de la basse Seine au chef viking Rollon en échange d\'un tampon défensif — le traité de Saint-Clair-sur-Epte. Ce n\'était pas un cadeau. C\'était la reconnaissance que le pouvoir franc avait déjà perdu le contrôle de la région.',
      },
    },
    aiSlot: 'explain_selection',
  },
  {
    id: 'beat-normandy-formation',
    eraId: 'norman-origins',
    camera: {
      target: 'bbox',
      center: [0.5, 49.3],
      zoom: 5.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'caen', 'seine-estuary'],
      regionIds: ['normandy', 'lower-seine'],
      routeSegmentIds: ['seg-estuary-rouen-settlement', 'seg-rouen-caen-settlement'],
      journeyIds: ['journey-viking-settlement'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The formation of Normandy',
      body: {
        en: 'What emerged from the treaty was not simply a Viking colony. Over the following decades, Norse settlers absorbed Frankish institutions, language, and Christianity while retaining a warrior aristocracy and maritime orientation. Rouen became the ducal capital; settlement corridors extended westward. By the mid-tenth century, the territory had a name — Normandy — and a distinct identity: neither fully Frankish nor Scandinavian, but something new forged in the crucible of the lower Seine.',
        fr: 'Ce qui émergea du traité n\'était pas simplement une colonie viking. Au cours des décennies suivantes, les colons scandinaves absorbèrent les institutions franques, la langue et le christianisme tout en conservant une aristocratie guerrière et une orientation maritime. Rouen devint la capitale ducale ; les corridors de peuplement s\'étendirent vers l\'ouest. Au milieu du Xe siècle, le territoire avait un nom — la Normandie — et une identité distincte : ni pleinement franc ni scandinave, mais quelque chose de nouveau forgé dans le creuset de la basse Seine.',
      },
    },
    aiSlot: 'explain_selection',
  },
  {
    id: 'beat-1',
    eraId: 'age-of-exploration',
    camera: {
      target: 'places',
      center: [1.08, 49.92],
      zoom: 5.5,
      durationMs: 1600,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dieppe', 'honfleur', 'rouen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Normandy as Atlantic hinge',
      body: {
        en: 'Normandy mattered not as a lone origin myth, but as a coastal and river-linked hinge between inland populations, maritime skill, and Atlantic departure.',
        fr: 'La Normandie comptait non comme mythe d\'origine unique, mais comme charnière côtière et fluviale entre populations de l\'intérieur, savoir maritime et départ atlantique.',
      },
    },
    aiSlot: 'explain_selection',
  },
  {
    id: 'beat-2',
    eraId: 'new-france-foundations',
    camera: {
      target: 'bbox',
      center: [-24.0, 47.0],
      zoom: 2.7,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dieppe', 'mid-atlantic-passage', 'quebec-city'],
      regionIds: ['atlantic-basin', 'new-france'],
      routeSegmentIds: ['seg-dieppe-atlantic', 'seg-atlantic-quebec'],
      journeyIds: ['journey-perche-quebec'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Crossing the Atlantic',
      body: {
        en: 'The map should present crossings as historical corridors, not perfect one-ship records. Movement often ran through systems of ports, contracts, and repeated departures.',
        fr: 'La carte doit présenter les traversées comme des corridors historiques, non comme des relevés parfaits d\'un seul navire. Les déplacements passaient souvent par des systèmes de ports, de contrats et de départs répétés.',
      },
    },
    aiSlot: 'explain_selection',
  },
  {
    id: 'beat-3',
    eraId: 'new-france-foundations',
    camera: {
      target: 'places',
      center: [-71.2, 46.85],
      zoom: 6.2,
      durationMs: 1600,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'beauport', 'mortagne-au-perche'],
      regionIds: ['new-france', 'perche'],
      routeSegmentIds: ['seg-mortagne-rouen', 'seg-rouen-dieppe', 'seg-dieppe-atlantic', 'seg-atlantic-quebec'],
      journeyIds: ['journey-perche-quebec'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Recruitment and founder effects',
      body: {
        en: 'A relatively small number of settlers, recruited through repeated regional channels, could leave a lasting cultural imprint when concentrated in key colonial settlements.',
        fr: 'Un nombre relativement restreint de colons, recrutés par des canaux régionaux répétés, pouvait laisser une empreinte culturelle durable lorsqu\'ils se concentraient dans des établissements coloniaux clés.',
      },
    },
    aiSlot: 'explain_selection',
  },
  {
    id: 'beat-migration-origins',
    eraId: 'new-france-foundations',
    camera: {
      target: 'bbox',
      center: [-1.0, 47.5],
      zoom: 4.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['la-rochelle', 'dieppe', 'rouen', 'honfleur', 'saint-malo', 'mortagne-au-perche'],
      regionIds: ['normandy', 'perche', 'aunis', 'brittany'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Where settlers came from',
      body: {
        en: 'New France drew settlers from across Atlantic France — but some regions gave far more than others. Northwest France (Normandy, Brittany, Perche) provided roughly 39% of all immigrants, and the Centre-West (Aunis, Saintonge, Poitou) another 19%. Open the Migration Explorer to compare cohorts and see how the shares shift between all immigrants and those who stayed as founders.',
        fr: 'La Nouvelle-France attirait des colons de toute la France atlantique. Le Nord-Ouest (Normandie, Bretagne, Perche) fournit environ 39% de tous les immigrants, et le Centre-Ouest (Aunis, Saintonge, Poitou) 19% de plus.',
      },
    },
    aiSlot: 'explain_selection',
  },
  {
    id: 'beat-4',
    eraId: 'royal-new-france',
    camera: {
      target: 'bbox',
      center: [-35.0, 46.0],
      zoom: 2.8,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['la-rochelle', 'saint-malo', 'port-royal', 'louisbourg'],
      regionIds: ['acadia', 'atlantic-basin', 'aunis', 'brittany'],
      routeSegmentIds: [
        'seg-la-rochelle-atlantic',
        'seg-atlantic-port-royal',
        'seg-saint-malo-atlantic',
        'seg-atlantic-louisbourg',
      ],
      journeyIds: ['journey-la-rochelle-acadia', 'journey-saint-malo-louisbourg'],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Ports feeding the colonial world',
      body: {
        en: 'The Atlantic story is broader than Normandy alone. Ports like La Rochelle and Saint-Malo fed distinct but connected colonial corridors across the ocean.',
        fr: 'L\'histoire atlantique dépasse la seule Normandie. Des ports comme La Rochelle et Saint-Malo alimentaient des corridors coloniaux distincts mais reliés à travers l\'océan.',
      },
    },
    aiSlot: 'explain_selection',
  },

  // ── New France Arc beats ──────────────────────────────────────────
  {
    id: 'nf-arc-origins',
    eraId: 'new-france-foundations',
    arcId: 'new-france',
    camera: {
      target: 'bbox',
      center: [-1.0, 47.5],
      zoom: 4.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['la-rochelle', 'dieppe', 'rouen', 'honfleur', 'saint-malo', 'mortagne-au-perche'],
      regionIds: ['normandy', 'perche', 'aunis', 'brittany'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Origins in Atlantic France',
      body: {
        en: 'New France drew settlers from across the Atlantic coast of France. Normandy, Perche, Brittany, and the Centre-West each contributed distinct cohorts — founders, engagés, soldiers, and religious figures — flowing through a handful of embarkation ports.',
        fr: 'La Nouvelle-France attira des colons de toute la côte atlantique de la France. La Normandie, le Perche, la Bretagne et le Centre-Ouest contribuèrent chacun des cohortes distinctes — fondateurs, engagés, soldats et religieux — transitant par une poignée de ports d\'embarquement.',
      },
    },
    anchorYear: 1608,
  },
  {
    id: 'nf-arc-atlantic-crossing',
    eraId: 'new-france-foundations',
    arcId: 'new-france',
    camera: {
      target: 'bbox',
      center: [-24.0, 47.0],
      zoom: 2.7,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dieppe', 'mid-atlantic-passage', 'quebec-city'],
      regionIds: ['atlantic-basin', 'new-france'],
      routeSegmentIds: ['seg-dieppe-atlantic', 'seg-atlantic-quebec', 'seg-la-rochelle-atlantic'],
      journeyIds: ['journey-perche-quebec'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Crossing the Atlantic',
      body: {
        en: 'Ships departed from Dieppe, La Rochelle, Honfleur, and Saint-Malo in spring, crossed in six to twelve weeks, and carried settlers, supplies, and trade goods to the St. Lawrence. The return voyage brought furs back to France.',
        fr: 'Les navires partaient de Dieppe, La Rochelle, Honfleur et Saint-Malo au printemps, traversaient en six à douze semaines, et transportaient colons, approvisionnements et marchandises vers le Saint-Laurent. Le voyage retour ramenait les fourrures en France.',
      },
    },
    anchorYear: 1620,
  },
  {
    id: 'nf-arc-settlement-corridor',
    eraId: 'new-france-foundations',
    arcId: 'new-france',
    camera: {
      target: 'places',
      center: [-71.5, 46.8],
      zoom: 6.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'trois-rivieres', 'montreal', 'beauport', 'tadoussac'],
      regionIds: ['new-france'],
      routeSegmentIds: ['seg-stl-quebec-montreal'],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The St. Lawrence Corridor',
      body: {
        en: 'Settlement concentrated along the St. Lawrence in a thin seigneurial ribbon from Québec through Trois-Rivières to Montréal. This corridor was the backbone of New France — its administrative, commercial, and military spine.',
        fr: 'La colonisation se concentra le long du Saint-Laurent en un mince ruban seigneurial de Québec à Montréal en passant par Trois-Rivières. Ce corridor était l\'épine dorsale de la Nouvelle-France — son axe administratif, commercial et militaire.',
      },
    },
    anchorYear: 1645,
  },
  {
    id: 'nf-arc-great-lakes',
    eraId: 'royal-new-france',
    arcId: 'new-france',
    camera: {
      target: 'bbox',
      center: [-80.0, 44.0],
      zoom: 4.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['montreal', 'great-lakes-hub', 'michilimackinac', 'sault-ste-marie', 'fort-detroit'],
      regionIds: ['new-france'],
      routeSegmentIds: ['seg-champlain-quebec-huron', 'seg-radisson-montreal-greatlakes'],
      journeyIds: ['journey-champlain-great-lakes'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Into the Great Lakes',
      body: {
        en: 'Explorers like Champlain, Brûlé, and Radisson pushed French presence deep into the Great Lakes. Forts, missions, and trading posts at Michilimackinac, Sault Ste. Marie, and Détroit formed the nodes of a vast inland network connected to Montreal by the Ottawa River route.',
        fr: 'Des explorateurs comme Champlain, Brûlé et Radisson étendirent la présence française au cœur des Grands Lacs. Forts, missions et postes de traite à Michilimackinac, Sault Sainte-Marie et Détroit formaient les nœuds d\'un vaste réseau intérieur relié à Montréal par la route de l\'Outaouais.',
      },
    },
    anchorYear: 1680,
  },
  {
    id: 'nf-arc-mississippi',
    eraId: 'royal-new-france',
    arcId: 'new-france',
    camera: {
      target: 'bbox',
      center: [-88.0, 37.0],
      zoom: 3.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['great-lakes-hub', 'mississippi-confluence', 'gulf-of-mexico-node', 'green-bay'],
      regionIds: [],
      routeSegmentIds: ['seg-jolliet-greatlakes-mississippi', 'seg-lasalle-greatlakes-mississippi', 'seg-lasalle-mississippi-gulf'],
      journeyIds: ['journey-lasalle-mississippi', 'journey-jolliet-marquette'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Mississippi — A Continental Claim',
      body: {
        en: 'Jolliet and Marquette (1673) confirmed the Mississippi flowed south. La Salle, a Rouennais, descended the entire river to the Gulf of Mexico in 1682 and claimed the basin as Louisiana. In a single act, New France leapt from a riverine colony to a continental empire.',
        fr: 'Jolliet et Marquette (1673) confirmèrent que le Mississippi coulait vers le sud. La Salle, un Rouennais, descendit tout le fleuve jusqu\'au golfe du Mexique en 1682 et revendiqua le bassin sous le nom de Louisiane. En un seul acte, la Nouvelle-France passa d\'une colonie fluviale à un empire continental.',
      },
    },
    anchorYear: 1682,
  },
  {
    id: 'nf-arc-peak',
    eraId: 'atlantic-imprint',
    arcId: 'new-france',
    camera: {
      target: 'bbox',
      center: [-82.0, 42.0],
      zoom: 3.2,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'montreal', 'louisbourg', 'new-orleans', 'fort-detroit', 'michilimackinac'],
      regionIds: ['new-france', 'acadia'],
      routeSegmentIds: ['seg-stl-quebec-montreal'],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Peak New France',
      body: {
        en: 'At its height after the Great Peace of Montréal (1701), New France was the largest European territorial claim in North America — stretching from the Gulf of St. Lawrence through the Great Lakes to the Gulf of Mexico. But the population of the core St. Lawrence corridor never exceeded 70,000 colonists.',
        fr: 'À son apogée après la Grande Paix de Montréal (1701), la Nouvelle-France était la plus grande revendication territoriale européenne en Amérique du Nord — s\'étendant du golfe du Saint-Laurent aux Grands Lacs jusqu\'au golfe du Mexique. Mais la population du corridor principal ne dépassa jamais 70 000 colons.',
      },
    },
    anchorYear: 1720,
  },
  {
    id: 'nf-arc-collapse',
    eraId: 'atlantic-imprint',
    arcId: 'new-france',
    camera: {
      target: 'places',
      center: [-71.21, 46.81],
      zoom: 5.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'louisbourg', 'montreal'],
      regionIds: ['new-france', 'acadia'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Collapse and Loss',
      body: {
        en: 'The Seven Years\' War brought the end. Louisbourg fell in 1758, Québec in 1759 on the Plains of Abraham, and Montréal surrendered in 1760. The Treaty of Paris (1763) ceded all of New France to Britain. A continental system built over 150 years vanished from the map — but not from memory or genealogy.',
        fr: 'La guerre de Sept Ans apporta la fin. Louisbourg tomba en 1758, Québec en 1759 sur les Plaines d\'Abraham, et Montréal capitula en 1760. Le traité de Paris (1763) céda toute la Nouvelle-France à la Grande-Bretagne. Un système continental bâti sur 150 ans disparut de la carte — mais ni de la mémoire, ni de la généalogie.',
      },
    },
    anchorYear: 1760,
  },
];
