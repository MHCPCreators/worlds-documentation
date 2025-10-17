# Creating Stylized, Low-Poly Plants
In this guide, I'm going to go over the method I've learned for creating stylized, low-poly, and game-ready plants and foliage. This article assumes that you have some pre-existing knowledge of textures, 3D, and the Horizon Worlds Desktop Editor.

We'll start with design and conceptualization, moving on to creating a texture atlas, then creating a mesh and UVs, and finally, implementation into the Meta Horizon Worlds environment using the Desktop Editor. I will be using Blender for all 3D-related creation, and then 2D texture creation is split between Photoshop, and a mobile painting app called Sketchbook. 

<img width="693" height="343" alt="Completed Plant" src="https://github.com/user-attachments/assets/acc50d3d-d93c-444c-a7cc-84b600df96db" />

# Summary

This article is quite long, and so if you are already well-versed in 3D and are just curious about the workflow, here's a quick summary:

**Step 1** - Find, gather, or create references - even if it’s just a vague idea of the plant you want. 
- Decide on what unique parts your plant will need: leaves, flowers, stems, berries, buds, etc. Break it down into the main elements you’ll use to build the plant - think modularly! We’re going to assemble this plant like building blocks.

**Step 2** - Create, paint, or otherwise gather your textures from whatever source you are using. 
- Yes, we’re creating textures before we even have a mesh or UV map! Make sure you include a texture for each element of your plant, as decided in step one. For whatever the most common component of your plant is, I suggest having at least 2 different variants of it to help make the plant look more natural. (For example, different shapes or hues/values of leaves.)

**Step 3** - Create The Base Mesh Parts.
- Create a plane and drop your texture onto it, in a 1:1 proportion so that it’s displayed with no distortion. Use the knife tool to cut out each flat element (leaves, petals, etc) of the texture. Continue using the knife tool to create appropriate topology for each leaf in order to prevent n-gons or other awkward triangulation later on.

**Step 4** - Shape Individual Components.
- Adjust the shape of each component of your plant that you cut out in the last step. Curl the petals, bend the leaves, etc - you want each component to look naturally deformed by growth patterns and gravity.

**Step 5** - Arrange Components.
- Start duplicating components and placing them around in order to build the plant. Think like building blocks - stem here, add a leaf here, put a flower here, etc. Make sure to use the different variations that you made in step 2. You can then create further variations by individually editing components to adjust shapes, sizes, angles, etc. I suggest using proportional editing to quickly and efficiently cause things like leaves and stems to bend, curl, or arc in slightly different ways.

**Step 6** - Create LODs once the base plant has been created.
- If you’re a stickler for topology, you can manually reduce your mesh by removing edge loops and such. A decimate modifier can also work perfectly fine in many (most) cases.

**Step 7** - Import your assets into Worlds Desktop Editor. Don’t forget to set up your LODs!

---

# Full Guide

## Concept & Planning
The first thing we’re going to cover is figuring out what style and design your plant should have. Does your world crave the graceful, creeping tendrils of a plant that feels dark and malevolent? Or perhaps the cheerfulness of bright colors and rounded shapes are more appropriate for your world!

I personally like to draw out some basic ideas using just a solid color to explore the shape and silhouette. These don’t have to be anything particularly detailed or spectacular at this point - just a general idea! If your world already has some kind of visual design language being used, this is a great opportunity to expand on that!

<img width="720" height="416" alt="Concept Sketches" src="https://github.com/user-attachments/assets/2daff30f-9ba3-4d92-84a3-1187ea23f6c1" />

Consider things like: mood and vibe, color palette, and where and how often the plant is going to be used in your world. Is it a unique asset, or do you want to reuse it around the world? This will help you decide on what size and shape your plant should be.

Intended placement is key! If your plant is destined to go in a corner, nestled against some rocks, growing along a cliffside, etc, these factors are important to know so that you can design the plant to minimize clipping through surrounding assets. 
<img width="720" height="416" alt="Visualizing Placement" src="https://github.com/user-attachments/assets/54eee2ec-0d75-4730-8636-5251ccabbdc5" />

## References
Once you know the general type of plant you intend to make, it’s time to find some reference! I’m going to look for references based on color and shape. I’ll be using the very first shape above as my intended plant, and I want something that’s themed for a darker color palette - enchanted, maybe magical? 

