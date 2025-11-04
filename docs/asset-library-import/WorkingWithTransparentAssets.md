<!-- The title of your document -->
# Working With Transparent Assets (Unlit Blend Method)

<!-- Put your name, at least your Horizon Name, as the author -->
Metacrafters and voytek.lorenc
<!-- IMPORTANT: Put the date this document was last updated! This is
important information for people to tell how 'stale' this info might 
be.-->
September 1st, 2025  

## Introduction

<!-- This section should describe what this document is going to cover. Try to provide some background and motivation as to why a creator would want to read your document. -->

This tutorial introduces a foundational workflow for importing semi-transparent assets into Horizon Worlds using the Unlit Blend method. As a case study, we will demonstrate the process by creating a sheer curtain and refining its transparency settings. We'll also discuss differences between Blend vs Transparent vs Masked material handling.

<img width="1150" height="388" alt="photo 1 - sheer curtain" src="https://github.com/user-attachments/assets/1aafb031-4009-409c-8d7a-7a26b125914c" />

### Prerequisites and Expectations

<!-- This section should indicate any expectations you have of your readers, such as other materials or concepts they should already be familiar with in order to get the most out of your document. -->

This beginner-level tutorial assumes a very basic familiarity with Adobe Photoshop, Blender, and the Horizon Worlds Desktop Editor.

### Document Organization

<!-- This s an optional section, but possibly useful if your document has unusual document structure, or needs a table of contents with internal links because it is very long. 

Note that github automatically creates a clickable Outline from your section headings. Make sure you properly 'nest' your headings by using ##, ###, ####, #####, etc for sub sections so that the outline has a good hierarchy and makes navigating your document easier. I recommend only using # for the initial title, as the font for H1 renders very large. -->

This document has three main parts, covering texture prep, model prep and importing. Additionally there is a reference section at the end. 

* [Topic One: Preparing Your Texture in Adobe Photoshop](#topic-one--preparing-your-texture-in-adobe-photoshop)
* [Topic Two: Preparing Your Textured Model in Blender](#topic-two--preparing-your-textured-model-in-blender)
* [Topic Three: Importing Your Model to Horizon Worlds](#topic-three-importing-your-model-to-horizon-worlds)
* [Step-By-Step Video Tutorial](#step-by-step-video-tutorial)
* [ADVANCED CONCEPTS: Blend vs Transparent vs Masked](#advanced-concepts--blend-vs-transparent-vs-masked)
* [References](#references)

## Topic One : Preparing Your Texture in Adobe Photoshop

We’ll start by creating a 2K (2048 x 2048 px) document in Adobe Photoshop.  

<img width="942" height="698" alt="create a new document" src="https://github.com/user-attachments/assets/331fc6a3-ec57-41a6-ac30-3da02f23a410" />


Add the image of your choice.  Here we pasted a photo of an actual curtain that we plan to recreate in 3D.  

<img width="1918" height="1254" alt="photoshop" src="https://github.com/user-attachments/assets/20d9ed97-4a28-41e1-9110-aceefe3e86ef" />


Using the Opacity Slider in the Layers Window, set the desired transparency value.  In practice you might need to come back to this step as you iterate on your asset.

<img width="774" height="674" alt="opacity" src="https://github.com/user-attachments/assets/9bc4f000-1b2d-4f9d-a096-06655db4870d" />


Export a transparent PNG file of your texture and name it MATERIAL_BA.png

File>Export>Export As>

<img width="1312" height="910" alt="export as" src="https://github.com/user-attachments/assets/027973ea-3ef9-4f44-9f45-54bb965c3b0c" />

Format: PNG
Transparency: Checked

<img width="1520" height="900" alt="export settings" src="https://github.com/user-attachments/assets/49d58f7a-bd58-4269-967f-f98634e150e9" />

<img width="966" height="324" alt="make sure to save the file as material underscore ba" src="https://github.com/user-attachments/assets/a6548fc7-251a-4ad9-add0-e0d4982a5158" />



## Topic Two : Preparing Your Textured Model in Blender

Open your 3d model in Blender.  

<img width="1546" height="988" alt="open your 3d model in blender" src="https://github.com/user-attachments/assets/18ae1e05-5666-4531-8bc7-29bc9de2ef65" />

Appropriate naming of the material is a crucial step of this workflow.  Make sure that your material is named MATERIAL_Blend

<img width="1232" height="678" alt="it is very important that you name your file MATERIAL underscore Blend" src="https://github.com/user-attachments/assets/9b60f74f-b97d-443a-b298-9445ca4357a4" />

Import MATERIAL_BA.png (created in the previous section) and connect it to Base Color in Principled BSDF

<img width="1608" height="784" alt="in the shader editor make sure that that material ba is connected" src="https://github.com/user-attachments/assets/d8ba8cab-403a-4188-a84c-67d214325d83" />

Using the UV Mapping tools assure that the material is placed on your 3d object appropriately. At this point the curtains will NOT appear transparent.  That is perfectly OK.

<img width="1586" height="1054" alt="make sure your models are UV mapped appropriately" src="https://github.com/user-attachments/assets/2e7ac15d-15e3-4ede-8fc1-7033f741d990" />



 
Select your object and go to File > Export > FBX

<img width="1676" height="1038" alt="select your objects and export as fbx" src="https://github.com/user-attachments/assets/8587e6c0-a2ab-4ec9-b699-f23ce3a23122" />

Here make sure to select Selected Objects, and Mesh

<img width="1634" height="874" alt="use these export settings when saving as an fbx" src="https://github.com/user-attachments/assets/015ad1d3-0789-4f5a-8f64-2b4c9e8cd9e3" />


We named our file curtain.fbx


## Topic Three: Importing Your Model to Horizon Worlds

Open the Horizon Worlds Desktop Editor, click on Asset Library, and navigate to My Assets.
Once you select the desired location click on “Add New” and choose 3D Model

<img width="1820" height="618" alt="in desktop editor go to asset library, add new and 3d model" src="https://github.com/user-attachments/assets/f60a98ad-ce09-4ebe-8a2f-1ed3ad4fbf53" />


In the Import Model(s) window, click on “+ Choose files on your device” and select the files you saved in TOPIC 1 and TOPIC 2: MATERIAL_BA.png and curtain.fbx

<img width="1110" height="968" alt="select the appropriate files to import" src="https://github.com/user-attachments/assets/c1e62282-aece-473a-afcd-b28322adbe31" />


Once the Desktop Editor finishes processing your asset, you should be ready to use it in your world.

<img width="1528" height="802" alt="curtains inside the horizon worlds desktop editors" src="https://github.com/user-attachments/assets/785af74e-b616-40a0-b846-85fb80eab5e0" />


If you are not satisfied with the transparency value, return to Step 1, adjust the opacity in Photoshop, and export a new version of MATERIAL_BA. Repeat this process as needed.

## Step-By-Step Video Tutorial

Click on the image to watch a step-by-step tutorial on YouTube
[![Watch the video](https://img.youtube.com/vi/37Z5I5g3Ing/0.jpg)](https://www.youtube.com/watch?v=37Z5I5g3Ing)


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
