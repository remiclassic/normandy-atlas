import React from 'react';

const wrapClass = 'companion-figure__svg-inner w-full max-h-[420px] [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-h-[420px]';

/** Filename keys match Markdown paths `/companion/<name>.svg` */
export const COMPANION_INLINE_SVG_FILENAMES = [
  'evidence-ladder.svg',
  'seine-corridor-argument.svg',
  'era-region-state.svg',
] as const;

export type CompanionInlineSvgFilename = (typeof COMPANION_INLINE_SVG_FILENAMES)[number];

export function resolveCompanionInlineFigure(src: string): CompanionInlineSvgFilename | null {
  const normalized = src.split('?')[0] ?? '';
  const file = normalized.split('/').pop();
  if (!file) return null;
  return (COMPANION_INLINE_SVG_FILENAMES as readonly string[]).includes(file)
    ? (file as CompanionInlineSvgFilename)
    : null;
}

export function EvidenceLadderFigure() {
  return (
    <div className={wrapClass}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" fill="none" role="img" aria-labelledby="evidence-ladder-title">
        <title id="evidence-ladder-title">Evidence ladder</title>
        <rect width="640" height="200" fill="var(--color-surface, #13161f)" />
        <path d="M40 160 L320 40 L600 160" stroke="var(--color-gold, #c4a962)" strokeWidth="2" />
        <rect x="48" y="130" width="100" height="36" rx="4" stroke="var(--color-blue, #5b7fa5)" strokeWidth="1.5" fill="var(--color-surface-bright, #1a1e2b)" />
        <text x="98" y="152" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="11" textAnchor="middle">
          Documentary
        </text>
        <rect x="188" y="100" width="100" height="36" rx="4" stroke="var(--color-gold, #c4a962)" strokeWidth="1.5" fill="var(--color-surface-bright, #1a1e2b)" />
        <text x="238" y="122" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="11" textAnchor="middle">
          Synthesis
        </text>
        <rect x="328" y="70" width="100" height="36" rx="4" stroke="var(--color-ember, #a85c3b)" strokeWidth="1.5" fill="var(--color-surface-bright, #1a1e2b)" />
        <text x="378" y="92" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="11" textAnchor="middle">
          Archaeology
        </text>
        <rect x="468" y="40" width="100" height="36" rx="4" stroke="var(--color-text-dim, #5e5a52)" strokeWidth="1.5" fill="var(--color-surface-bright, #1a1e2b)" />
        <text x="518" y="62" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="11" textAnchor="middle">
          Tradition
        </text>
        <text x="320" y="190" fill="var(--color-text-dim, #5e5a52)" fontFamily="system-ui,sans-serif" fontSize="10" textAnchor="middle">
          Route segments declare an evidence class — not all claims climb the ladder equally.
        </text>
      </svg>
    </div>
  );
}