With a quick search for “dark plants,” I was able to easily pull together several images that fit the mood of the plant I want to make: 

<img width="720" height="416" alt="Dark Plants Moodboard" src="https://github.com/user-attachments/assets/f30ba28b-5d54-4ba8-8fd4-5a4a58f8bedf" />

## Textures

Because plants are organic shapes that can be a beast to UV unwrap after the meshes have already been shaped and duplicated many times, I find it is usually easier to work in “reverse order” with plants. This means we are going to *start* with creating a texture first, and then create the mesh to fit it afterwards. 

Since we’re creating a stylized asset, I am going to hand-paint my textures. The exact steps I am following will vary between different software and device pairings, so I’ll be showing this process as a progression rather than literal specific instruction. 

If you want to try to follow along, I suggest using a tablet with a pen stylus that supports pressure sensitivity. A pen tablet (such as a Wacom) connected to your computer and a program like Photoshop would be the standard, but any device/app that you can draw on and get the results onto your computer will work. I am using a Samsung Galaxy Tab with the Sketchbook app, and transferring my images to my computer via Google Drive. 

### Texture Size

Make sure to create your textures at a reasonable size. If your plant is a large centerpiece in the middle of a lobby, then you can justify using a larger, more detailed texture versus if it were a small background decor item. 

For stylized assets, I find that using a texel density of 1x1 meter in the 3D world equals 256x256 pixels of texture space usually works well. I usually work at 1024x1024 to ensure that I have enough room to add details, and then shrink the size after the texture is finished.

Your textures **must** be some power of 2. The most common dimensions for a lightweight web/mobile platform like Horizon Worlds will be 256, 512, and 1024. Texture size impacts load times, travel times, etc, so you want to try to use the smallest texture size you can while still maintaining visual quality. 

### Identifying Needed Components

The first step is to decide on how many unique parts and variations my final plant will need. You can think of this like a checklist: leaves, stems, flowers, etc. I suggest having at least 2 different leaf variations to avoid too much visual repetition - things like shape, size, and color can be varied slightly between them for a more natural appearance. 

I’ve decided that I’ll need **leaves**, **flower petals**, and **flower buds** as my main components. I have three variations of both leaf and flower petal, and a generic shape that I can use for the flower buds. The colors are just a starting point so that I can get basic shapes in, and refine the color palette as I add detail later.

<img width="256" height="256" alt="image" src="https://github.com/user-attachments/assets/6bc6ef39-19dc-4448-b74b-c3c4be922d4e" />

I’ve specifically not included any stems, as the stems for this type of plants very closely match the leaf, so I can just reuse areas of the leaf texture for that. On a plant where the stems are distinctly different, I’d include additional textures for those on here as well. (For example, something with woody stems like a bush or a tree.)

The next steps are to add in my base detailing:
* Simple shading and shadows
* Highlights and contours
* Central veins
* Overall color adjustment

<img width="1024" height="256" alt="image" src="https://github.com/user-attachments/assets/42ca8052-6266-4874-86d8-67cf368e39f0" />

My final detailing step is to add a contrasting border around the outer edge of the leaf:

<img width="256" height="256" alt="Final Texture" src="https://github.com/user-attachments/assets/106b594e-cff2-4f8f-b8d2-62f2348a9bcd" />

### Artistic & Design Notes
* For performance reasons, we will **not** use transparency. The overdraw caused by rendering transparency is very expensive to calculate, and according to the official Horizons documentation, should be avoided whenever possible.

* I've extended the color of the leaves and petals into the background. This serves two purposes:
  * Working with rough polygon shapes, this compensates for the fact that our leaves won't be a perfect match to the outline painted. If we cut a corner, literally, then the color appearing on the mesh will still match the texture.
  * The official Horizon documentation recommends 32 pixels of padding around UV shells to compensate for mipmapping.
 
* When painting values that represent light and shadow, using a layer blend mode like "overlay" or "multiply" with adjusted opacity can be helpful to ensure that all values on the texture are adjusted accordingly. Otherwise, value inconsistency can cause shadows and highlights to be visually misinterpreted as base color values rather than *adjustments* to those base color values.

