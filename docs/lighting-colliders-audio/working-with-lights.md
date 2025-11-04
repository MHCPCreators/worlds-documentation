# Working with Lights in Horizon Worlds

Sahil (thesloppyguy)

September 4, 2025

---

## Introduction

This tutorial will walk you through the different types of lights and environment systems, adding interaction to the lights and walk you throught some light theory with examples so you can make your worlds immersive.

By the end, you’ll understand:

- How to use light gizmo and create interactive experience.
- How to add environment to complement lights to make it more emmersive.
- Learn and implement light theory into your world.
- Learn to optimize lights and bake lights and shadows into textures.

### Prerequisites and Expectations

You should be familiar with:

- General tools and UI of Meta Horizon Desktop Platform.
- (Optional) a photo editor for coloring textures.

## Topic One: Lighting and Environment Gizmo

### Understanding Light Theory and Creative Practice

Lighting is one of the most powerful tools in your world-building arsenal. It can transform a simple scene into something magical, guide player attention, and create emotional responses. Understanding how light works in the real world helps you create more convincing virtual environments.

**Key Concepts:**

- **Intensity:** Brightness of the light
- **Color:** Hue and warmth/coolness
- **Direction:** Where the light comes from
- **Quality:** How sharp or soft shadows are
- **Falloff:** How quickly light fades with distance

Creative principles such as three-point lighting, color harmony, and soft/hard light produce engaging scenes but must be adapted to the unique systems of Horizon Worlds.

### Horizon Worlds Lighting Gizmo Types

**There are two main categories of lights:**

| Gizmo Type        | Variants                           | Properties                                                             | Usage Scenarios                  |
| ----------------- | ---------------------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| **Static Light**  | Cuboid, Ellipsoid, Disk, Rectangle | Shape, Color, Intensity, Enabled                                       | Most world lighting              |
| **Dynamic Light** | Point, Spot                        | Type (Point/Spot), Intensity, Spread, Falloff Distance, Color, Enabled | Moving or scripted light effects |

![Static vs Dynamic Light Comparison](/images/DynamicAndStaticLights.png)

**Static Light Gizmo:**

- For fixed, baked lighting (does not change at runtime)
- **Shapes:** Cuboid (omnidirectional), Ellipsoid (omnidirectional), Disk (directional), Rectangle (directional)
- **Properties:** Shape, Color, Intensity, Enabled toggle

![Static Light Shapes](/images/StaticImageTypes.png)

**Dynamic Light Gizmo:**

- For interactive lighting (can be moved, transformed, or toggled via script at runtime)
- **Types:** Point (omnidirectional), Spot (cone-shaped)
- **Properties:** enabled (on/off), falloffDistance (0-100), intensity (0-10), spread (spot cone, 0-100), color, type (set in editor, not scripts)
- **Limit:** Maximum 20 dynamic lights per world. Consider performance.

![Dynamic Light Types](/images/DynamicTypes.png)

### Environment Gizmo Setup

The Environment Gizmo controls the overall world lighting, fog, and atmosphere.

**Key Properties:**

- **Skydome**: Choose from preset environments (Daytime, Night, Sunrise, etc.)
- **Fog Density**: Adjust atmospheric fog (0.0-1.0, use very low values like 0.1)
- **Custom Gradient**: Create custom sky colors
- **Grid Visibility**: Show/hide floor grid

![Environment Gizmo](/images/EnvirontmentGizmo.png)

**Environment Presets Available:**

- **Daytime**: Bright, natural lighting
- **Night**: Dark atmosphere with subtle ambient light
- **Sunrise/Sunset**: Warm, golden lighting
- **Various themed environments**: Space, underwater, fantasy settings

**Fog Density Guidelines:**

- **0.0**: Crystal clear visibility
- **0.01-0.05**: Subtle depth enhancement
- **0.07+**: Noticeable atmospheric effect (use sparingly)

![Dynamic Light Types](/images/lighting-fog.png)

