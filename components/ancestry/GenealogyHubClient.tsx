'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useMemo, useState } from 'react';
import { BookOpen, Dna, GitCompare, Map, MapPin, Route } from 'lucide-react';

import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import GenealogySubnav, { genealogyHubSplitClassName } from '@/components/layout/GenealogySubnav';
import GfnaLineageFinder from '@/components/ancestry/GfnaLineageFinder';
import AtlasHubPageShell, {
  ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS,
} from '@/components/layout/AtlasHubPageShell';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { useAncestryStore } from '@/lib/ancestry-store';
import { buildAncestryJourneyPlan, resolveHaplogroupQuery, runNormanDetection } from '@/core';
import { GENEALOGY_DEEP_ORIGINS_PATH, GENEALOGY_NORMAN_IDENTITY_PATH } from '@/lib/genealogy-paths';

const cardClass =
  'flex flex-col gap-2 rounded-xl border border-chrome-border-strong/40 bg-chrome-fill/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-gold/30 hover:bg-chrome-fill/35';

const GenealogyHubClient = memo(function GenealogyHubClient() {
  const locale = useLocale();
  const router = useRouter();
  const [hintsNonce, setHintsNonce] = useState(0);

  const people = useAncestryStore((s) => s.people);
  const profile = useAncestryStore((s) => s.profile);
  const setProfilePatch = useAncestryStore((s) => s.setProfilePatch);
  const setActiveJourney = useAncestryStore((s) => s.setActiveJourney);

  const focusPerson = useMemo(() => {
    const id = profile.rootPersonId ?? profile.selfPersonId;
    return id ? people[id] ?? null : null;
  }, [people, profile.rootPersonId, profile.selfPersonId]);

  const detection = useMemo(() => {
    void hintsNonce;
    return runNormanDetection(focusPerson, {
      yDnaRaw: profile.yDnaRaw,
      mtDnaRaw: profile.mtDnaRaw,
      primarySurname: profile.primarySurname,
    });
  }, [
    hintsNonce,
    focusPerson,
    profile.yDnaRaw,
    profile.mtDnaRaw,
    profile.primarySurname,
  ]);

  const onStartJourney = useCallback(() => {
    const y = profile.yDnaRaw?.trim();
    const lineageMatch = y ? resolveHaplogroupQuery(y, { lineage: 'all', depth: 'all' }) : null;
    const plan = buildAncestryJourneyPlan({
      detection: runNormanDetection(focusPerson, {
        yDnaRaw: profile.yDnaRaw,
        mtDnaRaw: profile.mtDnaRaw,
        primarySurname: profile.primarySurname,
      }),
      profile,
      focusPerson,
      lineageProfileId: lineageMatch?.profile.id ?? null,
      lineageLens: 'early_medieval',
    });
    setActiveJourney(plan);
    router.push('/');
  }, [
    focusPerson,
    profile,
    setActiveJourney,
    router,
  ]);

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <AtlasHubPageShell>
        <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
          <AtlasSubpageChromeHeader mobilePageTitle={t('genealogy.navLabel', locale)} />
          <ReferenceHubTabs />
          <div className={genealogyHubSplitClassName}>
            <GenealogySubnav />
            <main
              id="genealogy-hub-main"
              className={`relative z-10 min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin pt-8 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] md:px-8 md:pt-12 ${ATLAS_HUB_MOBILE_MAIN_BOTTOM_PAD_CLASS}`}
            >
          <div className="mx-auto max-w-3xl">
            <header className="mb-8 text-center md:mb-10">
              <p
                className="mb-2 font-sans text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'var(--color-gold-muted)' }}
              >
                — {t('genealogy.navLabel', locale)} —
              </p>
              <h1
                className="font-display text-[clamp(1.35rem,3.5vw,2rem)] font-semibold uppercase tracking-[0.06em] text-[var(--color-gold)]"
                style={{
                  textShadow:
                    '0 1px 0 rgba(255,255,255,0.06), 0 -1px 0 rgba(0,0,0,0.4), 0 0 18px rgba(196,169,98,0.07)',
                }}
              >
                {t('ancestry.hubTitle', locale)}
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-[length:var(--atlas-text-md)] leading-relaxed text-[var(--color-text-muted)]">
                {t('ancestry.hubHint', locale)}
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-relaxed text-text-dim">{t('genealogy.wayfinding', locale)}</p>
            </header>

            <Link
              href={GENEALOGY_NORMAN_IDENTITY_PATH}
              className="atlas-cyan-callout-card mb-10 flex flex-col gap-2 rounded-none p-5"
            >
              <span className="atlas-text-cyan-callout-kicker text-[11px] font-semibold uppercase tracking-[0.22em]">
                {t('normanIdentity.hubCard.title', locale)}
              </span>
              <span className="text-[length:var(--atlas-text-sm)] leading-relaxed text-[var(--color-text-muted)]">
                {t('normanIdentity.hubCard.body', locale)}
              </span>
              <span className="atlas-text-cyan-callout-cta text-[12px] font-bold uppercase tracking-wide">
                {t('normanIdentity.cta.discover', locale)} →
              </span>
            </Link>

            <section
              className="mb-10 space-y-4 rounded-xl border border-chrome-border-strong/45 bg-chrome-fill/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              aria-labelledby="genealogy-workspace-tools"
            >
              <h2 id="genealogy-workspace-tools" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/70">
                {t('genealogy.subnav.workspace', locale)}
              </h2>
              <div className="grid gap-3 sm:grid-cols-1">
                <label className="block text-[11px] font-medium uppercase tracking-wide text-text-dim">
                  {t('genealogy.primarySurname', locale)}
                  <input
                    type="text"
                    value={profile.primarySurname ?? ''}
                    onChange={(e) => setProfilePatch({ primarySurname: e.target.value || undefined })}
                    className="mt-1 w-full rounded-lg border border-chrome-border bg-chrome-fill-raised px-3 py-2 text-[14px] text-parchment placeholder:text-text-dim/50 focus:border-gold/35 focus:outline-none"
                    autoComplete="family-name"
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block text-[11px] font-medium uppercase tracking-wide text-text-dim">
                    {t('genealogy.ydnaShort', locale)}
                    <input
                      type="text"
                      value={profile.yDnaRaw ?? ''}
                      onChange={(e) => setProfilePatch({ yDnaRaw: e.target.value || undefined })}
                      className="mt-1 w-full rounded-lg border border-chrome-border bg-chrome-fill-raised px-3 py-2 text-[14px] text-parchment placeholder:text-text-dim/50 focus:border-gold/35 focus:outline-none"
                      placeholder="R-U106"
                    />
                  </label>
                  <label className="block text-[11px] font-medium uppercase tracking-wide text-text-dim">
                    {t('genealogy.mtdnaShort', locale)}
                    <input
                      type="text"
                      value={profile.mtDnaRaw ?? ''}
                      onChange={(e) => setProfilePatch({ mtDnaRaw: e.target.value || undefined })}
                      className="mt-1 w-full rounded-lg border border-chrome-border bg-chrome-fill-raised px-3 py-2 text-[14px] text-parchment placeholder:text-text-dim/50 focus:border-gold/35 focus:outline-none"
                      placeholder="H1"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setHintsNonce((n) => n + 1)}
                    className="rounded-lg border border-chrome-border-strong/50 bg-chrome-fill-raised/50 px-3 py-2 text-[12px] font-medium text-text hover:border-gold/35"
                  >
                    {t('genealogy.runHints', locale)}
                  </button>
                  <button
                    type="button"
                    onClick={onStartJourney}
                    className="rounded-lg border border-gold/40 bg-gold/12 px-3 py-2 text-[12px] font-medium text-gold hover:border-gold/55 hover:bg-gold/18"
                  >
                    {t('genealogy.startJourney', locale)}
                  </button>
                </div>
                <p className="text-[11px] leading-relaxed text-text-dim">{t('genealogy.journeyHelp', locale)}</p>
                <div className="rounded-lg border border-chrome-border/40 bg-chrome-fill/20 p-3 text-[12px] leading-relaxed text-text-muted">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gold/75">{t('genealogy.hintsTitle', locale)}</p>
                  <ul className="list-inside list-disc space-y-2">
                    {detection.disclaimers.map((d) => (
                      <li key={d} className="atlas-text-amber-disclaimer text-[11px]">
                        {d}
                      </li>
                    ))}
                    {detection.hypotheses.map((h) => (
                      <li key={h.id}>
                        <span className="font-medium text-parchment/95">{h.label}</span>
                        {h.evidence.length > 0 ? (
                          <ul className="mt-1 list-inside list-[circle] space-y-0.5 pl-2 text-[11px] text-text-dim">
                            {h.evidence.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <GfnaLineageFinder />

            <section aria-label="Genealogy destinations" className="mb-10 grid gap-4 sm:grid-cols-2">
              <Link href={GENEALOGY_DEEP_ORIGINS_PATH} className={cardClass}>
                <MapPin className="h-5 w-5 text-gold/80" aria-hidden />
                <h2 className="font-display text-[15px] font-semibold text-gold">{t('deepOrigins.pageTitle', locale)}</h2>
                <p className="text-[12px] leading-relaxed text-text-muted">{t('deepOrigins.pageSubtitle', locale)}</p>
                <span className="text-[12px] font-medium text-gold/90">{t('ancestry.deepOriginsLink', locale)} →</span>
              </Link>
              <Link href="/lineage-explorer" className={cardClass}>
                <Dna className="h-5 w-5 text-gold/80" aria-hidden />
                <h2 className="font-display text-[15px] font-semibold text-gold">{t('lineageExplorer.hubTitle', locale)}</h2>
                <p className="text-[12px] leading-relaxed text-text-muted">{t('lineageExplorer.navHint', locale)}</p>
                <span className="text-[12px] font-medium text-gold/90">{t('genealogy.subnav.haplogroups', locale)} →</span>
              </Link>
              <Link href="/lineage-explorer/migration-map" className={cardClass}>
                <Route className="h-5 w-5 text-gold/80" aria-hidden />
                <h2 className="font-display text-[15px] font-semibold text-gold">{t('lineageExplorer.migrationMapLink', locale)}</h2>
                <p className="text-[12px] leading-relaxed text-text-muted">{t('lineageExplorer.migrationMapTitle', locale)}</p>
              </Link>
              <Link href="/lineage-explorer/compare" className={cardClass}>
                <GitCompare className="h-5 w-5 text-gold/80" aria-hidden />
                <h2 className="font-display text-[15px] font-semibold text-gold">{t('lineageExplorer.compareLink', locale)}</h2>
                <p className="text-[12px] leading-relaxed text-text-dim">{t('genealogy.subnav.compare', locale)}</p>
              </Link>
              <Link href="/lineage-explorer/norman-y-dna" className={cardClass}>
                <BookOpen className="h-5 w-5 text-gold/80" aria-hidden />
                <h2 className="font-display text-[15px] font-semibold text-gold">{t('lineageExplorer.normanYdnaHubLink', locale)}</h2>
                <p className="text-[12px] leading-relaxed text-text-dim">{t('genealogy.normanYdnaCardHint', locale)}</p>
              </Link>
            </section>

            <section className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/?era=viking-age"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-chrome-border-strong/40 bg-chrome-fill-raised/40 px-4 py-3 text-[13px] text-gold/90 hover:border-gold/35"
              >
                <Map className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                {t('ancestry.openMap', locale)}
              </Link>
              <Link
                href="/journal"
                className="inline-flex items-center justify-center rounded-lg border border-chrome-border/35 px-4 py-3 text-[13px] text-text-dim hover:border-chrome-border-strong/50 hover:text-gold/80"
              >
                {t('atlasJournal.tooltip.label', locale)}
              </Link>
            </section>
          </div>
            </main>
          </div>
        </div>
      </AtlasHubPageShell>
    </div>
  );
});

export default GenealogyHubClient;