In accordance with the Desktop Editor workflow, make sure that you’ve saved your texture with the “_BR” suffix and in PNG format. (For example, Plant_BR.png) Note that BR textures do not support traditional transparency, as the opacity is instead reserved for roughness. (Since we don't need transparency, this also allows for a simpler shader setup with fewer textures needed.)

## Adding Roughness

As mentioned above, the opacity of our _BR texture is going to be reserved for the roughness map. It would obviously be difficult to paint the transparency into the texture while creating it, so I suggest doing this as a separate step after the base colors are completed. 

I will be using Photoshop for this process in order to utilize layer masks and the curves editor.

The first thing to note is that a PNG image coming into or out of Photoshop does not support a traditional alpha channel, but rather, supports transparency directly within the pixels of the image itself. Utilizing a layer mask is the easiest way to access and edit this transparency with a value-based visualization.

Once the texture has been opened, click on the Mask button in the Layer panel to add a white layer mask. This white mask means the image is totally opaque, as it is to start with, or full rough once imported into Horizons.

<img width="131" height="139" alt="Layer Mask Button" src="https://github.com/user-attachments/assets/0eb8823e-079d-43d2-b2e7-b6a78f27a07f" />

In order to edit this layer mask, hold “Alt” and then click on it. This will change the current mode from editing the image layer to instead editing the layer mask.Remember this shortcut, as we’ll be using it a couple of times!

<img width="545" height="380" alt="Viewing Layer Mask" src="https://github.com/user-attachments/assets/7fb61a4f-c66d-45a0-879b-aac603bfd352" />

To get a starting point that more closely matches our texture and isn’t just a solid color, I’m going to open the Channel palette (Window > Channels) and click on one to view it. I'm choosing the green channel - sort of at random, but also because I want something that has good mid-range values to start with.

<img width="128" height="143" alt="Channel Panel" src="https://github.com/user-attachments/assets/bac7cad4-ac1e-463d-b87e-ce3b0ccc9ee7" />

Remember, brighter values mean higher roughness and less of a shine, and darker values will mean lower roughness, and more of a shine. I’m going to pick the green channel, as it has a good value separation between the different elements of the leaves. With the green channel active, I’m going to press Ctrl+A to select the entire channel, and then Ctrl+C to copy it.

Next, I’m going to alt+click back over to the layer mask, where I will Ctrl+V to paste the copied channel into the layer mask. If we simply left-click back on the main layer itself, we can see now that the image has taken on some transparency.

<img width="549" height="371" alt="Image with Transparency" src="https://github.com/user-attachments/assets/d422c11f-7243-4270-b904-4d27013fa206" />

Now to actually adjust these values to our liking. The first of which will be the flower petals: I don’t want those to have any shine, so I am simply going to fill in that area with white. This will remove any transparency from this area, and will later also tell Horizons that this area is to be matte and not have any shine. 

Next, I am going to open the Curves editor via Image > Adjustments > Curves. This will allow me to easily select and edit individual values of the image (i.e. the light parts, the dark parts) separately from each other. In the bottom left corner of the Curves editor, there is a hand icon with some arrows - click on this to enable the interactive curves adjustment mode.

<img width="80" height="68" alt="Interactive Toggle for Curves" src="https://github.com/user-attachments/assets/f9c2278f-e0ff-484b-8771-f58d6df0f434" />

Now with this active, I can simply click and drag on any area of the image, and the corresponding value on the curve histogram will adjust accordingly. 

The first thing I’m going to do is simply click once on a gray medium-value area to create an “anchor point” on the curve histogram - this will prevent this value range from changing, and make it easier to isolate the lights and darks for further adjustments.

<img width="490" height="265" alt="anchor point" src="https://github.com/user-attachments/assets/d8f3f7f0-598d-4788-808c-288e3f41ac6a" />

Here’s how I’ve adjusted the curve: brightening the middle veins of the leaf, darkening some of the middle areas, and then brightening some of the variegation, keeping in mind that darker values will equate to gloss and shine. 

<img width="719" height="365" alt="Edited Curves" src="https://github.com/user-attachments/assets/1d1935bc-0f9d-42da-b221-73c67873ee53" />

The last thing I’m going to do is brighten the entire mask. I want the shine to be fairly subtle, so I’m going to use Image > Adjustments > Brightness/Contrast and further adjust the entire image, which will ultimately lower the amount of shine displayed in Horizons. 

<img width="185" height="185" alt="Adjusted Layer Mask" src="https://github.com/user-attachments/assets/5ade839d-be46-4769-aa87-032ce588a8f1" />

If we switch back to the main color layer, we’ll see that it now looks like this, with odd transparency - exactly what we want! Save this image, making sure that it’s PNG format, and again, with the “_BR” suffix. I also suggest saving a copy of this file in your application's native format (for me, .PSD) so that it can easily be edited later. Since we're essentially just guessing at the roughness values currently, it's likely that this may need some corrections once we see how it's applied. 

<img width="192" height="192" alt="Final Image with Transparency" src="https://github.com/user-attachments/assets/103c86b7-6076-43d0-98cd-3cea4c2985bb" />

## Mesh Creation

Onto the fun part - creating the mesh! For this next part, I’ll be creating my mesh using Blender. (Any software that can export .FBX can be used, though.)

Upon opening Blender and being met with the default scene, remove it all by press “A” to select all, and then press “Delete” on your keyboard. 

To start, let’s add a plane. (“Shift+A” and then select Mesh > Plane.) With the plane selected (it should have an orange outline - if it doesn’t, simply left-click on it) open the Material tab. This is the red ball icon on the panel to the right side of the screen:

<img width="109" height="50" alt="material panel" src="https://github.com/user-attachments/assets/bb442369-5a8d-45f7-8e9b-a818f0b4c6e7" />

Here, click the big “New” button to add a new material. A single material entry will be added into the panel at the top, simply named “Material.” Click on the box underneath that panel where the name is displayed, and we’re going to rename it. Remember, this material name you are assigning in Blender MUST match the name of your texture in order for Horizons to process your assets correctly. Since my texture is saved as “Plant_BR.png,” I need to name my material “Plant” to match. (Simply remove the texture-type suffix, in this case “_BR” to find out what the material name needs to be.)

<img width="222" height="176" alt="Naming the Material" src="https://github.com/user-attachments/assets/440a2d48-5c19-4e00-b0e2-1cbc31c06749" />

Then down in the material settings, find the entry for “Base Color” and click on the yellow dot next to it. This will open a menu - we’re going to change the material so that the base color value will use a texture instead of only a color. Select “Image Texture” as the type.

<img width="466" height="239" alt="Importing a texture into the mateiral" src="https://github.com/user-attachments/assets/f6dfda03-6949-428b-a88c-40339c90a837" />

Underneath that Base Color property, after setting it to an Image Texture, you’ll now have the option to “Open” a texture. Click on the “Open” button and select the _BR texture we created earlier. 

We’re going to repeat that same thing for the “Roughness” value - click on the gray dot to the left of the entry, and change the type to “Texture Image.” Since we’ve already imported our image, we can simply click on the image thumbnail dropdown to the left of the “new” and “Open” buttons, and then select our BR texture to reuse it. Because the roughness channel is a single value, Blender will automatically know to use the alpha channel.
 
Now in order to see the texture on the mesh, we need to change material mode to display the texture. We’re going to change the rendering mode to “Material Preview.”

<img width="220" height="70" alt="material shading" src="https://github.com/user-attachments/assets/70fd9861-3f49-4a06-af54-01a79ef10a02" />

This will now allow you to see a mostly-accurate representation of how your asset will look in the Worlds Desktop Editor with roughness applied. Keep in mind that it will not be a perfect 1:1 match, because the two programs are using entirely different rendering engines - but it is extremely close. At this point, you may want (or have) to go back and make more edits to your alpha channel mask to correct the roughness as previously mentioned. 

now that we can see our texture, let’s start cutting out the leaves. I like to switch in to top-down view for this: press “7” on your keyboard number pad, or use the widget in the top right corner of the 3D view to click on the blue “Z” button to switch into top-down view. Make sure your mesh is selected (it should be outlined in orange) and press “Tab” to enter edit mode. (If you enter edit mode and your entire mesh turns orange, you can simply left-click off to the side of the mesh to deselect.)

We are going to use the knife tool, which can be activated by pressing "K." To create a cut, you simply left click on your mesh to place a vertex, and then click again somewhere else to place the next one, etc. If you hover near an existing edge or vertex, the knife will automatically snap to that point. Sometimes Blender will automatically add a connecting edge to a nearby vertices that will bisect some important part of the texture. Adding some basic cuts to separate the individual components will help prevent this. There is no right or wrong for this stage, you just want to cleanly separate each component without cutting other components in half.

<img width="304" height="329" alt="Using the knife tool to separate the leaves" src="https://github.com/user-attachments/assets/7385e98e-abf5-4dd6-864c-dea63231d77a" />

I’m going to repeat this, for each section of the texture. At this initial stage, I’m putting all of the flowers into one part, and then separating each of the leaves.

<img width="405" height="400" alt="more cuts" src="https://github.com/user-attachments/assets/dbd0559b-938e-418c-9689-5a9c218a0996" />

With these separating edges in place, press “3” on your number pad or otherwise select the “Face” select option in the toolbar at the top of the 3D viewport. Click on one of the sections to select it, and then press “P” to open the Separate menu, and choose the “Selection” option. This will extract the selected face and put it into its own object for easier editing. Do this for each section to separate them. (I’ve also moved them away from each other for easier visualization.)

<img width="312" height="276" alt="Separating The Textures" src="https://github.com/user-attachments/assets/7882ac22-b711-428d-afca-c07e6e96fe5b" />

Pick one of the parts, make sure you’re in edit mode, and press “K” to activate the knife tool again. This time, we’re going to trace the shape of the leaf as a whole. Keep in mind how many points you are placing, as you want to use as few as possible to ensure the final result is low-poly. You may also want to try to keep each side somewhat symmetrical in terms of how many points there are, but it's not strictly necessary.

The next step is a bit hard to explain, but it gets easier with practice as you see what kind of shapes do and do not work well once it comes time to form the leaf into a 3D shape: I am going to continue using the knife tool to connect all of the vertices that I created. My main concern is that I want the edges of the leaf to be able to curl up a bit from the middle seam, and that I want to be able to bend the leaf overall from top to bottom - so I’m placing these cuts in a manner that will allow that.

The first step is to create a middle seam down the middle. I'm placing a couple of vertices at midpoints alnog the way, which I then connect to the vertices along the outer edge.

<img width="1122" height="700" alt="Creating Leaf Topology with the Knife Tool" src="https://github.com/user-attachments/assets/fcd6a209-aff9-4c41-a3ec-53697bbe67e1" />

I am then going to select the “outside” faces around the leaf that I’ve cutout, and I will simply press “Delete” and choose “Faces” to remove them. I’m also going to separate each piece into a separate object to make it easier to work with. While still in Edit mode, press “A” to select all, press “P” to open the separation menu, and then choose “By Loose Parts.” Everything that isn’t physically connected will then be split into a separate object.

<img width="211" height="363" alt="Deleting Excess Faces" src="https://github.com/user-attachments/assets/6586c4d5-449d-4cd4-9f7d-654cf535254b" />

I will then repeat this process for each of the three leaves, and the flower petals, which will leave me with:

<img width="410" height="351" alt="Individual Plant Components" src="https://github.com/user-attachments/assets/8ba8cd91-ee22-448d-aebe-7af328ea69f1" />

We can now start shaping these into leaves! I’m not doing anything too drastic - I mostly want the centerline of the leaf to sit lower than the edges, and for the leaf to have an overall arc to it. 

---

### Tip!
When shaping the leaves, try turning on proportional editing by pressing the "O" key and then moving a vertice. You can adjust the falloff of the proportional edit with your mouse's scroll wheel, allowing for very quick-and-easy drastic shape/sihlouette changes!

---

If I view my leaves from the edge, now you’ll see how they are no longer flat - I’ve added enough shape variation to them so that they still appear to have some volume from any angle.

<img width="516" height="110" alt="Leaves After Shaping" src="https://github.com/user-attachments/assets/f128a2ff-4354-4c15-ac2a-819dea9c466f" />

To start actually building the plant, we’re going to need to attach these leaves to some stems, which have been mysteriously absent up until this point. To create a stem, I’m going to simply add a cylinder with 3 radial points to get, essentially, a long triangle. Keeping this long and narrow, once you apply smooth shading, you won’t even be able to tell that it’s not round. I'm adding a couple of edge loops using Ctrl+R, and then shaping the stem into a curve. For UVs, I'm going to keep the default cylinder UVs that Blender creates, and map the coordinates onto some part of the leaf texture that creates a slight shading variation from top to bottom.

<img width="357" height="256" alt="stem" src="https://github.com/user-attachments/assets/cc376479-7d86-4407-b4bf-cf561462d342" />

Now that we have a stem and leaves, let’s start assembling the base plant! I’m going to take one of the leaves, and duplicate it using Shift+D, and then move it up into place at the end of the stem. I’ve rotated it a bit so that it’s a bit more dynamic and not quite so flat and orderly. (Remember: plants are usually random!)

I’m going to duplicate the stem, and resize and rotate it a bit. I am then also going to duplicate another different leaf, and move it up into place at the end of the stem. Things are starting to come together!

<img width="225" height="251" alt="leaves on stems" src="https://github.com/user-attachments/assets/df86233d-6791-41af-9175-e8b8550fffb3" />

This is the core of actually creating the plant - it’s just a long cycle of repeating this process of duplicating the individual parts, and moving them into place - simple! After this point, the process is going to speed up a bit since I’m just randomly duplicating and placing the same assets over and over again.

I’m going to keep repeating this process of duplicating my stem and leaves, rotating around a central point until I’m happy with how the overall plant looks. 

<img width="288" height="237" alt="Completed Foliage" src="https://github.com/user-attachments/assets/e9258be7-b85e-4b2e-b378-347b0834b346" />

### Flowers

To create the flowers, it's pretty much the exact same process as the leaves. I'm going to use the knife tool to individually cut out the petals, shape them, and then arrange them into something that I think vaguely resembles a flower - I'm thinking maybe an orchid of some kind...

<img width="325" height="337" alt="Creating Flowers" src="https://github.com/user-attachments/assets/1a7556fe-cee6-4bec-8dc9-1517058a08d4" />

After putting the flower on a stem, I’m going to create a couple of duplicates, resized and rotated into different positions around the plant. I’ve also used the rounded portion of the flower texture to create a bud, just to add a bit of natural variety. 

<img width="319" height="283" alt="Final Plant" src="https://github.com/user-attachments/assets/adc9d814-a8bb-417e-a8ed-5817e788369a" />

## Backfaces

Now there’s one last thing we need to do in order to make this mesh game-ready: create backfaces. Polygons in 3D are single sided by default, and the Desktop Editor does not support double-sided rendering. This means we have to create the backside of the mesh ourselves. 

To do this, first ensure that your mesh is split into the individual parts that you used to create it. Whatever the components of your plant are, you want to be able to select only the parts that were made from flat planes. 

Make sure you are in Solid display mode, and then under the viewport shading settings, check the box for Backface Culling. You may also want to change the "Lighting" setting to MatCap (to see reoughness) and "Color" to Texture in order to see the base colors. 

<img width="138" height="294" alt="Editing Display Settings" src="https://github.com/user-attachments/assets/6f2ea545-906a-4a53-8682-4522c3040112" />

After enabling Backface Culling, you'll notice that a large portion of the plant will disappear:

<img width="285" height="207" alt="Backface Culling Enabled" src="https://github.com/user-attachments/assets/23645af2-0604-4a5a-96ac-9760eae6c3eb" />

Select all of the pieces that were originally cut out of the flat plane, and then go into edit mode. Select all with Ctrl+A, then duplicate with Shift+D. The duplicate will immediately attach to the cursor, which you can release by simply right-clicking - the duplicate will then snap back to its original location. 

Now to reverse the visibility of our duplicate, press Alt+N to open the Normals menu, and choose the “Flip” option. This will reverse the direction that the duplicated leaves are facing, meaning that they will now be visible from both sides once imported into the editor. 

---

Note: I personally prefer waiting until the end of the process, after the plant has been finished, before I add the backfaces. You could also create the backfaces as soon as you are done shaping the leaves, but then you’ll need to be extra observant to make sure that any further mesh adjustments you make don’t cause the front/back of the leaves to physically separate from each other. 

---

## Creating LODs (Levels of Detail)

The next step is to create LODs, or Levels of Detail. LODs are used to restrict how much detail is shown on an asset at any given time. With foliage in particular, there’s a pretty good chance that, the further away from that foliage asset you are, the more of them you’re going to be seeing at once - so it’s important to make sure they are optimized! 

How drastic your LODs need to be will depend on the triangle and vertex count of your starting mesh. The higher these values are, the more LODs you should create. Typically, most assets should have somewhere between 2-4 LODs. For an asset that is lower detail to start with, or for something that is physically quite small, you might only need “high” and “low” detail versions. I personally like having 3 LODs - high, medium, and low. For models with higher detail, you might want to even throw in a fourth level to help restrict the highest detail to only when the camera is particularly close to the item. 

<img width="1282" height="414" alt="LODs" src="https://github.com/user-attachments/assets/fbf4e5f2-2bd1-49e0-bf28-0a41c3a87511" />

To create our LODs, I’m simply going to use a decimate modifier within Blender. To start with, make sure you are in Object Mode, and select all of the parts of your plant and merge them together with Ctrl+J. Duplicate the model with Shift+D, and then for visibility purposes I am going to move mine off to the side along the X axis. 

With the duplicate selected, under the Modifier panel (the blue wrench icon), I am going to click on Add Modifier > Generate > Decimate. For the “Ratio” value, I am then going to set this to 0.5 - this will reduce the mesh by 50%. 

<img width="227" height="133" alt="Decimate Modifier" src="https://github.com/user-attachments/assets/5468c42e-bebe-4641-bf44-83c3f67c8c12" />

I am then going to duplicate the reduced version, and again, move it off to the side a bit so that I can now see all three models. 

For this third LOD, I am going to click and drag on the “Ratio” value to make it function as a slider - sliding it as low as I can get it before parts of my mesh start to physically disappear. Keep in mind that the lowest level of detail generally will not be seen up close, so it’s okay if shapes become slightly flattened or irregular - as long as there are no visible holes in the mesh, or parts don’t go missing entirely. For my mesh, this ended up being about 0.35, or 35% of the original mesh. 

---

If your mesh is particularly low-poly to begin with, some artists may utilize the 3-LOD scheme to divide the mesh evenly, lowering the first LOD to around 66% and then the lower LOD to 33% - each LOD being reduced by roughly 1/3rd since there are 3 of them. For a platform in which performance is a very important focus, another common but slightly more aggressive reduction scheme will target 50% for the first LOD and then 25% for the lowest LOD, or reducing each successive LOD by half. 

---

My original mesh was 1633 vertices and 1946 triangles. The medium LOD is 998 vertices and 972 triangles. The lowest LOD ended up at 762 vertices and 680 triangles. When viewed from a distance (as the LODs will be) there is very little visual difference - perfect!

One final thing to note: if you import meshes into Horizon Worlds with offsets enabled for placement purposes, you'll want to ensure that your meshes and their pivot points are all correctly aligned to match each other in order to prevent the item from jumping around as it switches between LODs. (Alternatively, if you don't need the offsets, just disable that when importing into Horizons.)

