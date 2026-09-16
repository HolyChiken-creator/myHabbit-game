# myHabbit 12.21.1 — room crash + admin triple tap hotfix

Fixed:
- Dashboard crash: `Spread syntax requires ...iterable not be null or undefined`
- Legacy room studio fallback still referenced removed slot `seat`
- Added defensive fallback to `background`
- Improved admin/owner triple-tap reliability on iPhone Safari
- Increased triple-tap timing window to 1250 ms
- Bumped cache version so Safari/Service Worker loads the fixed JS

Tests:
- Match-3: PASS (4464 swaps)
- Teddy Room: PASS
- Crystal economy: PASS
