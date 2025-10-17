# Creating and Importing 3D Assets from Blender or Maya into Meta Horizon Worlds Desktop Editor
author: skylarhknight

In this tutorial, you'll explore methods for designing, preparing, and importing custom 3D assets into Meta Horizon Worlds using the Desktop Editor. This guide focuses on leveraging industry-standard tools like Blender (free, open-source) and Autodesk Maya (professional-grade) to create high-fidelity assets that integrate seamlessly.

* **Creator skill Level**: All levels
* **Required background knowledge**: No prior skills required.
* **Recommended background knowledge**: Horizon Desktop Editor, Blender or Maya basics.

Custom assets enhance your worlds with unique props, environments, characters, and interactive elements, going beyond the built-in primitives. By following this tutorial, you'll learn to optimize for VR performance, ensuring smooth 60+ FPS experiences on mobile hardware like Quest.

## 1. Introduction

### 1.1 Learning Objectives
* Designing assets in Blender or Maya with Horizon Worlds compatibility in mind.
* Preparing models through optimization, texturing, and material setup.
* Exporting in supported formats.
* Importing and placing assets in the Desktop Editor.
* Best practices for performance and troubleshooting.

### 1.2 Prerequisites
* **Software**: Blender (v3.0+) or Maya (2022+), Meta Horizon Worlds Desktop Editor (download from Meta's developer portal).
* **Account**: Meta Developer account with Horizon Worlds access.
* **Optional**: Texture tools like Substance Painter for advanced materials.

**Note**: All steps are current as of September 2025. Check Meta's official documentation for updates.

---
## 2. Designing your 3D Asset
In this section, you'll familiarize yourself with the basics of creating 3D models in both Blender and Maya.

### 2.1 Blender
Blender's default setup uses a Z-up orientation, which differs from Horizon Worlds' Y-up. We'll adjust units and preferences to align with real-world scale and export requirements. Blender is free and user-friendly for beginners, with a node-based material system that maps well to Horizon's PBR shaders.

**1. Launch Blender and Create a New Scene:**
* Open Blender.
* Go to File > New > General (or General (Metric) if available in your version for pre-configured units).
<img width="827" height="551" alt="Screenshot 2025-09-08 at 8 44 03 PM" src="https://github.com/user-attachments/assets/fde82649-9ee3-4251-b4c0-6909f6d6119e" />

* This starts with a default scene: a cube, camera, and light. The viewport shows the 3D workspace.

**2. Configure Units and Scale:**
* Go to the **Properties Editor** (right panel; if hidden, press **N** to toggle the sidebar).
* Navigate to the **Scene** tab (icon: globe) > **Units** section.
  * Set **Unit System** to **Metric**.
  * Set **Length** to **Meters**.
  * Set **Unit Scale** to **1.000** (ensures 1 Blender unit = 1 meter, matching Horizon Worlds).
* In the **Gravity** sub-section (under Physics if simulating later), set **Y-axis** gravity to **-9.81 m/s²** for realistic simulations.

<img width="351" height="657" alt="Scene Properties for Blender" src="https://github.com/user-attachments/assets/b4ee1eaf-65df-4d5e-a17b-16d3d8a0a2d8" />

**3. Set Coordinate System and Orientation:**
* Go to **Edit > Preferences > Interface**.
  * Under **Viewport**, set **Transform Orientation** to **Global**. This ensures rotations use world axes, aligning with Y-up on export.
  * Under Rotation & Scale, enable Auto Depth for precise 3D manipulations.
* In the 3D Viewport header (top), set **Transform Pivot Point** to **Median Point** (for balanced scaling of multiple objects).
* For export compatibility: Blender's default is Z-forward/Y-up, but Horizon prefers -Z-forward/Y-up. We'll handle this in the export step (Section 4), but preview by selecting the default cube > **Object > Apply > Rotation & Scale** (resets to identity without changing visuals).

**4. Clean Up the Default Scene:**
* Select the default cube (right-click or A to select all).
* Press **X > Delete** (or Delete key) to remove it.
* Optionally, delete the light and camera if not needed: **Select > X > Delete.**
* Clear any startup file junk: **File > Defaults > Load Factory Settings** (if you want a pristine start, but save preferences first).

<img width="1725" height="990" alt="Empty Blender Scene" src="https://github.com/user-attachments/assets/6816ff9e-93bb-4243-987e-ba7127f24fb7" />

Now you're ready to create your custom model!

**Blender Specific Tips & Tricks**
* Set viewport shading: **Header > Shading dropdown > Material Preview** (simulates PBR lighting like Horizon).
* For performance previews, enable **Eevee** renderer (**Properties > Render > Render Engine > Eevee**) as it's faster than Cycles and closer to Horizon's real-time rendering.
* Common Pitfall: If models appear flipped post-import, re-export with Forward: -Z Forward in FBX settings.

<img width="1722" height="987" alt="Monkey in Blender Scene" src="https://github.com/user-attachments/assets/72fd6b7d-3e80-4df3-b099-c40a0c6c6df2" />

### 2.2 Maya
Maya defaults to a Y-up system (matching Horizon), but uses centimeters. We'll switch to meters.

**1. Launch and Create a New Scene**
* Open Maya.
* Go to **File > New Scene** (or New Scene with New Project for organized files).
* The default scene includes a perspective view, grid, and no objects.

<img width="1263" height="832" alt="Empty Default Maya Scene" src="https://github.com/user-attachments/assets/47040619-2df5-480e-9c38-54c5f3ad9aad" />

**2. Configure Units and Scale:**
Maya's default cm scale would make a 1m chair export as 100 units, causing massive resizing in Horizon.
* Go to **Window > Settings/Preferences > Preference**s.
* In the Settings category:
  * Under Linear, set Working Units to Meter.
  * Set Angular to Degree.
  * Under Time, set Time to Film (24 fps) if planning animations.
* Apply and close. Verify in the viewport: The grid should now represent 1m units (check Display > Grid > Grid Length: 1.000).

<img width="924" height="350" alt="Maya Unit Settings" src="https://github.com/user-attachments/assets/c282f077-ed73-49de-a702-3f4d564f18c0" />

**3. Set Coordinate System and Orientation:**
* Maya's default is Y-up/Z-forward, which aligns well with Horizon (minor adjustments in export).
* Go to **Display > Transform Display > Local Rotation Axes** (enable for axis visualization).
* In the Attribute Editor (right panel), ensure Construction History is on (for non-destructive modeling).
* Set world orientation: **Display > Grid > Create > Grid > Options > Size**: 10m (for a reference floor).

<img width="667" height="431" alt="Local Rotation Axes" src="https://github.com/user-attachments/assets/d6695003-8dee-4be8-b367-967ea73e3294" />

**4. Clean Up the Default Scene:**
* If any default objects (rare in new scenes), select > Edit > Delete All by Type > History (cleans nodes).
* Delete unnecessary cameras/lights: Select in Outliner (right panel) > Delete.

**5. Enable Plugins and Shelf Customization:**
* Go to Window > Settings/Preferences > Plug-in Manager.
  * Check Loaded and Auto load for fbxmaya.mll (FBX exporter, built-in).
  * For glTF: Download and load the Autodesk glTF Translator from the App Store (Window > Asset Browser > Search "glTF").
* Customize shelves: Windows > Workspaces > Modeling (preloads tools like Extrude, Bevel).
  * Add custom shelf for Horizon: Right-click shelf > New Shelf > Add buttons for frequent actions (e.g., FBX Export).
* For advanced users: Enable Arnold for Maya renderer (Window > Rendering Editors > Render Settings > Arnold Renderer) for PBR previews matching Horizon.

<img width="1728" height="1017" alt="Maya Editor" src="https://github.com/user-attachments/assets/a66aee69-65a4-4a95-97f5-23a2706a98ee" />


### 2.3 Basic Design Principles for Horizon Worlds
When designing 3D assets for Meta Horizon Worlds, adhering to specific guidelines ensures optimal performance and compatibility within the platform’s virtual reality (VR) environment. These principles focus on maintaining low polygon counts, leveraging modular design, adhering to proper scaling, and preparing assets for texturing. Following these best practices allows creators to build immersive, efficient, and reusable assets that enhance the user experience in Horizon Worlds.

#### 2.3.1 Optimize Polygon Count for VR Performance
To ensure smooth rendering in VR, keep the polygon count of each asset low, ideally between **10,000 and 20,000 triangles**. High-poly models can cause lag or performance issues, especially in complex scenes with multiple assets. Use techniques such as:
* Simplifying geometry by reducing unnecessary vertices and edges.
* Avoiding excessive subdivisions unless required for critical details.
* Utilizing normal maps to simulate high-detail surfaces without increasing polygon count.

#### 2.3.2 Adopt Modular Design for Reusability
Design assets with modularity in mind to maximize flexibility and reusability. Modular assets are individual components (e.g., walls, doors, or furniture pieces) that can be combined or repurposed across different scenes. Key considerations include:
* Creating assets with standardized connection points or sizes for easy assembly.
* Designing interchangeable parts, such as a chair back or table leg, that can be swapped to create variations.
* Ensuring assets are self-contained to avoid dependencies on specific scenes.
* Prior to exporting from Maya, you should group your kit, then arrange it in a way that is convenient to see and access all of the items in your kit. We recommend that the history is deleted and the transform is frozen.

#### 2.3.3 Maintain Real-World Scale
Horizon Worlds uses a **1:1 scale**, where 1 unit in the 3D modeling software corresponds to 1 meter in the VR environment. Design assets to match real-world proportions to ensure consistency and immersion. For example:
* A standard chair should be approximately 0.9–1.0 meters tall.
* A door should be around 2.0–2.4 meters in height.
* Set the pivot point at the base of the asset to simplify placement in the editor.

#### 2.3.4 Apply Simple Materials and UV Unwrapping
To prepare assets for texturing, apply simple materials and ensure proper UV unwrapping.
* Create clean UV maps to avoid texture stretching or seams.
* Use simple material setups to minimize rendering overhead.
* Keep texture resolutions at **1024x1024 pixels or lower** for optimal performance.
* Export textures in **PNG** or **JPG** formats, as these are supported by Horizon Worlds.
* Normal maps are NOT supported by Meta Horizon Worlds. It is recomended geometry is used to convey information that would otherwise be put in a normal map. 

Review Meta's [3D Modeling Tool Resources](https://developers.meta.com/horizon-worlds/learn/documentation/custom-model-import/3d-modeling-tool-resources) for beginner tutorials. More in depth documentation for best practices for custom models can be found [here](https://developers.meta.com/horizon-worlds/learn/documentation/custom-model-import/creating-custom-models-for-horizon-worlds/best-practices).

---

## 3. Preparing Models for Export
To successfully export 3D assets from Blender or Maya for use in Meta Horizon Worlds, creators must adhere to specific file type requirements and limitations. These guidelines ensure assets are compatible with the platform, optimize performance in the virtual reality (VR) environment, and prevent import errors in the Horizon Worlds desktop editor. This section outlines the supported file formats and key limitations, including polygon counts, file sizes, texture resolutions, and naming conventions.

The Meta Horizon Worlds desktop editor allows the user to import 3D models that consist of an **FBX file** and **PNG** or **JPG** file(s). 
* An FBX file defines various foundational attributes of a model such as geometry, textures, rigging, and animations.
* The PNG file(s) bring realism to a model by enhancing textures to a model with its surface details, color maps, or transparency.
* Both FBX and PNG files are recommended to be used together to optimize every aspect of a 3D model.

**Important:** Textures must be exported as separate files, not embedded within the FBX file.

### 3.1 Asset Limitations and Recommendations
The Horizon Worlds editor, with all its high-powered functionalities, still has limitations that users should be aware of.
* With the mesh and geometry complexity, the editor cannot process an asset that has more than 400,000 vertices or that has more than 12,000 polygons.  Editor performance will likely take a hit with high numbers of vertices and/or polygons.
* When it comes to texture resolution, the user will begin to see performance degradation when assets possesses textures larger than 4096 x 4096.  Loading times will increase and users will experience lags.  It is also recommended that textures in gameplay-heavy worlds be 40 megapixels, whereas textures in more static worlds be 80 megapixels.
* Normal maps are currently not supported, so the user must bake high-frequency details into the geometry instead.
* Upon importing of a mesh, its hierarchy is flattened in Horizon.  User must apply proper organization and groupings of assets before exporting from Horizon.
* Horizon only uses UV Channel 0 for texture mapping.  And for texture packing, only 8-bit PNG textures are supported.
* For the best user experience, the vertex limit for Gameplay Worlds should be 600,000 and the draw call limit for the same should be 150.
* In order to check the world travel times, Horizon also recommends 200,000 vertices and 40 texture megapixels.

#### 3D Models

3D Models are made up of Mesh, Textures, and Materials. The following are the recommendations for exporting 3D models. 

| **Category**     | **Recommended**                                                                 |
|------------------|---------------------------------------------------------------------------------|
| **Formats**      | FBX                                                                             |
| **Naming**       | **Avoid** using these characters in your node & file names – `. , /, *, $, &`   |
| **Objects**      | Multiple meshes per FBX file supported                                          |
| **Polygon Count**| 12K recommended maximum, 400K maximum vertices                                  |
| **Hierarchy**    | Flattened in Horizon*                                                           |
| **Pivot Points** | Centered on import*                                                             |
| **Animation**    | Importing animation is not currently supported                                  |
| **UV Channel**   | Only UV channel 0 is used to map textures onto the mesh                         |
| **Normals**      | Vertex normals are imported                                                     |

See more about world budgets and generic asset recommendations [here](https://developers.meta.com/horizon-worlds/learn/documentation/custom-model-import/creating-custom-models-for-horizon-worlds/best-practices).

#### Textures
The following are recommendations for exporting textures.
* PNG - 8 -bit per channel
* Horizon will support any power of 2 textures up to 4096 x 4096

Horizon Worlds supports PBR (Physically Based Rendering) textures, including:

| **Texture Type** | **File Format** | **Suffix**       | **Description**                                                                 |
|------------------|-----------------|------------------|---------------------------------------------------------------------------------|
| **Albedo**       | PNG, JPG        | `_Albedo`        | Defines the base color of the asset (e.g., `Chair_Albedo.png`).                 |
| **Normal**       | PNG, JPG        | `_Normal`        | Specifies surface details and lighting effects (e.g., `Chair_Normal.png`).      |
| **Roughness**    | PNG, JPG        | `_Roughness`     | Determines surface smoothness or roughness (e.g., `Chair_Roughness.png`).       |
| **Metallic**     | PNG, JPG        | `_Metal`         | Defines metallic properties of the surface (e.g., `Chair_Metal.png`).           |
| **Unlit**        | PNG, JPG        | `_Unlit`         | Non-shaded material, ignoring lighting (e.g., `Chair_Unlit.png`).               |
| **Blended**      | PNG, JPG        | `_Blend`         | Used for blended material rendering (e.g., `Chair_Blend.png`).                  |
| **Transparent**  | PNG             | `_Transparent`   | Supports transparent materials (e.g., `Chair_Transparent.png`).                 |
| **Masked**       | PNG             | `_Masked`        | Alpha-masked material for cutout effects (e.g., `Chair_Masked.png`).            |
| **Vertex PBR**   | PNG, JPG        | `_VXC`           | Vertex-based PBR material for specific rendering (e.g., `Chair_VXC.png`).       |

For more information about materials, see [here](https://developers.meta.com/horizon-worlds/learn/documentation/custom-model-import/creating-custom-models-for-horizon-worlds/materials-guidance-and-reference-for-custom-models).

### 3.2 Methods for Optimization

#### 3.2.1 Reducing Polygon Count
Keeping the polygon count low –ideally between 10,000 and 20,000 triangles per asset— is essential for maintaining performance in Horizon Worlds. High-poly models can cause lag, especially in complex scenes with multiple assets.

##### In Blender
1. Select the object in **Object Mode**.
2. Go to **Modifier Properties (wrench icon) > Add Modifier > Decimate**.
3. In the **Decimate Modifier**, choose the **Collapse** method and adjust the **Ratio** slider (e.g., 0.5 to reduce polygons by 50%).
4. Visually inspect the model to ensure details remain intact.
5. Apply the modifier (**Apply** button) when satisfied.

##### In Maya
1. Select the mesh in Object Mode.
2. Go to **Mesh > Reduce**.
3. In the **Reduce Options** window, adjust the **Percentage** slider (e.g., 50% to halve the polygon count).
4. Check **Preserve UVs** to maintain texture mapping.
5. Apply the reduction and review the model for quality.

#### 3.2.2 Bake Normals for Detail
To maintain visual detail on low-poly models without increasing polygon counts, bake normal maps from high-poly versions. 

##### In Blender
1. Create a high-poly version of your model with detailed geometry.
2. Duplicate the model and apply polygon reduction (e.g., via _Decimate Modifier_) to create a low-poly version.
3. Select the high-poly model, then the low-poly model (order matters).
4. Go to **Render Properties (camera icon) > Bake** panel.
5. Set **Bake Type** to **Normal**, check **Selected** to **Active**, and adjust **Cage Extrusion** if needed (e.g., 0.1).
6. Click **Bake** and save the resulting normal map as a PNG file (e.g., `Chair_Normal.png`).

##### In Maya
1. Create high-poly and low-poly versions of the model.  
2. Go to **Lighting/Shading > Transfer Maps**.  
3. In the **Transfer Maps** window, select the high-poly model as the **Source** and the low-poly model as the **Target**.  
4. Choose **Normal Map** as the output, set the resolution (e.g., 1024x1024), and ensure **Tangent Space** is selected.  
5. Click **Bake** and save the normal map as a PNG file.  

#### 3.2.3 Set Pivot Point
Positioning the pivot point at the base of the asset (e.g., floor level for a chair or table) simplifies placement and alignment in Horizon Worlds.  
A correctly set pivot ensures assets snap correctly to surfaces during world-building.  

##### In Blender
1. Select the object in **Object Mode**.  
2. Move the 3D Cursor to the desired pivot location (e.g., *Shift+S > Cursor to World Origin* or manually place it at the base).  
3. Go to **Object > Set Origin > Origin to 3D Cursor** to set the pivot point.  
4. Verify the pivot in **Edit Mode** to ensure it aligns with the base.  

##### In Maya
1. Select the mesh in **Object Mode**.  
2. Press **D** to enter pivot editing mode.  
3. Use the **Move Tool** to position the pivot at the base of the asset (e.g., floor level).  
4. Go to **Modify > Freeze Transformations** to lock the pivot and reset transformations.  
5. Confirm the pivot’s position in the **Outliner** or viewport.

#### 3.2.4 Clean Up Geometry
Cleaning up geometry removes unnecessary or problematic elements that could cause import errors or rendering issues in Horizon Worlds.  
This includes hidden geometry, overlapping vertices, and non-manifold geometry.  

##### In Blender
1. Select the object and enter **Edit Mode** (*Tab* key).  
2. Go to **Mesh > Clean Up > Merge by Distance** to merge overlapping vertices (adjust the *Distance* value, e.g., `0.001`).  
3. Use **Select > Select All by Trait > Non-Manifold** to identify and fix problematic geometry (e.g., holes or stray edges).  
4. Delete hidden geometry (e.g., internal faces not visible in the final model) by selecting and pressing **Delete > Faces**.  

##### In Maya
1. Select the mesh and go to **Edit Mode**.  
2. Go to **Mesh > Cleanup**.  
3. In the **Cleanup Options** window, enable options like **Remove Duplicate Vertices**, **Non-Manifold Geometry**, and **Faces with Zero Geometry Area**.  
4. Manually delete hidden or unnecessary faces using the **Delete** tool after selecting in the viewport.  
5. Verify the model in the **Outliner** to ensure no stray elements remain.  


### 3.3 Best Practices & Recommendations
In addition to adhering to the established limitations, users are encouraged to implement various compression techniques and optimization strategies to improve performance and reduce latency.
* Adopt low-poly modeling practices and simplify meshes where feasible to minimize computational overhead and enhance performance, particularly in VR environments.
* Compress textures using efficient formats such as ASTC to significantly reduce file sizes while maintaining visual quality. This helps optimize asset loading times and memory usage.
* Limit the use of Mip maps to a manageable number (typically between 2 to 4 levels), as excessive Mip mapping can increase memory usage and impact performance unnecessarily.
* Combine multiple textures into a single texture atlas to reduce the number of draw calls and streamline memory usage. This method improves rendering efficiency by consolidating textures into one file.
* Eliminate unnecessary mesh faces and components that will not be visible in the final asset, reducing polygon count and improving processing efficiency.
* Bake lighting into geometry (using vertex colors) instead of using additional lighting textures or normal maps, which aren’t supported.
* Break your assets into smaller, reusable pieces. This helps with remixing and reduces memory usage.
* Set pivot points correctly in your 3D software before exporting.
---
## 4. Exporting to FBX Format
When exporting, it's important to follow the following file name criteria:
* Avoid using these characters in your filenames -, ., , /, *, $, &
* Avoid using underscores “_” in your material and texture names, except to designate special tags like _Metal.
  
### 4.1 Exporting from Blender

**1. Select the Object**
- In **Object Mode**, select the model you want to export.  
- Ensure only the intended object(s) are selected to avoid including unnecessary geometry.
<img width="744" height="434" alt="Suzzane Selected" src="https://github.com/user-attachments/assets/c9e41027-2fc1-4035-99be-311d371f3fb7" />

**2. Access Export Menu**
- Go to **File > Export > FBX (.fbx)** to open the FBX export dialog.
<img width="1039" height="675" alt="Accessing Export Menu" src="https://github.com/user-attachments/assets/a29877c4-b534-4669-a5ac-e79f3814a8a6" />

**3. Configure Export Settings**
- **Path Mode**: Set to *Copy* to ensure textures are referenced correctly.  
- **Forward Axis**: Set to *-Z Forward* to align with Horizon Worlds’ coordinate system.  
- **Up Axis**: Set to *Y Up* to match the platform’s orientation.  
- **Selected Objects**: Check *Selected Objects* to export only the chosen model.  
- **Apply Modifiers**: Check *Apply Modifiers* to bake any modifiers (e.g., *Decimate, Subdivision*).  
- **Embed Textures**: ❌ *Uncheck* (required by Horizon Worlds).  
- **Animation (if applicable)**: ✅ Check *Include Animation* if your model includes skeletal animations.

**4. Export the FBX File**
- Choose a clear file name (e.g., `Chair.fbx`) and save in a dedicated folder (e.g., `Assets/Chair/`).  

**5. Export Textures Manually**
1. In the **Shader Editor**, locate the material nodes (e.g., *Principled BSDF*).  
2. For each texture (e.g., *Albedo, Normal, Roughness*), select the **Image Texture node**.  
3. Save the image as **PNG** or **JPG** (e.g., `Chair_Albedo.png`, `Chair_Normal.png`).  
4. Save in the same folder as the FBX file.  
5. Ensure textures are **1024x1024 px or lower** and follow naming conventions (e.g., `_Albedo`, `_Normal`).  


### 4.2 Exporting from Maya
**1. Select the Mesh**
- In **Object Mode**, select the mesh or group of objects you intend to export.  
- Ensure no unnecessary objects are included.

**2. Access Export Menu**
- Go to **File > Export Selection > FBX** to open the export options.

<img width="372" height="417" alt="Export Maya Menu" src="https://github.com/user-attachments/assets/977a0ea6-6544-4b79-ad37-f1d1878b5907" />


**3. Configure Export Settings**
- **FBX File Format**: Choose *Binary* for compatibility.  
- **FBX Version**: Use *FBX 2018 or newer*.  
- **Geometry**: Check *Smoothing Groups* and *Smooth Mesh* to preserve details.  
- **Embed Media**: ❌ *Uncheck* (required by Horizon Worlds).  
- **Animation (if applicable)**: ✅ Check *Animation* and *Bake Animation*.  
- **Units**: Use *Automatic* or *Meters* to match Horizon Worlds’ **1:1 scale**.

**4. Export the FBX File**
- Use a clear file name (e.g., `Table.fbx`) and save in a dedicated folder (e.g., `Assets/Table/`).  

**5. Export Textures Manually**
1. In the **Hypershade**, locate the material (e.g., *aiStandardSurface*).  
2. Export each texture map (e.g., *Albedo, Normal, Roughness*) as **PNG/JPG**.  
   - Example: `Table_Albedo.png`, `Table_Normal.png`.  
3. Save in the same folder as the FBX file.  
4. Ensure resolutions are **1024x1024 px or lower** and use naming conventions (e.g., `_Albedo`, `_Normal`).

<img width="902" height="632" alt="Exporting Object with Textures" src="https://github.com/user-attachments/assets/1e76fd95-d228-48e5-9e4e-f964d256546f" />

## 5. Importing a Custom Model Asset
The following is a quick guide to help bring a custom 3D model into your project and embed it into your scene.

**Prerequisite:** A 3D model consists of an .FBX file and .PNG file(s).  You'll need to generate these files from tools such as Blender or Maya.
	
**1. Open My Assets Library**
* In the Horizon Desktop Editor, scroll down and click on the Asset Library tab at the bottom of the page.
* Select My Assets to open your personal library of 3D models.

![image](https://github.com/user-attachments/assets/e20a2a7b-cfa0-4af1-b2ed-31f7e12c2b05)
		
**2. Add Your 3D Model**
* Click the Add New button and choose 3D Model from the menu.
* Import Models window will be opened.

![image-1](https://github.com/user-attachments/assets/f526fd6f-1e17-4255-800b-6e036a8013ee)
		
3. Choose Your Asset Files
* Click the "+Choose files on your device" link to open up the local file browser.
* Locate and select your .FBX model file and the associated .PNG texture files.  Then click the Open button.

![image-2](https://github.com/user-attachments/assets/3fa86faf-7a12-4ae2-97ad-9d31dbbc1407)

**4. Import the Asset**
* Once the asset files are selected, click the Import button.
* Within a few seconds, an asset icon will appear on the My Assets folder, which means the 3D model is ready to be used.
		
**5. Embed the 3D Model to the Scene**
* In order to embed the model to a scene, simply click and drag the asset icon on the My Assets folder into the viewport.
* Drop the icon wherever you want within the scene. The 3d model will immediately appear on the scene and the hierarchy panel.

![image-3](https://github.com/user-attachments/assets/7df8ffde-d27e-47bc-953a-ac5e0632ee55)

---

## Troubleshooting

- **Wrong scale:** Check units = meters, apply transforms.  
- **Rotated/flipped:** Re-export with **Forward = -Z Forward, Up = Y Up**.  
- **Missing textures:** Ensure textures are in same folder and correctly named.  
- **Laggy:** Reduce polygons, downscale textures, or atlas them.  

---

*Happy building!*
