import type {
  MigrationDataset,
  MigrationCohortId,
  I18nString,
  MigrationFlowEdge,
  MigrationShareRow,
} from '@/core/types';

const MUSEUM_SOURCE = {
  shortCitation: 'Canadian Museum of History — Virtual Museum of New France, Immigration',
  url: 'https://www.historymuseum.ca/virtual-museum-of-new-france/population/immigration/',
};

const PERCHE_SOURCE = {
  shortCitation: 'Perche-Québec — Emigration from Perche',
  url: 'https://www.perche-quebec.com/perche/lieux/emigration-en.htm',
};

/** Context-only row — not a museum percentage category. */
const CHANNEL_ISLANDS_ORIGIN_CALLOUT: MigrationShareRow = {
  entityId: 'channel-islands-context',
  kind: 'callout',
  label: {
    en: 'Channel Islands (Guernsey, Jersey, etc.)',
    fr: 'Îles Anglo-Normandes (Guernesey, Jersey, etc.)',
    it: 'Isole del Canale (Guernsey, Jersey, ecc.)',
    de: 'Kanalinseln (Guernsey, Jersey usw.)',
    nb: 'Kanaløyene (Guernsey, Jersey, etc.)',
    sv: 'Kanalöarna (Guernsey, Jersey, etc.)',
    da: 'Kanaløerne (Guernsey, Jersey osv.)',
  },
  confidence: 'low',
  note: {
    en: 'Historically part of the Norman world, but not a major documented mass embarkation zone for New France. After 1204, when continental Normandy fell to France, the islands remained tied to the English crown and developed separately from the mainland. Islanders who crossed to New France usually appear in records under broader French or Norman labels. Lighter flow lines on the map show illustrative routing via mainland ports (Dieppe, Honfleur, La Rochelle) — not census shares.',
    fr: 'Historiquement dans la sphère normande, mais sans zone d\'embarquement de masse documentée vers la Nouvelle-France. Après 1204, lorsque la Normandie continentale tomba sous la couronne de France, les îles restèrent liées à la couronne anglaise et se développèrent séparément du continent. Les îliens qui traversèrent apparaissent souvent dans les registres sous des étiquettes « françaises » ou « normandes » plus larges. Les flux plus pâles sur la carte illustrent un acheminement plausible par les ports continentaux (Dieppe, Honfleur, La Rochelle) — pas des parts recensées.',
    it: 'Storicamente parte del mondo normanno, ma non una zona documentata di imbarco di massa verso la Nuova Francia. Dopo il 1204, quando la Normandia continentale cadde in mano alla Francia, le isole restarono legate alla corona inglese e si svilupparono separatamente dal continente. Gli isolani compaiono spesso nelle fonti con etichette francesi o normanne più generiche. I flussi più chiari sulla carta illustrano un percorso plausibile via porti continentali (Dieppe, Honfleur, La Rochelle) — non quote censuarie.',
    de: 'Historisch gesehen im Raum der Normandie, aber ohne dokumentierte Masseneinschiffungszone nach Neu-Frankreich. Nach 1204, als das Festland der Normandie unter die französische Krone fiel, blieben die Inseln mit der englischen Krone verbunden und entwickelten sich getrennt vom Festland. Insulaner, die die Insel überquerten, erscheinen in den Aufzeichnungen oft unter den breiteren Bezeichnungen „französisch“ oder „normannisch“. Die blasseren Ströme auf der Karte veranschaulichen eine plausible Route über kontinentale Häfen (Dieppe, Honfleur, La Rochelle) – nicht erfasste Anteile.',
    nb: 'Historisk del av den normanniske verden, men ikke en viktig dokumentert masseombordstigningssone for New France. Etter 1204, da det kontinentale Normandie falt for Frankrike, forble øyene knyttet til den engelske kronen og utviklet seg separat fra fastlandet. Øyboere som krysset til New France vises vanligvis i poster under bredere franske eller normanniske etiketter. Lettere flytlinjer på kartet viser illustrerende ruting via fastlandshavner (Dieppe, Honfleur, La Rochelle) - ikke folketellingsandeler.',
    sv: 'Historiskt sett en del av den normandiska världen, men inte en viktig dokumenterad massombordstigningszon för Nya Frankrike. Efter 1204, när kontinentala Normandie föll till Frankrike, förblev öarna bundna till den engelska kronan och utvecklades separat från fastlandet. Öbor som åkte till Nya Frankrike visas vanligtvis i skivor under bredare franska eller normandiska märken. Lättare flödeslinjer på kartan visar illustrativa rutt via hamnar på fastlandet (Dieppe, Honfleur, La Rochelle) - inte folkräkningsandelar.',
    da: 'Historisk en del af den normanniske verden, men ikke en større dokumenteret masseindskibningszone for New France. Efter 1204, da det kontinentale Normandiet faldt til Frankrig, forblev øerne bundet til den engelske krone og udviklede sig adskilt fra fastlandet. Øboere, der krydsede til New France, optræder normalt i optegnelser under bredere franske eller normanniske mærker. Lettere flowlinjer på kortet viser illustrative ruter via fastlandshavne (Dieppe, Honfleur, La Rochelle) - ikke folketællingsandele.',
  },
};

