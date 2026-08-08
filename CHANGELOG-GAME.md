# 12.0.4 — Premium Room Polish

- Кімната автоматично змінює атмосферу залежно від часу доби.
- Тедик отримав повноцінне обличчя, чашку, idle-анімацію та доступний focus-стан.
- Декор більше не залежить від випадкового вигляду системних емодзі.
- Покращено завдання, картки переходів, світло, тіні й адаптивність.

# 12.0.2 — Clean Room Foundation

- Removed the concept screenshot from the live home screen.
- Added a clean layered room scene without baked-in buttons or text.
- Rebuilt Teddy as an interactive foreground companion.
- Reorganized stats, room progress and daily quests into a coherent game HUD.
- Improved desktop and mobile responsive layout.

# 12.0.2 — PR deploy fix

- Виправлено пошкоджений loader `app.js` у `public/index.html`.
- Додано fallback при помилці завантаження застосунку.
- Оновлено cache-busting і Service Worker cache до 12.0.2.

# myHabbit-game 12.0.2

- Новий ігровий домашній екран у стилі затишної кімнати.
- Тедик став центральним живим компаньйоном.
- Кімната має 4 візуальні стадії: старт, рівень 5, рівень 20, рівень 50.
- Справи дня показуються як інтерактивні картки просто в кімнаті.
- Додані швидкі входи в дерево звичок, сімʼю, досягнення, магазин та mini-game.
- Додана репутація родини та відображення прогресу кімнати.
- Повністю збережено існуючу логіку сімей, синхронізації, квестів, магазину, колекцій, admin/owner функцій.
- Проєкт перейменовано для окремого GitHub/Cloudflare середовища: `myHabbit-game` / `myhabbit-game`.

## 12.0.4 — Mobile-first room rebuild
- Rebuilt the home room layout for narrow phones instead of shrinking the desktop canvas.
- Separated the scene and daily tasks vertically to prevent overlays and clipped controls.
- Added safe-area spacing, compact scrollable stats, one-column mobile task cards, bottom-sheet modals, and landscape handling.
- Improved mobile layouts for quests, grids, profile, shop, achievements, and toast placement.
