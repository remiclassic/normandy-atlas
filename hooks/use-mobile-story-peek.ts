'use client';

import { useCallback, useRef, useState } from 'react';
import {
  useMotionValue,
  useDragControls,
  animate,
  type PanInfo,
} from 'motion/react';

/** Pixels of the card kept visible at screen bottom when fully peeked. */
const VISIBLE_STRIP_PX = 64;
/** Generous upper bound for drag constraint; snap logic picks the real target. */
const DRAG_LIMIT_PX = 500;
const SNAP_OFFSET_PX = 80;
const SNAP_VELOCITY = 300;

/**
 * Manages the mobile story-card "peek" gesture: drag the card down to expose
 * the map, snap back up to resume reading.  Also orchestrates the Continue
 * choreography (collapse → advance step → wait for fly → expand).
 */
export function useMobileStoryPeek(enabled: boolean, reducedMotion: boolean) {
  const peekY = useMotionValue(0);
  const dragControls = useDragControls();
  const [animating, setAnimating] = useState(false);
  const lockRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getPeekMax = useCallback(() => {
    const h = cardRef.current?.getBoundingClientRect().height ?? 350;
    return Math.max(120, h - VISIBLE_STRIP_PX);
  }, []);

  const snapTo = useCallback(
    async (target: number) => {
      if (reducedMotion) {
        peekY.jump(target);
        return;
      }
      await animate(peekY, target, {
        type: 'spring',
        damping: 28,
        stiffness: 300,
      });
    },
    [peekY, reducedMotion],
  );

  const resetPeek = useCallback(() => {
    peekY.jump(0);
    setAnimating(false);
    lockRef.current = false;
  }, [peekY]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!enabled || lockRef.current) return;
      const peekMax = getPeekMax();
      const goDown =
        info.offset.y > SNAP_OFFSET_PX || info.velocity.y > SNAP_VELOCITY;
      snapTo(goDown ? peekMax : 0);
    },
    [enabled, getPeekMax, snapTo],
  );

  const runContinueSequence = useCallback(
    async (advanceStep: () => void, flyDurationMs: number) => {
      if (lockRef.current) {
        advanceStep();
        return;
      }
      if (!enabled || reducedMotion) {
        advanceStep();
        return;
      }

      lockRef.current = true;
      setAnimating(true);

      try {
        await snapTo(getPeekMax());
        advanceStep();
        await new Promise<void>((r) => setTimeout(r, flyDurationMs + 250));
        await snapTo(0);
      } finally {
        lockRef.current = false;
        setAnimating(false);
      }
    },
    [enabled, reducedMotion, getPeekMax, snapTo],
  );

  return {
    peekY,
    dragControls,
    animating,
    cardRef,
    resetPeek,
    handleDragEnd,
    runContinueSequence,
    dragConstraints: { top: 0, bottom: DRAG_LIMIT_PX } as const,
  };
}
