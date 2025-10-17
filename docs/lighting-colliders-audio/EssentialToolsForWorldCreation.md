author: Quadra01

# Essential Tools for World Creation: Light, Interaction, Audio and Level Design
*Details lighting techniques, collider setup for interaction, and audio integration and level design fundamentals.*

<img width="1536" height="1024" alt="Essential Tools for World Creation" src="https://github.com/user-attachments/assets/84b77fd6-ad4e-40df-b1c7-1d45f192c94b" />

---

## Introduction
In this tutorial, you will learn:

1. **Lighting Techniques** – Different types of lights and methods to create atmosphere
2. **Collider Setup for Interaction** – Defining object boundaries to enable accurate player interaction
3. **Audio Integration** – Adding sound effects to enhance the experience

***BONUS:*** Level Design 101

---

## 1.0 Lighting Techniques

Methods to control **brightness**, **color**, and **atmosphere**, helping set the mood and guide players through the world.

---

### 1.1 How to Access Light Gizmos
1) Open the **Build** popup from the buttons at the top left and click on **Gizmos**.
  
    <img width="379" height="200" alt="101" src="https://github.com/user-attachments/assets/0d5d9bd2-af30-476e-8918-54a294a85819" />

2) In the opened Gizmos panel, type **Light** to access all light-related Gizmos.
  
    <img width="242" height="200" alt="102" src="https://github.com/user-attachments/assets/6c51ee43-65dc-4e02-8741-9a7b56ebb85c" />

3) **Drag** any Gizmo component and **drop** it at any position in the world.
  
    <img width="157" height="150" alt="103" src="https://github.com/user-attachments/assets/e4707a2f-3fea-41a9-9bc8-72544e198d70" />

---

### 1.2 Light Types

#### 1.2.1 Environment Gizmo
Allows changing the sky texture, scene brightness, fog, and VOIP settings. 
**Variables** can be accessed from the Behavior section in the Properties popup on the right side of the screen while the object is selected.

- **Active**: Sets whether it is enabled or disabled. When disabled, the world reverts to the default environment settings and Gizmo turns gray.

  <img width="164" height="164" alt="image" src="https://github.com/user-attachments/assets/ca43dcb7-25e2-4b07-a5e5-769d36f1a16b" /> <img width="150" height="150" alt="image" src="https://github.com/user-attachments/assets/0001eefd-3c7d-4ad3-957d-afe17de6642a" />

- **Skydome Type**: Cube Map creates the sky using a texture while Custom Gradient creates the sky using predefined custom colors.
      
  <img width="300" height="100" alt="Ekran görüntüsü 2025-08-21 205948" src="https://github.com/user-attachments/assets/1521b5f5-8382-4fde-b2b3-3bbaadf3aa40" /> 

- *(Cube Map)* **Texture**: Used to select a preloaded texture to create the sky.

  <img width="400" height="150" alt="Frame 1" src="https://github.com/user-attachments/assets/41e9f254-a0c5-40b4-b150-b1c2607f95f8" /> <img width="400" height="150" alt="Frame 2" src="https://github.com/user-attachments/assets/71938f94-8d74-44ab-b3cf-399f331f9117" />

- *(Cube Map)* **Texture Rotation**: Used to rotate the sky.
     
  <img width="200" height="150" alt="Frame 3" src="https://github.com/user-attachments/assets/91e7c0ae-0fb2-4749-8bd9-44babcfbe78f" /> <img width="200" height="150" alt="Frame 4" src="https://github.com/user-attachments/assets/ea51cabb-0b1f-4488-b5c2-61d80a3ce506" />

- *(Custom Gradient)* **Top & Middle & Bottom Color**: It makes different parts of the sky appear in different colors.

  <img width="200" height="200" alt="Frame 5" src="https://github.com/user-attachments/assets/f3e49ab2-c250-4238-974c-94fd8d28bed5" /> <img width="200" height="200" alt="Frame 6" src="https://github.com/user-attachments/assets/bf8724c0-a84a-403e-af7a-782892425c97" />     <img width="200" height="200" alt="Frame 7" src="https://github.com/user-attachments/assets/7d405506-f57b-456c-95c5-d2b570cb9b62" /> <img width="200" height="200" alt="Frame 8" src="https://github.com/user-attachments/assets/5f9199be-dd7d-4bc5-9c97-7c4da0c3277f" />

- *(Custom Gradient)* **Top & Bottom Exponent**: Controls the distribution curve of sky light. Range between 0 and 1. Default 0.50.
     
  <img width="160" height="200" alt="Frame 9" src="https://github.com/user-attachments/assets/def2fec4-4c6c-4496-b97d-03f07dd364e6" /> <img width="160" height="200" alt="Frame 10" src="https://github.com/user-attachments/assets/01ca0c72-d0e7-496d-9209-a38f5db29f7b" />   <img width="160" height="200" alt="Frame 11" src="https://github.com/user-attachments/assets/e1a0dfec-7923-4363-a8c7-f607b8a757b5" /> <img width="160" height="200" alt="Frame 12" src="https://github.com/user-attachments/assets/531442c4-899e-4bcc-b482-e34ea2d0ae1d" />   <img width="160" height="200" alt="Frame 13" src="https://github.com/user-attachments/assets/a880e8cd-09e9-4de6-98fa-dee7a3a7c7a6" />
      
- **Exposure**: Controls the brightness of the sky on map. Range between 0 and 2. Default 1.
     
  <img width="200" height="150" alt="Frame 14" src="https://github.com/user-attachments/assets/8f6b13d8-5389-4a56-849b-52d8e08a4511" /> <img width="200" height="150" alt="Frame 15" src="https://github.com/user-attachments/assets/5347d7bb-5ef6-4a3c-bf35-1c4c5a6d0ce1" />   <img width="200" height="150" alt="Frame 16" src="https://github.com/user-attachments/assets/978452c8-54b1-4d31-baa1-76ecf9744fa5" /> <img width="200" height="150" alt="Frame 17" src="https://github.com/user-attachments/assets/7cf9c064-9293-4cfe-9cef-dccea9a43ddb" />

- **Custom Light Intensity**: When activated, it overrides the sky's brightness applied to the map, making Exposure ineffective except for the sky's brightness. Range between 0 and 2. Default 1.
     
  <img width="200" height="200" alt="Frame 18" src="https://github.com/user-attachments/assets/42456ed6-0eb0-4f4f-83d0-26fca6c9cd40" /> <img width="200" height="200" alt="Frame 19" src="https://github.com/user-attachments/assets/df8fa1d5-af4b-429e-b5a8-9552ca1992c0" />   <img width="200" height="200" alt="Frame 20" src="https://github.com/user-attachments/assets/7833b1e0-ab6e-41d0-9bd9-d87e434d4f84" /> <img width="200" height="200" alt="Frame 21" src="https://github.com/user-attachments/assets/4a913eda-4bde-433f-ab6b-8599ce463a27" />

