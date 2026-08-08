# myHabbit-game 12.0.7 — Visual QA Pass

This update focuses on mobile geometry and overlap prevention.

Validated layout targets:
- 360×800, 390×844, 412×915 portrait
- compact landscape up to 900×520
- desktop rules preserved outside the mobile breakpoint

Key corrections:
- isolated room scene from the task list with a fixed scene boundary;
- separated header copy and statistics into non-intersecting zones;
- restored room furniture while keeping safe coordinates;
- moved room progress above the scene boundary;
- replaced horizontally scrolling feature cards with a stable two-column grid;
- added dedicated narrow-phone and landscape overrides;
- synchronized application, PWA, Worker and cache versions.
