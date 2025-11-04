# From Concept Art 🎨 to Stunning 3D Game Assets 🎮

> [!IMPORTANT]  
> The final FBX file shown in this tutorial and the PNG texture are available in this repository in case you want to import them into Horizon World. Both files are named **stylizedweapon.fbx** and **stylizedweaponcolor.png**.

> [!NOTE]
> If you want to paint the model using your creativity, it is available in the repository under the name **stylizedweapon ready for painting.blend**

# Introduction

In the realm of game development and digital content creation, transforming a creative idea into a functional and visually striking 3D asset is a critical skill that can elevate your projects to a professional level. This tutorial will guide you step-by-step through the entire process of creating a 3D weapon, starting from a simple concept sketch to its final integration into a Horizon World Desktop Editor. Whether you're a beginner in 3D modeling or an experienced creator looking to streamline your workflow, you'll learn practical techniques and accessible tools to bring your visions to life. We’ll use industry-standard software like Blender for modeling, texturing and paiting and finally import the result into the Horizon World Desktop Editor, Meta’s platform for building immersive metaverse experiences. Get ready to unleash your creativity and craft assets that not only look stunning but are also optimized for games and virtual environments.

This repository was created to show a tutorial on how to create a 3D model in Blender from a reference image, to which texture painting is applied manually. It can then be imported into the Horizon World Desktop Editor in FBX format to be used as part of any virtual world you want to develop. 

# ⚙️ Requirements
✔️ Blender 2.93

✔️ Horizon World Desktop Editor

✔️Reference image that will be used to create our 3D model available in the repository.

# The stated Learning Objectives for this tutorial are:
✔️ Learn to model in 3D space using a background image without prior pencil and paper drawing skills.

✔️ Use the cube that appears in Blender as a guide to create the different pieces that appear in the reference image.

✔️ Learn to select vertices, add new cuts, and move them using the keyboard to cover the parts that appear in the reference image.

✔️ Eliminate all faces, vertices, and sides that are not necessarily visible to reduce the number of triangles in our final model.

✔️ Implement texturing techniques using UV Wrapping before applying it to our 3D model.

✔️ Use the different brushes included in Blender using the Texture Paint option.

✔️ Export our 3D model from Blender and import it into Horizon Word to see the final result of our work.

### 💡 TIPS

Consider that working with Blender can be a challenging task, however, let me tell you a trick to help you progress more quickly in creating your own 3D model: one hand on the keyboard and one hand on the mouse. This is because Blender works with keyboard shortcuts to implement different techniques that will be used extensively throughout this tutorial. You'll find that some shortcuts are applied repeatedly, allowing you to gradually memorize them and feel more comfortable with the work environment.

## Default Workspaces

Blender’s default startup shows the “Layout” workspace in the main area. This workspace is a general workspace to preview your scene and contains the following Editors:

* 3D Viewport on top left.
* Outliner on top right.
* Properties on bottom right.
* Timeline on bottom left.

<img width="1442" height="767" alt="Blender Interface" src="https://github.com/user-attachments/assets/0da645b4-38c3-4db6-a0b8-50c9a08fd474" />

# 📖 First Part.

Once we're in Blender, we find the image we'll use as a reference and drag it into Blender's workspace. It will look like this:

<img width="1413" height="719" alt="ImportingImageReference" src="https://github.com/user-attachments/assets/5f930766-d0e2-4ed7-8305-249a17aab45c" />

Once we have our reference image loaded in Blender, we need to adjust our camera view so that we have our reference in orthogonal projection. Because the way it appears referenced when we move the mouse scroll button, we can lose sight of the reference image. To avoid this, we must do the following: **Alt + G**. Our reference image will look like this:

<img width="958" height="504" alt="RelocatingImageBackground" src="https://github.com/user-attachments/assets/573013ea-402a-459e-9604-69d5ad3c39cd" />

Now that you have the reference image positioned, we need to put it in a two-dimensional projection view. To do this, go to the Transform panel on the right and look for the **Rotation** option. You'll notice some values ​​appear, and we'll set them to **0**.

<img width="769" height="354" alt="Reposition" src="https://github.com/user-attachments/assets/c9e0f06a-ecb3-4744-9212-60859c825896" />

<img width="711" height="349" alt="RotationReference" src="https://github.com/user-attachments/assets/57452ae2-2558-45e3-9ed5-015c043d30e3" />

