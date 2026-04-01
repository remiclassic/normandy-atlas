import type { Journey } from '@/core/types';
import { celticSeaRouteMetadata, CELTIC_SEA_JOURNEY_ID } from '@/data/atlas/celtic-sea-route-metadata';

export const atlasJourneys: Journey[] = [
  // --- Deep time journeys ---
  {
    id: 'journey-channel-trade',
    name: { en: 'Bronze Age Channel Trade', fr: 'Commerce transmanche à l\'âge du bronze', it: 'Commercio della Manica nell\'età del bronzo' },
    eraIds: ['bronze-age-channel'],
    segmentIds: [
      'seg-cornwall-cotentin-trade',
      'seg-cornwall-caux-trade',
      'seg-cotentin-seine-trade',
    ],
    summary: {
      en: 'Tin from Cornwall and metals from the continent crossed the Channel via Normandy\'s coast long before recorded history. The maritime corridors that Bronze Age traders established would be reused by Viking longships three thousand years later.',
      fr: 'L\'étain de Cornouailles et les métaux du continent traversaient la Manche via la côte normande bien avant l\'histoire écrite. Les corridors maritimes établis par les marchands de l\'âge du bronze seraient réutilisés par les drakkars vikings trois mille ans plus tard.',
      it: 'Lo stagno della Cornovaglia e i metalli del continente attraversavano la Manica lungo la costa normanna molto prima della storia scritta. I corridoi marittimi che i mercanti dell\'età del bronzo avevano aperto sarebbero stati ripercorsi, tremila anni dopo, dalle navi vichinghe.',
    },
  },
  {
    id: 'journey-seine-deep-time',
    name: { en: 'Seine Corridor (Deep Time)', fr: 'Corridor de la Seine (temps profond)', it: 'Corridoio della Senna (tempo profondo)' },
    eraIds: ['iron-age-gaul', 'roman-gaul'],
    segmentIds: [
      'seg-estuary-rouen-celtic',
      'seg-rouen-paris-celtic',
    ],
    summary: {
      en: 'The Seine has been a strategic corridor since the Iron Age. Celtic tribes, Roman grain barges, Viking raiders, and Norman dukes all used the same river — different eras, identical geography.',
      fr: 'La Seine est un corridor stratégique depuis l\'âge du fer. Tribus celtes, péniches de grain romaines, raiders vikings et ducs normands ont tous emprunté le même fleuve — des époques différentes, une géographie identique.',
      it: 'La Senna è un corridoio strategico fin dall\'età del ferro. Tribù celtiche, chiatte da grano romane, predoni vichinghi e duchi normanni usarono lo stesso fiume: epoche diverse, geografia identica.',
    },
  },
  // --- Viking-era journeys ---
  {
    id: 'journey-seine-raids',
    name: { en: 'Viking Seine Raids', fr: 'Raids vikings sur la Seine', it: 'Incursioni vichinghe sulla Senna' },
    eraIds: ['frankish-carolingian', 'viking-age'],
    segmentIds: [
      'seg-estuary-rouen-raid',
      'seg-rouen-jumieges-raid',
      'seg-rouen-paris-incursion',
    ],
    summary: {
      en: 'Repeated Viking incursions up the Seine from the estuary through Rouen to the gates of Paris, devastating monasteries and settlements along the river corridor.',
      fr: 'Incursions vikings répétées remontant la Seine depuis l\'estuaire, passant par Rouen jusqu\'aux portes de Paris, dévastant monastères et établissements le long du corridor fluvial.',
      it: 'Ripetute incursioni vichinghe risalendo la Senna dall\'estuario, passando per Rouen fino alle porte di Parigi, con devastazione di monasteri e insediamenti lungo il corridoio fluviale.',
    },
  },
  {
    id: 'journey-seine-corridor',
    name: { en: 'Seine River Corridor', fr: 'Corridor fluvial de la Seine', it: 'Corridoio fluviale della Senna' },
    eraIds: ['neustria', 'frankish-carolingian', 'viking-age'],
    segmentIds: [
      'seg-paris-rouen-river',
      'seg-rouen-estuary-river',
    ],
    summary: {
      en: 'The Seine connected Paris to the sea via Rouen, serving as a Frankish administrative and trade artery — and later as the invasion highway that made the lower Seine so vulnerable to Viking penetration.',
      fr: 'La Seine reliait Paris à la mer via Rouen, servant d\'artère administrative et commerciale franque — puis de voie d\'invasion rendant la basse Seine si vulnérable à la pénétration viking.',
      it: 'La Senna collegava Parigi al mare via Rouen, arteria amministrativa e commerciale franca, e in seguito via d\'invasione che rese la bassa Senna così esposta alle penetrazioni vichinghe.',
    },
  },
  {
    id: 'journey-viking-settlement',
    name: { en: 'Viking Settlement of Normandy', fr: 'Implantation viking en Normandie', it: 'Insediamento vichingo in Normandia' },
    eraIds: ['norman-origins'],
    segmentIds: [
      'seg-estuary-rouen-settlement',
      'seg-rouen-caen-settlement',
    ],
    summary: {
      en: 'After the Treaty of Saint-Clair-sur-Epte (911), the raiding corridors transformed into settlement routes as Norse settlers consolidated control from the Seine estuary through Rouen and westward.',
      fr: 'Après le traité de Saint-Clair-sur-Epte (911), les corridors de raids se transformèrent en routes de colonisation tandis que les colons scandinaves consolidaient leur contrôle de l\'estuaire de la Seine à travers Rouen et vers l\'ouest.',
      it: 'Dopo il trattato di Saint-Clair-sur-Epte (911), i corridoi di razzia si trasformarono in vie di insediamento mentre i coloni norreni consolidavano il controllo dall\'estuario della Senna, attraverso Rouen, verso ovest.',
    },
  },
  {
    id: 'journey-perche-quebec',
    name: { en: 'Perche to Québec Corridor', fr: 'Corridor Perche–Québec', it: 'Corridoio Perche–Québec' },
    eraIds: ['new-france-foundations'],
    segmentIds: [
      'seg-mortagne-rouen',
      'seg-rouen-dieppe',
      'seg-dieppe-atlantic',
      'seg-atlantic-quebec',
    ],
    summary: {
      en: 'A prototype multi-stage journey showing inland recruitment flowing through Norman urban and maritime nodes toward Québec.',
      fr: 'Un trajet prototype à étapes multiples montrant le recrutement intérieur passant par des nœuds urbains et maritimes normands vers Québec.',
      it: 'Un percorso prototipo a più tappe che mostra il reclutamento dall\'entroterra fluire attraverso i nodi urbani e marittimi normanni verso Québec.',
    },
  },
  {
    id: 'journey-honfleur-montreal',
    name: { en: 'Honfleur to Montréal Route', fr: 'Route Honfleur–Montréal', it: 'Rotta Honfleur–Montréal' },
    eraIds: ['royal-new-france'],
    segmentIds: [
      'seg-honfleur-atlantic',
      'seg-atlantic-montreal',
    ],
    summary: {
      en: 'A Norman Atlantic corridor extending into the St. Lawrence colony.',
      fr: 'Un corridor atlantique normand s\'étendant dans la colonie du Saint-Laurent.',
      it: 'Un corridoio atlantico normanno che si estende nella colonia del San Lorenzo.',
    },
  },
  {
    id: 'journey-la-rochelle-acadia',
    name: { en: 'La Rochelle to Acadia Corridor', fr: 'Corridor La Rochelle–Acadie', it: 'Corridoio La Rochelle–Acadia' },
    eraIds: ['new-france-foundations', 'royal-new-france'],
    segmentIds: [
      'seg-la-rochelle-atlantic',
      'seg-atlantic-port-royal',
    ],
    summary: {
      en: 'A western French Atlantic route feeding Acadian settlement.',
      fr: 'Une route atlantique de l\'ouest de la France alimentant la colonisation acadienne.',
      it: 'Una rotta atlantica dell\'ovest francese che alimentava il popolamento acadiano.',
    },
  },
  {
    id: 'journey-saint-malo-louisbourg',
    name: { en: 'Saint-Malo to Louisbourg Corridor', fr: 'Corridor Saint-Malo–Louisbourg', it: 'Corridoio Saint-Malo–Louisbourg' },
    eraIds: ['royal-new-france', 'atlantic-imprint'],
    segmentIds: [
      'seg-saint-malo-atlantic',
      'seg-atlantic-louisbourg',
    ],
    summary: {
      en: 'A corridor linking a major Atlantic port to the fortified world of Louisbourg.',
      fr: 'Un corridor reliant un grand port atlantique à l\'univers fortifié de Louisbourg.',
      it: 'Un corridoio che collega un grande porto atlantico al mondo fortificato di Louisbourg.',
    },
  },
  // --- Viking / Norman migration flows ---
  {
    id: 'journey-danish-migration',
    name: { en: 'Danish Migration to Seine', fr: 'Migration danoise vers la Seine', it: 'Migrazione danese verso la Senna' },
    eraIds: ['viking-age', 'norman-origins'],
    segmentIds: [
      'seg-denmark-seine',
      'seg-seine-rouen-migration',
    ],
    summary: {
      en: 'The primary Danish migration route: from Denmark across the North Sea to the Seine estuary, then upriver to Rouen. This flow carried Rollo\'s followers and formed the political core of Normandy.',
      fr: 'La principale route de migration danoise : du Danemark à travers la mer du Nord jusqu\'à l\'estuaire de la Seine, puis en remontant le fleuve jusqu\'à Rouen.',
      it: 'La principale via migratoria danese: dalla Danimarca attraverso il Mare del Nord all\'estuario della Senna, poi risalendo il fiume fino a Rouen. Questo flusso portò i seguaci di Rollone e formò il nucleo politico della Normandia.',
    },
  },
  {
    id: CELTIC_SEA_JOURNEY_ID,
    name: {
      en: 'Celtic Sea Route (Norwegian Viking Path)',
      fr: 'Route de la mer Celtique (voie viking norvégienne)',
      it: 'Rotta del mare Celtico (via vichinga norvegese)',
    },
    eraIds: ['viking-age', 'norman-origins'],
    segmentIds: [
      'seg-celtic-norway-scotland',
      'seg-celtic-scotland-hebrides',
      'seg-celtic-hebrides-man',
      'seg-celtic-irish-sea',
      'seg-celtic-sea-south',
      'seg-celtic-cornwall-arc',
      'seg-celtic-into-channel',
      'seg-celtic-to-cotentin',
      'seg-celtic-to-channel-islands',
      'seg-celtic-to-seine-mouth',
      'seg-celtic-seine-to-rouen',
    ],
    summary: {
      en: `${celticSeaRouteMetadata.description} Archaeological and linguistic evidence (Cotentin toponymy, elite names, coin circulation) ties western Normandy to Irish Sea and Scottish networks alongside the better-known Danish Seine corridor.`,
      fr: 'Route maritime secondaire empruntée surtout par des Norvégiens passant par le monde celtique vers l\'ouest normand. Les sources matérielles et linguistiques relient la Normandie occidentale aux réseaux de la mer d\'Irlande et de l\'Écosse, en parallèle du corridor danois de la Seine.',
      it: 'Rotta marittima secondaria percorsa soprattutto da coloni norvegesi attraverso il mondo celtico verso la Normandia occidentale. Prove archeologiche e linguistiche (toponimia del Cotentin, nomi dell\'élite, circolazione monetaria) collegano la Normandia occidentale alle reti del mare d\'Irlanda e della Scozia, accanto al più noto corridoio danese della Senna.',
    },
  },
  {
    id: 'journey-anglo-scandinavian-migration',
    name: { en: 'Anglo-Scandinavian Settlement', fr: 'Colonisation anglo-scandinave', it: 'Insediamento anglo-scandinavo' },
    eraIds: ['norman-origins'],
    segmentIds: [
      'seg-danelaw-rouen',
      'seg-danelaw-caen',
    ],
    summary: {
      en: 'After 911, Scandinavian-descended settlers from the English Danelaw crossed to Normandy as farmers and traders, reinforcing the Norse population of the Bessin and interior lowlands.',
      fr: 'Après 911, des colons d\'ascendance scandinave venus du Danelaw anglais traversèrent vers la Normandie en tant qu\'agriculteurs et marchands.',
      it: 'Dopo il 911, coloni di origine scandinava dal Danelaw inglese passarono in Normandia come agricoltori e mercanti, rafforzando la popolazione norrena del Bessin e delle pianure interne.',
    },
  },
  // --- Global Viking journeys ---
  {
    id: 'journey-danish-northsea-lane',
    name: { en: 'Danish North Sea Lane', fr: 'Voie danoise de la mer du Nord', it: 'Via danese del Mare del Nord' },
    eraIds: ['frankish-carolingian', 'viking-age', 'norman-origins'],
    segmentIds: [
      'seg-denmark-northsea-coast',
      'seg-york-channel',
    ],
    summary: {
      en: 'The primary Danish route across the North Sea: via the eastern English coast and the Danelaw, then south through the Channel to the Seine. This was the corridor that carried Rollo and his followers to Normandy.',
      fr: 'La voie danoise principale à travers la mer du Nord : via la côte est de l\'Angleterre et le Danelaw, puis vers le sud à travers la Manche jusqu\'à la Seine. Ce corridor amena Rollon et ses partisans en Normandie.',
      it: 'La principale via danese attraverso il Mare del Nord: lungo la costa orientale inglese e il Danelaw, poi verso sud attraverso la Manica fino alla Senna. Questo corridoio portò Rollone e i suoi seguaci in Normandia.',
    },
  },
  {
    id: 'journey-viking-baltic-hubs',
    name: {
      en: 'Baltic Emporia — Hedeby & Birka',
      fr: 'Emporia de la Baltique — Hedeby et Birka',
      it: 'Emporia baltici — Hedeby e Birka',
    },
    eraIds: ['frankish-carolingian', 'viking-age', 'norman-origins'],
    segmentIds: ['seg-vk-denmark-hedeby', 'seg-vk-hedeby-birka'],
    summary: {
      en: 'The Danish-Swedish sea road connected the two great Viking Age trading towns, linking North Sea and Baltic exchange systems.',
      fr: 'La route maritime dano-suédoise reliait les deux grands comptoirs vikings, reliant les systèmes d\'échange de la mer du Nord et de la Baltique.',
      it: 'La rotta marittima danese-svedese collegava i due grandi empori dell\'età vichinga, unendo i sistemi di scambio del Mare del Nord e del Baltico.',
    },
  },
  {
    id: 'journey-viking-north-atlantic-chain',
    name: {
      en: 'North Atlantic Stepping Stones',
      fr: 'Les pierres de l\'Atlantique Nord',
      it: 'Tappe dell\'Atlantico del Nord',
    },
    eraIds: ['frankish-carolingian', 'viking-age', 'norman-origins'],
    segmentIds: ['seg-vk-orkney-faroes', 'seg-vk-norway-faroes', 'seg-vk-faroes-iceland'],
    summary: {
      en: 'Island chains from Orkney and Norway through the Faroes toward Iceland — the offshore ladder of Norse expansion.',
      fr: 'Chaînes insulaires des Orcades et de la Norvège par les Féroé vers l\'Islande — l\'échelle maritime de l\'expansion norroise.',
      it: 'Catene insulari dalle Orcadi e dalla Norvegia attraverso le Fær Øer verso l\'Islanda — la scala marittima dell\'espansione norrena.',
    },
  },
  {
    id: 'journey-viking-lindisfarne-northumbria',
    name: {
      en: 'Lindisfarne & Northumbrian Coast',
      fr: 'Lindisfarne et la côte northumbrienne',
      it: 'Lindisfarne e la costa northumbrese',
    },
    eraIds: ['frankish-carolingian', 'viking-age', 'norman-origins'],
    segmentIds: ['seg-vk-denmark-lindisfarne', 'seg-vk-york-lindisfarne'],
    summary: {
      en: 'From the raid that shocked Christendom in 793 to the later links between Scandinavian York and the monastic coast.',
      fr: 'Du raid qui choqua la chrétienté en 793 aux liens ultérieurs entre York scandinave et la côte monastique.',
      it: 'Dal raid che scosse la cristianità nel 793 ai legami successivi tra York scandinava e la costa monastica.',
    },
  },
  {
    id: 'journey-viking-thames-danelaw',
    name: {
      en: 'Thames & Danelaw Corridor',
      fr: 'Corridor de la Tamise et du Danelaw',
      it: 'Corridoio Tamigi e Danelaw',
    },
    eraIds: ['frankish-carolingian', 'viking-age', 'norman-origins'],
    segmentIds: ['seg-vk-channel-london', 'seg-vk-london-york'],
    summary: {
      en: 'Viking fleets on the Thames and the interior corridor tying London to Jórvík during the Great Army period.',
      fr: 'Flottes vikings sur la Tamise et corridor intérieur reliant Londres à Jórvík à l\'époque de la Grande Armée.',
      it: 'Flotte vichinghe sul Tamigi e corridoio interno tra Londra e Jórvík nell\'epoca della Grande armata.',
    },
  },
  {
    id: 'journey-viking-irish-sea-channel',
    name: {
      en: 'Irish Sea → Channel Fork',
      fr: 'Mer d\'Irlande → embranchement vers la Manche',
      it: 'Mare d\'Irlanda → biforcazione verso la Manica',
    },
    eraIds: ['viking-age', 'norman-origins'],
    segmentIds: ['seg-vk-dublin-channel-fork'],
    summary: {
      en: 'How Dublin-based fleets could reach the same western Channel approaches as Breton and Cotentin traffic.',
      fr: 'Comment les flottes basées à Dublin pouvaient atteindre les mêmes approches occidentales de la Manche que le trafic breton et cotentinais.',
      it: 'Come le flotte di Dublino potevano raggiungere gli stessi approcci occidentali della Manica del traffico bretone e del Cotentin.',
    },
  },
  {
    id: 'journey-viking-atlantic-to-med',
    name: {
      en: 'Atlantic to Mediterranean (Western Way)',
      fr: 'Atlantique vers la Méditerranée (voie occidentale)',
      it: 'Atlantico verso il Mediterraneo (via occidentale)',
    },
    eraIds: ['viking-age', 'norman-origins'],
    segmentIds: [
      'seg-vk-nantes-gibraltar',
      'seg-vk-gibraltar-seville',
      'seg-vk-seville-western-med',
      'seg-vk-western-med-palermo',
      'seg-vk-palermo-mahdia',
      'seg-vk-palermo-rome',
      'seg-vk-rome-constantinople-trade',
    ],
    summary: {
      en: 'The long arc from Atlantic Francia and Iberia through Gibraltar into the western and central Mediterranean — raids, slaving, and mercenary service to Rome and Byzantium.',
      fr: 'Le long arc de la Francie atlantique et de l\'Ibérie par Gibraltar vers la Méditerranée occidentale et centrale — raids, traite et service mercenaire jusqu\'à Rome et Byzance.',
      it: 'Il lungo arco dalla Francia atlantica e dall\'Iberia attraverso Gibilterra verso il Mediterraneo occidentale e centrale — razzie, schiavitù e servizio mercenario fino a Roma e Bisanzio.',
    },
  },
  {
    id: 'journey-viking-volga-caspian-baghdad',
    name: {
      en: 'Volga — Caspian — Islamic Silver',
      fr: 'Volga — Caspienne — argent islamique',
      it: 'Volga — Caspio — argento islamico',
    },
    eraIds: ['viking-age', 'norman-origins'],
    segmentIds: ['seg-vk-bulgar-caspian-south', 'seg-vk-caspian-baghdad-silver'],
    summary: {
      en: 'Extension of the Volga trade route toward Caspian and Mesopotamian markets — the eastern anchor of the dirham flows that reached Scandinavia.',
      fr: 'Prolongement de la route commerciale de la Volga vers les marchés caspiens et mésopotamiens — l\'ancrage oriental des flux de dirhams parvenus en Scandinavie.',
      it: 'Prolungamento della rotta commerciale della Volga verso i mercati caspici e mesopotamici — l\'ancora orientale dei flussi di dirham giunti in Scandinavia.',
    },
  },
  {
    id: 'journey-loire-raids',
    name: { en: 'Loire Valley Raids', fr: 'Raids dans la vallée de la Loire', it: 'Incursioni nella valle della Loira' },
    eraIds: ['frankish-carolingian', 'viking-age'],
    segmentIds: ['seg-atlantic-loire'],
    summary: {
      en: 'Vikings sacked Nantes in 843 and used the Loire as a highway into central Francia. Raiding parties reached Tours and Orléans, terrorising the Carolingian heartland.',
      fr: 'Les Vikings pillèrent Nantes en 843 et utilisèrent la Loire comme voie de pénétration vers le centre de la Francie.',
      it: 'I vichinghi saccheggiarono Nantes nell\'843 e usarono la Loira come strada verso la Francia centrale. Le bande giunsero fino a Tours e Orléans, terrorizzando il cuore carolingio.',
    },
  },
  {
    id: 'journey-rhine-raids',
    name: { en: 'Rhine / Meuse Raids', fr: 'Raids du Rhin / de la Meuse', it: 'Incursioni sul Reno / sulla Mosa' },
    eraIds: ['frankish-carolingian', 'viking-age'],
    segmentIds: ['seg-northsea-rhine'],
    summary: {
      en: 'Danish fleets entered the Rhine and Meuse estuaries, raiding Dorestad, Utrecht, and Cologne. These attacks ravaged Lotharingia and the Low Countries.',
      fr: 'Les flottes danoises pénétrèrent les estuaires du Rhin et de la Meuse, pillant Dorestad, Utrecht et Cologne.',
      it: 'Le flotte danesi penetrarono negli estuari del Reno e della Mosa, saccheggiando Dorestad, Utrecht e Colonia. Gli attacchi devastarono la Lotaringia e i Paesi Bassi.',
    },
  },
  {
    id: 'journey-eastern-rivers',
    name: { en: 'Baltic to Novgorod — Eastern Gateway', fr: 'Baltique vers Novgorod — porte orientale', it: 'Dal Baltico a Novgorod — porta orientale' },
    eraIds: ['viking-age', 'norman-origins'],
    segmentIds: [
      'seg-birka-ladoga',
      'seg-ladoga-novgorod',
    ],
    summary: {
      en: 'Swedish Varangians crossed the Baltic to Staraya Ladoga and Novgorod, opening the gateway to the Russian river system and Islamic silver trade.',
      fr: 'Les Varègues suédois traversèrent la Baltique vers Staraya Ladoga et Novgorod, ouvrant la porte du réseau fluvial russe et du commerce de l\'argent islamique.',
      it: 'I variaghi svedesi attraversarono il Baltico verso Staraja Ladoga e Novgorod, aprendo l\'accesso alla rete fluviale russa e al commercio dell\'argento islamico.',
    },
  },
  {
    id: 'journey-dnieper-route',
    name: { en: 'Dnieper Route — Varangians to the Greeks', fr: 'Route du Dniepr — des Varègues aux Grecs', it: 'Rotta del Dnepr — dai Variaghi ai Greci' },
    eraIds: ['viking-age', 'norman-origins'],
    segmentIds: [
      'seg-novgorod-kiev',
      'seg-kiev-constantinople',
    ],
    summary: {
      en: 'The "road from the Varangians to the Greeks": from Novgorod down the Dnieper through Kiev to Constantinople. This was the lifeline of the Kievan Rus and the most lucrative eastern trade route.',
      fr: 'La « route des Varègues aux Grecs » : de Novgorod en descendant le Dniepr par Kiev jusqu\'à Constantinople. C\'était l\'artère vitale de la Rus kiévienne.',
      it: 'La «strada dai Variaghi ai Greci»: da Novgorod lungo il Dnepr, passando per Kiev, fino a Costantinopoli. Era l\'arteria vitale della Rus\' di Kiev e la più redditizia rotta commerciale verso oriente.',
    },
  },
  {
    id: 'journey-volga-route',
    name: { en: 'Volga Trade Route', fr: 'Route commerciale de la Volga', it: 'Rotta commerciale della Volga' },
    eraIds: ['viking-age'],
    segmentIds: ['seg-novgorod-bulgar'],
    summary: {
      en: 'Varangian traders followed the Volga to Bulgar and beyond toward the Caspian. Islamic silver flowed north; furs, honey, and slaves flowed south. Thousands of Arabic dirhams found across Scandinavia attest to this corridor.',
      fr: 'Les marchands varègues suivirent la Volga jusqu\'à Bulgar et au-delà vers la Caspienne. L\'argent islamique coulait vers le nord ; fourrures, miel et esclaves coulaient vers le sud.',
      it: 'I mercanti variaghi seguirono la Volga fino a Bulgar e oltre verso il Caspio. L\'argento islamico fluiva a nord; pelli, miele e schiavi a sud. Migliaia di dirham arabi ritrovati in Scandinavia testimoniano questo corridoio.',
    },
  },
  {
    id: 'journey-atlantic-norse',
    name: { en: 'Atlantic Norse — Iceland to Vinland', fr: 'Norrois atlantique — Islande au Vinland', it: 'Nordici atlantici — Islanda al Vinland' },
    eraIds: ['viking-age', 'norman-origins'],
    segmentIds: [
      'seg-norway-iceland',
      'seg-iceland-greenland',
      'seg-greenland-vinland',
    ],
    summary: {
      en: 'Norwegian settlers colonised Iceland (c. 870), then Greenland (c. 985), and briefly reached North America (c. 1000). This westward push across the open Atlantic represents the farthest extent of Viking expansion.',
      fr: 'Les colons norvégiens colonisèrent l\'Islande (vers 870), puis le Groenland (vers 985), et atteignirent brièvement l\'Amérique du Nord (vers 1000). Cette expansion vers l\'ouest représente l\'étendue maximale de l\'expansion viking.',
      it: 'I coloni norvegesi colonizzarono l\'Islanda (ca. 870), poi la Groenlandia (ca. 985) e raggiunsero brevemente il Nord America (ca. 1000). Questa spinta verso ovest attraverso l\'Atlantico aperto segna il limite più lontano dell\'espansione vichinga.',
    },
  },
  // --- Age of Exploration journeys ---
  {
    id: 'journey-verrazzano',
    name: { en: 'Verrazzano\'s Voyage (1524)', fr: 'Voyage de Verrazzano (1524)', it: 'Viaggio di Verrazzano (1524)' },
    eraIds: ['age-of-exploration'],
    segmentIds: [
      'seg-verrazzano-dieppe-atlantic',
      'seg-verrazzano-coast-north',
      'seg-verrazzano-new-england',
    ],
    summary: {
      en: 'Giovanni da Verrazzano, sailing for King Francis I, crossed the Atlantic from Dieppe in 1524 and charted the North American coast from Cape Fear to Newfoundland — the first continuous description of the Atlantic seaboard. He entered New York harbor, explored Narragansett Bay, and returned to France having established France\'s earliest claim to the continent.',
      fr: 'Giovanni da Verrazzano, naviguant pour le roi François Ier, traversa l\'Atlantique depuis Dieppe en 1524 et cartographia la côte nord-américaine de Cape Fear à Terre-Neuve — la première description continue du littoral atlantique. Il entra dans la baie de New York, explora la baie de Narragansett et rentra en France après avoir établi la plus ancienne revendication française sur le continent.',
      it: 'Giovanni da Verrazzano, al servizio del re Francesco I, attraversò l\'Atlantico da Dieppe nel 1524 e cartografò la costa nordamericana da Cape Fear a Terranova — la prima descrizione continua del litorale atlantico. Entrò nella baia di New York, esplorò la baia di Narragansett e tornò in Francia, stabilendo la più antica rivendicazione francese sul continente.',
    },
  },
  // --- New France exploration journeys ---
  {
    id: 'journey-cartier',
    name: { en: 'Cartier\'s Voyages (1534–1542)', fr: 'Voyages de Cartier (1534–1542)', it: 'Viaggi di Cartier (1534–1542)' },
    eraIds: ['age-of-exploration'],
    segmentIds: [
      'seg-cartier-atlantic',
      'seg-cartier-gulf-stadacona',
      'seg-cartier-stadacona-hochelaga',
    ],
    summary: {
      en: 'Jacques Cartier sailed from Saint-Malo in Brittany on three voyages (1534, 1535–36, 1541–42), charting the Gulf of St. Lawrence and navigating upriver to Stadacona and Hochelaga. He opened France\'s claim to North America and established the first sustained European contact with the St. Lawrence Iroquoians.',
      fr: 'Jacques Cartier quitta Saint-Malo en Bretagne pour trois voyages (1534, 1535–36, 1541–42), cartographiant le golfe du Saint-Laurent et remontant le fleuve jusqu\'à Stadacona et Hochelaga. Il ouvrit la revendication française en Amérique du Nord et établit le premier contact européen durable avec les Iroquoiens du Saint-Laurent.',
      it: 'Jacques Cartier salpò da Saint-Malo in Bretagna per tre viaggi (1534, 1535–36, 1541–42), cartografando il golfo di San Lorenzo e risalendo il fiume fino a Stadacona e Hochelaga. Aprì la rivendicazione francese in Nord America e stabilì il primo contatto europeo prolungato con gli Irochesi del San Lorenzo.',
    },
  },
  {
    id: 'journey-champlain-great-lakes',
    name: { en: 'Champlain\'s Great Lakes Exploration', fr: 'Exploration des Grands Lacs par Champlain', it: 'Esplorazione dei Grandi Laghi di Champlain' },
    eraIds: ['new-france-foundations'],
    segmentIds: ['seg-champlain-quebec-huron'],
    summary: {
      en: 'Samuel de Champlain pushed the French frontier beyond the St. Lawrence in 1615, travelling into the Great Lakes via the Ottawa River to forge alliances with the Wendat (Huron). This opened the entire western interior to French influence.',
      fr: 'Samuel de Champlain repoussa la frontière française au-delà du Saint-Laurent en 1615, voyageant dans les Grands Lacs via la rivière des Outaouais pour forger des alliances avec les Wendats (Hurons).',
      it: 'Nel 1615 Samuel de Champlain spinse la frontiera francese oltre il San Lorenzo, penetrando nei Grandi Laghi via fiume Ottawa per stringere alleanze con i Wendat (Huron). Aprì così tutto l\'interno occidentale all\'influenza francese.',
    },
  },
  {
    id: 'journey-brule-interior',
    name: { en: 'Brûlé\'s Interior Penetration', fr: 'Pénétration intérieure de Brûlé', it: 'Penetrazione nell\'interno di Brûlé' },
    eraIds: ['new-france-foundations'],
    segmentIds: ['seg-brule-huron-interior'],
    summary: {
      en: 'Étienne Brûlé lived among Indigenous peoples and explored the Great Lakes before any other European. His journeys into the upper lakes preceded formal French mapping by decades.',
      fr: 'Étienne Brûlé vécut parmi les peuples autochtones et explora les Grands Lacs avant tout autre Européen.',
      it: 'Étienne Brûlé visse tra i popoli indigeni ed esplorò i Grandi Laghi prima di qualsiasi altro europeo. I suoi viaggi verso i laghi superiori anticiparono di decenni la cartografia francese ufficiale.',
    },
  },
  {
    id: 'journey-radisson-groseilliers',
    name: { en: 'Radisson & Des Groseilliers', fr: 'Radisson et Des Groseilliers', it: 'Radisson e Des Groseilliers' },
    eraIds: ['new-france-foundations', 'royal-new-france'],
    segmentIds: ['seg-radisson-montreal-greatlakes'],
    summary: {
      en: 'Radisson and Des Groseilliers explored the upper Great Lakes and western fur country in the 1650s–1660s. Their discoveries of rich beaver lands west of the lakes ultimately led to the founding of the Hudson\'s Bay Company.',
      fr: 'Radisson et Des Groseilliers explorèrent les Grands Lacs supérieurs et le pays des fourrures occidental dans les années 1650–1660.',
      it: 'Radisson e Des Groseilliers esplorarono i Grandi Laghi superiori e il paese delle pellicce occidentale negli anni 1650–1660. La scoperta di terre ricche di castoro a ovest dei laghi portò in ultimo alla fondazione della Hudson\'s Bay Company.',
    },
  },
  {
    id: 'journey-jolliet-marquette',
    name: { en: 'Jolliet & Marquette — Mississippi Discovery', fr: 'Jolliet et Marquette — Découverte du Mississippi', it: 'Jolliet e Marquette — Scoperta del Mississippi' },
    eraIds: ['royal-new-france'],
    segmentIds: [
      'seg-jolliet-michilimackinac-greenbay',
      'seg-jolliet-greatlakes-mississippi',
    ],
    summary: {
      en: 'In 1673, Louis Jolliet and Father Marquette descended from the Great Lakes to the Mississippi, confirming the river\'s southward course toward the Gulf of Mexico and opening the way for La Salle\'s later claim.',
      fr: 'En 1673, Louis Jolliet et le père Marquette descendirent des Grands Lacs au Mississippi, confirmant que le fleuve coulait vers le sud en direction du golfe du Mexique.',
      it: 'Nel 1673 Louis Jolliet e padre Marquette discesero dai Grandi Laghi al Mississippi, confermando la direzione meridionale del fiume verso il golfo del Messico e aprendo la strada alle successive rivendicazioni di La Salle.',
    },
  },
  {
    id: 'journey-lasalle-mississippi',
    name: { en: 'La Salle — Mississippi to the Gulf', fr: 'La Salle — Mississippi au Golfe', it: 'La Salle — Mississippi fino al Golfo' },
    eraIds: ['royal-new-france'],
    segmentIds: [
      'seg-lasalle-greatlakes-mississippi',
      'seg-lasalle-mississippi-gulf',
    ],
    summary: {
      en: 'René-Robert Cavelier de La Salle, a Rouennais, descended the full Mississippi to the Gulf of Mexico in 1682 and claimed the entire basin for France as "Louisiana." This single act transformed New France from a riverine colony into a continental empire — at least on paper.',
      fr: 'René-Robert Cavelier de La Salle, un Rouennais, descendit tout le Mississippi jusqu\'au golfe du Mexique en 1682 et revendiqua l\'ensemble du bassin pour la France sous le nom de « Louisiane ».',
      it: 'René-Robert Cavelier de La Salle, originario di Rouen, percorse l\'intero Mississippi fino al golfo del Messico nel 1682 e rivendicò per la Francia l\'intero bacino con il nome di «Louisiana». Questo atto trasformò la Nuova Francia da colonia fluviale in impero continentale — almeno sulla carta.',
    },
  },
  {
    id: 'journey-nicolet',
    name: { en: 'Jean Nicolet — Lake Michigan (1634)', fr: 'Jean Nicolet — Lac Michigan (1634)', it: 'Jean Nicolet — Lago Michigan (1634)' },
    eraIds: ['new-france-foundations'],
    segmentIds: [
      'seg-nicolet-troisrivieres-huron',
      'seg-nicolet-huron-greenbay',
    ],
    summary: {
      en: 'Jean Nicolet, a Norman from Cherbourg, was sent by Champlain in 1634 to find the "People of the Sea." He became the first European to pass through the Straits of Mackinac and enter Lake Michigan, reaching Green Bay and the Ho-Chunk (Winnebago) people. His journey extended French knowledge far beyond the Great Lakes.',
      fr: 'Jean Nicolet, un Normand de Cherbourg, fut envoyé par Champlain en 1634 pour trouver les « Gens de Mer ». Il devint le premier Européen à traverser le détroit de Mackinac et à entrer dans le lac Michigan, atteignant la Baie des Puants et le peuple Ho-Chunk (Winnebago).',
      it: 'Jean Nicolet, normanno di Cherbourg, fu inviato da Champlain nel 1634 alla ricerca dei «Popoli del Mare». Divenne il primo europeo ad attraversare lo stretto di Mackinac e a entrare nel lago Michigan, raggiungendo Green Bay e il popolo Ho-Chunk (Winnebago).',
    },
  },
  {
    id: 'journey-couture',
    name: {
      en: 'Guillaume Couture — Interpreter, diplomat, explorer (1618–1701)',
      fr: 'Guillaume Couture — Interprète, diplomate, explorateur (1618–1701)',
      es: 'Guillaume Couture — Intérprete, diplomático, explorador (1618–1701)',
      it: 'Guillaume Couture — Interprete, diplomatico, esploratore (1618–1701)',
    },
    eraIds: ['new-france-foundations'],
    segmentIds: [
      'seg-couture-quebec-huronia',
      'seg-couture-iroquois-captivity',
      'seg-couture-saguenay-mistassini',
    ],
    summary: {
      en: 'From Rouen to the Mohawk towns and back: a Jesuit donné who became one of New France\'s indispensable interpreters — Huronia, captivity, Pointe-Lévy, the Long Sault, and the 1663 push to Mistassini.',
      fr: 'De Rouen aux villages mohawks et retour : un donné jésuite devenu l\'un des interprètes indispensables de la Nouvelle-France — Huronie, captivité, Pointe-Lévy, Long-Sault et la poussée de 1663 vers le Mistassini.',
      es: 'De Rouen a los pueblos mohawk y de vuelta: un donné jesuita que se convirtió en uno de los intérpretes indispensables de Nueva Francia — Huronia, cautiverio, Pointe-Lévy, Long Sault y la expedición de 1663 al Mistassini.',
      it: 'Da Rouen ai villaggi mohawk e ritorno: un donné gesuita divenuto uno degli interpreti indispensabili della Nuova Francia — Huronia, prigionia, Pointe-Lévy, Long Sault e la spedizione del 1663 verso il Mistassini.',
    },
    surnameNote: {
      en: 'Couture: from Old French, meaning cultivated land or cleared farmland — a name tied to rural settlement and toponyms, not to the sewing trade.\n\nIn Norman and northern French usage, Couture as a surname usually belongs to the world of place and land. Old French couture here continues Latin cultura (cultivation, care of soil): enclosed or worked fields, plots brought into production. The word appears in field names, rural designations, and early records; families could take the name from living “by the cultivated ground” or from a local toponym.\n\nThere is a second, unrelated word: Old French couture from Latin consūtūra (a seam), whence “sewing.” That occupational branch exists in French surnames, but it is a different root and is not the usual reading for Norman rural lines that fed colonial recruitment — including the line that crossed to New France.\n\nFor this atlas, the name underscores territory shaped for settlement: Norman expansion, the seigneurial ribbon along the St. Lawrence, and a life spent turning frontier into habitation.',
      fr: 'Couture : en vieux français, terre cultivée ou terre défrichée et mise en valeur — un nom lié à l\'habitat rural et aux lieux-dits, et non au métier de couturier.\n\nEn Normandie et dans le nord de la France, le patronyme Couture relève le plus souvent du monde du lieu et de la terre. Ici, le vieux français couture prolonge le latin cultura (culture du sol) : champs clos, parcelles en culture, terres préparées pour l\'agriculture. Le mot apparaît dans les noms de champs, les désignations rurales et les registres ; une famille pouvait le porter en raison d\'un toponyme ou d\'une situation « près de la couture » (terrain travaillé).\n\nIl existe un second mot, sans lien : vieux français couture issu du latin consūtūra (couture, suture), d\'où le sens « couture » textile. Cette branche patronymique artisanale est réelle, mais la racine est différente ; pour les lignées normandes du Canada, la lecture « terre et peuplement » correspond mieux au contexte rural et colonial de l\'atlas.\n\nIci, le nom rejoint l\'idée de territoire façonné pour s\'y installer : expansion normande, ruban seigneurial du Saint-Laurent, et une vie à faire tenir ensemble frontière et terre labourée.',
      es: 'Couture: en antiguo francés, tierra cultivada o terreno aclarado y dedicado al cultivo — un apellido ligado al asentamiento rural y a los topónimos, no al oficio de la costura.\n\nEn Normandía y el norte de Francia, Couture suele pertenecer al mundo del lugar y de la tierra. Aquí el antiguo francés couture continúa el latín cultura (cultivo del suelo): campos cerrados, parcelles productivas. La palabra aparece en nombres de campo y registros rurales; la familia podía tomar el nombre de un topónimo o de vivir «junto a la tierra labrada».\n\nExiste una segunda palabra, sin parentesco: antiguo francés couture del latín consūtūra (costura), de donde «costura» textil. Esa rama patronímica artesanal es distinta; para los linajes normandos de Nueva Francia encaja mejor la lectura de tierra y colonización.\n\nEn este atlas, el nombre refuerza el territorio moldeado para el asentamiento: expansión normanda, franja señorial del San Lorenzo y una vida en la frontera hecha hábitat.',
      it: 'Couture: in antico francese, terra coltivata o terreno bonificato e messo a coltura — un cognome legato all\'insediamento rurale e ai toponimi, non al mestiere del sarto.\n\nIn Normandia e nel nord della Francia, Couture appartiene di solito al mondo del luogo e della terra. Qui l\'antico francese couture prosegue il latino cultura (coltivazione del suolo): campi recintati, appezzamenti resi produttivi. La parola compare in microtoponimi e designazioni rurali; la famiglia poteva assumere il nome da un toponimo o dalla vicinanza alla «couture» (terreno lavorato).\n\nEsiste una seconda parola, non imparentata: antico francese couture dal latino consūtūra (cucitura), da cui il senso «cucito» tessile. Quel ramo patronimico artigiano ha radice diversa; per le linee normanne del Canada la lettura «terra e popolamento» si adatta meglio al contesto rurale e coloniale dell\'atlante.\n\nQui il nome richiama il territorio plasmato per l\'abitare: espansione normanna, nastro signorile del San Lorenzo e una vita di frontiera fatta dimora.',
    },
    longForm: {
      en: 'Guillaume Couture (1618–1701) is one of the most documented bridge figures between Norman recruitment networks, the Jesuit missions, and the Indigenous diplomacies of the mid-17th-century St. Lawrence.\n\nHe was baptised on 14 January 1618 at Rouen — a great Norman river port already tied to Canada through merchants, clerics, and royal charters. Around 1640 he arrived in the colony as a donné: a lay associate who worked for the Jesuits without priestly vows. Trained as a carpenter, he was sent in 1641 toward the Huron (Wendat) missions, travelling the Ottawa–Mattawa route toward the upper Great Lakes world that French sources called Huronia.\n\nIn August 1642, while returning toward the French settlements with Father Isaac Jogues and others, he was taken by a Mohawk war party. Tortured according to Iroquois ritual practice for enemies, he survived when many did not. Adopted into a Mohawk family, he learned their language and protocols from the inside — a rare depth of exposure for a French layman. In 1645 he returned to Trois-Rivières escorting peace overtures, beginning a long second career as interpreter, militiaman, and negotiator on a frontier where words could matter as much as muskets.\n\nHe was not “seigneur of Lauzon.” The seigneury belonged to Charles de Lauzon. Couture received a concession on the Pointe-Lévy shore opposite Québec — among the early habitant foundations of what later became Lévis. There he farmed, raised a family, and remained a man the governor and missionaries called on when Indigenous alliances frayed.\n\nIn 1660 he volunteered for Dollard des Ormeaux’s sortie up the Ottawa River; the siege at the Long Sault became a foundational legend of French Canada. In 1663 he led the canoe expedition up the Saguenay to Lake Mistassini, extending French geographic knowledge deep into the subarctic interior.\n\nHe died in April 1701 and was buried at Québec. His descendants are counted in the tens of thousands across North America — a demographic echo of the small founder population of Canada.\n\nSources: Dictionary of Canadian Biography (biographi.ca); Jesuit Relations and allied documentary corpora; standard histories of New France for the Long Sault and Mistassini expeditions.',
      fr: 'Guillaume Couture (1618–1701) est l\'une des figures les mieux documentées entre les réseaux normands de recrutement, les missions jésuites et les diplomacies autochtones du Saint-Laurent au milieu du XVIIe siècle.\n\nBaptisé le 14 janvier 1618 à Rouen — grand port fluvial normand déjà lié au Canada par marchands, clercs et lettres royales —, il arriva vers 1640 dans la colonie comme donné : auxiliaire laïc des Jésuites sans vœux sacerdotaux. Charpentier de formation, il fut envoyé en 1641 vers les missions huronnes (Wendat), suivant la route Outaouais–Mattawa vers le monde des Grands Lacs que les sources françaises appelaient la Huronie.\n\nEn août 1642, au retour vers les établissements français avec le père Isaac Jogues et d\'autres, il fut pris par un parti de guerre mohawk. Torturé selon les rites iroquois réservés aux ennemis, il survécut là où d\'autres périrent. Adopté dans une famille mohawk, il en apprit la langue et les protocoles de l\'intérieur — une rare profondeur pour un laïque français. En 1645 il revint à Trois-Rivières en escortant des ouvertures de paix, entamant une longue seconde carrière d\'interprète, milicien et négociateur sur une frontière où la parole pouvait peser autant que le mousquet.\n\nIl n\'était pas « seigneur de Lauzon » : la seigneurie relevait de Charles de Lauzon. Couture obtint une concession sur la rive de la Pointe-Lévy en face de Québec — parmi les premières fondations d\'habitants de ce qui deviendra Lévis. Il y cultiva la terre, fonda une famille, et resta l\'homme qu\'on sollicitait lorsque les alliances autochtones se tendaient.\n\nEn 1660, il s\'engagea dans la sortie de Dollard des Ormeaux vers l\'Outaouais ; le siège du Long-Sault devint une légende fondatrice du Canada français. En 1663, il mena l\'expédition en canot par le Saguenay jusqu\'au lac Mistassini, prolongeant la connaissance géographique française vers l\'intérieur subarctique.\n\nIl mourut en avril 1701 et fut inhumé à Québec. Ses descendants se comptent par dizaines de milliers en Amérique du Nord — écho démographique de la mince population fondatrice du Canada.\n\nSources : Dictionnaire biographique du Canada (biographi.ca) ; Relations des Jésuites et corpus documentaires connexes ; histoires classiques de la Nouvelle-France pour le Long-Sault et le Mistassini.',
      it: 'Guillaume Couture (1618–1701) è una delle figure meglio documentate tra le reti normanne di reclutamento, le missioni gesuite e le diplomazie indigene del San Lorenzo a metà Seicento.\n\nBattezzato il 14 gennaio 1618 a Rouen — grande porto fluviale normanno già legato al Canada da mercanti, chierici e carteggi reali —, giunse verso il 1640 nella colonia come donné, associato laico dei Gesuiti senza voti sacerdotali. Falegname, nel 1641 fu inviato verso le missioni huron (Wendat), lungo la rotta Ottawa–Mattawa verso i Grandi Laghi che le fonti francesi chiamavano Huronia.\n\nNell\'agosto 1642, al ritorno verso gli insediamenti francesi con padre Isaac Jogues e altri, fu catturato da un gruppo di guerra mohawk. Torturato secondo il rituale irochese per i nemici, sopravvisse dove altri morirono. Adottato in una famiglia mohawk, ne apprese lingua e protocolli dall\'interno — rara profondità per un laico francese. Nel 1645 tornò a Trois-Rivières scortando aperture di pace, iniziando una lunga seconda carriera di interprete, miliziano e negoziatore su una frontiera dove le parole pesavano quanto i moschetti.\n\nNon era «signore di Lauzon»: la signoria spettava a Charles de Lauzon. Couture ricevette una concessione sulla riva di Pointe-Lévy di fronte a Québec — tra le prime fondazioni di habitant di ciò che divenne Lévis. Coltivò la terra, fondò una famiglia e restò l\'uomo che governatori e missionari chiamavano quando le alleanze indigene si incrinavano.\n\nNel 1660 si offrì volontario per la sortita di Dollard des Ormeaux verso l\'Ottawa; l\'assedio del Long Sault divenne una leggenda fondativa del Canada francese. Nel 1663 guidò la spedizione in canoa per il Saguenay fino al lago Mistassini, estendendo la conoscenza geografica francese nell\'interno subartico.\n\nMorì nell\'aprile 1701 e fu sepolto a Québec. I suoi discendenti si contano a decine di migliaia in Nord America — eco demografica della piccola popolazione fondatrice del Canada.\n\nFonti: Dictionary of Canadian Biography (biographi.ca); Relations des Jésuites e corpora documentali affini; storie standard della Nuova Francia per Long Sault e Mistassini.',
      es: 'Guillaume Couture (1618–1701) es uno de los personajes mejor documentados entre las redes normandas de reclutamiento, las misiones jesuitas y las diplomacias indígenas del San Lorenzo a mediados del siglo XVII.\n\nBautizado el 14 de enero de 1618 en Rouen —gran puerto fluvial normando ya vinculado a Canadá por mercaderes, clérigos y patentes reales—, llegó hacia 1640 a la colonia como donné: asociado laico de los jesuitas sin votos sacerdotales. Carpintero de formación, en 1641 fue enviado hacia las misiones huronas (wendat), por la ruta Ottawa–Mattawa hacia los Grandes Lagos que las fuentes francesas llamaban Huronia.\n\nEn agosto de 1642, al volver hacia los establecimientos franceses con el padre Isaac Jogues y otros, fue capturado por una partida mohawk. Torturado según el ritual iroqués para enemigos, sobrevivió donde otros perecieron. Adoptado en una familia mohawk, aprendió su idioma y protocolos desde dentro — rara profundidad para un laico francés. En 1645 regresó a Trois-Rivières escoltando gestiones de paz, iniciando una larga segunda carrera como intérprete, miliciano y negociador en una frontera donde las palabras pesaban tanto como los mosquetes.\n\nNo fue «señor de Lauzon»: la señorío correspondía a Charles de Lauzon. Couture recibió una concesión en la orilla de Pointe-Lévy frente a Québec — entre los primeros asentamientos de habitants de lo que sería Lévis. Allí cultivó la tierra, fundó familia y siguió siendo el hombre al que gobernadores y misioneros recurrirían cuando las alianzas indígenas se tensaban.\n\nEn 1660 se ofreció para la salida de Dollard des Ormeaux río Ottawa; el asedio de Long Sault se convirtió en leyenda fundacional del Canadá francés. En 1663 encabezó la expedición en canoa por el Saguenay hasta el lago Mistassini, ampliando el conocimiento geográfico francés hacia el interior subártico.\n\nMurió en abril de 1701 y fue enterrado en Québec. Sus descendientes se cuentan por decenas de miles en América del Norte — eco demográfico de la escasa población fundadora del Canadá.\n\nFuentes: Dictionary of Canadian Biography (biographi.ca); Relaciones jesuitas y corpus documentales afines; historias estándar de Nueva Francia para Long Sault y Mistassini.',
    },
  },
  {
    id: 'journey-hennepin',
    name: { en: 'Hennepin — Upper Mississippi (1680)', fr: 'Hennepin — Haut Mississippi (1680)', it: 'Hennepin — Alto Mississippi (1680)' },
    eraIds: ['royal-new-france'],
    segmentIds: [
      'seg-hennepin-illinois-mississippi',
      'seg-hennepin-upper-mississippi',
    ],
    summary: {
      en: 'Father Louis Hennepin, a Récollet friar, was sent by La Salle to explore the upper Mississippi in 1680. Captured by the Sioux, he was carried into present-day Minnesota where he reached and named the Falls of St. Anthony (modern Minneapolis). Rescued by Dulhut, he returned to publish accounts that became bestsellers in Europe.',
      fr: 'Le père Louis Hennepin, un frère récollet, fut envoyé par La Salle pour explorer le haut Mississippi en 1680. Capturé par les Sioux, il fut emmené dans l\'actuel Minnesota où il atteignit et nomma les chutes Saint-Antoine (l\'actuelle Minneapolis). Secouru par Dulhut, il rentra pour publier des récits devenus des succès de librairie en Europe.',
      it: 'Padre Louis Hennepin, frate recolletto, fu inviato da La Salle a esplorare l\'alto Mississippi nel 1680. Catturato dai Sioux, fu condotto nell\'odierno Minnesota dove raggiunse e battezzò le cascate di Sant\'Antonio (l\'odierna Minneapolis). Liberato da Dulhut, tornò per pubblicare resoconti che divennero bestseller in Europa.',
    },
  },
  {
    id: 'journey-iberville',
    name: { en: 'd\'Iberville — Louisiana Founding (1699)', fr: 'd\'Iberville — Fondation de la Louisiane (1699)', it: 'd\'Iberville — Fondazione della Louisiana (1699)' },
    eraIds: ['royal-new-france'],
    segmentIds: [
      'seg-iberville-atlantic-gulf',
      'seg-iberville-mississippi-mouth',
    ],
    summary: {
      en: 'Pierre Le Moyne d\'Iberville, born in Montréal to Norman parents from Dieppe and Rouen, sailed from France to the Gulf Coast in 1699, located the Mississippi\'s mouth from the sea, and founded Fort Maurepas at Biloxi — the first permanent French settlement in Louisiana. His expedition completed the French circuit from the St. Lawrence to the Gulf.',
      fr: 'Pierre Le Moyne d\'Iberville, né à Montréal de parents normands de Dieppe et Rouen, navigua de France à la côte du Golfe en 1699, localisa l\'embouchure du Mississippi depuis la mer et fonda Fort Maurepas à Biloxi — le premier établissement français permanent en Louisiane.',
      it: 'Pierre Le Moyne d\'Iberville, nato a Montréal da genitori normanni di Dieppe e Rouen, salpò dalla Francia alla costa del Golfo nel 1699, individuò la foce del Mississippi dal mare e fondò Fort Maurepas a Biloxi — il primo insediamento francese permanente in Louisiana.',
    },
  },
  {
    id: 'journey-verendrye',
    name: { en: 'La Vérendrye — Western Prairies (1731–1743)', fr: 'La Vérendrye — Prairies de l\'Ouest (1731–1743)', it: 'La Vérendrye — Praterie occidentali (1731–1743)' },
    eraIds: ['atlantic-imprint'],
    segmentIds: [
      'seg-verendrye-montreal-superior',
      'seg-verendrye-superior-winnipeg',
      'seg-verendrye-winnipeg-mandan',
    ],
    summary: {
      en: 'Pierre Gaultier de Varennes, sieur de La Vérendrye, pushed French exploration to its continental maximum. From 1731 he established a chain of trading posts from Lake Superior to Lake Winnipeg, reached the Mandan villages on the upper Missouri in 1738, and his sons may have sighted the Rocky Mountain foothills in 1742–1743. No European had ever traveled so far west from the St. Lawrence.',
      fr: 'Pierre Gaultier de Varennes, sieur de La Vérendrye, porta l\'exploration française à son maximum continental. À partir de 1731, il établit une chaîne de postes de traite du lac Supérieur au lac Winnipeg, atteignit les villages mandans du haut Missouri en 1738, et ses fils aperçurent peut-être les contreforts des Rocheuses en 1742–1743.',
      it: 'Pierre Gaultier de Varennes, sieur de La Vérendrye, spinse l\'esplorazione francese al suo massimo continentale. Dal 1731 stabilì una catena di posti di commercio dal lago Superiore al lago Winnipeg, raggiunse i villaggi Mandan sull\'alto Missouri nel 1738, e i suoi figli nel 1742–1743 avvistarono forse le prime propaggini delle Montagne Rocciose.',
    },
  },
  // ── Viking: Frisian coast & Dorestad hub ───────────────────────
  {
    id: 'journey-viking-frisian-coast',
    name: {
      en: 'Frisian Coast & Dorestad Trade Hub',
      fr: 'Côte frisonne et centre commercial de Dorestad',
    },
    eraIds: ['frankish-carolingian', 'viking-age'],
    segmentIds: [
      'seg-vk-hedeby-dorestad',
      'seg-vk-dorestad-utrecht',
      'seg-vk-dorestad-hamburg',
      'seg-vk-hamburg-hedeby',
      'seg-vk-london-dorestad',
    ],
    summary: {
      en: 'The Frisian coast was a nexus of Carolingian commerce. Dorestad, the largest emporium north of the Alps, was raided by Vikings repeatedly (834–863) before declining. Hedeby and Hamburg connected this coast to the Baltic trade network.',
      fr: 'La côte frisonne était un nœud du commerce carolingien. Dorestad, le plus grand emporium au nord des Alpes, fut pillé à plusieurs reprises par les Vikings (834–863) avant de décliner.',
    },
  },
  // ── Viking: White Sea / Bjarmaland exploration ──────────────────
  {
    id: 'journey-viking-white-sea',
    name: {
      en: 'White Sea — Bjarmaland Fur Frontier',
      fr: 'Mer Blanche — frontière des fourrures de Bjarmaland',
    },
    eraIds: ['viking-age'],
    segmentIds: ['seg-vk-trondheim-whitesea'],
    summary: {
      en: 'Norse traders and explorers from Trondheim ventured northeast along the Norwegian coast and around the North Cape to Bjarmaland (White Sea region), seeking furs, walrus ivory, and tribute from the Finnic Bjarmians.',
      fr: 'Des marchands et explorateurs norrois partis de Trondheim s\'aventurèrent au nord-est le long de la côte norvégienne et autour du Cap Nord vers le Bjarmaland (région de la mer Blanche), en quête de fourrures, d\'ivoire de morse et de tributs des Bjarmiens finnois.',
    },
  },
  // ── Viking: Channel mesh ────────────────────────────────────────
  {
    id: 'journey-viking-channel-mesh',
    name: {
      en: 'English Channel Raid & Trade Mesh',
      fr: 'Réseau de raids et de commerce de la Manche',
    },
    eraIds: ['viking-age', 'norman-origins'],
    segmentIds: [
      'seg-vk-south-coast-rouen',
      'seg-vk-south-coast-nantes',
    ],
    summary: {
      en: 'Cross-Channel links between southern England, Rouen, and Brittany that carried both Viking raids and post-settlement trade in the 9th–11th centuries.',
      fr: 'Liaisons transmanche entre le sud de l\'Angleterre, Rouen et la Bretagne, vecteurs à la fois de raids vikings et de commerce post-colonisation aux IXe–XIe siècles.',
    },
  },
];
