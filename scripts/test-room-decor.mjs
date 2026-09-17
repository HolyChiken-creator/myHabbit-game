import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {normalizeGame,applyGameAction,ROOM_DECOR_CATALOG,roomDecorPrerequisite} from '../public/game-rules.js';

const now=Date.parse('2026-09-17T00:00:00Z');
const state={meta:{},family:{id:'f1',level:1,xp:0,coins:0},users:[{id:'u1',name:'Test',role:'owner',level:1,xp:0,coins:0}],quests:[],shop:[],history:[],questTemplateSettings:{}};
normalizeGame(state,now);
const u=state.users[0];
const slots=[...new Set(ROOM_DECOR_CATALOG.map(x=>x.slot))];
assert.equal(u.diamonds,8);
assert.deepEqual(slots.sort(),['armchair','background','bookshelf','fireplace','plant','rug','table','window'].sort());
assert.equal(Object.keys(u.roomDecor).length,8);

for(const slot of slots){
  const starter=ROOM_DECOR_CATALOG.find(x=>x.slot===slot&&x.tier===0);
  assert.ok(starter,`missing starter for ${slot}`);
  assert.equal(u.roomDecor[slot],starter.id);
  assert.ok(u.roomDecorOwned.includes(starter.id));
  assert.equal(ROOM_DECOR_CATALOG.filter(x=>x.slot===slot).length,5);
}

// Each object is bought independently for diamonds.
const bg1=ROOM_DECOR_CATALOG.find(x=>x.id==='background-cozy');
applyGameAction(state,u.id,{type:'room-decor-buy',itemId:bg1.id},now);
assert.equal(u.roomDecor.background,'background-cozy');
assert.equal(u.diamonds,4);

const chair1=ROOM_DECOR_CATALOG.find(x=>x.id==='armchair-cozy');
assert.equal(chair1.price,5);
assert.throws(()=>applyGameAction(state,u.id,{type:'room-decor-buy',itemId:chair1.id},now),/Недостатньо діамантів/);
u.diamonds=100;
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
assert.match(appSource,/window\.myHabbitSaveRoomLayout/);
assert.match(appSource,/data-room-source-\$\{slot\}/);
assert.doesNotMatch(appSource,/\$\{roomThemeShopMarkup\(currentUser\(\)\)\}/);

const controller=readFileSync(new URL('../public/room-master-controller.js',import.meta.url),'utf8');
assert.match(controller,/ensureTripleTapDelegate/);
assert.match(controller,/isAdminRoom/);
assert.match(controller,/persistGlobal/);
assert.match(controller,/myHabbitSaveRoomLayout/);
assert.match(controller,/sourceFor/);

const css=readFileSync(new URL('../public/home.css',import.meta.url),'utf8');
assert.match(css,/12\.21\.0 — per-object Teddy room upgrades/);
assert.match(css,/room-inline-studio/);
assert.match(css,/room-live-style>img/);

console.log('PASS: 8-slot per-object Teddy room shop + Step 0 defaults + admin global layout editor.');

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
assert.match(smoothController,/data-rm-save-global/);
assert.match(smoothController,/if\(!editorOpen\)\{/);
assert.match(smoothController,/sizeInput\.oninput/);
assert.doesNotMatch(smoothController,/save\(\);persistGlobal\(\);\s*render\(\);/);