**Important**: Fog density is extremely sensitive. Values above 0.7 can make building difficult as it affects visibility in build mode.

## Topic Two: Adding Interactivity to your Lights

### Proximity-Based Lighting

Proximity-based lighting creates immersive experiences by responding to player movement and interaction.

![Proximity-Based Lighting Setup](/images/DynamicGizmo.png)

**Implementation Steps:**

1. **Create Trigger Zone**

   - Add Trigger Gizmo to your world
   - Configure size and position for desired interaction area

2. **Set Up Light Entity**

   - Add Dynamic Light Gizmo
   - Configure initial properties (color, intensity, falloff)

3. **Connect with Scripts**
   - Use TriggerBroadcaster to detect player entry/exit
   - Use LightChanger to modify lighting properties

### Network Event Systems

The TriggerBroadcaster component detects when players enter or exit trigger zones and sends network events.

```typescript
import {
  Component,
  PropTypes,
  NetworkEvent,
  CodeBlockEvents,
  Player,
  Entity,
} from "horizon/core";

// Define the network events. These should match the event names used by any receiving scripts.
const PlayerEntered = new NetworkEvent("PlayerEntered");
const PlayerExited = new NetworkEvent("PlayerExited");

export class TriggerBroadcaster extends Component<typeof TriggerBroadcaster> {
  static propsDefinition = {
    // The entity that will receive the network events.
    target: { type: PropTypes.Entity },
  };

  private playerCount: number = 0;

  override preStart() {
    // Connect to the trigger event that fires when a player enters.
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => {
        this.handlePlayerEnter(player);
      }
    );

    // Connect to the trigger event that fires when a player exits.
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerExitTrigger,
      (player: Player) => {
        this.handlePlayerExit(player);
      }
    );
  }

  private handlePlayerEnter(player: Player) {
    this.playerCount++;

    // If this is the first player to enter the trigger, send the event.
    if (this.playerCount === 1) {
      if (this.props.target) {
        this.sendNetworkEvent(this.props.target, PlayerEntered, {});
      } else {
        console.error("TriggerBroadcaster: 'target' prop is not set.");
      }
    }
  }

  private handlePlayerExit(player: Player) {
    this.playerCount--;

    // If this was the last player to leave the trigger, send the event.
    if (this.playerCount === 0) {
      if (this.props.target) {
        this.sendNetworkEvent(this.props.target, PlayerExited, {});
      } else {
        console.error("TriggerBroadcaster: 'target' prop is not set.");
      }
    }
  }
}

Component.register(TriggerBroadcaster);
```

### Light Control System

The LightChanger component receives network events and modifies lighting properties accordingly.

<iframe width="1852" height="826" src="https://www.youtube.com/embed/S3rJowdG9nw" title="Toggle Light" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

```typescript
import {
  Component,
  PropTypes,
  NetworkEvent,
  DynamicLightGizmo,
  Color,
} from "horizon/core";

// Define the network events that will trigger the light change.
const PlayerEntered = new NetworkEvent("PlayerEntered");
const PlayerExited = new NetworkEvent("PlayerExited");

export class LightChanger extends Component<typeof LightChanger> {
  static propsDefinition = {
    // The light entity that will change color.
    light: { type: PropTypes.Entity },
  };

  private originalColor?: Color;

  override preStart() {
    // Listen for the 'PlayerEntered' network event.
    this.connectNetworkEvent(this.entity, PlayerEntered, () => {
      this.setLightToWhite();
    });

    // Listen for the 'PlayerExited' network event.
    this.connectNetworkEvent(this.entity, PlayerExited, () => {
      this.restoreOriginalColor();
    });
  }

  override start() {
    if (this.props.light) {
      const lightGizmo = this.props.light.as(DynamicLightGizmo);
      if (lightGizmo) {
        // Save the original color of the light when the script starts.
        this.originalColor = lightGizmo.color.get();
      } else {
        console.error(
          "LightChanger: The provided 'light' entity is not a DynamicLightGizmo."
        );
      }
    } else {
      console.error("LightChanger: 'light' prop is not set.");
    }
  }

  private setLightToWhite() {
    if (!this.props.light) return;

    const lightGizmo = this.props.light.as(DynamicLightGizmo);
    if (lightGizmo) {
      // Change the light's color to white.
      lightGizmo.color.set(new Color(1, 1, 1));
    }
  }

  private restoreOriginalColor() {
    if (!this.props.light || !this.originalColor) return;

    const lightGizmo = this.props.light.as(DynamicLightGizmo);
    if (lightGizmo) {
      // Restore the light's original color.
      lightGizmo.color.set(this.originalColor);
    }
  }
}

Component.register(LightChanger);
```

