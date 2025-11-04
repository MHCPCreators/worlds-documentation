# Module 1 - Setup

![A player in Meta Horizon Worlds holds a build tool](/docs/block-building-tutorial/media/imgheader.jpg)

### Important
This content is intended as a companion to the tutorial world Block Building Remixable, which you can access through the desktop editor. When you open the tutorial world, a copy is created for you to explore, and this page is opened so that you can follow along and better understand how to use the assets.

### Welcome
Welcome to the Voxel Builder sample world. The goal of this world is to demonstrate a robust, multiplayer-capable system for placing and destroying blocks, often called voxels. This system can serve as the foundation for creative building games, collaborative art worlds, or puzzle mechanics. The world is constructed using a manager-and-tool architecture that is easy to understand, modify, and apply to other worlds.

> **Note:** This world is a full game system. While it is a powerful learning tool, the TypeScript coding and event-driven architecture may be advanced for beginning developers. Before hopping in, you may want to take a look at the **Build your first game world** tutorial.

### Key Game Development Areas
This sample world is a complete system that utilizes several key concepts in Meta Horizon Worlds development:

*   **Player-specific Tools:** Managing grabbable tools that are assigned to and controlled by individual players.
*   **Centralized State Management:** Using a singleton manager as the single source of truth for all placed objects, ensuring synchronization across all players.
*   **Client-Side Feedback:** Providing instant visual feedback to the player (placement previews, aiming lasers) for a responsive feel, before the final action is confirmed by the server.
*   **Networked Event-Driven Architecture:** Communicating actions (placing, mining) between player-owned tools and a central server-controlled manager via network events.
*   **Dynamic Object Spawning and Destruction:** Efficiently creating and deleting assets at runtime based on player actions.

### Learning Pathways
You can explore the world in the following ways:

1.  **Play the game.** Grab the Build Tool from its pedestal. Explore the interface, cycle through blocks, and start placing and breaking them to understand the core mechanics.
2.  **Explore the tutorial.** You can use the signposts in the world for pointers into the TypeScript files where individual systems are created. This guide will break down each component's role.
3.  **Dig into the code.** Comments in the code should give you a start in learning how to use it. The following modules in this guide will provide a detailed breakdown.
4.  **Use in your world.** For more information on how to apply assets or scripts from this world to yours, try the BLOCKTOOL asset in the asset library.

### Before You Begin
If you haven’t done so, please review the [Getting Started with Tutorials]([placeholder_link](https://developers.meta.com/horizon-worlds/learn/documentation/tutorial-worlds/getting-started-with-tutorials/tutorial-prerequisites)) section, which includes information on:
*   Tutorial prerequisites and assumptions
*   How to use tutorial worlds and assets in your own worlds
*   Developer tools and testing for your worlds

> **Note:** All tutorials are created using TypeScript 2.0.0. You can learn more about how to upgrade your own world to TypeScript 2.0.0.

### Introduction to Voxel Builder
Voxel Builder is a multiplayer creative system. Each player is assigned their own **Build Tool** upon entering the world. By grabbing this tool, players can:
*   Select from a variety of predefined block types.
*   Aim and place blocks onto a grid, snapping them into place.
*   Aim and mine existing blocks, destroying them and playing a visual effect.

This world is a complete system, allowing developers to learn and explore all of the components required to build a collaborative creation experience.

### Get started
Before you begin, please verify that you have acquired access to the tutorial world.

Open this world in the desktop editor, where you can explore it in either Build mode or Preview mode to familiarize yourself with the world and its structures before modifying it.

### System Design
The system was developed around a clear separation of concerns: **Managers** handle the world's state, while the **Tool** handles player input and local feedback.

*   **The Build Tool** is a "dumb" client. It doesn't decide if a block can *actually* be placed. It just shows the player a preview and, when the player acts, it sends a *request* to the manager. This makes the player's experience feel instant and responsive.
*   **The Block Asset Manager** is the "smart" server. It is the single source of truth. It receives requests from all players' tools. It validates these requests (e.g., checking against the max block count) and executes them, spawning or deleting blocks. Because the manager is the only thing that can change the world state, the world stays perfectly synchronized for all players.

This client-server request model is a powerful and scalable pattern for building complex, interactive multiplayer worlds.

### Using the Modules
In the following modules, we break down the systems that are used in the Voxel Builder sample world. You can explore overviews of the individual files that compose those systems.

> **Note:** Most of the systems communicate based on the Meta Horizon Worlds event system, so you can take them out and use them directly in your own world with minimal changes.

### Code Design
The code is built around a primary tool script that interacts with a set of singleton managers. Managers share information through network events.

| Script name                 | Description                                                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **BlockAssetManager.ts**    | The central authority for the world. Listens for requests to spawn or mine blocks, manages all block assets, and tracks the total block count.    |
| **BuildPlayerIdAssign.ts**  | A simple utility manager that assigns a unique ID to each instance of the Build Tool in the world, ensuring one tool can be assigned per player. |
| **BuildToolComponent.ts**   | A complex local script attached to the grabbable tool. It handles all player input, block selection, UI, local VFX (previews, laser), and sends network event requests to the managers. |

These systems and more are described in the individual modules of this tutorial.

### Accessing Managers
In the desktop editor, you can access the systems in the following ways:
1.  Open the scripts listed above through the **Scripts** panel.
2.  Navigate the **Hierarchy** panel.


![Screenshot of two empty reference objects named "BlockAssetManager" and "PlayerIdAssigner" in the Horizon Worlds editor. The inspector panel shows the corresponding TypeScript components attached.](/docs/block-building-tutorial/media/worldseditor1.jpg)
