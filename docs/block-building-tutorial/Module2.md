
# Module 2 - The Player Tool System

This module covers the component that the player directly interacts with: the **Build Tool**. Unlike the server-controlled managers, this component is player-owned. Its primary job is to capture player input, provide immediate visual and haptic feedback, and then communicate the player's intentions to the manager systems. It is the "hands" of the player in the world.

### BuildToolComponent.ts
This is a complex, local script attached to the grabbable "Build Tool" entity. It manages everything from what block is selected to where the player is aiming. Because a copy of this script runs for each player who owns a tool, it is designed to be efficient and focus on the local player's experience.

Below, we'll break down the key design patterns used in this script. Understanding these techniques is fundamental to building responsive, multiplayer experiences in Meta Horizon Worlds.

---

### Learning Technique 1: The Player Assignment Pattern
**The Challenge:** In a world with 8 players, how do you ensure `Player 1` gets `Tool 1`, `Player 2` gets `Tool 2`, and so on, without them getting mixed up?

**The Solution:** The tool uses the unique ID it received from the `BuildPlayeridAsisign` manager to "claim" a player. It listens for when any player enters the world, checks if that player's unique `index` matches its own assigned ID, and if so, establishes a permanent link.

**Key Snippet (`handleAssignToolToPlayer`):**
```typescript
private handleAssignToolToPlayer(player: Player) {
  // Is this player's world index the same as my assigned ID?
  if (player.index.get() === this.assignedPlayerId) {
    this.assignedPlayer = player;
    
    // Only this specific player can now grab me.
    this.entity.as(GrabbableEntity)?.setWhoCanGrab([player]);
    
    // Attach to the player's torso so it's always with them when not held.
    this.entity.as(AttachableEntity)?.attachToPlayer(player, AttachablePlayerAnchor.Torso);
  }
}
```
Learning Tip: This pattern of using a manager to assign IDs and then having local scripts claim their corresponding owner is a robust and scalable way to manage player-specific objects, from tools and weapons to personal UI elements.

### Learning Technique 2: The Local Feedback Loop
**The Challenge:** Network latency (lag) is unavoidable. If you wait for the server to confirm an action before showing the player any visuals, the game will feel slow and unresponsive.
**The Solution:** Provide instant, "client-side" feedback. When the player holds the trigger to place a block, the tool doesn't wait for the server. It immediately starts a local loop to show the player exactly where their block will go, creating a snappy and intuitive feel.
Key Snippet (updatePlacementPreview):

```typescript
private updatePlacementPreview() {
  // Stop the loop if the player isn't holding the trigger.
  if (!this.isTriggerHeld || !this.assignedPlayer) return;

  const raycastGizmo = this.props.raycastGizmo?.as(RaycastGizmo);
  // ... (raycasting logic to find where the player is aiming) ...

  if (hit) {
    // Calculate the snapped grid position based on the raycast hit.
    this.placementPosition = this.snapPositionToGrid(hit.hitPoint.add(hit.normal.mul(0.5)), 1.0);
    
    // INSTANTLY move the visible placement outline to the new position.
    this.props.placementOutline?.position.set(this.placementPosition);
  }

  // Call this function again in a fraction of a second to create a continuous update loop.
  this.async.setTimeout(() => this.updatePlacementPreview(), 100);
}
```
Learning Tip: This "act locally, confirm globally" pattern is one of the most important concepts in networked game development. By showing previews, lasers, and other temporary effects instantly on the player's screen, you create a responsive experience that hides network latency. The async.setTimeout() creates a simple, efficient update loop for tasks that need to run repeatedly while an action is being held.

### Learning Technique 3: The Request-Based Action Model
**The Challenge:** If every player's tool could create blocks directly, the world state would quickly become desynchronized, leading to players seeing different things.
**The Solution:** The tool never changes the world directly. It only asks the authoritative BlockAssetManager to perform an action. This ensures that a single, central "brain" is responsible for all changes, keeping every player's view of the world consistent.
Key Snippet (placeBlock):
```typescript
private placeBlock() {
  // ... (calculates final block rotation) ...

  // Don't change the world. Just send a "request" message to the manager.
  if (this.props.blockAssetManager) {
    this.sendNetworkEvent(
      this.props.blockAssetManager, // The recipient (the manager)
      RequestBlockSpawnEvent,        // The message type ("Please spawn a block")
      {                              // The data payload (where, what, and how)
        position: this.placementPosition,
        rotation: this.placementRotation,
        index: this.selectedBlockIndex
      }
    );
  }
}
```
*Learning Tip:* This is the "dumb client, smart server" model. The BuildToolComponent (the client) is only responsible for gathering player intent and sending a well-formatted request. The BlockAssetManager (the server) is responsible for validating that request and executing it. This separation of concerns makes the code easier to debug and is essential for preventing cheating and synchronization issues in multiplayer games.
