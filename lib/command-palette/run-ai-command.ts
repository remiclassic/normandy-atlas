import type { CommandContext } from '@/lib/command-palette/types';

export type AICommandStatus = 'stub';

export interface RunAICommandResult {
  status: AICommandStatus;
  message: string;
}

/**
 * Placeholder for Gemini (or other) integration.
 * Today: returns a stable message; UI can surface via toast or inline note.
 */
export function runAICommand(prompt: string, context: CommandContext): RunAICommandResult {
  void prompt;
  void context;
  return {
    status: 'stub',
    message: 'Assistant is not connected yet — this prompt will run against the map context in a future update.',
  };
}
