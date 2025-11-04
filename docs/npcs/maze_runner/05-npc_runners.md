# Horizon World Tutorial - Maze Runner - Part 5 - NPC runners

In the previous parts of this tutorial series, we built the world, created core gameplay features, added background music, displayed a timer on the HUD, and implemented a random maze generator. In this final section, we'll introduce NPC runners to enhance the challenge. We'll create two types of NPCs: one that navigates the maze randomly, and another that heads straight for the finish line. To keep the game balanced, the direct runner will move slower than the random runner.

Let's get started! We will begin with the random runner. First, open the Maze Runner project you created in the previous parts of this tutorial series in the Desktop editor. We will first need to add an NPC character to the project. Today we will use NPC gizmo. Open the gizmo panel and search for "NPC". Drag and drop the NPC gizmo into the scene. Position the NPC in your lobby area. Adjust the rotation so they face in towards the center of the lobby area. Set the display name to anything you like, in my example I will use 'Rex', set the object name to be the same.

![NPC gizmo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6g1knh5v34wx80rgn0gj.png)

![Rex](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/390macoov2ernt02au7p.png)

Next, we will quickly customise our NPC. Click the 'Edit Avatar' button in the properties panel. This will open the avatar editor in a web browser. Here you can change the appearance of your NPC. Edit the avatar to your liking, then save your changes and return to the desktop editor. Refresh and the NPC will update to reflect your changes.

![Edit Rex](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dr7gnqomezzgogatzfhg.png)

![Kaput](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0useur4e4bp4c5qolxh6.png)

(Note: the NPC editor in your web browser may be slightly broken, so some guess work might be required.)

Once you are happy with you NPC'S appearance, you will need to add a spawn location in the same position that you set your avatar. This will be used to spawn the NPC back into the correct position after a maze round has been completed. To do this, drag and drop a spawn point gizmo into the scene. Position it in the same location as your NPC and set the rotation to match. Rename the spawn point to `RexSpawnPoint` (replacing Rex with the name of your Avatar).

![Rex Spawn Point](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jaiaz11incf3gb21r45v.png)

Now that the NPC and its spawn point are set up, it's time to start coding its behavior. In the Scripts panel, add a new script and name it `RandomNPCRunner`. After creating the script, attach it to your NPC object to begin controlling its movement.

![Random NPC Runner](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/f8x2r8op3ohytgocsfny.png)

Open the script in your editor and you should see the default boilerplate code.

```typescript
import * as hz from 'horizon/core';

class RandomNPCRunner extends hz.Component<typeof RandomNPCRunner> {
  static propsDefinition = {};

  start() {

  }
}
hz.Component.register(RandomNPCRunner);
```
As usual we will import our `GameState` and `Events` types to help us manage the game state and setup listeners for events.
```typescript
import { GameState, Events } from 'GameUtils';
```
This time, we'll also import the `Npc` and 'NpcPlayer' classes. This allows us to cast the NPC asset to the appropriate type so we have access to the functions required to control its behaviour programmatically.
```typescript
import { Npc, NpcPlayer } from 'horizon/npc';
```
Next we will define our `propsDefinition` to include the customisable properties we will need to control the NPC's behavior. We will need a property to define the max and min speed the NPC can move at, as well as properties to define the teleport location into the maze and back to the lobby. Finally we will add an offset to ensure the NPCs do not all run in a straight line centered to the center of the maze path.
```typescript
    static propsDefinition = {
        minSpeed: { type: hz.PropTypes.Number, default: 3 },
        maxSpeed: { type: hz.PropTypes.Number, default: 7 },
        gameSpawnPoint: { type: hz.PropTypes.Entity },
        lobbySpawnPoint: { type: hz.PropTypes.Entity },
        offset: { type: hz.PropTypes.Number, default: 0 }
    };
```
Now return to your desktop editor and you will see the script is failing to compile because it cannot find the `horizon/npc` module. To fix this, we need to add the NPC package to our project. Open the scripts panel, and click on the `settings` icon. Navigate to the `API` panel and then enable `horizon/npc`.

![Script Settings](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dcxbx5e2cr68vglpv9p0.png)

![NPC](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y273pv2bxoxs031q0b3d.png)

