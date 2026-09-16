import assert from 'node:assert/strict';
import {normalizeGame,applyGameAction,questDiamondReward} from '../public/game-rules.js';

const now=Date.parse('2026-09-16T12:00:00Z');
const state={meta:{},family:{id:'f1',level:1,xp:0,coins:0},users:[{id:'u1',name:'Test',role:'owner',level:1,xp:0,coins:0}],quests:[
  {id:'easy',title:'Easy',icon:'✓',type:'personal',difficulty:'easy',rewardCoins:10,rewardXp:10,skill:'home',skillXp:2,status:'active',progress:{}},
  {id:'hard',title:'Hard',icon:'★',type:'coop',participants:1,difficulty:'hard',rewardCoins:20,rewardXp:20,skill:'home',skillXp:4,status:'active',progress:{}}
],shop:[],history:[],questTemplateSettings:{}};
normalizeGame(state,now);
const u=state.users[0];
assert.equal(u.diamonds,8);
assert.equal(questDiamondReward(state.quests.find(q=>q.id==='easy')),1);
assert.equal(questDiamondReward(state.quests.find(q=>q.id==='hard')),4);
applyGameAction(state,u.id,{type:'quest-claim',questId:'easy'},now);
const easyResult=applyGameAction(state,u.id,{type:'quest-complete',questId:'easy'},now);
assert.match(easyResult.message,/\+1 💎/);
assert.equal(u.diamonds,9);

// Level-up bonus grants +2 crystals.
u.xp=1495;
state.quests.push({id:'levelup',title:'Level up',icon:'⭐',type:'personal',difficulty:'normal',rewardCoins:0,rewardXp:10,rewardDiamonds:2,skill:'home',skillXp:2,status:'active',progress:{}});
applyGameAction(state,u.id,{type:'quest-claim',questId:'levelup'},now);
applyGameAction(state,u.id,{type:'quest-complete',questId:'levelup'},now);
assert.equal(u.level,2);
assert.ok(u.diamonds>=13); // +2 quest +2 level-up after the easy quest balance of 9
assert.ok(u.stats.diamondsEarned>=5);

// Seven-day streak milestone grants +5 crystals once when the day advances.
u.streak=6;u.lastHabitDay='2026-09-15';
state.quests.push({id:'streak7',title:'Seven days',icon:'🔥',type:'personal',difficulty:'easy',rewardCoins:0,rewardXp:0,rewardDiamonds:1,skill:'home',skillXp:0,status:'active',progress:{}});
applyGameAction(state,u.id,{type:'quest-claim',questId:'streak7'},now);
const beforeStreak=u.diamonds;
applyGameAction(state,u.id,{type:'quest-complete',questId:'streak7'},now);
assert.equal(u.streak,7);
assert.equal(u.diamonds,beforeStreak+6); // +1 quest +5 weekly streak bonus
console.log('PASS: quest crystals are visible/rewarded and level-ups grant crystals.');
