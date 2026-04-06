import type { I18nString } from '@/core/types';

export interface ChangelogEntry {
  id: string;
  date: string;
  title: I18nString;
  summary: I18nString;
}

/** Newest first. Append to the top when shipping a feature. */
export const atlasChangelog: ChangelogEntry[] = [
  {
    id: 'regional-haplogroup-pie-panel',
    date: '2026-04-06',
    title: {
      en: 'Regional haplogroup pie charts (Lineage Explorer)',
      fr: 'Diagrammes d’haplogroupes par région (Explorateur de lignées)',
    },
    summary: {
      en: 'The Lineage Explorer hub includes time-sliced SVG pies for Norman-atlas regions: Francogene-derived major-Y shares for New France / Acadia (modern triangulation cohort), plus explicit low-confidence synthesis schematics for Viking-age Scandinavia, Danelaw-leaning stories, and a teaching mtDNA pool for northern Gaul. Evidence badges distinguish ancient aggregates, modern proxies, and best-guess blends — not autosomal ancestry.',
      fr: 'La page Explorateur de lignées inclut des diagrammes circulaires SVG par tranches temporelles pour des régions de l’atlas normand : parts ADN-Y majeures dérivées du catalogue Francogene pour la Nouvelle-France / l’Acadie (cohorte moderne triangulée), plus des schémas de synthèse à faible confiance explicite pour la Scandinavie viking, des récits de type Danelaw, et un pool ADNmt pédagogique pour la Gaule septentrionale. Les badges distinguent agrégats anciens, proxies modernes et estimates — pas l’ascendance autosomiale.',
    },
  },
  {
    id: 'lineage-ydna-migration-map',
    date: '2026-04-06',
    title: {
      en: 'Y-DNA phylogeographic migration map (Lineage Explorer)',
      fr: 'Carte phylogéographique ADN-Y (Explorateur de lignées)',
    },
    summary: {
      en: 'New /lineage-explorer/migration-map route with an A–Z letter picker, world MapLibre view, and illustrative branch paths. Letter R ships first; other letters show an honest empty state until editorial datasets are added. Not a vendor map reproduction—coordinates are teaching sketches with bibliography links.',
      fr: 'Nouvelle route /lineage-explorer/migration-map avec sélecteur A–Z, carte MapLibre mondiale et branches illustratives. La lettre R est la première ; les autres affichent un état vide explicite tant que les jeux de données ne sont pas curés. Ce n’est pas une reproduction de carte commerciale — coordonnées pédagogiques et bibliographie.',
    },
  },
  {
    id: 'premium-lineage-macro-presence',
    date: '2026-04-06',
    title: {
      en: 'Premium lineage citations, macro share state, and map compare overlay',
      fr: 'Citations lignées, partage de l’état macro, et comparaison sur la carte',
    },
    summary: {
      en: 'Genetic Lineage Explorer profiles now surface public references, per-claim sources, trust metadata, Markdown copy, and a map deep link that enables the Historical peoples (macro) layer. Shared map URLs preserve the macro slice (year, view, compare). The macro layer can show a dim second-year overlay when compare mode is on; the region panel lists source links, compare deltas, and optional CSV export. The Journal adds methodology sections for lineage citations and macro presence.',
      fr: 'Les profils de l’Explorateur de lignées affichent désormais des références publiques, des sources par affirmation, des métadonnées de confiance, une copie Markdown et un lien carte qui active la couche « peuples historiques (macro) ». Les URL partagées conservent la tranche macro (année, vue, comparaison). La couche macro peut montrer une superposition atténuée pour la deuxième année ; le panneau régional liste les liens sources, les écarts entre années et un export CSV optionnel. Le Journal ajoute des sections méthodologiques.',
    },
  },
  {
    id: 'historical-peoples-macro-layer',
    date: '2026-04-06',
    title: {
      en: 'Historical peoples macro-layer (500–1100 CE)',
      fr: 'Couche macro « peuples historiques » (500–1100)',
    },
    summary: {
      en: 'Optional map overlay for time-sliced cultural and political prominence on European macro-regions, with peoples / polities / deep ancestry views, confidence hints, sources in the detail panel, year presets on the timeline, and compare mode — weights are relative prominence, not genetic percentages.',
      fr: 'Surcouche cartographique optionnelle pour la proéminence culturelle et politique par tranches temporelles sur des macro-régions européennes, avec vues peuples / politiques / héritage profond, indice de confiance, sources dans le panneau, préréglages d’année sur la frise, et mode comparatif — les pondérations sont une proéminence relative, pas des pourcentages génétiques.',
    },
  },
  {
    id: 'roadmap-cleared-content-phases',
    date: '2026-04-04',
    title: {
      en: 'Anglo-Norman, Mediterranean, and atlas-wide content expansion',
      fr: 'Expansion du contenu anglo-normand, m\u00e9diterran\u00e9en et pan-atlas',
      de: 'Erweiterung der anglonormannischen, mediterranen und Panatlas-Inhalte',
      nb: 'Anglo-normannisk, middelhavs- og atlas-dekkende innholdsutvidelse',
      sv: 'Utvidgning av innehåll i Anglo-Norman, Medelhavet och atlas',
      da: 'Anglo-Norman, Middelhavet og atlas-dækkende indholdsudvidelse',
    },
    summary: {
      en: 'Henry II, Ranulf de Glanvill, Roger I of Sicily, and other figures join the atlas alongside new Mediterranean places (Naples, Catania, Monreale, Mileto, Mdina), Anglo-Norman institutional sites (Clarendon, Runnymede), story arcs for Domesday, Magna Carta, and Norman Sicily\u2019s multicultural kingdom, five new glossary entries, and region narratives for the duchy and exploration eras.',
      fr: 'Henri II, Ranulf de Glanvill, Roger Ier de Sicile et d\u2019autres figures rejoignent l\u2019atlas avec de nouveaux lieux m\u00e9diterran\u00e9ens (Naples, Catane, Monreale, Mileto, Mdina), des sites institutionnels anglo-normands (Clarendon, Runnymede), des arcs narratifs pour Domesday, la Magna Carta et le royaume multiculturel normand de Sicile, cinq nouvelles entr\u00e9es de glossaire et des r\u00e9cits de r\u00e9gion pour les \u00e9poques ducale et d\u2019exploration.',
      de: 'Heinrich II., Ranulf von Glanvill, Roger I. von Sizilien und andere Persönlichkeiten ergänzen den Atlas mit neuen Standorten im Mittelmeerraum (Neapel, Catania, Monreale, Mileto, Mdina), anglonormannischen institutionellen Standorten (Clarendon, Runnymede), Handlungssträngen für Domesday, der Magna Carta und dem multikulturellen normannischen Königreich Sizilien, fünf neuen Glossareinträgen und Regionskonten für die Herzogs- und Erkundungsperioden.',
      nb: 'Henry II, Ranulf de Glanvill, Roger I av Sicilia og andre skikkelser slutter seg til atlaset sammen med nye middelhavssteder (Napoli, Catania, Monreale, Mileto, Mdina), anglo-normanniske institusjonelle steder (Clarendon, Runnymede), historiebuer for Domesday, Magna Carta og Norman Sicilias fem nye multikulturelle regioner og gloser. narrativer for hertugdømmet og utforskningstiden.',
      sv: 'Henry II, Ranulf de Glanvill, Roger I av Sicilien och andra figurer ansluter sig till atlasen tillsammans med nya Medelhavsplatser (Neapel, Catania, Monreale, Mileto, Mdina), anglo-normanska institutionella platser (Clarendon, Runnymede), berättelsebågar för Domesday, Magna Carta och Norman Siciliens fem nya regioner och glororna, en ny mångkulturell region och glororna. berättelser för hertigdömet och utforskningstiden.',
      da: 'Henry II, Ranulf de Glanvill, Roger I af Sicilien og andre figurer slutter sig til atlasset sammen med nye middelhavssteder (Napoli, Catania, Monreale, Mileto, Mdina), anglo-normanniske institutionelle steder (Clarendon, Runnymede), historiebuer for Domesday, Magna Carta og Norman Siciliens fem nye multikulturelle regioner og gloser. fortællinger for hertugdømmet og udforskningstiderne.',
    },
  },
  {
    id: 'a11y-touch-polish',
    date: '2026-04-04',
    title: {
      en: 'Accessibility and touch-target improvements',
      fr: 'Am\u00e9liorations d\u2019accessibilit\u00e9 et des zones tactiles',
      de: 'Verbesserungen der Zugänglichkeit und Touchzone',
      nb: 'Forbedringer av tilgjengelighet og berøringsmål',
      sv: 'Förbättringar av tillgänglighet och beröringsmål',
      da: 'Forbedringer af tilgængelighed og touch-target',
    },
    summary: {
      en: 'Map tooltips now carry proper ARIA roles, the text-size menu manages focus on open and close, and the timeline rail has an expanded touch area for easier mobile scrubbing.',
      fr: 'Les infobulles de la carte portent d\u00e9sormais les bons r\u00f4les ARIA, le menu de taille de texte g\u00e8re le focus \u00e0 l\u2019ouverture et la fermeture, et la barre chronologique dispose d\u2019une zone tactile \u00e9largie pour un d\u00e9filement mobile plus facile.',
      de: 'Die Karten-Tooltips tragen jetzt die richtigen ARIA-Rollen, das Textgrößenmenü verwaltet den Fokus beim Öffnen und Schließen und die Zeitleiste verfügt über einen erweiterten Touch-Bereich für einfacheres mobiles Scrollen.',
      nb: 'Kartverktøytips har nå riktige ARIA-roller, menyen i tekststørrelse styrer fokus på åpning og lukking, og tidslinjeskinnen har et utvidet berøringsområde for enklere mobilskrubbing.',
      sv: 'Kartverktygstips har nu rätt ARIA-roller, menyn i textstorlek hanterar fokus på öppning och stängning, och tidslinjeskenan har en utökad pekyta för enklare mobil skurning.',
      da: 'Kortværktøjstip har nu de rigtige ARIA-roller, tekststørrelsesmenuen styrer fokus på åbning og luk, og tidslinjeskinnen har et udvidet berøringsområde for lettere mobil skrubning.',
    },
  },
  {
    id: 'changelog-replaces-roadmap',
    date: '2026-04-04',
    title: {
      en: 'Recent updates replace the roadmap',
      fr: 'Les mises \u00e0 jour r\u00e9centes remplacent la feuille de route',
      de: 'Aktuelle Updates ersetzen die Roadmap',
      nb: 'Nylige oppdateringer erstatter veikartet',
      sv: 'De senaste uppdateringarna ersätter färdplanen',
      da: 'Nylige opdateringer erstatter køreplanen',
    },
    summary: {
      en: 'The speculative roadmap has been replaced by a dated changelog of shipped features. What you see listed here is what actually landed in the atlas.',
      fr: 'La feuille de route sp\u00e9culative a \u00e9t\u00e9 remplac\u00e9e par un journal dat\u00e9 des fonctionnalit\u00e9s livr\u00e9es. Ce que vous voyez ici est ce qui a r\u00e9ellement \u00e9t\u00e9 d\u00e9ploy\u00e9 dans l\u2019atlas.',
      de: 'Die spekulative Roadmap wurde durch ein veraltetes Protokoll der bereitgestellten Funktionen ersetzt. Was Sie hier sehen, ist das, was tatsächlich im Atlas eingesetzt wurde.',
      nb: 'Det spekulative veikartet er erstattet av en datert endringslogg over leverte funksjoner. Det du ser oppført her er det som faktisk landet i atlaset.',
      sv: 'Den spekulativa färdplanen har ersatts av en daterad ändringslogg över levererade funktioner. Det du ser listat här är vad som faktiskt landade i atlasen.',
      da: 'Den spekulative køreplan er blevet erstattet af en dateret ændringslog over afsendte funktioner. Det, du ser opført her, er, hvad der faktisk landede i atlasset.',
    },
  },
  {
    id: 'shareable-urls-retention',
    date: '2026-04-04',
    title: {
      en: 'Shareable map links and retention strip',
      fr: 'Liens de carte partageables et bande de rétention',
      de: 'Gemeinsam nutzbare Kartenlinks und Aufbewahrungsleiste',
      nb: 'Delbare kartlenker og oppbevaringsstripe',
      sv: 'Delbara kartlänkar och retentionsremsa',
      da: 'Delbare kortlinks og opbevaringsstrimmel',
    },
    summary: {
      en: 'You can now copy a URL that restores the exact map position, era, and layers you are viewing. A retention strip reminds returning visitors where they left off.',
      fr: 'Vous pouvez désormais copier un lien qui restaure la position exacte, l\u2019époque et les couches que vous consultez. Une bande de rétention rappelle aux visiteurs de retour où ils se sont arrêtés.',
      de: 'Sie können jetzt einen Link kopieren, der die genaue Position, Epoche und Ebenen wiederherstellt, die Sie anzeigen. Ein Haltestreifen erinnert wiederkehrende Besucher dort, wo sie aufgehört haben.',
      nb: 'Du kan nå kopiere en URL som gjenoppretter den nøyaktige kartposisjonen, epoken og lagene du ser på. En oppbevaringsstrimmel minner tilbakevendende besøkende om hvor de slapp.',
      sv: 'Du kan nu kopiera en URL som återställer den exakta kartpositionen, eran och lagren du tittar på. En kvarhållningsremsa påminner återkommande besökare där de slutade.',
      da: 'Du kan nu kopiere en URL, der gendanner den nøjagtige kortposition, æra og lag, du ser. En fastholdelsesstrimmel minder tilbagevendende besøgende om, hvor de slap.',
    },
  },
  {
    id: 'story-launcher-era-intro',
    date: '2026-04-01',
    title: {
      en: 'Era-first story launcher and cinematic intros',
      fr: 'Lanceur d\u2019histoires par époque et introductions cinématiques',
      de: 'Story Launcher nach Epoche und filmische Einführungen',
      nb: 'Era-første historiestarter og filmatiske introer',
      sv: 'Era-första story launcher och filmiska intros',
      da: 'Era-første historie launcher og filmiske introer',
    },
    summary: {
      en: 'Stories now launch from an era-grouped panel with poster tiles, and each era opens with a full-screen cinematic intro overlay before the first beat begins.',
      fr: 'Les histoires se lancent depuis un panneau regroupé par époque avec affiches, et chaque époque s\u2019ouvre par une introduction cinématique plein écran avant le premier temps.',
      de: 'Die Geschichten beginnen mit einer nach Epochen gruppierten Tafel mit Postern, und jede Epoche beginnt mit einer filmischen Einführung im Vollbildmodus vor dem ersten Takt.',
      nb: 'Historier lanseres nå fra et epokegruppert panel med plakatfliser, og hver epoke åpnes med et filmatisk introoverlegg på fullskjerm før første beat begynner.',
      sv: 'Berättelser startar nu från en epokgrupperad panel med affischbrickor, och varje era inleds med en filmisk introöverlagring i helskärm innan första beatet börjar.',
      da: 'Historier starter nu fra et æra-grupperet panel med plakatfliser, og hver æra åbner med en filmisk intro-overlay i fuld skærm, før det første beat begynder.',
    },
  },
  {
    id: 'biography-arcs',
    date: '2026-03-28',
    title: {
      en: 'Guided biography arcs for anchor figures',
      fr: 'Arcs biographiques guidés pour les figures majeures',
      de: 'Geführte biografische Handlungsstränge für bedeutende Persönlichkeiten',
      nb: 'Guidede biografibuer for ankerfigurer',
      sv: 'Guidade biografibågar för ankarfigurer',
      da: 'Guidede biografibuer for ankerfigurer',
    },
    summary: {
      en: 'New France settlers, William Iron Arm, Sichelgaita, Odo of Bayeux, and Hereward the Wake now have full guided story arcs you can follow on the map with sourced beat-by-beat narration.',
      fr: 'Les colons de Nouvelle-France, Guillaume Bras-de-Fer, Sichelgaite, Odon de Bayeux et Hereward le Veilleur disposent désormais d\u2019arcs narratifs guidés à suivre sur la carte avec narration sourcée étape par étape.',
      de: 'Die Siedler von Neu-Frankreich, William Bras-de-Fer, Sichelgaite, Odon von Bayeux und Hereward der Wächter, verfügen jetzt über geführte Handlungsstränge, denen sie auf der Karte mit schrittweisen Erzählungen folgen können.',
      nb: 'Nybyggere i Frankrike, William Iron Arm, Sichelgaita, Odo of Bayeux og Hereward the Wake har nå full guidede historiebuer du kan følge på kartet med hentet beat-by-beat-fortelling.',
      sv: 'Nybyggarna i Frankrike, William Iron Arm, Sichelgaita, Odo of Bayeux och Hereward the Wake har nu fullständiga guidade berättelsebågar som du kan följa på kartan med källan beat-by-beat-berättelse.',
      da: 'Nybyggere fra Frankrig, William Iron Arm, Sichelgaita, Odo of Bayeux og Hereward the Wake har nu fulde guidede historiebuer, du kan følge på kortet med indhentet beat-by-beat-fortælling.',
    },
  },
  {
    id: 'story-illustrations',
    date: '2026-03-25',
    title: {
      en: 'Story beat illustrations across all eras',
      fr: 'Illustrations des étapes narratives pour toutes les époques',
      de: 'Illustrationen von Erzählstationen für alle Epochen',
      nb: 'Historiebeat-illustrasjoner på tvers av alle tidsepoker',
      sv: 'Story beat illustrationer över alla epoker',
      da: 'Historiebeat-illustrationer på tværs af alle epoker',
    },
    summary: {
      en: 'Every era from Neolithic through the Atlantic Imprint now has photo-pin illustrations on each story beat, giving visual anchoring to the places and events described in the narrative.',
      fr: 'Chaque époque, du Néolithique à l\u2019Empreinte atlantique, dispose désormais d\u2019illustrations sur chaque étape narrative, offrant un ancrage visuel aux lieux et événements décrits.',
      de: 'Zu jeder Epoche, vom Neolithikum bis zum Atlantikzeitalter, gibt es jetzt Illustrationen zu jeder Erzählphase, die einen visuellen Anker für die beschriebenen Orte und Ereignisse bieten.',
      nb: 'Hver epoke fra yngre steinalder til Atlanterhavsavtrykket har nå fotonålsillustrasjoner på hvert historieslag, noe som gir visuell forankring til stedene og hendelsene beskrevet i fortellingen.',
      sv: 'Varje era från neolitikum till Atlantic Imprint har nu fotonålsillustrationer på varje berättelsetakt, vilket ger visuell förankring till platserna och händelserna som beskrivs i berättelsen.',
      da: 'Hver epoke fra neolitikum til Atlanterhavsaftrykket har nu fotonålsillustrationer på hvert historiebeat, hvilket giver visuel forankring til de steder og begivenheder, der er beskrevet i fortællingen.',
    },
  },
  {
    id: 'progress-milestones',
    date: '2026-03-20',
    title: {
      en: 'Expedition progress, challenges, and milestones',
      fr: 'Progression d\u2019expédition, défis et jalons',
      de: 'Expeditionsfortschritt, Herausforderungen und Meilensteine',
      nb: 'Ekspedisjonens fremgang, utfordringer og milepæler',
      sv: 'Expeditionens framsteg, utmaningar och milstolpar',
      da: 'Ekspeditionens fremskridt, udfordringer og milepæle',
    },
    summary: {
      en: 'A new progress system tracks eras explored, stories completed, and places visited. Challenges and milestones reward sustained exploration, with shareable moment cards and a persistent ledger.',
      fr: 'Un nouveau système de progression suit les époques explorées, les histoires terminées et les lieux visités. Défis et jalons récompensent l\u2019exploration soutenue, avec cartes de moments partageables et un registre persistant.',
      de: 'Ein neues Fortschrittssystem verfolgt erkundete Epochen, abgeschlossene Geschichten und besuchte Orte. Herausforderungen und Meilensteine ​​belohnen nachhaltiges Erkunden mit gemeinsam nutzbaren Momentkarten und einem dauerhaften Protokoll.',
      nb: 'Et nytt fremdriftssystem sporer epoker utforsket, historier fullført og besøkte steder. Utfordringer og milepæler belønner vedvarende utforskning, med delbare øyeblikkskort og en vedvarende hovedbok.',
      sv: 'Ett nytt framstegssystem spårar utforskade epoker, berättelser slutförda och besökta platser. Utmaningar och milstolpar belönar ihållande utforskning, med delbara ögonblickskort och en ihållande reskontra.',
      da: 'Et nyt fremskridtssystem sporer udforskede epoker, afsluttede historier og besøgte steder. Udfordringer og milepæle belønner vedvarende udforskning med delbare øjeblikskort og en vedvarende hovedbog.',
    },
  },
];

