'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import {
  NORMAN_IDENTITY_MAP_BEATS,
  resolveBeatCenter,
  uiKeyForStoryBeat,
} from '@/lib/norman-identity-story-beats';
import {
  clearNormanIdentityStorySession,
  readNormanIdentityStoryPayload,
} from '@/lib/norman-identity-session';
import { useMapStore } from '@/lib/store';
import { t } from '@/lib/ui-strings';

export type NormanStoryModeProps = {
  open: boolean;
  onRequestClose: () => void;
};

const NormanStoryMode = memo(function NormanStory({
  open,
  onRequestClose,
}: NormanStoryModeProps) {
  const locale = useLocale();
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  useEffect(() => {
    if (!open) return;
    queueMicrotask(() => {
      const payload = readNormanIdentityStoryPayload();
      setParagraphs(payload?.paragraphs ?? []);
      setStep(0);
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const beat = NORMAN_IDENTITY_MAP_BEATS[step];
    if (!beat) return;
    const st = useMapStore.getState();
    st.setEra(beat.eraId);
    st.setPendingFlyTarget({
      center: resolveBeatCenter(beat),
      zoom: beat.zoom,
      bearing: 0,
      pitch: 0,
    });
  }, [open, step]);

  const close = useCallback(() => {
    clearNormanIdentityStorySession();
    useMapStore.getState().closeNormanIdentityStory();
    onRequestClose();
  }, [onRequestClose]);

  const prev = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);
  const next = useCallback(
    () => setStep((s) => Math.min(NORMAN_IDENTITY_MAP_BEATS.length - 1, s + 1)),
    [],
  );

  if (!open) return null;

  const beat = NORMAN_IDENTITY_MAP_BEATS[step];
  const body = paragraphs[step] ?? (beat ? t(uiKeyForStoryBeat(beat.storyKey), locale) : '');
  const motionClass = reducedMotion ? '' : 'transition-opacity duration-300';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[84] flex flex-col justify-end p-3 sm:justify-center sm:p-6"
      aria-modal="true"
      role="dialog"
      aria-label={t('normanIdentity.cta.playStory', locale)}
    >
      <div className="pointer-events-auto mx-auto w-full max-w-lg rounded-none border border-chrome-border-strong/55 bg-[var(--color-chrome-popover)] shadow-[0_12px_48px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-3 border-b border-chrome-border/50 px-4 py-3">
          <p className="atlas-text-cyan-section-label text-[11px] font-semibold uppercase tracking-[0.2em]">
            {t('normanIdentity.story.progress', locale)
              .replace('{current}', String(step + 1))
              .replace('{total}', String(NORMAN_IDENTITY_MAP_BEATS.length))}
          </p>
          <button
            type="button"
            onClick={close}
            className="rounded-none p-1 text-text-muted hover:text-parchment"
            aria-label={t('normanIdentity.story.exit', locale)}
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
        <div className={`px-4 py-4 ${motionClass}`}>
          <p className="text-[length:var(--atlas-text-md)] leading-relaxed text-[var(--color-text)]">{body}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-chrome-border/50 px-4 py-3">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="rounded-none border border-chrome-border-strong/60 bg-chrome-fill/25 px-3 py-2 text-[length:var(--atlas-text-sm)] font-semibold text-text-muted disabled:opacity-35 hover:border-gold/25 hover:text-parchment"
          >
            {t('normanIdentity.story.prev', locale)}
          </button>
          <button
            type="button"
            onClick={step >= NORMAN_IDENTITY_MAP_BEATS.length - 1 ? close : next}
            className="atlas-btn-cyan-secondary rounded-none px-3 py-2 text-[length:var(--atlas-text-sm)] font-semibold"
          >
            {step >= NORMAN_IDENTITY_MAP_BEATS.length - 1
              ? t('normanIdentity.story.exit', locale)
              : t('normanIdentity.story.next', locale)}
          </button>
          <div className="ml-auto flex gap-1.5" aria-hidden>
            {NORMAN_IDENTITY_MAP_BEATS.map((b, i) => (
              <span
                key={b.storyKey}
                className={`h-1.5 w-1.5 rounded-none ${i === step ? 'bg-cyan-300' : 'bg-chrome-border-strong/70'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default NormanStoryMode;
