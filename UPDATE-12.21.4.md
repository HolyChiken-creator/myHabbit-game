# myHabbit 12.21.4 — iPhone triple-tap fix

Root cause:
iPhone Safari emits PointerEvents and TouchEvents for the same physical tap. The previous implementation listened to both event families. Three physical taps could therefore toggle the hidden editor twice — open, then immediately close — making it appear that triple tap did nothing.

Fix:
- Use only PointerEvents when supported.
- Fall back to TouchEvents only on browsers without PointerEvents.
- Detect a real tap on pointerup/touchend.
- Reject drags and long presses.
- 1500 ms triple-tap window.
- Works for every user who knows the hidden gesture.
