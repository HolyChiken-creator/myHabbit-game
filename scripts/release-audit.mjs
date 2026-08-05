import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const required=['public/index.html','public/app.js','public/styles.css','public/sw.js','public/manifest.webmanifest','src/worker.js','wrangler.jsonc','public/assets/game/room-1.webp','public/assets/game/room-5.webp','public/assets/game/room-20.webp','public/assets/game/room-50.webp'];
const errors=[];
for(const f of required) if(!fs.existsSync(path.join(root,f))) errors.push(`Missing: ${f}`);
for(const f of fs.readdirSync(path.join(root,'public/content'),{recursive:true}).filter(x=>String(x).endsWith('.json'))){
  try{JSON.parse(fs.readFileSync(path.join(root,'public/content',f),'utf8'));}catch(e){errors.push(`Invalid JSON: public/content/${f}: ${e.message}`)}
}
const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'public/manifest.webmanifest'),'utf8'));
if(pkg.name!=='myhabbit-game') errors.push('package name mismatch');
if(pkg.version!=='12.0.8') errors.push('package version mismatch');
if(manifest.x_myhabbit_version!=='12.0.8') errors.push('manifest version mismatch');
const wrangler=fs.readFileSync(path.join(root,'wrangler.jsonc'),'utf8');
if(!wrangler.includes('"name": "myhabbit-game"')) errors.push('worker name mismatch');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('Release audit passed.');