- **Fog Density**: Determines the fog density in the map, takes the default color from the sky fog map. Range between 0 and 0.1, Default 0.01.

  <img width="200" height="175" alt="Frame 22" src="https://github.com/user-attachments/assets/4b1cabe5-f38f-4fa7-927b-ae6052745294" /> <img width="200" height="175" alt="Frame 25" src="https://github.com/user-attachments/assets/8dc8392c-6235-4172-aa60-eeca30e72e31" /> <img width="200" height="175" alt="Frame 23" src="https://github.com/user-attachments/assets/1d5b85be-76de-4748-872a-744e87b8dd7b" /> <img width="200" height="175" alt="Frame 24" src="https://github.com/user-attachments/assets/650c7750-dca3-4398-916a-abc6cee773a0" />

- **Custom Fog Color**: When enabled, applies a custom fog color instead of the sky's fog color.

  <img width="200" height="175" alt="Frame 26" src="https://github.com/user-attachments/assets/35c19b95-96b2-4a2a-9fdc-6359ce6466a5" /> <img width="200" height="175" alt="Frame 27" src="https://github.com/user-attachments/assets/234845fe-fe93-41fa-b827-9ff0bd6da567" />

- **Show Grid**: Controls whether to show or hide the initial plane grid.

  <img width="200" height="175" alt="Frame 28" src="https://github.com/user-attachments/assets/7cff783b-2cb8-43d9-a030-89f7a72023b2" /> <img width="200" height="175" alt="Frame 29" src="https://github.com/user-attachments/assets/6327cfa2-dabf-4ce0-af07-fa04e7ca07f9" />

- **VOIP Settings**: Sets how and at what distance players can hear each other.
    - **Mute**: Completely silent, no voice in or out.
    - **Whisper**: Very short range, only very close players hear.
    - **Nearby**: Positional 3D voice, fades with distance.
    - **Default**: Standard voice mode, behaves like Nearby unless changed.
    - **Environment**: Follows world’s voice zones.
    - **Extended**: Same as Nearby but with a wider hearing/talking range.
    - **Global** Voice reaches everyone in the world, no distance limit.

---    

#### 1.2.2 How to Import Custom Skybox
1) Click My Assets in the Asset Library, select the folder that Skydome will be created, then click **Add New** at the top and choose Skydome to import its source files.

    <img width="267" height="200" alt="import_sky_1" src="https://github.com/user-attachments/assets/2b41a6c4-cbc1-4ffa-a13a-aab2fa49d063" /> <img width="267" height="200" alt="import_sky_2" src="https://github.com/user-attachments/assets/4865480c-b7d7-438e-9603-3f0b61c190f4" />

2) Upload the source files in the desired format and size. Optional files can be skipped. Once the uploads are complete, click Next, then enter a name for your asset and an optional description. Click Done when it is ready.
           
    <img width="222" height="200" alt="import_sky_3" src="https://github.com/user-attachments/assets/442d5e1a-0317-40d0-ab89-bee1993572a4" /> <img width="222" height="200" alt="import_sky_4" src="https://github.com/user-attachments/assets/7ec0e552-fb47-4381-94ed-e81a9cd713d2" /> <img width="280" height="200" alt="import_sky_5" src="https://github.com/user-attachments/assets/77e7e33c-c85c-445a-bff9-2544bf5896db" />


3) After a short wait, the Skydome asset will appear in the selected folder. Dragging and dropping it into the world will make it function as an Environment Gizmo.

    <img width="278" height="200" alt="image" src="https://github.com/user-attachments/assets/fd101a42-8431-4782-b15b-caab8a7878a6" /> <img width="200" height="200" alt="import_sky_6" src="https://github.com/user-attachments/assets/4e1d9b9b-1489-43d4-bb69-123031696765" />

---

#### 1.2.3 How to Create Skybox with Gen AI
1) From the top panel, select the **Gen AI** tab.
   
    <img width="400" height="28" alt="import_ai_1" src="https://github.com/user-attachments/assets/b88a2232-f905-49b4-8612-6ae3358debe6" />

2) Click Generate Sky and choose a visual style from the Style section that fits your world.
   
    <img width="161" height="200" alt="import_ai_2" src="https://github.com/user-attachments/assets/b8fe123a-6f7b-44af-b53e-87964b76ac9d" /> <img width="273" height="200" alt="import_ai_3" src="https://github.com/user-attachments/assets/9e252614-cd47-4a0d-be52-d326e3b3be67" /> <img width="171" height="200" alt="import_ai_4" src="https://github.com/user-attachments/assets/2f08cf8b-8cb3-4b48-864f-e56280839db7" />
   
3) Write your dream skybox in a simple and clear way. After generation, click on the image to preview how it looks in your world. If you want to change it, you can enter a new prompt. To apply it permanently, select Save and Apply Skydome.
   
    <img width="275" height="200" alt="import_ai_5" src="https://github.com/user-attachments/assets/7b588a49-fce6-4d19-9c5c-e984ebf5c628" /> <img width="245" height="200" alt="import_ai_6" src="https://github.com/user-attachments/assets/a5db8b4f-3a8c-4392-a472-feb1862b871b" /> <img width="224" height="200" alt="import_ai_7" src="https://github.com/user-attachments/assets/b59ea94b-7cc7-4470-b0c0-591d2104a472" />
   
4) After a short time, the skydome will be created in the selected folder and added to your world as an Environment gizmo. If the gizmo deleted, you can drag and drop the created object back into your world for apply again.

    <img width="316" height="200" alt="import_ai_8" src="https://github.com/user-attachments/assets/398bfc15-269f-4a8a-9f05-982029e466e4" /> <img width="271" height="200" alt="import_ai_9" src="https://github.com/user-attachments/assets/da7f9661-e3af-4fcf-9ee1-b150cbeb1935" />

---

#### 1.2.4 Dynamic Light Gizmo
A light source that changes in real time to create more natural and immersive environments. 
**Variables** Can be accessed from the Light section in the Properties popup on the right side of the screen while the object is selected.

- **Enabled**: Controls whether the light is on or off.
    
  <img width="187" height="200" alt="on" src="https://github.com/user-attachments/assets/94fa2ad2-024e-4746-97bb-64b7ad7db875" /> <img width="186" height="200" alt="off" src="https://github.com/user-attachments/assets/f9696fd6-6458-4446-a792-4bca7b980759" />

