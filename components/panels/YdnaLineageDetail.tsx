'use client';

import { useMemo, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { getNfYdnaFeature } from '@/data/atlas/new-france-ydna';
import { getNfYdnaPresumedFeature } from '@/data/atlas/gfna-ydna-presumed';
import { HAPLO_COLORS } from '@/components/map/new-france-ydna-layers';
import { GENETIC_ORIGIN_LABELS, GENETIC_ORIGIN_COLORS } from '@/data/atlas/new-france-ydna-types';
import type { GeneticConfidence } from '@/data/atlas/new-france-ydna-types';
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
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold/50 mb-3">
      {children}
    </h3>
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

const YDNA_INFO: Record<string, { name: string; desc: string }> = {
  R1b: { name: 'R1b', desc: 'The most common Western European Y-DNA haplogroup, widespread in France, the British Isles, and Iberia.' },
  R1a: { name: 'R1a', desc: 'Associated with Northern and Eastern European ancestry; found at lower frequencies in Western France.' },
  I1:  { name: 'I1',  desc: 'A Scandinavian-origin haplogroup; its presence in New France may reflect Norse-origin Norman lineages.' },
  I2:  { name: 'I2',  desc: 'Found across Western and Southeastern Europe; one of the older European haplogroups.' },
  G2:  { name: 'G2',  desc: 'An ancient lineage associated with early Neolithic farmers who spread across Europe.' },
  J1:  { name: 'J1',  desc: 'Primarily associated with the Middle East and Mediterranean basin.' },
  J2:  { name: 'J2',  desc: 'Common in the Mediterranean, Near East, and Southern Europe; found in French populations at low frequencies.' },
  E1b: { name: 'E1b', desc: 'Widespread across Africa, the Mediterranean, and Southern Europe.' },
  N:   { name: 'N',   desc: 'Found primarily in Northern Eurasia and among Finno-Ugric populations.' },
  C:   { name: 'C',   desc: 'Rare in Western Europe; associated with Central Asian and Siberian populations.' },
  Q:   { name: 'Q',   desc: 'Primarily associated with Indigenous peoples of the Americas and Central Asia.' },
  T:   { name: 'T',   desc: 'A rare haplogroup found at low frequencies across Europe, the Middle East, and East Africa.' },
  L:   { name: 'L',   desc: 'Primarily associated with South Asian and Middle Eastern populations.' },
  Other: { name: 'Other', desc: 'An uncommon or unclassified major haplogroup.' },
};

const CONFIDENCE_LABELS: Record<GeneticConfidence, string> = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence',
};

const FRANCOGENE_BASE = 'https://www.francogene.com/triangulation/y.php';