export const changelogFootnote: I18nString = {
  en: 'Have a correction, source, or family line worth documenting? The atlas grows through research and community input; the support and creator links in the header show how you can help.',
  fr: 'Une correction, une source ou une lignée à documenter ? L\u2019atlas grandit grâce à la recherche et aux contributions ; les liens soutien et créateur du menu proposent comment aider.',
  es: '\u00bfCorrecci\u00f3n, fuente o linaje que valga documentar? El atlas crece con investigaci\u00f3n y aportes; los enlaces de apoyo y creador en el men\u00fa explican c\u00f3mo colaborar.',
  it: 'Correzione, fonte o lignaggio da documentare? L\u2019atlante cresce con ricerca e contributi; dal menu, sostegno e creatore indicano come aiutare.',
  de: 'Eine Korrektur, eine Quelle oder eine Abstammungslinie zum Dokumentieren? Der Atlas wächst durch Forschung und Beiträge; Die Links zum Support und zur Menüerstellung geben Hinweise darauf, wie Sie helfen können.',
  nb: 'Har du en rettelse, kilde eller slekt som er verdt å dokumentere? Atlaset vokser gjennom forskning og samfunnsinnspill; støtte- og skaperlenkene i overskriften viser hvordan du kan hjelpe.',
  sv: 'Har du en rättelse, källa eller släktlinje värd att dokumentera? Atlasen växer genom forskning och samhällsinsatser; support- och skaparlänkarna i rubriken visar hur du kan hjälpa till.',
  da: 'Har du en rettelse, kilde eller familielinje, der er værd at dokumentere? Atlasset vokser gennem forskning og samfundsinput; support- og skaberlinks i overskriften viser, hvordan du kan hjælpe.',
};
