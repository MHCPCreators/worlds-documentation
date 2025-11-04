import { Component, PropTypes, Entity, Player, NetworkEvent } from 'horizon/core';

// Event definitions for communication between the build tool and this manager
const requestPlayerIdEvent = new NetworkEvent<{ requester: Entity }>('requestPlayerId');
const assignPlayerIdEvent = new NetworkEvent<{ index: number }>('assignPlayerId');
const triggerSetBlockEvent = new NetworkEvent<{ cts: any[], player: Player }>('triggerSetBlock');

class BuildPlayerIdAssign extends Component<typeof BuildPlayerIdAssign> {
  static propsDefinition = {};

  // Internal state to track registered build tools and other data
  private buildTools: Entity[] = [];
  private blockCountEdit: number[] = []; // Unused in the provided logic, but included per prompt
  private players: Player[] = [];        // Unused in the provided logic, but included per prompt

  override preStart() {
    // Connect to network events to handle requests from build tools
    this.connectNetworkEvent(this.entity, requestPlayerIdEvent, this.onRequestPlayerId.bind(this));
    this.connectNetworkEvent(this.entity, triggerSetBlockEvent, this.onTriggerSetBlock.bind(this));
  }

  override start() {
    // Initialization logic can go here if needed
  }

  /**
   * Handles a request from a build tool to get an assigned ID.
   * @param data The event payload containing the requesting entity.
   */
  private onRequestPlayerId(data: { requester: Entity }) {
    const buildTool = data.requester;

    // Add the tool to the tracked list if it's not already there
    if (!this.buildTools.includes(buildTool)) {
      this.buildTools.push(buildTool);
    }

    // Get the index of the tool, which will serve as its ID
    const newIndex = this.buildTools.indexOf(buildTool);

    // Send the new ID back to the requesting build tool
    this.sendNetworkEvent(buildTool, assignPlayerIdEvent, { index: newIndex });
  }

  /**
   * Placeholder for handling block setting triggers.
   * @param data The event payload containing block data and the player.
   */
  private onTriggerSetBlock(data: { cts: any[], player: Player }) {
    // This is a stub as per the prompt's logic.
    // Future implementation for setting blocks would go here.
    console.log(`onTriggerSetBlock called by player ${data.player.id} with data:`, data.cts);
  }
}

Component.register(BuildPlayerIdAssign);
