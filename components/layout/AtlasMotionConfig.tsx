'use client';

import { type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { useMapStore } from '@/lib/store';
import { readStoredReduceMotionForced } from '@/lib/reduced-motion';

const ssrSafe = typeof window !== 'undefined';
const initialForced = ssrSafe ? readStoredReduceMotionForced() : false;

export default function AtlasMotionConfig({ children }: { children: ReactNode }) {
  const forced = useMapStore((s) => s.reduceMotionForced) || initialForced;
  return (
    <MotionConfig reducedMotion={forced ? 'always' : 'user'}>
      {children}
    </MotionConfig>
  );
}
