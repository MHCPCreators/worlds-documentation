# Horizon World Tutorial - Maze Runner - Part 1 - Creating the World

In this five part tutorial series, we'll expand on the concepts from my previous guide, [Horizon World Tutorial - Player Management](https://dev.to/lnationorg/horizon-world-tutorial-player-management-part-1-server-and-local-controller-1k2), to create a maze runner game. We'll walk through setting up a new world, building a game controller, adding sound, generating a maze, and adding NPC runners. Before starting, make sure you've completed the `Player Management` tutorial and are ready to duplicate that world in your Horizon Worlds desktop editor.

So lets begin, first open the Horizon Worlds desktop editor and `duplicate` your `Player Logic` world renaming the new world `Maze runner`.

![Duplicate](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vg780pp6s2esonjp4pi0.png)

![Rename](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/48ktylcvju8elglix5mr.png)

Now just test your world has duplicated correctly by entering preview mode and testing the default player controller logic.

![Preview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o2pstgyyv5hcz96awq8u.png)

With the basic player logic set up, the next step is to configure our new world. Start by creating the main play area. In the editor, add a cube to represent the floor this will help you visualise the final size of the play area. Although the maze walls will eventually define the space, this temporary floor gives your avatar something to stand on during setup. Set the cube’s position to `hz.vec3(0, -0.1, 0)` and its scale to `hz.Vec3(72, 0.1, 72)`. You can also adjust the tint color and strength to your preference.

![Cube](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lclm36fmpzmnaea2mwdp.png)


![Cube Properties](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rqolcqw7vqos99tg3aj3.png)

When you preview the scene, you might notice that the floor appears extended but the grid is still visible, which doesn't look quite right. To fix this, add an Environment gizmo: go to the Gizmo tab and select Environment. Alternatively, you can use the AI tools to generate an environment for you. After adding the Environment gizmo, open its properties and disable the 'Show Grid' option. This will hide the grid and give your play area a cleaner look.

![Grid Showing](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pxze25ytgshp97qi6369.png)

![Gizmo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dozi5uhdxeecmkma02fr.png)

![Search Environment](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5qz0y3wnn1aoir2y3buh.png)

![Set Properties](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/15zd2img2j40n1fjmasn.png)

Next lets add some invisible walls so that the players cannot run off the game area. Add four transparent cubes to each side of the play area, I use the following Attributes:

Wall North
    - position: `hz.Vec3(0,5,38)`
    - rotation: `hz.Vec3(0,0,0)`
    - scale: `hz.Vec3(80,10,4)`

Wall East
    - position: `hz.Vec3(38,5,0)`
    - rotation: `hz.Vec3(0,0,0)`
    - scale: `hz.Vec3(4,10,80)`


Wall South
    - position: `hz.Vec3(0,5,-38)`
    - rotation: `hz.Vec3(0,0,0)`
    - scale: `hz.Vec3(80,10,4)`

Wall West
    - position: `hz.Vec3(-38,5,0)`
    - rotation: `hz.Vec3(0,0,0)`
    - scale: `hz.Vec3(4,10,80)`

To make transparent just set the `visible` property of the cube to disabled.

![South Wall](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xw9yve984bipxo57wmw7.png)

Your game area should now look something like this:

![Preview Game Area](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n5fsyjvd0v0m27tmr3st.png)

Next to tidy up our `Hierarchy` we will group the objects we have just created under an parent object, select the 5 objects and right click and click 'create parent object' option. Once created rename this object to `GameArea`.

![Group Game Area](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nn0xekglpavwo3kq9n05.png)

![Game Area](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/me8iegqo5bcvqavhigy7.png)

Now that the game area is set up, let's create a lobby where players will spawn before the game begins or while a game is already in progress. To make the experience more engaging, position the lobby above and to the side of the play area so players have a clear view of the maze below as they wait.

First lets create the lobby floor, add a new cube to the world and set the position to `hz.Vec3(0,15,-50)` and scale to `hz.Vec3(16,1,16)`, optionally set the tint to a colour of your choice.

![Lobby Floor](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lqfhg4w1zhuzbi1iljtc.png)

Then add some walls to the lobby area so that the players cannot fall. In my example I use the following attributes:

Wall North:
    - position: `hz.Vec3(0,18,-42)`
    - rotation: `hz.Vec3(0,0,0)`
    - scale: `hz.Vec3(16.5,6,0.5)`

