import type { HaplogroupMajorLetter, PhylogeographyLetterDataset } from '@/core/types';
import { atlasLineageSynthesisNote, pickLineageRefs } from '@/data/atlas/lineage/bibliography';

function phyloSources(slug: string) {
  return [...pickLineageRefs('isoggYtree', 'yfull', 'ebiHaplogroups'), atlasLineageSynthesisNote(`phylo-letter-${slug}`)];
}

/** Shared deep-time anchors (editorial teaching coordinates — not vendor maps). */
const DEEP_AFRICA = { lat: 10, lng: 40.5 } as const;
const SW_ASIA_HUB = { lat: 33.5, lng: 44.2 } as const;

function nonstandardLetter(letter: 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'): PhylogeographyLetterDataset {
  const slug = letter.toLowerCase();
  return {
    letter,
    title: {
      en: `Letter ${letter} — nomenclature note`,
      fr: `Lettre ${letter} — note de nomenclature`,
    },
    summary: {
      en: `The single letter “${letter}” is not widely used as a major Y-chromosome haplogroup root in common ISOGG-style trees (unlike A–Q, R, S, or T). This view shows only a generic Out-of-Africa–to–West Eurasia stem for continuity with other tabs. Always verify labels on ISOGG, YFull, or primary literature.`,
      fr: `La lettre seule « ${letter} » n’est pas couramment employée comme racine majeure d’haplogroupe Y dans les arbres de type ISOGG (contrairement à A–Q, R, S ou T). Cet onglet ne montre qu’une tige générique Afrique → Proche-Ouest eurasien pour rester cohérent avec les autres vues. Vérifiez toujours les libellés sur ISOGG, YFull ou la littérature primaire.`,
    },
    nodes: [
      {
        id: `${slug}-stem`,
        label: 'Deep African stem (illustrative)',
        ...DEEP_AFRICA,
      },
      {
        id: `${slug}-hub`,
        label: 'Southwest Asia hub (illustrative)',
        ...SW_ASIA_HUB,
      },
      {
        id: `${slug}-eu`,
        label: 'Western Europe (illustrative spread)',
        lat: 48.5,
        lng: 2.5,
      },
    ],
    edges: [
      { fromId: `${slug}-stem`, toId: `${slug}-hub` },
      { fromId: `${slug}-hub`, toId: `${slug}-eu` },
    ],
    sources: phyloSources(slug),
  };
}

/**
 * Curated illustrative topology for A–Q, S, T (R lives in letter-r.ts).
 * Coordinates are editorial approximations for teaching — not copied from any vendor map.
 */
