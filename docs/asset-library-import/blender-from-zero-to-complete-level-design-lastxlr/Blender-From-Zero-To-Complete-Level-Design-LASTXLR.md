**From Absolute Zero to a Complete Level Design | Tutorial for Blender**

In this tutorial, we’re going to create a simple map for your Horizon World while also learning the essential Blender tools and navigation basics. By the end, you’ll know how to build a cute house, add an environment around it, and prepare your model for export into the Horizon Worlds Desktop Editor. So, basically, you will create a whole level design from 0.

Before we start modeling, it’s important to learn the essential hotkeys and navigation. These are the commands you will use constantly and some of these we’re going to practice in this tutorial.

**Viewport navigation:**

- **Rotate view:** Middle Mouse Button  

- **Pan view:** Shift + MMB  

- **Zoom:** Scroll Wheel / Ctrl + Middle Mouse Button

- **Front/Top/Side view:** Numpad 1/7/3 

**General:**

- **Undo:** Ctrl + Z  

- **Redo:** Ctrl + Shift + Z  

- **Search operator:** F3  

- **Hide selected:** H  

- **Unhide all:** Alt + H

**Selection & Objects:**

- **Select:** Right Click / Left Click

- **Lasso select:** Ctrl + Shift + LMB  

- **Select all / deselect all:** A  

- **Invert selection:** Ctrl + I

**Object Mode Transform:**

- **Grab/Move:** G  

- **Rotate:** R  

- **Scale:** S  

- **Confirm:** Enter / LMB  

- **Cancel:** Esc / RMB  

- **Duplicate:** Shift + D  

- **Delete:** X / Delete

**Edit Mode:**

- **Extrude:** E  

- **Loop cut:** Ctrl + R  

- **Knife tool:** K  

- **Bevel:** Ctrl + B

**Blender Modes**

Blender has different modes depending on the type of editing you want to do.

**Object Mode:** Add, move, rotate, scale, and duplicate objects.

**Edit Mode:** Modify the geometry of objects (polygons, vertices, edges).  

When you start a new project, Blender usually gives you a default cube in the center of the scene. You can use this cube as the starting point of your house or delete it and create a new object.

**Press Tab** (or **F2** if your keymap is set that way) to switch between **Object Mode** and **Edit Mode**. You can also change the mode manually from the dropdown menu in the upper-left corner of the viewport.

Now let’s make a house for our map.

Press **Shift + A** -> **Mesh** \-> **Cube** to create a new **Cube**.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-1.jpg)

This is going to be the base of our house.

**Press S** to scale the cube and also you can use **X, Y, or Z** after pressing **S** to scale only along that axis. Press **Left Mouse Button** to accept the desired scale. Alternatively, you can use the **Scale Tool** in the toolbar on the left side of the viewport and change the scale in the desired direction.

Enter the **Edit mode** where you can edit the polygons and modify the object's shape.

Press **F2** to enter the Edit mode or **\[Tab\]** to switch between **Object** and **Edit** mode.

You can always change it manually in the **Upper Left Corner** of the viewport.

In the **Edit Mode** add a cut in the middle of your cube to create a roof base, because you need to modify the cube shape additionally.

**Press Ctrl + R** to add a **Loop Cut** in the middle of a cube. The yellow line is previewing where the cut is going to be, you can change the location of it by moving the mouse. To accept the cut simply press **Left Mouse Button.**

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-3.jpg)

When you edit the object you can switch between selecting **Vertexes**, **Edges** and **Faces** in the **Upper Left Corner** of the Viewport.

Select **Edges** and select the middle cut on top of the cube. Using the move tool from the **Left Bar** in the viewport by **pressing G** and **choosing the Z** axis drag the edge a bit upper to create a house shape.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-4.jpg)

**Choose Faces** and select two top faces in the place where the roof is supposed to be.

**Press P** and choose **Selection** to separate these faces into a new object.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-5.jpg)

In the **Upper Right Corner** you can find a new object under your main cube.

Double click on this object and rename it to **Roof**.

Go to an **Object mode** by pressing **\[Tab\]** select the Roof.