- **Light Type**: Defines the type of light. Point light emits evenly in all directions (e.g. light bulb), while Spot light projects light in a focused cone (e.g. flashlight).
    
  <img width="203" height="200" alt="point (1)" src="https://github.com/user-attachments/assets/9633a898-1376-41c6-a1cc-a1c4ddfdd9e2" /> <img width="389" height="200" alt="spot (1)" src="https://github.com/user-attachments/assets/644660fd-bfd4-49eb-b381-ec96c94097ef" />

- **(Spot) Spread**: Controls the angle or width of a Spot light's cone, determining how wide or narrow the light spreads. Range between 0 and 180. Default 45.
    
  <img width="200" height="250" alt="spread_1" src="https://github.com/user-attachments/assets/7e14c781-cd15-4aca-b603-6391952e1eb6" /> <img width="200" height="250" alt="spread_2" src="https://github.com/user-attachments/assets/c40057b0-1961-4b47-b850-c0593ddc566d" />     <img width="200" height="250" alt="spread_3" src="https://github.com/user-attachments/assets/4d630890-6b37-4923-b1bd-a1bc26089982" />

- **Color**: Sets the color of the light.
    
  <img width="297" height="200" alt="color" src="https://github.com/user-attachments/assets/a4ad7c8e-7b64-4e1a-b6c2-4c3f9c52be12" />
    
- **Intensity**: Controls how bright the light is. Range between 0 and 10. Default 1.
    
  <img width="200" height="250" alt="intensity_1" src="https://github.com/user-attachments/assets/4cb10196-9eb4-4eb5-b2f3-120f71dd20f8" /> <img width="200" height="250" alt="intensity_2" src="https://github.com/user-attachments/assets/4f4383d4-6863-4fe2-a659-27b081dade65" /> <img width="200" height="250" alt="intensity_3" src="https://github.com/user-attachments/assets/fd6303a0-7b0e-4409-9664-a380f9197a04" />

- **Falloff Distance**: Sets how far the light reaches, affecting how quickly it fades with distance. Range between 0 and 100. Default 10.

  <img width="200" height="250" alt="distance_1" src="https://github.com/user-attachments/assets/2f081416-791c-47bb-98f4-c82c0f9bb37d" /> <img width="200" height="250" alt="distance_2" src="https://github.com/user-attachments/assets/cc990b9b-709a-44aa-ab8d-003efe5aa703" /> <img width="200" height="250" alt="distance_4" src="https://github.com/user-attachments/assets/08fa540e-42c9-46e4-87b2-d6adfd3ff01d" />

---

#### 1.2.5 Static Light Gizmo
A fixed light source that does not change, used for consistent and performance-friendly lighting. 
**Variables** can be accessed from the Light section in the Properties popup on the right side of the screen while the object is selected.

- **Enabled**: Controls whether the light is on or off.
    
  <img width="231" height="200" alt="statin_on" src="https://github.com/user-attachments/assets/8a2d3896-71c1-420f-acf8-65859bad1a20" /> <img width="209" height="200" alt="statin_off" src="https://github.com/user-attachments/assets/8f177d3b-9216-495b-9c04-31f26c5c984f" />

- **Shape**: The shape of the light determines the style and area of its effect.

  <img width="197" height="200" alt="statin_shape_1" src="https://github.com/user-attachments/assets/39844d38-1ff4-4efb-93d7-7b138722d347" /> 
  <img width="193" height="200" alt="statin_shape_2" src="https://github.com/user-attachments/assets/c4475b7c-a805-47dd-8520-e875de2a066c" /> 
  <img width="194" height="200" alt="statin_shape_3" src="https://github.com/user-attachments/assets/391a76ad-5cf0-4d30-bc12-ac4e34401e1d" /> 
  <img width="191" height="200" alt="statin_shape_3 (1)" src="https://github.com/user-attachments/assets/cddf4e89-9b65-46bf-bcc9-6748ec6cf3da" />

- **Color**: Sets the color of the light.
    
  <img width="199" height="200" alt="statin_color" src="https://github.com/user-attachments/assets/c9c1c025-7b71-412d-ab91-4bd1737890b6" />
    
- **Intensity**: Controls how bright the light is. Range between 0 and 100. Default 10.
    
  <img width="196" height="200" alt="statin_intensity_1" src="https://github.com/user-attachments/assets/8abcaa01-a270-4fce-b9e6-5c999c4b8887" /> <img width="198" height="200" alt="statin_intensity_2" src="https://github.com/user-attachments/assets/2990f0ac-49d9-47b7-9ca1-f8298336e38a" /> <img width="208" height="200" alt="statin_intensity_3" src="https://github.com/user-attachments/assets/ea85059b-b137-4709-80ed-2299f0442690" />

- **Scale**: The Scale of a Static Light also affects the brightness and area it illuminates.

  <img width="209" height="200" alt="statin_scale_1" src="https://github.com/user-attachments/assets/cfedfaa4-d93d-4bd0-8886-d018d47743d6" /> <img width="220" height="200" alt="statin_scale_2" src="https://github.com/user-attachments/assets/c783f14a-5c83-4daa-bb3d-9841b394c61c" /> <img width="198" height="200" alt="statin_scale_3" src="https://github.com/user-attachments/assets/df866c99-e853-492d-96ba-90f5b3c2ed02" />

---

### 1.3 DynamicLightController Script Example
Lets write a script that controls **Dynamic Light Gizmo** when game starts.

1) First, we create a script and call it ***DynamicLightController***

    <img width="400" height="108" alt="Frame 35 (1)" src="https://github.com/user-attachments/assets/2f082889-ccc6-4dbf-abe8-2e03634feace" />

2) And lets write our script;

```javascript
// Importing the necessary modules
import { Component, PropTypes, Color, DynamicLightGizmo } from 'horizon/core';

// Define our class
export class DynamicLightController extends Component<typeof DynamicLightController> {

  // Define variables
  static propsDefinition = {
    lightToControl: { type: PropTypes.Entity },
    enabled: { type: PropTypes.Boolean, default: true },
    color: { type: PropTypes.Color, default: new Color(1, 1, 1) },
    intensity: { type: PropTypes.Number, default: 1 },
    falloffDistance: { type: PropTypes.Number, default: 10 },
    spread: { type: PropTypes.Number, default: 45 },
  };

  override start() {
    // Apply variables on start
    this.applyLightSettings();
  }

  private applyLightSettings() {
    // Check if lightToControl object is defined
    if (!this.props.lightToControl) {
      console.warn('DynamicLightController: The lightToControl property is not set.');
      return;
    }

    const lightGizmo = this.props.lightToControl.as(DynamicLightGizmo);
    // Check if defined object is DynamicLightGizmo
    if (!lightGizmo) {
      console.error("DynamicLightController: The 'lightToControl' entity must be a DynamicLight gizmo.");
      return;
    }

    // Apply common light properties
    lightGizmo.color.set(this.props.color);
    lightGizmo.intensity.set(this.props.intensity);
    lightGizmo.falloffDistance.set(this.props.falloffDistance);
    lightGizmo.enabled.set(this.props.enabled);
    lightGizmo.spread.set(this.props.spread);
  }
}

Component.register(DynamicLightController);
```