Then having the previous image we press the key combination **R + X + 90** (this means that we want to rotate the image 90 degrees on the X axis) and we will obtain the following result.

<img width="1539" height="796" alt="FinalRotationReference" src="https://github.com/user-attachments/assets/733339fe-c36d-46da-bd5f-067be47d6f03" />

Once we have the previous result, we press the number 1 on our numpad to center our orthographic perspective and then go to **Wireframe mode**, which allows us to change our cube that appears in the image from being visibly solid to having it in Wireframe form. To do this, we go to the top of our work window and click on the icon in the following image.

<img width="691" height="779" alt="WireframeMode" src="https://github.com/user-attachments/assets/49b3538f-5e35-4ddc-93d8-053dbf847595" />

And we can see how the cube changes. This step allows us to model any 3D object from a reference image we have as a background. Then, we press **S** (to scale the cube) and then press **G** (to grab the cube) and position it as shown in the following image:

<img width="1236" height="499" alt="ChangingCube" src="https://github.com/user-attachments/assets/b96f0462-bd40-4d88-a2f6-eb5cc981f3c4" />

Next, press **Tab** to enter cube editing mode and move the vertices of our cube as close as possible to each part of our model. For this step, it's important to select both vertices of our cube, as shown in the following image. To select both vertices, left-click with the mouse, and the cursor will change to the following.

<img width="1245" height="554" alt="CubeEdition" src="https://github.com/user-attachments/assets/c0ca4df4-a1de-462c-8856-e06f67ad76c9" />

Once we have positioned all our vertices, we will have the following result.

<img width="991" height="487" alt="FirstApproach" src="https://github.com/user-attachments/assets/0672bcb9-a46e-4c2b-a909-5c3a0d836687" />

As you can see, we need more vertices to complete our entire model. So, we'll use the **Ctrl + R** key combination and position ourselves over our cube. We'll notice a new cut has been added, which we can place wherever we see fit to help us cover our entire model. We repeat this step three times, and the final result will be as follows.

