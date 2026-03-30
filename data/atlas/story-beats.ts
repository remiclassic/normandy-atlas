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
        en: 'New France drew settlers from across Atlantic France — but some regions gave far more than others. Northwest France (Normandy, Brittany, Perche) provided roughly 39% of all immigrants, and the Centre-West (Aunis, Saintonge, Poitou) another 19%. That is why many French Canadians today discover Norman or near-Norman ancestors: repeated recruitment through northwestern ports and parishes, plus a small colonial founder pool, left an outsized mark in genealogy. Open the Migration Explorer to compare cohorts and see how shares shift between all immigrants and those who stayed as founders.',
        fr: 'La Nouvelle-France attirait des colons de toute la France atlantique, mais certaines régions en ont fourni bien plus que d\'autres. Le Nord-Ouest (Normandie, Bretagne, Perche) représente environ 39% de tous les immigrants, et le Centre-Ouest (Aunis, Saintonge, Poitou) 19% de plus. C\'est pourquoi tant de Canadiens français retrouvent aujourd\'hui des ancêtres normands ou proches : des canaux de recrutement répétés via les ports et paroisses du Nord-Ouest, et une base coloniale restreinte, ont laissé une empreinte disproportionnée dans la généalogie. Ouvrez l\'explorateur des migrations pour comparer les cohortes.',
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
        en: 'New France drew settlers from across the Atlantic coast of France. Normandy, Perche, Brittany, and the Centre-West each contributed distinct cohorts — founders, engagés, soldiers, and religious figures — flowing through a handful of embarkation ports. Modern French Canadian family trees often highlight Normandy because those channels were thick and the St. Lawrence founder population was small, not because the colony was only Norman.',
        fr: 'La Nouvelle-France attira des colons de toute la côte atlantique de la France. La Normandie, le Perche, la Bretagne et le Centre-Ouest contribuèrent chacun des cohortes distinctes — fondateurs, engagés, soldats et religieux — transitant par une poignée de ports d\'embarquement. Les arbres généalogiques canadiens-français mettent souvent en avant la Normandie parce que ces canaux étaient denses et que la population fondatrice du Saint-Laurent était restreinte, non parce que la colonie était uniquement normande.',
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

  // ── Neolithic Normandy Arc beats ─────────────────────────────────
  {
    id: 'neo-arc-first-farmers',
    eraId: 'neolithic-normandy',
    arcId: 'neolithic-normandy',
    camera: {
      target: 'bbox',
      center: [-0.5, 49.1],
      zoom: 6.5,
      durationMs: 2400,
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
      title: 'The First Farmers Arrive',
      body: {
        en: 'Around 5000 BC, the Neolithic revolution reached the river valleys and coastal plains of what would become Normandy. Farming communities migrating from the south and east brought domesticated wheat, barley, cattle, and a radically new way of life. For the first time, people settled permanently — clearing forests, tilling soil, and building villages along the same river terraces and coastal lowlands that every later civilisation would inhabit. The landscape was being claimed, and the first markers of that claim were about to rise in stone.',
        fr: 'Vers 5000 av. J.-C., la révolution néolithique atteignit les vallées fluviales et les plaines côtières de la future Normandie. Des communautés agricoles migrant du sud et de l\'est apportèrent le blé domestiqué, l\'orge, le bétail et un mode de vie radicalement nouveau. Pour la première fois, des gens s\'installèrent de façon permanente — défrichant les forêts, labourant le sol et bâtissant des villages le long des mêmes terrasses fluviales et basses terres côtières que chaque civilisation ultérieure habiterait. Le paysage était revendiqué, et les premiers marqueurs de cette revendication allaient bientôt s\'élever en pierre.',
      },
    },
    anchorYear: -5000,
  },
  {
    id: 'neo-arc-dolmens',
    eraId: 'neolithic-normandy',
    arcId: 'neolithic-normandy',
    camera: {
      target: 'places',
      center: [-1.84, 49.64],
      zoom: 8.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dolmen-vauville'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Dolmens: Houses for the Dead',
      body: {
        en: 'The dolmen at Vauville, perched on the windswept Cotentin coast, is one of Normandy\'s oldest megalithic monuments. Dolmens were collective burial chambers — massive stone slabs raised to shelter the bones of the community\'s ancestors. They were not hidden away but placed prominently on headlands, hilltops, and river bluffs where they could be seen from afar. To build a dolmen was to declare: we belong to this land, and our dead watch over it. The Vauville dolmen stood here for three thousand years before the first Celtic warrior was born.',
        fr: 'Le dolmen de Vauville, perché sur la côte battue par les vents du Cotentin, est l\'un des plus anciens monuments mégalithiques de Normandie. Les dolmens étaient des chambres funéraires collectives — d\'énormes dalles de pierre élevées pour abriter les ossements des ancêtres de la communauté. Ils n\'étaient pas cachés mais placés en évidence sur les promontoires, sommets de collines et escarpements fluviaux où ils pouvaient être vus de loin. Construire un dolmen, c\'était déclarer : nous appartenons à cette terre, et nos morts veillent sur elle. Le dolmen de Vauville se dressait ici depuis trois mille ans avant la naissance du premier guerrier celte.',
      },
    },
    anchorYear: -4500,
  },
  {
    id: 'neo-arc-fontenay-cluster',
    eraId: 'neolithic-normandy',
    arcId: 'neolithic-normandy',
    camera: {
      target: 'places',
      center: [-0.36, 49.13],
      zoom: 8.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['megaliths-fontenay', 'cairon-site'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Fontenay and the Caen Plain Monuments',
      body: {
        en: 'On the limestone plain around modern Caen, a dense cluster of megalithic monuments marked one of the most important Neolithic ritual landscapes in northern France. The Fontenay-le-Marmion complex — with its long barrows and burial chambers — and the nearby Cairon site formed a sacred geography that organised the lives and deaths of farming communities for centuries. These were not isolated graves but interconnected ceremonial centres, positioned along sight lines and seasonal pathways. The Caen plain was Neolithic Normandy\'s heartland.',
        fr: 'Sur le plateau calcaire autour de l\'actuelle Caen, un dense groupe de monuments mégalithiques marquait l\'un des paysages rituels néolithiques les plus importants du nord de la France. Le complexe de Fontenay-le-Marmion — avec ses longs tumulus et chambres funéraires — et le site voisin de Cairon formaient une géographie sacrée qui organisa la vie et la mort des communautés agricoles pendant des siècles. Ce n\'étaient pas des sépultures isolées mais des centres cérémoniels interconnectés, positionnés le long de lignes de vue et de chemins saisonniers. La plaine de Caen était le cœur de la Normandie néolithique.',
      },
    },
    anchorYear: -4200,
  },
  {
    id: 'neo-arc-allees-couvertes',
    eraId: 'neolithic-normandy',
    arcId: 'neolithic-normandy',
    camera: {
      target: 'places',
      center: [-0.48, 49.20],
      zoom: 8.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['allee-couverte-bretteville'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Allées Couvertes: Corridors of Stone',
      body: {
        en: 'The allée couverte at Bretteville-sur-Laize is a gallery grave — a long, narrow passage roofed with stone slabs, designed to receive generations of the dead. These corridor tombs were among the most ambitious architectural feats of Neolithic Europe: some stretched over twenty metres, their walls decorated with carved motifs. They were communal monuments, affirming that the community — not the individual — mattered. Each generation added its dead to the passage, layering the present atop the past in a ritual that would continue for a thousand years.',
        fr: 'L\'allée couverte de Bretteville-sur-Laize est une sépulture en galerie — un long passage étroit couvert de dalles de pierre, conçu pour recevoir des générations de morts. Ces tombes-corridors comptaient parmi les réalisations architecturales les plus ambitieuses de l\'Europe néolithique : certaines s\'étendaient sur plus de vingt mètres, leurs murs ornés de motifs gravés. C\'étaient des monuments communautaires, affirmant que la communauté — et non l\'individu — importait. Chaque génération ajoutait ses morts au passage, superposant le présent au passé dans un rituel qui se poursuivrait pendant mille ans.',
      },
    },
    anchorYear: -3800,
  },
  {
    id: 'neo-arc-menhirs',
    eraId: 'neolithic-normandy',
    arcId: 'neolithic-normandy',
    camera: {
      target: 'places',
      center: [-1.75, 48.55],
      zoom: 8.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['menhir-dol'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Standing Stones: Markers on the Land',
      body: {
        en: 'Menhirs — tall standing stones — are the most enigmatic of Neolithic monuments. The Menhir de Dol, near the border of Brittany and Normandy, rises from flat ground like a sentinel. Were they boundary markers, astronomical sighting stones, or objects of veneration? Perhaps all three. What is certain is that menhirs were placed with intent: at crossroads, on ridge lines, at territorial boundaries. They were the first human-made landmarks in a landscape that had known only trees and rivers. Their placement foreshadowed the logic of every border, road marker, and church tower that would follow.',
        fr: 'Les menhirs — grandes pierres dressées — sont les plus énigmatiques des monuments néolithiques. Le Menhir de Dol, près de la frontière entre la Bretagne et la Normandie, s\'élève d\'un terrain plat comme une sentinelle. Étaient-ils des bornes frontières, des pierres de visée astronomique ou des objets de vénération ? Peut-être les trois. Ce qui est certain, c\'est que les menhirs étaient placés avec intention : aux carrefours, sur les lignes de crête, aux frontières territoriales. Ils furent les premiers repères fabriqués par l\'homme dans un paysage qui n\'avait connu que des arbres et des rivières. Leur emplacement préfigurait la logique de chaque frontière, borne routière et clocher d\'église qui suivrait.',
      },
    },
    anchorYear: -3500,
  },
  {
    id: 'neo-arc-passais',
    eraId: 'neolithic-normandy',
    arcId: 'neolithic-normandy',
    camera: {
      target: 'places',
      center: [-0.52, 48.53],
      zoom: 8.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dolmen-passais'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Table du Diable: Memory in the Interior',
      body: {
        en: 'Not all monuments stood on the coast. The Table du Diable at Passais, deep in the bocage country of southern Normandy, proves that inland communities were equally invested in megalithic ritual. This "Devil\'s Table" — a massive capstone balanced on uprights — marks a burial site far from the sea, in rolling farmland that would remain remarkably unchanged for five thousand years. Neolithic Normandy was not just a coastal phenomenon; it extended into every river valley and forest clearing where farmers could put down roots.',
        fr: 'Tous les monuments ne se dressaient pas sur la côte. La Table du Diable à Passais, au cœur du bocage du sud de la Normandie, prouve que les communautés de l\'intérieur étaient tout aussi investies dans le rituel mégalithique. Cette « Table du Diable » — une énorme dalle de couverture en équilibre sur des montants — marque un site funéraire loin de la mer, dans des terres agricoles vallonnées qui resteraient remarquablement inchangées pendant cinq mille ans. La Normandie néolithique n\'était pas un phénomène uniquement côtier ; elle s\'étendait dans chaque vallée fluviale et clairière forestière où les fermiers pouvaient s\'enraciner.',
      },
    },
    anchorYear: -3200,
  },
  {
    id: 'neo-arc-sacred-landscape',
    eraId: 'neolithic-normandy',
    arcId: 'neolithic-normandy',
    camera: {
      target: 'bbox',
      center: [-0.8, 49.1],
      zoom: 6.8,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dolmen-vauville', 'megaliths-fontenay', 'cairon-site', 'dolmen-passais', 'menhir-dol', 'allee-couverte-bretteville'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'A Sacred Landscape Takes Shape',
      body: {
        en: 'Seen together, Normandy\'s megalithic monuments reveal a landscape deliberately organised by its first farming communities. Dolmens on the Cotentin coast, allées couvertes on the Caen plain, menhirs at territorial boundaries, burial clusters at ritual centres: these were not randomly placed stones but a connected geography of the sacred and the political. The same sites that Neolithic people chose for their monuments — headlands, river crossings, plateau edges — would be chosen again and again by Celtic chiefs, Roman engineers, Frankish kings, and Norman lords. The first map of Normandy was drawn in stone.',
        fr: 'Vus ensemble, les monuments mégalithiques de Normandie révèlent un paysage délibérément organisé par ses premières communautés agricoles. Dolmens sur la côte du Cotentin, allées couvertes sur la plaine de Caen, menhirs aux frontières territoriales, groupes funéraires aux centres rituels : ce n\'étaient pas des pierres placées au hasard mais une géographie connectée du sacré et du politique. Les mêmes sites que les Néolithiques choisirent pour leurs monuments — promontoires, passages de rivières, rebords de plateaux — seraient choisis encore et encore par les chefs celtes, ingénieurs romains, rois francs et seigneurs normands. La première carte de la Normandie fut tracée dans la pierre.',
      },
    },
    anchorYear: -2800,
  },
  {
    id: 'neo-arc-bronze-horizon',
    eraId: 'neolithic-normandy',
    arcId: 'neolithic-normandy',
    camera: {
      target: 'bbox',
      center: [-0.5, 49.3],
      zoom: 6.2,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dolmen-vauville', 'megaliths-fontenay', 'menhir-dol', 'dolmen-passais', 'cairon-site', 'allee-couverte-bretteville'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'On the Threshold of Metal',
      body: {
        en: 'By around 2000 BC, the Neolithic world was giving way to something new. Knowledge of metalworking — first copper, then bronze — was spreading from the east and south. The great age of megalith-building was ending, but the monuments remained, silent and enduring. New peoples would arrive, new technologies would transform the economy, and the Channel would become a highway for the tin trade. Yet the dolmens, menhirs, and allées couvertes raised by Normandy\'s first farmers would still stand — as they stand today — the oldest layer of human memory inscribed on a landscape that would never stop being reshaped.',
        fr: 'Vers 2000 av. J.-C., le monde néolithique cédait la place à quelque chose de nouveau. La connaissance de la métallurgie — d\'abord le cuivre, puis le bronze — se répandait depuis l\'est et le sud. La grande époque de construction mégalithique prenait fin, mais les monuments restaient, silencieux et durables. De nouveaux peuples arriveraient, de nouvelles technologies transformeraient l\'économie, et la Manche deviendrait une autoroute pour le commerce de l\'étain. Pourtant les dolmens, menhirs et allées couvertes érigés par les premiers fermiers de Normandie se dresseraient encore — comme ils se dressent aujourd\'hui — la couche la plus ancienne de mémoire humaine inscrite sur un paysage qui ne cesserait jamais d\'être remodelé.',
      },
    },
    anchorYear: -2000,
  },

  // ── Bronze Age Channel Arc beats ─────────────────────────────────
  {
    id: 'bac-arc-channel-highway',
    eraId: 'bronze-age-channel',
    arcId: 'bronze-age-channel',
    camera: {
      target: 'bbox',
      center: [-2.0, 49.8],
      zoom: 5.2,
      durationMs: 2400,
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
      title: 'The Channel: A Bronze Age Highway',
      body: {
        en: 'Long before any written record, the English Channel was one of Europe\'s busiest waterways. Beginning around 2000 BC, the demand for bronze — an alloy of copper and tin — transformed the narrow strait into a maritime highway. Tin from Cornwall and copper from the continent had to cross the Channel, and the coast of what would become Normandy lay directly on the route. Skin boats and log canoes carried precious metals, amber, and ideas between Britain and the continent. The Channel was not a barrier; it was a bridge.',
        fr: 'Bien avant tout document écrit, la Manche était l\'une des voies navigables les plus fréquentées d\'Europe. À partir d\'environ 2000 av. J.-C., la demande de bronze — un alliage de cuivre et d\'étain — transforma le détroit étroit en autoroute maritime. L\'étain de Cornouailles et le cuivre du continent devaient traverser la Manche, et la côte de la future Normandie se trouvait directement sur la route. Des bateaux de peaux et des pirogues transportaient métaux précieux, ambre et idées entre la Bretagne insulaire et le continent. La Manche n\'était pas une barrière ; c\'était un pont.',
      },
    },
    anchorYear: -2000,
  },
  {
    id: 'bac-arc-cornwall-tin',
    eraId: 'bronze-age-channel',
    arcId: 'bronze-age-channel',
    camera: {
      target: 'places',
      center: [-5.0, 50.3],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['cornwall-tin'],
      regionIds: ['channel-trade-zone'],
      routeSegmentIds: ['seg-cornwall-cotentin-trade', 'seg-cornwall-caux-trade'],
      journeyIds: ['journey-channel-trade'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'origins'],
    },
    copy: {
      title: 'Cornwall: The Tin That Made Bronze',
      body: {
        en: 'Cornwall was one of the few places in Europe where tin could be found in quantity. Without tin, there was no bronze; without bronze, there were no weapons, tools, or prestige goods that defined the age. Cornish tin was the most sought-after commodity in western Europe, and the communities that controlled its export wielded enormous influence. Two main sea routes carried this tin southward across the Channel: one to the Cotentin coast, another to the chalk shores of the Pays de Caux. Both routes made Normandy\'s coastline a critical waypoint in a continental trade network.',
        fr: 'La Cornouailles était l\'un des rares endroits en Europe où l\'étain pouvait être trouvé en quantité. Sans étain, pas de bronze ; sans bronze, pas d\'armes, d\'outils ou de biens de prestige qui définissaient l\'époque. L\'étain cornouaillais était la marchandise la plus recherchée d\'Europe occidentale, et les communautés qui contrôlaient son exportation exerçaient une influence énorme. Deux routes maritimes principales transportaient cet étain vers le sud à travers la Manche : l\'une vers la côte du Cotentin, l\'autre vers les rivages crayeux du Pays de Caux. Les deux routes faisaient de la côte normande un point de passage critique dans un réseau commercial continental.',
      },
    },
    anchorYear: -1800,
  },
  {
    id: 'bac-arc-cotentin-landing',
    eraId: 'bronze-age-channel',
    arcId: 'bronze-age-channel',
    camera: {
      target: 'places',
      center: [-1.62, 49.63],
      zoom: 7.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bronze-cotentin-coast', 'dolmen-vauville'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: ['seg-cornwall-cotentin-trade'],
      journeyIds: ['journey-channel-trade'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Cotentin: Gateway from Britain',
      body: {
        en: 'The Cotentin peninsula jutted out into the Channel like a dock, offering the shortest crossing to southwestern Britain. Its sheltered coves and natural harbours made it an ideal landing point for the skin boats and log dugouts that carried tin, copper, and trade goods. Settlements clustered near the coast, and older Neolithic monuments like the Vauville dolmen still loomed on the headlands — silent witnesses to a landscape already shaped by millennia of human activity. The Cotentin was where the Atlantic and continental worlds met.',
        fr: 'La presqu\'île du Cotentin s\'avançait dans la Manche comme un quai, offrant la traversée la plus courte vers le sud-ouest de la Bretagne insulaire. Ses criques abritées et ses ports naturels en faisaient un point de débarquement idéal pour les bateaux de peaux et les pirogues qui transportaient étain, cuivre et marchandises. Les établissements se regroupaient près de la côte, et d\'anciens monuments néolithiques comme le dolmen de Vauville se dressaient encore sur les promontoires — témoins silencieux d\'un paysage déjà façonné par des millénaires d\'activité humaine. Le Cotentin était le lieu de rencontre des mondes atlantique et continental.',
      },
    },
    anchorYear: -1600,
  },
  {
    id: 'bac-arc-tin-trade-peak',
    eraId: 'bronze-age-channel',
    arcId: 'bronze-age-channel',
    camera: {
      target: 'bbox',
      center: [-1.5, 49.8],
      zoom: 5.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['cornwall-tin', 'bronze-cotentin-coast', 'bronze-caux-coast', 'seine-estuary'],
      regionIds: ['channel-trade-zone'],
      routeSegmentIds: ['seg-cornwall-cotentin-trade', 'seg-cornwall-caux-trade', 'seg-cotentin-seine-trade'],
      journeyIds: ['journey-channel-trade'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Tin Trade at Its Peak',
      body: {
        en: 'Around 1500 BC, Channel trade reached its zenith. Two well-worn maritime corridors connected Cornwall to Normandy\'s coast: a western route to the Cotentin and an eastern route to the Caux. From these landfalls, goods moved inland along rivers and overland paths to the Seine estuary and beyond — into the heart of continental Europe. Bronze artefacts found across northern France carry the chemical signature of Cornish tin, proving that this was not occasional exchange but a sustained, organised trade system. The Channel was the motorway of its age.',
        fr: 'Vers 1500 av. J.-C., le commerce transmanche atteignit son apogée. Deux corridors maritimes bien rodés reliaient la Cornouailles à la côte normande : une route occidentale vers le Cotentin et une route orientale vers le Caux. Depuis ces points de débarquement, les marchandises progressaient vers l\'intérieur le long des rivières et sentiers jusqu\'à l\'estuaire de la Seine et au-delà — au cœur de l\'Europe continentale. Les artefacts de bronze trouvés à travers le nord de la France portent la signature chimique de l\'étain cornouaillais, prouvant qu\'il ne s\'agissait pas d\'échanges occasionnels mais d\'un système commercial soutenu et organisé. La Manche était l\'autoroute de son époque.',
      },
    },
    anchorYear: -1500,
  },
  {
    id: 'bac-arc-seine-estuary',
    eraId: 'bronze-age-channel',
    arcId: 'bronze-age-channel',
    camera: {
      target: 'places',
      center: [0.12, 49.5],
      zoom: 7.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['seine-estuary'],
      regionIds: ['channel-trade-zone', 'normandy-neolithic-zone'],
      routeSegmentIds: ['seg-cotentin-seine-trade'],
      journeyIds: ['journey-channel-trade'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Seine Estuary: Where Sea Meets River',
      body: {
        en: 'The Seine estuary was where the maritime world of the Channel met the riverine world of inland Gaul. Goods arriving by sea — tin, copper, amber, salt — were transferred here to river craft that carried them upstream toward what would one day be Paris. This transhipment point was the ancestor of every port that would later occupy this stretch of coast: Roman Rotomagus, Viking Rouen, the medieval harbour towns of the Seine. The estuary\'s geography — wide, tidal, navigable — made it a natural gateway, and every civilisation that followed would use it as one.',
        fr: 'L\'estuaire de la Seine était le lieu où le monde maritime de la Manche rencontrait le monde fluvial de la Gaule intérieure. Les marchandises arrivant par mer — étain, cuivre, ambre, sel — étaient transférées ici sur des embarcations fluviales qui les transportaient en amont vers ce qui deviendrait un jour Paris. Ce point de transbordement était l\'ancêtre de chaque port qui occuperait plus tard cette portion de côte : la Rotomagus romaine, le Rouen viking, les villes portuaires médiévales de la Seine. La géographie de l\'estuaire — large, à marée, navigable — en faisait une porte d\'entrée naturelle, et chaque civilisation qui suivit l\'utiliserait comme telle.',
      },
    },
    anchorYear: -1300,
  },
  {
    id: 'bac-arc-caux-coast',
    eraId: 'bronze-age-channel',
    arcId: 'bronze-age-channel',
    camera: {
      target: 'places',
      center: [0.5, 49.85],
      zoom: 7.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bronze-caux-coast'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: ['seg-cornwall-caux-trade'],
      journeyIds: ['journey-channel-trade'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Caux Coast: Eastern Trade Corridor',
      body: {
        en: 'The eastern Channel route brought Cornish tin to the chalk coast of the Pays de Caux — the dramatic white cliffs north of the Seine. Here, sheltered beaches between the headlands offered landing spots for trading vessels. The Caux coast connected directly to the Caletes\' territory of the later Iron Age, and the Channel-facing harbours it offered would serve every seafaring people from Bronze Age traders to Norman fishermen. The same coastal geography that attracted tin merchants would one day attract Viking raiders seeking the Seine.',
        fr: 'La route orientale de la Manche amenait l\'étain cornouaillais sur la côte crayeuse du Pays de Caux — les spectaculaires falaises blanches au nord de la Seine. Ici, des plages abritées entre les promontoires offraient des points de débarquement aux navires marchands. La côte du Caux se connectait directement au territoire des Calètes de l\'âge du fer ultérieur, et les ports face à la Manche qu\'elle offrait serviraient tous les peuples navigateurs, des commerçants de l\'âge du bronze aux pêcheurs normands. La même géographie côtière qui attirait les marchands d\'étain attirerait un jour les raiders vikings à la recherche de la Seine.',
      },
    },
    anchorYear: -1200,
  },
  {
    id: 'bac-arc-neolithic-memory',
    eraId: 'bronze-age-channel',
    arcId: 'bronze-age-channel',
    camera: {
      target: 'bbox',
      center: [-0.5, 49.3],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dolmen-vauville', 'megaliths-fontenay'],
      regionIds: ['normandy-neolithic-zone'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Neolithic Monuments in a Bronze Age World',
      body: {
        en: 'Scattered across the landscape, the great stone monuments of the Neolithic era — dolmens, menhirs, and allées couvertes — still stood during the Bronze Age, already ancient. The Vauville dolmen on the Cotentin coast and the megalithic cluster at Fontenay-le-Marmion were thousands of years old, built by farming communities whose world had vanished. Yet Bronze Age peoples did not ignore them: they reused burial chambers, deposited offerings at old sacred sites, and oriented their own settlements in relation to these ancestral markers. The landscape was layered, and even the earliest arrivals were building on someone else\'s past.',
        fr: 'Éparpillés à travers le paysage, les grands monuments de pierre de l\'ère néolithique — dolmens, menhirs et allées couvertes — se dressaient encore à l\'âge du bronze, déjà anciens. Le dolmen de Vauville sur la côte du Cotentin et le groupe mégalithique de Fontenay-le-Marmion avaient des milliers d\'années, construits par des communautés agricoles dont le monde avait disparu. Pourtant, les peuples de l\'âge du bronze ne les ignoraient pas : ils réutilisaient les chambres funéraires, déposaient des offrandes sur les anciens sites sacrés et orientaient leurs propres établissements par rapport à ces marqueurs ancestraux. Le paysage était stratifié, et même les premiers arrivants construisaient sur le passé de quelqu\'un d\'autre.',
      },
    },
    anchorYear: -1000,
  },
  {
    id: 'bac-arc-iron-horizon',
    eraId: 'bronze-age-channel',
    arcId: 'bronze-age-channel',
    camera: {
      target: 'bbox',
      center: [-1.0, 49.5],
      zoom: 5.5,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['cornwall-tin', 'bronze-cotentin-coast', 'bronze-caux-coast', 'seine-estuary'],
      regionIds: ['channel-trade-zone', 'normandy-neolithic-zone'],
      routeSegmentIds: ['seg-cornwall-cotentin-trade', 'seg-cornwall-caux-trade', 'seg-cotentin-seine-trade'],
      journeyIds: ['journey-channel-trade'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Coming of Iron',
      body: {
        en: 'By around 800 BC, a new metal was spreading across Europe: iron. Cheaper and more abundant than bronze, iron did not require the long-distance tin trade that had powered the Channel networks. The great maritime corridors began to shift, and the coastal communities that had thrived as middlemen in the tin trade saw their world change. But the legacy of the Bronze Age endured: the harbours, the sea routes, the knowledge of Channel crossings, and the settlement patterns along the coast all survived into the Iron Age. Celtic tribes would inherit a landscape already mapped by centuries of maritime commerce — and the Channel would remain a highway, waiting for the next fleet to sail it.',
        fr: 'Vers 800 av. J.-C., un nouveau métal se répandait à travers l\'Europe : le fer. Moins cher et plus abondant que le bronze, le fer ne nécessitait pas le commerce d\'étain à longue distance qui avait alimenté les réseaux de la Manche. Les grands corridors maritimes commencèrent à se déplacer, et les communautés côtières qui avaient prospéré comme intermédiaires dans le commerce de l\'étain virent leur monde changer. Mais l\'héritage de l\'âge du bronze perdura : les ports, les routes maritimes, la connaissance des traversées de la Manche et les schémas d\'implantation le long de la côte survécurent tous à l\'âge du fer. Les tribus celtes hériteraient d\'un paysage déjà cartographié par des siècles de commerce maritime — et la Manche resterait une autoroute, attendant la prochaine flotte pour la naviguer.',
      },
    },
    anchorYear: -800,
  },

  // ── Iron Age Gaul Arc beats ──────────────────────────────────────
  {
    id: 'iag-arc-celtic-dawn',
    eraId: 'iron-age-gaul',
    arcId: 'iron-age-gaul',
    camera: {
      target: 'bbox',
      center: [0.0, 49.3],
      zoom: 5.8,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'seine-estuary'],
      regionIds: ['veliocasses', 'caletes', 'unelli', 'abrincates'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Celtic Dawn in Northern Gaul',
      body: {
        en: 'From around 800 BC, iron-working Celtic peoples spread across northern Gaul, transforming the landscape with new technologies, social structures, and warrior aristocracies. The region between the Seine and the Channel — later known as Normandy — was divided among powerful tribes who spoke Gaulish, worshipped a pantheon of nature gods, and built their wealth on agriculture, metalwork, and trade. This was no backwater: the Seine corridor and Channel coast made it one of the most connected regions in pre-Roman Europe.',
        fr: 'À partir d\'environ 800 av. J.-C., des peuples celtes maîtrisant le fer se répandirent à travers le nord de la Gaule, transformant le paysage avec de nouvelles technologies, structures sociales et aristocraties guerrières. La région entre la Seine et la Manche — plus tard connue sous le nom de Normandie — était divisée entre de puissantes tribus qui parlaient le gaulois, vénéraient un panthéon de dieux de la nature et bâtissaient leur richesse sur l\'agriculture, la métallurgie et le commerce. Ce n\'était pas un arrière-pays : le corridor de la Seine et la côte de la Manche en faisaient l\'une des régions les mieux connectées de l\'Europe pré-romaine.',
      },
    },
    anchorYear: -800,
  },
  {
    id: 'iag-arc-veliocasses',
    eraId: 'iron-age-gaul',
    arcId: 'iron-age-gaul',
    camera: {
      target: 'places',
      center: [1.05, 49.45],
      zoom: 7.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['oppidum-rouen', 'rouen', 'hillfort-duclair'],
      regionIds: ['veliocasses'],
      routeSegmentIds: ['seg-rouen-paris-celtic', 'seg-estuary-rouen-celtic'],
      journeyIds: ['journey-seine-deep-time'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Veliocasses: Lords of the Seine',
      body: {
        en: 'The Veliocasses were the dominant tribe of the lower Seine valley. Their capital at Rotomagus (modern Rouen) controlled the point where the tidal river met the inland waterway — a strategic chokepoint that would determine the fate of the region for two millennia. Their oppidum sat on heights overlooking the river, with satellite hillforts like Duclair guarding the approaches. Control of the Seine gave the Veliocasses mastery over inland trade: tin, salt, grain, and slaves all passed through their territory. Rotomagus was already a city in all but name.',
        fr: 'Les Véliocasses étaient la tribu dominante de la basse vallée de la Seine. Leur capitale à Rotomagus (l\'actuelle Rouen) contrôlait le point où le fleuve à marée rencontrait la voie navigable intérieure — un point d\'étranglement stratégique qui déterminerait le destin de la région pendant deux millénaires. Leur oppidum siégeait sur les hauteurs surplombant le fleuve, avec des forts satellites comme Duclair gardant les approches. Le contrôle de la Seine donnait aux Véliocasses la maîtrise du commerce intérieur : étain, sel, grain et esclaves transitaient tous par leur territoire. Rotomagus était déjà une ville en tout sauf le nom.',
      },
    },
    anchorYear: -500,
  },
  {
    id: 'iag-arc-caletes',
    eraId: 'iron-age-gaul',
    arcId: 'iron-age-gaul',
    camera: {
      target: 'places',
      center: [0.5, 49.55],
      zoom: 7.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['oppidum-lillebonne'],
      regionIds: ['caletes'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Caletes: Guardians of the Chalk Coast',
      body: {
        en: 'North of the Seine, the Caletes controlled the Pays de Caux — the dramatic chalk plateau that drops into white cliffs along the Channel. Their territory gave them access to both the rich fishing grounds offshore and cross-Channel trade with Britain. Their principal settlement near modern Lillebonne (later the Roman Juliobona) sat at the junction of land and river routes. The Caletes were middlemen: positioned between the Veliocasses of the Seine and the maritime world beyond, they profited from every exchange.',
        fr: 'Au nord de la Seine, les Calètes contrôlaient le Pays de Caux — le plateau crayeux spectaculaire qui tombe en falaises blanches le long de la Manche. Leur territoire leur donnait accès à la fois aux riches zones de pêche au large et au commerce transmanche avec la Bretagne insulaire. Leur établissement principal près de l\'actuelle Lillebonne (plus tard la Juliobona romaine) se situait à la jonction des routes terrestres et fluviales. Les Calètes étaient des intermédiaires : positionnés entre les Véliocasses de la Seine et le monde maritime au-delà, ils profitaient de chaque échange.',
      },
    },
    anchorYear: -450,
  },
  {
    id: 'iag-arc-western-tribes',
    eraId: 'iron-age-gaul',
    arcId: 'iron-age-gaul',
    camera: {
      target: 'places',
      center: [-1.2, 49.0],
      zoom: 6.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['cosedia-coutances', 'avranches-abrincates'],
      regionIds: ['unelli', 'abrincates'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Unelli and Abrincates: Western Gaul',
      body: {
        en: 'West of the Seine, two smaller but strategically vital tribes held the Cotentin peninsula and the bay of Mont-Saint-Michel. The Unelli, centred on Cosedia (modern Coutances), commanded the Channel crossings to Britain and controlled some of the most contested coastline in Gaul. The Abrincates, based around Abrincae (Avranches), guarded the gateway between Brittany and the Seine world. Though less powerful than the Veliocasses, these western tribes controlled the maritime margins that linked the Celtic Atlantic to the Gaulish interior.',
        fr: 'À l\'ouest de la Seine, deux tribus plus petites mais stratégiquement vitales tenaient la presqu\'île du Cotentin et la baie du Mont-Saint-Michel. Les Unelles, centrés sur Cosedia (l\'actuelle Coutances), commandaient les traversées de la Manche vers la Bretagne insulaire et contrôlaient une des côtes les plus disputées de Gaule. Les Abrincates, basés autour d\'Abrincae (Avranches), gardaient la porte entre la Bretagne armoricaine et le monde de la Seine. Bien que moins puissantes que les Véliocasses, ces tribus occidentales contrôlaient les marges maritimes reliant l\'Atlantique celte à l\'intérieur gaulois.',
      },
    },
    anchorYear: -400,
  },
  {
    id: 'iag-arc-seine-corridor',
    eraId: 'iron-age-gaul',
    arcId: 'iron-age-gaul',
    camera: {
      target: 'places',
      center: [1.0, 49.2],
      zoom: 6.2,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'seine-estuary'],
      regionIds: ['veliocasses', 'lower-seine'],
      routeSegmentIds: ['seg-rouen-paris-celtic', 'seg-estuary-rouen-celtic'],
      journeyIds: ['journey-seine-deep-time'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Seine: An Ancient Highway',
      body: {
        en: 'Long before Rome, the Seine was already a major trade artery. From Lutetia — the island settlement of the Parisii — goods flowed downstream past the Veliocasses to the Channel and beyond. Tin from Cornwall, amber from the Baltic, wine from the Mediterranean: all passed through this corridor in Celtic hands. The river imposed a logic on the landscape that no political change would ever alter. Every power that controlled the Seine — Celtic, Roman, Frankish, Viking, Norman — would prosper; every power that lost it would fall.',
        fr: 'Bien avant Rome, la Seine était déjà une artère commerciale majeure. Depuis Lutèce — l\'établissement insulaire des Parisii — les marchandises descendaient le fleuve en passant par les Véliocasses jusqu\'à la Manche et au-delà. L\'étain de Cornouailles, l\'ambre de la Baltique, le vin de la Méditerranée : tout transitait par ce corridor aux mains des Celtes. Le fleuve imposait une logique au paysage qu\'aucun changement politique ne modifierait jamais. Chaque puissance qui contrôla la Seine — celte, romaine, franque, viking, normande — prospéra ; chaque puissance qui la perdit tomba.',
      },
    },
    anchorYear: -350,
  },
  {
    id: 'iag-arc-oppida',
    eraId: 'iron-age-gaul',
    arcId: 'iron-age-gaul',
    camera: {
      target: 'bbox',
      center: [0.2, 49.3],
      zoom: 6.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['oppidum-rouen', 'hillfort-duclair', 'oppidum-lillebonne', 'cosedia-coutances', 'avranches-abrincates'],
      regionIds: ['veliocasses', 'caletes', 'unelli', 'abrincates'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Oppida: Proto-Cities on the Heights',
      body: {
        en: 'By the third century BC, Gaulish tribes were building oppida — fortified hilltop settlements that served as capitals, markets, and refuges. These were not simple forts: the largest contained workshops, granaries, mints, and religious precincts. The oppidum of Rotomagus overlooked the Seine; Juliobona commanded the Caletes\' chalk country; Cosedia anchored the Unelli\'s Cotentin; Abrincae watched over the bay. These sites chose the same strategic heights — river bends, coastal headlands, plateau edges — that Roman towns, Frankish palaces, and Norman castles would later occupy. Geography dictated the map before any empire drew it.',
        fr: 'Au troisième siècle av. J.-C., les tribus gauloises construisaient des oppida — des établissements fortifiés sur les hauteurs qui servaient de capitales, marchés et refuges. Ce n\'étaient pas de simples forts : les plus grands contenaient des ateliers, greniers, ateliers monétaires et enceintes religieuses. L\'oppidum de Rotomagus surplombait la Seine ; Juliobona commandait le pays crayeux des Calètes ; Cosedia ancrait le Cotentin des Unelles ; Abrincae surveillait la baie. Ces sites choisissaient les mêmes hauteurs stratégiques — méandres fluviaux, promontoires côtiers, rebords de plateaux — que les villes romaines, palais francs et châteaux normands occuperaient plus tard. La géographie dictait la carte avant qu\'aucun empire ne la dessine.',
      },
    },
    anchorYear: -300,
  },
  {
    id: 'iag-arc-resistance',
    eraId: 'iron-age-gaul',
    arcId: 'iron-age-gaul',
    camera: {
      target: 'bbox',
      center: [-0.5, 49.2],
      zoom: 6.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['cosedia-coutances', 'avranches-abrincates', 'rouen'],
      regionIds: ['unelli', 'abrincates', 'veliocasses', 'caletes'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Resistance and the Gallic Wars',
      body: {
        en: 'When Julius Caesar\'s legions swept into Gaul in the 50s BC, the tribes of the Seine and Cotentin fought back. Viridovix, chief of the Unelli, raised a massive coalition to resist Rome in 56 BC — but was defeated by Sabinus at the Battle of the Unelli. The Veliocasses, caught between Roman power and their own pride, submitted more quietly. The Caletes and Abrincates likewise bent the knee. Resistance was fierce but fragmented: each tribe fought alone, and Rome conquered them one by one. The Celtic world of northern Gaul was ending.',
        fr: 'Quand les légions de Jules César déferlèrent en Gaule dans les années 50 av. J.-C., les tribus de la Seine et du Cotentin ripostèrent. Viridovix, chef des Unelles, leva une coalition massive pour résister à Rome en 56 av. J.-C. — mais fut vaincu par Sabinus à la bataille des Unelles. Les Véliocasses, pris entre la puissance romaine et leur propre fierté, se soumirent plus discrètement. Les Calètes et les Abrincates plièrent également le genou. La résistance fut féroce mais fragmentée : chaque tribu combattit seule, et Rome les conquit une par une. Le monde celte du nord de la Gaule prenait fin.',
      },
    },
    anchorYear: -56,
  },
  {
    id: 'iag-arc-eve-of-rome',
    eraId: 'iron-age-gaul',
    arcId: 'iron-age-gaul',
    camera: {
      target: 'bbox',
      center: [0.0, 49.2],
      zoom: 5.8,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'oppidum-rouen', 'oppidum-lillebonne', 'cosedia-coutances', 'avranches-abrincates', 'seine-estuary'],
      regionIds: ['veliocasses', 'caletes', 'unelli', 'abrincates', 'lower-seine'],
      routeSegmentIds: ['seg-rouen-paris-celtic', 'seg-estuary-rouen-celtic'],
      journeyIds: ['journey-seine-deep-time'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes', 'origins'],
    },
    copy: {
      title: 'On the Eve of Rome',
      body: {
        en: 'By 52 BC, Caesar\'s conquest was complete. The tribal territories that had shaped northern Gaul for centuries — the Veliocasses along the Seine, the Caletes on the chalk coast, the Unelli in the Cotentin, the Abrincates by the bay — would now be redrawn as Roman civitates. But the deeper patterns survived: the river corridor, the strategic heights, the coastal trade routes, the tribal boundaries that Rome would simply rename. The Iron Age was ending, but the geography it had mapped — and the places it had chosen — would endure through every era that followed.',
        fr: 'En 52 av. J.-C., la conquête de César était achevée. Les territoires tribaux qui avaient façonné le nord de la Gaule pendant des siècles — les Véliocasses le long de la Seine, les Calètes sur la côte crayeuse, les Unelles dans le Cotentin, les Abrincates près de la baie — seraient désormais redessinés en civitates romaines. Mais les schémas plus profonds survivèrent : le corridor fluvial, les hauteurs stratégiques, les routes commerciales côtières, les frontières tribales que Rome ne ferait que renommer. L\'âge du fer prenait fin, mais la géographie qu\'il avait tracée — et les lieux qu\'il avait choisis — perdureraient à travers chaque ère qui suivrait.',
      },
    },
    anchorYear: -52,
  },

  // ── Roman Gaul Arc beats ─────────────────────────────────────────
  {
    id: 'rg-arc-caesars-conquest',
    eraId: 'roman-gaul',
    arcId: 'roman-gaul',
    camera: {
      target: 'bbox',
      center: [0.5, 49.2],
      zoom: 5.4,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'paris', 'oppidum-lillebonne'],
      regionIds: ['veliocasses', 'caletes', 'lugdunensis-secunda'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Caesar\'s Conquest of Gaul',
      body: {
        en: 'In 52 BC, Julius Caesar completed the conquest of Gaul, bringing the Celtic tribes of the Seine basin under Roman rule. The Veliocasses at Rotomagus, the Caletes along the Channel coast, and their neighbours were absorbed into the vast machinery of the Roman Republic. Tribal oppida were not destroyed but repurposed: their hilltop strongholds became the nuclei of new Roman towns. The Seine, already an ancient trade corridor, would now serve an empire.',
        fr: 'En 52 av. J.-C., Jules César acheva la conquête de la Gaule, plaçant les tribus celtes du bassin de la Seine sous domination romaine. Les Véliocasses à Rotomagus, les Calètes le long de la côte de la Manche et leurs voisins furent absorbés dans la vaste machinerie de la République romaine. Les oppida tribaux ne furent pas détruits mais reconvertis : leurs places fortes sur les hauteurs devinrent les noyaux de nouvelles villes romaines. La Seine, déjà un ancien corridor commercial, servirait désormais un empire.',
      },
    },
    anchorYear: -52,
  },
  {
    id: 'rg-arc-civitates',
    eraId: 'roman-gaul',
    arcId: 'roman-gaul',
    camera: {
      target: 'bbox',
      center: [0.0, 49.2],
      zoom: 5.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'oppidum-lillebonne', 'cosedia-coutances', 'avranches-abrincates'],
      regionIds: ['veliocasses', 'caletes', 'unelli', 'abrincates'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'From Tribes to Civitates',
      body: {
        en: 'Rome reorganised Celtic tribal territories into civitates — administrative districts that preserved tribal boundaries while imposing Roman law, taxation, and urban planning. The Veliocasses became the civitas of Rotomagus, the Caletes were centred on Juliobona (Lillebonne), the Unelli on Cosedia (Coutances), and the Abrincates on Abrincae (Avranches). Each civitas capital received Roman monuments — forums, baths, temples — layered atop the older Celtic landscape. The tribal map of Gaul was being redrawn in Roman ink.',
        fr: 'Rome réorganisa les territoires tribaux celtes en civitates — des districts administratifs qui préservaient les frontières tribales tout en imposant le droit romain, la fiscalité et l\'urbanisme. Les Véliocasses devinrent la civitas de Rotomagus, les Calètes furent centrés sur Juliobona (Lillebonne), les Unelles sur Cosedia (Coutances) et les Abrincates sur Abrincae (Avranches). Chaque capitale de civitas reçut des monuments romains — forums, thermes, temples — superposés à l\'ancien paysage celte. La carte tribale de la Gaule était redessinée à l\'encre romaine.',
      },
    },
    anchorYear: -10,
  },
  {
    id: 'rg-arc-rotomagus',
    eraId: 'roman-gaul',
    arcId: 'roman-gaul',
    camera: {
      target: 'places',
      center: [1.1, 49.44],
      zoom: 8.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen'],
      regionIds: ['veliocasses', 'lugdunensis-secunda'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Rotomagus: Provincial Capital',
      body: {
        en: 'By the second century, Rotomagus (Rouen) had grown from a Celtic oppidum into one of Roman Gaul\'s most important cities. As capital of Lugdunensis Secunda, it administered a vast province stretching from the Seine to the Cotentin peninsula. Roman Rotomagus boasted a forum, public baths, an amphitheatre, and a river port that connected it to both the interior and the Channel. The city\'s strategic position — where tidal waters met the river — made it the natural gateway between northern Gaul and the sea, a role it would never relinquish.',
        fr: 'Au deuxième siècle, Rotomagus (Rouen) était passé d\'un oppidum celte à l\'une des villes les plus importantes de la Gaule romaine. Comme capitale de la Lyonnaise seconde, elle administrait une vaste province s\'étendant de la Seine à la presqu\'île du Cotentin. La Rotomagus romaine possédait un forum, des thermes publics, un amphithéâtre et un port fluvial qui la reliait à la fois à l\'intérieur et à la Manche. La position stratégique de la ville — là où les eaux de marée rencontraient le fleuve — en faisait la porte d\'entrée naturelle entre le nord de la Gaule et la mer, un rôle qu\'elle n\'abandonnerait jamais.',
      },
    },
    anchorYear: 100,
  },
  {
    id: 'rg-arc-seine-artery',
    eraId: 'roman-gaul',
    arcId: 'roman-gaul',
    camera: {
      target: 'places',
      center: [1.0, 49.2],
      zoom: 6.2,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'seine-estuary'],
      regionIds: ['lower-seine', 'lugdunensis-secunda'],
      routeSegmentIds: ['seg-rouen-paris-celtic', 'seg-estuary-rouen-celtic'],
      journeyIds: ['journey-seine-deep-time'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Seine as Roman Highway',
      body: {
        en: 'Under Rome, the Seine became a managed commercial artery. Grain barges carried harvests from the Île-de-France to the Channel ports; wine, oil, and pottery flowed upstream from Mediterranean trade routes. Lutetia (Paris) and Rotomagus (Rouen) were the two great nodes on this waterway, connected by a corridor of villas, estates, and staging posts. Roman engineers improved the river\'s navigability, and imperial tax collectors ensured that every cargo paid its dues. The prosperity of this corridor would echo through every era that followed.',
        fr: 'Sous Rome, la Seine devint une artère commerciale administrée. Des péniches de grain transportaient les récoltes de l\'Île-de-France aux ports de la Manche ; vin, huile et poterie remontaient depuis les routes commerciales méditerranéennes. Lutèce (Paris) et Rotomagus (Rouen) étaient les deux grands nœuds de cette voie navigable, reliés par un corridor de villas, domaines et relais. Les ingénieurs romains améliorèrent la navigabilité du fleuve, et les percepteurs impériaux veillaient à ce que chaque cargaison paie ses droits. La prospérité de ce corridor résonnerait à travers chaque ère qui suivrait.',
      },
    },
    anchorYear: 150,
  },
  {
    id: 'rg-arc-provincial-towns',
    eraId: 'roman-gaul',
    arcId: 'roman-gaul',
    camera: {
      target: 'bbox',
      center: [-0.5, 49.2],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['oppidum-lillebonne', 'cosedia-coutances', 'avranches-abrincates'],
      regionIds: ['caletes', 'unelli', 'abrincates'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Amphitheatres and Provincial Towns',
      body: {
        en: 'Beyond the Seine corridor, Roman culture reshaped the provincial towns. Juliobona (Lillebonne) gained a grand amphitheatre seating thousands — its ruins still stand today. Cosedia (Coutances) and Abrincae (Avranches) received their own Roman monuments and road connections. These towns were not mere copies of Rome; they were hybrid places where Celtic traditions survived beneath a Roman veneer. Local gods were syncretised with Roman deities, Celtic metalwork techniques merged with Roman styles, and tribal aristocrats reinvented themselves as toga-wearing magistrates.',
        fr: 'Au-delà du corridor de la Seine, la culture romaine remodela les villes provinciales. Juliobona (Lillebonne) reçut un grand amphithéâtre pouvant accueillir des milliers de spectateurs — ses ruines se dressent encore aujourd\'hui. Cosedia (Coutances) et Abrincae (Avranches) reçurent leurs propres monuments romains et connexions routières. Ces villes n\'étaient pas de simples copies de Rome ; c\'étaient des lieux hybrides où les traditions celtes survivaient sous un vernis romain. Les dieux locaux furent syncrétisés avec les divinités romaines, les techniques de métallurgie celte fusionnèrent avec les styles romains, et les aristocrates tribaux se réinventèrent en magistrats vêtus de toges.',
      },
    },
    anchorYear: 200,
  },
  {
    id: 'rg-arc-lugdunensis',
    eraId: 'roman-gaul',
    arcId: 'roman-gaul',
    camera: {
      target: 'bbox',
      center: [0.0, 49.0],
      zoom: 5.6,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'paris', 'oppidum-lillebonne', 'cosedia-coutances', 'avranches-abrincates'],
      regionIds: ['lugdunensis-secunda', 'veliocasses', 'caletes', 'unelli', 'abrincates'],
      routeSegmentIds: ['seg-rouen-paris-celtic', 'seg-estuary-rouen-celtic'],
      journeyIds: ['journey-seine-deep-time'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes'],
    },
    copy: {
      title: 'Lugdunensis Secunda: A Roman Province',
      body: {
        en: 'The province of Lugdunensis Secunda encompassed most of what would later become Normandy. Governed from Rotomagus, it was connected by Roman roads to Lutetia, the Channel ports, and the wider imperial network. The province\'s identity was defined by the Seine: upstream lay the political heartland around Paris, downstream lay the sea and the trade routes to Britain. Roman infrastructure — roads, bridges, aqueducts — overlay the Celtic landscape, but the underlying geography remained the same: the river corridor, the coastal margins, the agricultural heartland. Every future power would govern the same terrain.',
        fr: 'La province de Lyonnaise seconde englobait la majeure partie de ce qui deviendrait plus tard la Normandie. Gouvernée depuis Rotomagus, elle était reliée par des voies romaines à Lutèce, aux ports de la Manche et au réseau impérial plus large. L\'identité de la province était définie par la Seine : en amont se trouvait le cœur politique autour de Paris, en aval la mer et les routes commerciales vers la Bretagne insulaire. L\'infrastructure romaine — routes, ponts, aqueducs — recouvrait le paysage celte, mais la géographie sous-jacente restait la même : le corridor fluvial, les marges côtières, le cœur agricole. Chaque puissance future gouvernerait le même terrain.',
      },
    },
    anchorYear: 250,
  },
  {
    id: 'rg-arc-saxon-shore',
    eraId: 'roman-gaul',
    arcId: 'roman-gaul',
    camera: {
      target: 'bbox',
      center: [0.5, 49.8],
      zoom: 5.8,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['seine-estuary', 'rouen'],
      regionIds: ['channel-coast', 'lower-seine'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Saxon Shore and the First Sea Raiders',
      body: {
        en: 'By the mid-fourth century, the Channel coast was under threat. Saxon and Frankish pirates raided the shores of Gaul and Britain with growing boldness. Rome responded with the Litus Saxonicum — the Saxon Shore — a chain of coastal forts and signal stations designed to protect the Channel crossing and the river mouths. The Seine estuary received fortifications; watchtowers scanned the horizon for hostile sails. It was a defensive system born of weakness, not strength — an empire that could no longer prevent raiders from reaching its shores, only slow them down. The pattern was set for what would come.',
        fr: 'Au milieu du quatrième siècle, la côte de la Manche était menacée. Des pirates saxons et francs pillaient les rivages de la Gaule et de la Bretagne insulaire avec une audace croissante. Rome répondit avec le Litus Saxonicum — le Rivage Saxon — une chaîne de forts côtiers et de stations de signaux conçue pour protéger la traversée de la Manche et les embouchures des fleuves. L\'estuaire de la Seine reçut des fortifications ; des tours de guet scrutaient l\'horizon à la recherche de voiles hostiles. C\'était un système défensif né de la faiblesse, non de la force — un empire qui ne pouvait plus empêcher les pillards d\'atteindre ses rivages, seulement les ralentir. Le schéma était posé pour ce qui allait venir.',
      },
    },
    anchorYear: 350,
  },
  {
    id: 'rg-arc-crumbling-frontier',
    eraId: 'roman-gaul',
    arcId: 'roman-gaul',
    camera: {
      target: 'bbox',
      center: [1.0, 49.0],
      zoom: 5.2,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'seine-estuary', 'oppidum-lillebonne'],
      regionIds: ['lugdunensis-secunda', 'lower-seine', 'channel-coast'],
      routeSegmentIds: ['seg-rouen-paris-celtic', 'seg-estuary-rouen-celtic'],
      journeyIds: ['journey-seine-deep-time'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Empire Withdraws',
      body: {
        en: 'By the early fifth century, Rome could no longer hold northern Gaul. Legions were recalled to defend Italy, frontier garrisons went unpaid, and the Rhine frontier collapsed under pressure from migrating Germanic peoples. The roads still ran, the aqueducts still carried water, and the amphitheatre at Juliobona still stood — but the power that built them was gone. Rotomagus and Lutetia found themselves adrift, their bishops stepping in where governors had stepped out. Roman Gaul was ending — but the infrastructure, the cities, and the river corridors it had created would outlast the empire by a thousand years.',
        fr: 'Au début du cinquième siècle, Rome ne pouvait plus tenir le nord de la Gaule. Les légions furent rappelées pour défendre l\'Italie, les garnisons frontalières ne furent plus payées, et la frontière du Rhin s\'effondra sous la pression des peuples germaniques en migration. Les routes couraient encore, les aqueducs portaient encore l\'eau, et l\'amphithéâtre de Juliobona se dressait encore — mais la puissance qui les avait construits avait disparu. Rotomagus et Lutèce se retrouvèrent à la dérive, leurs évêques prenant la place là où les gouverneurs s\'étaient retirés. La Gaule romaine prenait fin — mais l\'infrastructure, les villes et les corridors fluviaux qu\'elle avait créés survivraient à l\'empire de mille ans.',
      },
    },
    anchorYear: 400,
  },

  // ── Post-Roman Gaul Arc beats ────────────────────────────────────
  {
    id: 'prg-arc-collapse',
    eraId: 'post-roman-gaul',
    arcId: 'post-roman-gaul',
    camera: {
      target: 'bbox',
      center: [1.5, 49.0],
      zoom: 5.0,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen'],
      regionIds: ['frankish-core', 'lower-seine'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Collapse of Roman Authority',
      body: {
        en: 'By the early fifth century, the Roman Empire could no longer defend northern Gaul. Legions were withdrawn to fight civil wars in Italy, frontier garrisons went unpaid, and Germanic warbands crossed the Rhine with increasing impunity. Rotomagus (Rouen) and Lutetia (Paris) — once thriving provincial cities — found themselves cut off from imperial support. Roman roads still crossed the landscape, aqueducts still stood, but the power that built them was gone. Northern Gaul entered a twilight between empires.',
        fr: 'Au début du cinquième siècle, l\'Empire romain ne pouvait plus défendre le nord de la Gaule. Les légions furent retirées pour combattre les guerres civiles en Italie, les garnisons frontalières ne furent plus payées, et les bandes guerrières germaniques traversèrent le Rhin avec une impunité croissante. Rotomagus (Rouen) et Lutèce (Paris) — autrefois des cités provinciales prospères — se retrouvèrent coupées du soutien impérial. Les voies romaines sillonnaient encore le paysage, les aqueducs tenaient encore debout, mais la puissance qui les avait construits avait disparu. Le nord de la Gaule entra dans un crépuscule entre deux empires.',
      },
    },
    anchorYear: 410,
  },
  {
    id: 'prg-arc-gallo-roman-cities',
    eraId: 'post-roman-gaul',
    arcId: 'post-roman-gaul',
    camera: {
      target: 'places',
      center: [1.0, 49.3],
      zoom: 6.4,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'paris'],
      regionIds: ['lower-seine', 'frankish-core'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Gallo-Roman Cities Endure',
      body: {
        en: 'Though the empire withdrew, its cities did not vanish. Rotomagus (Rouen) and Lutetia (Paris) survived as islands of Roman culture in a sea of change. Bishops replaced governors as the leading civic authorities, maintaining order, collecting taxes, and negotiating with the new Germanic arrivals. Latin remained the language of law and liturgy. The old Roman street grids, walls, and churches gave these cities a continuity that bridged the classical and medieval worlds — a foundation the Franks would inherit rather than destroy.',
        fr: 'Bien que l\'empire se fût retiré, ses villes ne disparurent pas. Rotomagus (Rouen) et Lutèce (Paris) survécurent comme des îlots de culture romaine dans une mer de changements. Les évêques remplacèrent les gouverneurs comme principales autorités civiques, maintenant l\'ordre, percevant les impôts et négociant avec les nouveaux arrivants germaniques. Le latin resta la langue du droit et de la liturgie. Les anciens plans de rues romains, murailles et églises donnèrent à ces villes une continuité reliant les mondes classique et médiéval — un fondement que les Francs hériteraient plutôt que détruiraient.',
      },
    },
    anchorYear: 420,
  },
  {
    id: 'prg-arc-frankish-settlement',
    eraId: 'post-roman-gaul',
    arcId: 'post-roman-gaul',
    camera: {
      target: 'bbox',
      center: [2.5, 49.5],
      zoom: 5.4,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris'],
      regionIds: ['frankish-core'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Frankish Warbands Cross the Rhine',
      body: {
        en: 'The Franks were not a single people but a confederation of Germanic tribes from the lower Rhine. Some had served as Roman foederati — allied soldiers defending the frontier in exchange for land. As imperial control collapsed, Frankish chieftains pushed deeper into northern Gaul, settling the rich farmland between the Rhine, the Somme, and the Seine. They did not raze Gallo-Roman civilization; they layered themselves atop it, adopting local customs, marrying into Roman families, and claiming the mantle of authority the legions had left behind.',
        fr: 'Les Francs n\'étaient pas un peuple unique mais une confédération de tribus germaniques du bas Rhin. Certains avaient servi comme fédérés romains — des soldats alliés défendant la frontière en échange de terres. Alors que le contrôle impérial s\'effondrait, les chefs francs pénétrèrent plus profondément dans le nord de la Gaule, s\'installant sur les riches terres agricoles entre le Rhin, la Somme et la Seine. Ils ne rasèrent pas la civilisation gallo-romaine ; ils s\'y superposèrent, adoptant les coutumes locales, s\'alliant par mariage aux familles romaines et revendiquant le manteau d\'autorité que les légions avaient laissé derrière elles.',
      },
    },
    anchorYear: 440,
  },
  {
    id: 'prg-arc-syagrius',
    eraId: 'post-roman-gaul',
    arcId: 'post-roman-gaul',
    camera: {
      target: 'bbox',
      center: [2.5, 49.2],
      zoom: 5.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen'],
      regionIds: ['frankish-core', 'neustria'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Kingdom of Soissons',
      body: {
        en: 'Between the Frankish north and the Visigothic south, a remarkable pocket of Roman authority survived. Syagrius, son of a Roman general, ruled a rump state from Soissons — sometimes called the last Roman enclave in Gaul. His domain stretched roughly from the Somme to the Loire, encompassing both Lutetia and Rotomagus. For decades he maintained Roman administration, coinage, and law in a post-Roman world. But his kingdom was an island, and the Frankish tide was rising around it.',
        fr: 'Entre le nord franc et le sud wisigoth, une remarquable enclave d\'autorité romaine survivait. Syagrius, fils d\'un général romain, gouvernait un État résiduel depuis Soissons — parfois appelé le dernier bastion romain en Gaule. Son domaine s\'étendait approximativement de la Somme à la Loire, englobant Lutèce et Rotomagus. Pendant des décennies, il maintint l\'administration romaine, la monnaie et le droit dans un monde post-romain. Mais son royaume était une île, et la marée franque montait autour de lui.',
      },
    },
    anchorYear: 465,
  },
  {
    id: 'prg-arc-clovis-unification',
    eraId: 'post-roman-gaul',
    arcId: 'post-roman-gaul',
    camera: {
      target: 'bbox',
      center: [2.0, 49.0],
      zoom: 5.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen'],
      regionIds: ['frankish-core', 'neustria'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Clovis and the Battle of Soissons',
      body: {
        en: 'In 486, the young Frankish king Clovis defeated Syagrius at the Battle of Soissons, shattering the last Roman authority in northern Gaul. It was a decisive moment: the Seine basin, with its cities, roads, and agricultural wealth, passed from Roman to Frankish hands. Clovis did not destroy what he conquered — he absorbed it. Roman tax records, Church networks, and urban infrastructure all survived under new management. The Frankish kingdom that Clovis was building would be Roman in form but Germanic in muscle.',
        fr: 'En 486, le jeune roi franc Clovis vainquit Syagrius à la bataille de Soissons, brisant la dernière autorité romaine dans le nord de la Gaule. Ce fut un moment décisif : le bassin de la Seine, avec ses villes, ses routes et sa richesse agricole, passa des mains romaines aux mains franques. Clovis ne détruisit pas ce qu\'il conquit — il l\'absorba. Les registres fiscaux romains, les réseaux ecclésiastiques et l\'infrastructure urbaine survécurent sous une nouvelle direction. Le royaume franc que Clovis construisait serait romain dans sa forme, mais germanique dans sa force.',
      },
    },
    anchorYear: 486,
  },
  {
    id: 'prg-arc-baptism',
    eraId: 'post-roman-gaul',
    arcId: 'post-roman-gaul',
    camera: {
      target: 'places',
      center: [2.3, 48.9],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris'],
      regionIds: ['frankish-core'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Baptism of Clovis',
      body: {
        en: 'Around 496, Clovis was baptised as a Catholic Christian — a political masterstroke as much as a religious conversion. While other Germanic kings were Arian heretics in the eyes of Rome, Clovis aligned himself with the Catholic bishops who still ran the cities of Gaul. The Church offered him legitimacy, literacy, and an administrative network that reached every town. In return, Clovis offered the Church a sword. This alliance between Frankish crown and Catholic Church would define the political landscape of western Europe for a thousand years.',
        fr: 'Vers 496, Clovis fut baptisé chrétien catholique — un coup de maître politique autant qu\'une conversion religieuse. Alors que d\'autres rois germaniques étaient des hérétiques ariens aux yeux de Rome, Clovis s\'aligna avec les évêques catholiques qui dirigeaient encore les villes de Gaule. L\'Église lui offrit légitimité, culture écrite et un réseau administratif atteignant chaque ville. En retour, Clovis offrit à l\'Église une épée. Cette alliance entre la couronne franque et l\'Église catholique définirait le paysage politique de l\'Europe occidentale pendant mille ans.',
      },
    },
    anchorYear: 496,
  },
  {
    id: 'prg-arc-paris-capital',
    eraId: 'post-roman-gaul',
    arcId: 'post-roman-gaul',
    camera: {
      target: 'places',
      center: [2.35, 48.86],
      zoom: 7.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris'],
      regionIds: ['frankish-core'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Paris Becomes a Royal Seat',
      body: {
        en: 'Clovis chose Paris as his capital — a Roman city reborn as a Frankish royal seat. The old island fortress of Lutetia, where Roman governors had once held court, now housed a Germanic king who spoke Latin at mass and Frankish in his war council. The basilica that would become Saint-Denis rose on the city\'s outskirts, beginning its long history as the burial church of French kings. Paris\'s central position on the Seine made it the natural hub of a kingdom that stretched from the Rhine to the Loire.',
        fr: 'Clovis choisit Paris comme capitale — une cité romaine renaissant en siège royal franc. L\'ancienne forteresse insulaire de Lutèce, où les gouverneurs romains avaient jadis tenu cour, abritait désormais un roi germanique qui parlait latin à la messe et franc dans son conseil de guerre. La basilique qui deviendrait Saint-Denis s\'éleva aux abords de la ville, commençant sa longue histoire comme église funéraire des rois de France. La position centrale de Paris sur la Seine en faisait le centre naturel d\'un royaume s\'étendant du Rhin à la Loire.',
      },
    },
    anchorYear: 508,
  },
  {
    id: 'prg-arc-division',
    eraId: 'post-roman-gaul',
    arcId: 'post-roman-gaul',
    camera: {
      target: 'bbox',
      center: [1.5, 49.0],
      zoom: 5.0,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen'],
      regionIds: ['frankish-core', 'neustria', 'lower-seine'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Death of Clovis and the Dawn of Neustria',
      body: {
        en: 'When Clovis died in 511, his kingdom was divided among his four sons — not out of weakness, but following Frankish inheritance custom that treated the realm as family property. The western portion, centred on the Seine basin with Paris and Rouen as its anchors, would become known as Neustria. The post-Roman world was over: northern Gaul was now unmistakably Frankish, Catholic, and medieval. The Roman roads still ran, the bishops still governed their cities, but a new political order had taken root — one that would shape the Seine corridor for centuries to come.',
        fr: 'Quand Clovis mourut en 511, son royaume fut divisé entre ses quatre fils — non par faiblesse, mais selon la coutume successorale franque qui traitait le royaume comme un bien familial. La partie occidentale, centrée sur le bassin de la Seine avec Paris et Rouen comme points d\'ancrage, deviendrait la Neustrie. Le monde post-romain était terminé : le nord de la Gaule était désormais incontestablement franc, catholique et médiéval. Les routes romaines couraient encore, les évêques gouvernaient encore leurs villes, mais un nouvel ordre politique avait pris racine — un ordre qui façonnerait le corridor de la Seine pour les siècles à venir.',
      },
    },
    anchorYear: 511,
  },

  // ── Neustria Arc beats ───────────────────────────────────────────
  {
    id: 'neu-arc-birth-of-neustria',
    eraId: 'neustria',
    arcId: 'neustria',
    camera: {
      target: 'bbox',
      center: [1.5, 48.8],
      zoom: 5.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen'],
      regionIds: ['neustria', 'frankish-core'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Birth of Neustria',
      body: {
        en: 'When Clovis — the first Christian king of the Franks — died in 511, his realm was divided among his sons according to Frankish custom. The western portion, stretching from the Loire to the Channel and centred on the Seine basin, became known as Neustria — the "new western land." Paris and Rouen anchored this sub-kingdom, whose identity would shape the political geography of northern Gaul for more than two centuries.',
        fr: 'Quand Clovis — le premier roi chrétien des Francs — mourut en 511, son royaume fut divisé entre ses fils selon la coutume franque. La partie occidentale, s\'étendant de la Loire à la Manche et centrée sur le bassin de la Seine, devint la Neustrie — la « nouvelle terre occidentale ». Paris et Rouen ancraient ce sous-royaume dont l\'identité façonnerait la géographie politique du nord de la Gaule pendant plus de deux siècles.',
      },
    },
    anchorYear: 511,
  },
  {
    id: 'neu-arc-paris-rouen-axis',
    eraId: 'neustria',
    arcId: 'neustria',
    camera: {
      target: 'places',
      center: [1.5, 49.0],
      zoom: 6.2,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen'],
      regionIds: ['neustria', 'lower-seine', 'frankish-core'],
      routeSegmentIds: ['seg-paris-rouen-river'],
      journeyIds: ['journey-seine-corridor'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Paris–Rouen Axis',
      body: {
        en: 'The Seine linked Neustria\'s two great cities. Paris, on its fortified island, served as a royal seat and crossroads; Rouen, downstream, controlled access to the Channel and the sea. Between them ran a river corridor that carried tolls, grain, and royal commands. This Paris–Rouen axis was the spine of Neustrian power — whoever held both cities dominated the sub-kingdom. The same corridor would later become the highway of Viking invasion.',
        fr: 'La Seine reliait les deux grandes cités de Neustrie. Paris, sur son île fortifiée, servait de siège royal et de carrefour ; Rouen, en aval, contrôlait l\'accès à la Manche et à la mer. Entre les deux coulait un corridor fluvial qui transportait péages, céréales et ordres royaux. Cet axe Paris–Rouen était l\'épine dorsale du pouvoir neustrien — quiconque tenait les deux villes dominait le sous-royaume. Ce même corridor deviendrait plus tard l\'autoroute de l\'invasion viking.',
      },
    },
    anchorYear: 540,
  },
  {
    id: 'neu-arc-neustria-austrasia',
    eraId: 'neustria',
    arcId: 'neustria',
    camera: {
      target: 'bbox',
      center: [2.0, 49.0],
      zoom: 5.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'nantes'],
      regionIds: ['neustria', 'frankish-core'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Neustria vs. Austrasia',
      body: {
        en: 'For generations, Neustria and its eastern rival Austrasia competed for supremacy over the Frankish world. Civil wars, assassinations, and shifting alliances defined Merovingian politics. Neustria\'s strength lay in the rich agricultural Seine basin and its access to Channel trade, while Austrasia drew power from the Rhineland. These fratricidal conflicts drained both kingdoms but kept their warrior aristocracies battle-hardened — and their borders in constant flux.',
        fr: 'Pendant des générations, la Neustrie et sa rivale orientale l\'Austrasie se disputèrent la suprématie sur le monde franc. Guerres civiles, assassinats et alliances changeantes définissaient la politique mérovingienne. La force de la Neustrie résidait dans le riche bassin agricole de la Seine et son accès au commerce de la Manche, tandis que l\'Austrasie tirait sa puissance de la Rhénanie. Ces conflits fratricides épuisèrent les deux royaumes mais gardèrent leurs aristocraties guerrières aguerries — et leurs frontières en perpétuel mouvement.',
      },
    },
    anchorYear: 575,
  },
  {
    id: 'neu-arc-merovingian-courts',
    eraId: 'neustria',
    arcId: 'neustria',
    camera: {
      target: 'places',
      center: [2.3, 48.9],
      zoom: 6.8,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris'],
      regionIds: ['frankish-core'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Merovingian Courts and the Rois Fainéants',
      body: {
        en: 'By the seventh century, real power in Neustria had shifted from the Merovingian kings to their mayors of the palace — chief ministers who commanded armies and controlled patronage. The kings became ceremonial figures, later mocked as "rois fainéants" (do-nothing kings). This hollowing of royal authority meant that Neustria\'s fate was decided not by crowned heads but by competing aristocratic factions based around Paris and the Île-de-France.',
        fr: 'Au septième siècle, le pouvoir réel en Neustrie s\'était déplacé des rois mérovingiens vers leurs maires du palais — des ministres en chef qui commandaient les armées et contrôlaient le patronage. Les rois devinrent des figures cérémonielles, plus tard moqués comme « rois fainéants ». Cet évidement de l\'autorité royale signifiait que le destin de la Neustrie était décidé non par des têtes couronnées, mais par des factions aristocratiques rivales basées autour de Paris et de l\'Île-de-France.',
      },
    },
    anchorYear: 640,
  },
  {
    id: 'neu-arc-jumieges',
    eraId: 'neustria',
    arcId: 'neustria',
    camera: {
      target: 'places',
      center: [0.82, 49.43],
      zoom: 8.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['jumieges', 'rouen'],
      regionIds: ['lower-seine'],
      routeSegmentIds: ['seg-rouen-estuary-river'],
      journeyIds: ['journey-seine-corridor'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Jumièges and the Monastic Seine',
      body: {
        en: 'Founded around 654, Jumièges Abbey rose on a wooded bend of the Seine between Rouen and the sea. It was part of a wave of Merovingian monastic foundations that turned the lower Seine into a corridor of prayer, learning, and — crucially — wealth. Monasteries received royal land grants, collected river tolls, and attracted pilgrims. By the late Neustrian period, the Seine valley held some of the richest religious houses in all of Gaul — a concentration of treasure that would prove irresistible to future raiders.',
        fr: 'Fondée vers 654, l\'abbaye de Jumièges s\'éleva sur un méandre boisé de la Seine entre Rouen et la mer. Elle faisait partie d\'une vague de fondations monastiques mérovingiennes qui transformèrent la basse Seine en un corridor de prière, de savoir et — fait crucial — de richesse. Les monastères recevaient des concessions royales, percevaient des péages fluviaux et attiraient des pèlerins. À la fin de la période neustrienne, la vallée de la Seine abritait certaines des maisons religieuses les plus riches de toute la Gaule — une concentration de trésors qui s\'avérerait irrésistible pour de futurs pillards.',
      },
    },
    anchorYear: 654,
  },
  {
    id: 'neu-arc-nantes-breton-march',
    eraId: 'neustria',
    arcId: 'neustria',
    camera: {
      target: 'places',
      center: [-1.55, 47.5],
      zoom: 6.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['nantes'],
      regionIds: ['neustria'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Nantes and the Breton Frontier',
      body: {
        en: 'At Neustria\'s western edge, Nantes guarded the Loire estuary and the tense frontier with the Breton peninsula. The Bretons — Celtic-speaking peoples who had migrated from Britain — resisted Frankish authority and raided eastward whenever Neustrian power wavered. Nantes changed hands repeatedly, serving as both a Frankish garrison town and a target of Breton ambition. This western instability meant that Neustria always fought on two fronts: against Austrasia to the east and Brittany to the west.',
        fr: 'À la bordure occidentale de la Neustrie, Nantes gardait l\'estuaire de la Loire et la frontière tendue avec la péninsule bretonne. Les Bretons — peuples celtophones ayant migré de Grande-Bretagne — résistaient à l\'autorité franque et lançaient des raids vers l\'est chaque fois que le pouvoir neustrien vacillait. Nantes changea de mains à plusieurs reprises, servant à la fois de ville garnison franque et de cible de l\'ambition bretonne. Cette instabilité occidentale signifiait que la Neustrie combattait toujours sur deux fronts : contre l\'Austrasie à l\'est et la Bretagne à l\'ouest.',
      },
    },
    anchorYear: 600,
  },
  {
    id: 'neu-arc-tertry',
    eraId: 'neustria',
    arcId: 'neustria',
    camera: {
      target: 'bbox',
      center: [2.0, 49.2],
      zoom: 5.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen'],
      regionIds: ['neustria', 'frankish-core'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Battle of Tertry and Austrasian Victory',
      body: {
        en: 'In 687, the Austrasian mayor of the palace, Pippin of Herstal, crushed the Neustrian army at the Battle of Tertry near Saint-Quentin. It was a turning point: Neustria lost its independence and fell under Austrasian domination. Pippin and his descendants — the Pippinids, later called Carolingians — now ruled the entire Frankish realm in all but name. The Merovingian kings remained on the throne as figureheads, but the real power had shifted east. Neustria\'s days as a rival kingdom were over.',
        fr: 'En 687, le maire du palais austrasien, Pépin de Herstal, écrasa l\'armée neustrienne à la bataille de Tertry près de Saint-Quentin. Ce fut un tournant : la Neustrie perdit son indépendance et tomba sous domination austrasienne. Pépin et ses descendants — les Pippinides, plus tard appelés Carolingiens — gouvernaient désormais tout le royaume franc, sauf de nom. Les rois mérovingiens restaient sur le trône comme figures de proue, mais le pouvoir réel s\'était déplacé vers l\'est. Les jours de la Neustrie comme royaume rival étaient comptés.',
      },
    },
    anchorYear: 687,
  },
  {
    id: 'neu-arc-carolingian-dawn',
    eraId: 'neustria',
    arcId: 'neustria',
    camera: {
      target: 'bbox',
      center: [1.2, 49.0],
      zoom: 5.0,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'jumieges', 'nantes'],
      regionIds: ['neustria', 'lower-seine', 'frankish-core'],
      routeSegmentIds: ['seg-paris-rouen-river', 'seg-rouen-estuary-river'],
      journeyIds: ['journey-seine-corridor'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes'],
    },
    copy: {
      title: 'From Sub-Kingdom to Imperial Heartland',
      body: {
        en: 'By 751, Pippin the Short — grandson of the victor at Tertry — would depose the last Merovingian king and found the Carolingian dynasty. Neustria\'s two-century story as an independent Frankish sub-kingdom was over, but its legacy endured: the Seine corridor it had built into a political and monastic powerhouse would become the richest artery of the new Carolingian empire. The abbeys, the river trade, the Paris–Rouen axis — everything Neustria created would be inherited by Charlemagne, and everything Charlemagne left undefended would be seized by the Vikings.',
        fr: 'En 751, Pépin le Bref — petit-fils du vainqueur de Tertry — déposerait le dernier roi mérovingien et fonderait la dynastie carolingienne. L\'histoire de deux siècles de la Neustrie comme sous-royaume franc indépendant prenait fin, mais son héritage perdura : le corridor de la Seine qu\'elle avait construit en puissance politique et monastique deviendrait l\'artère la plus riche du nouvel empire carolingien. Les abbayes, le commerce fluvial, l\'axe Paris–Rouen — tout ce que la Neustrie avait créé serait hérité par Charlemagne, et tout ce que Charlemagne laisserait sans défense serait saisi par les Vikings.',
      },
    },
    anchorYear: 751,
  },

  // ── Frankish & Carolingian Frontier Arc beats ────────────────────
  {
    id: 'fc-arc-carolingian-rise',
    eraId: 'frankish-carolingian',
    arcId: 'frankish-carolingian',
    camera: {
      target: 'bbox',
      center: [2.3, 48.9],
      zoom: 5.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen'],
      regionIds: ['frankish-core', 'neustria'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Rise of the Carolingian Dynasty',
      body: {
        en: 'In 751, Pippin the Short deposed the last Merovingian king and founded the Carolingian dynasty with papal blessing. Neustria, long a rival Frankish sub-kingdom centred on the Seine valley, was folded into a single royal domain. Paris and Rouen — once seats of competing Merovingian courts — became administered cities in a unified realm. This concentration of power would transform the lower Seine from a political borderland into the economic heartland of western Europe.',
        fr: 'En 751, Pépin le Bref déposa le dernier roi mérovingien et fonda la dynastie carolingienne avec la bénédiction papale. La Neustrie, longtemps un sous-royaume franc rival centré sur la vallée de la Seine, fut intégrée dans un domaine royal unique. Paris et Rouen — autrefois sièges de cours mérovingiennes rivales — devinrent des villes administrées dans un royaume unifié. Cette concentration du pouvoir transformerait la basse Seine d\'une marche politique en cœur économique de l\'Europe occidentale.',
      },
    },
    anchorYear: 751,
  },
  {
    id: 'fc-arc-charlemagne',
    eraId: 'frankish-carolingian',
    arcId: 'frankish-carolingian',
    camera: {
      target: 'bbox',
      center: [2.0, 49.0],
      zoom: 4.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'quentovic', 'nantes'],
      regionIds: ['frankish-core', 'neustria', 'channel-coast'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Charlemagne\'s Empire',
      body: {
        en: 'Crowned emperor in Rome in 800, Charlemagne built the largest western European state since antiquity. He reorganised the Church, standardised coinage, and strengthened trade networks. The Seine corridor became a critical axis linking his Île-de-France heartland to the Channel ports. Abbeys like Jumièges received royal charters and grew fabulously wealthy, while the emporium at Quentovic handled cross-Channel commerce with Anglo-Saxon England. The empire\'s very success, however, created a pattern of undefended riches along navigable rivers.',
        fr: 'Couronné empereur à Rome en 800, Charlemagne bâtit le plus grand État d\'Europe occidentale depuis l\'Antiquité. Il réorganisa l\'Église, uniformisa la monnaie et renforça les réseaux commerciaux. Le corridor de la Seine devint un axe essentiel reliant son cœur d\'Île-de-France aux ports de la Manche. Des abbayes comme Jumièges reçurent des chartes royales et s\'enrichirent fabuleusement, tandis que l\'emporium de Quentovic gérait le commerce transmanche avec l\'Angleterre anglo-saxonne. Le succès même de l\'empire créa cependant un schéma de richesses sans défense le long des fleuves navigables.',
      },
    },
    anchorYear: 800,
  },
  {
    id: 'fc-arc-seine-abbeys',
    eraId: 'frankish-carolingian',
    arcId: 'frankish-carolingian',
    camera: {
      target: 'places',
      center: [1.0, 49.4],
      zoom: 7.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'jumieges', 'paris'],
      regionIds: ['lower-seine'],
      routeSegmentIds: ['seg-paris-rouen-river', 'seg-rouen-estuary-river'],
      journeyIds: ['journey-seine-corridor'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Monastic Wealth Along the Seine',
      body: {
        en: 'The lower Seine was lined with some of the richest monasteries in Christendom. Jumièges, Saint-Wandrille, and Fontenelle controlled vast estates, collected tolls, and produced illuminated manuscripts. Rouen served as the main urban node connecting this monastic wealth to Paris upstream and the Channel downstream. Royal protection kept the abbeys secure — but that protection depended on a strong, undivided crown. The river that carried their wealth would soon carry their destroyers.',
        fr: 'La basse Seine était bordée de certains des monastères les plus riches de la chrétienté. Jumièges, Saint-Wandrille et Fontenelle contrôlaient de vastes domaines, percevaient des péages et produisaient des manuscrits enluminés. Rouen servait de nœud urbain principal reliant cette richesse monastique à Paris en amont et à la Manche en aval. La protection royale gardait les abbayes en sécurité — mais cette protection dépendait d\'une couronne forte et indivise. Le fleuve qui portait leur richesse porterait bientôt leurs destructeurs.',
      },
    },
    anchorYear: 810,
  },
  {
    id: 'fc-arc-quentovic-trade',
    eraId: 'frankish-carolingian',
    arcId: 'frankish-carolingian',
    camera: {
      target: 'places',
      center: [1.6, 50.5],
      zoom: 7.2,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quentovic', 'seine-estuary'],
      regionIds: ['channel-coast'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Quentovic and Channel Commerce',
      body: {
        en: 'Quentovic, near modern Étaples on the Channel coast, was the Carolingian empire\'s premier trading emporium. Frisian merchants, Anglo-Saxon traders, and Frankish officials converged here, exchanging goods, silver, and ideas across the narrow sea. Charlemagne regulated the port\'s tolls and its mint struck coins that circulated from Northumbria to the Rhineland. The emporium\'s prosperity depended on peaceful seas — a condition that was about to end.',
        fr: 'Quentovic, près de l\'actuelle Étaples sur la côte de la Manche, était le premier emporium commercial de l\'Empire carolingien. Marchands frisons, commerçants anglo-saxons et fonctionnaires francs convergeaient ici, échangeant marchandises, argent et idées à travers le détroit. Charlemagne réglementait les péages du port et son atelier monétaire frappait des pièces qui circulaient de la Northumbrie à la Rhénanie. La prospérité de l\'emporium dépendait de mers paisibles — une condition qui allait bientôt disparaître.',
      },
    },
    anchorYear: 815,
  },
  {
    id: 'fc-arc-louis-pious',
    eraId: 'frankish-carolingian',
    arcId: 'frankish-carolingian',
    camera: {
      target: 'bbox',
      center: [2.0, 49.0],
      zoom: 5.2,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen'],
      regionIds: ['frankish-core', 'neustria'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Louis the Pious and the Fracturing Empire',
      body: {
        en: 'Louis the Pious inherited Charlemagne\'s empire in 814 and held it together for a generation — but at enormous cost. His sons revolted repeatedly, and the resulting civil wars drained military resources from frontier defence. Coastal garrisons thinned, river patrols lapsed, and local counts found themselves without reinforcements. The very structure that had made the empire strong — centralised command — became its weakness: when the centre wavered, the periphery was left exposed.',
        fr: 'Louis le Pieux hérita de l\'empire de Charlemagne en 814 et le maintint uni pendant une génération — mais à un coût énorme. Ses fils se révoltèrent à répétition, et les guerres civiles qui en résultèrent drainèrent les ressources militaires de la défense des frontières. Les garnisons côtières s\'amenuisèrent, les patrouilles fluviales cessèrent, et les comtes locaux se retrouvèrent sans renforts. La structure même qui avait rendu l\'empire fort — le commandement centralisé — devint sa faiblesse : quand le centre vacillait, la périphérie était exposée.',
      },
    },
    anchorYear: 830,
  },
  {
    id: 'fc-arc-verdun',
    eraId: 'frankish-carolingian',
    arcId: 'frankish-carolingian',
    camera: {
      target: 'bbox',
      center: [1.5, 49.0],
      zoom: 5.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'nantes'],
      regionIds: ['frankish-core', 'neustria', 'channel-coast'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Death of Louis and the Treaty of Verdun',
      body: {
        en: 'Louis the Pious died in 840, and the empire immediately plunged into civil war. The Treaty of Verdun in 843 split the Carolingian realm into three kingdoms. West Francia — roughly modern France — fell to Charles the Bald, but his authority was fragile. The military machine that Charlemagne had built to defend the coasts and rivers no longer answered to a single command. The Channel and Seine frontiers, once interior corridors of a vast empire, were now exposed borders of a weakened state.',
        fr: 'Louis le Pieux mourut en 840 et l\'empire plongea immédiatement dans la guerre civile. Le traité de Verdun en 843 divisa le royaume carolingien en trois royaumes. La Francie occidentale — approximativement la France moderne — échut à Charles le Chauve, mais son autorité était fragile. La machine militaire que Charlemagne avait construite pour défendre les côtes et les fleuves ne répondait plus à un commandement unique. Les frontières de la Manche et de la Seine, autrefois corridors intérieurs d\'un vaste empire, étaient désormais des bordures exposées d\'un État affaibli.',
      },
    },
    anchorYear: 840,
  },
  {
    id: 'fc-arc-first-raids',
    eraId: 'frankish-carolingian',
    arcId: 'frankish-carolingian',
    camera: {
      target: 'places',
      center: [0.9, 49.4],
      zoom: 6.6,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['seine-estuary', 'rouen', 'jumieges'],
      regionIds: ['lower-seine', 'channel-coast'],
      routeSegmentIds: ['seg-estuary-rouen-raid', 'seg-rouen-jumieges-raid'],
      journeyIds: ['journey-seine-raids'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'origins'],
    },
    copy: {
      title: 'The First Norse Ships on the Seine',
      body: {
        en: 'In 841, the year after Louis\'s death, Norse longships entered the Seine estuary for the first time. The raiders struck Rouen almost without resistance and sacked the great abbey of Jumièges. These were not random attacks: Scandinavian merchants had long known the wealth that flowed along the Seine, and the Carolingian civil wars signalled that the river\'s defences had collapsed. The first raids were a reconnaissance in force — testing a frontier that could no longer hold.',
        fr: 'En 841, l\'année suivant la mort de Louis, des drakkars scandinaves entrèrent dans l\'estuaire de la Seine pour la première fois. Les raiders frappèrent Rouen presque sans résistance et pillèrent la grande abbaye de Jumièges. Ce n\'étaient pas des attaques aléatoires : les marchands scandinaves connaissaient depuis longtemps la richesse qui coulait le long de la Seine, et les guerres civiles carolingiennes signalaient que les défenses du fleuve s\'étaient effondrées. Les premiers raids furent une reconnaissance en force — testant une frontière qui ne pouvait plus tenir.',
      },
    },
    anchorYear: 841,
  },
  {
    id: 'fc-arc-storm-horizon',
    eraId: 'frankish-carolingian',
    arcId: 'frankish-carolingian',
    camera: {
      target: 'bbox',
      center: [1.0, 50.0],
      zoom: 5.0,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['seine-estuary', 'rouen', 'nantes', 'quentovic', 'paris'],
      regionIds: ['neustria', 'lower-seine', 'channel-coast', 'frankish-core'],
      routeSegmentIds: ['seg-estuary-rouen-raid', 'seg-rouen-paris-incursion', 'seg-atlantic-loire'],
      journeyIds: ['journey-seine-raids', 'journey-loire-raids'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes'],
    },
    copy: {
      title: 'On the Eve of the Viking Age',
      body: {
        en: 'By 841, the stage was set. The Carolingian empire that had made the Seine and Loire corridors rich had also — through its collapse — left them defenceless. Norse fleets now probed every major river mouth from Nantes to Quentovic. What began as seasonal raids would escalate into full-scale invasions, winter camps, and eventually permanent settlement. The Frankish & Carolingian era closed not with a quiet succession but with smoke rising over the abbeys of the lower Seine — the opening act of the Viking Age.',
        fr: 'En 841, le décor était planté. L\'empire carolingien qui avait enrichi les corridors de la Seine et de la Loire les avait aussi — par son effondrement — laissés sans défense. Les flottes scandinaves sondaient désormais chaque embouchure de fleuve majeur, de Nantes à Quentovic. Ce qui commença comme des raids saisonniers s\'intensifierait en invasions à grande échelle, camps d\'hiver et finalement en colonisation permanente. L\'ère franque et carolingienne se ferma non par une succession paisible, mais avec de la fumée s\'élevant au-dessus des abbayes de la basse Seine — l\'acte d\'ouverture de l\'Âge Viking.',
      },
    },
    anchorYear: 841,
  },

  // ── Viking Age Arc beats ─────────────────────────────────────────
  {
    id: 'va-arc-first-raids',
    eraId: 'viking-age',
    arcId: 'viking-age',
    camera: {
      target: 'places',
      center: [0.9, 49.5],
      zoom: 6.4,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['seine-estuary', 'rouen', 'jumieges'],
      regionIds: ['lower-seine', 'channel-coast'],
      routeSegmentIds: ['seg-estuary-rouen-raid', 'seg-rouen-jumieges-raid'],
      journeyIds: ['journey-seine-raids'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'origins'],
    },
    copy: {
      title: 'The First Raids on the Seine',
      body: {
        en: 'In 841, Norse longships entered the Seine estuary for the first time, catching the Frankish defences unprepared. Raiders struck Rouen and sacked the great abbey of Jumieges. These were not random forays: the Seine was a highway into one of the richest parts of the Carolingian empire, lined with wealthy monasteries and undefended river towns. The first raids announced a pattern that would repeat for decades.',
        fr: 'En 841, des drakkars scandinaves entrèrent pour la première fois dans l\'estuaire de la Seine, prenant les défenses franques au dépourvu. Les raiders frappèrent Rouen et pillèrent la grande abbaye de Jumièges. Ce n\'étaient pas des incursions aléatoires : la Seine était une autoroute vers l\'une des régions les plus riches de l\'Empire carolingien, bordée de monastères fortunés et de villes fluviales sans défense. Les premiers raids annonçaient un schéma qui se répéterait pendant des décennies.',
      },
    },
    anchorYear: 841,
  },
  {
    id: 'va-arc-seine-highway',
    eraId: 'viking-age',
    arcId: 'viking-age',
    camera: {
      target: 'bbox',
      center: [1.2, 49.0],
      zoom: 5.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['seine-estuary', 'rouen', 'jumieges', 'paris'],
      regionIds: ['lower-seine', 'frankish-core'],
      routeSegmentIds: ['seg-estuary-rouen-raid', 'seg-rouen-jumieges-raid', 'seg-rouen-paris-incursion'],
      journeyIds: ['journey-seine-raids'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Seine as Invasion Highway',
      body: {
        en: 'Through the 840s–880s, Viking fleets used the Seine as a repeating invasion corridor. They wintered on river islands, extorted Danegeld from Frankish towns, and struck deeper each year. Monasteries like Jumièges, Saint-Wandrille, and Fontenelle were sacked and abandoned. The river that had been the Carolingian heartland\'s greatest asset — linking Paris to the sea — became its fatal vulnerability.',
        fr: 'Au cours des années 840 à 880, les flottes vikings utilisèrent la Seine comme corridor d\'invasion récurrent. Ils hivernaient sur les îles fluviales, extorquaient le Danegeld aux villes franques, et frappaient plus profondément chaque année. Des monastères comme Jumièges, Saint-Wandrille et Fontenelle furent pillés et abandonnés. Le fleuve qui avait été le plus grand atout du cœur carolingien — reliant Paris à la mer — devint sa vulnérabilité fatale.',
      },
    },
    anchorYear: 856,
  },
  {
    id: 'va-arc-wider-raids',
    eraId: 'viking-age',
    arcId: 'viking-age',
    camera: {
      target: 'bbox',
      center: [1.0, 49.0],
      zoom: 4.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['nantes', 'paris', 'seine-estuary'],
      regionIds: ['lower-seine', 'frankish-core', 'channel-coast'],
      routeSegmentIds: ['seg-atlantic-loire', 'seg-northsea-rhine'],
      journeyIds: ['journey-loire-raids', 'journey-rhine-raids'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes'],
    },
    copy: {
      title: 'Not Just the Seine: Loire, Rhine, and Beyond',
      body: {
        en: 'The Seine was not the only target. Vikings sacked Nantes in 843, used the Loire as a highway into central Francia, and sent fleets up the Rhine and Meuse to ravage Dorestad, Utrecht, and Cologne. Every major navigable river in Carolingian Francia was penetrated. The empire was under assault from the Atlantic to the Low Countries, and the decentralised Frankish military response — local counts and bishops organising ad hoc defences — could not match the speed and coordination of the Norse fleets.',
        fr: 'La Seine n\'était pas la seule cible. Les Vikings pillèrent Nantes en 843, utilisèrent la Loire comme voie de pénétration vers le centre de la Francie, et envoyèrent des flottes remonter le Rhin et la Meuse pour ravager Dorestad, Utrecht et Cologne. Chaque grand fleuve navigable de la Francie carolingienne fut pénétré. L\'empire était assailli de l\'Atlantique aux Pays-Bas, et la réponse militaire franque décentralisée — comtes et évêques organisant des défenses improvisées — ne pouvait rivaliser avec la vitesse et la coordination des flottes scandinaves.',
      },
    },
    anchorYear: 862,
  },
  {
    id: 'va-arc-siege-of-paris',
    eraId: 'viking-age',
    arcId: 'viking-age',
    camera: {
      target: 'places',
      center: [2.35, 48.86],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'seine-estuary'],
      regionIds: ['frankish-core', 'lower-seine'],
      routeSegmentIds: ['seg-rouen-paris-incursion'],
      journeyIds: ['journey-seine-raids'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The Siege of Paris (885)',
      body: {
        en: 'In 885, a massive Norse fleet — perhaps 300 ships and 30,000 men — sailed up the Seine and laid siege to Paris. For over a year, the garrison on the Île de la Cité, led by Count Odo and Bishop Gozlin, held out against repeated assaults. The Frankish emperor Charles the Fat eventually arrived with an army — but instead of fighting, he paid the Vikings to withdraw and raid Burgundy instead. The humiliation destroyed what remained of Carolingian military credibility in the west.',
        fr: 'En 885, une flotte scandinave massive — peut-être 300 navires et 30 000 hommes — remonta la Seine et assiégea Paris. Pendant plus d\'un an, la garnison de l\'Île de la Cité, menée par le comte Eudes et l\'évêque Gozlin, résista aux assauts répétés. L\'empereur franc Charles le Gros arriva finalement avec une armée — mais au lieu de combattre, il paya les Vikings pour qu\'ils se retirent et aillent piller la Bourgogne. L\'humiliation détruisit ce qui restait de crédibilité militaire carolingienne en Occident.',
      },
    },
    anchorYear: 885,
  },
  {
    id: 'va-arc-danelaw-england',
    eraId: 'viking-age',
    arcId: 'viking-age',
    camera: {
      target: 'bbox',
      center: [0.0, 53.0],
      zoom: 4.6,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['denmark-origin', 'york-jorvik', 'danelaw-origin'],
      regionIds: ['danelaw'],
      routeSegmentIds: ['seg-denmark-northsea-coast', 'seg-york-channel'],
      journeyIds: ['journey-danish-northsea-lane'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The Danelaw: Viking England',
      body: {
        en: 'The Great Heathen Army invaded England in 865, and within a decade much of eastern and northern England was under Scandinavian control — the Danelaw. York became its capital as Jorvik, a thriving Viking city. The Danelaw persisted for over a century and created a pool of Anglo-Scandinavian settlers, warriors, and traders. Some of these Danelaw families would later cross the Channel to Normandy after 911, adding another layer to the Norman population.',
        fr: 'La Grande Armée païenne envahit l\'Angleterre en 865, et en une décennie une grande partie de l\'est et du nord de l\'Angleterre était sous contrôle scandinave — le Danelaw. York devint sa capitale sous le nom de Jórvík, une cité viking prospère. Le Danelaw persista pendant plus d\'un siècle et créa un réservoir de colons, guerriers et marchands anglo-scandinaves. Certaines de ces familles du Danelaw traverseraient plus tard la Manche vers la Normandie après 911, ajoutant une couche supplémentaire à la population normande.',
      },
    },
    anchorYear: 878,
  },
  {
    id: 'va-arc-norse-gaelic',
    eraId: 'viking-age',
    arcId: 'viking-age',
    camera: {
      target: 'bbox',
      center: [-6.0, 56.0],
      zoom: 4.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['norway-origin', 'orkney', 'hebrides-node', 'isle-of-man-node', 'dublin'],
      regionIds: ['norse-gaelic-sphere'],
      routeSegmentIds: ['seg-celtic-norway-scotland', 'seg-celtic-scotland-hebrides', 'seg-celtic-hebrides-man'],
      journeyIds: ['journey-celtic-sea-route'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'The Norse-Gaelic World',
      body: {
        en: 'Norwegian Vikings established a maritime network across Scotland, the Hebrides, the Isle of Man, and Ireland from the late eighth century. Dublin, founded as a longphort around 841, became a slave-trading hub and the political anchor of a Norse-Gaelic world where Scandinavian and Celtic cultures merged. The Orkney jarldom, under Norwegian sovereignty, controlled the northern approaches. This western Norse sphere would contribute settlers to Normandy via the Celtic Sea route — a distinct migration stream alongside the better-known Danish Seine corridor.',
        fr: 'Les Vikings norvégiens établirent un réseau maritime à travers l\'Écosse, les Hébrides, l\'île de Man et l\'Irlande dès la fin du VIIIe siècle. Dublin, fondé comme longphort vers 841, devint une plaque tournante du commerce d\'esclaves et l\'ancre politique d\'un monde norso-gaélique où cultures scandinave et celtique fusionnèrent. Le comté d\'Orkney, sous souveraineté norvégienne, contrôlait les approches septentrionales. Cette sphère scandinave occidentale contribuerait des colons à la Normandie via la route de la mer Celtique — un courant migratoire distinct parallèle au corridor danois de la Seine.',
      },
    },
    anchorYear: 870,
  },
  {
    id: 'va-arc-varangian-east',
    eraId: 'viking-age',
    arcId: 'viking-age',
    camera: {
      target: 'bbox',
      center: [30.0, 52.0],
      zoom: 3.4,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['birka', 'hedeby', 'novgorod', 'kiev', 'constantinople', 'bulgar-on-volga'],
      regionIds: ['kievan-rus-zone'],
      routeSegmentIds: ['seg-birka-ladoga', 'seg-ladoga-novgorod', 'seg-novgorod-kiev', 'seg-kiev-constantinople', 'seg-novgorod-bulgar'],
      journeyIds: ['journey-eastern-rivers', 'journey-dnieper-route', 'journey-volga-route'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Eastern Rivers: Varangians to the Greeks',
      body: {
        en: 'While Danes and Norwegians raided westward, Swedish Varangians opened the river systems of eastern Europe. From Birka and Hedeby, traders crossed the Baltic to Staraya Ladoga and Novgorod, then followed the Dnieper south to Kiev and Constantinople, or the Volga east to the Islamic silver markets at Bulgar. These routes created the Kievan Rus, supplied the Byzantine Varangian Guard, and pumped thousands of Arabic dirhams back into Scandinavia. The Viking world was not just an Atlantic phenomenon — it stretched from Vinland to Baghdad.',
        fr: 'Tandis que Danois et Norvégiens pillaient vers l\'ouest, les Varègues suédois ouvrirent les systèmes fluviaux d\'Europe orientale. Depuis Birka et Hedeby, les marchands traversèrent la Baltique vers Staraya Ladoga et Novgorod, puis suivirent le Dniepr vers le sud jusqu\'à Kiev et Constantinople, ou la Volga vers l\'est jusqu\'aux marchés d\'argent islamiques de Bulgar. Ces routes créèrent la Rus kiévienne, alimentèrent la Garde varangienne byzantine, et déversèrent des milliers de dirhams arabes en Scandinavie. Le monde viking n\'était pas qu\'un phénomène atlantique — il s\'étendait du Vinland à Bagdad.',
      },
    },
    anchorYear: 880,
  },
  {
    id: 'va-arc-from-raids-to-treaty',
    eraId: 'viking-age',
    arcId: 'viking-age',
    camera: {
      target: 'bbox',
      center: [1.0, 49.2],
      zoom: 5.6,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'seine-estuary'],
      regionIds: ['normandy', 'lower-seine', 'frankish-core'],
      routeSegmentIds: ['seg-denmark-seine', 'seg-seine-rouen-migration'],
      journeyIds: ['journey-danish-migration', 'journey-seine-corridor'],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['origins', 'destinations'],
    },
    copy: {
      title: 'From Raiding to Settlement',
      body: {
        en: 'By the early tenth century, decades of raiding had transformed the lower Seine from a Frankish heartland into a contested frontier. Norse war-bands had settled semi-permanently along the river. The Carolingian kings, weakened by civil wars and unable to stop the raids, chose negotiation. In 911, Charles the Simple ceded the lower Seine territory to the Viking leader Rollo in exchange for a defensive buffer against future Norse incursions. The Treaty of Saint-Clair-sur-Epte marked the end of the Viking Age on the Seine — and the beginning of Normandy.',
        fr: 'Au début du Xe siècle, des décennies de raids avaient transformé la basse Seine d\'un cœur franc en une frontière contestée. Des bandes guerrières scandinaves s\'étaient installées semi-permanemment le long du fleuve. Les rois carolingiens, affaiblis par les guerres civiles et incapables d\'arrêter les raids, choisirent la négociation. En 911, Charles le Simple céda le territoire de la basse Seine au chef viking Rollon en échange d\'un tampon défensif contre de futures incursions scandinaves. Le traité de Saint-Clair-sur-Epte marqua la fin de l\'ère viking sur la Seine — et le début de la Normandie.',
      },
    },
    anchorYear: 911,
  },

  // ── Norman Origins Arc beats ──────────────────────────────────────
  {
    id: 'no-arc-treaty',
    eraId: 'norman-origins',
    arcId: 'norman-origins',
    camera: {
      target: 'bbox',
      center: [1.0, 49.3],
      zoom: 6.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'seine-estuary'],
      regionIds: ['lower-seine', 'normandy'],
      routeSegmentIds: ['seg-estuary-rouen-settlement'],
      journeyIds: ['journey-viking-settlement'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The Treaty of Saint-Clair-sur-Epte',
      body: {
        en: 'In 911, the Frankish king Charles the Simple ceded the lower Seine territory to the Viking chieftain Rollo in exchange for a promise to defend the river against further Norse raids. The Treaty of Saint-Clair-sur-Epte was not a generous gift but the recognition of a fait accompli: Frankish power had already lost control of the region. Rollo and his followers received Rouen and the lands around the Seine estuary — the nucleus of what would become Normandy.',
        fr: 'En 911, le roi franc Charles le Simple céda le territoire de la basse Seine au chef viking Rollon en échange de la promesse de défendre le fleuve contre de nouveaux raids scandinaves. Le traité de Saint-Clair-sur-Epte n\'était pas un don généreux mais la reconnaissance d\'un fait accompli : le pouvoir franc avait déjà perdu le contrôle de la région. Rollon et ses partisans reçurent Rouen et les terres autour de l\'estuaire de la Seine — le noyau de ce qui deviendrait la Normandie.',
      },
    },
    anchorYear: 911,
  },
  {
    id: 'no-arc-danish-migration',
    eraId: 'norman-origins',
    arcId: 'norman-origins',
    camera: {
      target: 'bbox',
      center: [3.0, 53.0],
      zoom: 4.4,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['denmark-origin', 'seine-estuary', 'rouen', 'york-jorvik'],
      regionIds: ['normandy', 'danelaw'],
      routeSegmentIds: ['seg-denmark-seine', 'seg-seine-rouen-migration', 'seg-york-channel'],
      journeyIds: ['journey-danish-migration', 'journey-danish-northsea-lane'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'origins'],
    },
    copy: {
      title: 'Where the Settlers Came From',
      body: {
        en: 'The settlers who populated early Normandy were not a single group. The political core around Rouen drew heavily on Danish networks — the same North Sea lanes that had fed the Great Heathen Army and the Danelaw. Anglo-Scandinavian families from the Danelaw also crossed to Normandy as farmers and traders after 911, reinforcing the Norse population of the Bessin and interior lowlands. The colony was Scandinavian, but it was already diverse from the start.',
        fr: 'Les colons qui peuplèrent la Normandie primitive ne formaient pas un groupe unique. Le noyau politique autour de Rouen puisa largement dans les réseaux danois — les mêmes voies de la mer du Nord qui avaient alimenté la Grande Armée et le Danelaw. Des familles anglo-scandinaves du Danelaw traversèrent aussi vers la Normandie comme fermiers et marchands après 911, renforçant la population scandinave du Bessin et des basses terres intérieures. La colonie était scandinave, mais déjà diverse dès le départ.',
      },
    },
    anchorYear: 920,
  },
  {
    id: 'no-arc-celtic-sea',
    eraId: 'norman-origins',
    arcId: 'norman-origins',
    camera: {
      target: 'bbox',
      center: [-4.0, 52.0],
      zoom: 4.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['norway-origin', 'cotentin-landing', 'hebrides-node', 'isle-of-man-node'],
      regionIds: ['normandy', 'norse-gaelic-sphere', 'channel-coast'],
      routeSegmentIds: [
        'seg-celtic-norway-scotland',
        'seg-celtic-scotland-hebrides',
        'seg-celtic-hebrides-man',
        'seg-celtic-irish-sea',
        'seg-celtic-sea-south',
        'seg-celtic-into-channel',
        'seg-celtic-to-cotentin',
      ],
      journeyIds: ['journey-celtic-sea-route'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Norwegian Route via the Celtic Sea',
      body: {
        en: 'A second, less well-known migration corridor fed western Normandy. Norwegian Vikings who had settled the Hebrides, Isle of Man, and Ireland sailed south through the Celtic Sea and around Cornwall into the Channel, reaching the Cotentin peninsula and the Channel Islands. Archaeological finds, Cotentin place-names with Norse roots, and distinctive burial practices tie western Normandy to this Irish Sea network — a reminder that the duchy was built from multiple Viking streams, not just the Danish Seine corridor.',
        fr: 'Un second corridor migratoire, moins connu, alimenta l\'ouest de la Normandie. Des Vikings norvégiens installés dans les Hébrides, l\'île de Man et l\'Irlande naviguèrent vers le sud par la mer Celtique et autour de la Cornouailles pour entrer dans la Manche, atteignant la presqu\'île du Cotentin et les îles Anglo-Normandes. Des découvertes archéologiques, des toponymes du Cotentin aux racines scandinaves et des pratiques funéraires distinctives rattachent la Normandie occidentale à ce réseau de la mer d\'Irlande — rappelant que le duché fut construit à partir de multiples courants vikings, pas seulement du corridor danois de la Seine.',
      },
    },
    anchorYear: 930,
  },
  {
    id: 'no-arc-territorial-growth',
    eraId: 'norman-origins',
    arcId: 'norman-origins',
    camera: {
      target: 'bbox',
      center: [0.0, 49.2],
      zoom: 6.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'caen', 'seine-estuary', 'cotentin-landing'],
      regionIds: ['normandy', 'lower-seine', 'channel-coast'],
      routeSegmentIds: ['seg-estuary-rouen-settlement', 'seg-rouen-caen-settlement'],
      journeyIds: ['journey-viking-settlement'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Territorial Expansion: Bessin, Cotentin, Avranchin',
      body: {
        en: 'Rollo\'s original grant covered only the lower Seine around Rouen. His successors expanded steadily westward: the Bessin was annexed in 924, and the Cotentin and Avranchin in 933. By the mid-tenth century, the duchy stretched from the Epte river to the Atlantic coast of the Cotentin — roughly the shape of historic Normandy that would endure for centuries. Each annexation brought new populations under Norman rule and extended the ducal frontier.',
        fr: 'La concession originale de Rollon ne couvrait que la basse Seine autour de Rouen. Ses successeurs s\'étendirent régulièrement vers l\'ouest : le Bessin fut annexé en 924, puis le Cotentin et l\'Avranchin en 933. Au milieu du Xe siècle, le duché s\'étendait de la rivière Epte à la côte atlantique du Cotentin — à peu près la forme de la Normandie historique qui perdurerait pendant des siècles. Chaque annexion amena de nouvelles populations sous l\'autorité normande et étendit la frontière ducale.',
      },
    },
    anchorYear: 933,
  },
  {
    id: 'no-arc-cultural-fusion',
    eraId: 'norman-origins',
    arcId: 'norman-origins',
    camera: {
      target: 'places',
      center: [0.5, 49.3],
      zoom: 6.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'jumieges', 'caen'],
      regionIds: ['normandy', 'lower-seine'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Cultural Fusion: Norse Meets Frankish',
      body: {
        en: 'Within two or three generations, the Norse settlers had adopted the French language, Frankish legal customs, and Christianity. Rollo himself was baptized as part of the 911 treaty. Monasteries sacked during the Viking Age — Jumièges, Mont-Saint-Michel, Saint-Wandrille — were restored and lavishly endowed by the new Norman dukes. Yet the warrior ethos, maritime skill, and taste for ambitious military ventures remained. The result was a hybrid culture: French-speaking, devoutly Christian, but with a Scandinavian edge that set the Normans apart from their neighbours.',
        fr: 'En deux ou trois générations, les colons scandinaves avaient adopté la langue française, les coutumes juridiques franques et le christianisme. Rollon lui-même fut baptisé dans le cadre du traité de 911. Les monastères saccagés pendant l\'ère viking — Jumièges, le Mont-Saint-Michel, Saint-Wandrille — furent restaurés et richement dotés par les nouveaux ducs normands. Pourtant, l\'ethos guerrier, le savoir maritime et le goût des entreprises militaires ambitieuses demeurèrent. Le résultat fut une culture hybride : francophone, profondément chrétienne, mais avec un tranchant scandinave qui distinguait les Normands de leurs voisins.',
      },
    },
    anchorYear: 960,
  },
  {
    id: 'no-arc-wider-viking-world',
    eraId: 'norman-origins',
    arcId: 'norman-origins',
    camera: {
      target: 'bbox',
      center: [10.0, 55.0],
      zoom: 3.0,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['denmark-origin', 'norway-origin', 'york-jorvik', 'dublin', 'novgorod', 'kiev', 'constantinople', 'iceland', 'greenland', 'vinland'],
      regionIds: ['danelaw', 'norse-gaelic-sphere', 'kievan-rus-zone'],
      routeSegmentIds: [],
      journeyIds: ['journey-eastern-rivers', 'journey-dnieper-route', 'journey-atlantic-norse'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: false,
      pulse: ['routes'],
    },
    copy: {
      title: 'Normandy in the Viking World',
      body: {
        en: 'While the Norman duchy was consolidating, the wider Viking world was at its peak. Scandinavian trade routes stretched from Vinland in the west to Constantinople and Baghdad in the east. The Danelaw in England, the Norse-Gaelic kingdoms of Ireland and Scotland, the Kievan Rus, and the Icelandic and Greenlandic settlements formed an interconnected network. Normandy was one node in this vast system — its settlers came from these networks, and its early ducal court maintained connections across Scandinavia long after the adoption of French culture.',
        fr: 'Tandis que le duché normand se consolidait, le monde viking atteignait son apogée. Les routes commerciales scandinaves s\'étendaient du Vinland à l\'ouest jusqu\'à Constantinople et Bagdad à l\'est. Le Danelaw en Angleterre, les royaumes norso-gaéliques d\'Irlande et d\'Écosse, la Rus kiévienne, et les colonies islandaises et groenlandaises formaient un réseau interconnecté. La Normandie était un nœud dans ce vaste système — ses colons venaient de ces réseaux, et sa cour ducale primitive maintenait des connexions à travers la Scandinavie longtemps après l\'adoption de la culture française.',
      },
    },
    anchorYear: 1000,
  },
  {
    id: 'no-arc-duchy-consolidated',
    eraId: 'norman-origins',
    arcId: 'norman-origins',
    camera: {
      target: 'bbox',
      center: [0.2, 49.2],
      zoom: 5.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'caen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Duchy Consolidated',
      body: {
        en: 'By the mid-eleventh century, Normandy had become the most tightly governed principality in France. Duke William (later "the Conqueror") inherited a territory with a reformed Church, a castle network that enforced ducal authority, and a feudal aristocracy bound by personal loyalty. Administrative innovations — traveling justices, detailed land records, a centralized mint at Rouen — gave the duke control that rivalled the French king. Caen rose as a second ducal capital, its twin abbeys (Abbaye aux Hommes and Abbaye aux Dames) a statement of Norman piety and ambition. The duchy was ready to project its power outward.',
        fr: 'Au milieu du XIe siècle, la Normandie était devenue la principauté la mieux gouvernée de France. Le duc Guillaume (futur « le Conquérant ») hérita d\'un territoire avec une Église réformée, un réseau de châteaux imposant l\'autorité ducale, et une aristocratie féodale liée par la loyauté personnelle. Des innovations administratives — juges itinérants, registres fonciers détaillés, un atelier monétaire centralisé à Rouen — donnaient au duc un contrôle rivalisant avec celui du roi de France. Caen s\'éleva comme seconde capitale ducale, ses abbayes jumelles (Abbaye aux Hommes et Abbaye aux Dames) une déclaration de piété et d\'ambition normandes. Le duché était prêt à projeter sa puissance vers l\'extérieur.',
      },
    },
    anchorYear: 1050,
  },
  {
    id: 'no-arc-eve-of-conquest',
    eraId: 'norman-origins',
    arcId: 'norman-origins',
    camera: {
      target: 'bbox',
      center: [0.0, 50.0],
      zoom: 5.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'caen', 'hastings'],
      regionIds: ['normandy', 'channel-coast'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The Eve of 1066',
      body: {
        en: 'When Edward the Confessor died in January 1066, Duke William claimed the English throne. In less than 150 years, a Viking war-band grant on the lower Seine had transformed into one of Europe\'s most formidable polities — French-speaking, Christian, administratively advanced, and led by a duke whose ambition matched his resources. The invasion fleet assembling at Saint-Valéry-sur-Somme would carry not just soldiers but an entire governing system across the Channel. Everything that followed — the conquest of England, the Norman kingdoms of Sicily, the Crusader principalities — grew from the crucible of this small duchy on the Seine.',
        fr: 'Lorsqu\'Édouard le Confesseur mourut en janvier 1066, le duc Guillaume revendiqua le trône d\'Angleterre. En moins de 150 ans, une concession de guerre viking sur la basse Seine s\'était transformée en l\'une des entités politiques les plus redoutables d\'Europe — francophone, chrétienne, administrativement avancée, et dirigée par un duc dont l\'ambition égalait les ressources. La flotte d\'invasion rassemblée à Saint-Valéry-sur-Somme transporterait non seulement des soldats mais tout un système de gouvernement à travers la Manche. Tout ce qui suivit — la conquête de l\'Angleterre, les royaumes normands de Sicile, les principautés croisées — naquit du creuset de ce petit duché sur la Seine.',
      },
    },
    anchorYear: 1066,
  },

  // ── Norman Expansion Arc beats ────────────────────────────────────
  {
    id: 'ne-arc-duchy-base',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'bbox',
      center: [0.2, 49.3],
      zoom: 6.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'caen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Duchy as Launch Pad',
      body: {
        en: 'By the mid-eleventh century the Duchy of Normandy was the most militarily formidable polity in northern France. A warrior aristocracy, castle-building on an industrial scale, and a reformed Church gave Duke William a power base unmatched by his neighbours. That concentrated energy was about to burst outward — across the Channel, into the Mediterranean, and ultimately to the gates of Jerusalem.',
        fr: 'Au milieu du XIe siècle, le duché de Normandie était l\'entité politique la plus redoutable militairement du nord de la France. Une aristocratie guerrière, des constructions de châteaux à l\'échelle industrielle et une Église réformée donnaient au duc Guillaume une base de pouvoir inégalée. Cette énergie concentrée allait bientôt éclater — à travers la Manche, en Méditerranée, et jusqu\'aux portes de Jérusalem.',
      },
    },
    anchorYear: 1066,
  },
  {
    id: 'ne-arc-england',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'bbox',
      center: [0.0, 50.5],
      zoom: 5.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'caen', 'hastings', 'london'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Conquest of England',
      body: {
        en: 'William\'s victory at Hastings in 1066 created an Anglo-Norman realm spanning both sides of the Channel. England was reshaped: a new aristocracy, castle networks from the Tower of London to the Welsh marches, Domesday Book, and the introduction of Norman French into law and culture. The conquest made Normandy the centre of a cross-Channel empire — but it also tied the duchy\'s fate to the English crown.',
        fr: 'La victoire de Guillaume à Hastings en 1066 créa un royaume anglo-normand s\'étendant des deux côtés de la Manche. L\'Angleterre fut transformée : une nouvelle aristocratie, des réseaux de châteaux de la Tour de Londres aux marches galloises, le Domesday Book, et l\'introduction du franco-normand dans le droit et la culture. La conquête fit de la Normandie le centre d\'un empire transmanche — mais lia aussi le destin du duché à la couronne anglaise.',
      },
    },
    anchorYear: 1066,
  },
  {
    id: 'ne-arc-southern-italy',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'bbox',
      center: [12.0, 42.0],
      zoom: 4.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bari', 'palermo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Southern Italy & the Kingdom of Sicily',
      body: {
        en: 'Norman adventurers — younger sons with few prospects at home — arrived in southern Italy as mercenaries in the early eleventh century. Within decades the Hauteville family had conquered Apulia, Calabria, and finally Sicily from the Arabs. Roger II united these conquests into the Kingdom of Sicily in 1130, blending Norman, Byzantine, Arab, and Latin traditions into one of medieval Europe\'s most sophisticated states.',
        fr: 'Des aventuriers normands — cadets sans perspectives chez eux — arrivèrent en Italie du Sud comme mercenaires au début du XIe siècle. En quelques décennies, la famille Hauteville avait conquis les Pouilles, la Calabre, puis la Sicile sur les Arabes. Roger II unifia ces conquêtes dans le Royaume de Sicile en 1130, mêlant traditions normande, byzantine, arabe et latine en l\'un des États les plus raffinés de l\'Europe médiévale.',
      },
    },
    anchorYear: 1130,
  },
  {
    id: 'ne-arc-crusades',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'bbox',
      center: [25.0, 38.0],
      zoom: 3.6,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['antioch', 'bari'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Normans in the Crusades',
      body: {
        en: 'Norman lords were among the most prominent leaders of the First Crusade (1096–1099). Bohemond of Taranto carved out the Principality of Antioch; his nephew Tancred held Galilee. Norman military techniques — heavy cavalry charges, castle construction, feudal organisation — became the template for Crusader states across the Levant. A century later, Richard the Lionheart (of Norman descent) conquered Cyprus on his way to the Third Crusade.',
        fr: 'Les seigneurs normands figuraient parmi les chefs les plus éminents de la Première Croisade (1096–1099). Bohémond de Tarente s\'empara de la Principauté d\'Antioche ; son neveu Tancrède tint la Galilée. Les techniques militaires normandes — charges de cavalerie lourde, construction de châteaux, organisation féodale — devinrent le modèle des États croisés au Levant. Un siècle plus tard, Richard Cœur de Lion (de lignée normande) conquit Chypre en route vers la Troisième Croisade.',
      },
    },
    anchorYear: 1098,
  },
  {
    id: 'ne-arc-periphery',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'bbox',
      center: [-4.0, 52.0],
      zoom: 4.4,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['london', 'dublin'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: false,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Wales, Ireland & the Celtic Frontier',
      body: {
        en: 'Anglo-Norman expansion did not stop at England\'s old borders. Marcher lords pushed into Wales from the 1070s, building castles at Chepstow, Pembroke, and Caernarfon. In 1169, Strongbow crossed the Irish Sea and seized Leinster, opening Ireland to centuries of Anglo-Norman lordship. These campaigns extended Norman feudal structures — castles, manors, and borough charters — deep into the Celtic world.',
        fr: 'L\'expansion anglo-normande ne s\'arrêta pas aux anciennes frontières de l\'Angleterre. Les seigneurs des marches pénétrèrent au Pays de Galles dès les années 1070, construisant des châteaux à Chepstow, Pembroke et Caernarfon. En 1169, Strongbow traversa la mer d\'Irlande et s\'empara du Leinster, ouvrant l\'Irlande à des siècles de seigneurie anglo-normande. Ces campagnes étendirent les structures féodales normandes — châteaux, manoirs et chartes de bourgs — au cœur du monde celtique.',
      },
    },
    anchorYear: 1169,
  },
  {
    id: 'ne-arc-byzantine-africa',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'bbox',
      center: [18.0, 39.0],
      zoom: 4.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bari', 'palermo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Against Byzantium & into Africa',
      body: {
        en: 'Robert Guiscard\'s invasion of the Balkans (1081–1085) directly challenged the Byzantine Empire — Norman cavalry reaching the walls of Constantinople\'s western approaches. Meanwhile, Roger II extended Sicilian power across the central Mediterranean, briefly establishing a "Kingdom of Africa" along the Tunisian coast (1135–1160). Norman ambitions stretched from the Irish Sea to the Bosphorus.',
        fr: 'L\'invasion des Balkans par Robert Guiscard (1081–1085) défia directement l\'Empire byzantin — la cavalerie normande atteignant les abords occidentaux de Constantinople. Parallèlement, Roger II étendit la puissance sicilienne en Méditerranée centrale, établissant brièvement un « Royaume d\'Afrique » sur la côte tunisienne (1135–1160). Les ambitions normandes s\'étendaient de la mer d\'Irlande au Bosphore.',
      },
    },
    anchorYear: 1135,
  },
  {
    id: 'ne-arc-legacy',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'bbox',
      center: [8.0, 46.0],
      zoom: 3.2,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'caen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Assimilation & Legacy',
      body: {
        en: 'By the thirteenth century the Norman world was dissolving into larger identities — English, French, Sicilian. Normandy itself was conquered by Philip Augustus in 1204, severing the cross-Channel duchy. Yet Norman legacies endured: common law in England, cathedral architecture from Durham to Monreale, feudal land tenure from Ireland to the Levant, and a diaspora of surnames, charters, and castle ruins stretching across three continents.',
        fr: 'Au XIIIe siècle, le monde normand se fondait dans des identités plus larges — anglaise, française, sicilienne. La Normandie elle-même fut conquise par Philippe Auguste en 1204, rompant le duché transmanche. Pourtant, les héritages normands perdurèrent : la common law en Angleterre, l\'architecture des cathédrales de Durham à Monreale, le régime foncier féodal de l\'Irlande au Levant, et une diaspora de patronymes, de chartes et de ruines de châteaux sur trois continents.',
      },
    },
    anchorYear: 1204,
  },
];
