# myHabbit 12.21.0 — Per-object Teddy Room shop + admin master layout

## What changed

### For regular users
- Room starts from Step 0 by default.
- The upgrade shop stays directly under the Teddy Room interface.
- The room no longer upgrades as one full package.
- Each room element upgrades separately for its own diamond price:
  - background
  - window
  - armchair
  - side table
  - bookshelf
  - fireplace
  - rug
  - plant
- Every slot has Step 0, Cozy, Warm, Hi-tech and Gothic tiers.
- Higher tiers require the previous tier of the same object.
- Live preview remains available before purchase.

### For admins / owners
- Triple tap on Teddy remains available.
- The hidden layout editor can reposition and resize every visual object.
- Admin layout changes are saved to shared family state with `room-layout-save`.
- All members render the shared saved layout.
- Regular members cannot open or save the layout editor.

### Migration
- The new room asset shop uses 8 real visual slots.
- Existing profiles migrate once to Step 0 for these slots so testing starts from a predictable baseline.
