# 🌐 Importing 3D Models from Maya into Horizon Worlds

A step-by-step guide to ensure proper importing from Maya into Horizon Worlds.

---

## 1. ✅ Set Your Scale Correctly

Before modeling, make sure your Maya project uses **meters**, not centimeters.

### How to Change Units in Maya:
1. Go to `Windows` → `Settings/Preferences` → `Preferences`
   
![](imagesmayaimporting/1st.png)

3. Under **Settings**, change **Working Units**: 
   - `Linear`: `meter`
  
![](imagesmayaimporting/2nd.png)

---

## 2. 🎨 Create Your Materials in Hypershade


### Steps:
1. Open **Hypershade**
   
 ![](imagesmayaimporting/3rd.png)
 
2. Click on the shader of choice (I usually stick with Lambert/Phong/Phong E) to create a material
   
 ![](imagesmayaimporting/4th.png)
 
3. Click the checkered box next to **Color** to open the **Create Render Node** window
   
![](imagesmayaimporting/5th.png)

4. Select `File` → choose your `.png` texture

![](imagesmayaimporting/6th.png)

5. Drag the material onto your mesh using the **middle mouse button**
   
![](imagesmayaimporting/7th.png)

---

## 3. 📤 Export Your Mesh

1. Select your mesh 
2. Go to `File` → `Export Selection`

   ![](imagesmayaimporting/8th.png)
   
3. Choose `.FBX` format 
4. Save with a clear name in your asset folder

![](imagesmayaimporting/9th.png)

---

## 4. 🧩 Import into Horizon Worlds

### Option A: Desktop Editor
1. Open Horizon Desktop Editor and enter any world
2. Click **My Assets** → choose a folder → Click **Add New** → select **3D Model**

    ![](imagesmayaimporting/10th.png)
   
3. Upload your `.fbx` and `.png` files
  
   ![](imagesmayaimporting/11th.png)
   
4. Make sure you have all your files. For example for an meo file you neeed two png files as shown below

 ![](imagesmayaimporting/12th.png) 
   


### Option B: Web Editor
1. Go to [https://horizon.meta.com/creator/assets/](https://horizon.meta.com/creator/assets/) and
 choose a folder (default is "My Assets")
2. Click **Import** → select **3D Model**
   
 ![](imagesmayaimporting/14th.png)
   
3. Upload your `.fbx` and `.png` files


 ![](imagesmayaimporting/15th.png)
 
---

## 5. 🧪 Material Naming Conventions

Use these formats for smooth importing:

| Material Type             | Material Name             | PNG Naming Convention                      |
|---------------------------|---------------------------|----------------------------------------    |
| Single Texture PBR        | `basecolor`               | `basecolor_BR.png`                         |
| Metal PBR                 | `metalic_METAL`           | `metalic_BR.png`                           |
| Double Texture PBR        | `meo`                     | `meo_BR.png`, `meo_MEO.png`                |
| Unlit                     | `unlit_UNLIT`             | `unlit_B.png`                              |
| Unlit Blend               | `blend_BLEND`             | `blend_BA.png`                             |
| Transparent               | `transparent_TRANSPARENT` | `transparent_BR.png`,`transparent_MESA.png`|
| Masked                    | `masked_MASKED`           | `masked_BA.png`                            |
| UI Optimized              | `uio_UIO`                 | `uio_BA.png`                               |

💡Replace the word before the `_` with your desired name - just make sure it is the same for the material and `.png` file

### Examples

 1.Single Texture PBR 

 ![](imagesmayaimporting/basecolor.png)

 2.Single Texture Metal PBR 

 ![](imagesmayaimporting/metal.png)

 3. Double Texture PBR

![](imagesmayaimporting/meo.png)

4. Unlit Materials

![](imagesmayaimporting/unlit.png)

5. Unlit Blend Materials

![](imagesmayaimporting/blend.png)

6. Transparent Materials

![](imagesmayaimporting/transparent.png)

7. Masked Materials

![](imagesmayaimporting/masked.png)

8.UI Optimized Materials

![](imagesmayaimporting/uio.png)

---


## 6. 💡 Quick Tips

- Each model must include:
  - One `.fbx` file
  - One or more `.png` textures
- Max file size: **50MB** per file



## 7. 🎥 Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/gLEfX2ZjxbI?si=coYyZ3LMc5SIkQyR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>