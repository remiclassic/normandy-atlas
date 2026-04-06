import { useMapStore } from '@/lib/store';
import type { CommandContext, PaletteResult, CommandRuntime } from '@/lib/command-palette/types';

function scheduleOnMap(run: () => void) {
  queueMicrotask(() => setTimeout(run, 80));
}

export function executePaletteResult(
  result: PaletteResult,
  ctx: CommandContext,
  runtime: CommandRuntime,
): void {
  switch (result.kind) {
    case 'command':
      result.command.action(ctx, runtime);
      break;
    case 'place':
      if (ctx.pathname !== '/') {
        runtime.navigate('/');
        scheduleOnMap(() => {
          useMapStore.getState().selectFeature(result.id, 'settlement', { expandDetail: true });
        });
      } else {
        useMapStore.getState().selectFeature(result.id, 'settlement', { expandDetail: true });
      }
      break;
    case 'person':
      if (ctx.pathname !== '/') {
        runtime.navigate('/');
        scheduleOnMap(() => {
          useMapStore.getState().selectFeature(result.id, 'atlas-person', { expandDetail: true });
        });
      } else {
        useMapStore.getState().selectFeature(result.id, 'atlas-person', { expandDetail: true });
      }
      break;
    case 'story':
      if (ctx.pathname !== '/') {
        runtime.navigate('/');
        scheduleOnMap(() => {
          useMapStore.getState().startStory(result.arcId ?? null, { stepIndex: 0 });
        });
      } else {
        useMapStore.getState().startStory(result.arcId ?? null, { stepIndex: 0 });
      }
      break;
    default:
      break;
  }
}
