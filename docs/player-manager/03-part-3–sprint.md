# Player Management – Part 3 – Sprint

Note: You can sprint by default in Horizon worlds by pressing the left analogue stick when you are moving or using the 'shift' key on the keyboard. I have asked in the relevant channel how you bind these directly as it is not clear from the documentation but for now in this tutorial we map to another key.  

In the previous tutorial, we introduced double jump mechanics that were automatically applied to players upon entering the World. In this instalment, we will build upon that foundation by implementing a sprint mechanic, allowing players to move more swiftly for a limited duration. Additionally, we will create a straightforward Heads-Up Display (HUD) to visually monitor the player's sprint stamina, ensuring users can easily keep track of their sprinting capabilities during gameplay.

Lets start by openening your `Player Logic` world in the desktop editor and then open the `LocalPlayerController` script. First we will define the new property which will contain the information needed to manage the sprint mechanic. Add the following after the `doubleJump` definition.

```typescript
  private sprint: {
    input: hz.PlayerInput | null,
    defaultDuration: number,
    duration: number,
    has: boolean,
    last: number
  } = { 
    input: null,
    defaultDuration: 5,
    duration: 0,
    has: false,
    last: 0
  };
```
Now we need to extend our player options events, in this case we would like to make the `defaultDuration` a player can sprint configurable. First update the `onSetPlayerOptions` `connectNetworkEvent` within the `localPreStart` to the following:
```typescript
    this.setPlayerOptionsSub = this.connectNetworkEvent(
      this.owner,
      Events.onSetPlayerOptions,
      (data: { doubleJumpAmount: number, sprintDefaultDuration: number }) => {
        console.log('Received player options:', data);
        this.doubleJump.amount = data.doubleJumpAmount;
        this.sprint.defaultDuration = data.sprintDefaultDuration;
      }
    );
```
Then open `GameUtils.ts` and extend the event definition like so:

```typescript
    onSetPlayerOptions: new hz.LocalEvent<{ doubleJumpAmount: number, sprintDefaultDuration: number }>("sendPlayerOptions")
```
Now we have the event updated open `PlayerController.ts` and extend the `propsDefinition` with a `sprintDefaultDuration` property.
```typescript
  static propsDefinition = {
    doubleJumpAmount: { type: hz.PropTypes.Number, default: 5 },
    sprintDefaultDuration: { type: hz.PropTypes.Number, default: 5 },
  };
```
Finally to complete the round trip, update the `sendNetworkEvent` inside the `connectNetworkBroadcastEvent` inside the `start` function.
```typescript
    this.connectNetworkBroadcastEvent(
      Events.getPlayerOptions,
      (data: { player: hz.Player }) => {
        this.sendNetworkEvent(
          data.player,
          Events.onSetPlayerOptions,
          {
            doubleJumpAmount: this.props.doubleJumpAmount,
            sprintDefaultDuration: this.props.sprintDefaultDuration
          }
        );
      }
    );
```
Save and check your world, when you enter in your console a message like `Received player options: {"doubleJumpAmount": 5, "sprintDefaultDuration": 5}`.

Next we will implement the basic sprint mechanic. First we need to connect our input we will use the `RightSecondary` on the quest controller which is mapped to 'F' on the keyboard. This is because the `RightPrimary` on the quest is 'jump'. Add the following `connectSprintInputs` definition in `LocalPlayerController.ts` after the `connectDoubleJumpInputs`.

```typescript
  connectSprintInputs() {
    const options = {
      preferredButtonPlacement: hz.ButtonPlacement.Center,
    };

    this.sprint.input = hz.PlayerControls.connectLocalInput(
      hz.PlayerInputAction.RightSecondary,
      hz.ButtonIcon.Sprint,
      this,
      options,
    );

    this.sprint.input.registerCallback((action, pressed) => {
      if (pressed) {     
        this.sprint.has = true;
        this.owner.sprintMultiplier.set(5.0);
        this.owner.locomotionSpeed.set(10.0);
      } else {
        this.sprint.has = false;
        this.owner.sprintMultiplier.set(1.0);
        this.owner.locomotionSpeed.set(5.0);
      }
    });
  }
```
This follows the same pattern as `connectDoubleJumpInputs` this time setting the `sprintMultiplier` and `locomotionSpeed` on the current players avatar. Now call this new function inside of the `localPreStart` function below where we call `connectDoubleJumpInputs`.
```typescript
    this.connectSprintInputs();
```
Once you have saved your changes, launch your world to test the new functionality. You should notice a sprint icon appearing alongside the jump icon, and pressing the 'F' key will now allow your player to sprint without any limitations. However, at this stage, the sprint can be used indefinitely, which is not ideal for balanced gameplay.

