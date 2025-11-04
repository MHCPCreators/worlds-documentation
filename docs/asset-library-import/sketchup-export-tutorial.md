# SketchUp to Horizon Worlds Exporter: Step-by-Step Guide


This tutorial will walk you through the process of exporting 3D models from SketchUp into Horizon Worlds using a custom extension I created for this purpose (also known as a plugin). Whether you're new to Horizon Worlds or SketchUp or looking to streamline your existing workflow, this guide covers everything you need to know.

**GitHub Repository:** [ChrisLally/sketchup-to-horizon-worlds-exporter](https://github.com/ChrisLally/sketchup-to-horizon-worlds-exporter)

**Download Latest Release:** [Releases Page](https://github.com/ChrisLally/sketchup-to-horizon-worlds-exporter/releases)

---

## Video Walkthrough

If you prefer a visual guide, check out the video walkthrough:

**[Watch on YouTube](https://www.youtube.com/watch?v=y2hnLyFFgEg)**

---

## Why Export from SketchUp to Horizon Worlds?

Bringing your own 3D models into Horizon Worlds allows for greater creativity and customization. This workflow lets you design in SketchUp, then quickly see your creations come to life in the virtual world.

---


## Prerequisites

- SketchUp installed on your computer (SketchUp offers a free trial!)
- My custom SketchUp export extension (also known as a plugin) for Horizon Worlds (download link in video description or project repo)
- Horizon Worlds desktop editor

---




## Step 1: Install the SketchUp Extension (Plugin)

1. Download the latest release of the SketchUp export extension (also known as a plugin) from the [Releases Page](https://github.com/ChrisLally/sketchup-to-horizon-worlds-exporter/releases) of the GitHub repository.
2. In SketchUp, go to **Extensions > Extension Manager**.
3. Click the **Install** button and select the downloaded extension file.
4. Once installed, the extension should appear in your list of extensions.

> **Tip:** If you have issues installing, make sure the extension is compatible with your SketchUp version.
> **Tip:** If you edit the source file or uninstall the extension, the only way to fully reset SketchUp is to close (be sure to save your work) and re-open the application.

---



## Step 2: Prepare Your SketchUp Model

1. Open or create the model you want to export.
2. Clean up your model:
   - Remove unnecessary geometry.
   - Group objects logically.
   - Apply solid colors for best results (the extension works with materials, but solid colors are easier).
   - Avoid using underscores in material names (the extension will remove them).
3. Save your SketchUp file.

> **Best Practice:** Use simple, descriptive names for your objects and materials.
> **Tip:** The extension uses the native SketchUp export API, which can sometimes get confused by several levels of nested groups. For complex objects, it's recommended to make a copy of your model, use the "Explode" command repeatedly until there are no nested groups, then create a single group for export. This helps ensure a clean export.
> **Note:** Only the selected object or group is exported by design. Be sure to select exactly what you want to export before running the extension.

---


## Step 3: Export from SketchUp

1. With your model ready, select the objects you want to export.
2. Go to the extension (plugin) menu and choose **Export Selection to Horizon**.
3. The extension will export your selection using the SketchUp export API behind the scenes and prompt save the .fbx file along with the material .png files to a single folder in the same location as your SketchUp project.
4. The exported folder and file will be named after your SketchUp file (you can rename it if needed).

> **Note:** The extension attempts to automatically renames material image files to match Horizon Worlds requirements.

---



## Step 4: Import into Horizon Worlds

1. Open the Horizon Worlds desktop editor.
2. Go to **My Assets > Add New (dropdown) > 3D Model**.
3. Before importing, review the warning about "Offset Pivots" in the desktop editor. In most cases, you should switch Offset Pivots off for SketchUp exports.
4. Click to select your exported `.fbx` file and all associated `.png` images from the folder created by the extension.
5. Complete the import process. Importing may take some time (5–30+ seconds) depending on the complexity of your model.
6. The asset should now appear in your asset library or project.

> **Tip:** For best results, export low poly count objects from SketchUp. Horizon Worlds has limits on asset complexity, and simpler models will import faster and perform better.

---



## Tips & Troubleshooting

- **Materials:** Solid colors are easiest, but the extension supports different materials and even some transparency. You can also replace a material’s exported `.png` file with another image of the same file name to change or experiment with the material’s appearance before importing into Horizon Worlds.
- **Scaling:** Double-check your model’s scale in SketchUp to ensure it imports at the correct size.
- **File Naming:** The extension removes underscores and formats names for compatibility.
- **Experiment:** Try different material types and see how they appear in Horizon Worlds.
- **Performance:** Simpler models with fewer materials import faster and perform better.

---


## Conclusion

Exporting from SketchUp to Horizon Worlds is now fast and accessible. This workflow lowers the barrier for any creator to bring custom assets into their virtual experiences. For more details, watch the video walkthrough and experiment with your own models!

---


**Questions or feedback?** Leave a comment on the video or reach out via the project repository.

---

## Contributing

Contributions are welcome! If you have suggestions, bug reports, or would like to add features, please open an issue or submit a pull request on GitHub:

- **Download Latest Release:** [Releases Page](https://github.com/ChrisLally/sketchup-to-horizon-worlds-exporter/releases)

1. Fork this **GitHub Repository:** [ChrisLally/sketchup-to-horizon-worlds-exporter](https://github.com/ChrisLally/sketchup-to-horizon-worlds-exporter)
2. Create a new branch for your changes
3. Make your edits and commit them
4. Open a pull request describing your changes

For larger changes or questions, feel free to open an issue for discussion first. Thank you for helping improve this extension!