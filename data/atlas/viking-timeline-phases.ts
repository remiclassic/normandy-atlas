import type { I18nString } from '@/core/types';

export interface VikingPhase {
  id: string;
  yearStart: number;
  yearEnd: number;
  label: I18nString;
  narrative: I18nString;
}

export const VIKING_PHASES: VikingPhase[] = [
  {
    id: 'late-carolingian-raids',
    yearStart: 751,
    yearEnd: 841,
    label: {
      en: 'Late Carolingian Frontier',
      fr: 'Frontière carolingienne tardive',
      it: 'Frontiera carolingia tarda',
      de: 'Spätkarolingische Grenze',
      nb: 'Senkarolingisk grense',
      sv: 'Senkarolinska gränsen',
      da: 'Senkarolingisk grænse',
    },
    narrative: {
      en: 'The Carolingian empire\'s fragmentation exposed wealthy river corridors. Early Norse raids struck Lindisfarne (793) and the Channel coast; the Seine valley\'s monastic riches attracted growing attention.',
      fr: 'La fragmentation de l\'empire carolingien exposa de riches corridors fluviaux. Les premiers raids scandinaves frappèrent Lindisfarne (793) et la côte de la Manche ; les richesses monastiques de la vallée de la Seine attirèrent une attention croissante.',
      it: 'La frammentazione dell\'impero carolingio espose ricchi corridoi fluviali. Le prime scorrerie norrene colpirono Lindisfarne (793) e la costa della Manica; le ricchezze monastiche della valle della Senna attirarono crescente attenzione.',
      de: 'Die Zersplitterung des karolingischen Reiches legte reiche Flusskorridore frei. Die ersten skandinavischen Überfälle trafen Lindisfarne (793) und die Kanalküste; Die klösterlichen Reichtümer des Seine-Tals erregten zunehmende Aufmerksamkeit.',
      nb: 'Det karolingiske imperiets fragmentering avslørte velstående elvekorridorer. Tidlige norrøne raid rammet Lindisfarne (793) og kanalkysten; Seinedalens klosterrikdom vakte økende oppmerksomhet.',
      sv: 'Det karolingiska imperiets splittring avslöjade rika flodkorridorer. Tidiga nordiska räder slog Lindisfarne (793) och kanalkusten; Seinedalens klosterrikedomar väckte växande uppmärksamhet.',
      da: 'Det karolingiske imperiums fragmentering afslørede velhavende flodkorridorer. Tidlige nordiske razziaer ramte Lindisfarne (793) og Kanalkysten; Seinedalens klosterrigdomme tiltrak sig stigende opmærksomhed.',
    },
  },
  {
    id: 'seine-raids',
    yearStart: 841,
    yearEnd: 886,
    label: {
      en: 'Seine Raids Intensify',
      fr: 'Intensification des raids sur la Seine',
      it: 'Intensificazione delle scorrerie sulla Senna',
      de: 'Intensivierung der Razzien auf der Seine',
      nb: 'Seine-raidene intensiveres',
      sv: 'Seine Raids intensifieras',
      da: 'Seine-angreb intensiveres',
    },
    narrative: {
      en: 'Rouen fell to Vikings in 841. Over the next four decades, Norse fleets penetrated deep into Francia via the Seine, Loire, and Garonne. Paris was besieged in 885–886. Monasteries burned; the Carolingian response oscillated between tribute and force.',
      fr: 'Rouen tomba aux mains des Vikings en 841. Pendant les quatre décennies suivantes, les flottes scandinaves pénétrèrent profondément en Francie via la Seine, la Loire et la Garonne. Paris fut assiégé en 885–886. Les monastères brûlèrent ; la réponse carolingienne oscilla entre tribut et force.',
      it: 'Rouen cadde in mano ai vichinghi nell\'841. Nei quattro decenni successivi le flotte norrene penetrarono in profondità nella Francia lungo Senna, Loira e Garonna. Parigi fu assediata nell\'885–886. Gli monasteri bruciarono; la risposta carolingia oscillò tra tributo e forza.',
      de: 'Rouen fiel 841 an die Wikinger. In den nächsten vier Jahrzehnten drangen skandinavische Flotten über Seine, Loire und Garonne tief nach Franken vor. Paris wurde 885–886 belagert. Die Klöster brannten; Die karolingische Reaktion schwankte zwischen Tribut und Gewalt.',
      nb: 'Rouen falt for vikingene i 841. I løpet av de neste fire tiårene trengte norrøne flåter dypt inn i Francia via Seinen, Loire og Garonne. Paris ble beleiret i 885–886. Klostre brant; den karolingiske responsen svingte mellom hyllest og kraft.',
      sv: 'Rouen föll till vikingar 841. Under de kommande fyra decennierna trängde nordiska flottor djupt in i Frankrike via Seine, Loire och Garonne. Paris belägrades 885–886. Kloster brändes; det karolingiska svaret pendlade mellan hyllning och kraft.',
      da: 'Rouen faldt til vikingerne i 841. I løbet af de næste fire årtier trængte nordiske flåder dybt ind i Frankrig via Seinen, Loire og Garonne. Paris blev belejret i 885-886. Klostre brændte; det karolingiske svar svingede mellem hyldest og kraft.',
    },
  },
  {
    id: 'negotiation-settlement',
    yearStart: 886,
    yearEnd: 911,
    label: { en: 'Negotiation & Settlement', fr: 'Négociation et implantation', it: 'Negoziazione e insediamento', de: 'Verhandlung und Umsetzung', nb: 'Forhandling og oppgjør', sv: 'Förhandling & uppgörelse', da: 'Forhandling & Forlig' },
    narrative: {
      en: 'After the siege of Paris, Frankish kings increasingly negotiated with Norse war-bands. Viking groups settled semi-permanently along the lower Seine. In 911, Charles the Simple ceded territory to Rollo at Saint-Clair-sur-Epte — the founding act of Normandy.',
      fr: 'Après le siège de Paris, les rois francs négocièrent de plus en plus avec les bandes de guerre scandinaves. Des groupes vikings s\'installèrent semi-durablement le long de la basse Seine. En 911, Charles le Simple céda un territoire à Rollon à Saint-Clair-sur-Epte — l\'acte fondateur de la Normandie.',
      it: 'Dopo l\'assedio di Parigi i re franchi negoziarono sempre più con bande guerriere norrene. Gruppi vichinghi si stabilirono in modo semipermanente lungo la bassa Senna. Nel 911 Carlo il Semplice cedette un territorio a Rollone a Saint-Clair-sur-Epte — l\'atto fondatore della Normandia.',
      de: 'Nach der Belagerung von Paris verhandelten die Frankenkönige zunehmend mit den skandinavischen Kriegsbanden. Wikingergruppen ließen sich halbständig entlang der unteren Seine nieder. Im Jahr 911 überließ Karl der Einfältige in Saint-Clair-sur-Epte Territorium an Rollo – der Gründungsakt der Normandie.',
      nb: 'Etter beleiringen av Paris forhandlet frankiske konger i økende grad med norrøne krigsband. Vikinggrupper slo seg semi-permanent ned langs den nedre Seinen. I 911 avstod Charles den enkle territorium til Rollo ved Saint-Clair-sur-Epte - Normandies grunnleggende handling.',
      sv: 'Efter belägringen av Paris förhandlade frankiska kungar alltmer med nordiska krigsband. Vikingagrupper bosatte sig semipermanent längs Nedre Seine. År 911 avstod Karl den Enkle territorium till Rollo vid Saint-Clair-sur-Epte - Normandies grundande handling.',
      da: 'Efter belejringen af ​​Paris forhandlede frankiske konger i stigende grad med nordiske krigsbander. Vikingegrupper bosatte sig semi-permanent langs den nedre Seine. I 911 afstod Karl den Enfoldige territorium til Rollo ved Saint-Clair-sur-Epte - Normandiets grundlov.',
    },
  },
  {
    id: 'early-normandy',
    yearStart: 911,
    yearEnd: 965,
    label: { en: 'Early Normandy', fr: 'Normandie primitive', it: 'Normandia nascente', de: 'Frühe Normandie', nb: 'Tidlig Normandie', sv: 'Tidiga Normandie', da: 'Tidlig Normandiet' },
    narrative: {
      en: 'Rollo\'s successors consolidated control, absorbing Frankish institutions while maintaining a warrior aristocracy. The territory expanded westward into the Cotentin and Avranchin. Norse settlers mixed with the existing Frankish population.',
      fr: 'Les successeurs de Rollon consolidèrent le contrôle, absorbant les institutions franques tout en maintenant une aristocratie guerrière. Le territoire s\'étendit vers l\'ouest dans le Cotentin et l\'Avranchin. Les colons scandinaves se mêlèrent à la population franque existante.',
      it: 'I successori di Rollone consolidarono il controllo, assorbendo le istituzioni franche pur mantenendo un\'aristocrazia guerriera. Il territorio si estese verso ovest nel Cotentin e nell\'Avranchin. I coloni norreni si mescolarono alla popolazione franca esistente.',
      de: 'Rollos Nachfolger festigten die Kontrolle, übernahmen fränkische Institutionen und behielten gleichzeitig eine Kriegeraristokratie bei. Das Gebiet erstreckte sich nach Westen bis nach Cotentin und Avranchin. Skandinavische Siedler vermischten sich mit der bestehenden fränkischen Bevölkerung.',
      nb: 'Rollos etterfølgere konsoliderte kontrollen, absorberte frankiske institusjoner mens de opprettholdt et krigeraristokrati. Territoriet utvidet seg vestover inn i Cotentin og Avranchin. Norrøne nybyggere blandet seg med den eksisterende frankiske befolkningen.',
      sv: 'Rollos efterträdare konsoliderade kontrollen och absorberade frankiska institutioner samtidigt som de behöll en krigararistokrati. Territoriet expanderade västerut in i Cotentin och Avranchin. Nordiska nybyggare blandade med den befintliga frankiska befolkningen.',
      da: 'Rollos efterfølgere konsoliderede kontrollen og absorberede frankiske institutioner, mens de bevarede et krigeraristokrati. Området udvidede sig vestpå ind i Cotentin og Avranchin. nordiske bosættere blandet med den eksisterende frankiske befolkning.',
    },
  },
  {
    id: 'ducal-consolidation',
    yearStart: 965,
    yearEnd: 1066,
    label: { en: 'Ducal Consolidation', fr: 'Consolidation ducale', it: 'Consolidazione ducale', de: 'Herzogliche Konsolidierung', nb: 'Ducal Consolidation', sv: 'Ducal Consolidation', da: 'Ducal konsolidering' },
    narrative: {
      en: 'Under Richard I and his successors, the duchy stabilised. Normandy developed a distinctive identity — Latin-speaking, Christian, but with a Norse warrior ethos. By 1066, William had forged the most militarily effective polity in northern Europe.',
      fr: 'Sous Richard Ier et ses successeurs, le duché se stabilisa. La Normandie développa une identité distincte — latinophone, chrétienne, mais avec un ethos guerrier scandinave. En 1066, Guillaume avait forgé l\'entité politique la plus efficace militairement du nord de l\'Europe.',
      it: 'Sotto Riccardo I e i suoi successori il ducato si stabilizzò. La Normandia sviluppò un\'identità distinta — di lingua latina, cristiana, ma con un ethos guerriero norreno. Entro il 1066 Guglielmo aveva forgiato l\'entità politica più efficace militarmente nel nord Europa.',
      de: 'Unter Richard I. und seinen Nachfolgern stabilisierte sich das Herzogtum. Die Normandie entwickelte eine ausgeprägte Identität – lateinischsprachig, christlich, aber mit einem skandinavischen Kriegerethos. Bis 1066 hatte Wilhelm die militärisch wirksamste politische Einheit Nordeuropas geschaffen.',
      nb: 'Under Richard I og hans etterfølgere stabiliserte hertugdømmet seg. Normandie utviklet en særegen identitet - latinsktalende, kristen, men med en norrøn kriger-etos. I 1066 hadde William skapt den mest militært effektive politikken i Nord-Europa.',
      sv: 'Under Richard I och hans efterträdare stabiliserades hertigdömet. Normandie utvecklade en särpräglad identitet - latinsktalande, kristen, men med en nordisk krigaretos. År 1066 hade William skapat den mest militärt effektiva polisen i norra Europa.',
      da: 'Under Richard I og hans efterfølgere stabiliserede hertugdømmet sig. Normandiet udviklede en karakteristisk identitet - latintalende, kristen, men med en nordisk kriger-etos. I 1066 havde William skabt den mest militært effektive politik i Nordeuropa.',
    },
  },
];

