# Mini Ink 3DS

A tiny original pixel ink-arena prototype for Nintendo 3DS homebrew. It builds as a `.3dsx` and is designed to stay small enough for the Homebrew Launcher.

Created by Render4 and Sir Winsalot.

## Controls

- Circle Pad or D-pad: move
- A: fire current weapon
- Touch screen: aim and fire toward the touch point
- L/R: change weapon
- X/Y: change hair style
- B on title: change custom map
- B in match: return to title
- Select: reset match
- Start: exit

## Current features

- Pixel turf painting on both screens
- 18 original ink weapon archetypes inspired by shooter, roller, brush, bucket, bow, charger, and spinner-style play
- 12 hair combinations with different shapes and colors
- 3 friendly CPU teammates and 3 rival painters
- 3-minute match timer with end-of-match result
- Title screen with a chunky pixel banner
- 3 larger custom maps: Neon Works, Spillway, and Jelly Yard
- Live turf percentage bars

## Build

Install devkitPro with 3DS support, then run:

```sh
make
```

The build creates:

```text
MiniInk3DS.3dsx
MiniInk3DS.smdh
```

Copy both files to your SD card's `3ds/MiniInk3DS/` folder.

## About `.3dsx` vs `.cia`

This prototype is a good fit for `.3dsx`. A `.cia` would not magically make the game bigger or better; it mostly changes how it is installed and launched. Once the game has a polished icon, banner, and title metadata, CIA packaging can be added as a separate build step.
