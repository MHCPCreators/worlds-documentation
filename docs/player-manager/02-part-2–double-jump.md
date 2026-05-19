# Player Management – Part 2 – Double Jump

Previously, we introduced the fundamentals of player management within our Horizon world. We developed two foundational controllers: a server-side controller responsible for overseeing all players globally, and a client-side controller dedicated to handling each player's local interactions. In this tutorial we are going to implement double jump mechanics. 

First open your 'Player Logic' world in the editor. We will first need to configure in 'Player Settings' the 'Custom Player Movement' option so that we can modify our avatars behaviour within the world.

![One](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/83r5qiwfjg1kigjhe9hw.png)

![Two](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tf54wpdr34k7a2z5l6b9.png)

Next, open the `LocalPlayerController` script in your editor. Before we make any modifications, it's important to consider the structure of our codebase and how different components communicate with each other. In Horizon Worlds, a common and effective approach for inter-script communication is the use of custom events. 

Currently, our project does not have any custom events defined. To enable flexible and decoupled communication between scripts such as notifying the player controller when a jump action occurs or when player state changes—we should establish a set of custom events. These events will allow different parts of our system to respond to gameplay actions, in our case we first are just going to setup some events to handle the passing of configuration variables between our classes. This way we can configure all properties on our global controller and then pass into our local controllers. This saves us time when we want to change things as it's in one place and not N.

In visual studios, create a new file within your script directory called `GameUtils.ts`. Update that file to be the following:

![Three](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qemirly8c4vo1f9jvjh6.png)

```typescript
import * as hz from "horizon/core";

export const Events = {
    getPlayerOptions: new hz.LocalEvent<{ player: hz.Player }>("getPlayerOptions"),
    onSetPlayerOptions: new hz.LocalEvent<{ doubleJumpAmount: number }>("sendPlayerOptions"),
}
```

Now go back to the `LocalPlayerController.ts` file and import the Events into the package.
```typescript
import { Events } from 'GameUtils';
```
We are now going to need to define a few more properties to store the relevant information relating to our double jump mechanism.

We are going to define an `onUpdateSub` property that will store a reference to the global world `onUpdate` event. We are also going to setup a `setPlayerOptionsSub` which will store a reference to `onSetPlayerOptions` event and finally we are going to define an object/hash property that contains information about the double jump
action.

Extend the controller under the `owner` property with the following:

```typescript
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
```
Lets start by setting up the event handlers to retrieve options from our global controller about our player controls. First we need a listener so inside of `localPreStart` add the following:

```typescript
    this.setPlayerOptionsSub = this.connectNetworkEvent(
      this.owner,
      Events.onSetPlayerOptions,
      (data: { doubleJumpAmount: number }) => {
        console.log('Received player options:', data);
        this.doubleJump.amount = data.doubleJumpAmount;
      }
    );
```
Next we need to send the `getPlayerOptions` event which we will use to trigger a callback to the above `onSetPlayerOptions` listener. So inside of the localStart function extend with the following.
```typescript
    this.sendNetworkBroadcastEvent(
      Events.getPlayerOptions,
      { player: this.owner }
    );
```
Now our local controller is configured to send a message event to getPlayerOptions and wait for the response inside of onSetPlayerOptions. We need to now configure our Server conroller. Open `PlayerController.ts` and import our new Events object.
```typescript
import { Events } from 'GameUtils';
```
Then define a new propsDefinition so that we can configure this from the Desktop Editor at a later date, we will also set a default just so we don't need to straight away.
```typescript
  static propsDefinition = {
    doubleJumpAmount: { type: hz.PropTypes.Number, default: 5 },
  };
```
With that in place we can add our listener to the `getPlayerOptions` event inside of our `start` function. We will simply return a response by sending an network event message to `onSetPlayerOptions` and our round trip between controllers will be complete. Extend the start function with the following:
```typescript
    this.connectNetworkBroadcastEvent(
      Events.getPlayerOptions,
      (data: { player: hz.Player }) => {
        this.sendNetworkEvent(
          data.player,
          Events.onSetPlayerOptions,
          {
            doubleJumpAmount: this.props.doubleJumpAmount,
          }
        );
      }
    );
```
You can pause here and return to the editor and run your world, you should see some additional additional input in the console once the player is connected.

Okay so lets implement the actual double jump logic, we will abstract into a separate function the logic need. At the top of the `localPreStart` function add a call to a `connectDoubleJumpInputs` function that we will define in a moment.

```typescript
  private localPreStart() {
    console.log('LocalPlayerController preStart');
    this.connectDoubleJumpInputs();
    ...
```
To implement the function we will need to use the `PlayerControls` api provided to connect the players local input and register a callback event. Add the following skeleton code.
```typescript
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
        // TODO
    });
  }
```
Save and now return to your editor, if you have been following along correctly you should see a button now appears with a jump icon.

![Four](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n1doggssc1jxl2abv010.png)

Okay to then implement the double jump we need to perform some calculations within our registerCallback. First we want to check that our input has been pressed, on press we want to mark our has attribute to be true. We then want to check whether this is our first jump or second, if it's the second we need add our extra functionality which is that mid-air jump. To do this we will access the owner property and set it's velocity. Replace the TODO comment with the following:

```typescript
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
```
Save and return to the editor, wait for typescript to compile and play your world. You will discover that it works on the first attempt but then you are unable to double jump again. This is because we are not resetting and we should reset when the player lands. To do this we can use the onUpdate event from the World object. Inside of `localPreStart` after the `connectDoubleJumpInputs` line add the following.
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
      }
    );
```
Save your changes, return to your world, and test the double jump feature. The issue should now be resolved, allowing you to double jump each time you land. Congratulations! You have now implemented double jump functionality in Horizon Worlds. In the next and final part of this player management tutorial series, we will cover adding sprint mechanics to your avatar, including a HUD to display sprint capacity and cooldown.

