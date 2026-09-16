import assert from 'node:assert/strict';
import {normalizeGame,applyGameAction,ROOM_DECOR_CATALOG} from '../public/game-rules.js';

const state={meta:{},family:{id:'f1',level:1,xp:0,coins:0},users:[{id:'u1',name:'Test',role:'owner',level:1,xp:0,coins:0}],quests:[],shop:[],history:[],questTemplateSettings:{}};
normalizeGame(state,Date.parse('2026-09-16T12:00:00Z'));
const u=state.users[0];
assert.equal(u.diamonds,8);
assert.equal(Object.keys(u.roomDecor).length,8);
assert.equal(u.roomDecor.ceiling,'ceiling-basic');
assert.equal(u.roomDecor.walls,'walls-basic');
assert.equal(u.roomDecor.floor,'floor-basic');
assert.equal(u.roomDecor.table,'table-none');
assert.equal(u.roomDecor.tabletop,'tabletop-empty');
assert.equal(u.roomDecor.rug,'rug-none');
assert.equal(u.roomDecor.corner,'corner-empty');
assert.equal(u.roomDecor.light,'light-basic');
for(const slot of new Set(ROOM_DECOR_CATALOG.map(x=>x.slot)))assert.ok(u.roomDecor[slot]);

const item=ROOM_DECOR_CATALOG.find(x=>x.id==='walls-honey');
const result=applyGameAction(state,u.id,{type:'room-decor-buy',itemId:item.id},Date.parse('2026-09-16T12:00:00Z'));
assert.equal(result.itemId,item.id);
assert.equal(u.diamonds,0);
assert.equal(u.roomDecor.walls,item.id);
assert.ok(u.roomDecorOwned.includes(item.id));
assert.equal(u.stats.roomDecorPurchased,1);

applyGameAction(state,u.id,{type:'room-decor-equip',itemId:'walls-basic'},Date.parse('2026-09-16T12:00:00Z'));
assert.equal(u.roomDecor.walls,'walls-basic');
applyGameAction(state,u.id,{type:'room-decor-equip',itemId:item.id},Date.parse('2026-09-16T12:00:00Z'));
assert.equal(u.diamonds,0); // no repeat charge

assert.throws(()=>applyGameAction(state,u.id,{type:'room-decor-buy',itemId:'table-round'},Date.parse('2026-09-16T12:00:00Z')),/Недостатньо діамантів/);
assert.equal(u.diamonds,0);
console.log('PASS: bare 3D starter room, decoration purchase/equip and insufficient-crystal protection.');