Wall East
    - position: `hz.Vec3(8,18,-50)`
    - rotation: `hz.Vec3(0,0,0)`
    - scale: `hz.Vec3(0.5,6,16.5)`

Wall South
    - position: `hz.Vec3(0,18,-58)`
    - rotation: `hz.Vec3(0,0,0)`
    - scale: `hz.Vec3(16.5,6,0.5)`

Wall West
    - position: `hz.Vec3(-8,18,-50)`
    - rotation: `hz.Vec3(0,0,0)`
    - scale: `hz.Vec3(0.5,6,16.5)`

![Lobby Walls](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r01cbbjtjnjigaktdhmc.png)

Our lobby area should now look like this:

![Preview Lobby Area](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ckmkppyfpibfqy3kpwvw.png)

Next we need to move our default spawn location to be inside of our lobby area, you can either drag or just update the position attribute to `hz.Vec3(0,17,-50)` and leave the rotation `hz.Vec3(0,0,0)`. Now when you preview your world you will spawn into the lobby.

![Spawn Point](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/26c15f34sc2rat79inoe.png)

With the main game area and lobby set up, let's add a few more elements to prepare for building the game controller. In the lobby, place a button that players can press to start the game, a text gizmo we can use to inform the player of the game status and additionally, set up a default leaderboard to get ready for tracking player times. For the button we will use a public asset that I have made available, in the editor navigate to the `Asset Library` panel and under public assets search for `Maze Runner` you should find several assets all of which we will use in this tutorial series, for this part we only need the button assets there should be two static and moving add these into your world. Position the static asset `hz.Vec3(0,15.5,-43)` and the moving asset `hz.Vec3(0,16.4,-43)`.

![Public Assets](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zdx2b8noy5h6sxvl68kv.png)

![Button Moving](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6q2fxyosgylbxmaw6xik.png)

![Button Preview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/drqdngauo86mm16yueld.png)

With that in place we need to add a trigger that can be used to activate the button, this should be set to `Selectable in Screen mode` so that it works transparently on all devices. Position your trigger covering the moving button, I use the following position `hz.Vec3(0,16.4,-43)` and scale `hz.Vec3(0.9,0.9,0.9)`.

![Search Trigger](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i977287hzqkbpaohk86b.png)

![Button Trigger](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wv02v6gziw5c7bqc9oh7.png)

Now above the button add a default text gizmo which we will later use to update from our controller to inform players in the lobby the status of our game. Open the gizmo panel and search for text, rename the object `GameInfo` and place it above the button at the position `hz.Vec3(0,18,-42)` and rotation `hz.Vec3(0,180,0)`.

![Search text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d7r3j3ncnleambrngtma.png)


![Game Info](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gmbxp42su8hrzpxqambg.png)

To complete our basic lobby we will next add a leaderboard which we will use to track the fastest times players complete our randomly generated mazes. Under `Systems` click `Leaderboards`, then add a new leaderboard and call it `Fastest Times` and ensure you change the sort order to ascending so we get the fastest and not slowest times.

![Systems leaderboards](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zn6liu5gn0e37bmm7y2r.png)

![Create leaderboard](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iiw4oan2q0cf1go1c30e.png)

After add the leaderboard to your world via the gizmo panel and searching for `World leaderboards`, ensure you set the properties to link to the `Fastest Times` leaderboard you defined in the previous step and then position it to the side of the lobby and scale based on your own preference. In my example I use the `hz.Vec3(8, 16, -50)` as the position and `hz.Vec3(6,6,1)` as the scale.

![Leaderboard properties](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8s4f0n7aa6fd09adprvk.png)

![leaderboard preview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8sjll63h4k7u3qieui78.png)

Finally before we finish for this part of the tutorial lets tidy up our hierarchy, first create a parent object for the button. Select the `ButtonStatic`, `ButtonMoving` and `ButtonTrigger` assets, right click and `Create parent object`. Rename the object to `StartButton`.

![startButton](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3gsvyraz7gjdcaj3knkf.png)

Then select all the remaining objects including the `StartButton` and `SpawnPoint`, right click and `Create parent object`. Rename this object to `Lobby`.

![Select Lobby](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uiioc90mqdioxdz1p7ss.png)

![Lobby](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7fb0ctfya6346g00htm7.png)

With these steps complete, your world is now set up and ready for the next phase. In the following part of this tutorial series, we'll begin building the game controller to handle the core gameplay logic.

![Final View](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c8xa57h9q6wti46sg8cw.png)

