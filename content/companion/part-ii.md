# Part II — How to read the map

## Scenario: Regions, fills, borders, and intentions

A **region** in Norman Atlas is not merely a colour on the screen. It is a bundle of decisions stored for each **era**: how visibly that polygon should appear, how sharply its boundary should read, and what *kind* of historical claim the fill is meant to support—culture, polity, pressure, frontier conditions, and so on. Learning to read regions is the fastest way to move from “pretty map” to “structured historical argument.”

:::scenario-brief
**Loadout:** Regions fill + borders + (optional) labels · pick any **medieval** era, then toggle **year** if colonial.  
**Reads:** `visibility` · `borderStyle` (`hard` | `soft` | `disputed`) · `fillIntent` (`culture` | `polity` | `frontier` | …).
:::

:::atlas-ui
**Engine (conceptual):** region geometry is filtered by **era id**; some frames also consult **simulated year** (colonial splits, Viking phase rules).  
**Try:** Compare **soft** vs **hard** borders on the map and ask what *kind* of document would justify upgrading the line.
:::

### Visibility and emphasis

For every era, each region that participates in the story carries a **visibility** level. In practice you will see some areas **emphasized**—they carry the narrative weight of the moment—while others remain **normal**, **faded**, or **hidden**. Emphasis is a teaching device. It tells you where the atlas authors want your eye to rest for *this* timeslice, not which tract of land was uniquely important to everyone who lived in the period.

When you jump from, say, a **deep-time** era to a **medieval** one, the same coastline can change rhetorical role. The Channel shore that reads as a Neolithic cultural province may later read as a militarized frontier or as a densely nodal trade coast. If you remember only one rule, remember this: **change the era first**, then judge the regions. A polygon is a reply to a temporal question.

### Border style: hard, soft, disputed

**Border style** encodes how defensible a line would be if you challenged it with documents or archaeology.

- A **hard** boundary suggests something closer to an administrative or political edge you could argue in court or in treaty language—still an imperfect modern overlay on the past, but pointing at juridical or governmental distinction.
- A **soft** boundary signals ethnic, cultural, or loosely exercised influence—real on the ground, but dangerous to treat like a modern electoral map.
- A **disputed** boundary warns you explicitly that two or more powers (or historiographical camps) have plausible claims; the line is a compromise for pedagogy, not an endorsement of a single source.

When you see two neighbouring regions with different border treatments, ask *what kind of evidence usually supports each*. Hard borders invite you to think about charters, fiscal records, and campaign boundaries. Soft borders invite linguistic geography, ceramic provinces, or the reach of lordship exercised irregularly.

### Fill intent: what the colour is arguing

**Fill intent** tells you the *category of claim* the shaded interior is making. Typical intents include **culture**, **polity**, **pressure**, **neutral**, **frontier**, **contested**, and **homeland**. These words are shorthand for historical reasoning:

- **Culture** invites language, ritual practice, settlement pattern, identity—phenomena that blur at the edges.
- **Polity** invites government, dynasty, institutions—things that can center on courts and capitols.
- **Frontier** and **contested** signal zones where institutions thin out or overlap; they are where surprise and violence often live in the narrative.
- **Homeland** marks a basin of recruitment or identity projection—the place a group *from* which action radiates, not only the place *in* which events occur.

None of these intents are licenses to forget geography. A “cultural” region still follows river meshes and coastlines more often than straight lines. A “political” region in the early Middle Ages may still look amphibious: water connects as often as land divides.

### Year-sensitive regions and the same era id

Some regional logic depends not only on which **era** you selected but on **which year** the simulation holds within that era—especially for colonial North Atlantic material. The underlying engine can swap which polygons belong validly to a timeslice when a treaty redraws the map. Utrecht, for example, forces the story to redraw French imperial skin in the northwest Atlantic; the map should not pretend Acadia after 1713 looks the same as Acadia before.

