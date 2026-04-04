import type { EvidenceLevel } from '@/core/types';

const LEVELS: readonly EvidenceLevel[] = [
  'documentary_cluster',
  'synthesis',
  'archaeological',
  'tradition',
];

const LABELS: Record<EvidenceLevel, string> = {
  documentary_cluster: 'Documentary',
  synthesis: 'Synthesis',
  archaeological: 'Archaeology',
  tradition: 'Tradition',
};

const SHORT_HINT: Record<EvidenceLevel, string> = {
  documentary_cluster: 'Textual cluster (charters, annals, rolls).',
  synthesis: 'Historian-integrated interpretation.',
  archaeological: 'Material context (dig, survey, dating).',
  tradition: 'Later memory or folklore—handle with care.',
};

function parseLevel(raw: string): EvidenceLevel | null {
  const k = raw.trim().toLowerCase();
  if (LEVELS.includes(k as EvidenceLevel)) return k as EvidenceLevel;
  if (k === 'documentary') return 'documentary_cluster';
  return null;
}

function IconDoc({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="3" y="2" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 5h6M5 8h6M5 11h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function IconSynth({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M3 9h12M9 3v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function IconArch({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 14V8M5 12l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 15h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconTrad({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M4 13c2-3 4-6 5-8 1.5 3 3 5 5 7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="6" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconFor({ level }: { level: EvidenceLevel }) {
  switch (level) {
    case 'documentary_cluster':
      return <IconDoc />;
    case 'synthesis':
      return <IconSynth />;
    case 'archaeological':
      return <IconArch />;
    case 'tradition':
      return <IconTrad />;
    default:
      return <IconSynth />;
  }
}

export function EvidenceStamp({ level: raw }: { level: string }) {
  const level = parseLevel(raw);
  if (!level) return <span className="font-mono text-[length:var(--atlas-text-sm)] text-amber-200/80">{`:evidence:${raw}`}</span>;

  return (
    <span
      className={`companion-evidence companion-evidence--${level} inline-flex items-center gap-1.5 rounded border px-2 py-0.5 align-middle font-mono text-[length:var(--atlas-text-xs)] uppercase tracking-wider`}
      title={SHORT_HINT[level]}
    >
      <span className="companion-evidence__icon" aria-hidden>
        <IconFor level={level} />
      </span>
      {LABELS[level]}
    </span>
  );
}

export function isEvidenceLevelString(s: string): s is EvidenceLevel {
  return parseLevel(s) !== null;
}
