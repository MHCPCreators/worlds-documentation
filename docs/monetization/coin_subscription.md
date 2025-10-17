### Daily Coin Subscription

In this tutorial we’ll build a **subscription system** for our world.  
Players who purchase a specific IWP (In-World Purchase) will be able to collect coins from the **Coin Vault** each day they log in.  
To make the subscription more enticing, the system will also pay out coins **retroactively** for all the days they’ve logged in before purchasing.  

This mechanic works on two levels:  
- **Conversion driver**: the longer someone plays without subscribing, the more appealing the purchase becomes.  
- **Retention driver**: once subscribed, players have a reason to come back every day to claim the reward they already paid for.  

![Coin Vault!](/images/coin_sub_banner.png)

---

### IWP Setup

We start by creating an IWP for the subscription.  
The key here is to make it a **durable item**, since this upgrade is permanent for the player:  

![IWP](/images/iwp_coin_sub.png)

Once created, assign this item to an **IWP Gizmo** so it’s available for purchase inside your world:  

![IWP Gizmo](/images/iwp_gizmo_coin_sub.png)

---

### Player Data Setup

To make our subscription system work, we need to persist a few values for each player.   
These will let us calculate how many coins they should be able to claim at any point.  

We’ll store three key pieces of data:  

1. **`last_login`**: Number : the most recent day this player logged in (stored as *days since epoch*).  
   - This lets us detect when it is a new *distinct* day.
   - We will use UTC to avoid any timezone shenanigans 

2. **`unclaimed_days`**: Number : how many days they’ve logged in without claiming coins.  
   - Before subscribing, this just keeps growing.  
   - After subscribing, a claim of coins will reset this to 0.  

3. **`coins`**: Number : the currency we are associating with this subscription
   - This increases each time they successfully claim coins.
   - This could well be a variable you already have if you want to use an existing currency.

![Player Variables](/images/variables_coin_sub.png)

---

### Implementation: 

For the purposes of this tutorial, we will be implementing all logic within a UIComponent, so that we can use a CUI for interaction and displaying the current state.  
We begin by tracking when the player is playing on a "new day":

```
 static propsDefinition = {
      lastlogin_variable: {type: hz.PropTypes.String },
    };

  preStart() {
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterWorld, this.OnPlayerEnterWorld.bind(this));
    });
  }

  OnPlayerEnterWorld(player: hz.Player) {
    const lastLogin = this.world.persistentStorage.getPlayerVariable(player, this.props.lastlogin_variable)
    const daysSinceEpoch: number = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
    if (daysSinceEpoch > lastLogin) {
      this.world.persistentStorage.setPlayerVariable(player, this.props.lastlogin_variable, daysSinceEpoch)
    }
  }
  ```
If we connect to our world now, we should see the lastlogin variable being populated. However this is not yet much use.  
We can extend the logic by using the knowledge of days passing to also control our unclaimed_days variable.
```
 static propsDefinition = {
      ...
      unclaimeddays_variable: {type: hz.PropTypes.String },
    };

  OnPlayerEnterWorld(player: hz.Player) {
    const lastLogin = this.world.persistentStorage.getPlayerVariable(player, this.props.lastlogin_variable)
    const daysSinceEpoch: number = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
    var bankedDays = this.world.persistentStorage.getPlayerVariable(player, this.props.unclaimeddays_variable)
    if (daysSinceEpoch > lastLogin) {
      bankedDays++
      this.world.persistentStorage.setPlayerVariable(player, this.props.unclaimeddays_variable, bankedDays)
      this.world.persistentStorage.setPlayerVariable(player, this.props.lastlogin_variable, daysSinceEpoch)
    }
  }
  ```
We are now successfully tracking how many distinct days the player has connected to our server!  
All that's left is to make use of this information to display something to the player.  
As we are using a CUI for this, we should pump this data into a binding.  
```

   static propsDefinition = {
      ...
      coins_per_day: {type: hz.PropTypes.Number, default: 5 },
    };
  claimableCoins: ui.Binding<number> = new ui.Binding<number>(0)
  OnPlayerEnterWorld(player: hz.Player) {
    ...
    this.claimableCoins.set(bankedDays * this.props.coins_per_day, [player])
}
```
The other information that is useful for our CUI is whether the subscription is active or not.  
This will allow us to decide if we show a claim button, or just some information encouraging a purchase.  
```
  static propsDefinition = {
      ...
      subscription_item: {type: hz.PropTypes.String },
    };
  subscriptionActive: ui.Binding<boolean> = new ui.Binding<boolean>(false)
  OnPlayerEnterWorld(player: hz.Player) {
    ...
    hz.WorldInventory.doesPlayerHaveEntitlement(player, this.props.subscription_item).then((value: boolean)=>{
      this.subscriptionActive.set(value, [player])
    })
}
```
And we now have a working accumulating vault!  
However nothing here is responsive to actions taken by the player after they connected to the world.  
So let's start by tracking any purchases, so we can react if the player buys the subscription:

```
  preStart() {
    ...
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnItemPurchaseComplete, (player, item, success) => {
    });
  }

  OnPurchase(player: hz.Player, item: string, success: boolean) {
    if (!success) return
    if(item != this.props.subscription_item) return
    this.subscriptionActive.set(true, [player])
  }
```

