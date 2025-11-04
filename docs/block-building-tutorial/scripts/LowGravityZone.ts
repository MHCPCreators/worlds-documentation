import { Component, PropTypes, Player, Vec3, CodeBlockEvents } from 'horizon/core';

/**
 * This component creates a low-gravity zone. When a player enters the trigger
 * this script is attached to, their gravity is temporarily lowered and they
 * receive an upward push.
 */
export class LowGravityZone extends Component<typeof LowGravityZone> {
  static propsDefinition = {
    // The gravity value to apply to the player (lower is less gravity).
    gravityAmount: { type: PropTypes.Number, default: 3.0 },
    // The strength of the initial upward push.
    upwardForce: { type: PropTypes.Number, default: 5.0 },
    // How long the low-gravity effect lasts in seconds.
    duration: { type: PropTypes.Number, default: 5.0 },
  };

  override preStart() {
    // Listen for when a player enters the trigger this component is on.
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => this.applyLowGravityEffect(player)
    );
  }

  // The start method is required for all components.
  override start() {}

  /**
   * Applies the low gravity effect to a player.
   * @param player The player who entered the trigger.
   */
  private applyLowGravityEffect(player: Player) {
    // Store the player's original gravity to restore it later.
    const originalGravity = player.gravity.get();

    // Set the player's gravity to the new, lower value.
    player.gravity.set(this.props.gravityAmount);

    // Apply an upward force to give the player a gentle push.
    player.applyForce(new Vec3(0, this.props.upwardForce, 0));

    // Set a timer to restore the player's gravity after the duration.
    this.async.setTimeout(() => {
      // Check if the player is still in the world before restoring gravity.
      const playerStillExists = this.world.getPlayers().some(p => p.id === player.id);
      if (playerStillExists) {
        player.gravity.set(originalGravity);
      }
    }, this.props.duration * 1000);
  }
}

Component.register(LowGravityZone);
