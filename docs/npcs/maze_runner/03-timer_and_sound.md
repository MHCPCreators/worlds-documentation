# Horizon World Tutorial - Maze Runner - Part 3 - HUD timer and background sound

In our last tutorial, we setup the basic game mechanics for our Maze runner game. In this part, we will enhance the game by adding a custom UI timer to our HUD and some background sound to the world to improve the overall player experience.

Let's start by adding a custom UI timer to the players screen, to implement this we can extend the already existing `localPlayerHUD` script. Open this script in your editor to refamiliarise yourself with its structure. Notice that we currently import `Events`, but to properly display the timer during specific game states, we also need to import `GameState`. Update the import statement accordingly.
```typescript
import { GameState, Events } from 'GameUtils';
```
Next we need to add some properties to store the timer state and ongoing duration. Below the existing properties, add the following code:
```typescript
    private timer = new Binding<string>('0'); // Timer value in seconds
    private timerDisplay = new Binding<string>('flex'); // property to manage visibility of HUD
    private timerID: number = 0;
```
We have defined three properties, the timer which is a `Binding<string>` to hold the timer value, the `timerDisplay` which is a `Binding<string>` to manage the visibility of the HUD, and the `timerID` which is a number to keep track of the timer's interval ID. Note that we are using `Binding` to ensure that any changes to these properties will automatically update the UI.

With these properties in place, we next need to update our `initializeUI` to render the timer in the HUD. Locate the `initializeUI` function and replace it with the following:
```typescript
    initializeUI() {
        return ui.View({
            children: [
                ui.View({
                    style: {
                        position: 'absolute',
                        display: this.timerDisplay,
                        bottom: 20,
                        left: 20,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: 10,
                        padding: 10,
                    },
                    children: [
                        ui.Text({
                            text: this.timer,
                            style: {
                                fontSize: 24,
                                color: 'white',
                                textAlign: 'center',
                            }
                        })
                    ]
                }),
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
What we have done here is add a new `UI.View` component that will be displayed at the bottom left of the screen. This view contains a `UI.Text` component that binds to our `timer` property, allowing it to dynamically update as the timer changes. We use the `timerDisplay` property to control the visibility of the timer HUD. The view is styled with a semi-transparent background and rounded corners to ensure it is visually appealing and does not obstruct gameplay.

Now before we can test the timer, we need to do a little extra work to ensure the `gameStateChanged` event can reach our HUD, the problem is you cannot simply connect to a `connectLocalBroadcastEvent` as this listener gets destroyed when you change the ownership of the HUD. For this to work we need to send a `sendNetworkEvent` for each player HUD and listen to them via `connectNetworkEvent`. So next you need to open `PlayerController` and inside the `handleGameStateChanged` function you need to extend with the following code at the end.
```typescript
    this.players.forEach((p: hz.Player) => {
        this.sendNetworkEvent(
            p,
            Events.gameStateChanged,
            { fromState, toState }
        );
    });
```
This code will ensure that all players receive the `gameStateChanged` event to their `local` HUD script when the game state changes. Next we need to setup a listener for our `gameStateChanged` Event, within this event we will show the timer HUD when we enter `Starting` state. The timer will being counting when we enter `Playing` state and will stop when we enter `Ending` state. We will connect to the event inside of our `start` function. After the existing `setHUDSprint` event listener add the following code:
```typescript
    this.connectNetworkEvent(
        this.entity.owner.get(),
        Events.gameStateChanged,
        (data: {
            fromState: GameState,
            toState: GameState,
        }) => this.handleGameStateChanged(data.fromState, data.toState),
    );
```
Then to implement the `handleGameStateChanged` function after the `start` function add:
```typescript
    handleGameStateChanged(fromState: GameState, toState: GameState) {
        if (toState === GameState.Starting) {
            this.showTimer();
        } else if (toState === GameState.Playing) {
            this.startTimer();
        } else if (toState === GameState.Ending) {
            this.stopTimer();
        }
    }
