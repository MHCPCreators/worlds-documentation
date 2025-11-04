# Creating and Importing Custom Skydomes in Horizon Worlds

## Table of Contents
- [Introduction](#introduction)  
- [Learning Objectives](#learning-objectives)  
- [Step 1: Understanding Skydome Requirements](#step-1-understanding-skydome-requirements)  
- [Step 2: From Equirectangular to Cube-Map Images](#step-2-from-equirectangular-to-cube-map-images)  
- [Step 3: Combining Cube-Maps with Vidyuu Skybox Combiner](#step-3-combining-cube-maps-with-vidyuu-skybox-combiner)  
- [Step 4: Converting the Reflection Map in Blender](#step-4-converting-the-reflection-map-in-blender)  
- [Step 5: Resizing the Radiance Map](#step-5-resizing-the-radiance-map)  
- [Step 6: Uploading into Horizon Worlds](#step-6-uploading-into-horizon-worlds)  
- [Step 7: Adjusting Lighting & Settings](#step-7-adjusting-lighting--settings)  
- [Extra Notes](#extra-notes)  
- [Conclusion](#conclusion)  

---

## Introduction
**Creator Skill Level:** Intermediate  
**Required Background Knowledge:** Basic Blender knowledge (opening/saving image files, exporting formats)  
**Recommended Background Knowledge:** Familiarity with Horizon Worlds asset uploading  

**Description:**  
In this tutorial, you’ll learn how to prepare and import custom skydomes for Horizon Worlds. Whether you start with an **equirectangular map** or six cube-map images, you’ll be able to convert them into the correct Horizon-ready formats. By the end, you’ll know how to use online tools, Blender, and simple image editing steps to get your custom sky working in minutes.  

---

## Learning Objectives
By following this tutorial, you’ll be able to:  
- Understand the **different map types** required for Horizon Worlds skydomes (display, radiance, reflection, fog).  
- Convert a **single equirectangular map** into six cube-map images.  
- Use the **Vidyuu Skybox Combiner** to process cube-maps into Horizon-ready files.  
- Convert reflection maps into **EXR format** using Blender.  
- Resize radiance maps into Horizon’s **required dimensions (256 × 128)**.  
- Upload and configure your skydome inside Horizon Worlds.  
- Adjust lighting and reflection settings for realistic world visuals.  

---

**Optional Video Resource:**
<iframe width="560" height="315" src="https://www.youtube.com/embed/PkSfney_0XQ?si=UE19kWUrSO9EYLRB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## Step 1: Understanding Skydome Requirements
When adding a new skydome in Horizon Worlds, you’ll be prompted to upload:  

- **Display Map** – the visible skybox image.  
- **Radiance Map** – affects ground color and lighting tint.  
- **Reflection Map** – adds accurate reflections on shiny/metallic surfaces.  
- **Fog Map** – optional; influences atmospheric depth.  

[![Skydome Upload Panel](photos/Skydome%20Upload%20Panel.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/8ffd7dc64bb813df765fda0a7761627de96a6d57/docs/meshes-materials-import/photos/Skydome%20Upload%20Panel.png)

Most skyboxes you download will provide **six cube-map images** (named +Z, –Z, +X, –X, +Y, –Y).  
If instead you only have a **single equirectangular map**, don’t worry—you can still convert it.  

---

## Step 2: From Equirectangular to Cube-Map Images
If your source file is a single **equirectangular image**:  

1. Go to [Panorama to Cubemap Converter](https://jaxry.github.io/panorama-to-cubemap/).  
2. Upload your equirectangular map.  
3. The tool will generate **six cube-map images** (+Z, –Z, +X, –X, +Y, –Y).  
4. Download these images to use in the next step.
5. When you download the 6 images they will be prenamed to py, pz, px, ny, nz, and nx. While you can include more detail in your image name, ie. "Starfield py.png" we recommend creating a named folder to make downloading faster.

[![Panorama to Cubemap Interface](photos/Panorama%20to%20Cubemap.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/8ffd7dc64bb813df765fda0a7761627de96a6d57/docs/meshes-materials-import/photos/Panorama%20to%20Cubemap.png)


---

## Step 3: Combining Cube-Maps with Vidyuu Skybox Combiner
Once you have six cube-map images (either downloaded directly or created from an equirectangular map), process them with Vidyuu’s tool:  

1. Open the [Vidyuu Skybox Combiner](https://www.vidyuu.com/skybox-combiner.html).  
2. Upload your six cube-map images.  
3. The tool automatically aligns and processes them.  
4. Download the outputs:  
   - **Skybox (Display Map)**  
   - **Reflection Map**  

[![Vidyuu Skybox Combiner Tool](photos/Vidyuu%20Skybox%20Combiner.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/8ffd7dc64bb813df765fda0a7761627de96a6d57/docs/meshes-materials-import/photos/Vidyuu%20Skybox%20Combiner.png)

---

## Step 4: Converting the Reflection Map in Blender
Horizon requires reflection maps to be in **EXR format**.  

1. Open **Blender**.  
2. Go to **Texture Paint > Image > Open** and select your reflection PNG.  
3. Click **Image > Save As**.  
4. Change the file type from PNG to **OpenEXR (.exr)**.  
5. Save the new file.  

[![Image to Save As in Blender](photos/Save%20As%20in%20Blender.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/5b4000e3666f59f3d91d0a7d24e4b6898f25219e/docs/meshes-materials-import/photos/Save%20As%20in%20Blender.png)

[![Convert PNG to EXR in Blender](photos/PNG%20to%20EXR%20Save%20Blender.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/5b4000e3666f59f3d91d0a7d24e4b6898f25219e/docs/meshes-materials-import/photos/PNG%20to%20EXR%20Save%20Blender.png) 

---

## Step 5: Creating the Radiance Map
The radiance map is just the equirecctangular, resized to **256 × 128 pixels**.  

1. Open the radiance PNG in an image editor (Photos, Photoshop, GIMP, etc.).  
2. Resize the image to **256 × 128**.  
3. Save it (e.g., `Radiance1.png`).

On Windows, you can resize by:
1. Opening the equirectangular in Photos.
2. Press the "..." icon at the top.
3. Select "Resize image".
4. Set the pixels to **256 x 128**.
5. Press save.

[![Creating the Radiance Map](photos/Creating%20the%20Radiance%20Map.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/ad9b34e5715de23102b5dd7da9cb77f1f62344b3/docs/meshes-materials-import/photos/Creating%20the%20Radiance%20Map.png)

**Note**: Radiance maps effect the lighting in your world when imported. Sometimes the lighting can come in to intense for certain use cases. To fix this, you can use your preffered photo editing software to adjust it. You will need to have 2 layers at the correct size (256 x 128 pixels). The bottom layer completely white and the top layer will be your radiance map. Adjust the opacity on the radiance map layer and save for uploading into Horizon Desktop Editor. You may have to play with the opacity percentace to get exatly what you're looking for. We have found that radiance maps for sunset/sunrise look good at about 85% opacity. While very dark nightime radiance maps are better at 50% opacity so that the world isn't too dark.

[![Radiance Map Resized to 256 x 128](photos/Radiance%20Map%20Resized.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/30b874420bd5b6b01eaf88a7c2e8a1f374c5878d/docs/meshes-materials-import/photos/Radiance%20Map%20Resized.png)

[![Radiance Map Opacity Edit](photos/Radiance%20Map%20Opacity%20Adjustment.jpeg)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/1d11656068eb31f291e14ea2a1f41dd078d19dae/docs/meshes-materials-import/photos/Radiance%20Map%20Opacity%20Adjustment.jpeg)

---

## Step 6: Uploading into Horizon Worlds
Now upload your prepared files:  

1. In Horizon Worlds, click **Add Skydome**.  
2. Upload your:  
   - **Skybox (Display Map)**  
   - **Radiance Map (256×128)**  
   - **Reflection Map (EXR)**  
   - (Optional) Fog Map  
3. Click **Next**, name your skydome, and confirm upload.
4. Wait for the asset to finish processing.
5. Bring the asset into your world, allowing you to review.
6. Optionally, adjust opacity in previous step and reupload to get better coloring.  

[![Skydome Uploaded into Horizon](photos/Skydome%20Uploaded%20in%20Horizon.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/8ffd7dc64bb813df765fda0a7761627de96a6d57/docs/meshes-materials-import/photos/Skydome%20Uploaded%20in%20Horizon.png) 

---

## Step 7: Adjusting Lighting & Settings
Once your skydome is placed in-world:  

- Disable **Show Grid** for a cleaner view.  
- Optionally, you may set your **VOIP Settings**, ie. *Extended*.  
- Optionally, increase **Custom Light Intensity** to create desired ambient world lighting.  

Because of the reflection map, shiny surfaces (like water or test spheres) will now reflect the clouds and sky environment beautifully.  

[![Skydome Reflection on Metal Sphere](photos/Metal%20Sphere%20with%20Reflections.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/8ffd7dc64bb813df765fda0a7761627de96a6d57/docs/meshes-materials-import/photos/Metal%20Sphere%20with%20Reflections.png)

---

## Extra Notes
- **Skipping Radiance Map** – removes ground tinting, but sky still displays.  
- **Skipping Reflection Map** – removes reflections; shiny surfaces may appear flat/gray.  
- **Fog Maps** – optional, tiny textures that add atmospheric depth.  

For more technical details about Fog Maps, see Meta’s documentation:  
 [Preparing Skydome Maps for Horizon Worlds Ingestion](https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/preparing-skydome-maps-for-horizon-worlds-ingestion)  

---

## Conclusion
With the help of the **Panorama-to-Cubemap Converter** and the **Vidyuu Skybox Combiner**, creating custom skydomes for Horizon Worlds is faster and easier than ever. Combine your maps, convert where necessary, and fine-tune your lighting to bring your worlds to life.  

