import type { StoryBeat } from '@/core/types';

export const atlasStoryBeats: StoryBeat[] = [
  // --- Deep-time continuity beats ---
  {
    id: 'beat-neolithic-monuments',
    eraId: 'neolithic-normandy',
    camera: {
      target: 'bbox',
      center: [-1.0, 49.25],
      zoom: 6.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dolmen-vauville', 'megaliths-fontenay', 'cairon-site', 'hougue-bie', 'faldouet-dolmen', 'le-dehus'],
      regionIds: ['normandy-neolithic-zone', 'channel-islands-neolithic'],
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
        en: 'Long before any written record, Neolithic communities raised stone monuments across what would become Normandy and the nearby Channel Islands. Dolmens at Vauville, megaliths near Fontenay-le-Marmion, passage graves at La Hougue Bie in Jersey, and burial sites at Cairon mark the earliest human imprint on this landscape — a foundation layer that runs beneath everything that follows.',
        fr: 'Bien avant tout document écrit, des communautés néolithiques érigèrent des monuments de pierre à travers la future Normandie et les îles Anglo-Normandes voisines. Les dolmens de Vauville, les mégalithes de Fontenay-le-Marmion, les tombes à couloir de La Hougue Bie à Jersey et les sépultures de Cairon marquent la plus ancienne empreinte humaine sur ce paysage — une couche fondatrice qui sous-tend tout ce qui suit.',
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
      placeIds: [
        'la-rochelle',
        'dieppe',
        'rouen',
        'honfleur',
        'saint-malo',
        'mortagne-au-perche',
        'saint-peter-port',
      ],
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
        en: 'New France drew settlers from across Atlantic France — but some regions gave far more than others. Northwest France (Normandy, Brittany, Perche) provided roughly 39% of all immigrants, and the Centre-West (Aunis, Saintonge, Poitou) another 19%. That is why many French Canadians today discover Norman or near-Norman ancestors: repeated recruitment through northwestern ports and parishes, plus a small colonial founder pool, left an outsized mark in genealogy. The Channel Islands were part of the same Norman cultural world, yet Saint Peter Port and other insular harbours were not major documented embarkation points for the colony — ships left overwhelmingly from mainland French ports such as Dieppe, Honfleur, La Rochelle, and Saint-Malo. Open the Migration Explorer to compare cohorts, read the Channel Islands callout, and toggle flow corridors to see primary routes versus lighter illustrative island links.',
        fr: 'La Nouvelle-France attirait des colons de toute la France atlantique, mais certaines régions en ont fourni bien plus que d\'autres. Le Nord-Ouest (Normandie, Bretagne, Perche) représente environ 39% de tous les immigrants, et le Centre-Ouest (Aunis, Saintonge, Poitou) 19% de plus. C\'est pourquoi tant de Canadiens français retrouvent aujourd\'hui des ancêtres normands ou proches : des canaux de recrutement répétés via les ports et paroisses du Nord-Ouest, et une base coloniale restreinte, ont laissé une empreinte disproportionnée dans la généalogie. Les îles Anglo-Normandes partageaient la même sphère culturelle normande, pourtant Saint-Pierre-Port et les autres havres insulaires n\'étaient pas les grands points d\'embarquement documentés vers la colonie — les navires partaient surtout des ports continentaux comme Dieppe, Honfleur, La Rochelle et Saint-Malo. Ouvrez l\'explorateur des migrations pour comparer les cohortes, lire l\'encadré sur les îles et activer les corridors de flux (routes principales versus liens insulaires plus discrets).',
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
      placeIds: [
        'la-rochelle',
        'dieppe',
        'rouen',
        'honfleur',
        'saint-malo',
        'mortagne-au-perche',
        'saint-peter-port',
      ],
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
        en: 'New France drew settlers from across the Atlantic coast of France. Normandy, Perche, Brittany, and the Centre-West each contributed distinct cohorts — founders, engagés, soldiers, and religious figures — flowing through a handful of mainland embarkation ports (Dieppe, Honfleur, La Rochelle, Saint-Malo). The Channel Islands belonged to that Norman world culturally and historically, but they were not mass terminals for colonial sailings; island-born individuals, when they appear, are usually folded into broader French or Norman categories in the records. Modern French Canadian family trees often highlight Normandy because those channels were thick and the St. Lawrence founder population was small, not because the colony was only Norman.',
        fr: 'La Nouvelle-France attira des colons de toute la côte atlantique de la France. La Normandie, le Perche, la Bretagne et le Centre-Ouest contribuèrent chacun des cohortes distinctes — fondateurs, engagés, soldats et religieux — transitant par quelques ports continentaux d\'embarquement (Dieppe, Honfleur, La Rochelle, Saint-Malo). Les îles Anglo-Normandes appartenaient à cette sphère normande sur le plan culturel et historique, mais ce n\'étaient pas des terminaux de masse pour les départs coloniaux ; les personnes nées sur les îles, lorsqu\'elles apparaissent, sont le plus souvent regroupées dans des catégories « françaises » ou « normandes » plus larges dans les registres. Les arbres généalogiques canadiens-français mettent souvent en avant la Normandie parce que ces canaux étaient denses et que la population fondatrice du Saint-Laurent était restreinte, non parce que la colonie était uniquement normande.',
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
        en: 'Ships departed from Dieppe, La Rochelle, Honfleur, and Saint-Malo in spring, crossed in six to twelve weeks, and carried settlers, supplies, and trade goods toward Canada. The St. Lawrence colony was the main demographic destination for many of these voyages; Acadia drew especially on La Rochelle and Saint-Malo through the same mainland harbour system — not on insular Channel ports as primary terminals. The return voyage brought furs back to France.',
        fr: 'Les navires partaient de Dieppe, La Rochelle, Honfleur et Saint-Malo au printemps, traversaient en six à douze semaines, et transportaient colons, approvisionnements et marchandises vers le Canada. La colonie du Saint-Laurent fut pour beaucoup la destination démographique principale ; l\'Acadie puisait surtout à La Rochelle et à Saint-Malo dans le même réseau de ports continentaux — non à des havres insulaires comme terminaux majeurs. Le voyage retour ramenait les fourrures en France.',
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

  // ── Guillaume Couture guided arc ──────────────────────────────────
  {
    id: 'gc-beat-couture-rouen',
    eraId: 'new-france-foundations',
    arcId: 'guillaume-couture',
    camera: {
      target: 'places',
      center: [1.1, 49.44],
      zoom: 7.2,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
      journeyIds: ['journey-couture'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Normandy — baptism at Rouen',
      body: {
        en: 'Guillaume Couture was baptised on 14 January 1618 at Rouen, the Norman capital on the lower Seine — the same river corridor that would later feed recruits and artisans toward Atlantic Canada.',
        fr: 'Guillaume Couture fut baptisé le 14 janvier 1618 à Rouen, capitale normande sur la basse Seine — le même corridor fluvial qui alimentera plus tard recrues et artisans vers le Canada atlantique.',
      },
    },
    anchorYear: 1618,
  },
  {
    id: 'gc-beat-couture-atlantic',
    eraId: 'new-france-foundations',
    arcId: 'guillaume-couture',
    camera: {
      target: 'bbox',
      center: [-24.0, 47.0],
      zoom: 2.65,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dieppe', 'honfleur', 'mid-atlantic-passage', 'quebec-city'],
      regionIds: ['atlantic-basin', 'new-france'],
      routeSegmentIds: ['seg-dieppe-atlantic', 'seg-atlantic-quebec'],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Crossing to Canada',
      body: {
        en: 'Around 1640 he crossed as a Jesuit donné — a lay helper bound for the missions. The voyage from Norman ports to Québec took weeks and marked the hinge between European apprenticeship and American survival.',
        fr: 'Vers 1640, il traversa comme donné jésuite — auxiliaire laïc destiné aux missions. Le voyage des ports normands à Québec durait des semaines et marquait le pivot entre apprentissage européen et survie américaine.',
      },
    },
    anchorYear: 1639,
  },
  {
    id: 'gc-beat-couture-quebec',
    eraId: 'new-france-foundations',
    arcId: 'guillaume-couture',
    camera: {
      target: 'places',
      center: [-71.21, 46.81],
      zoom: 6.2,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'tadoussac'],
      regionIds: ['new-france'],
      routeSegmentIds: [],
      journeyIds: ['journey-couture'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The fragile colony',
      body: {
        en: 'Québec was still a thin French foothold on the St. Lawrence. As carpenter and donné, Couture entered a world where alliances with Indigenous nations were not optional — they were the condition of existence.',
        fr: 'Québec n\'était encore qu\'un faible pied français sur le Saint-Laurent. Charpentier et donné, Couture entrait dans un monde où les alliances avec les nations autochtones n\'étaient pas un luxe — elles étaient la condition de la survie.',
      },
    },
    anchorYear: 1640,
  },
  {
    id: 'gc-beat-couture-huronia',
    eraId: 'new-france-foundations',
    arcId: 'guillaume-couture',
    camera: {
      target: 'bbox',
      center: [-76.5, 45.0],
      zoom: 4.6,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'montreal', 'lake-huron-node'],
      regionIds: ['new-france'],
      routeSegmentIds: ['seg-couture-quebec-huronia'],
      journeyIds: ['journey-couture'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Toward Huronia',
      body: {
        en: 'In 1641 he travelled the Ottawa River corridor toward the Wendat (Huron) missions. There he learned languages and skills that would make him one of the colony\'s most effective interpreters.',
        fr: 'En 1641, il suivit le corridor de l\'Outaouais vers les missions wendates (huronnes). Il y apprit langues et savoir-faire qui feraient de lui l\'un des interprètes les plus efficaces de la colonie.',
      },
    },
    anchorYear: 1641,
  },
  {
    id: 'gc-beat-couture-captivity',
    eraId: 'new-france-foundations',
    arcId: 'guillaume-couture',
    camera: {
      target: 'bbox',
      center: [-73.5, 43.5],
      zoom: 5.4,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['trois-rivieres', 'mohawk-territory'],
      regionIds: ['new-france'],
      routeSegmentIds: ['seg-couture-iroquois-captivity'],
      journeyIds: ['journey-couture'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Captured — August 1642',
      body: {
        en: 'Returning with Isaac Jogues, he was seized by a Mohawk war party, tortured, and adopted. He became the first French layman to live credibly in Haudenosaunee towns — knowledge the colony would desperately need.',
        fr: 'Au retour avec Isaac Jogues, il fut pris par un parti mohawk, torturé puis adopté. Il devint le premier laïque français à vivre crédiblement dans les villages haudenosaunee — un savoir dont la colonie aurait désespérément besoin.',
      },
    },
    anchorYear: 1642,
  },
  {
    id: 'gc-beat-couture-diplomacy',
    eraId: 'new-france-foundations',
    arcId: 'guillaume-couture',
    camera: {
      target: 'places',
      center: [-71.35, 46.62],
      zoom: 6.4,
      durationMs: 1900,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'pointe-levis', 'trois-rivieres'],
      regionIds: ['new-france'],
      routeSegmentIds: [],
      journeyIds: ['journey-couture'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Interpreter between worlds',
      body: {
        en: 'After 1645 he escorted peace overtures and negotiated along the river. On the Lauzon seigneury he held a concession at Pointe-Lévy — not as seigneur, but as habitant opposite Québec, rooted in the land.',
        fr: 'Après 1645, il escorta des ouvertures de paix et négocia le long du fleuve. Sur la seigneurie de Lauzon, il détenait une concession à la Pointe-Lévy — non comme seigneur, mais comme habitant en face de Québec, enraciné dans la terre.',
      },
    },
    anchorYear: 1645,
  },
  {
    id: 'gc-beat-couture-long-sault',
    eraId: 'new-france-foundations',
    arcId: 'guillaume-couture',
    camera: {
      target: 'bbox',
      center: [-75.0, 45.35],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['montreal', 'trois-rivieres'],
      regionIds: ['new-france'],
      routeSegmentIds: [],
      journeyIds: ['journey-couture'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Long Sault — 1660',
      body: {
        en: 'He volunteered for Dollard des Ormeaux\'s Ottawa sortie. The siege at the Long Sault became one of French Canada\'s founding military stories — and Couture was there as interpreter and fighter.',
        fr: 'Il s\'engagea dans la sortie de Dollard des Ormeaux vers l\'Outaouais. Le siège du Long-Sault devint l\'une des histoires militaires fondatrices du Canada français — Couture y fut comme interprète et combattant.',
      },
    },
    anchorYear: 1660,
  },
  {
    id: 'gc-beat-couture-north-legacy',
    eraId: 'new-france-foundations',
    arcId: 'guillaume-couture',
    camera: {
      target: 'bbox',
      center: [-72.5, 49.5],
      zoom: 4.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'lake-mistassini'],
      regionIds: ['new-france'],
      routeSegmentIds: ['seg-couture-saguenay-mistassini'],
      journeyIds: ['journey-couture'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'North to Mistassini — legacy',
      body: {
        en: 'In 1663 he led canoes up the Saguenay to Lake Mistassini, among the deepest French probes of the subarctic. He died in 1701 at Québec; his descendants still carry the Norman–St. Lawrence story across North America.',
        fr: 'En 1663, il mena des canots par le Saguenay jusqu\'au lac Mistassini, parmi les plus profondes incursions françaises dans le subarctique. Il mourut en 1701 à Québec ; ses descendants portent encore l\'histoire normande et laurentienne à travers l\'Amérique du Nord.',
      },
    },
    anchorYear: 1663,
  },

  // ── Neolithic Normandy Arc beats ─────────────────────────────────
  {
    id: 'neo-arc-first-farmers',
    eraId: 'neolithic-normandy',
    arcId: 'neolithic-normandy',
    camera: {
      target: 'bbox',
      center: [-1.0, 49.2],
      zoom: 6.2,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dolmen-vauville', 'megaliths-fontenay', 'cairon-site', 'hougue-bie', 'faldouet-dolmen', 'le-dehus'],
      regionIds: ['normandy-neolithic-zone', 'channel-islands-neolithic'],
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
    id: 'neo-arc-channel-islands',
    eraId: 'neolithic-normandy',
    arcId: 'neolithic-normandy',
    camera: {
      target: 'bbox',
      center: [-2.3, 49.35],
      zoom: 8.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['hougue-bie', 'faldouet-dolmen', 'le-dehus'],
      regionIds: ['channel-islands-neolithic'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Channel Islands: An Island Megalithic World',
      body: {
        en: 'The same megalith-building impulse that shaped the Cotentin coast extended to the Channel Islands. La Hougue Bie in Jersey — a twenty-metre passage grave aligned with the equinox sunrise — is one of the finest Neolithic monuments in western Europe. Nearby La Pouquelaye de Faldouet, with its massive capstone and double chamber, and Le Déhus in Guernsey attest that the islands were not peripheral but fully part of the Atlantic-facing world of stone. These communities looked outward across the sea, connected by the same maritime networks that would later carry bronze, iron, and settlers.',
        fr: 'L\'élan mégalithique qui façonna la côte du Cotentin s\'étendit aussi aux îles Anglo-Normandes. La Hougue Bie à Jersey — une tombe à couloir de vingt mètres alignée sur le lever du soleil à l\'équinoxe — est l\'un des plus beaux monuments néolithiques d\'Europe occidentale. À proximité, La Pouquelaye de Faldouet, avec sa dalle de couverture massive et sa double chambre, et Le Déhus à Guernesey attestent que les îles n\'étaient pas périphériques mais pleinement intégrées au monde atlantique de la pierre. Ces communautés regardaient vers la mer, reliées par les mêmes réseaux maritimes qui transporteraient plus tard le bronze, le fer et les colons.',
      },
    },
    anchorYear: -4300,
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
      center: [-1.2, 49.15],
      zoom: 6.4,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dolmen-vauville', 'megaliths-fontenay', 'cairon-site', 'dolmen-passais', 'menhir-dol', 'allee-couverte-bretteville', 'hougue-bie', 'faldouet-dolmen', 'le-dehus'],
      regionIds: ['normandy-neolithic-zone', 'channel-islands-neolithic'],
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
        en: 'Seen together, the megalithic monuments of Normandy and the Channel Islands reveal a landscape deliberately organised by its first farming communities. Dolmens on the Cotentin coast, passage graves in Jersey and Guernsey, allées couvertes on the Caen plain, menhirs at territorial boundaries, burial clusters at ritual centres: these were not randomly placed stones but a connected geography of the sacred and the political, stretching from the mainland to the offshore islands. The same sites that Neolithic people chose for their monuments — headlands, river crossings, plateau edges — would be chosen again and again by Celtic chiefs, Roman engineers, Frankish kings, and Norman lords. The first map of Normandy was drawn in stone.',
        fr: 'Vus ensemble, les monuments mégalithiques de Normandie et des îles Anglo-Normandes révèlent un paysage délibérément organisé par ses premières communautés agricoles. Dolmens sur la côte du Cotentin, tombes à couloir à Jersey et Guernesey, allées couvertes sur la plaine de Caen, menhirs aux frontières territoriales, groupes funéraires aux centres rituels : ce n\'étaient pas des pierres placées au hasard mais une géographie connectée du sacré et du politique, s\'étendant du continent aux îles voisines. Les mêmes sites que les Néolithiques choisirent pour leurs monuments — promontoires, passages de rivières, rebords de plateaux — seraient choisis encore et encore par les chefs celtes, ingénieurs romains, rois francs et seigneurs normands. La première carte de la Normandie fut tracée dans la pierre.',
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
      center: [-1.0, 49.3],
      zoom: 6.0,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dolmen-vauville', 'megaliths-fontenay', 'menhir-dol', 'dolmen-passais', 'cairon-site', 'allee-couverte-bretteville', 'hougue-bie', 'faldouet-dolmen', 'le-dehus'],
      regionIds: ['normandy-neolithic-zone', 'channel-islands-neolithic'],
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
        en: 'By around 2000 BC, the Neolithic world was giving way to something new. Knowledge of metalworking — first copper, then bronze — was spreading from the east and south. The great age of megalith-building was ending, but the monuments remained, silent and enduring. New peoples would arrive, new technologies would transform the economy, and the Channel would become a highway for the tin trade. Yet the dolmens, menhirs, and allées couvertes raised by the first farmers of Normandy and the Channel Islands would still stand — as they stand today — the oldest layer of human memory inscribed on a landscape that would never stop being reshaped.',
        fr: 'Vers 2000 av. J.-C., le monde néolithique cédait la place à quelque chose de nouveau. La connaissance de la métallurgie — d\'abord le cuivre, puis le bronze — se répandait depuis l\'est et le sud. La grande époque de construction mégalithique prenait fin, mais les monuments restaient, silencieux et durables. De nouveaux peuples arriveraient, de nouvelles technologies transformeraient l\'économie, et la Manche deviendrait une autoroute pour le commerce de l\'étain. Pourtant les dolmens, menhirs et allées couvertes érigés par les premiers fermiers de Normandie et des îles Anglo-Normandes se dresseraient encore — comme ils se dressent aujourd\'hui — la couche la plus ancienne de mémoire humaine inscrite sur un paysage qui ne cesserait jamais d\'être remodelé.',
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
    id: 'no-arc-channel-islands-ducal',
    eraId: 'norman-origins',
    arcId: 'norman-origins',
    camera: {
      target: 'bbox',
      center: [-2.1, 49.4],
      zoom: 7.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['channel-islands-node', 'saint-peter-port', 'cotentin-landing'],
      regionIds: ['channel-islands-neolithic', 'channel-coast'],
      routeSegmentIds: ['seg-celtic-to-channel-islands'],
      journeyIds: ['journey-celtic-sea-route'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The Channel Islands Enter the Duchy',
      body: {
        en: 'When William Longsword annexed the Cotentin and Avranchin in 933, the nearby Channel Islands fell within the same ducal orbit. Jersey, Guernsey, and their smaller neighbours had been waypoints on the Norwegian Celtic Sea route that fed western Normandy — the same corridor described by archaeologists tracing Norse place-names and burial customs across the Cotentin. Under ducal authority the islands became an offshore extension of Normandy: governed by the same law, subject to the same Church, and integrated into the maritime economy linking the Cotentin coast to the wider Norman world. They were never peripheral — they were the duchy\'s western sea frontier.',
        fr: 'Lorsque Guillaume Longue-Épée annexa le Cotentin et l\'Avranchin en 933, les îles Anglo-Normandes voisines entrèrent dans la même orbite ducale. Jersey, Guernesey et leurs petites voisines avaient été des relais sur la route norvégienne de la mer Celtique qui alimentait l\'ouest normand — le même corridor décrit par les archéologues retraçant les toponymes et les coutumes funéraires scandinaves à travers le Cotentin. Sous l\'autorité ducale, les îles devinrent une extension insulaire de la Normandie : régies par le même droit, rattachées à la même Église, et intégrées dans l\'économie maritime reliant la côte du Cotentin au monde normand. Elles ne furent jamais périphériques — elles étaient la frontière maritime occidentale du duché.',
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
  {
    id: 'no-arc-channel-islands-anglo-norman',
    eraId: 'norman-origins',
    arcId: 'norman-origins',
    camera: {
      target: 'bbox',
      center: [-1.0, 49.6],
      zoom: 6.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['channel-islands-node', 'saint-peter-port', 'rouen', 'caen'],
      regionIds: ['channel-islands-neolithic', 'normandy', 'channel-coast'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Offshore Normandy on the Eve of Conquest',
      body: {
        en: 'By 1066 the Channel Islands had been part of the duchy for over a century. They shared its reformed Church, its feudal tenures, and its Norman French speech. When Duke William crossed the Channel to seize the English crown, the islands entered a personal union: their lord was now both duke of Normandy and king of England. This was not an English acquisition of foreign territory — it was a Norman polity whose ruler happened to add England to his domains. The islands\' fate would hinge on that distinction when the union later fractured.',
        fr: 'En 1066, les îles Anglo-Normandes faisaient partie du duché depuis plus d\'un siècle. Elles partageaient son Église réformée, ses tenures féodales et sa langue franco-normande. Lorsque le duc Guillaume traversa la Manche pour s\'emparer de la couronne anglaise, les îles entrèrent dans une union personnelle : leur seigneur était désormais à la fois duc de Normandie et roi d\'Angleterre. Il ne s\'agissait pas d\'une acquisition anglaise de territoire étranger — c\'était une entité normande dont le souverain ajoutait l\'Angleterre à ses domaines. Le sort des îles tiendrait à cette distinction lorsque l\'union se briserait.',
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
      center: [-0.3, 51.0],
      zoom: 4.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'caen', 'pevensey', 'hastings', 'stamford-bridge', 'westminster', 'london', 'york-jorvik'],
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
      center: [30.0, 35.5],
      zoom: 3.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['antioch', 'bari', 'jerusalem', 'tiberias', 'edessa', 'limassol'],
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
        en: 'By the thirteenth century the Norman world was dissolving into larger identities — English, French, Sicilian. Continental Normandy was conquered by Philip Augustus in 1204, severing the mainland duchy from the English crown. Yet Norman legacies endured: common law in England, cathedral architecture from Durham to Monreale, feudal land tenure from Ireland to the Levant, and a diaspora of surnames, charters, and castle ruins stretching across three continents.',
        fr: 'Au XIIIe siècle, le monde normand se fondait dans des identités plus larges — anglaise, française, sicilienne. La Normandie continentale fut conquise par Philippe Auguste en 1204, séparant le duché de la couronne anglaise. Pourtant, les héritages normands perdurèrent : la common law en Angleterre, l\'architecture des cathédrales de Durham à Monreale, le régime foncier féodal de l\'Irlande au Levant, et une diaspora de patronymes, de chartes et de ruines de châteaux sur trois continents.',
      },
    },
    anchorYear: 1204,
  },
  {
    id: 'ne-arc-channel-islands-after-1204',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'bbox',
      center: [-2.1, 49.4],
      zoom: 7.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['channel-islands-node', 'saint-peter-port', 'mont-orgueil'],
      regionIds: ['channel-islands-neolithic', 'channel-coast'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The 1204 Fork: Islands Without the Duchy',
      body: {
        en: 'When Philip Augustus conquered continental Normandy in 1204, the cross-Channel duchy was split in two. Mainland Normandy became part of the French kingdom. But the Channel Islands chose — or were kept by — the English crown. Islanders swore loyalty to King John not as English subjects but as the duke\'s people: they retained their Norman customary law, their feudal land tenures, and their own courts. This anomaly became permanent. The islands were never absorbed into England, never governed by Parliament, and never lost their Norman legal identity. The 1204 fork is the origin story of today\'s Crown Dependencies — self-governing territories owing allegiance to the crown but constitutionally distinct from the United Kingdom.',
        fr: 'Lorsque Philippe Auguste conquit la Normandie continentale en 1204, le duché transmanche fut coupé en deux. La Normandie du continent devint partie du royaume de France. Mais les îles Anglo-Normandes choisirent — ou furent retenues par — la couronne anglaise. Les insulaires prêtèrent allégeance au roi Jean non comme sujets anglais, mais comme peuple du duc : ils conservèrent leur droit coutumier normand, leurs tenures féodales et leurs propres tribunaux. Cette anomalie devint permanente. Les îles ne furent jamais absorbées par l\'Angleterre, jamais gouvernées par le Parlement, et ne perdirent jamais leur identité juridique normande. La fracture de 1204 est l\'origine des actuelles dépendances de la Couronne — des territoires autonomes liés à la couronne mais constitutionnellement distincts du Royaume-Uni.',
      },
    },
    anchorYear: 1205,
  },
  {
    id: 'ne-arc-channel-islands-frontier',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'places',
      center: [-2.1, 49.2],
      zoom: 8.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['mont-orgueil', 'channel-islands-node', 'saint-peter-port'],
      regionIds: ['channel-islands-neolithic'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Fortress Islands: Mont Orgueil and the Norman Frontier',
      body: {
        en: 'After 1204 the Channel Islands became a contested frontier between the French and English crowns. Mont Orgueil castle on Jersey\'s east coast — commanding the sea approach from Normandy — was fortified on a scale that announced the islands\' strategic value. French raids struck repeatedly through the thirteenth and fourteenth centuries; Guernsey\'s Castle Cornet guarded Saint Peter Port. Between sieges, the islands sustained a bilingual maritime economy trading with both French and English coasts. Their courts administered Norman customary law long after the mainland had absorbed Roman-canon procedure. Jèrriais and Guernésiais — insular descendants of Norman French — survived as living spoken languages into the modern era. These were not frozen relics of 1066 but evolved communities that kept a distinctive Norman legal and linguistic identity precisely because their separation from the mainland after 1204 shielded them from Parisian centralisation.',
        fr: 'Après 1204, les îles Anglo-Normandes devinrent une frontière disputée entre les couronnes de France et d\'Angleterre. Le château de Mont Orgueil sur la côte est de Jersey — dominant l\'approche maritime depuis la Normandie — fut fortifié à une échelle qui traduisait la valeur stratégique des îles. Les raids français frappèrent à répétition aux XIIIe et XIVe siècles ; Castle Cornet à Guernesey protégeait Saint-Pierre-Port. Entre les sièges, les îles entretinrent une économie maritime bilingue commerçant avec les côtes française et anglaise. Leurs tribunaux administrèrent le droit coutumier normand bien après que le continent eut adopté la procédure romano-canonique. Le jèrriais et le guernesiais — descendants insulaires du franco-normand — survécurent comme langues parlées vivantes jusqu\'à l\'époque moderne. Ce n\'étaient pas des reliques figées de 1066 mais des communautés évoluées qui préservèrent une identité juridique et linguistique normande distincte précisément parce que leur séparation du continent après 1204 les protégea de la centralisation parisienne.',
      },
    },
    anchorYear: 1300,
  },

  // ── Normandy to the New World — transatlantic arc ────────────────
  {
    id: 'beat-transatlantic-norman-ports',
    eraId: 'age-of-exploration',
    arcId: 'normandy-to-new-world',
    camera: {
      target: 'bbox',
      center: [0.0, 49.5],
      zoom: 6.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dieppe', 'honfleur', 'le-havre', 'rouen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: false,
      pulse: ['origins'],
    },
    copy: {
      title: 'Norman ports face the Atlantic',
      body: {
        en: 'By the late fifteenth century, Normandy\u2019s Channel ports \u2014 Dieppe, Honfleur, Le Havre \u2014 had been trading hubs for centuries. The same maritime infrastructure that served Channel commerce now pivoted toward the open Atlantic. Norman fishermen were already crossing to the Grand Banks before any formal French exploration, and merchant families in Rouen began financing voyages that would open a new continent.',
        fr: 'Dès la fin du XVe siècle, les ports normands de la Manche \u2014 Dieppe, Honfleur, Le Havre \u2014 étaient des plaques tournantes commerciales depuis des siècles. La même infrastructure maritime qui servait le commerce transmanche se tournait désormais vers le grand large atlantique. Les pêcheurs normands traversaient déjà vers les Grands Bancs avant toute exploration française officielle, et les familles marchandes de Rouen commençaient à financer les voyages qui ouvriraient un nouveau continent.',
      },
    },
    anchorYear: 1500,
  },
  {
    id: 'beat-transatlantic-crossing',
    eraId: 'age-of-exploration',
    arcId: 'normandy-to-new-world',
    camera: {
      target: 'bbox',
      center: [-25.0, 46.0],
      zoom: 2.6,
      durationMs: 3000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['dieppe', 'mid-atlantic-passage', 'gaspe-peninsula'],
      regionIds: [],
      routeSegmentIds: ['seg-verrazzano-dieppe-atlantic', 'seg-cartier-atlantic'],
      journeyIds: ['journey-verrazzano', 'journey-cartier'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Across the Atlantic',
      body: {
        en: 'Verrazzano sailed from Dieppe in 1524, charting the North American coast. Cartier followed from Saint-Malo in 1534, opening the St. Lawrence gateway. These voyages launched from the same Norman and Breton ports that had anchored Channel trade for centuries \u2014 the beginning of a transatlantic story that would reshape both continents.',
        fr: 'Verrazzano quitta Dieppe en 1524, cartographiant la côte nord-américaine. Cartier suivit depuis Saint-Malo en 1534, ouvrant la porte du Saint-Laurent. Ces voyages partaient des mêmes ports normands et bretons qui avaient ancré le commerce de la Manche pendant des siècles \u2014 le début d\u2019une histoire transatlantique qui allait remodeler les deux continents.',
      },
    },
    anchorYear: 1534,
  },
  {
    id: 'beat-transatlantic-quebec-founding',
    eraId: 'new-france-foundations',
    arcId: 'normandy-to-new-world',
    camera: {
      target: 'bbox',
      center: [-71.2, 46.8],
      zoom: 8.0,
      durationMs: 2500,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'beauport', 'chateau-richer'],
      regionIds: ['new-france'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: false,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Québec: the Norman foothold',
      body: {
        en: 'Champlain founded Québec in 1608, and settlers arrived in trickles \u2014 many from Normandy and the Perche. Guillaume Couture, Zacharie Cloutier, Jean Gagnon, the Langlois and Boucher families: Norman-origin surnames that would become the founding lineages of French Canada. The Beaupré coast and Île d\u2019Orléans became their new Norman landscape along the St. Lawrence.',
        fr: 'Champlain fonda Québec en 1608 et les colons arrivèrent au compte-gouttes \u2014 beaucoup de Normandie et du Perche. Guillaume Couture, Zacharie Cloutier, Jean Gagnon, les Langlois et les Boucher : des patronymes normands qui deviendraient les lignées fondatrices du Canada français. La côte de Beaupré et l\u2019Île d\u2019Orléans devinrent leur nouveau paysage normand le long du Saint-Laurent.',
      },
    },
    anchorYear: 1634,
  },
  {
    id: 'beat-transatlantic-acadia',
    eraId: 'new-france-foundations',
    arcId: 'normandy-to-new-world',
    camera: {
      target: 'bbox',
      center: [-65.0, 45.0],
      zoom: 5.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['port-royal', 'louisbourg'],
      regionIds: ['acadia'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: false,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Acadia: the Atlantic frontier',
      body: {
        en: 'Port-Royal in Acadia became the French Atlantic\u2019s secondary anchor \u2014 a farming and fishing community that developed its own distinct identity. Many Acadian families traced their origins through the same Norman port networks that fed the St. Lawrence colony. When France lost Acadia to Britain in 1713, the Acadians\u2019 Norman surnames endured through expulsion and resettlement.',
        fr: 'Port-Royal en Acadie devint le second ancrage atlantique français \u2014 une communauté agricole et de pêche qui développa sa propre identité. Beaucoup de familles acadiennes remontaient aux mêmes réseaux portuaires normands qui alimentaient la colonie du Saint-Laurent. Lorsque la France perdit l\u2019Acadie au profit de la Grande-Bretagne en 1713, les patronymes normands des Acadiens survécurent à l\u2019expulsion et au déplacement.',
      },
    },
    anchorYear: 1670,
  },
  {
    id: 'beat-transatlantic-mississippi',
    eraId: 'royal-new-france',
    arcId: 'normandy-to-new-world',
    camera: {
      target: 'bbox',
      center: [-85.0, 40.0],
      zoom: 3.5,
      durationMs: 2800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['great-lakes-hub', 'mississippi-confluence', 'new-orleans'],
      regionIds: ['new-france'],
      routeSegmentIds: ['seg-lasalle-greatlakes-mississippi', 'seg-lasalle-mississippi-gulf'],
      journeyIds: ['journey-lasalle-mississippi'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'La Salle\u2019s continental claim',
      body: {
        en: 'René-Robert Cavelier de La Salle, born in Rouen, descended the full Mississippi to the Gulf of Mexico in 1682 and claimed the entire basin for France as "Louisiana." A single Norman explorer stretched French territory from the Gulf of St. Lawrence to the Gulf of Mexico \u2014 the most dramatic expansion in New France\u2019s history.',
        fr: 'René-Robert Cavelier de La Salle, né à Rouen, descendit tout le Mississippi jusqu\u2019au golfe du Mexique en 1682 et revendiqua l\u2019ensemble du bassin pour la France sous le nom de « Louisiane ». Un seul explorateur normand étendit le territoire français du golfe du Saint-Laurent au golfe du Mexique \u2014 l\u2019expansion la plus spectaculaire de l\u2019histoire de la Nouvelle-France.',
      },
    },
    anchorYear: 1682,
  },
  {
    id: 'beat-transatlantic-endurance',
    eraId: 'atlantic-imprint',
    arcId: 'normandy-to-new-world',
    camera: {
      target: 'bbox',
      center: [-71.2, 46.8],
      zoom: 6.0,
      durationMs: 2500,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'montreal', 'trois-rivieres'],
      regionIds: ['new-france'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: false,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The names that endured',
      body: {
        en: 'The Treaty of Paris in 1763 ended French sovereignty over New France. But the sixty thousand French-Canadian inhabitants \u2014 Couture, Gagnon, Tremblay, Boucher, Langlois, Cloutier, Pelletier, Fournier \u2014 remained. Their Norman surnames, their language, and their identity survived the change of empire. Today millions of Québécois carry names that trace directly back to the ports of Normandy.',
        fr: 'Le traité de Paris de 1763 mit fin à la souveraineté française sur la Nouvelle-France. Mais les soixante mille habitants canadiens-français \u2014 Couture, Gagnon, Tremblay, Boucher, Langlois, Cloutier, Pelletier, Fournier \u2014 restèrent. Leurs patronymes normands, leur langue et leur identité survécurent au changement d\u2019empire. Aujourd\u2019hui des millions de Québécois portent des noms qui remontent directement aux ports de Normandie.',
      },
    },
    anchorYear: 1763,
  },

  // ── Rollo lifetime guided arc ────────────────────────────────────
  {
    id: 'rollo-origins',
    eraId: 'viking-age',
    arcId: 'rollo-lifetime',
    camera: {
      target: 'bbox',
      center: [9.0, 57.5],
      zoom: 4.0,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['denmark-origin', 'norway-origin'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'A man between two traditions',
      body: {
        en: 'The man later known as Rollo was born around 860 somewhere in Scandinavia — but where exactly remains disputed. Norman chronicler Dudo of Saint-Quentin, writing a century later, called him Danish. Icelandic sagas name him Hrólfr, son of a Norwegian earl from Møre. No contemporary source settles the question. What is certain is that he emerged from the same Norse warrior culture that was reshaping Western Europe, and that by the late ninth century he was leading war-bands toward the richest prize on the Continent: the Seine valley of Francia.',
        fr: 'L\'homme qui deviendrait Rollon naquit vers 860 quelque part en Scandinavie — mais l\'endroit exact reste disputé. Le chroniqueur normand Dudon de Saint-Quentin, écrivant un siècle plus tard, le dit danois. Les sagas islandaises le nomment Hrólfr, fils d\'un jarl norvégien du Møre. Aucune source contemporaine ne tranche. Ce qui est sûr, c\'est qu\'il était issu de la même culture guerrière nordique qui refaçonnait l\'Europe occidentale, et que dès la fin du IXe siècle il menait des bandes armées vers la proie la plus riche du Continent : la vallée de la Seine en Francia.',
      },
    },
    anchorYear: 860,
  },
  {
    id: 'rollo-to-francia',
    eraId: 'viking-age',
    arcId: 'rollo-lifetime',
    camera: {
      target: 'bbox',
      center: [4.0, 53.0],
      zoom: 4.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['denmark-origin', 'seine-estuary'],
      regionIds: [],
      routeSegmentIds: ['seg-denmark-seine'],
      journeyIds: ['journey-danish-migration'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Crossing to Francia',
      body: {
        en: 'During the 870s and 880s, Norse fleets repeatedly struck the Frankish coast. Whether Rollo was among the early raiders or arrived later is unknown, but by the 890s a chieftain of that name commanded forces on the lower Seine. The migration route was well-established: across the North Sea from Denmark, through the Channel, and into the wide mouth of the Seine — a river highway leading straight to the wealthiest monasteries and towns in Francia.',
        fr: 'Durant les années 870 et 880, des flottes nordiques frappèrent la côte franque à répétition. Si Rollon figurait parmi les premiers raiders ou arriva plus tard reste inconnu, mais dès les années 890 un chef de ce nom commandait des forces sur la basse Seine. La route migratoire était bien établie : à travers la mer du Nord depuis le Danemark, par la Manche, et dans l\'embouchure large de la Seine — une autoroute fluviale menant droit aux monastères et villes les plus riches de Francia.',
      },
    },
    anchorYear: 876,
  },
  {
    id: 'rollo-seine-raids',
    eraId: 'viking-age',
    arcId: 'rollo-lifetime',
    camera: {
      target: 'bbox',
      center: [0.6, 49.4],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'jumieges', 'seine-estuary'],
      regionIds: ['lower-seine'],
      routeSegmentIds: ['seg-estuary-rouen-raid', 'seg-rouen-jumieges-raid'],
      journeyIds: ['journey-seine-raids'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'The Seine as war corridor',
      body: {
        en: 'The lower Seine was both highway and hunting ground. Viking war-bands had sacked Rouen as early as 841 and torched Jumièges abbey. By the 880s, Norse groups wintered on islands in the river, raiding upstream toward Paris and downstream toward the Channel coast. Rollo operated within this violent landscape — one chieftain among several, but increasingly the dominant figure on the lower Seine. The monasteries that once lined the river lay abandoned; the Frankish military infrastructure had collapsed.',
        fr: 'La basse Seine était à la fois autoroute et terrain de chasse. Les bandes vikings avaient saccagé Rouen dès 841 et incendié l\'abbaye de Jumièges. Dès les années 880, des groupes nordiques hivernaient sur les îles du fleuve, pillant en amont vers Paris et en aval vers la côte de la Manche. Rollon opérait dans ce paysage violent — un chef parmi d\'autres, mais de plus en plus la figure dominante sur la basse Seine. Les monastères qui bordaient jadis le fleuve gisaient à l\'abandon ; l\'appareil militaire franc s\'était effondré.',
      },
    },
    anchorYear: 885,
  },
  {
    id: 'rollo-pressure-paris',
    eraId: 'viking-age',
    arcId: 'rollo-lifetime',
    camera: {
      target: 'bbox',
      center: [1.2, 49.1],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['paris', 'rouen', 'seine-estuary'],
      regionIds: ['lower-seine', 'frankish-core'],
      routeSegmentIds: ['seg-rouen-paris-incursion'],
      journeyIds: ['journey-seine-raids'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Pressure on the Frankish heartland',
      body: {
        en: 'After the great siege of Paris in 885–886, Frankish kings tried tribute, diversion, and military force — none succeeded for long. Through the 890s and 900s, Rollo\'s war-band tightened its grip on the lower Seine. He besieged cities, extracted tribute, and raided deep into the Frankish interior. The Carolingian court, riven by its own succession crises, lacked the resources to dislodge a force that had effectively made the lower Seine a Norse-held corridor.',
        fr: 'Après le grand siège de Paris en 885-886, les rois francs tentèrent tribut, détournement et force militaire — rien ne réussit durablement. Durant les années 890 et 900, la bande de Rollon resserra son emprise sur la basse Seine. Il assiégea des villes, extorqua des tributs et pilla profondément l\'intérieur franc. La cour carolingienne, déchirée par ses propres crises de succession, n\'avait pas les moyens de déloger une force qui avait fait de la basse Seine un corridor norrois de fait.',
      },
    },
    anchorYear: 890,
  },
  {
    id: 'rollo-chartres-911',
    eraId: 'viking-age',
    arcId: 'rollo-lifetime',
    camera: {
      target: 'places',
      center: [1.49, 48.75],
      zoom: 7.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['chartres', 'paris'],
      regionIds: ['frankish-core'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The siege of Chartres — 911',
      body: {
        en: 'In the summer of 911, Rollo led his forces south to besiege Chartres — a dangerously deep push into the Frankish heartland. A relieving army under Robert of Neustria and Richard of Burgundy defeated the Norse outside the city walls. But the Frankish victory was Pyrrhic: they could win a battle but not end the raiding. Both sides understood that negotiation, not warfare, would settle the lower Seine. The stage was set for the most consequential treaty in French medieval history.',
        fr: 'À l\'été 911, Rollon mena ses forces au sud pour assiéger Chartres — une poussée dangereusement profonde dans le cœur franc. Une armée de secours sous Robert de Neustrie et Richard de Bourgogne défit les Nordiques devant les murs de la cité. Mais la victoire franque fut à la Pyrrhus : ils pouvaient gagner une bataille mais pas mettre fin aux raids. Les deux camps comprirent que la négociation, non la guerre, réglerait le sort de la basse Seine. Le terrain était prêt pour le traité le plus lourd de conséquences de l\'histoire médiévale française.',
      },
    },
    anchorYear: 911,
  },
  {
    id: 'rollo-treaty-epte',
    eraId: 'norman-origins',
    arcId: 'rollo-lifetime',
    camera: {
      target: 'places',
      center: [1.78, 49.22],
      zoom: 8.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['saint-clair-sur-epte', 'rouen'],
      regionIds: ['normandy', 'lower-seine'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The Treaty of Saint-Clair-sur-Epte',
      body: {
        en: 'In autumn 911, Rollo and King Charles the Simple reached a settlement at Saint-Clair-sur-Epte, on the river Epte — the natural boundary between the Frankish interior and the lower Seine. Rollo received Rouen and the surrounding territory. In return he pledged to defend the Seine against further Viking incursions, accept Christian baptism, and render nominal fealty to the Frankish crown. The treaty was not a gift but a recognition of reality: Frankish power had already lost control of the region. The nucleus of Normandy — the land of the Northmen — was born.',
        fr: 'À l\'automne 911, Rollon et le roi Charles le Simple conclurent un accord à Saint-Clair-sur-Epte, sur la rivière Epte — la frontière naturelle entre l\'intérieur franc et la basse Seine. Rollon reçut Rouen et le territoire environnant. En retour, il s\'engagea à défendre la Seine contre de nouvelles incursions vikings, à accepter le baptême chrétien et à rendre un hommage nominal à la couronne franque. Le traité ne fut pas un cadeau mais la reconnaissance d\'une réalité : le pouvoir franc avait déjà perdu le contrôle de la région. Le noyau de la Normandie — la terre des Hommes du Nord — était né.',
      },
    },
    anchorYear: 911,
  },
  {
    id: 'rollo-baptism-rouen',
    eraId: 'norman-origins',
    arcId: 'rollo-lifetime',
    camera: {
      target: 'places',
      center: [1.1, 49.44],
      zoom: 8.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Baptism, marriage, and a new name',
      body: {
        en: 'Shortly after the treaty, Rollo was baptised at Rouen, taking the Christian name Robert — after his godfather Robert, Duke of Francia. He married or allied with Poppa, a Frankish noblewoman whose family connections anchored him in local aristocratic networks. The baptism was both a spiritual and political act: it signalled that the new lord of the Seine intended to govern through Frankish institutions, not merely extract plunder. Later chroniclers embellished the ceremony — the famous story of Rollo refusing to kiss the king\'s foot belongs to literary tradition, not documented fact.',
        fr: 'Peu après le traité, Rollon fut baptisé à Rouen, prenant le nom chrétien de Robert — d\'après son parrain Robert, duc de Francia. Il épousa ou s\'allia avec Poppa, une noble franque dont les liens familiaux l\'ancèrent dans les réseaux aristocratiques locaux. Le baptême fut à la fois un acte spirituel et politique : il signalait que le nouveau seigneur de la Seine entendait gouverner par les institutions franques, non simplement piller. Les chroniqueurs ultérieurs enjolivèrent la cérémonie — la fameuse histoire de Rollon refusant de baiser le pied du roi relève de la tradition littéraire, non du fait documenté.',
      },
    },
    anchorYear: 912,
  },
  {
    id: 'rollo-consolidation',
    eraId: 'norman-origins',
    arcId: 'rollo-lifetime',
    camera: {
      target: 'bbox',
      center: [0.2, 49.3],
      zoom: 7.0,
      durationMs: 2200,
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
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Consolidating the new lordship',
      body: {
        en: 'Through the 910s and 920s, Rollo consolidated his territory. Norse settlers spread from the Seine estuary westward, intermarrying with Frankish and Gallo-Roman populations. Raiding corridors became settlement corridors. Rollo granted lands to his followers, appointed administrators, and began restoring the ruined churches and abbeys whose goodwill he needed. He maintained alliances with the Frankish court while encouraging new Scandinavian immigration. The result was a hybrid lordship — Norse military aristocracy grafted onto Frankish legal and ecclesiastical traditions — that proved remarkably effective.',
        fr: 'Tout au long des années 910 et 920, Rollon consolida son territoire. Les colons nordiques se répandirent depuis l\'estuaire de la Seine vers l\'ouest, se mariant avec les populations franques et gallo-romaines. Les corridors de raids devinrent des corridors de peuplement. Rollon concéda des terres à ses fidèles, nomma des administrateurs et commença à restaurer les églises et abbayes en ruine dont il avait besoin du soutien. Il maintint ses alliances avec la cour franque tout en encourageant une nouvelle immigration scandinave. Le résultat fut une seigneurie hybride — une aristocratie militaire nordique greffée sur les traditions juridiques et ecclésiastiques franques — d\'une efficacité remarquable.',
      },
    },
    anchorYear: 920,
  },
  {
    id: 'rollo-death-succession',
    eraId: 'norman-origins',
    arcId: 'rollo-lifetime',
    camera: {
      target: 'places',
      center: [1.1, 49.44],
      zoom: 7.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Death and the seed of a dynasty',
      body: {
        en: 'Rollo died around 928 at Rouen, having ruled his territory for roughly seventeen years. He was succeeded by his son William Longsword, who would expand the duchy westward into the Bessin and deepen its integration into the Frankish political order. Within three generations, the Norse settlers had adopted the French language, Frankish law, and Christian devotion — yet retained their ancestors\' appetite for expansion. The small grant of 911 became the most dynamic duchy in Europe, the springboard for the Norman conquest of England, the kingdoms of southern Italy and Sicily, and a legacy that would reach across the Atlantic to New France.',
        fr: 'Rollon mourut vers 928 à Rouen, après avoir dirigé son territoire pendant environ dix-sept ans. Son fils Guillaume Longue-Épée lui succéda, étendant le duché vers l\'ouest dans le Bessin et approfondissant son intégration dans l\'ordre politique franc. En trois générations, les colons nordiques adoptèrent la langue française, le droit franc et la dévotion chrétienne — tout en conservant l\'appétit d\'expansion de leurs ancêtres. La modeste concession de 911 devint le duché le plus dynamique d\'Europe, le tremplin de la conquête normande de l\'Angleterre, des royaumes d\'Italie du Sud et de Sicile, et d\'un héritage qui atteindrait l\'autre rive de l\'Atlantique jusqu\'en Nouvelle-France.',
      },
    },
    anchorYear: 928,
  },

  // ── William the Conqueror lifetime guided arc ────────────────────
  {
    id: 'wc-bastard-birth',
    eraId: 'norman-origins',
    arcId: 'william-conqueror',
    camera: {
      target: 'places',
      center: [-0.20, 48.89],
      zoom: 8.5,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['falaise'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The bastard of Falaise',
      body: {
        en: 'Around 1028, William was born at Falaise castle — the illegitimate son of Robert I, Duke of Normandy, and Herleva, a woman of modest origin from the town. His illegitimacy would define his early life: a claim to the duchy that was legally recognized by his father but socially precarious. Robert died on pilgrimage in 1035, and the seven-year-old William inherited a duchy whose aristocracy saw a fatherless bastard child as an opportunity rather than an obstacle.',
        fr: 'Vers 1028, Guillaume naquit au château de Falaise — fils illégitime de Robert Ier, duc de Normandie, et d\'Herleva, une femme de modeste origine de la ville. Son illégitimité définirait ses premières années : un droit au duché juridiquement reconnu par son père mais socialement précaire. Robert mourut en pèlerinage en 1035, et Guillaume, âgé de sept ans, hérita d\'un duché dont l\'aristocratie voyait dans un enfant bâtard orphelin une opportunité plutôt qu\'un obstacle.',
      },
    },
    anchorYear: 1028,
  },
  {
    id: 'wc-dangerous-minority',
    eraId: 'norman-origins',
    arcId: 'william-conqueror',
    camera: {
      target: 'bbox',
      center: [0.4, 49.3],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'falaise', 'caen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'A dangerous minority',
      body: {
        en: 'The years between 1035 and 1047 were the most violent in the duchy\'s history. Three of William\'s guardians were murdered in succession. Norman barons fought each other for dominance, and the young duke\'s survival depended on loyal retainers who smuggled him from castle to castle during the worst conspiracies. The ducal authority Rollo\'s descendants had built over a century was on the verge of collapse. William grew up in this world of ambush and betrayal — and it forged a ruler of extraordinary ruthlessness and political intelligence.',
        fr: 'Les années entre 1035 et 1047 furent les plus violentes de l\'histoire du duché. Trois des tuteurs de Guillaume furent assassinés successivement. Les barons normands se combattaient pour la suprématie, et la survie du jeune duc dépendait de fidèles qui le faisaient passer de château en château pendant les pires conspirations. L\'autorité ducale bâtie par les descendants de Rollon en un siècle était au bord de l\'effondrement. Guillaume grandit dans ce monde d\'embuscades et de trahisons — et cela forgea un souverain d\'une cruauté et d\'une intelligence politique extraordinaires.',
      },
    },
    anchorYear: 1040,
  },
  {
    id: 'wc-val-es-dunes',
    eraId: 'norman-origins',
    arcId: 'william-conqueror',
    camera: {
      target: 'places',
      center: [-0.30, 49.12],
      zoom: 8.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['val-es-dunes', 'caen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Val-ès-Dunes — the duke fights back',
      body: {
        en: 'In 1047, a coalition of rebellious Norman barons led by Guy of Burgundy attempted to overthrow the young duke. William, then roughly nineteen, rode to meet them near Caen at Val-ès-Dunes. With crucial support from King Henry I of France, he routed the rebel army in a cavalry battle on the open plain. It was the turning point of his minority: after Val-ès-Dunes, no internal coalition would seriously threaten his rule again. William had proved that he could fight, and that he would destroy anyone who challenged his authority.',
        fr: 'En 1047, une coalition de barons normands rebelles menée par Guy de Bourgogne tenta de renverser le jeune duc. Guillaume, alors âgé d\'environ dix-neuf ans, marcha à leur rencontre près de Caen à Val-ès-Dunes. Avec le soutien décisif du roi Henri Ier de France, il mit en déroute l\'armée rebelle dans un combat de cavalerie en plaine. Ce fut le tournant de sa minorité : après Val-ès-Dunes, aucune coalition interne ne menacerait plus sérieusement son règne. Guillaume avait prouvé qu\'il savait combattre et qu\'il détruirait quiconque contesterait son autorité.',
      },
    },
    anchorYear: 1047,
  },
  {
    id: 'wc-duchy-master',
    eraId: 'norman-origins',
    arcId: 'william-conqueror',
    camera: {
      target: 'bbox',
      center: [0.2, 49.3],
      zoom: 7.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'caen', 'barfleur'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Master of the duchy',
      body: {
        en: 'Through the 1050s William systematically broke every remaining centre of resistance. He defeated the count of Anjou, repelled two invasions by his former ally King Henry I of France, married Matilda of Flanders to secure his northern border, and launched an ambitious programme of castle-building and Church reform. Caen rose as a second ducal capital, anchored by the twin abbeys — Abbaye aux Hommes and Abbaye aux Dames — that expressed Norman piety and ambition in stone. By 1060, Normandy was the most tightly governed principality in France, and William was its unchallenged lord.',
        fr: 'Au cours des années 1050, Guillaume brisa méthodiquement chaque dernier foyer de résistance. Il vainquit le comte d\'Anjou, repoussa deux invasions de son ancien allié le roi Henri Ier de France, épousa Mathilde de Flandre pour sécuriser sa frontière nord, et lança un programme ambitieux de construction de châteaux et de réforme de l\'Église. Caen s\'éleva comme seconde capitale ducale, ancrée par les abbayes jumelles — l\'Abbaye aux Hommes et l\'Abbaye aux Dames — qui exprimaient dans la pierre piété et ambition normandes. En 1060, la Normandie était la principauté la mieux gouvernée de France, et Guillaume son seigneur incontesté.',
      },
    },
    anchorYear: 1055,
  },
  {
    id: 'wc-claim-to-england',
    eraId: 'norman-origins',
    arcId: 'william-conqueror',
    camera: {
      target: 'bbox',
      center: [0.0, 50.2],
      zoom: 5.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'london', 'hastings'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The claim to England',
      body: {
        en: 'Edward the Confessor, the childless Anglo-Saxon king, had lived in exile in Normandy for decades before taking the English throne in 1042. William later claimed that Edward had promised him the succession — a claim reinforced when Harold Godwinson, the most powerful English earl, allegedly swore an oath recognizing William\'s right during a visit to Normandy around 1064. When Edward died on 5 January 1066 and Harold seized the crown, William declared him a perjurer and began planning the most audacious military operation of the medieval age.',
        fr: 'Édouard le Confesseur, le roi anglo-saxon sans enfant, avait vécu en exil en Normandie pendant des décennies avant de monter sur le trône anglais en 1042. Guillaume prétendit plus tard qu\'Édouard lui avait promis la succession — une revendication renforcée quand Harold Godwinson, le plus puissant comte anglais, aurait prêté serment reconnaissant le droit de Guillaume lors d\'une visite en Normandie vers 1064. Quand Édouard mourut le 5 janvier 1066 et qu\'Harold s\'empara de la couronne, Guillaume le déclara parjure et commença à planifier l\'opération militaire la plus audacieuse du Moyen Âge.',
      },
    },
    anchorYear: 1064,
  },
  {
    id: 'wc-invasion-fleet',
    eraId: 'norman-expansion',
    arcId: 'william-conqueror',
    camera: {
      target: 'bbox',
      center: [0.8, 49.8],
      zoom: 6.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['saint-valery-sur-somme', 'caen', 'barfleur'],
      regionIds: ['normandy', 'channel-coast'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The invasion fleet assembles',
      body: {
        en: 'Through the summer of 1066, William assembled an invasion force of roughly 7,000 men and perhaps 700 ships — drawn not just from Normandy but from Brittany, Flanders, and across northern France. The fleet gathered at the mouth of the river Dives, then moved to Saint-Valéry-sur-Somme to await favourable winds. It was a colossal logistical enterprise: horses, armour, siege timber, and supplies for an army that would need to fight the moment it landed. William secured papal blessing for his cause, turning a dynastic gamble into something resembling a crusade.',
        fr: 'Pendant l\'été 1066, Guillaume assembla une force d\'invasion d\'environ 7 000 hommes et peut-être 700 navires — recrutés non seulement en Normandie mais aussi en Bretagne, en Flandre et dans tout le nord de la France. La flotte se rassembla à l\'embouchure de la Dives, puis se déplaça à Saint-Valéry-sur-Somme pour attendre des vents favorables. C\'était une entreprise logistique colossale : chevaux, armures, bois de siège et ravitaillement pour une armée qui devrait combattre dès son débarquement. Guillaume obtint la bénédiction papale pour sa cause, transformant un pari dynastique en quelque chose qui ressemblait à une croisade.',
      },
    },
    anchorYear: 1066,
  },
  {
    id: 'wc-hastings',
    eraId: 'norman-expansion',
    arcId: 'william-conqueror',
    camera: {
      target: 'bbox',
      center: [-0.3, 51.5],
      zoom: 5.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['saint-valery-sur-somme', 'pevensey', 'hastings', 'stamford-bridge', 'york-jorvik', 'london'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Hastings — 14 October 1066',
      body: {
        en: 'The Norman fleet crossed the Channel on the night of 27–28 September, landing at Pevensey on the Sussex coast. Harold, who had just destroyed a Norwegian invasion at Stamford Bridge in the north, force-marched his exhausted army south. The two forces met on 14 October at Senlac Hill near Hastings. The battle lasted all day — a brutal contest between the Norman heavy cavalry and the Anglo-Saxon shield wall. Harold was killed, tradition says by an arrow through the eye, and by nightfall the English army had broken. A single day\'s fighting decided the fate of England.',
        fr: 'La flotte normande traversa la Manche dans la nuit du 27 au 28 septembre, débarquant à Pevensey sur la côte du Sussex. Harold, qui venait de détruire une invasion norvégienne à Stamford Bridge dans le nord, fit marche forcée vers le sud avec son armée épuisée. Les deux forces se rencontrèrent le 14 octobre à Senlac Hill près de Hastings. La bataille dura toute la journée — un affrontement brutal entre la cavalerie lourde normande et le mur de boucliers anglo-saxon. Harold fut tué, selon la tradition d\'une flèche dans l\'œil, et à la tombée de la nuit l\'armée anglaise était brisée. Un seul jour de combat décida du sort de l\'Angleterre.',
      },
    },
    anchorYear: 1066,
  },
  {
    id: 'wc-coronation-conquest',
    eraId: 'norman-expansion',
    arcId: 'william-conqueror',
    camera: {
      target: 'bbox',
      center: [-0.8, 52.5],
      zoom: 5.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['westminster', 'london', 'york-jorvik', 'durham', 'exeter'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Coronation and conquest',
      body: {
        en: 'William was crowned King of England at Westminster Abbey on Christmas Day 1066. But winning the crown and holding the kingdom were different things. Over the next five years he crushed rebellion after rebellion — most brutally the "Harrying of the North" in 1069–70, when he systematically devastated Yorkshire to break Anglo-Scandinavian resistance. Castle after castle rose across the landscape: the Tower of London, Windsor, Warwick, York. The old Anglo-Saxon aristocracy was almost entirely replaced by Norman and French lords. England was being remade.',
        fr: 'Guillaume fut couronné roi d\'Angleterre à l\'abbaye de Westminster le jour de Noël 1066. Mais gagner la couronne et tenir le royaume étaient deux choses différentes. Au cours des cinq années suivantes, il écrasa rébellion après rébellion — la plus brutale étant la « Dévastation du Nord » en 1069-70, quand il ravagea systématiquement le Yorkshire pour briser la résistance anglo-scandinave. Château après château s\'éleva à travers le pays : la Tour de Londres, Windsor, Warwick, York. L\'ancienne aristocratie anglo-saxonne fut presque entièrement remplacée par des seigneurs normands et français. L\'Angleterre était refaite.',
      },
    },
    anchorYear: 1067,
  },
  {
    id: 'wc-cross-channel-empire',
    eraId: 'norman-expansion',
    arcId: 'william-conqueror',
    camera: {
      target: 'bbox',
      center: [0.0, 50.0],
      zoom: 5.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'caen', 'london'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'A cross-Channel empire',
      body: {
        en: 'For the last twenty years of his life, William governed a realm that straddled the English Channel — Normandy on one side, England on the other. He spent roughly half his time in each, crossing the Channel repeatedly to manage crises. The Domesday Book of 1086, a comprehensive survey of English land and wealth, demonstrated a capacity for administrative control unmatched anywhere in Europe. Norman French entered English law, language, and culture. The architecture of power — stone castles, Romanesque cathedrals — transformed the English landscape. But the cross-Channel state was inherently unstable, its two halves pulling in different directions.',
        fr: 'Pendant les vingt dernières années de sa vie, Guillaume gouverna un royaume à cheval sur la Manche — la Normandie d\'un côté, l\'Angleterre de l\'autre. Il passa environ la moitié de son temps dans chacun, traversant la Manche à répétition pour gérer les crises. Le Domesday Book de 1086, un inventaire complet des terres et richesses anglaises, témoignait d\'une capacité de contrôle administratif inégalée en Europe. Le franco-normand pénétra le droit, la langue et la culture anglais. L\'architecture du pouvoir — châteaux de pierre, cathédrales romanes — transforma le paysage anglais. Mais l\'État transmanche était intrinsèquement instable, ses deux moitiés tirant dans des directions opposées.',
      },
    },
    anchorYear: 1080,
  },
  {
    id: 'wc-death-legacy',
    eraId: 'norman-expansion',
    arcId: 'william-conqueror',
    camera: {
      target: 'places',
      center: [1.1, 49.44],
      zoom: 7.0,
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
      pulse: ['destinations'],
    },
    copy: {
      title: 'Death at Rouen — a divided inheritance',
      body: {
        en: 'In September 1087, while campaigning against the French king in the Vexin, William was fatally injured when his horse stumbled on the burning ruins of Mantes. He was carried to the priory of Saint-Gervais outside Rouen, where he died on 9 September. His kingdom was divided: Robert Curthose received Normandy, William Rufus received England. He was buried at his own foundation, the Abbaye aux Hommes in Caen. The bastard of Falaise had transformed a minor duchy into a cross-Channel empire, reshaped the English language and law, and set in motion a Norman legacy that would echo from Sicily to the walls of Jerusalem — and, centuries later, across the Atlantic to New France.',
        fr: 'En septembre 1087, alors qu\'il faisait campagne contre le roi de France dans le Vexin, Guillaume fut mortellement blessé quand son cheval trébucha sur les ruines brûlantes de Mantes. Il fut transporté au prieuré de Saint-Gervais près de Rouen, où il mourut le 9 septembre. Son royaume fut divisé : Robert Courteheuse reçut la Normandie, Guillaume le Roux reçut l\'Angleterre. Il fut enterré dans sa propre fondation, l\'Abbaye aux Hommes à Caen. Le bâtard de Falaise avait transformé un duché mineur en un empire transmanche, remodelé la langue et le droit anglais, et mis en mouvement un héritage normand qui résonnerait de la Sicile aux murs de Jérusalem — et, des siècles plus tard, de l\'autre côté de l\'Atlantique jusqu\'en Nouvelle-France.',
      },
    },
    anchorYear: 1087,
  },

  // ── Roger II lifetime guided arc ─────────────────────────────────
  {
    id: 'r2-hauteville-arrival',
    eraId: 'norman-expansion',
    arcId: 'roger-ii',
    camera: {
      target: 'bbox',
      center: [8.0, 44.5],
      zoom: 4.5,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bari', 'melfi'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Hautevilles come south',
      body: {
        en: 'In the early eleventh century, Norman adventurers — landless younger sons from the petty aristocracy of the Cotentin and the Bessin — arrived in southern Italy as mercenaries for hire. They fought for Lombard princes, Byzantine governors, and anyone who would pay. Among them were the sons of Tancred of Hauteville, a minor lord from near Coutances. From this obscure family would come Robert Guiscard, who conquered Apulia and Calabria, and his younger brother Roger I, who wrested Sicily from the Arabs. By the late eleventh century the Hautevilles held the largest Norman dominion outside Normandy itself.',
        fr: 'Au début du XIe siècle, des aventuriers normands — cadets sans terre de la petite aristocratie du Cotentin et du Bessin — arrivèrent en Italie du Sud comme mercenaires à louer. Ils combattaient pour des princes lombards, des gouverneurs byzantins, et quiconque pouvait payer. Parmi eux se trouvaient les fils de Tancrède de Hauteville, un petit seigneur des environs de Coutances. De cette famille obscure sortiraient Robert Guiscard, qui conquit les Pouilles et la Calabre, et son frère cadet Roger Ier, qui arracha la Sicile aux Arabes. À la fin du XIe siècle, les Hauteville détenaient le plus vaste domaine normand hors de la Normandie elle-même.',
      },
    },
    anchorYear: 1030,
  },
  {
    id: 'r2-birth-sicily',
    eraId: 'norman-expansion',
    arcId: 'roger-ii',
    camera: {
      target: 'places',
      center: [15.55, 38.19],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['messina', 'palermo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Born into a conquered island',
      body: {
        en: 'Roger II was born on 22 December 1095 in Sicily — most likely at Mileto in Calabria — the son of Roger I, the Great Count who had spent thirty years conquering the island from its Arab rulers. Sicily was a world unlike anything in northern Europe: Greek-speaking Christians, Arabic-speaking Muslims, Jewish communities, and a thin Norman military elite governing them all. Roger I died in 1101, leaving the six-year-old Roger II under his mother Adelaide\'s regency. The boy inherited not just an island but the challenge of holding together one of the most diverse populations in the medieval world.',
        fr: 'Roger II naquit le 22 décembre 1095 en Sicile — très probablement à Mileto en Calabre — fils de Roger Ier, le Grand Comte qui avait passé trente ans à conquérir l\'île sur ses souverains arabes. La Sicile était un monde sans équivalent en Europe du Nord : chrétiens hellénophones, musulmans arabophones, communautés juives et une mince élite militaire normande gouvernant le tout. Roger Ier mourut en 1101, laissant Roger II, six ans, sous la régence de sa mère Adélaïde. L\'enfant héritait non seulement d\'une île mais du défi de maintenir l\'unité de l\'une des populations les plus diverses du monde médiéval.',
      },
    },
    anchorYear: 1095,
  },
  {
    id: 'r2-mainland-claim',
    eraId: 'norman-expansion',
    arcId: 'roger-ii',
    camera: {
      target: 'bbox',
      center: [15.0, 40.0],
      zoom: 5.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bari', 'melfi', 'palermo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Claiming the mainland',
      body: {
        en: 'When his cousin William, Duke of Apulia, died without heirs in 1127, Roger seized his chance. He crossed the Strait of Messina and claimed the mainland Norman territories — Apulia, Calabria, and the Principality of Capua. The mainland barons, who had no wish to be ruled by a Sicilian count, revolted repeatedly. Roger defeated them with a combination of military force and political cunning, besieging rebel strongholds and buying off those who could be bought. By 1129 he had forced the last holdouts to submit. For the first time, every Norman territory in southern Italy and Sicily answered to one lord.',
        fr: 'Quand son cousin Guillaume, duc d\'Apulie, mourut sans héritier en 1127, Roger saisit sa chance. Il traversa le détroit de Messine et revendiqua les territoires normands continentaux — les Pouilles, la Calabre et la principauté de Capoue. Les barons du continent, qui ne voulaient pas être gouvernés par un comte sicilien, se révoltèrent à plusieurs reprises. Roger les soumit par un mélange de force militaire et de ruse politique, assiégeant les places fortes rebelles et achetant ceux qui pouvaient l\'être. En 1129, il avait contraint les derniers récalcitrants à se soumettre. Pour la première fois, chaque territoire normand d\'Italie du Sud et de Sicile obéissait à un seul seigneur.',
      },
    },
    anchorYear: 1127,
  },
  {
    id: 'r2-crowned-king',
    eraId: 'norman-expansion',
    arcId: 'roger-ii',
    camera: {
      target: 'places',
      center: [13.36, 38.12],
      zoom: 7.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['palermo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'King of Sicily — Christmas 1130',
      body: {
        en: 'On Christmas Day 1130, Roger was crowned King of Sicily in Palermo cathedral by a papal legate. The new kingdom united Sicily, Calabria, Apulia, Capua, and Naples under a single crown — the first time these territories had been united since the fall of Rome. Pope Anacletus II granted the title in exchange for Roger\'s support in a papal schism; the rival pope, Innocent II, denounced it. Roger\'s response was characteristically direct: he defeated Innocent\'s German and Norman allies in the field, captured the pope himself at the Battle of Galluccio in 1139, and forced him to confirm the kingdom. Legitimacy, for Roger, was something you won by force and then dressed in ceremony.',
        fr: 'Le jour de Noël 1130, Roger fut couronné roi de Sicile dans la cathédrale de Palerme par un légat pontifical. Le nouveau royaume unissait la Sicile, la Calabre, les Pouilles, Capoue et Naples sous une seule couronne — la première unification de ces territoires depuis la chute de Rome. Le pape Anaclet II avait accordé le titre en échange du soutien de Roger dans un schisme papal ; le pape rival, Innocent II, le dénonça. La réponse de Roger fut caractéristiquement directe : il vainquit les alliés allemands et normands d\'Innocent sur le terrain, captura le pape lui-même à la bataille de Galluccio en 1139, et le força à confirmer le royaume. La légitimité, pour Roger, était quelque chose qu\'on gagnait par la force et qu\'on habillait ensuite de cérémonie.',
      },
    },
    anchorYear: 1130,
  },
  {
    id: 'r2-palermo-capital',
    eraId: 'norman-expansion',
    arcId: 'roger-ii',
    camera: {
      target: 'places',
      center: [13.36, 38.12],
      zoom: 8.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['palermo', 'cefalu'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Palermo — capital of three cultures',
      body: {
        en: 'Roger made Palermo one of the most remarkable cities in the medieval world. Arab geographers, Greek scholars, Latin churchmen, and Norman administrators worked side by side. The royal court operated in Arabic, Greek, and Latin. Roger commissioned the Cappella Palatina, whose interior fused Byzantine mosaics, Arabic muqarnas ceilings, and Latin liturgy in a single dazzling space. At Cefalù he raised a cathedral whose mosaic Christ Pantocrator remains one of the supreme achievements of medieval art. No other ruler in Europe governed with such deliberate multicultural ambition.',
        fr: 'Roger fit de Palerme l\'une des villes les plus remarquables du monde médiéval. Géographes arabes, érudits grecs, ecclésiastiques latins et administrateurs normands travaillaient côte à côte. La cour royale fonctionnait en arabe, en grec et en latin. Roger commanda la Chapelle Palatine, dont l\'intérieur fusionnait mosaïques byzantines, plafonds à muqarnas arabes et liturgie latine en un seul espace éblouissant. À Cefalù, il éleva une cathédrale dont le Christ Pantocrator en mosaïque reste l\'un des chefs-d\'œuvre suprêmes de l\'art médiéval. Aucun autre souverain en Europe ne gouverna avec une ambition multiculturelle aussi délibérée.',
      },
    },
    anchorYear: 1140,
  },
  {
    id: 'r2-administration',
    eraId: 'norman-expansion',
    arcId: 'roger-ii',
    camera: {
      target: 'bbox',
      center: [14.5, 39.5],
      zoom: 5.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['palermo', 'bari', 'messina'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The most governed kingdom in Europe',
      body: {
        en: 'Roger built an administrative machine of extraordinary sophistication. Drawing on Arab fiscal traditions, Byzantine bureaucratic methods, and Norman feudal structures, he created a centralized state that could tax, legislate, and enforce royal authority across a vast and diverse realm. The Assizes of Ariano (1140) codified laws for the entire kingdom. A network of royal justiciars enforced the king\'s peace. The diwan — a treasury modelled on Fatimid Egypt — tracked revenues with a precision that would not be matched in western Europe until the Angevin reforms in England. Roger proved that a Norman ruler could not only conquer but govern.',
        fr: 'Roger bâtit une machine administrative d\'une sophistication extraordinaire. Puisant dans les traditions fiscales arabes, les méthodes bureaucratiques byzantines et les structures féodales normandes, il créa un État centralisé capable de taxer, légiférer et imposer l\'autorité royale à travers un royaume vaste et divers. Les Assises d\'Ariano (1140) codifièrent les lois pour l\'ensemble du royaume. Un réseau de justiciers royaux faisait respecter la paix du roi. Le diwān — un trésor calqué sur l\'Égypte fatimide — suivait les revenus avec une précision qui ne serait égalée en Europe occidentale qu\'avec les réformes angevines en Angleterre. Roger prouva qu\'un souverain normand pouvait non seulement conquérir mais gouverner.',
      },
    },
    anchorYear: 1140,
  },
  {
    id: 'r2-africa-mediterranean',
    eraId: 'norman-expansion',
    arcId: 'roger-ii',
    camera: {
      target: 'bbox',
      center: [12.0, 37.0],
      zoom: 4.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['palermo', 'mahdia', 'messina'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Norman Africa and the central Mediterranean',
      body: {
        en: 'Roger\'s ambitions reached across the sea. Between 1135 and 1153 his fleets conquered a chain of coastal cities along the North African shore — Mahdia, Tripoli, Sfax, Gabès — establishing what chroniclers called the "Kingdom of Africa." It was the only time a Christian European power held territory on the North African coast between the Roman era and the early modern age. Roger also raided the Byzantine Empire, sacking Corfu, Corinth, and Thebes, and carrying Greek silk weavers back to Palermo. The central Mediterranean had become a Norman lake.',
        fr: 'Les ambitions de Roger s\'étendirent au-delà de la mer. Entre 1135 et 1153, ses flottes conquirent une chaîne de cités côtières le long du littoral nord-africain — Mahdia, Tripoli, Sfax, Gabès — établissant ce que les chroniqueurs appelèrent le « Royaume d\'Afrique ». Ce fut la seule fois qu\'une puissance chrétienne européenne tint un territoire sur la côte nord-africaine entre l\'époque romaine et le début de l\'ère moderne. Roger razzía également l\'Empire byzantin, mettant à sac Corfou, Corinthe et Thèbes, et ramenant des tisserands de soie grecs à Palerme. La Méditerranée centrale était devenue un lac normand.',
      },
    },
    anchorYear: 1148,
  },
  {
    id: 'r2-al-idrisi',
    eraId: 'norman-expansion',
    arcId: 'roger-ii',
    camera: {
      target: 'places',
      center: [13.36, 38.12],
      zoom: 8.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['palermo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Al-Idrisi and the Book of Roger',
      body: {
        en: 'In 1154, the Arab geographer Muhammad al-Idrisi completed the Tabula Rogeriana — the "Book of Roger" — the most accurate world map produced in the medieval period. Commissioned by Roger, it was engraved on a massive silver disc and accompanied by a geographic text that synthesized Greek, Arabic, and Norman knowledge. The project embodied everything Roger\'s court represented: intellectual ambition, cross-cultural collaboration, and a king who saw himself not as the ruler of one people but as the patron of universal learning. No other Norman achievement so clearly demonstrated how far the descendants of Scandinavian raiders had come.',
        fr: 'En 1154, le géographe arabe Muhammad al-Idrisi acheva la Tabula Rogeriana — le « Livre de Roger » — la carte du monde la plus précise produite au Moyen Âge. Commandée par Roger, elle fut gravée sur un immense disque d\'argent et accompagnée d\'un texte géographique synthétisant les savoirs grec, arabe et normand. Le projet incarnait tout ce que la cour de Roger représentait : ambition intellectuelle, collaboration interculturelle et un roi qui se voyait non comme le souverain d\'un seul peuple mais comme le patron du savoir universel. Aucune autre réalisation normande ne démontra aussi clairement le chemin parcouru par les descendants de raiders scandinaves.',
      },
    },
    anchorYear: 1154,
  },
  {
    id: 'r2-death-legacy',
    eraId: 'norman-expansion',
    arcId: 'roger-ii',
    camera: {
      target: 'bbox',
      center: [13.5, 38.5],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['palermo', 'cefalu'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Death and the Norman Mediterranean legacy',
      body: {
        en: 'Roger II died on 26 February 1154 in Palermo, aged fifty-eight. His kingdom passed to his son William I, and then to his grandson William II, who built the cathedral of Monreale — the last great masterpiece of Norman Sicily. The Hauteville dynasty ended in 1194 when Emperor Henry VI conquered the kingdom, but the structures Roger built survived. His legal code, his multicultural administration, and his architectural splendour shaped Sicily for centuries. The Cappella Palatina, Cefalù, and Monreale still stand as monuments to a moment when Norman ambition, Arab learning, and Byzantine artistry fused into something the world had never seen before — and would never see again.',
        fr: 'Roger II mourut le 26 février 1154 à Palerme, à cinquante-huit ans. Son royaume passa à son fils Guillaume Ier, puis à son petit-fils Guillaume II, qui bâtit la cathédrale de Monreale — le dernier grand chef-d\'œuvre de la Sicile normande. La dynastie Hauteville prit fin en 1194 quand l\'empereur Henri VI conquit le royaume, mais les structures bâties par Roger survécurent. Son code juridique, son administration multiculturelle et sa splendeur architecturale façonnèrent la Sicile pendant des siècles. La Chapelle Palatine, Cefalù et Monreale se dressent encore comme des monuments d\'un moment où ambition normande, savoir arabe et art byzantin fusionnèrent en quelque chose que le monde n\'avait jamais vu — et ne reverrait jamais.',
      },
    },
    anchorYear: 1154,
  },

  // ── Robert Guiscard lifetime guided arc ──────────────────────────
  {
    id: 'rg-hauteville-origins',
    eraId: 'norman-expansion',
    arcId: 'robert-guiscard',
    camera: {
      target: 'bbox',
      center: [4.0, 47.0],
      zoom: 4.5,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['caen', 'bari'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Sons of Hauteville',
      body: {
        en: 'Tancred of Hauteville was a minor Norman lord near Coutances in the Cotentin — a man of modest means with twelve sons and no land to give most of them. Beginning in the 1030s, the elder brothers left Normandy for southern Italy, where the fragmented politics of Lombard principalities, Byzantine provinces, and Arab-held Sicily offered opportunity to skilled fighters. The first Norman foothold was Aversa, granted as a county in 1030. Robert, the sixth of Tancred\'s sons, arrived in Italy around 1047 — young, ambitious, and entirely without resources. He would become the most formidable conqueror of his age.',
        fr: 'Tancrède de Hauteville était un petit seigneur normand près de Coutances dans le Cotentin — un homme de moyens modestes avec douze fils et aucune terre à donner à la plupart d\'entre eux. À partir des années 1030, les frères aînés quittèrent la Normandie pour l\'Italie du Sud, où la politique fragmentée des principautés lombardes, des provinces byzantines et de la Sicile tenue par les Arabes offrait des possibilités aux combattants habiles. Le premier point d\'ancrage normand fut Aversa, accordée comme comté en 1030. Robert, sixième fils de Tancrède, arriva en Italie vers 1047 — jeune, ambitieux et totalement dépourvu de ressources. Il deviendrait le plus redoutable conquérant de son temps.',
      },
    },
    anchorYear: 1035,
  },
  {
    id: 'rg-arrival-italy',
    eraId: 'norman-expansion',
    arcId: 'robert-guiscard',
    camera: {
      target: 'bbox',
      center: [15.5, 40.5],
      zoom: 6.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['aversa', 'melfi', 'bari'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The fox arrives in Apulia',
      body: {
        en: 'Robert arrived in Calabria with nothing but his sword and his wits. He earned the nickname "Guiscard" — the "Wily" or "Resourceful" — by raiding, extorting, and outmaneuvering both his enemies and his own Norman rivals. He operated as a brigand-chief in the Calabrian highlands, building a war-band from scratch through a combination of personal charisma, calculated violence, and the promise of plunder. When his elder brother Humphrey died in 1057, Robert seized control of the family\'s Italian holdings. He now commanded every Norman fighting man in Apulia.',
        fr: 'Robert arriva en Calabre avec rien d\'autre que son épée et sa ruse. Il gagna le surnom de « Guiscard » — le « Rusé » ou « Avisé » — en pillant, extorquant et déjouant à la fois ses ennemis et ses propres rivaux normands. Il opéra comme un chef de brigands dans les hautes terres calabraises, construisant une bande armée à partir de rien grâce à un mélange de charisme personnel, de violence calculée et de promesses de butin. Quand son frère aîné Humphrey mourut en 1057, Robert s\'empara du contrôle des possessions familiales en Italie. Il commandait désormais chaque combattant normand dans les Pouilles.',
      },
    },
    anchorYear: 1047,
  },
  {
    id: 'rg-papal-alliance',
    eraId: 'norman-expansion',
    arcId: 'robert-guiscard',
    camera: {
      target: 'places',
      center: [15.53, 40.99],
      zoom: 7.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['melfi'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The Treaty of Melfi — vassal to the Pope',
      body: {
        en: 'In 1059, Pope Nicholas II made a stunning reversal. The papacy had tried and failed to dislodge the Normans from southern Italy; now it chose to co-opt them. At Melfi, the Pope invested Robert as Duke of Apulia, Calabria, and — in an inspired piece of legal fiction — Sicily, which was still under Arab rule. In return Robert became a papal vassal, pledging military support. The treaty transformed Robert from a brigand warlord into a legitimate feudal prince with papal sanction. It was one of the most consequential diplomatic deals of the eleventh century: the Normans gained legitimacy, the papacy gained a sword.',
        fr: 'En 1059, le pape Nicolas II fit un revirement stupéfiant. La papauté avait tenté sans succès de déloger les Normands d\'Italie du Sud ; elle choisit maintenant de les récupérer. À Melfi, le pape investit Robert comme duc d\'Apulie, de Calabre et — dans une fiction juridique inspirée — de Sicile, encore sous domination arabe. En retour Robert devint vassal pontifical, promettant un soutien militaire. Le traité transforma Robert de chef de guerre brigand en prince féodal légitime avec la sanction papale. Ce fut l\'un des accords diplomatiques les plus lourds de conséquences du XIe siècle : les Normands gagnèrent la légitimité, la papauté gagna une épée.',
      },
    },
    anchorYear: 1059,
  },
  {
    id: 'rg-fall-of-bari',
    eraId: 'norman-expansion',
    arcId: 'robert-guiscard',
    camera: {
      target: 'places',
      center: [16.87, 41.12],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bari'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The fall of Bari — Byzantium expelled',
      body: {
        en: 'Bari had been the capital of Byzantine Italy for over three centuries — the anchor of Constantinople\'s western presence. Robert besieged it for three years, cutting off both land and sea supply. In April 1071, the city surrendered. With Bari\'s fall, Byzantine authority in Italy ended permanently. An empire that had ruled the region since Justinian lost its last foothold to a family of Norman adventurers from the Cotentin. Robert now controlled everything from the Adriatic coast to the mountains of Calabria — the largest Norman domain outside England.',
        fr: 'Bari avait été la capitale de l\'Italie byzantine pendant plus de trois siècles — l\'ancre de la présence occidentale de Constantinople. Robert l\'assiégea trois ans, coupant le ravitaillement terrestre et maritime. En avril 1071, la ville capitula. Avec la chute de Bari, l\'autorité byzantine en Italie prit fin définitivement. Un empire qui avait gouverné la région depuis Justinien perdait sa dernière base face à une famille d\'aventuriers normands du Cotentin. Robert contrôlait désormais tout, de la côte adriatique aux montagnes de Calabre — le plus vaste domaine normand hors d\'Angleterre.',
      },
    },
    anchorYear: 1071,
  },
  {
    id: 'rg-sicily-campaign',
    eraId: 'norman-expansion',
    arcId: 'robert-guiscard',
    camera: {
      target: 'bbox',
      center: [14.5, 38.5],
      zoom: 5.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['messina', 'palermo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'The conquest of Sicily',
      body: {
        en: 'While consolidating Apulia, Robert entrusted the conquest of Sicily to his youngest brother Roger. The campaign lasted thirty years (1061–1091). Messina fell first, then the Normans pushed west across a mountainous island defended by Arab emirs who knew the terrain. Palermo, the great prize, was taken in 1072 after a joint siege by Robert and Roger. Robert retained nominal overlordship, but it was Roger who stayed and governed — laying the foundations for what would become, under his son Roger II, the Kingdom of Sicily.',
        fr: 'Tout en consolidant les Pouilles, Robert confia la conquête de la Sicile à son plus jeune frère Roger. La campagne dura trente ans (1061–1091). Messine tomba la première, puis les Normands poussèrent vers l\'ouest à travers une île montagneuse défendue par des émirs arabes connaissant le terrain. Palerme, le grand prix, fut prise en 1072 après un siège conjoint de Robert et Roger. Robert conserva la suzeraineté nominale, mais c\'est Roger qui resta et gouverna — posant les fondations de ce qui deviendrait, sous son fils Roger II, le Royaume de Sicile.',
      },
    },
    anchorYear: 1072,
  },
  {
    id: 'rg-salerno-capital',
    eraId: 'norman-expansion',
    arcId: 'robert-guiscard',
    camera: {
      target: 'places',
      center: [14.77, 40.68],
      zoom: 7.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['salerno', 'bari'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Salerno — a Norman capital',
      body: {
        en: 'In 1076, Robert captured Salerno, the last independent Lombard principality, and made it his capital. The city\'s famous medical school — the oldest in Europe — continued to function under Norman rule. Robert married the Lombard princess Sichelgaita, who rode into battle at his side in full armour. He began construction of a great cathedral to rival anything in northern Europe. From Salerno, Robert governed a realm stretching from the Abruzzi to Sicily — but his ambitions were already turning eastward, toward the richest prize of all: the Byzantine Empire.',
        fr: 'En 1076, Robert prit Salerne, la dernière principauté lombarde indépendante, et en fit sa capitale. La célèbre école de médecine de la ville — la plus ancienne d\'Europe — continua de fonctionner sous le régime normand. Robert épousa la princesse lombarde Sichelgaite, qui chevauchait à ses côtés en armure complète au combat. Il commença la construction d\'une grande cathédrale rivalisant avec toutes celles d\'Europe du Nord. Depuis Salerne, Robert gouvernait un domaine s\'étendant des Abruzzes à la Sicile — mais ses ambitions se tournaient déjà vers l\'est, vers le prix le plus riche de tous : l\'Empire byzantin.',
      },
    },
    anchorYear: 1076,
  },
  {
    id: 'rg-durazzo-campaign',
    eraId: 'norman-expansion',
    arcId: 'robert-guiscard',
    camera: {
      target: 'bbox',
      center: [17.5, 40.5],
      zoom: 5.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bari', 'durazzo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Against Byzantium — the battle of Durazzo',
      body: {
        en: 'In 1081, Robert crossed the Adriatic and invaded the Byzantine Empire itself. His target was Durazzo (Dyrrachium), the western terminus of the Via Egnatia — the road to Constantinople. The Byzantine emperor Alexios I Komnenos met him with an army that included the elite Varangian Guard. On 18 October 1081, in one of the great battles of the medieval period, Robert\'s Norman cavalry shattered the Byzantine line. Durazzo fell. For the first time since the Visigoths, a western army was advancing toward Constantinople along the ancient Roman road. It was the most audacious campaign any Norman had yet attempted.',
        fr: 'En 1081, Robert traversa l\'Adriatique et envahit l\'Empire byzantin lui-même. Sa cible était Durazzo (Dyrrachium), le terminus occidental de la Via Egnatia — la route de Constantinople. L\'empereur byzantin Alexis Ier Comnène l\'affronta avec une armée comprenant l\'élite de la Garde varangienne. Le 18 octobre 1081, dans l\'une des grandes batailles de la période médiévale, la cavalerie normande de Robert brisa la ligne byzantine. Durazzo tomba. Pour la première fois depuis les Wisigoths, une armée occidentale avançait vers Constantinople le long de l\'ancienne voie romaine. C\'était la campagne la plus audacieuse qu\'un Normand ait jamais tentée.',
      },
    },
    anchorYear: 1081,
  },
  {
    id: 'rg-rome-rescue',
    eraId: 'norman-expansion',
    arcId: 'robert-guiscard',
    camera: {
      target: 'bbox',
      center: [14.0, 41.5],
      zoom: 5.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['salerno', 'bari'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The sack of Rome',
      body: {
        en: 'In 1084, Pope Gregory VII was besieged in the Castel Sant\'Angelo by the Holy Roman Emperor Henry IV. The Pope called on his Norman vassal for rescue. Robert marched north with a massive army, drove off the German forces, and freed the Pope — but his troops then sacked Rome with a violence that shocked all of Christendom. Entire districts were burned. The Romans, who had welcomed him as a liberator, cursed the Normans as worse than the barbarians of old. Gregory, too humiliated to remain, left Rome with Robert and died in exile at Salerno. It was a characteristic Guiscard moment: victory achieved, but at a cost that appalled even his allies.',
        fr: 'En 1084, le pape Grégoire VII était assiégé au Château Saint-Ange par l\'empereur du Saint-Empire Henri IV. Le pape appela son vassal normand au secours. Robert marcha vers le nord avec une armée massive, chassa les forces germaniques et libéra le pape — mais ses troupes mirent ensuite Rome à sac avec une violence qui choqua toute la chrétienté. Des quartiers entiers furent incendiés. Les Romains, qui l\'avaient accueilli en libérateur, maudirent les Normands comme pires que les barbares d\'autrefois. Grégoire, trop humilié pour rester, quitta Rome avec Robert et mourut en exil à Salerne. Ce fut un moment typiquement Guiscard : victoire obtenue, mais à un coût qui consterna même ses alliés.',
      },
    },
    anchorYear: 1084,
  },
  {
    id: 'rg-death-legacy',
    eraId: 'norman-expansion',
    arcId: 'robert-guiscard',
    camera: {
      target: 'bbox',
      center: [15.0, 40.0],
      zoom: 5.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bari', 'palermo', 'salerno', 'durazzo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Death and a Mediterranean legacy',
      body: {
        en: 'Robert Guiscard died on 17 July 1085 on the island of Cephalonia, in the midst of his second Balkan campaign against Byzantium. He was about seventy years old. He had arrived in Italy with nothing and left behind a domain stretching from the Adriatic to Sicily, had expelled the Byzantine Empire from the Italian peninsula, conquered the last Arab strongholds in Sicily, sacked Rome, and fought the greatest empire in the world to a standstill. His son Bohemond would carry the Norman name to Antioch on the First Crusade. His brother Roger\'s line would produce Roger II and the Kingdom of Sicily. The wily sixth son of Hauteville had reshaped the map of the medieval Mediterranean.',
        fr: 'Robert Guiscard mourut le 17 juillet 1085 sur l\'île de Céphalonie, en pleine deuxième campagne balkanique contre Byzance. Il avait environ soixante-dix ans. Arrivé en Italie sans rien, il laissait un domaine s\'étendant de l\'Adriatique à la Sicile, avait expulsé l\'Empire byzantin de la péninsule italienne, conquis les derniers bastions arabes de Sicile, mis Rome à sac et combattu le plus grand empire du monde jusqu\'à l\'impasse. Son fils Bohémond porterait le nom normand à Antioche lors de la Première Croisade. La lignée de son frère Roger produirait Roger II et le Royaume de Sicile. Le rusé sixième fils de Hauteville avait redessiné la carte de la Méditerranée médiévale.',
      },
    },
    anchorYear: 1085,
  },

  // ── Bohemond of Antioch lifetime guided arc ──────────────────────
  {
    id: 'boh-guiscard-son',
    eraId: 'norman-expansion',
    arcId: 'bohemond-antioch',
    camera: {
      target: 'bbox',
      center: [15.0, 40.5],
      zoom: 5.5,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bari', 'salerno', 'taranto'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'A Guiscard\'s son, disinherited',
      body: {
        en: 'Bohemond was born around 1054, the eldest son of Robert Guiscard and his first wife Alberada of Buonalbergo. He grew up in the violent world of Norman southern Italy, trained for war from childhood, and fought alongside his father at the pivotal battle of Durazzo in 1081 — where, at barely twenty-seven, he led the cavalry charge that broke the Byzantine line. But when Guiscard remarried the Lombard princess Sichelgaita, she secured the succession for her own son, Roger Borsa. Bohemond was passed over. The greatest warrior of his generation was left with nothing but his reputation and his father\'s example: that a landless Norman could carve out a realm by force of arms.',
        fr: 'Bohémond naquit vers 1054, fils aîné de Robert Guiscard et de sa première épouse Alberada de Buonalbergo. Il grandit dans le monde violent de l\'Italie du Sud normande, formé à la guerre dès l\'enfance, et combattit aux côtés de son père à la bataille décisive de Durazzo en 1081 — où, à peine vingt-sept ans, il mena la charge de cavalerie qui brisa la ligne byzantine. Mais lorsque Guiscard se remaria avec la princesse lombarde Sichelgaite, celle-ci assura la succession à son propre fils, Roger Borsa. Bohémond fut écarté. Le plus grand guerrier de sa génération se retrouvait sans rien d\'autre que sa réputation et l\'exemple paternel : un Normand sans terre pouvait se tailler un royaume par la force des armes.',
      },
    },
    anchorYear: 1054,
  },
  {
    id: 'boh-italian-wars',
    eraId: 'norman-expansion',
    arcId: 'bohemond-antioch',
    camera: {
      target: 'places',
      center: [16.5, 40.8],
      zoom: 6.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['taranto', 'bari'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The prince of Taranto',
      body: {
        en: 'After Guiscard\'s death in 1085, Bohemond spent a decade fighting his half-brother Roger Borsa for a share of the inheritance. He was a brilliant soldier but a poor politician, and Borsa held the ducal title and papal support. Eventually Bohemond carved out the Principality of Taranto — the heel of the Italian boot — a modest domain for a man of his ambitions. He held it restlessly, always looking for a larger stage. When Pope Urban II preached the First Crusade at Clermont in 1095, Bohemond saw something no other Norman lord recognised: an opportunity to build his own principality in the East, beyond the reach of brothers, popes, and Byzantine emperors.',
        fr: 'Après la mort de Guiscard en 1085, Bohémond passa une décennie à combattre son demi-frère Roger Borsa pour une part de l\'héritage. C\'était un soldat brillant mais un piètre politique, et Borsa détenait le titre ducal et le soutien papal. Finalement Bohémond se tailla la Principauté de Tarente — le talon de la botte italienne — un domaine modeste pour un homme de ses ambitions. Il le tenait avec impatience, cherchant toujours une scène plus grande. Quand le pape Urbain II prêcha la Première Croisade à Clermont en 1095, Bohémond vit quelque chose qu\'aucun autre seigneur normand ne reconnut : l\'occasion de bâtir sa propre principauté en Orient, hors de portée des frères, des papes et des empereurs byzantins.',
      },
    },
    anchorYear: 1090,
  },
  {
    id: 'boh-crusade-begins',
    eraId: 'norman-expansion',
    arcId: 'bohemond-antioch',
    camera: {
      target: 'bbox',
      center: [22.0, 41.0],
      zoom: 4.5,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['taranto', 'durazzo', 'constantinople'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Taking the cross',
      body: {
        en: 'In 1096, Bohemond was besieging Amalfi when news of the Crusade reached him. According to legend, he tore up his finest cloak to make crosses for his men on the spot. He assembled the Norman contingent — experienced veterans of the Italian wars, many of them descendants of the mercenaries who had first come south decades earlier. They crossed the Adriatic at Durazzo, retracing his father\'s invasion route of 1081, and marched overland through the Balkans to Constantinople. Bohemond knew the road, knew the enemy, and knew the Byzantine emperor Alexios I Komnenos personally — from opposite sides of a battlefield.',
        fr: 'En 1096, Bohémond assiégeait Amalfi quand la nouvelle de la Croisade lui parvint. Selon la légende, il déchira son plus beau manteau pour en faire des croix pour ses hommes sur-le-champ. Il rassembla le contingent normand — des vétérans aguerris des guerres d\'Italie, dont beaucoup descendaient des mercenaires venus pour la première fois dans le Sud des décennies plus tôt. Ils traversèrent l\'Adriatique à Durazzo, retraçant la route d\'invasion de son père en 1081, et marchèrent par voie terrestre à travers les Balkans jusqu\'à Constantinople. Bohémond connaissait la route, connaissait l\'ennemi et connaissait personnellement l\'empereur byzantin Alexis Ier Comnène — pour l\'avoir affronté sur un champ de bataille.',
      },
    },
    anchorYear: 1096,
  },
  {
    id: 'boh-constantinople-oath',
    eraId: 'norman-expansion',
    arcId: 'bohemond-antioch',
    camera: {
      target: 'places',
      center: [29.0, 41.0],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['constantinople'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Constantinople — the oath',
      body: {
        en: 'Alexios Komnenos regarded the Crusaders with deep suspicion — especially the Normans, who had invaded his empire barely fifteen years earlier. He demanded that every Crusader lord swear an oath to return any former Byzantine territory they conquered. Most did so reluctantly. Bohemond swore willingly, even eagerly — and the Byzantine princess Anna Komnena, writing years later, captured his towering physical presence: tall, fair-haired, broad-shouldered, with a permanent half-smile that unsettled everyone who met him. Alexios offered him the title of Grand Domestic of the East. Bohemond accepted the flattery and ignored the obligation. He had no intention of returning anything.',
        fr: 'Alexis Comnène considérait les Croisés avec une profonde méfiance — surtout les Normands, qui avaient envahi son empire à peine quinze ans plus tôt. Il exigea de chaque seigneur croisé un serment de restituer tout ancien territoire byzantin conquis. La plupart le firent à contrecœur. Bohémond jura volontiers, même avec empressement — et la princesse byzantine Anne Comnène, écrivant des années plus tard, capta sa stature imposante : grand, blond, aux larges épaules, avec un demi-sourire permanent qui mettait mal à l\'aise tous ceux qui le rencontraient. Alexis lui offrit le titre de Grand Domestique d\'Orient. Bohémond accepta la flatterie et ignora l\'obligation. Il n\'avait aucune intention de rendre quoi que ce soit.',
      },
    },
    anchorYear: 1097,
  },
  {
    id: 'boh-dorylaeum-march',
    eraId: 'norman-expansion',
    arcId: 'bohemond-antioch',
    camera: {
      target: 'bbox',
      center: [31.0, 40.0],
      zoom: 5.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['nicaea', 'dorylaeum'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Nicaea and Dorylaeum',
      body: {
        en: 'The Crusader army crossed into Asia Minor and besieged Nicaea, which surrendered to Byzantine agents before the Crusaders could storm it — deepening their distrust of Alexios. Then, on 1 July 1097, the Seljuk sultan Kilij Arslan ambushed Bohemond\'s vanguard at Dorylaeum. The Normans were outnumbered and surrounded. Bohemond held his line for hours in brutal close combat, ordering his knights to dismount and fight on foot alongside the infantry — an unconventional tactic that kept the army from being overrun. When Godfrey of Bouillon\'s reinforcements arrived, the Crusaders counter-attacked and routed the Seljuk army. It was the decisive land battle of the First Crusade, and it established Bohemond as the Crusade\'s foremost military commander.',
        fr: 'L\'armée croisée traversa l\'Asie Mineure et assiégea Nicée, qui se rendit à des agents byzantins avant que les Croisés ne puissent la prendre d\'assaut — approfondissant leur méfiance envers Alexis. Puis, le 1er juillet 1097, le sultan seldjoukide Kilij Arslan tendit une embuscade à l\'avant-garde de Bohémond à Dorylée. Les Normands étaient en infériorité numérique et encerclés. Bohémond tint sa ligne pendant des heures dans un combat rapproché brutal, ordonnant à ses chevaliers de mettre pied à terre et de combattre aux côtés de l\'infanterie — une tactique non conventionnelle qui empêcha l\'armée d\'être submergée. Quand les renforts de Godefroy de Bouillon arrivèrent, les Croisés contre-attaquèrent et mirent en déroute l\'armée seldjoukide. Ce fut la bataille terrestre décisive de la Première Croisade, et elle établit Bohémond comme le premier commandant militaire de la Croisade.',
      },
    },
    anchorYear: 1097,
  },
  {
    id: 'boh-siege-antioch',
    eraId: 'norman-expansion',
    arcId: 'bohemond-antioch',
    camera: {
      target: 'places',
      center: [36.17, 36.20],
      zoom: 7.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['antioch'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The siege of Antioch',
      body: {
        en: 'Antioch was the great prize — a city of massive Roman walls, ancient churches, and strategic control over the route to Jerusalem. The Crusaders besieged it for eight months (October 1097 – June 1098), suffering starvation, desertion, and plague. Bohemond alone kept his nerve. He secretly negotiated with an Armenian tower-guard named Firouz, who agreed to open a gate. On the night of 2–3 June 1098, Bohemond\'s Normans scaled the walls, Firouz opened the Tower of the Two Sisters, and the Crusaders poured in. The city fell in a night of chaotic violence. Three days later, a massive Seljuk relief army under Kerbogha of Mosul arrived and besieged the besiegers. Bohemond, now trapped inside the city he had just taken, faced annihilation.',
        fr: 'Antioche était le grand prix — une ville aux massives murailles romaines, aux églises antiques et au contrôle stratégique de la route vers Jérusalem. Les Croisés l\'assiégèrent huit mois (octobre 1097 – juin 1098), souffrant de famine, de désertions et de peste. Seul Bohémond garda son sang-froid. Il négocia secrètement avec un garde de tour arménien nommé Firouz, qui accepta d\'ouvrir une porte. Dans la nuit du 2 au 3 juin 1098, les Normands de Bohémond escaladèrent les murs, Firouz ouvrit la Tour des Deux Sœurs, et les Croisés s\'engouffrèrent. La ville tomba dans une nuit de violence chaotique. Trois jours plus tard, une massive armée de secours seldjoukide sous Kerbogha de Mossoul arriva et assiégea les assiégeants. Bohémond, désormais piégé dans la ville qu\'il venait de prendre, faisait face à l\'anéantissement.',
      },
    },
    anchorYear: 1098,
  },
  {
    id: 'boh-holy-lance',
    eraId: 'norman-expansion',
    arcId: 'bohemond-antioch',
    camera: {
      target: 'places',
      center: [36.17, 36.20],
      zoom: 8.0,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['antioch'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The Holy Lance and the sortie',
      body: {
        en: 'Starving and desperate inside Antioch\'s walls, the Crusaders rallied around a miraculous discovery: a Provençal peasant named Peter Bartholomew claimed a vision had revealed the Holy Lance — the spear that pierced Christ\'s side — buried beneath the Cathedral of St. Peter. They dug and found an iron lance-point. Whether Bohemond believed in the relic is doubtful, but he understood its power. On 28 June 1098, he led the entire Crusader army in a massed sortie from the city gates. The starving, half-mad Crusaders charged Kerbogha\'s vastly superior force — and broke it. The Seljuk army dissolved. Antioch was secured. Bohemond claimed it as his own, citing a pre-siege agreement with the other leaders. The other princes protested. Bohemond ignored them.',
        fr: 'Affamés et désespérés derrière les murs d\'Antioche, les Croisés se rallièrent autour d\'une découverte miraculeuse : un paysan provençal nommé Pierre Barthélemy prétendit qu\'une vision lui avait révélé la Sainte Lance — la lance qui perça le flanc du Christ — enterrée sous la cathédrale Saint-Pierre. Ils creusèrent et trouvèrent une pointe de lance en fer. Que Bohémond ait cru à la relique est douteux, mais il en comprit le pouvoir. Le 28 juin 1098, il mena toute l\'armée croisée dans une sortie en masse par les portes de la ville. Les Croisés affamés et à demi fous chargèrent la force vastement supérieure de Kerbogha — et la brisèrent. L\'armée seldjoukide se disloqua. Antioche était sécurisée. Bohémond la revendiqua comme sienne, invoquant un accord pré-siège avec les autres chefs. Les autres princes protestèrent. Bohémond les ignora.',
      },
    },
    anchorYear: 1098,
  },
  {
    id: 'boh-captivity',
    eraId: 'norman-expansion',
    arcId: 'bohemond-antioch',
    camera: {
      target: 'bbox',
      center: [37.5, 36.7],
      zoom: 4.8,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['antioch', 'edessa', 'jerusalem'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Prince of Antioch — and prisoner',
      body: {
        en: 'Bohemond established himself as Prince of Antioch while the other Crusaders marched on to Jerusalem. He governed a polyglot state of Franks, Armenians, Greeks, and Syrian Christians, imposing Norman-style feudalism on an Eastern city. But in 1100, while campaigning against the Danishmend Turks, he was ambushed and captured. He spent three years in captivity (1100–1103), during which his nephew Tancred — another Hauteville — governed Antioch in his absence. His ransom was enormous: 100,000 gold dinars, paid partly by the Armenian ruler of Edessa. Even in captivity, Bohemond\'s legend grew — Muslim chroniclers noted his defiance and his refusal to convert.',
        fr: 'Bohémond s\'établit comme Prince d\'Antioche tandis que les autres Croisés marchaient sur Jérusalem. Il gouvernait un État polyglotte de Francs, d\'Arméniens, de Grecs et de chrétiens syriaques, imposant un féodalisme de type normand à une ville orientale. Mais en 1100, lors d\'une campagne contre les Turcs danishmendides, il fut pris en embuscade et capturé. Il passa trois ans en captivité (1100–1103), pendant lesquels son neveu Tancrède — un autre Hauteville — gouverna Antioche en son absence. Sa rançon fut énorme : 100 000 dinars d\'or, payés en partie par le souverain arménien d\'Édesse. Même en captivité, la légende de Bohémond grandit — les chroniqueurs musulmans notèrent sa défiance et son refus de se convertir.',
      },
    },
    anchorYear: 1100,
  },
  {
    id: 'boh-devol-death',
    eraId: 'norman-expansion',
    arcId: 'bohemond-antioch',
    camera: {
      target: 'bbox',
      center: [19.0, 40.5],
      zoom: 5.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['durazzo', 'taranto', 'antioch'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Devol, defeat, and a Norman legacy in the East',
      body: {
        en: 'Released in 1103, Bohemond returned to Europe to raise a new army — not for the Holy Land, but for his true obsession: destroying Byzantium. He married Constance, daughter of King Philip I of France, recruited a vast force, and in 1107 crossed the Adriatic to besiege Durazzo — exactly as his father had done in 1081. But this time Alexios was ready. The siege failed. In 1108, Bohemond was forced to sign the humiliating Treaty of Devol, acknowledging Antioch as a Byzantine fief. He never returned to the East. He died in Apulia in 1111, probably around fifty-seven, a man whose ambitions had always exceeded his resources. Yet the Principality of Antioch survived him by nearly two centuries, and the Hauteville name rang from Normandy to the Euphrates — the farthest reach any Norman dynasty ever achieved.',
        fr: 'Libéré en 1103, Bohémond retourna en Europe pour lever une nouvelle armée — non pour la Terre Sainte, mais pour sa véritable obsession : détruire Byzance. Il épousa Constance, fille du roi Philippe Ier de France, recruta une vaste force, et en 1107 traversa l\'Adriatique pour assiéger Durazzo — exactement comme son père l\'avait fait en 1081. Mais cette fois Alexis était prêt. Le siège échoua. En 1108, Bohémond fut contraint de signer l\'humiliant Traité de Devol, reconnaissant Antioche comme un fief byzantin. Il ne retourna jamais en Orient. Il mourut dans les Pouilles en 1111, probablement vers cinquante-sept ans, un homme dont les ambitions avaient toujours dépassé ses ressources. Pourtant la Principauté d\'Antioche lui survécut près de deux siècles, et le nom des Hauteville résonnait de la Normandie à l\'Euphrate — la portée la plus lointaine jamais atteinte par une dynastie normande.',
      },
    },
    anchorYear: 1111,
  },

  // ── Tancred of Galilee & Richard the Lionheart beats ─────────────
  {
    id: 'ne-tancred-galilee',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'bbox',
      center: [35.5, 32.5],
      zoom: 6.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['tiberias', 'jerusalem', 'antioch'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Tancred — the Hauteville in Galilee',
      body: {
        en: 'While Bohemond fixed on Antioch, his nephew Tancred marched south with the main Crusader army. After the fall of Jerusalem in July 1099, Tancred carved out a lordship in Galilee centred on Tiberias — imposing Norman-style feudalism on a landscape of Galilean hills, Arab villages, and Christian pilgrimage sites. He was among the first Crusaders to enter Jerusalem, and he seized Bethlehem the day before the city fell. When Bohemond was captured by the Danishmend Turks in 1100, Tancred returned north to govern Antioch as regent — the only Norman who held power in both Crusader states. He died in 1112, still in his thirties, having spent his entire adult life fighting in the East.',
        fr: 'Tandis que Bohémond se fixait sur Antioche, son neveu Tancrède marcha vers le sud avec le gros de l\'armée croisée. Après la chute de Jérusalem en juillet 1099, Tancrède se tailla une seigneurie en Galilée centrée sur Tibériade — imposant un féodalisme de type normand à un paysage de collines galiléennes, de villages arabes et de lieux de pèlerinage chrétien. Il fut parmi les premiers Croisés à entrer dans Jérusalem, et s\'empara de Bethléem la veille de la chute de la ville. Quand Bohémond fut capturé par les Turcs danishmendides en 1100, Tancrède remonta au nord pour gouverner Antioche comme régent — le seul Normand à avoir détenu le pouvoir dans les deux États croisés. Il mourut en 1112, n\'ayant pas encore la quarantaine, après avoir passé toute sa vie adulte à combattre en Orient.',
      },
    },
    anchorYear: 1099,
  },
  {
    id: 'ne-richard-cyprus',
    eraId: 'norman-expansion',
    arcId: 'norman-expansion',
    camera: {
      target: 'bbox',
      center: [33.5, 34.8],
      zoom: 6.0,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['limassol', 'jerusalem'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Richard the Lionheart — Cyprus and the Third Crusade',
      body: {
        en: 'A century after Bohemond, a different Norman legacy reached the Holy Land. Richard I of England — great-great-grandson of William the Conqueror — set out on the Third Crusade in 1190. En route, his fleet was scattered by a storm off Cyprus. The island\'s ruler, the Byzantine rebel Isaac Komnenos, seized Richard\'s shipwrecked soldiers and his betrothed Berengaria of Navarre. Richard responded with characteristic fury: he conquered the entire island in a matter of weeks, marrying Berengaria at Limassol in May 1191. He then sold Cyprus to the Templars and later to Guy de Lusignan, establishing a Crusader kingdom that would outlast every Frankish foothold on the mainland. Richard went on to recapture Acre and fight Saladin to a truce — but it was the seizure of Cyprus, an improvisation born of a storm, that proved the most durable Norman-descended achievement of the later Crusades.',
        fr: 'Un siècle après Bohémond, un autre héritage normand atteignit la Terre Sainte. Richard Ier d\'Angleterre — arrière-arrière-petit-fils de Guillaume le Conquérant — se lança dans la Troisième Croisade en 1190. En chemin, sa flotte fut dispersée par une tempête au large de Chypre. Le maître de l\'île, le rebelle byzantin Isaac Comnène, captura les soldats naufragés de Richard et sa fiancée Bérengère de Navarre. Richard répondit avec sa fureur caractéristique : il conquit l\'île entière en quelques semaines, épousant Bérengère à Limassol en mai 1191. Il vendit ensuite Chypre aux Templiers puis à Guy de Lusignan, fondant un royaume croisé qui survivrait à toutes les possessions franques du continent. Richard reconquit Acre et combattit Saladin jusqu\'à une trêve — mais c\'est la prise de Chypre, improvisation née d\'une tempête, qui s\'avéra la réalisation la plus durable d\'ascendance normande des Croisades tardives.',
      },
    },
    anchorYear: 1191,
  },

  // ── Leif Erikson cinematic arc ─────────────────────────────────────
  {
    id: 'leif-ch1-bloodline',
    eraId: 'viking-age',
    arcId: 'leif-erikson',
    camera: {
      target: 'bbox',
      center: [-8.0, 62.0],
      zoom: 3.6,
      durationMs: 3000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['norway-origin', 'iceland', 'greenland'],
      regionIds: ['scandinavia'],
      routeSegmentIds: ['seg-norway-iceland', 'seg-iceland-greenland'],
      journeyIds: ['journey-atlantic-norse'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Bloodline of Exploration',
      body: {
        en: 'The Norse expansion across the North Atlantic was not a single leap but a chain of generations. Norwegian chieftains, driven by land hunger and feuds, first settled Iceland around 870. A century later, Erik the Red — banished for killing — sailed west and founded the Greenland colonies around 985. His son Leif grew up on this frontier, inheriting both the seamanship and the restlessness that had carried his ancestors from the fjords of Norway to the edge of the known world.',
        fr: 'L\'expansion norroise à travers l\'Atlantique Nord ne fut pas un bond unique mais un enchaînement de générations. Des chefs norvégiens, poussés par la soif de terres et les querelles, colonisèrent d\'abord l\'Islande vers 870. Un siècle plus tard, Erik le Rouge — banni pour meurtre — navigua vers l\'ouest et fonda les colonies du Groenland vers 985. Son fils Leif grandit sur cette frontière, héritier du savoir nautique et de l\'inquiétude qui avaient porté ses ancêtres des fjords de Norvège jusqu\'aux confins du monde connu.',
      },
    },
    anchorYear: 985,
    impactVariant: {
      copy: {
        title: 'A Seafaring Lineage',
        body: {
          en: 'Each generation pushed the frontier further: from the fjords to the Faeroes, the Faeroes to Iceland, Iceland to Greenland. This stepping-stone pattern — short crossings knitting together a vast ocean — was the Norse method of Atlantic conquest, a model that would echo five centuries later when other Europeans reached the same shores.',
          fr: 'Chaque génération repoussait la frontière un peu plus loin : des fjords aux Féroé, des Féroé à l\'Islande, de l\'Islande au Groenland. Ce schéma de pierres de gué — de courtes traversées reliant un vaste océan — constituait la méthode norroise de conquête atlantique, un modèle qui trouverait écho cinq siècles plus tard lorsque d\'autres Européens atteindraient les mêmes rivages.',
        },
      },
    },
  },
  {
    id: 'leif-ch2-edge-of-known',
    eraId: 'norman-origins',
    arcId: 'leif-erikson',
    camera: {
      target: 'bbox',
      center: [-35.0, 63.0],
      zoom: 4.0,
      durationMs: 2500,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['greenland', 'iceland'],
      regionIds: [],
      routeSegmentIds: ['seg-iceland-greenland'],
      journeyIds: ['journey-atlantic-norse'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The Edge of the Known World',
      body: {
        en: 'By the late 900s, the Greenland settlements were the westernmost outpost of European civilization — a cluster of farms wedged between the ice cap and the Davis Strait. The Eastern Settlement around Brattahlíð held perhaps 3,000 souls at its peak. Timber was scarce, growing seasons brutal, and survival depended on walrus ivory trade with Europe. Rumors of forested lands to the southwest drifted through the colony. For Leif Erikson, raised in this harsh periphery, the next crossing was not recklessness — it was logical.',
        fr: 'À la fin des années 900, les colonies groenlandaises formaient l\'avant-poste le plus occidental de la civilisation européenne — un chapelet de fermes coincées entre la calotte glaciaire et le détroit de Davis. L\'Établissement oriental autour de Brattahlíð comptait peut-être 3 000 âmes à son apogée. Le bois manquait, les saisons de culture étaient rudes, et la survie dépendait du commerce d\'ivoire de morse avec l\'Europe. Des rumeurs de terres boisées au sud-ouest circulaient dans la colonie. Pour Leif Erikson, élevé à cette périphérie austère, la traversée suivante n\'était pas de la témérité — c\'était logique.',
      },
    },
    anchorYear: 998,
    impactVariant: {
      copy: {
        title: 'Greenland\'s Fragile Lifeline',
        body: {
          en: 'The Greenland colonies were always precarious: dependent on a single trade good — walrus ivory — and a handful of ships each year from Iceland and Norway. When European demand shifted to African elephant ivory and the climate cooled in the 1300s, the lifeline thinned. Greenland reminds us that discovery without sustainable connection is impermanent.',
          fr: 'Les colonies du Groenland étaient toujours précaires : dépendantes d\'un seul produit d\'échange — l\'ivoire de morse — et de quelques navires par an en provenance d\'Islande et de Norvège. Lorsque la demande européenne se tourna vers l\'ivoire d\'éléphant africain et que le climat se refroidit au XIVe siècle, la ligne de vie s\'amenuisa. Le Groenland nous rappelle que la découverte sans connexion durable est éphémère.',
        },
      },
    },
  },
  {
    id: 'leif-ch3-crossing',
    eraId: 'norman-origins',
    arcId: 'leif-erikson',
    camera: {
      target: 'bbox',
      center: [-50.0, 56.0],
      zoom: 3.8,
      durationMs: 3500,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['greenland', 'vinland'],
      regionIds: [],
      routeSegmentIds: ['seg-greenland-vinland'],
      journeyIds: ['journey-atlantic-norse'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The Crossing',
      body: {
        en: 'Around the year 1000, Leif Erikson sailed from Brattahlíð with a crew of thirty-five, following reports from Bjarni Herjólfsson who had sighted unknown coastlines. The saga tradition describes three landfalls: Helluland (likely Baffin Island), a barren slab of rock; Markland (probably Labrador), dense with forest; and finally Vínland, where they found wild grapes, salmon, and mild winters. The crossing from Greenland — roughly 1,800 kilometres of open sea — was the farthest any European had ventured into the western Atlantic.',
        fr: 'Vers l\'an 1000, Leif Erikson quitta Brattahlíð avec un équipage de trente-cinq hommes, suivant les récits de Bjarni Herjólfsson qui avait aperçu des côtes inconnues. La tradition des sagas décrit trois escales : Helluland (probablement l\'île de Baffin), une dalle de roche stérile ; Markland (sans doute le Labrador), dense de forêt ; et enfin Vínland, où ils trouvèrent du raisin sauvage, du saumon et des hivers doux. La traversée depuis le Groenland — environ 1 800 kilomètres de pleine mer — représentait le point le plus occidental jamais atteint par un Européen dans l\'Atlantique.',
      },
    },
    anchorYear: 1000,
  },
  {
    id: 'leif-ch4-vinland',
    eraId: 'norman-origins',
    arcId: 'leif-erikson',
    camera: {
      target: 'places',
      center: [-55.53, 51.59],
      zoom: 7.5,
      durationMs: 2500,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['vinland'],
      regionIds: [],
      routeSegmentIds: [],
      journeyIds: ['journey-atlantic-norse'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Vinland — L\'Anse aux Meadows',
      body: {
        en: 'The archaeological site at L\'Anse aux Meadows on the northern tip of Newfoundland is the only confirmed Norse settlement in the Americas. Excavated by Helge and Anne Stine Ingstad in the 1960s, it revealed turf longhouses, a smithy with iron slag, and bronze ring-pins of distinctly Norse style. Radiocarbon dating places occupation around 1000 CE — exactly when the sagas say Leif built his houses. The site was likely a seasonal base camp for further exploration southward, not a permanent colony.',
        fr: 'Le site archéologique de L\'Anse aux Meadows, à la pointe nord de Terre-Neuve, est le seul établissement norrois confirmé en Amérique. Fouillé par Helge et Anne Stine Ingstad dans les années 1960, il a révélé des maisons longues en tourbe, une forge avec du laitier de fer et des broches annulaires en bronze de style nettement norrois. La datation au radiocarbone situe l\'occupation vers l\'an 1000 — exactement quand les sagas disent que Leif construisit ses maisons. Le site était probablement un camp de base saisonnier pour d\'autres explorations vers le sud, et non une colonie permanente.',
      },
    },
    anchorYear: 1000,
  },
  {
    id: 'leif-ch5-failure',
    eraId: 'norman-origins',
    arcId: 'leif-erikson',
    camera: {
      target: 'bbox',
      center: [-50.0, 55.0],
      zoom: 4.2,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['greenland', 'vinland'],
      regionIds: [],
      routeSegmentIds: ['seg-greenland-vinland'],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Why It Failed',
      body: {
        en: 'The Norse returned to Vinland several times after Leif — his brother Thorvald was killed by Indigenous inhabitants; Thorfinn Karlsefni brought livestock and attempted a lasting settlement. But the venture collapsed within a decade. Distance was the core problem: Vinland sat 4,500 kilometres from Norway, reachable only through Greenland\'s tiny population. Conflict with the local Beothuk or Dorset peoples — whom the Norse called Skrælingjar — made permanent habitation dangerous. Without metropolitan support, supply lines, or demographic mass, the settlement was unsustainable. The Norse withdrew, and the Atlantic closed behind them for five centuries.',
        fr: 'Les Norrois retournèrent au Vinland plusieurs fois après Leif — son frère Thorvald fut tué par des habitants autochtones ; Thorfinn Karlsefni amena du bétail et tenta un établissement durable. Mais l\'entreprise s\'effondra en moins d\'une décennie. La distance était le problème central : le Vinland se trouvait à 4 500 kilomètres de la Norvège, accessible uniquement via la petite population du Groenland. Les conflits avec les peuples locaux — que les Norrois appelaient Skrælingjar — rendaient l\'habitation permanente dangereuse. Sans soutien métropolitain, lignes d\'approvisionnement ni masse démographique, l\'établissement était insoutenable. Les Norrois se retirèrent, et l\'Atlantique se referma derrière eux pour cinq siècles.',
      },
    },
    anchorYear: 1010,
    impactVariant: {
      copy: {
        title: 'The Limits of Reach Without Infrastructure',
        body: {
          en: 'Vinland failed for the same reason many early outposts failed: discovery is not colonization. Without state backing, regular shipping, or enough people to absorb losses, a foothold cannot hold. When the French arrived in the same region five centuries later, they brought a crown apparatus, Jesuit networks, and the fur trade — still barely enough. The Norse failure is the negative image of what made New France possible.',
          fr: 'Le Vinland échoua pour la même raison que beaucoup d\'avant-postes précoces : la découverte n\'est pas la colonisation. Sans soutien étatique, navigation régulière ni assez de personnes pour absorber les pertes, un point d\'ancrage ne peut tenir. Lorsque les Français arrivèrent dans la même région cinq siècles plus tard, ils apportèrent un appareil royal, des réseaux jésuites et le commerce des fourrures — à peine suffisant. L\'échec norrois est l\'image inversée de ce qui rendit la Nouvelle-France possible.',
        },
      },
    },
  },
  {
    id: 'leif-ch6-forgotten',
    eraId: 'norman-origins',
    arcId: 'leif-erikson',
    camera: {
      target: 'bbox',
      center: [-20.0, 62.0],
      zoom: 3.8,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['iceland', 'greenland'],
      regionIds: ['scandinavia'],
      routeSegmentIds: [],
      journeyIds: ['journey-atlantic-norse'],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Forgotten Discovery',
      body: {
        en: 'For five hundred years, the story of Vinland survived only in Icelandic sagas — the Grœnlendinga saga and Eiríks saga rauða. Medieval Europe never absorbed the knowledge. No map updated, no trade route opened, no papal bull issued. Columbus, the Cabots, and Cartier sailed west with no awareness that Norse keels had cut these waters before them. Not until the 19th century did scholars begin treating the sagas as more than legend, and not until L\'Anse aux Meadows in 1960 did archaeology confirm what the texts had always claimed.',
        fr: 'Pendant cinq cents ans, l\'histoire du Vinland ne survécut que dans les sagas islandaises — la Grœnlendinga saga et l\'Eiríks saga rauða. L\'Europe médiévale n\'assimila jamais cette connaissance. Aucune carte ne fut mise à jour, aucune route commerciale ouverte, aucune bulle papale émise. Colomb, les Cabot et Cartier naviguèrent vers l\'ouest sans savoir que des quilles norroises avaient déjà sillonné ces eaux. Ce n\'est qu\'au XIXe siècle que les chercheurs commencèrent à traiter les sagas comme autre chose que des légendes, et pas avant L\'Anse aux Meadows en 1960 que l\'archéologie confirma ce que les textes avaient toujours affirmé.',
      },
    },
    anchorYear: 1050,
    impactVariant: {
      copy: {
        title: 'Sagas vs. History',
        body: {
          en: 'The Norse discovery had zero downstream effect on European expansion. No cartographic data transferred, no navigational knowledge circulated beyond Iceland, and the Greenland colonies themselves vanished by the 1400s. It is a powerful reminder that discovery without transmission is historically inert. The Atlantic had to be "discovered" again — this time by societies with printing presses, state navies, and global ambitions.',
          fr: 'La découverte norroise n\'eut aucun effet en aval sur l\'expansion européenne. Aucune donnée cartographique ne fut transmise, aucune connaissance nautique ne circula au-delà de l\'Islande, et les colonies du Groenland elles-mêmes disparurent vers les années 1400. C\'est un rappel puissant que la découverte sans transmission est historiquement inerte. L\'Atlantique dut être « redécouvert » — cette fois par des sociétés dotées d\'imprimeries, de marines d\'État et d\'ambitions mondiales.',
        },
      },
    },
  },
  {
    id: 'leif-ch7-bridge-normans',
    eraId: 'norman-origins',
    arcId: 'leif-erikson',
    camera: {
      target: 'places',
      center: [0.0, 49.3],
      zoom: 6.5,
      durationMs: 2800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Bridge to the Normans',
      body: {
        en: 'At almost exactly the same time Leif reached Vinland, his distant kinsmen in Francia were completing a different transformation. Rollo\'s descendants — the same Norse bloodline that had produced the Atlantic explorers — had become French-speaking Christian dukes ruling a powerful territory around the lower Seine. By 1000, Normandy was no longer Scandinavian in language or religion, but the Viking inheritance persisted in its military culture, its maritime confidence, and its appetite for expansion. The thread connecting a Greenland farmstead to a Norman castle is not metaphor — it is genealogy.',
        fr: 'Presque exactement au moment où Leif atteignait le Vinland, ses lointains parents en Francia achevaient une transformation différente. Les descendants de Rollon — la même lignée norroise qui avait produit les explorateurs de l\'Atlantique — étaient devenus des ducs francophones et chrétiens régnant sur un puissant territoire autour de la basse Seine. Vers l\'an 1000, la Normandie n\'était plus scandinave par la langue ni par la religion, mais l\'héritage viking perdurait dans sa culture militaire, sa confiance maritime et son appétit d\'expansion. Le fil reliant une ferme groenlandaise à un château normand n\'est pas une métaphore — c\'est de la généalogie.',
      },
    },
    anchorYear: 1000,
    impactVariant: {
      copy: {
        title: 'Norse to Norman Identity',
        body: {
          en: 'The transformation from Viking raider to Norman duke took barely four generations. By 1000, the settlers spoke French, built stone churches, and governed through Frankish feudal law — yet they kept their restless dynamism. William the Conqueror, the Hautevilles of Sicily, Bohemond of Antioch: all were products of this cultural alchemy. The Norse who reached Vinland and the Normans who conquered England shared great-great-grandfathers.',
          fr: 'La transformation de pillard viking en duc normand ne prit guère que quatre générations. Vers l\'an 1000, les colons parlaient français, bâtissaient des églises en pierre et gouvernaient selon le droit féodal franc — pourtant ils conservèrent leur dynamisme inquiet. Guillaume le Conquérant, les Hauteville de Sicile, Bohémond d\'Antioche : tous étaient les produits de cette alchimie culturelle. Les Norrois qui atteignirent le Vinland et les Normands qui conquirent l\'Angleterre partageaient des arrière-arrière-grands-parents.',
        },
      },
      focus: {
        placeIds: ['rouen'],
        regionIds: ['normandy'],
        routeSegmentIds: [],
      },
    },
  },
  {
    id: 'leif-ch8-new-france',
    eraId: 'new-france-foundations',
    arcId: 'leif-erikson',
    camera: {
      target: 'bbox',
      center: [-30.0, 50.0],
      zoom: 2.8,
      durationMs: 3500,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['rouen', 'dieppe', 'quebec-city', 'vinland'],
      regionIds: ['normandy', 'new-france'],
      routeSegmentIds: ['seg-dieppe-atlantic', 'seg-atlantic-quebec'],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: false,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Full Circle — New France',
      body: {
        en: 'When Samuel de Champlain sailed from Honfleur in 1608 and founded Québec, he launched a colonial enterprise rooted in the same Norman ports that had once dispatched Viking longships. Many of the settlers who populated New France came from Normandy and the Perche — descendants of the very Norse who had once looked west across the Atlantic. L\'Anse aux Meadows lies barely 1,200 kilometres from Québec City. The Norse reached this coast five centuries too early; the Normans\' French-speaking heirs finally made it stick. From Vinland to New France, the circle closes — the Atlantic crossing that Leif attempted alone was completed by the civilization his kinsmen helped to build.',
        fr: 'Lorsque Samuel de Champlain partit de Honfleur en 1608 et fonda Québec, il lançait une entreprise coloniale enracinée dans les mêmes ports normands qui avaient autrefois envoyé les drakkars vikings. Nombre des colons qui peuplèrent la Nouvelle-France venaient de Normandie et du Perche — descendants des mêmes Norrois qui avaient jadis regardé vers l\'ouest par-delà l\'Atlantique. L\'Anse aux Meadows se trouve à peine 1 200 kilomètres de la ville de Québec. Les Norrois atteignirent cette côte cinq siècles trop tôt ; les héritiers francophones des Normands réussirent enfin à s\'y maintenir. Du Vinland à la Nouvelle-France, le cercle se referme — la traversée atlantique que Leif tenta seul fut achevée par la civilisation que ses proches contribuèrent à bâtir.',
      },
    },
    anchorYear: 1608,
    impactVariant: {
      copy: {
        title: 'The Atlantic Thread',
        body: {
          en: 'The line from Norse Vinland to French Québec is not direct causation — it is rhyme. The same geographic logic that drew Leif southwest from Greenland drew Cartier and Champlain northwest from Normandy. The St. Lawrence corridor, the Grand Banks cod, the timber-rich coastline: these resources called to every Atlantic civilization in turn. Understanding Leif\'s failed attempt illuminates why New France succeeded — and why the Norman Atlantic world, from Rollo to Champlain, forms one continuous arc.',
          fr: 'La ligne du Vinland norrois au Québec français n\'est pas un lien de causalité directe — c\'est une rime. La même logique géographique qui attira Leif vers le sud-ouest depuis le Groenland attira Cartier et Champlain vers le nord-ouest depuis la Normandie. Le corridor du Saint-Laurent, les morues des Grands Bancs, le littoral riche en bois : ces ressources appelèrent tour à tour chaque civilisation atlantique. Comprendre la tentative avortée de Leif éclaire pourquoi la Nouvelle-France réussit — et pourquoi le monde atlantique normand, de Rollon à Champlain, forme un seul arc continu.',
        },
      },
      camera: {
        target: 'bbox',
        center: [-30.0, 50.0],
        zoom: 2.5,
        durationMs: 3000,
        easing: 'easeInOutCubic',
      },
    },
  },

  // ── William Iron Arm lifetime guided arc ─────────────────────────
  {
    id: 'wia-cotentin-origins',
    eraId: 'norman-expansion',
    arcId: 'william-iron-arm',
    camera: {
      target: 'places',
      center: [-1.44, 49.05],
      zoom: 8.0,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['cosedia-coutances'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Sons of a minor lord',
      body: {
        en: 'Tancred of Hauteville was a minor Norman lord near Coutances in the Cotentin — the rocky, windswept western peninsula of Normandy, far from the ducal court at Rouen. He held modest lands, but he had twelve sons and no inheritance to divide among them. The Cotentin bred hard men with limited prospects, and for the eldest sons of the petty aristocracy, the only path to land and status lay elsewhere. Beginning in the 1030s, the Hauteville brothers left Normandy one by one, heading south toward the fragmented, war-torn lands of the Italian Mezzogiorno.',
        fr: 'Tancrède de Hauteville était un petit seigneur normand près de Coutances dans le Cotentin — la péninsule rocheuse et ventée de l\'ouest de la Normandie, loin de la cour ducale de Rouen. Il détenait des terres modestes, mais il avait douze fils et aucun héritage à diviser entre eux. Le Cotentin forgeait des hommes durs aux perspectives limitées, et pour les fils aînés de la petite aristocratie, la seule voie vers la terre et le statut menait ailleurs. À partir des années 1030, les frères Hauteville quittèrent la Normandie un par un, se dirigeant vers le sud, vers les terres fragmentées et déchirées par la guerre du Mezzogiorno italien.',
      },
    },
    anchorYear: 1010,
  },
  {
    id: 'wia-mercenary-arrival',
    eraId: 'norman-expansion',
    arcId: 'william-iron-arm',
    camera: {
      target: 'places',
      center: [14.2, 40.9],
      zoom: 6.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['aversa'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Mercenaries in the Mezzogiorno',
      body: {
        en: 'Norman adventurers reached southern Italy in the early eleventh century — pilgrims and mercenaries drawn by the region\'s chronic instability. Lombard princes, Byzantine governors, and Arab emirs all hired Norman swords. The first real foothold came in 1030, when Rainulf Drengot received the county of Aversa from the Duke of Naples in exchange for military service. Word filtered back to Normandy: there was land and glory to be won in the south. For the Hauteville brothers, Aversa was proof that a Norman without an inheritance could build one with a sword.',
        fr: 'Des aventuriers normands atteignirent l\'Italie du Sud au début du XIe siècle — pèlerins et mercenaires attirés par l\'instabilité chronique de la région. Princes lombards, gouverneurs byzantins et émirs arabes engageaient tous des épées normandes. Le premier véritable point d\'ancrage vint en 1030, quand Rainulf Drengot reçut le comté d\'Aversa du duc de Naples en échange de services militaires. La nouvelle remonta jusqu\'en Normandie : il y avait des terres et de la gloire à conquérir dans le sud. Pour les frères Hauteville, Aversa prouvait qu\'un Normand sans héritage pouvait s\'en forger un par l\'épée.',
      },
    },
    anchorYear: 1030,
  },
  {
    id: 'wia-apulian-warfare',
    eraId: 'norman-expansion',
    arcId: 'william-iron-arm',
    camera: {
      target: 'bbox',
      center: [15.5, 40.5],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['melfi', 'bari'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'War in Apulia',
      body: {
        en: 'William, the eldest of Tancred\'s sons to reach Italy, arrived in the late 1030s. Southern Italy was a three-way war zone: Lombard princes fighting to survive, Byzantine governors trying to restore imperial authority, and Norman mercenary bands selling their services to whichever side paid best. William joined the Byzantine-led expedition against Arab Sicily in 1038 — a venture that exposed him to the region\'s military dynamics and convinced him that Norman arms could do more than serve others. When the expedition collapsed amid Byzantine treachery and mutual distrust, the Normans returned to the mainland with a clearer sense of their own power.',
        fr: 'Guillaume, l\'aîné des fils de Tancrède à atteindre l\'Italie, arriva à la fin des années 1030. L\'Italie du Sud était une zone de guerre à trois camps : princes lombards luttant pour survivre, gouverneurs byzantins cherchant à restaurer l\'autorité impériale, et bandes de mercenaires normands vendant leurs services au plus offrant. Guillaume rejoignit l\'expédition byzantine contre la Sicile arabe en 1038 — une entreprise qui lui révéla les dynamiques militaires de la région et le convainquit que les armes normandes pouvaient faire plus que servir autrui. Quand l\'expédition s\'effondra dans la traîtrise byzantine et la défiance mutuelle, les Normands revinrent sur le continent avec une conscience plus claire de leur propre puissance.',
      },
    },
    anchorYear: 1038,
  },
  {
    id: 'wia-battle-olivento',
    eraId: 'norman-expansion',
    arcId: 'william-iron-arm',
    camera: {
      target: 'places',
      center: [15.53, 40.99],
      zoom: 7.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['melfi'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Iron Arm at Olivento',
      body: {
        en: 'In 1041, the Norman mercenaries turned against their Byzantine employers. At the Battle of Olivento, William led the Norman cavalry in a devastating charge that broke the Byzantine line. It was here, according to the chroniclers, that he earned the epithet "Iron Arm" — either from shattering an enemy\'s shield with a single sword blow, or from his tireless fighting throughout the day. The victory was the first of three in quick succession that shattered Byzantine military authority in Apulia and established the Normans as a political force in their own right.',
        fr: 'En 1041, les mercenaires normands se retournèrent contre leurs employeurs byzantins. À la bataille d\'Olivento, Guillaume mena la cavalerie normande dans une charge dévastatrice qui brisa la ligne byzantine. C\'est là, selon les chroniqueurs, qu\'il gagna le surnom de « Bras-de-Fer » — soit pour avoir brisé le bouclier d\'un ennemi d\'un seul coup d\'épée, soit pour son combat infatigable tout au long de la journée. Cette victoire fut la première d\'une série de trois qui anéantirent l\'autorité militaire byzantine dans les Pouilles et établirent les Normands comme une force politique à part entière.',
      },
    },
    anchorYear: 1041,
  },
  {
    id: 'wia-count-apulia',
    eraId: 'norman-expansion',
    arcId: 'william-iron-arm',
    camera: {
      target: 'places',
      center: [15.53, 40.99],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['melfi'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Count of Apulia',
      body: {
        en: 'After the victories of 1041, the Normans needed a leader of their own. They chose William — not by feudal grant or birthright, but by acclamation among fighting men who respected battlefield reputation above all else. As Count of Apulia, William distributed conquered lands among Norman followers, establishing the feudal structure that his brothers would later expand into a kingdom. Melfi became the administrative centre of this new Norman power — a hilltop fortress that would host the papal investiture of Robert Guiscard a generation later.',
        fr: 'Après les victoires de 1041, les Normands avaient besoin d\'un chef. Ils choisirent Guillaume — non par concession féodale ni droit de naissance, mais par acclamation de guerriers qui respectaient la réputation au combat par-dessus tout. En tant que comte d\'Apulie, Guillaume distribua les terres conquises entre les fidèles normands, établissant la structure féodale que ses frères étendraient plus tard en un royaume. Melfi devint le centre administratif de cette nouvelle puissance normande — une forteresse au sommet d\'une colline qui accueillerait l\'investiture papale de Robert Guiscard une génération plus tard.',
      },
    },
    anchorYear: 1042,
  },
  {
    id: 'wia-death-legacy',
    eraId: 'norman-expansion',
    arcId: 'william-iron-arm',
    camera: {
      target: 'bbox',
      center: [14.5, 40.8],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['melfi', 'aversa'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'A short life, a long shadow',
      body: {
        en: 'William Iron Arm died around 1046, probably in his forties, having held the county of Apulia for barely four years. His tenure was brief, but the precedent was irreversible: Normans now held territory in southern Italy not as mercenaries but as lords. His brothers Drogo and then Humphrey succeeded him, and after Humphrey came the sixth son — Robert, called Guiscard — who would transform the family\'s Apulian county into a Mediterranean empire. Every Hauteville achievement that followed — the Kingdom of Sicily, the Principality of Antioch, Roger II\'s multicultural court — grew from the foothold William Iron Arm carved out with his sword.',
        fr: 'Guillaume Bras-de-Fer mourut vers 1046, probablement la quarantaine, après avoir détenu le comté d\'Apulie à peine quatre ans. Son règne fut bref, mais le précédent était irréversible : les Normands tenaient désormais un territoire en Italie du Sud non comme mercenaires, mais comme seigneurs. Ses frères Drogon puis Onfroy lui succédèrent, et après Onfroy vint le sixième fils — Robert, dit Guiscard — qui transformerait le comté familial des Pouilles en un empire méditerranéen. Chaque exploit des Hauteville qui suivit — le royaume de Sicile, la principauté d\'Antioche, la cour multiculturelle de Roger II — germa du point d\'appui que Guillaume Bras-de-Fer avait conquis par l\'épée.',
      },
    },
    anchorYear: 1046,
  },

  // ── Sichelgaita lifetime guided arc ──────────────────────────────
  {
    id: 'sg-lombard-salerno',
    eraId: 'norman-expansion',
    arcId: 'sichelgaita',
    camera: {
      target: 'places',
      center: [14.77, 40.68],
      zoom: 8.0,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['salerno'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Princess of Salerno',
      body: {
        en: 'Born around 1040, Sichelgaita was the daughter of Guaimar IV, the Lombard Prince of Salerno — one of the last independent Lombard states in southern Italy. She grew up in a city famous for its medical school, its trade connections, and its precarious independence between Byzantine, Arab, and Norman ambitions. Unlike most noblewomen of her era, she was trained in arms — a Lombard tradition among the princely house of Salerno that would define her extraordinary life.',
        fr: 'Née vers 1040, Sichelgaita était la fille de Guaimar IV, prince lombard de Salerne — l\'un des derniers États lombards indépendants d\'Italie du Sud. Elle grandit dans une cité célèbre pour son école de médecine, ses liens commerciaux et son indépendance précaire entre ambitions byzantines, arabes et normandes. Contrairement à la plupart des nobles de son époque, elle fut formée aux armes — une tradition lombarde de la maison princière de Salerne qui définirait sa vie extraordinaire.',
      },
    },
    anchorYear: 1040,
  },
  {
    id: 'sg-marriage-guiscard',
    eraId: 'norman-expansion',
    arcId: 'sichelgaita',
    camera: {
      target: 'bbox',
      center: [15.0, 40.7],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['salerno', 'melfi'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Marriage to the Wily',
      body: {
        en: 'Around 1058, Sichelgaita married Robert Guiscard, who repudiated his first wife Alberada to seal the alliance. The marriage was strategic: it gave Robert legitimacy among the Lombard population he was conquering, and gave Salerno a powerful protector. But the partnership went beyond politics. Sichelgaita rode with Robert on campaign, commanded troops in her own right, and became his most trusted advisor. The marriage also had a political casualty: Robert\'s eldest son Bohemond, now displaced in the succession by Sichelgaita\'s son Roger Borsa.',
        fr: 'Vers 1058, Sichelgaita épousa Robert Guiscard, qui répudia sa première femme Alberada pour sceller l\'alliance. Le mariage était stratégique : il donnait à Robert une légitimité auprès de la population lombarde qu\'il conquérait, et offrait à Salerne un protecteur puissant. Mais le partenariat dépassait la politique. Sichelgaita accompagna Robert en campagne, commanda des troupes de plein droit et devint sa conseillère la plus fiable. Le mariage eut aussi une victime politique : le fils aîné de Robert, Bohémond, désormais écarté de la succession au profit du fils de Sichelgaita, Roger Borsa.',
      },
    },
    anchorYear: 1058,
  },
  {
    id: 'sg-on-campaign',
    eraId: 'norman-expansion',
    arcId: 'sichelgaita',
    camera: {
      target: 'bbox',
      center: [15.5, 40.5],
      zoom: 6.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['salerno', 'bari'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'A princess in armour',
      body: {
        en: 'Contemporary chroniclers describe Sichelgaita in terms normally reserved for warriors. She wore full armour, rode at the head of troops, and was present at multiple sieges during the Norman conquest of southern Italy. Anna Comnena, the Byzantine princess-historian, compared her to Athena — a comparison that mixed admiration with horror. In an era when noblewomen were expected to govern households and pray for their husbands\' souls, Sichelgaita governed provinces and fought for her husband\'s empire.',
        fr: 'Les chroniqueurs contemporains décrivent Sichelgaita en des termes habituellement réservés aux guerriers. Elle portait l\'armure complète, chevauchait en tête des troupes et était présente à plusieurs sièges lors de la conquête normande de l\'Italie du Sud. Anne Comnène, la princesse-historienne byzantine, la compara à Athéna — une comparaison mêlant admiration et horreur. À une époque où l\'on attendait des nobles qu\'elles gouvernent les foyers et prient pour l\'âme de leurs époux, Sichelgaita gouvernait des provinces et combattait pour l\'empire de son mari.',
      },
    },
    anchorYear: 1071,
  },
  {
    id: 'sg-durazzo',
    eraId: 'norman-expansion',
    arcId: 'sichelgaita',
    camera: {
      target: 'places',
      center: [19.45, 41.32],
      zoom: 7.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['durazzo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The charge at Durazzo',
      body: {
        en: 'At the Battle of Durazzo in 1081, Sichelgaita\'s role entered the historical record with unusual clarity. When Norman troops began to waver under a Byzantine counterattack led by the Varangian Guard, Sichelgaita reportedly rallied the fleeing soldiers, brandishing a spear and shaming them back into line. Anna Comnena\'s account — hostile to the Normans but respectful of Sichelgaita\'s courage — describes her as "a second Pallas" riding at the head of her troops. The Normans regrouped and won the battle. It remains one of the most detailed accounts of a medieval woman in combat.',
        fr: 'Lors de la bataille de Durazzo en 1081, le rôle de Sichelgaita entra dans le récit historique avec une clarté inhabituelle. Quand les troupes normandes commencèrent à faiblir sous une contre-attaque byzantine menée par la Garde varangienne, Sichelgaita aurait rallié les soldats en fuite, brandissant une lance et les rappelant à l\'ordre. Le récit d\'Anne Comnène — hostile aux Normands mais respectueux du courage de Sichelgaita — la décrit comme « une seconde Pallas » chevauchant en tête de ses troupes. Les Normands se regroupèrent et remportèrent la bataille. C\'est l\'un des récits les plus détaillés d\'une femme médiévale au combat.',
      },
    },
    anchorYear: 1081,
  },
  {
    id: 'sg-succession',
    eraId: 'norman-expansion',
    arcId: 'sichelgaita',
    camera: {
      target: 'bbox',
      center: [14.8, 40.7],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['salerno'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Mother of a dynasty',
      body: {
        en: 'When Robert Guiscard died on Cephalonia in 1085, the succession he and Sichelgaita had arranged held — barely. Their son Roger Borsa inherited the duchy over Bohemond, Robert\'s firstborn by Alberada. Sichelgaita had spent years building the alliances and papal support that made this possible. It was she who had secured Pope Gregory VII\'s recognition of Roger Borsa\'s claim. Bohemond, the greater warrior, was left with Taranto and a burning grievance that would drive him to the First Crusade — and to carve out his own principality at the edge of the known world.',
        fr: 'Quand Robert Guiscard mourut à Céphalonie en 1085, la succession qu\'il avait arrangée avec Sichelgaita tint — de justesse. Leur fils Roger Borsa hérita du duché aux dépens de Bohémond, le premier-né de Robert par Alberada. Sichelgaita avait passé des années à bâtir les alliances et le soutien papal qui rendirent cela possible. C\'est elle qui avait obtenu la reconnaissance par le pape Grégoire VII des droits de Roger Borsa. Bohémond, le plus grand guerrier, se retrouva avec Tarente et un ressentiment brûlant qui le pousserait vers la Première Croisade — et à se tailler sa propre principauté aux confins du monde connu.',
      },
    },
    anchorYear: 1085,
  },
  {
    id: 'sg-legacy',
    eraId: 'norman-expansion',
    arcId: 'sichelgaita',
    camera: {
      target: 'places',
      center: [14.77, 40.68],
      zoom: 7.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['salerno'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Warrior, regent, and the silence of the sources',
      body: {
        en: 'Sichelgaita died around 1090, probably in Salerno. She had been princess, wife, warrior, diplomat, and de facto regent. Yet she appears in most histories as a footnote to Robert Guiscard\'s career — when she appears at all. The sources that mention her are almost exclusively hostile: Anna Comnena wrote as a Byzantine enemy, and Latin chroniclers rarely gave women extended treatment. What survives is enough to mark her as one of the very few documented female battlefield commanders of the medieval period — and a reminder that the Norman world was more complex than its male-dominated chronicles suggest.',
        fr: 'Sichelgaita mourut vers 1090, probablement à Salerne. Elle avait été princesse, épouse, guerrière, diplomate et régente de fait. Pourtant elle n\'apparaît dans la plupart des histoires que comme une note de bas de page dans la carrière de Robert Guiscard — quand elle apparaît. Les sources qui la mentionnent sont presque exclusivement hostiles : Anne Comnène écrivait en ennemie byzantine, et les chroniqueurs latins accordaient rarement un traitement étendu aux femmes. Ce qui survit suffit à la marquer comme l\'une des très rares femmes chefs de guerre documentées de la période médiévale — et un rappel que le monde normand était plus complexe que ses chroniques dominées par les hommes ne le suggèrent.',
      },
    },
    anchorYear: 1090,
  },

  // ── Odo of Bayeux lifetime guided arc ────────────────────────────
  {
    id: 'ob-half-brother',
    eraId: 'norman-origins',
    arcId: 'odo-bayeux',
    camera: {
      target: 'places',
      center: [-0.70, 49.28],
      zoom: 8.5,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bayeux'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The duke\'s brother, the bishop\'s ring',
      body: {
        en: 'Odo was the half-brother of William, Duke of Normandy — son of Herleva and Herluin de Conteville. Around 1049, barely into his twenties, William appointed him Bishop of Bayeux. The appointment was political patronage: Odo was too young, too untrained, and too obviously installed to serve family interests. But the Norman Church operated under ducal authority, and William needed loyal men in every power centre. Bayeux, with its cathedral and its strategic position in the Bessin, was one of the most important sees in the duchy.',
        fr: 'Odon était le demi-frère de Guillaume, duc de Normandie — fils d\'Herleva et d\'Herluin de Conteville. Vers 1049, à peine la vingtaine, Guillaume le nomma évêque de Bayeux. La nomination relevait du patronage politique : Odon était trop jeune, trop peu formé et trop manifestement placé pour servir les intérêts familiaux. Mais l\'Église normande fonctionnait sous l\'autorité ducale, et Guillaume avait besoin d\'hommes loyaux dans chaque centre de pouvoir. Bayeux, avec sa cathédrale et sa position stratégique dans le Bessin, était l\'un des sièges les plus importants du duché.',
      },
    },
    anchorYear: 1049,
  },
  {
    id: 'ob-hastings',
    eraId: 'norman-expansion',
    arcId: 'odo-bayeux',
    camera: {
      target: 'places',
      center: [0.57, 50.86],
      zoom: 8.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['hastings'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The bishop at Hastings',
      body: {
        en: 'When William crossed the Channel in September 1066, Odo crossed with him. At the Battle of Hastings on 14 October, he fought — or at least commanded — despite his episcopal status. Canon law forbade clerics from shedding blood, so tradition holds that Odo wielded a mace rather than a sword: blunt force rather than edged weapon, a distinction that satisfied the letter of the law while ignoring its spirit. Whether or not this detail is literally true, Odo was present on the battlefield, rallying troops and coordinating the reserve. The Bayeux Tapestry depicts him mounted, in armour, with a club in his hand, at the heart of the action.',
        fr: 'Quand Guillaume traversa la Manche en septembre 1066, Odon traversa avec lui. À la bataille de Hastings le 14 octobre, il combattit — ou du moins commanda — malgré son statut épiscopal. Le droit canon interdisait aux clercs de verser le sang, aussi la tradition veut qu\'Odon ait manié une masse plutôt qu\'une épée : force contondante plutôt que tranchante, une distinction qui satisfaisait la lettre de la loi tout en en ignorant l\'esprit. Que ce détail soit littéralement vrai ou non, Odon était présent sur le champ de bataille, ralliant les troupes et coordonnant la réserve. La Tapisserie de Bayeux le représente monté, en armure, une massue à la main, au cœur de l\'action.',
      },
    },
    anchorYear: 1066,
  },
  {
    id: 'ob-earl-kent',
    eraId: 'norman-expansion',
    arcId: 'odo-bayeux',
    camera: {
      target: 'bbox',
      center: [0.5, 51.2],
      zoom: 6.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['london', 'dover', 'canterbury'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Earl of Kent — the richest man in England',
      body: {
        en: 'William rewarded Odo lavishly. He became Earl of Kent — the county that controlled Dover, the shortest crossing to Normandy, and the gateway to London. By the time of the Domesday Book in 1086, Odo held more land in England than anyone except the king himself. He governed England as regent during William\'s absences in Normandy, wielding both secular and ecclesiastical authority in a combination that would have been unthinkable anywhere else in Christendom. Half-priest, half-warlord — the embodiment of Norman energy.',
        fr: 'Guillaume récompensa Odon généreusement. Il devint comte de Kent — le comté qui contrôlait Douvres, la traversée la plus courte vers la Normandie, et la porte de Londres. Au moment du Domesday Book en 1086, Odon détenait plus de terres en Angleterre que quiconque hormis le roi lui-même. Il gouverna l\'Angleterre comme régent pendant les absences de Guillaume en Normandie, exerçant à la fois l\'autorité séculière et ecclésiastique — une combinaison impensable partout ailleurs dans la chrétienté. Mi-prêtre, mi-seigneur de guerre — l\'incarnation de l\'énergie normande.',
      },
    },
    anchorYear: 1067,
  },
  {
    id: 'ob-regent',
    eraId: 'norman-expansion',
    arcId: 'odo-bayeux',
    camera: {
      target: 'bbox',
      center: [-0.5, 52.8],
      zoom: 5.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['london', 'york-jorvik', 'durham'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Regent and enforcer',
      body: {
        en: 'As William shuttled between Normandy and England, Odo governed in his absence — putting down revolts, administering justice, and collecting taxes with an efficiency that earned him both respect and hatred. He was not a gentle ruler. When the north of England rebelled, Odo was among those who enforced William\'s devastating "Harrying of the North" in 1069–1070, which depopulated vast stretches of Yorkshire. He combined the moral authority of a bishop with the coercive power of an earl, and he used both without hesitation.',
        fr: 'Tandis que Guillaume faisait la navette entre la Normandie et l\'Angleterre, Odon gouvernait en son absence — matant les révoltes, rendant la justice et collectant les impôts avec une efficacité qui lui valut respect et haine. Il n\'était pas un souverain doux. Quand le nord de l\'Angleterre se rebella, Odon fut parmi ceux qui exécutèrent la dévastatrice « Dévastation du Nord » de Guillaume en 1069–1070, qui dépeupla de vastes étendues du Yorkshire. Il combinait l\'autorité morale d\'un évêque et le pouvoir coercitif d\'un comte, et il usait des deux sans hésitation.',
      },
    },
    anchorYear: 1070,
  },
  {
    id: 'ob-tapestry',
    eraId: 'norman-expansion',
    arcId: 'odo-bayeux',
    camera: {
      target: 'places',
      center: [-0.70, 49.28],
      zoom: 8.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['bayeux'],
      regionIds: ['normandy'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'The Tapestry — propaganda in thread',
      body: {
        en: 'The Bayeux Tapestry — a 70-metre embroidered narrative of the Norman Conquest — is traditionally attributed to Odo\'s patronage, probably commissioned for the consecration of Bayeux Cathedral in 1077. Odo appears repeatedly in its panels, always in a favourable light: blessing the meal before Hastings, rallying the troops, present at every crucial moment. Whether he actually commissioned it remains debated, but the Tapestry\'s emphasis on his role is unmistakable. It is one of the most important historical documents of the Middle Ages — and if Odo did commission it, it is also one of the most sophisticated pieces of political propaganda ever woven.',
        fr: 'La Tapisserie de Bayeux — un récit brodé de 70 mètres sur la conquête normande — est traditionnellement attribuée au mécénat d\'Odon, probablement commandée pour la consécration de la cathédrale de Bayeux en 1077. Odon apparaît à plusieurs reprises dans ses panneaux, toujours sous un jour favorable : bénissant le repas avant Hastings, ralliant les troupes, présent à chaque moment décisif. Qu\'il l\'ait réellement commandée reste débattu, mais l\'insistance de la Tapisserie sur son rôle est indéniable. C\'est l\'un des documents historiques les plus importants du Moyen Âge — et si Odon l\'a commandée, c\'est aussi l\'une des pièces de propagande politique les plus sophistiquées jamais tissées.',
      },
    },
    anchorYear: 1077,
  },
  {
    id: 'ob-fall',
    eraId: 'norman-expansion',
    arcId: 'odo-bayeux',
    camera: {
      target: 'bbox',
      center: [6.0, 45.0],
      zoom: 4.5,
      durationMs: 2500,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['london', 'bayeux', 'palermo'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Arrest, rebellion, and exile',
      body: {
        en: 'In 1082, William arrested Odo — his own half-brother — on charges of planning an unauthorized military expedition to Italy, possibly to seek the papacy itself. The arrest was dramatic: William insisted he was imprisoning not the Bishop of Bayeux (which would require papal authority) but the Earl of Kent (which was the king\'s prerogative). Odo spent five years in prison. Released after William\'s death in 1087, he rebelled against William Rufus in favour of Robert Curthose, was defeated, and was expelled from England permanently. He died on the First Crusade at Palermo in February 1097 — a fitting end for a man who had spent his life at the intersection of war, religion, and power.',
        fr: 'En 1082, Guillaume fit arrêter Odon — son propre demi-frère — sous l\'accusation d\'avoir planifié une expédition militaire non autorisée vers l\'Italie, peut-être pour briguer la papauté elle-même. L\'arrestation fut dramatique : Guillaume insista sur le fait qu\'il emprisonnait non l\'évêque de Bayeux (ce qui aurait requis l\'autorité papale) mais le comte de Kent (ce qui relevait de la prérogative royale). Odon passa cinq ans en prison. Libéré après la mort de Guillaume en 1087, il se rebella contre Guillaume le Roux en faveur de Robert Courteheuse, fut vaincu et expulsé d\'Angleterre définitivement. Il mourut lors de la Première Croisade à Palerme en février 1097 — une fin digne d\'un homme qui avait passé sa vie au croisement de la guerre, de la religion et du pouvoir.',
      },
    },
    anchorYear: 1082,
  },

  // ── Hereward the Wake lifetime guided arc ────────────────────────
  {
    id: 'hw-anglo-saxon-england',
    eraId: 'norman-expansion',
    arcId: 'hereward-the-wake',
    camera: {
      target: 'bbox',
      center: [-0.5, 52.5],
      zoom: 5.5,
      durationMs: 2400,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['london', 'york-jorvik'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'England before the storm',
      body: {
        en: 'Before 1066, England was a prosperous Anglo-Saxon kingdom — its wealth visible in its churches, its tax records, and its sophisticated system of local government. The Danelaw had long been absorbed, but Scandinavian heritage ran deep in the eastern counties. Men like Hereward — probably a minor thegn from Lincolnshire — lived in a world where English, Danish, and Norwegian influences mixed freely. The land was rich, the law was established, and the king\'s peace held. It was a world about to be destroyed.',
        fr: 'Avant 1066, l\'Angleterre était un royaume anglo-saxon prospère — sa richesse visible dans ses églises, ses registres fiscaux et son système sophistiqué de gouvernance locale. Le Danelaw avait été absorbé depuis longtemps, mais l\'héritage scandinave restait profond dans les comtés de l\'est. Des hommes comme Hereward — probablement un thegn mineur du Lincolnshire — vivaient dans un monde où les influences anglaises, danoises et norvégiennes se mêlaient librement. La terre était riche, la loi établie et la paix du roi maintenue. C\'était un monde sur le point d\'être détruit.',
      },
    },
    anchorYear: 1060,
  },
  {
    id: 'hw-conquest-dispossession',
    eraId: 'norman-expansion',
    arcId: 'hereward-the-wake',
    camera: {
      target: 'bbox',
      center: [0.0, 51.5],
      zoom: 5.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['hastings', 'london'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Conquest and dispossession',
      body: {
        en: 'When William won at Hastings and was crowned on Christmas Day 1066, the political order of England was shattered. Over the next five years, the entire Anglo-Saxon aristocracy was systematically replaced by Norman lords. Estates were confiscated, English thegns were reduced to tenants on their own land, and a new French-speaking ruling class imposed its will through castle-building, forest laws, and the redistribution of every major landholding in the kingdom. For men like Hereward, the Conquest was not a distant political event — it was personal ruin.',
        fr: 'Quand Guillaume l\'emporta à Hastings et fut couronné le jour de Noël 1066, l\'ordre politique anglais fut brisé. Au cours des cinq années suivantes, toute l\'aristocratie anglo-saxonne fut systématiquement remplacée par des seigneurs normands. Les domaines furent confisqués, les thegns anglais réduits au rang de tenanciers sur leurs propres terres, et une nouvelle classe dirigeante francophone imposa sa volonté par la construction de châteaux, les lois forestières et la redistribution de chaque grand domaine du royaume. Pour des hommes comme Hereward, la Conquête n\'était pas un événement politique lointain — c\'était la ruine personnelle.',
      },
    },
    anchorYear: 1066,
  },
  {
    id: 'hw-return',
    eraId: 'norman-expansion',
    arcId: 'hereward-the-wake',
    camera: {
      target: 'bbox',
      center: [0.0, 52.5],
      zoom: 6.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['ely'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The return',
      body: {
        en: 'Hereward\'s early life is wrapped in legend, and separating fact from fiction is difficult. He may have been exiled before the Conquest and returned around 1069 to find his family\'s lands seized by Normans. What is documented is that by 1070, he had emerged as the leader of English resistance in the fenlands of eastern England — a landscape of marshes, islands, and waterways that made conventional Norman cavalry warfare nearly impossible. Peterborough Abbey\'s chronicle records his raid on the abbey in 1070 to prevent its wealth from falling into Norman hands.',
        fr: 'La jeunesse de Hereward est enveloppée de légende, et séparer le fait de la fiction est difficile. Il fut peut-être exilé avant la Conquête et revint vers 1069 pour trouver les terres de sa famille saisies par les Normands. Ce qui est documenté, c\'est qu\'en 1070, il avait émergé comme le chef de la résistance anglaise dans les marécages de l\'est de l\'Angleterre — un paysage de marais, d\'îles et de voies d\'eau qui rendait la guerre de cavalerie normande conventionnelle quasi impossible. La chronique de l\'abbaye de Peterborough relate son raid sur l\'abbaye en 1070 pour empêcher ses richesses de tomber aux mains des Normands.',
      },
    },
    anchorYear: 1069,
  },
  {
    id: 'hw-fenland-fortress',
    eraId: 'norman-expansion',
    arcId: 'hereward-the-wake',
    camera: {
      target: 'places',
      center: [0.26, 52.40],
      zoom: 8.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['ely'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The fen country',
      body: {
        en: 'The fenlands around Ely were a natural fortress. Miles of waterlogged marshland, navigable only by those who knew the hidden causeways, surrounded the Isle of Ely — a raised island of dry ground anchored by the great abbey. Hereward and his followers established themselves here, joined by dispossessed English thegns, Danish raiders, and monks who refused Norman authority. For over a year, the fens held. Norman cavalry was useless in the marshes, and the garrison on the isle could not be starved out while they controlled the waterways.',
        fr: 'Les marécages autour d\'Ely formaient une forteresse naturelle. Des kilomètres de terres inondées, navigables uniquement par ceux qui connaissaient les chaussées cachées, entouraient l\'île d\'Ely — un îlot de terre ferme ancré par la grande abbaye. Hereward et ses partisans s\'y établirent, rejoints par des thegns anglais dépossédés, des pillards danois et des moines refusant l\'autorité normande. Pendant plus d\'un an, les marais tinrent bon. La cavalerie normande était inutile dans les marécages, et la garnison de l\'île ne pouvait être affamée tant qu\'elle contrôlait les voies d\'eau.',
      },
    },
    anchorYear: 1070,
  },
  {
    id: 'hw-siege-ely',
    eraId: 'norman-expansion',
    arcId: 'hereward-the-wake',
    camera: {
      target: 'places',
      center: [0.26, 52.40],
      zoom: 7.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['ely'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The siege of Ely',
      body: {
        en: 'In 1071, William moved against Ely with the full weight of Norman military engineering. He ordered a causeway built across the marshes — a massive feat of construction through hostile terrain. The first attempt failed: the causeway collapsed under the weight of armoured men and horses. William tried again, bringing up siege towers and attempting a frontal assault. The English resistance held for months. Eventually, the monks of Ely — facing the destruction of their abbey — negotiated a surrender, reportedly showing the Normans a safe path through the fens. Hereward himself escaped. What happened to him afterward is unknown.',
        fr: 'En 1071, Guillaume marcha contre Ely avec toute la puissance du génie militaire normand. Il ordonna la construction d\'une chaussée à travers les marais — un exploit massif de construction en terrain hostile. La première tentative échoua : la chaussée s\'effondra sous le poids des hommes en armure et des chevaux. Guillaume réessaya, faisant avancer des tours de siège et tentant un assaut frontal. La résistance anglaise tint pendant des mois. Finalement, les moines d\'Ely — face à la destruction de leur abbaye — négocièrent une reddition, révélant apparemment aux Normands un chemin sûr à travers les marais. Hereward lui-même s\'échappa. Ce qui lui advint ensuite est inconnu.',
      },
    },
    anchorYear: 1071,
  },
  {
    id: 'hw-legend',
    eraId: 'norman-expansion',
    arcId: 'hereward-the-wake',
    camera: {
      target: 'bbox',
      center: [0.0, 52.5],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['ely'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The outlaw and the legend',
      body: {
        en: 'After Ely, Hereward vanished from the historical record. Later medieval sources — the Gesta Herewardi, compiled in the twelfth century — transformed him into a romantic outlaw figure: a guerrilla leader who harassed the Normans from the fenlands, a proto-Robin Hood fighting for the dispossessed. How much of this is true is impossible to determine. What matters is that the legend persisted — evidence that the trauma of the Norman Conquest was never fully forgotten by the English, and that resistance, even failed resistance, became a touchstone of English identity.',
        fr: 'Après Ely, Hereward disparut des archives historiques. Des sources médiévales ultérieures — la Gesta Herewardi, compilée au XIIe siècle — le transformèrent en figure romantique de hors-la-loi : un chef de guérilla harcelant les Normands depuis les marais, un proto-Robin des Bois combattant pour les dépossédés. Quelle part de vérité contient cette légende est impossible à déterminer. Ce qui compte, c\'est que la légende perdura — preuve que le traumatisme de la Conquête normande ne fut jamais totalement oublié par les Anglais, et que la résistance, même vaincue, devint une pierre de touche de l\'identité anglaise.',
      },
    },
    anchorYear: 1075,
  },
  {
    id: 'hw-other-side',
    eraId: 'norman-expansion',
    arcId: 'hereward-the-wake',
    camera: {
      target: 'bbox',
      center: [-0.5, 52.0],
      zoom: 5.0,
      durationMs: 2500,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['london', 'ely', 'york-jorvik'],
      regionIds: [],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The other side of conquest',
      body: {
        en: 'The Norman Conquest was the most successful military takeover in medieval European history. Within twenty years, an entire aristocracy was replaced, a new language imposed on the ruling class, and the landscape reshaped with castles, cathedrals, and forest enclosures. The Domesday Book of 1086 records the transfer in meticulous detail. But every conquest has two stories. Hereward\'s resistance, however brief and ultimately futile, represents the English experience of the Conquest: dispossession, resistance, defeat, and the long, slow accommodation to a new order that would take centuries to fully absorb.',
        fr: 'La conquête normande fut la prise de pouvoir militaire la plus réussie de l\'histoire médiévale européenne. En vingt ans, une aristocratie entière fut remplacée, une nouvelle langue imposée à la classe dirigeante, et le paysage remodelé par des châteaux, des cathédrales et des réserves forestières. Le Domesday Book de 1086 consigne le transfert dans un détail méticuleux. Mais toute conquête a deux histoires. La résistance de Hereward, aussi brève et finalement futile qu\'elle fût, représente l\'expérience anglaise de la Conquête : dépossession, résistance, défaite, et la lente et longue accommodation à un nouvel ordre qu\'il faudrait des siècles pour pleinement absorber.',
      },
    },
    anchorYear: 1086,
  },

  // ── Henry I — the lion of justice ────────────────────────────────
  {
    id: 'h1-rufus-death',
    eraId: 'norman-expansion',
    arcId: 'henry-i-england',
    camera: { target: 'bbox', center: [-1.5, 51.0], zoom: 7.0, durationMs: 2400, easing: 'easeInOutCubic' },
    focus: { placeIds: ['winchester', 'london'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'The arrow in the New Forest',
      body: {
        en: 'On 2 August 1100, William Rufus was killed by an arrow while hunting in the New Forest. Whether it was murder or accident remains debated. His younger brother Henry rode immediately to Winchester, seized the royal treasury, and had himself crowned at Westminster within three days. Speed was everything: his elder brother Robert Curthose was returning from the First Crusade and had a strong claim. Henry\'s lightning coup secured the English crown for a ruler who would transform royal administration.',
        fr: 'Le 2 août 1100, Guillaume le Roux fut tué par une flèche lors d\'une chasse dans la New Forest. Meurtre ou accident, le débat reste ouvert. Son frère cadet Henri galopa aussitôt vers Winchester, s\'empara du trésor royal et se fit couronner à Westminster en trois jours. La rapidité était cruciale : son frère aîné Robert Courteheuse revenait de la Première Croisade avec une prétention solide. Le coup de force d\'Henri assura la couronne anglaise à un souverain qui allait transformer l\'administration royale.',
      },
    },
    anchorYear: 1100,
  },
  {
    id: 'h1-coronation-charter',
    eraId: 'norman-expansion',
    arcId: 'henry-i-england',
    camera: { target: 'places', center: [-0.13, 51.51], zoom: 8.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['london'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The Charter of Liberties',
      body: {
        en: 'At his coronation, Henry issued a charter promising to end the abuses of William Rufus — arbitrary taxation, exploitation of Church lands, and oppressive forest law. It was the first time an English king had bound himself by written promises to his subjects. The charter was political calculation, not idealism: Henry needed baronial support against his brother. But the precedent mattered. A century later, the barons who drafted Magna Carta would cite Henry I\'s charter as their model.',
        fr: 'Lors de son couronnement, Henri publia une charte promettant de mettre fin aux abus de Guillaume le Roux — fiscalité arbitraire, exploitation des terres ecclésiastiques et lois forestières oppressives. C\'était la première fois qu\'un roi anglais s\'engageait par écrit envers ses sujets. La charte relevait du calcul politique, non de l\'idéalisme : Henri avait besoin du soutien des barons contre son frère. Mais le précédent comptait. Un siècle plus tard, les barons qui rédigèrent la Magna Carta citeraient la charte d\'Henri Ier comme modèle.',
      },
    },
    anchorYear: 1100,
  },
  {
    id: 'h1-tinchebray',
    eraId: 'norman-expansion',
    arcId: 'henry-i-england',
    camera: { target: 'bbox', center: [-0.7, 49.5], zoom: 6.0, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['london', 'caen'], regionIds: ['normandy'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Tinchebray — Normandy reunited',
      body: {
        en: 'In 1106, Henry invaded Normandy and defeated Robert Curthose at the Battle of Tinchebray. Robert was captured and imprisoned for the remaining twenty-eight years of his life. For the first time since the Conqueror\'s death, England and Normandy were united under one ruler. Henry governed both with an iron grip, crossing the Channel repeatedly, spending more time in Normandy than any of his predecessors. The cross-Channel state that William I had built was restored — and this time, it would be run by the most effective administrator medieval Europe had seen.',
        fr: 'En 1106, Henri envahit la Normandie et vainquit Robert Courteheuse à la bataille de Tinchebray. Robert fut capturé et emprisonné pour les vingt-huit années restantes de sa vie. Pour la première fois depuis la mort du Conquérant, l\'Angleterre et la Normandie étaient réunies sous un seul souverain. Henri gouverna les deux d\'une main de fer, traversant la Manche sans relâche, passant plus de temps en Normandie qu\'aucun de ses prédécesseurs. L\'État transmanche bâti par Guillaume Ier était restauré — et cette fois, il serait dirigé par l\'administrateur le plus efficace que l\'Europe médiévale eût connu.',
      },
    },
    anchorYear: 1106,
  },
  {
    id: 'h1-exchequer',
    eraId: 'norman-expansion',
    arcId: 'henry-i-england',
    camera: { target: 'places', center: [-1.31, 51.06], zoom: 8.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['winchester', 'london'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The Exchequer and the king\'s justice',
      body: {
        en: 'Henry I built the most sophisticated royal administration in western Europe. The Exchequer — named for the chequered cloth on which accounts were calculated — became a permanent institution at Winchester, auditing every penny owed to the crown. Royal justices rode circuits through England, imposing the king\'s law in baronial courts. Roger of Salisbury, Henry\'s chief minister, created a bureaucracy that could govern even when the king was in Normandy. It was government by system rather than personality — and it would outlast the dynasty that built it.',
        fr: 'Henri Ier bâtit l\'administration royale la plus sophistiquée d\'Europe occidentale. L\'Échiquier — nommé d\'après le tissu à carreaux sur lequel on calculait les comptes — devint une institution permanente à Winchester, auditant chaque denier dû à la couronne. Des juges royaux parcouraient l\'Angleterre en tournées, imposant la loi du roi dans les cours seigneuriales. Roger de Salisbury, le principal ministre d\'Henri, créa une bureaucratie capable de gouverner même en l\'absence du roi en Normandie. C\'était un gouvernement par le système plutôt que par la personnalité — et il survivrait à la dynastie qui l\'avait construit.',
      },
    },
    anchorYear: 1110,
  },
  {
    id: 'h1-white-ship',
    eraId: 'norman-expansion',
    arcId: 'henry-i-england',
    camera: { target: 'places', center: [-1.26, 49.67], zoom: 8.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['barfleur'], regionIds: ['normandy'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'The White Ship — a dynasty drowned',
      body: {
        en: 'On the night of 25 November 1120, the White Ship struck a rock leaving Barfleur harbour and sank in the Channel. Among the dead was William Adelin, Henry\'s only legitimate son and heir. The chronicler Orderic Vitalis wrote that Henry never smiled again. The disaster destroyed the succession plan Henry had spent two decades building. He forced his barons to swear allegiance to his daughter Matilda — an unprecedented step that would set the stage for civil war. A single shipwreck altered the course of English history.',
        fr: 'Dans la nuit du 25 novembre 1120, la Blanche-Nef heurta un rocher en quittant le port de Barfleur et sombra dans la Manche. Parmi les morts se trouvait Guillaume Adelin, unique fils légitime et héritier d\'Henri. Le chroniqueur Orderic Vital écrivit qu\'Henri ne sourit plus jamais. Le désastre anéantit le plan de succession que Henri avait mis vingt ans à construire. Il contraignit ses barons à jurer allégeance à sa fille Mathilde — une démarche sans précédent qui allait préparer le terrain à la guerre civile. Un seul naufrage modifia le cours de l\'histoire anglaise.',
      },
    },
    anchorYear: 1120,
  },
  {
    id: 'h1-death-succession',
    eraId: 'norman-expansion',
    arcId: 'henry-i-england',
    camera: { target: 'bbox', center: [0.0, 50.0], zoom: 5.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['rouen', 'london', 'winchester'], regionIds: ['normandy'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Death at Lyons-la-Forêt — the kingdom unravels',
      body: {
        en: 'Henry I died on 1 December 1135 at Lyons-la-Forêt in Normandy, reportedly after eating a surfeit of lampreys. He had reigned for thirty-five years — the longest of any Norman king. His death triggered exactly the crisis he had feared. Despite the oaths sworn to Matilda, Stephen of Blois crossed the Channel and seized the crown within weeks. The administrative machine Henry had built would survive, but the political order he had held together by force of will shattered. England was about to descend into nearly two decades of civil war.',
        fr: 'Henri Ier mourut le 1er décembre 1135 à Lyons-la-Forêt en Normandie, dit-on après avoir mangé trop de lamproies. Il avait régné trente-cinq ans — le plus long règne de tous les rois normands. Sa mort déclencha exactement la crise qu\'il avait redoutée. Malgré les serments prêtés à Mathilde, Étienne de Blois traversa la Manche et s\'empara de la couronne en quelques semaines. La machine administrative bâtie par Henri survivrait, mais l\'ordre politique qu\'il avait maintenu par sa volonté se brisa. L\'Angleterre allait plonger dans près de deux décennies de guerre civile.',
      },
    },
    anchorYear: 1135,
  },

  // ── The Anarchy — when the crown broke ──────────────────────────
  {
    id: 'an-stephen-coup',
    eraId: 'norman-expansion',
    arcId: 'the-anarchy',
    camera: { target: 'bbox', center: [-0.13, 51.51], zoom: 6.5, durationMs: 2400, easing: 'easeInOutCubic' },
    focus: { placeIds: ['london', 'winchester'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Stephen seizes the crown',
      body: {
        en: 'When Henry I died in December 1135, his nephew Stephen of Blois moved with extraordinary speed. He crossed the Channel, won the support of the citizens of London and the bishop of Winchester, and was crowned at Westminster on 22 December — before Matilda could react. Stephen was brave, generous, and personally likeable, but he lacked Henry I\'s iron will and administrative instinct. His reign would test whether the Anglo-Norman state could survive a weak king.',
        fr: 'À la mort d\'Henri Ier en décembre 1135, son neveu Étienne de Blois agit avec une rapidité extraordinaire. Il traversa la Manche, gagna le soutien des Londoniens et de l\'évêque de Winchester, et fut couronné à Westminster le 22 décembre — avant que Mathilde ne puisse réagir. Étienne était brave, généreux et personnellement aimable, mais il n\'avait ni la volonté de fer d\'Henri Ier ni son instinct administratif. Son règne allait tester si l\'État anglo-normand pouvait survivre à un roi faible.',
      },
    },
    anchorYear: 1135,
  },
  {
    id: 'an-matilda-arrives',
    eraId: 'norman-expansion',
    arcId: 'the-anarchy',
    camera: { target: 'bbox', center: [-2.0, 51.5], zoom: 6.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['london', 'winchester'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Matilda lands — the war begins',
      body: {
        en: 'In September 1139, the Empress Matilda landed in England with a small force, supported by her half-brother Robert of Gloucester. England split. The west country and much of the Midlands declared for Matilda; the south-east and London held for Stephen. For the next decade, neither side could deliver a knockout blow. Castles changed hands, barons switched allegiance, and the countryside suffered. The Anglo-Saxon Chronicle recorded that "Christ and his saints slept" — the most famous description of medieval anarchy in the English language.',
        fr: 'En septembre 1139, l\'impératrice Mathilde débarqua en Angleterre avec une petite force, soutenue par son demi-frère Robert de Gloucester. L\'Angleterre se divisa. L\'ouest et une grande partie des Midlands se déclarèrent pour Mathilde ; le sud-est et Londres tinrent pour Étienne. Pendant une décennie, aucun camp ne put porter le coup décisif. Des châteaux changèrent de mains, des barons retournèrent leur allégeance, et les campagnes souffrirent. La Chronique anglo-saxonne nota que « le Christ et ses saints dormaient » — la plus célèbre description de l\'anarchie médiévale en langue anglaise.',
      },
    },
    anchorYear: 1139,
  },
  {
    id: 'an-lincoln-battle',
    eraId: 'norman-expansion',
    arcId: 'the-anarchy',
    camera: { target: 'places', center: [-0.54, 53.23], zoom: 8.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['lincoln'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Lincoln — the king captured',
      body: {
        en: 'On 2 February 1141, the forces of Robert of Gloucester defeated Stephen\'s army at the Battle of Lincoln. Stephen himself was captured — dragged from the fighting after his sword broke and he was felled by a stone. It was the only time in medieval English history that a reigning king was taken prisoner on an English battlefield. Matilda seemed on the verge of victory. She marched on London to claim the crown.',
        fr: 'Le 2 février 1141, les forces de Robert de Gloucester vainquirent l\'armée d\'Étienne à la bataille de Lincoln. Étienne lui-même fut capturé — arraché aux combats après que son épée se brisa et qu\'il fut frappé par une pierre. C\'est la seule fois dans l\'histoire médiévale anglaise qu\'un roi régnant fut fait prisonnier sur un champ de bataille anglais. Mathilde semblait au bord de la victoire. Elle marcha sur Londres pour réclamer la couronne.',
      },
    },
    anchorYear: 1141,
  },
  {
    id: 'an-oxford-escape',
    eraId: 'norman-expansion',
    arcId: 'the-anarchy',
    camera: { target: 'places', center: [-1.26, 51.75], zoom: 8.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['oxford'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The escape from Oxford',
      body: {
        en: 'The Londoners drove Matilda out before she could be crowned. The war swung back. By December 1142, Stephen had besieged Matilda in Oxford Castle. She escaped in one of the war\'s most famous episodes: crossing the frozen Thames at night, cloaked in white against the snow, with just three or four companions. She reached Wallingford and fought on. The escape became a symbol of the entire conflict — dramatic, inconclusive, and impossible to resolve by force alone.',
        fr: 'Les Londoniens chassèrent Mathilde avant qu\'elle ne fût couronnée. La guerre bascula de nouveau. En décembre 1142, Étienne assiégeait Mathilde dans le château d\'Oxford. Elle s\'échappa dans l\'un des épisodes les plus célèbres de la guerre : traversant la Tamise gelée de nuit, drapée de blanc sur la neige, avec seulement trois ou quatre compagnons. Elle atteignit Wallingford et continua le combat. L\'évasion devint le symbole du conflit entier — dramatique, indécise et impossible à résoudre par la force seule.',
      },
    },
    anchorYear: 1142,
  },
  {
    id: 'an-treaty-winchester',
    eraId: 'norman-expansion',
    arcId: 'the-anarchy',
    camera: { target: 'places', center: [-1.31, 51.06], zoom: 7.0, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['winchester', 'london'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The Treaty of Winchester — peace at last',
      body: {
        en: 'After Eustace, Stephen\'s eldest son, died suddenly in 1153, the exhausted parties finally found a compromise. The Treaty of Winchester (also called the Treaty of Wallingford) recognised Stephen as king for life but named Matilda\'s son Henry Plantagenet as his heir. Stephen died on 25 October 1154, and Henry II succeeded without opposition. The Anarchy was over. Henry inherited a battered kingdom, but also the administrative machinery that Henry I had built — a foundation on which the Angevin empire would be raised.',
        fr: 'Après la mort subite d\'Eustache, fils aîné d\'Étienne, en 1153, les partis épuisés trouvèrent enfin un compromis. Le traité de Winchester (aussi appelé traité de Wallingford) reconnut Étienne comme roi à vie mais désigna le fils de Mathilde, Henri Plantagenêt, comme héritier. Étienne mourut le 25 octobre 1154, et Henri II lui succéda sans opposition. L\'Anarchie était terminée. Henri héritait d\'un royaume meurtri, mais aussi de la machine administrative bâtie par Henri Ier — un socle sur lequel serait édifié l\'empire angevin.',
      },
    },
    anchorYear: 1153,
  },

  // ── The March of Wales — castles on the frontier ────────────────
  {
    id: 'mw-fitzosbern-chepstow',
    eraId: 'norman-expansion',
    arcId: 'march-of-wales',
    camera: { target: 'places', center: [-2.67, 51.64], zoom: 8.5, durationMs: 2400, easing: 'easeInOutCubic' },
    focus: { placeIds: ['chepstow'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'Chepstow — the first stone castle in Wales',
      body: {
        en: 'William fitzOsbern, one of William the Conqueror\'s closest companions, was made Earl of Hereford and given the task of securing the Welsh border. Around 1067 he began building Chepstow Castle — a great stone keep perched on limestone cliffs above the River Wye. It was the earliest datable stone castle in Britain, and it sent a message: the Normans were here to stay. From Chepstow, fitzOsbern pushed into Gwent, imposing Norman lordship on a landscape the Anglo-Saxons had never controlled.',
        fr: 'Guillaume fitzOsbern, l\'un des plus proches compagnons de Guillaume le Conquérant, fut fait comte de Hereford et chargé de sécuriser la frontière galloise. Vers 1067, il commença la construction du château de Chepstow — un grand donjon de pierre perché sur des falaises calcaires au-dessus de la rivière Wye. C\'était le plus ancien château de pierre datable de Grande-Bretagne, et il portait un message : les Normands étaient là pour rester. Depuis Chepstow, fitzOsbern pénétra dans le Gwent, imposant la seigneurie normande sur un paysage que les Anglo-Saxons n\'avaient jamais contrôlé.',
      },
    },
    anchorYear: 1067,
  },
  {
    id: 'mw-cardiff-south',
    eraId: 'norman-expansion',
    arcId: 'march-of-wales',
    camera: { target: 'places', center: [-3.18, 51.48], zoom: 8.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['cardiff', 'chepstow'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Cardiff and the southern march',
      body: {
        en: 'Robert fitzHamon seized Glamorgan around 1091, building a motte-and-bailey castle at Cardiff that became the anchor of Norman power in south Wales. The southern march advanced rapidly: Norman lords established castles at Neath, Swansea, and Kidwelly, carving out lordships in the fertile coastal lowlands while Welsh princes retained the mountainous interior. The pattern — Norman-held lowlands, Welsh-held uplands — would define the March of Wales for two centuries.',
        fr: 'Robert fitzHamon s\'empara du Glamorgan vers 1091, construisant un château à motte à Cardiff qui devint l\'ancre du pouvoir normand dans le sud du Pays de Galles. La marche du sud progressa rapidement : des seigneurs normands établirent des châteaux à Neath, Swansea et Kidwelly, se taillant des seigneuries dans les plaines côtières fertiles tandis que les princes gallois conservaient l\'intérieur montagneux. Ce schéma — plaines normandes, hauteurs galloises — définirait la Marche du Pays de Galles pendant deux siècles.',
      },
    },
    anchorYear: 1091,
  },
  {
    id: 'mw-rhuddlan-north',
    eraId: 'norman-expansion',
    arcId: 'march-of-wales',
    camera: { target: 'places', center: [-3.47, 53.29], zoom: 8.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['rhuddlan'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Rhuddlan and the northern front',
      body: {
        en: 'In the north, Hugh d\'Avranches (Hugh the Fat), Earl of Chester, and his cousin Robert of Rhuddlan pushed deep into Gwynedd in the 1070s and 1080s. Robert built a castle at Rhuddlan on the river Clwyd and raided as far as Snowdonia. But the northern advance was precarious. In 1093, Robert of Rhuddlan was killed by a Welsh raiding party, and the Welsh princes of Gwynedd — particularly Gruffudd ap Cynan — fought a generation-long war of resistance that would eventually push the Norman frontier back.',
        fr: 'Au nord, Hugues d\'Avranches (Hugues le Gros), comte de Chester, et son cousin Robert de Rhuddlan pénétrèrent profondément dans le Gwynedd dans les années 1070 et 1080. Robert construisit un château à Rhuddlan sur la rivière Clwyd et mena des raids jusqu\'à Snowdonia. Mais l\'avancée septentrionale était précaire. En 1093, Robert de Rhuddlan fut tué par un parti de pillards gallois, et les princes gallois du Gwynedd — en particulier Gruffudd ap Cynan — menèrent une guerre de résistance d\'une génération qui finirait par repousser la frontière normande.',
      },
    },
    anchorYear: 1073,
  },
  {
    id: 'mw-pembroke-west',
    eraId: 'norman-expansion',
    arcId: 'march-of-wales',
    camera: { target: 'places', center: [-4.95, 51.67], zoom: 8.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['pembroke'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Pembroke — gateway to the Irish Sea',
      body: {
        en: 'Arnulf de Montgomery established Pembroke Castle in 1093, pushing the Norman frontier to the far south-west tip of Wales. Pembroke became more than a border fortress: it was the natural embarkation point for Ireland, and its lords — the de Clare family, who later took the title Earl of Pembroke — would play central roles in the Anglo-Norman invasion of Ireland. The castle that Arnulf built on a limestone promontory overlooking the Haven would remain the strategic key to the Irish Sea for centuries.',
        fr: 'Arnulf de Montgomery fonda le château de Pembroke en 1093, poussant la frontière normande jusqu\'à la pointe sud-ouest du Pays de Galles. Pembroke devint plus qu\'une forteresse frontalière : c\'était le point d\'embarquement naturel vers l\'Irlande, et ses seigneurs — la famille de Clare, qui prendrait plus tard le titre de comte de Pembroke — joueraient des rôles centraux dans l\'invasion anglo-normande de l\'Irlande. Le château qu\'Arnulf construisit sur un promontoire calcaire dominant le Haven resterait la clé stratégique de la mer d\'Irlande pendant des siècles.',
      },
    },
    anchorYear: 1093,
  },
  {
    id: 'mw-owain-gwynedd',
    eraId: 'norman-expansion',
    arcId: 'march-of-wales',
    camera: { target: 'bbox', center: [-3.8, 52.5], zoom: 6.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['rhuddlan', 'cardiff'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: false, pulse: ['destinations'] },
    copy: {
      title: 'Owain Gwynedd — the Welsh counter-offensive',
      body: {
        en: 'By the mid-twelfth century, the Welsh had learned from their Norman adversaries. Owain Gwynedd, prince of Gwynedd from 1137 to 1170, unified northern Wales and pushed the Norman marcher lords back from their deepest penetrations. In 1157, he fought Henry II\'s invasion to a standstill in the forests of Gwynedd. Owain adopted Norman military techniques — castle-building, heavy cavalry — while maintaining Welsh law and language. The March became a true frontier: not a line of advance but a contested zone where Norman and Welsh power structures coexisted.',
        fr: 'Au milieu du XIIe siècle, les Gallois avaient appris de leurs adversaires normands. Owain Gwynedd, prince de Gwynedd de 1137 à 1170, unifia le nord du Pays de Galles et repoussa les seigneurs normands de leurs pénétrations les plus profondes. En 1157, il tint en échec l\'invasion d\'Henri II dans les forêts du Gwynedd. Owain adopta les techniques militaires normandes — construction de châteaux, cavalerie lourde — tout en maintenant le droit et la langue gallois. La Marche devint une véritable frontière : non une ligne d\'avancée mais une zone contestée où structures de pouvoir normandes et galloises coexistaient.',
      },
    },
    anchorYear: 1157,
  },
  {
    id: 'mw-legacy-march',
    eraId: 'norman-expansion',
    arcId: 'march-of-wales',
    camera: { target: 'bbox', center: [-3.2, 52.0], zoom: 5.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['chepstow', 'cardiff', 'pembroke', 'rhuddlan'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'A frontier that never closed',
      body: {
        en: 'The March of Wales was never a single campaign but a two-century process of castle-building, intermarriage, revolt, and accommodation. Norman lords adopted Welsh customs; Welsh princes adopted Norman institutions. The marcher lordships — semi-independent territories answerable neither fully to the English crown nor to Welsh law — created a political patchwork unique in medieval Europe. The frontier would not be closed until Edward I\'s conquest in the 1280s, but the Anglo-Norman imprint — in castles, place-names, and legal traditions — is still visible across Wales today.',
        fr: 'La Marche du Pays de Galles ne fut jamais une campagne unique mais un processus de deux siècles mêlant construction de châteaux, mariages mixtes, révoltes et accommodements. Les seigneurs normands adoptèrent des coutumes galloises ; les princes gallois adoptèrent des institutions normandes. Les seigneuries de marche — territoires semi-indépendants ne relevant pleinement ni de la couronne anglaise ni du droit gallois — créèrent un patchwork politique unique en Europe médiévale. La frontière ne serait fermée qu\'avec la conquête d\'Édouard Ier dans les années 1280, mais l\'empreinte anglo-normande — dans les châteaux, les toponymes et les traditions juridiques — reste visible dans tout le Pays de Galles aujourd\'hui.',
      },
    },
    anchorYear: 1170,
  },

  // ── Anglo-Norman Ireland — Strongbow and the crown ──────────────
  {
    id: 'ani-dublin-hiberno-norse',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'places', center: [-6.27, 53.35], zoom: 7.5, durationMs: 2400, easing: 'easeInOutCubic' },
    focus: { placeIds: ['dublin'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'Dublin — the Hiberno-Norse gateway',
      body: {
        en: 'Before any Norman set foot in Ireland, Dublin was already one of the great trading cities of the Irish Sea world. Founded as a Viking longphort in the ninth century, it had evolved into a Hiberno-Norse town of merchants, craftsmen, and warrior-kings. Its harbour connected Ireland to the Norse networks of York, Chester, and the Isle of Man. When Anglo-Norman adventurers began looking westward across the Irish Sea in the 1160s, Dublin was the prize they all wanted.',
        fr: 'Avant qu\'aucun Normand ne foule l\'Irlande, Dublin était déjà l\'une des grandes villes marchandes du monde de la mer d\'Irlande. Fondée comme longphort viking au IXe siècle, elle avait évolué en ville hiberno-nordique de marchands, artisans et rois-guerriers. Son port reliait l\'Irlande aux réseaux scandinaves de York, Chester et l\'île de Man. Quand les aventuriers anglo-normands commencèrent à regarder vers l\'ouest à travers la mer d\'Irlande dans les années 1160, Dublin était le prix qu\'ils convoitaient tous.',
      },
    },
    anchorYear: 1160,
  },
  {
    id: 'ani-diarmait-exile',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'bbox', center: [-5.5, 52.0], zoom: 6.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['ferns', 'pembroke'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'Diarmait Mac Murchada — a king seeks Norman swords',
      body: {
        en: 'In 1166, Diarmait Mac Murchada, king of Leinster, was driven from Ireland by a coalition of rival Irish kings led by Ruaidrí Ua Conchobair of Connacht. Diarmait crossed to England and sought help from Henry II, who granted him permission to recruit among the Anglo-Norman lords of the Welsh March. Diarmait found willing allies — ambitious marcher barons with military expertise and an appetite for land. The bargain he struck would open Ireland to Anglo-Norman intervention for centuries.',
        fr: 'En 1166, Diarmait Mac Murchada, roi de Leinster, fut chassé d\'Irlande par une coalition de rois irlandais rivaux menée par Ruaidrí Ua Conchobair de Connacht. Diarmait passa en Angleterre et sollicita l\'aide d\'Henri II, qui l\'autorisa à recruter parmi les seigneurs anglo-normands de la Marche galloise. Diarmait trouva des alliés empressés — des barons de marche ambitieux dotés d\'une expertise militaire et d\'un appétit de terres. Le marché qu\'il conclut allait ouvrir l\'Irlande à l\'intervention anglo-normande pour des siècles.',
      },
    },
    anchorYear: 1166,
  },
  {
    id: 'ani-strongbow-wexford',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'places', center: [-6.46, 52.34], zoom: 8.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['wexford', 'ferns'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Strongbow lands — Wexford falls',
      body: {
        en: 'In May 1169, the first Anglo-Norman force landed near Wexford — a small contingent of archers and men-at-arms from Pembroke. They took Wexford quickly. The following year, Richard de Clare, Earl of Pembroke — known as Strongbow — arrived with a much larger army. He captured Waterford, married Diarmait\'s daughter Aoife, and was promised the succession to Leinster. Anglo-Norman cavalry, crossbowmen, and castle-building techniques overwhelmed Irish forces accustomed to different styles of warfare.',
        fr: 'En mai 1169, la première force anglo-normande débarqua près de Wexford — un petit contingent d\'archers et d\'hommes d\'armes venus de Pembroke. Ils prirent Wexford rapidement. L\'année suivante, Richard de Clare, comte de Pembroke — surnommé Strongbow — arriva avec une armée bien plus importante. Il prit Waterford, épousa Aoife, fille de Diarmait, et reçut la promesse de succession au trône de Leinster. La cavalerie anglo-normande, les arbalétriers et les techniques de construction de châteaux submergèrent les forces irlandaises habituées à d\'autres formes de guerre.',
      },
    },
    anchorYear: 1170,
  },
  {
    id: 'ani-dublin-falls',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'places', center: [-6.27, 53.35], zoom: 7.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['dublin', 'waterford'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Dublin taken — the prize of Ireland',
      body: {
        en: 'In September 1170, Strongbow\'s forces stormed Dublin, driving out the Hiberno-Norse garrison. It was the turning point. Dublin gave the Anglo-Normans a fortified port, a trade hub, and the strategic centre of eastern Ireland. Diarmait died in 1171, and Strongbow claimed Leinster. The speed and scale of the Anglo-Norman takeover alarmed Henry II, who saw his own vassal becoming an independent power. The king decided to intervene personally.',
        fr: 'En septembre 1170, les forces de Strongbow prirent Dublin d\'assaut, chassant la garnison hiberno-nordique. Ce fut le tournant. Dublin offrit aux Anglo-Normands un port fortifié, un centre commercial et le cœur stratégique de l\'est de l\'Irlande. Diarmait mourut en 1171, et Strongbow revendiqua le Leinster. La rapidité et l\'ampleur de la prise de pouvoir anglo-normande alarmèrent Henri II, qui voyait son propre vassal devenir une puissance indépendante. Le roi décida d\'intervenir personnellement.',
      },
    },
    anchorYear: 1170,
  },
  {
    id: 'ani-henry-ii-lands',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'bbox', center: [-6.5, 52.8], zoom: 6.0, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['waterford', 'dublin', 'london'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Henry II — the crown takes control',
      body: {
        en: 'In October 1171, Henry II landed at Waterford with a massive army — the first English king to set foot in Ireland. His purpose was not conquest but control: he came to assert royal authority over Strongbow and the other Anglo-Norman lords, and to receive the submission of the Irish kings. Most Irish kings submitted without a fight, accepting Henry as overlord. Dublin was granted to the crown. Henry established the Lordship of Ireland — a constitutional arrangement that would bind Ireland to the English crown for eight centuries.',
        fr: 'En octobre 1171, Henri II débarqua à Waterford avec une armée massive — le premier roi anglais à fouler le sol irlandais. Son but n\'était pas la conquête mais le contrôle : il venait affirmer l\'autorité royale sur Strongbow et les autres seigneurs anglo-normands, et recevoir la soumission des rois irlandais. La plupart se soumirent sans combattre, acceptant Henri comme suzerain. Dublin fut concédé à la couronne. Henri établit la Seigneurie d\'Irlande — un arrangement constitutionnel qui lierait l\'Irlande à la couronne anglaise pendant huit siècles.',
      },
    },
    anchorYear: 1171,
  },
  {
    id: 'ani-treaty-windsor',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'places', center: [-6.27, 53.35], zoom: 7.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['dublin', 'waterford'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The Treaty of Windsor — two Irelands on paper',
      body: {
        en: 'In 1175, Henry II and Ruaidrí Ua Conchobair, the last recognised High King of Ireland, agreed the Treaty of Windsor. Ruaidrí acknowledged Henry as overlord and retained authority over the Gaelic west, while the Anglo-Norman lords kept Leinster, Meath, and the Norse port towns. On paper the treaty drew a line between two Irelands — one Anglo-Norman, one Gaelic. In practice, neither side respected the boundary for long, but the treaty crystallised a partition that would haunt Irish politics for centuries.',
        fr: 'En 1175, Henri II et Ruaidrí Ua Conchobair, le dernier haut-roi d\'Irlande reconnu, conclurent le traité de Windsor. Ruaidrí reconnaissait Henri comme suzerain et conservait l\'autorité sur l\'ouest gaélique, tandis que les seigneurs anglo-normands gardaient le Leinster, le Meath et les villes portuaires scandinaves. Sur le papier, le traité traçait une ligne entre deux Irlandes — l\'une anglo-normande, l\'autre gaélique. En pratique, aucun des deux camps ne respecta longtemps la frontière, mais le traité cristallisa une partition qui hanterait la politique irlandaise pendant des siècles.',
      },
    },
    anchorYear: 1175,
  },
  {
    id: 'ani-ulster-de-courcy',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'places', center: [-5.81, 54.71], zoom: 7.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['carrickfergus', 'dublin'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'John de Courcy — the conquest of Ulster',
      body: {
        en: 'In 1177, the Anglo-Norman knight John de Courcy launched an unauthorised invasion of Ulster with a small force. He defeated the local king Ruaidrí Mac Duinn Sléibe and seized Downpatrick, then built a great castle at Carrickfergus on Belfast Lough — the strongest Anglo-Norman fortress in Ireland. De Courcy carved out a virtually independent lordship in the north-east, importing settlers, founding monasteries, and minting his own coins. His adventure showed that Anglo-Norman expansion in Ireland was driven as much by individual ambition as by royal policy.',
        fr: 'En 1177, le chevalier anglo-normand Jean de Courcy lança une invasion non autorisée de l\'Ulster avec une petite troupe. Il vainquit le roi local Ruaidrí Mac Duinn Sléibe, s\'empara de Downpatrick, puis érigea un grand château à Carrickfergus sur le lough de Belfast — la plus puissante forteresse anglo-normande d\'Irlande. De Courcy se tailla une seigneurie quasi indépendante dans le nord-est, important des colons, fondant des monastères et frappant sa propre monnaie. Son aventure montra que l\'expansion anglo-normande en Irlande était portée autant par l\'ambition individuelle que par la politique royale.',
      },
    },
    anchorYear: 1177,
  },
  {
    id: 'ani-john-lordship',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'bbox', center: [-6.5, 52.8], zoom: 6.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['dublin', 'waterford'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Lord John — a prince in Ireland',
      body: {
        en: 'In 1185, Henry II sent his youngest son John to Ireland as Lord of Ireland — the first member of the English royal family to hold the title. John was nineteen and the visit was a disaster: he alienated both the Irish kings and the Anglo-Norman settlers. Yet the institutional machinery he brought — royal justiciars, a chancery, the beginnings of shire government — planted seeds that would outlast his humiliation. When John returned as king in 1210, the administrative framework he imposed would define English governance in Ireland for generations.',
        fr: 'En 1185, Henri II envoya son plus jeune fils Jean en Irlande comme seigneur d\'Irlande — le premier membre de la famille royale anglaise à porter ce titre. Jean avait dix-neuf ans et la visite fut un désastre : il s\'aliéna les rois irlandais comme les colons anglo-normands. Pourtant, la machine institutionnelle qu\'il apporta — des justiciers royaux, une chancellerie, les prémices d\'une administration de comtés — planta des graines qui survivraient à son humiliation. Quand Jean revint en roi en 1210, le cadre administratif qu\'il imposa définirait la gouvernance anglaise en Irlande pour des générations.',
      },
    },
    anchorYear: 1185,
  },
  {
    id: 'ani-john-expedition-1210',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'bbox', center: [-6.5, 53.0], zoom: 6.0, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['dublin', 'waterford', 'carrickfergus'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'King John\'s expedition — the crown reasserts control',
      body: {
        en: 'In 1210, King John crossed to Ireland with the largest royal army yet seen there. His targets were not the Gaelic Irish but his own barons: Hugh de Lacy, who had seized the earldom of Ulster, and William de Braose, a fugitive from English justice. John marched north, expelled de Lacy, and forced every Anglo-Norman lord to submit. He reissued English law, built royal castles at Dublin and elsewhere, and tightened the machinery of royal government. The expedition established that the Lordship of Ireland was a dependency of the English crown, not a playground for baronial adventurers.',
        fr: 'En 1210, le roi Jean traversa en Irlande avec la plus grande armée royale jamais vue sur l\'île. Ses cibles n\'étaient pas les Irlandais gaéliques mais ses propres barons : Hugues de Lacy, qui s\'était emparé du comté d\'Ulster, et Guillaume de Braose, un fugitif de la justice anglaise. Jean marcha vers le nord, expulsa de Lacy et força chaque seigneur anglo-normand à se soumettre. Il réémit le droit anglais, construisit des châteaux royaux à Dublin et ailleurs, et resserra les rouages du gouvernement royal. L\'expédition établit que la seigneurie d\'Irlande était une dépendance de la couronne anglaise, et non un terrain de jeu pour les aventuriers baroniaux.',
      },
    },
    anchorYear: 1210,
  },
  {
    id: 'ani-bruce-invasion',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'places', center: [-6.40, 54.00], zoom: 7.0, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['dundalk', 'dublin', 'carrickfergus'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The Bruce invasion — Ireland\'s forgotten war',
      body: {
        en: 'In 1315, Edward Bruce — brother of Scotland\'s Robert the Bruce — landed at Carrickfergus with a Scottish army and declared himself King of Ireland. For three years he ravaged the Anglo-Norman colony, defeating English forces repeatedly and marching as far south as Limerick. The invasion coincided with the Great Famine of 1315–1317, and the combined devastation shattered Anglo-Norman power outside the east coast. Edward Bruce was killed at the Battle of Faughart near Dundalk in 1318, but the colony never fully recovered. The invasion marked the beginning of the Gaelic resurgence that would steadily erode English control.',
        fr: 'En 1315, Édouard Bruce — frère de Robert Bruce d\'Écosse — débarqua à Carrickfergus avec une armée écossaise et se proclama roi d\'Irlande. Pendant trois ans il ravagea la colonie anglo-normande, battant les forces anglaises à plusieurs reprises et marchant jusqu\'à Limerick. L\'invasion coïncida avec la Grande Famine de 1315-1317, et la dévastation combinée brisa le pouvoir anglo-normand en dehors de la côte est. Édouard Bruce fut tué à la bataille de Faughart près de Dundalk en 1318, mais la colonie ne s\'en remit jamais pleinement. L\'invasion marqua le début de la résurgence gaélique qui allait éroder progressivement le contrôle anglais.',
      },
    },
    anchorYear: 1316,
  },
  {
    id: 'ani-statutes-kilkenny',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'places', center: [-7.25, 52.65], zoom: 7.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['kilkenny', 'dublin'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The Statutes of Kilkenny — drawing the line',
      body: {
        en: 'In 1366, the Irish Parliament met at Kilkenny and passed the most famous legislation of medieval Ireland. The Statutes of Kilkenny prohibited the English colonists from speaking Irish, adopting Irish dress, marrying Irish partners, or using Brehon law. The statutes were a panicked reaction to the Gaelicisation of the Anglo-Norman settlers — proof that the colony was losing its distinct identity. In practice the statutes were unenforceable outside the Pale, but they formalised the cultural frontier between "English Ireland" and "Gaelic Ireland" that would define the island\'s politics deep into the early modern period.',
        fr: 'En 1366, le Parlement irlandais se réunit à Kilkenny et adopta la législation la plus célèbre de l\'Irlande médiévale. Les Statuts de Kilkenny interdisaient aux colons anglais de parler irlandais, d\'adopter le costume irlandais, de se marier avec des Irlandais ou de recourir au droit brehon. Les statuts étaient une réaction paniquée à la gaélicisation des colons anglo-normands — la preuve que la colonie perdait son identité distincte. En pratique, les statuts étaient inapplicables en dehors du Pale, mais ils formalisèrent la frontière culturelle entre « l\'Irlande anglaise » et « l\'Irlande gaélique » qui définirait la politique de l\'île bien avant dans la période moderne.',
      },
    },
    anchorYear: 1366,
  },
  {
    id: 'ani-legacy-lordship',
    eraId: 'norman-expansion',
    arcId: 'anglonorman-ireland',
    camera: { target: 'bbox', center: [-7.0, 53.0], zoom: 5.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['dublin', 'waterford', 'wexford', 'kilkenny', 'carrickfergus'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Two Irelands — the Norman legacy',
      body: {
        en: 'Two centuries after Strongbow\'s landing, the Anglo-Norman colony had contracted to a strip of the east coast — the Pale around Dublin — and a handful of fortified towns. The west and north were firmly Gaelic; in between, families who had arrived as conquerors now spoke Irish, followed Brehon law, and married into Gaelic dynasties. They became, as the famous phrase went, "more Irish than the Irish themselves." The Norman imprint endured in castles, town charters, common law, and the very idea that Ireland was a lordship of the English crown — an inheritance that would shape the island\'s troubled relationship with England for centuries to come.',
        fr: 'Deux siècles après le débarquement de Strongbow, la colonie anglo-normande s\'était rétrécie à une bande de la côte est — le Pale autour de Dublin — et une poignée de villes fortifiées. L\'ouest et le nord étaient fermement gaéliques ; entre les deux, des familles arrivées en conquérants parlaient désormais irlandais, suivaient le droit brehon et s\'alliaient aux dynasties gaéliques. Elles devinrent, selon l\'expression célèbre, « plus irlandaises que les Irlandais eux-mêmes ». L\'empreinte normande perdura dans les châteaux, les chartes urbaines, la common law et l\'idée même que l\'Irlande était une seigneurie de la couronne anglaise — un héritage qui façonnerait la relation tourmentée de l\'île avec l\'Angleterre pendant des siècles.',
      },
    },
    anchorYear: 1400,
  },

  // ── David I — the Norman king of Scots ──────────────────────────
  {
    id: 'ds-english-upbringing',
    eraId: 'norman-expansion',
    arcId: 'david-i-scotland',
    camera: { target: 'places', center: [-0.13, 51.51], zoom: 7.0, durationMs: 2400, easing: 'easeInOutCubic' },
    focus: { placeIds: ['london'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'A Scottish prince at the English court',
      body: {
        en: 'David, youngest son of Malcolm III and the English princess Margaret, spent his formative years at the court of Henry I of England. He absorbed Anglo-Norman culture — feudal landholding, monastic reform, castle-building, the rituals of chivalry. When he returned to Scotland, first as Earl of Huntingdon and then as king in 1124, he brought with him a vision of how a kingdom should be governed. He also brought Anglo-Norman followers who would become some of Scotland\'s most powerful families: Bruce, Stewart, Comyn, Balliol.',
        fr: 'David, plus jeune fils de Malcolm III et de la princesse anglaise Marguerite, passa ses années de formation à la cour d\'Henri Ier d\'Angleterre. Il absorba la culture anglo-normande — tenure féodale, réforme monastique, construction de châteaux, rituels chevaleresques. Quand il revint en Écosse, d\'abord comme comte de Huntingdon puis comme roi en 1124, il apportait une vision de la façon dont un royaume devait être gouverné. Il amena aussi des partisans anglo-normands qui deviendraient certaines des familles les plus puissantes d\'Écosse : Bruce, Stewart, Comyn, Balliol.',
      },
    },
    anchorYear: 1100,
  },
  {
    id: 'ds-foundations',
    eraId: 'norman-expansion',
    arcId: 'david-i-scotland',
    camera: { target: 'bbox', center: [-2.8, 55.8], zoom: 6.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['jedburgh', 'dunfermline', 'edinburgh'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Abbeys, burghs, and a feudal kingdom',
      body: {
        en: 'David I transformed Scotland through Anglo-Norman institutions. He founded or patronised at least fifteen major monasteries — Jedburgh, Kelso, Melrose, Holyrood, Dunfermline — importing monks from England and France. He created royal burghs with trading privileges, introduced a feudal land system with knights\' fees and baronies, and established a system of sheriffs and royal justiciars modelled on the English Exchequer. Scotland\'s existing Gaelic and Norse institutions were not destroyed but overlaid with a Norman-style administrative framework.',
        fr: 'David Ier transforma l\'Écosse par les institutions anglo-normandes. Il fonda ou patronna au moins quinze grands monastères — Jedburgh, Kelso, Melrose, Holyrood, Dunfermline — important des moines d\'Angleterre et de France. Il créa des bourgs royaux avec des privilèges commerciaux, introduisit un système foncier féodal avec fiefs de chevaliers et baronnies, et établit un système de shérifs et de justiciers royaux calqué sur l\'Échiquier anglais. Les institutions gaéliques et scandinaves existantes de l\'Écosse ne furent pas détruites mais recouvertes d\'un cadre administratif de style normand.',
      },
    },
    anchorYear: 1128,
  },
  {
    id: 'ds-battle-standard',
    eraId: 'norman-expansion',
    arcId: 'david-i-scotland',
    camera: { target: 'places', center: [-1.43, 54.34], zoom: 8.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['northallerton', 'edinburgh'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The Battle of the Standard — Anglo-Normans on both sides',
      body: {
        en: 'In 1138, during the Anarchy, David invaded northern England in support of his niece Matilda. At Northallerton on 22 August, his army was defeated by an English force rallied around a mast bearing the banners of northern saints — the "Standard." The irony was unmistakable: Anglo-Norman knights fought on both sides. David\'s army included Norman lords from his own court alongside Gaelic levies from the Highlands. The battle demonstrated how thoroughly Anglo-Norman military culture had penetrated Scotland — and how the Anarchy had blurred the line between English and Scottish politics.',
        fr: 'En 1138, pendant l\'Anarchie, David envahit le nord de l\'Angleterre pour soutenir sa nièce Mathilde. À Northallerton le 22 août, son armée fut battue par une force anglaise ralliée autour d\'un mât portant les bannières des saints du nord — le « Standard ». L\'ironie était flagrante : des chevaliers anglo-normands combattaient des deux côtés. L\'armée de David comprenait des seigneurs normands de sa propre cour aux côtés de levées gaéliques des Highlands. La bataille démontra à quel point la culture militaire anglo-normande avait pénétré l\'Écosse — et comment l\'Anarchie avait brouillé la frontière entre politique anglaise et écossaise.',
      },
    },
    anchorYear: 1138,
  },
  {
    id: 'ds-legacy',
    eraId: 'norman-expansion',
    arcId: 'david-i-scotland',
    camera: { target: 'bbox', center: [-3.0, 56.0], zoom: 6.0, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['edinburgh', 'dunfermline', 'jedburgh'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The Davidian revolution',
      body: {
        en: 'David I died at Carlisle in 1153. Historians call his reign the "Davidian revolution" — the most concentrated period of institutional change in Scottish history. The Anglo-Norman families he settled in Scotland — Bruce in Annandale, Stewart in Renfrewshire, Balliol in Galloway — would contest the Scottish crown for centuries. The monasteries, burghs, and administrative structures he created formed the backbone of the medieval Scottish state. Scotland was not conquered by the Normans; it was reshaped by a Scottish king who had learned their methods.',
        fr: 'David Ier mourut à Carlisle en 1153. Les historiens appellent son règne la « révolution davidienne » — la période de changement institutionnel la plus concentrée de l\'histoire écossaise. Les familles anglo-normandes qu\'il installa en Écosse — Bruce dans l\'Annandale, Stewart dans le Renfrewshire, Balliol dans le Galloway — disputeraient la couronne écossaise pendant des siècles. Les monastères, bourgs et structures administratives qu\'il créa formèrent la colonne vertébrale de l\'État écossais médiéval. L\'Écosse ne fut pas conquise par les Normands ; elle fut remodelée par un roi écossais qui avait appris leurs méthodes.',
      },
    },
    anchorYear: 1153,
  },

  // ── William the Lion — Scotland and the Angevins ────────────────
  {
    id: 'wl-accession',
    eraId: 'norman-expansion',
    arcId: 'william-lion-and-angevin',
    camera: { target: 'places', center: [-3.19, 55.95], zoom: 7.0, durationMs: 2400, easing: 'easeInOutCubic' },
    focus: { placeIds: ['edinburgh'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'William the Lion — a young king\'s ambition',
      body: {
        en: 'William became king of Scots in 1165 at the age of twenty-two, succeeding his brother Malcolm IV. He inherited David I\'s Anglo-Norman institutions and his grandfather\'s claim to the earldom of Northumbria — a claim that would drive Scottish foreign policy for his entire reign. William was energetic, stubborn, and determined to recover the northern English counties that David I had held during the Anarchy but that Henry II had forced Malcolm IV to surrender. Scotland under William was a feudal kingdom looking south.',
        fr: 'Guillaume devint roi d\'Écosse en 1165 à vingt-deux ans, succédant à son frère Malcolm IV. Il héritait des institutions anglo-normandes de David Ier et de la revendication de son grand-père sur le comté de Northumbrie — une prétention qui guiderait la politique étrangère écossaise pendant tout son règne. Guillaume était énergique, obstiné et déterminé à récupérer les comtés du nord de l\'Angleterre que David Ier avait tenus pendant l\'Anarchie mais qu\'Henri II avait forcé Malcolm IV à abandonner. L\'Écosse sous Guillaume était un royaume féodal regardant vers le sud.',
      },
    },
    anchorYear: 1165,
  },
  {
    id: 'wl-alnwick-capture',
    eraId: 'norman-expansion',
    arcId: 'william-lion-and-angevin',
    camera: { target: 'bbox', center: [-1.7, 55.4], zoom: 7.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['edinburgh'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Alnwick — the king in chains',
      body: {
        en: 'In 1174, William invaded northern England during the great rebellion against Henry II. On 13 July, while besieging Alnwick Castle in fog, he was surprised by an English force and captured. A Scottish king in English chains — it was a humiliation without precedent. William was taken south to Normandy, where Henry forced him to sign the Treaty of Falaise. Scotland became a feudal vassal of England, its castles garrisoned by English troops, its Church subordinated to Canterbury. The treaty was the harshest terms any Scottish king had ever accepted.',
        fr: 'En 1174, Guillaume envahit le nord de l\'Angleterre pendant la grande révolte contre Henri II. Le 13 juillet, alors qu\'il assiégeait le château d\'Alnwick dans le brouillard, il fut surpris par une force anglaise et capturé. Un roi écossais enchaîné par les Anglais — une humiliation sans précédent. Guillaume fut emmené en Normandie, où Henri le contraignit à signer le traité de Falaise. L\'Écosse devint vassale féodale de l\'Angleterre, ses châteaux garnis de troupes anglaises, son Église subordonnée à Cantorbéry. Le traité imposait les conditions les plus dures jamais acceptées par un roi écossais.',
      },
    },
    anchorYear: 1174,
  },
  {
    id: 'wl-quitclaim',
    eraId: 'norman-expansion',
    arcId: 'william-lion-and-angevin',
    camera: { target: 'bbox', center: [-1.5, 54.0], zoom: 5.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['edinburgh', 'london'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The Quitclaim of Canterbury — freedom bought',
      body: {
        en: 'In 1189, the new English king Richard I needed money for the Third Crusade. William seized the opportunity: he paid Richard 10,000 marks of silver — an enormous sum — to cancel the Treaty of Falaise. The Quitclaim of Canterbury restored Scottish independence and freed the Scottish Church from English control. It was a diplomatic masterstroke purchased at a price William could barely afford. Scotland was free again, but the underlying tension between the two kingdoms — English claims to overlordship, Scottish insistence on sovereignty — would define Anglo-Scottish relations for centuries.',
        fr: 'En 1189, le nouveau roi anglais Richard Ier avait besoin d\'argent pour la Troisième Croisade. Guillaume saisit l\'occasion : il paya Richard 10 000 marcs d\'argent — une somme énorme — pour annuler le traité de Falaise. La Quitclaim de Canterbury restaura l\'indépendance écossaise et libéra l\'Église d\'Écosse du contrôle anglais. Ce fut un coup diplomatique magistral acheté à un prix que Guillaume pouvait à peine se permettre. L\'Écosse était libre de nouveau, mais la tension sous-jacente entre les deux royaumes — les prétentions anglaises à la suzeraineté, l\'insistance écossaise sur la souveraineté — définirait les relations anglo-écossaises pendant des siècles.',
      },
    },
    anchorYear: 1189,
  },
  {
    id: 'wl-legacy',
    eraId: 'norman-expansion',
    arcId: 'william-lion-and-angevin',
    camera: { target: 'bbox', center: [-3.0, 56.0], zoom: 5.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['edinburgh', 'dunfermline'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The longest reign — Scotland between two worlds',
      body: {
        en: 'William the Lion reigned for forty-nine years — the longest of any medieval Scottish king — dying in 1214. His Scotland was thoroughly Anglo-Norman in its institutions: feudal tenure, burgh charters, Augustinian and Cistercian abbeys, royal justice administered by sheriffs. Yet it remained a distinct kingdom with its own laws, Church, and identity. The Anglo-Norman transformation of Scotland was not colonisation but adoption — a ruling class that chose Norman methods to build a stronger state. The families William settled and the institutions he strengthened would carry Scotland through the Wars of Independence and beyond.',
        fr: 'Guillaume le Lion régna quarante-neuf ans — le plus long règne de tout roi écossais médiéval — mourant en 1214. Son Écosse était profondément anglo-normande dans ses institutions : tenure féodale, chartes de bourgs, abbayes augustiniennes et cisterciennes, justice royale administrée par des shérifs. Pourtant elle restait un royaume distinct avec ses propres lois, Église et identité. La transformation anglo-normande de l\'Écosse ne fut pas une colonisation mais une adoption — une classe dirigeante qui choisit les méthodes normandes pour bâtir un État plus fort. Les familles que Guillaume installa et les institutions qu\'il renforça porteraient l\'Écosse à travers les guerres d\'Indépendance et au-delà.',
      },
    },
    anchorYear: 1214,
  },

  // ── Thomas Becket — murder in the cathedral ─────────────────────
  {
    id: 'tb-chancellor',
    eraId: 'norman-expansion',
    arcId: 'thomas-becket',
    camera: { target: 'places', center: [-0.13, 51.51], zoom: 8.0, durationMs: 2400, easing: 'easeInOutCubic' },
    focus: { placeIds: ['london'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'The king\'s man',
      body: {
        en: 'Thomas Becket rose from the London merchant class to become Henry II\'s chancellor in 1155 — the most powerful minister in England. He was everything the young king needed: brilliant, tireless, and utterly loyal. He lived in magnificent style, led military campaigns in France, and managed the machinery of Angevin government. Henry trusted him completely. When the archbishopric of Canterbury fell vacant in 1162, Henry had what seemed an obvious solution: make Becket archbishop, and control both Church and state through one man.',
        fr: 'Thomas Becket s\'éleva de la bourgeoisie marchande de Londres pour devenir le chancelier d\'Henri II en 1155 — le ministre le plus puissant d\'Angleterre. Il était tout ce dont le jeune roi avait besoin : brillant, infatigable et d\'une loyauté absolue. Il vivait dans un faste magnifique, menait des campagnes militaires en France et gérait la machinerie du gouvernement angevin. Henri lui faisait entièrement confiance. Quand l\'archevêché de Cantorbéry devint vacant en 1162, Henri eut ce qui semblait une solution évidente : faire de Becket archevêque, et contrôler Église et État à travers un seul homme.',
      },
    },
    anchorYear: 1155,
  },
  {
    id: 'tb-archbishop-conflict',
    eraId: 'norman-expansion',
    arcId: 'thomas-becket',
    camera: { target: 'places', center: [1.08, 51.28], zoom: 7.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['canterbury', 'london'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Archbishop — and the king\'s enemy',
      body: {
        en: 'The plan backfired spectacularly. Once consecrated archbishop, Becket transformed himself from royal servant to champion of Church independence. He resigned the chancellorship, adopted an austere lifestyle, and opposed Henry on every front — Church courts, ecclesiastical appointments, royal taxation of clergy. Henry was stunned and furious. Their friendship curdled into the bitterest political feud in English medieval history. The Constitutions of Clarendon (1164), Henry\'s attempt to define and limit Church privileges, became the flashpoint.',
        fr: 'Le plan se retourna spectaculairement. Une fois consacré archevêque, Becket se transforma de serviteur royal en champion de l\'indépendance de l\'Église. Il renonça à la chancellerie, adopta un style de vie austère et s\'opposa à Henri sur tous les fronts — tribunaux ecclésiastiques, nominations cléricales, imposition royale du clergé. Henri fut stupéfait et furieux. Leur amitié se mua en la querelle politique la plus amère de l\'histoire médiévale anglaise. Les Constitutions de Clarendon (1164), tentative d\'Henri de définir et limiter les privilèges ecclésiastiques, devinrent le point d\'ignition.',
      },
    },
    anchorYear: 1164,
  },
  {
    id: 'tb-exile',
    eraId: 'norman-expansion',
    arcId: 'thomas-becket',
    camera: { target: 'bbox', center: [1.0, 50.0], zoom: 5.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['canterbury', 'northampton'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'Exile and obstinacy',
      body: {
        en: 'After the Council of Northampton in October 1164 — where Henry attempted to try Becket for contempt and financial misconduct — Becket fled England. He spent six years in exile in France, appealing to Pope Alexander III, excommunicating Henry\'s supporters, and refusing every compromise. Henry and Becket were locked in a struggle that neither could win and neither would abandon. The exile poisoned Anglo-Norman politics: bishops were torn between king and pope, barons between feudal loyalty and religious conscience.',
        fr: 'Après le concile de Northampton en octobre 1164 — où Henri tenta de juger Becket pour outrage et malversation financière — Becket s\'enfuit d\'Angleterre. Il passa six ans en exil en France, faisant appel au pape Alexandre III, excommuniant les partisans d\'Henri et refusant tout compromis. Henri et Becket étaient enfermés dans une lutte qu\'aucun ne pouvait gagner et qu\'aucun ne voulait abandonner. L\'exil empoisonna la politique anglo-normande : les évêques étaient tiraillés entre roi et pape, les barons entre loyauté féodale et conscience religieuse.',
      },
    },
    anchorYear: 1164,
  },
  {
    id: 'tb-murder',
    eraId: 'norman-expansion',
    arcId: 'thomas-becket',
    camera: { target: 'places', center: [1.08, 51.28], zoom: 8.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['canterbury'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Murder in the cathedral — 29 December 1170',
      body: {
        en: 'Becket returned to Canterbury in December 1170 after a fragile reconciliation. Within weeks, he excommunicated three bishops who had supported Henry. The king, in Normandy, erupted in rage — and four knights took his words as a command. On 29 December, Reginald fitzUrse, Hugh de Morville, William de Tracy, and Richard le Breton entered Canterbury Cathedral and killed Becket before the altar. The murder shocked Christendom. Within three years Becket was canonised, Canterbury became the greatest pilgrimage site in England, and Henry was forced to do public penance at Becket\'s tomb.',
        fr: 'Becket revint à Cantorbéry en décembre 1170 après une réconciliation fragile. En quelques semaines, il excommunia trois évêques qui avaient soutenu Henri. Le roi, en Normandie, explosa de rage — et quatre chevaliers prirent ses paroles pour un ordre. Le 29 décembre, Reginald fitzUrse, Hugues de Morville, Guillaume de Tracy et Richard le Breton entrèrent dans la cathédrale de Cantorbéry et tuèrent Becket devant l\'autel. Le meurtre choqua la chrétienté. En trois ans, Becket fut canonisé, Cantorbéry devint le plus grand lieu de pèlerinage d\'Angleterre, et Henri fut contraint de faire pénitence publique sur la tombe de Becket.',
      },
    },
    anchorYear: 1170,
  },
  {
    id: 'tb-legacy',
    eraId: 'norman-expansion',
    arcId: 'thomas-becket',
    camera: { target: 'places', center: [1.08, 51.28], zoom: 7.0, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['canterbury', 'london'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Saint, symbol, and the limits of royal power',
      body: {
        en: 'The Becket affair defined the limits of Anglo-Norman kingship. Henry II was the most powerful monarch in western Europe, yet he could not bend the Church to his will. The cult of St Thomas became an international phenomenon — pilgrims from across Europe flowed to Canterbury for centuries. More importantly, Becket\'s stand established a principle that would echo through English constitutional history: that there were boundaries even a king could not cross, and that conscience could stand against power. The Angevin legal reforms survived; so did the Church\'s independence.',
        fr: 'L\'affaire Becket définit les limites de la royauté anglo-normande. Henri II était le monarque le plus puissant d\'Europe occidentale, pourtant il ne put plier l\'Église à sa volonté. Le culte de saint Thomas devint un phénomène international — des pèlerins de toute l\'Europe affluèrent à Cantorbéry pendant des siècles. Plus important encore, la résistance de Becket établit un principe qui résonnerait à travers l\'histoire constitutionnelle anglaise : qu\'il existait des limites qu\'un roi ne pouvait franchir, et que la conscience pouvait résister au pouvoir. Les réformes juridiques angevines survécurent ; l\'indépendance de l\'Église aussi.',
      },
    },
    anchorYear: 1173,
  },

  // ── Samuel de Champlain guided arc ──────────────────────────────────
  {
    id: 'chpl-beat-brouage',
    eraId: 'age-of-exploration',
    arcId: 'samuel-de-champlain',
    camera: {
      target: 'places',
      center: [-1.15, 46.16],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['la-rochelle'],
      regionIds: ['aunis'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Brouage — a navigator is born',
      body: {
        en: 'Samuel de Champlain was born around 1574 in Brouage, a fortified salt port on the Saintonge coast. The town\'s Atlantic trade and its proximity to La Rochelle shaped a young man who would spend his life navigating between France and the New World.',
        fr: 'Samuel de Champlain naquit vers 1574 à Brouage, port fortifié du sel sur la côte saintongeaise. Le commerce atlantique de la ville et sa proximité avec La Rochelle formèrent un jeune homme qui passerait sa vie à naviguer entre la France et le Nouveau Monde.',
      },
    },
    anchorYear: 1574,
  },
  {
    id: 'chpl-beat-first-crossings',
    eraId: 'age-of-exploration',
    arcId: 'samuel-de-champlain',
    camera: {
      target: 'bbox',
      center: [-28.0, 47.0],
      zoom: 2.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['honfleur', 'la-rochelle', 'mid-atlantic-passage'],
      regionIds: ['atlantic-basin'],
      routeSegmentIds: ['seg-honfleur-atlantic'],
    },
    presentation: {
      routeHighlightMode: 'kind',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'First crossings — learning the Atlantic',
      body: {
        en: 'Before Canada, Champlain sailed to the Spanish West Indies and Central America (1599–1601), sharpening the navigational and observational skills that would define his career. He returned with maps, drawings, and a conviction that France must plant colonies in the New World.',
        fr: 'Avant le Canada, Champlain navigua vers les Antilles espagnoles et l\'Amérique centrale (1599-1601), affinant les compétences de navigation et d\'observation qui définiront sa carrière. Il revint avec cartes, dessins et la conviction que la France devait fonder des colonies dans le Nouveau Monde.',
      },
    },
    anchorYear: 1601,
  },
  {
    id: 'chpl-beat-acadia',
    eraId: 'age-of-exploration',
    arcId: 'samuel-de-champlain',
    camera: {
      target: 'places',
      center: [-65.52, 44.74],
      zoom: 5.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['port-royal', 'la-rochelle'],
      regionIds: ['acadia', 'aunis'],
      routeSegmentIds: ['seg-la-rochelle-atlantic', 'seg-atlantic-port-royal'],
      journeyIds: ['journey-la-rochelle-acadia'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Acadia — the first colony attempt',
      body: {
        en: 'In 1604, under Pierre Dugua de Mons\'s royal monopoly, Champlain helped establish a settlement at Île Sainte-Croix, then Port-Royal. The harsh winters killed many, but Champlain mapped the coast from Cape Cod to the Bay of Fundy — knowledge that would guide his next, decisive venture.',
        fr: 'En 1604, sous le monopole royal de Pierre Dugua de Mons, Champlain participa à l\'établissement d\'une colonie à l\'île Sainte-Croix, puis à Port-Royal. Les hivers rigoureux tuèrent beaucoup, mais Champlain cartographia la côte du cap Cod à la baie de Fundy — un savoir qui guidera son prochain projet, décisif.',
      },
    },
    anchorYear: 1604,
  },
  {
    id: 'chpl-beat-founding-quebec',
    eraId: 'new-france-foundations',
    arcId: 'samuel-de-champlain',
    camera: {
      target: 'places',
      center: [-71.21, 46.81],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'tadoussac'],
      regionIds: ['new-france'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Québec — 3 July 1608',
      body: {
        en: 'Champlain chose the narrows of the St. Lawrence — Kebec in Algonquin — for a permanent habitation. The fortified post sat below the cliff, overlooking the river where it contracts to rifle-shot width. It was a trader\'s chokepoint and a strategist\'s dream. The colony of New France had its capital.',
        fr: 'Champlain choisit le rétrécissement du Saint-Laurent — Kebec en algonquin — pour une habitation permanente. Le poste fortifié se dressait au pied de la falaise, dominant le fleuve là où il se resserre à portée de mousquet. C\'était un verrou commercial et un rêve de stratège. La Nouvelle-France avait sa capitale.',
      },
    },
    anchorYear: 1608,
  },
  {
    id: 'chpl-beat-alliances',
    eraId: 'new-france-foundations',
    arcId: 'samuel-de-champlain',
    camera: {
      target: 'bbox',
      center: [-74.0, 44.5],
      zoom: 5.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'montreal', 'lake-huron-node'],
      regionIds: ['new-france'],
      routeSegmentIds: ['seg-champlain-quebec-huron'],
      journeyIds: ['journey-champlain-great-lakes'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Alliances that shaped a continent',
      body: {
        en: 'Champlain forged alliances with the Wendat (Huron), Algonquin, and Montagnais nations — commitments sealed by war against the Haudenosaunee in 1609. These partnerships defined New France\'s diplomacy for a century: the colony survived because Indigenous nations chose to trade with and fight alongside the French.',
        fr: 'Champlain forgea des alliances avec les Wendats (Hurons), les Algonquins et les Montagnais — engagements scellés par la guerre contre les Haudenosaunee en 1609. Ces partenariats définirent la diplomatie de la Nouvelle-France pendant un siècle : la colonie survécut parce que les nations autochtones choisirent de commercer et de combattre aux côtés des Français.',
      },
    },
    anchorYear: 1609,
  },
  {
    id: 'chpl-beat-great-lakes',
    eraId: 'new-france-foundations',
    arcId: 'samuel-de-champlain',
    camera: {
      target: 'bbox',
      center: [-79.0, 44.5],
      zoom: 4.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'montreal', 'lake-huron-node', 'great-lakes-hub'],
      regionIds: ['new-france'],
      routeSegmentIds: ['seg-champlain-quebec-huron'],
      journeyIds: ['journey-champlain-great-lakes'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Into the interior — the Great Lakes',
      body: {
        en: 'In 1615 Champlain pushed up the Ottawa River to Lake Huron and wintered among the Wendat — the deepest penetration of the continent by a French leader to that date. His journey revealed the immense scale of the land France had claimed: an interior of lakes, rivers, and nations stretching beyond any European map.',
        fr: 'En 1615, Champlain remonta l\'Outaouais jusqu\'au lac Huron et hiverna chez les Wendats — la pénétration la plus profonde du continent par un dirigeant français à cette date. Son voyage révéla l\'échelle immense de la terre que la France avait revendiquée : un intérieur de lacs, de rivières et de nations s\'étendant au-delà de toute carte européenne.',
      },
    },
    anchorYear: 1615,
  },
  {
    id: 'chpl-beat-cartographer',
    eraId: 'new-france-foundations',
    arcId: 'samuel-de-champlain',
    camera: {
      target: 'bbox',
      center: [-55.0, 47.0],
      zoom: 3.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'port-royal', 'tadoussac', 'gaspe-peninsula'],
      regionIds: ['new-france', 'acadia', 'atlantic-basin'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The cartographer\'s legacy',
      body: {
        en: 'Champlain\'s 1632 map of New France was the most accurate depiction of northeastern North America in existence. Compiled from decades of personal observation, Indigenous testimony, and careful draftsmanship, it guided navigators and administrators for generations. He was as much mapmaker as governor — and his maps outlasted every building he raised.',
        fr: 'La carte de 1632 de Champlain de la Nouvelle-France était la représentation la plus précise du nord-est de l\'Amérique du Nord. Compilée à partir de décennies d\'observation personnelle, de témoignages autochtones et de dessin minutieux, elle guida navigateurs et administrateurs pendant des générations. Il était autant cartographe que gouverneur — et ses cartes survécurent à chaque édifice qu\'il érigea.',
      },
    },
    anchorYear: 1632,
  },
  {
    id: 'chpl-beat-death',
    eraId: 'new-france-foundations',
    arcId: 'samuel-de-champlain',
    camera: {
      target: 'places',
      center: [-71.21, 46.81],
      zoom: 7.2,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city'],
      regionIds: ['new-france'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Death at Québec — Christmas 1635',
      body: {
        en: 'Champlain died on 25 December 1635 in the settlement he had founded twenty-seven years earlier. He left behind a colony of barely three hundred souls, a web of Indigenous alliances, and the most detailed maps of any French territory overseas. History would call him the Father of New France.',
        fr: 'Champlain mourut le 25 décembre 1635 dans l\'établissement qu\'il avait fondé vingt-sept ans plus tôt. Il laissait une colonie d\'à peine trois cents âmes, un réseau d\'alliances autochtones et les cartes les plus détaillées de tout territoire français d\'outre-mer. L\'histoire le surnommerait le Père de la Nouvelle-France.',
      },
    },
    anchorYear: 1635,
  },

  // ── Jacques Cartier guided arc ──────────────────────────────────────
  {
    id: 'jcar-beat-saint-malo',
    eraId: 'age-of-exploration',
    arcId: 'jacques-cartier',
    camera: {
      target: 'places',
      center: [-2.02, 48.65],
      zoom: 7.2,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['saint-malo'],
      regionIds: ['brittany'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Saint-Malo — city of corsairs',
      body: {
        en: 'Jacques Cartier was born in 1491 in Saint-Malo, the walled Breton port whose mariners already fished the Grand Banks of Newfoundland. The town sat at the junction of Breton and Norman maritime worlds — a natural springboard for Atlantic exploration.',
        fr: 'Jacques Cartier naquit en 1491 à Saint-Malo, le port breton fortifié dont les marins pêchaient déjà sur les Grands Bancs de Terre-Neuve. La ville se trouvait à la jonction des mondes maritimes breton et normand — un tremplin naturel pour l\'exploration atlantique.',
      },
    },
    anchorYear: 1491,
  },
  {
    id: 'jcar-beat-first-voyage',
    eraId: 'age-of-exploration',
    arcId: 'jacques-cartier',
    camera: {
      target: 'bbox',
      center: [-45.0, 48.0],
      zoom: 2.8,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['saint-malo', 'gaspe-peninsula'],
      regionIds: ['atlantic-basin'],
      routeSegmentIds: ['seg-cartier-atlantic'],
      journeyIds: ['journey-cartier'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'First voyage — 1534',
      body: {
        en: 'Commissioned by Francis I, Cartier sailed from Saint-Malo on 20 April 1534 with two ships. He crossed the Atlantic in twenty days, entered the Gulf of St. Lawrence, and mapped the coasts of Newfoundland, Prince Edward Island, and the Gaspé Peninsula — the first systematic French reconnaissance of the region.',
        fr: 'Mandaté par François Ier, Cartier quitta Saint-Malo le 20 avril 1534 avec deux navires. Il traversa l\'Atlantique en vingt jours, entra dans le golfe du Saint-Laurent et cartographia les côtes de Terre-Neuve, de l\'Île-du-Prince-Édouard et de la Gaspésie — la première reconnaissance française systématique de la région.',
      },
    },
    anchorYear: 1534,
  },
  {
    id: 'jcar-beat-gaspe',
    eraId: 'age-of-exploration',
    arcId: 'jacques-cartier',
    camera: {
      target: 'places',
      center: [-64.48, 48.83],
      zoom: 6.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['gaspe-peninsula'],
      regionIds: [],
      routeSegmentIds: ['seg-cartier-gulf-stadacona'],
      journeyIds: ['journey-cartier'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'The cross at Gaspé',
      body: {
        en: 'At Gaspé Bay, Cartier erected a ten-metre wooden cross bearing the arms of France — an act of possession that the local chief Donnacona did not welcome. Cartier took Donnacona\'s two sons back to France, beginning a fraught relationship between European claims and Indigenous sovereignty that would define the next two centuries.',
        fr: 'À la baie de Gaspé, Cartier planta une croix de dix mètres aux armes de la France — un acte de prise de possession que le chef local Donnacona n\'accueillit pas favorablement. Cartier emmena les deux fils de Donnacona en France, inaugurant une relation tendue entre les revendications européennes et la souveraineté autochtone qui définirait les deux siècles suivants.',
      },
    },
    anchorYear: 1534,
  },
  {
    id: 'jcar-beat-stadacona',
    eraId: 'age-of-exploration',
    arcId: 'jacques-cartier',
    camera: {
      target: 'places',
      center: [-71.21, 46.81],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city', 'gaspe-peninsula'],
      regionIds: ['new-france'],
      routeSegmentIds: ['seg-cartier-gulf-stadacona'],
      journeyIds: ['journey-cartier'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Stadacona — the second voyage',
      body: {
        en: 'In 1535, guided by Donnacona\'s sons, Cartier sailed up the St. Lawrence to Stadacona — a thriving village on the site of present-day Québec. He wintered there, losing twenty-five men to scurvy before local knowledge of white cedar tea saved the rest. The river was open, and its nations were powerful.',
        fr: 'En 1535, guidé par les fils de Donnacona, Cartier remonta le Saint-Laurent jusqu\'à Stadaconé — un village florissant sur le site de l\'actuel Québec. Il y passa l\'hiver, perdant vingt-cinq hommes du scorbut avant qu\'une tisane d\'annedda (cèdre blanc) transmise par les locaux ne sauve le reste. Le fleuve était ouvert, et ses nations étaient puissantes.',
      },
    },
    anchorYear: 1535,
  },
  {
    id: 'jcar-beat-hochelaga',
    eraId: 'age-of-exploration',
    arcId: 'jacques-cartier',
    camera: {
      target: 'places',
      center: [-73.57, 45.50],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['montreal', 'quebec-city'],
      regionIds: ['new-france'],
      routeSegmentIds: ['seg-cartier-stadacona-hochelaga'],
      journeyIds: ['journey-cartier'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes', 'destinations'],
    },
    copy: {
      title: 'Hochelaga — the mountain',
      body: {
        en: 'Against Donnacona\'s advice, Cartier pressed upstream to Hochelaga, a large palisaded town at the foot of Mont Royal. From the summit he saw the St. Lawrence rapids that blocked further progress and the vast forested interior beyond. He named the mountain — and gave Montréal its name.',
        fr: 'Malgré les avertissements de Donnacona, Cartier remonta le fleuve jusqu\'à Hochelaga, grande ville palissadée au pied du mont Royal. Du sommet, il vit les rapides du Saint-Laurent qui bloquaient toute avancée et l\'immense intérieur forestier au-delà. Il nomma la montagne — et donna à Montréal son nom.',
      },
    },
    anchorYear: 1535,
  },
  {
    id: 'jcar-beat-third-voyage',
    eraId: 'age-of-exploration',
    arcId: 'jacques-cartier',
    camera: {
      target: 'bbox',
      center: [-45.0, 48.0],
      zoom: 3.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['saint-malo', 'quebec-city'],
      regionIds: ['atlantic-basin', 'new-france'],
      routeSegmentIds: ['seg-cartier-atlantic', 'seg-cartier-gulf-stadacona'],
      journeyIds: ['journey-cartier'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'Third voyage — failure and diamonds',
      body: {
        en: 'Cartier\'s 1541–42 expedition aimed to found a permanent colony and find the fabled Kingdom of Saguenay. He built a fort above Stadacona, collected what he believed were diamonds and gold — they were quartz and pyrite. Roberval arrived with colonists but the venture collapsed. France would not return in force for sixty years.',
        fr: 'L\'expédition de 1541-42 visait à fonder une colonie permanente et à trouver le légendaire Royaume du Saguenay. Il construisit un fort au-dessus de Stadaconé et collecta ce qu\'il croyait être des diamants et de l\'or — c\'étaient du quartz et de la pyrite. Roberval arriva avec des colons, mais l\'entreprise échoua. La France ne reviendrait en force que soixante ans plus tard.',
      },
    },
    anchorYear: 1541,
  },
  {
    id: 'jcar-beat-legacy',
    eraId: 'age-of-exploration',
    arcId: 'jacques-cartier',
    camera: {
      target: 'bbox',
      center: [-35.0, 48.0],
      zoom: 2.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['saint-malo', 'gaspe-peninsula', 'quebec-city', 'montreal'],
      regionIds: ['brittany', 'atlantic-basin', 'new-france'],
      routeSegmentIds: [],
      journeyIds: ['journey-cartier'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['origins', 'destinations'],
    },
    copy: {
      title: 'Return to Saint-Malo — a door left open',
      body: {
        en: 'Cartier died in 1557 at Saint-Malo, his colony attempt a failure. Yet his three voyages had mapped the St. Lawrence from the Gulf to the rapids, named Mont Royal, and proved the river was a highway into the continent. When Champlain sailed seventy years later, he followed Cartier\'s charts.',
        fr: 'Cartier mourut en 1557 à Saint-Malo, sa tentative de colonie un échec. Pourtant, ses trois voyages avaient cartographié le Saint-Laurent du golfe aux rapides, nommé le mont Royal et prouvé que le fleuve était une autoroute vers le continent. Quand Champlain navigua soixante-dix ans plus tard, il suivit les cartes de Cartier.',
      },
    },
    anchorYear: 1557,
  },

  // ── Pierre Dugua de Mons guided arc ─────────────────────────────────
  {
    id: 'dugua-beat-royan',
    eraId: 'age-of-exploration',
    arcId: 'pierre-dugua-de-mons',
    camera: {
      target: 'places',
      center: [-1.15, 46.16],
      zoom: 7.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['la-rochelle'],
      regionIds: ['aunis'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins'],
    },
    copy: {
      title: 'Royan — merchant and Huguenot',
      body: {
        en: 'Pierre Dugua, sieur de Mons, was born around 1558 in Royan, Saintonge — a Protestant in a region whose merchants had long traded along the Atlantic coast. His military service during the Wars of Religion earned him the trust of Henri IV, who would grant him the instrument that made permanent settlement possible: a royal fur-trade monopoly.',
        fr: 'Pierre Dugua, sieur de Mons, naquit vers 1558 à Royan, en Saintonge — un protestant dans une région dont les marchands commerçaient depuis longtemps le long de la côte atlantique. Son service militaire pendant les guerres de Religion lui valut la confiance d\'Henri IV, qui lui accorderait l\'instrument rendant possible la colonisation permanente : un monopole royal de la traite des fourrures.',
      },
    },
    anchorYear: 1558,
  },
  {
    id: 'dugua-beat-monopoly',
    eraId: 'age-of-exploration',
    arcId: 'pierre-dugua-de-mons',
    camera: {
      target: 'bbox',
      center: [-28.0, 47.0],
      zoom: 2.8,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['la-rochelle', 'honfleur', 'mid-atlantic-passage'],
      regionIds: ['aunis', 'atlantic-basin'],
      routeSegmentIds: ['seg-la-rochelle-atlantic'],
      journeyIds: ['journey-la-rochelle-acadia'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['routes'],
    },
    copy: {
      title: 'The monopoly — financing a continent',
      body: {
        en: 'In 1603 Henri IV granted Dugua a monopoly on the fur trade between the 40th and 46th parallels. It was the financial engine behind colonization: private capital underwrote ships, supplies, and settlers in exchange for exclusive beaver-pelt profits. Dugua recruited Champlain as cartographer and navigator — the partnership that would found New France.',
        fr: 'En 1603, Henri IV accorda à Dugua un monopole de la traite des fourrures entre les 40e et 46e parallèles. C\'était le moteur financier de la colonisation : le capital privé finançait navires, provisions et colons en échange des profits exclusifs du castor. Dugua recruta Champlain comme cartographe et navigateur — le partenariat qui fondera la Nouvelle-France.',
      },
    },
    anchorYear: 1603,
  },
  {
    id: 'dugua-beat-sainte-croix',
    eraId: 'new-france-foundations',
    arcId: 'pierre-dugua-de-mons',
    camera: {
      target: 'places',
      center: [-65.52, 44.74],
      zoom: 5.5,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['port-royal'],
      regionIds: ['acadia'],
      routeSegmentIds: ['seg-atlantic-port-royal'],
      journeyIds: ['journey-la-rochelle-acadia'],
    },
    presentation: {
      routeHighlightMode: 'journey',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Île Sainte-Croix — a lethal winter',
      body: {
        en: 'In 1604, Dugua\'s expedition landed at Île Sainte-Croix in the Bay of Fundy. The island seemed defensible, but the winter was devastating: thirty-five of seventy-nine men died of scurvy and cold. The survivors relocated to Port-Royal across the bay. Dugua had learned, at terrible cost, that colonization demanded more than capital — it demanded knowledge of the land.',
        fr: 'En 1604, l\'expédition de Dugua débarqua à l\'île Sainte-Croix dans la baie de Fundy. L\'île semblait défendable, mais l\'hiver fut dévastateur : trente-cinq des soixante-dix-neuf hommes moururent du scorbut et du froid. Les survivants se relocalisèrent à Port-Royal de l\'autre côté de la baie. Dugua avait appris, à un coût terrible, que la colonisation exigeait plus que du capital — elle exigeait la connaissance du terrain.',
      },
    },
    anchorYear: 1604,
  },
  {
    id: 'dugua-beat-port-royal',
    eraId: 'new-france-foundations',
    arcId: 'pierre-dugua-de-mons',
    camera: {
      target: 'places',
      center: [-65.52, 44.74],
      zoom: 6.5,
      durationMs: 1800,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['port-royal'],
      regionIds: ['acadia'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Port-Royal — France in Acadia',
      body: {
        en: 'Port-Royal became the first sustained French settlement in North America. Under Poutrincourt\'s local command and Champlain\'s mapping, the Habitation sheltered colonists, forged ties with the Mi\'kmaq, and hosted the Ordre de Bon Temps — the New World\'s first social club. Dugua financed it from France, never again crossing the ocean himself.',
        fr: 'Port-Royal devint le premier établissement français durable en Amérique du Nord. Sous le commandement local de Poutrincourt et la cartographie de Champlain, l\'Habitation abrita les colons, forgea des liens avec les Mi\'kmaqs et accueillit l\'Ordre de Bon Temps — le premier club social du Nouveau Monde. Dugua le finançait depuis la France, sans jamais plus traverser l\'océan.',
      },
    },
    anchorYear: 1605,
  },
  {
    id: 'dugua-beat-quebec-founding',
    eraId: 'new-france-foundations',
    arcId: 'pierre-dugua-de-mons',
    camera: {
      target: 'places',
      center: [-71.21, 46.81],
      zoom: 6.0,
      durationMs: 2000,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['quebec-city'],
      regionIds: ['new-france'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['destinations'],
    },
    copy: {
      title: 'Behind Champlain — the founding of Québec',
      body: {
        en: 'When Dugua\'s Acadian monopoly was revoked, he pivoted to the St. Lawrence. In 1608 he sent Champlain with a new commission to found a trading post at Québec. Dugua never sailed there himself, but without his capital, his political connections, and his willingness to absorb losses, Champlain\'s habitation would not have been built.',
        fr: 'Quand le monopole acadien de Dugua fut révoqué, il se tourna vers le Saint-Laurent. En 1608, il envoya Champlain avec une nouvelle commission pour fonder un poste de traite à Québec. Dugua n\'y navigua jamais, mais sans son capital, ses connexions politiques et sa volonté d\'absorber les pertes, l\'habitation de Champlain n\'aurait pas vu le jour.',
      },
    },
    anchorYear: 1608,
  },
  {
    id: 'dugua-beat-legacy',
    eraId: 'new-france-foundations',
    arcId: 'pierre-dugua-de-mons',
    camera: {
      target: 'bbox',
      center: [-35.0, 46.0],
      zoom: 2.5,
      durationMs: 2200,
      easing: 'easeInOutCubic',
    },
    focus: {
      placeIds: ['la-rochelle', 'port-royal', 'quebec-city'],
      regionIds: ['aunis', 'acadia', 'new-france', 'atlantic-basin'],
      routeSegmentIds: [],
    },
    presentation: {
      routeHighlightMode: 'none',
      dimOthers: true,
      pulse: ['origins', 'destinations'],
    },
    copy: {
      title: 'The man behind the colony',
      body: {
        en: 'Dugua died in 1628, largely forgotten. History remembered Champlain, not the merchant who wrote the checks. Yet Dugua\'s model — private monopoly financing public colonization — was the template for every subsequent venture in New France. He proved that permanent settlement required sustained capital, not just royal ambition.',
        fr: 'Dugua mourut en 1628, largement oublié. L\'histoire retint Champlain, pas le marchand qui signa les traites. Pourtant, le modèle de Dugua — monopole privé finançant la colonisation publique — servit de modèle à chaque entreprise ultérieure en Nouvelle-France. Il prouva que l\'établissement permanent exigeait un capital soutenu, pas seulement l\'ambition royale.',
      },
    },
    anchorYear: 1628,
  },

  // ── Louis Hébert guided arc ─────────────────────────────────────────
  {
    id: 'lheb-beat-paris',
    eraId: 'new-france-foundations',
    arcId: 'louis-hebert',
    camera: { target: 'places', center: [2.35, 48.86], zoom: 7.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['paris', 'rouen'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'Paris — an apothecary\'s ambition',
      body: {
        en: 'Louis Hébert was born around 1575 in Paris, where he practised as an apothecary. Recruited through Rouen\'s trading networks, he would become the first European to farm Canadian soil — exchanging mortar and pestle for plough and hoe.',
        fr: 'Louis Hébert naquit vers 1575 à Paris, où il exerçait comme apothicaire. Recruté via les réseaux marchands de Rouen, il deviendrait le premier Européen à cultiver le sol canadien — échangeant pilon et mortier contre charrue et houe.',
      },
    },
    anchorYear: 1575,
  },
  {
    id: 'lheb-beat-acadia',
    eraId: 'new-france-foundations',
    arcId: 'louis-hebert',
    camera: { target: 'places', center: [-65.52, 44.74], zoom: 5.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['port-royal'], regionIds: ['acadia'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Acadia — first taste of the New World',
      body: {
        en: 'Hébert accompanied Poutrincourt to Port-Royal in 1606, tending the sick and experimenting with local plants. He returned to Paris, but the experience planted a seed: the land could support European life, if someone was willing to work it.',
        fr: 'Hébert accompagna Poutrincourt à Port-Royal en 1606, soignant les malades et expérimentant avec les plantes locales. Il rentra à Paris, mais l\'expérience avait semé une graine : la terre pouvait nourrir la vie européenne, si quelqu\'un voulait la travailler.',
      },
    },
    anchorYear: 1606,
  },
  {
    id: 'lheb-beat-crossing',
    eraId: 'new-france-foundations',
    arcId: 'louis-hebert',
    camera: { target: 'bbox', center: [-28.0, 47.0], zoom: 2.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['honfleur', 'mid-atlantic-passage', 'quebec-city'], regionIds: ['atlantic-basin', 'new-france'], routeSegmentIds: ['seg-honfleur-atlantic', 'seg-atlantic-montreal'], journeyIds: ['journey-honfleur-montreal'] },
    presentation: { routeHighlightMode: 'journey', dimOthers: true, pulse: ['routes'] },
    copy: {
      title: 'Atlantic crossing — 1617',
      body: {
        en: 'In 1617, Hébert sold his Paris shop, packed his family — wife Marie Rollet and three children — and sailed from Honfleur to Québec. The trading company tried to bind him to warehouse work, but he insisted on farming. He was done with commerce; he wanted land.',
        fr: 'En 1617, Hébert vendit sa boutique parisienne, embarqua sa famille — son épouse Marie Rollet et trois enfants — et navigua de Honfleur à Québec. La compagnie de traite tenta de le cantonner à l\'entrepôt, mais il insista pour cultiver. Il en avait fini avec le commerce ; il voulait la terre.',
      },
    },
    anchorYear: 1617,
  },
  {
    id: 'lheb-beat-first-farm',
    eraId: 'new-france-foundations',
    arcId: 'louis-hebert',
    camera: { target: 'places', center: [-71.21, 46.81], zoom: 7.5, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['quebec-city'], regionIds: ['new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The first farm — heights of Québec',
      body: {
        en: 'On the plateau above the habitation, Hébert cleared land and grew wheat, rye, and garden vegetables. He was the first European in Canada to live primarily from his own harvest rather than company stores. The farm proved a point: the colony did not have to depend entirely on supply ships from France.',
        fr: 'Sur le plateau au-dessus de l\'habitation, Hébert défricha la terre et cultiva blé, seigle et légumes de jardin. Il fut le premier Européen au Canada à vivre principalement de sa propre récolte plutôt que des magasins de la compagnie. La ferme prouva un point essentiel : la colonie n\'avait pas à dépendre entièrement des navires de ravitaillement de France.',
      },
    },
    anchorYear: 1618,
  },
  {
    id: 'lheb-beat-death',
    eraId: 'new-france-foundations',
    arcId: 'louis-hebert',
    camera: { target: 'places', center: [-71.21, 46.81], zoom: 7.0, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['quebec-city'], regionIds: ['new-france', 'colony-zone-quebec'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Death and the root of a nation',
      body: {
        en: 'Hébert died in January 1627 after a fall on the ice — the first European farmer buried in Canadian soil. His wife Marie Rollet stayed, remarried, and continued to anchor the fragile community. Their descendants number in the millions today. The apothecary who chose to farm had planted something deeper than wheat.',
        fr: 'Hébert mourut en janvier 1627 après une chute sur la glace — le premier agriculteur européen enterré en sol canadien. Son épouse Marie Rollet resta, se remaria et continua d\'ancrer la communauté fragile. Leurs descendants se comptent aujourd\'hui par millions. L\'apothicaire qui choisit de cultiver avait semé quelque chose de plus profond que le blé.',
      },
    },
    anchorYear: 1627,
  },

  // ── Robert Giffard guided arc ───────────────────────────────────────
  {
    id: 'rgif-beat-perche',
    eraId: 'new-france-foundations',
    arcId: 'robert-giffard',
    camera: { target: 'places', center: [0.55, 48.52], zoom: 7.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['mortagne-au-perche'], regionIds: ['perche'], routeSegmentIds: [], journeyIds: ['journey-perche-quebec'] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'Mortagne-au-Perche — the recruiter\'s home',
      body: {
        en: 'Robert Giffard was born around 1587 in the Perche, a quiet inland region south of Normandy. As a surgeon, he first visited New France in the 1620s and saw what the colony lacked: families willing to farm. He returned to Mortagne determined to fill that gap — from his own parishes.',
        fr: 'Robert Giffard naquit vers 1587 dans le Perche, paisible région intérieure au sud de la Normandie. Chirurgien, il visita la Nouvelle-France dans les années 1620 et vit ce qui manquait à la colonie : des familles prêtes à cultiver. Il rentra à Mortagne déterminé à combler ce vide — depuis ses propres paroisses.',
      },
    },
    anchorYear: 1587,
  },
  {
    id: 'rgif-beat-corridor',
    eraId: 'new-france-foundations',
    arcId: 'robert-giffard',
    camera: { target: 'bbox', center: [-28.0, 47.0], zoom: 2.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['mortagne-au-perche', 'rouen', 'dieppe', 'mid-atlantic-passage', 'quebec-city'], regionIds: ['perche', 'normandy', 'atlantic-basin'], routeSegmentIds: ['seg-mortagne-rouen', 'seg-rouen-dieppe', 'seg-dieppe-atlantic', 'seg-atlantic-quebec'], journeyIds: ['journey-perche-quebec'] },
    presentation: { routeHighlightMode: 'journey', dimOthers: true, pulse: ['routes'] },
    copy: {
      title: 'The Perche-Québec corridor',
      body: {
        en: 'Giffard\'s route ran overland from Mortagne to Rouen, down the Seine to Dieppe, then across the Atlantic. In 1634 he led the single most important recruitment wave in early New France: dozens of families from the Perche, embarking together and settling together. It was chain migration by design.',
        fr: 'L\'itinéraire de Giffard allait par voie de terre de Mortagne à Rouen, descendait la Seine jusqu\'à Dieppe, puis traversait l\'Atlantique. En 1634, il mena la vague de recrutement la plus importante des débuts de la Nouvelle-France : des dizaines de familles du Perche, embarquant ensemble et s\'installant ensemble. C\'était une migration en chaîne organisée.',
      },
    },
    anchorYear: 1634,
  },
  {
    id: 'rgif-beat-beauport',
    eraId: 'new-france-foundations',
    arcId: 'robert-giffard',
    camera: { target: 'places', center: [-71.19, 46.88], zoom: 7.5, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['beauport', 'quebec-city'], regionIds: ['colony-zone-quebec', 'new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Seigneury of Beauport',
      body: {
        en: 'Giffard received the seigneury of Beauport, just north of Québec, and installed his Percheron families on long riverfront lots along the St. Lawrence. The settlement model — seigneur as recruiter, organizer, and landlord — became the template for populating the colony. Beauport was its first and most successful example.',
        fr: 'Giffard reçut la seigneurie de Beauport, juste au nord de Québec, et installa ses familles percheronnes sur de longues concessions riveraines le long du Saint-Laurent. Le modèle — seigneur comme recruteur, organisateur et propriétaire — devint le gabarit du peuplement de la colonie. Beauport en fut le premier et le plus réussi des exemples.',
      },
    },
    anchorYear: 1634,
  },
  {
    id: 'rgif-beat-families',
    eraId: 'new-france-foundations',
    arcId: 'robert-giffard',
    camera: { target: 'bbox', center: [-71.0, 46.9], zoom: 6.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['beauport', 'quebec-city', 'chateau-richer', 'ile-dorleans'], regionIds: ['colony-zone-quebec', 'new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Families that built a colony',
      body: {
        en: 'The names Giffard brought from the Perche — Cloutier, Juchereau, Tremblay, Boucher, Côté — became the foundational surnames of French Canada. These were not adventurers or soldiers but farmers, artisans, and their wives, drawn by a recruiter they knew personally. The Perche founder effect is still visible in Québec genealogy today.',
        fr: 'Les noms que Giffard amena du Perche — Cloutier, Juchereau, Tremblay, Boucher, Côté — devinrent les patronymes fondateurs du Canada français. Ce n\'étaient ni des aventuriers ni des soldats, mais des cultivateurs, artisans et leurs épouses, attirés par un recruteur qu\'ils connaissaient personnellement. L\'effet fondateur percheron reste visible dans la généalogie québécoise aujourd\'hui.',
      },
    },
    anchorYear: 1640,
  },
  {
    id: 'rgif-beat-legacy',
    eraId: 'new-france-foundations',
    arcId: 'robert-giffard',
    camera: { target: 'bbox', center: [-35.0, 48.0], zoom: 2.8, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['mortagne-au-perche', 'beauport', 'quebec-city'], regionIds: ['perche', 'new-france', 'atlantic-basin'], routeSegmentIds: [], journeyIds: ['journey-perche-quebec'] },
    presentation: { routeHighlightMode: 'journey', dimOthers: true, pulse: ['origins', 'destinations'] },
    copy: {
      title: 'The recruiter\'s legacy',
      body: {
        en: 'Giffard died in 1668 at Beauport, having crossed the Atlantic multiple times to bring settlers. His model of seigneurial recruitment — personal networks, parish connections, family migration — shaped New France\'s demographic foundation more than any royal decree. A modest surgeon from a quiet inland region had populated a continent.',
        fr: 'Giffard mourut en 1668 à Beauport, ayant traversé l\'Atlantique à de multiples reprises pour amener des colons. Son modèle de recrutement seigneurial — réseaux personnels, liens paroissiaux, migration familiale — façonna la base démographique de la Nouvelle-France plus que tout décret royal. Un modeste chirurgien d\'une paisible région intérieure avait peuplé un continent.',
      },
    },
    anchorYear: 1668,
  },

  // ── Pierre Boucher guided arc ───────────────────────────────────────
  {
    id: 'pbou-beat-perche',
    eraId: 'new-france-foundations',
    arcId: 'pierre-boucher',
    camera: { target: 'places', center: [0.55, 48.52], zoom: 7.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['mortagne-au-perche'], regionIds: ['perche'], routeSegmentIds: [], journeyIds: ['journey-perche-quebec'] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'Perche — a boy crosses the ocean',
      body: {
        en: 'Pierre Boucher was born in 1622 in Mortagne-au-Perche. In 1635, at age thirteen, he crossed the Atlantic with the wave of Percheron families recruited by Giffard. He would spend the rest of his ninety-five years in New France — longer than almost anyone in the founding generation.',
        fr: 'Pierre Boucher naquit en 1622 à Mortagne-au-Perche. En 1635, à treize ans, il traversa l\'Atlantique avec la vague de familles percheronnes recrutées par Giffard. Il passerait le reste de ses quatre-vingt-quinze ans en Nouvelle-France — plus longtemps que presque n\'importe qui de la génération fondatrice.',
      },
    },
    anchorYear: 1635,
  },
  {
    id: 'pbou-beat-interpreter',
    eraId: 'new-france-foundations',
    arcId: 'pierre-boucher',
    camera: { target: 'bbox', center: [-73.0, 46.0], zoom: 5.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['quebec-city', 'trois-rivieres', 'lake-huron-node'], regionIds: ['new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Learning among nations',
      body: {
        en: 'Sent to live among the Wendat as a teenager, Boucher became fluent in multiple Indigenous languages. This immersion gave him the cross-cultural understanding that would make him one of the colony\'s most effective leaders — a governor who could negotiate with both Paris and the First Nations.',
        fr: 'Envoyé vivre parmi les Wendats adolescent, Boucher devint couramment polyglotte en langues autochtones. Cette immersion lui donna la compréhension interculturelle qui ferait de lui l\'un des dirigeants les plus efficaces de la colonie — un gouverneur capable de négocier aussi bien avec Paris qu\'avec les Premières Nations.',
      },
    },
    anchorYear: 1640,
  },
  {
    id: 'pbou-beat-trois-rivieres',
    eraId: 'new-france-foundations',
    arcId: 'pierre-boucher',
    camera: { target: 'places', center: [-72.55, 46.35], zoom: 7.0, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['trois-rivieres'], regionIds: ['colony-zone-trois-rivieres', 'new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Governor of Trois-Rivières',
      body: {
        en: 'As governor of Trois-Rivières from 1654, Boucher defended the settlement during the most dangerous years of the Iroquois wars. With barely a handful of militiamen, he held a post that sat squarely on the front line between French and Haudenosaunee territories.',
        fr: 'Comme gouverneur de Trois-Rivières à partir de 1654, Boucher défendit l\'établissement pendant les années les plus dangereuses des guerres iroquoises. Avec à peine une poignée de miliciens, il tint un poste qui se trouvait en pleine ligne de front entre les territoires français et haudenosaunee.',
      },
    },
    anchorYear: 1654,
  },
  {
    id: 'pbou-beat-paris-mission',
    eraId: 'royal-new-france',
    arcId: 'pierre-boucher',
    camera: { target: 'bbox', center: [-28.0, 48.0], zoom: 2.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['paris', 'quebec-city', 'trois-rivieres'], regionIds: ['new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins', 'destinations'] },
    copy: {
      title: 'Mission to Louis XIV',
      body: {
        en: 'In 1661 Boucher sailed to France to petition Louis XIV personally. His argument was blunt: New France would die without soldiers. The king listened. The result was the Carignan-Salières Regiment — twelve hundred troops dispatched in 1665, the largest military reinforcement the colony had ever seen.',
        fr: 'En 1661, Boucher navigua vers la France pour plaider auprès de Louis XIV en personne. Son argument était direct : la Nouvelle-France mourrait sans soldats. Le roi écouta. Le résultat fut le régiment de Carignan-Salières — douze cents soldats envoyés en 1665, le plus grand renfort militaire que la colonie ait jamais vu.',
      },
    },
    anchorYear: 1661,
  },
  {
    id: 'pbou-beat-histoire',
    eraId: 'royal-new-france',
    arcId: 'pierre-boucher',
    camera: { target: 'places', center: [-72.55, 46.35], zoom: 6.5, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['trois-rivieres', 'quebec-city'], regionIds: ['new-france', 'colony-zone-trois-rivieres'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Histoire véritable — the colony described',
      body: {
        en: 'In 1664, Boucher published the first book-length description of New France: its geography, peoples, animals, and potential. Written for a French audience that knew almost nothing about Canada, the Histoire véritable was both promotional tract and ethnographic record.',
        fr: 'En 1664, Boucher publia la première description de la Nouvelle-France en forme de livre : géographie, peuples, animaux et potentiel. Écrite pour un public français qui ne savait presque rien du Canada, l\'Histoire véritable était à la fois tract promotionnel et document ethnographique.',
      },
    },
    anchorYear: 1664,
  },
  {
    id: 'pbou-beat-legacy',
    eraId: 'royal-new-france',
    arcId: 'pierre-boucher',
    camera: { target: 'bbox', center: [-72.0, 46.5], zoom: 5.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['trois-rivieres', 'quebec-city', 'montreal'], regionIds: ['new-france'], routeSegmentIds: ['seg-stl-quebec-montreal'] },
    presentation: { routeHighlightMode: 'kind', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Ninety-five years — a life as long as the colony',
      body: {
        en: 'Boucher founded the seigneury of Boucherville near Montréal and died in 1717 at age ninety-five. He had arrived as a child in a colony of a few hundred; he died in a society of eighteen thousand. His writings, his diplomacy, and his petition to Louis XIV had directly shaped the transformation.',
        fr: 'Boucher fonda la seigneurie de Boucherville près de Montréal et mourut en 1717 à quatre-vingt-quinze ans. Il était arrivé enfant dans une colonie de quelques centaines d\'âmes ; il mourut dans une société de dix-huit mille. Ses écrits, sa diplomatie et sa pétition auprès de Louis XIV avaient directement façonné la transformation.',
      },
    },
    anchorYear: 1717,
  },

  // ── Jean Talon guided arc ───────────────────────────────────────────
  {
    id: 'jtal-beat-origins',
    eraId: 'royal-new-france',
    arcId: 'jean-talon',
    camera: { target: 'places', center: [2.35, 48.86], zoom: 6.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['paris'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'A Colbertiste for the colony',
      body: {
        en: 'Jean Talon was born around 1626 in Châlons-en-Champagne and rose through the royal bureaucracy as a protégé of Colbert — Louis XIV\'s minister of finance. When Colbert needed a man to transform New France from fur-trade outpost into productive crown colony, he chose Talon.',
        fr: 'Jean Talon naquit vers 1626 à Châlons-en-Champagne et gravit la bureaucratie royale comme protégé de Colbert — ministre des finances de Louis XIV. Quand Colbert eut besoin d\'un homme pour transformer la Nouvelle-France de comptoir de traite en colonie productive de la Couronne, il choisit Talon.',
      },
    },
    anchorYear: 1626,
  },
  {
    id: 'jtal-beat-arrival',
    eraId: 'royal-new-france',
    arcId: 'jean-talon',
    camera: { target: 'places', center: [-71.21, 46.81], zoom: 6.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['quebec-city'], regionIds: ['new-france', 'colony-zone-quebec'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'First intendant — 1665',
      body: {
        en: 'Talon arrived at Québec in 1665 as the colony\'s first intendant — the crown\'s chief administrator for justice, finance, and civil order. He found a colony of barely three thousand people, dependent on the fur trade and vulnerable to Iroquois raids. He set about changing everything.',
        fr: 'Talon arriva à Québec en 1665 comme premier intendant de la colonie — administrateur en chef de la Couronne pour la justice, les finances et l\'ordre civil. Il trouva une colonie d\'à peine trois mille âmes, dépendante de la traite des fourrures et vulnérable aux raids iroquois. Il entreprit de tout changer.',
      },
    },
    anchorYear: 1665,
  },
  {
    id: 'jtal-beat-census',
    eraId: 'royal-new-france',
    arcId: 'jean-talon',
    camera: { target: 'bbox', center: [-71.5, 46.7], zoom: 6.0, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['quebec-city', 'trois-rivieres', 'montreal'], regionIds: ['new-france', 'colony-zone-quebec', 'colony-zone-trois-rivieres', 'colony-zone-montreal'], routeSegmentIds: ['seg-stl-quebec-montreal'] },
    presentation: { routeHighlightMode: 'kind', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The census of 1666',
      body: {
        en: 'Talon ordered Canada\'s first systematic census: door-to-door, recording name, age, occupation, and marital status for every colonist along the St. Lawrence. The count revealed 3,215 souls — and the demographic reality Talon was determined to change.',
        fr: 'Talon ordonna le premier recensement systématique du Canada : de porte en porte, consignant nom, âge, métier et état civil de chaque colon le long du Saint-Laurent. Le compte révéla 3 215 âmes — et la réalité démographique que Talon était déterminé à changer.',
      },
    },
    anchorYear: 1666,
  },
  {
    id: 'jtal-beat-filles-du-roi',
    eraId: 'royal-new-france',
    arcId: 'jean-talon',
    camera: { target: 'bbox', center: [-28.0, 47.0], zoom: 2.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['paris', 'la-rochelle', 'quebec-city'], regionIds: ['new-france', 'atlantic-basin'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['routes'] },
    copy: {
      title: 'Filles du Roi — engineering a population',
      body: {
        en: 'Between 1663 and 1673, Talon orchestrated the migration of some eight hundred Filles du Roi — young women sent to marry settlers and bear children. Within a decade, the colony\'s population tripled. Talon offered bounties for large families and fines for bachelors.',
        fr: 'Entre 1663 et 1673, Talon orchestra la migration d\'environ huit cents Filles du Roi — des jeunes femmes envoyées pour épouser des colons et avoir des enfants. En une décennie, la population de la colonie tripla. Talon offrait des primes aux grandes familles et des amendes aux célibataires.',
      },
    },
    anchorYear: 1668,
  },
  {
    id: 'jtal-beat-industry',
    eraId: 'royal-new-france',
    arcId: 'jean-talon',
    camera: { target: 'places', center: [-71.21, 46.81], zoom: 6.5, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['quebec-city', 'beauport'], regionIds: ['colony-zone-quebec', 'new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Brewery, shipyard, tannery',
      body: {
        en: 'Talon pushed New France beyond beaver pelts. He founded a brewery at Québec, promoted hemp and flax cultivation, built a tannery, and explored iron deposits. His goal was Colbertiste self-sufficiency: a colony that produced what it consumed and exported surplus to France.',
        fr: 'Talon poussa la Nouvelle-France au-delà des peaux de castor. Il fonda une brasserie à Québec, promut la culture du chanvre et du lin, construisit une tannerie et explora les gisements de fer. Son objectif était l\'autosuffisance colbertiste : une colonie qui produise ce qu\'elle consomme et exporte le surplus vers la France.',
      },
    },
    anchorYear: 1670,
  },
  {
    id: 'jtal-beat-exploration',
    eraId: 'royal-new-france',
    arcId: 'jean-talon',
    camera: { target: 'bbox', center: [-82.0, 44.0], zoom: 3.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['quebec-city', 'great-lakes-hub', 'sault-ste-marie'], regionIds: ['new-france'], routeSegmentIds: ['seg-champlain-quebec-huron'] },
    presentation: { routeHighlightMode: 'kind', dimOthers: true, pulse: ['routes', 'destinations'] },
    copy: {
      title: 'Pushing west — mandates for exploration',
      body: {
        en: 'Talon sent emissaries west to claim the interior for France. At Sault Sainte-Marie in 1671, his envoy formally proclaimed French sovereignty over the Great Lakes basin. The geographic ambitions he set in motion would lead, within a decade, to La Salle\'s Mississippi expedition.',
        fr: 'Talon envoya des émissaires vers l\'ouest pour revendiquer l\'intérieur au nom de la France. Au Sault Sainte-Marie en 1671, son envoyé proclama formellement la souveraineté française sur le bassin des Grands Lacs. Les ambitions géographiques qu\'il lança mèneraient, en une décennie, à l\'expédition de La Salle sur le Mississippi.',
      },
    },
    anchorYear: 1671,
  },
  {
    id: 'jtal-beat-legacy',
    eraId: 'royal-new-france',
    arcId: 'jean-talon',
    camera: { target: 'bbox', center: [-71.5, 46.8], zoom: 5.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['quebec-city', 'trois-rivieres', 'montreal', 'beauport'], regionIds: ['new-france'], routeSegmentIds: ['seg-stl-quebec-montreal'] },
    presentation: { routeHighlightMode: 'kind', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Return to France — the colony transformed',
      body: {
        en: 'Talon returned to France in 1672 and never came back. In seven years he had tripled the population, diversified the economy, extended French claims to the Great Lakes, and laid the administrative framework that would govern New France until 1760. He died in Paris in 1694 — a bureaucrat whose ledgers changed a continent.',
        fr: 'Talon rentra en France en 1672 et ne revint jamais. En sept ans, il avait triplé la population, diversifié l\'économie, étendu les revendications françaises aux Grands Lacs et posé le cadre administratif qui gouvernerait la Nouvelle-France jusqu\'en 1760. Il mourut à Paris en 1694 — un bureaucrate dont les registres changèrent un continent.',
      },
    },
    anchorYear: 1672,
  },

  // ── Marguerite Bourgeoys guided arc ─────────────────────────────────
  {
    id: 'mbou-beat-troyes',
    eraId: 'new-france-foundations',
    arcId: 'marguerite-bourgeoys',
    camera: { target: 'places', center: [2.35, 48.86], zoom: 5.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['paris'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'Troyes — a calling takes shape',
      body: {
        en: 'Marguerite Bourgeoys was born in 1620 in Troyes, Champagne. At twenty she experienced a religious conversion and joined an external congregation of women who taught the poor. When Maisonneuve sought a teacher for his nascent settlement at Montréal, Bourgeoys answered the call.',
        fr: 'Marguerite Bourgeoys naquit en 1620 à Troyes, en Champagne. À vingt ans, elle connut une conversion religieuse et rejoignit une congrégation externe de femmes enseignant aux pauvres. Quand Maisonneuve chercha une institutrice pour son établissement naissant à Montréal, Bourgeoys répondit à l\'appel.',
      },
    },
    anchorYear: 1620,
  },
  {
    id: 'mbou-beat-crossing',
    eraId: 'new-france-foundations',
    arcId: 'marguerite-bourgeoys',
    camera: { target: 'bbox', center: [-28.0, 47.0], zoom: 2.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['honfleur', 'mid-atlantic-passage', 'montreal'], regionIds: ['atlantic-basin', 'new-france'], routeSegmentIds: ['seg-honfleur-atlantic', 'seg-atlantic-montreal'], journeyIds: ['journey-honfleur-montreal'] },
    presentation: { routeHighlightMode: 'journey', dimOthers: true, pulse: ['routes'] },
    copy: {
      title: 'Across the Atlantic to Ville-Marie',
      body: {
        en: 'In 1653, Bourgeoys sailed from France to Montréal — then called Ville-Marie, a fortified mission settlement of barely fifty colonists. She arrived to teach, but found a community that needed everything: education, nursing, moral leadership, and the sheer will to survive.',
        fr: 'En 1653, Bourgeoys navigua de France à Montréal — alors appelé Ville-Marie, un établissement missionnaire fortifié d\'à peine cinquante colons. Elle arriva pour enseigner, mais trouva une communauté qui avait besoin de tout : éducation, soins, direction morale et la simple volonté de survivre.',
      },
    },
    anchorYear: 1653,
  },
  {
    id: 'mbou-beat-first-school',
    eraId: 'new-france-foundations',
    arcId: 'marguerite-bourgeoys',
    camera: { target: 'places', center: [-73.57, 45.50], zoom: 7.5, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['montreal'], regionIds: ['colony-zone-montreal', 'new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'The first school in Montréal',
      body: {
        en: 'In 1658, Bourgeoys opened her first school in a converted stone stable. She taught French and Indigenous children together — reading, writing, arithmetic, and practical skills. It was the first non-cloistered school in New France.',
        fr: 'En 1658, Bourgeoys ouvrit sa première école dans une étable de pierre reconvertie. Elle enseignait aux enfants français et autochtones ensemble — lecture, écriture, calcul et compétences pratiques. C\'était la première école non cloîtrée de Nouvelle-France.',
      },
    },
    anchorYear: 1658,
  },
  {
    id: 'mbou-beat-congregation',
    eraId: 'new-france-foundations',
    arcId: 'marguerite-bourgeoys',
    camera: { target: 'places', center: [-73.57, 45.50], zoom: 7.0, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['montreal'], regionIds: ['colony-zone-montreal'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Congrégation de Notre-Dame',
      body: {
        en: 'Bourgeoys founded the Congrégation de Notre-Dame — the first uncloistered women\'s religious community in New France. Its members lived among the people, not behind convent walls. They taught in parish schools, prepared Filles du Roi for marriage, and carried education to remote settlements.',
        fr: 'Bourgeoys fonda la Congrégation de Notre-Dame — la première communauté religieuse féminine non cloîtrée en Nouvelle-France. Ses membres vivaient parmi le peuple, pas derrière des murs conventuels. Elles enseignaient dans les écoles paroissiales, préparaient les Filles du Roi au mariage et portaient l\'éducation dans les établissements éloignés.',
      },
    },
    anchorYear: 1659,
  },
  {
    id: 'mbou-beat-colony-schools',
    eraId: 'royal-new-france',
    arcId: 'marguerite-bourgeoys',
    camera: { target: 'bbox', center: [-72.0, 46.5], zoom: 5.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['montreal', 'quebec-city', 'trois-rivieres'], regionIds: ['new-france'], routeSegmentIds: ['seg-stl-quebec-montreal'] },
    presentation: { routeHighlightMode: 'kind', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Schools across the colony',
      body: {
        en: 'By the 1680s the Congrégation operated schools in Québec, Trois-Rivières, and along the Côte-de-Beaupré. Bourgeoys recruited teachers from France and trained local women. Her network of parish schools gave New France an educational infrastructure that the English colonies would not match for decades.',
        fr: 'Dans les années 1680, la Congrégation tenait des écoles à Québec, Trois-Rivières et le long de la Côte-de-Beaupré. Bourgeoys recrutait des enseignantes en France et formait des femmes locales. Son réseau d\'écoles paroissiales donna à la Nouvelle-France une infrastructure éducative que les colonies anglaises ne rattraperaient pas avant des décennies.',
      },
    },
    anchorYear: 1680,
  },
  {
    id: 'mbou-beat-legacy',
    eraId: 'royal-new-france',
    arcId: 'marguerite-bourgeoys',
    camera: { target: 'places', center: [-73.57, 45.50], zoom: 7.0, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['montreal'], regionIds: ['colony-zone-montreal', 'new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Saint Marguerite — a legacy in stone and spirit',
      body: {
        en: 'Bourgeoys died on 12 January 1700 in Montréal. She was canonized as a saint in 1982 — the first woman born in France to be so honoured for work done in the Americas. Her Congrégation survives today, and the educational model she built shaped colonial society for over a century.',
        fr: 'Bourgeoys mourut le 12 janvier 1700 à Montréal. Elle fut canonisée en 1982 — la première femme née en France à être ainsi honorée pour son œuvre en Amérique. Sa Congrégation survit aujourd\'hui, et le modèle éducatif qu\'elle bâtit façonna la société coloniale pendant plus d\'un siècle.',
      },
    },
    anchorYear: 1700,
  },

  // ── Jeanne Mance guided arc ─────────────────────────────────────────
  {
    id: 'jman-beat-langres',
    eraId: 'new-france-foundations',
    arcId: 'jeanne-mance',
    camera: { target: 'places', center: [2.35, 48.86], zoom: 5.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['paris'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'Langres — the call to serve',
      body: {
        en: 'Jeanne Mance was born in 1606 in Langres, Champagne. She cared for the wounded during the Thirty Years\' War and, through Parisian devotional networks, heard of a project to build a mission settlement on the island of Montréal. She volunteered as its nurse and fundraiser.',
        fr: 'Jeanne Mance naquit en 1606 à Langres, en Champagne. Elle soigna les blessés pendant la guerre de Trente Ans et, par les réseaux dévots parisiens, entendit parler d\'un projet de mission sur l\'île de Montréal. Elle se porta volontaire comme infirmière et collectrice de fonds.',
      },
    },
    anchorYear: 1606,
  },
  {
    id: 'jman-beat-crossing',
    eraId: 'new-france-foundations',
    arcId: 'jeanne-mance',
    camera: { target: 'bbox', center: [-28.0, 47.0], zoom: 2.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['la-rochelle', 'mid-atlantic-passage', 'montreal'], regionIds: ['atlantic-basin', 'new-france'], routeSegmentIds: ['seg-la-rochelle-atlantic'] },
    presentation: { routeHighlightMode: 'kind', dimOthers: true, pulse: ['routes'] },
    copy: {
      title: 'The crossing — 1641',
      body: {
        en: 'Mance sailed from La Rochelle in 1641 with Maisonneuve\'s party. She carried funds donated by Angélique de Bullion, earmarked for a hospital in the wilderness. The crossing was the hinge of her life: she left France as a provincial laywoman and arrived as the co-architect of a city.',
        fr: 'Mance embarqua de La Rochelle en 1641 avec le groupe de Maisonneuve. Elle emportait les fonds donnés par Angélique de Bullion, destinés à un hôpital en pleine nature. La traversée fut le pivot de sa vie : elle quitta la France simple laïque de province et arriva co-architecte d\'une ville.',
      },
    },
    anchorYear: 1641,
  },
  {
    id: 'jman-beat-ville-marie',
    eraId: 'new-france-foundations',
    arcId: 'jeanne-mance',
    camera: { target: 'places', center: [-73.57, 45.50], zoom: 7.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['montreal'], regionIds: ['colony-zone-montreal', 'new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Ville-Marie — 17 May 1642',
      body: {
        en: 'Maisonneuve\'s party founded Ville-Marie on the island of Montréal in May 1642. Mance was there from the first day — the only woman among the founders. The settlement was a devotional project, and Mance was its practical conscience.',
        fr: 'Le groupe de Maisonneuve fonda Ville-Marie sur l\'île de Montréal en mai 1642. Mance y était dès le premier jour — la seule femme parmi les fondateurs. L\'établissement était un projet dévot, et Mance en était la conscience pratique.',
      },
    },
    anchorYear: 1642,
  },
  {
    id: 'jman-beat-hotel-dieu',
    eraId: 'new-france-foundations',
    arcId: 'jeanne-mance',
    camera: { target: 'places', center: [-73.57, 45.50], zoom: 7.5, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['montreal'], regionIds: ['colony-zone-montreal'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Hôtel-Dieu — the hospital',
      body: {
        en: 'In 1645, Mance opened the Hôtel-Dieu de Montréal — the settlement\'s first hospital and one of the oldest in North America. She treated colonists and Indigenous people alike, managing supplies, nursing the wounded during Iroquois raids, and keeping the institution solvent across decades of war.',
        fr: 'En 1645, Mance ouvrit l\'Hôtel-Dieu de Montréal — le premier hôpital de l\'établissement et l\'un des plus anciens d\'Amérique du Nord. Elle soigna colons et Autochtones sans distinction, gérant les provisions, soignant les blessés pendant les raids iroquois et maintenant l\'institution solvable à travers des décennies de guerre.',
      },
    },
    anchorYear: 1645,
  },
  {
    id: 'jman-beat-iroquois-wars',
    eraId: 'new-france-foundations',
    arcId: 'jeanne-mance',
    camera: { target: 'bbox', center: [-73.5, 45.5], zoom: 6.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['montreal', 'trois-rivieres'], regionIds: ['colony-zone-montreal', 'new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Holding Ville-Marie together',
      body: {
        en: 'During the most dangerous years of the Iroquois wars, Mance effectively held Montréal together while Maisonneuve sailed to France for reinforcements. She used hospital funds to recruit soldiers — a controversial decision that saved the settlement.',
        fr: 'Pendant les années les plus dangereuses des guerres iroquoises, Mance tint Montréal ensemble pendant que Maisonneuve navigua vers la France pour des renforts. Elle utilisa les fonds de l\'hôpital pour recruter des soldats — une décision controversée qui sauva l\'établissement.',
      },
    },
    anchorYear: 1651,
  },
  {
    id: 'jman-beat-legacy',
    eraId: 'new-france-foundations',
    arcId: 'jeanne-mance',
    camera: { target: 'places', center: [-73.57, 45.50], zoom: 7.0, durationMs: 1800, easing: 'easeInOutCubic' },
    focus: { placeIds: ['montreal'], regionIds: ['colony-zone-montreal', 'new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Co-founder of Montréal',
      body: {
        en: 'Jeanne Mance died on 18 June 1673 in Montréal. She had spent thirty-two years building a hospital and holding a frontier settlement together through war, disease, and financial crisis. Recognized today as a co-founder of Montréal, her Hôtel-Dieu endures.',
        fr: 'Jeanne Mance mourut le 18 juin 1673 à Montréal. Elle avait passé trente-deux ans à bâtir un hôpital et à maintenir un établissement frontalier à travers guerres, maladies et crises financières. Reconnue aujourd\'hui comme co-fondatrice de Montréal, son Hôtel-Dieu perdure.',
      },
    },
    anchorYear: 1673,
  },

  // ── René-Robert Cavelier de La Salle guided arc ─────────────────────
  {
    id: 'rlas-beat-rouen',
    eraId: 'royal-new-france',
    arcId: 'rene-robert-la-salle',
    camera: { target: 'places', center: [1.10, 49.44], zoom: 7.2, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['rouen'], regionIds: ['normandy'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['origins'] },
    copy: {
      title: 'Rouen — a merchant\'s son with imperial dreams',
      body: {
        en: 'René-Robert Cavelier was born in Rouen in 1643 to a wealthy merchant family. Educated by Jesuits, he left the order and sailed for New France in 1667 — trading a comfortable Norman life for the obsessive pursuit of a western passage. He would find something larger.',
        fr: 'René-Robert Cavelier naquit à Rouen en 1643 dans une famille de marchands aisés. Éduqué par les jésuites, il quitta l\'ordre et navigua vers la Nouvelle-France en 1667 — échangeant une vie normande confortable contre la quête obsessionnelle d\'un passage vers l\'ouest. Il trouverait quelque chose de plus vaste.',
      },
    },
    anchorYear: 1643,
  },
  {
    id: 'rlas-beat-montreal',
    eraId: 'royal-new-france',
    arcId: 'rene-robert-la-salle',
    camera: { target: 'places', center: [-73.57, 45.50], zoom: 6.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['montreal'], regionIds: ['colony-zone-montreal', 'new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Montréal — the western frontier',
      body: {
        en: 'La Salle established himself on the island of Montréal, where he learned Indigenous languages and heard persistent reports of a great river flowing south. He sold his seigneury to finance expeditions and became the colony\'s most aggressive western explorer.',
        fr: 'La Salle s\'établit sur l\'île de Montréal, où il apprit les langues autochtones et entendit des récits persistants d\'un grand fleuve coulant vers le sud. Il vendit sa seigneurie pour financer des expéditions et devint l\'explorateur de l\'ouest le plus agressif de la colonie.',
      },
    },
    anchorYear: 1669,
  },
  {
    id: 'rlas-beat-frontenac',
    eraId: 'royal-new-france',
    arcId: 'rene-robert-la-salle',
    camera: { target: 'places', center: [-76.48, 44.23], zoom: 6.0, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['fort-frontenac', 'montreal'], regionIds: ['new-france'], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Fort Frontenac — gateway to the interior',
      body: {
        en: 'In 1673 La Salle rebuilt Fort Frontenac at the outlet of Lake Ontario — the strategic hinge between the St. Lawrence corridor and the Great Lakes. With Frontenac as his base, he controlled the western fur trade and staged the expeditions that would carry him to the Mississippi.',
        fr: 'En 1673, La Salle reconstruisit le fort Frontenac à la sortie du lac Ontario — le pivot stratégique entre le corridor du Saint-Laurent et les Grands Lacs. Avec Frontenac comme base, il contrôla la traite des fourrures de l\'ouest et organisa les expéditions qui le porteraient au Mississippi.',
      },
    },
    anchorYear: 1673,
  },
  {
    id: 'rlas-beat-illinois',
    eraId: 'royal-new-france',
    arcId: 'rene-robert-la-salle',
    camera: { target: 'bbox', center: [-87.0, 42.0], zoom: 4.5, durationMs: 2200, easing: 'easeInOutCubic' },
    focus: { placeIds: ['great-lakes-hub', 'fort-crevecoeur'], regionIds: ['new-france'], routeSegmentIds: ['seg-lasalle-greatlakes-mississippi'], journeyIds: ['journey-lasalle-mississippi'] },
    presentation: { routeHighlightMode: 'journey', dimOthers: true, pulse: ['routes', 'destinations'] },
    copy: {
      title: 'Fort Crèvecœur — into Illinois country',
      body: {
        en: 'In 1680 La Salle built Fort Crèvecœur on the Illinois River — the deepest French post in the interior. Desertion and mutiny plagued the venture, but setbacks only sharpened his determination to reach the Mississippi.',
        fr: 'En 1680, La Salle construisit le fort Crèvecœur sur la rivière Illinois — le poste français le plus profond dans l\'intérieur. Désertion et mutinerie ravagèrent l\'entreprise, mais les revers ne firent qu\'aiguiser sa détermination d\'atteindre le Mississippi.',
      },
    },
    anchorYear: 1680,
  },
  {
    id: 'rlas-beat-mississippi',
    eraId: 'royal-new-france',
    arcId: 'rene-robert-la-salle',
    camera: { target: 'bbox', center: [-90.0, 35.0], zoom: 3.5, durationMs: 2500, easing: 'easeInOutCubic' },
    focus: { placeIds: ['great-lakes-hub', 'mississippi-confluence', 'gulf-of-mexico-node'], regionIds: ['new-france'], routeSegmentIds: ['seg-lasalle-greatlakes-mississippi', 'seg-lasalle-mississippi-gulf'], journeyIds: ['journey-lasalle-mississippi'] },
    presentation: { routeHighlightMode: 'journey', dimOthers: true, pulse: ['routes'] },
    copy: {
      title: 'The Mississippi — descent to the Gulf',
      body: {
        en: 'On 9 April 1682, La Salle reached the mouth of the Mississippi and claimed the entire river basin for France, naming it "Louisiane." In a single expedition, a Norman from Rouen had expanded French territory from the Great Lakes to the Gulf of Mexico — the most dramatic geographic claim in New France\'s history.',
        fr: 'Le 9 avril 1682, La Salle atteignit l\'embouchure du Mississippi et revendiqua tout le bassin fluvial pour la France, le nommant « Louisiane ». En une seule expédition, un Normand de Rouen avait étendu le territoire français des Grands Lacs au golfe du Mexique — la revendication géographique la plus spectaculaire de l\'histoire de la Nouvelle-France.',
      },
    },
    anchorYear: 1682,
  },
  {
    id: 'rlas-beat-murder',
    eraId: 'royal-new-france',
    arcId: 'rene-robert-la-salle',
    camera: { target: 'bbox', center: [-95.0, 30.0], zoom: 4.5, durationMs: 2000, easing: 'easeInOutCubic' },
    focus: { placeIds: ['gulf-of-mexico-node'], regionIds: [], routeSegmentIds: [] },
    presentation: { routeHighlightMode: 'none', dimOthers: true, pulse: ['destinations'] },
    copy: {
      title: 'Murder in Texas — 1687',
      body: {
        en: 'La Salle\'s return expedition to colonize the Gulf coast went catastrophically wrong. He missed the Mississippi delta, landed in Texas, and spent two years lost. His men, starving and desperate, mutinied and killed him on 19 March 1687. The greatest explorer New France produced died at the hands of his own followers.',
        fr: 'L\'expédition de retour de La Salle pour coloniser la côte du golfe tourna au désastre. Il manqua le delta du Mississippi, débarqua au Texas et passa deux ans égaré. Ses hommes, affamés et désespérés, se mutinèrent et le tuèrent le 19 mars 1687. Le plus grand explorateur de la Nouvelle-France mourut aux mains de ses propres compagnons.',
      },
    },
    anchorYear: 1687,
  },
  {
    id: 'rlas-beat-legacy',
    eraId: 'royal-new-france',
    arcId: 'rene-robert-la-salle',
    camera: { target: 'bbox', center: [-85.0, 38.0], zoom: 3.0, durationMs: 2500, easing: 'easeInOutCubic' },
    focus: { placeIds: ['rouen', 'quebec-city', 'montreal', 'mississippi-confluence', 'gulf-of-mexico-node'], regionIds: ['normandy', 'new-france'], routeSegmentIds: ['seg-lasalle-greatlakes-mississippi', 'seg-lasalle-mississippi-gulf'], journeyIds: ['journey-lasalle-mississippi'] },
    presentation: { routeHighlightMode: 'journey', dimOthers: true, pulse: ['origins', 'routes', 'destinations'] },
    copy: {
      title: 'From Rouen to the Gulf — a Norman continental vision',
      body: {
        en: 'La Salle\'s claim of Louisiana stretched French territory from the Gulf of St. Lawrence to the Gulf of Mexico. A Rouennais merchant\'s son had drawn the largest geographic arc in colonial history. Louisiana would be settled, fought over, and sold — but the claim that created it was his.',
        fr: 'La revendication de La Salle sur la Louisiane étendit le territoire français du golfe du Saint-Laurent au golfe du Mexique. Le fils d\'un marchand rouennais avait tracé le plus grand arc géographique de l\'histoire coloniale. La Louisiane serait peuplée, disputée et vendue — mais la revendication qui la créa était la sienne.',
      },
    },
    anchorYear: 1682,
  },
];
