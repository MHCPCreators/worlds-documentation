# Horizon World Tutorial - Maze Runner - Part 4 - Randomly generated mazes

In the earlier parts of this tutorial series, we established the foundational world, built out the main gameplay features, and introduced a custom UI timer and background music. Now, our focus shifts to generating the maze itself. While there are many maze generation algorithms to choose from, we'll be using a straightforward depth-first search (DFS) `carve` algorithm for this guide. This method works by recursively carving out random paths in a grid to create the maze structure. One important note: the carve implementation I will use today require both the width and height of the grid to be odd numbers to ensure the maze renders properly.

To begin, create a new script dedicated to maze generation. Open your world in the desktop editor and use the UI to add a new script.

![Maze Script](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dwi63rz676satz6l60jw.png)

After creating the script, open it. You should see the familiar boilerplate code as a starting point.
```typescript
import * as hz from 'horizon/core';

class Maze extends hz.Component<typeof Maze> {
  static propsDefinition = {};

  start() {

  }
}
hz.Component.register(Maze);
```
Like with the other files we must first import the `Events` and `GameState` from our `GameUtils` script. Add the import line before the class definition.
```typescript
import { Events, GameState } from 'GameUtils';
```
Next we will plan our `propsDefinition` for the `Maze` component. This will include any properties we want to expose for customisation. We will make our maze size configurable and made up of two main properties: `width` and `height`, both of which will be integers representing the dimensions of the maze grid. For the maze walls we will use `assets` we will have two type of walls a simple wall and a detailed wall, we will need to set the default rotation of our walls and which column to rotate the detailed wall, the walls we will be using today will be 4x10x4. Also because we will make our maze dynamic we will need to position the start and end zones within the maze, so we will need properties to store a reference to them also. Extend the `propsDefinition` object in your class to the following:
```typescript
    static propsDefinition = {
        wallDetailed: { type: hz.PropTypes.Asset, required: true },
        wallSimple: { type: hz.PropTypes.Asset, required: true },
        wallDefaultRotation: { type: hz.PropTypes.Vec3, default: new hz.Vec3(270, 0, 0) },
        wallRotateOn: { type: hz.PropTypes.String, default: 'Z' },
        wallWidth: { type: hz.PropTypes.Number, default: 4 },
        wallHeight: { type: hz.PropTypes.Number, default: 10 },
        wallDropOffset: { type: hz.PropTypes.Number, default: 0 },
        width: { type: hz.PropTypes.Number, default: 19 },
        height: { type: hz.PropTypes.Number, default: 19 },
        startPosition: { type: hz.PropTypes.Entity, required: true },
        startPositionY: { type: hz.PropTypes.Number, default: 1 },
        finishPosition: { type: hz.PropTypes.Entity, required: true },
    };
```
With that in place, save the file and return to the desktop editor. Create a new object, name this `Maze`, and attach the `Maze` script to it. This will then allow you to attach the necessary assets and configure the maze properties directly from the editor. For the maze walls in this tutorial we will use two assets that I have made public, search in the `Assets` panel for `Maze Runner` and then add the first wall asset to your world. After that, rename the object to `WallDetailed` and set the `Motion` to `animated`.

![Wall Detailed](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rzn67wlcur4z9rka60c7.png)

Once you have done that you next need to save the asset to your library, right click on the asset and select 'create asset', save it into your local asset directory. After that, repeat the process for the second wall asset, renaming it to `WallSimple` and remembering to set the `Motion` to `animated` as well.

![Create Asset](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r3jd6glvdlq2i1hjh2hn.png)

![Save Asset](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/03k80c4cwfdzv0pzqacp.png)

Then with both assets saved you can delete the original wall objects from your scene, leaving only the newly created assets in your library. Navigate to the `Maze` object and when you click on `WallDetailed` you will be able to search for the relevant asset. Leave the wallWidth as 4, but set the maze width and height properties with the value of 9 and attach the `GameSpawnPoint` to the `startPosition` and `Finish` to `finishPosition`.

![Wall Simpler](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wrk1zed9822q7ndwa13y.png)

![Maze Script Props](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zpj95wtjqbnhg96a98l2.png)

