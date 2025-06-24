---
title: 'Meta Horizon CMI & TypeScript API 2.0: Import Images & Add Texture Animation'
description: 'Meta Horizon CMI & TypeScript API 2.0: Import Images & Add Texture Animation'
tags:
  - horizon
  - creation
gk:
  - horizon_nda_creators
  - horizon_hur_creation_tools_ga_release_docs
  - horizon_second_party_studio_devs
  - horizon_developer_site_internal_only
last_updated: 2024-07-16
---

## Introduction

#### Creator Skill Level

All levels

#### Recommended Prerequisite Background Knowledge

No prior skills are necessary, but knowing a little about Blender and TypeScript will be helpful.

#### Description

Learn how to bring your virtual worlds to life using custom animations and visual effects. You'll discover how to create animated instruction boards, add custom VFX, and even make an animated fireplace! Your creativity is the only limit.

We will start with the basics, such as importing Custom Model Import (CMI) planes with image textures. Then, we will explore various texture options, including transparency methods and importing UIO textures for animation.

You'll also learn how to use two prewritten scripts to add animation and interactivity, even if you have no prior experience with Typescript.

#### Learning Objectives

By reading and reviewing this written guide you will be able to:

- [Import CMI](/learn/documentation/mhcp-program/community-tutorials/meta-horizon-cmi--typescript-api-20-import-images--add-texture-animation#image-imports) images with or without transparency.
- [Use and or write typescript code](/learn/documentation/mhcp-program/community-tutorials/meta-horizon-cmi--typescript-api-20-import-images--add-texture-animation#step-5--create-scripts) to create animated textures.
- [Billboard](/learn/documentation/mhcp-program/community-tutorials/meta-horizon-cmi--typescript-api-20-import-images--add-texture-animation#step-7--billboarding) an animated texture to create a unique 3D-like effect.

## Image Imports

When bringing in materials you are unfamiliar with, the cheat sheet below is a quick way to look up the naming conventions used for importing the most common material types.

If you are new to Custom Model Imports (CMI), don’t worry, we cover how these work in the next couple of sections. The long and short of it is that in Blender, the material must have a name that parallels the name of the texture PNG you upload with. A simple example would be a mesh, with a material named “MyTexture” in Blender, and uploaded with a PNG named “MyTexture_BR.png”

### Image Importing Cheat Sheet

- **Image.fbx** (Standard Image)
  - Upload with file named “Image_BR.png”
  - Named “Image” in Blender
- **Image.fbx** (Metal Image)
  - Upload with files named:
    - “Image_BR.png”
    - “Image_MEO.png”
  - Named “Image” in Blender
- **UnlitImage.fbx**
  - Upload with file named "Image_B.png"
  - Named “Image_Unlit” in Blender
- **UnlitBlendImage.fbx**
  - Upload with file named "Image_BA.png"
  - Named “Image_Blend” in Blender
- **TransparentImage.fbx**
  - Upload with files named:
    - “Image_BR.png”
    - “Image_MESA.png”
  - Named “Image_Transparent” in Blender
- **MaskedImage.fbx**
  - Upload with file named “Image_BA.png”
  - Named “Image_Masked” in Blender
- **UIOImage.fbx** (Animated Image)
  - Upload with file named "Image_BA.png"
  - Named “Image_UIO” in Blend

## Texture Swapping

If you are already familiar with CMI and Typescript, this brief summary shows you how to upload texture assets, which can be referenced from your Typescript “props” as PropTypes.Asset, and cast .as(TextureAsset).

Don’t worry if this is your first time, we will be diving deep into both of these topics throughout.

### How to Upload PNG Textures

At the time of writing (June 2024), uploading PNG textures can only be done through the Horizon Desktop Editor. The name of the image does not matter, but the image must be a PNG.

In the images below you can see screenshots of the Meta Horizon Worlds desktop editor. From the “Assets” tab you can click “Texture” and then in the right image, you can see that you are able to upload multiple PNG images. We recommend first creating a folder to upload and store these images, it is much harder to move them after they have been imported.

![22 Horizon - Select Folder Add New Texture.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_1.png)

![24 Horizon - Import All PNGs.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_2.png)


### How to Swap Textures

Here is a short example of how to swap textures, noting that this only works on CMI meshes uploaded with a UIO material/texture.

```typescript
const texture = this.props.texture.as(TextureAsset);

if (texture) {
this.entity.as(MeshEntity)?.setTexture(texture);
```

## Step 1: Creating FBX Files

In the first step, we will show how to create FBX files for standard, \_Masked, and \_UIO material types. The process is similar for \_Unlit, \_Blend, and \_Transparent.

Once you have opened Blender, select and delete all items.

![01 Blender - Delete Hierarchy.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_3.png)

Then we’ll create a mesh plane via Add>Mesh>Plane.

![02 Blender - Add Mesh Plane.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_4.png)

Next, with the plane selected, click the ‘red beach-ball-like’ material icon on the left. Then, click new.

After creating “Material.001," we can rename it “Image.”

![03 Blender - Material New.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_5.png) ![04 Blender - Rename Image.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_6.png)

This is a simple name, with no “\_” underscore, used for CMI FBX objects being imported into Horizon. Note that most any name can be used, but the PNG texture uploaded with the model must use that name plus “\_BR.” For instance, ours would be “Image_BR.png.” If your name in Blender has underscores, everything after the first underscore will be ignored by Horizon unless the underscore corresponds to a specific material type, ie. \_UIO, which we will see later in this step.

Next, we will export as FBX, via File>Export>FBX. Make sure to give it a good name, we will use “Image.fbx.”

![05 Blender - File Export FBX.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_7.png)

Now that we have created this simple plane, we can upload it as many times as we want to Horizon with individual PNG images named “Image_BR.” I recommend saving this in a folder to use whenever you want to import an image into Horizon. ![06 Blender - Save And Name FBX.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_8.png)

Back on the properties panel of our Plane, we are going to rename and export it two more times, one named “Image_Masked,” and another named “Image_UIO.”

Masked is used for images with solid areas of transparency (e.g., logos, icons, etc). UIO also uses masking, but allows the mesh to have the texture swapped in Horizon.

![07 Blender - Name Masked.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_9.png) ![09 Blender - Name UIO.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_10.png)

The exported names of these FBXs are not required to match, but I found that these names made a lot of sense for our use case. For \_Masked, I named the file “MaskedImage.fbx,” and for the UIO image I used “UIOImage.fbx.”

![Screenshot 2024-04-19 at 11.11.10 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_11.png)
![Screenshot 2024-04-19 at 11.11.21 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_12.png)

Similar to “Image.fbx” and its corresponding “Image_BR.png,” these can be used for any 2D image. If the image is not perfectly square, you will need to adjust by scaling the plane in Horizon.

Repeat this process for \_Unlit, \_Blend, and \_Transparent. I named my files “UnlitImage.fbx,” “UnlitBlendImage.fbx,” and “TransparentImage.fbx.”

### Various Material Types

In the image below you can see the various material types being applied to the same PNG fire image. For MEO and Transparent they need to be uploaded with a secondary file which will be seen and discussed in depth in Step 2.

What we can see from these images is that four material types support transparency and three do not.

![](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_13.png)

Here is a brief description of each material type:

#### Standard Image

- Basic texture, nothing special, and is easy to use.

#### MEO Image

- Using a secondary PNG, the RGB channels correspond to Metal, Emission, and Occlusion (MEO). Notice that if E & O are set to 0 the texture is not visible. Try playing with these values to get the exact look you are going for.

#### Unlit Image

- Light and shadows are not applied.

#### Unlit Blend Image

- Unlit, but supports transparency using the alpha channel of the PNG.

#### Transparent Image

- Using a secondary PNG the RGBA channels correspond to Metal, Emission, Specular, Alpha (MESA). This means you can get a metallic that is also partially transparent! It also means that you have to make sure the alpha channel correctly masks out your texture, in this case, it does not, hence the partially transparent square.

#### Masked Image

- Uses the alpha channel of the PNG to mask out the image. Note that this is masking, not transparency, partially transparent pixels will be dithered, meaning every other pixel will be opaque or clear. For real transparency use Unlit Blend or Transparent material types.

This is an example of dithering.

![pasted-image.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_14.png)

#### UIO Image:

- User Interface Optimized (UIO) images can be animated, meaning to have their textures swapped out. They are also rendered in more detail than the other texture types to perform better as user interfaces, ie. for use in high touch point areas.

#### Creating Secondary PNGs

Transparent and MEO images will need to be uploaded with a secondary PNG, named Image_MESA.png, or Image_MEO.png respectively. You can use a variety of tools to make these PNGs, we won’t be going deep on that subject in this Written Guide, but we will look at a simple example using Blender.

Start by opening the “Texture Paint” workspace:

![Screenshot 2024-04-19 at 8.53.37 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_15.png)

Then click “New” to create a new image, and from there select the Color property.

![Screenshot 2024-04-19 at 8.56.04 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_16.png) ![Screenshot 2024-04-19 at 8.56.47 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_17.png)

Then select RGB at the bottom, you can then type in the exact values you want for the MEO or MESA channels. In this case, I have set all channels to 50%.

![Screenshot 2024-04-19 at 8.57.03 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_18.png) ![Screenshot 2024-04-19 at 8.58.00 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_19.png)

Remember that RGB correlates to MEO. For example, red is how metallic, green is emission, and blue is occlusion, and the same is true for MESA.

| **RGBA** | **MEO**   | **MESA** |
| ---------- | ----------- | ---------- |
| Red      | Metal     | Metal    |
| Green    | Emission  | Emission |
| Blue     | Occlusion | Specular |
| Alpha    |           | Alpha    |

Next, to finish creating the image, we can click “OK” (in some versions of Blender the OK button has a different name). Then click Image>Save As> and save the image as either Image_MEO.png or Image_MESA.png depending on your intended use case. For practice, consider trying both.

![Screenshot 2024-04-19 at 8.58.28 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_20.png) ![Screenshot 2024-04-19 at 8.58.42 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_21.png)

![Screenshot 2024-04-19 at 8.59.39 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_22.png)

You have now created a secondary PNG, great work!

Sometimes when creating transparent images you don’t want them to be evenly transparent across the entire texture. In that case, you will want to consider using the “Erase Alpha” or “Add Alpha” brush tools.

You can adjust the radius and strength to determine how wide and how much of the alpha you want to erase. I erased three lines in the secondary image, using 100%, 50%, and 25% strength from left to right. Because the image was already half transparent, 100% and 50% had the same effect.

![Screenshot 2024-04-19 at 9.17.39 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_23.png) ![Screenshot 2024-04-19 at 9.20.46 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_24.png)

#### Mentor’s Note:

There are a large number of software options to choose from, but if you want to use Blender, consider opening the texture, painting over it, and then saving it as a new PNG. Here’s a brief example of one way you might do this while preserving transparency.

Start by opening the texture, then select the saturation brush effect tool. Then paint over your texture to make it all the same color without affecting the alpha channel.

![](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_25.png)
![Screenshot 2024-04-19 at 9.26.48 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_26.png)
![](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_27.png)

You can then select the dump bucket tool, and adjust the color RGB values to the MEO or MESA values you want to use. And change the color, and thus the MEO/MESA properties of the image. Then just save the image as before, ie. “Image_MEO.png” or “Image_MESA.png”

![](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_28.png)
![](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_29.png)
![](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_30.png)

## Step 2: Prepare PNGs

In this Written Guide, we only need the \_UIO FBX, which we exported as UIOImage.fbx. UIO textures need to be uploaded with a \_BA PNG, which we will need to name “Image_BA.png.”

![Screenshot 2024-04-19 at 11.06.55 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_31.png)

For other texture types, refer to the “Image Imports” section. Try uploading one of each of these to your asset library to familiarize yourself with the process and various texture types.

Then upload the UIOImage.fbx & Image_BA.png files together using either the Horizon desktop editor or from the web portal. From the web portal, press import, and then select the two files.

![Screenshot 2024-04-19 at 11.02.04 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_32.png) ![Screenshot 2024-04-19 at 11.01.05 AM.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_33.png)

You will also want to have a series of PNGs to animate. We will upload them in Step 3 using the Desktop Editor. Please note that at the time of writing (June 2024) PNG texture assets can only be uploaded using the Desktop Editor.

![23 Horizon - Add All PNGs.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_34.png)

### Desktop Editor Setup

For the best experience, we recommend creating a new world in the Desktop Editor as you follow along with this tutorial. Select “Custom Model Import,” and then click “Create.”

![13 Horizon - Create New World.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_35.png)

Once you have loaded in, at the bottom, select the “Assets” tab. Then click Add New>3D Model>. You can then select the two files, presuming you didn’t already use the web portal to import.

![14 Horizon - Assets Add New 3D Model.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_36.png)

**Pro Tip:** Create a folder first so that you can organize these files.

![21 Horizon - Create Folder.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_37.png)

## Step 3: Review Assets

Bring out all uploaded assets into your world to review that they look correct. Make sure to set the UIO Image in a notable spot as we will be using it for animation.

![Model Examples.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_38.png)

**Note:** You don’t need to do all of them, just the UIO is required, but you might find it helpful to test the other texture options.

From left to right in the image below: \_BR, \_Masked, \_UIO.

![16 Horizon - Drag Images Into World.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_39.png)

## Step 4: Animation PNGs

Similar to how we uploaded assets via the desktop editor on the previous page, we can also upload PNG texture assets.

Select “Texture” from the “Add New” drop-down, then select all of the PNG animation frames you wish to upload.

![22 Horizon - Select Folder Add New Texture.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_40.png) ![23 Horizon - Add All PNGs.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_41.png)

**Note:** The names of these images are not required, but it is recommended to name them in a way that makes it easy for you to identify the order in Horizon later.

Next, click Import. This will upload them into your selected folder. Unfortunately, they are not ordered when you upload in bulk like this, which is why naming is so important.

![24 Horizon - Import All PNGs.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_42.png) ![25 Horizon - Select UIO Object Attach AnimatedGIF Script.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_43.png)

### Typescript 2.0 Script Setup

We are using the Horizon Typescript 2.0 API, at the time of writing (June 2024), this is the default.

If your world is currently set to 1.0, or another version, you can change this from the script tab by clicking the gear icon and then Script Settings. There you will see the API Version drop-down and can select 2.0.0, then click Apply.

![](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_44.png)

### AnimatedGIF.ts

You can copy and paste this code into a new script, or download the code as a file by clicking [here](https://drive.google.com/file/d/1L2RWLL8h75ezou6xoWUApNjr-aaH-2_Z/view?usp=sharing). Then drag the Typescript file into the scripts folder (Scripts > Three Dot Icon > Open Scripts Folder).

```typescript
import { Asset, Component, MeshEntity, PropTypes, TextureAsset } from "horizon/core";

class AnimatedGIF extends Component<typeof AnimatedGIF> {

  static propsDefinition = {
    //Adjust the speedSeconds default here, or for each animation individually from the properties panel
    speedSeconds: { type: PropTypes.Number, default: 1 },
    texture0: { type: PropTypes.Asset },
    texture1: { type: PropTypes.Asset },
    texture2: { type: PropTypes.Asset },
    texture3: { type: PropTypes.Asset },
    texture4: { type: PropTypes.Asset },
    texture5: { type: PropTypes.Asset },
    texture6: { type: PropTypes.Asset },
    texture7: { type: PropTypes.Asset },
    texture8: { type: PropTypes.Asset },
    texture9: { type: PropTypes.Asset },
    texture10: { type: PropTypes.Asset },
    texture11: { type: PropTypes.Asset },
    texture12: { type: PropTypes.Asset },
    texture13: { type: PropTypes.Asset },
    texture14: { type: PropTypes.Asset },
    texture15: { type: PropTypes.Asset },
  };

  //create texture array, starting index of 0
  textures: TextureAsset[] = [];
  index = 0;

  //This value is set in start using this.props.speedSeconds
  delaySpeedMs = 0;

  start() {
    //Add Textures To Array In Correct Order (Skips Unassigned Values)
    this.addTextureToArray(this.props.texture0);
    this.addTextureToArray(this.props.texture1);
    this.addTextureToArray(this.props.texture2);
    this.addTextureToArray(this.props.texture3);
    this.addTextureToArray(this.props.texture4);
    this.addTextureToArray(this.props.texture5);
    this.addTextureToArray(this.props.texture6);
    this.addTextureToArray(this.props.texture7);
    this.addTextureToArray(this.props.texture8);
    this.addTextureToArray(this.props.texture9);
    this.addTextureToArray(this.props.texture10);
    this.addTextureToArray(this.props.texture11);
    this.addTextureToArray(this.props.texture12);
    this.addTextureToArray(this.props.texture13);
    this.addTextureToArray(this.props.texture14);
    this.addTextureToArray(this.props.texture15);

    //Value can be changed from the properties panel, maximum speed of 100x per second
    this.delaySpeedMs = Math.max(Math.floor(this.props.speedSeconds * 1000), 10);

    //Create meshEntity variable to make sure the script is attached to a MeshEntity
    const meshEntity = this.entity.as(MeshEntity);
if (meshEntity) {
      //Create looping event with setInterval
      this.async.setInterval(() => { this.loop(meshEntity); }, this.delaySpeedMs);
    }

    else {
      console.log('AnimatedGIF: meshEntity returned undefined (is the script attached to a UIO CMI MeshEntity?)');
    }
  }


  loop(meshEntity: MeshEntity) {
    meshEntity.setTexture(this.textures[this.index]);

    //update the index and loop back to 0 when reaching the length of the array
    this.index = (this.index + 1) % this.textures.length;

  }

  addTextureToArray(prop: Asset \| undefined) {
    if (prop) {
      this.textures.push(prop.as(TextureAsset));
    }
  }
}

Component.register(AnimatedGIF);
```

### TextureSwappingTrigger.ts

You can copy and paste this code into a new script, or download the code as a file by clicking [here](https://drive.google.com/file/d/1ZCo3ZCAAEOzGzJRaCRmtJ4lxLyoxSk8y/view?usp=sharing). Then drag the Typescript file into the scripts folder (Scripts > Three Dot Icon > Open Scripts Folder).

```typescript
import { Asset, CodeBlockEvents, Component, MeshEntity, Player, PropTypes, TextureAsset } from "horizon/core";

//This script is attached to a trigger gizmo
class TextureSwappingTrigger extends Component<typeof TextureSwappingTrigger> {

  static propsDefinition = {
    //Make sure to reference the UIO MeshEntity on the trigger's property panel
    uioEntity: { type: PropTypes.Entity },
    startingIndex: { type: PropTypes.Number, default: 0 },
    texture0: { type: PropTypes.Asset },
    texture1: { type: PropTypes.Asset },
    texture2: { type: PropTypes.Asset },
    texture3: { type: PropTypes.Asset },
    texture4: { type: PropTypes.Asset },
    texture5: { type: PropTypes.Asset },
    texture6: { type: PropTypes.Asset },
    texture7: { type: PropTypes.Asset },
    texture8: { type: PropTypes.Asset },
    texture9: { type: PropTypes.Asset },
    texture10: { type: PropTypes.Asset },
    texture11: { type: PropTypes.Asset },
    texture12: { type: PropTypes.Asset },
    texture13: { type: PropTypes.Asset },
    texture14: { type: PropTypes.Asset },
    texture15: { type: PropTypes.Asset },
  };

  //create texture array, starting index of 0 is assigned using this.props.startingIndex (adjust from props or on trigger property panel)
  textures: TextureAsset[] = [];
  index = 0;

  preStart() {
    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterTrigger, this.triggerEnter.bind(this));
  }

  start() {
    //Add Textures To Array In Correct Order (Skips Unassigned Values)
    this.addTextureToArray(this.props.texture0);
    this.addTextureToArray(this.props.texture1);
    this.addTextureToArray(this.props.texture2);
    this.addTextureToArray(this.props.texture3);
    this.addTextureToArray(this.props.texture4);
    this.addTextureToArray(this.props.texture5);
    this.addTextureToArray(this.props.texture6);
    this.addTextureToArray(this.props.texture7);
    this.addTextureToArray(this.props.texture8);
    this.addTextureToArray(this.props.texture9);
    this.addTextureToArray(this.props.texture10);
    this.addTextureToArray(this.props.texture11);
    this.addTextureToArray(this.props.texture12);
    this.addTextureToArray(this.props.texture13);
    this.addTextureToArray(this.props.texture14);
    this.addTextureToArray(this.props.texture15);

    //Update to default texture on world start (checks for out of index starting value, adjusting if necessary)
    this.index = this.props.startingIndex % this.textures.length;
    this.updateTexture();
  }

  triggerEnter(player: Player) {
    this.updateTexture();
  }

  updateTexture() {
    //Create meshEntity variable to make sure the script is referencing a MeshEntity
    const meshEntity = this.props.uioEntity?.as(MeshEntity);

    if (meshEntity) {
      meshEntity.setTexture(this.textures[this.index]);
    }
    else {
      console.log('TextureSwappingTrigger: meshEntity returned undefined (is the script referencing a UIO CMI MeshEntity?)');
    }

    //update the index and loop back to 0 when reaching the length of the array
    this.index = (this.index + 1) % this.textures.length;
  }

  addTextureToArray(prop: Asset \| undefined) {
    if (prop) {
      this.textures.push(prop.as(TextureAsset));
    }
  }
}

Component.register(TextureSwappingTrigger);
```

## Step 5: Create Scripts

If you have downloaded the files, you can open the scripts folder by clicking the three-dot icon next to the gear icon, and selecting “Open Scripts Folder.” You can then drag the download files into that folder. Alternatively, if you’d like to write the code, you can create two new scripts, one named “AnimatedGIF” and the other “TextureSwappingTrigger.”

You’ll then hover over the newly created script and on the right side click the three-dot icon to see the drop-down, allowing you to select “Open in External Editor.”

![18 Horizon - Create AnimatedGIF Script.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_45.png) ![19 Horizon - Open In External Editor.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_46.png)

From the external editor, you’ll be able to paste the scripts seen on the previous pages or write it out by hand for practice writing Typescript code. You will want to make sure to click “Ctrl + S” to save, then the files will compile. Please note that this tutorial doesn’t cover writing Typescript, so if this is your first time, we recommend copying and pasting, or using the downloaded files.

![20 VS Code - Delete Default Paste AnimatedGIF Script.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_47.png) ![38 Horizon - Create TextureSwappingTriggerScript.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_48.png)

## Step 6: Animated GIF

Before we get started, make sure to click the square stop world icon, this is a good practice when working on scripted objects as it reduces the chances of bugs and errors.

![27 Horizon - Stop The World.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_49.png)

Selecting the UIO Plane will open the properties panel on the right side. At the bottom of the properties panel, you can attach a script. We will attach the AnimatedGIF script.

![25 Horizon - Select UIO Object Attach AnimatedGIF Script.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_50.png)

With the script attached, we can now drag the assets into the empty texture slots in the correct order.

![26 Horizon - Reference All Texture Assets To Correct Index.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_51.png)

![28 Horizon - Not All References Required Change Speed.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_52.png)

With the texture assets referenced, we are almost ready to test the script. Notice that not all texture slots need to be filled out, the script we wrote and are using is intelligent enough to ignore these.

Before we test though, we should adjust the speed parameter to better match our desired animation style, in this case, I used 0.2 seconds.

Now let’s click play world!

![29 Horizon - Play World.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_53.png)

The speed was a little slow, so we’ll adjust to 0.1 seconds. You might have also noticed that the first play through the loop had some hiccups due to needing to download the images, but after it played once, it was smooth.

![30 Horizon - Adjust Speed To Your Liking.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_54.png)
![35 Horizon - Billboarded Nyan Cat.gif](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_55.png)

## Step 7: Billboarding

This looks good, but only from one side, it would work great on a wall, but what if you want it to float freely? In that case, we should billboard our GIF!

As of the time of writing (June 2024), billboarding can only be applied to grouped objects, not singular planes like this, so we will need to duplicate (Ctrl + D), and then group the two GIFs. After grouping we will delete the extra GIF.

Note: You can select two objects in the hierarchy on the left side by holding shift or ctrl, and when you right-click the selection will have an option to “Group selection.”

![31 Horizon - Group With Some Object.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_56.png)

Afterwards, we can drop down into the group from the hierarchy, and then right-click to delete the extra plane.

![32 Horizon - Delete That Object.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_57.png)

To apply billboarding we will select the \[EntityGroup\] from the hierarchy. On the right side properties panel, set Motion to Animated, which will reveal the Billboard property. You can then select Lock-Y or Freeform from the drop-down.

![33 Horizon - Select Group Set Motion To Animated.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_58.png) ![34 Horizon - Billboard Freeform.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_59.png)

Now start the world and run around in preview mode!

## Step 8: Texture Trigger

This script will allow visitors to change the texture of your UIO mesh, one texture at a time. It will run on a trigger gizmo, so let’s start by pulling one out. We’ll also need to be able to see the trigger in preview mode, so let’s grab a cylinder to use as a placeholder for a button. You will also want to bring out a new UIO asset. We can then position everything in our world.

Select the trigger, then attach the script to the trigger gizmo from the bottom of the right-hand side properties panel.

![39 Horizon - Bring Out A Trigger Gizmo.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_60.png) ![40 Horizon - Bring Out A Button Shape.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_61.png) ![41 Horizon - Adjust Scene To Your Liking And Select Trigger.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_62.png)

![42 Horizon - Attach Script.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_63.png)

Select the UIO plane, and give it a good name so we can better identify it.

![43 Horizon - Rename New UIO Object As NyanCatFrameByFrame.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_64.png)

Select the trigger gizmo again, and now we are going to fill out the uioEntity reference. Clicking the empty pill slot will give us a drop-down, and we can even type to search for our UIO plane.

![44 Horizon - Reference NyanCatFrameByFrame.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_65.png)

After filling that out, we still need to reference the texture entities. We can do that the same way we did before for our GIF animation.

Once it is all filled out we can test. Note that there is an optional startingIndex property. You can use this to set the texture you want the UIO plane to start with. But, it only works if you have no gaps in your references up until that index (otherwise the values will be off by 1-2 or so).

![45 Horizon - Reference Desired Frames Optionally Change Starting Index.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_66.png)

Going into preview mode, you can now jump up and down in the trigger to test that it changes the texture, moving forward one frame of the animation at a time. This would be great for an instruction board, or anywhere you want users to be able to customize their experience (ie. a skybox, wall art, etc).

![46 Horizon - Jump On Button To Test.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_67.png)

## Step 9: Add More Textures

If you need more animation frames than the default 15, it is relatively easy to add more to the script.

You’ll first want to create more texture asset references on the properties panel. In Typescript we often refer to these as “props.” An easy way to duplicate is to click on the far right of the texture15 line of code, then Copy and Paste (Ctrl + C and Ctrl + V). You can paste as many copies as you would like. Then rename them, incrementing the number upwards.

![36 Horizon - Duplicate And Rename Props To Add More.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_68.png)

Next, we’ll need to add these to the “textures” array. Note that in Typescript an array is similar to a list in Codeblocks. While learning Typescript you’ll find a lot of terms from Codeblocks have similar but different names. For instance, you’ll often hear objects referred to as Entities, this is because Object is a type of data in Typescript.

Next, we’ll duplicate the addTextureToArray line for each new prop added, also renaming to match all the new props.

![37 Horizon - Duplicate Add To Array And Rename.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_69.png)

A couple of quick things about this “addTextureToArray” function: we call a method or function, these are similar to events in Horizon Codeblocks, but different because they happen instantly. They also require parentheses “( )” to be called, otherwise it is just a reference and nothing happens.

Inside the parentheses is where we put parameters. Below you can see we receive the parameter “prop” which is either an Asset or undefined. It might be undefined because we don’t have to fill out the texture on the properties panel. We account for this using an if statement to check the truthiness of the prop.

![38 Horizon - Create TextureSwappingTriggerScript.png](/images/Meta_Horizon_CMI__TypeScript_API_20_Import_Images__Add_Texture_Animation_31207872014483_70.png)

A lot of this will feel like magic early on, and that is totally okay! Over time it will begin to make more and more sense.

There is a lot to learn in TypeScript, so if you have any questions about the code or want to dive deeper into how it works, be sure to ask in Discord, or check out some of the other Typescript resources!

## Extended Learning

Below we have provided some CMI and Scripting challenges for you to try implementing on your own. These require some outside knowledge, and we encourage you to ask questions in Discord if you get stuck or are unsure how to complete these or book a 1:1 mentor session.

### CMI Extended Learning:

#### Novice

Using the “TextureSwappingTrigger” script allows visitors to customize their experience in your world (ie. custom textures, pictures on walls, etc).

#### Intermediate

Create a fire. Either using a 3D model with an animated texture, or a 2D plane plus billboarding.

Tip: Some fire animations only look good on a billboarded 2D plane. For a 3D model, consider having intersecting planes floating above for the wispy elements of the fire.

#### Advanced

Try anything with a 3D model rather than a 2D plane. If you accomplish this, share your success in Discord!

## Scripting Extended Learning

#### Novice

Build a button using the “TextureSwappingTrigger” script so your visitors can adjust a skybox or some other texture, allowing users to customize their experience in your world.

#### Intermediate

Create a grabbable object that when you press the A or B button swaps the texture. This could be as simple as a colorful bouncy ball with various texture options.

Tip: Our trigger script uses “onPlayerEnterTrigger,” you’ll want to use a different codeblock event, when you backspace the current event name and the period and retype the period, you will see a drop down list for all codeblock event options!

#### Advanced

Add custom VFX. Think muzzle flashes, sparkles, smoke, or if you put the animation on a 3D object (ie. a cylinder), you can attach it to a player and make custom player effects like leveling up, taking damage, healing, etc.

Tip: You’ll want to have a way to run the animation X# of times. And either an off texture (ie. 100% transparent/masked), or set the visibility to false when not being used.

## Further Assistance

For any questions or further assistance, creators are encouraged to join the discussion on the Discord server or to schedule a mentor session for personalized guidance.
