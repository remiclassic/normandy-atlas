'use client';

import { memo, useEffect } from 'react';
import { flushProgress } from '@/lib/progress';

/**
 * Flush progress to localStorage before the page unloads.
 * Placed once in the shell — no visible output.
 */
function SessionGuard() {
  useEffect(() => {
    const handler = () => flushProgress();
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  return null;
}

export default memo(SessionGuard);