**Press S** and then **Y** to scale it a bit within the Y axis.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-7.jpg)

Go back to the **Edit mode \[Tab\].**

Select the Roof faces.

To create a roof thickness we’re going to use the **Extrude tool**. Extrusion tool is extending your selected model part by creating new vertices, while keeping the new geometry connected with the original vertices.

**Press E** and move the mouse up the extrude. Left Mouse Button to accept the desired roof thickness.

You can decorate the roof using the **Inset tool** for example. Inset tool offsets edges inward on a mesh.

Select the Upper Faces again, **Press I** and move the mouse to inset. **Press the Left Mouse button** to accept.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-9.jpg)

Use **Extrude tool \[E\]** and move the mouse down to add some extra thickness to our roof.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-10.jpg)

Select the side roof edge and extrude it to the side to continue the roof.

In the Down Left Corner you can choose the offset of the desired extrude, so you can do the same on the other side of the roof if you’d like to have symmetrical parts.

**Add Door and Windows**

From a simple **Cube** create Doors and from cylinder create Windows using the scale tool.

Switch between **Frontal, Top and Right Orthographic views** and putting the objects on the walls of the house.

**Press 1** to access the **Frontal Orthographic view.**

**Press 3** to access the **Right Orthographic View.**

**Press 7** to access the **Top Orthographic View.**

Inset and extrude the frontal faces of the door and the window to create a frame for these.

Create an inner frame for a window from **Cubes**, You can create one and duplicate it with **Shift + D** and **Left Mouse Button** to accept. Rotate 90 degrees by rotating holding **Ctrl.**

Add any desirable decoration for your house, such as the chimney, borders, more windows and rooms and other parts of the house using all the same tools.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-14.jpg)

**Part 2: UV Unwrapping for the house**

Since we’re working on a model with multiple elements in it, it would be much easier to have one texture map to import to **Worlds Desktop Editor**. Do not do this with the entire scene and if your model has only one material you can skip this step as well.

In the **Scene Collection** in the **Right Upper Corner** of the viewport there’s a list of all your objects. Make sure there are only objects related to your house and delete **Camera** and **Light** objects if needed.

In the **Object** mode **press A** or in the list select all objects by pressing **Shift.**

In the viewport click **Right Mouse Button** and select Join or press **Ctrl + J.**

Now you have one house model.

In the **Upper Center Menu** select **UV Editing.**

There will be a second window with a UV map of the house.

In the **Right viewport** window **press \[Tab\]** to change the mode to Editing. Make sure the whole house is selected or **press A.**

**Press U** -> **Unwrap** -> **Smart UV Project** -> **Unwrap.**

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-16.jpg)

In the left window you can see that the UV map has changed and it’s now applied to the whole house.

**Part 3: Texturing**

Let’s create some basic textures for the house and export them.

Go to the modeling menu selecting it in the upper central menu.

Change mode to **Object mode.**

**Press Z** for Shading setting and select **Material Preview** to be able to see the materials in the viewport.

In the **Object Mode** select the Roof object.

Go to the **Right Down Menu** with different options and find a red sphere icon called **Materials.**

Here will be stored all your assigned materials.

**Press New t**o create a New Material.

**Double click the Material** to rename it to Base.

Change the color of the material in the **Base Color** section.

Now let’s create a second material by pressing the small **“+”** button next to the **Materials list.** Then **click New**. **Rename** the material to “Roof” and change the color.

In the viewport go to **Edit mode \[Tab\]** and select the Top Roof faces and **click Assign** under the materials list. Now you have assigned the second material to the roof only.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-17.jpg)

Continue assigning materials to other parts of the house you would like to paint differently.

Create/Delete the materials in the Object mode and assign them in Edit mode.

**Baking materials to a texture**

To import the colors you created to **Worlds Desktop Editor** you need to create a texture map that will contain all the color information from your model.

Go to the **Shading** from the **Upper Center menu.**

The window with your model and a shader editor will be opened.

In the shader editor press **Shift + A** -> **Texture** -> **Image Texture** and place it next to the **Principled BSDF node.**

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-18.jpg)

