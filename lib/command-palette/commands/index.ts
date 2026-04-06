import type { Command } from '@/lib/command-palette/types';
import { navigationCommands } from '@/lib/command-palette/commands/navigation';
import { mapExploreCommands } from '@/lib/command-palette/commands/map-explore';
import { storyCommands } from '@/lib/command-palette/commands/story';
import { genealogyCommands } from '@/lib/command-palette/commands/genealogy';
import { aiCommands } from '@/lib/command-palette/commands/ai';

export const ALL_COMMANDS: Command[] = [
  ...navigationCommands,
  ...mapExploreCommands,
  ...storyCommands,
  ...genealogyCommands,
  ...aiCommands,
];

export { navigationCommands, mapExploreCommands, storyCommands, genealogyCommands, aiCommands };