Now with the relevant properties set we in the desktop editor you can return to your code editor, and open `Maze.ts`. Next we will add a private property which we will use to store our maze grid. Beneath the `propsDefinition` add a line to define a private attribute that is an array of arrays of hashes. In typescript you need to explicitly define the hash that will be stored for type checking, in our hash we will have keys for the `wall` asset, grid `type` and `x`, `y`, and `z` positions.
```typescript
    private walls: { wall: hz.Entity | undefined, type: string, x: number, y: number, z: number }[][] = [];
```
The next step is to generate the maze grid, this will involve creating a 2D array that represents the maze layout. Each cell in the grid will be an object that contains information about the wall asset to use, its position, and the type of wall which we will default to 'W' for wall when generating the grid. We will hook into the `start` function to populate this grid, we will do this via a callback function `generateMazeGrid`. Update the `start` function in `Maze.ts` to the following:
```typescript
    start() {
        if (!this.walls.length) {
            this.generateMazeGrid();
        }
    }
```
Then to implement the `generateMazeGrid` function, we will first need to calculate the dimensions of the maze based on the wall width and the number of walls. This will give us the overall width and height of the maze.
```typescript
    private generateMazeGrid() {
        let width = this.props.width * this.props.wallWidth;
        let height = this.props.height * this.props.wallWidth;

    }
```
Next we will need to calculate the start x, y and z positions for our grid, the y will always be half our wall height for our assets. The x will be half the full width of the maze minus half the asset width and the z will be zero minus half the full height of the maze minus half the asset width. This will ensure we start drawing the grid from the south east corner and end on the north west as our game is designed.
```typescript
        let x = (width / 2) - (this.props.wallWidth / 2);
        let y = this.props.wallHeight / 2;
        let z = 0 - ((height / 2) - (this.props.wallWidth / 2));
```
Now we are going to iterate over the height and width of the maze to create the wall entities. We will need to recurse either the X or Z so we must store the start position for atleast one, in this example we will keep track of x, so next declare a `startX` variable.
```typescript
        let startX = x;
```
To add variety to our maze, we'll randomly rotate the detailed wall assets so that different sides are visible each time the maze is generated. Since the simple wall looks the same on all sides, we can use a fixed rotation for it. Let's introduce a `simpleRotation` variable for the simple wall, while the detailed wall will use a random rotation. We can use the property we defined previously.
```typescript
        let simpleRotation = hz.Quaternion.fromEuler(this.props.wallDefaultRotatio);
```
We also need to create a local 2d array to hold our wall entities before we set the global property. Use the same type definition as the `walls` property.
```typescript
        let walls: { wall: hz.Entity | undefined, type: string, x: number, y: number, z: number }[][] = [];
```
Next we need to do something a little strange, we need to declare a variable that is casted to either 'Entity' or 'undefined' and then set this to undefined. We will use this as a placeholder while our assets are loaded into entities.
```typescript
        let undefined_entity: hz.Entity | undefined = undefined;
```
The final variable we need to declare is something I call `at_the_races`, this variable will by used to keep track of the number of wall entities that are still being spawned. There is more than one way to handle this race condition, but a simple approach is to use a counter that increments when a wall entity is spawned and decrements when it is finished.
```typescript
        let at_the_races = 0;
```
Now to implement the iteration needed to generate our grid, we will iterate over the height and width of the maze to create the wall entities. Add the following after the `at_the_races` declaration:
```typescript
        for (let i = 0; i < height; i += this.props.wallWidth) {
            let row = [];
            for (let j = 0; j < width; j += this.props.wallWidth) {

            }

        }
```
Then we need to first calculate the start x, y and z position for our grid wall. This must be a Vec3 and at this point should just be the x, y and z variables we have already defined, we will increment these later in our loops.
```typescript
                let position = new hz.Vec3(
                    x,
                    y,
                    z
                );
```
Next, create a grid cell using the same type definition as the `walls` property. Initialize each property with the values you have at this stage, setting the `type` to `W` by default since all cells start as walls.
```typescript
                let cell: { wall: hz.Entity | undefined, type: string, x: number, y: number, z: number } = { wall: undefined_entity, type: 'W', x: x, y: y, z: z };
                row.push(cell);
```
Now we need to decide which wall asset to spawn. For now we will implement simple logic that will make the third wall in each row a detailed wall. When we identify that we will spawn a detailed wall, we will also randomly rotate it via a helper function we will define later. Add the following after 'row.push(cell)'.
```typescript
                let [asset, rotation] = (j + i / this.props.wallWidth) % 3 === 0
                    ? [this.props.wallDetailed, hz.Quaternion.fromEuler(this.randomWallRotation())]
                    : [this.props.wallSimple, simpleRotation];
```
Then increment `at_the_races` as a wall entity is about to be spawned via a promise.
```typescript
                at_the_races++;
```
To spawn the asset we must first check if the `asset` variable is defined, then we can use `hz.Entity.spawn(asset, position, rotation)` to create the wall entity. When the promise resolves, we can set the cell walls entity property and decrement the `at_the_races` variable.
```typescript
                if (asset) this.world.spawnAsset(asset, position, rotation).then(spawnedObjects => {
                    spawnedObjects.forEach(obj => {
                        cell.wall = obj;
                        at_the_races--;
                    });
                });
```
The final piece of code needed in the width iteration is to increment the x variable so that the next loop draws the next grid cell.
```typescript
                x -= this.props.wallWidth;
```
Now that is our grid width row is being drawn correctly, next is the height iteration. After you exit the width iteration, you will need to push the row into the walls array, reset the x variable and increment the z variable so that the next loop draws the next grid row.
```typescript
            walls.push( row );
            x = startX;
            z += this.props.wallWidth;
```
With that in place we have only our race condition to handle, after the height iteration add the following:
```typescript
        let racer = 0;
        racer = this.async.setInterval(() => {
            if (at_the_races === 0) {
                this.walls = walls;
                this.sendLocalBroadcastEvent(Events.setGameState, { state: GameState.Ready, winner: undefined });
                this.async.clearInterval(racer);
            }
        }, 100);
```
This code sets up a `setInterval` that checks if all wall entities have been spawned. Once all walls are in place, it sets the walls property with the final grid, updates the game state to "Ready" via a `setGameState` event, and clears the interval to stop the checks.

