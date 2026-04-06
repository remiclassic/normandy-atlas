import type { RegionalHaplogroupSnapshot } from '@/core/types';

/** Paternal modern proxy for native Cotentin men — links regional pie panel to the Norman Y-DNA deep read. */
export const COTENTIN_NORMAN_Y_SNAPSHOT_ID = 'cotentin-norman-y-modern' as const;

/**
 * Curated time-sliced snapshots (Tier A / C). Tier B (Francogene) is built in core from {@link getNfYdnaMajorHaplogroupDistribution}.
 *
 * Synthesis rows are explicitly low-confidence teaching schematics — not primary tabulations.
 */
export const staticRegionalHaplogroupSnapshots: RegionalHaplogroupSnapshot[] = [
  {
    id: 'synth-viking-scandinavia-y',
    regionId: 'scandinavian-homeland',
    lineageType: 'paternal',
    window: {
      startYear: 750,
      endYear: 1050,
      label: {
        en: 'Viking Age (Scandinavia)',
        fr: 'Âge des Vikings (Scandinavie)',
      },
    },
    evidenceKind: 'synthesis-estimate',
    confidence: 'low',
    sampleN: undefined,
    methodologyNote: {
      en: 'Best-guess schematic: Viking Age Scandinavian contexts in ancient genomics often show a predominance of I1 and R lineages with meaningful R1a share (e.g. Margaryan et al. 2020 Viking-world compendium). This pie is not a hand-counted supplement table; it is an order-of-magnitude teaching blend. Check primary data before citing percentages.',
      fr: 'Schéma indicatif : les contextes scandinaves de l’Âge des Vikings montrent souvent une prédominance d’I1 et de lignées R avec une part notable de R1a (p. ex. le corpus « Viking world » de Margaryan et al., 2020). Ce diagramme n’est pas un dénombrement des tableaux supplémentaires ; c’est une fusion pédagogique d’ordre de grandeur. Vérifiez les données primaires avant de citer des pourcentages.',
    },
    slices: [
      { label: 'I1', pct: 38, color: '#4898e0', lineageProfileId: 'y-i1' },
      { label: 'R1b', pct: 34, color: '#4a90d9', lineageProfileId: 'y-r1b' },
      { label: 'R1a', pct: 16, color: '#7eb8da', lineageProfileId: 'y-r1a' },
      { label: 'I2', pct: 7, color: '#5ba3c6', lineageProfileId: 'y-i2a' },
      { label: 'Other', pct: 5, color: '#6b7280' },
    ],
    sources: [
      {
        id: 'margaryan-viking-2020',
        title: 'Margaryan et al. — Population genomics of the Viking world (Nature, 2020)',
        url: 'https://doi.org/10.1038/s41586-020-2688-8',
        note: 'Interpretive synthesis; verify counts in supplementary materials.',
      },
    ],
  },
  {
    id: 'synth-viking-danelaw-y',
    regionId: 'danelaw',
    lineageType: 'paternal',
    window: {
      startYear: 850,
      endYear: 1050,
      label: {
        en: 'Viking–period England (Scandinavian-associated signal)',
        fr: 'Angleterre d’époque viking (signal associé à la Scandinavie)',
      },
    },
    evidenceKind: 'synthesis-estimate',
    confidence: 'low',
    methodologyNote: {
      en: 'Best guess for male-line mix in archaeogenetic stories tying some Viking Age burials in Britain to Scandinavian-related ancestry (same broad literature as the Viking world paper). Local Iron Age R1b is abundant too — this schematic emphasizes Norse-leaning patterns often highlighted in outreach, not a cemetery census.',
      fr: 'Estimation indicative du mélange de lignées paternelles dans les récits archéogénétiques liant certaines sépultures de l’Âge des Vikings en Grande-Bretagne à une ascendance apparentée à la Scandinavie (même littérature large que l’article « Viking world »). Le R1b des populations locales de l’Âge du fer est aussi abondant — ce schéma met l’accent sur des motifs souvent qualifiés de « nordiques » dans la vulgarisation, pas sur un recensement de nécropole.',
    },
    slices: [
      { label: 'I1', pct: 42, color: '#4898e0', lineageProfileId: 'y-i1' },
      { label: 'R1b', pct: 30, color: '#4a90d9', lineageProfileId: 'y-r1b' },
      { label: 'R1a', pct: 14, color: '#7eb8da', lineageProfileId: 'y-r1a' },
      { label: 'I2', pct: 9, color: '#5ba3c6', lineageProfileId: 'y-i2a' },
      { label: 'Other', pct: 5, color: '#6b7280' },
    ],
    sources: [
      {
        id: 'margaryan-viking-2020-danelaw',
        title: 'Margaryan et al. — Viking world (context for mobility into Britain)',
        url: 'https://doi.org/10.1038/s41586-020-2688-8',
      },
    ],
  },
  {
    id: COTENTIN_NORMAN_Y_SNAPSHOT_ID,
    regionId: 'normandy',
    lineageType: 'paternal',
    window: {
      startYear: 2010,
      endYear: 2016,
      label: {
        en: 'Modern Y-DNA — native Cotentin men (89-sample survey)',
        fr: 'ADN-Y moderne — hommes autochtones du Cotentin (enquête, 89)',
      },
    },
    evidenceKind: 'modern-cohort-proxy',
    confidence: 'medium',
    sampleN: 89,
    methodologyNote: {
      en: 'Shares are from a published synthesis of Y-chromosome haplogroups among 89 men from the Cotentin Peninsula with long local patrilines (Viking DNA / regional genetics outreach, often tied to University of Leicester and Université de Caen collaboration). This is modern DNA, not a random French sample nor ancient DNA from medieval burials. The “Other” slice pools Mediterranean, Neolithic, and rare branches (E, G, J, N, Q, etc.). Treat as a teaching proxy for Norse-era mixing, not a definitive medieval census.',
      fr: 'Les parts proviennent d’une synthèse publiée sur les haplogroupes Y chez 89 hommes du Cotentin aux patronymes localisés (projet / vulgarisation « ADN viking », souvent lié à Leicester et à l’université de Caen). Il s’agit d’ADN moderne, pas d’un échantillon aléatoire français ni d’ADN ancien médiéval. La tranche « Autres » regroupe branches méditerranéennes, néolithiques et rares (E, G, J, N, Q, etc.). À utiliser comme repère pédagogique sur le métissage d’époque viking, pas comme recensement médiéval définitif.',
    },
    slices: [
      { label: 'R1b', pct: 58, color: '#4a90d9', lineageProfileId: 'y-r1b' },
      { label: 'Other', pct: 24, color: '#6b7280' },
      { label: 'I1', pct: 12, color: '#4898e0', lineageProfileId: 'y-i1' },
      { label: 'I2', pct: 4, color: '#5ba3c6', lineageProfileId: 'y-i2a' },
      { label: 'R1a', pct: 2, color: '#7eb8da', lineageProfileId: 'y-r1a' },
    ],
    sources: [
      {
        id: 'hagdik-cotentin-ydna',
        title: 'Société historique Hag’Dik — Sur la trace génétique des Vikings en Normandie : l’ADN cotentinois parle',
        url: 'https://hagdik.fr/sur-la-trace-des-vikings-ladn-cotentinois-parle/',
      },
      {
        id: 'wikipedia-normandie-colonisation',
        title: 'Wikipédia — Colonisation de la Normandie',
        url: 'https://fr.wikipedia.org/wiki/Colonisation_de_la_Normandie',
      },
      {
        id: 'margaryan-viking-2020-cotentin',
        title: 'Margaryan et al. — Population genomics of the Viking world (Nature, 2020)',
        url: 'https://doi.org/10.1038/s41586-020-2688-8',
        note: 'aDNA context for Viking-era I1 / R distributions in Scandinavia and diaspora.',
      },
    ],
  },
  {
    id: 'synth-neustria-mtdna-pool',
    regionId: 'neustria',
    lineageType: 'maternal',
    window: {
      startYear: -2000,
      endYear: 500,
      label: {
        en: 'Northern Gaul (Neolithic → late antiquity schematic mtDNA pool)',
        fr: 'Gaule septentrionale (schéma ADNmt : néolithique → fin de l’Antiquité)',
      },
    },
    evidenceKind: 'synthesis-estimate',
    confidence: 'low',
    methodologyNote: {
      en: 'Highly simplified western European mtDNA pool for teaching: farmer-associated H lineages are common in published Neolithic/Bronze Age France (e.g. Brunel et al. 2020 and related compendia), with deep U lineages and other Mediterranean-linked branches — exact shares vary by site and period. This is a best guess, not a supplement table.',
      fr: 'Pool ADNmt d’Europe occidentale très simplifié à visée pédagogique : les lignées H associées aux premiers agriculteurs sont fréquentes dans la France néolithique / âge du bronze publiée (p. ex. Brunel et al. 2020 et corpus apparentés), avec des lignées U profondes et d’autres branches liées à la Méditerranée — les parts exactes varient selon les sites et les périodes. Il s’agit d’une estimation indicative, pas d’un tableau supplémentaire.',
    },
    slices: [
      { label: 'H', pct: 36, color: '#e05555', lineageProfileId: 'mt-h' },
      { label: 'U (incl. U5)', pct: 28, color: '#6b9b7a', lineageProfileId: 'mt-u5' },
      { label: 'K', pct: 12, color: '#c9a227', lineageProfileId: 'mt-k1' },
      { label: 'J', pct: 11, color: '#b565a7' },
      { label: 'Other', pct: 13, color: '#6b7280' },
    ],
    sources: [
      {
        id: 'brunel-france-2020',
        title: 'Brunel et al. — Ancient genomes from present-day France (PNAS, 2020)',
        url: 'https://doi.org/10.1073/pnas.1918034117',
        note: 'Qualitative regional deep-time framing; pie is editorial.',
      },
    ],
  },
];