3) Put the script to an empty object via **Attach Script** and assign a **Dynamic Light Gizmo**

    <img width="192" height="200" alt="Frame 38 (1)" src="https://github.com/user-attachments/assets/08b925ce-f338-4fd9-a2e8-d5316f8da40a" /> <img width="290" height="200" alt="image" src="https://github.com/user-attachments/assets/0ddec158-776b-4ee4-83e7-6d4f98c93bb8" />

4) Enter preview mode and try, values will change only at start.

    <img width="189" height="200" alt="Frame 36 (1)" src="https://github.com/user-attachments/assets/5c7672a1-eb1c-438a-a220-7f463dfdff80" /> <img width="217" height="200" alt="Frame 37 (1)" src="https://github.com/user-attachments/assets/9acda05f-35f0-473c-975e-e18e3054ce24" />

---

### 1.4 Lighting Tips and Optimization
Practical ways to improve **visuals**, set the **mood**, and keep **performance** smooth.

---

#### 1.4.1 Define a Main Light Source
  - Every scene should have one dominant light *(e.g., sun, spotlight, torch)*.
  - Too many competing lights make the scene look flat and artificial.

---

#### 1.4.2 Use Contrast for Atmosphere
  - Balance bright and dark areas to create depth.
  - Flat, uniform lighting = boring scene
  - Contrast lighting = dramatic and engaging

---
          
#### 1.4.3 Control Color Temperature
  - Warm tones *(orange/red)*: Safe, cozy, romantic
  - Cool tones *(blue/green)*: Mysterious, threatening, futuristic
  - Color contrast can guide the player’s attention.

---
   
#### 1.4.4 Guide the Player With Light
  - Highlight important areas *(exits, objectives, items)* with subtle light cues.
  - Example: A softly lit door naturally pulls the player’s focus.

---
   
#### 1.4.5 Add Motion With Dynamic Lights
  - Flashing neons, moving spotlights, flickering torches bring energy to the scene.
  - But: too many dynamic lights = performance drop. Use with balance.

---
   
#### 1.4.6 Leverage Player Psychology
  - Brightness → safety & speed
  - Darkness → tension & focus
  - Colorful lights → fun & excitement
  - Light intensity and tone directly shape how players feel in your world.

---
   
#### 1.4.7 Optimize for Performance
  - Extra lights are costly in VR/mobile.
  - Remove unnecessary sources and use static lighting where possible.
  - Keep dynamic lighting only for moments that matter.

---

## 2.0 Collider Setup for Interaction
**Colliders** block physical movement while **Trigger Zones** detect entry to activate events without blocking players.

---

### 2.1 How to Access Colliders and Trigger Zone
Click **Build** from the top panel, then select **Colliders**. From the opened popup, drag and drop the desired **Collider** into the world.

  <img width="395" height="200" alt="collider_htc_1" src="https://github.com/user-attachments/assets/6e27752a-49fb-4529-be6d-a2b14edc535f" /> <img width="251" height="200" alt="collider_htc_2" src="https://github.com/user-attachments/assets/4f60e93f-da8e-40b7-8490-0cae7b36e84a" /> <img width="200" height="200" alt="collider_htc_3" src="https://github.com/user-attachments/assets/8ff6b378-a3d2-414d-8ee8-75d47b730e7a" />

Click **Build** from the top panel, then select **Gizmos**. From the opened popup, Select **Trigger Zone** and drag and drop into the world.

  <img width="395" height="200" alt="trigger_htc_1" src="https://github.com/user-attachments/assets/47b58bb3-24bb-40d8-bdcd-b0ea4e34addf" /> <img width="251" height="200" alt="trigger_htc_2" src="https://github.com/user-attachments/assets/734d5726-5630-4233-87ec-bb1460da48f2" /> <img width="200" height="203" alt="trigger_htc_3" src="https://github.com/user-attachments/assets/2f46e64f-2954-423c-8d98-acf9dc13ce77" />

---

### 2.2 Colliders and Triggers Behavior Variables
Colliders create physical boundaries that prevent objects or players from passing
Also not only Collider objects can block players or other objects. Any object with **Collidable** enabled can act as a physical barrier, but cannot be used as a trigger.
    
  <img width="135" height="150" alt="collid_1" src="https://github.com/user-attachments/assets/ccced35c-118c-492d-8464-60eef080eb69" /> <img width="135" height="150" alt="collid_2" src="https://github.com/user-attachments/assets/188871fa-c8a1-42e1-90fe-de1f5c6cf7f4" /> <img width="140"     height="150" alt="collid_3" src="https://github.com/user-attachments/assets/4cde70e7-b88d-421d-a09b-9dff302f7bc0" /> <img width="121" height="150" alt="collid_4" src="https://github.com/user-attachments/assets/e9966d5f-011a-4997-a884-8e88fccb312d" />
    
**Collidable** property determines whether an object physically blocks players or other objects; when disabled, the object no longer obstructs movement.

  <img width="312" height="150" alt="Frame 39" src="https://github.com/user-attachments/assets/65e1ccfc-0ac9-4fa8-a6c9-c4ad0fd5da30" /> <img width="150" height="150" alt="Frame 41" src="https://github.com/user-attachments/assets/8edfa2e2-853e-488c-9b8e-1d2b36393d45" /> <img width="150" height="150" alt="Frame 42" src="https://github.com/user-attachments/assets/e18e8fa4-feef-4c58-8603-41812445e161" />

**Collision Layer** assigns objects to specific groups that determine which objects can collide with or ignore each other, helping control interactions and optimize performance. **Collidable** must be enabled for this feature.
  - **Everything:** It interacts physically with both objects and players.
  - **Objects Only:** It only interacts physically with objects and does not affect players.
  - **Players Only:** It only interacts physically with players and does not affect objects.

