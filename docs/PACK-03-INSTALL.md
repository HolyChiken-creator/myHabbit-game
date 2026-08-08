# PACK 03 — встановлення

Це update-only пакет. Вміст архіву потрібно накласти на корінь актуального проєкту myHabbit.

Після розпакування основні файли будуть тут:

- `public/assets/teddy/micro-animations/animated/` — готові анімовані WebP для сайту/PWA.
- `public/assets/teddy/micro-animations/frames/` — окремі PNG-кадри.
- `public/assets/teddy/micro-animations/spritesheets/` — sprite sheets.
- `public/assets/teddy/micro-animations/manifest.json` — список анімацій.
- `public/assets/teddy/teddy-animations.css` — базові адаптивні стилі.

## Найпростіше використання

Підключити CSS у `public/index.html`:

```html
<link rel="stylesheet" href="/assets/teddy/teddy-animations.css">
```

Додати Teddy у потрібне місце:

```html
<img
  class="teddy-micro-animation"
  src="/assets/teddy/micro-animations/animated/teddy_idle.webp"
  alt="Тедик"
  width="320"
  height="320"
>
```

Заміна стану через JavaScript:

```js
const teddy = document.querySelector('.teddy-micro-animation');
teddy.src = '/assets/teddy/micro-animations/animated/teddy_celebrate.webp';
```

Не завантажуйте всі PNG-кадри на старті сторінки. Для звичайного інтерфейсу використовуйте `animated/*.webp`, а `frames/` залишайте для спеціального покадрового керування.