export default function YdnaLineageDetail({ id }: { id: string }) {
  const feature = useMemo(
    () => getNfYdnaFeature(id) ?? getNfYdnaPresumedFeature(id),
    [id],
  );
  const [showEducation, setShowEducation] = useState(false);
  const toggleEd = useCallback(() => setShowEducation((v) => !v), []);

  if (!feature) return null;

  const {
    displayLabel,
    surname,
    marriageYear,
    spouse,
    yHaplogroup,
    yMajor,
    triId,
    geneticOrigin,
    geneticConfidence,
    gfnaStatus,
    sourcePage,
    familySheetNo,
  } = feature.properties;
  const color = HAPLO_COLORS[yMajor] ?? HAPLO_COLORS.Other;
  const info = YDNA_INFO[yMajor] ?? YDNA_INFO.Other;
  const originColor = GENETIC_ORIGIN_COLORS[geneticOrigin] ?? GENETIC_ORIGIN_COLORS.other;
  const originLabel = GENETIC_ORIGIN_LABELS[geneticOrigin] ?? GENETIC_ORIGIN_LABELS.other;

  return (
    <>
      <div className="px-7 pt-7 pb-5">
        <ContentFade>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md border"
              style={{ color: `${color}cc`, background: `${color}0f`, borderColor: `${color}25` }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2.5" fill={color} opacity="0.7" />
              </svg>
              Y-DNA Lineage
            </span>
            <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border border-text-dim/30 text-text-dim">
              {gfnaStatus === 'presumed' ? 'Presumed' : 'Triangulated'}
            </span>
            <span
              className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md border"
              style={{ color: `${color}bb`, background: `${color}08`, borderColor: `${color}18` }}
            >
              {yMajor}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md border"
              style={{ color: `${originColor}cc`, background: `${originColor}0f`, borderColor: `${originColor}25` }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="2.5" fill={originColor} opacity="0.7" />
              </svg>
              {originLabel}
            </span>
          </div>
        </ContentFade>

        <ContentFade delay={0.05}>
          <h2 className="text-[26px] font-display font-bold text-parchment leading-tight mb-1.5 tracking-[-0.01em]">
            {displayLabel}
          </h2>
          <p className="text-[13px] text-text-muted">{surname} lineage</p>
        </ContentFade>
      </div>

      <div className="accent-line-gold mx-7" />

      <ContentFade delay={0.1}>
        <div className="px-7 py-5 space-y-3">
          <FactRow label="Marriage" value={String(marriageYear)} />
          <FactRow label="Spouse" value={spouse} />
          <FactRow label="Haplogroup" value={yHaplogroup} />
          <FactRow label="Major group" value={info.name} />
          <FactRow label="Origin" value={`${originLabel} — ${CONFIDENCE_LABELS[geneticConfidence]}`} />
          <FactRow label="Source ID" value={triId} />
        </div>
      </ContentFade>

      <div className="divider-fade mx-7" />

      <ContentFade delay={0.14}>
        <div className="px-7 py-5">
          <SectionLabel>About {info.name}</SectionLabel>
          <p className="text-[13px] leading-relaxed text-text-muted">{info.desc}</p>

          <button
            type="button"
            onClick={toggleEd}
            className="mt-4 text-[11px] font-medium tracking-wide text-gold/60 hover:text-gold/80 transition-colors cursor-pointer"
          >
            {showEducation ? 'Hide Y-DNA explainer' : 'What is Y-DNA?'}
          </button>

          {showEducation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 text-[12px] leading-relaxed text-text-dim space-y-2"
            >
              <p>
                Y-DNA is passed from father to son virtually unchanged across generations.
                By testing modern descendants, geneticists can infer the probable Y-chromosome
                haplogroup of a historical ancestor.
              </p>
              <p>
                A <strong className="text-text-muted">haplogroup</strong> (e.g. R1b, I1, G2) represents a deep
                branch on the human paternal family tree. A <strong className="text-text-muted">subclade</strong> (e.g.
                R1b-FT421641) is a more specific downstream branch within that group.
              </p>
              <p>
                Haplogroups indicate deep ancestral geographic origins but do not determine ethnicity,
                nationality, or autosomal genetic makeup.
              </p>
              <p>
                <strong className="text-text-muted">Genetic Origin</strong> classifies the probable deep paternal
                geographic origin based on the haplogroup. It does not determine ethnicity or cultural identity.
                The Norman story is a mixture of Scandinavian, Frankish, and Gallo-Roman lineages.
              </p>
            </motion.div>
          )}
        </div>
      </ContentFade>

      <div className="divider-fade mx-7" />

      <ContentFade delay={0.18}>
        <div className="px-7 py-5">
          <SectionLabel>Methodology</SectionLabel>
          <div className="text-[12px] leading-relaxed text-text-dim space-y-2">
            <p>
              Haplogroup assignments are based on <strong className="text-text-muted">modern descendant Y-DNA testing</strong> compiled
              by the Francogene triangulation project. They represent the <strong className="text-text-muted">probable
              paternal lineage</strong> of the named ancestor — not a direct ancient DNA sample.
            </p>
            <p>
              Non-paternity events (NPE) or undocumented adoptions at any point in the lineage
              can break the chain between the historical person and the tested descendant.
              Marriage year is used as a proxy for presence in New France.
            </p>
          </div>
        </div>
      </ContentFade>

      <div className="divider-fade mx-7" />

      <ContentFade delay={0.22}>
        <div className="px-7 py-5 pb-8">
          <SectionLabel>Source</SectionLabel>
          <a
            href={sourcePage?.trim() || FRANCOGENE_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] text-gold/70 hover:text-gold transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M10.5 7.5V11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1h3.5M8 2h4v4M6 8l6-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {sourcePage?.trim() ? 'Page cited for this row' : 'Francogene Y-DNA Triangulation Catalogue'}
          </a>
          {familySheetNo ? (
            <a
              href={gfnaFamilySheetUrl(familySheetNo)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex text-[12px] text-sky-300/85 hover:text-sky-200 transition-colors"
            >
              Family sheet #{familySheetNo}
            </a>
          ) : null}
          <p className="mt-1.5 text-[11px] text-text-dim">
            Record: {triId}
          </p>
        </div>
      </ContentFade>
    </>
  );
}