Click save and allow for the scripts to recompile. Once that is done you should see the script properties appear. Set the gameSpawnPoint and lobbySpawnPoint properties to the appropriate entities in your scene. Set the offset to 0.5.

![Set Rex script properties](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yfi4mcbht4fuao73iosv.png)

With that set return to your code editor, before we extend this class we need to think about how we will get the Maze path coordinates accessible to our NPC script. We do not want our NPC to run directly into walls!. To do this we will implement a new Event in `GameUtils.ts` and then update our `Maze.ts` to broadcast the path coordinates once the maze has been generated. Open `GameUtils.ts` and add the following event to the `Events` object.
```typescript
    mazeCarved: new hz.LocalEvent<{ maze: ( { x: number, y: number, z: number, type: string } | undefined)[][] }> ('mazeCarved'),
```
Notice how we are dropping the `wall` property from our default maze cell, this is just to reduce the amount of data we need to pass around through the event limiting the data to what is required by the NPC. The important information for the NPC is the actual path co-ordinates.

Next we need to update our `Maze.ts` script to broadcast this event once the maze has been generated. Open `Maze.ts`, inside the `preStart` function, inside the `gameStateChanged` callback, after you have carved the maze in the `Starting` state, add the following line of code.
```typescript
                this.broadcastCarve();
```
Then at the end of the `Maze` class add a private function `broadcastCarve` to handle the actual broadcasting of the event.
```typescript
    private broadcastCarve(): void {

    }
```
We will first need to first get a reference to our 2d array walls grid.
```typescript
        let walls = this.walls;
```
Next we will create a new 2D array to hold the condensed maze data.
```typescript
        let condensed: ({ x: number, y: number, z: number, type: string } | undefined)[][] = [];
```
Then we will loop through each row of the walls array, rebuilding the row to only include the x,y,z and type properties where type is not 'W'. If the cell is a wall we will push undefined to the new array.
```typescript
        for (let row of walls) {
            let condensedRow: ({ x: number, y: number, z: number, type: string } | undefined)[] = [];
            for (let cell of row) {
                if (cell.type === 'W') {
                    condensedRow.push(undefined);
                } else {
                    condensedRow.push({ type: cell.type, x: cell.x, y: cell.y, z: cell.z });
                }
            }
            condensed.push(condensedRow);
        }
```
We then set the start and end cell types to 'S' and 'E' respectively. To make future logic easier in the NPC script. Note: if you do change the start or end cell locations you will need to update these lines accordingly.
```typescript
        condensed[1][1]!.type = 'S'; // Set the start cell type
        condensed[condensed.length - 2][condensed[condensed.length - 2].length - 2]!.type = 'E'; // Set the end cell type
```
Finally we will broadcast the event with the condensed maze data.
```typescript
        this.sendLocalBroadcastEvent(Events.mazeCarved, { maze: condensed });
```
Your final `broadcastCarve` function should look like this:
```typescript
    private broadcastCarve(): void {
        let walls = this.walls;
        let condensed: ({ x: number, y: number, z: number, type: string } | undefined)[][] = [];
        for (let row of walls) {
            let condensedRow: ({ x: number, y: number, z: number, type: string } | undefined)[] = [];
            for (let cell of row) {
                if (cell.type === 'W') {
                    condensedRow.push(undefined);
                } else {
                    condensedRow.push({ type: cell.type, x: cell.x, y: cell.y, z: cell.z });
                }
            }
            condensed.push(condensedRow);
        }
        condensed[1][1]!.type = 'S'; // Set the start cell type
        condensed[condensed.length - 2][condensed[condensed.length - 2].length - 2]!.type = 'E'; // Set the end cell type
        this.sendLocalBroadcastEvent(Events.mazeCarved, { maze: condensed });
  }
```
We now have a global event being broadcast with the maze path coordinates once the maze has been generated. We can now return to our `RandomNPCRunner.ts` script and extend our class to implement the NPC logic. The first thing we will do is define some private properties to hold the casted `AvatarAIAgent`, the maze data, and a boolean if the game round is finished or not. Add the following below the `propsDefinition`:
```typescript
    private npc: NpcPlayer | undefined;
    private maze: ({ x: number, y: number, z: number, type: string } | undefined)[][] = [];
    private finished: boolean = false;
```
So to setup our `start` function to cast our NPC to the correct type. We attached the script to the NPC object so we can use `this.entity` to get a reference to the entity the script is attached to. We will then cast this to an `Npc` object and then use the `tryGetPlayer` promise to retrieve a reference to the `NpcPlayer` object, which we can use to move the NPC. We need to wrap this in a `setTimeout` to overcome a race condition you will only encounter after publishing your world.
```typescript
    start() {
        this.async.setTimeout(() => {
            this.entity.as(Npc).tryGetPlayer().then(player => this.npc = player);
        }, 3000);
    }
```
Within the same function we will setup the listener for the `mazeCarved` event we created earlier. When this event is received we will store the maze data in our private `maze` property. Add this before the `setTimeout`.
```typescript
        this.connectLocalBroadcastEvent(
            Events.mazeCarved,
            (data: { maze: ({ x: number, y: number, z: number, type: string } | undefined)[][] }) => {
                this.maze = data.maze;
            }
        );
```
We need to setup a listener for the `gameStateChanged` event. This will allow us to respond to changes in the game state. We will add this listener within a `preStart` function, add the following code before the `start` function:
```typescript
    preStart() {
        this.connectLocalBroadcastEvent(
            Events.gameStateChanged,
            (data: {
                fromState: GameState,
                toState: GameState,
            }) => this.handleGameStateChanged(data.fromState, data.toState),
        );
    }
```
Next to create the `handleGameStateChanged` function referenced in the listener. This function will implement a switch statement based on the new game state. We will handle four states: `Starting`, `Playing`, `Ending`, and `Finished`. On `Starting` we will set our `finished` property to false. On `Playing` we will call a function to move the NPC into the maze. On `Ending` we will set the `finished` property to true, and on `Finished` we will call a function to move the NPC back to the lobby and clear the maze data. Add the following function below the `start` function:
```typescript
    private handleGameStateChanged(fromState: GameState, toState: GameState): void {
        switch (toState) {
            case GameState.Starting:
                this.finished = false;
                break;
            case GameState.Playing:
                this.moveNPCToMatch();
                break;
            case GameState.Ending:
                this.finished = true;
                break;
            case GameState.Finished:
                this.moveNPCToLobby();
                this.maze = [];
                break;
            default:
                break;
        }
    }
```
Now to implement the two functions referenced in the switch statement. First we will implement the `moveNPCToMatch` function. This function will teleport the NPC to the maze spawn point, and then call another function `setNPCPath` to start moving the NPC randomly through the maze at a random speed. Add the following function below the `handleGameStateChanged` function:
```typescript
    private moveNPCToMatch(): void {
        let player = this.npc;
        if (player) {
            this.props.gameSpawnPoint?.as(hz.SpawnPointGizmo)?.teleportPlayer(player);
            this.async.setTimeout(() => {
                this.setNPCPath();
            }, 1000);
        }
    }
```
Note how we are using `async.setTimeout` to delay the call to `setNPCPath` by 1 second. This is to ensure the NPC has fully teleported before we start moving it. There may be a more elegant way to handle this that I am not aware of at this time, but the teleport function does not return a promise or have a callback to indicate when the teleport has completed (to my knowledge).

