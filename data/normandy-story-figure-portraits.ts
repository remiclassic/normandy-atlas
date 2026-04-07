import type { NormandyStoryFigure, NormandyStoryFigurePortrait } from '@/types';

/** Local story photography used as period-evocative stand-ins (no external hotlinking). */
const A = {
  ships: '/story/age-of-exploration/atlantic-crossing-16th-century.jpg',
  dieppe: '/story/age-of-exploration/dieppe-port.jpg',
  honfleur: '/story/age-of-exploration/honfleur-port.jpg',
  leHavre: '/story/age-of-exploration/le-havre-bassin-manche.jpg',
  gaspe: '/story/age-of-exploration/gaspe-point-newport.jpg',
  crusade: '/story/norman-expansion/crusade-jerusalem-1099.jpg',
  cyprus: '/story/norman-expansion/richard-cyprus-limassol-1191.jpg',
  portRoyal: '/story/new-france-foundations/port-royal-habitation.jpg',
  saintMalo: '/story/new-france-foundations/saint-malo-historical-engraving.png',
  vikingLongship: '/story/viking-age/oseberg-ship-viking-longship.jpg',
  bayeuxFleet: '/story/william-conqueror/bayeux-tapestry-fleet.jpg',
  bayeuxHastings: '/story/william-conqueror/bayeux-tapestry-hastings.jpg',
  bayeuxKnights: '/story/william-conqueror/bayeux-tapestry-knights.jpg',
  bayeuxOath: '/story/william-conqueror/bayeux-tapestry-oath.jpg',
  bayeuxCoronation: '/story/william-conqueror/bayeux-tapestry-coronation.jpg',
  wolfeQuebec: '/story/atlantic-imprint/benjamin-west-death-of-general-wolfe.jpg',
  vercingetorixStatue: '/story/normandy-figures/vercingetorix-alesia.jpg',
  juliusCaesarBust: '/story/normandy-figures/julius-caesar-bust.jpg',
  victriciusIllustrative: '/story/normandy-figures/victricius-of-rouen-illustrative.png',
  jacquesCartierPortrait: '/story/normandy-figures/jacques-cartier-portrait.jpg',
  joanOfArcMiniature: '/story/normandy-figures/joan-of-arc-miniature.jpg',
  rolloFalaiseStatue: '/story/normandy-figures/rollo-falaise-statue.jpg',
  charlesTheSimple: '/story/normandy-figures/charles-the-simple.jpg',
  richardINormandy: '/story/normandy-figures/richard-i-normandy.jpg',
  robertGuiscardBlondel: '/story/normandy-figures/robert-guiscard-blondel.jpg',
  odoCountParis: '/story/normandy-figures/odo-count-paris.jpg',
  merovingianBnfBrunehaut: '/story/normandy-figures/merovingian-bnf-brunehaut.jpg',
  vikingSiegeParis885: '/story/normandy-figures/viking-siege-paris-885.jpeg',
  veliocassesCoin: '/story/normandy-figures/veliocasses-coin.jpg',
  caletesCoin: '/story/normandy-figures/caletes-coin.jpg',
  jeanAngoBust: '/story/normandy-figures/jean-ango-bust.jpg',
  /** Built by `scripts/build-normandy-figure-portraits.mjs` (Wikimedia + illustrative composites). */
  figures: {
    champlain: '/story/normandy-figures/samuel-de-champlain.jpg',
    marieIncarnation: '/story/normandy-figures/marie-de-lincarnation.jpg',
    talonFrontenac: '/story/normandy-figures/jean-talon-louis-frontenac.jpg',
    poutrincourtLescarbot: '/story/normandy-figures/poutrincourt-marc-lescarbot.jpg',
    membertou: '/story/normandy-figures/membertou.jpg',
    laSalle: '/story/normandy-figures/rene-robert-cavelier-de-la-salle.jpg',
  },
} as const;

const CREDIT =
  'Norman Atlas story library — period-evocative photograph (see /public/story)';

/** Per-figure portrait under `/public/story/normandy-figures/people/` (filled by `npm run fetch:people-assets`). */
function peep(id: string): string {
  return `/story/normandy-figures/people/${id}.jpg`;
}

/** FNV-1a — stable, varied thumbnail per figure id (reduces duplicate tiles in the People grid). */
function stablePick<T>(items: readonly T[], id: string): T {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return items[(h >>> 0) % items.length]!;
}

function p(src: string, name: string, hint?: string, credit?: string): NormandyStoryFigurePortrait {
  return {
    src,
    alt: hint ? `${name} — ${hint}` : `${name} — narrative casting reference`,
    credit: credit ?? CREDIT,
  };
}

function pPool(pool: readonly string[], id: string, name: string, hint: string): NormandyStoryFigurePortrait {
  return p(stablePick(pool, id), name, hint);
}

const POOL_DEEP_TIME = [
  A.gaspe,
  A.dieppe,
  A.honfleur,
  A.leHavre,
  A.portRoyal,
  A.ships,
  A.saintMalo,
  A.vikingLongship,
] as const;

