'use client';

import Link from 'next/link';
import {
  Award,
  BookMarked,
  BookOpen,
  Clapperboard,
  Dna,
  Feather,
  FolderOpen,
  GitCompare,
  Heart,
  Library,
  Map,
  NotebookText,
  Route,
  MapPin,
  Share2,
  Signpost,
  Type,
  Users,
} from 'lucide-react';
import ReplayTourButton from '@/components/onboarding/ReplayTourButton';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import BasemapSwitcher from '@/components/ui/BasemapSwitcher';
import TextSizeMenu from '@/components/ui/TextSizeMenu';
import { BackgroundMusic } from '@/components/audio/BackgroundMusic';
import { digitalGuidesTooltipHint, digitalGuidesTooltipLabel } from '@/lib/digital-guides-ui';
import { isDigitalGuidesPublic } from '@/lib/digital-guides-public';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import { ATLAS_REFERENCE_HUB_PATH } from '@/lib/atlas-reference-routes';
import { GENEALOGY_HUB_PATH, GENEALOGY_DEEP_ORIGINS_PATH } from '@/lib/genealogy-paths';
import type { AtlasLocale } from '@/core/types';

export type AtlasToolsMenuBodyProps = {
  locale: AtlasLocale;
  guidesPublic: boolean;
  changelogHasUnread: boolean;
  supportAtlasEnabled: boolean;
  onClose: () => void;
  /** e.g. end ledger pulse before leaving for reference hub */
  beforeReferenceNav?: () => void;
  onNormanOverview: () => void;
  onChangelog: () => void;
  onLedger: () => void;
  onProfile: () => void;
  onShare: () => void;
  onCredits: () => void;
  onSupport?: () => void;
};