### Color Cycling System

Create dynamic color transitions effects:

<iframe width="1852" height="826" src="https://www.youtube.com/embed/-7tQPS9mtKw" title="Color Cycle" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

```typescript
import {
  Component,
  PropTypes,
  NetworkEvent,
  DynamicLightGizmo,
  Color,
} from "horizon/core";

// Define the network events. These should match the events sent by the trigger script.
const PlayerEntered = new NetworkEvent("PlayerEntered");
const PlayerExited = new NetworkEvent("PlayerExited");

export class StaticLightChanger extends Component<typeof StaticLightChanger> {
  static propsDefinition = {
    // The light entity that will change color.
    light: { type: PropTypes.Entity },
  };

  private originalColor?: Color;
  private colorChangeInterval?: number;

  override preStart() {
    // Listen for the 'PlayerEntered' network event to start the color changes.
    this.connectNetworkEvent(this.entity, PlayerEntered, () => {
      this.startColorChange();
    });

    // Listen for the 'PlayerExited' network event to stop the color changes.
    this.connectNetworkEvent(this.entity, PlayerExited, () => {
      this.stopColorChange();
    });
  }

  private startColorChange() {
    // Clear any existing interval to prevent duplicates.
    if (this.colorChangeInterval) {
      this.async.clearInterval(this.colorChangeInterval);
    }

    // Start a new interval to change the color every 3 seconds.
    this.colorChangeInterval = this.async.setInterval(() => {
      this.setRandomColor();
    }, 3000);
  }

  private stopColorChange() {
    // Clear the interval.
    if (this.colorChangeInterval) {
      this.async.clearInterval(this.colorChangeInterval);
      this.colorChangeInterval = undefined;
    }
    // Restore the light's original color.
    this.restoreOriginalColor();
  }

  private setRandomColor() {
    if (!this.props.light) return;

    const lightGizmo = this.props.light.as(DynamicLightGizmo);
    if (lightGizmo) {
      // Create a new random color.
      const randomColor = new Color(
        Math.random(),
        Math.random(),
        Math.random()
      );
      lightGizmo.color.set(randomColor);
    }
  }

  private restoreOriginalColor() {
    if (!this.props.light || !this.originalColor) return;

    const lightGizmo = this.props.light.as(DynamicLightGizmo);
    if (lightGizmo) {
      lightGizmo.color.set(this.originalColor);
    }
  }

  override dispose() {
    // Ensure the interval is cleared if the component is destroyed.
    if (this.colorChangeInterval) {
      this.async.clearInterval(this.colorChangeInterval);
    }
  }
}

Component.register(StaticLightChanger);
```

### Intensity Pulsing System

Create breathing or pulsing light effects:

