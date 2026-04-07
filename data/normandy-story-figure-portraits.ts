import type { NormandyStoryFigure, NormandyStoryFigurePortrait } from '@/types';
import figurePortraitCommonsUrls from '@/data/normandy-figure-portrait-commons-urls.json';

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
  philipIIAugustusWikimedia: '/story/normandy-figures/philip-ii-augustus-wikimedia.jpg',
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

const FIGURE_PORTRAIT_COMMONS = figurePortraitCommonsUrls as Record<string, string>;

/**
 * Local People-grid thumbnail under `/public/story/normandy-figures/people/`.
 * Extension follows the mirrored Commons file (see `normandy-figure-portrait-commons-urls.json`); run `npm run fetch:people-assets` to populate.
 */
function peep(id: string): string {
  const commonsUrl = FIGURE_PORTRAIT_COMMONS[id];
  if (!commonsUrl) throw new Error(`Missing portrait Commons entry for figure id: ${id}`);
  const ext = commonsUrl.toLowerCase().split('?')[0].endsWith('.png') ? 'png' : 'jpg';
  return `/story/normandy-figures/people/${id}.${ext}`;
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
    A.crusade,
    'Bohemond & Tancred',
    'First Crusade Jerusalem — evocative of the Italo-Norman crusade generation (local asset; Bohemond portrait pending fetch)',
    'Wikimedia Commons — crusade-era reference image in /public/story (see norman-expansion library)',
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
    A.philipIIAugustusWikimedia,
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
    '/story/normandy-figures/people/frankish-clovis-map.jpg',
    'Clovis I',
    'Baptism of Clovis — later monumental painting tradition (local committed asset)',
    'Wikimedia Commons — File:Baptism of Clovis.jpg (public domain)',
  ),
  'dagobert-i': p(
    A.merovingianBnfBrunehaut,
    'Dagobert I',
    'Merovingian manuscript court world — abbey patronage context (local BnF chronicle miniature)',
    'Wikimedia Commons — BnF Gallica, Fr 2610 f.31r (15th c., public domain)',
  ),
  'charles-martel': pPool(
    POOL_CAROLINGIAN,
    'charles-martel',
    'Charles Martel',
    'Carolingian-era northern Frankish world (evocative; portrait file pending offline fetch)',
  ),
  'pepin-short': pPool(
    POOL_CAROLINGIAN,
    'pepin-short',
    'Pepin the Short',
    'Carolingian-era northern Frankish world (evocative; portrait file pending offline fetch)',
  ),
  'charles-fat': pPool(
    POOL_CAROLINGIAN,
    'charles-fat',
    'Charles the Fat',
    'Carolingian-era northern Frankish world (evocative; portrait file pending offline fetch)',
  ),
  'hastein-bjorn': pPool(
    POOL_VIKING,
    'hastein-bjorn',
    'Hastein & Björn (Ironside)',
    'Viking Age — ships, raids, and chronicles (evocative; dedicated tile pending fetch)',
  ),
  'monastic-chronicler-voices': p(
    peep('monastic-chronicler-voices'),
    'Monastic chronicler voices',
    'Scriptorium reconstruction — Montserrat (evocative of cloister chronicles)',
    'Wikimedia Commons — File:Scriptorium.jpg © Daniel Villafruela, CC BY-SA 3.0',
  ),
  'william-longsword': p(
    A.rolloFalaiseStatue,
    'William Longsword',
    'Ducal monument suite, Falaise — Rollo statue (evocative of early ducal line; Longsword statue pending fetch)',
    'Wikimedia Commons — File:Rollo statue in falaise.JPG © Imars / Michael Shea, CC BY-SA 2.5',
  ),
  'richard-ii': pPool(
    POOL_NORMAN_ORIGINS,
    'richard-ii',
    'Richard II of Normandy',
    'Norman origins — Channel ports & duchy formation (evocative; miniature pending fetch)',
  ),
  'richard-iii-robert-i': pPool(
    POOL_NORMAN_ORIGINS,
    'richard-iii-robert-i',
    'Richard III / Robert I (Magnificent)',
    'Norman origins — Channel ports & duchy formation (evocative; chronicle miniature pending fetch)',
  ),
  'emma-gunnor': pPool(
    POOL_NORMAN_ORIGINS,
    'emma-gunnor',
    'Emma of Normandy',
    'Norman origins — Channel ports & duchy formation (evocative; Emma portrait pending fetch)',
  ),
  dudo: p(
    A.bayeuxOath,
    'Dudo of Saint-Quentin',
    'Bayeux Tapestry — oath scene (Norman origin narrative milieu for Dudo’s story-world)',
    'Wikimedia Commons — File:BayeuxTapestryScene23.jpg (public domain)',
  ),
  'gisela-frankish': p(
    peep('rollo-early-normandy'),
    'Gisela of France',
    'Charles the Simple & Rollo — manuscript pairing (dramatic tradition; Gisela tableau pending fetch)',
    'Wikimedia Commons — File:Rollo+Charles.jpg (public domain)',
  ),
  'maurilius-archbishop-rouen': p(
    peep('rotomagus-bishops-transition'),
    'Maurilius of Rouen',
    'Rouen Cathedral — transept (episcopal Rouen as narrative anchor)',
    'Wikimedia Commons — File:Rouen Cathedral, View up the transept and tower 20140215 1.jpg © DXR, CC BY-SA 3.0',
  ),
  'michael-archbishop-rouen': p(
    peep('romain-rouen-legend'),
    'Michael of Rouen',
    'Notre-Dame de Rouen — façade (ducal church politics context; epitaph image pending fetch)',
    'Wikimedia Commons — File:Rouen Cathedral, front.jpg © Joe Mabel, CC BY-SA 3.0',
  ),
  'roman-magistrates-map': p(
    peep('roman-magistrates-lugdunensis'),
    'Roman magistrates (map voice)',
    'Roman theatre — Fourvière (northern imperial Gaul anchor; Picardie museum image pending fetch)',
    'Wikimedia Commons — File:Théâtre romain de Fourvière.jpg © Jean-Christophe BENOIST, CC BY-SA 3.0',
  ),
  'frankish-clovis-map': p(
    peep('frankish-clovis-map'),
    'Clovis (map voice)',
    'Baptism of Clovis — later monumental painting tradition',
    'Wikimedia Commons — File:Baptism of Clovis.jpg (public domain)',
  ),
  'dagobert-frankish-map': p(
    A.merovingianBnfBrunehaut,
    'Dagobert I (map voice)',
    'Merovingian manuscript world — Jumièges patronage context (abbey photo pending fetch)',
    'Wikimedia Commons — BnF Gallica, Fr 2610 f.31r (15th c., public domain)',
  ),
  'viking-rollo-precursor': p(
    A.vikingLongship,
    'Viking–Rollo precursor voices',
    'Oseberg-type longship milieu — committed Viking Age hull reference (Gokstad tile pending fetch)',
    CREDIT,
  ),
  'rollo-early-normandy': p(
    peep('rollo-early-normandy'),
    'Rollo (early Normandy)',
    'Charles the Simple gives his daughter to Rollo — British Library manuscript tradition',
    'Wikimedia Commons — File:Rollo+Charles.jpg (public domain)',
  ),
  'matilda-flanders': p(
    A.bayeuxCoronation,
    'Matilda of Flanders',
    'Bayeux Tapestry — coronation arc (ducal marriage / consecration milieu; Matilda print pending fetch)',
    'Wikimedia Commons — File:BayeuxTapestryScene38.jpg (public domain)',
  ),
  'odo-bayeux': p(
    peep('odo-bayeux'),
    'Odo of Bayeux',
    'Imaginary portrait — later tradition',
    'Wikimedia Commons — File:Odo of Bayeux.jpg (public domain)',
  ),
  'lanfranc-anselm': p(
    A.bayeuxOath,
    'Lanfranc / Anselm',
    'Bayeux Tapestry — oath scene (reform-era church–duchy milieu; Anselm portrait pending fetch)',
    'Wikimedia Commons — File:BayeuxTapestryScene23.jpg (public domain)',
  ),
  'robert-curthose': p(
    A.bayeuxHastings,
    'Robert Curthose',
    'Bayeux Tapestry — Hastings campaign world (Robert Curthose print pending fetch)',
    'Wikimedia Commons — File:Bayeux Tapestry scene57 Harold death (cropped).jpg (public domain)',
  ),
  'henry-i-england': p(
    peep('henry-i-england'),
    'Henry I of England',
    'Miniature from Matthew Paris tradition (later copy)',
    'Wikimedia Commons — File:Henry I of England.jpg (public domain)',
  ),
  'robert-mortain': p(
    A.bayeuxKnights,
    'Robert, Count of Mortain',
    'Bayeux Tapestry — Norman knights (Mortain scene 44 pending fetch)',
    'Wikimedia Commons — File:BayeuxTapestryScene55.jpg (public domain)',
  ),
  'william-rufus': p(
    peep('william-rufus'),
    'William II (Rufus)',
    'Portrait miniature tradition',
    'Wikimedia Commons — File:William II of England.jpg (public domain)',
  ),
  'belleme-magnates': pPool(
    POOL_DUCHY,
    'belleme-magnates',
    'Bellême magnates',
    'Norman duchy — Bayeux-era cross-Channel moment (evocative; Bellême château photo pending fetch)',
  ),
  'robert-of-gloucester': p(
    A.bayeuxCoronation,
    'Robert of Gloucester',
    'Bayeux Tapestry — coronation arc (Anglo-Norman church politics milieu; Founders’ Book pending fetch)',
    'Wikimedia Commons — File:BayeuxTapestryScene38.jpg (public domain)',
  ),
  'hauteville-tancred': p(
    A.robertGuiscardBlondel,
    'Tancred of Hauteville',
    'Hauteville generation — Robert Guiscard portrait suite (Tancred print pending fetch)',
    'Wikimedia Commons — File:Robert Guiscard (by Merry-Joseph Blondel).jpg (public domain)',
  ),
  'roger-i-ii': p(
    A.cyprus,
    'Roger I / Roger II',
    'Richard I at Limassol — Mediterranean Norman expansion milieu (Sicily mosaic pending fetch)',
    'Wikimedia Commons — Richard Cyprus Limassol reference in /public/story',
  ),
  'william-iron-arm': p(
    A.bayeuxKnights,
    'William Iron Arm',
    'Bayeux Tapestry — mounted knights (Italo-Norman arms milieu; Coutances statue pending fetch)',
    'Wikimedia Commons — File:BayeuxTapestryScene55.jpg (public domain)',
  ),
  'drogo-hauteville': p(
    A.crusade,
    'Drogo of Hauteville',
    'First Crusade Jerusalem — Italo-Norman southern Italy context (Venosa tomb pending fetch)',
    'Wikimedia Commons — crusade-era reference image in /public/story',
  ),
  'humphrey-hauteville': p(
    A.bayeuxKnights,
    'Humphrey of Hauteville',
    'Bayeux Tapestry — knights (Norman military milieu; Coutances statue pending fetch)',
    'Wikimedia Commons — File:BayeuxTapestryScene55.jpg (public domain)',
  ),
  'alexios-i-komnenos': p(
    A.crusade,
    'Alexios I Komnenos',
    'First Crusade world — Byzantine–crusader encounter milieu (Komnenos mosaic pending fetch)',
    'Wikimedia Commons — crusade-era reference image in /public/story',
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
  'edward-iii': pPool(
    POOL_LATE_MEDIEVAL,
    'edward-iii',
    'Edward III',
    'Late medieval France — cross-Channel war milieu (portrait pending fetch)',
  ),
  'edward-black-prince': pPool(
    POOL_LATE_MEDIEVAL,
    'edward-black-prince',
    'Edward the Black Prince',
    'Late medieval France — cross-Channel war milieu (portrait pending fetch)',
  ),
  'bertrand-du-guesclin': pPool(
    POOL_LATE_MEDIEVAL,
    'bertrand-du-guesclin',
    'Bertrand du Guesclin',
    'Late medieval France — cross-Channel war milieu (portrait pending fetch)',
  ),
  'henry-v': pPool(
    POOL_LATE_MEDIEVAL,
    'henry-v',
    'Henry V',
    'Late medieval France — cross-Channel war milieu (portrait pending fetch)',
  ),
  'charles-vii': p(
    A.joanOfArcMiniature,
    'Charles VII',
    'Joan of Arc miniature — Rouen trial generation (Charles VII portrait pending fetch)',
    'Wikimedia Commons — File:Joan of Arc miniature graded.jpg (public domain)',
  ),
  coligny: pPool(
    POOL_LATE_MEDIEVAL,
    'coligny',
    'Gaspard II de Coligny',
    'Late medieval France — Wars of Religion milieu (portrait pending fetch)',
  ),
  villegagnon: pPool(
    POOL_ATLANTIC_FRANCE,
    'villegagnon',
    'Nicolas Durand de Villegagnon',
    'Atlantic France — exploration staging (portrait pending fetch)',
  ),
  'iberville-bienville': pPool(
    POOL_NEW_FRANCE,
    'iberville-bienville',
    'Iberville & Bienville',
    'St. Lawrence & colonial France (evocative; Iberville engraving pending fetch)',
  ),
  'francois-gaston-levis': p(
    A.wolfeQuebec,
    'François-Gaston de Lévis',
    'Plains of Abraham era — Seven Years’ War Canada (Lévis portrait pending fetch)',
    'Wikimedia Commons — File:Benjamin West - The Death of General Wolfe - WGA25558.jpg (public domain)',
  ),
  'pierre-de-rigaud-vaudreuil': pPool(
    POOL_NEW_FRANCE,
    'pierre-de-rigaud-vaudreuil',
    'Pierre de Rigaud de Vaudreuil',
    'St. Lawrence & colonial France (evocative; Vaudreuil portrait pending fetch)',
  ),
  'francois-bigot': p(
    A.wolfeQuebec,
    'François Bigot',
    'Seven Years’ War Canada — fall of New France milieu (Bigot pastiche pending fetch)',
    'Wikimedia Commons — File:Benjamin West - The Death of General Wolfe - WGA25558.jpg (public domain)',
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
