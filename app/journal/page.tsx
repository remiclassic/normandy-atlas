'use client';

import { useEffect, useRef, useState, useMemo, useDeferredValue, useCallback, memo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Menu, X, MapPin, Map, ExternalLink } from 'lucide-react';
import TextSizeMenu from '@/components/ui/TextSizeMenu';
import { useLocale } from '@/hooks/use-atlas';
import { pickI18n } from '@/lib/locale';
import { getAtlasEras } from '@/core/era/engine';
import { atlasEraArcs } from '@/data/atlas/era-arcs';
import { atlasGlossary } from '@/data/atlas/glossary';
import { buildJournalIndex, type JournalIndexRow, type JournalCategory } from '@/lib/atlas-journal-index';
import { journalSections } from '@/lib/atlas-journal-copy';
import NormanNamesExplorer from '@/components/norman-names/NormanNamesExplorer';
import { useLedgerStats, useInferredRole, useProgress, type AtlasRole } from '@/hooks/useAtlasProgress';
import { notifyProgressListeners } from '@/hooks/useAtlasProgress';
import { atlasMilestones } from '@/data/atlas/milestones';
import { atlasExpeditions } from '@/data/atlas/expeditions';
import { exportProgressJSON, importProgressJSON, resetProgress, emitProgressEvent } from '@/lib/progress';
import { t } from '@/lib/ui-strings';
import type { AtlasLocale } from '@/core/types';

interface TocItem {
  id: string;
  label: string;
}

function useTocItems(locale: AtlasLocale): TocItem[] {
  return useMemo(() => [
    { id: 'welcome', label: locale === 'fr' ? 'Accueil' : 'Welcome' },
    { id: 'how-to-use', label: locale === 'fr' ? 'Comment utiliser' : 'How to use' },
    { id: 'your-ledger', label: locale === 'fr' ? 'Votre registre' : 'Your Ledger' },
    { id: 'timeline', label: locale === 'fr' ? 'Chronologie' : 'Timeline' },
    { id: 'arcs', label: locale === 'fr' ? 'Arcs narratifs' : 'Story arcs' },
    { id: 'norman-surnames', label: locale === 'fr' ? 'Patronymes normands' : 'Norman surnames' },
    { id: 'index-concepts', label: locale === 'fr' ? 'Concepts' : 'Concepts' },
    { id: 'index-places', label: locale === 'fr' ? 'Lieux' : 'Places' },
    { id: 'index-regions', label: locale === 'fr' ? 'Régions' : 'Regions' },
    { id: 'index-journeys', label: locale === 'fr' ? 'Routes & voyages' : 'Routes & journeys' },
    { id: 'index-story', label: locale === 'fr' ? 'Récit' : 'Story' },
    { id: 'index-viking-sites', label: locale === 'fr' ? 'Sites vikings' : 'Viking Sites' },
    { id: 'ydna-lineages', label: locale === 'fr' ? 'Lignées ADN-Y' : 'Y-DNA Lineages' },
    { id: 'methodology', label: locale === 'fr' ? 'M\u00e9thodologie' : 'Methodology' },
  ], [locale]);
}

const SectionHeading = memo(function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display text-[20px] font-semibold scroll-mt-20"
      style={{ color: 'var(--color-parchment)' }}
    >
      {children}
    </h2>
  );
});

const SectionDivider = memo(function SectionDivider() {
  return <div className="h-px my-10" style={{ background: 'var(--color-border)' }} />;
});

const Prose = memo(function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] leading-relaxed mt-3" style={{ color: 'var(--color-text-muted)' }}>
      {children}
    </p>
  );
});

const SectionLabel = memo(function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-medium uppercase tracking-[0.22em] mb-2"
      style={{ color: 'var(--color-gold-muted)' }}
    >
      {children}
    </p>
  );
});

const ROLE_LABELS: Record<AtlasRole, { en: string; fr: string }> = {
  explorer: { en: 'Explorer', fr: 'Explorateur' },
  historian: { en: 'Historian', fr: 'Historien' },
  cartographer: { en: 'Cartographer', fr: 'Cartographe' },
  chronicler: { en: 'Chronicler', fr: 'Chroniqueur' },
};