To adjust the size of colliders, you can use the values in the **Attributes** section that are specific to colliders.

  <img width="200" height="250" alt="col_sca_1" src="https://github.com/user-attachments/assets/18481c1d-6803-445a-a513-a426c522dff6" /> <img width="200" height="250" alt="col_sca_2" src="https://github.com/user-attachments/assets/638f0f8c-a3c4-4318-a21d-45d4906bef84" /> <img width="200" height="250" alt="col_sca_3" src="https://github.com/user-attachments/assets/db76a57e-a528-46d1-a51b-4f2199a0053a" /> <img width="200" height="250" alt="col_sca_4" src="https://github.com/user-attachments/assets/d271d032-8fdd-4109-b951-21b35f36a455" />

**Trigger Zones** do not block movement but detect when an object or player enters to activate events or actions.
To change the size of a **Trigger Zone**, adjust its **Scale** in the **Attributes** section.
    
  <img width="180" height="202" alt="Frame 43" src="https://github.com/user-attachments/assets/119f3fa8-6866-4ad7-9a04-4dee75711b6e" /> <img width="180" height="200" alt="Frame 44" src="https://github.com/user-attachments/assets/613a78e2-07db-41ce-9172-07a891817077" />

Behavior properties of **Trigger Zone**
  - **Enabled:** Checks whether the Trigger is active; if it is not active, the connected scripts will not run.
  - **Trigger On:** Defines the conditions under which the Trigger will activate.
    - **Players:** It only activates when Players touch the trigger.
    - **Objects Tagged:** It only activates when objects with the same tag as the Object Tag variable touch the trigger.
        
  - **Object Tag:** When Objects Tagged is selected, it specifies which tagged objects can activate the trigger.
  - **Selectable in Screen Mode:** Determines whether the Trigger can be interacted with in the screen; when enabled, players can activate it by touching it.
        
    <img width="202" height="201" alt="select 1" src="https://github.com/user-attachments/assets/0f0ae978-c72d-42f5-8f5d-fc2a960a7412" /> <img width="203" height="200" alt="select 2" src="https://github.com/user-attachments/assets/e5853b6a-4384-46a0-b9f2-5f2a144014dd" />

  - *(Selectable in Screen Mode)* **Interaction Prompt Icon:** Specifies the icon that will appear in the UI.
  - *(Selectable in Screen Mode)* **Interaction Distance:** Sets the minimum distance required for the player to interact with the trigger.

---

### 2.3 TriggerLightController Script Example
Lets write a script that enable Dynamic Light Gizmo when we enter trigger and disables when we exit from the trigger.

1) First, we create a script and call it ***TriggerLightController***

    <img width="400" height="108" alt="Frame 35 (1)" src="https://github.com/user-attachments/assets/2f082889-ccc6-4dbf-abe8-2e03634feace" />

2) And lets write our script;

```javascript
// Importing the necessary modules
import { Component, PropTypes, Player, CodeBlockEvents, DynamicLightGizmo } from 'horizon/core';

// Define our class
export class TriggerLightController extends Component<typeof TriggerLightController> {
  static propsDefinition = {
    lightEntity: { type: PropTypes.Entity },
  };

  override preStart() {
    // Listen for players entering the trigger
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => this.toggleLight(true)
    );

    // Listen for players exiting the trigger
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerExitTrigger,
      (player: Player) => this.toggleLight(false)
    );
  }

  override start() {
    // Initialization logic can go here if needed.
  }

  private toggleLight(enable: boolean) {
    if (!this.props.lightEntity) {
      console.warn("TriggerLightController: The 'lightEntity' property is not set.");
      return;
    }

    // Cast the entity to a DynamicLightGizmo
    const lightGizmo = this.props.lightEntity.as(DynamicLightGizmo);
    if (lightGizmo) {
      lightGizmo.enabled.set(enable);
    } else {
      console.error("TriggerLightController: The 'lightEntity' must be a DynamicLight gizmo.");
    }
  }
}

Component.register(TriggerLightController);
```

3) Put the script to a Trigger Zone Gizmo via Attach Script and assign a Dynamic Light Gizmo

    <img width="205" height="200" alt="Frame 45" src="https://github.com/user-attachments/assets/7a5eab79-98f9-4dfd-b909-c09ac2c3e179" /> <img width="262" height="200" alt="Frame 46" src="https://github.com/user-attachments/assets/ef3c6b2c-6452-4308-bbc9-b2feaa411977" />

4) Enter preview mode and try, light will turn on when we enter the trigger zone, and turn off when we exit.

    <img width="311" height="200" alt="Frame 47" src="https://github.com/user-attachments/assets/f82e007a-b48e-444b-90b1-b56f2b2c4a83" /> <img width="196" height="200" alt="Frame 48" src="https://github.com/user-attachments/assets/88b8ed19-f0c1-4c78-b787-ceae2854a608" /> <img width="175" height="200" alt="Frame 49" src="https://github.com/user-attachments/assets/34cc9647-cdeb-47a5-8f4f-634a644502e7" />

---

### 2.4 Collider and Trigger Tips
Essential advice for using colliders and triggers effectively to create smooth, responsive gameplay.

---

#### 2.4.1 Use Trigger Zone Gizmo With Purpose
  - In Horizon Worlds, the Trigger Zone is the main way to detect player presence.
  - When a player enters → turn on a light, open a door, play music, advance a quest.

---

#### 2.4.2 Collider = Object Geometry
  - Most objects are automatically “collidable.”
  - If an object is only decorative, disable collisions to save performance.

---
          
#### 2.4.3 Prefer Small Zones Over Huge Ones
  - Avoid giant Trigger Zones covering an entire area.
  - Use smaller, focused zones for more precise control and better performance.

---
   
#### 2.4.4 Simulate Layer Control
  - Horizon Worlds doesn’t have Unity-style physics layers.
  - Instead:
    - Design zones so only players trigger them.
    - Place zones carefully to prevent unwanted objects from activating them.

---
   
#### 2.4.5 Control Visibility & Audio
  - With Trigger Zones you can enable/disable objects or start/stop audio and lighting effects.
  - Example: entering a secret area changes the ambient light or triggers a sound cue.

---
   
#### 2.4.6 Test and Debug Often
  - Always test to ensure your Trigger Zones activate correctly.
  - During development, make zones larger for easier debugging, then refine them later.

---
   
#### 2.4.7 Guide Player Experience
  - Use triggers not just technically, but also for player direction and feedback:
    - **Entering an area** → spotlight turns on, showing the right path.
    - **Crossing into a new section** → a sound plays, reinforcing progress.

---

## 3.0 Audio Integration and Sound Recorder
Adding, recording, and managing sounds to enhance immersion in your world.

---

