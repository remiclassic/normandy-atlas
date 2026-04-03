import { useMapStore } from '@/lib/store';

/**
 * Clears map-owned UI that competes with the guided tour spotlight (selection, stories, migration sheet, etc.).
 * Call `requestGuidedTourShellUiReset` after so AtlasHomeShell / LayerPanel can collapse local drawers in the same tick.
 */
export function resetMapStoreForGuidedTour(): void {
  const s = useMapStore.getState();
  // Order: clear celebration + selection/story/migration first so nothing re-opens chrome; then bump
  // `guidedTourShellResetNonce` so LayerPanel, EraSelector, and AtlasHomeShell collapse local UI.
  s.endLedgerCelebration();
  s.closeDetail();
  s.stopStory();
  s.setMigrationExplorerOpen(false);
  s.stopCinematicFlythrough();
  s.hoverFeature(null);
  s.requestGuidedTourShellUiReset();
}

/** Extra time after rAF so mobile menu spring + bottom sheets can begin closing before tour measures anchors. */
const LAYOUT_SETTLE_MS = 300;

/**
 * Full guided-tour prep: map store + shell nonce, then wait for layout to settle (panels close, then measure).
 * Order: close persistent state first → bump shell nonce → flush paint → short delay → callers show FTUE.
 */
export async function resetUiForGuidedTour(): Promise<void> {
  if (typeof window === 'undefined') return;
  resetMapStoreForGuidedTour();
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(resolve, LAYOUT_SETTLE_MS);
      });
    });
  });
}

/** Await before switching onboarding phase into the tour (`intro` = full welcome, `guided` = steps only). */
export async function startGuidedTourFromCleanState(target: 'intro' | 'guided'): Promise<void> {
  await resetUiForGuidedTour();
  useMapStore.getState().setOnboardingPhase(target);
}
