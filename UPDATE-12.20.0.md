# myHabbit 12.20.0 — Room Shop progression

Room progression is now synchronized with the diamond shop.

## User flow
- Every profile starts at Room Level 0.
- Level 0 uses the neglected Step Zero furniture collection.
- Levels 1–4 are purchased sequentially with diamonds.
- Buying a room level changes the entire room package together: background + furniture.
- Previously purchased room levels can be equipped again from the shop.
- The old per-slot room studio is no longer shown to regular users.

Prices:
- Level 0 — free
- Level 1 Cozy — 8 diamonds
- Level 2 Warm — 18 diamonds
- Level 3 Hi-tech — 32 diamonds
- Level 4 Gothic — 50 diamonds

## Admin-only layout editor
- Triple tap on Teddy is available only for admin/owner profiles.
- Admin can reposition and resize room assets independently.
- Regular members cannot enter layout/edit mode.

## Rendering
- Added runtime Level 0 background and ASCII-safe room assets.
- The displayed room level is read directly from the user's purchased/equipped roomThemeLevel.