For Viking-related **territory** displays, **time rules** may fade or emphasize zones as raiding, wintering, and settlement phases succeed one another. That is not ornament; it is a reminder that Scandinavian engagement with the Frankish world was a sequence of tactics, not a single conquest gradient.

When you notice a boundary appear, vanish, or soften without changing the era label, check whether the **year scrubber** or story beat advanced. The atlas is signaling that some historical transitions are *annual* in documentary resolution even if we narrate them inside broader chapters.

---

## Scenario: Places and settlement types

Places in the atlas are **typed**. The type is a cartographic contract with you, the reader. It does not pretend to duplicate the full vocabulary of medieval settlement (villa, castrum, portus, burh, þorp, and so on). Instead it offers a workable set of categories you can learn once and reuse: **port**, **city**, **settlement**, **abstract_node**, **fort**, **megalith**, **hillfort**, **mission**, **trading_post**.

:::atlas-ui
**Kinds:** `PlaceKind` in `core/types.ts` — not a complete medieval taxonomy; **pedagogical** shorthand.  
**Labels:** Change with **era** via `PlaceEraState.label` — identity is **situated**, not a permanent pin caption.
:::

### Ports, cities, and trading posts

**Ports** and **trading_post** nodes mark where maritime or riverine exchange concentrated people and information. On the Norman and Breton coasts—and later on Atlantic routes—you should imagine these points as hinges: timber, salt, cloth, metal, wine, people, and news passed through them. When the atlas emphasises Dieppe, Honfleur, or Barfleur in expansion eras, it is reminding you that Norman history stayed *marine* long after Scandinavian speech faded in the hinterland.

**Cities** are seats where multiple networks coincide: ecclesiastical, commercial, military, legal. Rouen’s persistence from **Rotomagus** forward is the textbook case in this landscape. A city label in a given era should prompt you to ask about courts, bishops, mints, bridges, and fodder sheds—things that only cohere at large scale.

### Forts, hillforts, megaliths

**Forts** and **hillforts** encode hierarchy and violence—or the threat of violence. A hillfort in an Iron Age frame is an argument about Iron Age political segmentation; a castle in a medieval frame is an argument about lordly domination of river crossings and coastal approaches. **Megaliths** belong to longer cultural time; they teach persistence of ritual landscape and the deep prehistory that the Channel world shares.

**Abstract_node** sounds technical; in practice it often marks a conceptual anchor needed for routing or narrative clarity where a modern “dot on the map” would overclaim precision. Treat it honestly: the atlas needs the node; the past may not have needed the label.

### Missions and colonial anchors

**Mission** marks institutional religion advancing alongside trade and colonization—especially relevant where New France overlays appear. A mission dot is seldom “only” spiritual; it is linguistic, educational, and diplomatic infrastructure.

### Labels that change across eras

Many places carry **era-specific labels** and **affiliation tags**. The same coordinate can answer to a Roman civic name, a medieval vernacular form, and a modern French toponym. That is not inconsistency; it is *situated identity*. Train yourself to hear the temporal voice: a Roman map speaks administrations; a ducal map speaks lordships; a colonial map speaks charter companies and royal intendants.

Geographically, ask why **this** node and not another ten kilometers upriver. Usually the answer pairs terrain and institution: a bridgehead, a cathedral precinct, a fair, a measured knot in the cord of a fiscal circuit.

---

## Scenario: Routes and movement

Routes in Norman Atlas are built as **segments** between places. Each segment carries a **kind**—for example migration, trade, raid, maritime_corridor, river_corridor, settlement_corridor, military, colonial_migration—and an **evidence** tag that tells you what sort of inference sits behind the line.

:::scenario-brief
**Dual pipelines:** Legacy **deck.gl** routes vs atlas **segment kinds** — different toggles, same screen. If lines vanish, you are often in the wrong **pipeline × era** pair.
:::

### Corridors, not voyages

