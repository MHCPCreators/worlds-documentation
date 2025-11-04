<!-- The title of your document -->
# Working With Transparent 2D Cutout Assets (Masked Method)

<!-- Put your name, at least your Horizon Name, as the author -->
Metacrafters and voytek.lorenc
<!-- IMPORTANT: Put the date this document was last updated! This is
important information for people to tell how 'stale' this info might 
be.-->
September 1st, 2025  

## Introduction

<!-- This section should describe what this document is going to cover. Try to provide some background and motivation as to why a creator would want to read your document. -->

This tutorial walks you through a workflow for importing 2D cutout assets with transparent backgrounds into Horizon Worlds using the Masked method. As a case study, we’ll demonstrate the process by creating 2D aliens and other design elements.

![2d coutous assets can be used in horizon worlds](https://github.com/user-attachments/assets/86ac85c3-f296-4e6c-9199-f48c3091a026)


### Prerequisites and Expectations

<!-- This section should indicate any expectations you have of your readers, such as other materials or concepts they should already be familiar with in order to get the most out of your document. -->

Basic familiarity with Adobe Photoshop (or Canva), Blender, and the Horizon Worlds Desktop Editor.


### Document Organization

<!-- This s an optional section, but possibly useful if your document has unusual document structure, or needs a table of contents with internal links because it is very long. 

Note that github automatically creates a clickable Outline from your section headings. Make sure you properly 'nest' your headings by using ##, ###, ####, #####, etc for sub sections so that the outline has a good hierarchy and makes navigating your document easier. I recommend only using # for the initial title, as the font for H1 renders very large. -->

This document has three main parts, covering texture prep, model prep and importing. Additionally there is a reference section at the end. 

- [Why use 2D cutout assets?](#why-use-2d-cutout-assets)
- [Why the Masked method?](#why-the-masked-method)
- [Preparing Your Texture in Adobe Photoshop](#preparing-your-texture-in-adobe-photoshop)
- [Preparing Your Textured Model in Blender](#preparing-your-textured-model-in-blender)
- [Importing Your Model to Horizon Worlds](#importing-your-model-to-horizon-worlds)
- [Step-By-Step Video Tutorial](#step-by-step-video-tutorial)
- [Advanced Concepts: Blend vs Transparent vs Masked](#advanced-concepts--blend-vs-transparent-vs-masked)
- [References](#references)

## Why use 2D cutout assets?
Use cutouts for background scenery, distant crowd characters, props, signs, UI elements, and decorative layers to save polygon/scene budget. Cutout assets are a cost-effective way to enrich your world. They’re perfect for building visually rich environments, enhancing 3D assets, and adding props or background characters - all without significantly impacting performance in your Horizon Worlds creations.

<img width="2778" height="1284" alt="why use 2d cutout assets" src="https://github.com/user-attachments/assets/5eefda17-08bb-47b8-8b94-ed4e634b6f42" />


## Why the Masked method?
Using the Masked method for cutout assets with transparent backgrounds is more economical compared with the Transparent or Blend methods. Transparency is far more demanding for Horizon Worlds’ rendering engine: whenever semi-transparent elements are processed, performance costs increase. Whenever possible, use masked cutouts instead of semi-transparent assets to optimize performance.

Reserve semi-transparent materials (Transparent or Blend methods) only when soft edges or translucency are essential; otherwise use hard-cut cut-outs (Masked method) for better performance. The Masked method will not work well on assets with soft (blurry) edges.
![the masked method works only with assets that have hard edges](https://github.com/user-attachments/assets/3adcd269-dce5-448b-a9e8-3e42cefe70de)



## Preparing Your Texture in Adobe Photoshop

1. Create a new document at 2048 × 2048 px (2K). Square textures are standard and supported sizes include 1024×1024, 2048×2048, 4096×4096 - stick to those where possible.
2. Place or paste your artwork (alien, prop, etc.) into the document.
3. Remove the background so only the visible art remains. Use the: “Remove background” AI tool in Photoshop to remove the background with only one click. 

<img width="860" height="714" alt="remove the background so only the desired design remains" src="https://github.com/user-attachments/assets/414899fb-6b40-4f56-8a96-36165e30b6b2" />


4. Export a transparent PNG and name it MATERIAL_BA.png
   - File → Export → Export As…
   - Format: PNG
   - Transparency: Checked
   - Export

<img width="936" height="639" alt="save your texture as material ba" src="https://github.com/user-attachments/assets/8e0f0084-3b52-45ad-bd56-01687047f5af" />



## Preparing Your Textured Model in Blender

1. Start a new Blender file and save it (e.g., Alienfriends.blend).
2. Delete default objects you don't need (camera, light) for a clean scene.
3. Add a plane: Shift + A → Mesh → Plane. This plane will be your 2D cutout mesh.
4. Create a new material and name it MATERIAL_MASKED 
PLEASE NOTE: The exact name is important for consistent workflow.
   - Material Properties → New → rename to: MATERIAL_MASKED
     
<img width="614" height="668" alt="prepare your texture in Blender" src="https://github.com/user-attachments/assets/d808d860-7b94-4fee-bb14-d06e79542968" />

5. Open the Shader Editor
   - Add an Image Texture node and load MATERIAL_BA.png.
   - Connect Image Color → Principled BSDF Base Color.
6. Confirm the image displays correctly in the viewport (Material Preview or Rendered).

<img width="676" height="683" alt="add the texture in the shader editor" src="https://github.com/user-attachments/assets/a0b9db61-0388-4847-bbcf-0449ffbe734f" />

7. Check UVs:
   - Open UV Editor and ensure the plane’s UV covers the full texture area and aligns with your artwork.
8. If you have multiple cutouts, duplicate the plane (Shift + D) and edit each copy in Edit Mode to fit different parts of the texture or to have different scales.
9. Export as FBX:
    - Select only the mesh(es) to export.
    - File → Export → FBX (.fbx)
    - Check “Selected Objects”
    - Under Object Types enable Mesh
    - Save with a descriptive name (example: Alien.fbx)

<img width="893" height="660" alt="save with a descriptive name" src="https://github.com/user-attachments/assets/3c7b09b9-70a8-42b0-bd04-7b6333e47011" />


## Importing Your Model to Horizon Worlds

1. Open Horizon Worlds Desktop Editor → Asset Library → My Assets.
2. Click Add New → 3D Model.
3. In the Import Model(s) window click “+ Choose files on your device” and select:
   -  MATERIAL_BA.png 
   -  Alien.fbx 

5. Click Import and wait for Horizon Worlds to process the asset. Processing may take a moment.
6. Once processing completes you can place the cutout in your world.


## Step-By-Step Video Tutorial

Click on the image to watch a step-by-step tutorial on YouTube

[![Watch the video](https://img.youtube.com/vi/fmx-MogzVUU/0.jpg)](https://www.youtube.com/watch?v=fmx-MogzVUU)


## ADVANCED CONCEPTS:  Blend vs Transparent vs Masked

It’s worth noting that Horizon supports multiple methods of handling transparency, each with its own advantages and limitations:

### Blended (Unlit) Materials
	•	Do not receive or cast lighting or shading.
	•	Have no specular or reflection properties.
	•	The material name in the FBX must end with _Blend.

### Transparent Materials
	•	Allow light to pass through.
	•	Use a specular channel to control both specular and reflection levels.
	•	Support two textures, which provide finer control over PBR properties.
	•	The material name in the FBX must end with _Transparent.

### Masked Materials
	•	Control how two textures mix together.
	•	Respond to specular and roughness, but are always fully rough (roughness = 1).
	•	The alpha channel of the texture defines opacity (white = opaque, black = transparent).
	•	Alpha cutout occurs at 0.5, consistent with GLTF 2.0 and Unity defaults.
	•	The material name in the FBX must end with _Masked.


## References

<!-- this is the place to put useful supplementary information, such as references to other websites or documents in the github repo that are relevant to your topic -->

- https://developers.meta.com/horizon-worlds/learn/documentation/custom-model-import/creating-custom-models-for-horizon-worlds/materials-guidance-and-reference-for-custom-models
- Meta's Documentation Explaining Materials Guidance
