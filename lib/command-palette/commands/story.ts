import type { Command } from '@/lib/command-palette/types';
import { useMapStore } from '@/lib/store';
import { getBeatCount } from '@/core/story/engine';

const onMap = (ctx: { pathname: string }) => ctx.pathname === '/';

export const storyCommands: Command[] = [
  {
    id: 'story-continue',
    label: 'Continue story',
    keywords: ['play', 'resume'],
    group: 'story',
    isVisible: (ctx) => onMap(ctx) && ctx.storyMode,
    action: () => {
      useMapStore.getState().nextStoryStep();
    },
  },
  {
    id: 'story-next-beat',
    label: 'Jump to next chapter',
    keywords: ['next', 'forward', 'beat'],
    group: 'story',
    isVisible: (ctx) => {
      if (!onMap(ctx) || !ctx.storyMode) return false;
      const max = getBeatCount(ctx.storyArc) - 1;
      return ctx.storyStepIndex < max;
    },
    action: () => {
      useMapStore.getState().nextStoryStep();
    },
  },
  {
    id: 'story-exit',
    label: 'Exit story mode',
    keywords: ['stop', 'close', 'leave'],
    group: 'story',
    isVisible: (ctx) => onMap(ctx) && ctx.storyMode,
    action: () => {
      useMapStore.getState().stopStory();
    },
  },
  {
    id: 'story-library',
    label: 'Open story library',
    keywords: ['library', 'arcs', 'cinematic'],
    group: 'story',
    isVisible: (ctx) => onMap(ctx) && !ctx.storyMode,
    action: () => {
      useMapStore.getState().requestStoryLibraryOpen({ openDetail: false });
    },
  },
  {
    id: 'story-start-full-timeline',
    label: 'Start full chronological story',
    keywords: ['timeline', 'all'],
    group: 'story',
    isVisible: (ctx) => onMap(ctx) && !ctx.storyMode,
    action: () => {
      useMapStore.getState().startStory(null, { stepIndex: 0 });
    },
  },
];
