import type {
  LineageType,
  RegionalHaplogroupSnapshot,
  RegionalHaplogroupSlice,
} from '@/core/types';
import { staticRegionalHaplogroupSnapshots } from '@/data/atlas/lineage/regional-haplogroup-snapshots-data';
import type { YdnaMajor } from '@/data/atlas/new-france-ydna-types';
import { getNfYdnaMajorHaplogroupDistribution } from '@/lib/nf-ydna-major-haplogroup-stats';

/** Regions surfaced in the Lineage Explorer pie panel (Norman-corridor scope). */
export const REGIONAL_HAPLOGROUP_PIE_REGION_IDS: readonly string[] = [
  'normandy',
  'brittany',
  'neustria',
  'channel-coast',
  'channel-trade-zone',
  'perche',
  'lower-seine',
  'danelaw',
  'scandinavian-homeland',
  'new-france',
  'acadia',
] as const;

const Y_MAJOR_COLORS: Record<YdnaMajor, string> = {
  R1b: '#4a90d9',
  R1a: '#7eb8da',
  I1: '#4898e0',
  I2: '#5ba3c6',
  G2: '#3cb870',
  J1: '#c9a227',
  J2: '#d4b84a',
  E1b: '#b565a7',
  N: '#50b8b8',
  C: '#889098',
  Q: '#c67b5c',
  T: '#9aab8c',
  L: '#8b7355',
  Other: '#6b7280',
};

function yMajorToProfileId(m: YdnaMajor): string | undefined {
  switch (m) {
    case 'R1b':
      return 'y-r1b';
    case 'R1a':
      return 'y-r1a';
    case 'I1':
      return 'y-i1';
    case 'I2':
      return 'y-i2a';
    case 'J2':
      return 'y-j2';
    case 'E1b':
      return 'y-e1b1b';
    default:
      return undefined;
  }
}

function buildFrancogenePaternalSnapshots(): RegionalHaplogroupSnapshot[] {
  const { totalCounted, rows } = getNfYdnaMajorHaplogroupDistribution();
  const slices: RegionalHaplogroupSlice[] = rows
    .filter((r) => r.pct > 0)
    .map((r) => ({
      label: r.yMajor,
      pct: r.pct,
      color: Y_MAJOR_COLORS[r.yMajor],
      lineageProfileId: yMajorToProfileId(r.yMajor),
    }));

  const sources = [
    {
      id: 'francogene-triangulation',
      title: 'Francogene — Y-DNA Triangulation Catalogue',
      url: 'https://www.francogene.com/triangulation/y.php',
    },
  ] as const;

  const window = {
    startYear: 1990,
    endYear: new Date().getFullYear(),
    label: {
      en: 'Modern Y-DNA tests (triangulated colonial patrilines)',
      fr: 'Tests ADN-Y modernes (patrilignées coloniales triangulées)',
    },
  };

  const methodologyBase = {
    en: `Percentages are shares among ${totalCounted.toLocaleString()} triangulated (confirmed) Y-DNA catalogue entries in the primary Norman Atlas patriline layer — presumed Y-DNA ingested separately is excluded from this pie. Counts omit rows hidden from the map layer. They reflect modern testers inferred to descend from specific colonial figures — not ancient DNA from medieval Normandy and not a random sample of today’s population.`,
    fr: `Les pourcentages sont des parts parmi ${totalCounted.toLocaleString()} entrées ADN-Y triangulées (confirmées) du catalogue principal sur la couche des patrilignées — l’ADN-Y présumé ingéré à part est exclu de ce diagramme. Les lignées masquées sur la carte sont exclues. Ils reflètent des testeurs modernes inférés comme descendants de figures coloniales précises — pas de l’ADN ancien de la Normandie médiévale ni d’un échantillon aléatoire de la population actuelle.`,
  };

  return [
    {
      id: 'francogene-new-france-y',
      regionId: 'new-france',
      lineageType: 'paternal',
      window,
      evidenceKind: 'modern-cohort-proxy',
      confidence: 'medium',
      sampleN: totalCounted,
      methodologyNote: methodologyBase,
      slices,
      sources: [...sources],
    },
    {
      id: 'francogene-acadia-y',
      regionId: 'acadia',
      lineageType: 'paternal',
      window,
      evidenceKind: 'modern-cohort-proxy',
      confidence: 'medium',
      sampleN: totalCounted,
      methodologyNote: {
        en: `${methodologyBase.en} The same catalogue underpins Acadia-anchor jitter on the map; regional label “Acadia” here does not mean the row is exclusive to Acadian genealogies.`,
        fr: `${methodologyBase.fr} Le même catalogue soutient le jitter des ancres acadiennes sur la carte ; l’étiquette régionale « Acadia » ne signifie pas que la lignée est exclusive aux généalogies acadiennes.`,
      },
      slices,
      sources: [...sources],
    },
  ];
}

let mergedSnapshots: RegionalHaplogroupSnapshot[] | null = null;

export function listRegionalHaplogroupSnapshots(): readonly RegionalHaplogroupSnapshot[] {
  if (!mergedSnapshots) {
    mergedSnapshots = [...staticRegionalHaplogroupSnapshots, ...buildFrancogenePaternalSnapshots()];
  }
  return mergedSnapshots;
}

export function getRegionalHaplogroupSnapshotsForRegion(
  regionId: string,
  lineageType: LineageType,
): RegionalHaplogroupSnapshot[] {
  return listRegionalHaplogroupSnapshots().filter(
    (s) => s.regionId === regionId && s.lineageType === lineageType,
  );
}

export function regionalHaplogroupPieAllowlistHas(regionId: string): boolean {
  return REGIONAL_HAPLOGROUP_PIE_REGION_IDS.includes(regionId);
}
