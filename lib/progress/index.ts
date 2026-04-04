export type {
  AtlasEvent,
  AtlasEventType,
  Aggregates,
  EntityEngagement,
  MilestoneRecord,
  ProgressV2,
  ShareMoments,
  Gamification,
  StreakState,
  ChallengesState,
  ChallengeActive,
  ChallengeHistoryEntry,
} from './schema';

export {
  PROGRESS_STORAGE_KEY,
  SCHEMA_VERSION,
  createEmptyProgress,
  createEmptyGamification,
} from './schema';

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
  countDistinctJournalSections,
  hasEngagedEntity,
  hasEngagedAllInSet,
  countEngagedInSet,
  sumDwellMsForKind,
  countEntitiesWithMinDwell,
  totalEngagedEntities,
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
  drainMilestones,
  queueLength,
  subscribeToastQueue,
  markModalShown,
  canShowModal,
  type ToastPayload,
  type ToastKind,
} from './toast-queue';

export { updateStreak } from './streaks';

export {
  ensureWeeklyChallenge,
  evaluateChallengeProgress,
  maybeCompleteChallengeAndArchive,
} from './challenges';

export {
  enqueueShareMoment,
  peekShareMoment,
  dequeueShareMoment,
  subscribeShareMomentQueue,
  type ShareMomentPayload,
} from './share-moment-queue';

export { resolveEntityLabel } from './discovery-label';
