'use client';

import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { useIsMobile } from '@/hooks/use-responsive';
import StoryMapIdleCtaPill from '@/components/story/StoryMapIdleCtaPill';
import { FlythroughPresetPicker } from '@/components/flythrough/FlythroughPresetPicker';

interface Props {
  onOpenLauncher: () => void;
  onStartFlagship: () => void;
}

const MobilePlayDock = memo(function MobilePlayDock({
  onOpenLauncher,
  onStartFlagship,
}: Props) {
  const isMobile = useIsMobile();
  const atlasMode = useMapStore((s) => s.atlasMode);
  const storyMode = useMapStore((s) => s.storyMode);
  const cinematicFlythrough = useMapStore((s) => s.cinematicFlythrough);

  const visible = isMobile && atlasMode && !storyMode && cinematicFlythrough == null;

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-20 flex w-full items-center gap-2 pointer-events-auto"
        >
          <FlythroughPresetPicker />
          <div className="min-w-0 flex-1">
            <StoryMapIdleCtaPill
              layout="dock"
              onOpenLauncher={onOpenLauncher}
              onStartFlagship={onStartFlagship}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default MobilePlayDock;
