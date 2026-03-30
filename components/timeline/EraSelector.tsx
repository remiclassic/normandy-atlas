'use client';

import {
  memo,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import { useMapStore } from '@/lib/store';
import {
  getEraSelectorModel,
  formatYear,
  type EraItem,
} from '@/lib/era-selector-model';
import { EraGlyph } from '@/lib/era-selector-icons';
import EraIconStrip, { EraIconDots } from './EraIconStrip';

const JUMP_PANEL_WIDTH_PX = 288; // matches w-72
const TOOLTIP_WIDTH = 240;

// ─── Portal tooltip for era icons ───────────────────────────────────

function EraIconTooltip({
  item,
  anchorRect,
}: {
  item: EraItem;
  anchorRect: DOMRect;
}) {
  if (typeof document === 'undefined') return null;

  const left = Math.max(8, Math.min(
    anchorRect.left + anchorRect.width / 2 - TOOLTIP_WIDTH / 2,
    window.innerWidth - TOOLTIP_WIDTH - 8,
  ));
  const top = anchorRect.bottom + 8;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: -4, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.96 }}
      transition={{ duration: 0.12 }}
      role="tooltip"
      className="pointer-events-none fixed z-[9999] rounded-lg border border-white/[0.08] px-3.5 py-2.5"
      style={{
        left,
        top,
        width: TOOLTIP_WIDTH,
        background: 'rgba(13, 15, 22, 0.97)',
        backdropFilter: 'blur(24px) saturate(1.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      <p className="text-[12px] font-semibold text-parchment leading-tight">
        {item.label}
      </p>
      <p className="text-[10px] text-text-dim/60 mt-0.5 tabular-nums">
        {formatYear(item.yearRange[0])} – {formatYear(item.yearRange[1])}
      </p>
      {item.summary && (
        <p className="text-[10px] text-text-dim/50 mt-1.5 leading-snug line-clamp-3">
          {item.summary}
        </p>
      )}
    </motion.div>,
    document.body,
  );
}

// ─── Icon rail item ────────────────────────────────────────────────

const EraIcon = memo(function EraIcon({
  item,
  isActive,
  disabled,
  onSelect,
  atlasMode,
}: {
  item: EraItem;
  isActive: boolean;
  disabled: boolean;
  onSelect: (id: string) => void;
  atlasMode: boolean;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const ariaLabel = `${item.label}, ${formatYear(item.yearRange[0])} – ${formatYear(item.yearRange[1])}`;

  const showTip = useCallback(() => {
    if (btnRef.current) {
      setRect(btnRef.current.getBoundingClientRect());
      setHovered(true);
    }
  }, []);
  const hideTip = useCallback(() => setHovered(false), []);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => onSelect(item.id)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-current={isActive ? 'step' : undefined}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        onFocus={showTip}
        onBlur={hideTip}
        className={`
          relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md
          transition-all duration-200
          ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
          ${
            isActive
              ? 'text-parchment'
              : disabled
                ? 'text-text-dim/40'
                : 'text-text-dim hover:text-text-muted'
          }
        `}
      >
        {isActive && (
          <motion.div
            layoutId="era-icon-active"
            className="absolute inset-0 rounded-md bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-gold/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          />
        )}

        {!isActive && !disabled && (
          <div className="absolute inset-0 rounded-md bg-white/0 hover:bg-white/[0.03] transition-colors duration-200" />
        )}

        <EraGlyph id={item.id} className="relative z-10 h-4 w-4" />

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold/70"
            />
          )}
        </AnimatePresence>

        {!isActive && <EraIconDots eraId={item.id} atlasMode={atlasMode} />}
      </button>

      <AnimatePresence>
        {hovered && rect && (
          <EraIconTooltip item={item} anchorRect={rect} />
        )}
      </AnimatePresence>
    </>
  );
});

// ─── Jump menu ─────────────────────────────────────────────────────

