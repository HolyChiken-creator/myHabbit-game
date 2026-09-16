import assert from 'node:assert/strict';
import {normalizeGame,applyGameAction,ROOM_DECOR_CATALOG} from '../public/game-rules.js';

const state={meta:{},family:{id:'f1',level:1,xp:0,coins:0},users:[{id:'u1',name:'Test',role:'owner',level:1,xp:0,coins:0}],quests:[],shop:[],history:[],questTemplateSettings:{}};
normalizeGame(state,Date.parse('2026-09-16T12:00:00Z'));
const u=state.users[0];
assert.equal(u.diamonds,40);
assert.equal(Object.keys(u.roomDecor).length,8);
assert.equal(u.roomDecorOwned.length,8);
for(const slot of new Set(ROOM_DECOR_CATALOG.map(x=>x.slot)))assert.ok(u.roomDecor[slot]);

const item=ROOM_DECOR_CATALOG.find(x=>x.id==='ceiling-stars');
const result=applyGameAction(state,u.id,{type:'room-decor-buy',itemId:item.id},Date.parse('2026-09-16T12:00:00Z'));
assert.equal(result.itemId,item.id);
assert.equal(u.diamonds,40-item.price);
assert.equal(u.roomDecor.ceiling,item.id);
assert.ok(u.roomDecorOwned.includes(item.id));

applyGameAction(state,u.id,{type:'room-decor-equip',itemId:'ceiling-warm'},Date.parse('2026-09-16T12:00:00Z'));
assert.equal(u.roomDecor.ceiling,'ceiling-warm');
applyGameAction(state,u.id,{type:'room-decor-equip',itemId:item.id},Date.parse('2026-09-16T12:00:00Z'));
assert.equal(u.diamonds,22); // no repeat charge

assert.throws(()=>applyGameAction(state,u.id,{type:'room-decor-buy',itemId:'table-marble'},Date.parse('2026-09-16T12:00:00Z')),/Недостатньо діамантів/);
assert.equal(u.diamonds,22);
console.log('PASS: room decor migration, purchase, equip and insufficient-diamond protection.');
