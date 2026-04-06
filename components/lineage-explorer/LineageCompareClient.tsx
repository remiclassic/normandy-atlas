'use client';

import Link from 'next/link';
import { memo, useCallback, useDeferredValue, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Dna, Search, X } from 'lucide-react';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import GenealogySubnav, { genealogyHubSplitClassName } from '@/components/layout/GenealogySubnav';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import {
  getHaplogroupParent,
  getHaplogroupProfile,
  searchHaplogroupProfiles,
} from '@/core';
import {
  resolveLineageHistoricalGroups,
  resolveLineageRegions,
} from '@/core/lineage/related';
import type {
  AtlasLocale,
  HaplogroupProfile,
  LineageDepthFilter,
  LineageLineageFilter,
  NormanAtlasLineageFocus,
} from '@/core/types';
import AtlasSelect from '@/components/ui/AtlasSelect';

const COMPARE_QUICK_PICKS = ['R1b', 'R1b-U106', 'I1', 'H1', 'U5', 'J2', 'E1b1b'];

function themeLabel(f: NormanAtlasLineageFocus): string {
  return f.replace(/_/g, ' ');
}

const LineageCompareSelector = memo(function LineageCompareSelector({
  locale,
  onPick,
  inputId,
}: {
  locale: AtlasLocale;
  onPick: (id: string) => void;
  inputId: string;
}) {
  const [query, setQuery] = useState('');
  const dq = useDeferredValue(query);
  const [lineageFilter, setLineageFilter] = useState<LineageLineageFilter>('all');
  const [depthFilter, setDepthFilter] = useState<LineageDepthFilter>('major');

  const filters = useMemo(
    () => ({
      lineage: lineageFilter,
      depth: depthFilter,
      limit: dq.trim() ? 14 : 18,
    }),
    [lineageFilter, depthFilter, dq],
  );

  const results = useMemo(() => searchHaplogroupProfiles(dq.trim(), filters), [dq, filters]);

  const ph =
    locale === 'fr'
      ? 'Filtrer la liste ou chercher (région, peuple, code…)…'
      : 'Filter the list or search (region, people, code…)…';

  const browseLabel = locale === 'fr' ? 'Parcourir les profils' : 'Browse profiles';
  const searchLabel = locale === 'fr' ? 'Résultats de recherche' : 'Search results';

  const lineageSelectOptions = useMemo(
    () => [
      { value: 'all', label: locale === 'fr' ? 'Toutes' : 'All' },
      { value: 'paternal', label: 'Y-DNA' },
      { value: 'maternal', label: 'mtDNA' },
    ],
    [locale],
  );

  const depthSelectOptions = useMemo(
    () => [
      { value: 'all', label: locale === 'fr' ? 'Tout' : 'All branches' },
      { value: 'major', label: locale === 'fr' ? 'Clades majeurs' : 'Major clades' },
      { value: 'sub', label: locale === 'fr' ? 'Sous-clades' : 'Subclades' },
    ],
    [locale],
  );

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="sr-only">
        {locale === 'fr' ? 'Choisir une lignée' : 'Choose a lineage'}
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-dim/70"
          strokeWidth={2}
          aria-hidden
        />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ph}
          autoComplete="off"
          className="w-full rounded-lg border border-chrome-border bg-chrome-fill-raised py-2 pl-8 pr-3 text-[13px] text-parchment placeholder:text-text-dim/50 focus:border-gold/35 focus:outline-none"
        />
      </div>

      <p className="mt-2 text-[10px] text-text-dim/90">
        {locale === 'fr'
          ? 'Astuce : choisissez dans la liste, touchez une suggestion, ou affinez avec Y / ADNmt et la profondeur.'
          : 'Tip: pick from the list, tap a suggestion, or narrow with Y-DNA / mtDNA and branch depth.'}
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {COMPARE_QUICK_PICKS.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => setQuery(ex)}
            className="rounded-md border border-chrome-border/80 px-2 py-1 text-[11px] text-text-muted transition-colors hover:border-gold/25 hover:text-parchment"
          >
            {ex}
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
          {locale === 'fr' ? 'Lignée' : 'Lineage'}
          <AtlasSelect
            value={lineageFilter}
            onValueChange={(v) => setLineageFilter(v as LineageLineageFilter)}
            options={lineageSelectOptions}
          />
        </label>
        <label className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
          {locale === 'fr' ? 'Profondeur' : 'Branch depth'}
          <AtlasSelect
            value={depthFilter}
            onValueChange={(v) => setDepthFilter(v as LineageDepthFilter)}
            options={depthSelectOptions}
          />
        </label>
      </div>

      {results.length > 0 ? (
        <>
          <p className="mb-1 mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-dim">
            {dq.trim() ? searchLabel : browseLabel}
          </p>
          <ul
            className="max-h-48 overflow-y-auto rounded-lg border border-chrome-border/80 bg-chrome-popover py-1 shadow-atlas-popover scrollbar-thin"
            role="listbox"
            aria-label={dq.trim() ? searchLabel : browseLabel}
          >
            {results.map(({ profile, fallbackFromQuery }) => (
              <li key={profile.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  onClick={() => {
                    onPick(profile.id);
                    setQuery('');
                  }}
                  className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-[12px] transition-colors hover:bg-chrome-fill-hover"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-parchment">{profile.name}</span>
                    <span className="rounded bg-chrome-fill-badge px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-text-dim">
                      {profile.lineageType === 'paternal' ? 'Y-DNA' : 'mtDNA'}
                    </span>
                  </span>
                  {fallbackFromQuery ? (
                    <span className="text-[10px] text-amber-400/85">
                      {locale === 'fr'
                        ? `Profil parent pour « ${fallbackFromQuery} »`
                        : `Closest curated profile for “${fallbackFromQuery}”`}
                    </span>
                  ) : null}
                  <span className="line-clamp-2 text-[11px] text-text-muted">
                    {pickI18n(profile.shortSummary, locale)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {dq.trim() && results.length === 0 ? (
        <p className="mt-2 text-[12px] text-text-dim">{locale === 'fr' ? 'Aucun résultat.' : 'No matches.'}</p>
      ) : null}

      <p className="mt-3 text-[11px] text-text-dim">
        <Link
          href="/lineage-explorer"
          className="text-gold/80 underline decoration-gold/30 underline-offset-2 hover:text-gold"
        >
          {locale === 'fr' ? 'Ouvrir l’explorateur complet des lignées' : 'Open full lineage explorer'}
        </Link>
        {locale === 'fr'
          ? ' pour feuilleter tous les profils et cartes.'
          : ' to browse every profile and map.'}
      </p>
    </div>
  );
});

const CompareProfileCardBody = memo(function CompareProfileCardBody({
  profile,
  locale,
  onClear,
}: {
  profile: HaplogroupProfile;
  locale: AtlasLocale;
  onClear: () => void;
}) {
  const parent = useMemo(() => getHaplogroupParent(profile), [profile]);
  const groups = useMemo(() => resolveLineageHistoricalGroups(profile), [profile]);
  const regions = useMemo(() => resolveLineageRegions(profile), [profile]);
  const themes = profile.normanAtlasFocus ?? [];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Dna className="h-4 w-4 text-gold/60" />
          <span className="text-[10px] uppercase tracking-wide text-text-dim">
            {profile.lineageType === 'paternal' ? 'Y-DNA' : 'mtDNA'}
          </span>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] uppercase tracking-wide text-text-dim transition-colors hover:bg-chrome-fill-hover hover:text-parchment"
        >
          <X className="h-3 w-3" aria-hidden />
          {locale === 'fr' ? 'Effacer' : 'Clear'}
        </button>
      </div>
      <Link
        href={`/lineage-explorer/${encodeURIComponent(profile.id)}`}
        className="mt-1 block text-lg font-medium text-parchment hover:underline"
      >
        {profile.name}
      </Link>
      <p className="mt-2 text-[12px] leading-snug text-text-muted">{pickI18n(profile.shortSummary, locale)}</p>

      {(profile.estimatedOriginTime || profile.estimatedOriginRegion) && (
        <dl className="mt-3 space-y-1.5 rounded-lg border border-chrome-border/40 bg-chrome-fill/15 px-3 py-2">
          {profile.estimatedOriginTime ? (
            <div>
              <dt className="text-[9px] font-semibold uppercase tracking-[0.14em] text-text-dim">
                {locale === 'fr' ? 'Chronologie (estim.)' : 'Timing (estimate)'}
              </dt>
              <dd className="text-[11px] text-text-muted">{pickI18n(profile.estimatedOriginTime, locale)}</dd>
            </div>
          ) : null}
          {profile.estimatedOriginRegion ? (
            <div>
              <dt className="text-[9px] font-semibold uppercase tracking-[0.14em] text-text-dim">
                {locale === 'fr' ? 'Région d’origine (estim.)' : 'Origin region (estimate)'}
              </dt>
              <dd className="text-[11px] text-text-muted">{pickI18n(profile.estimatedOriginRegion, locale)}</dd>
            </div>
          ) : null}
        </dl>
      )}

      {profile.migrationSummary ? (
        <p className="mt-3 text-[11px] leading-relaxed text-text-dim">
          <span className="font-semibold text-text-muted">
            {locale === 'fr' ? 'Mouvements & contexte : ' : 'Movement & context: '}
          </span>
          {pickI18n(profile.migrationSummary, locale)}
        </p>
      ) : null}

      {parent ? (
        <p className="mt-2 text-[11px] text-text-dim">
          {locale === 'fr' ? 'Clade parent : ' : 'Parent clade: '}
          <Link href={`/lineage-explorer/${encodeURIComponent(parent.id)}`} className="text-gold/85 hover:underline">
            {parent.name}
          </Link>
        </p>
      ) : null}

      {groups.length > 0 ? (
        <div className="mt-3">
          <h3 className="text-[9px] font-semibold uppercase tracking-[0.16em] text-text-dim">
            {locale === 'fr' ? 'Peuples liés (lecture)' : 'Related peoples (reading)'}
          </h3>
          <ul className="mt-1 space-y-1">
            {groups.slice(0, 4).map(({ id, group }) => (
              <li key={id} className="text-[11px] leading-snug text-text-muted">
                {pickI18n(group.name, locale)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {regions.length > 0 ? (
        <div className="mt-3">
          <h3 className="text-[9px] font-semibold uppercase tracking-[0.16em] text-text-dim">
            {locale === 'fr' ? 'Régions atlas' : 'Atlas regions'}
          </h3>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {regions.slice(0, 6).map(({ id, region }) => (
              <li key={id}>
                <span className="rounded-md bg-chrome-fill-badge px-2 py-0.5 text-[10px] text-text-muted">
                  {pickI18n(region.name, locale)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {themes.length > 0 ? (
        <div className="mt-3">
          <h3 className="text-[9px] font-semibold uppercase tracking-[0.16em] text-text-dim">
            {locale === 'fr' ? 'Thèmes atlas (indices)' : 'Atlas theme hints'}
          </h3>
          <ul className="mt-1.5 text-[11px] text-text-dim">
            {themes.map((f) => (
              <li key={f}>• {themeLabel(f)}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
});

const LineageCompareClient = memo(function LineageCompareClient() {
  const locale = useLocale();
  const [toolsOpen, setToolsOpen] = useState(false);
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const idA = sp.get('a') ?? sp.get('y') ?? '';
  const idB = sp.get('b') ?? sp.get('mt') ?? '';

  const pa = idA ? getHaplogroupProfile(idA) : undefined;
  const pb = idB ? getHaplogroupProfile(idB) : undefined;

  const setSlotA = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(sp.toString());
      params.delete('y');
      if (id) params.set('a', id);
      else params.delete('a');
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, sp],
  );

  const setSlotB = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(sp.toString());
      params.delete('mt');
      if (id) params.set('b', id);
      else params.delete('b');
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, sp],
  );

  const intersection = useMemo(() => {
    if (!pa?.normanAtlasFocus || !pb?.normanAtlasFocus) return [] as NormanAtlasLineageFocus[];
    const sb = new Set(pb.normanAtlasFocus);
    return pa.normanAtlasFocus.filter((x) => sb.has(x));
  }, [pa, pb]);

  const onlyA = useMemo(() => {
    if (!pa?.normanAtlasFocus?.length || !pb?.normanAtlasFocus) return [] as NormanAtlasLineageFocus[];
    const sb = new Set(pb.normanAtlasFocus);
    return pa.normanAtlasFocus.filter((x) => !sb.has(x));
  }, [pa, pb]);

  const onlyB = useMemo(() => {
    if (!pb?.normanAtlasFocus?.length || !pa?.normanAtlasFocus) return [] as NormanAtlasLineageFocus[];
    const sa = new Set(pa.normanAtlasFocus);
    return pb.normanAtlasFocus.filter((x) => !sa.has(x));
  }, [pa, pb]);

  return (
    <div className="fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
        <AtlasSubpageChromeHeader onOpenToolsMenu={() => setToolsOpen(true)} />
        <ReferenceHubTabs />
        <div className={genealogyHubSplitClassName}>
          <GenealogySubnav />
          <main className="relative z-10 min-h-0 min-w-0 flex-1 overflow-y-auto scrollbar-thin px-4 pb-20 pt-8 md:px-8 md:pt-10">
          <div className="mx-auto max-w-5xl">
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
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-text-muted">
              {locale === 'fr'
                ? 'Choisissez deux profils dans les listes ci-dessous (pas besoin de connaître le code), ou partagez une URL avec ?a= et ?b= (ou ?y= et ?mt=). Ce tableau croise des thèmes de l’atlas et du contexte éditorial — ce n’est pas une preuve généalogique.'
                : 'Pick two profiles from the lists below — you don’t need to know the haplogroup code — or share a URL with ?a= and ?b= (or ?y= and ?mt=). This view crosses atlas themes and editorial context — not genealogical proof.'}
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-chrome-border/60 bg-chrome-fill/20 p-4">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-muted">
                  {locale === 'fr' ? 'Profil A' : 'Profile A'}
                </p>
                <LineageCompareSelector locale={locale} onPick={setSlotA} inputId="lineage-compare-search-a" />
                {pa ? (
                  <CompareProfileCardBody profile={pa} locale={locale} onClear={() => setSlotA(null)} />
                ) : (
                  <p className="text-[12px] text-text-dim">
                    {locale === 'fr'
                      ? 'Aucune sélection — parcourez la liste ou les suggestions ci-dessus.'
                      : 'Nothing selected yet — browse the list or quick picks above.'}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-chrome-border/60 bg-chrome-fill/20 p-4">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-muted">
                  {locale === 'fr' ? 'Profil B' : 'Profile B'}
                </p>
                <LineageCompareSelector locale={locale} onPick={setSlotB} inputId="lineage-compare-search-b" />
                {pb ? (
                  <CompareProfileCardBody profile={pb} locale={locale} onClear={() => setSlotB(null)} />
                ) : (
                  <p className="text-[12px] text-text-dim">
                    {locale === 'fr'
                      ? 'Aucune sélection — parcourez la liste ou les suggestions ci-dessus.'
                      : 'Nothing selected yet — browse the list or quick picks above.'}
                  </p>
                )}
              </div>
            </div>

            {pa && pb ? (
              <section className="mt-8 rounded-lg border border-chrome-border/50 bg-chrome-fill/10 p-4">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-muted">
                  {locale === 'fr' ? 'Vue rapide côte à côte' : 'Side-by-side snapshot'}
                </h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-md border border-chrome-border/35 bg-chrome-fill/15 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-text-dim">{pa.name}</p>
                    {pa.estimatedOriginRegion ? (
                      <p className="mt-1 text-[12px] text-text-muted">
                        {pickI18n(pa.estimatedOriginRegion, locale)}
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-text-dim">
                        {locale === 'fr' ? 'Pas de région d’origine indiquée.' : 'No origin region listed.'}
                      </p>
                    )}
                  </div>
                  <div className="rounded-md border border-chrome-border/35 bg-chrome-fill/15 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wide text-text-dim">{pb.name}</p>
                    {pb.estimatedOriginRegion ? (
                      <p className="mt-1 text-[12px] text-text-muted">
                        {pickI18n(pb.estimatedOriginRegion, locale)}
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-text-dim">
                        {locale === 'fr' ? 'Pas de région d’origine indiquée.' : 'No origin region listed.'}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            ) : null}

            {intersection.length > 0 ? (
              <section className="mt-6 rounded-lg border border-gold/25 bg-gold/[0.05] p-4">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-muted">
                  {locale === 'fr' ? 'Chevauchement des thèmes (Atlas)' : 'Overlapping atlas themes'}
                </h2>
                <ul className="mt-2 text-[12px] text-text-muted">
                  {intersection.map((x) => (
                    <li key={x}>• {themeLabel(x)}</li>
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

            {pa && pb && (onlyA.length > 0 || onlyB.length > 0) ? (
              <section className="mt-6 rounded-lg border border-chrome-border/50 bg-chrome-fill/10 p-4">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-dim">
                  {locale === 'fr' ? 'Contrastes (thèmes uniques)' : 'Contrast (unique themes)'}
                </h2>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-text-dim">{pa.name}</p>
                    {onlyA.length ? (
                      <ul className="mt-1.5 text-[11px] text-text-muted">
                        {onlyA.map((x) => (
                          <li key={x}>• {themeLabel(x)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1.5 text-[11px] text-text-dim">
                        {locale === 'fr' ? 'Aucun thème exclusif.' : 'No exclusive themes.'}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wide text-text-dim">{pb.name}</p>
                    {onlyB.length ? (
                      <ul className="mt-1.5 text-[11px] text-text-muted">
                        {onlyB.map((x) => (
                          <li key={x}>• {themeLabel(x)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1.5 text-[11px] text-text-dim">
                        {locale === 'fr' ? 'Aucun thème exclusif.' : 'No exclusive themes.'}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            ) : null}
          </div>
          </main>
        </div>
      </div>
      <AtlasSubpageToolsMenu open={toolsOpen} onClose={() => setToolsOpen(false)} />
    </div>
  );
});

export default LineageCompareClient;
