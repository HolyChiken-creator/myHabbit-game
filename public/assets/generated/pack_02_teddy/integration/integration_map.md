# PACK 02 — Integration Map

Copy unchanged to `public/assets/generated/pack_02_teddy/`.

Recommended mapping:
- default: `webp/teddy_emotion_neutral_01.webp`
- task complete: `webp/teddy_emotion_happy_01.webp`
- large reward: `webp/teddy_emotion_celebrating_01.webp`
- evening: `webp/teddy_action_read_book_01.webp`
- sleep: `webp/teddy_action_sleep_01.webp`

```css
.teddy-companion {
  width: clamp(180px, 32vw, 420px);
  aspect-ratio: 1;
  object-fit: contain;
  object-position: 50% 100%;
  pointer-events: none;
}
```

No current application file is replaced automatically.
