import assert from 'node:assert/strict';
import {normalizeGame,applyGameAction} from '../public/game-rules.js';

const now=Date.parse('2026-09-17T12:00:00Z'); // outside Christmas/Halloween/Easter
function makeState(){
  const state={meta:{},family:{id:'f1',level:1,xp:0,coins:0},users:[{id:'u1',name:'Tester',role:'member',level:1,xp:0,coins:5000,stickerDust:500}],quests:[],shop:[],history:[],questTemplateSettings:{}};
  normalizeGame(state,now);
  state.users[0].coins=5000;
  state.users[0].stickerDust=500;
  return state;
}

{
  const state=makeState();
  assert.throws(()=>applyGameAction(state,'u1',{type:'sticker-box',boxId:'box_christmas'},now,()=>0.1),/Сезонний бокс недоступний/);
}
{
  const state=makeState();
  const before=state.users[0].coins;
  const result=applyGameAction(state,'u1',{type:'sticker-box',boxId:'box_christmas'},now,()=>0.1,{seasonalStickerTesting:true});
  assert.ok(result.detail?.sticker || result.sticker);
  assert.equal(state.users[0].coins,before-450);
}
{
  const state=makeState();
  assert.throws(()=>applyGameAction(state,'u1',{type:'dust-exchange',collectionId:'halloween'},now,()=>0.1),/Колекція недоступна/);
  const result=applyGameAction(state,'u1',{type:'dust-exchange',collectionId:'halloween'},now,()=>0.1,{seasonalStickerTesting:true});
  assert.ok(result.detail?.sticker || result.sticker);
  assert.equal(state.users[0].stickerDust,400);
}
console.log('PASS: Owner seasonal testing authorizes server-side box purchases and dust exchange only when trusted context is enabled.');