Next we will implement the `setNPCPath` function, we will step through this function in stages as it is the most complex part of the script. Start by adding the function definition below the `moveNPCToMatch` function:
```typescript
     private setNPCPath(): void {
        if (!this.npc || !this.maze) return;


     }
```
Now we are going to abstract some logic into a helper function `buildMazePath` which we will use to build the path the NPC will take through the maze. Add the following callback inside the `setNPCPath` function:
```typescript
        let path = this.buildMazePath();
```
Then to implement the `buildMazePath` function, add the following function definition below the `setNPCPath` function:
```typescript
    private buildMazePath(): { position: hz.Vec3, direction: string }[] {

    }
```
To start we will define some local variables to hold the current position of the NPC in the maze grid, as well as the an array of `Vec3` positions representing the path the NPC will take. We will also define an array to hold the possible directions the NPC can move in, a visited set which we will use to prevent the same paths from being taken twice and a last found index we can use to backtrack when we find dead ends.
```typescript
        let maze = this.maze;
        let x: number = 1;
        let y: number = 0.5;
        let z: number = 1;
        let path: { position: hz.Vec3, direction: string }[] = [];
        let dirs: [number, number, string][] = [
            [0, 1, 'up'],
            [1, 0, 'right'],
            [0, -1, 'down'],
            [-1, 0, 'left'],
        ];
        let visited = new Set<string>();
        let lastFoundIndex = 2;
```
Next we will add the starting position to the path array. We will use the x and z coordinates to get the world position from the maze grid, and add the y offset from our props to ensure the NPC is positioned correctly above the ground. We will also need to set the visited set to include the starting position.
```typescript
        path.push({ position: new hz.Vec3(maze[z][x]!.x, y, maze[z][x]!.z), direction: 'start' });
        visited.add(`${x},${z}`);
```
After we will implement a while loop to continue building the path until we reach the end of the maze.
```typescript
        while (path[path.length - 1].direction !== 'end') {

        }
```
Inside the loop we will first need to define a scoped variable `found` that will be used to track whether a valid direction was found. We will also shuffle the directions array to ensure the NPC moves in a random direction when given the opportunity.
```typescript
            let found = false;
            dirs = dirs.sort(() => Math.random() - 0.5);
```
We will then loop through each direction in the shuffled directions array.
```typescript
            for (const dir of dirs) {

            }
```
Inside the directions loop we will first calculate the next x and z coordinates based on the current position and the direction being checked.
```typescript
                let nextX = x + dir[0];
                let nextZ = z + dir[1];
```
Then we will add a safety check to ensure the next coordinates are within the bounds of the maze grid and have not already been visited.
```typescript
        if (
          nextX <= 0 || nextX >= this.maze.length ||
          nextZ <= 0 || nextZ >= this.maze[0].length ||
          visited.has(`${nextX},${nextZ}`)
        ) continue;
```
Now we will get a reference to the next cell in the maze grid.
```typescript
        let cell = maze[nextX][nextZ];
```
If the cell is not 'undefined' then we know that it is a valid path cell, remember we filter out walls when we broadcast the maze data.
```typescript
        if (cell) {

        }
```
Then push push the new position and direction into the path array, check if the cell type is 'E' if it is then set the direction to 'end' so that we exit the parent while loop on the next iteration.
```typescript
            path.push({
                position: new hz.Vec3(cell.x, y, cell.z),
                direction: cell.type === 'E' ? 'end' : dir[2]
            });
```
After set `visited` to include the new position, update the current x and z coordinates to the new position, set `found` to true, reset `lastFoundIndex`, and break out of the directions loop as we have found a valid direction to move in.
```typescript
            visited.add(`${nextX},${nextZ}`);
            x = nextX;
            z = nextZ;
            found = true;
            lastFoundIndex = 2; // Reset last found index
            break;
```
Finally within the while loop but outside the directions loop we will check if no valid direction was found, aka a dead end. If this is the case we will backtrack to the last found index in the path array, update the current x and z coordinates to the backtracked position, and increment the last found index so that if we can continue backtracking in the next loop until we find a valid new direction or run out of positions to backtrack to.

