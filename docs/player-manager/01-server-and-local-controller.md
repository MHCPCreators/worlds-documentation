# Player Management – Part 1 – Server and Local Controlle

In this three part tutorial, we’ll explore the core concepts of player management in Horizon Worlds, focusing on how to structure your scripts for both server and local player controllers. Our objective is to build a robust foundation that enables seamless communication and synchronisation between all players in your world. After the completion of this three part tutorial you will have an avatar that can double jump and sprint for short periods of time.

Horizon Worlds uses scripts to define interactive behaviours and game logic. These scripts are written in TypeScript, a strongly-typed superset of JavaScript, which helps catch errors early and improves code maintainability. There are two main types of scripts in Horizon Worlds:

- **Server Scripts:** These run exclusively on the server and are responsible for managing shared game state, handling events that affect all players, and ensuring consistency across the multiplayer environment.
- **Local Scripts:** These can run both on the server and locally on a player's device. Local scripts are typically used for handling player-specific logic, such as input processing, UI updates, and other actions that only affect the individual player.

Understanding the distinction between server and local scripts is crucial for building efficient and responsive multiplayer experiences. By leveraging both types appropriately, you can ensure that your worlds are both interactive and synchronised for all participants.

In this first part of the tutorial, we will focus on establishing the foundational structure required for effective player management. Our primary objective is to outline the essential components and script organisation that will support both server and local player controllers. By the end of this section, you will have a clear skeleton in place, setting the stage for more advanced features.

So lets begin, first create a new world in your desktop editor and rename it to 'Player Logic'.

![One](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mwr2jdhz33tr17krd373.png)

Next create a new empty object and call it PlayerController.

![Two](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2h7xyyzh1jnrha7kw188.png)

Then create the skeleton script, call it PlayerController and attach it to your object.

![Three](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9m6wzr2pqni8eq45vdv5.png)

![Four](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rednfn7n8mozt8wtgbnx.png)

Now open the script in your editor. It will look like:

```typescript
import * as hz from 'horizon/core';

class PlayerController extends hz.Component<typeof PlayerController> {
  static propsDefinition = {};

  start() {

  }
}
hz.Component.register(PlayerController);
```
To extend our skeleton and enable effective player management, we need to track when players join and leave the world. This requires us to maintain a list of connected players and respond to player connection events.

First, we'll introduce a private `players` property to our `PlayerController` class. This property will be an array that stores information about each connected player. By keeping this list up to date, we can efficiently manage player-specific logic and interactions.

Next, we'll leverage Horizon Worlds' event system by subscribing to the `OnPlayerEnterWorld` and `OnPlayerExitWorld` `CodeBlockEvents`. These events are triggered whenever a player enters or exits the world, allowing us to update our `players` array accordingly.

Here's how you can modify your `PlayerController` script to handle player connections:

```typescript
import * as hz from 'horizon/core';

class PlayerController extends hz.Component<typeof PlayerController> {
  static propsDefinition = {};
  private players = new Array<hz.Player>();

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
  }

  private registerPlayer(player: hz.Player) {
    console.log(`Player ${player.name.get()} has entered the world.`);
    if (!this.players.includes(player)) {
      this.players.push(player);
    }
  }

  private deregisterPlayer(player: hz.Player) {
    console.log(`Player ${player.name.get()} has exited the world.`);
    const playerIndex = this.players.indexOf(player);
    if (playerIndex !== -1) {
      this.players.splice(playerIndex, 1);
    }
  }
}
hz.Component.register(PlayerController);
```
We have implemented the logic as stated. To improve code readability and maintainability, we use dedicated functions as callbacks for handling events. This approach not only makes the codebase easier to understand but also simplifies future modifications and debugging by keeping event-handling logic modular and organised.

If you now save your script and run the program, in the console you should see a message printed that you have 'entered the world.'.

Next, we need to implement a Local Controller, which will be responsible for managing and enhancing the player's experience as they join the game world. This controller will allow us to add custom features and behaviours to the player.

In the Editor create a new empty object and rename it LocalPlayerController1.

![Five](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g18rmfzh5k6smi7wwett.png)

Then create a new script called `LocalPlayerController` you must then change the `Execution Mode` to be `Local`. Then attach the script to your object LocalPlayerController1.

![Six](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rps5jtpjo8frs4ij86c6.png)

![Seven](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p361qpge9c03eeyyly3j.png)

![Eight](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ahstti53db9blg3vir6t.png)

NOTE: Before you publish your game you will need to duplicate this LocalPlayerController1 object for the total max number of players permitted in your world. This can be configured in the `Player Settings` so if you have 8 max players you would have LocalPlayerController1 through to LocalPlayerController8. I would do this step near the end of your project.

![Nine](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sh6my201azber57urcz5.png)

Now with the script connected to the object, open it in your editor it will look like.

