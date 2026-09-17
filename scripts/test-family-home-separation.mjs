import fs from 'node:fs';
const app=fs.readFileSync(new URL('../public/app.js', import.meta.url),'utf8');
function assert(ok,msg){if(!ok){console.error('FAIL',msg);process.exitCode=1}else console.log('PASS',msg)}
assert(app.includes('const FAMILY_HOME_MILESTONES=['),'family home has separate automatic milestones');
assert(!/familyScreen\(\)[\s\S]{0,4000}data-action="family-style"/.test(app),'family screen no longer exposes manual Family Style customization');
assert(app.includes('function roomRenovationProgress(u){'),'Teddy room renovation progression remains present');
assert(app.includes('function roomDecorStudio(u=currentUser()){'),'Teddy room workshop remains present');
assert(app.includes("const progress=roomRenovationProgress(u),preview=roomStudioOpen?roomPreviewItem():null"),'Teddy room scene still uses personal decor progression');
assert(app.includes('data-action="room-decor"'),'Teddy room upgrade action remains available');
assert(app.includes('room-theme-buy'),'Teddy room theme purchase flow remains available');
assert(!/function roomScene[\s\S]{0,1200}familyHomeProgress/.test(app),'Teddy room scene is not driven by family-home progression');
if(!process.exitCode)console.log('Family Home / Teddy Room separation regression: PASS');
