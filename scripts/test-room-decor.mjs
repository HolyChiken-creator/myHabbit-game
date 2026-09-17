import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {normalizeGame,applyGameAction,ROOM_DECOR_CATALOG,roomDecorPrerequisite} from '../public/game-rules.js';

const now=Date.parse('2026-09-17T00:00:00Z');
const state={meta:{},family:{id:'f1',level:1,xp:0,coins:0},users:[{id:'u1',name:'Test',role:'owner',level:1,xp:0,coins:0}],quests:[],shop:[],history:[],questTemplateSettings:{}};
normalizeGame(state,now);
const u=state.users[0];
const slots=[...new Set(ROOM_DECOR_CATALOG.map(x=>x.slot))];
assert.equal(u.diamonds,8);
assert.deepEqual(slots.sort(),['armchair','background','bookshelf','clock','fireplace','lamp','painting','plant','rug','table','window'].sort());
assert.equal(Object.keys(u.roomDecor).length,11);

for(const slot of slots){
  const starter=ROOM_DECOR_CATALOG.find(x=>x.slot===slot&&x.tier===0);
  assert.ok(starter,`missing starter for ${slot}`);
  assert.equal(u.roomDecor[slot],starter.id);
  assert.ok(u.roomDecorOwned.includes(starter.id));
  assert.equal(ROOM_DECOR_CATALOG.filter(x=>x.slot===slot).length,slot==='background'?5:6);
}

// Each object is bought independently for diamonds.
const bg1=ROOM_DECOR_CATALOG.find(x=>x.id==='background-cozy');
u.diamonds=100;
applyGameAction(state,u.id,{type:'room-decor-buy',itemId:bg1.id},now);
assert.equal(u.roomDecor.background,'background-cozy');
assert.equal(u.diamonds,100-bg1.price);

const chair1=ROOM_DECOR_CATALOG.find(x=>x.id==='armchair-cozy');
u.diamonds=chair1.price-1;
assert.throws(()=>applyGameAction(state,u.id,{type:'room-decor-buy',itemId:chair1.id},now),/Недостатньо діамантів/);
u.diamonds=1000;
applyGameAction(state,u.id,{type:'room-decor-buy',itemId:chair1.id},now);
assert.equal(u.roomDecor.armchair,'armchair-cozy');

// Tier order is per object, not whole-room.
const chair2=ROOM_DECOR_CATALOG.find(x=>x.id==='armchair-warm');
assert.equal(roomDecorPrerequisite(chair2)?.id,'armchair-cozy');
applyGameAction(state,u.id,{type:'room-decor-buy',itemId:chair2.id},now);
assert.equal(u.roomDecor.armchair,'armchair-warm');

const fresh={meta:{},family:{id:'f2',level:1,xp:0,coins:0},users:[{id:'u2',name:'Fresh',role:'member',level:1,xp:0,coins:0,diamonds:200}],quests:[],shop:[],history:[],questTemplateSettings:{}};
normalizeGame(fresh,now);
assert.throws(()=>applyGameAction(fresh,'u2',{type:'room-decor-buy',itemId:'window-warm'},now),/Спочатку відкрийте/);

// Only admin/owner can save the canonical layout.
const layout={1:{window:{x:4,y:8,w:26,z:5},teddy:{x:39,y:34,w:22,z:20}}};
applyGameAction(state,u.id,{type:'room-layout-save',layout},now);
assert.equal(state.roomLayoutMaster[1].window.x,4);
assert.throws(()=>applyGameAction(fresh,'u2',{type:'room-layout-save',layout},now),/Лише адміністратор/);

const appSource=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
assert.match(appSource,/function roomPreviewUser\(u\)/);
assert.match(appSource,/class="room-live-studio room-inline-studio"/);
assert.match(appSource,/data-action="room-decor-preview"/);
assert.match(appSource,/data-action="room-decor-confirm"/);
assert.match(appSource,/\$\{roomStatusBar\(u\)\}\$\{roomDecorStudio\(u\)\}/);
assert.doesNotMatch(appSource,/window\.myHabbitSaveRoomLayout/);
assert.match(appSource,/data-room-source-\$\{slot\}/);
assert.doesNotMatch(appSource,/\$\{roomThemeShopMarkup\(currentUser\(\)\)\}/);

const controller=readFileSync(new URL('../public/room-master-controller.js',import.meta.url),'utf8');
assert.match(controller,/ensureTripleTapDelegate/);
assert.match(controller,/isAdminRoom/);
assert.doesNotMatch(controller,/saveGlobal:persistGlobal/);
assert.match(controller,/\/api\/app-room-layout/);
assert.match(controller,/sourceFor/);