```typescript
import { Component, PropTypes, DynamicLightGizmo } from "horizon/core";

export class IntensityPulser extends Component<typeof IntensityPulser> {
  static propsDefinition = {
    light: { type: PropTypes.Entity },
    minIntensity: { type: PropTypes.Number, defaultValue: 1 },
    maxIntensity: { type: PropTypes.Number, defaultValue: 8 },
    pulseSpeed: { type: PropTypes.Number, defaultValue: 1000 },
  };

  private pulseInterval?: number;
  private increasing = true;
  private currentIntensity: number;

  override start() {
    this.currentIntensity = this.props.minIntensity;
    this.startPulsing();
  }

  private startPulsing() {
    this.pulseInterval = this.async.setInterval(() => {
      this.updateIntensity();
    }, this.props.pulseSpeed / 60); // 60 steps per pulse cycle
  }

  private updateIntensity() {
    if (!this.props.light) return;

    const lightGizmo = this.props.light.as(DynamicLightGizmo);
    if (lightGizmo) {
      if (this.increasing) {
        this.currentIntensity +=
          (this.props.maxIntensity - this.props.minIntensity) / 60;
        if (this.currentIntensity >= this.props.maxIntensity) {
          this.increasing = false;
        }
      } else {
        this.currentIntensity -=
          (this.props.maxIntensity - this.props.minIntensity) / 60;
        if (this.currentIntensity <= this.props.minIntensity) {
          this.increasing = true;
        }
      }

      lightGizmo.intensity.set(this.currentIntensity);
    }
  }

  override dispose() {
    if (this.pulseInterval) {
      this.async.clearInterval(this.pulseInterval);
    }
  }
}

Component.register(IntensityPulser);
```

## Topic Three: Understanding Light Theory and Standard Techniques

### Three-Point Lighting Principle

![Three Point Lighting Diagram](/images/3PointLight.png)

The three-point lighting system is a fundamental technique used in photography, film, and 3D rendering to create depth and dimension in your scenes.

**Three-Point Lighting Components:**

1. **Key Light** (Main Light)

   - Primary light source
   - Provides the main illumination
   - Usually the brightest light
   - Creates the primary shadows

2. **Fill Light** (Secondary Light)

   - Softens shadows created by the key light
   - Usually 50-75% intensity of key light
   - Reduces contrast and fills in dark areas

3. **Rim Light** (Back Light)
   - Separates subject from background
   - Creates edge definition
   - Adds depth and dimension

You can also use this lighting techniques to implement global environment lights. Here is an example for a Sky island, look at how we are using the three lights, and some smart techniques to create a good emmersive environment for player to experience.

<iframe width="1852" height="826" src="https://www.youtube.com/embed/HkMY0Ce8wgA" title="Three point light" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Implementation in Horizon Worlds:**

Can be approximated with static and dynamic lights:

- **Key**: Directional Disk or Rectangle (static) or Spot (dynamic)
- **Fill**: Cuboid or Ellipsoid (static) or Point (dynamic)
- **Rim**: Use spot/point strategically (dynamic only if movement needed otherwise static)

### Color Temperature and Mood

![Color Temperature Chart](/images/ColorTemperature.jpg)

Color temperature is measured in Kelvin (K) and affects the mood and atmosphere of your scene.

**Color Temperature Guidelines:**

- **Warm (2500K-3000K):** Cozy, intimate (orange/yellow RGB)
- **Neutral (4000K-5500K):** Office, realistic daylight (white RGB)
- **Cool (6500K+):** Clinical, dramatic (blue RGB)

**In Horizon Worlds:** Set color in the Properties panel; creative use sets the mood but be consistent for realism.

### Static Versus Dynamic Lighting Fundamentals

| Feature      | Static Light Gizmo                          | Dynamic Light Gizmo                                |
| ------------ | ------------------------------------------- | -------------------------------------------------- |
| Movement     | Fixed (cannot move/change)                  | Movable and scriptable                             |
| Properties   | Toggle, Shape, Color, Intensity             | Toggle, falloff Distance, intensity, color, spread |
| Typing/Shape | 4 shapes, no "types" property               | 2 types (Point/Spot)                               |
| Scripting    | Can only toggle enabled state               | Can modify intensity, falloff, spread, enabled     |
| Performance  | Lower impact, preferred                     | Higher cost, performance limits                    |
| Editing      | All properties editable in Properties panel | Only some properties editable via script           |

