# How to Quickly Import Any Asset from Unity Asset Store into the Horizon Worlds Editor

> **About this guide:**
>
> This tutorial explains a fast, repeatable workflow to **export and import assets** from any library into Meta’s engine. The process uses **Single‑Texture PBR** as the baseline, but it also applies to any other shader supported by Horizon Worlds. The steps below focus on assets that use **one material** and **one texture**.

## Tools Used

* **Unity**
* **Blender**
* **Worlds Desktop Editor**

## Links Referenced

* Brazilian Build assets package: https://assetstore.unity.com/packages/3d/environments/brazilian-favela-modular-pack-236038?srsltid=AfmBOoqZrsGtdL8OcqrGs2lSi6wOoWo4qWCsk71VIp0ICMwSmCiOD2E_
* Unity FBX export package: [https://docs.unity3d.com/Packages/com.unity.formats.fbx@5.1/manual/index.html](https://docs.unity3d.com/Packages/com.unity.formats.fbx@5.1/manual/index.html)

---

## First Steps — Exporting Unpacked Assets

If the chosen asset already ships a ready‑to‑use model (or the provider includes a consolidated model that contains everything needed), this section can be skipped.

1- Find a suitable asset pack in an asset library (example shown with Unity Asset Store).

2- In most cases, packs do **not** include a single model containing all assets. Download the pack and import it into a (new or existing) Unity project.

3- Locate the scene that contains all assets you intend to use.

4- Select the desired assets in the **Hierarchy** pane.
<img width="1915" height="1031" alt="import-assets-from-unity-asset-store-1" src="https://github.com/user-attachments/assets/bdc75b9f-46e4-4ff6-8737-80859cc82b34" />


5- With the assets selected, open **`GameObject > Export To FBX`**. 
<img width="655" height="639" alt="import-assets-from-unity-asset-store-2" src="https://github.com/user-attachments/assets/639db7b2-b9e4-4269-929d-b88c26c0a9b3" />


6- Name the exported FBX and choose a destination. To avoid compatibility issues, select **Binary** as the FBX format.
<img width="429" height="577" alt="import-assets-from-unity-asset-store-3" src="https://github.com/user-attachments/assets/0b917445-550d-4d8b-adc6-1b953bca7a54" />


---

## Importing Assets into Blender

1- Clean up the scene and keep only the assets that will be used. Delete the rest, or move them into a separate collection for possible future use.

2- Because the export originated from Unity, Blender will not automatically find textures. Pick one material to start with. **Tip:** begin with the most frequently used materials.

3- For example, multiple houses may share the same **brick** texture. Even if the meshes reference different materials, the same **base color** texture can be shared. For performance and workflow speed, consolidate into a single material where sensible. Copy that chosen material to all objects that can share it. To copy materials: select the objects that have the **to‑be‑replaced** material, then **select last** one object that has the **correct** material, and press **`Ctrl+L > Link Materials`**.
<img width="1285" height="539" alt="import-assets-from-unity-asset-store-4" src="https://github.com/user-attachments/assets/fb59b119-75b5-46f5-b9bb-3bb87606271b" />
<img width="207" height="371" alt="import-assets-from-unity-asset-store-5" src="https://github.com/user-attachments/assets/99ae21db-c7f0-4290-b057-d3dbdc55bfae" />


4- Adjust **UVs** where needed so multiple objects can share the same material. This is easier when the asset already uses a **texture atlas** or **trim sheets**.
<img width="1580" height="917" alt="import-assets-from-unity-asset-store-6" src="https://github.com/user-attachments/assets/2431c0b1-a9fe-4e2a-99c2-36aed446ab5a" />

5- After UV adjustments, select all objects intended for the final export (press **`A`** or box‑select) and **join** them into a single mesh with **`Ctrl+J`**. Then clear any inherited parenting with **`Alt+P > Clear and Keep Transform`**. If the imported asset came nested inside empties, the scene may contain many of them—select and delete these to simplify the outliner.
<img width="1915" height="1026" alt="import-assets-from-unity-asset-store-7" src="https://github.com/user-attachments/assets/4ff4d2f4-f073-4e4c-a59b-3d8525d7c65f" />

6- The newly joined object should now consolidate materials. Some extra materials might still be present. **Do not delete them yet**—they will help reduce the total number of assets in the scene. With the object selected, enter **Edit Mode** (**`Tab`**), press **`A`** to select all faces, then use **`P` (Separate)** and choose **By Material**. You should now have fewer objects than before—each mesh corresponds to a single material. This also reveals redundant materials that can be safely replaced.

7- Reassign materials where they can be shared, or replace materials you won’t use. Reapply the **Link Materials** technique and **join** related meshes again when finished. Repeat for any additional objects as needed.

8- The result should be a small set of objects (e.g., **four** meshes) that compose the environment. **Rename** each object meaningfully, and give each object’s **material the exact same name**. **Avoid using the `_` (underscore)** in object/material names—reserve it for **texture file suffixes** only. (Horizon Worlds uses the asset’s base name as a configuration key in‑scene.)

---

## Saving the Assets

1- In Blender, select each asset **individually** and export as **FBX** (**`File > Export > FBX`**). Use the **same name** for the exported file that you used for the object and its material in Blender. Check **Selected Objects** and keep Blender’s default FBX settings for now.

2- Now save the textures. In the top **Shading** workspace, select the material’s **Base Color** node. In the lower‑left image area, click the hamburger menu (**three lines**) → **`Image > Save As`** and save the texture using the same name as the object/material, with the additional **`_BR`** suffix.

The **`_BR`** tag tells Horizon Worlds that this asset uses the **Single‑Texture PBR** shader (one texture channel, one material per object). Although only one texture is used, **roughness** can be controlled through the **alpha channel**:
<img width="1912" height="1027" alt="import-assets-from-unity-asset-store-8" src="https://github.com/user-attachments/assets/10d21f95-f9f8-4204-a8f0-5efa977f58f2" />

* **100% alpha** → fully **rough** (matte)
* **0% alpha** → fully **reflective** (glossy)

To avoid issues, if the material needs some reflectivity, keep the alpha range bias around **50%** for a balanced result.
<img width="1918" height="1028" alt="import-assets-from-unity-asset-store-9" src="https://github.com/user-attachments/assets/1e8a5ede-9ec6-400c-82a4-3fc4b6c0473d" />
<img width="861" height="503" alt="import-assets-from-unity-asset-store-10" src="https://github.com/user-attachments/assets/8c53ad04-f47b-4803-9d15-5a7ef4e33d0d" />

3- Export each texture to a chosen folder. For convenience, keep **textures and FBXs in the same directory** for the next step.

---

## Importing Assets into Horizon Worlds

1- In the editor, open **My Assets**, click **Add New > Folder**, and create a folder to organize the imports. Inside that folder, click **Add New > 3D Model** and select **both** the model and its texture at once. If they are not in the same folder, select the **3D model first**, then click **Choose files on your device** in the floating panel and select the corresponding texture. Click the blue **Import** button to proceed.
<img width="405" height="411" alt="import-assets-from-unity-asset-store-11" src="https://github.com/user-attachments/assets/8d6db165-1cdd-4f9b-a57e-d37c337d73f8" />
<img width="564" height="619" alt="import-assets-from-unity-asset-store-12" src="https://github.com/user-attachments/assets/b2d5de54-ba92-4f22-9d2c-9f997a4986af" />

2- Repeat the previous step for each asset. If everything is set up correctly, no warnings should appear. You **won’t** see the texture file in the folder because it is **embedded** inside the 3D object. If an error occurs, it is commonly related to **naming**—double‑check file/object/material names and the `_BR` suffix.

If the final scene is composed of several assets (e.g., pieces of a single environment), drop them into the world and reset their transforms (or use the exact same position values). They should **snap together perfectly**.
<img width="1915" height="1029" alt="import-assets-from-unity-asset-store-13" src="https://github.com/user-attachments/assets/47125686-69a3-43d4-b445-f48d8777ef23" />
