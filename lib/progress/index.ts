export type {
  AtlasEvent,
  AtlasEventType,
  Aggregates,
  EntityEngagement,
  MilestoneRecord,
  ProgressV2,
} from './schema';

export { PROGRESS_STORAGE_KEY, SCHEMA_VERSION, createEmptyProgress } from './schema';

export {
  readProgress,
  updateProgress,
  flushProgress,
  resetProgress,
  exportProgressJSON,
  importProgressJSON,
} from './storage';

export {
  mergeProgressV2,
  parseProgressV2Json,
  safeProgressOrEmpty,
} from './merge';

export {
  foldEvent,
  countDistinctPlaces,
  countDistinctRegions,
  countDistinctJourneys,
  countDistinctSegments,
  countErasVisited,
  hasEngagedEntity,
  hasEngagedAllInSet,
  countEngagedInSet,
} from './aggregates';

export {
  emitProgressEvent,
} from './emit';

export {
  evaluateAllMilestones,
  type NewlyUnlocked,
} from './milestones-eval';

export {
  buildPublicShareUrl,
  copyToClipboard,
  shareOrCopy,
} from './share';

export {
  enqueueToast,
  enqueueMilestones,
  enqueueDiscovery,
  peekQueue,
  dequeueToast,
  queueLength,
  subscribeToastQueue,
  type ToastPayload,
  type ToastKind,
} from './toast-queue';

export { resolveEntityLabel } from './discovery-label';