**Important:**

- **Light type and default color for dynamic lights are set ONLY in the editor, not via script.**
- **Static lights offer better runtime performance due to pre-baked rendering.**
- **Dynamic lights do NOT obey entity visibility settings; control through 'enabled' property.**

### Practical Setup: Effective Lighting Workflows

#### Basic World Lighting (Recommended Workflow)

![Static Light Setup Workflow](/images/StaticWorkflow.png)

1. **Open Build mode.** Add Static Light Gizmo from Gizmos.
2. **Choose Shape:** Cuboid or Ellipsoid for fill/general light; Disk/Rectangle for directional light.
3. **Set Color/Intensity:** Use color picker and intensity slider for mood.
4. **Toggle Enabled:** Activate/deactivate individual lights as needed.
5. **Position/Rotate:** Move lights to create desired effects.

#### Using Dynamic Lights (Advanced/interactive effects only)

![Dynamic Light Setup Workflow](/images/DynamicWorkflow.png)

1. **Add Dynamic Light Gizmo (Point/Spot).**
2. **Set properties in editor:** Type, color, initial intensity, falloff.
3. **Script basic controls:**

```typescript
const dlight = entity.as(DynamicLightGizmo);
dlight.intensity.set(1);
dlight.enabled.set(true);
```

- **Do not attempt to change type or color via script—this is unsupported.**
- Limit to 20 dynamic lights per world.

### Layered Lighting Approach

1. **Base Layer**: Environment gizmo for overall world lighting
2. **Static Layer**: Glow materials for ambient and decorative lighting
3. **Dynamic Layer**: Dynamic lights for interactive elements
4. **Accent Layer**: Strategic lighting for focal points

### Mood Lighting Techniques

- **Warm Lighting**: Use orange/yellow tones for cozy, intimate spaces
- **Cool Lighting**: Blue tones for mysterious, dramatic atmospheres
- **Neutral Lighting**: White lighting for realistic, balanced scenes

### Advanced Light Control Script

```typescript
import {
  Component,
  PropTypes,
  DynamicLightGizmo,
  Color,
  Vector3,
} from "horizon/core";

export class AdvancedLightController extends Component<
  typeof AdvancedLightController
> {
  static propsDefinition = {
    light: { type: PropTypes.Entity },
    targetIntensity: { type: PropTypes.Number, defaultValue: 5 },
    targetColor: { type: PropTypes.Color, defaultValue: new Color(1, 1, 1) },
  };

  override start() {
    this.setupLight();
  }

  private setupLight() {
    if (!this.props.light) return;

    const lightGizmo = this.props.light.as(DynamicLightGizmo);
    if (lightGizmo) {
      // Set initial properties
      lightGizmo.intensity.set(this.props.targetIntensity);
      lightGizmo.color.set(this.props.targetColor);
    }
  }

  public fadeLight(targetIntensity: number, duration: number) {
    // Implement smooth intensity transitions
    // This is a simplified example - implement proper tweening
    if (this.props.light) {
      const lightGizmo = this.props.light.as(DynamicLightGizmo);
      if (lightGizmo) {
        lightGizmo.intensity.set(targetIntensity);
      }
    }
  }
}

Component.register(AdvancedLightController);
```

## Topic Four: Post Processing and Optimization

### Bloom

Bloom creates a glowing effect around bright areas, simulating how bright light sources appear to the human eye. This effect adds realism and visual appeal to your lighting.

**Bloom Settings:**

- Dynamic Light for creating falloff and intensity controll
- Static Light for masking the origin and dispersing light in the fog
- Use a very high-intensity spot light with a wide Spread and light fog enabled → this creates a visible glowing aura.
- Combine with Exposure settings (in your first panel) to exaggerate brightness.
- **Quality**: Performance vs quality trade-off as creating the bloom effect needs Dynamic lights with are CPU intensive and should be used only when needed.

![Bloom](/images/Bloom.png)

