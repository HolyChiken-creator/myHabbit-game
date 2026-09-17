## 12.24.0 — JSON login on a new device
- Quick-login JSON is validated by the server before it is stored or opened.
- New devices receive the fresh server state and then restart through the authenticated bootstrap, so live sync/presence start correctly.
- Invalid or revoked JSON keys now show a clear error instead of a false local login.
- Teddy room behavior is unchanged.

## 12.23.9 — Family Home Evolution
- Сімейний дім тепер автоматично розвивається за рівнями сімʼї 1 / 5 / 10 / 20 / 35.
- Ручне «Оформлення сімʼї» прибрано з користувацького екрана; legacy-дані зберігаються для сумісності.
- Особиста кімната Теда навмисно не змінювалась: магазин, декор, анімації, прокачка та owner-layout залишилися логікою 12.23.8.
## 12.23.7
- Preserve pending profile JSON across session bootstrap and 409 conflicts.
- Export quick-login and encrypted profile JSON from the current persisted account snapshot.

## 12.23.6
- Added an authenticated session bootstrap gate so demo seed data never appears before the real profile is restored.
- Added safe offline fallback only for a matching locally confirmed user and a retry state when no trustworthy session can be restored.

## 12.23.3 — Wider mobile room workshop
- Gave the mobile workshop and item cards a little more horizontal space.
- Enlarged mobile item previews slightly while keeping the compact independent scroller.
- Made the empty-state preview hint non-blocking and fixed to its own footer row.

## 12.23.2 — Compact room workshop

- Teddy room stays visible while the structured decor workshop uses its own vertical scroller.
- Desktop uses a room + compact side workshop; mobile keeps the room above a bounded workshop panel. Category tabs show one structured card set at a time.
- Preview/buy/equip no longer moves the page. The shop keeps category structure instead of showing one long list.

## 12.23.1 — Owner seasonal sticker purchase authorization
- Fixed Owner Console seasonal sticker testing so the server authorizes Christmas, Halloween and Egg Party box purchases while the switch is enabled.
- The same server-side override now applies to sticker-dust exchange for those seasonal collections.
- The override is read from trusted Owner storage on the server and cannot be enabled by a forged client action.

## 12.11.0
- Inline Teddy-room editor and clean room viewport.

## 12.10.0
- Teddy Room composition pass: coherent room geometry and protected Teddy safe zone.
- Removed scene `+` hotspots.
- Draggable/resizable, more transparent renovation studio with repaired scrolling.
- Admin command to unlock all room decor without progression.

# 12.9.0 — Teddy Room floating renovation sheet

- Renovation controls no longer resize or squeeze the Teddy Room scene.
- Removed automatic scroll-into-view jump when opening the room studio.
- The studio now opens as a lightweight translucent glass sheet anchored beneath the room on desktop.
- On phones the studio behaves as a compact fixed bottom sheet with safe-area support.
- Style choices remain horizontally swipeable with snap scrolling and preserved live preview.
- Added a subtle one-time opening motion without reanimating on every preview selection.

# 12.8.0 — Teddy Room geometry & touch UX

- Rebuilt the starter room perspective so the back wall, ceiling, floor, balcony and staircase share one coherent vanishing geometry.
- Reduced the oversized/skewed staircase and aligned doors, window, fireplace, furniture zones and Teddy to the same room plane.
- Made the live decor studio vertically scrollable on touch devices and the style/category rails momentum-scrollable with scroll snapping.
- Preserved the horizontal scroll position after live previews so trying an item no longer jumps the carousel back to the start.
- Enlarged touch targets, added press feedback and light/medium haptics for preview and purchase actions.
- Added an explicit swipe hint on touch layouts while keeping the studio outside the room so Teddy remains visible.

# 12.7.0 — Live Teddy Room studio

