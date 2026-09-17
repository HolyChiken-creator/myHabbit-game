# myHabbit 12.22.9 — Owner room local draft + reliable JSON import

- Fixed the blank `/owner-console` room editor: the Content Security Policy now allows the same-origin `room-master.config.js` used by the editor.
- The room editor now always opens from a usable local layout: last local draft, published server layout, or built-in defaults when nothing has been published yet.
- Editing, dragging, size, z-index, reset, preset loading and JSON import are LOCAL ONLY. They no longer publish while you work.
- Added an auto-saved local draft in browser storage so unfinished owner edits survive page refreshes.
- `Опублікувати для всіх` is now the only action that writes a new master-layout revision to the server.
- `Відновити опублікований` discards the local draft and reloads the current published revision.
- JSON import accepts exported owner files, direct `layouts`, legacy `roomLayoutMaster`, and `roomMaster.layouts` structures. Imported JSON becomes a local draft first.
- Desktop and mobile clients still use the same canonical percentage-based layout and receive changes only after publish.
- Teddy magic/wave decor behavior from 12.22.7 remains unchanged.
