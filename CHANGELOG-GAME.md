## 12.24.0 — JSON login on a new device
- Quick-login JSON is validated by the server before it is stored or opened.
- New devices receive the fresh server state and then restart through the authenticated bootstrap, so live sync/presence start correctly.
- Invalid or revoked JSON keys now show a clear error instead of a false local login.
- Teddy room behavior is unchanged.

## 12.23.9 — Family Home Evolution
- Сімейний дім тепер автоматично розвивається за рівнями сімʼї 1 / 5 / 10 / 20 / 35.
- Ручне «Оформлення сімʼї» прибрано з користувацького екрана; legacy-дані зберігаються для сумісності.
- Особиста кімната Теда навмисно не змінювалась: магазин, декор, анімації, прокачка та owner-layout залишилися логікою 12.23.8.
# myHabbit-game 12.0.0

- Новий ігровий домашній екран у стилі затишної кімнати.
- Тедик став центральним живим компаньйоном.
- Кімната має 4 візуальні стадії: старт, рівень 5, рівень 20, рівень 50.
- Справи дня показуються як інтерактивні картки просто в кімнаті.
- Додані швидкі входи в дерево звичок, сімʼю, досягнення, магазин та mini-game.
- Додана репутація родини та відображення прогресу кімнати.
- Повністю збережено існуючу логіку сімей, синхронізації, квестів, магазину, колекцій, admin/owner функцій.
- Проєкт перейменовано для окремого GitHub/Cloudflare середовища: `myHabbit-game` / `myhabbit-game`.
