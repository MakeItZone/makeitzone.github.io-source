Title: 3D Scanning and Modeling for Minecraft
date: 06/23/2016
tags: Minecraft, 3D, scanning
category: Minecraft

[TOC]

I sometimes do 3D scanning of things and put them in Minecraft. From people, to objects to conversion of virtual models.

To make this useful to as many people I provide the results in several formats, packaged as a zip file.

Here is what the zip file contains:

```text
├── Minecraft Schematics
├── Minecraft Worlds
│   ├── Computer
│   └── PE
├── OBJ Models
│   ├── Brightened
│   ├── Original
│   └── Voxelized
└── Voxel Files

```

You can find details about the contents of each directory below.

## Minecraft Worlds ##

This is where you'll find the object(s) added into "super flat" Minecraft world, ready for you to play!

I create a couple of different versions:

* **Computer directory**: versions for the computer version of Minecraft.
* **PE directory**: versions for the "Pocket Edition"- iOS and Android.

Please read our article on [Installing worlds]({filename}Installing Worlds.md) if you need help adding these to your game.

## Minecraft Schematics ##

Minecraft schematics are a type of file that was developed by the Minecraft community to store parts of Minecraft worlds for reuse and sharing. [MCEdit](http://www.mcedit-unified.net) is a program that can use schematic files. You can find out more about format on the [Minecraft wiki](http://minecraft.gamepedia.com/Schematic_file_format).

I also provide the scanned item as schematic files so you can re-use them in your own worlds.

## OBJ Models ##

These are 3D geometry files. I use the [Wavefront obj format](https://en.wikipedia.org/wiki/Wavefront_.obj_file) because it includes the 3D geometry as well colour texture information. The [STL](https://en.wikipedia.org/wiki/STL_(file_format)) format is perhaps more common, but it doesn't allow for the inclusion of colour data.

I usually provide three models, in three subdirectories:

* **Original**: the original 3D capture or model file
* **Brightened**: the same geometry as the original, but with brightened texture imagery. I need a lighter coloured version because there are very few colours (16) available in Minecraft.
* **Voxelized**: This is the 'blockified' version of the model re-converted back to a 3D geometry format. This is ready for 3D printing or other creative uses.

## Voxel Files ##

Minecraft represents it's world as a large 3D grid of blocks. In computer graphics, this is often called a [voxel](https://en.wikipedia.org/wiki/Voxel).

But most 3D applications, including 3D scanners, produce 3D geometries - points and lines in space. 

To use these models in Minecraft I have to convert from 3D geometry to voxels, and then from voxels to a schematic.

I include the intermediary voxel files in case you'd like to use them, for example with a voxel editor such as [MagicaVoxel](https://ephtracy.github.io).

If you'd like to know how I create these files then please read [this article]({filename}3D Conversion for Minecraft.md).