A final checklist:
- Make sure your mesh has an appropriately named material assigned
- Make sure that the name of your texture matches that material, and includes the "_BR" suffix.
- Each LOD has been exported to an FBX file, including materials, with an identifiable file name.

## Importing Into Worlds Desktop Editor

In the Worlds Desktop Editor, browse to the location in your asset library where you’d like to put your plant, and choose the Add New > 3D Model option. We’re going to select our BR texture, and **only the base model plant** - NOT the LODs yet. Once you add these into the import window, expand the arrow next your FBX mesh, and click the Add LODs button.

<img width="253" height="130" alt="Import Workflow to Add LODs" src="https://github.com/user-attachments/assets/42fa7dad-88fe-4488-80e8-96f6b04b096c" />

You *can* select multiple meshes, but the editor will assign LOD levels based on the order in which it reads the files, which may be incorrect. I suggest selecting one at a time, in order from higher to lower. In this example, I have two LODs. I will add the medium LOD first, and then the low LOD second. I have clearly named the files as Medium and Low so that I can identify them and verify that they are in the right order. This will then present you with something that looks like this:

<img width="248" height="125" alt="LOD setup" src="https://github.com/user-attachments/assets/e8c56aab-b3d7-4773-988b-5965c19bcb00" />

Double check that your LODs are in the correct order, with “LOD 0” being your main mesh, and then whatever the highest LOD number is should be the lowest detail mesh. 

