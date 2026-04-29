# Module 3 — Scripting with the DynamicLightGizmo API

Welcome to the final module! You've learned how to place static lights and configure dynamic ones in the editor. Now, it's time to unlock the full potential of dynamic lighting by controlling it with TypeScript. In this module, we will build a fully interactive lamp that a player can pick up and customize in real-time.

---

## 🎯 What You'll Learn in This Module
- How to get a reference to a `DynamicLightGizmo` in a script.
- How to modify its properties (`enabled`, `intensity`, `falloffDistance`, `spread`, and `color`) via code.
- How to connect player input from a controller to change the light's behavior.
- How to set up script properties in the editor to link scene objects together.

---

## ⚙️ Project: The Interactive Lamp

Our goal is to create a grabbable lamp with a `DynamicLightGizmo`. A player will be able to pick it up and use their controller buttons to adjust a wide variety of settings, which are displayed on a text panel.

<video controls loop muted style="max-width: 100%;">
  <source src="/docs/lighting-tutorial/media/dynamiclightclip.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## 📝 Understanding the Script's Core Concepts

Before we build, let's understand the key ideas behind the `lamp.ts` script.

### Part 1: The Settings We Can Control
Our script allows a player to adjust several properties of the light. Here’s what they are and what they mean:

*   **Hue**: This is the pure color itself (red, green, blue, etc.). We represent it as a circle, so cycling through it moves through the rainbow.
*   **Saturation**: This is the vibrancy or richness of the color. A low saturation is grayish or pastel, while a high saturation is deep and pure.
*   **Value**: This is the brightness of the color itself. A low value makes any color look closer to black.
*   **Intensity**: This is the overall power of the light, like a dimmer switch. A high intensity will make the light brighter and appear to travel farther.
*   **Falloff**: This is the literal distance the light travels before fading to nothing. A small falloff creates a small, intimate pool of light.
*   **Spread**: For spotlights only, this controls the width of the light's cone, from a narrow, focused beam to a wide floodlight.
*   **Auto Mode**: A special mode that automatically animates all the above properties over time, creating a "breathing" rainbow effect.

### Part 2: How the Script Works (The Big Picture)
The script follows a simple three-step loop:

1.  **Listen for Player Input**: The script waits for the player to press a controller button (like the index trigger or 'A' button).
2.  **Change a Setting Variable**: When a button is pressed, the script changes a variable in its memory. For example, it might increase the `Intensity` variable from `2.0` to `2.1`.
3.  **Update the Light**: After changing the variable, the script calls a central function named `onLight()`. This function's only job is to read all the current variables and apply their values to the actual `DynamicLightGizmo` and `TextGizmo` in the scene.

This loop repeats every time the player interacts with the lamp.

### Part 3: A Deeper Look - Tracing the "Intensity" Setting
Let's follow the `Intensity` setting on its journey through the script to see how this works in practice.

#### Step A: Defining the Variable
In the `propsDefinition` section, we create the `Intensity` variable and give it a default value. We also define `MaxIntensity` to set an upper limit.

```typescript
// --- Inside propsDefinition ---
Intensity: {
  type: PropTypes.Number,
  default: 2.0, // The light starts at 2.0 intensity
},
MaxIntensity: {
  type: PropTypes.Number,
  default: 5.0, // The intensity can't go higher than 5.0
},
```
Step B: Reacting to Input
In the onLoopUp() function, which runs when the player holds down a button, we check if "Intensity" is the currently selected setting. If it is, we increase our Intensity variable by a small amount. The modulo (%) operator ensures it loops back to 0 if it exceeds MaxIntensity.

```typescript
// --- Inside onLoopUp() ---
if (
  this.mutableProps.CurrentSelection ===
  this.mutableProps.Settings.indexOf('Intensity')
) {
  // Increase the Intensity variable and loop if it gets too high
  this.mutableProps.Intensity =
    (this.mutableProps.Intensity + 0.01) % this.props.MaxIntensity
}
```
Step C: Applying the Change
Finally, inside the onLight() function, we take the new value from our Intensity variable and apply it directly to the DynamicLightGizmo. This is the line of code that makes the light in the world actually change.
```typescript
// --- Inside onLight() ---

// Get the DynamicLightGizmo from our script properties
const lightGizmo = this.props.DynamicLight!.as(DynamicLightGizmo);

// Set the gizmo's intensity to the value of our variable
lightGizmo?.intensity.set(this.mutableProps.Intensity);
```
Every other setting like Hue, Falloff, and Spread follows this exact same pattern!

---

## 🛠️ Putting It All Together: Step-by-Step Guide
### 1. Scene Setup
1.  **Create a Parent Object**: Make a grabbable and physical object named `InteractiveLamp`.
2.  **Add Components**: Drag a `Dynamic Light Gizmo` and a `Text Gizmo` onto the `InteractiveLamp` so they become its children.

### 2. Get and Attach the Script
1.  First, you'll need the script file. Download it from here: `[Link to your lamp.ts file]`
2.  In the **Assets** panel of your project, add the downloaded `lamp.ts` script.
3.  Select the parent `InteractiveLamp` object in your scene.
4.  In the Properties panel, click **Add Component** and add the `lamp` script.

![Attach Gizmo and Script](/docs/lighting-tutoria/media/lampproperties.jpg)
### 3. Connect the Properties in the Editor
This is the most important step! Our script needs to know which objects in the scene it should control.

With the `InteractiveLamp` object selected, look at the `lamp` script component in the **Properties** panel. You will see several empty property slots. **Drag the objects from the scene hierarchy into these slots**:

-   **Dynamic Light**: Drag your `DynamicLightGizmo` here.
-   **Text Obj**: Drag your `TextGizmo` here.
-   **Lamp Shade**: Drag the parent `InteractiveLamp` object itself here (so its color will change too).

![The script component properties linked to the correct scene objects.](/docs/lighting-tutorial/media/lampsettings.jpg)

### 4. Test It!
Enter **Preview Mode** to test your interactive lamp.
1.  Find the lamp in the world and grab it.
2.  Use the **index trigger** to turn it on and off.
3.  While it's on, press **Button 1** (A/X) to cycle through the settings on the text display.
4.  Press and hold **Button 2** (B/Y) to increase the value of the selected setting.
5.  Try a **long press** on the index trigger to activate Auto Mode and see the colors cycle!

---

## ✅ Module Recap
You have successfully built a complex, interactive object from scratch using the DynamicLightGizmo API!

In this module, you learned how to:
- Link a `DynamicLightGizmo` to a script via an entity property.
- Use `.as(DynamicLightGizmo)` to access its specific properties.
- Set the `.enabled`, `.intensity`, `.falloffDistance`, and `.spread` properties through code.
- Change the light's `.color` dynamically.
- Combine these API calls with player input to create an engaging interactive experience.

---

## 🎉 Tutorial Series Conclusion
Congratulations on completing the **Lighting Gizmos Tutorial Series**!

You started by learning the fundamentals of high-performance **static lights**, moved on to the editor-based features of **dynamic lights**, and finished by using **scripting** to take full control of the `DynamicLightGizmo` API.

You now have the skills to light your worlds beautifully, create atmosphere, and build amazing interactive experiences. Go forth and create!