### 3.1 How to Access Sounds and Sound Recorder Gizmo
1) Click Build from the top panel, then select Sounds. From the opened popup, drag and drop the desired Sound into the world.

    <img width="200" height="200" alt="sound_1 (1)" src="https://github.com/user-attachments/assets/f6755481-dc8b-43db-ae82-e610944e3961" /> <img width="164" height="200" alt="sound_2" src="https://github.com/user-attachments/assets/5e042104-7145-431c-b638-82f7fc9bec13" /> <img width="170" height="200" alt="sound_3" src="https://github.com/user-attachments/assets/ea0533f6-a0f0-4aba-a4a6-d952c9df0b66" /> <img width="163" height="200" alt="sound_4" src="https://github.com/user-attachments/assets/e9a7093b-76d3-4510-a439-8a4c72fc7ceb" /> <img width="150" height="200" alt="sound_5" src="https://github.com/user-attachments/assets/59e5d3af-aeca-4d65-b3a7-eaf72185e298" />

2) Click Build from the top panel, then select Gizmos. From the opened popup, choose Sound Recorder Gizmo and drag and drop into the world.

    <img width="207" height="200" alt="recorder_1" src="https://github.com/user-attachments/assets/8bf4bb32-722b-4fb0-a039-e3ecbc6f10fe" /> <img width="250" height="200" alt="recorder_2" src="https://github.com/user-attachments/assets/2bc5617f-f67e-434f-9aac-adea1f560fbb" /> <img width="150" height="200" alt="recorder_3" src="https://github.com/user-attachments/assets/723163a1-89d9-4312-8174-be0d96b16c8f" />

---

### 3.2 Sound Component Variables
- **Preview:** Test the sound in the editor without running the world.
- **Play on Start:** Sound starts automatically when the world or object loads.
- **Play and Forget:** Plays the sound and lets it finish on its own, without needing to stop it.
- **Volume:** Controls loudness (0.0 = silent, 1.0 = full volume).
- **Volume Randomness:** Adds variation to the volume each time the sound plays, for more natural repetition.
- **Pitch:** Adjusts frequency: positive = higher pitch, negative = lower pitch.
- **Pitch Randomness:** Randomly changes pitch slightly each time, avoiding robotic repetition.
- **Global:** If checked, the sound is heard by everyone equally, ignoring distance.
- **Minimum Distance:** The range within which the sound is always at full volume.
- **Maximum Distance:** Beyond this range, the sound is no longer heard. (Between min and max, volume fades out gradually.)
- **Send Audio Complete:** Triggers an event once the sound finishes, useful for sequencing sounds or effects.

---

### 3.3 How to Use Sound Recorder
With Sound Recorder, you can use your microphone to record sound effects, ambient sounds, or even music and use them as audio in your game.

1) Click **Record** for start recording your sound. You need a functioning microphone.

    <img width="350" height="100" alt="recorder1" src="https://github.com/user-attachments/assets/d9564a0e-05d7-4ab8-864b-bb577667d87c" />

2) Click **Stop** for finish your sound.

    <img width="350" height="100" alt="recorder2" src="https://github.com/user-attachments/assets/cf9056c4-00fe-4ee2-a6c6-7882fb3eb7c8" />

3) Click **Play** for play the sound you created.

    <img width="350" height="100" alt="recorder3" src="https://github.com/user-attachments/assets/92e01536-11af-4bab-8286-c092fd2d342b" />

4) If you would like to make the sound effect always replay, you can turn on the **Loop**.

    <img width="350" height="100" alt="record4" src="https://github.com/user-attachments/assets/697b7192-c0de-4315-a378-033559606b43" />

---

### 3.4 TriggerSoundController Script Example
Let's create a script that plays a sound effect when we click on a trigger.

1) First, we create a script and call it ***TriggerSoundController***

    <img width="400" height="108" alt="Frame 35 (1)" src="https://github.com/user-attachments/assets/2f082889-ccc6-4dbf-abe8-2e03634feace" />

2) And lets write our script;

```javascript
// Importing the necessary modules
import { Component, PropTypes, Player, CodeBlockEvents, AudioGizmo } from 'horizon/core';

// Define our class
export class TriggerSoundController extends Component<typeof TriggerSoundController> {
  static propsDefinition = {
    soundToPlay: { type: PropTypes.Entity },
  };

  override preStart() {
    // Listen for a player entering the trigger
    this.connectCodeBlockEvent(
      this.entity,
      CodeBlockEvents.OnPlayerEnterTrigger,
      (player: Player) => this.onPlayerEnter(player)
    );
  }

  override start() {
    // Initialization logic can go here if needed.
  }

  private onPlayerEnter(player: Player) {
    if (!this.props.soundToPlay) {
      console.warn("TriggerSoundController: The 'soundToPlay' property is not set.");
      return;
    }

    // Cast the entity to an AudioGizmo and play the sound
    const soundGizmo = this.props.soundToPlay.as(AudioGizmo);
    if (soundGizmo) {
      soundGizmo.play();
    } else {
      console.error("TriggerSoundController: The 'soundToPlay' entity must be an AudioGizmo.");
    }
  }
}

Component.register(TriggerSoundController);
```

3) Put the script to a Trigger Zone Gizmo via Attach Script and assign a Sound object. Be sure that Trigger is enabled the Selectable in Screen Mode.

    <img width="220" height="200" alt="image" src="https://github.com/user-attachments/assets/c038e4a3-dce6-48a2-ba89-389d614b458e" />

4) Enter preview mode and try, assigned sound effect will play every time you press the trigger.

    <img width="285" height="200" alt="Frame 50" src="https://github.com/user-attachments/assets/551548e8-69bf-4502-bd87-a95ed774b222" /> <img width="144" height="200" alt="Frame 51" src="https://github.com/user-attachments/assets/9db32dc6-5fa9-4212-833e-ab5168138d55" />

---

### 3.5 Sound Design Tips
Learn simple techniques to enhance gameplay, create atmosphere, and avoid common audio mistakes.

---

#### 3.5.1 Use Audio Gizmos Efficiently
  - Horizon Worlds provides Sound Gizmos to play effects, music, or ambient loops.
  - Attach them to objects or areas for localized sound.

---

#### 3.5.2 Keep Performance in Mind
  - Too many looping sounds or overlapping music tracks hurt performance.
  - Use short, optimized clips and avoid stacking too many audio sources.
          
---

#### 3.5.3 Leverage Triggers for Dynamic Audio
  - Combine Trigger Zones with sounds:
    - Entering a room → background music starts.
    - Interacting with an object → play a sound effect.
    - Reaching a checkpoint → play a fanfare.
   
---

#### 3.5.4 Balance Volume and Layers
  - Avoid every sound being loud and competing.
  - Think in layers:
    - Music = emotional base
    - Ambient sounds = atmosphere (wind, city, cave echoes)
    - SFX = interaction feedback (jumps, hits, UI sounds)
   