const MAINLAND_EMBARKATION_PORT_CALLOUT: MigrationShareRow = {
  entityId: 'mainland-embarkation-note',
  kind: 'callout',
  label: {
    en: 'Where ships actually left',
    fr: 'D\'où partaient les navires',
    it: 'Da dove salpavano davvero le navi',
    de: 'Von wo fuhren die Schiffe ab?',
    nb: 'Hvor skipene faktisk dro',
    sv: 'Där fartygen faktiskt lämnade',
    da: 'Hvor skibe faktisk forlod',
  },
  confidence: 'low',
  note: {
    en: 'Documented group traffic used mainland French harbours — especially La Rochelle, Dieppe, Honfleur, and Saint-Malo. Acadia leaned heavily on La Rochelle and Saint-Malo; the St. Lawrence corridor also drew Norman embarkations. Insular ports such as Saint Peter Port were not primary terminals for New France.',
    fr: 'Le trafic groupé documenté passait par des havres français continentaux — surtout La Rochelle, Dieppe, Honfleur et Saint-Malo. L\'Acadie dépendait fortement de La Rochelle et de Saint-Malo ; le Saint-Laurent puisait aussi aux embarquements normands. Des ports insulaires comme Saint-Pierre-Port n\'étaient pas les terminaux principaux de la Nouvelle-France.',
    it: 'Il traffico di gruppi documentato passava dai porti della Francia continentale — in particolare La Rochelle, Dieppe, Honfleur e Saint-Malo. L\'Acadia dipendeva soprattutto da La Rochelle e Saint-Malo; anche il corridoio del San Lorenzo attingeva agli imbarchi normanni. Porti insulari come Saint Peter Port non erano terminali principali per la Nuova Francia.',
    de: 'Der dokumentierte Gruppenverkehr erfolgte über Häfen auf dem französischen Festland – insbesondere La Rochelle, Dieppe, Honfleur und Saint-Malo. Acadia war stark von La Rochelle und Saint-Malo abhängig; Auch die Saint-Laurent nutzte normannische Einschiffungen. Inselhäfen wie Saint-Pierre-Port waren nicht die Hauptterminals Neufrankreichs.',
    nb: 'Dokumentert gruppetrafikk brukte franske havner på fastlandet - spesielt La Rochelle, Dieppe, Honfleur og Saint-Malo. Acadia støttet seg tungt på La Rochelle og Saint-Malo; St. Lawrence-korridoren trakk også normanniske ombordstigninger. Insulære havner som Saint Peter Port var ikke primære terminaler for New France.',
    sv: 'Dokumenterad grupptrafik använde franska hamnar på fastlandet - särskilt La Rochelle, Dieppe, Honfleur och Saint-Malo. Acadia lutade sig tungt på La Rochelle och Saint-Malo; St. Lawrence-korridoren drog också normandiska ombordstigningar. Insulära hamnar som Saint Peter Port var inte primära terminaler för Nya Frankrike.',
    da: 'Dokumenteret gruppetrafik brugte franske fastlandshavne - især La Rochelle, Dieppe, Honfleur og Saint-Malo. Acadia lænede sig tungt til La Rochelle og Saint-Malo; St. Lawrence-korridoren tegnede også normanniske indskibninger. Ø-havne som Saint Peter Port var ikke primære terminaler for New France.',
  },
};

const CHANNEL_ISLANDS_FLOW_ST_LAWRENCE: MigrationFlowEdge[] = [
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'dieppe',
    colonyZoneId: 'colony-zone-quebec',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'honfleur',
    colonyZoneId: 'colony-zone-quebec',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
];

const CHANNEL_ISLANDS_FLOW_ACADIA: MigrationFlowEdge[] = [
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'la-rochelle',
    colonyZoneId: 'acadia',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'dieppe',
    colonyZoneId: 'acadia',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
];

const CHANNEL_ISLANDS_FLOW_FILLES: MigrationFlowEdge[] = [
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'la-rochelle',
    colonyZoneId: 'colony-zone-quebec',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
  {
    originRegionId: 'channel-islands',
    portPlaceId: 'la-rochelle',
    colonyZoneId: 'colony-zone-montreal',
    weight: 1,
    confidence: 'low',
    tier: 'secondary',
  },
];

export const MIGRATION_COHORT_LABELS: Record<MigrationCohortId, I18nString> = {
  all_immigrants: { en: 'All Immigrants', fr: 'Tous les immigrants', it: 'Tutti gli immigrati', de: 'Alles Einwanderer', nb: 'Alle innvandrere', sv: 'Alla invandrare', da: 'Alle immigranter' },
  founding_immigrants: { en: 'Founding Immigrants', fr: 'Immigrants fondateurs', it: 'Immigrati fondatori', de: 'Gründungseinwanderer', nb: 'Grunnleggende innvandrere', sv: 'Grundande invandrare', da: 'Grundlæggende immigranter' },
  engages: { en: 'Engagés (Indentured Workers)', fr: 'Engagés', it: 'Engagés (lavoratori a contratto)', de: 'Engagiert', nb: 'Engagés (Indentured Workers)', sv: 'Engagés (Indentured Workers)', da: 'Engagés (Indentured Workers)' },
  filles_du_roi: { en: 'Filles du Roi', fr: 'Filles du Roi', it: 'Filles du Roi', de: 'Töchter des Königs', nb: 'Filles du Roi', sv: 'Filles du Roi', da: 'Filles du Roi' },
  carignan_salieres: { en: 'Carignan-Salières Regiment', fr: 'Régiment de Carignan-Salières', it: 'Reggimento Carignan-Salières', de: 'Carignan-Salières-Regiment', nb: 'Carignan-Salières regiment', sv: 'Carignan-Salières regemente', da: 'Carignan-Salières Regiment' },
};

