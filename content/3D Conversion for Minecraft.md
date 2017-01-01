Title: 3D Conversion for Minecraft
date: 06/23/2016
tags: Minecraft, 3D, scanning
category: Minecraft

[TOC]

# Workflow #

This is heavily based on the [Planet Minecraft](http://www.planetminecraft.com) tutorial [How I Convert 3D Models Into Minecraft without binvox](http://www.planetminecraft.com/blog/how-i-convert-3d-models-into-minecraft-without-binvox/).

*Note*- don't leave this page/site open in your browser. At least for me, the embedded videos, ads, etc seem to leak memory and eventually slows my machines down to a crawl.

There are several other tutorials on the internet that use [binvox](http://www.patrickmin.com/binvox/). The advantage of [poly2vox][] is that it can read texture data and create full coloured voxel versions of 3D models.

*Aside:* If you're interested in other Minecraft mapping tools, then [this page](http://minecraft.gamepedia.com/Programs_and_editors/Mapping#Map_Editors) is for you!

## Input ##

I usually capture scans of people and items using an [XBox 360 Kinect 1][kinect],  [Skanect][] software, and a human-size turntable.
 
The Turntable is made from plywood and powered by a second hand power drill driving the reduction gearbox from another, broken drill. It's inspired by the [Scan-o-Tron](http://www.thingiverse.com/thing:127968), which has a great set of write-ups, both on [Thingiverse](http://www.thingiverse.com) and [Make magazine](http://makezine.com/projects/guide-to-3d-printing-2014/scan-o-tron-3000/).

In the past We've tried [photogrammetry] using [123D Catch](http://www.123dapp.com/catch) and [VisualSFM](http://ccwu.me/vsfm/). There's a lot of potential to get higher resolution and more accurate 3D models using this technique. But there is a lot more processing required, meaning it takes longer to see the results. And in our limited attempts I had more reliable results using the [kinect] and [skanect] combination.

Or I find cool 3D designs online- for example on [Thingiverse](http://www.thingiverse.com).
  
## Pre-Processing ##

The input models often need some tweaking before they are usable as Minecraft schematics.

For [kinect] scans I use the reconstruction tools in [Skanect] to make sure the model is watertight (no holes) and doesn't have any disconnected chunks. It takes care of creating 'textures' - image files that get wrapped onto the 3D geometry and give it the appearance of having a lot more details.

Sometimes further fixes to the mesh and texture are needed. I use [netfab basic][netfab], [meshmixer](http://www.meshmixer.com), [meshlab](http://meshlab.sourceforge.net), and/or [blender][].

The tools used to create objects in Minecraft create the shapes out of blocks that can be coloured. These blocks (e.g. wool and clay) have a palette of only 16 colours. So the texture image for the 3D model to be converted has to have an exaggerated and brightened palette. I often use Mac OS X's built in preview application. But something like [The Gimp](https://www.gimp.org) gives you more control and options. 


## Conversion to Voxels ##

So far, [polyvox][] is the best tool I've found for vowelizing models. Ken Silverman, creator of [poly2vox], includes both a Windows executable and the source code. I did briefly start work on trying to adjust the code to compile and run natively on Mac OS X, but quickly ran out of time.

Luckily it runs just fine using [Wine][]:

```
wine poly2vox.exe /?
ERROR: Must specify input file
POLY2VOX [input] [output] [/v#] [/s#] [/f#] [/n#] [/r#] [/m#] [/x#] [/p(file)]
by Ken Silverman (http://advsys.net/ken)  Compiled: Oct 17 2014

Converts models from polygon to voxel format.
Supported polygon formats: ASC,3DS,MD2,MD3,OBJ,STL
Supported   voxel formats: VOX,KVX,KV6,VXL (default:KV6)
Supported texture formats: PNG,JPG,TGA,GIF,CEL,PCX,BMP,DDS
POLY2VOX can load files out of a ZIP file.

 /v#  Specify voxel size of longest dimension. 1-1024, <=256 for KVX
 /s#  Specify explicit scale factor. Use this to ensure the size of all frames
      is consistent. This factor depends on the coordinate system used by the
      polygon model, so it can be anything. Run without the scale factor first
      to find a reasonble starting value to try.
 /f#  Specify frame number (MD2/MD3 only)
 /n#  Specify next frame number for interpolation (MD2/MD3 only)
 /l#  Specify texture interpolation method: {1:nearest, 4:4x4 (default)}
 /r#  Specify frame interpolation ratio: {0.0-1.0}, default:0.0 (MD2/MD3 only)
 /m#  Specify number of mips to save: 1,5, default:5. (KVX only)
 /k?  Specify illumination model for OBJ (Ex: /ka, /kd, /ks, /ke)
 /y   Polygon render (default)  /y2: Polygon render using supercover
 /w   Wireframe render          /w2: Wireframe render using supercover
 /x   Experimental xor-style render for gap-less models;buggy color conversion
 /c   Center model extents at origin (default is to use polygon file's 0,0,0)
 /b(l/r/b/f/u/d)# Clip boundary (Left/Right/Back/Front/Up/Down). Ex: /bu-1.2
 /t(file)  Select a texture file (if not specified in polygon model).
 /p(file)  Specify Build-style palette (first 768 bytes of file, range:0-63)
 /z(file)  Specify a ZIP file to mount. Files inside seen as local dir.

Examples:
 poly2vox bike                        (finds bike.*, writes bike.kvx, size=128)
 poly2vox bike.3ds bike.kv6 /v250   (reads bike.3ds, writes bike.kv6, size=250)
 poly2vox land land.vxl        (finds land.*, writes land.vxl, size=1024^2*256)
 poly2vox pig.md2 pig.kvx /v128 /f2 /n3 /r.5       (convert interpolated frame)
 poly2vox trooper.md2 trooper.kvx /s.115 /f0        (use explicit scale factor)
 poly2vox trooper.md2 trooper.kvx /s0.115 /f0 /ppalette.dat      (user palette)
 for /L %i in (0,1,50) do start /i poly2vox /zmonst.zip monst%i.obj     (batch)
```

Typing `wine` and the full path to where-ever you put the `poly2vox` executable quickly becomes tiresome.

So I moved `poly2vox` to `\usr\local\bin\` and created this `poly2vox` helper script in the same directory:

```
#! /bin/bash

# Get the path to this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# now launch the real app via wine
wine ${DIR}/poly2vox.exe "$@"
```

Now I can be in any directory and use `poly2vox` like this:

```
cd /directory/with model.obj, model.mtl, and model.png/
poly2vox model.obj /path/to/schematics/model.kv6 -v128
poly2vox model.obj /path/to/schematics/model.vox -v128
```

The `-v128` sets the maximum number of voxels (cubes) in the final voxel model.

I run `poly2vox` twice to create two different formats. The `kv6` format is used by the next utility `kv6toschematic`, to generate the Minecraft schematic file. The `vox` format is used for Voxel editors, such as [MagicaVoxel]. 

Aside: You can use [`slab6`](http://advsys.net/ken/download.htm) to convert between `kv6` and `vox` formats. At the time of writing there is some odd behaviour in accessing menus when `slab6` is run via [Wine]. If you use the mouse, the menu never goes away and blocks access to dialogs. Instead, use the `alt` key to use the menus.

## Conversion to Schematic ##

The final step: converting to a `schematic` file.

To do that I use [kv6toschematic]. It's a [Java][java] application that reads `kv6` files and outputs minecraft `schematics` usable by [mcedit].

So first, make sure that you have [Java][java] installed.

I had no luck running it as a GUI program; it just always exits with a 'user cancelled' error.

Luckily it works fine from the command line, which suites me fine:

```
java -jar kv6ToSchematic.jar -h

kv6 to schematic tool by anonym927
Usage:
java -jar kv6ToSchematic.jar [-pal:%path_to_palette%] [-bId:%target_block_id%] -in:%path_to_inputfile% [-out:%path_to_outputfile%]
Arguments in [] are optional
%target_block_id% must be an integer (like 123)
I recommend 35 for Wool Blocks or 159 for colored clay.
-in parameter must be a valid input file formatted kv6
```

Again, I didn't want to be typing the full path to the `jar` file every time, so I created another little helper script:

```
#! /bin/bash

# Get the path to this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# now launch the real app via wine
java -jar ${DIR}/kv6ToSchematic.jar "$@"
```

Now I can just type `kv6ToSchematic -bId:159 -in:model.kv6 -out:model.schematic` from any place there is a waiting `kv6` file.
  
## Automation ##

After the [Vancouver Mini Maker Faire](http://makerfaire.ca) I found myself with around 30 sets of scans to convert. 

Time to automate what I can. I created a script that automatically generates `kv6` and `vox` files in two sizes, and also converts them to `schematics`.

Here it is:

```
#!/bin/bash

# run from root of scan template directory.

POLYVOXCMD="poly2vox"
KV6TOSCHEMCMD="kv6ToSchematic"
DIR="${PWD}"
NAME=`basename "${PWD}"`
BRIGHTENEDOBJ="${DIR}/OBJ Models/Brightened"

# These two are relative to ${DIR}
VOXDIR="Voxel Files"
SCHEMDIR="Minecraft Schematics"

echo ">>> Converting obj file to voxels..."
# need to be in the directory with the obj file for tools to find the texture file.
cd "${BRIGHTENEDOBJ}"
# Note- wine/poly2vox is finicky with paths. Relative seems to work best.
echo "> Generating vox files..."
$POLYVOXCMD "${NAME}.obj" "../../${VOXDIR}/${NAME}-128.vox" /v128
$POLYVOXCMD "${NAME}.obj" "../../${VOXDIR}/${NAME}-64.vox" /v64
#echo "> Generating kv6 files..."
$POLYVOXCMD "${NAME}.obj" "../../${VOXDIR}/${NAME}-128.kv6" /v128
$POLYVOXCMD "${NAME}.obj" "../../${VOXDIR}/${NAME}-64.kv6" /v64

echo ">>> Converting kv6 voxel files to schematics..."
cd "${DIR}"
$KV6TOSCHEMCMD -bId:159 -in:"${VOXDIR}/${NAME}-128.kv6" -out:"${SCHEMDIR}/${NAME}-128.schematic"
$KV6TOSCHEMCMD -bId:159 -in:"${VOXDIR}/${NAME}-64.kv6" -out:"${SCHEMDIR}/${NAME}-64.schematic"
```

So long as the model to be converted is in a directory with the same base name (e.g. "Bob"), and is arranged as per [this directory structure]({filename}Minecraft and 3D Scanning.md) it all just works.

## Extra: Converting Voxel Files Back to 3D Geometry ##

It can be useful to have the voxelized (made out of cubes) version of an object available as an `stl` file. For example, rendering or editing with [blender][] or 3D printing it.

I found [MagicaVoxel] does a good job of exporting `vox` files to an `obj` file that can be used like any other mesh.

## Improvements ##

I need to remember to always start from the same position, and have the turntable turning the same way for every scan. Especially important as one of the tools in the chain swaps two axis (Y & Z?). So there are always some rotations needed in [mcedit] to align the schematic with the world.

If I ensured this, I could programmatically modify the schematic and also add it to a blank world using [`pymclevel`](https://github.com/mcedit/pymclevel)- which is part of [mcedit].

This would save a lot of manual fiddling and time.

[poly2vox]: http://advsys.net/ken/download.htm
[photogrammetry]: https://en.wikipedia.org/wiki/Photogrammetry
[kinect]: https://en.wikipedia.org/wiki/Kinect
[Skanect]: http://skanect.occipital.com
[netfab]: https://www.netfabb.com/products/netfabb-basic
[MagicaVoxel]: https://ephtracy.github.io
[Wine]: https://www.winehq.org
[kv6toschematic]: http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-tools/1265323-kv6toschematic-import-3d-models-with-textures
[mcedit]: http://www.mcedit-unified.net
[java]: https://java.com
[blender]: https://www.blender.org