![One](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0qd0dbd9g4xun7gyv34a.png)

To address this, we need to introduce logic that tracks how long the sprint key is held and enforces a cooldown period once the sprint duration has been exhausted. To achieve this, update the `onUpdateSub` within your `localPreStart` function. This update will calculate the elapsed time while sprinting, increment the duration until it meets the max default duration and prevent further sprinting until some cooldown has completed. This ensures that players must manage their sprint stamina strategically, adding an extra layer of challenge and engagement to your world. Update with the following code.

```typescript
    this.onUpdateSub = this.connectLocalBroadcastEvent(
      hz.World.onUpdate,
      (data: {deltaTime: number}) => {
        //reset ability to double jump or boost when player is grounded
        if (this.doubleJump.has && this.owner.isGrounded.get()) {
          this.doubleJump.has = false;
          this.doubleJump.first = false;
          this.doubleJump.second = false;
        }

        if (this.sprint.has) {
          if (this.sprint.duration < this.sprint.defaultDuration) {
            this.sprint.duration += data.deltaTime;
            if (this.sprint.duration >= this.sprint.defaultDuration) {
              this.owner.sprintMultiplier.set(1.0);
              this.owner.locomotionSpeed.set(5.0);
            }
          }
          // TODO HUD
        } else if (this.sprint.duration) {
          this.sprint.duration -= data.deltaTime;
          if (this.sprint.duration < 0) {
            this.sprint.duration = 0;
          } 
          // TODO HUD
        }
      }
    );
```
If sprint.has is true the button is pressed so increment the duration with the time that has passed since the last event. If the sprint duration is greater than the default duration slow the player back down to normal speed. Else if duration is not 0 we are in a cooldown period so deincrement the duration until it reaches 0.

If you now save and run again after 5 seconds have elapsed your avatar will return to running at a normal speed.

With the core sprint functionality in place, the next step is to create a simple Heads-Up Display (HUD) that enables players to monitor their sprint stamina in real time. To achieve this, we will utilise a custom UI gizmo within the editor.

Begin by opening the gizmos panel and dragging a Custom UI component onto your world. Rename it `LocalPlayerHUD1`. (NOTE: Like with LocalPlayerController1 you will eventually need to duplicate this entity for the max number of allowed players in your world)

![Two](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q2ist68kpwo2zipp1xx2.png)

Change the Display Mode to `Screen Overlay` and tag the object with `LocalPlayerHUD`.

![Three](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ifkof99mcog9u995zvzl.png)

![Four](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fvjk4rzzq8fvj000mpqq.png)

Next create a new script called `LocalPlayerHUD` and attach it to your `LocalPlayerHUD1` object. Remember to make the script local!

![Five](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nlqpokd3amlmwoensmo1.png)

![Six](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tg0fkpzazl8cqres0o0d.png)

![Seven](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n8d8ngc7qgfzkxitoh26.png)

Now open the new `LocalPlayerHUD1` script in your editor we need to make a few changes to make the script a UI component. First we need to import the ui components from `horizon/ui` and we need to import our custom Events object so we can extend and communicate between our controller and our HUD. Add the following import lines near the top of your file.

```typescript
import * as ui from 'horizon/ui';
import { Events } from 'GameUtils';
```
Next, modify your `LocalPlayerHUD` class definition to extend from the `UIComponent` class. This will provide us with the `initialiseUI` function, which can be used to render a custom interface.
```typescript
class LocalPlayerHUD extends ui.UIComponent<typeof LocalPlayerHUD> {
```
Now we need to think a little about the UI itself, today we are going to use a simple progress bar to visualise how much stamina is remaining and it's cooldown. We will position the progress bar on the right hand side of the screen. We will use a bound property to dynamically update the view. First lets define that property and call it `sprintProgress` we will use a string property for simplicity and set a default to 100%.

