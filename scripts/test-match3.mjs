import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createMatch3,applyMatch3Move,applyMatch3Booster,applyMatch3Command,match3Config} from '../public/game-rules.js';

const source=fs.readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
const code=source.slice(source.indexOf('  async function tryMatch3Swap'),source.indexOf('  function bindMatch3Controls'));
let checked=0;

function hasLine(b,n){
  for(let r=0;r<n;r++)for(let c=0;c<n;c++){
    const i=r*n+c;
    if(c<n-2&&b[i]===b[i+1]&&b[i]===b[i+2])return true;
    if(r<n-2&&b[i]===b[i+n]&&b[i]===b[i+2*n])return true;
  }
  return false;
}

for(const level of [1,6,15,30,50])for(let seed=1;seed<=12;seed++){
  const initial=createMatch3(level,seed),n=initial.cfg.size;
  assert.equal(initial.board.length,n*n);
  assert.equal(initial.cfg.schema,3);
  for(let a=0;a<n*n;a++)for(const b of [a%n<n-1?a+1:-1,a+n<n*n?a+n:-1]){
    if(b<0)continue;
    const board=[...initial.board];[board[a],board[b]]=[board[b],board[a]];
    const expected=hasLine(board,n),rt=structuredClone(initial);
    assert.equal(applyMatch3Move(rt,a,b),expected);
    if(!expected)assert.deepEqual(rt,initial);
    checked++;
  }
}

// Board configuration now materially changes with progression.
assert.notEqual(match3Config(1).size,match3Config(2).size);
assert.notEqual(match3Config(1).theme,match3Config(4).theme);
assert.ok(match3Config(45).moves<match3Config(1).moves);
assert.equal(match3Config(2).boosters.fire,0);
assert.equal(match3Config(3).boosters.fire,1);

// Boosters are deterministic and replayable by the server command log.
{
  const base=createMatch3(3,12345),hammer=structuredClone(base),frames=[];
  assert.equal(applyMatch3Booster(hammer,'hammer',0,f=>frames.push(f)),true);
  assert.equal(hammer.boosters.hammer,0);assert.equal(hammer.score,1);
  assert.equal(frames[0].kind,'hammer');assert.equal(hammer.moveLog.at(-1).kind,'hammer');
  const replay=structuredClone(base);assert.equal(applyMatch3Command(replay,hammer.moveLog.at(-1)),true);
  assert.deepEqual(replay.board,hammer.board);assert.equal(replay.score,hammer.score);
}
{
  const base=createMatch3(3,777),fire=structuredClone(base),frames=[];
  assert.equal(applyMatch3Booster(fire,'fire',undefined,f=>frames.push(f)),true);
  assert.equal(fire.boosters.fire,0);assert.ok(fire.score>=6);
  assert.deepEqual(frames.map(f=>f.kind),['fire','rebirth']);
  assert.equal(frames[0].hit.length,base.board.length);
  const replay=structuredClone(base);assert.equal(applyMatch3Command(replay,fire.moveLog.at(-1)),true);
  assert.deepEqual(replay.board,fire.board);assert.equal(replay.seed,fire.seed);assert.equal(replay.score,fire.score);
}

// Click selection and swap UX remain correct on variable board sizes.
const rt=createMatch3(1,42);rt.cfg.goal=100000;const n=rt.cfg.size;let good,bad;
for(let a=0;a<n*n;a++)for(const b of [a%n<n-1?a+1:-1,a+n<n*n?a+n:-1]){
  if(b<0)continue;const test=structuredClone(rt);if(applyMatch3Move(test,a,b))good??=[a,b];else bad??=[a,b];
}
assert.ok(good&&bad);
let renders=0;
const ctx=vm.createContext({match3Runtime:rt,match3BoosterMode:null,useMatch3Booster:async()=>false,applyMatch3Move,document:{querySelector:()=>null,querySelectorAll:()=>[]},render:()=>renders++,showToast:()=>{},tr:a=>a,safeJsonWrite:()=>{},match3SaveKey:()=>'',localDay:()=>'',animateMatch3:async()=>{},playCozySound:()=>{},finishMatch3:()=>{},localStorage:{removeItem:()=>{}}});
vm.runInContext(code,ctx);
await ctx.clickMatch3(bad[0]);assert.equal(rt.selected,bad[0]);assert.equal(renders,0);
const beforeInvalidMoves=rt.moves;await ctx.clickMatch3(bad[1]);assert.equal(rt.selected,bad[0]);assert.equal(rt.moves,beforeInvalidMoves);
rt.selected=null;const beforeValidMoves=rt.moves;await ctx.clickMatch3(good[0]);await ctx.clickMatch3(good[1]);assert.equal(rt.moves,beforeValidMoves-1);assert.ok(rt.score>=3);assert.deepEqual(rt.moveLog[0],good);

const restartCode=source.slice(source.indexOf('  async function restartMatch3'),source.indexOf('  function match3Piece'));
ctx.startMatch3=async()=>{ctx.match3Runtime=createMatch3(1,42);};vm.runInContext(restartCode,ctx);await ctx.restartMatch3();
const fresh=createMatch3(1,42);assert.deepEqual(ctx.match3Runtime.board,fresh.board);assert.equal(ctx.match3Runtime.moves,fresh.cfg.moves);assert.equal(ctx.match3Runtime.score,0);assert.equal(ctx.match3Runtime.moveLog.length,0);
console.log(`PASS: ${checked} swaps across variable boards + progression + hammer/fire replay + click UX + restart.`);