```
This function checks the new game state and calls the appropriate method to manage the timer's visibility and functionality. When the game state changes to `Starting`, it calls `showTimer` to make the timer visible. When it changes to `Playing`, it starts the timer with `startTimer`. Finally, when the game state changes to `Ending`, it stops the timer with `stopTimer`.

We need to next implement the `showTimer`, `startTimer`, and `stopTimer` functions in our HUD script. We will start with `showTimer` which will make the timer HUD visible. It will need to set the `timerDisplay` property to `flex` and reset the `timer` property to `0`.
```typescript
    private showTimer() {
        this.timerDisplay.set('flex');
        this.timer.set('0');
    }
```
Next we will add the `startTimer` function which will begin the timer's countdown. We will use `async` `setInterval` to ensure we do not block the main thread, we will use the `timerID` property to keep track of the interval.
```typescript
    private startTimer() {
        let t = 0;
        this.timerID = this.async.setInterval(() => {
            t++;
            this.timer.set(t.toString());
        }, 1000);
    }
```
Finally, we will implement the `stopTimer` function which will stop the timer's countdown. This function will clear the interval using the `timerID` property and set the `timerDisplay` property to `none`.
```typescript
    private stopTimer() {
        this.async.clearInterval(this.timerID);
        this.timerDisplay.set('none');
    }
```
With this in place when you now enter preview mode, you should see the timer HUD appear when the game state changes to `Starting` (when you press the button), start counting up when it changes to `Playing` (when you teleport into the game area), and stop counting and hide when it changes to `Ending` (when you reach the finish line).

![Timer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kq9mzgydmqgo20i40ut4.png)

Now that we have the timer working, let's add some sound to our game. Today we will be adding background music to enhance the gaming experience. We will use two sound tracks: one for the lobby and one for the game area.

First we will need to prepare our `GameController`, open this file in you code editor and then inside of the `propsDefinition` add definitions for our two sound assets:
```typescript
    static propsDefinition = {
        countdownTimeInSeconds: { type: hz.PropTypes.Number, default: 10 },
        lobbySound: {type: hz.PropTypes.Entity},
        playingSound: {type: hz.PropTypes.Entity},
    };
```
Now that we have the properties defined, return to the desktop editor, navigate to the `Sounds` tab under `Build`, and change the dropdown to `Music`. Then you can choose two tracks to add into your world, for my example I will use `Arcade Theme` for the lobby and `Flexing` for the game area. Adjust the volume to your liking and disable the `Play on Start` option. Once you are happy, click on the `GameController` object and link your sound assets to the `lobbySound` and `playingSound` properties.

![Sounds](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fisez5btbiv7bqc6w71q.png)

![Link Entity](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ybjpuojya4gmy7u6ekdw.png)

With the sound assets linked, return to your code editor and open `GameController.ts`. Next we will add some more private properties to store the casted `AudioGizmo` instances:
```typescript
    private lobbySound: hz.AudioGizmo | undefined;
    private playingSound: hz.AudioGizmo | undefined;
```
Then we need to instantiate these properties, we will do this early inside of the `start` function, we can also begin playing the `lobbySound` at this point. As the beginning of the `start` function add the following:
```typescript
        this.lobbySound = this.props.lobbySound?.as(hz.AudioGizmo);
        this.lobbySound?.play();
        this.playingSound = this.props.playingSound?.as(hz.AudioGizmo);
```
This code casts the linked sound entities to `AudioGizmo` instances and starts playing the lobby sound. Next, we will need to implement the logic to switch between the lobby and playing sounds based on the game state. Inside `setGameState` case `GameState.Starting` before the call to `handleNewMatchStarting` add:
```typescript
                this.lobbySound?.stop();
                this.playingSound?.play();
```
Then inside the same `setGameState` function, add the case for `GameState.Finished`:
```typescript
                this.playingSound?.stop();
                this.lobbySound?.play();
```
Now return to your desktop editor and run the preview mode, on start you should hear the lobby music, when you start playing the game the music should switch to the playing music, and when you finish the game it should switch back to the lobby music.

This concludes this part of the tutorial. In the next installment, we’ll tackle the actual generation of the maze.