```typescript
  private sprintProgress = new ui.Binding<string>('100%');
```
We then need to implement the `initializeUI` function to render the view. To do this we use `View` components with fixed width and height positioned absolute on the screen.
```typescript
  initializeUI() {
    return ui.View({
      children: [
        ui.View({
          style: {
            position: 'absolute',
            right: 20,
            bottom: 20,
            height: '50%',
            width: 20,
            backgroundColor: 'gray',
            borderRadius: 10,
          },
          children: [
            ui.View({
              style: {
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: this.sprintProgress,
                backgroundColor: 'blue',
                borderRadius: 10,
              },
            }),
          ]
        }),
      ],
      style: {
        position: 'relative',
        width: '100%',
        height: '100%',
      },
    });
  }
```
With that created we need to actually attach the HUD to our player when they enter the world, to do this we will use the same pattern as `LocalPlayerController`s. Open `PlayerController.ts` and add a property to store the HUD's.
```typescript
private localPlayerHUDs = new Array<hz.Entity>();
```
Then inside of preStart populate this property using `getEntitiesWithTags`.
```typescript
    this.localPlayerHUDs = this.world.getEntitiesWithTags(["LocalPlayerHUD"]);
```
And connect the HUDs inside of `registerPlayer`:
```typescript
 this.localPlayerHUDs[playerIndex].owner.set(player);
```
To disconnect extend `deregisterPlayer` with:
```typescript
   this.localPlayerHUDs[playerIndex].owner.set(this.world.getServerPlayer());
```
Save all your open files and then open the editor and play your world. You should see a blue bar on the right hand side, this does not move yet when you sprint we will implement that logic next.

![Eight](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j0zqeghc4y6eaq55nafc.png)

To connect the progress bar with our sprint mechanics we are going to need a new event. Open the GameUtils file and extend with the following.
```typescript
    setHUDSprint: new hz.LocalEvent<{ sprint: number }>("setHUDSprint"),
```
Then inside of the LocalPlayerHUD script add a listener to the event inside of the `start` function.
```typescript
   this.connectNetworkEvent(
      this.entity.owner.get(),
      Events.setHUDSprint,
      (data: { sprint: number }) => {
        console.log(`Setting HUD sprint to ${data.sprint}%`);
        this.sprintProgress.set(`${data.sprint}%`);
      }
    );

```
With that in place our HUD is setup to listen to updates and will automatically update the progress bar when an event is recieved. Now we need to send the event message when we are sprinting. Inside the `LocalPlayerController` add a new function `updateSprintHUD`.
```typescript
  private updateSprintHUD() {
    let now = Date.now();
    if (this.sprint.duration && this.sprint.last && now - this.sprint.last < 500) {
      return; // Apparently you need to rate limit this
    }
    this.sprint.last = now;
    this.sendNetworkEvent(
      this.owner,
      Events.setHUDSprint,
      { sprint: 100 - ((this.sprint.duration / this.sprint.defaultDuration) * 100) } // Convert to percentage
    );
  }
```
This function has some rate limiting logic because if you send too many events through `sendNetworkEvent` your UI will not work as expected. Other than that we simply calculate the percentage of sprint stamina the current player has remaining and broadcasts that as an `setHUDSprint` event. We now need to connect this function in our `localPreStart` function update the two `TODO` comments with:
```typescript
          this.updateSprintHUD();
```
Once you have connected the function you can save and run your world, now when you sprint the progress bar should decrease and then increase/refill while you are not sprinting. 

Before we finish for this tutorial we have one small thing left to do and that is to clean up our `LocalPlayerController` when a player disconnects. To do this we can add a callback function inside of `serverStart`.
```typescript
        this.cleanup();
```
Then define the function near the end of your class:
```typescript
  cleanup() {
    this.setPlayerOptionsSub?.disconnect();
    this.setPlayerOptionsSub = null;

    this.onUpdateSub?.disconnect();
    this.onUpdateSub = null;

    if (this.doubleJump.input) {
      this.doubleJump.input.disconnect();
      this.doubleJump.input = null;
    }

    if (this.sprint.input) {
      this.sprint.input.disconnect();
      this.sprint.input = null;
    }
  }
```
This brings us to the end of this player manager tutorial series. You have now successfully implemented a sprint mechanic complete with stamina management and a visual HUD indicator, enhancing both the gameplay and user experience within your Horizon World. Players can now sprint for a limited time, monitor their stamina in real time, and must manage their sprinting strategically to maintain an advantage.

Until next time... happy coding!

Final Scripts:

GameUtils.ts

