'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

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
export const BackgroundMusic = memo(function BackgroundMusic() {
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
        className="fixed bottom-5 right-5 z-[60] flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-background/70 text-text-dim shadow-elevated backdrop-blur-md transition-colors duration-200 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-gold/80"
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
          <VolumeX className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden />
        ) : (
          <Volume2 className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden />
        )}
      </button>
    </>
  );
});
