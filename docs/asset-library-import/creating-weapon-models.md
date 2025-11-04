# Creating Weapons in Blender and using the Horizon Worlds: Royal axe.

Sahil (thesloppyguy)

September 4, 2025

---

## Introduction

This tutorial will walk you through **using blender to create a weapon**, creating textures and using the same in Horizon worlds.

By the end, you’ll understand:

- How to easiry use templated to create Weapons.
- How to prepare and optimize the asset for export(fbx).
- How to create textures and materials for the assets.
- How to import and use the asset in Horizon World.

![An axe on the ground](/images/create-asset-sample.png)

### Prerequisites and Expectations

You should be familiar with:

- General tools and UI of blender.
- (Optional) Install 3D viewer on windows to view 3D models like image Thumbnails

## Topic One: Setting up the Environment

You can install blender, and an editing tool of your choice. I will be using **Blender 4.4.2**. Once completed go to `Edit` -> `Preference` -> `Addons`. If you are new to blender this should be empty and we will guide you through the process of add some good to have addons and their features.

## Topic Two: How to create a weapon (Axe) in blender?

### Step 1: Finding Refernce

1. Find or Create a 2D Reference Image for your weapon. This will act as a template for our project
2. In My Case I have a Template of an AXE. if have one with color and design that is also fine we can use it for textures and coloring the asset.
3. Once you have the image, drag and drop it, then center and flatten the image into your viewport.
4. On pressing 1 on you numpad the template should appear flat.

![An axe on the ground](/images/create-asset-reference.jpg)

### Step 2: Create the Asset Body

![Auto Mirror](/images/create-asset-starting-point.png)

1. There should a cube at the center of your viewport you can resize and move it to be inside your template borders.
2. Go to `Addons` and add the following Plugin - [Auto Mirror](https://extensions.blender.org/add-ons/auto-mirror/)
3. Select the block and go to edit and select Auto Mirror.
   1. Add a X Positive Mirror and a Y Negative Mirror.
   2. With this you will only need to work on a quarter of the asset and the rest will be automatically handled.
![Auto Mirror](/images/create-asset-auto-mirror.png)

4. This is the starting point of our weapon modeling. Enter editmode (Tab), turn on xray mode, extruted and resize it to cover the template.
5. Following are some easy shortcuts
   1. E to Extrude
   2. G to Grab
   3. B for Box Select
   4. Ctrl B for Bevel
   5. Use the 3 selection modes to make your life easier (point, edge, face) during selection.
6. By the end of this Step you should have a single mesh that looks like a Weapon (Axe).

![Auto Mirror](/images/create-asset-mirror-mesh.png)

### Step 4: Optimizing you Asset

1. Turn on the statistics and analyse the number of Vertex, Triangles and Faces.
![Auto Stats](/images/create-asset-stats.png)
2. The bigger the number the worse the performance. Always try to use low poly asset of VR or Horizon worlds for better performance and user experience.
![Auto Stats](/images/create-asset-stats-2.png)
3. You can use the following techniques to reduce the numbers and get better performance.
   1. Desemate (Easy but not always good)
   ![Remesh](/images/create-asset-decimate.png)
   2. Re Mesh (Easy but not always good)
   ![Remesh](/images/create-asset-remesh.png)
   3. Manually disolve edges vectors and faces. (Slow but Best Result - Our Result)
   ![Disolve Edge](/images/create-asset-disolve-edge.png)
4. You can apply both the mirror function to the asset to finalize the structure.

**Note:** There are some other ways to optimize the assets but they require either addons or additional know how. the above is good enough for now.

#### Video for Creating and Optimizting A Blender Model

<iframe width="1852" height="826" src="https://www.youtube.com/embed/vEPoM5giT2c" title="Model and Mesh Optimizations" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Step 5: Adding Colors and Texture to your Model

1. Once you have Optimized the mesh you can select the model and press `U`.
2. Click on `Smart UV Project` to unwrap the mesh into sections put sufficient margin between the sections.
![UV Project](/images/create-asset-uv-project.png)
3. Move to the Texture painting Tab and create a Texture to paint onto.
![UV Project](/images/create-asset-create-texture.png)
4. You can paint colors onto the texture and create your own custom assets.
5. Few additional configurations you should handle.
   1. Go to `Falloff` and turn off `Normal Falloff`.
   2. Maintain the following overflow ratio.
      - 1K -> 4px
      - 2K -> 8px
      - 4k -> 16px
![Bleed](/images/create-asset-bleed.png)
6. Importing images as textures
   1. Go to texture tab and add any image as your texture.
   ![Texture](/images/create-asset-image-texture-import.png)
   2. You can create of search the web for many free textures.
   3. Once imported you can use the texture with your brush to create beautiful models.
   ![Bleed](/images/create-asset-manage-texture.png)

### Step 6: Preparing Textures and Materials

#### Naming Standards

- Avoid using any special characters
- Use CamelCase for Primary name and append Suffix Type for Texture and Materials to the end of the name and before extensions like `Axe_BR.png` for PBR
- Full Documentation can be found [here](https://developers.meta.com/horizon-worlds/learn/documentation/custom-model-import/creating-custom-models-for-horizon-worlds/materials-guidance-and-reference-for-custom-models).

#### Video for Creating and Exporting Custom Textures

<iframe width="1852" height="826" src="https://www.youtube.com/embed/oOh8LQQoBkI" title="Textures and Painting" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Topic Three: Exporting and Importing: Assets and Textures

### STEP 1: Final Checks

1. Asset Should be in a single mesh.
2. Apply all transformations or unsaved changes.
3. Verify Material Name and Texture Name Suffix and Camel Case
4. Verify that the texture images and Materials in the FBX have the same names.

### Step 2: Export into FBX

1. Go to `File` -> `Export` -> `FBX`

### Step 3: Importing Into Worlds

You can also preview your asset in 3D Viewer if you have the software installed (free from Microsoft store).

1. Launch the **Worlds Desktop Editor**.
2. Open the world where you want to use the asset.
3. In the **Asset Library**, click the **Add New** dropdown menu.
   1. Choose **3D Model**.
   2. In the Import window, click **Choose Files on Your Device**.
   3. Select your **FBX** and all the necessary **textures**.
      - If the files are in different folders, you can add them one by one.
4. Once everything is listed, click the **blue Import button**.
5. If there are any warnings (Yellow Mark) or errors (Red Mark) you have missed a step.
   - The message can help you debug the issue.

### Accessing Your Imported Asset

- After import, your model will appear under **My Assets** in the Asset Library.
- Drag it from **My Assets** into your world to place it.
- If your materials and textures were named correctly, they will already be applied automatically.
- No extra setup is required.

![An axe on the ground](/images/create-asset-sample.png)

---