export function getVikingPhaseForYear(year: number): VikingPhase | undefined {
  return VIKING_PHASES.find((p) => year >= p.yearStart && year < p.yearEnd)
    ?? (year >= 1066 ? VIKING_PHASES[VIKING_PHASES.length - 1] : undefined);
}

// ---------------------------------------------------------------------------
// Year-aware territory visibility rules
// ---------------------------------------------------------------------------

export interface VikingTerritoryTimeRule {
  regionId: string;
  /** Region appears only at or after this year (inclusive). */
  visibleAfter?: number;
  /** Region disappears at or after this year (exclusive). */
  visibleBefore?: number;
  /** Override visibility level when outside the emphasized window. */
  fadedBefore?: number;
  fadedAfter?: number;
}

export const VIKING_TERRITORY_TIME_RULES: VikingTerritoryTimeRule[] = [
  { regionId: 'scandinavian-homeland' },
  { regionId: 'danelaw', visibleAfter: 865, fadedAfter: 955 },
  { regionId: 'norse-gaelic-sphere', visibleAfter: 795 },
  { regionId: 'kievan-rus-zone', visibleAfter: 838, fadedAfter: 1000 },
  { regionId: 'normandy', fadedBefore: 911 },
];

// ---------------------------------------------------------------------------
// Macro expansion phases (three-band overlay for timeline UI)
// ---------------------------------------------------------------------------

export interface VikingMacroPhase {
  id: string;
  yearStart: number;
  yearEnd: number;
  label: I18nString;
}

export const VIKING_MACRO_PHASES: VikingMacroPhase[] = [
  {
    id: 'early-raids',
    yearStart: 790,
    yearEnd: 850,
    label: { en: 'Early Raids', fr: 'Premiers raids', it: 'Primi raid', de: 'Erste Razzien', nb: 'Tidlige raid', sv: 'Tidiga räder', da: 'Tidlige Raids' },
  },
  {
    id: 'expansion-settlement',
    yearStart: 850,
    yearEnd: 950,
    label: { en: 'Expansion', fr: 'Expansion', it: 'Espansione', de: 'Erweiterung', nb: 'Ekspansjon', sv: 'Expansion', da: 'Udvidelse' },
  },
  {
    id: 'consolidation',
    yearStart: 950,
    yearEnd: 1066,
    label: { en: 'Consolidation', fr: 'Consolidation', it: 'Consolidamento', de: 'Konsolidierung', nb: 'Konsolidering', sv: 'Konsolidering', da: 'Konsolidering' },
  },
];
