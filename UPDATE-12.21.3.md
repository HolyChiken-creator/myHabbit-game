# myHabbit 12.21.3 — triple-tap fix for all users

Fixed:
- Removed the leftover admin/owner gate that still prevented binding the Teddy triple-tap on regular accounts.
- Triple-tap is available to every user who knows the hidden gesture.
- Detection now uses delegated `pointerdown` + `touchstart`, so rerenders of Teddy do not break the gesture.
- Triple-tap window increased to 1400 ms for iPhone Safari.
- The hidden editor remains undocumented in the normal UI.

The role restriction is no longer used to open the editor.