In this window, we have to define the sizes at which we want our LODs to switch out. These are based on the percentage of screen size that the mesh is currently displaying at, and we are specifying the *bottom limit* for each LOD range. 

For a 3-LOD setup, some common values for a 3rd person view are:

| LOD Level     | Common Value Ranges     |
| ------------- |:-------------:|
| High - 0      | Around 0.3-0.5 (30%-50%)|
| Medium - 1    | Around 0.15-0.2 (15-20%)|
| Low - 2       | Around 0.01-0.02 (1-2%) |          

Keep in mind that how aggressive your LODs change will need to be balanced with how detailed your base assets are, and the type of camera rendering being used. 1st person views allow players to get significantly closer to items, allowing for higher transition points. In 3rd person views, the camera is generally always going to be further away from assets, and so a lower value range is more appropriate.

### LOD 2 - Low Detail
Let’s start with the lowest LOD. This value decides at which point the lowest LOD will start to be rendered. If the mesh is displayed at a size that is smaller than the value set for the lowest LOD, it will be culled from the scene entirely and will not be visible. Depending on the layout/design of your world, there are a couple of factors that go into what you should set this value as. 

If your world is “open” and you can see these assets from far away, you’ll want to make sure to use a low enough value that they don’t randomly disappear when they should otherwise still be visible. If your world is occluded in a way where you’ll only ever see this asset when you are up-close to it, then you might be able to use a higher value to increase performance a bit. I’m going to set the lowest LOD value to 0.015 - this translates to 1.5% of the screen. If displaying smaller than that, the mesh will simply disappear and will no longer render. 

