# myHabbit-game 12.0.9

Packaging repair release. The update-only ZIP is intentionally flat: its files start at repository root, so applying it in a Pull Request overwrites the active Cloudflare build files instead of creating a nested `myHabbit-game/` directory.

Verification after deploy: open `/VERSION.txt`; it must show `12.0.9`.