First add the conditional code:
```typescript
        if (!found) {
            if (path.length > 1 && lastFoundIndex < path.length) {

            } else {
                break;
            }
        }
```
Here we first check if there are more than 1 position in the path array (we cannot backtrack from the start position) and that the `lastFoundIndex` is less than the length of the path array (to prevent out of bounds errors).

Next within the `if` conditional we will get the last position from the path array based on the `lastFoundIndex`.
```typescript
                let lastStep = path[path.length - lastFoundIndex];
                let prev = lastStep.position;
```
We will then update the current x and z coordinates to this position. We need to find the x and z indexes in the maze grid that match the x and z coordinates of the last position. We can do this by using `findIndex` on the maze array.
```typescript
                x = maze.findIndex(row => row.some(cell => cell && cell.x === prev.x && cell.z === prev.z));
                z = maze[x].findIndex(cell => cell && cell.x === prev.x && cell.z === prev.z);
```
Then we will push a new position into the path array with the opposite direction to indicate we are backtracking.
```typescript
                path.push({
                    position: new hz.Vec3(prev.x, y, prev.z),
                    direction: lastStep.direction == 'up'
                        ? 'down'
                        : lastStep.direction == 'down'
                            ? 'up'
                            : lastStep.direction == 'left'
                                ? 'right'
                                : 'left'
                });
```
And finally we will increment the `lastFoundIndex` by 2 so that we can continue backtracking in the next loop if required. We increment by 2 because we want to skip the last position we just backtracked to, and get the one before that.
```typescript
                lastFoundIndex += 2;
```
Finally outside the while loop we will return the built path array.
```typescript
        return path;
```
Your final `buildMazePath` function should look like this:
```typescript
    private buildMazePath(): { position: hz.Vec3, direction: string }[] {
        let maze = this.maze;
        let x: number = 1;
        let y: number = 0.5;
        let z: number = 1;
        let path: { position: hz.Vec3, direction: string }[] = [];
        let dirs: [number, number, string][] = [
            [0, 1, 'up'],
            [1, 0, 'right'],
            [0, -1, 'down'],
            [-1, 0, 'left'],
        ];
        let visited = new Set<string>();
        let lastFoundIndex = 2;

        path.push({ position: new hz.Vec3(maze[x][z]!.x, y, maze[x][z]!.z), direction: 'start' });
        visited.add(`${x},${z}`);

        while (path[path.length - 1].direction !== 'end') {
            let found = false;
            dirs = dirs.sort(() => Math.random() - 0.5);

            for (const dir of dirs) {
                let nextX = x + dir[0];
                let nextZ = z + dir[1];

                if (
                    nextX <= 0 || nextX >= this.maze.length ||
                    nextZ <= 0 || nextZ >= this.maze[0].length ||
                    visited.has(`${nextX},${nextZ}`)
                ) continue;

                let cell = maze[nextX][nextZ];
                if (cell) {
                    path.push({
                        position: new hz.Vec3(cell.x, y, cell.z),
                        direction: cell.type === 'E' ? 'end' : dir[2]
                    });
                    visited.add(`${nextX},${nextZ}`);
                    x = nextX;
                    z = nextZ;
                    found = true;
                    lastFoundIndex = 2;
                    break;
                }
            }

            if (!found) {
                if (path.length > 1 && lastFoundIndex < path.length) {
                    let lastStep = path[path.length - lastFoundIndex];
                    let prev = lastStep.position;
                    x = maze.findIndex(row => row.some(cell => cell && cell.x === prev.x && cell.z === prev.z));
                    z = maze[x].findIndex(cell => cell && cell.x === prev.x && cell.z === prev.z);
                    path.push({
                        position: new hz.Vec3(prev.x, y, prev.z),
                        direction: lastStep.direction == 'up'
                            ? 'down'
                            : lastStep.direction == 'down'
                                ? 'up'
                                : lastStep.direction == 'left'
                                ? 'right'
                                : 'left'
                    });
                    lastFoundIndex += 2;
                } else {
                    break;
                }
            }
        }

        return path;
    }
```
Now that we have the path built, we can return to the `setNPCPath` function. We have a path built but it is not yet optimised for smooth movement. We will need to simplify the path to remove unnecessary points and then smooth the path to create a more natural movement using a filter. Add the following code below the call to `buildMazePath`:
```typescript
    path = path.filter((step, idx, arr) => {
      // Keep the last occurrence of each consecutive direction
      return (
        idx === arr.length - 1 ||
        step.direction !== arr[idx + 1].direction
      );
    });
```
This filter will remove consecutive steps in the same direction, keeping only the last occurrence. This helps to reduce jittery movement when the NPC is moving in a straight line.

