# **Asset Import Tips & Troubleshooting**

## **Known Limitations When Uploading Assets to Horizon Worlds**

* **Multiple Materials per Mesh:** You can assign multiple materials to a single mesh in an FBX file. This allows you to create objects that have different visual elements. You can assign materials to the faces of the mesh in the DCC (Digital Content Creation) tool of your choice. When the mesh is imported into Horizon, a material slot is created for each material on the mesh. You can reference these slots by name or index, where the first material is in slot 0\. Additional resource: [https://developers.meta.com/horizon-worlds/learn/documentation/custom-model-import/creating-custom-models-for-horizon-worlds/multiple-materials-per-mesh](https://developers.meta.com/horizon-worlds/learn/documentation/custom-model-import/creating-custom-models-for-horizon-worlds/multiple-materials-per-mesh)

* **Texture Format:** Only PNG textures are supported. JPEG, GIF, and other formats will not import correctly.

* **Texture Size:** Textures must be sized as a power of 2 (e.g., 512x512, 1024x1024) for best results.

* **Vertex/Polygon Limits:** Maximum 400k vertices per asset (recommended to keep triangle count below 125k for safety). Exceeding this will cause import failures.

* **Material Naming:** Materials and textures must be named precisely for correct mapping. Avoid special characters in file names.

* **Limited Animation Support:** Mesh animation is available in limited for in the Desktop Editor.  

* **No Embedded Scripts:** Scripts or interactive logic must be added within Horizon Worlds, not embedded in imported assets.

* **Alignment Issues:** Imported models may not align as expected; manual adjustment is often required after import.

* **No Transparency/Alpha Channel Support:** PNG textures with transparency may not render as expected; test assets before use.

* **Asset Size Limits:** Large file sizes may fail to upload; optimize models and textures for best results.

### **File Format Requirements**

* **3D Models**: FBX format required  
* **Textures**: PNG format only (no JPEG, GIF, or other formats)  
* **Texture Sizing**: Power of 2 dimensions (512x512 or 1024x1024 preferred)  
* **Vertex Limits**: 400k vertex limit (keep triangle count below 125k for safety)

### **Common Import Issues & Solutions**

❌ **Alignment Problems**

* *Issue*: Models don't align properly when imported  
* *Solution*: Disable "Preserve offset pivots" for multi-material meshes  
* *Workaround*: Manual adjustment in-world after import

❌ **Material/Texture Issues**

* *Issue*: Textures don't load or appear broken  
* *Solution*: Ensure proper material and texture naming conventions  
* *Tip*: Test import with simple assets first

❌ **Asset Won't Import**

* *Check*: File size and vertex count limits  
* *Check*: Proper file naming (no special characters)  
* *Try*: Importing both FBX and texture files together

### **Import Workflow Steps**

1. Navigate to [horizon.meta.com/creator](https://horizon.meta.com/creator/assets/)  
2. Select target folder and click **Import**  
3. Drag and drop **both** FBX file and associated textures  
4. Click **Import** and wait for processing  
5. Find asset in Build Mode → Asset Library → My Assets

