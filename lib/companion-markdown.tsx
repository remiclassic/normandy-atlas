import React from 'react';
import Link from 'next/link';
import AtlasContractManifesto from '@/components/companion/AtlasContractManifesto';
import { EvidenceStamp } from '@/components/companion/EvidenceStamp';
import { publicAssetUrl } from '@/lib/public-asset-url';
import {
  CompanionInlineFigure,
  resolveCompanionInlineFigure,
} from '@/components/companion/CompanionInlineFigures';

function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

/** Split by :evidence:level, **bold**, `code`, [links](href) */
function renderInline(text: string, keyBase: string): React.ReactNode {
  const parts = text.split(/(:evidence:[a-z_]+|`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((chunk, i) => {
    const k = `${keyBase}-i${i}`;
    const ev = chunk.match(/^:evidence:([a-z_]+)$/i);
    if (ev) {
      return <EvidenceStamp key={k} level={ev[1] ?? ''} />;
    }
    if (chunk.startsWith('`') && chunk.endsWith('`') && chunk.length >= 2) {
      return (
        <code key={k} className="companion-code rounded px-1 py-px font-mono text-[length:var(--atlas-text-sm)]">
          {chunk.slice(1, -1)}
        </code>
      );
    }
    if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length >= 4) {
      return (
        <strong key={k} className="font-semibold" style={{ color: 'var(--color-parchment)' }}>
          {chunk.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = chunk.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      if (!href) return <React.Fragment key={k}>{chunk}</React.Fragment>;
      if (href.startsWith('http://') || href.startsWith('https://')) {
        return (
          <a
            key={k}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors"
            style={{ color: 'var(--color-gold)' }}
          >
            {label}
          </a>
        );
      }
      return (
        <Link key={k} href={href} className="underline underline-offset-2 transition-colors" style={{ color: 'var(--color-gold)' }}>
          {label}
        </Link>
      );
    }
    return <React.Fragment key={k}>{chunk}</React.Fragment>;
  });
}

function parseFenceHeader(line: string): { kind: string; variant?: string } | null {
  const m = line.trim().match(/^:::([\w-]+)(?:\s+([\w-]+))?\s*$/);
  if (!m) return null;
  return { kind: m[1] ?? '', variant: m[2] };
}

function renderFenceBody(body: string, keyBase: string): React.ReactNode[] {
  const chunks = body.trim().split(/\n\n+/);
  const out: React.ReactNode[] = [];
  let j = 0;
  for (const chunk of chunks) {
    const lines = chunk.split('\n').map((l) => l.trim());
    if (lines.every((l) => l.startsWith('- '))) {
      out.push(
        <ul key={`${keyBase}-ul-${j++}`} className="companion-callout-list my-2 list-disc space-y-1 pl-4 text-[length:var(--atlas-text-md)]">
          {lines.map((l, idx) => (
            <li key={idx} style={{ color: 'var(--color-text-muted)' }}>
              {renderInline(l.slice(2), `${keyBase}-uli-${idx}`)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }
    out.push(
      <p key={`${keyBase}-p-${j++}`} className="my-2 text-[length:var(--atlas-text-md)] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
        {renderInline(lines.join(' '), `${keyBase}-pp`)}
      </p>,
    );
  }
  return out;
}

function TacticalCallout({
  variant,
  title,
  children,
  roleLabel,
}: {
  variant: 'atlas-ui' | 'scenario-brief' | 'evidence';
  title: string;
  children: React.ReactNode;
  roleLabel: string;
}) {
  const cls =
    variant === 'atlas-ui'
      ? 'companion-callout companion-callout--atlas-ui'
      : variant === 'scenario-brief'
        ? 'companion-callout companion-callout--scenario'
        : 'companion-callout companion-callout--evidence';
  return (
    <aside className={cls} role="note" aria-label={roleLabel}>
      <div className="companion-callout__eyebrow">{title}</div>
      <div className="companion-callout__body">{children}</div>
    </aside>
  );
}

function isBlockStart(line: string): boolean {
  const t = line.trim();
  return (
    t.startsWith('# ') ||
    t.startsWith('## ') ||
    t.startsWith('### ') ||
    t.startsWith('- ') ||
    t.startsWith(':::') ||
    t === '---' ||
    /^!\[[^\]]*\]\([^)]+\)\s*$/.test(t)
  );
}

export function CompanionMarkdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let blk = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }

    const fenceOpen = parseFenceHeader(line);
    if (fenceOpen) {
      const { kind, variant } = fenceOpen;
      i += 1;
      const bodyLines: string[] = [];
      while (i < lines.length && lines[i].trim() !== ':::') {
        bodyLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length && lines[i].trim() === ':::') i += 1;
      const body = bodyLines.join('\n');

      if (kind === 'manifesto') {
        blocks.push(<AtlasContractManifesto key={`b${blk++}`} />);
        continue;
      }

      if (kind === 'atlas-ui') {
        blocks.push(
          <TacticalCallout key={`b${blk++}`} variant="atlas-ui" title="Atlas / UI" roleLabel="Atlas UI instructions">
            {renderFenceBody(body, `fence-${blk}`)}
          </TacticalCallout>,
        );
        continue;
      }

      if (kind === 'scenario-brief') {
        blocks.push(
          <TacticalCallout key={`b${blk++}`} variant="scenario-brief" title="Mission briefing" roleLabel="Scenario mission briefing">
            {renderFenceBody(body, `fence-${blk}`)}
          </TacticalCallout>,
        );
        continue;
      }

      if (kind === 'evidence' && variant) {
        blocks.push(
          <TacticalCallout key={`b${blk++}`} variant="evidence" title="Evidence grade" roleLabel="Evidence level note">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
              <EvidenceStamp level={variant} />
              <div className="min-w-0 flex-1">{renderFenceBody(body, `fence-${blk}`)}</div>
            </div>
          </TacticalCallout>,
        );
        continue;
      }

      blocks.push(
        <pre key={`b${blk++}`} className="companion-fence-unknown my-4 overflow-x-auto rounded p-3 font-mono text-[length:var(--atlas-text-sm)]">
          :::{kind} {variant ?? ''}
          {body}
        </pre>,
      );
      continue;
    }

    const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (imgMatch) {
      const [, alt, src] = imgMatch;
      const resolvedSrc = publicAssetUrl(src);
      const inlineName = resolveCompanionInlineFigure(src) ?? resolveCompanionInlineFigure(resolvedSrc);
      blocks.push(
        <figure key={`b${blk++}`} className="companion-figure companion-print-break-inside-avoid my-8">
          {inlineName ? (
            <div className="companion-figure__img max-h-[420px] w-full rounded border object-contain p-2" style={{ borderColor: 'var(--color-border-bright)' }}>
              <CompanionInlineFigure name={inlineName} />
            </div>
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resolvedSrc} alt={alt ?? ''} className="companion-figure__img max-h-[420px] w-full rounded border object-contain" style={{ borderColor: 'var(--color-border-bright)' }} />
            </>
          )}
          {alt ? (
            <figcaption className="mt-2 text-center text-[length:var(--atlas-text-sm)]" style={{ color: 'var(--color-text-dim)' }}>
              {alt}
            </figcaption>
          ) : null}
        </figure>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <h3
          key={`b${blk++}`}
          className="companion-heading-h3 mt-8 mb-3 scroll-mt-24 font-display font-semibold uppercase tracking-[0.04em]"
          style={{ color: 'var(--color-gold-muted)' }}
        >
          {renderInline(line.slice(4).trim(), `h3-${blk}`)}
        </h3>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      const label = line.slice(3).trim();
      blocks.push(
        <h2
          key={`b${blk++}`}
          id={slugifyHeading(label)}
          className="companion-h2 companion-heading-h2 mt-12 mb-4 scroll-mt-24 border-b pb-2 font-display font-semibold uppercase tracking-[0.05em]"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-gold)' }}
        >
          {renderInline(label, `h2-${blk}`)}
        </h2>,
      );
      i += 1;
      continue;
    }

    if (line.startsWith('# ')) {
      blocks.push(
        <h1
          key={`b${blk++}`}
          className="companion-heading-h1 mt-2 mb-6 font-display font-semibold uppercase leading-tight tracking-[0.05em]"
          style={{ color: 'var(--color-gold)' }}
        >
          {renderInline(line.slice(2).trim(), `h1-${blk}`)}
        </h1>,
      );
      i += 1;
      continue;
    }

    if (line.trim() === '---') {
      blocks.push(<hr key={`b${blk++}`} className="my-10" style={{ borderColor: 'var(--color-border)' }} />);
      i += 1;
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2).trim());
        i += 1;
      }
      blocks.push(
        <ul key={`b${blk++}`} className="my-4 list-disc space-y-2 pl-6 text-[length:var(--atlas-text-md)] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {items.map((t, j) => (
            <li key={j}>{renderInline(t, `li-${blk}-${j}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    const paras: string[] = [line.trim()];
    i += 1;
    while (i < lines.length && lines[i].trim() !== '' && !isBlockStart(lines[i])) {
      paras.push(lines[i].trim());
      i += 1;
    }
    blocks.push(
      <p key={`b${blk++}`} className="my-4 text-[length:var(--atlas-text-md)] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
        {renderInline(paras.join(' '), `p-${blk}`)}
      </p>,
    );
  }

  return <div className="companion-md companion-narrative max-w-[46rem]">{blocks}</div>;
}