![Addingmorevertices](https://github.com/user-attachments/assets/1f2e4d17-2e5f-4d13-b6b4-cd0658de5711)

### 💡 TIPS: If after pressing Ctrl + R you move the mouse scroll you can add more cuts automatically without doing the procedure manually.

<img width="665" height="744" alt="AddingMoreVertices" src="https://github.com/user-attachments/assets/b0f3d936-8162-449e-8b80-9307db9a0d82" />

Next, we need to reposition the new vertices created in the previous step. To do this, while still in edit mode, press the **Tab key** to select each of the new vertices (both vertices must be selected for each new cut) and reposition them by pressing the **G key**, using our image background as a reference. The result should be as follows.

<img width="793" height="636" alt="RepositionVertices" src="https://github.com/user-attachments/assets/6d0caf1a-b321-4104-8f50-55fad9b2af98" />

### 💡 TIP: To reposition our working view if we've moved our model with the mouse's scroll key, simply press the 1 key on the numpad to return to our working position.

Now we'll proceed to cover the entire piece. To do this, we'll switch to solid mode and, while in edit mode, select the front face. Once we have it selected, press the **E key** (which means we're extruding outwards in this case) and then press **G** to reposition the vertices on the model. We'll repeat this step three times, and the result should be as follows.

### 💡 TIPS: If you want to reposition vertices without adding new ones to the model, select the vertices first, then press G twice to place them where you think they'll fit over your model. Finally, press Enter again. You'll see how the cursor changes in Blender.

Now we need to adjust how wide we want our model to be. To make it smaller, we'll scale it by pressing **S + Y** (scale along the Y axis only). The result should be as follows. Then, we'll press 1 again on the numpad to add new meshes to cover other parts of the model.

<img width="397" height="589" alt="PerspectiveYAxis" src="https://github.com/user-attachments/assets/9dd30168-1fcf-4319-8f89-cbfe21d82958" />

# 📖 Second Part.

If you've made it this far into the tutorial, Congratulations...!!! The way we've worked in this first part is how we'll cover the rest of the tutorial.
Now, let's add more graphic primitives to model the rest of the parts. In this second part, we'll add cylinders to cover the top of our 3D model. Press Tab to enter object mode, then press 1 on our numpad to change the view. Press **Shift + A** to go to the **Mesh option**, then look for **Cylinder**.

<img width="1020" height="631" alt="MoreElements" src="https://github.com/user-attachments/assets/4599da67-6ae6-44b1-8a35-6d84c691515c" />

Now we need to change the number of vertices our cylinder will have. To do this, go to the **Add Cylinder** tab (located in the lower left corner of our workspace) and change the number **from 32 vertices to 12 vertices**. As shown in the following image.

<img width="1013" height="617" alt="AddCylinder" src="https://github.com/user-attachments/assets/5ea3b25e-1344-44ef-981c-6153a3acd826" />

And then we scale it by pressing the **S key** and then we rotate it on the Y axis using the key combination **R + Y + 90** and then we scale it using **S + X** (scale on the X axis) until it covers the entire cylindrical part of our model. The result should be the following.

<img width="951" height="479" alt="RotatingCylinder" src="https://github.com/user-attachments/assets/8a39bbcc-4fab-4aaa-8f8a-5c4f057a1b17" />

Now we're going to change the view so we can adjust the cylinder to our reference image. To do this, we'll press the **Toggle X-ray option**, which basically allows us to see our reference for better repositioning of our cylinder.

<img width="796" height="638" alt="ToggleXRay" src="https://github.com/user-attachments/assets/9ac7ec2f-2030-4ac2-938e-15980a20e514" />

Once we have it activated, we then add a new cut with the combination **Crtl + R** twice in our cylinder and the result would be the following.

<img width="746" height="341" alt="AddingCut" src="https://github.com/user-attachments/assets/859e894a-e929-49c6-8a7d-d65fa2f04642" />

As we can see in the image, we have two "rings" that are part of the piece we're modeling. So, let's add four more new cuts using the Ctrl + R combination, and the final result will be as follows:

<img width="1118" height="506" alt="AddingMoreCutCylinder" src="https://github.com/user-attachments/assets/f86959ba-69cf-4319-9596-39bf18626b35" />

Now we will proceed to create the front part of our 3D model. First we will select all the end vertices of our cylinder that are located on the right. Then, we will repeat the **E + S** combination several times to cover each one of the front part. First we select **E** to extrude and then press **S** to scale the vertices and with the mouse we move the cursor outwards. Then we press **E + X** again (we extrude and move along the X axis) until we reach the end of the first shape in the reference image. Then we repeat the previous step again to cover the second shape. And when we are at the end, we just press **E + X** we reach the end and then with the **S key** we locate the vertices. And finally we just apply **E + X** to have the final edge of our model. The final result will be the following:

<img width="986" height="561" alt="ExtrudingParts" src="https://github.com/user-attachments/assets/b2866219-61e2-4e89-9037-03f5d9ecab27" />

Great that you've finished this second part of the modeling. Now let's move on to the telescopic sight for our weapon. And the best part is that we can repeat some of the steps we used earlier. Next, let's place a cylinder (**Shift + A, select the Mesh option, then select Cylinder**) and rotate it 90 degrees along the Y axis. Then, scale the model and apply some cuts. The first result we'll get is the following:

<img width="651" height="295" alt="Telescopic" src="https://github.com/user-attachments/assets/e8a4b04a-466a-411e-9aef-06d70214f266" />

For the rear of the scope, we'll select all the vertices at the end. Then we'll proceed with the I combination to move the vertices inwards. Then we press **E** to extrude along the **X** axis, then we press **E + S** again until we reach the end of our scope.

<img width="1328" height="354" alt="MoreTelescopic" src="https://github.com/user-attachments/assets/22a53afa-585f-42d7-be62-117793e38548" />

Now we're going to model the back of our reference image. We need to move the cursor to the center of our workspace. To do this, we'll use the **Shift + Right Click** key combination in the area where we want to add a new cube. Then, we'll use the **Shift + A** key combination, select Mesh, and look for the Cube option. Next, we'll locate the cube and scale it so that it covers the back. To do this, we'll need to extrude it again with E and then move it over our reference image.

<img width="766" height="719" alt="BackPiece" src="https://github.com/user-attachments/assets/a8a88524-fd67-4dd5-a87f-2c0fd3d589a5" />

### 💡 TIPS: To select multiple vertices of the same face without selecting other vertices, you can press the C key and when you have all the vertices selected, just press the Esc key.

Then we proceed to finish fine-tuning the details of our telescopic sight that is in the model. For this, we will select the first cut with the key combination **Shift + Left Click** and observe how the entire area is selected. Then we apply **E + S + Shift + X** (this allows us to extrude and scale only on the X axis so that other parts of the model are not altered). We repeat this step for the other cut of our model that we have present in the reference image. It is important to note that we have to be in Edit Mode. Then for the part of the lens that is in the sight, we select all the vertices then press **I** (Insert), then extrude outwards and then apply **I** (Insert) again. We also repeat the process for the final part of the telescopic sight. With the peculiarity that we have to extrude inwards

<img width="1061" height="796" alt="FinishingSeveralPieces" src="https://github.com/user-attachments/assets/41e27993-7cda-4abd-a392-25c7598722a2" />

Now we'll complete the rest of our model's piece above the trigger. To do this, we'll select the last vertices located to the right of the piece we were working on previously and repeat the extrusion, scaling, and positioning processes on our reference image. The result will be as follows:

<img width="777" height="620" alt="BackPieceandBody" src="https://github.com/user-attachments/assets/7b19d450-0056-42e6-a62c-807b3684690b" />

For the area where the trigger is, we'll add two cubes to cover the entire area. The final result will be as follows.

<img width="862" height="312" alt="Trigger" src="https://github.com/user-attachments/assets/71c217bc-a752-4ab8-94e3-1f8d229803f8" />

Now for the hammer part that activates once the trigger is pressed, we'll use another cube. The procedure for this piece is basically the same as the one we used previously. So the final result would be as follows.

<img width="552" height="318" alt="Hammer" src="https://github.com/user-attachments/assets/5b9f43af-17c7-4d8f-9a83-f63f31b5e43b" />

If we review our model after completing all these steps, we can see that we will have something like the following.

<img width="1090" height="291" alt="ReviewofModel" src="https://github.com/user-attachments/assets/910b02b3-23b7-4d79-b293-c903984fa0ff" />

Now we're going to refine the model a little further. To do this, we're going to use a modifier called Mirror. Basically, what it does is copy everything modified on one side of the model exactly to the other side, providing a kind of symmetry that allows us to have a uniform model. We select the first piece we modeled at the beginning of this tutorial and apply the Mirror modifier to it by selecting the Y axis. Next, we need to implement a cut along the model because we're going to remove one side so the modifier can work without any problems.

<img width="1361" height="380" alt="MirrorModifier" src="https://github.com/user-attachments/assets/376da74a-a086-43a6-8aad-8b94c94d9f60" />

The side we have selected is the one left after removing the other faces. What you see next to it is the Mirror modifier implemented. **Don't forget to select the "Clipping" option within the modifier so that when you move the vertices, they don't separate**.

<img width="1405" height="449" alt="Clipping" src="https://github.com/user-attachments/assets/07c5671b-f796-45eb-8089-15084a8b5477" />

For the backend, we're going to implement a different method than the one we used previously. So, we'll go to the Edit option, then go to Preferences and the Add-ons tab. Enter the word Auto in the search bar and select the Mesh Auto Mirror option with a check mark. This will help us speed up the process of applying the Mirror modification. Then, we'll position ourselves between the two windows where the primitives we're adding to our project are located and the window of our work area until we get the vertical menu. We'll look for the Edit option and enter the values ​​that appear in the image. Finally, we'll click on the AutoMirror option. To enable this side menu, we can press the N key on the keyboard.

<img width="1399" height="679" alt="Addon" src="https://github.com/user-attachments/assets/6519b052-bb09-4f6b-bed9-f3816cc6b0ee" />

And to check the changes in our model, something like this should appear.

<img width="1182" height="508" alt="CheckAddon" src="https://github.com/user-attachments/assets/ffdb8af5-d2f0-48d7-970d-7cee85395776" />

Now we're going to avoid overlapping vertices in our model. To do this, we'll need to remove certain parts that aren't necessary or visible. The **Knife tool** (pressing the K key) will help us with this. For example, we'll remove the faces of the part that houses the trigger guard and another element of the trigger, as shown in the following image:

<img width="993" height="757" alt="KnifeTool" src="https://github.com/user-attachments/assets/c04859e2-0ae8-4205-9893-55749a7fbccd" />

Before proceeding with **joining all of our model pieces**, we need to finalize by confirming that we want to apply the **Mirror modifier to our pieces**. We select the piece of our model and apply the modifier. After confirming the application of our modifier, we now proceed to join all of our pieces. To do this, we first select them and then apply the keyboard combination **Ctrl + J. Notice which pieces are highlighted in red in the following figure and how a uniform orange line is then placed**.

<img width="1248" height="747" alt="ConfirmingMirrorModifier" src="https://github.com/user-attachments/assets/3c55e129-d7c5-4d73-a609-b309f25769fd" />

Now we'll apply AutoMirror to all the pieces we joined in the previous step. This will help us copy the UV textures from one side of the model to the other and achieve a more uniform look. The final result of applying AutoMirror is as follows.

<img width="1061" height="308" alt="AutoMirror" src="https://github.com/user-attachments/assets/f7b15afa-c967-4980-8dd4-46df83ef419c" />

Next, we'll use a term called Retopology to get a better silhouette of the model. Using the Knife (pressing the K key in edit mode), we'll draw new vertices along the contour of our model. This will help us eliminate all the areas we don't need for our model.

<img width="584" height="231" alt="Retopology" src="https://github.com/user-attachments/assets/b83523b9-0933-4b64-867a-c4bcc9036431" />

Now if we **left click + L** in edit mode on our longest piece we will get the following:

<img width="691" height="478" alt="MainBody" src="https://github.com/user-attachments/assets/c4e50504-1c3b-4131-82bc-f81ae2b5402a" />

Then we press **Shift + H** (to temporarily hide all the pieces we don't want to be displayed in our workspace) and **Alt + H** (to display the pieces we previously hid). We then proceed to select all the faces we created previously when we used the Knife tool. This gives us the following result:

<img width="1189" height="219" alt="RemovingFaces" src="https://github.com/user-attachments/assets/46d77011-3dac-4050-a241-542a3a85e906" />

Now we're going to repeat the process to cut out another piece of our model. To do this, we'll use the Knife tool again (pressing the K key in edit mode). Press L to select the entire piece we're working on, then Shift + H (to hide the rest of the pieces we don't need at the moment) and proceed to select all the faces that won't be visible or necessary for our model.

<img width="1209" height="632" alt="RemovingMoreFaces" src="https://github.com/user-attachments/assets/c0adb73c-9d88-442e-82ed-89cde5bb68b8" />

Now we can view the hidden pieces with **Alt + H**, and we'll notice a space between the two models we've been working on. To join the vertices of both models, we have to activate the **Snap (Magnet Icon) + Vertex** option. Then, we select one of the vertices and, using the G key, join the vertices between the two models.

<img width="388" height="475" alt="SnapOption" src="https://github.com/user-attachments/assets/d3f73e93-0872-47fd-a89a-f23c7384028a" />

We then repeat the same process with the rear, removing anything that can't be seen and is therefore unnecessary for our model. This also includes the mounts for our telescopic sight.

<img width="755" height="439" alt="BackFaces" src="https://github.com/user-attachments/assets/1faea455-8b7f-4071-b68c-e16ae99cea11" />

After finishing the process of removing all the faces we don't need from our model, we'll move on to the Unwrapping part in Blender to apply Texture Painting. Before applying the texture, we need to make sure that our model has uniform Scale values. Therefore, we press **Ctrl + A** and then apply Scale and we'll notice how the values ​​change in the menu going from **0.061 to 1.000** for the **X, Y, and Z axes**. We repeat this process also for the 3 elements that are not yet attached to the rest of the model.

<img width="492" height="338" alt="ScaleAdjustment" src="https://github.com/user-attachments/assets/a1c2bd75-d605-4e7b-831c-119be6922c32" />

<img width="685" height="746" alt="ScaleAdjustment1" src="https://github.com/user-attachments/assets/bb7552ea-06eb-4460-a68b-fe44d9845bed" />

Next, we need to adjust the vertices to prevent them from overlapping. If we're in edit mode, we select all the vertices, and we'll get the following result. To correct this, we press **U (Unwrap)** and then select the **Smart UV Project** option. For **Island Margin**, we set the value to **0.010**, and the result will be as follows.

<img width="872" height="830" alt="UVProject" src="https://github.com/user-attachments/assets/ec60bd8c-c9a9-4f20-8545-4951cfe416de" />

Now we'll proceed to mark our model to segment the areas where we want to apply different colors or textures. To do this, we mark only the edge area as shown in the image. Press **Ctrl + E** and select the option that says **Mark Sim**. The result of doing this is a red outlined line.

<img width="988" height="741" alt="MarkSim" src="https://github.com/user-attachments/assets/9d4e5ac6-48e4-4405-ae81-2c42ff0b3482" />

# 📖 Third Part.

In this third part of our tutorial, after we've finished marking our model, we'll proceed to see how to add the texture. To do this, in the UV Editing window, we add a new color and select the Color Grid option.

<img width="582" height="529" alt="UVEditing" src="https://github.com/user-attachments/assets/8b65c0dc-d7a2-49c2-adf2-c0fcfe3ed2ef" />

In the top window, we switch to **Shader Editor mode** and, using the **Ctrl + A** combination, look for the option that says Image Texture. Then, we select the option that says **Untitledxxx** and connect the connector to see the final result.

<img width="1263" height="795" alt="ImageTextureandColorGrid" src="https://github.com/user-attachments/assets/96470264-84d2-4441-aa3c-43213344e624" />

<img width="1245" height="782" alt="ImageTextureandColorGrid1" src="https://github.com/user-attachments/assets/120b1e4b-48a5-453e-b2ac-76cced020afc" />

Now we'll proceed to create a new material for our texture. To do so, we'll enter the following values, as shown in the image.

<img width="1333" height="359" alt="NewTextureMaterial" src="https://github.com/user-attachments/assets/887dc784-af5b-4527-8a4d-2c5c459b6964" />

Next, we add an Image Texture to our editor at the top of our UV window, and make sure to select the image we previously created. In our case, we named it stylizedweapon. The result will be as follows.

<img width="740" height="490" alt="ImageTexture" src="https://github.com/user-attachments/assets/d615b68d-a57f-4f6d-9f7b-506c12e4d696" />

Then, at the top of our menu, select **Texture Paint**. A new window will open, and we'll always keep the Shader Editor option at the top.

<img width="697" height="815" alt="TexturePaint" src="https://github.com/user-attachments/assets/0e66e20d-5ca3-4ff3-a36c-7344d2990b10" />

Then, in Edit Mode, we make sure to select the entire front of our model. Then, we switch to Texture Paint and select the icon next to the name called Paint Mask. We select the Fill option and choose a color (in our case, red). We'll notice that the front part we selected previously is the only one that appears with the selected color.

<img width="1204" height="813" alt="PaintMask" src="https://github.com/user-attachments/assets/6f83a0da-1ee6-40de-babd-098e083c3515" />

But to add details like those shown in our reference image, we must separate the pieces of our model that have the same color. That's why we switch to Layout view and then select the areas that share the same color. Once we have them selected, we press the P key and choose the Separate by selection option.

<img width="1244" height="615" alt="SeparationPart" src="https://github.com/user-attachments/assets/76b036dc-5541-48ae-ba3e-59cc29e9d034" />

And so we do with the rest of the pieces in our model, separating all those that have the same color according to our reference image. Once we have all our pieces separated, we proceed to paint each one. To do this, we go to the Texture Paint option and proceed to implement the colors by selecting each of the pieces. It's important to mention that for each piece we're going to paint, we have to deselect the Paint Mask option. We add the selected color by going to the Color Palette option, which is located below our chosen color.

<img width="1241" height="644" alt="ColorPalette" src="https://github.com/user-attachments/assets/59858758-6b6e-4507-b279-6b86dd167c35" />

Then, for each of the pieces we repeat the process, keeping in mind that we must keep in mind which pieces have the same colors in common.

<img width="1331" height="682" alt="MoreColorPalette" src="https://github.com/user-attachments/assets/7540572a-5ab7-4549-96d3-d585ff65c92f" />

To select each piece and apply color, use the Ctrl + Tab key combination, and a menu will appear. Then, we switch from object mode to texture paint mode and can begin applying the colors we want. It's important to mention that before applying the color we choose, or if we want to select it from the color palette we already have saved, we must disable the Paint Mask option. Otherwise, the color won't be applied.

<img width="1335" height="612" alt="MenuOption" src="https://github.com/user-attachments/assets/1221f60a-3068-4571-9d97-fc8774bccb35" />

Repeat the previous step and apply the desired color to each piece until the entire model is completely covered. It's important to note that if you save the model, the image will not be saved with the texture color you're applying. To prevent this from happening, you must also save the image separately. To confirm that the image has not been saved, an asterisk appears next to the image name (as indicated by the arrow in the following image). Therefore, we must save the image.

<img width="1084" height="803" alt="SavingTextureandFile" src="https://github.com/user-attachments/assets/fe6e477f-58f8-496d-8b7d-e8d4048cf251" />

Next, we select all the components of our model, right-click, and select Shade Smooth. We'll notice how the surface of our model has become a little more stylized.

<img width="928" height="412" alt="ShadeSmooth" src="https://github.com/user-attachments/assets/352212c6-8d93-4c0a-bfd4-7ae906812c28" />

To start painting, simply switch to Texture Paint mode, select the **Draw** option, and choose a few colors. Then, begin drawing several horizontal lines over the first piece of wood. Keep in mind that the brush size can be changed by pressing the F key, and you'll end up with something like this.

<img width="418" height="447" alt="DrawOption" src="https://github.com/user-attachments/assets/fc69205f-ae7e-46bc-9930-355645842324" />

Now let's add some shading where the models meet. We'll change our Brush mode in the **Brush Settings** panel and choose the Multiply option. Then, you can start implementing different brush styles and adding the different effects you want for your 3D model.

<img width="1287" height="843" alt="BrushSettings" src="https://github.com/user-attachments/assets/3b293481-885d-411b-884e-a50f75c92e40" />

Now we're going to proceed to paint the rest of the parts of our 3D model. This time, we're going to join the three parts that have the same color in common (in our case, it would be yellow). To do this, we have to be in Object Mode. Then, we press Crtl + J to join them. In this last part, it basically involves applying the different types of Brushes that Blender has available. And when we're satisfied with the final results, we proceed to join all the parts of our model. In our case, we left it as follows.

<img width="787" height="775" alt="FinalResult" src="https://github.com/user-attachments/assets/37c788ff-b16c-479b-93df-28ec19565e06" />

Finally, we need to export our model in .fbx format and then import it into Horizon World Desktop Editor. To do this, go to File, select Export, and then select FBX. Choose the path where you want to save it and click OK.

<img width="1334" height="684" alt="ExportModel" src="https://github.com/user-attachments/assets/3e16d82d-e62e-43eb-b0b4-ee19540e88c6" />

# 📖 Fourth Part.

## 💪 Importing our model into Horizon World Desktop Editor

In this new section, we'll cover how to import our model created in Blender into Horizon World Editor. First, we launch the Horizon World Desktop Editor program. Then, we have the option to create a new world or enter a previously created world. Once we're in our world, under the Asset Library tab, we select the option that says My Assets. Then, we choose the folder where we want to upload our model and then click where it says Add New. We choose the 3D Model option and search for the model that we exported in the previous step from Blender. Once we have located the model, we click on the option that says Import. And we will be able to see our model imported successfully into our folder. Now, we repeat the previous step in the option that says Add New, but this time we select the option that says Texture. We locate where we have the file saved on our computer and proceed to import it. Both the model and the texture should be imported successfully.

Now we just drag and drop our model into the scene of the world we're designing. Once we have the model incorporated into the scene, we select it and, using the Properties panel, we search for the Texture Asset option. We look for the one we previously imported and we'll notice that our model will be applied with its respective texture. Yay! We've managed to create our model, starting from "From Concept Art to Stunning 3D Game Assets."

<img width="1116" height="801" alt="ImportingModelandTextureHWDE" src="https://github.com/user-attachments/assets/1828c0c4-2da4-4e51-b547-ffd9e4457e7b" />

<img width="863" height="753" alt="ImportingIntoHWDE" src="https://github.com/user-attachments/assets/20cad7d5-424b-4626-b7a2-016fa0ff55b1" />

<img width="858" height="789" alt="BlendervsHWDE" src="https://github.com/user-attachments/assets/6aeec482-d1f6-4eab-bfde-9245309988a9" />

## 🎥 Video.

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/onJ7YzRH4bc/0.jpg)](https://www.youtube.com/watch?v=onJ7YzRH4bc)

# 👏 Conclusion

As we have observed, a reference image was used to create a 3D model without prior knowledge. The possibilities with Blender are endless, as its graphics engine offers a wide range of tools that can be applied to various use cases, such as video games, animations, cinematics, modeling, sculpting, and more. On the other hand, the progress made in Horizon World is fascinating, with new tools continuously integrated into the platform, enabling the creation of stunning applications. These advancements allow users from different parts of the world to actively and concurrently participate in virtual worlds of various genres. By following this tutorial, you can unlock your creative potential and bring your ideas to life in Horizon World. Dive in, experiment, and join a global community of creators building immersive experiences that push the boundaries of imagination. Start creating today and shape the future of virtual worlds!

### Contributors

* @dochavez
* @julioacuna28