---

#### 3.5.5 Spatial Audio for Immersion
  - Use 3D/spatialized audio so sounds feel like they come from their source.
  - Example: A waterfall gets louder as you get closer, footsteps pan depending on direction.
   
---

#### 3.5.6 Match Sound to Environment
  - Choose sounds that reinforce the setting:
    - Nightclub → bass-heavy music + crowd noise
    - Cave → dripping water + echoing footsteps
    - Outdoor city → wind + distant traffic + birds

---
   
#### 3.5.7 Provide Player Comfort
  - Not every player likes constant background sound.
  - Offer a way to toggle music or reduce ambience if possible.

---

## 4.0 Level Design 101
Learn the core principles of creating fun, balanced, and engaging game levels, from flow and pacing to player guidance and challenge design.

---

### 4.1 What does Level Design consist of?

**Lighting** | Shapes the atmosphere, directs player attention, and enhances mood through brightness, shadows, and color.

**Interaction** | Involves player movement, object use, triggers, and mechanics that make the world engaging and responsive.

**Sound** | Provides ambience, effects, and feedback that strengthen immersion and emotional impact.

**Layout & Flow** | The placement of paths, spaces, and obstacles that guide progression and pacing.

**Visual Design** | Use of textures, props, and environment art to create a believable and appealing world.

**Gameplay Balance** | Distribution of challenges, resources, and rewards to maintain fun and fairness.

---

### 4.2 Learn World Desktop Editor for Better Level Design
To create better level designs, we must always know how to make the best use of the tools we have. 

Here are the features of the World Desktop Editor that you can use in level design.

---

#### 4.2.1 Lets start with fundamentals
   - Press Q for be able to Select objects.

     <img width="162" height="75" alt="fundamental_Q" src="https://github.com/user-attachments/assets/2b96ae4c-b619-4f7a-99fd-d861719ad0a2" />
    
   - Press W for be able to Move selected objects.

     <img width="131" height="75" alt="fundamental_W" src="https://github.com/user-attachments/assets/ede4a31c-2726-42a7-9642-f15d229a0e69" />

   - Press E for be able to Rotate selected objects.

     <img width="128" height="75" alt="fundamental_E" src="https://github.com/user-attachments/assets/8270e082-7ceb-4c54-990c-64e7d5ee136c" />

   - Press R for be able to Scale selected objects.

     <img width="147" height="75" alt="fundamental_R" src="https://github.com/user-attachments/assets/af5afe04-424c-4a21-b843-0ccde94e23b1" />

---
    
#### 4.2.2 Transform and Pivot overview
**Transform**;
  - **Local:** Shows an object’s position, rotation, and scale relative to its parent or own orientation.
  - **Global:** Shows an object’s position, rotation, and scale relative to the world coordinate system.

    <img width="148" height="75" alt="transform" src="https://github.com/user-attachments/assets/72967bc2-00e5-4260-8197-869af51ecfbb" />

**Pivot**;
  - **Center:** The visual midpoint of an object or selection, used for moving or scaling multiple objects together.
  - **Pivot:** The actual point around which the object rotates or scales, which may differ from the center.

    <img width="152" height="75" alt="pivot" src="https://github.com/user-attachments/assets/7e163d4b-bce1-4ea7-9ada-51d096f3524c" />

---

#### 4.2.3 Snap Tools for Precise Transformations
**Translation Grid Snap** | Moves objects in fixed increments along the X, Y, and Z axes for precise placement.

  <img width="364" height="75" alt="move_snap" src="https://github.com/user-attachments/assets/d5e074c6-26ff-4d3b-b52e-a36019ef699c" />

**Rotation Angle Snap** | Rotates objects in fixed angle steps, ensuring accurate and consistent orientation.

  <img width="292" height="75" alt="rotation_snap" src="https://github.com/user-attachments/assets/3fe3825c-6127-4bcc-844b-ed7b35e5c433" />
    
**Scale Snap** | Adjusts object size in fixed increments, allowing precise and uniform scaling.

  <img width="276" height="75" alt="scale_snap" src="https://github.com/user-attachments/assets/cb0afbc2-b8e3-40fa-b71a-d3f46c6683d8" />

---

#### 4.2.4 Placement and Coordinate Options
**Relative** | Applies changes based on the object’s current state or parent.

**Absolute** | applies changes based on the world’s coordinates.

  <img width="117" height="75" alt="relative" src="https://github.com/user-attachments/assets/908929e3-34cf-4a68-8bb3-04c8d97a3992" /> 

**Snap to Surfaces** | A feature that automatically aligns and positions an object so it sits flush on the surface of another object, making placement easier and more precise.
      
  <img width="184" height="75" alt="snap to surface" src="https://github.com/user-attachments/assets/325fb019-5bf0-44b9-b380-19567c5b451e" />

---

#### 4.2.5 Simulation and Camera Controls
**World Simulation** | Activates the world simulation, enabling physics, interactions, and dynamic behaviors *(without enter preview mode)*.
  
  <img width="210" height="70" alt="world sim" src="https://github.com/user-attachments/assets/20848bd7-5f35-40e3-803b-5d51fee9c9c6" />

**Reset World Simulation** | Resets the simulation to its initial state, returning objects and events to their starting conditions.
  
  <img width="218" height="70" alt="reset world speed" src="https://github.com/user-attachments/assets/30f1b26d-9e90-4f70-8fd2-860c659b71b9" />
   
**Camera Speed** | Adjusts the movement speed of the camera in the editor, making navigation faster or slower.
  
  <img width="233" height="75" alt="cameraSpeed" src="https://github.com/user-attachments/assets/674eb11d-3d79-4660-80c7-7d2ee09dff6c" />

---

#### 4.2.6 View Mode Options
**Shortcuts:** You can use numbers as shortcuts for switch between view modes.
       
  <img width="279" height="200" alt="shaders_popup" src="https://github.com/user-attachments/assets/75960461-2125-4c72-9c61-6d77738cb8af" />
   
**Shaded:** Displays objects with their full textures and materials applied, showing how the world will look in-game.
   
  <img width="435" height="200" alt="shaders_shaded" src="https://github.com/user-attachments/assets/aa3371e7-3489-47e0-8fe3-123e3c3c6a69" />
   
**Wireframe:** Displays objects as edges and vertices only, showing the underlying geometric structure without textures or materials.
   
  <img width="434" height="200" alt="shaders_wireframe" src="https://github.com/user-attachments/assets/6c1e2f83-b642-42fb-99fc-fb54a143f0f6" />
   
