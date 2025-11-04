# How to Make an Enemy Wave System - by Scarcesoft

Timer-based enemy waves • Formations • Budget-based generator in < 130 lines of code.

## Prerequisites
- Basic familiarity with placing objects in the Worlds Desktop Editor
- Basic familiarity with TypeScript in VS Code or similar IDE

## Introduction

So you wanna know how to make an enemy wave, huh? You're in the right place. Before long, you'll be able to do this:

<p align="center">
  <img src="https://github.com/user-attachments/assets/50d00f86-db56-49a2-84c6-8b65a301fd9b" width="500" alt="Zombie enemy waving">
</p>

Not what you were looking for? How about… this!?

<p align="center">
  <img src="https://github.com/user-attachments/assets/212dba07-c8b5-435f-8374-9ffa17af9bc2" width="500" alt="A literal ocean wave monster">
</p>

Not that either? Oh! You're looking for a *configurable enemy-group spawning system*.

One more try...

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZnY26YfpL20?si=O6O7NaCB5QxDWWkW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Like what you see? Then let's get to it!

First, a bit of conceptual groundwork.

## What is an enemy wave?

Here's my definition:

> "An enemy wave is a group of enemies that is spawned together in formation and advances against the player's interests"

Let's break that down and go into a bit more detail:

### "group of enemies"
This just means multiple enemies. They could be all the same type of enemy, or a mix of different ones. In my world, the enemies will be three different types of robots:

- **Chomper:** Basic melee robot that bites
- **Mortar Boy:** Ranged robot that fires arcing mortars
- **Giant:** A big, imposing robot that does heavy melee damage with its fists