export function SeineCorridorFigure() {
  return (
    <div className={wrapClass}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 280" fill="none" role="img" aria-labelledby="seine-fig-title">
        <title id="seine-fig-title">Seine corridor map argument</title>
        <rect width="640" height="280" fill="var(--color-surface, #13161f)" />
        <text x="320" y="28" fill="var(--color-parchment, #d4c9a8)" fontFamily="Georgia,serif" fontSize="16" textAnchor="middle">
          Static snapshot — Seine hydraulic spine
        </text>
        <path
          d="M80 200 C180 80 280 220 380 100 S520 60 560 140"
          stroke="var(--color-blue, #5b7fa5)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <text x="300" y="210" fill="var(--color-blue, #5b7fa5)" fontFamily="system-ui,sans-serif" fontSize="12" textAnchor="middle">
          River corridor (logistics)
        </text>
        <circle cx="120" cy="168" r="10" stroke="var(--color-gold, #c4a962)" strokeWidth="2" fill="var(--color-surface-bright, #1a1e2b)" />
        <text x="120" y="200" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="10" textAnchor="middle">
          Estuary
        </text>
        <circle cx="380" cy="102" r="10" stroke="var(--color-gold, #c4a962)" strokeWidth="2" fill="var(--color-surface-bright, #1a1e2b)" />
        <text x="380" y="88" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="10" textAnchor="middle">
          Rouen node
        </text>
        <rect x="420" y="40" width="180" height="72" rx="4" stroke="var(--color-ember, #a85c3b)" strokeWidth="1" fill="var(--color-surface-bright, #1a1e2b)" opacity="0.9" />
        <text x="430" y="58" fill="var(--color-ember, #a85c3b)" fontFamily="ui-monospace,monospace" fontSize="9" textAnchor="start">
          MAP ARGUMENT
        </text>
        <text x="430" y="78" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="10" textAnchor="start">
          Wealth pooled along the
        </text>
        <text x="430" y="92" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="10" textAnchor="start">
          lower Seine — raids target
        </text>
        <text x="430" y="106" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="10" textAnchor="start">
          nodes + tidal reach.
        </text>
        <text x="320" y="256" fill="var(--color-text-dim, #5e5a52)" fontFamily="system-ui,sans-serif" fontSize="10" textAnchor="middle">
          Schematic only — use the live atlas for era-specific regions and routes.
        </text>
      </svg>
    </div>
  );
}

export function EraRegionStateFigure() {
  const mid = 'companion-era-region-marker';
  return (
    <div className={wrapClass}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 220" fill="none" role="img" aria-labelledby="companion-era-fig-title">
        <title id="companion-era-fig-title">Era to region state</title>
        <defs>
          <marker id={mid} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="var(--color-text-dim, #5e5a52)" />
          </marker>
        </defs>
        <rect width="640" height="220" fill="var(--color-surface, #13161f)" />
        <text x="320" y="28" fill="var(--color-parchment, #d4c9a8)" fontFamily="Georgia,serif" fontSize="16" textAnchor="middle">
          Era selection → region emphasis
        </text>
        <rect x="40" y="60" width="140" height="48" rx="6" stroke="var(--color-gold, #c4a962)" strokeWidth="2" fill="var(--color-surface-bright, #1a1e2b)" />
        <text x="110" y="90" fill="var(--color-parchment, #d4c9a8)" fontFamily="ui-monospace,monospace" fontSize="12" textAnchor="middle">
          ERA
        </text>
        <path d="M190 84 L250 84" stroke="var(--color-text-dim, #5e5a52)" strokeWidth="2" markerEnd={`url(#${mid})`} />
        <rect x="260" y="60" width="160" height="48" rx="6" stroke="var(--color-blue, #5b7fa5)" strokeWidth="1.5" fill="var(--color-surface-bright, #1a1e2b)" />
        <text x="340" y="90" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="11" textAnchor="middle">
          visibility · border · fillIntent
        </text>
        <path d="M430 84 L490 84" stroke="var(--color-text-dim, #5e5a52)" strokeWidth="2" markerEnd={`url(#${mid})`} />
        <rect x="500" y="60" width="120" height="48" rx="6" stroke="var(--color-ember, #a85c3b)" strokeWidth="1.5" fill="var(--color-surface-bright, #1a1e2b)" />
        <text x="560" y="90" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="11" textAnchor="middle">
          camera
        </text>
        <text x="320" y="150" fill="var(--color-text-muted, #9a968e)" fontFamily="system-ui,sans-serif" fontSize="11" textAnchor="middle">
          Optional: simulated year further gates colonial polygons (e.g. post-1713).
        </text>
        <text x="320" y="190" fill="var(--color-text-dim, #5e5a52)" fontFamily="system-ui,sans-serif" fontSize="10" textAnchor="middle">
          Same polygon id can change weight across eras — read the legend, not only the colour.
        </text>
      </svg>
    </div>
  );
}

const FIGURE_MAP: Record<CompanionInlineSvgFilename, React.FC> = {
  'evidence-ladder.svg': EvidenceLadderFigure,
  'seine-corridor-argument.svg': SeineCorridorFigure,
  'era-region-state.svg': EraRegionStateFigure,
};

export function CompanionInlineFigure({ name }: { name: CompanionInlineSvgFilename }) {
  const Cmp = FIGURE_MAP[name];
  return <Cmp />;
}
