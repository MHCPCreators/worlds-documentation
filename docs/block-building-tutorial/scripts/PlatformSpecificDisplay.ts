import { Component, PropTypes, Player, PlayerDeviceType, CodeBlockEvents, PlayerVisibilityMode } from 'horizon/core';

export class PlatformSpecificDisplay extends Component<typeof PlatformSpecificDisplay> {
  static propsDefinition = {
    // The entity to show only to VR players.
    vrEntity: { type: PropTypes.Entity },
    // The entity to show only to Screen (Mobile/Desktop) players.
    mobileEntity: { type: PropTypes.Entity },
  };

  override preStart() {
    // Run the visibility check for each player as they enter the world.
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterWorld,
      (player: Player) => this.setEntityVisibilityForPlayer(player)
    );
  }

  override start() {
    // Run the visibility check for all players already in the world when the script starts.
    const allPlayers = this.world.getPlayers();
    allPlayers.forEach(player => {
      this.setEntityVisibilityForPlayer(player);
    });
  }

  /**
   * Sets the visibility of the vrEntity and mobileEntity for a specific player
   * based on their device type.
   * @param player The player to set visibility for.
   */
  private setEntityVisibilityForPlayer(player: Player) {
    if (!this.props.vrEntity || !this.props.mobileEntity) {
      console.error("PlatformSpecificDisplay: vrEntity or mobileEntity is not set in props.");
      return;
    }

    const isVR = player.deviceType.get() === PlayerDeviceType.VR;

    if (isVR) {
      // For VR players, show the VR entity and hide the mobile entity.
      this.props.vrEntity.setVisibilityForPlayers([player], PlayerVisibilityMode.VisibleTo);
      this.props.mobileEntity.setVisibilityForPlayers([player], PlayerVisibilityMode.HiddenFrom);
    } else {
      // For Screen players, hide the VR entity and show the mobile entity.
      this.props.vrEntity.setVisibilityForPlayers([player], PlayerVisibilityMode.HiddenFrom);
      this.props.mobileEntity.setVisibilityForPlayers([player], PlayerVisibilityMode.VisibleTo);
    }
  }
}

Component.register(PlatformSpecificDisplay);
