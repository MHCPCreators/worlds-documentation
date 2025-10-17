# DynamicLightGizmo — A Hands‑On Guide (TypeScript)

> **Goal:** Teach you how to drive a **DynamicLightGizmo** from code in the Worlds Editor Desktop. We’ll cover setup, core bindings (intensity, color, type), common patterns (strobe, fades, color cycles), and practical examples.

> **When to use:** Choose **Dynamic Light** for real‑time, scriptable lighting changes (AKA. a Flashlight that can be turned on/off). If a light never changes at runtime, prefer a static light for performance. Also, keep an eye on how many Dynamic Lights are being used as this could also impact performance.

---

## 1) Prerequisites

* You have a **Dynamic Light Gizmo** in your scene (Point or Spot).
* Your component exposes a **prop** for that light (e.g., `stageLight`).
* You’re comfortable with basic component structure in `horizon/core` (start/cleanup, timers with `this.async`, event wiring).

---

## 2) Quick Start: Binding the Light in a Component

```ts
import * as hz from "horizon/core";

class MyLightingController extends hz.Component<typeof MyLightingController> {
  static propsDefinition = {
    stageLight: { type: hz.PropTypes.Entity },
  };

  private stageLight?: hz.DynamicLightGizmo;

  start() {
    // Convert the entity prop into a DynamicLightGizmo binding once the component starts
    this.stageLight = this.props.stageLight?.as(hz.DynamicLightGizmo);

    // Minimal sanity check (no-op if not assigned in the Inspector)
    if (!this.stageLight) return;

    // Turn the light on with a soft pink
    this.stageLight.intensity.set(1);
    this.stageLight.color.set("#FF5AE5");
  }
}

hz.Component.register(MyLightingController);
```

**Key idea:** DynamicLightGizmo fields are **bindings**. You read them with `.get()` and write them with `.set(value)` (e.g., `this.stageLight.intensity.set(0.8)`).

---

## 3) The Essentials (Cheat‑Sheet)

Below are the most commonly used properties. Availability can vary across releases; use optional chaining or defensive checks when in doubt.

```ts
// Power / brightness
this.stageLight?.intensity.set(0);    // off
this.stageLight?.intensity.set(1);    // typical “on” level (tune as needed)

// Color (hex string or Color object)
this.stageLight?.color.set("#00F5D4");
// or
const c = new hz.Color(1, 0.35, 0.75, 1); // RGBA [0..1]
this.stageLight?.color.set(c);

```


---

## 4) Real World Examplo: Plug‑In to Your DJ Pad Public Asset

Here’s how to layer lighting control into a music pad workflow like the one you already have. When a pad is pressed, we **turn on** the light, color it, and start a **timeout** to shut it off.

```ts
import * as hz from "horizon/core";
import { sysEvents } from "sysEvents";

class DanceFloorLights extends hz.Component<typeof DanceFloorLights> {
  static propsDefinition = {
    stageLight: { type: hz.PropTypes.Entity },
    musicPlayingTimeout: { type: hz.PropTypes.Number, default: 5000 },
  };

  private stageLight?: hz.DynamicLightGizmo;
  private isPlaying = false;
  private offTimer: number | null = null;

  start() {
    this.stageLight = this.props.stageLight?.as(hz.DynamicLightGizmo);

    const pads = this.world.getEntitiesWithTags(["PadButtom"]);
    pads.forEach((pad) => {
      this.connectNetworkEvent(pad, sysEvents.OnSampleButtonPressed, () => {
        this.isPlaying = true;
        this.stageLight?.intensity.set(1);
        this.stageLight?.color.set("#FF00AA");

        if (this.offTimer !== null) {
          this.async.clearTimeout(this.offTimer);
          this.offTimer = null;
        }
        this.offTimer = this.async.setTimeout(() => {
          this.stageLight?.intensity.set(0);
          this.isPlaying = false;
          this.offTimer = null;
        }, this.props.musicPlayingTimeout);
      });
    });
  }
}

hz.Component.register(DanceFloorLights);
```

