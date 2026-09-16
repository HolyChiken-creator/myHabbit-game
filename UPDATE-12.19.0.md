# myHabbit 12.19.0 — Teddy Room render fix

- Repacked all 4 room collections into safe ASCII WebP runtime assets under `public/assets/room-master/`.
- Cropped transparent padding from furniture assets for stable sizing and alignment.
- Outside edit mode, room visual level now always follows the actual renovation stage.
- Removed legacy room pseudo-walls over the new background.
- Hidden Teddy activity prop while master room rendering is active (no book/broom covering Teddy).
- Missing asset icons no longer render as Safari blue question-mark placeholders.
- Mobile room uses a stable 4:3 canvas.
- Fixed mobile `Ремонтувати` card: progress and action button stack cleanly and no longer compete for width.
- Service worker no longer blocks install by preloading large Unicode room asset URLs; room assets cache on demand.
