# myHabbit 12.22.8 — Owner Console live room master

- Moved the global Teddy Room placement controls out of the family admin panel and into `/owner-console`.
- `/owner-console` is now the single publishing source for the canonical room layout shared by every family and device.
- Added a 16:7 visual master editor with drag & drop for every room object and Teddy, size controls, z-index controls, nudging, per-object/per-level reset, JSON import/export, and three preset slots.
- Owner edits publish continuously while dragging and send a committed revision when the gesture finishes.
- Active clients poll the owner master revision and apply changes without a page reload, keeping desktop and mobile on the same percentage-based layout.
- The hidden in-app movement mode remains available for local inspection, but it no longer publishes the global layout.
- Teddy magic/wave decor behavior from 12.22.7 is preserved.