Your current `generateMazeGrid` function should look like this:
```typescript
    private generateMazeGrid() {
        let width = this.props.width * this.props.wallWidth;
        let height = this.props.height * this.props.wallWidth;
        let x = (width / 2) - (this.props.wallWidth / 2);
        let y = this.props.wallHeight / 2;
        let z = 0 - ((height / 2) - (this.props.wallWidth / 2));
        let startX = x;
        let simpleRotation = hz.Quaternion.fromEuler(this.props.wallDefaultRotation);
        let walls: { wall: hz.Entity | undefined, type: string, x: number, y: number, z: number }[][] = [];
        let undefined_entity: hz.Entity | undefined = undefined;
        let at_the_races = 0;

        for (let i = 0; i < height; i += this.props.wallWidth) {
            let row = [];
            for (let j = 0; j < width; j += this.props.wallWidth) {
                let position = new hz.Vec3(
                    x,
                    y,
                    z
                );
                let cell: { wall: hz.Entity | undefined, type: string, x: number, y: number, z: number } = { wall: undefined_entity, type: 'W', x: x, y: y, z: z };
                row.push(cell);
                at_the_races++;
                let [asset, rotation] = (j + i / this.props.wallWidth) % 3 === 0
                    ? [this.props.wallDetailed, hz.Quaternion.fromEuler(this.randomWallRotation())]
                    : [this.props.wallSimple, simpleRotation];
                if (asset) this.world.spawnAsset(asset, position, rotation).then(spawnedObjects => {
                    spawnedObjects.forEach(obj => {
                        cell.wall = obj;
                        at_the_races--;
                    });
                });

                x -= this.props.wallWidth;
            }
            walls.push( row );
            x = startX;
            z += this.props.wallWidth;
        }

        let racer = 0;
        racer = this.async.setInterval(() => {
            if (at_the_races === 0) {
                this.walls = walls;
                this.sendLocalBroadcastEvent(Events.setGameState, { state: GameState.Ready, winner: undefined });
                this.async.clearInterval(racer);
            }
        }, 100);
    }
```
Now before your code will compile we will need to implement the `randomWallRotation` function. Add the following code to your `Maze` class:

