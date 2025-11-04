# 🌟 Lighting in Horizon Worlds

🎥 **Watch the full tutorial on YouTube:**  
[![Watch on YouTube](https://img.youtube.com/vi/GLjV1DSwu9M/0.jpg)](https://www.youtube.com/watch?v=GLjV1DSwu9M)

Hey, I’m RJ — game developer for 7+ years and 3D animator for over a decade.  
For the past three and a half years, I’ve been building in Horizon Worlds, and one thing that really sets my work apart is lighting.

The way you use light can completely transform a scene — it’s the difference between something that just looks good and something that truly feels alive.

In this tutorial, I’ll show you how to think about and use lighting in Horizon Worlds to create **mood, focus, and atmosphere**.  
We’ll break it down into three simple layers:

<img width="1920" height="1080" alt="Artboard 2" src="https://github.com/user-attachments/assets/96edc2c2-cc8e-4429-9530-ff0a1fcc000d" />

- 💡 **Tools** — the lights and gizmos you’ll use  
- 🧠 **Concepts** — the principles that guide them  
- 🎨 **Applications** — how to bring it all together in your worlds  

---

## 🏗️ Modeling Considerations for Lighting
<img width="3039" height="1013" alt="modeling-considerations" src="https://github.com/user-attachments/assets/b9a533c4-ce3d-4ef4-825e-3a7af9df833d" />


Before we dive into specific tools, it’s important to understand how Horizon’s lighting system works under the hood.

Unlike engines with fully dynamic real-time lighting, Horizon relies heavily on **vertex-baked lighting**.  
This means that light information is stored directly in the vertices of your models, and the density and placement of those vertices directly control how smooth or accurate shadows, gradients, and highlights appear.

Because of this, the way you model isn’t just about shape — it also determines how your objects react to light.

⚡ **Pro tip:** Lighting isn’t just about the gizmos — it’s also about how your surfaces react to that light. In Horizon, that mostly comes down to the materials you’re using.

---

## 🎭 Material Tips


<img width="368" height="326" alt="materials" src="https://github.com/user-attachments/assets/98d705d0-880b-44d9-baac-7554189931fe" />

- ✨ **PBR materials** (with roughness and metalness) → realistic surfaces that catch and scatter light naturally.  
- 🌟 **Unlit materials** → stay bright and glowing (great for UI, neon, or effects).  
- 🌊 **Transparent and masked materials** → glass, water, foliage.  
- 🎨 **Vertex colors** → cheap but powerful shading tricks baked into meshes.  

👉 Advanced topics like **custom cubemaps, reflection maps, and baked vertex shading** will be covered in another tutorial.  
For now, let’s focus on the logic of lighting.

---

## 🔧 Tools – The Building Blocks of Lighting in Horizon Worlds



Lighting in Horizon Worlds is controlled through several key tools, each with its own purpose and strengths.



<img width="1920" height="1080" alt="Artboard 4" src="https://github.com/user-attachments/assets/58f36bf1-5e26-4166-b469-2a084c2ffcdc" />





### 1. 🔦 Dynamic Light Gizmo

<img width="1021" height="547" alt="dynamic-light" src="https://github.com/user-attachments/assets/9e85050b-0430-4fb7-b28b-06dba8e889de" />

- A runtime light source: can move, change intensity, or be triggered in real time.  
- Can be grouped with objects → light follows along.  

**Example:** In my game *Sanity*, I used them for glowing orbs to help players navigate dark areas and add magical energy.  

**Great for:**
- Sunlight / Moonlight  
- Flashlights  
- Flickering elevator lights  
- Lightning flashes  
- Firelight with flicker  
- Strobe or event lights  

**Key settings:**
- Placement, rotation, scale  
- Color & intensity (warm = cozy, cool = moody)  
- Light type: Point (all directions) or Spotlight (focused cone)  
- Falloff distance & spread  
- On/Off toggle (scripted)  

⚠️ **Performance tip:** Too many dynamic lights can slow down your world. Start with a few and test before layering more.

---

### 2. 🪔 Static Light Gizmo

<img width="748" height="511" alt="static-light" src="https://github.com/user-attachments/assets/058fc98b-e455-44e3-8e7f-d9793ebdfd58" />


- Performance-friendly: baked into the world, doesn’t move or update.  
<img width="1920" height="1080" alt="Artboard 5" src="https://github.com/user-attachments/assets/0f46fd8a-2bc6-4e12-9218-1be276e8018e" />

**Great for:**
- Ambient lighting  
- Lanterns on walls  
- Mood lights that don’t change  

**Shapes available:** cuboid, ellipsoid, disk, rectangle.  

👉 Think of static lights as the **foundation** → consistent base layer. Add dynamics on top for drama.

---
<img width="1920" height="1080" alt="Artboard 6" src="https://github.com/user-attachments/assets/03015d3c-bb1e-43d4-840c-f65eb5716aeb" />

### 3. 🌍 Environment Gizmo
<img width="1021" height="547" alt="dynamic-light" src="https://github.com/user-attachments/assets/a3474d0e-b81b-43b1-afca-fc864db54369" />


- Backbone of the world: controls global lighting, sky, fog, and atmosphere.  

**Includes:**
<img width="2560" height="1080" alt="Screenshot (116)" src="https://github.com/user-attachments/assets/0539a5ae-4a09-470e-a03e-5ba64d58a912" />

- Reflection maps (surface shine)  
- Fog maps (depth and distance)  
- Radiance maps (bounce light & overall feel)  

Most builders use presets, but you can create **custom cubemaps** for advanced control.  

💡 **Rule of thumb:** Set the **global mood first** with the environment gizmo, then layer static/dynamic lights on top.

---

## 📊 Tools Summary

| Tool             | Best Use Case                          |
|-----------------|----------------------------------------|
| **Vertex baked** | Base shadows & highlights             |
| **Dynamic lights** | Interactive effects (sunlight, fire, strobe) |
| **Static lights** | Consistent, low-cost illumination   |
| **Environment**   | Sky, fog, reflections, global mood  |

---

## 🧠 Concepts – The Principles of Lighting

![Concepts Image](./images/concepts.png)

Now that we know the tools, let’s talk about principles — the things that control **mood, composition, and storytelling** with light.
<img width="2730" height="738" alt="concepts" src="https://github.com/user-attachments/assets/0977a90c-1593-4703-8b7f-e75c84270334" />

### 1. Placement & Power
- ☀️ Above → natural sunlight / ceiling lamp  
- 🌒 Side/back → shape & texture  
- 👻 Below → creepy horror vibe  
- **Bright = focus | Dim = atmosphere**

### 2. Distance & Size
- Close = sharp shadows, bold contrast  
- Large light = soft daylight feel  
- Small light = punchy, stylized  

### 3. Shape
- Rectangle = window glow  
- Round = lamp / sunlight  
- Custom = stylized vibes  

### 4. Color & Temperature
- 🔥 Warm (orange/yellow/red) = cozy, safe, energetic  
- ❄️ Cool (blue/teal/green) = calm, mysterious, eerie  

✨ **Magic happens when you mix warm & cool:**
- Warm pulls focus  
- Cool creates depth and mood  

**Example:** campfire glow + moonlit forest  

### 5. Contrast
- High contrast = cinematic & intense  
- Low contrast = calm, soft, harmonious  

### 6. Motivation
- **Unmotivated** → just for looks  
- **Motivated** → real source (sun, window, lamp)  
- **Practical** → actual in-world light source (torch, neon sign)  

### 7. Common Setups


- 🎥 **Three-point lighting** → key, fill, rim  
- 🌞 **High-key** → bright, cheerful  
- 🌑 **Low-key** → dim, dramatic  
- 🌓 **Split lighting** → half-shadow = mystery  

---

## 🎨 Applications – Transforming a Scene with Light



Let’s take one scene and relight it in different ways to see how mood changes.

- **Base Scene (Neutral)** → flat gradient environment, no extra lights → lifeless and flat.  
- **Pass 1 – Natural Daylight** → bright sky gradient, large rectangle static light angled down like sunlight.  
- **Pass 2 – Warm & Cool Contrast** → dusk gradient, orange lights on subject, blue fill in background, flickering lanterns → alive, cozy.  
- **Pass 3 – Cinematic / High Contrast** → darker fog, three-point setup, bold metallic surfaces → theatrical & dramatic.  
- **Pass 4 – Stylized / Unreal** → purple/teal sky, magenta/cyan lighting, pulsing dynamics, glowing emissives → surreal & dreamlike.  

---

## 🛠️ General Modeling Tips



- Add support loops / extra vertices in light transition areas.  
- Avoid super-close vertices on different meshes → prevents artifacts.  
- Always model at real-world scale.  
- Set pivots centered at the bottom.  
- Break assets into modular pieces only if needed.  
- Use UV padding:  
  - 512px → 8px  
  - 1024px → 16px  
  - 2048px → 32px  
- Low-frequency textures work better in VR.  
- Let geometry convey shape instead of heavy normal maps.  

---

## 🎯 Closing / Takeaway

Don’t worry about memorizing names — focus on the **emotion you want to create**.  
Use tools + concepts as a guide, but experiment and break rules.  

For me, lighting is the most fun part — it’s how I take a lifeless build and bring it alive with **color and atmosphere**.
<img width="1920" height="1080" alt="Artboard 7" src="https://github.com/user-attachments/assets/2fed880a-77d7-4a23-b84f-12043f6121d1" />

