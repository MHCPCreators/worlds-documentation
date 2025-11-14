# Goal - Let's make a wave spawner 
This importable script creates a **spawner** in Horizon Worlds that generates enemies at a fixed interval (every second by default). Yes, I know the moral repercussions of generating more enemies in the world, but the corporation required it...

I've also put together a simple video talking through the tutorial if just reading through all of this freaks you out a little bit. 
[![A youtube walkthrough of building a monster spawner in meta horizon worlds desktop editor.](https://i.ibb.co/9mgrK3vG/meta-horizon-worlds-wave-spawner.png)](https://www.youtube.com/watch?v=NDOmW9rAHNc_)

---
## 1. Understanding the Script Basics

### Importing Dependencies

```ts
import { Component, PropTypes, Asset } from 'horizon/core';
```
Depending on your editor settings, this could also have an "AT" symbol like: 
```ts
import { Component, PropTypes, Asset } from '@horizon/core';
```

- `Component`: lets us define custom behavior for an entity.
- `PropTypes`: allows us to define **editable properties** (e.g., assigning a prefab in the editor).
- `Asset`: represents a prefab or saved object in Horizon Worlds. It's a saved <i>template</i> that can be referenced by scripts.

---

### Defining the Component

```ts
export class WaveSpawner extends Component<typeof WaveSpawner> {
  static propsDefinition = {
    enemyPrefab: { type: PropTypes.Asset },
  };
```
- Creates a new component in your project called `WaveSpawner`.
- Adds **one property**: `enemyPrefab`, which must be an **Asset** (your enemy prefab). This is essentially telling the spawner thing - what is the monster you want me to spawn. Suggested monster name = Charles. 

---

### Start Method
```ts
override start() {
  // checks to ensure that the component was setup with an enemy to spawn
  if (!this.props.enemyPrefab) {
    console.error("WaveSpawner: 'enemyPrefab' property is not set.");
    return;
  }

  // This is where we define the interval of spawn rate in millisecons adjustments are totally cool
  this.async.setInterval(() => {
    this.spawnEnemy();
  }, 1000);
}
```

- This method runs when the component starts. Hence, the "override start()" bit at the beginning.
- Checks if `enemyPrefab` has been assigned. It'll get mad at you if you forget to tell the enemy spawner what enemy--Charles--to spawn.
- If yes, sets up a **timer** to call `spawnEnemy()` every 1000 ms (1 sec).
- Also, don't forget, if the spawner is somehow despawned, then it won't make more monsters.

Still tracking? Great!!! Let's get into the spawning logic next, and don't worry, we don't need a doula. 

---
### Spawn Logic

```ts
private spawnEnemy() {
  // where do we create this beautiful enemy of yours?
  const spawnPosition = this.entity.position.get();
  const spawnRotation = this.entity.rotation.get();

  this.world.spawnAsset(
    this.props.enemyPrefab!,
    spawnPosition,
    spawnRotation
  ).then(entities => {
    if (entities && entities.length > 0) {
      // console.log(`Spawned entity with ID: ${entities[0].id}`);
    }
  }).catch(error => {
    console.error("Failed to spawn enemy prefab:", error);
  });
}
```

- Uses the **entity’s position and rotation** as the spawn point. And by entity we mean the "spawner asset thing." 
- Spawns the assigned enemy asset prefab in the world. I.E. Charles is born where his mama "the Charles Spawner" was placed.
- Logs errors if spawning fails.

---

### Register the Component

```ts
Component.register(WaveSpawner);
```

- Makes the component available in Horizon Worlds’ editor. Meaning this becomes a reusable building block in the editor and in your game!
- Next time you go to the "Add Component" menu, you'll see a new, custom component, and if you're smart, you'll rename it to "Charlie's Mama."

---
## 2. Using the Spawner 

- **Create an enemy prefab**
  - Build your enemy (model + scripts).
  - Save it as a **Template Asset**. Otherwise referred to as "Charles Prime." 
- **Create a spawner entity**  
  - Add an empty object (or marker) where you want enemies to appear.
  - To recap - this is Charles's mama's location and where Charles Prime's clones will be born.
- **Attach the WaveSpawner script**
  - Select your spawner entity.
  - Add the `WaveSpawner` component.
- **Assign the prefab**
  - In the inspector, set **enemyPrefab** to your enemy Asset input in the spawner.
- **Test**
  - Press Play.
  - An enemy spawns **every second** at the spawner’s location.
  - And you can change that timing in the main script as needed.
 
---
## 3. Key Notes

- Like we mentioned, if no enemy prefab asset is assigned, the script safely stops and prints an error. Essentially, you're telling Charles's Mama to spawn a Charles, but you never told her that her child should be named "Charles" or even what he looks like.
- Enemies will spawn forever until you stop the world or remove the spawner. Translation: Charle's mom is boundless. 
- Be mindful of **performance** since spawning a sea of infinite Charlies in someone's headset or phone will definitely melt down those tiny GPUs. 

Here's the breakdown of the script we've been writing so far:
```ts
//to recap, the import might need an at symbol '@horizon/core'
import { Component, PropTypes, Asset } from 'horizon/core';

export class WaveSpawner extends Component<typeof WaveSpawner> {
// This will let the Horizon Inspector display an assignable spot for the enemy asset 
  static propsDefinition = {
    enemyPrefab: { type: PropTypes.Asset },
  };

  override start() {
    // Check if the enemyPrefab property has been assigned in the editor.
    if (!this.props.enemyPrefab) {
      console.error("WaveSpawner: 'enemyPrefab' property is not set.");
      return;
    }

    // Set up a timer that calls the spawnEnemy function every 1000 milliseconds (1 second).
    this.async.setInterval(() => {
      this.spawnEnemy();
    }, 1000);
  }

  private spawnEnemy() {
    // Get the position and rotation of the spawner entity.
    const spawnPosition = this.entity.position.get();
    const spawnRotation = this.entity.rotation.get();

    // Spawn the asset from the prefab property.
    this.world.spawnAsset(
      this.props.enemyPrefab!,
      spawnPosition,
      spawnRotation
    ).then(entities => {
      if (entities && entities.length > 0) {
        // console.log(`Spawned entity with ID: ${entities[0].id}`);
      }
    }).catch(error => {
      console.error("Failed to spawn enemy prefab:", error);
    });
  }
}

Component.register(WaveSpawner);
```
Okay, so that's the basics of spawning Charlies. But there's ever-so-much-more we can do together... Take my hand, sweet developer, and let's dive into the advanced tutorial. 

Afraid? No problem, we can stop here. But do you want to shake the foundations of the Charlieverse? Let's do it.
---

# ADVANCED: WaveSpawnerOnePoint — Next Level Tutorial

**One spawn point, three mobs, adjustable spread**

This step builds on the basic `WaveSpawner` by letting you spawn **up to three enemy prefabs at once** (yay triplets) from a **single spawn point**, with an adjustable **side‑to‑side spread** so they don’t overlap (perfect for “The Tale of Three Little Charlies”).

---

## What the Multi-spawner Does

- Spawn **1–3 prefabs simultaneously** on a fixed interval.
- Use a **single spawn point** (either the entity this script is on, or a separate marker via `spawnPoint`). Meaning lots of simultaneous Charlies, and only one mama.
- Control **spacing** with a `spread` value (meters): left / center / right. This is especially handy for tower defence style projects.

---

## The Code (drops into horizon as `AdvWaveSpawnerOnePoint.ts`)

```ts
import { Component, PropTypes, Asset, Entity } from 'horizon/core';

export class AdvWaveSpawnerOnePoint extends Component<typeof AdvWaveSpawnerOnePoint> {
  static propsDefinition = {
    // Up to three prefabs; assign 1–3
    // You can make different enemies come from a "mama" for example - Charles, Harold, and Tina are spawned
    // in the same moment by Charlie's mama.
    // This will also be visible in the horizon editor since we're making them static props. 
    enemyPrefab1: { type: PropTypes.Asset },
    enemyPrefab2: { type: PropTypes.Asset },
    enemyPrefab3: { type: PropTypes.Asset },

    // Optional explicit spawn point; if not set, uses this.entity
    spawnPoint: { type: PropTypes.Entity },

    // Interval between spawns (ms)
    spawnMs: { type: PropTypes.Number, default: 1000 },

    // Horizontal spread (meters) to avoid overlap; 0 = same position
    // Usually 1 is a good starting point.
    spread: { type: PropTypes.Number, default: 0 },
  };

  private timerId: number | null = null;

  override start() {
    const anyPrefab =
      this.props.enemyPrefab1 || this.props.enemyPrefab2 || this.props.enemyPrefab3;

    if (!anyPrefab) {
      console.error("AdvWaveSpawnerOnePoint: No enemy prefab assigned.");
      return;
    }

    this.timerId = this.async.setInterval(() => {
      this.spawnGroup();
    }, this.props.spawnMs);
  }

  private spawnGroup() {
    const point = this.props.spawnPoint ?? this.entity;

    const basePos = point.position.get();
    const baseRot = point.rotation.get();

    const slots: Array<{ prefab?: Asset; offsetX: number }> = [
      { prefab: this.props.enemyPrefab1, offsetX: -this.props.spread }, // left
      { prefab: this.props.enemyPrefab2, offsetX: 0 },                  // center
      { prefab: this.props.enemyPrefab3, offsetX: +this.props.spread }, // right
    ];

    for (const slot of slots) {
      if (!slot.prefab) continue;

      // Apply a simple world-space X offset to reduce overlap
      const pos = new (basePos as any).constructor(
        basePos.x + (slot.offsetX || 0),
        basePos.y,
        basePos.z
      );

      this.world.spawnAsset(slot.prefab, pos, baseRot).catch((err) => {
        console.error("AdvWaveSpawnerOnePoint: Failed to spawn prefab:", err);
      });
    }
  }

}

Component.register(AdvWaveSpawnerOnePoint);
```

> Note: The `(basePos as any).constructor(...)` pattern builds a new position in the same vector type that `Horizon` uses.

---

## How to set it up Multi-Spawn

1. **Create or choose a spawn point**
  - Option A: Place this component on the entity that marks your spawn location.
  - Option B: Create an empty marker entity and assign it to the `spawnPoint` property.
2. **Assign prefabs**
  - Set `enemyPrefab1`, `enemyPrefab2`, `enemyPrefab3` to your mob Assets.
  - You can assign **one, two, or three** prefabs. Empty slots are ignored. But you know you want to name them Charles, Harold, and Tina
3. **Tune cadence and spacing**
  - `spawnMs`: interval between spawns (e.g., `1000` for 1 second).
  - `spread`: horizontal separation in meters. Try `0.5` to `1.0` for visible spacing.
4. **Press Play**
  - Watch your trio spawn in formation at the chosen point on each tick. Hurray triplets!

---

## Tips
- **Adjust Monster Variety:** During runtime, you can change what asset is fed to the spawner, or just mix it up on each spawner to have a dynamic game.
- **Marching behavior**: Give each prefab its own movement/AI to walk forward after spawning. #GiveCharlesPurpose
- **Performance**: Add despawn logic to enemies (on death or after N seconds) to avoid buildup, and don't forget to ponder briefly on the transience of all life... We're not so different from Charles... 

---

## Troubleshooting

- *Nothing spawns*: Ensure at least one `enemyPrefabX` is assigned and going in the right direction. If nothing is assigned you'll see a console log. 
- *Spawning at wrong place*: Verify `spawnPoint` or the host entity transform. You can also go into the code and change the spawn point to whatever you prefer. 
- *Overlap too tight*: Increase `spread` or add slight Z offsets inside the loop if needed.

# 🎵 SUPER ADVANCED: BPM Wave Spawner Tutorial

## Goal

This component lets you spawn **up to 3 mobs** at a spawn point, but instead of a fixed interval it synchronizes spawning to **musical tempo (BPM)**.  
It supports:

- Changing BPM live
- Tap-tempo input
- Swing feel (jazz shuffle)
- Subdivisions (quarter, eighths, sixteenths, etc.)
- Spawn gating (every N beats)
- Smooth BPM transitions

Perfect for rhythm‑based gameplay synced to music. Or if you're listening to Thriller by MJ!

---

## The Code

```ts
import { Component, PropTypes, Asset, Entity } from 'horizon/core';

class BPMWaveSpawner extends Component<typeof BPMWaveSpawner> {
  static propsDefinition = {
    enemyPrefab1: { type: PropTypes.Asset },
    enemyPrefab2: { type: PropTypes.Asset },
    enemyPrefab3: { type: PropTypes.Asset },
    spawnPoint: { type: PropTypes.Entity },
    spread: { type: PropTypes.Number, default: 0.6 },

    bpm: { type: PropTypes.Number, default: 120 },
    initialSubdivision: { type: PropTypes.Number, default: 1 },
    spawnEveryNBeats: { type: PropTypes.Number, default: 1 },
    swingPercent: { type: PropTypes.Number, default: 0 },
    smoothing: { type: PropTypes.Number, default: 0.2 },
    minIntervalMs: { type: PropTypes.Number, default: 40 },
  };

  private timerRunning = false;
  private beatTimeoutId: number | null = null;

  private currentBpm!: number;
  private targetBpm!: number;
  private beatIndex = 0;
  private swingToggle = false;

  private subdivisionRt!: number;
  private spawnEveryNBeatsRt!: number;

  private tapTimes: number[] = [];
  private maxTaps = 6;
  private tapTimeoutMs = 2500;

  override start() {
    const anyPrefab = this.props.enemyPrefab1 || this.props.enemyPrefab2 || this.props.enemyPrefab3;
    if (!anyPrefab) {
      console.error("BPMWaveSpawner: assign at least one enemy prefab.");
      return;
    }

    const startBpm = Math.max(1, this.props.bpm || 120);
    this.currentBpm = startBpm;
    this.targetBpm = startBpm;

    this.subdivisionRt = Math.max(1, Math.floor(this.props.initialSubdivision || 1));
    this.spawnEveryNBeatsRt = Math.max(1, Math.floor(this.props.spawnEveryNBeats || 1));

    this.timerRunning = true;
    this.scheduleNextBeat();
  }

  override onDestroy() {
    this.timerRunning = false;
    if (this.beatTimeoutId !== null) {
      this.async.clearTimeout
        ? this.async.clearTimeout(this.beatTimeoutId)
        : this.async.clearInterval(this.beatTimeoutId);
      this.beatTimeoutId = null;
    }
  }

  // Public API
  public setBpm(newBpm: number) { if (newBpm > 0) this.targetBpm = newBpm; }
  public setSubdivision(n: number) { if (n > 0) this.subdivisionRt = Math.floor(n); }
  public setSpawnEveryNBeats(n: number) { if (n > 0) this.spawnEveryNBeatsRt = Math.floor(n); }
  public resetPhase() { this.beatIndex = 0; this.swingToggle = false; }

  public tapTempo() {
    const now = Date.now();
    if (this.tapTimes.length && now - this.tapTimes[this.tapTimes.length - 1] > this.tapTimeoutMs) {
      this.tapTimes = [];
    }
    this.tapTimes.push(now);
    if (this.tapTimes.length > this.maxTaps) this.tapTimes.shift();

    if (this.tapTimes.length >= 2) {
      const intervals = [];
      for (let i = 1; i < this.tapTimes.length; i++) {
        intervals.push(this.tapTimes[i] - this.tapTimes[i - 1]);
      }
      const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const tappedBpm = 60000 / Math.max(avgMs, 1);
      this.setBpm(tappedBpm);
    }
  }

  private scheduleNextBeat() {
    if (!this.timerRunning) return;

    this.currentBpm = this.lerp(this.currentBpm, this.targetBpm, this.clamp01(this.props.smoothing));

    const baseBeatMs = 60000 / Math.max(this.currentBpm, 1);
    const subdivMs = baseBeatMs / Math.max(this.subdivisionRt, 1);

    const swing = this.clamp(this.props.swingPercent, 0, 0.9);
    const intervalMs = swing > 0
      ? (this.swingToggle ? subdivMs * (1 - swing) : subdivMs * (1 + swing))
      : subdivMs;

    this.swingToggle = !this.swingToggle;
    const waitMs = Math.max(intervalMs, this.props.minIntervalMs);

    this.beatTimeoutId = this.async.setTimeout
      ? this.async.setTimeout(() => this.onBeat(), waitMs)
      : this.async.setInterval(() => this.onBeat(true), waitMs);
  }

  private onBeat(clearIntervalFallback = false) {
    if (!this.timerRunning) return;

    const shouldSpawn = (this.beatIndex % Math.max(this.spawnEveryNBeatsRt, 1)) === 0;
    if (shouldSpawn) this.spawnTrio();
    this.beatIndex++;

    if (clearIntervalFallback && this.beatTimeoutId !== null) {
      this.async.clearInterval(this.beatTimeoutId);
      this.beatTimeoutId = null;
    }
    this.scheduleNextBeat();
  }

  private spawnTrio() {
    const point = this.props.spawnPoint ?? this.entity;
    const basePos = point.position.get();
    const baseRot = point.rotation.get();

    const slots = [
      { prefab: this.props.enemyPrefab1, offsetX: -this.props.spread },
      { prefab: this.props.enemyPrefab2, offsetX: 0 },
      { prefab: this.props.enemyPrefab3, offsetX: +this.props.spread },
    ];

    for (const s of slots) {
      if (!s.prefab) continue;
      const pos = new (basePos as any).constructor(basePos.x + (s.offsetX || 0), basePos.y, basePos.z);
      this.world.spawnAsset(s.prefab, pos, baseRot).catch((err) => {
        console.error("BPMWaveSpawner: spawn failed:", err);
      });
    }
  }

  private clamp01(v: number) { return Math.max(0, Math.min(1, v)); }
  private clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
  private lerp(a: number, b: number, t: number) { return a + (b - a) * this.clamp01(t); }
}

Component.register(BPMWaveSpawner);
```

---

## Setup Guide

1. **Create your spawn point**
  
  - Place an empty entity in your world.
  - Add `BPMWaveSpawner` to it (or assign it via `spawnPoint`).
  - Just dance.
2. **Assign prefabs**
  - Set `enemyPrefab1–3` to any prefabs (same or different).
  - Leave empty slots blank.
3. **Tune musical properties**
  - `bpm`: starting tempo
  - `initialSubdivision`: 1=quarter, 2=eighths, 4=sixteenths…
  - `spawnEveryNBeats`: e.g., 4 → only spawn once per bar (at 4/4)
  - `swingPercent`: 0.15–0.25 for a swung feel
  - `spread`: offset mobs left/center/right

---

## Runtime Controls

- `setBpm(140)` → smoothly shift toward 140 BPM
- `setSubdivision(4)` → spawn on 16th notes
- `setSpawnEveryNBeats(2)` → spawn only on every 2nd beat
- `resetPhase()` → line up to the start of a song
- `tapTempo()` → call this on user taps to detect BPM

---

## Example Use Cases

- **Rhythm shooter**: spawn waves synced to music beats
- **Dance game**: enemies appear on downbeats / offbeats
- **Boss fights**: tempo ramps up as phase progresses (More music? More Charlies.)
- **Interactive music**: let players tap tempo to drive enemy waves

---

## Tips

- To **sync with a song**, call `resetPhase()` on the first downbeat.
- Use **tap tempo** to align to live DJ/Band performance and discover if you actually have rhythm.
- Use **smoothing** for gentle tempo drifts, or set it to `1.0` for instant BPM jumps.
- Keep `minIntervalMs` ≥ 40 to avoid stutter at very high BPMs.

---

Enjoy creating BPM‑driven rhythm gameplay! May Charles live on and reign supreme! 