export default function AtlasToolsMenuBody({
  locale,
  guidesPublic: _guidesPublic,
  changelogHasUnread,
  supportAtlasEnabled,
  onClose,
  beforeReferenceNav,
  onNormanOverview,
  onChangelog,
  onLedger,
  onProfile,
  onShare,
  onCredits,
  onSupport,
}: AtlasToolsMenuBodyProps) {
  void _guidesPublic;
  const guidesPublic = isDigitalGuidesPublic();
  const sectionClass = 'text-[9px] font-semibold uppercase tracking-[0.18em] text-text-dim/50 mb-2';

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <div className="space-y-2">
          <p className={sectionClass}>{t('toolsMenu.section.atlas', locale)}</p>
          <Link
            href="/"
            onClick={() => onClose()}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
          >
            <Map className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-text-muted">{t('toolsMenu.mapLabel', locale)}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{t('toolsMenu.mapHint', locale)}</span>
            </span>
          </Link>
          <Link
            href="/stories"
            onClick={() => onClose()}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
            data-onboarding="stories"
          >
            <Clapperboard className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-text-muted">{t('storyLibrary.title', locale)}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{t('storyLibrary.subtitle', locale)}</span>
            </span>
          </Link>
        </div>

        <div className="space-y-2">
          <p className={sectionClass}>{t('toolsMenu.section.reference', locale)}</p>
          <Link
            href={ATLAS_REFERENCE_HUB_PATH}
            onClick={() => {
              beforeReferenceNav?.();
              onClose();
            }}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
          >
            <Library className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-text-muted">{t('guidesHub.label', locale)}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{t('guidesHub.hint', locale)}</span>
            </span>
          </Link>
          <Link
            href="/journal"
            onClick={() => {
              beforeReferenceNav?.();
              onClose();
            }}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
          >
            <NotebookText className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-text-muted">{t('atlasJournal.tooltip.label', locale)}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{t('atlasJournal.tooltip.hint', locale)}</span>
            </span>
          </Link>
          <Link
            href="/companion"
            onClick={() => onClose()}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
          >
            <BookMarked className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-text-muted">{t('companion.title', locale)}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{t('companion.tooltip', locale)}</span>
            </span>
          </Link>
          {guidesPublic && (
            <Link
              href="/guides"
              onClick={() => onClose()}
              className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
            >
              <FolderOpen className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-medium text-text-muted">{pickI18n(digitalGuidesTooltipLabel, locale)}</span>
                <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{pickI18n(digitalGuidesTooltipHint, locale)}</span>
              </span>
            </Link>
          )}
          <Link
            href="/norman-names"
            onClick={() => onClose()}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
          >
            <Type className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-text-muted">{t('toolsMenu.normanSurnamesLabel', locale)}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{t('toolsMenu.normanSurnamesHint', locale)}</span>
            </span>
          </Link>
        </div>

        <div className="space-y-2">
          <p className={sectionClass}>{t('toolsMenu.section.genetics', locale)}</p>
          <Link
            href="/lineage-explorer"
            onClick={() => onClose()}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
          >
            <Dna className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-text-muted">{t('lineageExplorer.navLabel', locale)}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{t('lineageExplorer.navHint', locale)}</span>
            </span>
          </Link>
          <Link
            href="/lineage-explorer/migration-map"
            onClick={() => onClose()}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
          >
            <Route className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-text-muted">{t('lineageExplorer.migrationMapLink', locale)}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{t('lineageExplorer.migrationMapTitle', locale)}</span>
            </span>
          </Link>
          <Link
            href="/lineage-explorer/compare"
            onClick={() => onClose()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium text-text-muted transition-colors hover:bg-chrome-fill-badge hover:text-parchment touch-target"
          >
            <GitCompare className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            {t('lineageExplorer.compareLink', locale)}
          </Link>
          <Link
            href={GENEALOGY_DEEP_ORIGINS_PATH}
            onClick={() => onClose()}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-text-muted">{t('toolsMenu.deepOriginsLabel', locale)}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{t('toolsMenu.deepOriginsHint', locale)}</span>
            </span>
          </Link>
          <Link
            href={GENEALOGY_HUB_PATH}
            onClick={() => onClose()}
            className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-chrome-fill-badge touch-target"
          >
            <Users className="mt-0.5 h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-text-muted">{t('genealogy.navLabel', locale)}</span>
              <span className="mt-0.5 block text-[11px] leading-snug text-text-dim">{t('ancestry.hubHint', locale)}</span>
            </span>
          </Link>
        </div>

        <div className="space-y-2">
          <p className={sectionClass}>{t('toolsMenu.section.account', locale)}</p>
          <button
            type="button"
            onClick={() => {
              onNormanOverview();
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 opacity-60" aria-hidden>
              <path d="M2 2h5v5H2zM9 2h5v5H9zM2 9h5v5H2zM9 9h5v5H9z" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {t('normanOverview.tooltip.label', locale)}
          </button>
          <button
            type="button"
            onClick={() => {
              onChangelog();
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
          >
            <span className="relative shrink-0">
              <Signpost className="h-4 w-4 opacity-60" strokeWidth={1.5} aria-hidden />
              {changelogHasUnread && (
                <span className="absolute -right-0.5 -top-0.5 h-[6px] w-[6px] rounded-full bg-emerald-400" />
              )}
            </span>
            {t('changelog.mobileDrawer.label', locale)}
          </button>
          <button
            type="button"
            onClick={() => {
              onLedger();
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
          >
            <BookOpen className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            {t('ledger.mobileDrawer.label', locale)}
          </button>
          <button
            type="button"
            onClick={() => {
              onProfile();
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
          >
            <Award className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.2} aria-hidden />
            {t('profile.mobileDrawer.label', locale)}
          </button>
          <button
            type="button"
            onClick={() => {
              onShare();
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
          >
            <Share2 className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.5} aria-hidden />
            {t('shareView.mobileDrawer.label', locale)}
          </button>
        </div>
      </div>

      <div className="h-px bg-chrome-divider" />

      <div className="space-y-2">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-text-dim/50 mb-2">Help</p>
        <ReplayTourButton fullWidth />
      </div>

      <div className="h-px bg-chrome-divider" />

      <div className="space-y-2" data-onboarding="theme">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-text-dim/50 mb-2">Preferences</p>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[13px] text-text-muted">Theme</span>
          <ThemeSwitcher />
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[13px] text-text-muted">Basemap</span>
          <BasemapSwitcher />
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[13px] text-text-muted">Text size</span>
          <TextSizeMenu />
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[13px] text-text-muted">Language</span>
          <LanguageSwitcher />
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-[13px] text-text-muted">Music</span>
          <BackgroundMusic floating={false} />
        </div>
      </div>

      <div className="h-px bg-chrome-divider" />

      <div className="space-y-2">
        {supportAtlasEnabled && onSupport && (
          <button
            type="button"
            onClick={() => {
              onSupport();
              onClose();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-gold/80 hover:bg-gold/8 hover:text-gold transition-colors touch-target"
          >
            <Heart className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.5} aria-hidden />
            {t('support.mobileDrawer.label', locale)}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            onCredits();
            onClose();
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-text-muted hover:bg-chrome-fill-badge hover:text-parchment transition-colors touch-target"
        >
          <Feather className="h-4 w-4 shrink-0 opacity-60" strokeWidth={1.5} aria-hidden />
          {t('credits.headerButtonFull', locale)}
        </button>
      </div>
    </div>
  );
}
