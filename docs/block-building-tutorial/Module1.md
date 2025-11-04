# Module 1 - Overall Manager Systems

This section provides overviews of the manager systems. These are singleton, server-controlled scripts that act as the "brains" of the Voxel Builder. They manage the world state, handle object creation and destruction, and assign tools to players, ensuring a consistent and synchronized experience for everyone.


![A diagram showing a "Player Tool"](/docs/block-building-tutorial/media/gameui.jpg)

### BlockAssetManager.ts
This is the most critical manager. It controls the state of every block in the world. It is responsible for spawning new blocks when a player places one and destroying blocks when a player mines one. It acts as the central authority and database for the voxel world, ensuring no two blocks can occupy the same space and keeping track of the total block count.

**Notes:**
*   **Properties:** A designer must configure this script's properties in the editor. This includes assigning up to 20 different block `Assets` (b1-b20), their corresponding `blockValues`, the `maxTotalBlocks` allowed in the world, and particle/sound effect entities (`breakVfx`/`breakSfx`) that play on destruction.
*   **Event-Driven:** This manager is entirely passive; it only acts when it receives a request. It listens for two key network events sent from a player's `BuildToolComponent`:
    *   `RequestBlockSpawnEvent`: Triggers the process to create a new block at a specific position and rotation.
    *   `RequestBlockMineEvent`: Triggers the process to find and destroy an existing block at a specific position.
*   **Asynchronous Spawning:** When it receives a spawn request, it uses the `async` function `world.spawnAsset()`. This is a robust pattern for handling networked object creation. Once the asset is successfully spawned by the server, the manager sends a `NewObjectSpawnedEvent` to itself to finalize the creation and update its internal state.
*   **State Tracking:** It maintains internal lists of all spawned blocks (`SpawnedAssets`, `spawnedanim`) and their precise positions. This allows it to quickly find and destroy a block when a `RequestBlockMineEvent` is received, and to ensure a new block doesn't replace an existing one without first removing it.

### BuildPlayeridAsisign.ts
In a multiplayer world where multiple players will have their own build tool, we need a way to reliably assign one tool to each specific player. This simple manager handles that task, acting as a "matchmaker" between players and their tools.

**Notes:**
*   **Purpose:** Its sole job is to give each `BuildToolComponent` instance a unique ID when the world starts. This ID corresponds to a player's index in the world, allowing for a direct link between a player and their designated tool.
*   **Workflow:** The assignment process is a simple, two-step conversation:
    1.  When a `BuildToolComponent` script starts, it sends a `RequestPlayerIdEvent` to this manager, announcing its presence.
    2.  The `BuildPlayeridAsisign` manager receives the request, adds the tool entity to its internal list (`buildtools`), and determines its index (e.g., 0, 1, 2...).
    3.  It immediately sends an `AssignPlayerIdEvent` back *only* to the requesting tool, containing the unique index. The `BuildToolComponent` then stores this ID and waits for the player with the matching index to be assigned ownership.
