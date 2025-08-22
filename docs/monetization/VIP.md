# Making an Exclusive VIP Room For Your World

A very common pattern world creators will use to monetize is to provide a world for free, but then gate certain rooms or features behind one-time purchases or subscriptions.

In this tutorial we'll explore how to set up a room that will only be accessible through in-world microtransactions.

[One Time Purchase](#one-time-purchase-gated-access)
[Subscriptions](#subscription-gated-access)

## Prerequisites 

Before setting up in-app purchases you will need to be part of the MHCP and set up your payout info at https://horizon.meta.com/creator/monetization_purchases/.

The Commerce menu item will not be shown anywhere until you've set up payout info, so it's essential that you do this first.

## World Setup
Before gating content, we need content to gate. 
We're going to walk through creating a simple scene, but if you want to skip to the code you can use the table of contents above to jump
to the section that interests you.

Create a door that opens and closes on toggle.
Suggest that as an improvement they could put the VIP room in a sub-scene, so it's only active if you have access to it.

## One-Time Purchase Gated Access

For things we only want to purchase once,

## Subscription Gated Access

Make door check if the player has an active subscription, or can activate a subscription. Prompt player to buy if they have no subscription.
