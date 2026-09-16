import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
import {createMatch3,applyMatch3Move} from '../public/game-rules.js';
const source=fs.readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
const code=source.slice(source.indexOf('  async function tryMatch3Swap'),source.indexOf('  function bindMatch3Controls'));
let checked=0;
function hasLine(b,n){for(let r=0;r<n;r++)for(let c=0;c<n;c++){const i=r*n+c;if(c<n-2&&b[i]===b[i+1]&&b[i]===b[i+2])return true;if(r<n-2&&b[i]===b[i+n]&&b[i]===b[i+2*n])return true;}return false;}
for(const level of [1,30,50])for(let seed=1;seed<=20;seed++){
const initial=createMatch3(level,seed),n=initial.cfg.size;for(let a=0;a<n*n;a++)for(const b of [a%n<n-1?a+1:-1,a+n<n*n?a+n:-1]){if(b<0)continue;const board=[...initial.board];[board[a],board[b]]=[board[b],board[a]];const expected=hasLine(board,n);const rt=structuredClone(initial);assert.equal(applyMatch3Move(rt,a,b),expected);if(!expected)assert.deepEqual(rt,initial);checked++;}}
const rt=createMatch3(1,42);rt.cfg.goal=100000;let good,bad;for(let a=0;a<49;a++)for(const b of [a%7<6?a+1:-1,a+7<49?a+7:-1]){if(b<0)continue;const test=structuredClone(rt);if(applyMatch3Move(test,a,b))good??=[a,b];else bad??=[a,b];}
let renders=0;const ctx=vm.createContext({match3Runtime:rt,applyMatch3Move,document:{querySelector:()=>null,querySelectorAll:()=>[]},render:()=>renders++,showToast:()=>{},tr:a=>a,safeJsonWrite:()=>{},match3SaveKey:()=>'',localDay:()=>'',animateMatch3:async()=>{},playCozySound:()=>{},finishMatch3:()=>{},localStorage:{removeItem:()=>{}}});vm.runInContext(code,ctx);
await ctx.clickMatch3(bad[0]);assert.equal(rt.selected,bad[0]);assert.equal(renders,0);await ctx.clickMatch3(bad[1]);assert.equal(rt.selected,bad[0]);assert.equal(rt.moves,26);
rt.selected=null;await ctx.clickMatch3(good[0]);await ctx.clickMatch3(good[1]);assert.equal(rt.moves,25);assert.ok(rt.score>=3);assert.deepEqual(rt.moveLog[0],good);
const restartCode=source.slice(source.indexOf('  async function restartMatch3'),source.indexOf('  function match3Piece'));
ctx.startMatch3=async()=>{ctx.match3Runtime=createMatch3(1,42);};vm.runInContext(restartCode,ctx);await ctx.restartMatch3();assert.deepEqual(ctx.match3Runtime.board,createMatch3(1,42).board);assert.equal(ctx.match3Runtime.moves,26);assert.equal(ctx.match3Runtime.score,0);assert.equal(ctx.match3Runtime.moveLog.length,0);
console.log(`PASS: ${checked} swaps, click selection, invalid move, valid move and restart.`);

