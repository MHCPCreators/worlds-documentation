# Programmatic Management of Sound FX and Particle FX

In Horizon Worlds, visual and audio effects (FX) can quickly bloat your world’s capacity and viewport and become a headache to change later.  
This tutorial walks through how to build a simple, centralised FX Manager script to keep your worlds tidy and performant.

Do any of these sound familiar?
- Your world capacity is filling up with gizmos that mostly sit dormant.
  <details>
    <summary>Example</summary>
    
    ![World Capacity](/images/world_capacity.png)
  </details>
- You forget to assign entity FX references to your scripts.
  <details>
    <summary>Example</summary>
    
    ![Unset Asset References](/images/unset_asset_references.png)
  </details>
- You want to replace a sound clip with another, but don't remember all the places you assigned it.
- There's just gizmos... everywhere!
  <details>
    <summary>Example</summary>
    
    ![Lots of Gizmos](/images/lots_of_gizmos.png)
  </details>

If so, programmatic FX management can help!

---

## Table of Contents
1. [The Manager](#the-manager)
2. [Define Assets](#define-assets)
3. [Pre-Spawning FX at Runtime](#pre-spawning-fx-at-runtime)
4. [Requesting FX](#requesting-fx)
5. [Full Script](#full-script)
6. [Example Usage](#example-usage)
7. [Troubleshooting](#troubleshooting)

---

## The Manager

We start off by adding an empty object, and assigning our new script to it: `FXManager.ts`.

In this script, we're going to define all of the **sound effect (SFX)** and **particle effect (PFX)** assets we plan to use in our world in one place.

### Define the FX Asset Type

```ts
type FXAsset = {
  asset: hz.Asset;   // specific asset version
  count: number;     // number to pre-spawn
};
```

### Define Assets

```ts
const FXAssets: Map<string, FXAsset> = new Map([
  [ "pfx_ring", { asset: new hz.Asset(BigInt(1718865042072569)), count: 6 } ],
  [ "sfx_boom", { asset: new hz.Asset(BigInt(1234567890123456)), count: 4 } ],
]);
```

- Assets shouldbe configured to  **not**  *play on start*.
- When choosing the `count`, try to imagine at most how many of each specific asset might be playing at once.
- Be sure to use your own or public assets here.

These IDs can be found in the **details panel** of your assets.

---

## Pre-Spawning FX at Runtime

Next up, we use the `start` function to iterate through all of the assets we defined earlier, and spawn the requested amount.\
We make use of the `SpawnController`'s `then` promise, to add these spawned entities into arrays to be used later.

```ts
static FXPools: Map<string, hz.Entity[]> = new Map();

start() {
  FXAssets.forEach((fx, id) => {
    const pool: hz.Entity[] = [];
    FXManager.FXPools.set(id, pool);

    for (let i = 0; i < fx.count; i++) {
      const controller = new hz.SpawnController(
        fx.asset,
        this.entity.position.get(),
        this.entity.rotation.get(),
        hz.Vec3.one
      );

      controller.spawn().then(() => {
        const roots = controller.rootEntities.get();
        if (!roots || roots.length === 0) return;
        pool.push(roots[0]);
      });
    }
  });
}
```

Now, when we begin simulating the world, all of our FX will be spawned **at runtime**, tidily located on top of the FXManager.

---

## Requesting FX

We need a function that can be called from any other script to **request an FX**:

```ts
export function RequestFX(
  id: string,
  position: hz.Vec3,
  rotation: hz.Quaternion = hz.Quaternion.i,
  scale: hz.Vec3 = hz.Vec3.one
) {
  const pool = FXManager.FXPools.get(id);
  if (!pool) return;

  const entity = pool.shift();
  if (!entity) return;

  entity.position.set(position);
  entity.rotation.set(rotation);
  entity.scale.set(scale);
  pool.push(entity);

  entity.as(hz.ParticleGizmo)?.play();
  entity.as(hz.AudioGizmo)?.play();
}
```

- The function looks up the requested FX by string ID.
- If a matching pool exists, it takes the next entity in the queue and invokes it at the desired transform.
- The entity is then moved to the back of the queue, to be reused later.
- You can extend the types of gizmos supported by adding more casts to the end of this function.

---

## Full Script

```ts
import * as hz from 'horizon/core';

type FXAsset = {
  asset: hz.Asset;
  count: number;
};

const FXAssets: Map<string, FXAsset> = new Map([
  [ "pfx_ring", { asset: new hz.Asset(BigInt(1718865042072569)), count: 6 } ],
  [ "sfx_boom", { asset: new hz.Asset(BigInt(1234567890123456)), count: 4 } ],
]);

export function RequestFX(
  id: string,
  position: hz.Vec3,
  rotation: hz.Quaternion = hz.Quaternion.i,
  scale: hz.Vec3 = hz.Vec3.one
) {
  const pool = FXManager.FXPools.get(id);
  if (!pool) return;

  const entity = pool.shift();
  if (!entity) return;

  entity.position.set(position);
  entity.rotation.set(rotation);
  entity.scale.set(scale);
  pool.push(entity);

  entity.as(hz.ParticleGizmo)?.play();
  entity.as(hz.AudioGizmo)?.play();
}

class FXManager extends hz.Component<typeof FXManager> {
  static propsDefinition = {};

  static FXPools: Map<string, hz.Entity[]> = new Map();

  start() {
    FXAssets.forEach((fx, id) => {
      const pool: hz.Entity[] = [];
      FXManager.FXPools.set(id, pool);

      for (let i = 0; i < fx.count; i++) {
        const controller = new hz.SpawnController(
          fx.asset,
          this.entity.position.get(),
          this.entity.rotation.get(),
          hz.Vec3.one
        );

        controller.spawn().then(() => {
          const roots = controller.rootEntities.get();
          if (!roots || roots.length === 0) return;
          pool.push(roots[0]);
        });
      }
    });
  }
}
hz.Component.register(FXManager);
```

---

## Example Usage

Here’s how we might use this in a `ProjectileLauncher` to spawn some smoke and a boom whenever something is hit:

```ts
import { RequestFX } from 'FXManager';
import * as hz from 'horizon/core';

class ProjectileFX extends hz.Component<typeof ProjectileFX> {
  static propsDefinition = {};

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnProjectileHitEntity,
      (entityHit: hz.Entity, position: hz.Vec3, normal: hz.Vec3, isStaticHit: boolean) => {
        RequestFX("Smoke_PFX", position);
        RequestFX("Boom_SFX", position);
      }
    );
  }
}
hz.Component.register(ProjectileFX);
```

---

## Troubleshooting

- **Nothing spawns:** This can happen if the request is made from a locally controlled script. Ensure FX requests are triggered from the server side.
- **Too few pre‑spawned entities:** If you don’t spawn enough instances up front, an effect may be interrupted (clipped) early because it gets reused before finishing.
- **No pool exists:** If you request an FX ID not defined in `FXAssets`, nothing will happen.

---

✅ And with that, you have a **centralised manager for all things FX**!