export const migrationDatasets: MigrationDataset[] = [
  {
    id: 'stl-all-immigrants',
    eraIds: ['new-france-foundations', 'royal-new-france'],
    branch: 'st_lawrence',
    cohortId: 'all_immigrants',
    yearRange: [1608, 1760],
    metricDefinition: {
      label: {
        en: 'Share of all immigrants to Canada (St. Lawrence)',
        fr: 'Part de tous les immigrants au Canada (Saint-Laurent)',
        it: 'Quota di tutti gli immigrati in Canada (San Lorenzo)',
        de: 'Anteil aller Einwanderer nach Kanada (Saint-Laurent)',
        nb: 'Andel av alle innvandrere til Canada (St. Lawrence)',
        sv: 'Andel av alla invandrare till Kanada (St. Lawrence)',
        da: 'Andel af alle immigranter til Canada (St. Lawrence)',
      },
      description: {
        en: 'Percentage of all recorded immigrants who crossed the Atlantic to the St. Lawrence colony, including temporary workers, soldiers, and those who returned to France. The museum groups origins into broad regions; sub-regional estimates within "Northwest France" carry medium confidence. The Channel Islands are not a separate museum category — see the callout under Origins for how they relate to the Norman world without being mass embarkation harbours.',
        fr: 'Pourcentage de tous les immigrants enregistrés ayant traversé l\'Atlantique vers la colonie du Saint-Laurent, y compris travailleurs temporaires, soldats et ceux retournés en France. Le musée regroupe les origines en grandes régions. Les îles Anglo-Normandes ne forment pas une catégorie distincte — voir l\'encadré sous Origines pour leur lien avec la sphère normande sans être des ports d\'embarquement de masse.',
        it: 'Percentuale di tutti gli immigrati registrati che attraversarono l\'Atlantico verso la colonia del San Lorenzo, inclusi lavoratori temporanei, soldati e coloro che fecero ritorno in Francia. Il museo raggruppa le origini in ampie regioni; le stime subregionali nel «Nord-Ovest della Francia» hanno confidenza media. Le Isole del Canale non sono una categoria museale separata — vedi la nota sotto Origini sul loro legame con il mondo normanno senza essere porti di imbarco di massa.',
        de: 'Prozentsatz aller registrierten Einwanderer, die den Atlantik zur St.-Lorenz-Kolonie überquerten, einschließlich Zeitarbeitern, Soldaten und nach Frankreich zurückgekehrten Personen. Das Museum gruppiert die Ursprünge in große Regionen. Die Kanalinseln bilden keine eigene Kategorie – siehe den Kasten unter „Ursprünge“ für ihre Verbindung mit der normannischen Sphäre, ohne Häfen für Masseneinschiffungen zu sein.',
        nb: 'Andel av alle registrerte innvandrere som krysset Atlanterhavet til St. Lawrence-kolonien, inkludert midlertidige arbeidere, soldater og de som returnerte til Frankrike. Museet grupperer opphav i brede regioner; subregionale estimater innenfor "Nordvest-Frankrike" har middels tillit. Kanaløyene er ikke en egen museumskategori – se forklaringen under Opprinnelse for hvordan de forholder seg til den normanniske verden uten å være masseombordstigningshavner.',
        sv: 'Andel av alla registrerade invandrare som korsade Atlanten till St. Lawrence-kolonin, inklusive tillfälligt anställda, soldater och de som återvände till Frankrike. Museet grupperar ursprung i breda regioner; subregionala uppskattningar inom "Nordvästra Frankrike" har medelstort förtroende. Kanalöarna är inte en separat museikategori – se bildtexten under Ursprung för hur de förhåller sig till den normandiska världen utan att vara massombordstigningshamnar.',
        da: 'Procentdel af alle registrerede immigranter, der krydsede Atlanterhavet til St. Lawrence-kolonien, inklusive vikarer, soldater og dem, der vendte tilbage til Frankrig. Museet grupperer udspring i brede egne; subregionale skøn inden for "Nordvestfrankrig" har middel tillid. Kanaløerne er ikke en separat museumskategori - se forklaringen under Oprindelse for, hvordan de forholder sig til den normanniske verden uden at være masseindskibningshavne.',
      },
    },
    sources: [MUSEUM_SOURCE, PERCHE_SOURCE],
    origins: [
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie', it: 'Normandia', de: 'Normandie', nb: 'Normandie', sv: 'Normandie', da: 'Normandiet' }, percent: 19, confidence: 'medium',
        note: { en: 'Estimated within museum "Northwest France" (39% total). Normandy was the single largest source province.', fr: 'Estimé au sein du « Nord-Ouest » du musée (39% total).', it: 'Stima entro il «Nord-Ovest» del museo (39% totale). La Normandia era la provincia di provenienza più numerosa.', de: 'Geschätzt im „Nordwesten“ des Museums (insgesamt 39 %).', nb: 'Estimert innenfor museum "Nordvest-Frankrike" (39 % totalt). Normandie var den største kildeprovinsen.', sv: 'Beräknad inom museet "Nordvästra Frankrike" (39% totalt). Normandie var den enskilt största källprovinsen.', da: 'Estimeret inden for museum "Nordvestfrankrig" (39% i alt). Normandiet var den største enkelt kildeprovins.' } },
      { entityId: 'brittany', label: { en: 'Brittany', fr: 'Bretagne', it: 'Bretagna', de: 'Bretagne', nb: 'Bretagne', sv: 'Bretagne', da: 'Bretagne' }, percent: 16, confidence: 'medium',
        note: { en: 'Estimated within "Northwest France". Many Breton arrivals were temporary (fishermen, engagés).', fr: 'Estimé au sein du « Nord-Ouest ». Beaucoup de Bretons étaient temporaires.', it: 'Stima entro il «Nord-Ovest». Molti bretoni erano arrivi temporanei (pescatori, engagés).', de: 'Geschätzt im „Nordwesten“. Viele Bretonen waren vorübergehend.', nb: 'Estimert innenfor "Nordvest-Frankrike". Mange bretonske ankomster var midlertidige (fiskere, engasjer).', sv: 'Beräknad inom "Nordvästra Frankrike". Många bretonska ankomster var tillfälliga (fiskare, förlovade).', da: 'Anslået inden for "Nordvestfrankrig". Mange bretonske ankomster var midlertidige (fiskere, forlovere).' } },
      { entityId: 'perche', label: { en: 'Perche', fr: 'Perche', it: 'Perche', de: 'Barsch', nb: 'Perche', sv: 'Perche', da: 'Perche' }, percent: 4, confidence: 'medium',
        note: { en: '~4–5% per Perche-Québec studies. Small region with outsized founder impact.', fr: '~4–5% selon les études Perche-Québec. Petite région à l\'impact fondateur démesuré.', it: 'Circa 4–5% secondo gli studi Perche-Québec. Regione piccola con impatto fondatore sproporzionato.', de: '~4–5 % laut Perche-Québec-Studien. Kleine Region mit unverhältnismäßiger Gründungswirkung.', nb: '~4–5 % per Perche-Québec-studier. Liten region med stor grunnleggerpåvirkning.', sv: '~4–5 % per Perche-Québec-studier. Liten region med stor grundarpåverkan.', da: '~4-5% pr. Perche-Québec undersøgelser. Lille region med stor grundlæggerpåvirkning.' } },
      { entityId: 'aunis', label: { en: 'Centre-West (Aunis, Saintonge, Poitou)', fr: 'Centre-Ouest (Aunis, Saintonge, Poitou)', it: 'Centro-Ovest (Aunis, Saintonge, Poitou)', de: 'Mitte-West (Aunis, Saintonge, Poitou)', nb: 'Centre-West (Aunis, Saintonge, Poitou)', sv: 'Centre-West (Aunis, Saintonge, Poitou)', da: 'Centre-West (Aunis, Saintonge, Poitou)' }, percent: 19, confidence: 'high',
        note: { en: 'Museum "Centre-West" category. La Rochelle was the primary embarkation port.', fr: 'Catégorie « Centre-Ouest » du musée.', it: 'Categoria «Centro-Ovest» del museo. La Rochelle era il principale porto d\'imbarco.', de: 'Kategorie „Zentral-West“ des Museums.', nb: 'Museum "Centre-West" kategori. La Rochelle var den primære ombordstigningshavnen.', sv: 'Museum "Centre-West" kategori. La Rochelle var den primära ombordstigningshamnen.', da: 'Museum "Centre-Vest" kategori. La Rochelle var den primære indskibningshavn.' } },
      { entityId: 'ile-de-france', label: { en: 'Paris Region (Île-de-France)', fr: 'Région parisienne (Île-de-France)', it: 'Regione parigina (Île-de-France)', de: 'Region Paris (Île-de-France)', nb: 'Paris-regionen (Île-de-France)', sv: 'Parisregionen (Île-de-France)', da: 'Paris-regionen (Île-de-France)' }, percent: 14, confidence: 'high' },
      { entityId: 'southwest-france', label: { en: 'Southwest France', fr: 'Sud-Ouest de la France', it: 'Sud-Ovest della Francia', de: 'Südwestlich von Frankreich', nb: 'Sørvest-Frankrike', sv: 'Sydvästra Frankrike', da: 'Sydvestfrankrig' }, percent: 11, confidence: 'high' },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions', it: 'Altre regioni', de: 'Andere Regionen', nb: 'Andre regioner', sv: 'Andra regioner', da: 'Andre regioner' }, percent: 17, confidence: 'high' },
      CHANNEL_ISLANDS_ORIGIN_CALLOUT,
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle / Rochefort', fr: 'La Rochelle / Rochefort', it: 'La Rochelle / Rochefort', de: 'La Rochelle / Rochefort', nb: 'La Rochelle / Rochefort', sv: 'La Rochelle / Rochefort', da: 'La Rochelle / Rochefort' }, percent: 52, confidence: 'medium',
        note: { en: 'Primary embarkation hub throughout the French regime.', fr: 'Principal port d\'embarquement sous le Régime français.', it: 'Principale snodo d\'imbarco durante il regime francese.', de: 'Haupteinschiffungshafen unter dem französischen Regime.', nb: 'Primært ombordstigningsknutepunkt i hele det franske regimet.', sv: 'Primärt nav för ombordstigning i hela den franska regimen.', da: 'Primært omskibningscentrum i hele det franske regime.' } },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe', it: 'Dieppe', de: 'Dieppe', nb: 'Dieppe', sv: 'Dieppe', da: 'Dieppe' }, percent: 16, confidence: 'medium' },
      { entityId: 'saint-malo', label: { en: 'Saint-Malo', fr: 'Saint-Malo', it: 'Saint-Malo', de: 'Saint-Malo', nb: 'Saint-Malo', sv: 'Saint-Malo', da: 'Saint-Malo' }, percent: 12, confidence: 'medium' },
      { entityId: 'rouen', label: { en: 'Rouen', fr: 'Rouen', it: 'Rouen', de: 'Rouen', nb: 'Rouen', sv: 'Rouen', da: 'Rouen' }, percent: 8, confidence: 'low',
        note: { en: 'Often a staging point — many departures recorded at Rouen actually shipped from downstream ports.', fr: 'Souvent un point de transit.', it: 'Spesso punto di transito: molte partenze registrate a Rouen salpavano in realtà da porti a valle.', de: 'Oft ein Transitpunkt.', nb: 'Ofte et mellomstasjon - mange avganger registrert ved Rouen ble faktisk sendt fra nedstrømshavner.', sv: 'Ofta en mellanstation - många avgångar registrerade i Rouen skickades faktiskt från nedströms hamnar.', da: 'Ofte et mellemstation - mange afgange registreret i Rouen blev faktisk afsendt fra nedstrømshavne.' } },
      { entityId: 'honfleur', label: { en: 'Honfleur', fr: 'Honfleur', it: 'Honfleur', de: 'Honfleur', nb: 'Honfleur', sv: 'Honfleur', da: 'Honfleur' }, percent: 6, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports', it: 'Altri porti', de: 'Andere Häfen', nb: 'Andre havner', sv: 'Andra hamnar', da: 'Andre havne' }, percent: 6, confidence: 'low' },
      MAINLAND_EMBARKATION_PORT_CALLOUT,
    ],
    colonies: [
      { entityId: 'colony-zone-quebec', label: { en: 'Québec Region', fr: 'Région de Québec', it: 'Regione di Québec', de: 'Region Quebec', nb: 'Québec-regionen', sv: 'Québec-regionen', da: 'Québec-regionen' }, percent: 45, confidence: 'medium',
        note: { en: 'Includes Côte-de-Beaupré, Île d\'Orléans, Beauport seigneuries.', fr: 'Inclut Côte-de-Beaupré, Île d\'Orléans, seigneuries de Beauport.', it: 'Include Côte-de-Beaupré, Île d\'Orléans, signorie di Beauport.', de: 'Beinhaltet Côte-de-Beaupré, Île d\'Orléans und die Herrschaftsgebiete von Beauport.', nb: 'Inkluderer Côte-de-Beaupré, Île d\'Orléans, Beauport seigneuries.', sv: 'Inkluderar Côte-de-Beaupré, Île d\'Orléans, Beauport seigneuries.', da: 'Omfatter Côte-de-Beaupré, Île d\'Orléans, Beauport seigneuries.' } },
      { entityId: 'colony-zone-montreal', label: { en: 'Montréal Region', fr: 'Région de Montréal', it: 'Regione di Montréal', de: 'Region Montreal', nb: 'Montréal-regionen', sv: 'Montréal-regionen', da: 'Montréal-regionen' }, percent: 33, confidence: 'medium' },
      { entityId: 'colony-zone-trois-rivieres', label: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières', it: 'Regione di Trois-Rivières', de: 'Region Trois-Rivières', nb: 'Trois-Rivières-regionen', sv: 'Trois-Rivières-regionen', da: 'Trois-Rivières-regionen' }, percent: 14, confidence: 'medium' },
      { entityId: 'other-st-lawrence', label: { en: 'Other St. Lawrence', fr: 'Autres Saint-Laurent', it: 'Altri (San Lorenzo)', de: 'Andere Saint-Laurent', nb: 'Andre St. Lawrence', sv: 'Andra St. Lawrence', da: 'Andet St. Lawrence' }, percent: 8, confidence: 'low' },
    ],
    flowEdges: [
      { originRegionId: 'normandy', portPlaceId: 'dieppe', colonyZoneId: 'colony-zone-quebec', weight: 3, confidence: 'medium' },
      { originRegionId: 'normandy', portPlaceId: 'honfleur', colonyZoneId: 'colony-zone-quebec', weight: 2, confidence: 'low' },
      { originRegionId: 'perche', portPlaceId: 'dieppe', colonyZoneId: 'colony-zone-quebec', weight: 3, confidence: 'medium' },
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-quebec', weight: 4, confidence: 'medium' },
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-montreal', weight: 3, confidence: 'medium' },
      { originRegionId: 'brittany', portPlaceId: 'saint-malo', colonyZoneId: 'colony-zone-quebec', weight: 2, confidence: 'medium' },
      { originRegionId: 'ile-de-france', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-quebec', weight: 2, confidence: 'low' },
      { originRegionId: 'ile-de-france', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-montreal', weight: 2, confidence: 'low' },
      ...CHANNEL_ISLANDS_FLOW_ST_LAWRENCE,
    ],
  },

  {
    id: 'stl-founding-immigrants',
    eraIds: ['new-france-foundations', 'royal-new-france'],
    branch: 'st_lawrence',
    cohortId: 'founding_immigrants',
    yearRange: [1608, 1760],
    metricDefinition: {
      label: { en: 'Share of founding immigrants to Canada', fr: 'Part des immigrants fondateurs du Canada', it: 'Quota degli immigrati fondatori in Canada', de: 'Anteil der Gründungseinwanderer nach Kanada', nb: 'Andel av grunnleggende immigranter til Canada', sv: 'Andel av grundande immigranter till Kanada', da: 'Andel af stiftende immigranter til Canada' },
      description: {
        en: 'Immigrants who settled permanently and founded lasting families. This population forms the ancestral base of most French-Canadians. "Northwest France" drops from 39% of all immigrants to 28% of founders because many northwestern migrants (especially Bretons) were temporary. Channel Islanders, when present, are folded into broader regional categories in the sources — see the Origins callout.',
        fr: 'Immigrants installés de façon permanente ayant fondé des familles durables. Le « Nord-Ouest » passe de 39% de tous les immigrants à 28% des fondateurs. Les îliens, lorsqu\'ils figurent, sont regroupés dans des catégories régionales plus larges dans les sources — voir l\'encadré sous Origines.',
        it: 'Immigrati che si stabilirono in modo permanente e fondarono famiglie durature. Questa popolazione forma la base ancestrale della maggior parte dei canadesi francofoni. Il «Nord-Ouest» scende dal 39% di tutti gli immigrati al 28% dei fondatori perché molti provenienti dal nord-ovest (soprattutto bretoni) erano temporanei. Gli isolani, quando compaiono, sono ricompresi in categorie regionali più ampie nelle fonti — vedi la nota sotto Origini.',
        de: 'Dauerhaft ansässige Einwanderer, die dauerhafte Familien gegründet haben. Der „Nordwesten“ reicht von 39 % aller Einwanderer auf 28 % der Gründer. Wenn Inselbewohner auftauchen, werden sie in den Quellen in breitere regionale Kategorien eingeteilt – siehe Kasten unter „Ursprünge“.',
        nb: 'Innvandrere som bosatte seg permanent og stiftet varige familier. Denne populasjonen danner stambasen til de fleste fransk-kanadiere. "Nordvest-Frankrike" faller fra 39% av alle innvandrere til 28% av grunnleggerne fordi mange nordvestlige migranter (spesielt bretonere) var midlertidige. Kanaløyboere, når de er tilstede, er foldet inn i bredere regionale kategorier i kildene - se Opprinnelsesbildet.',
        sv: 'Invandrare som bosatte sig permanent och grundade varaktiga familjer. Denna befolkning utgör förfädersbasen för de flesta fransk-kanadensare. "Nordvästra Frankrike" sjunker från 39% av alla invandrare till 28% av grundarna eftersom många nordvästra migranter (särskilt bretoner) var tillfälliga. Kanalöborna, när de är närvarande, viks in i bredare regionala kategorier i källorna - se Ursprungstexten.',
        da: 'Immigranter, der bosatte sig permanent og grundlagde varige familier. Denne befolkning danner stambasen for de fleste fransk-canadiere. "Nordvestfrankrig" falder fra 39 % af alle immigranter til 28 % af grundlæggerne, fordi mange nordvestlige migranter (især bretonere) var midlertidige. Kanaløboere, når de er til stede, er foldet ind i bredere regionale kategorier i kilderne - se Oprindelses-forklaringen.',
      },
    },
    sources: [MUSEUM_SOURCE, PERCHE_SOURCE],
    origins: [
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie', it: 'Normandia', de: 'Normandie', nb: 'Normandie', sv: 'Normandie', da: 'Normandiet' }, percent: 14, confidence: 'medium' },
      { entityId: 'brittany', label: { en: 'Brittany', fr: 'Bretagne', it: 'Bretagna', de: 'Bretagne', nb: 'Bretagne', sv: 'Bretagne', da: 'Bretagne' }, percent: 9, confidence: 'medium',
        note: { en: 'Drops sharply from 16% — many Bretons did not settle permanently.', fr: 'Forte baisse depuis 16% — beaucoup de Bretons ne sont pas restés.', it: 'Forte calo rispetto al 16%: molti bretoni non si stabilirono in modo permanente.', de: 'Starker Rückgang von 16 % – viele Bretonen blieben nicht.', nb: 'Faller kraftig fra 16 % — mange bretonere bosatte seg ikke permanent.', sv: 'Sjunker kraftigt från 16 % — många bretoner bosatte sig inte permanent.', da: 'Falder kraftigt fra 16 % — mange bretonere bosatte sig ikke permanent.' } },
      { entityId: 'perche', label: { en: 'Perche', fr: 'Perche', it: 'Perche', de: 'Barsch', nb: 'Perche', sv: 'Perche', da: 'Perche' }, percent: 5, confidence: 'medium',
        note: { en: 'Rises as a share of founders — Percherons overwhelmingly stayed and formed families.', fr: 'Augmente parmi les fondateurs — les Percherons sont restés.', it: 'Cresce tra i fondatori: i percheroni rimasero quasi tutti e fondarono famiglie.', de: 'Zuwächse unter den Gründern – die Percherons blieben.', nb: 'Stiger som andel av grunnleggerne - Percherons ble overveldende og dannet familier.', sv: 'Stiger som andel av grundarna - Percherons stannade överväldigande och bildade familjer.', da: 'Stiger som andel af grundlæggerne - Percherons blev overvældende og dannede familier.' } },
      { entityId: 'aunis', label: { en: 'Centre-West (Aunis, Saintonge, Poitou)', fr: 'Centre-Ouest', it: 'Centro-Ovest (Aunis, Saintonge, Poitou)', de: 'Zentraler Westen', nb: 'Centre-West (Aunis, Saintonge, Poitou)', sv: 'Centre-West (Aunis, Saintonge, Poitou)', da: 'Centre-West (Aunis, Saintonge, Poitou)' }, percent: 20, confidence: 'high' },
      { entityId: 'ile-de-france', label: { en: 'Paris Region (Île-de-France)', fr: 'Région parisienne', it: 'Regione parigina (Île-de-France)', de: 'Region Paris', nb: 'Paris-regionen (Île-de-France)', sv: 'Parisregionen (Île-de-France)', da: 'Paris-regionen (Île-de-France)' }, percent: 16, confidence: 'high' },
      { entityId: 'southwest-france', label: { en: 'Southwest France', fr: 'Sud-Ouest', it: 'Sud-Ovest', de: 'Südwesten', nb: 'Sørvest-Frankrike', sv: 'Sydvästra Frankrike', da: 'Sydvestfrankrig' }, percent: 3, confidence: 'high',
        note: { en: 'Drops from 11% — most southwestern migrants were temporary.', fr: 'Baisse depuis 11% — la plupart des migrants du Sud-Ouest étaient temporaires.', it: 'Calo rispetto all\'11%: la maggior parte dei migranti del sud-ovest era temporanea.', de: 'Rückgang von 11 % – die meisten Migranten aus dem Südwesten waren vorübergehend.', nb: 'Fall fra 11 % - de fleste sørvestlige migranter var midlertidige.', sv: 'Nedgångar från 11 % — de flesta sydvästra migranterna var tillfälliga.', da: 'Fald fra 11% - de fleste sydvestlige migranter var midlertidige.' } },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions', it: 'Altre regioni', de: 'Andere Regionen', nb: 'Andre regioner', sv: 'Andra regioner', da: 'Andre regioner' }, percent: 33, confidence: 'high' },
      CHANNEL_ISLANDS_ORIGIN_CALLOUT,
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle / Rochefort', fr: 'La Rochelle / Rochefort', it: 'La Rochelle / Rochefort', de: 'La Rochelle / Rochefort', nb: 'La Rochelle / Rochefort', sv: 'La Rochelle / Rochefort', da: 'La Rochelle / Rochefort' }, percent: 55, confidence: 'medium' },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe', it: 'Dieppe', de: 'Dieppe', nb: 'Dieppe', sv: 'Dieppe', da: 'Dieppe' }, percent: 15, confidence: 'medium' },
      { entityId: 'saint-malo', label: { en: 'Saint-Malo', fr: 'Saint-Malo', it: 'Saint-Malo', de: 'Saint-Malo', nb: 'Saint-Malo', sv: 'Saint-Malo', da: 'Saint-Malo' }, percent: 10, confidence: 'low' },
      { entityId: 'rouen', label: { en: 'Rouen', fr: 'Rouen', it: 'Rouen', de: 'Rouen', nb: 'Rouen', sv: 'Rouen', da: 'Rouen' }, percent: 8, confidence: 'low' },
      { entityId: 'honfleur', label: { en: 'Honfleur', fr: 'Honfleur', it: 'Honfleur', de: 'Honfleur', nb: 'Honfleur', sv: 'Honfleur', da: 'Honfleur' }, percent: 6, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports', it: 'Altri porti', de: 'Andere Häfen', nb: 'Andre havner', sv: 'Andra hamnar', da: 'Andre havne' }, percent: 6, confidence: 'low' },
      MAINLAND_EMBARKATION_PORT_CALLOUT,
    ],
    colonies: [
      { entityId: 'colony-zone-quebec', label: { en: 'Québec Region', fr: 'Région de Québec', it: 'Regione di Québec', de: 'Region Quebec', nb: 'Québec-regionen', sv: 'Québec-regionen', da: 'Québec-regionen' }, percent: 48, confidence: 'medium' },
      { entityId: 'colony-zone-montreal', label: { en: 'Montréal Region', fr: 'Région de Montréal', it: 'Regione di Montréal', de: 'Region Montreal', nb: 'Montréal-regionen', sv: 'Montréal-regionen', da: 'Montréal-regionen' }, percent: 30, confidence: 'medium' },
      { entityId: 'colony-zone-trois-rivieres', label: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières', it: 'Regione di Trois-Rivières', de: 'Region Trois-Rivières', nb: 'Trois-Rivières-regionen', sv: 'Trois-Rivières-regionen', da: 'Trois-Rivières-regionen' }, percent: 15, confidence: 'medium' },
      { entityId: 'other-st-lawrence', label: { en: 'Other St. Lawrence', fr: 'Autres Saint-Laurent', it: 'Altri (San Lorenzo)', de: 'Andere Saint-Laurent', nb: 'Andre St. Lawrence', sv: 'Andra St. Lawrence', da: 'Andet St. Lawrence' }, percent: 7, confidence: 'low' },
    ],
    flowEdges: [
      { originRegionId: 'perche', portPlaceId: 'dieppe', colonyZoneId: 'colony-zone-quebec', weight: 3, confidence: 'medium' },
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-quebec', weight: 4, confidence: 'medium' },
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-montreal', weight: 3, confidence: 'medium' },
      { originRegionId: 'normandy', portPlaceId: 'dieppe', colonyZoneId: 'colony-zone-quebec', weight: 2, confidence: 'medium' },
      { originRegionId: 'ile-de-france', portPlaceId: 'la-rochelle', colonyZoneId: 'colony-zone-montreal', weight: 2, confidence: 'low' },
      ...CHANNEL_ISLANDS_FLOW_ST_LAWRENCE,
    ],
  },

  {
    id: 'stl-filles-du-roi',
    eraIds: ['royal-new-france'],
    branch: 'st_lawrence',
    cohortId: 'filles_du_roi',
    yearRange: [1663, 1673],
    metricDefinition: {
      label: { en: 'Share among Filles du Roi', fr: 'Part parmi les Filles du Roi', it: 'Quota tra le Filles du Roi', de: 'Anteile unter den Töchtern des Königs', nb: 'Del blant Filles du Roi', sv: 'Dela bland Filles du Roi', da: 'Del blandt Filles du Roi' },
      description: {
        en: 'Approximately 770 young women sent to New France under royal sponsorship (1663–1673) to marry and settle. Many were recruited from Parisian hospitals and poorhouses, giving Île-de-France a disproportionately large share compared to other cohorts. Most sailed from La Rochelle; lighter map arcs show illustrative Channel Island routing only.',
        fr: 'Environ 770 jeunes femmes envoyées en Nouvelle-France sous parrainage royal (1663–1673). Beaucoup recrutées dans les institutions parisiennes. La plupart embarquèrent à La Rochelle ; les arcs plus pâles sur la carte illustrent seulement un acheminement depuis les îles.',
        it: 'Circa 770 giovani donne inviate in Nuova Francia con patrocinio reale (1663–1673) per sposarsi e stabilirsi. Molte furono reclutate negli ospedali e nei ricoveri parigini, conferendo all\'Île-de-France una quota molto alta rispetto ad altre coorti. La maggior parte salpò da La Rochelle; gli archi più chiari sulla mappa illustrano solo un percorso esemplificativo dalle isole del Canale.',
        de: 'Rund 770 junge Frauen wurden unter königlicher Schirmherrschaft nach Neu-Frankreich geschickt (1663–1673). Viele wurden in Pariser Institutionen rekrutiert. Die meisten wurden in La Rochelle eingeschifft; Die helleren Bögen auf der Karte veranschaulichen nur die Routenführung von den Inseln aus.',
        nb: 'Omtrent 770 unge kvinner sendt til New France under kongelig sponsing (1663–1673) for å gifte seg og bosette seg. Mange ble rekruttert fra parisiske sykehus og fattighus, noe som ga Île-de-France en uforholdsmessig stor andel sammenlignet med andre årskull. De fleste seilte fra La Rochelle; lettere kartbuer viser kun illustrative ruter på Channel Island.',
        sv: 'Ungefär 770 unga kvinnor skickade till Nya Frankrike under kunglig sponsring (1663–1673) för att gifta sig och bosätta sig. Många rekryterades från parisiska sjukhus och fattighus, vilket gav Île-de-France en oproportionerligt stor andel jämfört med andra årskullar. De flesta seglade från La Rochelle; ljusare kartbågar visar endast illustrativa rutt för Channel Island.',
        da: 'Cirka 770 unge kvinder sendt til Ny Frankrig under kongelig sponsorering (1663-1673) for at gifte sig og bosætte sig. Mange blev rekrutteret fra parisiske hospitaler og fattighuse, hvilket gav Île-de-France en uforholdsmæssig stor andel sammenlignet med andre årgange. De fleste sejlede fra La Rochelle; lysere kortbuer viser kun illustrative kanalø-ruter.',
      },
    },
    sources: [MUSEUM_SOURCE],
    origins: [
      { entityId: 'ile-de-france', label: { en: 'Paris Region (Île-de-France)', fr: 'Région parisienne', it: 'Regione parigina (Île-de-France)', de: 'Region Paris', nb: 'Paris-regionen (Île-de-France)', sv: 'Parisregionen (Île-de-France)', da: 'Paris-regionen (Île-de-France)' }, percent: 36, confidence: 'medium',
        note: { en: 'Many recruited from Parisian institutions (Salpêtrière, etc.).', fr: 'Beaucoup recrutées dans les institutions parisiennes.', it: 'Molte reclutate nelle istituzioni parigine (Salpêtrière, ecc.).', de: 'Viele wurden in Pariser Institutionen rekrutiert.', nb: 'Mange rekruttert fra parisiske institusjoner (Salpêtrière, etc.).', sv: 'Många rekryterade från parisiska institutioner (Salpêtrière, etc.).', da: 'Mange rekrutteret fra parisiske institutioner (Salpêtrière osv.).' } },
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie', it: 'Normandia', de: 'Normandie', nb: 'Normandie', sv: 'Normandie', da: 'Normandiet' }, percent: 14, confidence: 'medium' },
      { entityId: 'aunis', label: { en: 'Centre-West', fr: 'Centre-Ouest', it: 'Centro-Ovest', de: 'Zentraler Westen', nb: 'Sentrum-Vest', sv: 'Centrum-Väst', da: 'Centrum-Vest' }, percent: 12, confidence: 'medium' },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions', it: 'Altre regioni', de: 'Andere Regionen', nb: 'Andre regioner', sv: 'Andra regioner', da: 'Andre regioner' }, percent: 38, confidence: 'medium' },
      CHANNEL_ISLANDS_ORIGIN_CALLOUT,
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle', fr: 'La Rochelle', it: 'La Rochelle', de: 'La Rochelle', nb: 'La Rochelle', sv: 'La Rochelle', da: 'La Rochelle' }, percent: 65, confidence: 'medium' },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe', it: 'Dieppe', de: 'Dieppe', nb: 'Dieppe', sv: 'Dieppe', da: 'Dieppe' }, percent: 20, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports', it: 'Altri porti', de: 'Andere Häfen', nb: 'Andre havner', sv: 'Andra hamnar', da: 'Andre havne' }, percent: 15, confidence: 'low' },
      MAINLAND_EMBARKATION_PORT_CALLOUT,
    ],
    colonies: [
      { entityId: 'colony-zone-quebec', label: { en: 'Québec Region', fr: 'Région de Québec', it: 'Regione di Québec', de: 'Region Quebec', nb: 'Québec-regionen', sv: 'Québec-regionen', da: 'Québec-regionen' }, percent: 50, confidence: 'medium' },
      { entityId: 'colony-zone-montreal', label: { en: 'Montréal Region', fr: 'Région de Montréal', it: 'Regione di Montréal', de: 'Region Montreal', nb: 'Montréal-regionen', sv: 'Montréal-regionen', da: 'Montréal-regionen' }, percent: 30, confidence: 'medium' },
      { entityId: 'colony-zone-trois-rivieres', label: { en: 'Trois-Rivières Region', fr: 'Région de Trois-Rivières', it: 'Regione di Trois-Rivières', de: 'Region Trois-Rivières', nb: 'Trois-Rivières-regionen', sv: 'Trois-Rivières-regionen', da: 'Trois-Rivières-regionen' }, percent: 15, confidence: 'medium' },
      { entityId: 'other-st-lawrence', label: { en: 'Other', fr: 'Autres', it: 'Altri', de: 'Andere', nb: 'Annen', sv: 'Andra', da: 'Andre' }, percent: 5, confidence: 'low' },
    ],
    flowEdges: [...CHANNEL_ISLANDS_FLOW_FILLES],
  },

  {
    id: 'acadia-all-immigrants',
    eraIds: ['new-france-foundations', 'royal-new-france'],
    branch: 'acadia',
    cohortId: 'all_immigrants',
    yearRange: [1604, 1713],
    metricDefinition: {
      label: { en: 'Share of immigrants to Acadia', fr: 'Part des immigrants en Acadie', it: 'Quota di immigrati in Acadia', de: 'Anteil der Einwanderer in Acadia', nb: 'Andel innvandrere til Acadia', sv: 'Andel invandrare till Acadia', da: 'Andel af immigranter til Acadia' },
      description: {
        en: 'Acadian recruitment drew more heavily from western and southwestern France than the St. Lawrence colony. Perhaps 500 founding families formed the core Acadian population, creating a distinct cultural community. Embarkation still ran through mainland ports (especially La Rochelle); see the Ports callout and Channel Islands note under Origins.',
        fr: 'Le recrutement acadien puisait davantage dans l\'ouest et le sud-ouest de la France. Environ 500 familles fondatrices formèrent la population acadienne. Les embarquements passaient tout de même par les ports continentaux (surtout La Rochelle) ; voir l\'encadré Ports et la note sur les îles sous Origines.',
        it: 'Il reclutamento acadiano attingeva più abbondantemente all\'ovest e al sud-ovest della Francia rispetto alla colonia del San Lorenzo. Circa 500 famiglie fondatrici formarono il nucleo della popolazione acadiana, creando una comunità culturale distinta. Gli imbarchi passavano comunque dai porti continentali (in particolare La Rochelle); vedi la nota sui porti e quella sulle isole del Canale sotto Origini.',
        de: 'Die Rekrutierung akadischer Truppen erfolgte mehrheitlich aus dem Westen und Südwesten Frankreichs. Ungefähr 500 Gründerfamilien bildeten die akadische Bevölkerung. Die Einschiffungen erfolgten immer noch über kontinentale Häfen (insbesondere La Rochelle); siehe das Feld „Häfen“ und den Hinweis zu Inseln unter „Ursprünge“.',
        nb: 'Acadian rekruttering trakk tyngre fra det vestlige og sørvestlige Frankrike enn St. Lawrence-kolonien. Kanskje 500 grunnleggende familier dannet den akadiske kjernebefolkningen, og skapte et distinkt kulturelt fellesskap. Ombordstigning gikk fortsatt gjennom havner på fastlandet (spesielt La Rochelle); se Ports-meldingen og Channel Islands-notatet under Origins.',
        sv: 'Acadian rekrytering drog tyngre från västra och sydvästra Frankrike än St. Lawrence-kolonin. Kanske utgjorde 500 grundande familjer den akadianska kärnbefolkningen och skapade en distinkt kulturell gemenskap. Ombordstigning gick fortfarande genom hamnar på fastlandet (särskilt La Rochelle); se portarnas bildtext och anteckningen om Kanalöarna under Ursprung.',
        da: 'Acadian rekruttering trak mere tungt fra det vestlige og sydvestlige Frankrig end St. Lawrence-kolonien. Måske dannede 500 stiftende familier den akadiske kernebefolkning, hvilket skabte et særskilt kulturelt fællesskab. Indskibningen løb stadig gennem fastlandets havne (især La Rochelle); se havneforklaringen og kanaløernes note under Oprindelse.',
      },
    },
    sources: [MUSEUM_SOURCE],
    origins: [
      { entityId: 'aunis', label: { en: 'Centre-West (Aunis, Saintonge, Poitou)', fr: 'Centre-Ouest', it: 'Centro-Ovest (Aunis, Saintonge, Poitou)', de: 'Zentraler Westen', nb: 'Centre-West (Aunis, Saintonge, Poitou)', sv: 'Centre-West (Aunis, Saintonge, Poitou)', da: 'Centre-West (Aunis, Saintonge, Poitou)' }, percent: 28, confidence: 'medium' },
      { entityId: 'southwest-france', label: { en: 'Southwest France', fr: 'Sud-Ouest', it: 'Sud-Ovest', de: 'Südwesten', nb: 'Sørvest-Frankrike', sv: 'Sydvästra Frankrike', da: 'Sydvestfrankrig' }, percent: 18, confidence: 'medium',
        note: { en: 'Stronger southwestern connection than the St. Lawrence colony.', fr: 'Lien plus fort avec le sud-ouest que la colonie du Saint-Laurent.', it: 'Legame più forte con il sud-ovest rispetto alla colonia del San Lorenzo.', de: 'Stärkere Verbindung mit dem Südwesten als die Kolonie St. Lawrence.', nb: 'Sterkere sørvestlig forbindelse enn St. Lawrence-kolonien.', sv: 'Starkare sydvästlig förbindelse än St. Lawrence-kolonin.', da: 'Stærkere sydvestlig forbindelse end St. Lawrence-kolonien.' } },
      { entityId: 'brittany', label: { en: 'Brittany', fr: 'Bretagne', it: 'Bretagna', de: 'Bretagne', nb: 'Bretagne', sv: 'Bretagne', da: 'Bretagne' }, percent: 15, confidence: 'medium' },
      { entityId: 'normandy', label: { en: 'Normandy', fr: 'Normandie', it: 'Normandia', de: 'Normandie', nb: 'Normandie', sv: 'Normandie', da: 'Normandiet' }, percent: 12, confidence: 'medium' },
      { entityId: 'ile-de-france', label: { en: 'Paris Region', fr: 'Région parisienne', it: 'Regione parigina', de: 'Region Paris', nb: 'Paris-regionen', sv: 'Paris-regionen', da: 'Paris-regionen' }, percent: 10, confidence: 'medium' },
      { entityId: 'perche', label: { en: 'Perche', fr: 'Perche', it: 'Perche', de: 'Barsch', nb: 'Perche', sv: 'Perche', da: 'Perche' }, percent: 2, confidence: 'low',
        note: { en: 'Perche was far less connected to Acadia than to the St. Lawrence.', fr: 'Le Perche était beaucoup moins lié à l\'Acadie.', it: 'Il Perche era molto meno collegato all\'Acadia che al San Lorenzo.', de: 'Der Perche war viel weniger mit Acadia verbunden.', nb: 'Perche var langt mindre knyttet til Acadia enn til St. Lawrence.', sv: 'Perche var mycket mindre kopplad till Acadia än till St. Lawrence.', da: 'Perche var langt mindre forbundet med Acadia end til St. Lawrence.' } },
      { entityId: 'other-france', label: { en: 'Other Regions', fr: 'Autres régions', it: 'Altre regioni', de: 'Andere Regionen', nb: 'Andre regioner', sv: 'Andra regioner', da: 'Andre regioner' }, percent: 15, confidence: 'medium' },
      CHANNEL_ISLANDS_ORIGIN_CALLOUT,
    ],
    ports: [
      { entityId: 'la-rochelle', label: { en: 'La Rochelle', fr: 'La Rochelle', it: 'La Rochelle', de: 'La Rochelle', nb: 'La Rochelle', sv: 'La Rochelle', da: 'La Rochelle' }, percent: 55, confidence: 'medium' },
      { entityId: 'saint-malo', label: { en: 'Saint-Malo', fr: 'Saint-Malo', it: 'Saint-Malo', de: 'Saint-Malo', nb: 'Saint-Malo', sv: 'Saint-Malo', da: 'Saint-Malo' }, percent: 20, confidence: 'medium' },
      { entityId: 'dieppe', label: { en: 'Dieppe', fr: 'Dieppe', it: 'Dieppe', de: 'Dieppe', nb: 'Dieppe', sv: 'Dieppe', da: 'Dieppe' }, percent: 10, confidence: 'low' },
      { entityId: 'other-ports', label: { en: 'Other Ports', fr: 'Autres ports', it: 'Altri porti', de: 'Andere Häfen', nb: 'Andre havner', sv: 'Andra hamnar', da: 'Andre havne' }, percent: 15, confidence: 'low' },
      MAINLAND_EMBARKATION_PORT_CALLOUT,
    ],
    colonies: [
      { entityId: 'acadia', label: { en: 'Acadia', fr: 'Acadie', it: 'Acadia', de: 'Akadien', nb: 'Acadia', sv: 'Acadia', da: 'Acadia' }, percent: 100, confidence: 'high' },
    ],
    flowEdges: [
      { originRegionId: 'aunis', portPlaceId: 'la-rochelle', colonyZoneId: 'acadia', weight: 4, confidence: 'medium' },
      { originRegionId: 'brittany', portPlaceId: 'saint-malo', colonyZoneId: 'acadia', weight: 3, confidence: 'medium' },
      { originRegionId: 'southwest-france', portPlaceId: 'la-rochelle', colonyZoneId: 'acadia', weight: 2, confidence: 'medium' },
      { originRegionId: 'normandy', portPlaceId: 'dieppe', colonyZoneId: 'acadia', weight: 1, confidence: 'low' },
      ...CHANNEL_ISLANDS_FLOW_ACADIA,
    ],
  },
];