- Replaced the blocking room-decoration modal with a live side/bottom studio.
- Added instant temporary previews beside Teddy before spending crystals.
- Added explicit Buy & Equip / Equip / Revert Preview controls.
- Locked tiers remain previewable but cannot be purchased early.
- Closing the studio never saves a preview.

# 12.6.0 — Teddy Room master renovation

- Rebuilt Teddy Room around one persistent 2.5D room instead of background swaps.
- Expanded renovation from 8 to 15 independently upgradeable zones.
- Added a sparse starter room, staircase, upper rail, door, window, fireplace shell and perspective floor.
- Added four renovation stages and suggested next upgrades.
- Added sequential tier requirements so final furniture cannot be skipped directly.
- Reused transparent furniture art for armchair, bookcase, lamp, plants and collection props.
- Renovation progress tracks the best unlocked tier even when an older style is equipped.
- Added the room art dependencies to the offline PWA cache and release audit.

## 12.5.0 — Teddy Room Renovation
- Rebuilt Teddy’s room as a layered 3D renovation scene without a baked room background.
- Added empty starter state, upgrade hotspots and tiered room decoration.
- Added crystal rewards to quests, streak milestones and level-ups, plus admin crystal grants.

## 12.4.0 — Room Workshop and Match-3 variety

- Restored diamonds as a dedicated room-decoration currency and added a safe 40-diamond migration balance for profiles that never had this field.
- Added 24 room decorations across ceiling, walls, floor, table, tabletop, rug, corner props, and lighting.
- Rebuilt Teddy’s dashboard room as a deeper layered scene with perspective, lighting, props, and larger companion presentation.
- Added Match-3 board size/theme/difficulty progression plus hammer, shuffle, and full-board fire boosters.
- Added the full-table burn/rebirth animation and diamond rewards for completed Match-3 levels.
- Added deterministic booster replay tests, room economy tests, schema migration for old Match-3 sessions, and dynamic release-version audit checks.

## 11.3.2 — session persistence and maintenance hotfix

- Removed the duplicate “Replay introduction” Teddy action; one manual tour remains.
- Preserved earned achievements, featured achievements, level rewards, XP, levels, streaks, skills, and counters when a browser session pulls an older server snapshot.
- Fixed Owner maintenance mode: it now saves visibly, creates an owner log entry, bumps the client cache revision, and shows a full maintenance screen to users.
- Added automatic maintenance status re-check every 30 seconds and a manual “Check again” button.
- Updated PWA cache to 11.3.2.

## 11.3.1 — complete English UI pass and mobile layout repair

- Completed a broad English localization pass across dashboard, quests, Match-3, shop, collections, museum, achievements, admin panels, dialogs, buttons, badges, and dynamic progress text.
- Replaced mixed Ukrainian/English phrases with natural context-aware English.
- Fixed the Admin sections title and subtitle collision on mobile.
- Fixed long translated headings, descriptions, achievement cards, and collection cards wrapping on iPhone.
- Kept Teddy onboarding and daily tips manual-only for returning users.
- Updated PWA cache to 11.3.1.

## 11.3.0 — Private Family Hall, evolving Family Home and localization pass

- Added a private Family Hall with every visible member and their shared contribution.
- Added an evolving Family Home tied to the existing family level system.
- Teddy now visually evolves with the family level.
- Kept onboarding and daily tips manual-only for returning users.
- Expanded English localization for all new family-level screens and messages.
- Updated PWA cache to 11.3.0.

# Changelog

## 11.2.4
- Added safe one-step transfer of family administrator rights; the previous administrator loses access immediately.
- Expanded and hardened English localization, including dynamically inserted dialogs and subdialogs.
- Added transparent authorship metadata and origin proof markers without hidden access or backdoors.
- Updated PWA cache and project version.

# 11.2.2

- Fixed Owner seasonal sticker testing toggle so the shop refreshes immediately.
- Added 40 animated Christmas Cozy stickers from the supplied pack.
- Added Lottie rendering with safe visual fallback.
- Updated PWA cache revision.