This should allow get us to the point where the vault is filling up **and** claimable!  
So all that's left is to implement a Claim function.  
We're expecting that our currency variable will be increased, our unclaimed days variable will be cleared, and the UI will be updated:
```
  Claim(player: hz.Player) {
    const bankedDays = this.world.persistentStorage.getPlayerVariable(player, this.props.unclaimeddays_variable)
    const currentCoins = this.world.persistentStorage.getPlayerVariable(player, this.props.coins_variable)
    const coinsToClaim = bankedDays * this.props.coins_per_day
    this.world.persistentStorage.setPlayerVariable(player, this.props.unclaimeddays_variable, 0)
    this.world.persistentStorage.setPlayerVariable(player, this.props.coins_variable, currentCoins + coinsToClaim)
    this.claimableCoins.set(0, [player])
  }
```

And there we have it, the functional implementation of a currency subscription system for our world!  

![Demo](/images/coin_sub_demo.png)

### Stretch Goals

Once you have this working, here's some ways that you can challenge yourself by extending it!
- Why not add a limit to how many days can be banked.
  - Add pressure to convert by letting them know they're no longer storing up free coins.
- Try a time limited subscription.
  -  Once the limit is in, you could try a consumable subscription that only allows you to claim coins for several days before the vault reverts to the accumulation phase.

Below is the complete script we explored here, including a very simple CUI view for displaying the status and claim button.

### Full Script

```
import * as ui from 'horizon/ui';
import * as hz from 'horizon/core';

class VaultSubscription extends ui.UIComponent<typeof VaultSubscription> {
  protected panelHeight: number = 512;
  protected panelWidth: number = 768;

  static propsDefinition = {
      coins_variable: {type: hz.PropTypes.String },
      unclaimeddays_variable: {type: hz.PropTypes.String },
      lastlogin_variable: {type: hz.PropTypes.String },
      subscription_item: {type: hz.PropTypes.String },
      coins_per_day: {type: hz.PropTypes.Number, default: 5 },
    };

  subscriptionActive: ui.Binding<boolean> = new ui.Binding<boolean>(false)
  claimableCoins: ui.Binding<number> = new ui.Binding<number>(0)

  preStart() {
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnPlayerEnterWorld, this.OnPlayerEnterWorld.bind(this));
    this.connectCodeBlockEvent(this.entity, hz.CodeBlockEvents.OnItemPurchaseComplete, (player, item, success) => {
    });
  }

  OnPlayerEnterWorld(player: hz.Player) {
    const lastLogin = this.world.persistentStorage.getPlayerVariable(player, this.props.lastlogin_variable)
    const daysSinceEpoch: number = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
    var bankedDays = this.world.persistentStorage.getPlayerVariable(player, this.props.unclaimeddays_variable)
    if (daysSinceEpoch > lastLogin) {
      bankedDays++
      this.world.persistentStorage.setPlayerVariable(player, this.props.unclaimeddays_variable, bankedDays)
      this.world.persistentStorage.setPlayerVariable(player, this.props.lastlogin_variable, daysSinceEpoch)
    }
    this.claimableCoins.set(bankedDays * this.props.coins_per_day, [player])
    hz.WorldInventory.doesPlayerHaveEntitlement(player, this.props.subscription_item).then((value: boolean)=>{
      this.subscriptionActive.set(value, [player])
    })
  }

  OnPurchase(player: hz.Player, item: string, success: boolean) {
    if (!success) return
    if(item != this.props.subscription_item) return
    this.subscriptionActive.set(true, [player])
  }
    
  Claim(player: hz.Player) {
    const bankedDays = this.world.persistentStorage.getPlayerVariable(player, this.props.unclaimeddays_variable)
    const currentCoins = this.world.persistentStorage.getPlayerVariable(player, this.props.coins_variable)
    const coinsToClaim = bankedDays * this.props.coins_per_day
    this.world.persistentStorage.setPlayerVariable(player, this.props.unclaimeddays_variable, 0)
    this.world.persistentStorage.setPlayerVariable(player, this.props.coins_variable, currentCoins + coinsToClaim)
    this.claimableCoins.set(0, [player])
  }

  initializeUI(): ui.UINode {

    return ui.View({
      children: [
        ui.Text({
          text: ui.Binding.derive([this.subscriptionActive, this.claimableCoins], (subscriptionActive: boolean, claimableCoins: number)=>{
            if(!subscriptionActive)
            {
              return "Subscribe now, to receive " + claimableCoins + " coins instantly, and another " + this.props.coins_per_day + " coins every day you log in!"
            }
            if(claimableCoins > 0)
            {
              return "" + claimableCoins + " coins ready to be claimed!"
            }
            return "Come back tomorrow for another " + this.props.coins_per_day + " coins"
          }),
          style: {
            fontSize: 48,
            textAlign: 'center',
            textAlignVertical: 'center',
            height: "75%",
            width: "100%",
          }
        }),
        ui.Pressable({
          children: ui.Text({
            text: "Claim",
            style: {
              fontSize: 48,
              color: "white",
              textAlign: "center",
            },
          }),
          onClick: (player: hz.Player)=>{this.Claim(player)},
          style: {
            display: ui.Binding.derive([this.subscriptionActive, this.claimableCoins], (subscriptionActive: boolean, claimableCoins: number)=>{
              return subscriptionActive && claimableCoins > 0 ? "flex" : "none"
            }),
            backgroundColor: "green",
            borderRadius: 6,
            height: "25%",
            width: "100%",
          },
        }),
      ],
      style: {
        backgroundColor: 'black',
        height: this.panelHeight,
        width: this.panelWidth,
      }
    });
  }
}
ui.UIComponent.register(VaultSubscription);

```