const POOL_IRON_AGE = [
  A.dieppe,
  A.honfleur,
  A.leHavre,
  A.gaspe,
  A.ships,
  A.portRoyal,
  A.vikingLongship,
  A.saintMalo,
  A.crusade,
] as const;

const POOL_ROMAN_GAUL = [
  A.leHavre,
  A.honfleur,
  A.dieppe,
  A.gaspe,
  A.ships,
  A.portRoyal,
  A.saintMalo,
  A.vikingLongship,
] as const;

const POOL_FRANKISH_COAST = [
  A.honfleur,
  A.dieppe,
  A.leHavre,
  A.gaspe,
  A.ships,
  A.portRoyal,
  A.saintMalo,
] as const;

const POOL_CAROLINGIAN = [
  A.ships,
  A.dieppe,
  A.honfleur,
  A.leHavre,
  A.gaspe,
  A.portRoyal,
  A.vikingLongship,
  A.saintMalo,
] as const;

const POOL_VIKING = [
  A.vikingLongship,
  A.ships,
  A.dieppe,
  A.leHavre,
  A.honfleur,
  A.gaspe,
  A.bayeuxFleet,
  A.bayeuxKnights,
  A.portRoyal,
] as const;

const POOL_NORMAN_ORIGINS = [
  A.honfleur,
  A.dieppe,
  A.leHavre,
  A.gaspe,
  A.bayeuxOath,
  A.bayeuxFleet,
  A.vikingLongship,
  A.portRoyal,
  A.saintMalo,
  A.ships,
] as const;

const POOL_DUCHY = [
  A.bayeuxFleet,
  A.bayeuxHastings,
  A.bayeuxKnights,
  A.bayeuxOath,
  A.bayeuxCoronation,
  A.honfleur,
  A.dieppe,
  A.leHavre,
  A.gaspe,
  A.crusade,
  A.cyprus,
] as const;

const POOL_NORMAN_EXPANSION = [
  A.crusade,
  A.cyprus,
  A.dieppe,
  A.gaspe,
  A.honfleur,
  A.leHavre,
  A.bayeuxKnights,
  A.portRoyal,
  A.vikingLongship,
  A.ships,
] as const;

const POOL_LATE_MEDIEVAL = [
  A.cyprus,
  A.crusade,
  A.dieppe,
  A.honfleur,
  A.gaspe,
  A.leHavre,
  A.wolfeQuebec,
  A.bayeuxCoronation,
] as const;

const POOL_ATLANTIC_FRANCE = [A.dieppe, A.honfleur, A.leHavre, A.gaspe, A.saintMalo, A.portRoyal, A.ships] as const;

const POOL_NEW_FRANCE = [
  A.gaspe,
  A.portRoyal,
  A.saintMalo,
  A.dieppe,
  A.honfleur,
  A.leHavre,
  A.ships,
] as const;

const POOL_ACADIA = [A.portRoyal, A.gaspe, A.dieppe, A.honfleur, A.leHavre, A.saintMalo, A.ships] as const;

const POOL_LOUISIANA = [
  A.figures.laSalle,
  A.gaspe,
  A.portRoyal,
  A.leHavre,
  A.honfleur,
  A.dieppe,
] as const;

const POOL_SEVEN_YEARS = [A.wolfeQuebec, A.crusade, A.gaspe, A.portRoyal, A.leHavre] as const;

const POOL_FALLBACK = [
  A.dieppe,
  A.honfleur,
  A.leHavre,
  A.gaspe,
  A.ships,
  A.portRoyal,
  A.saintMalo,
  A.crusade,
] as const;

