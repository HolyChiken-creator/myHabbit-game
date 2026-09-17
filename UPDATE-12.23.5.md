# myHabbit 12.23.5 — mobile workshop cache recovery

- Fixed the real reason the 12.23.4 mobile workshop could look unchanged: an older service worker served cached `index.html` before checking the network.
- Navigation is now network-first, while versioned JS/CSS remain cached atomically for offline use.
- Service-worker registration now uses the actual application version instead of the old hardcoded `12.8.0` query.
- On the first `/api/app-meta` request after a new deployed build, the server bumps the client cache revision once. Existing clients already react to this revision by clearing obsolete `myhabbit-*` caches and reloading.
- Old `myhabbit-game-*` caches are removed after the new worker activates.
- Mobile room workshop keeps the intended bottom-sheet layout: hidden duplicate category header, two item cards per row and an independently scrolling catalog while the room remains visible.