```typescript
    private randomWallRotation(): hz.Vec3 {
        let rotation = 90 * Math.floor(Math.random() * 4);
        let on = this.props.wallRotateOn.toUpperCase();
        return on === 'X'
            ? new hz.Vec3(this.props.wallDefaultRotation.x, this.props.wallDefaultRotation.y, rotation)
            : on === 'Y'
                ? new hz.Vec3(this.props.wallDefaultRotation.x, rotation, this.props.wallDefaultRotation.z)
                : new hz.Vec3(this.props.wallDefaultRotation.x, this.props.wallDefaultRotation.y, rotation);
  }
```
This code calculates a random rotation and then uses a ternary operator to check whether the `wallRotateOn` property is set to either the X, Y or Z axis and returns a relevant vec3.

You will now be able to save, and enter preview mode in your desktop editor. You should see a 9x9 grid of walls in the center of the game area.

![9x9 Grid](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o2ldedisoh0ta8lxxsqf.png)

Next we need to setup our event listener so that we can randomly generate the maze via a `carve` function when the game state changes to `Starting`, we will also want to reset all grid cells to their initial state when the game state changes to `Finished`. We will implement this listener inside of a `preStart` function. Add the following code before the `start` function.
```typescript
    preStart() {
        if (this.props.width % 2 === 0) throw new Error("Width must be odd");
        if (this.props.height % 2 === 0) throw new Error("Height must be odd");
        this.connectLocalBroadcastEvent(Events.gameStateChanged, (data) => {
            if (data.toState == GameState.Starting) {
                this.carve(1, 1);
            } else if (data.toState == GameState.Finished) {
                this.resetWalls();
            }
        });
    }
```
Note how we have added some validation to ensure the maze dimensions are odd numbers, this is to handle the earlier mentioned caveat with the algorithm we are about to implement which relies on a grid structure that is always odd in both dimensions to render perfectly.

To implement the carve function start with this boilerplate code:
```typescript
    private carve(x: number, z: number, visited?: Set<string>): void {

    }
```
We have defined x and z as the coordinates of the current cell being processed in the maze. The carve function will use these coordinates to manipulate the maze data structure and create paths. The visited parameter is a Set that keeps track of all the cells that have been processed so far to avoid infinite loops. (even though this algorithm would never go into an infinite loop this is necessary for typescript).

Now we need to define some variables, first height and width which we can get from our properties and then a reference to walls.
```typescript
        let height = this.props.height;
        let width = this.props.width;
        let maze = this.walls;
```
After a variable to define the drop on the y axis for the path.
```typescript
        let drop = this.props.wallHeight - this.props.wallDropOffset;
```
Then the `visited` variable if it is not defined.
```typescript
        if (!visited) visited = new Set<string>();
```
Next we need to check whether we have visited this cell, and if so return early. (Not really necessary, but good for clarity).
```typescript
        const key = `${x},${z}`;
        if (visited.has(key)) return;
        visited.add(key);
```
Now we need to explore the neighboring cells. We will use a randomized depth-first search (DFS) approach to carve out the maze. First, we need to define the possible directions we can move in the maze.
```typescript
        let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
```
Then we need to randomize the order of the directions to ensure that the maze is carved in a random pattern.
```typescript
        dirs.sort(() => Math.random() - 0.5);
```
After we mark the current cell as part of the path and ensure we move the wall asset to be the floor.
```typescript
        if (maze[z] && maze[z][x]) {
            if (maze[z][x].type === 'W') {
                maze[z][x].type = 'P';
                maze[z][x].wall?.position.set(new hz.Vec3(maze[z][x].x, maze[z][x].y - drop, maze[z][x].z));
            }
        }
```
Then we are ready to explore the neighbouring cells. We will use the randomised directions we created earlier to move to each neighbouring cell. Checking first whether we have hit an outer wall. If we have, we need to stop the carving process in that direction. We continue this process recursively until we have carved out the entire maze. Extend with the following code:
```typescript
        for (let i = 0; i < 4; ++i) {
            let dx = dirs[i][0], dz = dirs[i][1];
            let nx = x + 2*dx, nz = z + 2*dz;
            if (nx > 0 && nx < width-1 && nz > 0 && nz < height-1) {
                if (maze[nz] && maze[nz][nx] && maze[nz][nx].type === 'W') {
                    maze[z+dz][x+dx].type = 'P';
                    maze[z+dz][x+dx].wall?.position.set(new hz.Vec3(maze[z+dz][x+dx].x, maze[z+dz][x+dx].y - drop, maze[z+dz][x+dx].z));
                    this.carve(nx, nz, visited);
                }
            }
        }
```
Your final implementation of the carve function should look like this:
```typescript
    private carve(x: number, z: number, visited?: Set<string>): void {
        let height = this.props.height;
        let width = this.props.width;
        let maze = this.walls;
        let drop = this.props.wallHeight - this.props.wallDropOffset;
        if (!visited) visited = new Set<string>();
        const key = `${x},${z}`;
        if (visited.has(key)) return;
        visited.add(key);

        let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
        dirs.sort(() => Math.random() - 0.5);

        if (maze[z] && maze[z][x]) {
            if (maze[z][x].type === 'W') {
                maze[z][x].type = 'P';
                maze[z][x].wall?.position.set(new hz.Vec3(maze[z][x].x, maze[z][x].y - drop, maze[z][x].z));
            }
        }

        for (let i = 0; i < 4; ++i) {
            let dx = dirs[i][0], dz = dirs[i][1];
            let nx = x + 2*dx, nz = z + 2*dz;
            if (nx > 0 && nx < width-1 && nz > 0 && nz < height-1) {
                if (maze[nz] && maze[nz][nx] && maze[nz][nx].type === 'W') {
                    maze[z+dz][x+dx].type = 'P';
                    maze[z+dz][x+dx].wall?.position.set(new hz.Vec3(maze[z+dz][x+dx].x, maze[z+dz][x+dx].y - drop, maze[z+dz][x+dx].z));
                    this.carve(nx, nz, visited);
                }
            }
        }
    }
```
Finally for our script to run we need to quickly add a `resetWalls` function, this function will just iterate the walls variable and set all grid cells to `W` resetting their positions.
```typescript
    private resetWalls(): void {
        for (let row of this.walls) {
            for (let cell of row) {
                if (cell.type === 'P') {
                    cell.wall?.position.set(new hz.Vec3(cell.x, cell.y, cell.z));
                    cell.type = 'W'; // Reset type to wall
                }
            }
        }
    }
```
Now if you return to your desktop editor and run preview mode, after you have waited for the maze to fully load you should be able to press the button and see the path drawn in the maze. You will however not spawn into the maze as we will implement that part next.

