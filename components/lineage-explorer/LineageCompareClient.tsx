'use client';

import Link from 'next/link';
import { memo, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Dna } from 'lucide-react';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { getHaplogroupProfile } from '@/core';
import type { NormanAtlasLineageFocus } from '@/core/types';

const LineageCompareClient = memo(function LineageCompareClient() {
  const locale = useLocale();
  const [toolsOpen, setToolsOpen] = useState(false);
  const sp = useSearchParams();
  const idA = sp.get('a') ?? sp.get('y') ?? '';
  const idB = sp.get('b') ?? sp.get('mt') ?? '';

  const pa = idA ? getHaplogroupProfile(idA) : undefined;
  const pb = idB ? getHaplogroupProfile(idB) : undefined;

  const intersection = useMemo(() => {
    if (!pa?.normanAtlasFocus || !pb?.normanAtlasFocus) return [] as NormanAtlasLineageFocus[];
    const sb = new Set(pb.normanAtlasFocus);
    return pa.normanAtlasFocus.filter((x) => sb.has(x));
  }, [pa, pb]);

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
        <AtlasSubpageChromeHeader onOpenToolsMenu={() => setToolsOpen(true)} />
        <ReferenceHubTabs />
        <main className="relative z-10 min-h-0 flex-1 overflow-y-auto scrollbar-thin px-4 pb-20 pt-8 md:px-8 md:pt-10">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/lineage-explorer"
              className="mb-6 inline-flex items-center gap-1.5 text-[12px] text-text-dim hover:text-gold"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {locale === 'fr' ? 'Retour' : 'Back'}
            </Link>
            <h1 className="font-display text-xl font-semibold uppercase tracking-[0.06em] text-[var(--color-gold)] md:text-2xl">
              {locale === 'fr' ? 'Comparer deux lignées' : 'Compare two lineages'}
            </h1>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-text-muted">
              {locale === 'fr'
                ? 'Utilisez les paramètres d’URL ?a= et ?b= (ou ?y= et ?mt=) avec les identifiants de profil (ex. y-r1b-u106 et mt-h1). Chevauchement des thèmes de l’atlas seulement — pas de preuve généalogique.'
                : 'Use URL params ?a= and ?b= (or ?y= and ?mt=) with profile ids (e.g. y-r1b-u106 and mt-h1). Overlap of atlas themes only — not genealogical proof.'}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[pa, pb].map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-chrome-border/60 bg-chrome-fill/20 p-4"
                >
                  {p ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Dna className="h-4 w-4 text-gold/60" />
                        <span className="text-[10px] uppercase tracking-wide text-text-dim">
                          {p.lineageType === 'paternal' ? 'Y-DNA' : 'mtDNA'}
                        </span>
                      </div>
                      <Link href={`/lineage-explorer/${p.id}`} className="mt-1 block text-lg font-medium text-parchment hover:underline">
                        {p.name}
                      </Link>
                      <p className="mt-2 text-[12px] leading-snug text-text-muted">{pickI18n(p.shortSummary, locale)}</p>
                      <ul className="mt-2 text-[11px] text-text-dim">
                        {(p.normanAtlasFocus ?? []).map((f) => (
                          <li key={f}>• {f.replace(/_/g, ' ')}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-[13px] text-text-dim">
                      {i === 0
                        ? locale === 'fr'
                          ? 'Profil A manquant — ajoutez ?a=id'
                          : 'Missing profile A — add ?a=id'
                        : locale === 'fr'
                          ? 'Profil B manquant — ajoutez ?b=id'
                          : 'Missing profile B — add ?b=id'}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {intersection.length > 0 ? (
              <section className="mt-8 rounded-lg border border-gold/25 bg-gold/[0.05] p-4">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-muted">
                  {locale === 'fr' ? 'Chevauchement des thèmes (Atlas)' : 'Overlapping atlas themes'}
                </h2>
                <ul className="mt-2 text-[12px] text-text-muted">
                  {intersection.map((x) => (
                    <li key={x}>• {x.replace(/_/g, ' ')}</li>
                  ))}
                </ul>
              </section>
            ) : pa && pb ? (
              <p className="mt-6 text-[12px] text-text-dim">
                {locale === 'fr'
                  ? 'Aucun thème Atlas en commun dans les données — cela ne dit rien sur votre ascendance globale.'
                  : 'No shared atlas themes in the data — that says nothing about your total ancestry.'}
              </p>
            ) : null}
          </div>
        </main>
      </div>
      <AtlasSubpageToolsMenu open={toolsOpen} onClose={() => setToolsOpen(false)} />
    </div>
  );
});

export default LineageCompareClient;