```typescript
import * as hz from "horizon/core";

export const Events = {
    getPlayerOptions: new hz.LocalEvent<{ player: hz.Player }>("getPlayerOptions"),
    onSetPlayerOptions: new hz.LocalEvent<{ doubleJumpAmount: number }>("sendPlayerOptions"),
    setHUDSprint: new hz.LocalEvent<{ sprint: number }>("setHUDSprint"),
}
```
PlayerController.ts
```typescript
import * as hz from 'horizon/core';
import { Events } from 'GameUtils';
class PlayerController extends hz.Component<typeof PlayerController> {
  static propsDefinition = {
    doubleJumpAmount: { type: hz.PropTypes.Number, default: 5 },
    sprintDefaultDuration: { type: hz.PropTypes.Number, default: 5 },
  };
  private players = new Array<hz.Player>();
  private localPlayerControllers = new Array<hz.Entity>();
  private localPlayerHUDs = new Array<hz.Entity>();

  preStart() {
    this.localPlayerControllers = this.world.getEntitiesWithTags(["LocalPlayerControl"]);
    this.localPlayerHUDs = this.world.getEntitiesWithTags(["LocalPlayerHUD"]);
  }

  start() {
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterWorld,
      (player: hz.Player) => this.registerPlayer(player)
    );

    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerExitWorld,
      (player: hz.Player) => this.deregisterPlayer(player)
    );

    this.connectNetworkBroadcastEvent(
      Events.getPlayerOptions,
      (data: { player: hz.Player }) => {
        this.sendNetworkEvent(
          data.player,
          Events.onSetPlayerOptions,
          {
            doubleJumpAmount: this.props.doubleJumpAmount,
            sprintDefaultDuration: this.props.sprintDefaultDuration
          }
        );
      }
    );
  }

  private registerPlayer(player: hz.Player) {
    console.log(`Player ${player.name.get()} has entered the world.`);
    if (!this.players.includes(player)) {
      this.players.push(player);
      let playerIndex = this.players.indexOf(player);
      if (playerIndex < this.localPlayerControllers.length) {
        this.localPlayerHUDs[playerIndex].owner.set(player);
        this.localPlayerControllers[playerIndex].owner.set(player);
      }
    }
  }

  private deregisterPlayer(player: hz.Player) {
    console.log(`Player ${player.name.get()} has exited the world.`);
    const playerIndex = this.players.indexOf(player);
    if (playerIndex !== -1) {
      this.localPlayerHUDs[playerIndex].owner.set(this.world.getServerPlayer());
      this.localPlayerControllers[playerIndex].owner.set(this.world.getServerPlayer());
      this.players.splice(playerIndex, 1);
    }
  }
}
hz.Component.register(PlayerController);
```
LocalPlayerController.ts
```typescript
import * as hz from 'horizon/core';
import { Events } from 'GameUtils';

class LocalPlayerController extends hz.Component<typeof LocalPlayerController> {
  static propsDefinition = {};
  private owner!: hz.Player;
  private onUpdateSub: hz.EventSubscription | null = null;
  private setPlayerOptionsSub: hz.EventSubscription | null = null;
  private doubleJump: { 
    input: hz.PlayerInput | null,
    amount: number,
    has: boolean,
    first: boolean,
    second: boolean
  } = { 
    input: null, 
    amount: 0, 
    has: false, 
    first: false, 
    second: false 
  };
  private sprint: {
    input: hz.PlayerInput | null,
    defaultDuration: number,
    duration: number,
    has: boolean,
    last: number
  } = { 
    input: null,
    defaultDuration: 5,
    duration: 0,
    has: false,
    last: 0
  };

  preStart() {
    this.owner = this.entity.owner.get();
    if (this.owner !== this.world.getServerPlayer()) {
      this.localPreStart();
    }
  }

  start() {
    if (this.owner === this.world.getServerPlayer()) {
      this.serverStart();
    } else {
      this.localStart();
    }
  }

  private localPreStart() {
    console.log('LocalPlayerController preStart');
    this.connectDoubleJumpInputs();
    this.connectSprintInputs();
    // Additional local pre-start logic can be added here
    this.onUpdateSub = this.connectLocalBroadcastEvent(
      hz.World.onUpdate,
      (data: {deltaTime: number}) => {
        //reset ability to double jump or boost when player is grounded
        if (this.doubleJump.has && this.owner.isGrounded.get()) {
          this.doubleJump.has = false;
          this.doubleJump.first = false;
          this.doubleJump.second = false;
        }

        if (this.sprint.has) {
          if (this.sprint.duration < this.sprint.defaultDuration) {
            this.sprint.duration += data.deltaTime;
            if (this.sprint.duration >= this.sprint.defaultDuration) {
              this.owner.sprintMultiplier.set(1.0);
              this.owner.locomotionSpeed.set(5.0); // Reset to normal speed
            }
          }
          this.updateSprintHUD();
        } else if (this.sprint.duration) {
          this.sprint.duration -= data.deltaTime;
          if (this.sprint.duration < 0) {
            this.sprint.duration = 0; // Prevent negative duration
          } 
          this.updateSprintHUD();
        }
      }
    );

    this.setPlayerOptionsSub = this.connectNetworkEvent(
      this.owner,
      Events.onSetPlayerOptions,
      (data: { doubleJumpAmount: number, sprintDefaultDuration: number }) => {
        console.log('Received player options:', data);
        this.doubleJump.amount = data.doubleJumpAmount;
        this.sprint.defaultDuration = data.sprintDefaultDuration;
      }
    );
  }

  private localStart() {
    console.log('LocalPlayerController started for local player');
    // Additional local start logic can be added here
    this.sendNetworkBroadcastEvent(
      Events.getPlayerOptions,
      { player: this.owner }
    );
  }

  private serverStart() {
    console.log('LocalPlayerController started for server player');
    this.cleanup();
    // Additional server start logic can be added here
  }

  private connectDoubleJumpInputs() {
    const options = {
      preferredButtonPlacement: hz.ButtonPlacement.Center,
    };
    
    this.doubleJump.input = hz.PlayerControls.connectLocalInput(
      hz.PlayerInputAction.Jump,
      hz.ButtonIcon.Jump,
      this,
      options,
    );

    this.doubleJump.input.registerCallback((action, pressed) => {
      if (pressed) {
        console.log(`Double jump input pressed, amount: ${this.doubleJump.amount}`);
        this.doubleJump.has = true;

        if (!this.doubleJump.first) {
          this.doubleJump.first = true;
        } else if (!this.doubleJump.second) {
          this.doubleJump.second = true;
          let ownerVel = this.owner.velocity.get();
          this.owner.velocity.set(
            new hz.Vec3(ownerVel.x, this.doubleJump.amount, ownerVel.z)
          );
        }
      }
    });
  }

  connectSprintInputs() {
    const options = {
      preferredButtonPlacement: hz.ButtonPlacement.Center,
    };

    this.sprint.input = hz.PlayerControls.connectLocalInput(
      hz.PlayerInputAction.RightSecondary,
      hz.ButtonIcon.Sprint,
      this,
      options,
    );

    this.sprint.input.registerCallback((action, pressed) => {
      if (pressed) {     
        this.sprint.has = true;
        this.owner.sprintMultiplier.set(5.0);
        this.owner.locomotionSpeed.set(10.0); // Example multiplier for sprinting
      } else {
        this.sprint.has = false;
        this.owner.sprintMultiplier.set(1.0);
        this.owner.locomotionSpeed.set(5.0); // Reset to normal when not sprinting
      } 
    });
  }

  private updateSprintHUD() {
    console.log('Updating sprint HUD');
    let now = Date.now();
    if (this.sprint.duration && this.sprint.last && now - this.sprint.last < 500) {
      return; // Apparently you need to rate limit this
    }
    this.sprint.last = now;
    this.sendNetworkEvent(
      this.owner,
      Events.setHUDSprint,
      { sprint: 100 - ((this.sprint.duration / this.sprint.defaultDuration) * 100) } // Convert to percentage
    );
  }

  cleanup() {
    this.setPlayerOptionsSub?.disconnect();
    this.setPlayerOptionsSub = null;

    this.onUpdateSub?.disconnect();
    this.onUpdateSub = null;

    if (this.doubleJump.input) {
      this.doubleJump.input.disconnect();
      this.doubleJump.input = null;
    }

    if (this.sprint.input) {
      this.sprint.input.disconnect();
      this.sprint.input = null;
    }
  }

}
hz.Component.register(LocalPlayerController);
```
LocalPlayerHUD.ts
```typescript
import * as hz from 'horizon/core';
import * as ui from 'horizon/ui';
import { Events } from 'GameUtils';

class LocalPlayerHUD extends ui.UIComponent<typeof LocalPlayerHUD> {
  static propsDefinition = {};

  private sprintProgress = new ui.Binding<string>('100%');

  initializeUI() {
    return ui.View({
      children: [
        ui.View({
          style: {
            position: 'absolute',
            right: 20,
            bottom: 20,
            height: '50%',
            width: 20,
            backgroundColor: 'gray',
            borderRadius: 10,
          },
          children: [
            ui.View({
              style: {
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: this.sprintProgress,
                backgroundColor: 'blue',
                borderRadius: 10,
              },
            }),
          ]
        }),
      ],
      style: {
        position: 'relative',
        width: '100%',
        height: '100%',
      },
    });
  }

  start() {
    this.connectNetworkEvent(
      this.entity.owner.get(),
      Events.setHUDSprint,
      (data: { sprint: number }) => {
        console.log(`Setting HUD sprint to ${data.sprint}%`);
        this.sprintProgress.set(`${data.sprint}%`);
      }
    );
  }
}
hz.Component.register(LocalPlayerHUD);
```
