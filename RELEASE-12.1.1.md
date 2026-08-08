# myHabbit 12.1.1 — Core RPG + Teddy achievement fix

## Visible functionality
- Every member can create a personal real-life RPG task with its own XP and coin reward.
- Every member can create a personal real-life reward in the shop and spend earned coins on it.
- Personal tasks and rewards are private to their creator; admin/catalog content remains shared as before.

## Teddy / achievements
- Fixed achievement notification pipeline: achievements now enter the compact top-right toast queue.
- Removed duplicate achievement announcements from Teddy, preventing long queued bubbles and perceived Teddy lag.
- Teddy remains manual for tour/tips; level-up celebration remains event-driven.

## Compatibility
- Existing state remains compatible.
- Existing admin quests/rewards and catalog items are unchanged.