function JumpPanel({
  open,
  onClose,
  onSelect,
  currentEra,
  containerRef,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
  currentEra: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const atlasMode = useMapStore((s) => s.atlasMode);
  const locale = useMapStore((s) => s.locale);
  const model = useMemo(() => getEraSelectorModel(atlasMode, locale), [atlasMode, locale]);
  const panelRef = useRef<HTMLDivElement>(null);
  const [fixedStyle, setFixedStyle] = useState<React.CSSProperties | null>(null);

  const updatePosition = useCallback(() => {
    const anchor = containerRef.current;
    if (!anchor || typeof window === 'undefined') return;
    const rect = anchor.getBoundingClientRect();
    const margin = 8;
    let left = rect.right - JUMP_PANEL_WIDTH_PX;
    left = Math.min(left, window.innerWidth - JUMP_PANEL_WIDTH_PX - margin);
    left = Math.max(margin, left);
    const top = rect.bottom + margin;
    const maxH = Math.max(120, window.innerHeight - top - margin);
    setFixedStyle({
      position: 'fixed',
      top,
      left,
      width: JUMP_PANEL_WIDTH_PX,
      zIndex: 9999,
      maxHeight: Math.min(window.innerHeight * 0.6, maxH),
    });
  }, [containerRef]);

  useLayoutEffect(() => {
    if (!open) {
      setFixedStyle(null);
      return;
    }
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        containerRef.current && !containerRef.current.contains(target)
      ) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [open, onClose, containerRef]);

  useEffect(() => {
    if (open && panelRef.current) {
      const first = panelRef.current.querySelector<HTMLButtonElement>('button[data-era-jump]');
      first?.focus();
    }
  }, [open]);

  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
      onClose();
    },
    [onSelect, onClose],
  );

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && fixedStyle && (
        <motion.div
          ref={panelRef}
          style={fixedStyle}
          initial={{ opacity: 0, y: -4, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.97 }}
          transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-y-auto rounded-xl border border-white/[0.08] bg-[rgba(13,15,22,0.96)] py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl scrollbar-thin"
        >
          {model.groups.map((group, gi) => (
            <div key={group.label || gi}>
              {group.label && (
                <div className="px-3.5 pt-2.5 pb-1">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-text-dim/50">
                    {group.label}
                  </span>
                </div>
              )}
              {group.items.map((item) => {
                const active = item.id === currentEra;
                return (
                  <button
                    key={item.id}
                    data-era-jump
                    onClick={() => handleSelect(item.id)}
                    className={`
                      flex w-full items-center gap-2.5 px-3.5 py-1.5 text-left
                      transition-colors duration-150
                      ${active ? 'bg-white/[0.05] text-parchment' : 'text-text-muted hover:bg-white/[0.03] hover:text-parchment'}
                    `}
                  >
                    <EraGlyph id={item.id} className="h-3.5 w-3.5 flex-shrink-0 opacity-60" />
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-medium leading-tight">
                        {item.label}
                      </span>
                      <span className="block text-[10px] leading-tight opacity-50">
                        {formatYear(item.yearRange[0])} – {formatYear(item.yearRange[1])}
                      </span>
                      <EraIconStrip eraId={item.id} atlasMode={atlasMode} maxIcons={6} />
                    </div>
                    {active && (
                      <div className="ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/70" />
                    )}
                  </button>
                );
              })}
              {gi < model.groups.length - 1 && (
                <div className="mx-3 my-1 h-px bg-white/[0.06]" />
              )}
            </div>
          ))}

          <div className="mt-1 border-t border-white/[0.06] px-3.5 pt-2 pb-1.5">
            <span className="text-[9px] text-text-dim/40">
              Alt + Left/Right to cycle &middot; Alt + Home/End to jump
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ─── Main component ────────────────────────────────────────────────

export default function EraSelector({ leadingSlot }: { leadingSlot?: ReactNode }) {
  const currentEra = useMapStore((s) => s.eraId);
  const setEra = useMapStore((s) => s.setEra);
  const selectFeature = useMapStore((s) => s.selectFeature);
  const atlasMode = useMapStore((s) => s.atlasMode);
  const storyMode = useMapStore((s) => s.storyMode);
  const locale = useMapStore((s) => s.locale);

  const scrollRef = useRef<HTMLDivElement>(null);
  const jumpContainerRef = useRef<HTMLDivElement>(null);
  const [jumpOpen, setJumpOpen] = useState(false);

  const model = useMemo(() => getEraSelectorModel(atlasMode, locale), [atlasMode, locale]);
  const { groups, flatIds, byId } = model;
  const activeItem = byId.get(currentEra);
  const activeIndex = flatIds.indexOf(currentEra);
  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= flatIds.length - 1;

  const handleSelect = useCallback(
    (id: string) => {
      if (storyMode) return;
      setEra(id);
      selectFeature(id, 'era-info');
    },
    [setEra, selectFeature, storyMode],
  );

  const goPrev = useCallback(() => {
    if (storyMode || isFirst) return;
    const id = flatIds[activeIndex - 1];
    setEra(id);
    selectFeature(id, 'era-info');
  }, [storyMode, isFirst, setEra, selectFeature, flatIds, activeIndex]);

  const goNext = useCallback(() => {
    if (storyMode || isLast) return;
    const id = flatIds[activeIndex + 1];
    setEra(id);
    selectFeature(id, 'era-info');
  }, [storyMode, isLast, setEra, selectFeature, flatIds, activeIndex]);

  const goFirst = useCallback(() => {
    if (storyMode || flatIds.length === 0) return;
    const id = flatIds[0];
    setEra(id);
    selectFeature(id, 'era-info');
  }, [storyMode, setEra, selectFeature, flatIds]);

  const goLast = useCallback(() => {
    if (storyMode || flatIds.length === 0) return;
    const id = flatIds[flatIds.length - 1];
    setEra(id);
    selectFeature(id, 'era-info');
  }, [storyMode, setEra, selectFeature, flatIds]);

  // Scroll active icon into view
  useEffect(() => {
    if (!scrollRef.current) return;
    const active = scrollRef.current.querySelector('[aria-current="step"]');
    if (active) {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentEra]);

  // Global keyboard shortcuts (Alt+Arrow, Alt+Home/End)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goNext();
          break;
        case 'Home':
          e.preventDefault();
          goFirst();
          break;
        case 'End':
          e.preventDefault();
          goLast();
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goPrev, goNext, goFirst, goLast]);

  // Close jump menu when story mode activates
  useEffect(() => {
    if (storyMode) setJumpOpen(false);
  }, [storyMode]);

  const toggleJump = useCallback(() => {
    if (!storyMode) setJumpOpen((v) => !v);
  }, [storyMode]);

  const closeJump = useCallback(() => setJumpOpen(false), []);

  return (
    <nav
      aria-label="Era timeline — Alt+Left/Right to cycle"
      className="flex min-w-0 flex-col"
    >
      {/* Row 1: prev / current label / next / jump — symmetric chrome, label centered */}
      <div className="grid min-w-0 grid-cols-[auto_1fr_auto] items-center gap-1 px-2 py-0.5 sm:px-2.5">
        <div className="flex items-center gap-1">
          {leadingSlot}
          <button
            onClick={goPrev}
            disabled={storyMode || isFirst}
            aria-label="Previous era"
            title={storyMode ? 'Exit story mode to change era' : isFirst ? 'First era' : `Previous: ${byId.get(flatIds[activeIndex - 1] ?? '')?.label ?? ''}`}
            className={`
            flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md transition-colors duration-200
            ${storyMode || isFirst ? 'opacity-25 cursor-not-allowed text-text-dim/40' : 'text-text-dim hover:text-text-muted hover:bg-white/[0.04] cursor-pointer'}
          `}
          >
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>

        <div className="min-w-0 select-none px-1 text-center">
          {activeItem && (
            <span className="block truncate text-[11px] font-semibold leading-tight text-parchment sm:text-[12px]">
              {activeItem.label}
              <span className="font-normal text-text-dim/45"> · </span>
              <span className="font-medium text-text-dim/65">
                {formatYear(activeItem.yearRange[0])}–{formatYear(activeItem.yearRange[1])}
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center justify-end gap-1">
          <button
            onClick={goNext}
            disabled={storyMode || isLast}
            aria-label="Next era"
            title={storyMode ? 'Exit story mode to change era' : isLast ? 'Last era' : `Next: ${byId.get(flatIds[activeIndex + 1] ?? '')?.label ?? ''}`}
            className={`
            flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md transition-colors duration-200
            ${storyMode || isLast ? 'opacity-25 cursor-not-allowed text-text-dim/40' : 'text-text-dim hover:text-text-muted hover:bg-white/[0.04] cursor-pointer'}
          `}
          >
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
          </button>

          <div className="h-3.5 w-px flex-shrink-0 bg-white/[0.06]" />

          <div ref={jumpContainerRef} className="relative flex-shrink-0">
            <button
              onClick={toggleJump}
              disabled={storyMode}
              aria-expanded={jumpOpen}
              aria-haspopup="true"
              aria-label="All eras"
              title={storyMode ? 'Exit story mode to browse eras' : 'All eras'}
              className={`
              relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md
              transition-colors duration-200
              ${storyMode ? 'opacity-30 cursor-not-allowed text-text-dim/40' : 'text-text-dim hover:text-text-muted hover:bg-white/[0.04] cursor-pointer'}
            `}
            >
              <List className="h-3 w-3" strokeWidth={2} />
            </button>

            <JumpPanel
              open={jumpOpen}
              onClose={closeJump}
              onSelect={handleSelect}
              currentEra={currentEra}
              containerRef={jumpContainerRef}
            />
          </div>
        </div>
      </div>

      {/* Thin separator */}
      <div className="mx-1.5 h-px bg-white/[0.04]" />

      {/* Row 2: single horizontal rail, centered — uses full bar width; scrolls on very small screens */}
      <div
        ref={scrollRef}
        className="flex w-full min-w-0 flex-nowrap items-center justify-center gap-x-1.5 overflow-x-auto px-1 py-1.5 scrollbar-thin sm:gap-x-2 sm:px-2"
      >
        {groups.map((group, gi) => (
          <div key={group.label || gi} className="flex flex-shrink-0 items-center gap-x-1.5">
            {group.label && (
              <span className="px-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-text-dim/45 whitespace-nowrap sm:text-[9px] sm:tracking-[0.2em]">
                {group.label}
              </span>
            )}

            {group.items.map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <EraIcon
                  item={item}
                  isActive={item.id === currentEra}
                  disabled={storyMode}
                  onSelect={handleSelect}
                  atlasMode={atlasMode}
                />
              </div>
            ))}

            {gi < groups.length - 1 && (
              <div className="mx-1 h-4 w-px flex-shrink-0 bg-white/[0.06] sm:mx-2" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