Next we will create a new variable `dir` to hold the current direction the NPC is facing.
```typescript
        let dir: hz.Vec3 = this.npc!.forward.get();
```
Then we will chain promises to rotate and move to each position in the path sequentially. We will start by rotating the NPC to face the initial direction, then for each position in the path we will rotate to face the new direction and then move to that position at a random speed between the min and max speed defined in our props. We will also check if the `finished` property is true before each action, if it is we will throw an error to break out of the promise chain.

First lets define the promise variable, we will start the chain by rotating the NPC to face the initial direction, this shouldn't actually change the rotation as the NPC should already be facing this direction, but it ensures the promise chain starts correctly.
```typescript
        let promise = this.npc!.rotateTo(dir);
```
Then we will loop through each position in the path array.
```typescript
        for (const pos of path) {

        }
```
Chain the promises to first rotate to face the new direction
```typescript
            promise = promise
                .then(() => {
                    if (this.finished) throw new Error('Maze run has finished.');
                    if (pos.direction === 'start') return; // Skip the start position
                    if (pos.direction === 'up') dir = new hz.Vec3(-1, 0, 0);
                    else if (pos.direction === 'down') dir = new hz.Vec3(1, 0, 0);
                    else if (pos.direction === 'left') dir = new hz.Vec3(0, 0, -1);
                    else if (pos.direction === 'right') dir = new hz.Vec3(0, 0, 1);
                    else dir = this.npc!.forward.get(); // End
                    return this.npc!.rotateTo(dir);
                })
```
Then move to the new position at a random speed between the min and max speed defined in our props. We will also adjust the position by the offset defined in our props to ensure the NPC does not run directly in line with the center of the maze path.
```typescript
                .then(() => {
                    if (this.finished) throw new Error('Maze run has finished.');
                    let randomSpeed = (Math.random() * (this.props.maxSpeed - this.props.minSpeed)) + this.props.minSpeed;
                    let options = {
                        movementSpeed: randomSpeed
                    };
                    pos.position.z += this.props.offset; // Adjust height based on offset
                    pos.position.x += this.props.offset;
                    return this.npc!.moveToPosition(pos.position, options);
                });
```
Your final `setNPCPath` function should look like this:
```typescript
     private setNPCPath(): void {
        if (!this.npc || !this.maze) return;

        let path = this.buildMazePath();

        path = path.filter((step, idx, arr) => {
            // Keep the last occurrence of each consecutive direction
            return (
                idx === arr.length - 1 ||
                step.direction !== arr[idx + 1].direction
            );
        });

        let dir: hz.Vec3 = this.npc.forward.get();

        let promise = this.npc!.rotateTo(dir);

        for (const pos of path) {
            promise = promise
                .then(() => {
                    if (this.finished) throw new Error('Maze run has finished.');
                    if (pos.direction === 'start') return; // Skip the start position
                    if (pos.direction === 'up') dir = new hz.Vec3(-1, 0, 0);
                    else if (pos.direction === 'down') dir = new hz.Vec3(1, 0, 0);
                    else if (pos.direction === 'left') dir = new hz.Vec3(0, 0, -1);
                    else if (pos.direction === 'right') dir = new hz.Vec3(0, 0, 1);
                    else dir = this.npc!.forward.get(); // End
                    return this.npc!.rotateTo(dir);
                })
                .then(() => {
                    if (this.finished) throw new Error('Maze run has finished.');
                    let randomSpeed = (Math.random() * (this.props.maxSpeed - this.props.minSpeed)) + this.props.minSpeed;
                    let options = {
                        movementSpeed: randomSpeed
                    };
                    pos.position.z += this.props.offset; // Adjust height based on offset
                    pos.position.x += this.props.offset;
                    return this.npc!.moveToPosition(pos.position, options);
                });
        }
    }
```
The final function we need to implement is `moveNPCToLobby`. This function will teleport the NPC back to the lobby spawn point.
```typescript
    private moveNPCToLobby(): void {
        let player = this.npc;
        if (player) {
            this.props.lobbySpawnPoint?.as(hz.SpawnPointGizmo)?.teleportPlayer(player);
            this.async.setTimeout(() => {
                let pos = this.props.lobbySpawnPoint?.position.get();
                let rot = this.props.lobbySpawnPoint?.forward.get();
                this.npc?.moveToPosition(pos!, { movementSpeed: 2 }).then(() => {
                    this.npc.rotateTo(rot!);
                });
            }, 1000);
        }
    }
```
We first get a reference to the NPC's player object, then use the lobby spawn point to teleport the player back to the lobby. We then use `async.setTimeout` to delay for 1 second to ensure the teleport has completed before moving and rotating the NPC to face the correct direction in the lobby. We need this async delay especially if you reduce the countdown timer in the `GameController` script to less than 10 seconds, otherwise the NPC may still be moving in the maze when they are teleported so will continue moving in the lobby after being teleported. They will never be able to reach the intended position in the game thus this resolves the issue by resetting their position.

