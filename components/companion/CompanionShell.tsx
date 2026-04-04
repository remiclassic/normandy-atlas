'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AtlasSubpageChromeHeader from '@/components/layout/AtlasSubpageChromeHeader';
import ReferenceHubTabs from '@/components/layout/ReferenceHubTabs';
import AtlasSubpageToolsMenu from '@/components/layout/AtlasSubpageToolsMenu';
import AtlasReadingNoiseBackdrop from '@/components/layout/AtlasReadingNoiseBackdrop';
import { useLocale } from '@/hooks/use-atlas';
import { useMapStore } from '@/lib/store';
import { t } from '@/lib/ui-strings';
import { CompanionMarkdown } from '@/lib/companion-markdown';
import { companionCampaignNav } from '@/content/companion/meta';
import { atlasHubShellStyle } from '@/lib/atlas-hub-shell-style';
import { useReferenceHubSwipeNav } from '@/hooks/use-reference-hub-swipe-nav';

export interface CompanionFlatTocItem {
  id: string;
  label: string;
}

const SectionLabel = memo(function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-2 font-sans text-[length:var(--atlas-text-xs)] font-semibold uppercase tracking-[0.28em]"
      style={{ color: 'var(--color-gold-muted)' }}
    >
      — {children} —
    </p>
  );
});

const CompanionTocNav = memo(function CompanionTocNav({
  ariaLabel,
  tocById,
  activeId,
  onItemClick,
}: {
  ariaLabel: string;
  tocById: Map<string, string>;
  activeId: string;
  onItemClick: (id: string) => void;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <div className="flex flex-col gap-4 pb-4">
        {companionCampaignNav.map((campaign) => {
          const items = campaign.sectionIds
            .map((id) => {
              const label = tocById.get(id);
              return label ? { id, label } : null;
            })
            .filter(Boolean) as { id: string; label: string }[];
          if (items.length === 0) return null;
          return (
            <div key={campaign.id}>
              <p className="companion-toc-campaign">{campaign.label}</p>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onItemClick(item.id)}
                      className="w-full text-left px-3 py-1.5 rounded-md text-[length:var(--atlas-text-base)] transition-colors cursor-pointer"
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
            </div>
          );
        })}
      </div>
    </nav>
  );
});

export default function CompanionShell({
  source,
  flatToc,
}: {
  source: string;
  flatToc: CompanionFlatTocItem[];
}) {
  const locale = useLocale();
  const tocById = useMemo(() => new Map(flatToc.map((row) => [row.id, row.label])), [flatToc]);
  const sectionIds = useMemo(() => flatToc.map((r) => r.id), [flatToc]);

  const contentRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(() => flatToc[0]?.id ?? '');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useReferenceHubSwipeNav(contentRef, { disabled: mobileTocOpen });

  const stopLedgerPulseOnJournalNavigate = useCallback(() => {
    useMapStore.getState().endLedgerCelebration();
  }, []);

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
    if (!container || sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            setActiveSection(entry.target.id);
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
  }, [sectionIds, source]);

  const firstId = flatToc[0]?.id ?? 'companion-content';

  return (
    <div className="companion-root fixed inset-0 z-0 flex flex-col bg-[var(--color-background)]">
      <AtlasReadingNoiseBackdrop />
      <a
        href={`#${firstId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-[length:var(--atlas-text-md)]"
        style={{ background: 'var(--color-surface)', color: 'var(--color-gold)' }}
      >
        Skip to content
      </a>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col" style={atlasHubShellStyle}>
        <div className="companion-hide-print">
          <AtlasSubpageChromeHeader
            onOpenToolsMenu={() => setToolsOpen(true)}
            mobileToc={{
              open: mobileTocOpen,
              onToggle: () => setMobileTocOpen((v) => !v),
              openLabel: t('companion.tocOpen', locale),
              closeLabel: t('companion.tocClose', locale),
            }}
          />
          <ReferenceHubTabs />
        </div>

        <div className="relative flex min-h-0 flex-1">
        <aside
          className="companion-hide-print hidden w-[200px] shrink-0 flex-col overflow-y-auto scrollbar-thin border-r py-6 px-4 md:flex"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <SectionLabel>{t('companion.contents', locale)}</SectionLabel>
          <CompanionTocNav
            ariaLabel={t('companion.tocNavAria', locale)}
            tocById={tocById}
            activeId={activeSection}
            onItemClick={scrollToSection}
          />
        </aside>

        {mobileTocOpen && (
          <div
            className="companion-hide-print absolute inset-0 z-20 md:hidden"
            style={{ background: 'var(--color-surface-glass)', backdropFilter: 'blur(20px)' }}
          >
            <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin px-6 pb-6 pt-[max(1.5rem,env(safe-area-inset-top)+0.75rem)]">
              <SectionLabel>{t('companion.contents', locale)}</SectionLabel>
              <CompanionTocNav
                ariaLabel={t('companion.tocNavAria', locale)}
                tocById={tocById}
                activeId={activeSection}
                onItemClick={scrollToSection}
              />
            </div>
          </div>
        )}

        <main
          id="companion-content"
          ref={contentRef}
          className="companion-print-main relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-y-contain scrollbar-thin bg-[var(--color-background)] py-10 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] pb-[max(2.5rem,env(safe-area-inset-bottom)+1.5rem)] md:px-8 md:py-14 md:pb-14"
        >
          <CompanionMarkdown source={source} />
          <div className="h-24" />
        </main>
        </div>
      </div>

      <div className="companion-hide-print">
        <AtlasSubpageToolsMenu
          open={toolsOpen}
          onClose={() => setToolsOpen(false)}
          beforeReferenceNav={stopLedgerPulseOnJournalNavigate}
        />
      </div>
    </div>
  );
}
