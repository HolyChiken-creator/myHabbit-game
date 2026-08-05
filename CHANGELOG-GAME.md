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
