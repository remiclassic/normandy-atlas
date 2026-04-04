import type { I18nString } from '@/core/types';

export interface GlossaryEntry {
  id: string;
  term: I18nString;
  definition: I18nString;
  seeAlso?: string[];
}

export const atlasGlossary: GlossaryEntry[] = [
  {
    id: 'cousture',
    term: { en: 'Cousture', fr: 'Cousture', de: 'Cousture' },
    definition: {
      en: 'Old French for "cultivated field" or "enclosed land" — the agricultural, territorial origin of the surname Couture. Not related to sewing despite the modern French meaning.',
      fr: 'Ancien français pour « champ cultivé » ou « terre close » \u2014 l\u2019origine agricole et territoriale du patronyme Couture. Sans lien avec la couture malgré le sens moderne.',
      de: 'Altes Französisch für "kultiviertes Feld" oder "umzäuntes Land" — die landwirtschaftliche und territoriale Herkunft des Nachnamens Couture. Trotz modernem Sinn keine Verbindung zur Naht.',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'neustria',
    term: { en: 'Neustria', fr: 'Neustrie', de: 'Neustria' },
    definition: {
      en: 'The western Frankish kingdom (roughly the Seine basin and Channel coast) that became the administrative ancestor of Normandy. Its ports and river corridors shaped the region\u2019s identity long before the Vikings arrived.',
      fr: 'Le royaume franc occidental (approximativement le bassin de la Seine et la c\u00f4te de la Manche) qui devint l\u2019anc\u00eatre administratif de la Normandie. Ses ports et corridors fluviaux ont fa\u00e7onn\u00e9 l\u2019identit\u00e9 de la r\u00e9gion bien avant l\u2019arriv\u00e9e des Vikings.',
      de: 'Das westfranzösische Königreich (etwa das Seine-Becken und die Kanalküste), das zum administrativen Vorläufer der Normandie wurde. Seine Häfen und Flusskorridore prägten die Identität der Region lange vor der Ankunft der Wikinger.',
    },
  },
  {
    id: 'new-france',
    term: { en: 'New France', fr: 'Nouvelle-France', de: 'Neufrankreich' },
    definition: {
      en: 'The territory claimed by France in North America from the early 1600s to 1763, stretching from the Gulf of St. Lawrence through the Great Lakes to the Mississippi basin. Most settlers came from Normandy, Perche, and the Atlantic coast of France.',
      fr: 'Le territoire revendiqu\u00e9 par la France en Am\u00e9rique du Nord du d\u00e9but du XVIIe si\u00e8cle \u00e0 1763, s\u2019\u00e9tendant du golfe du Saint-Laurent aux Grands Lacs jusqu\u2019au bassin du Mississippi. La plupart des colons venaient de Normandie, du Perche et de la c\u00f4te atlantique de la France.',
      de: 'Das von Frankreich beanspruchte Gebiet in Nordamerika vom Beginn des 17. Jahrhunderts bis 1763, das sich vom Golf des Sankt-Lorenz-Stroms über die Großen Seen bis zum Mississippi-Becken erstreckt. Die meisten Siedler kamen aus der Normandie, der Perche und der französischen Atlantikküste.',
    },
    seeAlso: ['acadia', 'seigneurial-system'],
  },
  {
    id: 'acadia',
    term: { en: 'Acadia', fr: 'Acadie', de: 'Akadien' },
    definition: {
      en: 'The French colonial region encompassing present-day Nova Scotia, New Brunswick, and Prince Edward Island. Acadians developed a distinct identity; many were expelled by Britain in 1755 (the Grand D\u00e9rangement).',
      fr: 'R\u00e9gion coloniale fran\u00e7aise englobant l\u2019actuelle Nouvelle-\u00c9cosse, le Nouveau-Brunswick et l\u2019\u00cele-du-Prince-\u00c9douard. Les Acadiens ont d\u00e9velopp\u00e9 une identit\u00e9 distincte ; nombre d\u2019entre eux furent expuls\u00e9s par la Grande-Bretagne en 1755 (le Grand D\u00e9rangement).',
      de: 'Französische Kolonialregion, die das heutige Nova Scotia, New Brunswick und Prince Edward Island umfasst. Die Akadier entwickelten eine eigene Identität; viele von ihnen wurden 1755 von Großbritannien vertrieben (die Große Störung).',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'seigneurial-system',
    term: { en: 'Seigneurial system', fr: 'R\u00e9gime seigneurial', de: 'Herrschaftsregime' },
    definition: {
      en: 'The feudal land-tenure model used in New France, derived from Norman and northern French customs. Seigneurs received large grants along rivers and subdivided them into narrow lots (rangs) for habitants.',
      fr: 'Le mod\u00e8le de tenure fonci\u00e8re f\u00e9odale utilis\u00e9 en Nouvelle-France, d\u00e9riv\u00e9 des coutumes normandes et du nord de la France. Les seigneurs recevaient de vastes concessions le long des rivi\u00e8res et les subdivisaient en lots \u00e9troits (rangs) pour les habitants.',
      de: 'Das in Neufrankreich verwendete Modell des feudalen Grundbesitzes, das sich aus den Bräuchen der Normandie und Nordfrankreichs ableitet. Die Herren erhielten umfangreiche Konzessionen entlang der Flüsse und teilten diese in schmale Lose (Reihen) für die Bewohner auf.',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'migration-channel',
    term: { en: 'Migration channel', fr: 'Canal migratoire', de: 'Migrationskanal' },
    definition: {
      en: 'The region of origin for a settler or group of settlers. Common channels in this atlas include Normandy ports (Dieppe, Honfleur, Le Havre), Perche, Brittany coast, Aunis\u2013Saintonge, and Paris region.',
      fr: 'La r\u00e9gion d\u2019origine d\u2019un colon ou d\u2019un groupe de colons. Les canaux courants dans cet atlas comprennent les ports normands (Dieppe, Honfleur, Le Havre), le Perche, la c\u00f4te bretonne, Aunis\u2013Saintonge et la r\u00e9gion parisienne.',
      de: 'Die Herkunftsregion eines Siedlers oder einer Siedlergruppe. Zu den gängigen Kanälen in diesem Atlas gehören die normannischen Häfen (Dieppe, Honfleur, Le Havre), Le Perche, die bretonische Küste, Aunis–Saintonge und die Pariser Region.',
    },
  },
  {
    id: 'provenance',
    term: { en: 'Provenance confidence', fr: 'Confiance de provenance', de: 'Provenienzvertrauen' },
    definition: {
      en: 'The level of certainty about a historical claim. "Documented" means supported by primary records; "network" means inferred from known patterns; "uncertain" means plausible but unconfirmed.',
      fr: 'Le niveau de certitude d\u2019une affirmation historique. \u00ab Document\u00e9 \u00bb signifie appuy\u00e9 par des sources primaires ; \u00ab r\u00e9seau \u00bb signifie d\u00e9duit de sch\u00e9mas connus ; \u00ab incertain \u00bb signifie plausible mais non confirm\u00e9.',
      de: 'Das Gewissheitsniveau einer historischen Behauptung. "Dokumentiert" bedeutet durch Primärquellen unterstützt; "Netzwerk" bedeutet Ableitung aus bekannten Mustern; "unsicher" bedeutet plausibel, aber nicht bestätigt.',
    },
  },
  {
    id: 'era',
    term: { en: 'Era', fr: '\u00c9poque', de: 'Zeit' },
    definition: {
      en: 'A defined time period in the atlas. Each era controls which settlements, routes, regions, and layers are visible on the map. Use the timeline bar to move between eras.',
      fr: 'Une p\u00e9riode d\u00e9finie dans l\u2019atlas. Chaque \u00e9poque d\u00e9termine quels \u00e9tablissements, routes, r\u00e9gions et couches sont visibles sur la carte. Utilisez la barre chronologique pour naviguer entre les \u00e9poques.',
      de: 'Ein im Atlas definierter Zeitraum. Jede Epoche bestimmt, welche Siedlungen, Strassen, Regionen und Layer auf der Karte sichtbar sind. Verwenden Sie die Zeitleiste, um zwischen den Epochen zu navigieren.',
    },
    seeAlso: ['story-mode'],
  },
  {
    id: 'story-mode',
    term: { en: 'Story mode', fr: 'Mode histoire', de: 'Story-Modus' },
    definition: {
      en: 'A guided narrative that moves the camera through a sequence of beats \u2014 highlighted places, routes, and regions with explanatory text. Use the story bar at the bottom of the map to start or navigate chapters.',
      fr: 'Un r\u00e9cit guid\u00e9 qui d\u00e9place la cam\u00e9ra \u00e0 travers une s\u00e9quence de moments cl\u00e9s \u2014 lieux, routes et r\u00e9gions mis en \u00e9vidence avec un texte explicatif. Utilisez la barre d\u2019histoire en bas de la carte pour d\u00e9marrer ou naviguer entre les chapitres.',
      de: 'Eine geführte Erzählung, die die Kamera durch eine Abfolge von Schlüsselmomenten bewegt — Orte, Straßen und Regionen, die mit einem erläuternden Text hervorgehoben sind. Verwenden Sie die Historie-Leiste am unteren Rand der Karte, um zwischen den Kapiteln zu starten oder zu navigieren.',
    },
    seeAlso: ['era'],
  },
  {
    id: 'narrative-weight',
    term: { en: 'Narrative weight', fr: 'Poids narratif', de: 'Erzählgewichte' },
    definition: {
      en: 'How prominently a person is featured: "anchor" figures drive story beats and appear first; "supporting" figures enrich a region or era; "minor" figures add demographic depth.',
      fr: 'L\u2019importance d\u2019un personnage dans le r\u00e9cit : les figures \u00ab phares \u00bb (anchor) animent les moments cl\u00e9s et apparaissent en premier ; les \u00ab secondaires \u00bb enrichissent une r\u00e9gion ou une \u00e9poque ; les \u00ab mineurs \u00bb ajoutent de la profondeur d\u00e9mographique.',
      de: 'Die Bedeutung eines Charakters in der Erzählung: Die „Hauptfiguren“ (Anchor) beleben die Schlüsselmomente und erscheinen zuerst; die „Nebenfiguren“ bereichern eine Region oder eine Epoche; die „Minderjährigen“ fügen demografische Tiefe hinzu.',
    },
  },
  {
    id: 'surname-origin-category',
    term: { en: 'Surname origin category', fr: 'Cat\u00e9gorie d\u2019origine du patronyme', de: 'Herkunftskategorie des Nachnamens' },
    definition: {
      en: 'The classification of a Norman surname by its etymological root: core Norman (well-documented Normandy settler lines), strongly Norman (feudal/Old French/Viking-rooted), coastal/maritime, Norse influence, or feudal & trade.',
      fr: 'La classification d\u2019un patronyme normand par sa racine \u00e9tymologique : normand de souche, fortement normand (f\u00e9odal / vieux fran\u00e7ais / racines vikings), c\u00f4tier / maritime, influence scandinave ou f\u00e9odal & commerce.',
      de: 'Die Klassifizierung eines normannischen Nachnamens nach seiner etymologischen Wurzel: normannisch, stark normannisch (feudal / altfranzösisch / Wikingerwurzeln), küstennah / maritim, skandinavischer oder feudaler Einfluss & Handel.',
    },
    seeAlso: ['cousture'],
  },
  {
    id: 'grand-derangement',
    term: { en: 'Grand D\u00e9rangement', fr: 'Grand D\u00e9rangement', de: 'Große Störung' },
    definition: {
      en: 'The mass deportation of Acadians by British forces beginning in 1755. Thousands were expelled to other British colonies, France, and Louisiana, scattering communities that had existed for over a century.',
      fr: 'La d\u00e9portation massive des Acadiens par les forces britanniques \u00e0 partir de 1755. Des milliers furent expuls\u00e9s vers d\u2019autres colonies britanniques, la France et la Louisiane, dispersant des communaut\u00e9s \u00e9tablies depuis plus d\u2019un si\u00e8cle.',
      de: 'Die Massendeportation der Akadier durch die britischen Streitkräfte ab 1755. Tausende wurden in andere britische Kolonien, Frankreich und Louisiana, vertrieben und seit mehr als einem Jahrhundert bestehende Gemeinschaften zerstreut.',
    },
    seeAlso: ['acadia'],
  },
  {
    id: 'treaty-of-paris-1763',
    term: { en: 'Treaty of Paris (1763)', fr: 'Trait\u00e9 de Paris (1763)', de: 'Pariser Vertrag' },
    definition: {
      en: 'The treaty that ended the Seven Years\u2019 War and transferred virtually all French territory in North America to Britain. Around 60,000 French Canadians remained under British rule, preserving their language, religion, and Norman-origin surnames.',
      fr: 'Le trait\u00e9 qui mit fin \u00e0 la guerre de Sept Ans et transf\u00e9ra la quasi-totalit\u00e9 du territoire fran\u00e7ais en Am\u00e9rique du Nord \u00e0 la Grande-Bretagne. Environ 60 000 Canadiens fran\u00e7ais rest\u00e8rent sous domination britannique, pr\u00e9servant leur langue, leur religion et leurs patronymes normands.',
      de: 'Der Vertrag, der den Siebenjährigen Krieg beendete und fast das gesamte französische Territorium in Nordamerika an Großbritannien übertrug. Etwa 60.000 französische Kanadier blieben unter britischer Herrschaft und behielten ihre normannische Sprache, Religion und Nachnamen bei.',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'filles-du-roi',
    term: { en: 'Filles du Roi', fr: 'Filles du Roi', de: 'Königstöchter' },
    definition: {
      en: 'Women sponsored by Louis XIV to emigrate to New France between 1663 and 1673 to address the colony\u2019s gender imbalance. Many came from Normandy, \u00cele-de-France, and western France; their arrivals dramatically accelerated population growth.',
      fr: 'Femmes parrain\u00e9es par Louis XIV pour \u00e9migrer en Nouvelle-France entre 1663 et 1673 afin de rem\u00e9dier au d\u00e9s\u00e9quilibre hommes-femmes de la colonie. Beaucoup venaient de Normandie, d\u2019\u00cele-de-France et de l\u2019ouest de la France ; leur arriv\u00e9e acc\u00e9l\u00e9ra consid\u00e9rablement la croissance d\u00e9mographique.',
      de: 'Frauen, die von Ludwig XIV. gesponsert wurden, um zwischen 1663 und 1673 nach Neufrankreich auszuwandern, um das Ungleichgewicht zwischen Männern und Frauen in der Kolonie zu beheben. Viele kamen aus der Normandie, der Île-de-France und Westfrankreich; ihre Ankunft beschleunigte das Bevölkerungswachstum erheblich.',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'coureur-des-bois',
    term: { en: 'Coureur des bois', fr: 'Coureur des bois', de: 'Waldläufer' },
    definition: {
      en: 'Independent French-Canadian fur traders who traveled deep into the interior by canoe, trading with Indigenous peoples. They were instrumental in extending French territorial knowledge and claims across the Great Lakes and Mississippi basin.',
      fr: 'Trappeurs canadiens-fran\u00e7ais ind\u00e9pendants qui s\u2019enfon\u00e7aient dans l\u2019int\u00e9rieur en canot, commer\u00e7ant avec les peuples autochtones. Ils furent essentiels dans l\u2019extension des connaissances territoriales et des revendications fran\u00e7aises \u00e0 travers les Grands Lacs et le bassin du Mississippi.',
      de: 'Unabhängige kanadisch-französische Trapper, die in einem Kanu in das Innere eindrangen und mit den indigenen Völkern Handel trieben. Sie waren entscheidend für die Erweiterung des territorialen Wissens und der französischen Ansprüche über die Großen Seen und das Mississippi-Becken.',
    },
    seeAlso: ['new-france'],
  },
  {
    id: 'habitant',
    term: { en: 'Habitant', fr: 'Habitant', de: 'Bewohner' },
    definition: {
      en: 'A farmer-settler in New France who held land from a seigneur. Habitants formed the backbone of the colonial population; most Quebec families today descend from habitant lineages established in the 1600s and 1700s.',
      fr: 'Un colon-agriculteur en Nouvelle-France qui tenait sa terre d\u2019un seigneur. Les habitants formaient l\u2019\u00e9pine dorsale de la population coloniale ; la plupart des familles qu\u00e9b\u00e9coises d\u2019aujourd\u2019hui descendent de lign\u00e9es d\u2019habitants \u00e9tablies aux XVIIe et XVIIIe si\u00e8cles.',
      de: 'Ein Kolonist und Landwirt in Neufrankreich, der sein Land von einem Herrn besaß. Die Bewohner bildeten das Rückgrat der kolonialen Bevölkerung; die meisten der heutigen Quebec-Familien stammen von den im 17. und 18. Jahrhundert etablierten Einwohnern ab.',
    },
    seeAlso: ['seigneurial-system', 'new-france'],
  },
  {
    id: 'layer',
    term: { en: 'Layer', fr: 'Couche', de: 'Schützende' },
    definition: {
      en: 'A toggleable map overlay that shows a specific category of content \u2014 borders, routes, settlements, exploration paths, colonial claims, forts, and more. Use the Layers panel on the map to turn them on or off.',
      fr: 'Une surcouche cartographique activable qui affiche une cat\u00e9gorie sp\u00e9cifique de contenu \u2014 fronti\u00e8res, routes, \u00e9tablissements, chemins d\u2019exploration, revendications coloniales, forts, etc. Utilisez le panneau Couches sur la carte pour les activer ou les d\u00e9sactiver.',
      de: 'Eine aktivierbare Kartenüberlagerung, die eine bestimmte Kategorie von Inhalten anzeigt — Grenzen, Straßen, Siedlungen, Erkundungswege, koloniale Ansprüche, Festungen usw. Verwenden Sie das Layer-Panel auf der Karte, um sie zu aktivieren oder zu deaktivieren.',
    },
    seeAlso: ['era'],
  },
  {
    id: 'journey',
    term: { en: 'Journey', fr: 'Voyage', de: 'Reisen' },
    definition: {
      en: 'A connected sequence of route segments that tells the story of a specific historical movement \u2014 such as Cartier\u2019s exploration of the St. Lawrence or La Salle\u2019s descent of the Mississippi. Journeys can be highlighted in story mode.',
      fr: 'Une s\u00e9quence connect\u00e9e de segments de route qui raconte l\u2019histoire d\u2019un mouvement historique sp\u00e9cifique \u2014 comme l\u2019exploration du Saint-Laurent par Cartier ou la descente du Mississippi par La Salle. Les voyages peuvent \u00eatre mis en \u00e9vidence en mode histoire.',
      de: 'Eine vernetzte Abfolge von Straßensegmenten, die die Geschichte einer bestimmten historischen Bewegung erzählt — wie die Erkundung des Sankt-Lorenz-Stroms durch Cartier oder der Abstieg des Mississippi durch La Salle. Reisen können im Story-Modus hervorgehoben werden.',
    },
    seeAlso: ['story-mode'],
  },
  {
    id: 'crown-dependency',
    term: { en: 'Crown Dependency', fr: 'Dépendance de la Couronne', de: 'unmittelbar der englischen Krone unterstehendes Gebiet' },
    definition: {
      en: 'A self-governing territory that owes allegiance to the British crown but is not part of the United Kingdom. Jersey and Guernsey became Crown Dependencies after 1204, when continental Normandy fell to France but the Channel Islands remained with the English king. They retained Norman customary law and their own legislatures.',
      fr: 'Un territoire autonome lié à la couronne britannique mais ne faisant pas partie du Royaume-Uni. Jersey et Guernesey devinrent des dépendances de la Couronne après 1204, lorsque la Normandie continentale tomba sous la France mais que les îles Anglo-Normandes restèrent avec le roi d\u2019Angleterre. Elles conservèrent le droit coutumier normand et leurs propres législatures.',
      de: 'Ein autonomes Territorium, das an die britische Krone gebunden ist, aber nicht Teil des Vereinigten Königreichs ist. Jersey und Guernsey wurden nach 1204 zu Abhängigkeiten der Krone, als die kontinentale Normandie unter Frankreich fiel, die Kanalinseln jedoch beim König von England blieben. Sie behielten das normannische Gewohnheitsrecht und ihre eigenen Gesetzgebungen bei.',
    },
    seeAlso: ['neustria'],
  },
  {
    id: 'bailiwick',
    term: { en: 'Bailiwick', fr: 'Bailliage', de: 'Ballei' },
    definition: {
      en: 'The administrative jurisdiction of a bailli (bailiff). The Channel Islands are divided into two bailiwicks \u2014 Jersey and Guernsey \u2014 each with its own Royal Court descended from the medieval Norman judicial system. The term itself is a relic of ducal Normandy\u2019s administrative vocabulary.',
      fr: 'La juridiction administrative d\u2019un bailli. Les \u00eeles Anglo-Normandes sont divis\u00e9es en deux bailliages \u2014 Jersey et Guernesey \u2014 chacun avec sa propre Cour royale h\u00e9riti\u00e8re du syst\u00e8me judiciaire normand m\u00e9di\u00e9val. Le terme lui-m\u00eame est un vestige du vocabulaire administratif de la Normandie ducale.',
      de: 'Die Verwaltungsgerichtsbarkeit eines Vogts. Die Kanalinseln sind in zwei Vogteien — Jersey und Guernsey — unterteilt, die jeweils einen eigenen königlichen Hof haben, der Erbe des mittelalterlichen normannischen Justizsystems ist. Der Begriff selbst ist ein Überbleibsel des Verwaltungsvokabulars der herzoglichen Normandie.',
    },
    seeAlso: ['crown-dependency'],
  },
  {
    id: 'common-law',
    term: { en: 'Common Law', fr: 'Droit commun', de: 'Gemeines Recht' },
    definition: {
      en: 'The legal tradition originating in the royal courts of Anglo-Norman England, where judges applied consistent precedent across the realm rather than local baronial custom. Henry II\u2019s Assize of Clarendon (1166) is often cited as its foundational moment. The system spread with English colonisation and remains the basis of law in much of the Anglophone world.',
      fr: 'La tradition juridique issue des tribunaux royaux de l\u2019Angleterre anglo-normande, o\u00f9 les juges appliquaient un pr\u00e9c\u00e9dent uniforme plut\u00f4t que les coutumes baroniales locales. L\u2019Assise de Clarendon (1166) d\u2019Henri II est souvent cit\u00e9e comme son moment fondateur. Le syst\u00e8me se r\u00e9pandit avec la colonisation anglaise et reste la base du droit dans une grande partie du monde anglophone.',
      de: 'Die Rechtstradition, die aus den königlichen Gerichten des anglo-normannischen Englands hervorging, wo die Richter einen einheitlichen Präzedenzfall anstelle der lokalen baronialen Bräuche anwendeten. Die Assisi von Clarendon (1166) von Heinrich II. Wird oft als sein Gründungsmoment zitiert. Das System verbreitete sich mit der englischen Kolonisation und blieb in weiten Teilen der englischsprachigen Welt die Rechtsgrundlage.',
    },
    seeAlso: ['neustria'],
  },
  {
    id: 'magna-carta',
    term: { en: 'Magna Carta', fr: 'Magna Carta', de: 'Magna Carta' },
    definition: {
      en: 'The charter sealed at Runnymede in 1215 by King John under baronial pressure. It limited royal authority over taxation, justice, and feudal rights \u2014 principles that grew directly from the tensions within the Anglo-Norman baronial class created by the Conquest. Later reissues became foundational texts of English constitutional law.',
      fr: 'La charte scell\u00e9e \u00e0 Runnymede en 1215 par le roi Jean sous pression baroniale. Elle limita l\u2019autorit\u00e9 royale sur la fiscalit\u00e9, la justice et les droits f\u00e9odaux \u2014 des principes issus directement des tensions au sein de la classe baroniale anglo-normande cr\u00e9\u00e9e par la Conqu\u00eate. Les r\u00e9\u00e9ditions ult\u00e9rieures devinrent des textes fondateurs du droit constitutionnel anglais.',
      de: 'Die Charta, die 1215 von König Jean unter baronischem Druck in Runnymede versiegelt wurde. Sie beschränkte die königliche Autorität über Steuern, Justiz und Feudalrechte — Prinzipien, die direkt aus den Spannungen innerhalb der durch die Eroberung geschaffenen anglo-normannischen Baronenklasse hervorgingen. Spätere Neuauflagen wurden zu Gründungstexten des englischen Verfassungsrechts.',
    },
    seeAlso: ['common-law'],
  },
  {
    id: 'hauteville',
    term: { en: 'Hauteville', fr: 'Hauteville', de: 'Hauteville' },
    definition: {
      en: 'The Norman dynasty from Hauteville-la-Guichard (Cotentin) whose sons conquered southern Italy and Sicily in the eleventh century. Tancred de Hauteville\u2019s twelve sons \u2014 including William Iron Arm, Robert Guiscard, and Roger I \u2014 built a Mediterranean empire from a minor Norman lordship. Roger II united their conquests into the Kingdom of Sicily in 1130.',
      fr: 'La dynastie normande de Hauteville-la-Guichard (Cotentin) dont les fils conquirent l\u2019Italie du Sud et la Sicile au XIe si\u00e8cle. Les douze fils de Tancrède de Hauteville \u2014 dont Guillaume Bras-de-Fer, Robert Guiscard et Roger Ier \u2014 b\u00e2tirent un empire m\u00e9diterran\u00e9en \u00e0 partir d\u2019une seigneurie normande mineure. Roger II unit leurs conqu\u00eates dans le Royaume de Sicile en 1130.',
      de: 'Die normannische Dynastie von Hauteville-la-Guichard (Cotentin), deren Söhne im 11. Jahrhundert Süditalien und Sizilien eroberten. Die zwölf Söhne von Tancrede de Hauteville — darunter Guillaume Bras-de-Fer, Robert Guiscard und Roger I. — errichteten aus einer kleinen normannischen Herrschaft ein Mittelmeerreich. Roger II. vereinigt 1130 ihre Eroberungen im Königreich Sizilien.',
    },
  },
  {
    id: 'domesday-book',
    term: { en: 'Domesday Book', fr: 'Domesday Book', de: 'Domesday Book' },
    definition: {
      en: 'The great survey of England commissioned by William the Conqueror in 1085 and completed in 1086. It recorded the ownership, value, and resources of virtually every manor in the kingdom \u2014 an administrative feat without parallel in medieval Europe. The name (from Old English d\u014dm, \u201cjudgement\u201d) reflects the finality of its assessments: there was no appeal against the Book.',
      fr: 'Le grand inventaire de l\u2019Angleterre command\u00e9 par Guillaume le Conqu\u00e9rant en 1085 et achev\u00e9 en 1086. Il enregistra la propri\u00e9t\u00e9, la valeur et les ressources de pratiquement chaque manoir du royaume \u2014 un exploit administratif sans parall\u00e8le en Europe m\u00e9di\u00e9vale. Le nom (du vieil anglais d\u014dm, \u00ab jugement \u00bb) refl\u00e8te la finalit\u00e9 de ses \u00e9valuations : on ne faisait pas appel du Livre.',
      de: 'Das große Inventar Englands, das 1085 von Wilhelm dem Eroberer in Auftrag gegeben und 1086 abgeschlossen wurde. Er zeichnete das Eigentum, den Wert und die Ressourcen von praktisch jedem Herrenhaus des Königreichs auf — eine beispiellose administrative Leistung im mittelalterlichen Europa. Der Name (aus dem Altenglischen dōm, „Urteil“) spiegelt den Zweck seiner Bewertungen wider: Das Buch wurde nicht angefochten.',
    },
    seeAlso: ['common-law'],
  },
  {
    id: 'assize',
    term: { en: 'Assize', fr: 'Assise', de: 'Sitzfläche' },
    definition: {
      en: 'A royal legislative enactment or the travelling court that enforced it. Henry II\u2019s Assizes of Clarendon (1166) and Northampton (1176) created uniform criminal and property procedures across England, replacing local baronial justice with a system of royal judges, juries, and writs that became the backbone of common law.',
      fr: 'Un acte l\u00e9gislatif royal ou le tribunal itin\u00e9rant qui l\u2019appliquait. Les Assises de Clarendon (1166) et de Northampton (1176) d\u2019Henri II cr\u00e9\u00e8rent des proc\u00e9dures criminelles et fonci\u00e8res uniformes en Angleterre, rempla\u00e7ant la justice baroniale locale par un syst\u00e8me de juges royaux, jurys et brefs qui devint l\u2019ossature du droit commun.',
      de: 'Ein königlicher Gesetzgebungsakt oder das reisende Gericht, das ihn durchsetzte. Die Schwurgerichte von Clarendon (1166) und Northampton (1176) Heinrichs II. schufen einheitliche Straf- und Landverfahren in England und ersetzten die lokale baroniale Justiz durch ein System von königlichen Richtern, Geschworenen und Kurzrichtern, das zum Rückgrat des allgemeinen Rechts wurde.',
    },
    seeAlso: ['common-law'],
  },
];
