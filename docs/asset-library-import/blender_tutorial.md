# Blender to Horizon Worlds: Your Import Guide

This guide provides a comprehensive workflow for creating a 3D model in Blender, preparing it for import, and bringing it into the Horizon Worlds desktop editor. By following these steps, you can create custom assets with specific material properties, enhancing the visual appeal and complexity of your worlds.

**Watch on Youtube:**

[![A video of a tutorial](https://img.youtube.com/vi/j7MumLvgPsQ/hqdefault.jpg)](https://www.youtube.com/watch?v=j7MumLvgPsQ)

- - -

## Part 1: Preparing Your Asset in Blender

This section focuses on the steps you need to take within Blender to ensure your model and its materials are ready for Horizon Worlds.

### 1\. Checking Model Statistics

*   Before you begin, it's important to check your model's vertex count to stay within the **400,000 vertex limit** for Horizon Worlds.
*   To do this, enable the `Statistics` overlay in Blender. Go to the top-right corner of the 3D viewport, click the dropdown arrow next to the overlay icons, and check the box next to `Statistics`.
<img width="357" height="671" alt="image" src="https://github.com/user-attachments/assets/7f771d58-4e19-49f9-b2b7-40e87ad7900e" />

*   This will display the `Verts` (vertices) count in the bottom-right corner of the viewport, giving you real-time feedback on your model's complexity.
<img width="407" height="328" alt="image" src="https://github.com/user-attachments/assets/dab1f901-4c35-4851-9114-f5d2132837a9" />

### 2\. Model Creation and Implementation

Before getting started with creating or implementing a model, be aware of these key considerations regarding single-mesh and multi-mesh models. These choices can significantly impact your workflow in Horizon Worlds, from optimization to animation.

<img width="450" height="281" alt="image" src="https://github.com/user-attachments/assets/27b77480-781a-4c85-a3ec-3e11f6e169d0" />

*   **Single-Mesh:** If your model is a single, static object (e.g., a rock or a table), it's best to **merge all the meshes into one**. This helps with optimization.

<img width="450" height="281" alt="image" src="https://github.com/user-attachments/assets/e5ac8f2c-913b-4c61-b23b-8e82a026ce47" />

*   **Multi-Mesh:** You may need a multi-mesh model if you have a large scene you want to rearrange in Horizon, or if you want to animate specific parts of it.
    *   If your model has separate, moving parts (e.g., a treasure chest with a lid that opens), you need to keep those meshes separate. This allows you to animate each piece individually in Horizon Worlds.
    *   **Caution:** To maintain the original pivot point for each separate object, you must export them as separate FBX files. Horizon Worlds only supports one pivot point per imported mesh.


### 3\. Material Creation

*   **Material Creation:** Begin by creating a new material for your mesh. Remember the name of the material matters for Meta Horizon World, based on the material type you have, you will get a hint regarding that in the **"Meta Horizon Texture Generator (MHTG)"** mini app that we will see further.
*   **Baking Textures:** To simplify complex materials and ensure they render correctly, you should **bake** your Blender materials into a single texture. Navigate to the `Render` properties, set your render engine to `Cycles`, and find the `Bake` panel.
<img width="1918" height="1021" alt="image" src="https://github.com/user-attachments/assets/53ca5234-6dce-4484-95e1-d920a82ed8ef" />

  Go to the **Shading** tab in Blender and select the material you want to bake.

<img width="1918" height="1020" alt="image" src="https://github.com/user-attachments/assets/1b3a50f5-9353-4f30-af65-c50778f6e32e" />

   In the Node-based area, add a new `Image Texture` node by pressing `Shift + A`.

<img width="300" height="260" alt="image" src="https://github.com/user-attachments/assets/6384d3ba-9924-4259-bb2e-13516eef5714" /> <img width="268" height="260" alt="image" src="https://github.com/user-attachments/assets/187f5bb3-2fc5-4ab9-bb65-fddf39b24a95" />


   Click the **\+ New** button to create a new image. Set the resolution (e.g., 1024x1024) and name it. Ensure this node is selected.
<img width="1918" height="1017" alt="image" src="https://github.com/user-attachments/assets/9e61c71f-07ce-4c68-ba02-fe6e9e35cd1c" />

   **UV Unwrapping:** Before creating your textures, you must unwrap your model's UVs. This creates a 2D map of your 3D model that tells Blender where to place the texture. To do this, go to the UV Editing tab, select your model, press `TAB` to go to Edit Mode, press `A` to select all parts of the mesh, press `U`, and choose `Smart UV Project`.

<img width="1917" height="1017" alt="image" src="https://github.com/user-attachments/assets/8a55c4c2-031e-4431-826f-8071526cac4a" />

   Now, go back to the **Render** properties tab and make sure the correct object is selected. In the **Bake** panel, ensure you turn off both **Direct** and **Indirect** lights. Click the **Bake** button to start the process.


### 4\. Creating Meta Horizon-friendly Textures!

Instead of manually creating and packing textures, you can use the **Meta Horizon Texture Generator (MHTG)** to streamline this process.
MHTG is a simple desktop tool that automates channel packing with a drag-and-drop interface, making texture creation easier and faster.


<img width="614" height="553" alt="image" src="https://github.com/user-attachments/assets/77140d20-ab08-45cc-a8f0-05632b421d10" />


#### Quick Start Guide

1.  **Install Python:**  
    Download and install Python from [python.org/downloads](https://www.python.org/downloads). On Windows, check the box that says "Add Python to PATH" during installation.
2.  **Download and Setup MHTG:**  
    Download this project as a ZIP file from the <> Code button and unzip it. Open a terminal or Command Prompt and navigate into the folder. Install the required libraries by running: `pip install -r requirements.txt`
3.  **Run the Application:**  
    In the same terminal, run the command: `python MHTG.py`
4.  **How to Use:**  
    Enter a Material Name. Select the Material Type from the dropdown. Drag and drop your source textures onto the corresponding slots. Click "Generate & Save Files" and choose an output folder.

#### Windows Executable (Optional)

For Windows users who prefer a standalone application without needing to install Python.

*   **Download:** Look for the MHTG Standalone zip file and download it.
*   **Run:** Extract and find the .exe file and double-click it to start the application.
*   **Note:** The first time you run the app, Windows Defender may show a warning because it's an unrecognized application. If this happens, click "More info" and then "Run anyway".


#### Material Cheat Sheet

The software uses this table to find the correct material type in the app and the required name in Blender.

| Material Type in App | Output Files | Blender Material Name |
| --- | --- | --- |
| Standard Image | `Image_BR.png` | `Image` |
| Metal Image | `Image_BR.png`, `Image_MEO.png` | `Image` |
| Unlit Image | `Image_B.png` | `Image_Unlit` |
| Unlit Blend Image | `Image_BA.png` | `Image_Blend` |
| Transparent Image | `Image_BR.png`, `Image_MESA.png` | `Image_Transparent` |
| Masked Image | `Image_BA.png` | `Image_Masked` |
| Animated Image (UIO) | `Image_BA.png` | `Image_UIO` |


### 5\. Exporting the FBX File

*   **Export as FBX:** Go to `File > Export > FBX`.
*   **Adjust Export Settings:** Ensure the `Forward` axis is set to **negative Z**. This is a critical step to ensure your model's orientation is correct when imported into Horizon Worlds.

- - -

## Part 2: Importing into the Horizon Worlds Desktop Editor

This section covers the final steps of bringing your prepared assets into Horizon Worlds.

### 1\. Importing the Assets

*   In the Horizon Worlds desktop editor, navigate to the `Assets` tab.
*   Select **Add New 3D Model** and then **Add Files on Your Device**.
*   Select your exported FBX file and all of its corresponding texture PNG files to upload them together.
*   **Preserve Offsets:** It's recommended to turn off the "Preserve Offsets" option during import unless you have a specific use case that requires it (e.g., an animated door hinge).

### 2\. Using Your Asset

*   Once the import is complete, your new model will appear in your asset library.
*   Simply drag it from the asset library into your world.
*   If you followed all the naming conventions correctly in Blender, the textures will be automatically applied, and the model will appear exactly as you designed it.

- - -

## Additional Tips

*   **Optimization:** Use smaller texture sizes (e.g., 1K) to improve performance and reduce world loading times.
*   **Vertex Count:** Always keep an eye on your model's vertex count to stay within limits and ensure smooth performance.
*   **Double-Sided Meshes:**
    *   **Enable Backface Culling:** In the Viewport Shading settings, activate Backface Culling to ensure proper visualization of surface orientation.
    *   **Duplicate the Mesh:** Enter Edit Mode by pressing Tab, select all vertices with A, then press Shift + D to duplicate the geometry, followed by Enter to confirm the duplication.
    *   **Flip Normals for Double-Sided Geometry:** Press Alt + N and choose Flip Normals to invert the duplicated faces, effectively creating a double-sided surface—ideal for thin objects like leaves or paper.
