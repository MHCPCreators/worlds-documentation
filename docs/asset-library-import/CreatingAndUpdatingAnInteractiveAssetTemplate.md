<!-- The title of your document -->
# Creating And Updating An Interactive (Scripted) Asset Template

<!-- Put your name, at least your Horizon Name, as the author -->
Metacrafters and voytek.lorenc
<!-- IMPORTANT: Put the date this document was last updated! This is
important information for people to tell how 'stale' this info might 
be.-->
September 10th, 2025  

## Introduction

<!-- This section should describe what this document is going to cover. Try to provide some background and motivation as to why a creator would want to read your document. -->

This tutorial guides you through the workflow for creating and updating an interactive asset template. To cover the widest possible range of use cases, we will work with an asset that includes multiple scripts, including a “SharedEvents” script that is not attached to any entities.

<img width="1642" height="794" alt="interactive ladder asset" src="https://github.com/user-attachments/assets/21c806e5-284b-4283-869d-a4a9e039b597" />


## Why use an Asset Template?
The primary advantage of using an asset template is the ability to efficiently update instances of an asset across multiple worlds. Rather than modifying the same asset individually in each affected world, you can update the asset definition once and then approve the changes in all impacted worlds.

<img width="612" height="148" alt="asset template" src="https://github.com/user-attachments/assets/8f8d4b58-bc08-4325-bbf7-451741dc1b2c" />


### Prerequisites and Expectations

<!-- This section should indicate any expectations you have of your readers, such as other materials or concepts they should already be familiar with in order to get the most out of your document. -->

Basic familiarity with Horizon Desktop Editor.


### Document Organization

<!-- This s an optional section, but possibly useful if your document has unusual document structure, or needs a table of contents with internal links because it is very long. 

Note that github automatically creates a clickable Outline from your section headings. Make sure you properly 'nest' your headings by using ##, ###, ####, #####, etc for sub sections so that the outline has a good hierarchy and makes navigating your document easier. I recommend only using # for the initial title, as the font for H1 renders very large. -->

This document has six main parts covering asset prep, creating an asset template, importing, updating, accepting changes, and unlinking the asset. Additionally, there is an advanced concepts section and a references section.  

- [Why use an Asset Template?](#why-use-an-asset-template)  
- [Topic One - Preparing Your Asset’s Elements Before Converting to an Asset Template](#topic-one---preparing-your-assets-elements-before-converting-to-an-asset-template)  
- [Topic Two - Creating an Asset Template](#topic-two---creating-an-asset-template)  
- [Topic Three - Importing an Asset Template](#topic-three---importing-an-asset-template)  
- [Topic Four - Editing the Template Definition](#topic-four---editing-the-template-definition)  
- [Topic Five - Accepting Asset Updates in Affected Worlds](#topic-five---accepting-asset-updates-in-affected-worlds)  
- [Topic Six - Unlinking an Asset from the Asset Template](#topic-six---unlinking-an-asset-from-the-asset-template)  
- [References](#references)  

## Topic One - Preparing Your Asset’s Elements Before Converting to an Asset Template 
Make sure that you work with FBS (File-Backed-Scripts).  Full funtionality of Asset Templates is not guaranteed if you don't use File Backed Scripts. Create a parent object containing all elements of the asset. To keep your project organized and easily manageable, we recommend placing all elements of your asset within a single parent object.

<img width="1128" height="848" alt="create parent object" src="https://github.com/user-attachments/assets/36d35114-471f-49eb-891c-8d10ca4d3cd6" />

 Connect scripts that are not attached to any entities. If your asset includes scripts that are not linked to any entities, such as a “SharedEvents” script, you must ensure the script is connected to an object. In this case, we recommend creating a “SharedEvents” empty object and attaching the script to it.

<img width="1712" height="924" alt="connect your shared events script to an empty object" src="https://github.com/user-attachments/assets/ce07e87e-d920-42c1-a534-ab1430d70e0a" />


## Topic Two - Creating an Asset Template

Select the parent object and choose “Create Asset” from the menu.

<img width="942" height="818" alt="select create asset in the menu" src="https://github.com/user-attachments/assets/b19a7c17-ff5a-4a55-8178-f8b6362decfd" />


Fill out the Asset Name and Description and decide on the location of your asset.  Make sure to select Asset Template in the drop down box.
<img width="1228" height="940" alt="select asset template in the menu" src="https://github.com/user-attachments/assets/16dbace8-879c-4ce5-87b8-6e1f168fe6da" />


Click on Create.


Note that the SQUARE indicating a parent object turned into an icon indicating an asset.  Also, the letters turned from while to blue.
<img width="1500" height="758" alt="parented object turns into an asset" src="https://github.com/user-attachments/assets/8e8ee9c5-d41e-47c4-a4d3-e3530f457e90" />



## Topic Three - Importing an Asset Template
 Bringing an asset into your world is a simple drag-and-drop operation. Drag the asset from your folder in the Asset Library and drop it into your world. You may want to double-check whether the asset’s scripts depend on any specific script APIs, or if Custom Player Movement needs to be enabled in the Player Settings. Make adjustments as necessary.

<img width="1736" height="1024" alt="drag the asset into the window" src="https://github.com/user-attachments/assets/35670756-b82f-41b2-b058-1fdcbf004e85" />


## Topic Four - Editing the Template Definition

In order to edit the template definition, select the asset in your Asset library, and choose the “Edit Template Definition” option.

<img width="1190" height="514" alt="edit template definition" src="https://github.com/user-attachments/assets/79224899-c45e-45dd-9c7d-dfc34c0e1caa" />


You will now be able to make changes to the asset definition.  Once you finish, click on the Save button.

<img width="1786" height="768" alt="save changes to template definition" src="https://github.com/user-attachments/assets/c0bba16c-4924-49c9-bd7f-963adb99cde4" />

Describe your changes and click on “Save & Publish”

<img width="1380" height="638" alt="save and publish button" src="https://github.com/user-attachments/assets/06d88862-afc4-4030-a0d6-d68508a3092d" />


## Topic Five - Accepting Asset Updates in Affected Worlds

Once you change the asset definition, the instances of that asset will NOT be automatically applied in the affected worlds.  You will need to visit each affected world, and accept changes there.  You can do so by clicking on the “View Available Asset Updates” button.


<img width="1704" height="200" alt="view available asset updates" src="https://github.com/user-attachments/assets/686fa669-af09-4ee4-a708-07f3709c81f7" />


## Topic Six - Unlinking an Asset from the Asset Template
You may decide that you no longer want an asset in your world to remain linked to its Asset Template Definition. Unlinking the asset is simple: select the asset in the Hierarchy window and choose “Unlink Instance Root” from the menu.


<img width="1382" height="864" alt="unlink instance root" src="https://github.com/user-attachments/assets/e1cf36c1-0a9c-4ca7-a11a-9f12214d0df4" />


## References

<!-- this is the place to put useful supplementary information, such as references to other websites or documents in the github repo that are relevant to your topic -->

- https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/assets/asset-templates
- Meta's Documentation Explaining Materials Guidance
