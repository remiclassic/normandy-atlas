'use client';

import { memo, useCallback, useRef, useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore, isOnboardingDone } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { t } from '@/lib/ui-strings';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import GuidedAtlasOverlay from './GuidedAtlasOverlay';

function IntroScreen({
  onEnter,
  onOpenNormanOverview,
}: {
  onEnter: () => void;
  onOpenNormanOverview: () => void;
}) {
  const clickedRef = useRef(false);
  const locale = useLocale();

  const handleClick = useCallback(() => {
    if (clickedRef.current) return;
    clickedRef.current = true;
    onEnter();
  }, [onEnter]);

  const handleOpenOverview = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onOpenNormanOverview();
    },
    [onOpenNormanOverview],
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.45, ease: [0.22, 0.94, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#08090f' }}
    >
      {/* Language switcher — top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute top-5 right-5 z-20"
      >
        <LanguageSwitcher />
      </motion.div>

      {/* Warm base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(30,26,18,0.6) 0%, transparent 70%),' +
            'radial-gradient(ellipse 60% 40% at 45% 50%, rgba(42,36,24,0.3) 0%, transparent 60%),' +
            'linear-gradient(180deg, #08090f 0%, #0c0e16 40%, #100e0a 100%)',
        }}
      />

      {/* Fog layer 1 — slow drifting noise */}
      <div
        className="absolute inset-[-20%] onboarding-fog-1"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'f\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.012\' numOctaves=\'4\' seed=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23f)\'/%3E%3C/svg%3E")',
          backgroundSize: '600px 600px',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Fog layer 2 — larger, slower */}
      <div
        className="absolute inset-[-20%] onboarding-fog-2"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'f\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.008\' numOctaves=\'3\' seed=\'42\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23f)\'/%3E%3C/svg%3E")',
          backgroundSize: '800px 800px',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Faint Normandy coastline glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 800 500" className="w-[80vw] max-w-[900px] opacity-[0.06]" fill="none">
          <path
            d="M120 340 Q140 300 130 260 Q120 220 150 180 L200 150 Q250 130 310 140 L400 160 Q440 165 480 155 L560 140 Q600 135 640 155 L700 185 Q720 200 730 230"
            stroke="url(#coast-glow)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M80 250 Q100 230 130 225 Q160 220 180 230 Q200 240 190 260"
            stroke="url(#coast-glow)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="coast-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(91,180,220,0.3)" />
              <stop offset="50%" stopColor="rgba(91,180,220,0.5)" />
              <stop offset="100%" stopColor="rgba(91,180,220,0.2)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Deep vignette */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            'inset 0 0 200px 80px rgba(8,9,15,0.9), inset 0 0 80px 30px rgba(8,9,15,0.5)',
        }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6 select-none">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
          className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-wide text-parchment"
        >
          Norman Atlas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-[clamp(0.9rem,2vw,1.25rem)] font-light tracking-[0.12em] text-gold/80"
        >
          {t('intro.tagline', locale)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-1 max-w-md"
        >
          <p className="text-[clamp(0.75rem,1.4vw,0.9rem)] leading-relaxed text-text-muted/70 whitespace-pre-line">
            {t('intro.subtitle', locale)}
          </p>
        </motion.div>

        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.45 }}
          onClick={handleOpenOverview}
          className="mt-4 max-w-md underline text-[clamp(0.7rem,1.2vw,0.8rem)] font-medium uppercase tracking-[0.14em] text-gold/55 underline-offset-[5px] decoration-gold/25 hover:text-gold/85 hover:decoration-gold/45 cursor-pointer bg-transparent border-0 text-center"
        >
          {t('intro.normanOverviewLink', locale)}
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          onClick={handleClick}
          className="mt-8 group relative px-8 py-3 text-[15px] font-medium tracking-[0.15em] uppercase text-gold border border-gold/30 bg-transparent transition-all duration-500 hover:border-gold/60 hover:bg-gold/[0.04] hover:shadow-[0_0_30px_rgba(196,169,98,0.12)] cursor-pointer"
        >
          {t('intro.enter', locale)}
        </motion.button>
      </div>
    </motion.div>
  );
}

const AtlasWelcomeGate = memo(function AtlasWelcomeGate({
  onOpenNormanOverview,
}: {
  onOpenNormanOverview: () => void;
}) {
  const phase = useMapStore((s) => s.onboardingPhase);
  const setPhase = useMapStore((s) => s.setOnboardingPhase);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (isOnboardingDone()) {
      setPhase('complete');
    }
    setHydrated(true);
  }, [setPhase]);

  const handleEnter = useCallback(() => {
    setPhase('flying');
  }, [setPhase]);

  const handleComplete = useCallback(() => {
    setPhase('complete');
  }, [setPhase]);

  const onIntroExitComplete = useCallback(() => {
    if (useMapStore.getState().onboardingPhase === 'flying') {
      useMapStore.getState().setOnboardingPhase('guided');
    }
  }, []);

  if (!hydrated || phase === 'complete') return null;

  return (
    <>
      <AnimatePresence onExitComplete={onIntroExitComplete}>
        {phase === 'intro' && (
          <IntroScreen
            key="intro"
            onEnter={handleEnter}
            onOpenNormanOverview={onOpenNormanOverview}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {phase === 'guided' && (
          <GuidedAtlasOverlay key="guided" onComplete={handleComplete} />
        )}
      </AnimatePresence>
    </>
  );
});

export default AtlasWelcomeGate;