const css=readFileSync(new URL('../public/home.css',import.meta.url),'utf8');
assert.match(css,/12\.21\.0 — per-object Teddy room upgrades/);
assert.match(css,/room-inline-studio/);
assert.match(css,/room-live-style>img/);
assert.match(appSource,/class="room-workshop-scroll"/);
assert.match(appSource,/scrollRoomWorkshopGroup/);
assert.match(appSource,/shop:shop\?\.scrollTop/);
assert.match(css,/12\.23\.2 — split room workshop/);
assert.match(css,/\.room-workshop-scroll\{[\s\S]*?overflow-y:auto/);
assert.match(css,/grid-template-areas:"scene workshop" "status workshop"/);
assert.match(css,/height:min\(520px,calc\(100svh - 16px\)\)/);

console.log('PASS: 11-slot per-object Teddy room shop + Step 0 defaults + owner-console global layout path.');

const fixedApp=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
assert.match(fixedApp,/let roomStudioSlot='background'/);
assert.match(fixedApp,/ROOM_DECOR_SLOT_NAMES\[roomStudioSlot\]\?roomStudioSlot:'background'/);
assert.doesNotMatch(fixedApp,/roomStudioSlot='seat'/);
const fixedController=readFileSync(new URL('../public/room-master-controller.js',import.meta.url),'utf8');
assert.match(fixedController,/now-t<1500/);

const openController=readFileSync(new URL('../public/room-master-controller.js',import.meta.url),'utf8');
const tripleBlock=openController.match(/function registerTripleStart\(ev\)[\s\S]*?function bindObjectEvents/)[0];
assert.doesNotMatch(tripleBlock,/isAdminRoom\(room\(\)\)/);
assert.match(tripleBlock,/tapTimes\.length>=3/);
const statusApp=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
assert.match(statusApp,/data-action="room-decor">\$\{next\?tr\('Прокачати','Upgrade'\)/);
assert.doesNotMatch(statusApp,/Прокачати','Upgrade'\)\} · \$\{next\.price\}/);

assert.doesNotMatch(fixedController,/if\(isAdminRoom\(el\)\)bindTripleTap\(companion\)/);
assert.match(fixedController,/if\(window\.PointerEvent\)/);
assert.match(fixedController,/document\.addEventListener\('pointerup',registerTripleEnd/);
assert.match(fixedController,/document\.addEventListener\('touchend',registerTripleEnd/);
assert.match(fixedController,/use exactly one input event family/);

const secretApp=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
assert.match(secretApp,/release-label site-version-trigger/);
const secretController=readFileSync(new URL('../public/room-master-controller.js',import.meta.url),'utf8');
assert.match(secretController,/closest\?\.\('\.site-version-trigger'\)/);

const smoothController=readFileSync(new URL('../public/room-master-controller.js',import.meta.url),'utf8');
assert.doesNotMatch(smoothController,/bindTripleTap\(companion\)/);
assert.doesNotMatch(smoothController,/data-rm-save-global/);
assert.match(smoothController,/if\(!editorOpen\)\{/);
assert.match(smoothController,/sizeInput\.oninput/);
assert.doesNotMatch(smoothController,/save\(\);persistGlobal\(\);\s*render\(\);/);


// 12.22.7 regressions: preview stays smooth; confirmed decor triggers Teddy wave + magic item transform.
assert.match(appSource,/dispatchEvent\(new CustomEvent\('teddy-room-upgraded'/);
assert.doesNotMatch(appSource,/data-action="owner-room-edit"/);
assert.doesNotMatch(appSource,/data-action="owner-room-save-global"/);
assert.doesNotMatch(appSource,/data-action="owner-room-import"/);
const workerSource=readFileSync(new URL('../src/worker.js',import.meta.url),'utf8');
assert.match(workerSource,/\/api\/owner\/room-layout/);
assert.match(workerSource,/\/api\/app-room-layout/);
assert.match(workerSource,/id="room-layout-section"/);
assert.match(workerSource,/Live master-layout|master-layout/);
assert.match(controller,/room-item-glide/);
assert.match(controller,/playMagicTransform/);
assert.match(controller,/pose='wave'/);
assert.match(workerSource,/ownerRoomExport/);
assert.match(workerSource,/ownerRoomImport/);
assert.match(workerSource,/owner-room-preset-save|ownerRoomPresetKey/);
const roomCss=readFileSync(new URL('../public/room-master.css',import.meta.url),'utf8');
assert.match(roomCss,/aspect-ratio:16\/7/);
assert.match(roomCss,/@keyframes room-item-glide/);
assert.match(roomCss,/@keyframes teddy-magic-wave/);
assert.match(roomCss,/@keyframes room-item-magic/);
assert.match(roomCss,/@keyframes room-magic-spark/);
console.log('PASS: Teddy wave + magic decor transform + live owner-console canonical desktop/mobile layout.');

// 12.24.1 regression: opening/resizing the mobile workshop must not change the Teddy room canvas.
const unifiedCanvasCss=readFileSync(new URL('../public/home.css',import.meta.url),'utf8');
assert.match(unifiedCanvasCss,/12\.24\.1 — one canonical Teddy-room canvas/);
assert.match(unifiedCanvasCss,/room-live-layout\.is-editing\.room-sheet-compact[\s\S]*?aspect-ratio:16\/7!important/);
assert.match(unifiedCanvasCss,/room-live-layout\.is-editing\.room-sheet-normal[\s\S]*?aspect-ratio:16\/7!important/);
assert.match(unifiedCanvasCss,/room-live-layout\.is-editing\.room-sheet-expanded[\s\S]*?aspect-ratio:16\/7!important/);
assert.doesNotMatch(unifiedCanvasCss,/room-live-layout\.is-editing\.room-sheet-(?:compact|normal|expanded) \.renovation-room\{height:clamp/);
assert.doesNotMatch(unifiedCanvasCss,/room-live-layout\.is-editing \.renovation-room\{height:clamp/);
console.log('PASS: static and workshop Teddy-room views share the same canonical 16:7 canvas.');