/** Per-figure overrides for stronger visual match than era defaults. */
const PORTRAIT_OVERRIDES: Partial<Record<string, NormandyStoryFigurePortrait>> = {
  cartier: p(
    A.jacquesCartierPortrait,
    'Jacques Cartier',
    'Portrait after Théophile Hamel (19th c., after no authentic likeness)',
    'Wikimedia Commons — File:Jacques Cartier.jpg (public domain)',
  ),
  roberval: p(
    A.saintMalo,
    'Roberval',
    'Atlantic staging port — Breton–Norman sailing world',
    CREDIT,
  ),
  champlain: p(
    A.figures.champlain,
    'Samuel de Champlain',
    'Portrait after 17th-century tradition (Ronjat, 19th c.)',
    'Wikimedia Commons — File:Samuel de Champlain by Ronjat.jpg (public domain)',
  ),
  'marie-incarnation': p(
    A.figures.marieIncarnation,
    'Marie de l’Incarnation',
    'Marie Guyart — Ursuline foundress of Québec (portrait attributed to Hugues Pommier, 1672)',
    'Wikimedia Commons — File:Portrait de Mère Marie de l’Incarnation.jpg (public domain)',
  ),
  'talon-frontenac': p(
    A.figures.talonFrontenac,
    'Jean Talon / Louis de Buade de Frontenac',
    'Dual portrait: intendant Talon (PD) and comte de Frontenac statue (Parliament, Québec)',
    'Wikimedia Commons — File:Jean Talon.jpg (PD); File:Louis de Buade de Frontenac.jpg © Jean Gagnon, CC BY-SA 3.0',
  ),
  'poutrincourt-lescarbot': p(
    A.figures.poutrincourtLescarbot,
    'Poutrincourt / Marc Lescarbot',
    'Illustrative paired portraits for Acadian founders (no single authoritative likeness for both)',
    'Norman Atlas — AI-generated illustrative portraits; not historical photographs',
  ),
  membertou: p(
    A.figures.membertou,
    'Membertou',
    'Mi’kmaw sagamore — illustrative portrait (no contemporary portrait survives)',
    'Norman Atlas — AI-generated respectful illustrative portrait; not a documentary likeness',
  ),
  vercingetorix: p(
    A.vercingetorixStatue,
    'Vercingetorix',
    'Monument at Alise-Sainte-Reine (Alesia) — Aimé Millet, 1865',
    'Wikimedia Commons — File:Vercingétorix Alésia.jpg © Siren-Com, CC BY-SA 3.0 (photo); statue 19th c.',
  ),
  'julius-caesar': p(
    A.juliusCaesarBust,
    'Julius Caesar',
    'Marble bust (Roman imperial copy after antique model)',
    'Wikimedia Commons — File:Retrato de Julio César (26724093101).jpg (public domain)',
  ),
  'caesar-map': p(
    A.juliusCaesarBust,
    'Julius Caesar',
    'Marble bust (Roman imperial copy after antique model)',
    'Wikimedia Commons — File:Retrato de Julio César (26724093101).jpg (public domain)',
  ),
  'victricius-rouen': p(
    A.victriciusIllustrative,
    'Victricius of Rouen',
    'Illustrative late-antique bishop portrait (no authentic likeness survives)',
    'Norman Atlas — AI-generated illustrative portrait; not a documentary likeness',
  ),
  'victricius-map': p(
    A.victriciusIllustrative,
    'Victricius of Rouen',
    'Illustrative late-antique bishop portrait (no authentic likeness survives)',
    'Norman Atlas — AI-generated illustrative portrait; not a documentary likeness',
  ),
  'william-conqueror': p(
    A.bayeuxFleet,
    'William the Conqueror',
    'Bayeux Tapestry — Norman fleet (scene 36)',
    'Wikimedia Commons — File:BayeuxTapestryScene36.jpg (public domain)',
  ),
  'harold-godwinson': p(
    A.bayeuxHastings,
    'Harold Godwinson',
    'Bayeux Tapestry — death of King Harold at Hastings (scene 57, excerpt)',
    'Wikimedia Commons — File:Bayeux Tapestry scene57 Harold death (cropped).jpg (public domain)',
  ),
  'robert-guiscard': p(
    A.robertGuiscardBlondel,
    'Robert Guiscard',
    'Imaginary portrait — Merry-Joseph Blondel, 1843 (Versailles series)',
    'Wikimedia Commons — File:Robert Guiscard (by Merry-Joseph Blondel).jpg (public domain)',
  ),
  'bohemond-tancred-crusade': p(
    peep('bohemond-tancred-crusade'),
    'Bohemond & Tancred',
    'Bohemond of Taranto — later tradition portrait (Tancred: separate Hauteville tile)',
    'Wikimedia Commons — File:Bohemond I of Antioch.jpg (public domain)',
  ),
  'jean-ango': p(
    A.jeanAngoBust,
    'Jean Ango',
    'Bust by Eugène Bénet — Musée Château de Dieppe',
    'Wikimedia Commons — Jehan Ango bust (Musée Château de Dieppe) © municipalité de Dieppe, CC BY-SA 4.0',
  ),
  'la-salle': p(
    A.figures.laSalle,
    'René-Robert Cavelier de La Salle',
    'Engraving-style portrait (Appleton’s Cyclopædia, 1892)',
    'Wikimedia Commons — File:Appletons’ La Salle Robert Cavelier Sieur de.jpg (public domain in USA)',
  ),
  'montcalm-wolfe': p(
    A.wolfeQuebec,
    'Montcalm & Wolfe',
    'Plains of Abraham, 1759 (Benjamin West, 1770)',
    'Wikimedia Commons — File:Benjamin West - The Death of General Wolfe - WGA25558.jpg (public domain)',
  ),
  'joan-of-arc': p(
    A.joanOfArcMiniature,
    'Joan of Arc',
    'Historiated miniature (French National Archives AE-II-2490; artwork 19th-c. tradition)',
    'Wikimedia Commons — File:Joan of Arc miniature graded.jpg (public domain)',
  ),
  'philip-augustus': p(
    '/story/normandy-figures/philip-ii-augustus-wikimedia.jpg',
    'Philip II Augustus',
    'Royal portrait tradition — Philip II “Augustus” of France',
    'Wikimedia Commons — File:Philip II of France.jpg (public domain)',
  ),
  rollo: p(
    A.rolloFalaiseStatue,
    'Rollo',
    'Ducal monument, place Guillaume-le-Conquérant, Falaise (figure of Rollo in the six-dukes suite)',
    'Wikimedia Commons — File:Rollo statue in falaise.JPG © Imars / Michael Shea, CC BY-SA 2.5',
  ),
  'charles-simple': p(
    A.charlesTheSimple,
    'Charles the Simple',
    'West Frankish king — later portrait tradition',
    'Wikimedia Commons — File:Charles III le Simple.jpg (public domain)',
  ),
  'richard-i': p(
    A.richardINormandy,
    'Richard I (Sans Peur)',
    '14th-c. miniature — Chroniques de France (BL Royal MS 16 G VI)',
    'Wikimedia Commons — File:Richard I of Normandy.jpg (public domain)',
  ),
  'odo-paris': p(
    A.odoCountParis,
    'Odo, Count of Paris',
    'Retrospective portrait — Charles de Steuben (Eudes défendant Paris)',
    'Wikimedia Commons — File:Odo king of France.jpg (public domain)',
  ),
  'sigfred-sinric': p(
    A.vikingSiegeParis885,
    'Sigfred, Sinric (Norse leaders at Paris)',
    'Viking siege of Paris 885–886 — Jean-Victor Schnetz (1834–36, evocation)',
    'Wikimedia Commons — File:Siege of Paris (885–886).jpeg (public domain)',
  ),
  'chilperic-fredegund-brunhilda': p(
    A.merovingianBnfBrunehaut,
    'Chilperic I, Fredegund, Brunhilda',
    'Marriage of Sigebert and Brunhaut — Grandes Chroniques de France, BnF Fr. 2610',
    'Wikimedia Commons — BnF Gallica, Fr 2610 f.31r (15th c., public domain)',
  ),
  'frankish-brunhilda-map': p(
    A.merovingianBnfBrunehaut,
    'Brunhilda / Chilperic / Fredegund',
    'Marriage of Sigebert and Brunhaut — Grandes Chroniques de France, BnF Fr. 2610',
    'Wikimedia Commons — BnF Gallica, Fr 2610 f.31r (15th c., public domain)',
  ),
  'veliocasses-elite': p(
    A.veliocassesCoin,
    'Veliocasses tribal leadership',
    'Véliocasses bronze (c. 50–40 BCE) — numismatic anchor for the civitas',
    'Wikimedia Commons — File:Bronze au cheval frappé par les Véliocasses.jpg (CC BY-SA 3.0, cgb.fr / VRTS)',
  ),
  'gallic-tribes-normandy': p(
    A.caletesCoin,
    'Caletes, Unelli, Abrincates, Bajocasses (tribal polities)',
    'Iron Age quarter stater — Caletes / Normandy coast type (PAS find)',
    'Wikimedia Commons — Caletes stater (CC BY 2.0) — Colchester Treasure Hunting / Portable Antiquities Scheme',
  ),

  'neo-megalith-builders': p(
    peep('neo-megalith-builders'),
    'Megalith-building communities',
    'Carnac alignments — Atlantic megalithic landscape (evocative collective)',
    'Wikimedia Commons — File:Alignements de Carnac.JPG © Vanbasten 23, CC BY-SA 4.0',
  ),
  'bronze-channel-traders': p(
    peep('bronze-channel-traders'),
    'Channel metal traders',
    'Bronze swords — Gallo-Roman museum of Lyon (evocative metalworking milieu)',
    'Wikimedia Commons — File:Bronze swords-MGR Lyon-IMG 9734.jpg © Rama, CeCILL',
  ),
  'romain-rouen-legend': p(
    peep('romain-rouen-legend'),
    'Romain de Rouen (trad.)',
    'Notre-Dame de Rouen — façade (hagiographic “Romanus” layer tied to the city church)',
    'Wikimedia Commons — File:Rouen Cathedral, front.jpg © Joe Mabel, CC BY-SA 3.0',
  ),
  'roman-magistrates-lugdunensis': p(
    peep('roman-magistrates-lugdunensis'),
    'Roman legates & governors (Lugdunensis)',
    'Roman theatre — Fourvière, Lugdunum (capital of the Three Gauls; procedural “imperial north” anchor)',
    'Wikimedia Commons — File:Théâtre romain de Fourvière.jpg © Jean-Christophe BENOIST, CC BY-SA 3.0',
  ),
  'roman-civitas-rotomagus': p(
    peep('roman-civitas-rotomagus'),
    'Rotomagus elites & veteran settlers',
    'Maison Carrée — Nîmes (high Roman civic architecture; civitas imagination)',
    'Wikimedia Commons — File:Maison Carrée Nîmes.jpg © Carole Raddato, CC BY-SA 2.0',
  ),
  'roman-veterans-merchants-seine': p(
    peep('roman-veterans-merchants-seine'),
    'Roman veterans & merchants (Seine corridor)',
    'Mosaic — Musée gallo-romain de Saint-Romain-en-Gal (villa culture / riverine economy)',
    'Wikimedia Commons — File:Hylas Saint-Romain-en Gal 07 2011.jpg © Vassil, CC BY 3.0',
  ),
  'rotomagus-bishops-transition': p(
    peep('rotomagus-bishops-transition'),
    'Bishops of Rotomagus',
    'Rouen Cathedral — transept and crossing (episcopal continuity into post-Roman centuries)',
    'Wikimedia Commons — File:Rouen Cathedral, View up the transept and tower 20140215 1.jpg © DXR, CC BY-SA 3.0',
  ),
  'salian-franks-frontier': p(
    peep('salian-franks-frontier'),
    'Salian Franks (Rhine frontier pressure)',
    'Seal of Childeric I — Tournai tomb (copy; Merovingian regalia context)',
    'Wikimedia Commons — File:Seal of Childeric I Tournai tomb.jpg (public domain)',
  ),
  'late-roman-villa-elite': p(
    peep('late-roman-villa-elite'),
    'Late Roman landlords & local magistrates',
    'Gallo-Roman museum galleries — Saint-Romain-en-Gal (villa / elite consumption context)',
    'Wikimedia Commons — File:Musée GR de Saint-Romain-en-Gal 27 07 2011 32.jpg © P.poschadel, CC BY-SA 3.0',
  ),
  clovis: p(
    peep('clovis'),
    'Clovis I',
    'Later portrait tradition — Clovis Ier (stamp after painting)',
    'Wikimedia Commons — File:Clovis Ier, PA04987.jpg (public domain)',
  ),
  'dagobert-i': p(
    peep('dagobert-i'),
    'Dagobert I',
    'Engraved portrait — Dagobert I (19th-c. print after earlier tradition)',
    'Wikimedia Commons — File:Dagobertus, R3A12087 010.jpg (public domain)',
  ),
  'charles-martel': p(
    peep('charles-martel'),
    'Charles Martel',
    'Later portrait tradition — Charles Martel',
    'Wikimedia Commons — File:Charles Martel 01.jpg (public domain)',
  ),
  'pepin-short': p(
    peep('pepin-short'),
    'Pepin the Short',
    'Imaginary portrait — Delpech series (19th c.)',
    'Wikimedia Commons — File:Delpech - Pepin the Short.jpg (public domain)',
  ),
  'charles-fat': p(
    peep('charles-fat'),
    'Charles the Fat',
    'Portrait tradition — Charles III the Fat',
    'Wikimedia Commons — File:Charles III the Fat.jpg (public domain)',
  ),
  'hastein-bjorn': p(
    peep('hastein-bjorn'),
    'Hastein & Björn (Ironside)',
    'Oseberg ship — Viking Ship Museum, Oslo (9th-c. ship burial; evocative of great-fleet raids)',
    'Wikimedia Commons — File:Oseberg ship - IMG 9186.jpg © Daderot, CC0',
  ),
  'monastic-chronicler-voices': p(
    peep('monastic-chronicler-voices'),
    'Monastic chronicler voices',
    'Scriptorium reconstruction — Montserrat (evocative of cloister chronicles)',
    'Wikimedia Commons — File:Scriptorium.jpg © Daniel Villafruela, CC BY-SA 3.0',
  ),
  'william-longsword': p(
    peep('william-longsword'),
    'William Longsword',
    'Statue — ducal monument suite, Falaise',
    'Wikimedia Commons — File:William longsword statue in falaise.JPG © Osado, CC BY-SA 3.0',
  ),
  'richard-ii': p(
    peep('richard-ii'),
    'Richard II of Normandy',
    'Miniature — Chroniques de France tradition',
    'Wikimedia Commons — File:Richard II of Normandy.jpg (public domain)',
  ),
  'richard-iii-robert-i': p(
    '/story/normandy-figures/people/richard-iii-robert-i.png',
    'Richard III / Robert I (Magnificent)',
    'Genealogical Chronicle miniature — Richard III of Normandy (later manuscript tradition)',
    'Wikimedia Commons — File:Richard III of Normandy.png (public domain)',
  ),
  'emma-gunnor': p(
    peep('emma-gunnor'),
    'Emma of Normandy',
    'Queen Emma received at Richard II’s court — Cambridge MS tradition (detail)',
    'Wikimedia Commons — File:Emma of Normandy 1.jpg (public domain)',
  ),
  dudo: p(
    peep('dudo'),
    'Dudo of Saint-Quentin',
    'Bayeux Tapestry — opening scene (Edward; Norman origin narrative milieu for Dudo’s story-world)',
    'Wikimedia Commons — File:BayeuxTapestryScene01.jpg (public domain)',
  ),
  'gisela-frankish': p(
    peep('gisela-frankish'),
    'Gisela of France',
    '19th-c. tableau — Charles the Simple, Rollo, and Gisela (dramatic tradition)',
    'Wikimedia Commons — File:Karl+Rollo+Gisela.jpg © Wolpertinger, CC BY-SA 3.0',
  ),
  'maurilius-archbishop-rouen': p(
    peep('maurilius-archbishop-rouen'),
    'Maurilius of Rouen',
    'Cathedra — Notre-Dame de Rouen (episcopal seat as narrative anchor)',
    'Wikimedia Commons — File:Cathèdre, Cathédrale Notre-Dame de Rouen-8529a (cropped).jpg © K.Weikert, CC BY-SA 4.0',
  ),
  'michael-archbishop-rouen': p(
    peep('michael-archbishop-rouen'),
    'Michael of Rouen',
    'Empress Matilda epitaph — Rouen Cathedral (Angevin–ducal church politics context)',
    'Wikimedia Commons — File:Epitaph of Empress Matilda, Rouen Cathedral.jpg © KayPerring, CC BY-SA 4.0',
  ),
  'roman-magistrates-map': p(
    peep('roman-magistrates-map'),
    'Roman magistrates (map voice)',
    'Gallo-Roman archaeology display — Musée de Picardie (northern Gaul material culture)',
    'Wikimedia Commons — File:Musée Picardie Archéo 01.jpg © Vassil, CC BY 3.0',
  ),
  'frankish-clovis-map': p(
    peep('frankish-clovis-map'),
    'Clovis (map voice)',
    'Baptism of Clovis — later monumental painting tradition',
    'Wikimedia Commons — File:Baptism of Clovis.jpg (public domain)',
  ),
  'dagobert-frankish-map': p(
    peep('dagobert-frankish-map'),
    'Dagobert I (map voice)',
    'Jumièges abbey church ruins — Dagobert patronage anchor',
    'Wikimedia Commons — File:Jumièges Abbaye de Jumièges Église Saint-Pierre 2.jpg © Pierre-Édouard Bonnin, CC BY-SA 4.0',
  ),
  'viking-rollo-precursor': p(
    peep('viking-rollo-precursor'),
    'Viking–Rollo precursor voices',
    'Gokstad ship — Viking Age burial ship (Oslo museums; distinct from Oseberg tile)',
    'Wikimedia Commons — File:Cf19474 04 Gokstadskipet i Universitetshagen (Gokstad ship. Kulturhistorisk museum UiO Oslo, Norway. License CC BY-SA 4.0).jpg © Kulturhistorisk museum UiO, CC BY-SA 4.0',
  ),
  'rollo-early-normandy': p(
    peep('rollo-early-normandy'),
    'Rollo (early Normandy)',
    'Charles the Simple gives his daughter to Rollo — British Library manuscript tradition',
    'Wikimedia Commons — File:Rollo+Charles.jpg (public domain)',
  ),
  'matilda-flanders': p(
    peep('matilda-flanders'),
    'Matilda of Flanders',
    'Imaginary portrait — 19th-c. print tradition',
    'Wikimedia Commons — File:Matilda of Flanders.jpg (public domain)',
  ),
  'odo-bayeux': p(
    peep('odo-bayeux'),
    'Odo of Bayeux',
    'Imaginary portrait — later tradition',
    'Wikimedia Commons — File:Odo of Bayeux.jpg (public domain)',
  ),
  'lanfranc-anselm': p(
    peep('lanfranc-anselm'),
    'Lanfranc / Anselm',
    'Anselm of Canterbury — narrative stand-in for the Bec–Canterbury reform arc (Lanfranc as predecessor)',
    'Wikimedia Commons — File:Anselm of Canterbury.jpg (public domain)',
  ),
  'robert-curthose': p(
    peep('robert-curthose'),
    'Robert Curthose',
    'Imaginary portrait — 19th-c. print tradition',
    'Wikimedia Commons — File:Robert Curthose.jpg (public domain)',
  ),
  'henry-i-england': p(
    peep('henry-i-england'),
    'Henry I of England',
    'Miniature from Matthew Paris tradition (later copy)',
    'Wikimedia Commons — File:Henry I of England.jpg (public domain)',
  ),
  'robert-mortain': p(
    peep('robert-mortain'),
    'Robert, Count of Mortain',
    'Bayeux Tapestry — scene 44 (Robert of Mortain)',
    'Wikimedia Commons — File:Bayeux Tapestry scene44 Robert de Morten.jpg (public domain)',
  ),
  'william-rufus': p(
    peep('william-rufus'),
    'William II (Rufus)',
    'Portrait miniature tradition',
    'Wikimedia Commons — File:William II of England.jpg (public domain)',
  ),
  'belleme-magnates': p(
    peep('belleme-magnates'),
    'Bellême magnates',
    'Château du Tertre — Sérigy, Orne (Bellême–Perche marcher context)',
    'Wikimedia Commons — File:Château du Tertre 1.jpg © Pierre-Édouard Bonnin, CC BY-SA 4.0',
  ),
  'robert-of-gloucester': p(
    peep('robert-of-gloucester'),
    'Robert of Gloucester',
    'Tewkesbury Abbey Founders’ Book — Robert of Gloucester (later depiction)',
    'Wikimedia Commons — File:RobertConsul TewkesburyAbbey FoundersBook.jpg (public domain)',
  ),
  'hauteville-tancred': p(
    peep('hauteville-tancred'),
    'Tancred of Hauteville',
    'Imaginary portrait — Tancrède de Hauteville (later print tradition)',
    'Wikimedia Commons — File:Tancrède de Hauteville.jpg (public domain)',
  ),
  'roger-i-ii': p(
    peep('roger-i-ii'),
    'Roger I / Roger II',
    'Roger II of Sicily — mosaic portrait tradition (later reproduction)',
    'Wikimedia Commons — File:Roger II of Sicily.jpg (public domain)',
  ),
  'william-iron-arm': p(
    peep('william-iron-arm'),
    'William Iron Arm',
    'Cathedral statue — “Guillaume Bras-de-Fer”, Coutances (Hauteville memorial suite)',
    'Wikimedia Commons — File:Statue cathédrale Coutances Guillaume Bras-de-fer.JPG © Giogo, CC BY-SA 3.0',
  ),
  'drogo-hauteville': p(
    peep('drogo-hauteville'),
    'Drogo of Hauteville',
    'Hauteville tomb suite — Venosa (Italo-Norman burial anchor)',
    'Wikimedia Commons — File:Tomba degli Altavilla.jpg © Berthold Werner, CC BY-SA 3.0',
  ),
  'humphrey-hauteville': p(
    peep('humphrey-hauteville'),
    'Humphrey of Hauteville',
    'Cathedral statue — Hauteville memorial figure, Coutances (trad. identification varies)',
    'Wikimedia Commons — File:Statue cathédrale Coutances Hauteville 2.JPG © Giogo, CC BY-SA 3.0',
  ),
  'alexios-i-komnenos': p(
    peep('alexios-i-komnenos'),
    'Alexios I Komnenos',
    'Byzantine mosaic — Hagia Sophia (ruler portrait tradition)',
    'Wikimedia Commons — File:Alexios I Komnenos.jpg © Myrabella, CC BY-SA 3.0',
  ),
  'popes-reform-era': p(
    peep('popes-reform-era'),
    'Reform-era popes (voice)',
    'Pope Gregory VII — later portrait tradition',
    'Wikimedia Commons — File:Pope Gregory VII.jpg (public domain)',
  ),
  'john-lackland': p(
    peep('john-lackland'),
    'John (Lackland)',
    'Matthew Paris tradition — King John of England',
    'Wikimedia Commons — File:John of England (John Lackland).jpg (public domain)',
  ),
  'louis-viii': p(
    peep('louis-viii'),
    'Louis VIII',
    'Imaginary portrait — Henri Lehmann (Versailles series)',
    'Wikimedia Commons — File:Lehmann - Louis VIII of France.jpg (public domain)',
  ),
  'edward-iii': p(
    peep('edward-iii'),
    'Edward III',
    'Imaginary portrait — 18th-c. engraving tradition',
    'Wikimedia Commons — File:Edward III of England.jpg (public domain)',
  ),
  'edward-black-prince': p(
    peep('edward-black-prince'),
    'Edward the Black Prince',
    'Portrait tradition — Edward of Woodstock',
    'Wikimedia Commons — File:Edward the Black Prince.jpg (public domain)',
  ),
  'bertrand-du-guesclin': p(
    peep('bertrand-du-guesclin'),
    'Bertrand du Guesclin',
    'Imaginary portrait — 19th-c. print tradition',
    'Wikimedia Commons — File:Bertrand du Guesclin.jpg (public domain)',
  ),
  'henry-v': p(
    peep('henry-v'),
    'Henry V',
    'Portrait miniature tradition',
    'Wikimedia Commons — File:Henry V of England.jpg (public domain)',
  ),
  'charles-vii': p(
    peep('charles-vii'),
    'Charles VII',
    'Imaginary portrait — later tradition',
    'Wikimedia Commons — File:Charles VII of France.jpg (public domain)',
  ),
  coligny: p(
    peep('coligny'),
    'Gaspard II de Coligny',
    'Portrait — school of Clouet tradition',
    'Wikimedia Commons — File:Gaspard II de Coligny.jpg (public domain)',
  ),
  villegagnon: p(
    peep('villegagnon'),
    'Nicolas Durand de Villegagnon',
    'Portrait attributed to Nicolas Lagneau (traditional identification)',
    'Wikimedia Commons — File:Nicolas Lagneau - Nicolas Durand de Villegagnon.jpg (public domain)',
  ),
  'iberville-bienville': p(
    peep('iberville-bienville'),
    'Iberville & Bienville',
    'Pierre Le Moyne d’Iberville — engraving tradition (card also names Jean-Baptiste de Bienville)',
    'Wikimedia Commons — File:Iberville.jpg (public domain)',
  ),
  'francois-gaston-levis': p(
    peep('francois-gaston-levis'),
    'François-Gaston de Lévis',
    'Portrait with marshal’s baton — 18th-c. tradition (Stewart cast photo)',
    'Wikimedia Commons — File:François Gaston de Lévis (Stewart 1984-8).jpg © Stewart Museum, CC BY-SA 4.0',
  ),
  'pierre-de-rigaud-vaudreuil': p(
    peep('pierre-de-rigaud-vaudreuil'),
    'Pierre de Rigaud de Vaudreuil',
    'Portrait tradition — last French governor general of New France',
    'Wikimedia Commons — File:Pierre de Rigaud de Vaudreuil.jpg (public domain)',
  ),
  'francois-bigot': p(
    peep('francois-bigot'),
    'François Bigot',
    'Known faux-historical portrait (19th-c. pastiche; useful thumbnail only)',
    'Wikimedia Commons — File:Chevignard-Faux-Portrait-de-Bigot 02.jpg (public domain)',
  ),
};

