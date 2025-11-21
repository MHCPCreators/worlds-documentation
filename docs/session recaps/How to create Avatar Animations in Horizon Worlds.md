# How to create Avatar Animations in Horizon Worlds.

### By MikeyAce

### Nov, 13, 2025

## 🧩 Download New Avatar Skeleton Rig and fbx2anim.zip File

* Go to the resource link and download both files. [https://developers.meta.com/horizon-worlds/learn/documentation/full-bodied-avatars/creating-avatar-animations](https://developers.meta.com/horizon-worlds/learn/documentation/full-bodied-avatars/creating-avatar-animations)  
* Extract the fbx2anim.zip and save to (C:\\bin\\fbx2anim\\fbx2anim.exe)  
* Make sure to use the new avatar skeleton I uploaded to the animation channel, then save the **avatar skeleton rig FBX** somewhere easy to find later.

---

## 🕺 Import Avatar Skeleton into Mixamo and Pick an Animation

* Upload the **avatar skeleton FBX** to [Mixamo.com](https://www.mixamo.com).
* Choose a looping animation like a dance or idle motion.
* Adjust the animation settings (e.g., overdrive, arm space, trim start/end).

---

## 📤 Export FBX with Default Settings out of Mixamo

* Click **Download → FBX for Blender (default settings)**.
* Save your exported animation file locally.

---

## 🧱 Import FBX into Blender and Make Animation Adjustments

* Open Blender and import the Mixamo FBX with default settings.
* On the Blender timeline, extend or trim the frame range so the motion loops perfectly.  
* Make tweaks and animation adjustments if needed. 
* Test playback and adjust keyframes for smooth transitions.

---

## 🧾 Export Out of Blender (Only Deform Bones, No Leaf Bones)

* Go to **File → Export → FBX**.  
* In **Export settings**, enable Selected Objects only. 
* Under **Armature**, disable *Add Leaf Bones* and ensure *Only Deform Bones* are checked before exporting.

---

## **💻 Open Worlds Desktop in Administrator Mode (This step is necessary)**

* Right-click **Horizon Worlds Desktop App**.
* Select **Run as Administrator** for full file import access.
* Confirm system permissions if prompted.

---

### **🌍 Import Animation into Horizon Worlds**

* Inside Worlds, open My Assets \- Add New \- Animation
* Upload your exported Blender animation file.

---

### **🕹️ Add Trigger and Script to Make the Avatar Dance**

* Add a **Trigger Zone** in your world.
* Attach a **Script Gizmo** onto **Trigger Zone** that plays the imported animation. (See script below)
* Test in play mode — your avatar should now dance in Horizon Worlds when entering the trigger\! 💃

``` 
import { CodeBlockEvents, Component, Entity, Player, PropTypes } from 'horizon/core';

class LoopAnimation extends Component\<typeof LoopAnimation\> {

  static propsDefinition \= {

    animation: { type: PropTypes.Asset },

  };

  preStart() {

    this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterTrigger, this.OnPlayerEnterTrigger.bind(this));

  }

  start() {

  }

  OnPlayerEnterTrigger(player: Player) {

    player.playAvatarAnimation(this.props.animation\!, {

      looping: true,

      playRate: 1,

      callback: (reason) \=\> {

      }

    });

  }

}

Component.register(LoopAnimation);
```

## Want to learn more about animation?

Here are some helpful books and courses.

### Books:

1. "Disney Animation: The Illusion of Life" by Frank Thomas & Ollie Johnston  
2. "Animator’s Survival Kit" by Richard Williams  
3. "Cartoon Animation" by Preston Blair  
4. "Acting for Animators" by Ed Hooks  
5. "Character Animation Crash Course" by Eric Goldberg  
6. "Drawn to Life" by Walt Stanchfield  
7. "Timing for Animation" by Harold Whitaker and John Halas  
8. "Animated Performance" by Nancy Beiman  
9. "Simplified Drawing for Planning Animation" by Wayne Gilbert  
10. "Directing the Story" by Francis Glebas

### Courses:

Fundamentals of Animation in Blender -  [https://cgcookie.com/courses/fundamentals-of-animation-in-blender](https://cgcookie.com/courses/fundamentals-of-animation-in-blender)

Animation Bootcamp in Blender - [https://cgcookie.com/courses/animation-bootcamp](https://cgcookie.com/courses/animation-bootcamp)
