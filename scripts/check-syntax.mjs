import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';
for(const file of ['src/worker.js','public/app.js','public/boot.js','public/game-rules.js','public/game-content.js','public/sw.js']){
  const result=spawnSync(process.execPath,['--check',file],{stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);
}
const html=readFileSync('public/index.html','utf8');
for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);
console.log('JavaScript syntax is valid.');