---

## 5) Ready‑Made Patterns (Copy & Paste)

### A) Strobe (club‑style blinking)

```ts
private strobeTimer: number | null = null;

startStrobe(speedMs = 120) {
  if (this.strobeTimer !== null) return;
  let on = false;
  this.strobeTimer = this.async.setInterval(() => {
    on = !on;
    this.stageLight?.intensity.set(on ? 1 : 0);
  }, speedMs);
}

stopStrobe() {
  if (this.strobeTimer !== null) {
    this.async.clearInterval(this.strobeTimer);
    this.strobeTimer = null;
  }
  this.stageLight?.intensity.set(0);
}
```

**Use it** when the track is “hot”: `this.startStrobe(90)`; stop with `this.stopStrobe()` on music end.

---

### B) Smooth Fades (intensity ramp)

```ts
async fadeIntensity(from: number, to: number, ms = 800) {
  const steps = Math.max(1, Math.floor(ms / 16));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const v = from + (to - from) * t; // linear; swap for easing if you like
    this.stageLight?.intensity.set(v);
    await this.async.wait(16);
  }
}

// Example
await this.fadeIntensity(0, 1, 600); // fade‑in
await this.fadeIntensity(1, 0, 400); // fade‑out
```

> **Variation:** Plug in an easing function (e.g., easeInOutQuad) for a smoother curve.

---

### C) Color Cycle (roulettes through a palette)

```ts
private colorTimer: number | null = null;

startColorCycle(palette: string[] = ["#FF006E", "#FFBE0B", "#00F5D4"], ms = 250) {
  if (this.colorTimer !== null) return;
  let i = 0;
  this.colorTimer = this.async.setInterval(() => {
    this.stageLight?.color.set(palette[i % palette.length]);
    i++;
  }, ms);
}

stopColorCycle() {
  if (this.colorTimer !== null) {
    this.async.clearInterval(this.colorTimer);
    this.colorTimer = null;
  }
}
```

**Combo idea:** Run a **slow color cycle** (e.g., 250–500 ms) while also doing a **quick strobe** (60–120 ms) for festival vibes.

---

## 6) Working with Multiple Lights

If your stage has **several lights**, control them as a **group**:

```ts
private lights: hz.DynamicLightGizmo[] = [];

start() {
  // Collect by tag or individual props. Don't forget to add the tag you are searching here in all the Lights you want to include here
  const lightEntities = this.world.getEntitiesWithTags(["StageLight"]);
  this.lights = lightEntities
    .map((e) => e.as(hz.DynamicLightGizmo))
    .filter((l): l is hz.DynamicLightGizmo => !!l);
}

setGroupIntensity(v: number) { this.lights.forEach(l => l.intensity.set(v)); }
setGroupColor(hex: string) { this.lights.forEach(l => l.color.set(hex)); }
```

**Pattern:** Use one controller to orchestrate color/intensity while each fixture keeps its own type/angles.

---

## 7) Cleanup & Safety

* **Always clear timers/intervals** you start (strobe/colorCycle/timeouts).
* **Defensive checks** for optional properties (`?.`), especially for type‑specific fields (range/spotAngle).
* Keep your **light count modest** in a player’s view. Use Static Lights where possible to complement Dynamics.

---

## 8) Common Pitfalls

* **Unassigned prop**: `stageLight` wasn’t dragged into the component’s inspector.
* **Aggressive updates**: Setting color/intensity **every frame** can be costly; prefer 50–200 ms steps for effects.
* **Forgetting to clear intervals**: orphaned timers can really impact game perfomance and bring weird behaviour to your multiplayer experiences.

---

## 9) Next Steps

* Combine the light controller with your **own gameplay logic** so visuals reinforce gameplay.
* Experiment with **different palettes** per zone (e.g., VIP area vs. main floor).
* Create more user oriented experiences such as flashlights with real-time lights
