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
  // --- New France exploration journeys ---
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
];