# 11.2.0

- У музеї показуються лише 5 останніх стікерів на телефоні та 10 на великих екранах.
- Натискання на стікер переводить у Колекції та відкриває потрібний альбом.
- Після відкриття боксу можна одразу відкрити наступний, якщо вистачає монет.
- У Owner Console додана помітна кнопка швидкого переходу до тестування сезонних стікерпаків.

# 11.1.6

- Added 50 animated stickers to the Halloween Cute collection.
- Added static WebP posters for faster album previews and mobile fallback.
- Enabled media paths for the Halloween collection.
- Updated PWA cache revision.

# 11.1.5

- Owner-only seasonal sticker testing switch.
- Easter Bunny renamed to Egg Party.
- Dates use day + month without year.
- Bunny Love animated stickers now include poster previews to prevent empty album cells.

# myHabbit 11.1.5

- Bunny Love розширено з 40 до 60 стікерів.
- Додано 20 нових статичних WebP-стікерів без зміни існуючих 40 анімованих.
- Нові стікери отримали нумерацію #041–#060 для колекції та подарунків.
- Оновлено кеш PWA.

# myHabbit 11.1.5

- Зафіксовано портретну орієнтацію для встановленої PWA.
- Виправлено висоту модальних вікон при відкритті клавіатури на iPhone/iPad.
- Поля вводу автоматично прокручуються у видиму частину екрана.
- Кнопки модальних форм залишаються доступними над клавіатурою.
- Оновлено кеш Service Worker.

# Changelog

## 11.1.5

- Fixed repeated Teddy message “Монетки чекають”.
- The coin reminder is now shown once per profile and eligibility cycle.
- The reminder resets only after the balance drops below 1000 coins and later reaches the threshold again.
- Updated PWA cache version.

## 11.1.0

- Підготовлена стабільна база для майбутніх Full та Update-only архівів.
- Зафіксовані постійні шляхи `public/assets/` і `public/assets/stickers/`.
- Додана автоматична перевірка структури перед deploy.
- Узгоджені версії у `package.json`, `VERSION` та `public/VERSION.txt`.
- Додані правила Git, документація структури й процесу патчів.
- Прибрані системні файли `desktop.ini`.

## 11.1.1
- Fixed coin transfer normalize error.
- Sticker reveals now use collection numbers.
- Family Activity strictly isolated by familyId and ignores legacy demo events.
- Reduced Match-3 mobile animation load.

## 11.2.2 — Egg Party & seasonal packs repair
- Added 62 animated Egg Party stickers converted from Telegram TGS to Lottie JSON.
- Fixed Christmas and Halloween collections not updating when an older saved session had the same item count but stale media paths.
- Built-in sticker collection definitions now reconcile on every app upgrade while user ownership remains preserved by sticker ID.
- Improved animated-sticker fallback and diagnostics.

## 11.2.3
- Collaborative family appearance progression with per-member contributions.
- Five unlockable family card themes; admin selects an unlocked style.
- Verified and strengthened Leave a Sticker and Level Rewards actions.
## 11.2.5 — Teddy manual help and onboarding fix

- Teddy no longer starts the onboarding tour automatically.
- Daily advice no longer appears on navigation, login, rerender, or app resume.
- Existing users are never treated as first-time users by Teddy.
- Tour, daily tip, and introduction replay are available only after pressing Teddy.
- Teddy state is isolated per family and per profile.
- Achievement and level celebrations remain event-driven and do not replay after navigation.
- Added natural English translations for every Teddy dialog and action in this flow.
- Updated PWA cache to 11.2.5.


## 11.3.3
- Новий екран технічних робіт на основі фірмового splash-екрана myHabbit.
- Owner може вказати точну дату й час завершення робіт.
- Текст автоматично локалізується українською або англійською.
- Додано повідомлення «Перепрошуємо за незручності 💜✨» / «We apologize for the inconvenience 💜✨».
