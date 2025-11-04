<!-- The title of your document -->
# Add Daily Reward to your world

<!-- Put your name, at least your Horizon Name, as the author -->
Thibaut Quentin (Tquentin)  
<!-- IMPORTANT: Put the date this document was last updated! This is
important information for people to tell how 'stale' this info might 
be.-->
September 10, 2025  

## Introduction

<!-- This section should describe what this document is going to cover. Try to provide some background and motivation as to why a creator would want to read your document. -->

Daily reward is a powerful way to make users come back regularly to your world. It can enhance your game loop with a specific bonus every day that will help achieve more playing time and help to build your monetization with the MHCP Bonus Program [time spent on mobile](https://developers.meta.com/horizon-worlds/learn/documentation/mhcp-program/monetization/bonus-program-overview#time-spent-on-mobile-bonus) and [time spent on headset](https://developers.meta.com/horizon-worlds/learn/documentation/mhcp-program/monetization/bonus-program-overview#time-spent-on-headset-bonus).

In this tutorial, we will learn how to use and set up the [Daily Rewards Asset Template](https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/daily-rewards-asset-template) proposed by Meta.

You can learn more in this video tutorial: 
<iframe width="560" height="315" src="https://www.youtube.com/embed/c-gF6Fqz6-U?si=6gJQ8NyLQqTheYLz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Prerequisites and Expectations

<!-- This section should indicate any expectations you have of your readers, such as other materials or concepts they should already be familiar with to get the most out of your document. -->

The [basic understanding](https://mhcpcreators.github.io/worlds-documentation/docs/understanding-the-desktop-editor/Worlds-desktop-tools-basics) of the Meta Horizon World desktop editor is needed. But you don't need to have a lot of understanding of TypeScript, as everything will be explained with their TypeScript code.

As for every monetization doc, you need to be a member of MHCP and have accepted the monetization Terms of Service in the creator portal in order to create in-world items that we will use. Find out more about monetization [here](https://developers.meta.com/horizon-worlds/learn/documentation/mhcp-program/monetization/creator-monetization-partner-program)

Please note that this documentation is based on the version of the [Daily Rewards Asset Template](https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/daily-rewards-asset-template) published the 4th April 2025.

### Document Organization

<!-- This is an optional section, but possibly useful if your document has an unusual document structure, or needs a table of contents with internal links because it is very long. -->

This document will show you step by step how to implement the daily reward and go further with it.

You can find the quick access link below to each part here:

* [Plan your reward](#plan-your-reward)
* [Items setup](#items-setup)
* [Set up the Daily Reward Asset](#set-up-the-daily-reward-asset)
* [Troubleshooting](#troubleshooting)
* [Configure a trigger](#configure-a-trigger)
* [Multiple Daily Rewards](#multiple-daily-rewards)
* [Go beyond with TypeScript](#go-beyond-with-typescript)
* [References](#references)

## Plan your reward

Before doing anything, you need to plan what you want to achieve with daily rewards, as the [Daily Rewards Asset Template](https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/daily-rewards-asset-template) can be configured.

Here are some examples:
- Temporary bonus  
  Every day, the user can gain a one-time bonus, such as:
  - a temporary speed boot
  - a daily (24h) coin boost with a multiplier for the user
  - a global (for the entire server) boost to highlight the user name that activated it (to engage more and add player interaction)
    
- Cosmetic  
  Specific cosmetics for users who come every day can be attractive to new users to come daily.
  
- In-game specific currency  
  Gain some in-game coin or experience every day.
  Note that it cannot give Meta Credit, but only your own currency, with a consumable Item that will give it once activated.

For more ideas and best practices, you can follow the [Plan your world guide](https://mhcpcreators.github.io/worlds-documentation/docs/manuals-and-cheat-sheets/plan-your-world-game-design-&-monetization-sheet/)

Once you know what you want for your daily reward, you can start to implement it with the items setup.

## Items setup

In this part, we will add consumable items to our world. If you have already created your item, you can skip this part. 

To add an item, follow the steps of [this official documentation](https://developers.meta.com/horizon-worlds/learn/documentation/mhcp-program/monetization/meta-horizon-worlds-inworld-purchase-guide#creating-an-item). Please note that you need to add every item in the 7-day windows of your daily reward.

## Set up the Daily Reward Asset

Once your items have been configured, we can now add the [Daily Rewards Asset Template](https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/daily-rewards-asset-template) and configure it.

### Import 

To start, open the [Desktop Editor](https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/desktop-editor) and open your world.  
Then go to the "Public Assets" (1) section under "Asset Library" (2) and use the search tool and type "Daily Rewards" (3) to find the Daily Rewards asset (4) created by MetaHorizon. And add it to your world.  

![impot_DRA_a](https://github.com/user-attachments/assets/7dbf5dbc-64f7-4a62-b80b-4ad82595cd8a)  

A warning message can appear "Asset includes script(s)" as this asset needs a TypeScript script to work. You can just click the "OK" button and continue.

#### Asset content

With this import, you have added more than just an object to your world. As you can see on the Hierarchy tab, if you unfold the asset:

<p align="center">
  <img width="250" height="467" alt="Hierarchy" src="https://github.com/user-attachments/assets/4bd2ccb0-2370-4a06-be72-2826141df87f" />
</p>

There are a lot of objects, but do not worry, they are clearly labelled and easy to work with!
 
- Daily Rewards
  The main object. It is the root of all the children's objects. If you click on this, you will have access to the main option of the asset.
  - Daily Rewards UI Pool  
    This repository contains all the User Interface (UI) that can be displayed. Daily Rewards are user-related; every player will have a specific state on the daily reward system, so each will need a different UI. When a user joins your world, a Daily Rewards UI script will be assigned to handle the UI.
  
  - Daily Rewards Button Pool
    Same as the UI pool, but for the button shown on the screen to open the Daily Reward UI.

To learn more about how the pool gizmos work, check the official documentation [here](https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/asset-pool-gizmo).  
Please note that your world will need to have the same number of Pool children as the maximum number of players. If you change it in the future, make sure to add enough scripts for every player to enjoy your daily rewards!  

Also,  two TypeScript scripts have been imported to your world:

- daily_rewards.ts
  This is the main script that interacts with the persistent variable that we will set up next. It has all the logic and handles events to interact with the local scripts of the pools
- ui_toggle_button.ts
  This script handles the player's assigned toggle button. This script allows the player attached script to interact with the server script.
- daily_rewards_ui.ts
  This script handles the player's assigned UI and buttons. This script allows the player attached script to interact with the server script.

To summarize, the system works as follows, with an event system:  
<p align="center">
  <img width="961" height="711" alt="Daily Reward " src="https://github.com/user-attachments/assets/2d60330e-03ad-4b08-96dc-2837e7b0918e" />
</p>


### Setup persistent variable

This ID is the link with the storage of your world through the [Persistent variables](https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/quests-leaderboards-and-variable-groups/variable-groups/managing-persistent-variables-associated-with-a-variable-group) system. It is what allows the world to know where the users are on the daily streak.  
  
It can be configured on the World Editor by going to the Systems > Variable Groups 

<p align="center">
  <img width="250" height="467" alt="Hierarchy" src="https://github.com/user-attachments/assets/8ec4bfa1-dc6d-4848-a597-146bf0b2cf90" />
</p>
  
Then create a [Variable Group](https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/quests-leaderboards-and-variable-groups/variable-groups/using-variable-groups) with an explicit name (like daily_reward) and add a description to remember what it does later.  

<p align="center">
  <img width="250" height="467" alt="Hierarchy" src="https://github.com/user-attachments/assets/9c5fde1b-81b4-444d-855b-a51dd22b13c7" />
</p>
  
This group allows the creation of different variables that are linked to each user OR to the world. In this case, we will need to create a Player Persistent Variable (to store the state of the daily reward for each user). So click on the add button:  

<p align="center">
  <img width="250" height="467" alt="Hierarchy" src="https://github.com/user-attachments/assets/4bc9419c-80d6-42a1-a2f0-d7c82ef6852e" />
</p>
  
Then choose "Player Persistent Variable", give it a unique name in the group, and select the Data Type "Object" like this:  
  
<p align="center">
  <img width="250" height="467" alt="Hierarchy" src="https://github.com/user-attachments/assets/5d4c2d13-3fee-4d23-bfbc-bf56363fe865" />
</p>
  
Once created, you will see the added variable in the group view:   

<p align="center">
  <img width="250" height="467" alt="Hierarchy" src="https://github.com/user-attachments/assets/5fc3a31d-a383-45da-afd9-ade8bad1f7c1" />
</p>
  
Finally, you have to click on the "copy" button to copy the complete ID of your variable (it is formatted with group_name:variable_name) and paste it in the Persistent object Variable field of the Daily Reward.  
  
### Set the items

You have to set seven items to the daily reward asset. It can be seven times one item or seven different items.  

For each item, you need to set the SKU (unique identifier that can be found on System > Commerce and click the copy button for the desired item), the quantity, and a thumbnail as follows:  

Day X Reward SKU: The SKU of an item you want to award the player for logging in on day X.
Day X Reward Quantity: The quantity of the chosen award item to be granted.
Day X Reward Thumbnail: The thumbnail of the chosen award item to be granted.

Note: the thumbnail can be different than the item thumbnail.

Once completed, your daily rewards asset is almost complete.

### Options

The options description can be found on the official documentation [here](https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/daily-rewards-asset-template#visual-and-interaction).   

This is some additional information on the most important one that you need to configure:  

#### Id
It's the unique identifier for the current daily reward. If you want to have multiple ones (as detailed above), you need to differentiate each with a different ID.
The ID is a string; it can be whatever you want, but it must be unique.   

#### Persistent Object Variable
It represents the place to store the data for each user. If you have already set up the persistent object, then paste the ID here.  
To have more explanation on how to create this variable, follow the steps [here](#setup-persistent-variable)    

### Test it!

Once you have done every step, your daily reward is now set up properly with your world!  
It is now time to start your world and check if it works!

If you want, you can reset the current streak on the editor by going to the System > Variable Groups, then select your group and remove the debug value by clicking here:
<p align="center">
  <img width="250" height="467" alt="Hierarchy" src="https://github.com/user-attachments/assets/bcf20a53-fea4-4b0a-ba17-38205e013d96" />
</p>
Then erase the JOSN object to restart your streak.

Note that this JSON object can be edited 

## Troubleshooting

Sometimes something doesn't go as planned. If your daily reward doesn't work, here are some common issues that you can encounter:

- "Warning: Can't get value for Store:DailyRewards. ID was deleted or never existed. Go to the Systems tab in the creation UI to confirm."  
  This error typically appears when you have not created your [persistent variable](#setup-persistent-variable) or set the wrong ID. Check that the ID on the warning message is the good ID for your persistent variable, change it if needed, then restart your world.

- The UI does not show  
  If your Daily Reward UI does not appear when you click on the UI button, double-check the following:
  - All the items have been configured (none of them are blank)
  - The Daily Reward ID is consistent. If you have modified it on the main asset, you need to modify it under every button of the pool.
  - If you use a custom trigger, verify your code with the next section.


## Configure a trigger

By default, the [Daily Rewards Asset Template](https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/daily-rewards-asset-template) adds a UI button to open the reward menu. If you don't want to have this button on the UI, you can trigger it instead with minimal TypeScript code.  

This section will guide you through this process step by step.

The opening of the daily rewards menu is triggered via the event system of Meta Horizon World. To open, we need to send an event to the UI script attached to the desired player.
This is done through the ShowPanel event defined in the Daily Reward Script.
  
To do that, you need to import the PanelEvent in your script:
```ts

import { PanelEvents } from 'daily_rewards_ui';

```

This will allow your script to use the event system with 'PanelEvents.ShowPanel' and 'PanelEvents.HidePanel'.
Both of them require a Player object and a nullable String as an ID to select a specific one. Please note that if the ID is null, every daily reward menu will be shown.  

Then we add the basic Trigger script :
```ts
class StartDailyRewardView extends hz.Component<typeof StartDailyRewardView>{

  start(){
  }
}
hz.Component.register(StartDailyRewardView);
```


But as we mentioned earlier, we need to have the id of the daily reward to be shown. To do this, we add a props definition with a string representing the ID:
```ts
static propsDefinition = {
  id: {type: hz.PropTypes.String},
};
```

Now we have to connect a code block event on our trigger that will send the event when entered in the start function:
```ts
this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterTrigger, (player) => {
  this.sendNetworkBroadcastEvent(PanelEvents.ShowPanel, {player: player, id: this.props.id})
})
```

And voilà! You now have a functional script that lets a Trigger Gizmos open your daily reward UI.

At the end, the script will look like this:

```ts

import { PanelEvents } from 'daily_rewards_ui';


/*
 * This class allows a trigger to open a daily reward view with the id in the props definition
 */
class StartDailyRewardView extends hz.Component<typeof StartDailyRewardView>{

  static propsDefinition = {
    id: {type: hz.PropTypes.String},
  };

  start(){
    //Send a showPanel event when a user enters the trigger to open the Daily Reward menu
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterTrigger, (player) => {
      this.sendNetworkBroadcastEvent(PanelEvents.ShowPanel, {player: player, id: this.props.id})
    })
  }
}
hz.Component.register(StartDailyRewardView);
```

Once done, you just have to add a trigger Gizmos in your world and attach it to ScriptName:StartDailyRewardView and set the ID of your Daily Reward.
  

## Multiple Daily Rewards

Currently, the [Daily Rewards Asset Template](https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/daily-rewards-asset-template) has a 7-day window, but for some usage scenarios, this is insufficient. Also, it may be needed to have more than one daily reward schedule with specific rewards each week (in a rotation of some weeks) or multiple rewards for different bonuses.  

For that, you can add multiple Daily Rewards Assets in your world, but you have to configure each one with a unique ID (that needs to be copied into each script of the two asset pools) and also set up a persistent variable for each one. 


## Go beyond with TypeScript

If you want more advanced control over what the [Daily Rewards Asset Template](https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/daily-rewards-asset-template) does, you can edit the TypeScript file or use a custom script that will interact with your daily reward.

The best practice is to create new scripts that interact with the daily rewards asset as detailed above in the 
[Asset content section](#asset-content).

## References

<!-- this is the place to put useful supplementary information, such as references to other websites or documents in the github repo that are relevant to your topic -->

- https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/daily-rewards-asset-template
  - The official documentation about the Daily Rewards Asset
- https://developers.meta.com/horizon-worlds/learn/documentation/code-blocks-and-gizmos/asset-pool-gizmo
  - Official documentation about the Pool Asset Gizmo
- https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/quests-leaderboards-and-variable-groups/variable-groups/using-variable-groups/
  - Persistent storage for meta horizon world documentation
- https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/custom-ui/api-reference-for-custom-ui
  - The custom UI official documentation
