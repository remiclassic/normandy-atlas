'use client';

import { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import {
  flythroughPresets,
  isFlythroughPresetVisibleInEra,
  type FlythroughPreset,
} from '@/data/atlas/flythrough-presets';
import { pickI18n } from '@/lib/locale';
import { t } from '@/lib/ui-strings';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';

/**
 * Side-view longship / knarr silhouette so the control reads clearly as a boat at small sizes.
 */
function LongshipBoatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Hull — curved keel, fuller midship */}
      <path
        d="M3.5 15.2C6.8 12.2 12.5 10.5 19 10.5c6 0 11.2 1.6 14.5 4.2l-.9 1.5c-3-2-7.8-3.2-13.6-3.2C13 13 8.2 14.2 5.2 16.2l-1.7-1z"
        fill="currentColor"
        opacity={0.92}
      />
      {/* Upper sheer / gunwale line */}
      <path
        d="M5 14.5c3.5-2 8.5-3.2 14-3.2 5.6 0 10.5 1.2 13.8 3"
        stroke="currentColor"
        strokeWidth={0.9}
        strokeLinecap="round"
        opacity={0.45}
      />
      {/* Dragon / curled prow */}
      <path
        d="M31.5 13.2c1.2-.4 2.4-.4 3.6 0 .3 1.7-.8 2.4-2.2 2.1-.9-1.1-1.2-2-1.4-2.1z"
        fill="currentColor"
        opacity={0.85}
      />
      <path
        d="M33.5 11.5c.8.2 1.4.8 1.7 1.6"
        stroke="currentColor"
        strokeWidth={0.85}
        strokeLinecap="round"
        opacity={0.7}
      />
      {/* Stern post */}
      <path
        d="M4.2 16.2 3 14.8c.4-.8 1.2-1.3 2-1.1l.8 1.8z"
        fill="currentColor"
        opacity={0.78}
      />
      {/* Mast */}
      <path
        d="M16.8 10.8V3.2"
        stroke="currentColor"
        strokeWidth={1.15}
        strokeLinecap="round"
        opacity={0.95}
      />
      {/* Square sail */}
      <path
        d="M16.8 4 25.2 9l-8.4 4.8V4z"
        fill="currentColor"
        opacity={0.38}
      />
      {/* Shield line along hull */}
      <circle cx="9" cy="13.8" r="0.9" fill="currentColor" opacity={0.2} />
      <circle cx="12.5" cy="13.5" r="0.9" fill="currentColor" opacity={0.2} />
      <circle cx="22" cy="13.5" r="0.9" fill="currentColor" opacity={0.2} />
    </svg>
  );
}

/** Compact control: lives in the left map-tools stack with LayerPanel. */
export function FlythroughPresetPicker() {
  const flythrough = useMapStore((s) => s.cinematicFlythrough);
  const storyMode = useMapStore((s) => s.storyMode);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const eraId = useMapStore((s) => s.eraId);
  const locale = useMapStore((s) => s.locale);
  const startFlythrough = useMapStore((s) => s.startCinematicFlythrough);
  const storyEraIntroActive = useMapStore((s) => s.storyEraIntroActive);

  const [menuOpen, setMenuOpen] = useState(false);
  const pickerRootRef = useRef<HTMLDivElement>(null);

  const visiblePresets = useMemo(
    () => flythroughPresets.filter((p) => isFlythroughPresetVisibleInEra(p, eraId)),
    [eraId],
  );

  const isActive = flythrough !== null;
  const show =
    atlasMode &&
    !isActive &&
    !storyMode &&
    visiblePresets.length > 0 &&
    !storyEraIntroActive;

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (pickerRootRef.current?.contains(e.target as Node)) return;
      setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('touchstart', onDoc, { passive: true });
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('touchstart', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleStart = useCallback(
    (id: string) => {
      startFlythrough(id);
      setMenuOpen(false);
    },
    [startFlythrough],
  );

  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  if (!show) return null;

  const tooltipLabel = t('flythrough.picker.tooltip.label', locale);
  const tooltipHint = t('flythrough.picker.tooltip.hint', locale);
  const menuAria = t('flythrough.picker.menuAria', locale);

  return (
    <div ref={pickerRootRef} className="relative z-30 shrink-0 pointer-events-auto">
      <ChromeIconTooltip
        label={tooltipLabel}
        hint={tooltipHint}
        placement="top"
        wrapperClassName="inline-flex"
      >
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-haspopup="listbox"
          aria-controls="flythrough-preset-listbox"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/20 bg-chrome-fill/95 text-gold shadow-md shadow-black/25 backdrop-blur-md transition-all duration-200 hover:border-gold/40 hover:bg-gold/10 hover:text-gold-bright hover:shadow-[0_0_18px_rgba(212,175,55,0.14)] active:scale-[0.97] touch-target ${menuOpen ? 'border-gold/45 bg-gold/12 text-gold-bright' : ''}`}
        >
          <LongshipBoatIcon className="h-[26px] w-[26px]" />
        </button>
      </ChromeIconTooltip>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            id="flythrough-preset-listbox"
            role="listbox"
            aria-label={menuAria}
            initial={{ opacity: 0, x: -6, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-full top-0 z-[60] ml-2 w-[min(17.5rem,calc(100vw-3.5rem))] max-h-[min(60vh,22rem)] overflow-y-auto overscroll-y-contain rounded-xl border border-border/60 bg-[var(--color-surface-elevated)] py-1 shadow-xl shadow-black/40 backdrop-blur-xl scrollbar-thin"
          >
            {visiblePresets.map((p: FlythroughPreset) => (
              <li key={p.id} role="presentation" className="px-1">
                <button
                  type="button"
                  role="option"
                  onClick={() => handleStart(p.id)}
                  className="flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gold/10 touch-target"
                >
                  <span className="text-[12px] font-semibold leading-snug text-parchment">
                    {pickI18n(p.title, locale)}
                  </span>
                  <span className="text-[10px] leading-snug text-text-dim/75 line-clamp-2">
                    {pickI18n(p.subtitle, locale)}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
