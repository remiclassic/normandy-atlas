'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { getNfMtdnaFeature } from '@/data/atlas/gfna-mtdna-lineages';
import { gfnaFamilySheetUrl } from '@/data/atlas/gfna-dna-types';

function ContentFade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-3">{children}</h3>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-4">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-dim w-20 flex-shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm text-text/90">{value}</span>
    </div>
  );
}

const MTDNA_ACCENT = '#e879a8';

export default function MtDnaLineageDetail({ id }: { id: string }) {
  const feature = useMemo(() => getNfMtdnaFeature(id), [id]);

  if (!feature) return null;

  const {
    displayLabel,
    surname,
    marriageYear,
    spouse,
    mtHaplogroup,
    gfnaStatus,
    sourcePage,
    familySheetNo,
  } = feature.properties;

  const statusLabel = gfnaStatus === 'presumed' ? 'Presumed (not triangulated)' : 'Triangulated / confirmed';

  const primarySource =
    sourcePage?.trim() ||
    'https://www.francogene.com/gfna/gfna/998/adnmt.html';

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md border"
              style={{
                color: `${MTDNA_ACCENT}cc`,
                background: `${MTDNA_ACCENT}12`,
                borderColor: `${MTDNA_ACCENT}30`,
              }}
            >
              mtDNA lineage
            </span>
            <span
              className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md border border-text-dim/25 text-text-dim"
            >
              {statusLabel}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {displayLabel}
          </h2>
          <p className="text-[13px] text-text-muted">{surname} maternal line</p>
        </ContentFade>
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          <FactRow label="Marriage" value={String(marriageYear)} />
          <FactRow label="Spouse" value={spouse} />
          <FactRow label="Haplogroup" value={mtHaplogroup} />
        </div>
      </ContentFade>

      <div className="divider-fade mx-7" />

      <ContentFade delay={0.14}>
        <div className="px-7 py-5">
          <SectionLabel>Methodology</SectionLabel>
          <p className="text-[12px] leading-relaxed text-text-dim">
            Mitochondrial DNA passes from mother to child. Atlas points mirror Francogene / GFNA maternal-line
            compilations when ingested via{' '}
            <code className="text-[11px] text-text-muted">gfna-dna-records.jsonl</code> — not ancient DNA from
            burials.
          </p>
        </div>
      </ContentFade>

      <div className="divider-fade mx-7" />

      <ContentFade delay={0.18}>
        <div className="px-7 py-5 pb-8 space-y-3">
          <SectionLabel>Sources</SectionLabel>
          <a
            href={primarySource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-gold/70 hover:text-gold transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M10.5 7.5V11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1h3.5M8 2h4v4M6 8l6-6"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            GFNA mtDNA reference page
          </a>
          {familySheetNo ? (
            <a
              href={gfnaFamilySheetUrl(familySheetNo)}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[12px] text-rose-300/80 hover:text-rose-200 transition-colors"
            >
              Family sheet #{familySheetNo} (Francogene)
            </a>
          ) : null}
        </div>
      </ContentFade>
    </>
  );
}
