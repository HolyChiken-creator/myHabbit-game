# myHabbit 12.6.0 — Teddy Room renovation expansion

This release turns Teddy's space into one persistent 2.5D renovation room instead of a background/skin system.

## Teddy Room

- One fixed room/camera with layered architecture: walls, ceiling, perspective floor, window, stairs, upper rail, door and fireplace shell.
- The starter room is intentionally sparse. Progress is created by adding separate objects and finishing zones.
- 15 renovation zones: ceiling, walls, floor, window/curtains, fireplace, seating, storage/books, wall art, plants, collection corner, table, table items, rug, extra corner and lighting.
- Four visible renovation stages: Bare room → Getting cozy → Warm home → Dream room.
- Room progress is based on the highest renovation tier ever unlocked, so temporarily equipping an older visual choice does not erase progress.
- New upgrade hotspots are placed directly in the room.
- Suggested next upgrades surface the cheapest logical next steps.
- Higher tiers require the previous tier in that zone, preventing users from skipping directly to the final room.

## Visual depth

- Rebuilt scene composition with a larger floor plane and stronger perspective.
- Added permanent staircase, balcony rail, door and fireplace architecture.
- Existing transparent art assets are used as real room objects: armchair, bookcase, lamp, plants and reward chests.
- Curtains, fireplace, gallery and collection zones are assembled as separate layers rather than baked into a room image.
- Mobile layouts keep the same room but simplify/scale props instead of replacing the room with another background.

## Economy

- Crystals remain the dedicated room progression currency.
- Existing crystal sources remain: quests, Match-3, 7-day streak milestones and profile level-ups.
- Existing paid decoration is preserved during migration.
- New renovation slots start at tier 0 and are automatically added to old profiles.

## Reliability

- Important Teddy Room furniture assets are now part of the offline PWA core cache.
- Release audit verifies the new room assets.
- Room tests now cover all 15 zones and sequential tier unlocking.
