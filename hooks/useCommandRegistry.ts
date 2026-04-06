'use client';

import { useMemo } from 'react';
import { getVisiblePlaces } from '@/core/places/engine';
import { getPeopleForEra } from '@/core/people/engine';
import { listStoryArcSummaries } from '@/lib/command-palette/story-arcs';
import { ALL_COMMANDS } from '@/lib/command-palette/commands';
import { GROUP_ORDER } from '@/lib/command-palette/group-order';
import type {
  CommandContext,
  PaletteResult,
  CommandHit,
  CommandGroupId,
} from '@/lib/command-palette/types';
import type { UiStringKey } from '@/lib/ui-strings';
import { scoreSearchTokens, normalizeSearch } from '@/lib/command-palette/search-score';

const MAX_PLACES = 12;
const MAX_PEOPLE = 12;
const MAX_STORIES = 10;

export interface PaletteSection {
  id: string;
  labelKey: UiStringKey;
  results: PaletteResult[];
}

function compareGroup(a: CommandGroupId, b: CommandGroupId): number {
  return GROUP_ORDER.indexOf(a) - GROUP_ORDER.indexOf(b);
}

export function useCommandRegistry(ctx: CommandContext, query: string): {
  sections: PaletteSection[];
  flatResults: PaletteResult[];
} {
  const q = query;

  return useMemo(() => {
    const visible = ALL_COMMANDS.filter((c) => c.isVisible(ctx));
    const qNorm = normalizeSearch(q);

    const scoredCmds: CommandHit[] = visible.map((command) => {
      const fromLabel = scoreSearchTokens(q, command.label, command.keywords);
      const fromDesc = command.description ? scoreSearchTokens(q, command.description, command.keywords) : 0;
      const score = Math.max(fromLabel, fromDesc, qNorm ? 0 : 1);
      return {
        kind: 'command' as const,
        id: command.id,
        command,
        score: qNorm ? score : 0,
      };
    });

    const commandHits = qNorm
      ? scoredCmds.filter((h) => h.score > 0)
      : scoredCmds;

    commandHits.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const ga = a.command.group;
      const gb = b.command.group;
      if (ga !== gb) return compareGroup(ga, gb);
      return a.command.label.localeCompare(b.command.label);
    });

    const placeHits: PaletteResult[] =
      qNorm && ctx.atlasMode && ctx.pathname === '/'
        ? (() => {
            const out: PaletteResult[] = [];
            const places = getVisiblePlaces(ctx.eraId);
            for (const p of places) {
              const label = p.currentState.label;
              const s = scoreSearchTokens(q, label, [p.id]);
              if (s > 0) out.push({ kind: 'place', id: p.id, label, score: s });
            }
            out.sort((a, b) => b.score - a.score);
            return out.slice(0, MAX_PLACES);
          })()
        : [];

    const personHits: PaletteResult[] =
      qNorm && ctx.atlasMode && ctx.pathname === '/'
        ? (() => {
            const out: PaletteResult[] = [];
            const people = getPeopleForEra(ctx.eraId);
            for (const per of people) {
              const s = scoreSearchTokens(q, per.displayName, [per.id]);
              if (s > 0) out.push({ kind: 'person', id: per.id, label: per.displayName, score: s });
            }
            out.sort((a, b) => b.score - a.score);
            return out.slice(0, MAX_PEOPLE);
          })()
        : [];

    const storyHits: PaletteResult[] =
      qNorm && ctx.atlasMode && ctx.pathname === '/' && !ctx.storyMode
        ? (() => {
            const out: PaletteResult[] = [];
            for (const arc of listStoryArcSummaries()) {
              const keys = arc.arcId ? [arc.arcId] : ['timeline', 'chronological', 'full'];
              const s = scoreSearchTokens(q, arc.label, keys);
              if (s > 0) {
                out.push({
                  kind: 'story',
                  id: arc.arcId ?? 'full-timeline',
                  arcId: arc.arcId,
                  label: arc.label,
                  score: s,
                });
              }
            }
            out.sort((a, b) => b.score - a.score);
            return out.slice(0, MAX_STORIES);
          })()
        : [];

    const sections: PaletteSection[] = [];

    if (commandHits.length > 0) {
      sections.push({
        id: 'commands',
        labelKey: 'commandPalette.section.commands',
        results: commandHits as PaletteResult[],
      });
    }

    if (placeHits.length > 0) {
      sections.push({ id: 'places', labelKey: 'commandPalette.section.places', results: placeHits });
    }

    if (personHits.length > 0) {
      sections.push({ id: 'people', labelKey: 'commandPalette.section.people', results: personHits });
    }

    if (storyHits.length > 0) {
      sections.push({ id: 'stories', labelKey: 'commandPalette.section.stories', results: storyHits });
    }

    const flatResults = sections.flatMap((s) => s.results);

    return { sections, flatResults };
  }, [
    q,
    ctx.locale,
    ctx.atlasMode,
    ctx.pathname,
    ctx.eraId,
    ctx.storyMode,
    ctx.storyArc,
    ctx.storyStepIndex,
    ctx.mode,
    ctx.selectedFeatureId,
    ctx.selectionKind,
    ctx.currentRegion?.id,
    ctx.userHaplogroup,
    ctx.viewportBounds?.west,
    ctx.viewportBounds?.south,
    ctx.viewportBounds?.east,
    ctx.viewportBounds?.north,
    ctx.currentEra?.id,
  ]);
}