![Maze Carved](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g5h8ivt2mooy2p46ccy8.png)

To ensure the players spawn into the maze correctly and the finish line is accessible, we need to position our entities based upon the grid that has been generated. Inside the `Maze` class update the `racer` interval function to set the start and finish positions based upon the grid cells:
```typescript
        racer = this.async.setInterval(() => {
            if (at_the_races === 0) {
                this.walls = walls;
                this.props.startPosition?.position.set(new hz.Vec3(this.walls[1][1].x, this.props.startPositionY, this.walls[1][1].z));
                this.props.finishPosition?.position.set(new hz.Vec3(this.walls[this.walls.length - 2][this.walls[0].length - 2].x, this.props.wallHeight / 2, this.walls[this.walls.length - 2][this.walls[0].length - 2].z));
                this.sendLocalBroadcastEvent(Events.setGameState, { state: GameState.Ready, winner: undefined });
                this.async.clearInterval(racer);
            }
        }, 100);

```
Now before you try out this code, lets quickly fix the `Loading` phase of our game engine, if you remember we temporarily added some code in our `GameController` to automatically move into the `Ready` state but now we have the maze rendering and the event written we can remove this code. Open `GameController.ts` and remove the following line from the `start` function:
```typescript
        this.setGameState(GameState.Ready, undefined);
```
Save your files, return to your desktop editor and allow for the scripts to compile. When you now enter preview mode, you will see the text will display 'Loading the Maze...' while you wait for the maze grid to be generated. Once generated you can press the button and you will be teleported into the maze, once you reach the finish line you will be declared the winner. We have a working Maze running game.

![In Game Area](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lmw5eyqlgmkh88gnzr9o.png)

Before we finish for this instalment, lets now tidy up our game world. We no longer need the outer walls or floor for the game area so these objects can be removed. You may also want to move the finish object so it is not in view from the lobby while the maze is rendering.

In the end your game world should now look something like this:

![Final Preview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ia12xem5w4rgkp306pq0.png)

This concludes this part of the tutorial. You now have a fully functional maze game with a randomly generated maze each time you play. In the final instalment of this series, we'll look at adding NPCs to race against within your maze.