**Best Practices:**

- Use subtle bloom for realistic lighting
- Higher intensity for magical or sci-fi effects
- Adjust threshold to control which areas glow
- Test performance impact on target platforms

### Exposure

Exposure controls the overall brightness of your scene, similar to camera exposure settings.

**Exposure Settings:**

- **Exposure Value**: Overall scene brightness (0.0 to 2.0)
- Depending on the mood of the Scene.

**Usage Guidelines:**

- Positive values brighten the scene
- Negative values darken the scene
- Manual exposure for consistent artistic control

![Exposure](/images/Exposure.png)

**VR Considerations:**

- Use very subtle fog in VR
- Dont put many flashing lights in small space it make user experience and performace worse.
- Test thoroughly with target audience

**Creative Uses:**

- Cinematic framing
- Focus attention on center of screen
- Create tunnel vision effects
- Subtle use for atmospheric depth

**Artistic Applications:**

- Realistic camera lens effects
- Sci-fi or horror atmosphere
- Vintage or retro looks
- Use very sparingly to avoid visual discomfort

## Topic Five: Common Issues and Troubleshooting

### Performance Monitoring with Real-time Metrics

Horizon Worlds provides a built-in Real-time Metrics panel to monitor your world's performance.

**Accessing Real-time Metrics:**

**In VR:**

1. Enable **Utilities** menu in Settings
2. Open wrist menu and select **Real-time Metrics**

**On Web:**

- Press **P** key to toggle metrics panel

**Not Available:**

- Desktop editor (use VR or web for testing)
- Mobile (testing must be done in VR or web)

**Key Performance Metrics:**

| Metric         | Target            | Description                              |
| -------------- | ----------------- | ---------------------------------------- |
| **FPS**        | 72 (VR), 60 (Web) | Frames per second - most critical metric |
| **CPU**        | <13.8ms (VR)      | CPU processing time per frame            |
| **GPU**        | <13.8ms (VR)      | GPU rendering time per frame             |
| **Memory**     | <6.25 GB          | Total memory usage (hard limit)          |
| **Draw Calls** | Minimize          | Number of render batches                 |
| **Vertices**   | Monitor           | Total vertices rendered per frame        |
| **Physics**    | Monitor           | Physics simulation time                  |
| **Scripting**  | Monitor           | TypeScript execution time                |

### Memory Management and Limits

**Critical**: Horizon Worlds enforces a **6 GB memory limit** per world.

**Memory Limit Enforcement:**

- Worlds exceeding 6 GB **cannot be published**
- Cannot add new objects/assets when limit is reached
- Existing worlds must be optimized to stay under limit
- System may crash worlds that exceed memory limits

**Memory Optimization Strategies:**

**Reduce Asset Size:**

- Use compressed textures appropriate for target resolution
- Optimize 3D models (reduce polygon count)
- Remove unused materials and textures
- Use texture atlasing to combine materials

**Efficient Asset Usage:**

- Reuse materials across multiple objects
- Share geometries when possible
- Remove duplicate assets
- Use appropriate LOD (Level of Detail) models

### Cross-Platform Optimization

**VR Platform Optimization:**

**Quest 2/3/Pro:**

- Target 72 FPS for smooth experience
- Limit dynamic lights to 15-18 per scene
- Use efficient shadow settings
- Optimize for mobile GPU architecture

**PC VR:**

- Target 90+ FPS for high-end headsets
- Can handle more complex lighting setups
- Monitor CPU/GPU balance
- Test with different hardware configurations

**Web Platform Optimization:**

**Browser Performance:**

- Target 60 FPS for smooth web experience
- Limit dynamic lights to 10-12 per scene
- Use compressed textures and optimized models
- Test across different browsers and devices

### Mobile and Web Optimization

**Mobile-Specific Considerations:**

**Performance Targets:**

