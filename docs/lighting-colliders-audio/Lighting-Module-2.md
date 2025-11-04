# Module 2 — Working with Dynamic Light Gizmos

Welcome to Module 2. Now that you understand static lighting, it's time to explore the more powerful and flexible **Dynamic Light Gizmo**. These lights can move, change color, and react in real-time, making your worlds feel alive and interactive.

---

## 🎯 What You'll Learn in This Module
- How to add and configure a Dynamic Light Gizmo.
- The meaning and use of its unique properties: **Light Type**, **Falloff Distance**, and **Spread**.
- The performance implications of using dynamic lights.

---

## 🛠️ Prerequisites
- Completion of **Module 1**.
- The same simple scene with a cube and a dark environment. You can continue from where you left off.

---

## ⚙️ Step-by-Step Guide

### 1. Add a Dynamic Light Gizmo
Let's start by adding a dynamic light to our scene. The process is very similar to adding a static one.

- Navigate to **Build > Gizmos**.
- In the search bar, type "**dynamic**" to find the **Dynamic Light Gizmo**.
- Drag it into your scene and position it near your cube.

You'll notice it looks different from the static gizmo, often appearing as a wireframe sphere or cone.

![The Build Gizmos menu showing the Dynamic Light Gizmo.](/docs/lighting-tutorial/media/buildgizmo.jpg)

### 2. Configure the Core Properties
In the **Properties** panel, you'll see some familiar settings under the **Light** section.

- **Color**: Set the light's color just like you did for the static light.
- **Intensity**: Adjust the brightness. Note that the dynamic light's range is typically smaller (e.g., 0-10) than the static light's.

Set these to a visible color and intensity so you can see the effects of the next steps clearly.

![The Properties panel for the Dynamic Light Gizmo.](/docs/lighting-tutorial/media/dynamiclightproperties.jpg)

### 3. Explore the Unique Dynamic Properties
This is where the Dynamic Light Gizmo truly differs. Let's explore its unique settings.

- **Light Type**: This defines the light's shape and behavior.
  - **`Point`**: An omnidirectional light that shines in all directions, like a bare lightbulb.
  - **`Spot`**: A cone-shaped light that shines in a specific direction, like a flashlight or a stage light. **Select `Spot` for now.**

- **Falloff Distance**: This controls how far the light travels before it fades out completely. A low value creates a small, intimate pool of light, while a high value can illuminate distant objects.

- **Spread**: *This property only affects `Spot` lights.* It controls the width of the light's cone, from a very narrow, focused beam to a wide, soft spotlight.

**Experiment!** Try switching between `Point` and `Spot` types. Adjust the `Falloff` and `Spread` sliders to get a feel for how they change the light's appearance.

![A Dynamic Light Gizmo set to a spotlight, illuminating a scene.](/docs/lighting-tutorial/media/dynamicspotlight.jpg)


## ⚠️ A Note on Performance
Dynamic lights are powerful, but they come at a cost.
- **They are resource-intensive** because the engine has to calculate their light and shadows every single frame.
- **There is a limit** of **20 Dynamic Light Gizmos** per world to ensure good performance.

Use them where they have the most impact—for special effects, interactive objects, or to guide the player's attention. For general scene lighting, always prefer static lights.

---

## ✅ Module Recap
You've now worked with both types of lighting gizmos!

In this module, you learned how to:
- Add a **Dynamic Light Gizmo** and configure its basic settings.
- Differentiate between **Point** and **Spot** light types.
- Use **Falloff Distance** and **Spread** to shape your light.
- Understand the performance trade-offs of dynamic lighting.

---

## 🚀 Next Steps
You've seen what a dynamic light can do, but its true potential is unlocked when you control it with code. In the next module, we'll dive into the **DynamicLightGizmo API** to create a fully interactive lamp.

👉 Continue to **Module 3: Scripting with the DynamicLightGizmo API**.
