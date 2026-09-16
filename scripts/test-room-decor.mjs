import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {normalizeGame,applyGameAction,ROOM_DECOR_CATALOG,roomDecorPrerequisite} from '../public/game-rules.js';

const now=Date.parse('2026-09-16T12:00:00Z');
const state={meta:{},family:{id:'f1',level:1,xp:0,coins:0},users:[{id:'u1',name:'Test',role:'owner',level:1,xp:0,coins:0}],quests:[],shop:[],history:[],questTemplateSettings:{}};
normalizeGame(state,now);
const u=state.users[0];
const slots=[...new Set(ROOM_DECOR_CATALOG.map(x=>x.slot))];
assert.equal(u.diamonds,8);
assert.equal(slots.length,15);
assert.equal(Object.keys(u.roomDecor).length,15);
for(const slot of slots){
  const starter=ROOM_DECOR_CATALOG.find(x=>x.slot===slot&&x.tier===0);
  assert.ok(starter,`missing starter for ${slot}`);
  assert.equal(u.roomDecor[slot],starter.id);
  assert.ok(u.roomDecorOwned.includes(starter.id));
}
assert.equal(u.roomDecor.seat,'seat-none');
assert.equal(u.roomDecor.storage,'storage-none');
assert.equal(u.roomDecor.window,'window-bare');
assert.equal(u.roomDecor.fireplace,'fireplace-cold');

const item=ROOM_DECOR_CATALOG.find(x=>x.id==='walls-honey');
const result=applyGameAction(state,u.id,{type:'room-decor-buy',itemId:item.id},now);
assert.equal(result.itemId,item.id);
assert.equal(u.diamonds,0);
assert.equal(u.roomDecor.walls,item.id);
assert.ok(u.roomDecorOwned.includes(item.id));
assert.equal(u.stats.roomDecorPurchased,1);

applyGameAction(state,u.id,{type:'room-decor-equip',itemId:'walls-basic'},now);
assert.equal(u.roomDecor.walls,'walls-basic');
applyGameAction(state,u.id,{type:'room-decor-equip',itemId:item.id},now);
assert.equal(u.diamonds,0); // no repeat charge

assert.throws(()=>applyGameAction(state,u.id,{type:'room-decor-buy',itemId:'table-round'},now),/Недостатньо діамантів/);
assert.equal(u.diamonds,0);

// Higher tiers cannot be skipped even if the player has enough crystals.
u.diamonds=200;
const sage=ROOM_DECOR_CATALOG.find(x=>x.id==='walls-sage');
assert.equal(roomDecorPrerequisite(sage)?.id,'walls-honey');
// honey is already owned, so tier 2 is valid now.
applyGameAction(state,u.id,{type:'room-decor-buy',itemId:'walls-sage'},now);
assert.equal(u.roomDecor.walls,'walls-sage');
const night=ROOM_DECOR_CATALOG.find(x=>x.id==='walls-night');
assert.equal(roomDecorPrerequisite(night)?.id,'walls-sage');

const fresh={meta:{},family:{id:'f2',level:1,xp:0,coins:0},users:[{id:'u2',name:'Fresh',role:'owner',level:1,xp:0,coins:0,diamonds:200}],quests:[],shop:[],history:[],questTemplateSettings:{}};
normalizeGame(fresh,now);
assert.throws(()=>applyGameAction(fresh,'u2',{type:'room-decor-buy',itemId:'seat-loveseat'},now),/Спочатку відкрийте/);
applyGameAction(fresh,'u2',{type:'room-decor-buy',itemId:'seat-armchair'},now);
applyGameAction(fresh,'u2',{type:'room-decor-buy',itemId:'seat-loveseat'},now);
assert.equal(fresh.users[0].roomDecor.seat,'seat-loveseat');

const appSource=readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
assert.match(appSource,/function roomPreviewUser\(u\)/);
assert.match(appSource,/class=\"room-live-studio\"/);
assert.match(appSource,/data-action=\"room-decor-preview\"/);
assert.match(appSource,/data-action=\"room-decor-confirm\"/);
assert.match(appSource,/Зараз це лише примірка/);
assert.match(appSource,/roomStudioScrollState/);
assert.match(appSource,/captureRoomStudioScroll/);
assert.match(appSource,/restoreRoomStudioScroll/);
assert.match(appSource,/Гортай стилі пальцем/);
assert.match(appSource,/cozyHaptic\('light'\)/);
assert.doesNotMatch(appSource,/function roomDecorModal\(/);

const homeCss=readFileSync(new URL('../public/home.css',import.meta.url),'utf8');
assert.match(homeCss,/12\.8\.0 — corrected Teddy Room perspective/);
assert.match(homeCss,/scroll-snap-type:x mandatory/);
assert.match(homeCss,/touch-action:pan-x/);
assert.match(homeCss,/clip-path:polygon\(9% 0,91% 0,100% 100%,0 100%\)/);

console.log('PASS: 15-zone persistent Teddy room + corrected perspective + tactile scroll-safe live preview.');