Now save all your modified script files, return to the desktop editor and allow the scripts to recompile. Once that is done, enter play mode and start a game round. You should see your NPC teleport into the maze and start running randomly through the maze at varying speeds. As the maze is currently small they should reach the end quite quickly. Once they reach the end they will stop moving until the round is finished, at which point they will teleport back to the lobby.

Now that we have the random NPC runner working, lets look at implementing the direct NPC runner. This NPC will always head straight for the finish line, but will move slower than the random runner to keep the game balanced. To implement this we can simply duplicate our `RandomNPCRunner` script and make a few modifications. In the scripts panel, right click on `RandomNPCRunner` and select duplicate. Rename the new script to `DirectNPCRunner`.

![Rename Script](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ahwrb7l4nz03i6oz9sb7.png)

Next create a new NPC in your scene using the same steps as before, but this time set the display name and object name to something different to your first NPC. In my example I will use 'Eliza'. Create a new spawn point for this NPC in the same way as before, and rename it to `ElizaSpawnPoint` (replacing Eliza with the name of your Avatar). Next create the teleport point for this NPC and set its position to match the avatar's position. Finally attach the `DirectNPCRunner` script to this new NPC and set the script properties accordingly. For now leave the speed properties the same as the random NPC, we will adjust these in the script next.

