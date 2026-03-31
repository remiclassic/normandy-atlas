import type { NewlyUnlocked } from './milestones-eval';
import type { AtlasEventType } from './schema';

// ---------------------------------------------------------------------------
// Toast queue — priority-based, no dropped milestones. Module singleton so
// CuratorToast and MilestoneCelebrationModal can both subscribe.
// ---------------------------------------------------------------------------

export type ToastKind = 'milestone' | 'discovery';

export interface ToastPayload {
  kind: ToastKind;
  /** Milestone def + record for milestone toasts. */
  milestone?: NewlyUnlocked;
  /** Entity id for discovery toasts. */
  entityId?: string;
  /** Event type that triggered this discovery. */
  eventType?: AtlasEventType;
}

type QueueListener = () => void;

const queue: ToastPayload[] = [];
const listeners = new Set<QueueListener>();
const shownDiscoveryIds = new Set<string>();

function notify(): void {
  for (const fn of listeners) fn();
}

export function enqueueToast(item: ToastPayload): void {
  if (item.kind === 'discovery' && item.entityId) {
    if (shownDiscoveryIds.has(item.entityId)) return;
    shownDiscoveryIds.add(item.entityId);
  }

  if (item.kind === 'milestone') {
    const insertIdx = queue.findIndex((q) => q.kind !== 'milestone');
    if (insertIdx === -1) {
      queue.push(item);
    } else {
      queue.splice(insertIdx, 0, item);
    }
  } else {
    queue.push(item);
  }
  notify();
}

export function enqueueMilestones(batch: NewlyUnlocked[]): void {
  for (const m of batch) {
    enqueueToast({ kind: 'milestone', milestone: m });
  }
}

export function enqueueDiscovery(entityId: string, eventType: AtlasEventType): void {
  enqueueToast({ kind: 'discovery', entityId, eventType });
}

export function peekQueue(): ToastPayload | undefined {
  return queue[0];
}

export function dequeueToast(): ToastPayload | undefined {
  const item = queue.shift();
  notify();
  return item;
}

export function queueLength(): number {
  return queue.length;
}

export function subscribeToastQueue(fn: QueueListener): () => void {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}
