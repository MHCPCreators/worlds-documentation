# Modeling A Basketball With Baked Textures

---

## Table of Contents
- [Introduction](#introduction)
- [Learning Objectives](#learning-objectives)
- [Part 1: Modeling In Blender](#step-1-open-blender-and-clear-the-scene)
- [Part 2: Bake Textures](#part-2-baking-and-importing-the-basketball-into-horizon-worlds)
- [Part 3: Export as FBX](#step-20-export-as-fbx)
- [Part 4: Import into Horizon Worlds](#step-21-import-into-horizon-worlds)

---

## Introduction
**Creator Skill Level:** All levels  
**Required Background Knowledge:** None  
**Recommended Background Knowledge:** Blender basics (navigating the viewport, selections, hotkeys)

**Description:**  
In this tutorial, you’ll model a basketball using Blender’s core mesh tools—starting from a UV sphere, shaping the iconic grooves, then preparing the model for Horizon Worlds. We’ll keep things performance-friendly for VR while showing both **hotkey** and **menu** paths so creators at every comfort level can follow along.

---

## Learning Objectives
By the end, you’ll be able to:  
- Create a basketball in Blender  
- Use the **Mirror Modifier** for symmetry  
- Bake multiple textures to one image
- Import a model into Horizon Worlds Desktop Editor



## Step 1: Open Blender and Clear the Scene
When you open a fresh Blender file, it usually has a cube, camera, and light. We don’t need them.

- **Hotkey:**  Close dialog. Press `A` → `X` → `Enter` to delete 
- **Menu:** `Select → All`, then right-click → `Delete`

[![Delete Everything](photos/DeleteEverything.png )](https://github.com/Laex05/vidyuu-worlds-documentation/blob/bd942a01490ff37823f764bd3c17046cfcde6b94/docs/meshes-materials-import/photos/DeleteEverything.png)

---

**Optional Video Resource:**
<iframe width="560" height="315" src="https://www.youtube.com/embed/qXSKMLpbUXQ?si=iWBO9NZnvLK_e2ow" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## Step 2: Add a Sphere
Add the base shape.

- **Hotkey:** `Shift + A → Mesh → UV Sphere`  
- **Menu:** `Add → Mesh → UV Sphere`  
- In the “**Add UV Sphere**” panel (bottom-left), set **Segments = 16**

[![Add UV Sphere](photos/AddUVSphere.png )](https://github.com/Laex05/vidyuu-worlds-documentation/blob/9a64d1621dffbe2938c067a7e873dedcae0f4fb9/docs/meshes-materials-import/photos/AddUVSphere.png)
[![Sphere 16 Segments](photos/16Segments.png )](https://github.com/Laex05/vidyuu-worlds-documentation/blob/bd942a01490ff37823f764bd3c17046cfcde6b94/docs/meshes-materials-import/photos/16Segments.png)

---

## Step 3: Delete the Bottom Half of the Sphere

### Select the Sphere for Editing
- Click the sphere to select it, then with the mouse hovering over the sphere:
- **Hotkey:** `Numpad .` to focus the selection (may also be mapped to `\`)
- **Menu:** `View → Frame Selected`

[![Frame Selected](photos/FrameSelected.png )](https://github.com/Laex05/vidyuu-worlds-documentation/blob/bb7452e6d6816aff595b8d46d6921755addccc43/docs/meshes-materials-import/photos/FrameSelected.png)

### Enter Edit Mode
- **Hotkey:** `Tab`  
- **Menu:** Mode dropdown → `Edit Mode`

[![Edit Mode](photos/EditMode1.png )](https://github.com/Laex05/vidyuu-worlds-documentation/blob/0a0ec4feb8926bfeb7df4b9f184cbd4de23b3d60/docs/meshes-materials-import/photos/EditMode1.png)

### Switch to Side View
- **Hotkey:** `Numpad 3`  
- **Menu:** Click the red **X-axis view** icon

### Turn on X-Ray Mode
Lets you select **through** the mesh.

- **Hotkey:** `Alt + Z`  
- **Menu:** Toggle **X-Ray** (overlapping squares, top-right)

[![X-Ray Mode](photos/X-RayMode.png )](https://github.com/Laex05/vidyuu-worlds-documentation/blob/0a0ec4feb8926bfeb7df4b9f184cbd4de23b3d60/docs/meshes-materials-import/photos/X-RayMode.png)

### Select and Delete the Bottom Half
- **Switch To Face Selection Mode** (`3` hotkey, or the overlapping squares in top-left)
- **Box Select (B)** or drag-select the entire bottom half  
- **Hotkey:** `X → Delete Faces`  
- **Menu:** Right-click → `Delete Faces`

[![Bottom Half Deleted](photos/BottomHalfDeleted.png )](https://github.com/Laex05/vidyuu-worlds-documentation/blob/0a0ec4feb8926bfeb7df4b9f184cbd4de23b3d60/docs/meshes-materials-import/photos/BottomHalfDeleted.png)

### Turn X-Ray Mode Off
- **Hotkey:** `Alt + Z`  
- **Menu:** Click **X-Ray** again

---

## Step 4: Add a Mirror Modifier
- **Properties → Modifiers (wrench)** → `Add Modifier → Mirror`  
- Enable **Z axis**


[![Search Mirroe Modifier](photos/Search%20Mirror%20Mod.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/3a6564f0f484f15ad50eb15f992147df5d7ac786/docs/meshes-materials-import/photos/Search%20Mirror%20Mod.png)

[![Mirror Z Axis](photos/Mirror%20Mod%20Z%20Axis.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/3a6564f0f484f15ad50eb15f992147df5d7ac786/docs/meshes-materials-import/photos/Mirror%20Mod%20Z%20Axis.png)

---

## Step 5: Delete the Top Pole Vertex
- Orient camera to look at the top half (click mouse wheel, or scroll down on track pad)
- Switch to **Vertex Select mode** (`1` hotkey or Vertex Select icon in the top left)  
- Select the **top pole vertex**  
- Delete:  
  - **Hotkey:** `X → Vertices`  
  - **Menu:** `Edit → Delete → Vertices`


[![Top Pole Vertex Selected Before Deletion](photos/Pole%20Vertex%20Selected.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/3a6564f0f484f15ad50eb15f992147df5d7ac786/docs/meshes-materials-import/photos/Pole%20Vertex%20Selected.png)

[![Delete Vertex](photos/Delete%20Pole%20Vertex.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/3a6564f0f484f15ad50eb15f992147df5d7ac786/docs/meshes-materials-import/photos/Delete%20Pole%20Vertex.png)

[![Vertex Deleted](photos/Pole%20Vertex%20Deleted.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/3a6564f0f484f15ad50eb15f992147df5d7ac786/docs/meshes-materials-import/photos/Pole%20Vertex%20Deleted.png)


---

## Step 6: Bridge the Edge Loops
- Select the **14 surrounding vertices**, leave the 2 center ones unselected.
- **Note:** hold shift while selecting verts to select more than one at a time.
- Then, **Menu:** `Edge → Bridge Edge Loops`.

[![14 Verts Selected](photos/14%20Vertices%20Selected.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/f88bb9c55a21e58b23cc2a757d991521e5437f91/docs/meshes-materials-import/photos/14%20Vertices%20Selected.png)

[![Bridge Edge Loops Menu](photos/Bridge%20Edge%20Loops%20Menu%20Button.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/f88bb9c55a21e58b23cc2a757d991521e5437f91/docs/meshes-materials-import/photos/Bridge%20Edge%20Loops%20Menu%20Button.png)

[![Edge Loops Bridged](photos/Bridged%20Edge%20Loops.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/f88bb9c55a21e58b23cc2a757d991521e5437f91/docs/meshes-materials-import/photos/Bridged%20Edge%20Loops.png)

---

## Step 7: Add a Loop Cut in the Center
- **Hotkey:** `Ctrl + R`, hover over selection, left-click in the center twice, or press escape `esc` to center the cut line.
- **Note** In the left side tool menu is a loop cut tool.

[![Add Loop Cut](photos/Loop%20Cut%20Center%20Placement.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/a1246e86a8ccddbec61c926d5e73e39b186a109a/docs/meshes-materials-import/photos/Loop%20Cut%20Center%20Placement.png)

[![Loop Cut Added at Center](photos/Loop%20Cut%20Done.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/a1246e86a8ccddbec61c926d5e73e39b186a109a/docs/meshes-materials-import/photos/Loop%20Cut%20Done.png)

---

## Step 8: Merge the Outer Vertices
- **Select Pairs:** see picture below.
- **Hotkey:** `M → At Center`  
- **Menu:** `Mesh → Merge → At Center`

[![Selected Verts](photos/Select%20Outer%202%20Vertices%20and%20Merge%20at%20Center.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/0ccb895f6c27c76b21ede61b9fc08381d868e851/docs/meshes-materials-import/photos/Select%20Outer%202%20Vertices%20and%20Merge%20at%20Center.png)

[![Two Outer Verts Merged at Center](photos/2OuterVertices%20MergedatCenter%20Done.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/0ccb895f6c27c76b21ede61b9fc08381d868e851/docs/meshes-materials-import/photos/2OuterVertices%20MergedatCenter%20Done.png)

[![Top and Bottom Merged Correctly](photos/Outer%20Vertices%20Merged%20on%20Top%20and%20Bottom.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/0ccb895f6c27c76b21ede61b9fc08381d868e851/docs/meshes-materials-import/photos/Outer%20Vertices%20Merged%20on%20Top%20and%20Bottom.png)

---

## Step 9: Scale Vertices Inward Slightly
- Ensure **Vertex Select** mode (`1`)  
- Select the **five center vertices**

[![Five Verts Selected to Scale](photos/5%20Vertices%20Selected%20to%20Scale%20Inward.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/cc5b25a4bbc3aeea9fead650766caa115ac45d20/docs/meshes-materials-import/photos/5%20Vertices%20Selected%20to%20Scale%20Inward.png)

- Scale inward slightly:  
  - **Hotkey:** `S` pulling the lines slightly inward (see picture below)
  - Optionally use the **Toolbar:** Scale tool (square with arrows)
  - **Note:** if your scale is not close enough to that seen in the picture, in the bottom left you can adjust the values to `0.80`

[![Five Verts Scaled Inward](photos/5%20Vertices%20Scaled%20Inward.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/cc5b25a4bbc3aeea9fead650766caa115ac45d20/docs/meshes-materials-import/photos/5%20Vertices%20Scaled%20Inward.png)

---

## Step 10: Bevel the Grooves
- Switch to **Edge Select** (`2`)  
- Select 4 loops: `Alt + Left-Click` first → `Shift + Alt + Left-Click` the rest
  
[![Four Edge Loops Selected](photos/4EdgeLoops%20Selected.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/0129fe58144f3c21df8f8c783acc75f467eb136e/docs/meshes-materials-import/photos/4EdgeLoops%20Selected.png)

- Bevel:  
  - **Hotkey:** `Ctrl/Command + B` → scroll wheel to 3 segments (**Note** you must use `command + B` on Mac)
  - **Menu:** `Edge → Bevel Edges → Segments = 3`  
  - **Toolbar:** Bevel tool (angled lines + dot)
  - **Note:** when done, you can adjust segments from the bottom left menu if it isn't already at 3, and width to 0.02

[![Edge Loops Beveled](photos/Bevel%20the%204%20Selected%20Edge%20Loops.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/0129fe58144f3c21df8f8c783acc75f467eb136e/docs/meshes-materials-import/photos/Bevel%20the%204%20Selected%20Edge%20Loops.png)

---

## Step 11: Shrink Selection
- **Shrink Selection:** `Ctrl + Numpad -` or `Select → More/Less → Less`

[![Shrink Selection](photos/Shrink%20Selection.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/aecae495040ea8202cdd614f7bbda2819714ce24/docs/meshes-materials-import/photos/Shrink%20Selection.png)

- **Scale Faces:**  
  - `S` hotkey, move mouse down to indent (see picture below) 
  - `Mesh → Transform → Scale`  
  - Scale tool (toolbar)

[![Scaled Grooves](photos/Scale%20Grooves.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/aecae495040ea8202cdd614f7bbda2819714ce24/docs/meshes-materials-import/photos/Scale%20Grooves.png)

### Add Orange Material
- Switch to **Material Preview** (`Z → Material Preview`) or top right `Viewport Shading` globe icon
- Select the red ball Material icon to open the `Material Properties`
- **Material Properties → + New** → name `Basketball` → set color = orange  
- Blender assigns the color to the whole ball

[![Orange Material](photos/Orange%20Material.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/7b6a4156fe52ca2d6df342cde2e91c68408436fd/docs/meshes-materials-import/photos/Orange%20Material.png)

### Add Black Groove Material
- With grooves selected → `+` slot → `+ New` → name `Grooves` → set color = black → **Assign**

[![Black Material](photos/Black%20Material.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/7b6a4156fe52ca2d6df342cde2e91c68408436fd/docs/meshes-materials-import/photos/Black%20Material.png)

[![Both Materials on BBall Correctly](photos/Basketball%20with%20both%20Materials%20Added.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/7b6a4156fe52ca2d6df342cde2e91c68408436fd/docs/meshes-materials-import/photos/Basketball%20with%20both%20Materials%20Added.png)

---

## Step 12: Merge the Halves
- **Mirror Modifier → Merge Distance** until seam closes

[![Mirror Modifier Adjusted](photos/Adjust%20Merge%20Distance.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/82e5fbe99539b58ab675bb12695952ab7d27c7a0/docs/meshes-materials-import/photos/Adjust%20Merge%20Distance.png)

[![Basketball After Merge Distance Adjusted](photos/Basketball%20After%20Merge%20Distance%20Adusted.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/82e5fbe99539b58ab675bb12695952ab7d27c7a0/docs/meshes-materials-import/photos/Basketball%20After%20Merge%20Distance%20Adusted.png)

---

## Step 13: Optional — Subdivision Modifier
- **Hotkey:** `Ctrl + 1/2/3`  
- **Menu:** Add Modifier → `Subdivision Surface`

[![Sub Surface Modifier](photos/Subdivision%20Modifier.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/f9bcb168abdfaaab796abe7adfa8b280df1107a0/docs/meshes-materials-import/photos/Subdivision%20Modifier.png)

[![Basketball with Sub Surface Modifier](photos/Subdivision%20Modifier%20on%20Ball.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/f9bcb168abdfaaab796abe7adfa8b280df1107a0/docs/meshes-materials-import/photos/Subdivision%20Modifier%20on%20Ball.png)

---

## Step 14: Finalize the Basketball
1. **Remove Subdivision (optional):** Delete from Modifiers tab
   - If you added a Subdivision Surface modifier earlier but prefer the basketball to stay low-poly for performance, you can remove it.
   - In the **Properties panel → Modifiers tab (wrench icon)**, click the **X** next to the Subdivision Surface modifier to delete it.
2. **Return to Object Mode:** `Tab`

[![Object Mode](photos/Object%20Mode.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/c091ad971225b3ee170f416f620ddc4cfd1b0283/docs/meshes-materials-import/photos/Object%20Mode.png)

3. **Apply Mirror Modifier:** Modifiers tab → Arrow Dropdown `Apply` (**Important** you must be in `Object Mode`)

[![Apply Mirror Modifier](photos/Apply%20Mirror%20Modifier.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/c091ad971225b3ee170f416f620ddc4cfd1b0283/docs/meshes-materials-import/photos/Apply%20Mirror%20Modifier.png)

4. **Shade Options:**  
   - **Shade Smooth:** right-click → Shade Smooth  
   - **Shade Auto Smooth:** right-click → Shade Auto Smooth → tweak **Smooth by Angle** → Apply modifier  

[![Shade Auto Smooth](photos/Shade%20Auto%20Smooth.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/c091ad971225b3ee170f416f620ddc4cfd1b0283/docs/meshes-materials-import/photos/Shade%20Auto%20Smooth.png)

[![Basketball Shaded Auto Smooth](photos/Basketball%20After%20Shaded%20Auto%20Smooth.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/c091ad971225b3ee170f416f620ddc4cfd1b0283/docs/meshes-materials-import/photos/Basketball%20After%20Shaded%20Auto%20Smooth.png)

## Note

Performance in Horizon Worlds matters. While Subdivision can make your basketball look smoother, it also increases polygon count. If your world already has a lot going on, keep it low-poly — trust me, no one’s going to count the segments of your basketball while they’re shooting hoops!


---

# Part 2: Baking and Importing the Basketball into Horizon Worlds

## Introduction

Now that your basketball is modeled and shaded smooth, the next step is to bake its materials into a single image texture and prepare it for Horizon Worlds. Baking combines all the materials (orange ball and black grooves) into one optimized PNG file, which we’ll then apply back to the ball before exporting. This ensures the basketball looks great and performs efficiently in Horizon.

---

## Step 15: Set Up for Baking
1. Switch to **UV Editing** workspace  
2. Enter **Edit Mode** 
3. Select off in the distance to deselect all 
4. In **Material Properties** click on the **Basketball** material and then hit the select button below it to only select the orange parts of the model
   - Press (`U → Unwrap Minimum Stretch`)

[![Unwrap Menu](photos/Unwrap%20Minimal%20Stretch%20Basketball%20Material.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/356a017c9442abbf307f90a3c8dd1ff7acb0afbf/docs/meshes-materials-import/photos/Unwrap%20Minimal%20Stretch%20Basketball%20Material.png)

[![Basketball Material Unwrapped](photos/Unwrapped%20Minimal%20Stretch%20Basketball%20Material.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/cabdb4ca2908aa790e03597aad248f0f74f29e48/docs/meshes-materials-import/photos/Unwrapped%20Minimal%20Stretch%20Basketball%20Material.png)

4. Click off to the side of the model in edit mode to deselect the orange material. Then in **Material Properties** click on the **Grooves** material and then hit the select button below it to only select the black parts of the model
   - Press (`U → Unwrap Minimum Stretch`)

[![Grooves Material Unwrapped](photos/Unwrapped%20Minimal%20Stretch%20Grooves%20Material.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/7d2565b0d373370921ea7d81d846ce2f2e555a6d/docs/meshes-materials-import/photos/Unwrapped%20Minimal%20Stretch%20Grooves%20Material.png)
  
5. Adjust UVs: move/scaling grooves so nothing overlaps
   - Use the hotkey **A** while your mouse is hovered over the UV texture panel. Now you should have only the groove UV’s all selected
   - Press the hotkey **S** to scale them down and then **G** to move them into the top left corner, so that they **don’t overlap** the **Basketball material** colors in the **UV Map**
   - While hovering over the model in edit mode use the hotkey **A** to select everything so you can make sure none of the UV’s are overlapping
   

[![UV's Adjusted](photos/UV's%20Adjusted.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/7d2565b0d373370921ea7d81d846ce2f2e555a6d/docs/meshes-materials-import/photos/UV's%20Adjusted.png)

---

## Step 16: Create a New Bake Image
- UV Editor → **+ New**  
- Name: `BBall_BR`  
- Size: `1024x1024` (or 128x128 for optimization)
- Click **New Image**

[![Click Plus New](photos/Click%20Plus%20New%20in%20the%20UV%20Editor.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/cabdb4ca2908aa790e03597aad248f0f74f29e48/docs/meshes-materials-import/photos/Click%20Plus%20New%20in%20the%20UV%20Editor.png)

[![New Image Settings](photos/BBall_BR%201k%20New%20Image.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/cabdb4ca2908aa790e03597aad248f0f74f29e48/docs/meshes-materials-import/photos/BBall_BR%201k%20New%20Image.png)

---

## Step 17: Bake the Diffuse Map
1. Switch to **Shading** workspace

[![Switch To Shader Editor](photos/Switch%20to%20Shading%20Workspace.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/edb27be61c2b4dbd24b3e62c9f736699fa82af44/docs/meshes-materials-import/photos/Switch%20to%20Shading%20Workspace.png)

2. In the Properties panel → Render tab (camera icon), change the Render Engine to Cycles.
   - **Baking** will not work in Eevee — you **must be in Cycles**

[![Cycles](photos/In%20the%20Properties%20Pannel%20switch%20Render%20Engine%20to%20Cycles.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/edb27be61c2b4dbd24b3e62c9f736699fa82af44/docs/meshes-materials-import/photos/In%20the%20Properties%20Pannel%20switch%20Render%20Engine%20to%20Cycles.png)

3. In the **Shader Editor**, confirm both materials (**Basketball** and **Grooves**) are still applied from the `Slot 1` drop down. If you see both materials on the ball, then they are applied
4. Add **Image Texture node** (`Shift + A → Texture → Image Texture`) → select `BBall_BR`

[![Add Image Texture Node](photos/Add%20Image%20Texture%20Node.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/edb27be61c2b4dbd24b3e62c9f736699fa82af44/docs/meshes-materials-import/photos/Add%20Image%20Texture%20Node.png)

[![Select BBall_BR PNG](photos/In%20the%20New%20Image%20Texture%20node%2C%20Select%20the%20BBall_BR%20image.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/edb27be61c2b4dbd24b3e62c9f736699fa82af44/docs/meshes-materials-import/photos/In%20the%20New%20Image%20Texture%20node%2C%20Select%20the%20BBall_BR%20image.png)

   - Important: You’ll need to do this for both materials
   - Use the **material dropdown** (top bar in the Shader Editor) to switch between **Basketball** and **Groove**
   - In each one, make sure the Image Texture node with **BBall_BR** is selected (the image panel will be lightly outlined in white)
   - This tells Blender where to bake the color information

[![Basketball Material Image Texture Added and Highlighted](photos/Basketball%20Material%20Image%20Texture%20Added%20and%20Highlighted.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/edb27be61c2b4dbd24b3e62c9f736699fa82af44/docs/meshes-materials-import/photos/Basketball%20Material%20Image%20Texture%20Added%20and%20Highlighted.png)

[![Grooves Material Image Texture Added and Highlighted](photos/Groves%20Material%20Image%20Texture%20Added%20and%20Highlighted.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/edb27be61c2b4dbd24b3e62c9f736699fa82af44/docs/meshes-materials-import/photos/Groves%20Material%20Image%20Texture%20Added%20and%20Highlighted.png)

5. In the **Render tab** → **Bake** section:
  - First, set **Bake Type** = **Diffuse**
  - Then, Under Contributions, uncheck **Direct** and **Indirect**, leaving only **Color** selected

[![Bake Settings](photos/Bake%20Settings%20Diffuse%20and%20Color%20Selected.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/9b3d9324dbcde4fcf7ae0e45af2dd0a06c7dd5ad/docs/meshes-materials-import/photos/Bake%20Settings%20Diffuse%20and%20Color%20Selected.png)

6. Click **Bake**

### Troubleshooting: Why Black/One Color?
- Ensure node is **active in both materials**  
- Node must be set to `BBall_BR`  
- Must be using **Cycles**, not Eevee

---

## Step 18: Save the Baked Texture
- UV Editor → **Image → Save As** → `BBall_BR.png`
- Save the image as **BBall_BR.png** in a folder you’ll remember

[![Save Baked Image](photos/Save%20the%20Baked%20Texture.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/9b3d9324dbcde4fcf7ae0e45af2dd0a06c7dd5ad/docs/meshes-materials-import/photos/Save%20the%20Baked%20Texture.png)

---

## Step 19: Replace Materials with Baked Texture
To make the model clean and Horizon-ready, we’ll swap the multiple materials for one single baked material
- Switch to Layout workspace  
- In the **Material tab**, remove the old Basketball and Grooves materials (click the **minus icon**)

[![Old Basketball and Grooves Materials Removed](photos/Basketball%20and%20Grooves%20Materials%20Removed.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/d5069bc260d69ae2b982f3e5aab3ed1be0d84f81/docs/meshes-materials-import/photos/Basketball%20and%20Grooves%20Materials%20Removed.png)

- Click **+ New** to create a new material → name `BBall`

[![New Material BBall Added](photos/New%20Material%20Named%20BBall.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/2a187054ee457d12f8ab7032dc5a10639e6eedcb/docs/meshes-materials-import/photos/New%20Material%20Named%20BBall.png)

- In the Shader Editor, click the yellow dot next to Base Color and add an **Image Texture node**

[![Click the Yellow Dot Next to Base Color and Add an Image Texure Node](photos/Click%20the%20Yellow%20Dot%20Next%20to%20Base%20Color%20and%20Add%20an%20Image%20Texture%20Node.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/2a187054ee457d12f8ab7032dc5a10639e6eedcb/docs/meshes-materials-import/photos/Click%20the%20Yellow%20Dot%20Next%20to%20Base%20Color%20and%20Add%20an%20Image%20Texture%20Node.png)

- Open the **BBall_BR.png** you saved

[![Open BBall PNG You Saved](photos/Open%20BBall_BR.png%20You%20Saved.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/5db17c92abdf78c576931598511d05bb6683c1f9/docs/meshes-materials-import/photos/Open%20BBall_BR.png%20You%20Saved.png)

- Click **Open Image** to connect the **Image Texture** to the **Base Color** of the Principled BSDF

---

## Step 20: Export as FBX
- `File → Export → FBX (.fbx)`  
- Name `Basketball.fbx`  
- Click **Export FBX**

---

## Step 21: Import into Horizon Worlds
- Open Horizon Worlds Desktop Editor and go into the world you want to add the Basketball into
- Assets → **+ Add New → 3D Model**  
- Import `Basketball.fbx` and `BBall_BR.png`
- Uncheck **Preserve Offset Pivots** 

[![Import FBX and PNG](photos/Adding%203D%20Model%20files%20to%20Horizon%20Worlds%20With%20Preserve%20Offset%20Pivots%20Unselected.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/3a347105141e5592034ce6776eafa44518848fc5/docs/meshes-materials-import/photos/Adding%203D%20Model%20files%20to%20Horizon%20Worlds%20With%20Preserve%20Offset%20Pivots%20Unselected.png)

- Press **Import**
- Once imported, drag the basketball into your scene. Adjust it to your liking and have fun! Great Job!

[![Drag Basketball Into Your Scene](photos/Basketball%20Imported%20into%20Horizon%20Worlds%20Desktop%20Editor.png)](https://github.com/Laex05/vidyuu-worlds-documentation/blob/3a347105141e5592034ce6776eafa44518848fc5/docs/meshes-materials-import/photos/Basketball%20Imported%20into%20Horizon%20Worlds%20Desktop%20Editor.png)

---

## Note
Baking down to one texture keeps models **lightweight** and reduces **draw calls**.
