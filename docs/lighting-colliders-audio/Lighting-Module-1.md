# Module 1 — Using Static Light Gizmos

In this module, you'll learn the fundamentals of scene lighting using the **Static Light Gizmo**. Static lights are the most efficient way to illuminate your worlds, perfect for setting a baseline mood and lighting environments that don't need to change.

---

## 🎯 What You'll Learn in This Module
- How to add a Static Light Gizmo to your world.
- How to configure its most important properties: **Shape**, **Color**, and **Intensity**.
- The difference between how the gizmo appears in **Build Mode** vs. **Preview Mode**.

---

## 🛠️ Prerequisites
Before we begin, make sure you have a simple scene to work in.
1. Create a new, empty world.
2. Add a basic shape, like a **Cube**, to serve as an object for our light to shine on.
3. For the best results, use the **Environment Gizmo** to set the sky to a night or dark setting. This will make our light's effect much more obvious.

 ![The scene in Build Mode, with the red gizmo visible.](/docs/lighting-tutorial/media/staticlightingame.jpg)

---

## ⚙️ Step-by-Step Guide

### 1. Add the Static Light Gizmo
First, let's add the light to our scene.
- In the top menu bar, navigate to **Build > Gizmos**.
- In the search bar, type "**static**" to find the **Static Light Gizmo**.
- **Click and drag** it from the gizmos menu into your scene.

You should now see a red cube in your world—this is the visual representation of the Static Light Gizmo.

*[Image: The Gizmos menu is open, with the Static Light Gizmo being dragged into the scene.]*

### 2. Position Your Light
Just like any other object, you can use the transform tools to **Move**, **Rotate**, and **Scale** the gizmo. Position the light so it is pointing toward your cube.

💡 **Tip:** If you choose a `Disk` or `Rectangle` shape for your light, you will see a directional arrow indicating where the light is being cast. This is not visible for omnidirectional shapes like `Cuboid` or `Ellipsoid`.

*[GIF: The Static Light Gizmo being moved into position to illuminate the cube.]*

### 3. Configure the Light Properties
With your Static Light Gizmo selected, look at the **Properties** panel. You'll find a section named **Light**. Let's adjust the key properties:

-   **Shape**: Controls how light is cast.
    -   `Cuboid`/`Ellipsoid`: Cast light in all directions (omnidirectional).
    -   `Disk`/`Rectangle`: Cast light in a specific direction. Try selecting `Disk` to see the directional arrow.
-   **Color**: Click the color swatch to open the color picker and choose a color for your light. Try a warm yellow or a cool blue.
-   **Intensity**: This slider controls the light's brightness. Increase the value to make the light brighter and cast further.

Experiment with these settings until you achieve a look you like.

![The Static Light Gizmo properties panel, showing Shape, Color, and Intensity.](/docs/lighting-tutorial/media/staticlightproperties.jpg)

### 4. Preview Your Scene
The red cube that represents the gizmo is only visible in **Build Mode**. To see the final result as a player would, you need to enter **Preview Mode**.

-   Click the **Preview** button (the "eye" icon) at the top of the editor.

Notice that the gizmo's red cube is now hidden, but its light remains, creating a much more immersive effect. This is the true appearance of your lighting.

 ![The scene in Preview Mode, with the gizmo hidden.](/docs/lighting-tutorial/media/staticlightproperties2.jpg) |

---

## ✅ Module Recap
Congratulations! You have successfully added and configured your first light source.

You now know how to:
- Add a **Static Light Gizmo** to a scene.
- Adjust its **Shape**, **Color**, and **Intensity** to change its appearance.
- **Preview** your work to see the final lighting effect without the editor gizmo visible.

---

## 🚀 Next Steps
Now that you've mastered the basics of static lighting, it's time to explore lights that can change and move in real-time.

👉 Continue to **Module 2: Working with Dynamic Light Gizmos**.
