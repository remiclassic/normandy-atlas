'use client';

import { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { useLocale } from '@/hooks/use-atlas';
import { useIsMobile } from '@/hooks/use-responsive';
import { t } from '@/lib/ui-strings';

interface Props {
  onOpenLauncher: () => void;
}

const MobilePlayDock = memo(function MobilePlayDock({ onOpenLauncher }: Props) {
  const isMobile = useIsMobile();
  const locale = useLocale();
  const atlasMode = useMapStore((s) => s.atlasMode);
  const storyMode = useMapStore((s) => s.storyMode);
  const cinematicFlythrough = useMapStore((s) => s.cinematicFlythrough);

  const visible = isMobile && atlasMode && !storyMode && cinematicFlythrough == null;

  const handleClick = useCallback(() => {
    onOpenLauncher();
  }, [onOpenLauncher]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-20 w-full flex pointer-events-auto"
        >
          <button
            onClick={handleClick}
            className="group flex flex-1 min-h-[48px] items-center justify-center gap-3 rounded-full glass-panel glow-gold px-5 py-3 text-[13px] font-medium text-gold hover:text-gold-bright transition-all duration-250 border-gold/15 hover:border-gold/25 touch-target"
          >
            <span className="flex shrink-0 items-center justify-center w-7 h-7 rounded-full bg-gold/10 group-hover:bg-gold/15 transition-colors duration-200">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3.5 1.5l8 5.5-8 5.5V1.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="min-w-0 truncate">{t('launcher.open', locale)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default MobilePlayDock;