In the created **Image Texture** node **press New** and set the name of the texture to **“House_BR”**

In Meta Horizon you name the textures for **PBR** materials with a suffix **\_BR** so the material combines the **base color** - B; and **roughness** - R.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-19.jpg)

Now **Select** the **Image texture** node and copy it with **Ctrl+C** or **Right Mouse Button** -> **Copy**.

Go to the **Material list** in the Upper Shader Editor menu and choose a second material you created.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-20.jpg)

In the new shader editor paste the node with **Ctrl+V** or **Right Mouse Button** -> **Paste**.

Continue this for all you assigned to the house object materials.

Go back to the Base material selected in the **Shader editor.**

In the **Right Corner** of the viewport find the icon **Render** and set the **Render engine** to **Cycles**.

Cycles is the type of engine that will be used to preview your textures.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-21.jpg)

Go down in the setting and under the **Bake tab** set the **Bake type** to **Diffuse** as only this channel will be used in Worlds Desktop Editor.

Under the **Influence** uncheck **Direct** and **Inderect** to prevent light information from baking since Meta Horizon will use its own lightning.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-22.jpg)

Under the **Bake tab** click **Bake**.

When your texture is rendered, go to the menu where the texture is displayed and click the **Hamburger Menu button** \-> **Image** \-> **Save as** with the name **House_BR** to your project folder.

**Part 5: Preparing the model for export**

**Important:** before exporting the model make sure there’s a material with the same name as the texture without the \_BR in the naming.

In our case there were several materials used to get the different color information. Alternatively you can use only one material with one solid color or use custom painted textures in one material.

To export your house model with only one material you can simply delete all the materials that were used in Object mode in the material tab and create one material called “House” that will be assigned to the whole house model. To preview the texture that was baked, create an Image Texture node in the Shading and assign a created House_BR texture to it instead of creating a new one and connect Color to Base Color of Principled BSDF.

**Exporting the model**

In Object mode select the house model.

Go to **File** \-> **Export** \-> **FBX**

Check **Limits** \-> **Selected Objects.**

Save the model with the name **House** to your project folder with a texture **House_BR** that was already saved.

**Part 6:Import model to Worlds Desktop Editor**

Open Worlds Desktop Editor.

Go to **Asset library** -> **My Assets.**

Click **Add New** -> **3D model.**

To upload your model click **Choose files on your device.**

**Important:** Select Both your 3D model **House** and texture map **House_BR.**

**Click Open** and wait for a while.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-H1.PNG)

To make sure everything works correct there should be a notification “Success! All Assets Imported”.

Click and drag your Assets to the scene.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-H2.PNG)

**Part 8: Creating the Environment**

Now let’s add an environment around the house.

**Landscape**

- Press **Shift + A → Mesh → Plane**.  

- Scale it to the desired size for your ground.  

- Assign a material (e.g., brown/green for dirt or grass).  

- Move your house so it sits properly on the ground.  

**Walls or Fences**

- Add cubes, scale them into long thin walls, and place them around the edge of your level.  

- Assign a matching material.  

**Nature Elements**

- **Trees:** Create a cylinder (trunk) and an icosphere (leaves). Place the sphere on top of the cylinder. Apply brown to the trunk, green to the leaves.  

- **Rocks:** Create isospheres, scale them irregularly, and assign grey or brown materials.  

**Extra Houses**

- Duplicate your house with **Shift + D** and move/scale them for variety.  

**Roads**

- Create long thin cubes and connect the houses.  

- Assign a grey or dark material to make them look like roads or paths.

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-Neighborhood.PNG)

![alt text](https://github.com/lastxlr/MHCPTutorial/blob/37ef25853869efa47ca2c57f43282dc5a7cc9e9e/docs/asset-library-import/blender-from-zero-to-complete-level-design-lastxlr/images/BFZTCLDL-img-Neighborhood-2.PNG)

Bake the textures, optimize the naming and the materials before exporting and then export the level, import it to Worlds Desktop Editor and build your game!
