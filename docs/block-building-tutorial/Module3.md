
# Module 4 - Events and Communication Flow

The entire Voxel Builder system is built on events. Think of events as messages passed between different scripts. They are the invisible glue that connects the player's actions in the `BuildToolComponent` to the world-altering logic in the `BlockAssetManager`. Understanding this flow of communication is key to modifying or expanding the system.


### Key Communication Workflows

Instead of just listing events, let's trace the two most important sequences of events to see how the system works in practice.

#### Workflow 1: Tool Initialization and Player Assignment
This workflow happens automatically when the world starts and a player joins. Its goal is to give a unique tool to a unique player.

![placing blocks](/docs/block-building-tutorial/media/propertiespanel.jpg)

1.  **Requesting an ID:** The `BuildToolComponent` script starts. It immediately sends a `RequestPlayerIdEvent` (a `NetworkEvent`) to the `BuildPlayeridAsisign` manager. It's essentially saying, "Hello, I'm a new tool, please give me a unique number."
2.  **Assigning an ID:** The `BuildPlayeridAsisign` manager receives this request. It adds the tool to its internal list and sends an `AssignPlayerIdEvent` (`NetworkEvent`) back *only to that specific tool*. The message contains the tool's new unique ID (e.g., `index: 1`).
3.  **Claiming a Player:** The `BuildToolComponent` now knows its ID is `1`. It listens for players entering the world. When a player with a matching `player.index` of `1` joins, the tool script runs its `handleAssignToolToPlayer` function to make that player its exclusive owner.

#### Workflow 2: Placing a Block
This is the core gameplay loop. It perfectly demonstrates the "act locally, confirm globally" pattern.

![sequencediagram](https://kroki.io/mermaid/svg/eNqlVE1v2zAMvedX8LQ5wOofkEOBLOuwAt1QNN12ViTO0SqLrqjY6X79KDnrV2o7wHywZfrp6fGRNOP9Dr3GT1ZVQdUzkKtRIVptG-UjXDv1gOEo_HFnnbklciuqG_IooWLlrDznx1hH-m7JjPGr8qrCAMUaQ4vhGPqTgjPrqCIK5sHrbSBv_6CZzzK0F3N2fj5y_AK-kDMMl97gHm6DraqDfqWjbRP1lPh8c0QNXJFWDj4jmo3Sd_IqseLSc1T_sOka4ZvSumuMKJK8NNYSuQ7YWuyKU7l7Qxaw3lLHsLS19RVcKRaP38GBLFOhN0-pnWbjDToUprec_EbiIkkFYZShX7xn-E0bsAyRgEUIxC1CSH3HsZydYOBg_ywyH4vUTJaB60Z1_qKVvZna4Ellf9Ug4x37LP0Raf3iRfatcjbVG5S4gHvUu4gHBwaJJgz4caB8NAEKLKvyA9RqD5u0kefTJwzO3QJkABxDlwAlJ28zR_FsUh5tG57eBBv8ejaRYg5DrisaKJYsm2ElstJMzl9XeVzEf1nxvemdtj5i8PJj4AR7agmZkG0E-gUjHEvnoMnzx-CpkwbGPA8eu75c5VHbDqr9C0R98aw=)
1.  **The Player Acts (Client-Side):** The player holds the trigger. The `BuildToolComponent` **does not** send any network messages yet. Instead, it starts its fast, local `updatePlacementPreview` loop, showing the aiming laser and placement outline. This feels instant to the player.
2.  **The Request is Sent:** The player releases the trigger. The tool's `placeBlock` function is called. Now, it sends a single `RequestBlockSpawnEvent` (`NetworkEvent`) to the `BlockAssetManager`. The message payload contains everything the manager needs to know: the desired `position`, `rotation`, and `index` of the block to be placed.
3.  **The Manager Acts (Server-Side):** The `BlockAssetManager`, which acts as the server authority, receives the request. It performs checks (e.g., "Is the world full?"), then begins the process of spawning the requested block asset using `world.spawnAsset()`.
4.  **The Confirmation:** Once the server has successfully created the block, the `BlockAssetManager` sends a `NewObjectSpawnedEvent` (`NetworkEvent`). This message confirms the creation and allows the manager to add the new block to its internal list, finalizing the process. Every client in the world receives this new block, ensuring the world state is synchronized.

### Event Definitions Summary
The system uses several types of events for different purposes.

| Event Name                  | Type          | Description / Flow                                                                                             |
| --------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| **Manager-Level Events**    |               | **Communication between the Tool and the central Managers.**                                                   |
| `RequestPlayerIdEvent`      | `NetworkEvent`| `BuildToolComponent` -> `BuildPlayeridAsisign`: "Please give me a unique ID."                                  |
| `AssignPlayerIdEvent`       | `NetworkEvent`| `BuildPlayeridAsisign` -> `BuildToolComponent`: "Here is your unique ID."                                      |
| `RequestBlockSpawnEvent`    | `NetworkEvent`| `BuildToolComponent` -> `BlockAssetManager`: "Please create a block at this location."                         |
| `RequestBlockMineEvent`     | `NetworkEvent`| `BuildToolComponent` -> `BlockAssetManager`: "Please destroy the block at this location."                      |
| `NewObjectSpawnedEvent`     | `NetworkEvent`| `BlockAssetManager` -> All Clients: Confirms that a block has been successfully spawned by the server.         |
| **Tool Internal Events**    |               | **Used inside `BuildToolComponent` to keep code clean and organized.**                                         |
| `CycleBlockForwardEvent`    | `LocalEvent`  | Player Input -> `BuildToolComponent`: Triggers the logic to select the next block in the list.                 |
| `InitiateMineEvent`         | `LocalEvent`  | Player Input -> `BuildToolComponent`: Triggers the `mineBlock` function.                                       |
| `UpdatePlacementPreviewEvent`| `LocalEvent`  | Trigger Press -> `BuildToolComponent`: Kicks off the local feedback loop for aiming.                           |
| `PlaceBlockEvent`           | `LocalEvent`  | Trigger Release -> `BuildToolComponent`: Triggers the `placeBlock` function, which sends the network request.  |
| **Tool Broadcast Events**   |               | **Sent by the tool to inform any other interested systems about a player's state.**                            |
| `SelectedBlockChangedEvent` | `NetworkEvent`| `BuildToolComponent` -> All Clients: "Player X has just selected the Stone block." (Useful for a shared UI). |
| `ToolHoldStateChangedEvent` | `NetworkEvent`| `BuildToolComponent` -> All Clients: "Player X is now holding/has dropped their tool."                         |
