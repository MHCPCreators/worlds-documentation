# A Guide to Lighting, Colliders, and Audio in Horizon Worlds

Creating an immersive world is about more than just what you see. It's about how objects interact, how the environment is lit, and the sounds that bring it all to life. This guide will cover the essentials of lighting, colliders, and audio in Meta Horizon Worlds.

## Illuminating Your World: A Guide to Lighting

Lighting is a powerful tool for setting the mood and guiding players. Horizon Worlds offers several lighting options to choose from.

### Environment Gizmo

The **Environment Gizmo** is your primary tool for controlling the overall lighting of your world. With it, you can:

*   **Adjust the Skydome:** Change the time of day and the appearance of the sky.
*   **Control Fog:** Add depth and mystery to your world with adjustable fog density.
*   **Set Ambient Lighting:** Control the overall brightness and color of the light that fills your world.

### Static Light Gizmo

For more direct control over lighting, you can use the **Static Light Gizmo**. These are lights that you place in your world and that do not move or change during runtime. They are a performant way to add highlights, create atmosphere, and draw attention to key areas. You can customize their shape, color, and intensity.

## Making a Solid World: Understanding Colliders

Colliders define the physical boundaries of objects in your world. They are essential for creating a world that players can interact with in a believable way.

### What are Colliders?

A collider is an invisible shape that determines how an object interacts with other objects. When you make an object "collidable," you are adding a collider to it. This prevents other objects (and players) from passing through it.

### Best Practices for Colliders

*   **Keep it Simple:** For complex objects, consider using a simpler, primitive collider (like a cube or a sphere) instead of a detailed mesh collider. This can significantly improve performance.
*   **Disable Unnecessary Colliders:** Not every object needs to be collidable. If players don't interact with an object, consider turning its collider off to save on physics processing.
*   **Visualize Your Colliders:** Use the "Collider Visualization" tool in the Utilities menu to see the colliders in your world. This can help you identify any issues or areas for optimization.

## The Sounds of Your World: Integrating Audio

Audio is a key component of an immersive experience. From background music to sound effects, audio can make your world feel more alive.

### Adding Sounds to Your World

You can add sounds to your world from the **Sounds** section of your Creator Menu. Here you'll find a library of sound effects and music clips. To add a sound to your world, simply grab it from the menu and place it in your world.

### Programmatic Audio Control

For more advanced audio control, you can use the **AudioGizmo API** with TypeScript. This allows you to:

*   **Trigger Sounds with Scripts:** Play sounds in response to player actions or game events.
*   **Control Playback:** Adjust the volume, pitch, and other properties of your audio in real-time.
*   **Create Dynamic Soundscapes:** Build complex and responsive audio environments that react to the player.

By carefully considering lighting, colliders, and audio, you can create a world that is not only visually stunning but also deeply immersive and interactive.
