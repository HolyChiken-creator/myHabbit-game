# myHabbit 12.21.6 — stable room placement editor

Root cause of objects snapping back / screen refreshing:
- the controller re-read the server layout snapshot on every render while editing;
- pointerdown itself forced a render;
- size changes rendered the full room continuously;
- every movement end also attempted a global save, which could trigger a normal app rerender.

Fixes:
- active editing drafts are no longer overwritten by the server snapshot;
- pointerdown no longer forces a full render;
- size slider updates the selected object directly;
- moving/resizing does not trigger server writes;
- added an explicit `Зберегти для всіх` button;
- global save happens only when that button is pressed;
- editor opening is not role-gated;
- removed triple tap from Teddy completely;
- triple tap on the site version/release label is now the only hidden entry point.
