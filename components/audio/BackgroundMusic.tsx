'use client';

import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import { ChromeIconTooltip } from '@/components/ui/ChromeIconTooltip';

export type BackgroundMusicProps = {
  /** Default: fixed bottom-right. Set false to place the control in header chrome. */
  floating?: boolean;
};

const STORAGE_KEY = 'norman-atlas-bg-music-muted';
const AUDIO_SRC = '/audio/crown-of-salt-and-iron.mp3';
const DEFAULT_VOLUME = 0.35;

type BackgroundMusicContextValue = {
  muted: boolean;
  audioPaused: boolean;
  handleControlClick: () => void;
};

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(null);

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
 * Mount once at the app root (e.g. `app/layout.tsx`). Owns the single `<audio>` element so
 * navigation never remounts playback.
 */
export function BackgroundMusicProvider({ children }: { children: ReactNode }) {
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

  const value = useMemo(
    () => ({
      muted,
      audioPaused,
      handleControlClick,
    }),
    [muted, audioPaused, handleControlClick],
  );

  return (
    <BackgroundMusicContext.Provider value={value}>
      <audio ref={audioRef} src={AUDIO_SRC} />
      {children}
    </BackgroundMusicContext.Provider>
  );
}

function useBackgroundMusicChrome(): BackgroundMusicContextValue {
  const ctx = useContext(BackgroundMusicContext);
  if (!ctx) {
    throw new Error('BackgroundMusic must be used within BackgroundMusicProvider');
  }
  return ctx;
}

/**
 * UI control only; audio element lives in `BackgroundMusicProvider`.
 */
export const BackgroundMusic = memo(function BackgroundMusic({ floating = true }: BackgroundMusicProps) {
  const locale = useLocale();
  const { muted, audioPaused, handleControlClick } = useBackgroundMusicChrome();

  const musicTooltip = useMemo(() => {
    if (muted) return t('chrome.music.unmute', locale);
    if (audioPaused) return t('chrome.music.start', locale);
    return t('chrome.music.mute', locale);
  }, [muted, audioPaused, locale]);

  return (
    <ChromeIconTooltip
      label={musicTooltip}
      hint={t('chrome.music.hint', locale)}
      wrapperClassName={floating ? 'inline-flex items-center fixed bottom-5 right-5 z-[60]' : 'inline-flex items-center'}
    >
      <button
        type="button"
        onClick={handleControlClick}
        className={
          floating
            ? 'flex h-9 w-9 items-center justify-center rounded-lg border border-chrome-border bg-background/70 text-text-dim shadow-atlas-elevated backdrop-blur-md transition-colors duration-200 hover:border-chrome-border-strong hover:bg-chrome-fill-hover hover:text-gold/80'
            : `relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200 ${
                !muted && !audioPaused
                  ? 'border-gold/35 bg-chrome-fill-pressed text-gold/85 shadow-[inset_0_1px_0_var(--color-chrome-inset-soft)] hover:border-gold/45 hover:text-gold'
                  : 'border-chrome-border-strong bg-chrome-fill-badge text-text-muted hover:border-chrome-border hover:bg-chrome-fill-hover hover:text-text'
              }`
        }
        aria-label={musicTooltip}
        aria-pressed={muted}
      >
        {muted ? (
          <VolumeX className={floating ? 'h-[18px] w-[18px]' : 'h-[15px] w-[15px]'} strokeWidth={1.75} aria-hidden />
        ) : (
          <Volume2 className={floating ? 'h-[18px] w-[18px]' : 'h-[15px] w-[15px]'} strokeWidth={1.75} aria-hidden />
        )}
      </button>
    </ChromeIconTooltip>
  );
});