export const LETTERS_PHYLO_EXCEPT_R: Record<Exclude<HaplogroupMajorLetter, 'R'>, PhylogeographyLetterDataset> = {
  A: {
    letter: 'A',
    title: {
      en: 'Haplogroup A — deep African branches',
      fr: 'Haplogroupe A — branches africaines profondes',
    },
    summary: {
      en: 'Haplogroup A lineages are among the deepest-rooted Y branches, with modern diversity concentrated in Africa. Public trees continue to split and rename subclades; this sketch highlights a Horn/East African focus, not a personal match.',
      fr: 'Les lignées du haplogroupe A comptent parmi les branches Y les plus profondes, avec une diversité moderne concentrée en Afrique. Les arbres publics continuent de subdiviser et renommer les sous-clades ; ce schéma met l’accent sur la Corne / l’Afrique de l’Est, pas sur une correspondance personnelle.',
    },
    nodes: [
      { id: 'a-deep', label: 'Deep African stem (illustrative)', ...DEEP_AFRICA },
      { id: 'a-horn', label: 'Horn / East Africa (diversity hub)', lat: 9.5, lng: 41.5 },
      { id: 'a-sa', label: 'Southern Africa (illustrative branch)', lat: -24, lng: 25 },
    ],
    edges: [
      { fromId: 'a-deep', toId: 'a-horn' },
      { fromId: 'a-deep', toId: 'a-sa' },
    ],
    sources: phyloSources('a'),
  },

  B: {
    letter: 'B',
    title: {
      en: 'Haplogroup B — Central / West African spread',
      fr: 'Haplogroupe B — diffusion en Afrique centrale / occidentale',
    },
    summary: {
      en: 'Haplogroup B is predominantly African, with distributions discussed in relation to Central and West African diversity. Branch names and dates shift as sampling grows; treat this map as a coarse teaching frame.',
      fr: 'Le haplogroupe B est surtout africain, avec des distributions discutées autour de la diversité d’Afrique centrale et occidentale. Noms de branches et dates évoluent avec les échantillons ; considérez cette carte comme un cadre pédagogique grossier.',
    },
    nodes: [
      { id: 'b-deep', label: 'Deep African stem (illustrative)', ...DEEP_AFRICA },
      { id: 'b-cam', label: 'Central Africa (illustrative hub)', lat: 4, lng: 15 },
      { id: 'b-wa', label: 'West Africa (illustrative branch)', lat: 10, lng: -2 },
    ],
    edges: [
      { fromId: 'b-deep', toId: 'b-cam' },
      { fromId: 'b-cam', toId: 'b-wa' },
    ],
    sources: phyloSources('b'),
  },

  C: {
    letter: 'C',
    title: {
      en: 'Haplogroup C — East Eurasian / Pacific / American corridors',
      fr: 'Haplogroupe C — corridors est-eurasien / Pacifique / Amérique',
    },
    summary: {
      en: 'Haplogroup C is often summarized as an ancient East Eurasian lineage with branches across East Asia, Oceania, and the Americas (via northeast Asian/Beringian contexts in the deep past). Exact topology and timing are active research areas.',
      fr: 'Le haplogroupe C est souvent présenté comme une lignée est-eurasienne ancienne, avec des branches en Asie de l’Est, en Océanie et en Amérique (via des contextes nord-est-asiatiques / béringiens au très lointain passé). La topologie et le calendrier exacts restent des sujets de recherche actifs.',
    },
    nodes: [
      { id: 'c-deep', label: 'Deep Asian stem (illustrative)', lat: 35, lng: 105 },
      { id: 'c-sea', label: 'Southeast Asia / Wallacea', lat: 2, lng: 118 },
      { id: 'c-pac', label: 'Pacific / Near Oceania', lat: -8, lng: 147 },
      { id: 'c-na', label: 'Americas (Beringian-derived, illustrative)', lat: 45, lng: -110 },
    ],
    edges: [
      { fromId: 'c-deep', toId: 'c-sea' },
      { fromId: 'c-deep', toId: 'c-pac' },
      { fromId: 'c-deep', toId: 'c-na' },
    ],
    sources: phyloSources('c'),
  },

  D: {
    letter: 'D',
    title: {
      en: 'Haplogroup D — Tibetan Plateau / Japan / Andaman-linked stories',
      fr: 'Haplogroupe D — plateau tibétain / Japon / récits liés aux Andaman',
    },
    summary: {
      en: 'Haplogroup D is frequently discussed alongside highland East Asian and Japanese contexts in population-genetics summaries, with ancient Andaman-associated lineages sometimes placed in broader macrohaplogroup conversations. This is a schematic, not a site ledger.',
      fr: 'Le haplogroupe D est souvent évoqué avec les contextes est-asiatiques de montagne et le Japon dans les synthèses de génétique des populations, parfois avec des lignées associées aux Andaman dans des discussions de macrohaplogroupes. Il s’agit d’un schéma, pas d’un recensement de sites.',
    },
    nodes: [
      { id: 'd-deep', label: 'East Asian stem (illustrative)', lat: 32, lng: 102 },
      { id: 'd-tib', label: 'Tibetan Plateau hub', lat: 32, lng: 88 },
      { id: 'd-jp', label: 'Japan (illustrative branch)', lat: 37, lng: 138 },
      { id: 'd-and', label: 'Bay of Bengal / Andaman (illustrative)', lat: 12, lng: 93 },
    ],
    edges: [
      { fromId: 'd-deep', toId: 'd-tib' },
      { fromId: 'd-deep', toId: 'd-jp' },
      { fromId: 'd-deep', toId: 'd-and' },
    ],
    sources: phyloSources('d'),
  },

  E: {
    letter: 'E',
    title: {
      en: 'Haplogroup E — African core, Mediterranean / Levantine spread',
      fr: 'Haplogroupe E — cœur africain, diffusion méditerranéenne / levantine',
    },
    summary: {
      en: 'Haplogroup E encompasses major African Y diversity and well-known northern / Mediterranean branches discussed in archaeology and genetics. Downstream names like M215 feature in public trees. The atlas links one illustrative node to the curated E1b1b profile.',
      fr: 'Le haplogroupe E regroupe une grande partie de la diversité Y africaine et des branches nordiques / méditerranéennes bien documentées. Des noms en aval comme M215 figurent dans les arbres publics. L’atlas relie un nœud illustratif au profil E1b1b curé.',
    },
    nodes: [
      { id: 'e-deep', label: 'Deep African stem (illustrative)', ...DEEP_AFRICA, omitWhenFocus: 'norman-normandy' },
      { id: 'e-sahel', label: 'Sahel / Horn hub', lat: 12, lng: 35, omitWhenFocus: 'norman-normandy' },
      { id: 'e-na', label: 'North Africa / Maghreb', lat: 32, lng: 5, omitWhenFocus: 'norman-normandy' },
      {
        id: 'e-lev',
        label: 'E1b1b (illustrative — see profile)',
        lat: 35,
        lng: 33,
        profileId: 'y-e1b1b',
        omitWhenFocus: 'norman-normandy',
      },
      {
        id: 'e-norman-e-pool-ill',
        label: 'E1b — Mediterranean / Roman-connectivity pools (illustrative)',
        lat: 40.5,
        lng: 12.5,
        profileId: 'y-e1b1b',
        onlyWhenFocus: 'norman-normandy',
      },
      {
        id: 'e-norman-cotentin-ill',
        label: 'Normandy — Cotentin-style survey frame (illustrative)',
        lat: 49.08,
        lng: -1.55,
        onlyWhenFocus: 'norman-normandy',
      },
    ],
    edges: [
      { fromId: 'e-deep', toId: 'e-sahel', omitWhenFocus: 'norman-normandy' },
      { fromId: 'e-sahel', toId: 'e-na', omitWhenFocus: 'norman-normandy' },
      { fromId: 'e-sahel', toId: 'e-lev', omitWhenFocus: 'norman-normandy' },
      { fromId: 'e-norman-e-pool-ill', toId: 'e-norman-cotentin-ill', onlyWhenFocus: 'norman-normandy' },
    ],
    sources: phyloSources('e'),
  },

  F: {
    letter: 'F',
    title: {
      en: 'Haplogroup F — Out-of-Africa hub and ancestor of many major lines',
      fr: 'Haplogroupe F — pivot hors d’Afrique et ancêtre de nombreuses lignées majeures',
    },
    summary: {
      en: 'Haplogroup F is widely described as an early branch from which many later haplogroups (G through T in classical letter schemes) descend. Routes and dates are model-dependent; this overlay shows a Levant / Southwest Asian teaching hub only.',
      fr: 'Le haplogroupe F est souvent décrit comme une branche précoce dont descendent de nombreux haplogroupes ultérieurs (G à T dans les schémas classiques). Itinéraires et dates dépendent des modèles ; cette surcouche ne montre qu’un pivot pédagogique au Levant / Proche-Orient.',
    },
    nodes: [
      { id: 'f-deep', label: 'Deep African stem (illustrative)', ...DEEP_AFRICA },
      { id: 'f-lev', label: 'Southwest Asia / Levant (F hub)', ...SW_ASIA_HUB },
      { id: 'f-step', label: 'Iranian plateau / steppe fringe', lat: 32, lng: 53 },
    ],
    edges: [
      { fromId: 'f-deep', toId: 'f-lev' },
      { fromId: 'f-lev', toId: 'f-step' },
    ],
    sources: phyloSources('f'),
  },

  G: {
    letter: 'G',
    title: {
      en: 'Haplogroup G — Caucasus / Anatolia / scattered European pockets',
      fr: 'Haplogroupe G — Caucase / Anatolie / îlots européens dispersés',
    },
    summary: {
      en: 'Haplogroup G is commonly associated with the Caucasus and Anatolia in textbook summaries, with historic pockets across Europe tied to multiple prehistoric and historic processes. Verify subclades on current trees before citing a branch.',
      fr: 'Le haplogroupe G est souvent associé au Caucase et à l’Anatolie dans les manuels, avec des poches historiques en Europe liées à plusieurs processus préhistoriques et historiques. Vérifiez les sous-clades sur les arbres actuels avant de citer une branche.',
    },
    nodes: [
      { id: 'g-deep', label: 'Southwest Asia stem (illustrative)', ...SW_ASIA_HUB, omitWhenFocus: 'norman-normandy' },
      { id: 'g-cau', label: 'Greater Caucasus hub', lat: 42.5, lng: 44, omitWhenFocus: 'norman-normandy' },
      { id: 'g-ana', label: 'Anatolia', lat: 39, lng: 35, omitWhenFocus: 'norman-normandy' },
      { id: 'g-eu', label: 'Europe (illustrative pockets)', lat: 46, lng: 12, omitWhenFocus: 'norman-normandy' },
      {
        id: 'g-norman-g-pool-ill',
        label: 'G2 — Anatolian / Caucasus pockets in Atlantic Europe (illustrative)',
        lat: 42.2,
        lng: 44.2,
        onlyWhenFocus: 'norman-normandy',
      },
      {
        id: 'g-norman-cotentin-ill',
        label: 'Normandy — Cotentin-style survey frame (illustrative)',
        lat: 49.08,
        lng: -1.55,
        onlyWhenFocus: 'norman-normandy',
      },
    ],
    edges: [
      { fromId: 'g-deep', toId: 'g-cau', omitWhenFocus: 'norman-normandy' },
      { fromId: 'g-cau', toId: 'g-ana', omitWhenFocus: 'norman-normandy' },
      { fromId: 'g-ana', toId: 'g-eu', omitWhenFocus: 'norman-normandy' },
      { fromId: 'g-norman-g-pool-ill', toId: 'g-norman-cotentin-ill', onlyWhenFocus: 'norman-normandy' },
    ],
    sources: phyloSources('g'),
  },

  H: {
    letter: 'H',
    title: {
      en: 'Haplogroup H — South Asian Y lineages (rare globally)',
      fr: 'Haplogroupe H — lignées Y d’Asie du Sud (rares à l’échelle mondiale)',
    },
    summary: {
      en: 'Y-chromosome haplogroup H (not mtDNA H) is discussed mainly in South Asian population genetics. It is uncommon relative to large branches like R or O; treat naming carefully to avoid confusion with mitochondrial haplogroup H.',
      fr: 'Le haplogroupe Y H (pas l’ADNmt H) est surtout discuté en génétique des populations d’Asie du Sud. Il est peu fréquent par rapport à de grandes branches comme R ou O ; attention aux confusions avec l’haplogroupe mitochondrial H.',
    },
    nodes: [
      { id: 'h-deep', label: 'Southwest Asia stem (illustrative)', ...SW_ASIA_HUB },
      { id: 'h-ind', label: 'Indian subcontinent hub', lat: 22, lng: 78 },
      { id: 'h-south', label: 'Peninsular south / Sri Lanka (illustrative)', lat: 10, lng: 78 },
    ],
    edges: [
      { fromId: 'h-deep', toId: 'h-ind' },
      { fromId: 'h-ind', toId: 'h-south' },
    ],
    sources: phyloSources('h'),
  },

  I: {
    letter: 'I',
    title: {
      en: 'Haplogroup I — European Mesolithic / Neolithic Y lineages',
      fr: 'Haplogroupe I — lignées Y mésolithiques / néolithiques européennes',
    },
    summary: {
      en: 'Haplogroup I is a major European lineage, with I1 and I2 discussed widely in ancient-DNA narratives. Links point to curated atlas profiles for I1 and I2a; finer structure lives in vendor trees.',
      fr: 'Le haplogroupe I est une lignée européenne majeure, avec I1 et I2 souvent cités dans les récits d’ADN ancien. Des liens pointent vers les profils I1 et I2a ; la structure fine se trouve dans les arbres des fournisseurs.',
    },
    nodes: [
      { id: 'i-deep', label: 'Southeast Europe stem (illustrative)', lat: 44, lng: 22, omitWhenFocus: 'norman-normandy' },
      { id: 'i-balk', label: 'Balkans / Danube hub', lat: 43, lng: 20, omitWhenFocus: 'norman-normandy' },
      {
        id: 'i-i1',
        label: 'I1 (North European branch)',
        lat: 60,
        lng: 15,
        profileId: 'y-i1',
        omitWhenFocus: 'norman-normandy',
      },
      {
        id: 'i-i2',
        label: 'I2a (illustrative)',
        lat: 46,
        lng: 18,
        profileId: 'y-i2a',
        omitWhenFocus: 'norman-normandy',
      },
      {
        id: 'i-norman-i1-ill',
        label: 'I1 — Norse–Scandinavian-associated (illustrative)',
        lat: 59.55,
        lng: 8.35,
        profileId: 'y-i1',
        onlyWhenFocus: 'norman-normandy',
      },
      {
        id: 'i-norman-i2-ill',
        label: 'I2 — North Sea / Germanic layers (illustrative)',
        lat: 53.85,
        lng: 9.45,
        profileId: 'y-i2a',
        onlyWhenFocus: 'norman-normandy',
      },
      {
        id: 'i-norman-cotentin-ill',
        label: 'Normandy — Cotentin-style survey frame (illustrative)',
        lat: 49.08,
        lng: -1.55,
        onlyWhenFocus: 'norman-normandy',
      },
    ],
    edges: [
      { fromId: 'i-deep', toId: 'i-balk', omitWhenFocus: 'norman-normandy' },
      { fromId: 'i-balk', toId: 'i-i1', omitWhenFocus: 'norman-normandy' },
      { fromId: 'i-balk', toId: 'i-i2', omitWhenFocus: 'norman-normandy' },
      { fromId: 'i-norman-i1-ill', toId: 'i-norman-cotentin-ill', onlyWhenFocus: 'norman-normandy' },
      { fromId: 'i-norman-i2-ill', toId: 'i-norman-cotentin-ill', onlyWhenFocus: 'norman-normandy' },
    ],
    sources: phyloSources('i'),
  },

  J: {
    letter: 'J',
    title: {
      en: 'Haplogroup J — Near Eastern / Mediterranean spread',
      fr: 'Haplogroupe J — diffusion proche-orientale / méditerranéenne',
    },
    summary: {
      en: 'Haplogroup J is centered on the Fertile Crescent and surrounding regions in many summaries, with major subclades discussed across the Mediterranean. The atlas links an illustrative node to the J2 profile.',
      fr: 'Le haplogroupe J est centré sur le Croissant fertile et les régions voisines dans de nombreuses synthèses, avec des sous-clades majeures discutées autour de la Méditerranée. L’atlas relie un nœud illustratif au profil J2.',
    },
    nodes: [
      { id: 'j-deep', label: 'Southwest Asia stem (illustrative)', ...SW_ASIA_HUB, omitWhenFocus: 'norman-normandy' },
      { id: 'j-zag', label: 'Zagros / Mesopotamia hub', lat: 33, lng: 48, omitWhenFocus: 'norman-normandy' },
      {
        id: 'j-med',
        label: 'J2 — Mediterranean spread (illustrative)',
        lat: 37,
        lng: 22,
        profileId: 'y-j2',
        omitWhenFocus: 'norman-normandy',
      },
      {
        id: 'j-norman-j-pool-ill',
        label: 'J1 / J2 — Mediterranean & Levantine pools (illustrative)',
        lat: 36.2,
        lng: 18.5,
        profileId: 'y-j2',
        onlyWhenFocus: 'norman-normandy',
      },
      {
        id: 'j-norman-cotentin-ill',
        label: 'Normandy — Cotentin-style survey frame (illustrative)',
        lat: 49.08,
        lng: -1.55,
        onlyWhenFocus: 'norman-normandy',
      },
    ],
    edges: [
      { fromId: 'j-deep', toId: 'j-zag', omitWhenFocus: 'norman-normandy' },
      { fromId: 'j-zag', toId: 'j-med', omitWhenFocus: 'norman-normandy' },
      { fromId: 'j-norman-j-pool-ill', toId: 'j-norman-cotentin-ill', onlyWhenFocus: 'norman-normandy' },
    ],
    sources: phyloSources('j'),
  },

  K: {
    letter: 'K',
    title: {
      en: 'Haplogroup K — macro-branch umbrella (K2 and descendants)',
      fr: 'Haplogroupe K — macro-branche (K2 et descendants)',
    },
    summary: {
      en: 'Letter K names a broad region of the Y tree that includes ancestors of major lineages discussed across Eurasia and Oceania (K2 and downstream structure in public phylogenies). This map is intentionally coarse.',
      fr: 'La lettre K désigne une large zone de l’arbre Y incluant des ancêtres de lignées majeures discutées en Eurasie et en Océanie (K2 et structure en aval dans les phylogénies publiques). Cette carte est volontairement grossière.',
    },
    nodes: [
      { id: 'k-deep', label: 'Southwest Asia stem (illustrative)', ...SW_ASIA_HUB },
      { id: 'k-ca', label: 'Central Asia hub', lat: 45, lng: 68 },
      { id: 'k-sea', label: 'Southeast Asia / Wallacea', lat: -2, lng: 120 },
      { id: 'k-ocean', label: 'Near Oceania (illustrative)', lat: -6, lng: 147 },
    ],
    edges: [
      { fromId: 'k-deep', toId: 'k-ca' },
      { fromId: 'k-deep', toId: 'k-sea' },
      { fromId: 'k-sea', toId: 'k-ocean' },
    ],
    sources: phyloSources('k'),
  },

  L: {
    letter: 'L',
    title: {
      en: 'Haplogroup L — South Asia / Iranian plateau corridor',
      fr: 'Haplogroupe L — corridor Asie du Sud / plateau iranien',
    },
    summary: {
      en: 'Haplogroup L is frequently summarized along Iranian and South Asian axes in population genetics. Subclade naming evolves; use public trees for downstream detail.',
      fr: 'Le haplogroupe L est souvent résumé le long des axes iranien et sud-asiatique en génétique des populations. La nomenclature des sous-clades évolue ; utilisez les arbres publics pour le détail en aval.',
    },
    nodes: [
      { id: 'l-deep', label: 'Southwest Asia stem (illustrative)', ...SW_ASIA_HUB },
      { id: 'l-iran', label: 'Iranian plateau', lat: 32, lng: 53 },
      { id: 'l-ind', label: 'Indian subcontinent', lat: 24, lng: 72 },
    ],
    edges: [
      { fromId: 'l-deep', toId: 'l-iran' },
      { fromId: 'l-iran', toId: 'l-ind' },
    ],
    sources: phyloSources('l'),
  },

  M: {
    letter: 'M',
    title: {
      en: 'Haplogroup M — Island Southeast Asia / Melanesia / Oceania',
      fr: 'Haplogroupe M — Asie du Sud-Est insulaire / Mélanésie / Océanie',
    },
    summary: {
      en: 'Haplogroup M is discussed in Oceanian and Indonesian contexts in Y-DNA literature, distinct from mitochondrial haplogroup M. Keep Y versus mt naming straight when reading trees.',
      fr: 'Le haplogroupe Y M est discuté dans des contextes océaniens et indonésiens, distinct de l’haplogroupe mitochondrial M. Gardez bien séparées les nomenclatures Y et ADNmt en lisant les arbres.',
    },
    nodes: [
      { id: 'm-deep', label: 'Southeast Asian stem (illustrative)', lat: 5, lng: 115 },
      { id: 'm-ina', label: 'Indonesia / Wallacea', lat: -3, lng: 120 },
      { id: 'm-png', label: 'New Guinea / Melanesia', lat: -6, lng: 145 },
    ],
    edges: [
      { fromId: 'm-deep', toId: 'm-ina' },
      { fromId: 'm-ina', toId: 'm-png' },
    ],
    sources: phyloSources('m'),
  },

  N: {
    letter: 'N',
    title: {
      en: 'Haplogroup N — Siberia / North Eurasia / Finnic-associated spread',
      fr: 'Haplogroupe N — Sibérie / Eurasie septentrionale / diffusion associée aux Finnois',
    },
    summary: {
      en: 'Haplogroup N is prominent in northern Eurasian summaries, including Uralic-speaking populations in textbook phylogeographic stories. Ancient DNA continues to refine timing along the forest / tundra belt.',
      fr: 'Le haplogroupe N est marquant dans les synthèses eurasiennes septentrionales, y compris les populations ouraliennes dans les récits phylogéographiques classiques. L’ADN ancien affine continuellement la chronologie le long de la ceinture forêt / toundra.',
    },
    nodes: [
      { id: 'n-deep', label: 'Altai / South Siberia hub', lat: 50, lng: 88, omitWhenFocus: 'norman-normandy' },
      { id: 'n-ural', label: 'Urals / West Siberia', lat: 58, lng: 62, omitWhenFocus: 'norman-normandy' },
      { id: 'n-fin', label: 'Baltic / Fennoscandia (illustrative)', lat: 62, lng: 25, omitWhenFocus: 'norman-normandy' },
      {
        id: 'n-norman-n-rare-ill',
        label: 'N1c — rare northern outlier in regional surveys (illustrative)',
        lat: 61.2,
        lng: 22.5,
        onlyWhenFocus: 'norman-normandy',
      },
      {
        id: 'n-norman-cotentin-ill',
        label: 'Normandy — Cotentin-style survey frame (illustrative)',
        lat: 49.08,
        lng: -1.55,
        onlyWhenFocus: 'norman-normandy',
      },
    ],
    edges: [
      { fromId: 'n-deep', toId: 'n-ural', omitWhenFocus: 'norman-normandy' },
      { fromId: 'n-ural', toId: 'n-fin', omitWhenFocus: 'norman-normandy' },
      { fromId: 'n-norman-n-rare-ill', toId: 'n-norman-cotentin-ill', onlyWhenFocus: 'norman-normandy' },
    ],
    sources: phyloSources('n'),
  },

  O: {
    letter: 'O',
    title: {
      en: 'Haplogroup O — East and Southeast Asia',
      fr: 'Haplogroupe O — Asie de l’Est et du Sud-Est',
    },
    summary: {
      en: 'Haplogroup O encompasses many East and Southeast Asian branches in public Y trees. Fine-scale structure reflects language families, historical states, and migration — far beyond this single schematic.',
      fr: 'Le haplogroupe O regroupe de nombreuses branches est-asiatiques et sud-est-asiatiques dans les arbres Y publics. La structure fine reflète familles de langues, États historiques et migrations — bien au-delà de ce seul schéma.',
    },
    nodes: [
      { id: 'o-deep', label: 'East China hub (illustrative)', lat: 32, lng: 112 },
      { id: 'o-s', label: 'South China / mainland SEA', lat: 23, lng: 108 },
      { id: 'o-sea', label: 'Island Southeast Asia', lat: 2, lng: 113 },
      { id: 'o-jp', label: 'Japan / Korea fringe (illustrative)', lat: 36, lng: 128 },
    ],
    edges: [
      { fromId: 'o-deep', toId: 'o-s' },
      { fromId: 'o-deep', toId: 'o-sea' },
      { fromId: 'o-deep', toId: 'o-jp' },
    ],
    sources: phyloSources('o'),
  },

  P: {
    letter: 'P',
    title: {
      en: 'Haplogroup P — ancestor of Q and R in common tree summaries',
      fr: 'Haplogroupe P — ancêtre de Q et R dans les synthèses d’arbre courantes',
    },
    summary: {
      en: 'Haplogroup P is often placed in Central / North Asian framing as an ancestor of haplogroups Q and R in widely used textbook schematics. Exact SNP paths differ between tree versions.',
      fr: 'Le haplogroupe P est souvent placé dans un cadrage asiatique central / nord comme ancêtre des haplogroupes Q et R dans les schémas de manuels. Les chemins de SNP exacts varient selon les versions d’arbre.',
    },
    nodes: [
      { id: 'p-deep', label: 'Southwest Asia stem (illustrative)', ...SW_ASIA_HUB },
      { id: 'p-ca', label: 'Central Asia / Altai hub', lat: 48, lng: 82 },
      { id: 'p-q', label: 'Q — Siberia / Americas (illustrative)', lat: 62, lng: 118 },
      { id: 'p-r', label: 'R — West Eurasia / South Asia (illustrative)', lat: 50, lng: 55, profileId: 'y-r1b' },
    ],
    edges: [
      { fromId: 'p-deep', toId: 'p-ca' },
      { fromId: 'p-ca', toId: 'p-q' },
      { fromId: 'p-ca', toId: 'p-r' },
    ],
    sources: phyloSources('p'),
  },

  Q: {
    letter: 'Q',
    title: {
      en: 'Haplogroup Q — Siberia and the Americas',
      fr: 'Haplogroupe Q — Sibérie et Amériques',
    },
    summary: {
      en: 'Haplogroup Q is central to discussions of northeast Asian and Indigenous American Y lineages in the context of Beringian population history. Modern distributions reflect both ancient and recent movements.',
      fr: 'Le haplogroupe Q est central dans les discussions sur les lignées Y nord-est-asiatiques et amérindiennes dans le contexte de l’histoire des populations béringiennes. Les distributions modernes reflètent des mouvements anciens et récents.',
    },
    nodes: [
      { id: 'q-deep', label: 'Central / North Asia hub', lat: 52, lng: 95, omitWhenFocus: 'norman-normandy' },
      { id: 'q-ber', label: 'Beringian staging (illustrative)', lat: 66, lng: -165, omitWhenFocus: 'norman-normandy' },
      { id: 'q-na', label: 'North America', lat: 45, lng: -105, omitWhenFocus: 'norman-normandy' },
      { id: 'q-sa', label: 'South America (illustrative branch)', lat: -15, lng: -60, omitWhenFocus: 'norman-normandy' },
      {
        id: 'q-norman-q-rare-ill',
        label: 'Q — rare outlier in western European surveys (illustrative)',
        lat: 52.5,
        lng: 95,
        onlyWhenFocus: 'norman-normandy',
      },
      {
        id: 'q-norman-cotentin-ill',
        label: 'Normandy — Cotentin-style survey frame (illustrative)',
        lat: 49.08,
        lng: -1.55,
        onlyWhenFocus: 'norman-normandy',
      },
    ],
    edges: [
      { fromId: 'q-deep', toId: 'q-ber', omitWhenFocus: 'norman-normandy' },
      { fromId: 'q-ber', toId: 'q-na', omitWhenFocus: 'norman-normandy' },
      { fromId: 'q-na', toId: 'q-sa', omitWhenFocus: 'norman-normandy' },
      { fromId: 'q-norman-q-rare-ill', toId: 'q-norman-cotentin-ill', onlyWhenFocus: 'norman-normandy' },
    ],
    sources: phyloSources('q'),
  },

  S: {
    letter: 'S',
    title: {
      en: 'Haplogroup S — Oceania / Melanesia (check current tree labels)',
      fr: 'Haplogroupe S — Océanie / Mélanésie (vérifiez les libellés d’arbre actuels)',
    },
    summary: {
      en: 'Haplogroup S appears in some public Y-DNA trees as an Oceanic / Melanesian branch; naming and placement can shift relative to broader K2 structure. Cross-check ISOGG and YFull before teaching a specific SNP trail.',
      fr: 'Le haplogroupe S apparaît dans certains arbres Y publics comme une branche océanienne / mélanésienne ; le nom et le placement peuvent évoluer par rapport à la structure élargie K2. Croisez ISOGG et YFull avant d’enseigner un fil SNP précis.',
    },
    nodes: [
      { id: 's-deep', label: 'Southeast Asian stem (illustrative)', lat: -5, lng: 125 },
      { id: 's-png', label: 'New Guinea / Melanesia', lat: -6, lng: 145 },
      { id: 's-mel', label: 'Melanesian islands', lat: -8, lng: 160 },
    ],
    edges: [
      { fromId: 's-deep', toId: 's-png' },
      { fromId: 's-png', toId: 's-mel' },
    ],
    sources: phyloSources('s'),
  },

  T: {
    letter: 'T',
    title: {
      en: 'Haplogroup T — Horn of Africa / Middle East (rare branch)',
      fr: 'Haplogroupe T — Corne de l’Afrique / Moyen-Orient (branche rare)',
    },
    summary: {
      en: 'Haplogroup T is a low-frequency lineage discussed around the Horn of Africa and parts of the Middle East in population-genetics literature. It is unrelated to mitochondrial haplogroup T.',
      fr: 'Le haplogroupe T est une lignée peu fréquente discutée autour de la Corne de l’Afrique et dans certaines régions du Moyen-Orient. Il n’a pas de lien avec l’haplogroupe mitochondrial T.',
    },
    nodes: [
      { id: 't-deep', label: 'Southwest Asia stem (illustrative)', ...SW_ASIA_HUB },
      { id: 't-horn', label: 'Horn of Africa', lat: 9, lng: 42 },
      { id: 't-arab', label: 'Arabian peninsula (illustrative)', lat: 21, lng: 45 },
    ],
    edges: [
      { fromId: 't-deep', toId: 't-horn' },
      { fromId: 't-deep', toId: 't-arab' },
    ],
    sources: phyloSources('t'),
  },

  U: nonstandardLetter('U'),
  V: nonstandardLetter('V'),
  W: nonstandardLetter('W'),
  X: nonstandardLetter('X'),
  Y: nonstandardLetter('Y'),
  Z: nonstandardLetter('Z'),
};
