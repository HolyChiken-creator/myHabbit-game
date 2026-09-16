# myHabbit 12.1.0 — Persistent Rewards

Це єдина базова структура проєкту для GitHub, Cloudflare Workers і наступних update-only патчів.

## Головні правила структури

- `src/worker.js` — активний Cloudflare Worker, API та Durable Object.
- `public/` — єдиний корінь PWA та статичних ресурсів.
- `public/assets/` — зображення, досягнення та інші ресурси.
- `public/assets/stickers/` — постійне розташування стікерпаків; шлях не переносити.
- `public/content/` — JSON-каталоги квестів, досягнень, магазину й щоденних завдань.
- `public/icons/` — PWA-іконки та локальні SVG.
- `docs/` — документація структури й правил патчів.
- `scripts/` — локальні перевірки перед Pull Request та deploy.

Не створюйте дублікати `index.html`, `app.js`, `styles.css` або `sw.js` у корені репозиторію. Їхнє робоче місце — тільки `public/`.

## Перевірка

```bash
npm install
npm run check
npm run validate
npm run audit
```

## Deploy

```bash
npm run deploy
```

`predeploy` автоматично перевіряє синтаксис Worker і структуру проєкту.

## Update-only патчі

Патч розпаковується поверх попередньої стабільної версії у новому Git branch. Він повинен містити тільки нові та змінені файли зі збереженням їхніх шляхів. Правила описані у `docs/PATCHING.md`.

## 12.1.0

Gameplay rewards are now issued through `/api/family/action`. Old snapshot writes are rejected; previously queued legacy snapshots are retained for recovery. Define `OWNER_PANEL_SECRET` as a Cloudflare secret before using the owner console; there is no built-in owner password.

The update preserves received achievements and permanent rewards. The new interface uses an SVG room without painted controls.

This change set has not been tested at the user’s request. Run the checks and a two-device acceptance pass before deployment.