```typescript
import * as hz from 'horizon/core';

class LocalPlayerController extends hz.Component<typeof LocalPlayerController> {
  static propsDefinition = {};

  start() {

  }
}
hz.Component.register(LocalPlayerController);
```
We won't add much functionality in this tutorial just some placeholder functionality to demonstrate that this script runs more than once, more specifically that it runs when you attach it to a user.

First we will add a private property owner that will contain the owner of the script. By default the entity owner is ther server.

```typescript
    private owner!: hz.Player;
```

Next we will add a preStart() function that will log when it's called and call a private localPreStart function if it's attached to a real player and not the server.

```typescript
  preStart() {
    this.owner = this.entity.owner.get();
    if (this.owner !== this.world.getServerPlayer()) {
      this.localPreStart();
    }
  }
```
The preStart function sets the private property we created in the previous step with the current entity owner. If the owner of the entity is not the default server player then we call a yet to be defined localPreStart function. Inside this function we will add logic specific to when we connect with a player. For now just add a stub function with some debug logging below the default `start` function.

```typescript
  private localPreStart() {
    console.log('LocalPlayerController preStart');
   
  }
```
Next we need to update the `start` function to differentiate between when the script is running for the server player versus a local player. We'll do this by checking the `owner` property we set in `preStart()`. If the owner is the server player, we'll call a `serverStart()` method; otherwise, we'll call a `localStart()` method. This separation allows you to implement logic specific to either the server or the local player in their respective methods.
```typescript
  start() {
    if (this.owner === this.world.getServerPlayer()) {
      this.serverStart();
    } else {
      this.localStart();
    }
  }
```
Then just add some stub functions for `serverStart` and `localStart` with a debug message.
```typescript
  private localStart() {
    console.log('LocalPlayerController started for local player');
  }

  private serverStart() {
    console.log('LocalPlayerController started for server player');
  }
```
You should now be able to save your script and when you enter your world in the desktop editor you will only see a console log message relating to the 'LocalPlayerController started for server player'. Your final script should look something like.

```typescript
import * as hz from 'horizon/core';

class LocalPlayerController extends hz.Component<typeof LocalPlayerController> {
  static propsDefinition = {};
  private owner!: hz.Player;

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
  }

  private localStart() {
    console.log('LocalPlayerController started for local player');
  }

  private serverStart() {
    console.log('LocalPlayerController started for server player');
  }
}
hz.Component.register(LocalPlayerController);
```
We are now ready to integrate the `LocalPlayerController` with the `PlayerController` class. There are several approaches: we could create properties for each `LocalPlayerController`, register them using a custom event, or use tags to retrieve all related assets. In this guide, we'll use the tagging method.

First in your editor click on your LocalPlayerController1 object and add a 'Gameplay tag' inside the properties 'LocalPlayerControl'. Now open the PlayerController script in your editor.

![Ten](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lag6cehunt7ehehatmft.png)

Below the players property we will define a new property localPlayerControllers that will be an array of entities.

```typescript
  private localPlayerControllers = new Array<hz.Entity>();
```

Then we will populate the attribute inside of a preStart function user the getEntitiesWithTags function available from the world class.

```typescript
  preStart() {
    this.localPlayerControllers = this.world.getEntitiesWithTags(["LocalPlayerControl"]);
  }
```

Finally we need to attach and detach the local controllers to the players on entering and exiting the world. To do that update your registerPlayer and deregisterPlayer functions to the following.

```typescript
  private registerPlayer(player: hz.Player) {
    console.log(`Player ${player.name.get()} has entered the world.`);
    if (!this.players.includes(player)) {
      this.players.push(player);
      let playerIndex = this.players.indexOf(player);
      if (playerIndex < this.localPlayerControllers.length) {
        this.localPlayerControllers[playerIndex].owner.set(player);
      }
    }
  }

  private deregisterPlayer(player: hz.Player) {
    console.log(`Player ${player.name.get()} has exited the world.`);
    const playerIndex = this.players.indexOf(player);
    if (playerIndex !== -1) {
      this.localPlayerControllers[playerIndex].owner.set(this.world.getServerPlayer());
      this.players.splice(playerIndex, 1);
    }
  }
```
You should be able to follow what as changed we are simply accessing the localPlayerControllers by playerIndex and then setting the owner correctly on connection and disconnection.

If you now save this and enter your world when you inspect your console you will see that the LocalPlayerController script is called on change of owner.

![Eleven](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dgj7pacfar71r60vljm3.png)

I hope this tutorial was helpful! In the next part, we will explore how to enhance the player experience by adding extra functionality. More specifically, implementing a double jump mechanic. This will involve updating our player controllers to detect jump inputs and manage jump counts, allowing players to perform a second jump while in mid-air. In the third part of this tutorial we will explore adding. Once we have that implemented we will look into how we can make our avatar sprint for a short period of time before adding a cooldown.

r