- **FPS**: 60 FPS minimum, 72 FPS target
- **Dynamic Lights**: Maximum 4-6 per scene
- **Memory**: Stay under 4 GB for mobile devices
- **Draw Calls**: Minimize to reduce GPU overhead

**Optimization Techniques:**

1. **Light Culling:**

   - Disable lights for distant objects
   - Use [LOD systems](https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/help-and-reference/manual-level-of-detail-overview) for lighting
   - Implement light pooling for dynamic scenes

2. **Shadow Optimization:**

   - Limit shadow-casting lights
   - Use lower resolution shadows
   - Implement shadow distance culling

3. **Material Optimization:**
   - Use efficient shaders
   - Minimize texture sizes
   - Implement material instancing

#### Life Hack for lighting optimization

You should Texture baked lighting and shadows, instead of rendering lights with Gizmos you can directly paint the light and shadow onto the texture of the object and acchieve a similar experience.

![Baked Lights](/images/Baked%20Textures.png)

### Common Performance Issues

**Low FPS:**

- Reduce dynamic light count
- Optimize shadow settings
- Check for heavy scripting loops
- Monitor CPU/GPU usage

**Memory Issues:**

- Remove unused assets
- Compress textures
- Optimize 3D models
- Use asset streaming for large worlds

**VR Discomfort:**

- Maintain consistent 72 FPS
- Avoid rapid lighting changes
- Test comfort settings
- Monitor frame timing

### Best Practices

**Lighting Optimization:**

- **Use Static Lights**: Prefer static lights for world lighting
- **Limit Dynamic Lights**: Reserve for interactive elements only
- **Optimize Shadows**: Use efficient shadow settings
- **Monitor Performance**: Test regularly with Real-time Metrics

**Asset Optimization:**

- **Compress Textures**: Use appropriate compression for target platforms
- **Optimize Models**: Reduce polygon count where possible
- **Reuse Assets**: Share materials and geometries
- **Remove Unused**: Clean up unused assets regularly

**Scripting Optimization:**

- **Efficient Loops**: Avoid heavy loops in lighting scripts
- **Event Handling**: Use efficient event handling patterns
- **Memory Management**: Clean up resources properly
- **Performance Testing**: Test scripts on target platforms

### Troubleshooting Steps

1. **Identify the Problem:**

   - Use Real-time Metrics panel
   - Monitor specific performance metrics
   - Test on target platforms

2. **Isolate the Cause:**

   - Test with different lighting setups
   - Remove components one by one
   - Check for script performance issues

3. **Apply Solutions:**
   - Implement optimization techniques
   - Test performance improvements
   - Iterate and refine

### Dynamic Light Limits

- **Maximum 20 dynamic lights per world**
- Use static lights and glow materials for ambient lighting
- Reserve dynamic lights for interactive elements only

### Scripting Performance

- Avoid heavy loops in lighting scripts
- Use efficient event handling
- Monitor performance with Real-time Metrics panel

### Common Mistakes

- **Over-use of dynamic lights:** Major performance hit
- **Trying to script light type or color:** Unsupported
- **Ignoring static light shapes:** Shapes affect light direction and spread
- **Ignoring visibility constraints:** Dynamic lights ignore entity visibility

### Summary Table: Lighting Gizmos in Horizon Worlds

| Gizmo         | Runtime? | Scriptable?   | Variant                            | Key Properties                              | Performance |
| ------------- | -------- | ------------- | ---------------------------------- | ------------------------------------------- | ----------- |
| Static Light  | No       | Minimal       | Cuboid, Ellipsoid, Disk, Rectangle | Shape, Color, Intensity                     | Excellent   |
| Dynamic Light | Yes      | Yes (partial) | Point, Spot                        | enabled, falloffDistance, intensity, spread | Heavy cost  |

### Practice Exercises

1. Add three static lights with different shapes—observe effect
2. Use a dynamic spot light for a moving/interactable object
3. Experiment with color and intensity for different moods
4. Test performance with more than 10 dynamic lights—observe frame rate impact
