**Optimizing your Horizon World’s performance**

This tutorial covers the Horizon World’s performance metrics, why each of these is important, what affects each parameter and show the way how those can be optimized

The Word’s performance on player’s devices is a crucial part of each world’s lifecycle: no matter how good, engaging and beautiful your world is, if players experience low fps, statters, lags and etc it will drastically affect their motivation. They will quickly drop the world and go for another one that will run smoothly on their device.

The main tool provided by World Desktop Editor to monitor your world’s performance is ‘World capacity’ information, which can be accessed through the main dropdown menu in the top left corner of the editor. Let’s run through each of it’s metrics and see how they influence the overall performance of the world and how they can be optimized.

![World Capacity](https://github.com/lastxlr/MHCPTutorial/blob/07a7e63e8fbe7f8758341177da7b151a16b76374/docs/performance/complete-performance-guide-lastxlr/images/CPGL-world-capacity-img.PNG)

**Objects** 

This parameter shows how many objects are there in the world relative to the maximum acceptable quantity (in percent). Objects are separate entities with their own pivot point. So if you have a car for example that has been previously a collection of separate entities (like wheels, chair, car body etc) which were later joined into the single entity in 3D software, it is considered as one object. While a group of entities stored under parent \[Empty object\] is still a group of separate objects.

The more objects you have in the scene, the heavier the load on the player’s device. Because it still needs to load, keep them in memory and process, even if they are not rendered at the current moment. Therefore you shall aim to keep the objects’ count in your scene as low as possible. Yet don’t go too hard here - if there are too few objects the world might look unattractive. So try to keep the balance here.

Also in pursuit for the low objects count be careful with joining the group of objects into a single object via 3D softwares: while it will help to lower the overall objects count it might create additional load on the render engine (and affect performance as a consequence). The engine renders only those objects which the player actually looks at right now - like if the player looks at the wall and there’s another wall behind them, this wall is not rendered. However, if these two walls are joined into a single object the wall behind will be rendered too even while it is out of sight, because the engine renders an object in full.

**Simulations, animations, dynamics and physics**

These parameters show how many collidable, animated and ‘physics-enabled’ objects are there in the world and how those are close to the limit. Animations load the device since their data is processed every frame (since some of their parameters change every frame). The more animations are there in the world (especially working at the same time) the harder for the device it is to process those. Try to balance the amount of animations, and if you still need a lot for your world’s idea you can still try to separate them in time or triggers - so there would be not too many different animations playing at once. Go through your world and check which animations could be turned off after they have played or if the user has left the area.

Collidable and physics-enabled objects provide quite significant load on the device too. With those the device needs not only to track their position each frame (like with collidable objects, to check for collisions) but also calculate their acceleration and velocity (for physics-enabled objects). While modern devices can process quite a lot physics-enabled objects today you shall still try to lower the total amount of objects with enabled physics - this will help with performance and also allow the players with lower end devices to enjoy your world. Go through each of the objects, check if they really need physics, and if so, check if you can manage it by turning it off (disabling the simulation via script) during game stages when they are not used.

As for collision,there are two key points. First, all newly added objects (either assets or basic shapes) are added to the scene with collision set to on and ‘on everything’ (that means that they will collide both with players and other objects). It is a good practice to go though each object and check if it really needs collision, and if so, does it really need collision with everything, or only with objects/players. For example if you have some bushes and grass objects those collisions can be easily turned off and it won’t affect players’ experience. Same with some objects that won’t ever contact with the players (like cloud meshes in the sky).

Second, yet very important. Collision is calculated based on the actual shape of the object and the amount of vertexes the mesh has. The engine doesn’t ‘see’ an object as an actual object - the house mesh for the engine is a set of vertices and their connection with each other and communication with other objects’ vertices. So the more vertices you collidable object has, the more calculations the engine needs to do to control collision. BUT there’s a great trick how to make even vertices-heavy object collidable with super light calculation for the engine - you can ‘wrap’ Horizon’s collider object (or several of those) over it, while turning off the collision for the object itself. Imagine you have high-poly objects whose collision is crucial. There’s no need to waste resources of the engine asking it to control an object's collision - just add one of the standard Horizon collider objects, place those on the objects’ position and adjust the scale so the collider would cover your object.

![Colliders](https://github.com/lastxlr/MHCPTutorial/blob/07a7e63e8fbe7f8758341177da7b151a16b76374/docs/performance/complete-performance-guide-lastxlr/images/CPGL-colliders.PNG)

You can also use several colliders to build a more precise shape of the object. And the collision of the object itself can be set to ‘off’. This way engine will need to control collision for the basic cube or capsule, instead calculating it for all object’s vertices. With this method you can set almost all world’s objects collision to ‘off’, wrap it will basic colliders and save a ton of resources. Horizon’s colliders are lifesavers here!

**World vertex count**

Speaking of vertices, as already mentioned before the more vertices some object has, the harder it is for the engine and device to process it. Lots of high poly (high vertex count) objects create a tremendous load on the device. Therefore you need to pay close attention to each object’s vertex count. Determine what role plays the object in your world (like if it is a main object, or on the contrary the small decoration somewhere on the background), and follow the ‘golden rule’ of the horizon - the smaller the role of the object, the smaller the object itself, the less vertices shall it have. If it is a small chest in the scene that plays the role of decoration only it is not very reasonable for this chest to have 10,000+ vertices. Try to follow this rule of thumb: 20-400 vertices for small-sized/small-importance object (the lower the importance, the lower the vertex count), 400-1500 vertices for medium-sizes/meduim-importance objects, 1500-9000 for big objects or main ones where details matter.

**Objects textures**

Since we are talking about objects let’s cover the textures too. The logic is simple - the more textures as separate images you have in your world, the heavier the load on the device and engine (similar to the total objects count). Yet it doesn’t mean that you shall leave your objects without textures at all. As a solution you can combine the textures of different objects on the one UV map, or create trim textures. This way several different objects will use only one texture, this works the best for the small objects or the ones that are not that important. If you have lots of small objects (or the ones in the background) there’s no need for each of them to have a separate 1024x1024 texture. Instead, you can adjust their UV in 3D software the way so they would all share the same UV map. So instead of each of the objects having its own UV-map it will be like a ‘puzzle’ of all UVs ‘stored’ in one. Mastering creating and applying trim textures helps to significantly increase overall performance.

![Trim Texture 1](https://github.com/lastxlr/MHCPTutorial/blob/07a7e63e8fbe7f8758341177da7b151a16b76374/docs/performance/complete-performance-guide-lastxlr/images/CPGL-trim-texture-1.PNG) ![Trim Texture 2](https://github.com/lastxlr/MHCPTutorial/blob/07a7e63e8fbe7f8758341177da7b151a16b76374/docs/performance/complete-performance-guide-lastxlr/images/CPGL-trim-texture-2.PNG)

Images source: FlippedNormals

**VFX count**

Visual effects created with particle gizmo also affect the performance. Since those are particles, and each particle is a separate object with its own behavior. The more VFX you have in the scene, the more particles the engine and device need to process (especially at the same time). And those boys are heavy! Always keep in mind VFXes, try to use them as few as you world and idea allows and at least try to control that they are not active all the time and only few at once.

**Trigger Gizmos**

Since trigger gizmos control player or entity interaction with them (entering the trigger or actual interaction), large amount of gizmos can also affect the performance. The solution is similar to others above - keep the trigger gizmos amount under control and balance, and check if some of the gizmos can be disabled for the stages of your world where they definitely won’t be used.

**Conclusion**

Understanding and mastering balancing of these metrics will help you significantly improve performance of your world, and as a result increase user engagement, satisfaction and return rate.