The atlas’s methodology is explicit: **routes represent historical corridors and movement patterns, not guaranteed one-to-one documented individual voyages.** Read that sentence twice. It immunizes you against the most common map misread: mistaking a beautiful curved arc for “this ship, that Tuesday.” Corridors aggregate climatology, pilotage habits, naval seasonality, and repeated documentary patterns into something visible.

Maritime segments often follow **path coordinates** that hug coasts and honor prevailing lanes where the data model supplies them. When you see a polyline step through islands and estuaries, the map is arguing for *plausible steering*—not a GPS trace from someone’s phone.

### River corridors and settlement corridors

**River_corridor** segments remind you that early medieval and ancient bulk moved far more cheaply on water than on roads. The lower Seine is not “near” Paris in the sense of a commuter belt; it is upstream power meeting downstream ships, a fact that made the river strategically appetizing to raiders who understood **wintering islands** and **tidal reach**.

**Settlement_corridor** patterns synthesize how people moved into farmland, marsh clearance, marsh-island habitations, and urban pull zones. They are slower visually than raids, but historically they are what made raids *possible* to absorb or reverse.

### Two route systems in one application

The software maintains **two independent route mechanisms**. One filters a legacy deck of routes by broad categories useful to exploration and colonial narratives. The other drives atlas **segment kinds** for Viking-world overlays—raids, trade, settlement routes, exploration—through a parallel toggle set.

If your routes “disappear,” perform this checklist:

1. Which **era** is active? Viking-era segments may not appear when you stand in a colonial era—and vice versa.
2. Which **route toggles** did you activate? A raid corridor toggle does nothing if the active era carries no raid geometry for that overlay path.
3. Are you expecting **individual voyages** where the map encodes **aggregated corridors**? Adjust your question to match the encoding.

This duality is a feature of product history, but it is also a lesson in historical method: **scales of movement** differ. Reading the atlas expertly means toggling until your question and the map’s ontology align.

---

## Scenario: Evidence on the map

Every route segment in the atlas pipeline can declare an **evidence level**. The implementation distinguishes **documentary_cluster**, **synthesis**, **archaeological**, and **tradition**. Think of these as contracts between authors and readers.

:::evidence synthesis
Corridors marked **synthesis** are still **argued history** — not fiction. They integrate sparse or mixed sources; interrogate the tooltip and any `readingLinks` before you quote them as “fact.”
:::

### Documentary clusters

**Documentary_cluster** marks patterns anchored in texts: annals, charters, letters, tax rolls, legal judgments. Clusters admit ambiguity—two chroniclers, two dates—but they still belong to the world of writing and copying. When you follow a documentary-weighted military segment, you are being invited to check the usual diplomatic editions and regional corpora.

### Archaeology

**Archaeological** evidence ties the line or place to material context: excavation, survey, dendrochronology where available, typologies. The atlas promises not to invent “ghost settlements”; confirmed Viking-site markers rest on verified sources. That restraint matters: the visual lure of dots is strong; the discipline of only placing verified ones is how trust accrues.

### Synthesis

**Synthesis** is honest middle ground. It marks historian-constructed interpretations that integrate categories—say, numismatics with sparse textual mentions, or distribution maps with ambiguous provenance. Synthesis is not “fiction”; it is **argued integration**. Your job as reader is to treat it with more interrogation than a single well-dated charter—and less suspicion than oral lore alone.

### Tradition

**Tradition** signals material preserved in later memory culture: saga echoes, local stories, early modern antiquarianism. It can be enormously suggestive and enormously misleading. The atlas shows it so you can *see* where dazzling narrative meets thin proof.

### Reading links

Many segments can carry **reading links**—curated pointers outward. Treat the atlas as a **doorway**: the map orients you; the footnotes and external references still do the heavyweight demonstration.

---

Part II has given you the lexicon of surfaces, nodes, and lines. Now you can turn from *what the tokens mean* to *why the geography worked that way*—the narrative spine of Part III—and then to multi-layer expert reading in Part IV.
