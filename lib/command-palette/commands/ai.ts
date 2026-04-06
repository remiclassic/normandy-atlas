import type { Command } from '@/lib/command-palette/types';
import { runAICommand } from '@/lib/command-palette/run-ai-command';
import { pickI18n } from '@/lib/locale';

const aiSurface = (ctx: { atlasMode: boolean; pathname: string }) =>
  ctx.atlasMode && ctx.pathname === '/';

export const aiCommands: Command[] = [
  {
    id: 'ai-explain-region',
    label: 'Explain this region (AI)',
    keywords: ['gpt', 'gemini', 'why', 'what'],
    group: 'ai',
    isVisible: (ctx) => aiSurface(ctx) && !!ctx.currentRegion,
    action: (ctx, runtime) => {
      const prompt = `Explain the historical region "${ctx.currentRegion?.label}" in concise terms for a map reader.`;
      const r = runAICommand(prompt, ctx);
      runtime.notifyAIStub?.(r.message);
    },
  },
  {
    id: 'ai-what-here',
    label: 'What happened here?',
    keywords: ['history', 'events', 'summary'],
    group: 'ai',
    isVisible: (ctx) => aiSurface(ctx) && (!!ctx.currentRegion || !!ctx.selectedEntity),
    action: (ctx, runtime) => {
      const focus = ctx.selectedEntity?.label ?? ctx.currentRegion?.label ?? 'this place';
      const eraLabel = ctx.currentEra ? pickI18n(ctx.currentEra.label, ctx.locale) : ctx.eraId;
      const prompt = `Summarize key historical events for ${focus} in the ${eraLabel} context.`;
      const r = runAICommand(prompt, ctx);
      runtime.notifyAIStub?.(r.message);
    },
  },
  {
    id: 'ai-era-summary',
    label: 'Summarize this era (AI)',
    keywords: ['overview', 'period'],
    group: 'ai',
    isVisible: (ctx) => aiSurface(ctx) && !!ctx.currentEra,
    action: (ctx, runtime) => {
      const label = ctx.currentEra ? pickI18n(ctx.currentEra.label, ctx.locale) : ctx.eraId;
      const prompt = `Give a short overview of the historical era: ${label}.`;
      const r = runAICommand(prompt, ctx);
      runtime.notifyAIStub?.(r.message);
    },
  },
  {
    id: 'ai-story-from-place',
    label: 'Generate story idea from this location',
    keywords: ['narrative', 'creative'],
    group: 'ai',
    isVisible: (ctx) => aiSurface(ctx) && !!ctx.selectedEntity,
    action: (ctx, runtime) => {
      const prompt = `Propose a short cinematic story hook set at "${ctx.selectedEntity?.label}".`;
      const r = runAICommand(prompt, ctx);
      runtime.notifyAIStub?.(r.message);
    },
  },
];
