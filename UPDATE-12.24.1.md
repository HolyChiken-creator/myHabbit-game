# UPDATE 12.24.1 — Unified Teddy room canvas

Apply over 12.24.0.

Changed files:
- VERSION
- VERSION.txt
- package.json
- CHANGELOG.md
- CHANGELOG-GAME.md
- UPDATE-12.24.1.md
- public/VERSION.txt
- public/index.html
- public/home.css
- public/boot.js
- public/sw.js
- public/manifest.webmanifest
- public/game-content.js
- public/UPDATE-12.24.1.md
- boot.js
- game-content.js
- scripts/test-room-decor.mjs

Behavior:
- opening the Teddy room workshop no longer changes room geometry on phones;
- static room and workshop preview both use the same 16:7 canvas;
- workshop sheet size changes only the catalog panel height;
- item preview changes the selected decor without moving the rest of the composition;
- Teddy room economy, upgrades, magic transform and owner layout logic remain unchanged.