function pickDefaultPortrait(f: NormandyStoryFigure): NormandyStoryFigurePortrait {
  const o = PORTRAIT_OVERRIDES[f.id];
  if (o) return o;

  const { eraId, eraSource } = f;

  if (eraSource === 'atlas') {
    if (eraId === 'neolithic-normandy') {
      return pPool(POOL_DEEP_TIME, f.id, f.name, 'Neolithic Normandy — coastal deep-time (evocative)');
    }
    if (eraId === 'bronze-age-channel') {
      return pPool(POOL_DEEP_TIME, `${f.id}:bronze`, f.name, 'Bronze Age Channel — trade and metal (evocative)');
    }
    if (eraId === 'iron-age-gaul') {
      return pPool(POOL_IRON_AGE, f.id, f.name, 'Iron Age Channel–Seine world (evocative)');
    }
    if (eraId === 'roman-gaul') {
      return pPool(POOL_ROMAN_GAUL, f.id, f.name, 'Roman Gaul — northern civitas & river economy (evocative)');
    }
    if (eraId === 'post-roman-gaul' || eraId === 'neustria') {
      return pPool(POOL_FRANKISH_COAST, f.id, f.name, 'Post-Roman north — Frankish coast (evocative)');
    }
    if (eraId === 'frankish-carolingian') {
      return pPool(POOL_CAROLINGIAN, f.id, f.name, 'Carolingian era — northern Frankish world (evocative)');
    }
    if (eraId === 'viking-age') {
      return pPool(POOL_VIKING, f.id, f.name, 'Viking Age — ships, raids, and chronicles (evocative)');
    }
    if (eraId === 'norman-origins') {
      return pPool(POOL_NORMAN_ORIGINS, f.id, f.name, 'Norman origins — Channel ports & duchy formation (evocative)');
    }
    return pPool(POOL_FALLBACK, `atlas:${f.id}`, f.name, 'Medieval–early modern Normandy (evocative)');
  }

  if (eraId === 'roman-gaul' || eraId === 'frankish') {
    return pPool(POOL_FRANKISH_COAST, `map:${f.id}`, f.name, 'Northern Frankish / late Roman coast (evocative)');
  }
  if (eraId === 'viking') {
    return pPool(POOL_VIKING, `map:${f.id}`, f.name, 'Viking Age — longships and chroniclers (evocative)');
  }
  if (eraId === 'early-normandy') {
    return pPool(POOL_NORMAN_ORIGINS, f.id, f.name, 'Early Normandy — maritime origins (evocative)');
  }
  if (eraId === 'duchy') {
    return pPool(POOL_DUCHY, f.id, f.name, 'Norman duchy — Bayeux-era cross-Channel moment (evocative)');
  }
  if (eraId === 'norman-expansion') {
    return pPool(POOL_NORMAN_EXPANSION, f.id, f.name, 'Norman expansion — Mediterranean & Outremer (evocative)');
  }
  if (eraId === 'late-medieval-france') {
    return pPool(POOL_LATE_MEDIEVAL, f.id, f.name, 'Late medieval France (evocative)');
  }
  if (eraId === 'age-of-exploration' || eraId === 'early-french-colonial') {
    return pPool(POOL_ATLANTIC_FRANCE, f.id, f.name, 'Atlantic France (evocative)');
  }
  if (eraId === 'new-france') {
    return pPool(POOL_NEW_FRANCE, f.id, f.name, 'St. Lawrence & colonial France (evocative)');
  }
  if (eraId === 'acadia-atlantic') {
    return pPool(POOL_ACADIA, f.id, f.name, 'Acadian shore (evocative)');
  }
  if (eraId === 'louisiana-interior') {
    return pPool(POOL_LOUISIANA, f.id, f.name, 'French interior claims — Louisiana era (evocative)');
  }
  if (eraId === 'seven-years-war') {
    return pPool(POOL_SEVEN_YEARS, f.id, f.name, 'Seven Years’ War — fall of New France (evocative)');
  }
  return pPool(POOL_FALLBACK, `map:${f.id}`, f.name, 'Normandy-region narrative (evocative)');
}

export function mergeNormandyFigurePortraits(figures: NormandyStoryFigure[]): NormandyStoryFigure[] {
  return figures.map((f) => (f.portrait ? f : { ...f, portrait: pickDefaultPortrait(f) }));
}