### LOD 1 - Meidum Detail

For the medium LOD, I’m going to use a value of 0.2, or 20%. If the plant is displayed at a size larger than 20%, it will switch from the lowest LOD up to the medium LOD.

### LOD 0 - Main Mesh

Lastly, for the high LOD base mesh, I’m going to use a value of 0.4, or 40%. This means that my base mesh won’t be displayed until the player is close enough to the plant for it to occupy 40% of the screen. The highest LOD will continue to be displayed all of the way up to 100%. 

Note: Using a higher value here will be better for performance, but also keep in mind the player camera limitations. If you set the value *too* high, it may end up that your highest LOD will never be displayed if the asset is scaled or located in a way that prevents the player from being able to get the camera close enough to it. 

---

With all of these values in place, we’ve created a scale that determines which LOD is visible at any given time: 
- At screen sizes from 100% down to 40%, users will see the highest LOD. 
- From 40% down to 20%, users will see the medium LOD.
- From 20% down to 1.5%, users will see the lowest LOD.
- Anything smaller than 1.5% will cull the mesh and it will not be visible. 

Once you have these values set, let’s import our asset and see how it looks! As a reminder, each LOD can technically maintain its own offset! If your meshes each have different pivot points set in Blender, you may need to disable the option to preserve the offset during import. (Or, align mesh placement or update pivot points in Blender.)

Once you place your asset in the world, as you zoom in and out, it should change between the LODs. Ideally, this change should be seamless and you shouldn’t visibly notice much of anything at all. (In fact, you may have to change the view mode to wireframe in order to check if they are actually working!)

If your mesh moves, parts visibly disappear, or the silhouette drastically changes in a distracting and obvious manner, then you may want to either change the LOD settings for when the meshes are being swapped, and/or adjust how much reduction you have applied to each LOD mesh. 

## Final

<img width="236" height="231" alt="Plant Placed In World" src="https://github.com/user-attachments/assets/7ce0c133-91e3-4e13-9799-536be870a6bf" />

Here's our completed plant, ready to decorate the world!

---

If your asset needs to be changed or updated in any way:

At the time of writing, the Worlds Desktop Editor does NOT expose any of our shader/texture or LOD settings within the interface. If you need to edit any part of the asset, you must right-click on it from within the Asset Library and choose the “Replace” option. You will then have to reselect the base mesh and texture, then re-add your LOD meshes, and then re-enter the screen size percentages. Once you then re-import all of your assets, you can click on the item in the world, and a message will appear at the top of the Details panel prompting you to update the asset.

---
