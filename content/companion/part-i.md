# Part I — What the atlas is (and is not)

## Scenario: The Atlas as Argument

Spatial history is old; digital spatial history is young; **good** spatial history remains rare for a simple reason. Maps feel like observations when they are almost always **arguments**. Someone chose a projection—or, in a web Mercator basemap, accepted one. Someone chose a date range. Someone decided that this estuary matters more than that marsh for the story being told. Someone accepted trade-offs between clarity and precision because a screen is not an archive shelf.

:::scenario-brief
**Map argument:** Default **camera** + **era** + visible **layers** = the essay thesis — not wallpaper.  
**Narrative track:** You should *feel* the Seine as a **hydraulic sorting hat** before you memorize enums.
:::

Norman Atlas enters that tradition knowingly. It is built for exploration: you can drift eras, dim layers, chase a journey, or follow a story beat that moves the camera for you. None of that mobility removes responsibility. The companion you are reading exists to make responsibility **pleasurable**—because once you see the map as an argument, you begin to collaborate with it rather than be fooled by it.

:::atlas-ui
**Era ids (examples):** `neolithic-normandy`, `viking-age`, `norman-origins`, `atlantic-imprint` — each reloads **region era-states** and default **camera**.  
**Try:** Jump `frankish-carolingian` → `viking-age` on the lower Seine and watch emphasis migrate with the story.
:::

### What you hold in mind after Part I

You will understand three commitments the software makes to you, and three it refuses.

**Commitments:**

- **Geographic registration**: Events, nodes, and corridors are placed so that you can test narratives against terrain and hydrography.
- **Explicit typing**: Regions, places, and routes carry machine-readable categories you can learn once and reuse.
- **Evidence labeling**: Many interpretive lines declare what kind of proof anchors them—not to end debate, but to **site** it. Inline examples: :evidence:documentary_cluster :evidence:archaeological

**Refusals** (these mirror the methodology file in the source code):

- The atlas **refuses** to pretend every line is a logbook entry.
- It **refuses** to convert teaching emphasis into demographic exactitude.
- It **refuses** to write a monocausal ethnicity story onto the complex recruitment fields of New France or onto modern genomes.

If those refusals sound stark, notice the upside: where the map declines to lie for effect, you are free to think.

---

## Scenario: The Atlas Contract

The engineering tree of Norman Atlas includes an **`atlasContract`**: a short charter of **rules** the product tries to obey and **forbidden claims** authors attempt never to smuggle past a reader. The **manifesto** below lifts text directly from that source so web, print, and app stay aligned. In surrounding chapters we translate—but here precision matters more than paraphrase.

:::manifesto
:::

When you teach or argue from the map, treat those cards as **non-negotiable guardrails**. Readers confusing **pedagogical intensity** with population, or **embarkation port** with **parish of birth**, are not pedantic failures—they are the predictable noise of a beautiful UI. The contract exists to cut through it.

---

## Scenario: Time and the Timeline

An **era** in Norman Atlas bundles:

- a **date range** (the coarse temporal window);
- a **default camera** (center, zoom—sometimes bearing or pitch where used);
- **transitions** telling you which era typically follows in the curated sequence;
- an optional **timeline group** (such as **deep-time**, **medieval**, **atlantic**) that clusters frames for navigation;
- often a **summary** of the historical stakes in multiple languages.

Choosing an era is therefore not cosmetic. It selects:

- which **region era-states** activate;
- which **place labels** and emphases apply;
- which **route toggles** prove meaningful;
- sometimes which **year-gated** colonial polygons you should expect if the simulation asks for a precise annum inside a treaty-sensitive span.

:::atlas-ui
**Year gate (example):** In colonial logic, **1713+** can swap which **Acadia / Île Royale** polygons belong in frame — same broad era family, different treaty state. Watch the simulated **year** as well as the **era id**.  
**Viking territories:** Some **fade / emphasis** rules follow **time phases** inside an era — not a single static polygon moment.
:::

![Era selection reshapes region emphasis (schematic)](/companion/era-region-state.svg)

### Deep-time vs medieval vs Atlantic frames

**Deep-time** eras (early farming, Bronze Age maritime exchange, Iron Age Gaul, Roman Gaul, post-Roman fragmentation) teach **long-duration geography**: the same Channel highway, the same Seine funnel, the same granitic coasts refracted through different technologies. **Medieval** frames reweight **politics and lordship** atop those persistent meshes. **Atlantic** frames drag the camera westward—not to forget Normandy, but to insist that **port cities and mariners** knot Europe to American ecosystems.

### User vs story transitions

Era changes can be **user-driven** (you click the timeline) or **story-driven** (a curated beat moves time for narrative effect). Neither mode is “more true.” Story mode is **pedagogically curated**; manual era choice is **exploratory**. Experts switch between them the way musicians switch between score and improvisation.

### Camera presets as spatial arguments

A camera centered on the lower Seine at mid-zoom makes **river logistics** legible. A camera pulled to Atlantic extent makes **cod, wind, and empire** legible. If a default frustrates you, ask: *what subsystem is the atlas privileging here?* Adjust manually when your question differs—then return to defaults to see the authors’ hypothesized core.

---

Part I established the contract. Part II teaches tokens. Part III walks geography as narrative spine. Part IV rehearses expertise. Together they turn Norman Atlas from *application* into *method*—the method of keeping maps honest while letting them sing.
