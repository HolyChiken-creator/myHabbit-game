import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const required=['public/index.html','public/app.js','public/styles.css','public/sw.js','public/boot.js','public/game-rules.js','public/game-content.js','public/home.css','public/room.svg','public/manifest.webmanifest','src/worker.js','wrangler.jsonc','public/assets/game/room-1.webp','public/assets/game/room-5.webp','public/assets/game/room-20.webp','public/assets/game/room-50.webp'];
const errors=[];
for(const f of required) if(!fs.existsSync(path.join(root,f))) errors.push(`Missing: ${f}`);
for(const f of fs.readdirSync(path.join(root,'public/content'),{recursive:true}).filter(x=>String(x).endsWith('.json'))){
  try{JSON.parse(fs.readFileSync(path.join(root,'public/content',f),'utf8'));}catch(e){errors.push(`Invalid JSON: public/content/${f}: ${e.message}`)}
}
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'public/manifest.webmanifest'),'utf8'));
const version=fs.readFileSync(path.join(root,'VERSION'),'utf8').trim();
const publicVersion=fs.readFileSync(path.join(root,'public/VERSION.txt'),'utf8').trim();
if(pkg.name!=='myhabbit-game') errors.push('package name mismatch');
if(pkg.version!==version||publicVersion!==version) errors.push(`version mismatch: package=${pkg.version}, VERSION=${version}, public=${publicVersion}`);
if(manifest.x_myhabbit_version!==version) errors.push(`manifest version mismatch: ${manifest.x_myhabbit_version} != ${version}`);
const wrangler=fs.readFileSync(path.join(root,'wrangler.jsonc'),'utf8');
if(!wrangler.includes('"name": "myhabbit-game"')) errors.push('worker name mismatch');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('Release audit passed.');
