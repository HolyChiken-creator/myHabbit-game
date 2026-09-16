# myHabbit 12.9.0 update

## Teddy Room floating renovation sheet

- Opening any room upgrade no longer changes the room width or height.
- The renovation controls are removed from document layout while open, so Teddy and the camera stay pixel-stable.
- Desktop/tablet: a translucent blurred sheet floats from the lower edge of the room.
- Mobile: the same controls appear as a compact fixed bottom sheet with safe-area support.
- Removed automatic scrollIntoView, eliminating the camera/page jump on open.
- Style cards remain swipeable horizontally and keep live preview without spending crystals until confirmation.
- The opening animation happens only when the sheet is first opened, not on every preview tap.

Apply the update-only archive over 12.8.0 preserving paths, then redeploy.