### "spawned together"
"Spawned" means brought into the world. This could be done via summoning them on the fly (via [asset spawning](https://developers.meta.com/horizon-worlds/learn/documentation/vr-creation/scripting/spawn-despawn-assets-horizon-worlds)) or grabbing them from a pool of preloaded entities.

We’ll use asset spawning: plug in each robot asset once; the system instantiates as many as the wave needs.

### "in formation"
*Where* do we put each enemy? Even if we didn't care where they started, we'd be liable to place them on top of each other without careful planning. We *could* randomize and track positions we've used, but that sounds painful.

Instead, let's just physically arrange some empty objects in the world to serve as positional placeholders. That solves the "on top of each other" problem by default. And more important, it will look cool 😎

### "advances against the player's interests"
The enemies are, well, enemies. Maybe they're trying to kill the player. Or maybe they're trying to destroy something they care about. In this tutorial, the robots ignore scarcesoft and go straight for his coveted Magic Crystal™. 

> How to make cool animated robots that bite, punch, and fire mortars is beyond the scope of this tutorial. I suggest following along by making a few primitive objects like cubes or spheres and adding them as asset templates. If you've got questions about how to script dynamic enemies / NPCs, follow scarcesoft in Horizon Worlds and DM me. 

## Two more questions before we leave "conceptual land"

### When do we want each wave to be spawned?
We *could* spawn each wave after the player has defeated the previous wave, but that's a bit too polite for my taste. Besides, that requires us to wire up some sort of death reporting from enemy -> Wave System. No thanks.

We'll be going with a 30-second wave interval. Every 30 seconds, a new wave will spawn, regardless of how many enemies are still standing.

### How do we pick which enemies to include in a wave?
There are two routes to choose from here:

A. Human-designed waves: We carefully craft each wave by hand-picking enemy formations. IMO, human creativity will always yield the best quality. However, we would be limited by time / energy / imagination.

B. Computed/generated waves: We allow our Wave System to conjure waves itself by doing the following:
1. Assign enemy formations different numeric "costs"
2. Give the system a "budget". The system will pick randomly from options it can afford within the budget.
3. After each wave, increase the budget so that the waves get progressively more difficult. 

The chief advantage with B. is that, once we code out the system, we'll have an endless supply of enemy waves!

Both options are intriguing, so I'm going with the rule of cool: IMO **computer-generated** waves are cooler 😎

---

OK, talk is cheap. Let's get creatin'.

In the Worlds Desktop Editor, I created a new world put this entity within its hierarchy:

<p align="center">
  <img src="https://github.com/user-attachments/assets/246ae196-eb37-44fc-8c37-87e867dc3917" width="900" alt="A view of the Worlds Desktop Editor which shows empty objects that constitute formations for enemy waves">
</p>

Here we have an empty object with a bunch of other empty objects nested inside like [matryoshka dolls](https://en.wikipedia.org/wiki/Matryoshka_doll). Inside `EnemyFormations` are three sub-entities, one named for each type of enemy. 

The `MortarBoy`, `Chomper`, and `Giant` entities each contain a single `[EnemyName]Formation` entity. *Those* entities contain children which represent the positions where individual enemies will be spawned.
 
**Mortar Boys:** rows of 3, 2 units apart (0,0,0), (2,0,0), (4,0,0)  
**Chompers:** rows of 2, 3 units apart (0,0,0), (3,0,0)  
**Giants:** solo (one placement)

Giants, being mini-bosses essentially, will be alone. You may be wondering: "Why even have a formation for Giants if there's only one placement?"

The answer is: **Standardization**. Standardization lets systems treat everything the same and avoids special-case `if/else` logic later.

> Note: These are just empties we're using for their positions. It's good practice to make them invisible, non-collidable, and not included in bakes (multi-edit makes this fast).

At this point, we can go ham with duplicating our `[EnemyName]Formation` entities. I'm going to make quite a few and place them all over the map in non-overlapping positions.

- Because Mortar Boys are ranged, most of their formations sit toward the back of the map.
- Chompers go in front of Mortar Boys.
- Giants are on the edges, to the left and right; they’re expensive, so I'll place fewer.

---
We're going to create one more empty object at the top-level of our world's hierarchy. I'll name mine `WaveSystem`.

Then, I'll add a new script to it called `WaveSystem`.

<p align="center">
  <img src="https://github.com/user-attachments/assets/b033fb79-dec2-423a-9bec-9ee3b61db525" width="900" alt="A view of the Worlds Desktop Editor showing the WaveSystem entity selected and the `New Script` prompt">
</p>

We'll define `propsDefinition` like so:

```typescript 
import * as hz from "horizon/core";

class WaveSystem extends hz.Component<typeof WaveSystem> {
  static propsDefinition = {
    enemyFormations: { type: hz.PropTypes.Entity },
    // Assets
    MortarBoy: { type: hz.PropTypes.Asset },
    Chomper: { type: hz.PropTypes.Asset },
    Giant: { type: hz.PropTypes.Asset },
  };

  start() {}
}
hz.Component.register(WaveSystem);
```

Once that compiles, we'll drag in our references into the WaveSystem's props in the editor. 
- Drag the `EnemyFormations` entity from the hierarchy into the `enemyFormations` slot
- Drag each enemy from the *Assets Library* panel (not the hierarchy!) into its corresponding asset slot. If you're following along with your own enemies, make sure you've published them into assets first.

<p align="center">
  <img src="https://github.com/user-attachments/assets/6a320ba1-555c-4747-b802-85b2d40e8c80" width="900" alt="A view of the Worlds Desktop Editor showing the MortarBoy asset from the Asset Library panel being dragged into the WaveSystem's props">
</p>

Now what we're after, ultimately, is to be able to say in code: "Spawn me a random formation of some enemy type".

To help get us there, I'll add these TypeScript types to the top of the file, under our import statements but above the `WaveSystem` class:

```typescript
type EnemyType = "MortarBoy" | "Chomper" | "Giant"; // This defines, concretely, the names of our enemies

// This defines the shape of an object that holds data for a particular enemy type
type EnemyData = {
  asset?: hz.Asset; // The ? here means this property is "optional", or, in other words, it might be undefined
  formations: hz.Entity[];
  formationCost: number;
};

/* 
  This defines an object that is keyed by our EnemyType and houses EnemyData objects
  We'll use this as our primary data structure for looking up enemy data
*/
type EnemyDataLookup = Record<EnemyType, EnemyData>; 
```

> Note: `type` is a keyword that allows us to author custom TypeScript types. These aren't used at runtime, they're merely "shapes" that make the code easier to understand.

Down inside our class, let's define a member variable to hold our enemy data lookup:

```typescript
class WaveSystem extends hz.Component<typeof WaveSystem> {
  // ... propsDefinition here ...

  private enemyDataLookup: EnemyDataLookup = {
    MortarBoy: {
      asset: undefined, // We'll populate these later
      formations: [], // Same for these
      formationCost: 1,
    },
    Chomper: {
      asset: undefined,
      formations: [],
      formationCost: 2,
    },
    Giant: {
      asset: undefined,
      formations: [],
      formationCost: 3,
    },
  };
}
```
Costs: MortarBoy=1, Chomper=2, Giant=3.

Notice that the `asset` properties are assigned the `undefined` value and likewise the `formations` properties are initialized to empty arrays. This is because we need to wait until `preStart` to access props. This variable is created when the class's *constructor* is called, which is before `preStart`.

Next, we'll add a method for populating our `enemyDataLookup` with the actual assets and formations. We'll call this method from `preStart`:

```typescript
import * as hz from "horizon/core";

class WaveSystem extends hz.Component<typeof WaveSystem> {
  // ... propsDefinition here ...
  // ... enemyDataLookup here ...
  preStart() {
    this.setupFormations();
  }

  private setupFormations() {
    /* 
      ! means "not", as in, there are NOT enemy formations
      In TypeScript, this would mean `this.props.enemyFormations` is "falsy". 

      See: https://developer.mozilla.org/en-US/docs/Glossary/Falsy for more details
    */
    if (!this.props.enemyFormations) {
      throw new Error(
        "You forgot to add enemy formations to the WaveSystem, silly!"
      );
    }

    const formationEntities = this.props.enemyFormations.children.get();

    formationEntities.forEach((formationEntity) => {
      /*
        We assert `as EnemyType` here so that we can use the entity's name, which is just a plain string,
        to access our enemyDataLookup object. In general, asserting with `as` is not a good idea.
        However, we know that we named our formation entities exactly the same as our EnemyType names.
        Plus, scarcesoft says it's cool. 😎
      */
      const enemyType = formationEntity.name.get() as EnemyType; 

      this.enemyDataLookup[enemyType].formations = formationEntity.children.get();

      this.enemyDataLookup[enemyType].asset = this.props[enemyType];
    });
  }

  start() {}
}

hz.Component.register(WaveSystem);
```

Take a close look at that `setupFormations` method. You'll notice that the first thing we're doing in that method is conditionally throwing an error! 😱 Why on earth would we do that?? Two reasons:

1. Defensive programming: If we forget to assign the `enemyFormations` prop in the editor, we want to know about it right away. We can use the Error to report the problem to the console in a way that's hard to miss.
2. Type safety: If our code executes past the error throwing, it means we've *proven* that `this.props.enemyFormations` is in fact defined. So TypeScript won't bark at us for trying to access its properties, e.g. `children`.

The rest of the method is fairly straightforward. We get the children of the `enemyFormations` entity, which are the individual formation entities for each enemy type. Then, for each formation entity, we:
- Use its name to look up the corresponding entry in `enemyDataLookup`
- Populate the `formations` property with the children of the formation entity
- Populate the `asset` property with the corresponding prop

---
OK, let's get some enemies spawning! This will start to get a bit complex, so let's ground ourselves. 

To spawn a wave of enemies, we need to do the following:

1. Choose one or more enemy types
2. For each enemy type chosen, select one or more formations at random
3. For each formation selected, spawn an enemy at each of its placement positions

Let's start with 3. and work our way backwards. We'll add this method to our class:

```typescript
class WaveSystem extends hz.Component<typeof WaveSystem> {
  // ... rest of class ...

  private spawnAsset(enemyType: EnemyType, enemyPlacement: hz.Entity) {
    const asset = this.enemyDataLookup[enemyType].asset;

    if (!asset) {
      throw new Error(`Asset not found for enemy type: ${enemyType}`);
    }

    this.world.spawnAsset(asset, enemyPlacement.position.get());
  }
}
```

Pretty straightforward. Once again, we throw an error if we can't find an asset by the given enemy type, because that means we forgot to provide it as a prop. OK, how about a whole formation?

```typescript
class WaveSystem extends hz.Component<typeof WaveSystem> {
  // ... rest of class ...

   private spawnEnemyFormation(enemyType: EnemyType) {
    const formations = this.enemyDataLookup[enemyType].formations;

    const formationToSpawn = this.getRandomArrayElement(formations);

    const enemyPlacements = formationToSpawn.children.get();

    for (const enemyPlacement of enemyPlacements) {
      this.spawnAsset(enemyType, enemyPlacement);
    }
  }

  private getRandomArrayElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
```

Take note of the `getRandomArrayElement` helper function. If you haven't seen the generic `<T>` syntax before, try not to be intimidated. I'll break it down for you:

The angle brackets `<>` are used to provide type parameters, similar to how parentheses `()` are used to provide value parameters to a function. What this function's signature is saying is: "I take an array of any type `T` and I return a single element of that same type `T`".

In our case, we call the function with an array of `hz.Entity` objects (the formations), so `T` becomes `hz.Entity` for that call. But we could call it with an array of strings, numbers, or even custom types we've defined ourselves. Later, we'll use this helper again to pick random enemy types when forming a wave.

Ok, let's test this out:

```typescript
class WaveSystem extends hz.Component<typeof WaveSystem> {
  // ... rest of class ...

  start() {
    this.spawnEnemyFormation("MortarBoy");
  }
}
```

<iframe width="560" height="315" src="https://www.youtube.com/embed/utV8x-nqKTo?si=FSevyGBeIPlbWEhV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Eureka! We have some Mortar Boys spawning in formation. Now I'm hungry for more...

I'm gonna extend our props with the remaining pieces we need, as well as add a member variable to keep track of our current budget:

```typescript
class WaveSystem extends hz.Component<typeof WaveSystem> {
  static propsDefinition = {
    enemyFormations: { type: hz.PropTypes.Entity },
    // Assets
    MortarBoy: { type: hz.PropTypes.Asset },
    Chomper: { type: hz.PropTypes.Asset },
    Giant: { type: hz.PropTypes.Asset },
    // Configuration (New)
    startingBudget: { type: hz.PropTypes.Number },
    spawnIntervalSeconds: { type: hz.PropTypes.Number }, // How many seconds to wait between waves - I set this to 30 in the editor
  };
  
  // New
  private budget = 0;

  // ... rest of class ...
}
```

Then, I'll add a method for spawning a whole wave:


```typescript
class WaveSystem extends hz.Component<typeof WaveSystem> {
  // ... rest of class ...

  private spawnWave() {
    let budgetSpent = 0;
    let availableEnemyTypes: EnemyType[] = ["MortarBoy", "Chomper", "Giant"];

    while (budgetSpent < this.budget && availableEnemyTypes.length > 0) {
      const enemyType = this.getRandomArrayElement(availableEnemyTypes);

      const cost = this.enemyDataLookup[enemyType].formationCost;

      if (budgetSpent + cost <= this.budget) {
        this.spawnEnemyFormation(enemyType);
        budgetSpent += cost;
      } else {
        // Remove this enemy type from the available list if we can't afford it
        availableEnemyTypes = availableEnemyTypes.filter(
          (et) => et !== enemyType
        );
      }
    }

    this.budget++;
  }
}
```
This method is a bit complex, so let's break it down:

- We start with `budgetSpent` at zero and a list of all available enemy types.
- We enter a `while` loop that continues as long as we haven't spent our entire budget
  and we still have enemy types we can afford. The code in between the curly braces `{}` is called the "body" of the loop and will be executed repeatedly until the loop condition is no longer true. Inside the loop body, we:
  - Pick a random enemy type from the available list.
  - Check the cost of spawning a formation of that enemy type.
  - If we can afford it (i.e., adding the cost to `budgetSpent` doesn't exceed `this.budget`), we spawn a formation of that enemy type and update `budgetSpent`.
  - If we can't afford it, we remove that enemy type from the available list so we don't try to spawn it again in this wave.
- After the loop, we increment `this.budget` to make the next wave larger


All that's left is to schedule this puppy.

```typescript
class WaveSystem extends hz.Component<typeof WaveSystem> {  
  // ... rest of class ...

   start() {
    this.spawnWave();

    this.async.setInterval(() => {
      this.spawnWave();
    }, this.props.spawnIntervalSeconds * 1000);
  }
}
```
`this.async.setInterval` will call whatever function we give it every N milliseconds. Since our prop is in seconds, we multiply by 1000 to convert to milliseconds. We *could* have defined our props to be in milliseconds to begin with, but I feel it's better to use seconds for human-friendliness and then convert to milliseconds in code.

> Note that we call `this.spawnWave()` once immediately in `start()`, so that we don't have to wait for the first interval to elapse before seeing our first wave.

Here's the whole file for reference:

```typescript
import * as hz from "horizon/core";

type EnemyType = "MortarBoy" | "Chomper" | "Giant";

type EnemyData = {
  asset?: hz.Asset;
  formations: hz.Entity[];
  formationCost: number;
};

type EnemyDataLookup = Record<EnemyType, EnemyData>;

class WaveSystem extends hz.Component<typeof WaveSystem> {
  static propsDefinition = {
    enemyFormations: { type: hz.PropTypes.Entity },
    // Assets
    MortarBoy: { type: hz.PropTypes.Asset },
    Chomper: { type: hz.PropTypes.Asset },
    Giant: { type: hz.PropTypes.Asset },
    // Configuration
    startingBudget: { type: hz.PropTypes.Number },
    spawnIntervalSeconds: { type: hz.PropTypes.Number },
  };

  private budget = 0;

  private enemyDataLookup: EnemyDataLookup = {
    MortarBoy: {
      asset: undefined,
      formations: [],
      formationCost: 1,
    },
    Chomper: {
      asset: undefined,
      formations: [],
      formationCost: 2,
    },
    Giant: {
      asset: undefined,
      formations: [],
      formationCost: 3,
    },
  };

  preStart() {
    this.budget = this.props.startingBudget;
    this.setupFormations();
  }

  private setupFormations() {
    if (!this.props.enemyFormations) {
      throw new Error(
        "You forgot to add enemy formations to the WaveSystem, silly!"
      );
    }

    const formationEntities = this.props.enemyFormations.children.get();

    formationEntities.forEach((formationEntity) => {
      const enemyType = formationEntity.name.get() as EnemyType;

      this.enemyDataLookup[enemyType].formations =
        formationEntity.children.get();

      this.enemyDataLookup[enemyType].asset = this.props[enemyType];
    });
  }

  start() {
    this.spawnWave();

    this.async.setInterval(() => {
      this.spawnWave();
    }, this.props.spawnIntervalSeconds * 1000);
  }

  private spawnWave() {
    let budgetSpent = 0;
    let availableEnemyTypes: EnemyType[] = ["MortarBoy", "Chomper", "Giant"];

    while (budgetSpent < this.budget && availableEnemyTypes.length > 0) {
      const enemyType = this.getRandomArrayElement(availableEnemyTypes);

      const cost = this.enemyDataLookup[enemyType].formationCost;

      if (budgetSpent + cost <= this.budget) {
        this.spawnEnemyFormation(enemyType);
        budgetSpent += cost;
      } else {
        // Remove this enemy type from the available list if we can't afford it
        availableEnemyTypes = availableEnemyTypes.filter(
          (et) => et !== enemyType
        );
      }
    }

    this.budget++;
  }

  private spawnEnemyFormation(enemyType: EnemyType) {
    const formations = this.enemyDataLookup[enemyType].formations;

    const formationToSpawn = this.getRandomArrayElement(formations);

    const enemyPlacements = formationToSpawn.children.get();

    for (const enemyPlacement of enemyPlacements) {
      this.spawnAsset(enemyType, enemyPlacement);
    }
  }

  private spawnAsset(enemyType: EnemyType, enemyPlacement: hz.Entity) {
    const asset = this.enemyDataLookup[enemyType].asset;

    if (!asset) {
      throw new Error(`Asset not found for enemy type: ${enemyType}`);
    }

    this.world.spawnAsset(asset, enemyPlacement.position.get());
  }

  private getRandomArrayElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

hz.Component.register(WaveSystem);
```

The whole system, in less than 130 lines of code. Not too shabby! 

After running this, I was able to produce the video shown in the introduction. Waves upon waves of robots descend upon my Magic Crystal, never stopping until, well, I press the editor's "Stop" button.

Now, it's up to you. Go forth and forge incredible worlds with relentless waves of enemies!