![Eliza](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r3ijkchwupefrgaz7sp7.png)

![Eliza Spawn Point](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nvlyid30q03rw7plsk31.png)

If you were to now run your game you will have two NPCs running randomly through the maze. To modify this second NPC to run directly to the finish line we will need to make some changes to the `DirectNPCRunner` script. Open the `DirectNPCRunner` script in your editor. First we will need to rename our class, change all references to `RandomNPCRunner` to `DirectNPCRunner`, and then update the `minSpeed` and `maxSpeed` properties to be slower than the random NPC. In my example I will set the min speed to 2 and the max speed to 4. Update the `propsDefinition` as follows:
```typescript
        minSpeed: { type: hz.PropTypes.Number, default: 2 },
        maxSpeed: { type: hz.PropTypes.Number, default: 4 },
```
To implement the new direct pathing logic we will only need to rewrite one function and that is the `buildMazePath`. We are going to take a different approach to building the path this time. The algoirithm we will be using is known as DFS or Depth First Search. This algorithm explores as far as possible along each branch before backtracking. This is a good fit for our maze as it will allow us to find the shortest path to the end of the maze. We will implement this using a stack data structure to keep track of the current path being explored. We will also use a visited set to keep track of the cells that have already been explored to prevent infinite loops. First we should define a new interface to represent each cell in the stack. Add the following code above the `DirectNPCRunner` class definition after the import statements:
```typescript
interface MazeNode {
    x: number;
    z: number;
    prev?: MazeNode;
    direction?: string;
}
```
Then return to the `buildMazePath` function and replace the entire function with the following code:
```typescript
    private buildMazePath(): { position: hz.Vec3, direction: string }[] {
        let maze = this.maze;
        let x: number = 1;
        let y: number = 0.5;
        let z: number = 1;
        let path: { position: hz.Vec3, direction: string }[] = [];
        let dirs: [number, number, string][] = [
            [0, 1, 'up'],
            [1, 0, 'right'],
            [0, -1, 'down'],
            [-1, 0, 'left'],
        ];


     }
```
These are all the same variables we defined in the previous version of the function. Next we will define our stack and visited set. We will also define a variable to hold the end node once we find it.
```typescript
        let queue: MazeNode[] = [{ x: x, z: z }];
        let visitedBFS = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
        visitedBFS[x][z] = true;
        let endNode: MazeNode | undefined;
```
To implement the DFS we will use a while loop to continue exploring the maze until we find the end node or run out of nodes to explore. We will use the queue variable as our stack iteratting until it is empty. We will use `shift` to get the last node added to the stack. We will then check if this node is the end node, if it is we will set the endNode variable and break out of the loop. If it is not the end node we will loop through each direction in the directions array and calculate the next x and z coordinates. We will then check if these coordinates are within the bounds of the maze grid and have not already been visited. If they are valid we will get a reference to the next cell in the maze grid and check if it is not a wall. If it is a valid path cell we will mark it as visited and push it onto the stack with a reference to the current node as its previous node. We will also set the direction property to indicate which direction we moved to reach this cell.
```typescript
        while (queue.length > 0) {
            let current = queue.shift()!;
            let cell = maze[current.x][current.z];
            if (cell && cell.type === 'E') {
                endNode = current;
                break;
            }

            for (const [dx, dz, dir] of dirs) {
                let nx = current.x + dx;
                let nz = current.z + dz;
                if (
                    nx < 0 || nx >= maze.length ||
                    nz < 0 || nz >= maze[0].length ||
                    visitedBFS[nx][nz]
                ) continue;
                let nextCell = maze[nx][nz];
                if (nextCell && nextCell.type !== 'W') {
                    visitedBFS[nx][nz] = true;
                    queue.push({ x: nx, z: nz, prev: current, direction: nextCell.type === 'E' ? 'end' : dir });
                }
            }
        }
```
Once we have found the end node we will need to reconstruct the path from the end node back to the start node using the previous node references. We will loop through the nodes starting from the end node and push each position and direction into the path array. We will then reverse the path array to get it in the correct order from start to end.
```typescript
        // Reconstruct path from endNode
        if (endNode) {
            let node: MazeNode | undefined = endNode;
            while (node) {
                let cell = maze[node.x][node.z];
                let direction = node.direction ?? (path.length === 0 ? 'end' : 'start');
                path.push({ position: new hz.Vec3(cell!.x, y, cell!.z), direction });
                node = node.prev;
            }
            path.reverse();
        }
```
Finally we will return the built path array.
```typescript
        return path;
```
Your final implementation of the `buildMazePath` function using DFS should look like this:
```typescript
    private buildMazePath(): { position: hz.Vec3, direction: string }[] {
        let maze = this.maze;
        let x: number = 1;
        let y: number = 0.5;
        let z: number = 1;
        let path: { position: hz.Vec3, direction: string }[] = [];
        let dirs: [number, number, string][] = [
            [0, 1, 'up'],
            [1, 0, 'right'],
            [0, -1, 'down'],
            [-1, 0, 'left'],
        ];
        let queue: MazeNode[] = [{ x: x, z: z }];
        let visitedBFS = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
        visitedBFS[x][z] = true;
        let endNode: MazeNode | undefined;

        while (queue.length > 0) {
            let current = queue.shift()!;
            let cell = maze[current.x][current.z];
            if (cell && cell.type === 'E') {
                endNode = current;
                break;
            }

            for (const [dx, dz, dir] of dirs) {
                let nx = current.x + dx;
                let nz = current.z + dz;
                if (
                    nx < 0 || nx >= maze.length ||
                    nz < 0 || nz >= maze[0].length ||
                    visitedBFS[nx][nz]
                ) continue;
                let nextCell = maze[nx][nz];
                if (nextCell && nextCell.type !== 'W') {
                    visitedBFS[nx][nz] = true;
                    queue.push({ x: nx, z: nz, prev: current, direction: nextCell.type === 'E' ? 'end' : dir });
                }
            }
        }

        // Reconstruct path from endNode
        if (endNode) {
            let node: MazeNode | undefined = endNode;
            while (node) {
                let cell = maze[node.x][node.z];
                let direction = node.direction ?? (path.length === 0 ? 'end' : 'start');
                path.push({ position: new hz.Vec3(cell!.x, y, cell!.z), direction });
                node = node.prev;
            }
            path.reverse();
        }

        return path;
    }
```
Now save the script file, return to the desktop editor and allow the scripts to recompile. Once that is done, enter play mode and start a game round. You should see your direct NPC teleport into the maze and start running directly to the end of the maze at a slower speed than the random NPC. Once they reach the end they will stop moving until the round is finished, at which point they will teleport back to the lobby.

![NPC lobby](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3cqz5tenmwpwvjfctr0r.png)

![NPC Runners](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6o53e13ek6qnr5di7zdf.png)

With both random and direct NPC runners now implemented, your maze game features two distinct challenges for players to compete against.

This concludes the this tutorial series I hope you have enjoyed it and do not stop here, there are plenty of opportunities to expand and refine your maze game further. I’m excited to see how you build on these foundations!

