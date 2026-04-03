# Era intro behavior: legacy chronicle vs named arcs (e.g. Leif Erikson)

## Root cause (Leif Erikson example)

[`StoryEraIntroOverlay`](components/story/StoryEraIntroOverlay.tsx) shows whenever `storyMode` is true and the **beat’s `eraId`** changes. Named arcs use **different `eraId`s on purpose** for layers, camera, and narrative jumps—not to mean “the user is entering that historical era as a chapter break.”

In [`data/atlas/story-beats.ts`](data/atlas/story-beats.ts), the Leif arc:

- Chapter 1 uses `viking-age`.
- Chapters 2–7 use `norman-origins` (timeline bucket while the story is still Greenland / Vinland)—so stepping to chapter 2 triggers a **Norman origins** fullscreen intro even though the player is still in the Norse/Vinland narrative.
- Chapter 8 uses `new-france-foundations`, which triggers **another** era intro.

So the bug is **architectural**: per-beat `eraId` ≠ “show the catalog era intro” for **curated arcs**.

## Target behavior

| Flow | Fullscreen intros |
|------|-------------------|
| **Full atlas chronicle** (`storyArc === null`) | Keep **per-era** intros when the chronological journey crosses eras (current behavior). |
| **Named arc** (`storyArc != null`, e.g. `leif-erikson`) | **No** intros on each beat/era hop. **One** intro when the arc **starts**: **arc title** + a single **thematic “age”** line (the period the story belongs to), not the beat’s technical `eraId` chain. |

## Implementation

### 1. Gate existing era transition overlay

In [`StoryEraIntroOverlay.tsx`](components/story/StoryEraIntroOverlay.tsx): run the “era changed → show overlay” effect **only** when `!atlasMode || storyArc === null`. When `atlasMode && storyArc != null`, clear visible state and reset `lastShownEraRef` so nothing leaks when switching modes.

### 2. One-shot arc intro for named arcs

Add behavior (same visual shell as today’s overlay or a shared inner component to avoid duplication) that runs **once per `startStory(arcId)` session**:

- **Title**: arc display name from existing data—[`getArcEntriesForEra`](data/atlas/era-arcs.ts)-style lookup or `storyLibraryMetaList` / [`atlasEraArcs`](data/atlas/era-arcs.ts) `label` keyed by `arcId`.
- **Age / period line**: use a **stable thematic era**, not the first beat’s `eraId` after resume. Recommended: **`atlasEraArcs` entry’s `eraIds[0]`** for that `arcId` (for Leif: `viking-age` → reuse [`getStoryEraDisplayTitle`](lib/story-era-title.ts) / date range helpers for consistency).

Track a ref `arcIntroShownForSession` (reset when `storyMode` false or `storyArc` changes) so resume mid-arc does not show the arc intro again unless the user restarts the arc.

### 3. Optional: resume race (library)

[`StoryLibraryPanel.playRow`](components/story/StoryLibraryPanel.tsx) still does `startStory()` then `queueMicrotask(goToStoryStep(saved))`, which can briefly sit at step 0. Extend [`startStory`](lib/store.ts) with optional initial step **or** a single atomic setter used from `playRow` so step 0 never commits when resuming.

### 4. Optional data tweak

[`story-library-meta.ts`](data/atlas/story-library-meta.ts) sets `recommendedEraId: 'norman-origins'` for Leif—misaligned with the **thematic** Viking framing. If anything still reads `recommendedEraId` for UI, consider changing it to `viking-age`; primary fix remains (1) + (2) using `eraIds[0]` from `era-arcs`.

## Verification

- Play **Leif Erikson** from start: **one** intro with arc title + Viking-age (or equivalent) line; **no** Norman / New France fullscreen cards between chapters.
- Play **Full atlas chronicle**: era intros still appear when the global chronicle crosses eras.
- Resume a named arc mid-way: **no** spurious intro at step 0; optional **no** repeat of the one-shot arc title card (per ref above).