**Solid Wireframe:** Shows objects as wireframes without textures, making it easier to see their structure and edges.
   
  <img width="436" height="200" alt="shaders_solidwireframe" src="https://github.com/user-attachments/assets/74add528-298e-47b3-ac19-ec385c9ca349" />
   
**Shaded Wireframe:** Combines shaded view with wireframe overlay, allowing you to see textures while still viewing the object’s mesh.

  <img width="436" height="200" alt="shaders_shadedwireframe" src="https://github.com/user-attachments/assets/78b192c5-5eaa-4cfa-b3b1-96eca451540d" />
   
**Collision:** Displays the collision boundaries of objects, helping to visualize how physics and interactions will work.
   
  <img width="434" height="200" alt="shaders_collision" src="https://github.com/user-attachments/assets/7d2e2a2a-e766-45bd-bb9a-6b6ef5a18c8b" />
   
**Overdraw:** Highlights areas where multiple layers of geometry overlap, useful for optimizing rendering performance.
   
  <img width="435" height="200" alt="shaders_overdraw" src="https://github.com/user-attachments/assets/2f3354b5-953e-4707-b8d5-0dff7033437d" />
   
**Show Gizmos:** Toggles visibility of gizmos like lights, cameras, and triggers in the editor for better scene management.

  <img width="434" height="200" alt="shaders_nogizmo" src="https://github.com/user-attachments/assets/b27acb7a-f18c-4c2d-8065-26f04c5b59f3" />

---

### 4.3 Hallowen Graveyard - Level Creation Process
Let's make a gravyeard scene with hallowen concept!

1) First, imagine the concept you want to create, check similar designs and let your creativity speak!

2) Then block it out in your world with a simple graybox layout design so you can better understand how it will look and feel.For example, in my layout: gray represents walls, brown represents trees, yellow represents light poles, and pink represents graves.

    <img width="626" height="300" alt="leveldesign_graybow" src="https://github.com/user-attachments/assets/bce744df-5f78-4feb-86d3-dd20861a6bdb" />

3) Once the rough layout is complete, it’s time to establish the main structure. Start by placing the core objects that will shape the scene. Since we already decided where everything goes in the previous stage, you can now position them accordingly, though small adjustments are always possible.

    <img width="625" height="300" alt="leveldesign_mainlines" src="https://github.com/user-attachments/assets/79e4c078-ff67-4938-b7eb-5c95da2cd7a1" />

4) The scene has started to take shape, but it still feels empty. Now it’s time to add props to fill the space and make the concept clearer. This step is all about your imagination, —you can even add a story element to the scene, like I did by placing a witch watching us from a distance.

    <img width="625" height="300" alt="leveldesign_addingprops" src="https://github.com/user-attachments/assets/50d8ef2a-2496-444d-9974-ad9db17482cf" />

5) To bring a scene to life, you need to give it light! Depending on your concept, a skybox and proper lighting can create unforgettable visuals. For my design, I used a misty, mystical atmosphere with a yellow-orange lighting palette. On top of that, I added special lighting to certain objects to draw attention to them and reinforce the Halloween mood I wanted to create.

    <img width="625" height="300" alt="leveldesign_lighting" src="https://github.com/user-attachments/assets/551dff5b-221e-48c0-bec0-1b4ed9b4fc39" />

6) We’ve built our scene, but now we need to define level boundaries for the players with colliders. To make the experience more dynamic, place triggers in specific areas so that when players reach those spots, special effects like sounds, animations, or other events can be activated.

    <img width="625" height="300" alt="leveldesign_triggers" src="https://github.com/user-attachments/assets/961ff6c4-bbc7-4d40-b6b7-c41cea4e6d4a" />

7) It’s sounds time! I’m enhancing my scene with ambient music and various sound effects that match the concept. The triggers we placed in the previous step can now be used to call sound effects through scripting, making the experience more immersive and dynamic.

    <img width="625" height="300" alt="leveldesign_sounds" src="https://github.com/user-attachments/assets/c1823939-4826-4fcd-9a9b-19ab9fdb228f" />

8) And finally, it’s time to test the scene. Review everything we’ve done so far, adjust any parts you want to improve, and fix any problems that appear. You should be the first to enjoy and approve your scene, only then is it ready to publish!

    <img width="625" height="300" alt="leveldesign_playtesting" src="https://github.com/user-attachments/assets/1d46f7a7-ae1f-465c-8c25-0556ebf20c10" />

---

### 4.4 Tips, Tricks, and Common Mistakes for Level Design
Discover practical advice, clever techniques, and pitfalls to avoid when designing game levels.

---

#### 4.4.1 How to Create Better Levels
  - Guide the Player
      - Use lighting, sound, and visual cues to naturally direct players where to go.
  - Balance Challenge and Fun
      - Keep difficulty fair but rewarding, ensuring players stay motivated.
  - Maintain Flow
      - Arrange areas and interactions so players move smoothly without confusion or frustration.
  - Use Atmosphere Effectively
      - Combine lighting, sound, and visuals to build emotion and immersion.
  - Encourage Interaction
      - Add mechanics and elements that invite players to experiment and engage.
  - Playtest Often
      - Observe real players to find problems, improve pacing, and polish the design.

---

#### 4.4.2 Best Practices for Optimization
  - Use Simple Geometry
      - Prefer basic or lowpoly shapes over highly complex models to reduce performance load.
  - Limit Dynamic Lights
      - Too many dynamic lights can cause lag; use static lighting where possible.
  - Efficient Colliders
      - Use simple colliders (box, sphere, capsule).
  - Optimize Assets
      - Keep textures, sounds, and scripts lightweight to improve loading times.
  - Control Object Count
      - Avoid overcrowding with unnecessary objects; focus on essential elements.
  - Test Performance
      - Regularly test to ensure stable frame rates and smooth interaction.

---

#### 4.4.3 Common Mistakes to Avoid
  - Overcrowding the Environment 
      - Adding too many props, objects, or decorations can confuse players and reduce performance.
  - Excessive Dynamic Lighting
      - Using too many dynamic lights can cause lag or frame drops. Use static lighting where possible.
  - Poor Player Guidance
      - Players should always know where to go. Avoid confusing paths, hidden objectives, or unclear visual cues.
  - Inefficient Colliders and Interactions
      - Complex colliders or poorly aligned interactive elements can frustrate players.
  - Neglecting Audio Feedback
      - Lack of sound effects or background music can make gameplay feel flat and less engaging.
  - Ignoring Device Performance
      - Test on device to ensure smooth gameplay and avoid crashes or frame drops.
  - Skipping Playtesting
      - Always test with real players to identify pacing, difficulty, or design issues.

---

Tutorial is over, thanks for reading. And don't forget;

***To design a beautiful level, you need to design a lot of ugly ones first!***
