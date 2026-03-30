'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export type BackgroundMusicProps = {
  /** Default: fixed bottom-right. Set false to place the control in header chrome. */
  floating?: boolean;
};

const STORAGE_KEY = 'norman-atlas-bg-music-muted';
const AUDIO_SRC = '/audio/crown-of-salt-and-iron.mp3';
const DEFAULT_VOLUME = 0.35;

function readStoredMuted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeStoredMuted(value: boolean) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, '1');
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * Site-wide ambient loop: autoplay with browser-safe unlock on first gesture,
 * mute toggle persisted in localStorage.
 */
export const BackgroundMusic = memo(function BackgroundMusic({ floating = true }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const mutedRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [audioPaused, setAudioPaused] = useState(true);

  useEffect(() => {
    setMuted(readStoredMuted());
    setHydrated(true);
  }, []);

  mutedRef.current = muted;

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const syncPaused = () => setAudioPaused(el.paused);
    const onPlay = () => setAudioPaused(false);
    const onPause = () => setAudioPaused(true);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    syncPaused();
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
    };
  }, [hydrated]);

  const requestPlayback = useCallback(() => {
    const el = audioRef.current;
    if (!el || mutedRef.current) return;

    const attachUnlock = () => {
      const unlock = () => {
        document.removeEventListener('pointerdown', unlock);
        document.removeEventListener('keydown', unlock);
        if (mutedRef.current) return;
        void el.play().catch(() => {});
      };
      document.addEventListener('pointerdown', unlock, { capture: true, once: true });
      document.addEventListener('keydown', unlock, { capture: true, once: true });
    };

    void el.play().catch(() => {
      attachUnlock();
    });
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.loop = true;
    el.volume = DEFAULT_VOLUME;
    el.preload = 'auto';
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const el = audioRef.current;
    if (!el) return;

    if (muted) {
      el.pause();
      return;
    }

    requestPlayback();
  }, [hydrated, muted, requestPlayback]);

  const handleControlClick = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;

    if (muted) {
      writeStoredMuted(false);
      setMuted(false);
      return;
    }

    if (!el.paused) {
      writeStoredMuted(true);
      setMuted(true);
      return;
    }

    requestPlayback();
  }, [muted, requestPlayback]);

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} />
      <button
        type="button"
        onClick={handleControlClick}
        className={
          floating
            ? 'fixed bottom-5 right-5 z-[60] flex h-9 w-9 items-center justify-center rounded-lg border border-chrome-border bg-background/70 text-text-dim shadow-atlas-elevated backdrop-blur-md transition-colors duration-200 hover:border-chrome-border-strong hover:bg-chrome-fill-hover hover:text-gold/80'
            : `relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200 ${
                !muted && !audioPaused
                  ? 'border-gold/35 bg-chrome-fill-pressed text-gold/85 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)] hover:border-gold/45 hover:text-gold'
                  : 'border-chrome-border-strong bg-chrome-fill-badge text-text-muted hover:border-chrome-border hover:bg-chrome-fill-hover hover:text-text'
              }`
        }
        aria-label={
          muted
            ? 'Unmute background music'
            : audioPaused
              ? 'Start background music'
              : 'Mute background music'
        }
        aria-pressed={muted}
      >
        {muted ? (
          <VolumeX className={floating ? 'h-[18px] w-[18px]' : 'h-[15px] w-[15px]'} strokeWidth={1.75} aria-hidden />
        ) : (
          <Volume2 className={floating ? 'h-[18px] w-[18px]' : 'h-[15px] w-[15px]'} strokeWidth={1.75} aria-hidden />
        )}
      </button>
    </>
  );
});
