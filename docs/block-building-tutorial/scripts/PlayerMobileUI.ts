import { Player, PropTypes, CodeBlockEvents, NetworkEvent, PlayerDeviceType, PlayerVisibilityMode } from "horizon/core";
import { Binding, Pressable, Text, UIComponent, UINode, View } from "horizon/ui";

// Event to notify other scripts of scale changes.
const playerScaleChangedEvent = new NetworkEvent<{ player: Player }>("playerScaleChangedEvent");
// Event to receive the name of the currently selected block.
const selectedBlockChanged = new NetworkEvent<{ player: Player, blockName: string }>('selectedBlockChanged');
// Event to receive the held state of the tool.
const toolHoldStateChanged = new NetworkEvent<{ player: Player, isHolding: boolean }>('toolHoldStateChanged');

/**
 * A UI component that displays the currently selected block name and provides
 * controls for the player to adjust their avatar's scale.
 */
class PlayerMobileUI extends UIComponent<typeof PlayerMobileUI> {
  static propsDefinition = {
    enabled: { type: PropTypes.Boolean, default: true },
    minScale: { type: PropTypes.Number, default: 0.5 },
    maxScale: { type: PropTypes.Number, default: 2.0 },
    scaleStep: { type: PropTypes.Number, default: 0.1 },
  };

  // UI panel dimensions must be literal values.
  panelWidth = 290;
  panelHeight = 100;

  // Bindings for UI elements that update per player.
  private progressBarBinding = new Binding<string>("50%");
  private scaleTextBinding = new Binding<string>("100%");
  private blockNameBinding = new Binding<string>("");
  private blockNameViewVisibilityBinding = new Binding<boolean>(false);

  override preStart() {
    // Set initial UI state and visibility for players as they enter.
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterWorld,
      (player: Player) => {
        // Check the player's device type to determine UI visibility.
        if (player.deviceType.get() === PlayerDeviceType.VR) {
          // Hide the UI for VR players.
          this.entity.setVisibilityForPlayers([player], PlayerVisibilityMode.HiddenFrom);
        } else {
          // Show the UI for screen players and update their state.
          this.entity.setVisibilityForPlayers([player], PlayerVisibilityMode.VisibleTo);
          this.updatePlayerScaleUI(player);
        }
      }
    );

    // Listen for external scale changes to keep the UI synchronized.
    this.connectNetworkBroadcastEvent(playerScaleChangedEvent, (data) => {
      if (data && data.player) {
        this.updatePlayerScaleUI(data.player);
      }
    });

    // Listen for changes in the tool's held state.
    this.connectNetworkBroadcastEvent(toolHoldStateChanged, (data) => {
      if (data && data.player) {
        console.log(`UI: Received toolHoldStateChanged event for player ${data.player.id}. isHolding: ${data.isHolding}`);
        this.blockNameViewVisibilityBinding.set(data.isHolding, [data.player]);
      }
    });

    // Listen for changes in the selected block.
    this.connectNetworkBroadcastEvent(selectedBlockChanged, (data) => {
      if (data && data.player) {
        console.log(`UI: Received selectedBlockChanged event for player ${data.player.id}. New block: ${data.blockName}`);
        this.blockNameBinding.set(data.blockName, [data.player]);
      }
    });
  }

  override start() {
    // Set initial UI state and visibility for all players already in the world.
    this.world.getPlayers().forEach(player => {
      if (player.deviceType.get() === PlayerDeviceType.VR) {
        // Hide the UI for VR players.
        this.entity.setVisibilityForPlayers([player], PlayerVisibilityMode.HiddenFrom);
      } else {
        // Show the UI for screen players and update their state.
        this.entity.setVisibilityForPlayers([player], PlayerVisibilityMode.VisibleTo);
        this.updatePlayerScaleUI(player);
      }
    });
  }

  private increaseScale(player: Player) {
    if (player.id === this.world.getServerPlayer().id) return;
    const currentScale = player.avatarScale.get();
    const newScale = Math.min(currentScale + this.props.scaleStep, this.props.maxScale);
    player.avatarScale.set(newScale);
    this.updatePlayerScaleUI(player);
    this.sendNetworkBroadcastEvent(playerScaleChangedEvent, { player });
  }

  private decreaseScale(player: Player) {
    if (player.id === this.world.getServerPlayer().id) return;
    const currentScale = player.avatarScale.get();
    const newScale = Math.max(currentScale - this.props.scaleStep, this.props.minScale);
    player.avatarScale.set(newScale);
    this.updatePlayerScaleUI(player);
    this.sendNetworkBroadcastEvent(playerScaleChangedEvent, { player });
  }

  private updatePlayerScaleUI(player: Player) {
    if (player.id === this.world.getServerPlayer().id) return;
    
    const scale = player.avatarScale.get();
    const range = this.props.maxScale - this.props.minScale;
    const progress = range > 0 ? (scale - this.props.minScale) / range : 0;
    const clampedProgress = Math.max(0, Math.min(1, progress));

    this.progressBarBinding.set(`${clampedProgress * 100}%`, [player]);
    this.scaleTextBinding.set(`${Math.round(scale * 100)}%`, [player]);
  }

  private createScaleButton(label: string, onClick: (player: Player) => void): UINode {
    const baseColor = "rgba(96, 96, 96, 0.8)";
    const hoverColor = "rgba(128, 128, 128, 0.9)";
    const pressColor = "rgba(64, 64, 64, 0.9)";
    const backgroundColorBinding = new Binding(baseColor);

    return Pressable({
      onClick: onClick,
      onEnter: (player) => backgroundColorBinding.set(hoverColor, [player]),
      onExit: (player) => backgroundColorBinding.set(baseColor, [player]),
      onPress: (player) => backgroundColorBinding.set(pressColor, [player]),
      onRelease: (player) => backgroundColorBinding.set(hoverColor, [player]),
      children: [
        Text({
          text: label,
          style: {
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            textAlignVertical: "center",
          },
        }),
      ],
      style: {
        backgroundColor: backgroundColorBinding,
        borderRadius: 25,
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
      },
    });
  }

  initializeUI(): UINode {
    if (!this.props.enabled) {
      this.entity.visible.set(false);
    }

    return View({
      children: [
        UINode.if(this.blockNameViewVisibilityBinding,
          View({
            children: [
              Text({
                text: this.blockNameBinding,
                style: {
                  fontSize: 18,
                  color: 'white',
                  textAlign: 'center',
                  marginHorizontal: 10,
                }
              })
            ],
            style: {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,
            }
          })
        ),
        View({
          children: [
            this.createScaleButton("-", this.decreaseScale.bind(this)),
            View({
              style: {
                width: 150,
                height: 20,
                backgroundColor: '#333',
                borderRadius: 10,
                overflow: 'hidden',
                marginHorizontal: 10,
                justifyContent: 'center',
              },
              children: [
                View({
                  style: {
                    height: '100%',
                    width: this.progressBarBinding,
                    backgroundColor: '#4CAF50',
                  },
                }),
                Text({
                  text: this.scaleTextBinding,
                  style: {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    color: 'white',
                    fontSize: 14,
                    textShadowColor: 'black',
                    textShadowOffset: [1, 1],
                    textShadowRadius: 1,
                  },
                }),
              ],
            }),
            this.createScaleButton("+", this.increaseScale.bind(this)),
          ],
          style: {
            flexDirection: 'row',
            alignItems: 'center',
          }
        }),
      ],
      style: {
        left: 20,
        bottom: 20,
        position: "absolute",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 10,
        borderRadius: 30,
      },
    });
  }
}
UIComponent.register(PlayerMobileUI);
