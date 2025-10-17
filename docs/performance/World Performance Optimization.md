# World Performance Optimization in Horizon Worlds

Creating compelling art and smooth mechanics is what makes a Horizon World memorable. But even the most beautiful scene can lose its magic if performance lags. A single hiccup can break immersion, frustrate players, and reduce the chances of your world being revisited.

Performance optimization is the difference between a magical experience and a forgettable one.

---

## Why Optimization Matters

For beginners, performance tuning can feel messy and overwhelming. But once you crack it, it becomes your secret weapon—eliminating stutters, improving responsiveness, and making your world feel alive.

Think of it like stage lighting: if the spotlight flickers, the audience loses focus. In Horizon Worlds, optimization is your spotlight.

---

## Decoupling Performance: Frame Time vs. Frame Rate

Gamers often talk about **frames per second (FPS)**, but as a world creator, it’s better to think in **frame time**—measured in milliseconds per frame.

Here’s why:

Imagine your game *Enchanted City* renders 70 frames in one second. That’s 70 FPS—great, right? But what if 69 frames take 10ms each, and the last one takes 100ms? The average still looks like 70 FPS, but the player will feel that 100ms lag. It’s like watching a smooth movie that suddenly freezes for a moment. That moment breaks the flow.

So instead of chasing average FPS, aim for **consistent frame time**.

---

## Frame Budgeting

Every frame has a time budget based on your target FPS.

For example:
- If your world targets **72 FPS** (like Quest displays at 72Hz), your frame time budget is:
  
  ```
  1000 ms / 72 fps = ~13.88 ms per frame
  ```

That means all rendering, logic, and interactions must complete in under **13.88 milliseconds**—every single frame.

Setting this budget helps you benchmark and prioritize what’s worth rendering.

---

## Real-Time Metrics Panel in VR

The best way to analyze performance is **on the target device**—inside VR.

Horizon Worlds offers a **Real-Time Metrics Panel** to help you monitor frame time, memory usage, and more.

### How to Enable It:
1. Visit your world in any mode.
2. Turn either wrist toward you to activate the wearable.
3. Open the PUI and go to **Settings**.
4. Click the **Utilities** tab and enable the **Utilities Menu**.

Once enabled, you’ll see live metrics while exploring your world—perfect for spotting bottlenecks.

![Demo of Performance](./assets/performance.gif)

---

## Optimizing World Content

Here are simple ways to reduce workload and improve performance:

- **Only enable necessary settings** for objects. Don’t use physics or collisions unless needed.
- **Make hidden items invisible.** If the player can’t see it, don’t render it.
- **Use one texture per object.** In Blender, you can bake multiple materials into a single texture map to reduce draw calls.

---


## Reveal a Room When a Player Enters

Sometimes, you want a room or object to stay hidden until a player reaches a specific point—like a secret lab, a boss arena, or a cozy lounge. This technique helps optimize performance by hiding unused assets.

---

### Setup Steps

1. **Create the Room Entity**
   - In the Horizon Worlds editor, group the objects that make up your room into a single entity.
   - Name it something like `SecretRoom`.

2. **Add a Trigger Gizmo**
   - Place a trigger where you want the room to be revealed.
   - Set the trigger to detect **player entry and exit**.

3. **Attach the Script**
   - Create a new script using the format below.
   - Assign the `roomEntity` and `triggerEntity` in the script’s properties.

---

### Script: Toggle Room Visibility

```typescript
import {
  Component,
  PropTypes,
  CodeBlockEvents,
  Entity
} from 'horizon/core';

class RoomVisibilityController extends Component<typeof RoomVisibilityController> {
  static propsDefinition = {
    roomEntity: { type: PropTypes.Entity },      // The room to show/hide
    triggerEntity: { type: PropTypes.Entity },   // The trigger zone
  };

  start() {
    // Hide the room initially
    if (this.props.roomEntity) {
      this.props.roomEntity.visible.set(false);
    }

    // Show room when player enters trigger
    this.connectCodeBlockEvent(
      this.props.triggerEntity,
      CodeBlockEvents.OnPlayerEnterTrigger,
      () => {
        if (this.props.roomEntity) {
          this.props.roomEntity.visible.set(true);
        }
      }
    );

    // Hide room when player exits trigger
    this.connectCodeBlockEvent(
      this.props.triggerEntity,
      CodeBlockEvents.OnPlayerExitTrigger,
      () => {
        if (this.props.roomEntity) {
          this.props.roomEntity.visible.set(false);
        }
      }
    );
  }
}

Component.register(RoomVisibilityController);
```

---

### How It Works

- The script listens for player entry and exit events on the trigger.
- When a player enters, it sets the room’s `visible` property to `true`.
- When the player leaves, it sets it back to `false`.

This keeps your world lightweight and reactive—only rendering what’s needed when it’s needed.

---

## Summary: Treat Workload Like Currency

Think of performance like a budget. Every object you add costs something.

Before placing a chair in your scene, ask:
> “Does this chair add emotional or functional value? Is it worth the rendering cost?”

If it’s just decoration, maybe it can be merged with other assets or simplified. If it’s interactive or symbolic, it might be worth the cost.

This mindset helps beginners prioritize wisely and build worlds that feel rich without being heavy.

---



