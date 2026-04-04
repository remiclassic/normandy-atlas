import type { AtlasEventType } from './schema';

// ---------------------------------------------------------------------------
// One-time share moments (first map touch, etc.) — separate from toast-queue
// so CuratorToast + MilestoneCelebrationModal stay unchanged.
// ---------------------------------------------------------------------------

export interface FirstExplorationSharePayload {
  kind: 'first-exploration';
  entityId: string;
  eventType: AtlasEventType;
}

export type ShareMomentPayload = FirstExplorationSharePayload;

type Listener = () => void;

const queue: ShareMomentPayload[] = [];
const listeners = new Set<Listener>();

function notify(): void {
  for (const fn of listeners) fn();
}

export function enqueueShareMoment(payload: ShareMomentPayload): void {
  queue.push(payload);
  notify();
}

export function peekShareMoment(): ShareMomentPayload | undefined {
  return queue[0];
}

export function dequeueShareMoment(): ShareMomentPayload | undefined {
  const item = queue.shift();
  notify();
  return item;
}

export function subscribeShareMomentQueue(fn: Listener): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}
