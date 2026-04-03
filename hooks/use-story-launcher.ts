'use client';

import { createContext, useContext } from 'react';

interface StoryLauncherCtx {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

export const StoryLauncherContext = createContext<StoryLauncherCtx>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function useStoryLauncher(): StoryLauncherCtx {
  return useContext(StoryLauncherContext);
}
