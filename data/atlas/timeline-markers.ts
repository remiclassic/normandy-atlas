import type { TimelineMarker } from '@/core/types';

export const atlasTimelineMarkers: TimelineMarker[] = [
  // ── Deep-time ─────────────────────────────────────────────────────
  {
    id: 'tm-neolithic-monuments',
    kind: 'foundation',
    year: -4500,
    eraIds: ['neolithic-normandy'],
    label: { en: 'First dolmens raised', fr: 'Premiers dolmens érigés', it: 'Primi dolmen eretti' },
    detail: {
      en: 'Megalithic communities along the Channel raised passage graves and dolmens, marking the earliest monumental architecture in what would become Normandy. These structures served as communal tombs and territorial markers.',
      fr: 'Les communautés mégalithiques de la Manche érigèrent des tombes à couloir et des dolmens, premières architectures monumentales de la future Normandie. Ces structures servaient de sépultures collectives et de marqueurs territoriaux.',
      it: 'Le comunità megalitiche della Manica eressero tombe a corridoio e dolmen, le prime architetture monumentali della futura Normandia. Queste strutture servivano come sepolture collettive e marcatori territoriali.',
    },
  },
  {
    id: 'tm-bronze-channel-trade',
    kind: 'exploration',
    year: -1500,
    eraIds: ['bronze-age-channel'],
    label: { en: 'Channel tin trade peaks', fr: 'Apogée du commerce de l\'étain', it: 'Apogeo del commercio dello stagno nella Manica' },
    detail: {
      en: 'Bronze Age mariners established long-distance trade networks across the English Channel, exchanging Cornish tin for Continental bronze goods. These routes foreshadowed the cross-Channel connections that would define the region for millennia.',
      fr: 'Les marins de l\'Âge du bronze établirent des réseaux commerciaux transmanches, échangeant l\'étain de Cornouailles contre des objets en bronze du continent. Ces routes préfiguraient les connexions transmanche qui allaient définir la région pendant des millénaires.',
      it: 'I navigatori dell\'Età del bronzo stabilirono reti commerciali attraverso la Manica, scambiando stagno della Cornovaglia con manufatti in bronzo continentali. Queste rotte prefiguravano i legami transmanche che avrebbero definito la regione per millenni.',
    },
  },
  {
    id: 'tm-celtic-oppida',
    kind: 'foundation',
    year: -300,
    eraIds: ['iron-age-gaul'],
    label: { en: 'Celtic oppida established', fr: 'Oppida celtes établis', it: 'Oppida celtici fondati' },
    detail: {
      en: 'Gaulish tribes fortified hilltop settlements across northern France and the Seine valley. These proto-urban centres — oppida — became hubs of craft production, trade, and political authority before the Roman conquest.',
      fr: 'Les tribus gauloises fortifièrent des villages perchés dans le nord de la France et la vallée de la Seine. Ces centres proto-urbains — les oppida — devinrent des pôles d\'artisanat, de commerce et d\'autorité politique avant la conquête romaine.',
      it: 'Le tribù galliche fortificarono insediamenti collinari nel nord della Francia e nella valle della Senna. Questi centri proto-urbani — gli oppida — divennero poli di artigianato, commercio e autorità politica prima della conquista romana.',
    },
  },
  {
    id: 'tm-caesar-conquest',
    kind: 'battle',
    year: -52,
    eraIds: ['iron-age-gaul', 'roman-gaul'],
    label: { en: 'Caesar conquers Gaul', fr: 'César conquiert la Gaule', it: 'Cesare conquista la Gallia' },
    detail: {
      en: 'Julius Caesar\'s campaigns (58–50 BC) crushed Gaulish resistance, culminating in the siege of Alesia in 52 BC. The conquest integrated Gaul into the Roman world, transforming its roads, cities, and economy for four centuries.',
      fr: 'Les campagnes de Jules César (58–50 av. J.-C.) écrasèrent la résistance gauloise, aboutissant au siège d\'Alésia en 52 av. J.-C. La conquête intégra la Gaule au monde romain, transformant ses routes, villes et économie pendant quatre siècles.',
      it: 'Le campagne di Giulio Cesare (58–50 a.C.) schiacciarono la resistenza gallica, culminando nell\'assedio di Alesia nel 52 a.C. La conquista integrò la Gallia nel mondo romano, trasformandone strade, città ed economia per quattro secoli.',
    },
  },
  {
    id: 'tm-rotomagus-capital',
    kind: 'foundation',
    year: 100,
    eraIds: ['roman-gaul'],
    label: { en: 'Rotomagus: provincial capital', fr: 'Rotomagus : capitale provinciale', it: 'Rotomagus: capitale provinciale' },
    detail: {
      en: 'The Roman city of Rotomagus (modern Rouen) became the administrative capital of the Secunda Lugdunensis province. Its position on the Seine made it a vital river port and economic centre for Roman Gaul.',
      fr: 'La cité romaine de Rotomagus (Rouen moderne) devint la capitale administrative de la province de Lyonnaise seconde. Sa position sur la Seine en fit un port fluvial vital et un centre économique de la Gaule romaine.',
      it: 'La città romana di Rotomagus (l\'odierna Rouen) divenne capitale amministrativa della provincia Lugdunensis Secunda. La sua posizione sulla Senna ne fece un porto fluviale vitale e un centro economico della Gallia romana.',
    },
    action: { type: 'flyToPlace', placeId: 'rouen' },
  },
  {
    id: 'tm-saxon-shore',
    kind: 'battle',
    year: 350,
    eraIds: ['roman-gaul'],
    label: { en: 'Saxon Shore defences', fr: 'Défenses du Litus Saxonicum', it: 'Difese del Litus Saxonicum' },
    detail: {
      en: 'Rome fortified a chain of coastal forts — the Litus Saxonicum — along both shores of the Channel against Saxon and Frankish raiders. These defences signal the earliest large-scale seaborne threat to the region.',
      fr: 'Rome fortifia une chaîne de forts côtiers — le Litus Saxonicum — sur les deux rives de la Manche contre les raids saxons et francs. Ces défenses signalent la première menace maritime à grande échelle dans la région.',
      it: 'Roma fortificò una catena di fortezze costiere — il Litus Saxonicum — su entrambe le sponde della Manica contro i predoni sassoni e franchi. Queste difese segnano la prima minaccia marittima su larga scala nella regione.',
    },
  },

  // ── Post-Roman / Neustria ─────────────────────────────────────────
  {
    id: 'tm-clovis-baptism',
    kind: 'treaty',
    year: 496,
    eraIds: ['post-roman-gaul'],
    label: { en: 'Clovis baptized', fr: 'Baptême de Clovis', it: 'Battesimo di Clodoveo' },
    detail: {
      en: 'Clovis I\'s conversion to Catholic Christianity cemented an alliance with the Gallo-Roman Church and laid the foundation for Frankish dominion over Gaul. The baptism transformed the Merovingian kingdom into the pre-eminent Christian power in the West.',
      fr: 'La conversion de Clovis Ier au christianisme catholique scella une alliance avec l\'Église gallo-romaine et posa les fondements de la domination franque sur la Gaule. Le baptême fit du royaume mérovingien la puissance chrétienne prééminente en Occident.',
      it: 'La conversione di Clodoveo I al cristianesimo cattolico sancì un\'alleanza con la Chiesa gallo-romana e gettò le basi del dominio franco sulla Gallia. Il battesimo trasformò il regno merovingio nella principale potenza cristiana d\'Occidente.',
    },
  },
  {
    id: 'tm-neustria-partition',
    kind: 'treaty',
    year: 561,
    eraIds: ['neustria'],
    label: { en: 'Neustria partitioned', fr: 'Partition de la Neustrie', it: 'Partizione della Neustria' },
    detail: {
      en: 'Following the death of Chlothar I, the Frankish kingdom was divided among his sons. Neustria — the western portion centred on the Seine — emerged as a distinct political entity, often rivalling the eastern kingdom of Austrasia.',
      fr: 'Après la mort de Clotaire Ier, le royaume franc fut partagé entre ses fils. La Neustrie — la partie occidentale centrée sur la Seine — apparut comme une entité politique distincte, rivalisant souvent avec le royaume oriental d\'Austrasie.',
      it: 'Dopo la morte di Clotario I, il regno franco fu diviso tra i suoi figli. La Neustria — la porzione occidentale centrata sulla Senna — emerse come entità politica distinta, spesso in rivalità con il regno orientale d\'Austrasia.',
    },
  },
  {
    id: 'tm-jumieges-founded',
    kind: 'foundation',
    year: 654,
    eraIds: ['neustria'],
    label: { en: 'Jumièges Abbey founded', fr: 'Fondation de l\'abbaye de Jumièges', it: 'Fondazione dell\'abbazia di Jumièges' },
    detail: {
      en: 'Founded on a bend of the Seine, Jumièges became one of the wealthiest Benedictine abbeys in Gaul. Its monastic riches would later make it a prime target for Viking raiders in the ninth century.',
      fr: 'Fondée sur un méandre de la Seine, Jumièges devint l\'une des plus riches abbayes bénédictines de Gaule. Ses trésors monastiques en firent par la suite une cible de choix pour les raids vikings du IXe siècle.',
      it: 'Fondata su un\'ansa della Senna, Jumièges divenne una delle più ricche abbazie benedettine della Gallia. Le sue ricchezze monastiche la resero in seguito un bersaglio privilegiato per le incursioni vichinghe del IX secolo.',
    },
    action: { type: 'flyToPlace', placeId: 'jumieges' },
  },

  // ── Carolingian ───────────────────────────────────────────────────
  {
    id: 'tm-charlemagne',
    kind: 'person',
    year: 800,
    eraIds: ['frankish-carolingian'],
    label: { en: 'Charlemagne crowned emperor', fr: 'Charlemagne couronné empereur', it: 'Carlo Magno incoronato imperatore' },
    detail: {
      en: 'On Christmas Day 800, Pope Leo III crowned Charlemagne Emperor of the Romans. His vast realm unified much of Western Europe, but its fragmentation after his death would expose wealthy river corridors to Norse raids.',
      fr: 'Le jour de Noël 800, le pape Léon III couronna Charlemagne Empereur des Romains. Son vaste empire unifia une grande partie de l\'Europe occidentale, mais sa fragmentation après sa mort exposerait de riches corridors fluviaux aux raids scandinaves.',
      it: 'Il giorno di Natale dell\'800, papa Leone III incoronò Carlo Magno imperatore dei Romani. Il suo vasto regno unificò gran parte dell\'Europa occidentale, ma la sua frammentazione dopo la morte avrebbe esposto ricchi corridoi fluviali ai raid norreni.',
    },
    action: { type: 'openPerson', personId: 'charlemagne' },
  },
  {
    id: 'tm-louis-pious-death',
    kind: 'person',
    year: 840,
    eraIds: ['frankish-carolingian'],
    label: { en: 'Death of Louis the Pious', fr: 'Mort de Louis le Pieux', it: 'Morte di Ludovico il Pio' },
    detail: {
      en: 'The death of Charlemagne\'s son triggered a civil war among his heirs and the eventual partition of the empire. The resulting political instability left the Seine, Loire, and Garonne valleys vulnerable to intensifying Viking raids.',
      fr: 'La mort du fils de Charlemagne déclencha une guerre civile entre ses héritiers et la partition éventuelle de l\'empire. L\'instabilité politique qui en résulta laissa les vallées de la Seine, de la Loire et de la Garonne vulnérables à l\'intensification des raids vikings.',
      it: 'La morte del figlio di Carlo Magno scatenò una guerra civile tra i suoi eredi e l\'eventuale spartizione dell\'impero. L\'instabilità politica risultante lasciò le valli della Senna, della Loira e della Garonna vulnerabili all\'intensificarsi dei raid vichinghi.',
    },
    action: { type: 'openPerson', personId: 'louis-the-pious' },
  },

  // ── Viking Age ────────────────────────────────────────────────────
  {
    id: 'tm-lindisfarne-raid',
    kind: 'battle',
    year: 793,
    eraIds: ['frankish-carolingian', 'viking-age'],
    label: { en: 'Lindisfarne Raid', fr: 'Raid de Lindisfarne', it: 'Incursione a Lindisfarne' },
    detail: {
      en: 'Norse raiders struck the island monastery of Lindisfarne in 793, shocking Christendom. The attack marks the conventional start of the Viking Age and exposed how vulnerable wealthy coastal monasteries were to seaborne assault.',
      fr: 'Des pillards scandinaves frappèrent le monastère insulaire de Lindisfarne en 793, choquant la chrétienté. L\'attaque marque le début conventionnel de l\'ère viking et révéla la vulnérabilité des riches monastères côtiers face aux assauts maritimes.',
      it: 'Predoni norreni colpirono il monastero insulare di Lindisfarne nel 793, scioccando la cristianità. L\'attacco segna l\'inizio convenzionale dell\'era vichinga e rivelò quanto i ricchi monasteri costieri fossero vulnerabili agli assalti dal mare.',
    },
    action: { type: 'flyToCamera', center: [-1.8, 55.68], zoom: 7 },
  },
  {
    id: 'tm-first-seine-raid',
    kind: 'battle',
    year: 841,
    eraIds: ['viking-age'],
    label: { en: 'First Norse raid on Seine', fr: 'Premier raid scandinave sur la Seine', it: 'Primo raid norreno sulla Senna' },
    detail: {
      en: 'Rouen fell to Vikings in 841, opening four decades of deep Norse penetration into Francia via the Seine. Monasteries burned and the Carolingian response oscillated between tribute and force.',
      fr: 'Rouen tomba aux mains des Vikings en 841, ouvrant quatre décennies de pénétration scandinave profonde en Francie via la Seine. Les monastères brûlèrent et la réponse carolingienne oscilla entre tribut et force.',
      it: 'Rouen cadde in mano ai vichinghi nell\'841, aprendo quattro decenni di profonda penetrazione norrena nella Francia attraverso la Senna. I monasteri bruciarono e la risposta carolingia oscillò tra tributo e forza.',
    },
    action: { type: 'flyToCamera', center: [1.09, 49.44], zoom: 8 },
  },
  {
    id: 'tm-rurik-novgorod',
    kind: 'foundation',
    year: 862,
    eraIds: ['viking-age'],
    label: { en: 'Rurik in Novgorod', fr: 'Riourik à Novgorod', it: 'Rurik a Novgorod' },
    detail: {
      en: 'The Varangian chieftain Rurik established himself at Novgorod around 862, founding the Rus\' dynasty. His descendants would expand south to Kiev, forging the trade and military network that linked Scandinavia to Byzantium.',
      fr: 'Le chef varègue Riourik s\'établit à Novgorod vers 862, fondant la dynastie des Rus\'. Ses descendants s\'étendirent vers le sud jusqu\'à Kiev, forgeant le réseau commercial et militaire reliant la Scandinavie à Byzance.',
      it: 'Il capo variàgo Rurik si stabilì a Novgorod intorno all\'862, fondando la dinastia dei Rus\'. I suoi discendenti si espansero verso sud fino a Kiev, creando la rete commerciale e militare che collegava la Scandinavia a Bisanzio.',
    },
    action: { type: 'flyToCamera', center: [31.28, 58.52], zoom: 6 },
  },
  {
    id: 'tm-iceland-settlement',
    kind: 'exploration',
    year: 870,
    eraIds: ['viking-age'],
    label: { en: 'Iceland Settlement', fr: 'Colonisation de l\'Islande', it: 'Colonizzazione dell\'Islanda' },
    detail: {
      en: 'Norwegian settlers began colonising Iceland from around 870, fleeing political pressures at home. Within sixty years the island was fully settled, creating the Norse Atlantic world that would later reach Greenland and North America.',
      fr: 'Les colons norvégiens commencèrent à coloniser l\'Islande vers 870, fuyant les pressions politiques chez eux. En soixante ans l\'île fut entièrement peuplée, créant le monde atlantique norrois qui atteindrait plus tard le Groenland et l\'Amérique du Nord.',
      it: 'I coloni norvegesi iniziarono a colonizzare l\'Islanda intorno all\'870, fuggendo dalle pressioni politiche in patria. In sessant\'anni l\'isola fu interamente popolata, creando il mondo atlantico norreno che avrebbe poi raggiunto la Groenlandia e il Nordamerica.',
    },
    action: { type: 'flyToCamera', center: [-19.0, 64.5], zoom: 4.5 },
  },
  {
    id: 'tm-siege-paris',
    kind: 'battle',
    year: 885,
    eraIds: ['viking-age'],
    label: { en: 'Siege of Paris', fr: 'Siège de Paris', it: 'Assedio di Parigi' },
    detail: {
      en: 'A massive Norse fleet besieged Paris in 885–886. Count Odo\'s defence became legendary, but the Carolingian emperor ultimately paid tribute. The siege marked the apex of Viking aggression in Francia and set the stage for negotiated settlement.',
      fr: 'Une imposante flotte scandinave assiégea Paris en 885–886. La défense du comte Eudes devint légendaire, mais l\'empereur carolingien finit par payer tribut. Le siège marqua l\'apogée de l\'agression viking en Francie et prépara le terrain pour un règlement négocié.',
      it: 'Un\'imponente flotta norrena assediò Parigi nell\'885–886. La difesa del conte Eudo divenne leggendaria, ma l\'imperatore carolingio alla fine pagò il tributo. L\'assedio segnò l\'apice dell\'aggressione vichinga in Francia e aprì la strada a un accordo negoziato.',
    },
    action: { type: 'flyToPlace', placeId: 'paris' },
  },

  // ── Norman Origins (911–1066) — includes Normandy STOPS ──────────
  {
    id: 'tm-treaty-saint-clair',
    kind: 'treaty',
    year: 911,
    eraIds: ['norman-origins'],
    label: { en: '911 — Treaty of Saint-Clair (Rollo)', fr: '911 — Traité de Saint-Clair (Rollon)', it: '911 — Trattato di Saint-Clair-sur-Epte (Rollone)' },
    detail: {
      en: 'Charles the Simple ceded territory around Rouen to the Norse chieftain Rollo in 911, the founding act of Normandy. In return Rollo accepted baptism and pledged to defend the Seine against further Viking incursions.',
      fr: 'Charles le Simple céda le territoire autour de Rouen au chef scandinave Rollon en 911, acte fondateur de la Normandie. En retour, Rollon accepta le baptême et s\'engagea à défendre la Seine contre de nouvelles incursions vikings.',
      it: 'Carlo il Semplice cedette il territorio intorno a Rouen al capo norreno Rollone nel 911, atto fondatore della Normandia. In cambio Rollone accettò il battesimo e si impegnò a difendere la Senna da ulteriori incursioni vichinghe.',
    },
    action: { type: 'flyToCamera', center: [1.68, 49.22], zoom: 8 },
  },
  {
    id: 'tm-bessin-annexed',
    kind: 'expansion',
    year: 924,
    eraIds: ['norman-origins'],
    label: { en: '924 — Bessin annexed', fr: '924 — Annexion du Bessin', it: '924 — Annessione del Bessin' },
    detail: {
      en: 'Rollo\'s successors expanded the nascent duchy westward, absorbing the Bessin around Bayeux. This marked the first major territorial gain beyond the original 911 concession.',
      fr: 'Les successeurs de Rollon étendirent le duché naissant vers l\'ouest, absorbant le Bessin autour de Bayeux. Ce fut le premier gain territorial majeur au-delà de la concession originale de 911.',
      it: 'I successori di Rollone espansero il ducato nascente verso ovest, assorbendo il Bessin intorno a Bayeux. Fu la prima grande conquista territoriale oltre la concessione originale del 911.',
    },
  },
  {
    id: 'tm-cotentin-annexed',
    kind: 'expansion',
    year: 933,
    eraIds: ['norman-origins'],
    label: { en: '933 — Cotentin & Avranchin', fr: '933 — Cotentin et Avranchin', it: '933 — Cotentin e Avranchino' },
    detail: {
      en: 'William Longsword secured the Cotentin peninsula and Avranchin by 933, roughly doubling the duchy\'s territory. Normandy now stretched from the Epte to the Atlantic, establishing borders that would endure for centuries.',
      fr: 'Guillaume Longue-Épée obtint la presqu\'île du Cotentin et l\'Avranchin en 933, doublant environ le territoire du duché. La Normandie s\'étendait désormais de l\'Epte à l\'Atlantique, établissant des frontières durables pendant des siècles.',
      it: 'Guglielmo Lungaspada ottenne la penisola del Cotentin e l\'Avranchin entro il 933, raddoppiando circa il territorio del ducato. La Normandia si estendeva ormai dall\'Epte all\'Atlantico, stabilendo confini che sarebbero durati per secoli.',
    },
  },
  {
    id: 'tm-duchy-mature',
    kind: 'foundation',
    year: 1050,
    eraIds: ['norman-origins'],
    label: { en: '~1050 — Duchy consolidated', fr: '~1050 — Duché consolidé', it: '~1050 — Ducato consolidato' },
    detail: {
      en: 'Under Richard I and his successors the duchy stabilised into a distinctive identity — Latin-speaking and Christian, but with a Norse warrior ethos. By 1050, William had forged the most militarily effective polity in northern Europe.',
      fr: 'Sous Richard Ier et ses successeurs, le duché se stabilisa en une identité distincte — latinophone et chrétienne, mais dotée d\'un ethos guerrier scandinave. En 1050, Guillaume avait forgé l\'entité politique la plus efficace militairement du nord de l\'Europe.',
      it: 'Sotto Riccardo I e i suoi successori il ducato si stabilizzò in un\'identità distintiva — di lingua latina e cristiana, ma con un ethos guerriero norreno. Entro il 1050 Guglielmo aveva forgiato l\'entità politica più efficace militarmente nel nord Europa.',
    },
  },
  {
    id: 'tm-battle-hastings',
    kind: 'battle',
    year: 1066,
    eraIds: ['norman-origins', 'norman-expansion'],
    label: { en: '1066 — Battle of Hastings', fr: '1066 — Bataille d\'Hastings', it: '1066 — Battaglia di Hastings' },
    detail: {
      en: 'William of Normandy defeated King Harold at Hastings on 14 October 1066, seizing the English crown. The Norman Conquest reshaped England\'s language, law, and aristocracy, and launched a century of Norman expansion across Europe.',
      fr: 'Guillaume de Normandie vainquit le roi Harold à Hastings le 14 octobre 1066, s\'emparant de la couronne d\'Angleterre. La conquête normande transforma la langue, le droit et l\'aristocratie anglaise, et lança un siècle d\'expansion normande à travers l\'Europe.',
      it: 'Guglielmo di Normandia sconfisse il re Harold a Hastings il 14 ottobre 1066, conquistando la corona inglese. La conquista normanna trasformò la lingua, il diritto e l\'aristocrazia inglese, avviando un secolo di espansione normanna in Europa.',
    },
    action: { type: 'flyToCamera', center: [0.5, 50.9], zoom: 7 },
  },

  // ── Norman Expansion ──────────────────────────────────────────────
  {
    id: 'tm-first-crusade',
    kind: 'battle',
    year: 1096,
    eraIds: ['norman-expansion'],
    label: { en: 'First Crusade — Normans at Antioch', fr: 'Première croisade — Normands à Antioche', it: 'Prima crociata — Normanni ad Antiochia' },
    detail: {
      en: 'Norman lords played a leading role in the First Crusade (1096–1099). Bohemond of Taranto captured Antioch and established a Crusader principality, extending Norman military reach deep into the Levant.',
      fr: 'Les seigneurs normands jouèrent un rôle majeur dans la première croisade (1096–1099). Bohémond de Tarente prit Antioche et fonda une principauté croisée, étendant la portée militaire normande jusqu\'au Levant.',
      it: 'I signori normanni ebbero un ruolo di primo piano nella prima crociata (1096–1099). Boemondo di Taranto conquistò Antiochia e fondò un principato crociato, estendendo la portata militare normanna fino al Levante.',
    },
  },
  {
    id: 'tm-sicily-kingdom',
    kind: 'foundation',
    year: 1130,
    eraIds: ['norman-expansion'],
    label: { en: 'Kingdom of Sicily founded', fr: 'Royaume de Sicile fondé', it: 'Fondazione del regno di Sicilia' },
    detail: {
      en: 'Roger II united Norman conquests in southern Italy and Sicily into a kingdom in 1130. The realm blended Latin, Byzantine, and Arab traditions into one of the most cosmopolitan courts in medieval Europe.',
      fr: 'Roger II réunit les conquêtes normandes du sud de l\'Italie et de la Sicile en un royaume en 1130. Le realm mêla les traditions latine, byzantine et arabe en l\'une des cours les plus cosmopolites de l\'Europe médiévale.',
      it: 'Ruggero II unì le conquiste normanne dell\'Italia meridionale e della Sicilia in un regno nel 1130. Il reame fuse le tradizioni latina, bizantina e araba in una delle corti più cosmopolite dell\'Europa medievale.',
    },
  },

  // ── Age of Exploration ────────────────────────────────────────────
  {
    id: 'tm-cartier-voyage',
    kind: 'exploration',
    year: 1534,
    eraIds: ['age-of-exploration'],
    label: { en: 'Cartier reaches St. Lawrence', fr: 'Cartier atteint le Saint-Laurent', it: 'Cartier raggiunge il San Lorenzo' },
    detail: {
      en: 'Jacques Cartier\'s 1534 expedition sailed past Newfoundland into the Gulf of St. Lawrence, claiming the territory for France. His voyages opened the river corridor that would become the spine of New France.',
      fr: 'L\'expédition de Jacques Cartier en 1534 dépassa Terre-Neuve pour pénétrer dans le golfe du Saint-Laurent, revendiquant le territoire pour la France. Ses voyages ouvrirent le corridor fluvial qui deviendrait l\'épine dorsale de la Nouvelle-France.',
      it: 'La spedizione di Jacques Cartier nel 1534 oltrepassò Terranova entrando nel golfo di San Lorenzo, rivendicando il territorio per la Francia. I suoi viaggi aprirono il corridoio fluviale che sarebbe diventato la spina dorsale della Nuova Francia.',
    },
    action: { type: 'openPerson', personId: 'jacques-cartier' },
  },
  {
    id: 'tm-dugua-acadia',
    kind: 'foundation',
    year: 1604,
    eraIds: ['age-of-exploration'],
    label: { en: 'Dugua founds Port Royal', fr: 'Dugua fonde Port-Royal', it: 'Dugua fonda Port-Royal' },
    detail: {
      en: 'Pierre Dugua de Mons established the first sustained French settlement in Acadia at Port-Royal in 1604, founding one of the earliest permanent European colonies in North America.',
      fr: 'Pierre Dugua de Mons fonda le premier établissement français durable en Acadie à Port-Royal en 1604, l\'une des premières colonies européennes permanentes en Amérique du Nord.',
      it: 'Pierre Dugua de Mons fondò il primo insediamento francese duraturo in Acadia a Port-Royal nel 1604, una delle prime colonie europee permanenti in Nordamerica.',
    },
    action: { type: 'openPerson', personId: 'pierre-dugua-de-mons' },
  },

  // ── New France phase boundaries (cross-era timeline) ─────────────
  {
    id: 'tm-nf-phase-company',
    kind: 'treaty',
    year: 1627,
    eraIds: ['new-france-foundations'],
    label: { en: 'Company of One Hundred Associates', fr: 'Compagnie des Cent-Associés', it: 'Compagnia dei Cento Associati' },
    detail: {
      en: 'Cardinal Richelieu chartered the Company of One Hundred Associates in 1627, granting it a monopoly over the fur trade and responsibility for settling New France with at least 4,000 colonists.',
      fr: 'Le cardinal Richelieu créa la Compagnie des Cent-Associés en 1627, lui accordant un monopole sur le commerce des fourrures et la responsabilité de peupler la Nouvelle-France d\'au moins 4 000 colons.',
      it: 'Il cardinale Richelieu istituì la Compagnia dei Cento Associati nel 1627, concedendole il monopolio del commercio di pellicce e l\'obbligo di insediare almeno 4.000 coloni nella Nuova Francia.',
    },
    action: { type: 'setYearOnly' },
  },
  {
    id: 'tm-nf-phase-royal',
    kind: 'expansion',
    year: 1663,
    eraIds: ['new-france-foundations', 'royal-new-france'],
    label: { en: 'New France becomes Royal Colony', fr: 'La Nouvelle-France devient colonie royale', it: 'La Nuova Francia diventa colonia regia' },
    detail: {
      en: 'Louis XIV dissolved the Company of One Hundred Associates and placed New France under direct royal administration in 1663. The crown dispatched an intendant, a governor, and troops, inaugurating a period of rapid demographic and territorial growth.',
      fr: 'Louis XIV dissout la Compagnie des Cent-Associés et plaça la Nouvelle-France sous administration royale directe en 1663. La couronne envoya un intendant, un gouverneur et des troupes, inaugurant une période de croissance démographique et territoriale rapide.',
      it: 'Luigi XIV sciolse la Compagnia dei Cento Associati e pose la Nuova Francia sotto amministrazione regia diretta nel 1663. La corona inviò un intendente, un governatore e truppe, inaugurando un periodo di rapida crescita demografica e territoriale.',
    },
    action: { type: 'setYearOnly' },
  },
  {
    id: 'tm-nf-phase-great-peace',
    kind: 'treaty',
    year: 1701,
    eraIds: ['royal-new-france'],
    label: { en: 'Great Peace of Montréal', fr: 'Grande Paix de Montréal', it: 'Grande pace di Montréal' },
    detail: {
      en: 'In 1701, Governor Callière brokered a sweeping peace treaty with some 39 Indigenous nations. The Great Peace ended decades of Iroquois Wars and secured French trade networks across the Great Lakes and Mississippi basins.',
      fr: 'En 1701, le gouverneur Callière négocia un vaste traité de paix avec une quarantaine de nations autochtones. La Grande Paix mit fin à des décennies de guerres iroquoises et sécurisa les réseaux commerciaux français des Grands Lacs au Mississippi.',
      it: 'Nel 1701 il governatore Callière negoziò un ampio trattato di pace con circa 39 nazioni indigene. La Grande Pace pose fine a decenni di guerre irochesi e garantì le reti commerciali francesi dai Grandi Laghi al Mississippi.',
    },
    action: { type: 'setYearOnly' },
  },
  {
    id: 'tm-nf-phase-seven-years',
    kind: 'battle',
    year: 1754,
    eraIds: ['atlantic-imprint'],
    label: { en: 'Seven Years\' War begins', fr: 'Début de la guerre de Sept Ans', it: 'Inizio della guerra dei Sette Anni' },
    detail: {
      en: 'The outbreak of the Seven Years\' War in 1754 pitted France and Britain in a global struggle for empire. In North America the conflict would culminate in the fall of Québec and the end of New France.',
      fr: 'Le déclenchement de la guerre de Sept Ans en 1754 opposa la France et la Grande-Bretagne dans une lutte mondiale pour l\'empire. En Amérique du Nord, le conflit aboutirait à la chute de Québec et à la fin de la Nouvelle-France.',
      it: 'Lo scoppio della guerra dei Sette Anni nel 1754 vide Francia e Gran Bretagna in una lotta globale per l\'impero. In Nordamerica il conflitto sarebbe culminato nella caduta di Québec e nella fine della Nuova Francia.',
    },
    action: { type: 'setYearOnly' },
  },

  // ── New France Foundations ────────────────────────────────────────
  {
    id: 'tm-founding-quebec',
    kind: 'foundation',
    year: 1608,
    eraIds: ['new-france-foundations'],
    label: { en: 'Champlain founds Québec', fr: 'Champlain fonde Québec', it: 'Champlain fonda Québec' },
    detail: {
      en: 'Samuel de Champlain established a habitation at Québec in 1608, commanding the narrows of the St. Lawrence. This strategic outpost became the administrative heart of New France and the gateway to the interior.',
      fr: 'Samuel de Champlain établit une habitation à Québec en 1608, contrôlant le rétrécissement du Saint-Laurent. Cet avant-poste stratégique devint le cœur administratif de la Nouvelle-France et la porte d\'entrée vers l\'intérieur.',
      it: 'Samuel de Champlain fondò un insediamento a Québec nel 1608, controllando le strettoie del San Lorenzo. Questo avamposto strategico divenne il cuore amministrativo della Nuova Francia e la porta verso l\'interno.',
    },
    action: { type: 'openPerson', personId: 'samuel-de-champlain' },
  },
  {
    id: 'tm-hebert-arrives',
    kind: 'person',
    year: 1617,
    eraIds: ['new-france-foundations'],
    label: { en: 'Louis Hébert — first farmer', fr: 'Louis Hébert — premier agriculteur', it: 'Louis Hébert — primo agricoltore' },
    detail: {
      en: 'Louis Hébert, an apothecary from Paris, arrived in Québec in 1617 to farm — the first French colonist to live entirely from the land. His family established roots that proved the colony could sustain itself beyond the fur trade.',
      fr: 'Louis Hébert, apothicaire parisien, arriva à Québec en 1617 pour cultiver la terre — le premier colon français à vivre entièrement de l\'agriculture. Sa famille établit des racines prouvant que la colonie pouvait subsister au-delà du commerce des fourrures.',
      it: 'Louis Hébert, speziale parigino, arrivò a Québec nel 1617 per coltivare la terra — il primo colono francese a vivere interamente dell\'agricoltura. La sua famiglia gettò radici dimostrando che la colonia poteva sostenersi oltre il commercio di pellicce.',
    },
    action: { type: 'openPerson', personId: 'louis-hebert' },
  },
  {
    id: 'tm-giffard-recruitment',
    kind: 'migration',
    year: 1634,
    eraIds: ['new-france-foundations'],
    label: { en: 'Giffard recruits Perche settlers', fr: 'Giffard recrute des colons du Perche', it: 'Giffard recluta coloni dal Perche' },
    detail: {
      en: 'Robert Giffard organised the first substantial group emigration from the Perche region of Normandy to New France in 1634. These families became foundational to the colony\'s demographic growth along the St. Lawrence.',
      fr: 'Robert Giffard organisa la première émigration collective d\'envergure depuis le Perche vers la Nouvelle-France en 1634. Ces familles devinrent fondatrices de la croissance démographique de la colonie le long du Saint-Laurent.',
      it: 'Robert Giffard organizzò la prima emigrazione di gruppo significativa dalla regione del Perche alla Nuova Francia nel 1634. Queste famiglie furono fondamentali per la crescita demografica della colonia lungo il San Lorenzo.',
    },
    action: { type: 'openPerson', personId: 'robert-giffard' },
  },
  {
    id: 'tm-founding-montreal',
    kind: 'foundation',
    year: 1642,
    eraIds: ['new-france-foundations'],
    label: { en: 'Founding of Ville-Marie', fr: 'Fondation de Ville-Marie', it: 'Fondazione di Ville-Marie' },
    detail: {
      en: 'Paul de Chomedey de Maisonneuve and Jeanne Mance founded Ville-Marie (Montréal) in 1642 as a missionary outpost. Despite constant Iroquois threat, it grew into a crucial fur-trade hub at the confluence of the Ottawa and St. Lawrence rivers.',
      fr: 'Paul de Chomedey de Maisonneuve et Jeanne Mance fondèrent Ville-Marie (Montréal) en 1642 comme avant-poste missionnaire. Malgré la menace iroquoise constante, il devint un centre vital du commerce des fourrures au confluent de l\'Outaouais et du Saint-Laurent.',
      it: 'Paul de Chomedey de Maisonneuve e Jeanne Mance fondarono Ville-Marie (Montréal) nel 1642 come avamposto missionario. Nonostante la costante minaccia irochese, divenne un centro cruciale del commercio di pellicce alla confluenza dell\'Ottawa e del San Lorenzo.',
    },
    action: { type: 'openPerson', personId: 'jeanne-mance' },
  },
  {
    id: 'tm-bourgeoys-school',
    kind: 'foundation',
    year: 1658,
    eraIds: ['new-france-foundations'],
    label: { en: 'Bourgeoys founds school', fr: 'Bourgeoys fonde une école', it: 'Bourgeoys fonda una scuola' },
    detail: {
      en: 'Marguerite Bourgeoys opened the first school in Ville-Marie in 1658 and later founded the Congregation of Notre-Dame. Her educational mission helped shape colonial society and earned her canonisation in 1982.',
      fr: 'Marguerite Bourgeoys ouvrit la première école de Ville-Marie en 1658 et fonda plus tard la Congrégation de Notre-Dame. Sa mission éducative contribua à façonner la société coloniale et lui valut la canonisation en 1982.',
      it: 'Marguerite Bourgeoys aprì la prima scuola di Ville-Marie nel 1658 e fondò in seguito la Congregazione di Notre-Dame. La sua missione educativa contribuì a plasmare la società coloniale e le valse la canonizzazione nel 1982.',
    },
    action: { type: 'openPerson', personId: 'marguerite-bourgeoys' },
  },

  // ── Royal New France ──────────────────────────────────────────────
  {
    id: 'tm-talon-intendant',
    kind: 'person',
    year: 1665,
    eraIds: ['royal-new-france'],
    label: { en: 'Jean Talon — first intendant', fr: 'Jean Talon — premier intendant', it: 'Jean Talon — primo intendente' },
    detail: {
      en: 'Jean Talon arrived as the first royal intendant of New France in 1665, launching an ambitious programme of immigration, diversified agriculture, and industrial development that transformed the colony\'s economy.',
      fr: 'Jean Talon arriva comme premier intendant royal de la Nouvelle-France en 1665, lançant un programme ambitieux d\'immigration, d\'agriculture diversifiée et de développement industriel qui transforma l\'économie de la colonie.',
      it: 'Jean Talon arrivò come primo intendente regio della Nuova Francia nel 1665, avviando un ambizioso programma di immigrazione, agricoltura diversificata e sviluppo industriale che trasformò l\'economia della colonia.',
    },
    action: { type: 'openPerson', personId: 'jean-talon' },
  },
  {
    id: 'tm-carignan-regiment',
    kind: 'migration',
    year: 1665,
    eraIds: ['royal-new-france'],
    label: { en: 'Carignan-Salières Regiment arrives', fr: 'Arrivée du régiment Carignan-Salières', it: 'Arrivo del reggimento Carignan-Salières' },
    detail: {
      en: 'Louis XIV dispatched the Carignan-Salières Regiment to New France in 1665 to confront the Iroquois threat. After successful campaigns, many soldiers settled in the colony, significantly boosting the population.',
      fr: 'Louis XIV envoya le régiment de Carignan-Salières en Nouvelle-France en 1665 pour faire face à la menace iroquoise. Après des campagnes réussies, de nombreux soldats s\'installèrent dans la colonie, augmentant considérablement la population.',
      it: 'Luigi XIV inviò il reggimento Carignan-Salières nella Nuova Francia nel 1665 per affrontare la minaccia irochese. Dopo campagne vittoriose molti soldati si stabilirono nella colonia, incrementando notevolmente la popolazione.',
    },
  },
  {
    id: 'tm-filles-du-roi',
    kind: 'migration',
    year: 1668,
    eraIds: ['royal-new-france'],
    label: { en: 'Filles du Roi migration', fr: 'Migration des Filles du Roi', it: 'Migrazione delle Fille du Roi' },
    detail: {
      en: 'Between 1663 and 1673 the crown sent roughly 800 young women — the Filles du Roi — to marry settlers in New France. This royal programme doubled the colony\'s population within a decade.',
      fr: 'Entre 1663 et 1673, la couronne envoya environ 800 jeunes femmes — les Filles du Roi — épouser des colons en Nouvelle-France. Ce programme royal doubla la population de la colonie en une décennie.',
      it: 'Tra il 1663 e il 1673 la corona inviò circa 800 giovani donne — le Filles du Roi — a sposare i coloni nella Nuova Francia. Questo programma regio raddoppiò la popolazione della colonia in un decennio.',
    },
  },
  {
    id: 'tm-jolliet-mississippi',
    kind: 'exploration',
    year: 1673,
    eraIds: ['royal-new-france'],
    label: { en: 'Jolliet maps the Mississippi', fr: 'Jolliet cartographie le Mississippi', it: 'Jolliet cartografa il Mississippi' },
    detail: {
      en: 'Louis Jolliet and Father Marquette descended the Mississippi in 1673, confirming it flowed south to the Gulf of Mexico. Their journey expanded the known geography of New France and opened a continental trade axis.',
      fr: 'Louis Jolliet et le père Marquette descendirent le Mississippi en 1673, confirmant qu\'il s\'écoulait vers le sud jusqu\'au golfe du Mexique. Leur voyage élargit la géographie connue de la Nouvelle-France et ouvrit un axe commercial continental.',
      it: 'Louis Jolliet e padre Marquette discesero il Mississippi nel 1673, confermando che sfociava a sud nel golfo del Messico. Il loro viaggio ampliò la geografia nota della Nuova Francia e aprì un asse commerciale continentale.',
    },
  },

  // ── Atlantic Imprint ──────────────────────────────────────────────
  {
    id: 'tm-utrecht-treaty',
    kind: 'treaty',
    year: 1713,
    eraIds: ['atlantic-imprint'],
    label: { en: 'Treaty of Utrecht', fr: 'Traité d\'Utrecht', it: 'Trattato di Utrecht' },
    detail: {
      en: 'The Treaty of Utrecht (1713) ended the War of the Spanish Succession and forced France to cede Acadia, Newfoundland, and Hudson Bay to Britain, permanently shrinking New France\'s Atlantic perimeter.',
      fr: 'Le traité d\'Utrecht (1713) mit fin à la guerre de Succession d\'Espagne et obligea la France à céder l\'Acadie, Terre-Neuve et la baie d\'Hudson à la Grande-Bretagne, réduisant durablement le périmètre atlantique de la Nouvelle-France.',
      it: 'Il trattato di Utrecht (1713) pose fine alla guerra di successione spagnola e costrinse la Francia a cedere l\'Acadia, Terranova e la baia di Hudson alla Gran Bretagna, restringendo permanentemente il perimetro atlantico della Nuova Francia.',
    },
  },
  {
    id: 'tm-fall-quebec',
    kind: 'battle',
    year: 1759,
    eraIds: ['atlantic-imprint'],
    label: { en: 'Fall of Québec', fr: 'Chute de Québec', it: 'Caduta di Québec' },
    detail: {
      en: 'British forces under General Wolfe scaled the cliffs above Québec and defeated Montcalm on the Plains of Abraham in September 1759. The fall of the capital sealed the fate of French North America.',
      fr: 'Les forces britanniques du général Wolfe escaladèrent les falaises au-dessus de Québec et vainquirent Montcalm sur les plaines d\'Abraham en septembre 1759. La chute de la capitale scella le sort de l\'Amérique française.',
      it: 'Le forze britanniche del generale Wolfe scalarono le scogliere sopra Québec e sconfissero Montcalm sulle pianure di Abraham nel settembre 1759. La caduta della capitale segnò il destino dell\'America francese.',
    },
    action: { type: 'flyToPlace', placeId: 'quebec-city' },
  },
  {
    id: 'tm-treaty-paris',
    kind: 'treaty',
    year: 1763,
    eraIds: ['atlantic-imprint'],
    label: { en: 'Treaty of Paris', fr: 'Traité de Paris', it: 'Trattato di Parigi' },
    detail: {
      en: 'The Treaty of Paris (1763) formally ended French sovereignty over New France, ceding Canada and its dependencies to Britain. A French-speaking population of roughly 70,000 remained, shaping the bilingual identity of modern Canada.',
      fr: 'Le traité de Paris (1763) mit formellement fin à la souveraineté française sur la Nouvelle-France, cédant le Canada et ses dépendances à la Grande-Bretagne. Une population francophone d\'environ 70 000 personnes demeura, façonnant l\'identité bilingue du Canada moderne.',
      it: 'Il trattato di Parigi (1763) pose formalmente fine alla sovranità francese sulla Nuova Francia, cedendo il Canada e le sue dipendenze alla Gran Bretagna. Una popolazione francofona di circa 70.000 persone rimase, plasmando l\'identità bilingue del Canada moderno.',
    },
  },
];

const markersByEra = new Map<string, TimelineMarker[]>();

for (const m of atlasTimelineMarkers) {
  for (const eraId of m.eraIds) {
    const arr = markersByEra.get(eraId);
    if (arr) arr.push(m);
    else markersByEra.set(eraId, [m]);
  }
}

export function getMarkersForEra(eraId: string): TimelineMarker[] {
  return markersByEra.get(eraId) ?? [];
}

const markersById = new Map<string, TimelineMarker>(atlasTimelineMarkers.map((m) => [m.id, m]));

export function getMarkerById(id: string): TimelineMarker | undefined {
  return markersById.get(id);
}