const JournalLedgerSection = memo(function JournalLedgerSection({ locale }: { locale: AtlasLocale }) {
  const stats = useLedgerStats();
  const role = useInferredRole();
  const progress = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const unlockedMilestones = useMemo(() =>
    atlasMilestones.filter((m) => !!progress.milestones[m.id]),
    [progress.milestones],
  );

  const handleExport = useCallback(() => {
    const blob = new Blob([exportProgressJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'norman-atlas-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleImport = useCallback(() => { fileInputRef.current?.click(); }, []);
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (importProgressJSON(reader.result)) notifyProgressListeners();
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, []);

  const handleReset = useCallback(() => {
    if (!confirm(t('ledger.reset.confirm', locale))) return;
    resetProgress();
    notifyProgressListeners();
  }, [locale]);

  const isEmpty = stats.places === 0 && stats.storiesCompleted === 0;

  return (
    <div className="mt-4 space-y-5">
      {isEmpty ? (
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
          {t('ledger.empty', locale)}
        </p>
      ) : (
        <>
          <div
            className="rounded-lg border px-5 py-4"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <p
                className="text-[10px] font-medium uppercase tracking-[0.22em]"
                style={{ color: 'var(--color-gold-muted)' }}
              >
                {t('ledger.coverage', locale)}
              </p>
              <span className="text-[10px] italic" style={{ color: 'var(--color-text-dim)' }}>
                {pickI18n(ROLE_LABELS[role], locale)}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
              {([
                ['ledger.places', stats.places, stats.coverageTotals.places],
                ['ledger.regions', stats.regions, stats.coverageTotals.regions],
                ['ledger.journeys', stats.journeys, stats.coverageTotals.journeys],
                ['ledger.segments', stats.segments, stats.coverageTotals.segments],
                ['ledger.eras', stats.eras, stats.coverageTotals.eras],
                ['ledger.stories', stats.storiesCompleted, stats.coverageTotals.stories],
              ] as const).map(([key, cur, tot]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
                    {t(key, locale)}
                  </span>
                  <span className="text-[13px] font-semibold tabular-nums" style={{ color: 'var(--color-parchment)' }}>
                    {cur}/{tot}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {unlockedMilestones.length > 0 && (
            <div>
              <p
                className="text-[10px] font-medium uppercase tracking-[0.22em] mb-2"
                style={{ color: 'var(--color-gold-muted)' }}
              >
                {t('ledger.milestones', locale)} ({unlockedMilestones.length}/{atlasMilestones.length})
              </p>
              <div className="space-y-1.5">
                {unlockedMilestones.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-2 rounded-lg border px-3 py-2"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: 'var(--color-gold)' }} className="shrink-0">
                      <path d="M3 7.5l2.5 2.5L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[12px]" style={{ color: 'var(--color-parchment)' }}>
                      {pickI18n(m.title, locale)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button onClick={handleExport} className="text-[11px] px-2 py-1 rounded-md transition-colors" style={{ color: 'var(--color-text-dim)' }}>
          {t('ledger.export', locale)}
        </button>
        <button onClick={handleImport} className="text-[11px] px-2 py-1 rounded-md transition-colors" style={{ color: 'var(--color-text-dim)' }}>
          {t('ledger.import', locale)}
        </button>
        <button onClick={handleReset} className="text-[11px] px-2 py-1 rounded-md transition-colors" style={{ color: 'var(--color-text-dim)' }}>
          {t('ledger.reset', locale)}
        </button>
        <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleFileChange} />
      </div>
    </div>
  );
});

const TimelineSection = memo(function TimelineSection({ locale }: { locale: AtlasLocale }) {
  const eras = useMemo(() => getAtlasEras(), []);

  return (
    <div className="space-y-3 mt-4">
      {eras.map((era) => (
        <div
          key={era.id}
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[14px] font-semibold" style={{ color: 'var(--color-parchment)' }}>
              {pickI18n(era.label, locale)}
            </span>
            <span className="text-[11px] tabular-nums" style={{ color: 'var(--color-text-dim)' }}>
              {era.range.start < 0 ? `${Math.abs(era.range.start)} BC` : era.range.start} \u2013 {era.range.end}
            </span>
          </div>
          {era.summary && (
            <p className="text-[12px] leading-relaxed mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
              {pickI18n(era.summary, locale)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
});

const ArcsSection = memo(function ArcsSection({ locale }: { locale: AtlasLocale }) {
  return (
    <div className="space-y-3 mt-4">
      {atlasEraArcs.map((arc) => (
        <div
          key={arc.arcId}
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <span className="font-display text-[14px] font-semibold" style={{ color: 'var(--color-parchment)' }}>
            {pickI18n(arc.label, locale)}
          </span>
          <p className="text-[11px] mt-1" style={{ color: 'var(--color-text-dim)' }}>
            {arc.eraIds.length} {locale === 'fr' ? '\u00e9poques' : 'eras'}
          </p>
        </div>
      ))}
    </div>
  );
});

const GlossarySection = memo(function GlossarySection({
  locale,
  searchQuery,
}: {
  locale: AtlasLocale;
  searchQuery: string;
}) {
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return atlasGlossary;
    const q = searchQuery.trim().toLowerCase();
    return atlasGlossary.filter(
      (e) =>
        pickI18n(e.term, locale).toLowerCase().includes(q) ||
        pickI18n(e.definition, locale).toLowerCase().includes(q),
    );
  }, [searchQuery, locale]);

  return (
    <div className="space-y-3 mt-4">
      {filtered.length === 0 && (
        <p className="text-[13px] py-6 text-center" style={{ color: 'var(--color-text-dim)' }}>
          {locale === 'fr' ? 'Aucun terme trouv\u00e9.' : 'No terms found.'}
        </p>
      )}
      {filtered.map((entry) => (
        <div
          key={entry.id}
          id={`glossary-${entry.id}`}
          className="rounded-lg border px-4 py-3"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="font-display text-[14px] font-semibold" style={{ color: 'var(--color-parchment)' }}>
            {pickI18n(entry.term, locale)}
          </p>
          <p className="text-[12px] leading-relaxed mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
            {pickI18n(entry.definition, locale)}
          </p>
          {entry.seeAlso && entry.seeAlso.length > 0 && (
            <p className="text-[10px] mt-2" style={{ color: 'var(--color-text-dim)' }}>
              {locale === 'fr' ? 'Voir aussi : ' : 'See also: '}
              {entry.seeAlso.map((ref, i) => {
                const target = atlasGlossary.find((g) => g.id === ref);
                const label = target ? pickI18n(target.term, locale) : ref;
                return (
                  <span key={ref}>
                    {i > 0 && ', '}
                    <a
                      href={`#glossary-${ref}`}
                      className="underline underline-offset-2 transition-colors"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      {label}
                    </a>
                  </span>
                );
              })}
            </p>
          )}
        </div>
      ))}
    </div>
  );
});

const CATEGORY_ICON: Record<JournalCategory, typeof MapPin> = {
  concept: Search,
  place: MapPin,
  region: Map,
  journey: ExternalLink,
  segment: ExternalLink,
  story: ExternalLink,
  'viking-site': MapPin,
};

const IndexCard = memo(function IndexCard({
  row,
  locale,
}: {
  row: JournalIndexRow;
  locale: AtlasLocale;
}) {
  const Icon = CATEGORY_ICON[row.category];
  return (
    <div
      className="rounded-lg border px-4 py-3 flex gap-3 items-start"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <Icon
        size={14}
        className="mt-0.5 shrink-0"
        style={{ color: 'var(--color-text-dim)' }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="font-display text-[14px] font-semibold" style={{ color: 'var(--color-parchment)' }}>
          {row.title}
        </p>
        {row.excerpt && (
          <p className="text-[12px] leading-relaxed mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {row.excerpt}
          </p>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
          <Link
            href={row.mapLink}
            className="inline-flex items-center gap-1 text-[11px] underline underline-offset-2 transition-colors"
            style={{ color: 'var(--color-gold)' }}
          >
            {locale === 'fr' ? 'Voir sur la carte' : 'View on map'}
          </Link>
          {row.libraryLink && (
            <Link
              href={row.libraryLink}
              className="inline-flex items-center gap-1 text-[11px] underline underline-offset-2 transition-colors"
              style={{ color: 'var(--color-gold)' }}
            >
              {t('journal.openInLibrary', locale)}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
});

const IndexSection = memo(function IndexSection({
  rows,
  locale,
  emptyLabel,
}: {
  rows: JournalIndexRow[];
  locale: AtlasLocale;
  emptyLabel?: string;
}) {
  if (rows.length === 0) {
    return (
      <p className="text-[13px] py-6 text-center" style={{ color: 'var(--color-text-dim)' }}>
        {emptyLabel ?? (locale === 'fr' ? 'Aucun résultat.' : 'No results.')}
      </p>
    );
  }
  return (
    <div className="space-y-3 mt-4">
      {rows.map((row) => (
        <IndexCard key={row.id} row={row} locale={locale} />
      ))}
    </div>
  );
});

const TocNav = memo(function TocNav({
  items,
  activeId,
  onItemClick,
}: {
  items: TocItem[];
  activeId: string;
  onItemClick: (id: string) => void;
}) {
  return (
    <nav aria-label="Journal table of contents">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onItemClick(item.id)}
              className="w-full text-left px-3 py-1.5 rounded-md text-[12px] transition-colors cursor-pointer"
              style={{
                color: activeId === item.id ? 'var(--color-gold)' : 'var(--color-text-muted)',
                background: activeId === item.id ? 'var(--color-chrome-fill)' : 'transparent',
              }}
              aria-current={activeId === item.id ? 'location' : undefined}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default function JournalPage() {
  const locale = useLocale();
  const tocItems = useTocItems(locale);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('welcome');
  const [glossarySearch, setGlossarySearch] = useState('');
  const [indexSearch, setIndexSearch] = useState('');
  const deferredIndexSearch = useDeferredValue(indexSearch);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const fullIndex = useMemo(() => buildJournalIndex(locale), [locale]);

  const filteredByCategory = useMemo(() => {
    const q = deferredIndexSearch.trim().toLowerCase();
    const rows = q ? fullIndex.filter((r) => r.searchText.includes(q)) : fullIndex;
    const grouped: Record<JournalCategory, JournalIndexRow[]> = {
      concept: [], place: [], region: [], journey: [], segment: [], story: [], 'viking-site': [],
    };
    for (const row of rows) grouped[row.category].push(row);
    return grouped;
  }, [fullIndex, deferredIndexSearch]);

  const handleGlossarySearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setGlossarySearch(e.target.value),
    [],
  );

  const handleIndexSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setIndexSearch(e.target.value),
    [],
  );

  const scrollToSection = useCallback((id: string) => {
    setMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ block: 'start' });
          setActiveSection(hash);
        }
      });
    }
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const sectionIds = tocItems.map((t) => t.id);
    const emittedSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            const id = entry.target.id;
            setActiveSection(id);
            if (!emittedSections.has(id)) {
              emittedSections.add(id);
              emitProgressEvent('journal_section_view', id);
            }
            break;
          }
        }
      },
      { root: container, rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [tocItems]);

  const welcomeCopy = journalSections.find((s) => s.id === 'welcome');
  const howToUseCopy = journalSections.find((s) => s.id === 'how-to-use');
  const methodologyCopy = journalSections.find((s) => s.id === 'methodology');

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: 'var(--color-background)' }}>
      <a
        href="#welcome"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:text-[13px]"
        style={{ background: 'var(--color-surface)', color: 'var(--color-gold)' }}
      >
        Skip to content
      </a>

      <header
        className="shrink-0 flex items-center gap-4 px-6 py-3 border-b z-10"
        style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-glass)', backdropFilter: 'blur(20px)' }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[13px] transition-colors shrink-0"
          style={{ color: 'var(--color-gold)' }}
        >
          <ArrowLeft size={14} />
          {locale === 'fr' ? 'Retour \u00e0 la carte' : 'Back to map'}
        </Link>
        <div className="h-4 w-px shrink-0" style={{ background: 'var(--color-border)' }} />
        <h1 className="font-display text-[18px] font-semibold truncate" style={{ color: 'var(--color-parchment)' }}>
          {locale === 'fr' ? 'Journal de l\u2019Atlas' : 'Atlas Journal'}
        </h1>

        <span className="ml-auto hidden md:inline-flex">
          <TextSizeMenu standalone />
        </span>

        <button
          type="button"
          onClick={() => setMobileTocOpen((v) => !v)}
          className="ml-auto md:ml-0 md:hidden flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer"
          style={{ color: 'var(--color-text-dim)' }}
          aria-label={mobileTocOpen ? 'Close table of contents' : 'Open table of contents'}
        >
          {mobileTocOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </header>

      <div className="flex flex-1 min-h-0 relative">
        {/* Desktop TOC */}
        <aside
          className="hidden md:flex w-[200px] shrink-0 flex-col border-r py-6 px-4 overflow-y-auto"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <SectionLabel>{locale === 'fr' ? 'Sommaire' : 'Contents'}</SectionLabel>
          <TocNav items={tocItems} activeId={activeSection} onItemClick={scrollToSection} />
        </aside>

        {/* Mobile TOC overlay */}
        {mobileTocOpen && (
          <div
            className="absolute inset-0 z-20 md:hidden"
            style={{ background: 'var(--color-surface-glass)', backdropFilter: 'blur(20px)' }}
          >
            <div className="p-6">
              <SectionLabel>{locale === 'fr' ? 'Sommaire' : 'Contents'}</SectionLabel>
              <TocNav items={tocItems} activeId={activeSection} onItemClick={scrollToSection} />
            </div>
          </div>
        )}

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
          <div className="max-w-3xl">
            {/* Welcome */}
            {welcomeCopy && (
              <section>
                <SectionHeading id="welcome">{pickI18n(welcomeCopy.heading, locale)}</SectionHeading>
                <Prose>{pickI18n(welcomeCopy.body, locale)}</Prose>
              </section>
            )}

            <SectionDivider />

            {/* How to use */}
            {howToUseCopy && (
              <section>
                <SectionHeading id="how-to-use">{pickI18n(howToUseCopy.heading, locale)}</SectionHeading>
                <Prose>{pickI18n(howToUseCopy.body, locale)}</Prose>
              </section>
            )}

            <SectionDivider />

            {/* Your Ledger */}
            <section>
              <SectionHeading id="your-ledger">
                {t('ledger.heading', locale)}
              </SectionHeading>
              <Prose>
                {locale === 'fr'
                  ? 'Votre registre personnel suit tout ce que vous avez exploré — lieux, routes, époques et récits. Il est stocké localement dans votre navigateur.'
                  : 'Your personal ledger tracks everything you have explored — places, routes, eras, and stories. It is stored locally in your browser.'}
              </Prose>
              <JournalLedgerSection locale={locale} />
            </section>

            <SectionDivider />

            {/* Timeline */}
            <section>
              <SectionHeading id="timeline">
                {locale === 'fr' ? 'Chronologie des \u00e9poques' : 'Timeline of Eras'}
              </SectionHeading>
              <Prose>
                {locale === 'fr'
                  ? 'Chaque \u00e9poque dans l\u2019atlas r\u00e9v\u00e8le une couche diff\u00e9rente d\u2019activit\u00e9 historique. Voici la chronologie compl\u00e8te.'
                  : 'Each era in the atlas reveals a different layer of historical activity. Here is the full chronology.'}
              </Prose>
              <TimelineSection locale={locale} />
            </section>

            <SectionDivider />

            {/* Arcs */}
            <section>
              <SectionHeading id="arcs">
                {locale === 'fr' ? 'Arcs narratifs' : 'Story Arcs'}
              </SectionHeading>
              <Prose>
                {locale === 'fr'
                  ? 'Les arcs narratifs regroupent plusieurs \u00e9poques en histoires coh\u00e9rentes que vous pouvez suivre sur la carte.'
                  : 'Story arcs group multiple eras into coherent narratives you can follow on the map.'}
              </Prose>
              <ArcsSection locale={locale} />
            </section>

            <SectionDivider />

            {/* Norman surnames */}
            <section>
              <SectionHeading id="norman-surnames">
                {locale === 'fr' ? 'Patronymes normands' : 'Norman Surnames'}
              </SectionHeading>
              <div className="mt-4">
                <NormanNamesExplorer locale={locale} />
              </div>
            </section>

            <SectionDivider />

            {/* ── Atlas Index ── */}
            <div className="mt-4 mb-6">
              <div className="relative max-w-md">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--color-text-dim)' }}
                />
                <input
                  type="text"
                  value={indexSearch}
                  onChange={handleIndexSearchChange}
                  placeholder={locale === 'fr' ? 'Rechercher dans l\u2019index\u2026' : 'Search the atlas index\u2026'}
                  className="w-full pl-9 pr-3 py-2 rounded-md text-[13px] outline-none border transition-colors"
                  style={{
                    background: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>
            </div>

            {/* Concepts (glossary) */}
            <section>
              <SectionHeading id="index-concepts">
                {locale === 'fr' ? 'Concepts & glossaire' : 'Concepts & Glossary'}
              </SectionHeading>
              <Prose>
                {locale === 'fr'
                  ? 'Termes cl\u00e9s utilis\u00e9s dans l\u2019atlas. Cliquez sur « Voir aussi » pour explorer les liens entre les termes.'
                  : 'Key terms used in the atlas. Click "See also" to explore connections between entries.'}
              </Prose>
              {deferredIndexSearch.trim() ? (
                <IndexSection rows={filteredByCategory.concept} locale={locale} />
              ) : (
                <>
                  <div className="mt-4">
                    <div className="relative max-w-md">
                      <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ color: 'var(--color-text-dim)' }}
                      />
                      <input
                        type="text"
                        value={glossarySearch}
                        onChange={handleGlossarySearchChange}
                        placeholder={locale === 'fr' ? 'Rechercher un terme\u2026' : 'Search terms\u2026'}
                        className="w-full pl-9 pr-3 py-2 rounded-md text-[13px] outline-none border transition-colors"
                        style={{
                          background: 'var(--color-surface)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text)',
                        }}
                      />
                    </div>
                  </div>
                  <GlossarySection locale={locale} searchQuery={glossarySearch} />
                </>
              )}
            </section>

            <SectionDivider />

            {/* Places */}
            <section>
              <SectionHeading id="index-places">
                {locale === 'fr' ? 'Lieux' : 'Places'}
              </SectionHeading>
              <Prose>
                {locale === 'fr'
                  ? 'Tous les lieux repr\u00e9sent\u00e9s sur la carte \u2014 villes, ports, colonies et n\u0153uds abstraits. Chaque lien ouvre l\u2019\u00e9poque la plus pertinente.'
                  : 'Every settlement, port, and node on the map. Each link opens the most relevant era.'}
              </Prose>
              <IndexSection rows={filteredByCategory.place} locale={locale} />
            </section>

            <SectionDivider />

            {/* Regions */}
            <section>
              <SectionHeading id="index-regions">
                {locale === 'fr' ? 'R\u00e9gions' : 'Regions'}
              </SectionHeading>
              <Prose>
                {locale === 'fr'
                  ? 'R\u00e9gions historiques et territoires tribaux, chacun avec un r\u00e9cit par \u00e9poque quand disponible.'
                  : 'Historical regions and tribal territories, each with a per-era narrative when available.'}
              </Prose>
              <IndexSection rows={filteredByCategory.region} locale={locale} />
            </section>

            <SectionDivider />

            {/* Journeys */}
            <section>
              <SectionHeading id="index-journeys">
                {locale === 'fr' ? 'Routes & voyages' : 'Routes & Journeys'}
              </SectionHeading>
              <Prose>
                {locale === 'fr'
                  ? 'Les grands itin\u00e9raires de la carte \u2014 invasions, explorations, corridors commerciaux et vagues migratoires.'
                  : 'Major itineraries on the map \u2014 invasions, explorations, trade corridors, and migration waves.'}
              </Prose>
              <IndexSection rows={filteredByCategory.journey} locale={locale} />
            </section>

            <SectionDivider />

            {/* Story */}
            <section>
              <SectionHeading id="index-story">
                {locale === 'fr' ? 'R\u00e9cit \u2014 \u00e9tapes' : 'Story Beats'}
              </SectionHeading>
              <Prose>
                {locale === 'fr'
                  ? 'Tous les moments narratifs du mode histoire, regroup\u00e9s chronologiquement. Chaque lien lance l\u2019\u00e9tape correspondante.'
                  : 'Every narrative moment from story mode, in chronological order. Each link launches the corresponding step.'}
              </Prose>
              <IndexSection rows={filteredByCategory.story} locale={locale} />
            </section>

            <SectionDivider />

            {/* Viking World Sites */}
            <section>
              <SectionHeading id="index-viking-sites">
                {locale === 'fr' ? 'Sites vikings' : 'Viking Sites'}
              </SectionHeading>
              <Prose>
                {locale === 'fr'
                  ? 'Sites archéologiques et sépultures de l\'âge viking à travers l\'Europe — des données ADN ancien aux emporia, forteresses, trésors et pierres runiques.'
                  : 'Viking-age archaeological sites and burials across Europe — from ancient DNA to emporia, fortresses, hoards, and runestones.'}
              </Prose>
              <IndexSection rows={filteredByCategory['viking-site']} locale={locale} />
            </section>

            <SectionDivider />

            {/* Y-DNA Settler Lineages */}
            <section>
              <SectionHeading id="ydna-lineages">
                {locale === 'fr' ? 'Lignées paternelles (ADN-Y)' : 'Paternal Lineages (Y-DNA)'}
              </SectionHeading>
              <Prose>
                {locale === 'fr'
                  ? 'L\u2019Atlas normand int\u00e8gre les r\u00e9sultats du projet de triangulation ADN-Y de Francog\u00e8ne, qui relie les tests d\u2019ADN-Y de descendants modernes \u00e0 des colons sp\u00e9cifiques de la Nouvelle-France. Plus de 670 lign\u00e9es sont repr\u00e9sent\u00e9es sur la carte, chacune color\u00e9e par haplogroupe majeur.'
                  : 'The Norman Atlas integrates results from the Francogene Y-DNA triangulation project, which links modern descendant Y-DNA tests to specific New France settlers. Over 670 lineages are represented on the map, each colour-coded by major haplogroup.'}
              </Prose>
              <div className="mt-4 space-y-3">
                <div>
                  <SectionLabel>{locale === 'fr' ? 'Qu\u2019est-ce que l\u2019ADN-Y\u00a0?' : 'What is Y-DNA?'}</SectionLabel>
                  <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
                    {locale === 'fr'
                      ? 'L\u2019ADN du chromosome Y est transmis de p\u00e8re en fils pratiquement sans changement \u00e0 chaque g\u00e9n\u00e9ration. En testant les descendants modernes, les g\u00e9n\u00e9ticiens peuvent d\u00e9duire l\u2019haplogroupe probable d\u2019un anc\u00eatre historique. Un haplogroupe (par ex. R1b, I1, G2) repr\u00e9sente une branche profonde de l\u2019arbre g\u00e9n\u00e9alogique paternel humain.'
                      : 'Y-chromosome DNA is passed from father to son virtually unchanged each generation. By testing modern descendants, geneticists can infer the probable haplogroup of a historical ancestor. A haplogroup (e.g. R1b, I1, G2) represents a deep branch on the human paternal family tree.'}
                  </p>
                </div>
                <div>
                  <SectionLabel>{locale === 'fr' ? 'Avertissement' : 'Disclaimer'}</SectionLabel>
                  <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-text-dim)' }}>
                    {locale === 'fr'
                      ? 'Les haplogroupes sont bas\u00e9s sur des tests d\u2019ADN-Y de descendants modernes, et non sur l\u2019ADN ancien des colons eux-m\u00eames. Les \u00e9v\u00e9nements de non-paternit\u00e9 ou les adoptions non document\u00e9es \u00e0 tout point de la lign\u00e9e peuvent rompre la cha\u00eene entre la personne historique et le descendant test\u00e9.'
                      : 'Haplogroups are based on modern descendant Y-DNA testing, not on ancient DNA from the settlers themselves. Non-paternity events or undocumented adoptions at any point in the lineage can break the chain between the historical person and the tested descendant.'}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Link
                    href="/?era=new-france-foundations"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors"
                    style={{ background: 'var(--color-chrome-fill)', color: 'var(--color-gold-muted)' }}
                  >
                    <Map size={12} />
                    {locale === 'fr' ? 'Voir sur la carte' : 'View on map'}
                  </Link>
                  <a
                    href="https://www.francogene.com/triangulation/y.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] transition-colors"
                    style={{ color: 'var(--color-text-dim)' }}
                  >
                    <ExternalLink size={10} />
                    Francogene
                  </a>
                </div>
              </div>
            </section>

            <SectionDivider />

            {/* Methodology */}
            {methodologyCopy && (
              <section>
                <SectionHeading id="methodology">{pickI18n(methodologyCopy.heading, locale)}</SectionHeading>
                <Prose>{pickI18n(methodologyCopy.body, locale)}</Prose>
              </section>
            )}

            <div className="h-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
