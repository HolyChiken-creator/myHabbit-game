# myHabbit 12.22.6 — Teddy Room canonical layout

- Decor preview/install no longer triggers Teddy's upgrade/reaction gesture for every selected room item.
- Changed room items now appear with a short glide-in transition, while Teddy stays idle during room styling.
- Fixed the room preview cancel handler so it no longer references stale/undefined item state.
- Owner/Admin panel now includes a dedicated Teddy Room layout module.
- Added direct room-layout editing from the owner panel.
- Added global save/load for the canonical room layout shared by all devices.
- Added layout JSON download/import for backups and moving a finished composition between environments.
- Added three quick local layout preset slots for ready composition variants.
- Room layout remains percentage-based on a fixed 16:7 scene, so desktop and mobile use the same placement plan instead of separate coordinates.
- Added regression coverage for smooth decor switching and owner layout controls.
