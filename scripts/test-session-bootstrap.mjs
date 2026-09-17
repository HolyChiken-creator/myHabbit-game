import fs from 'node:fs';

const source=fs.readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
const boot=fs.readFileSync(new URL('../public/boot.js',import.meta.url),'utf8');

const startupMarker='(async()=>{\n    window.__MYHABBIT_APP_BOOTSTRAPPING__=true;';
const start=source.indexOf(startupMarker);
if(start<0)throw new Error('Session bootstrap startup marker is missing');
const tail=source.slice(start);
const restore=tail.indexOf('restoreAuthenticatedSessionBeforePaint()');
const firstReadyRender=tail.indexOf("updateSplash(88,'Майже готово…');\n      render();");
if(restore<0||firstReadyRender<0||restore>firstReadyRender){
  throw new Error('Authenticated session must be restored before the first visible render');
}
if(source.includes('First paint uses local state only')){
  throw new Error('Legacy seed-first boot path returned');
}
if(!source.includes("state.family?.id==='demo-family'")){
  throw new Error('Demo seed guard is missing from trusted offline-session check');
}
if(!source.includes("error?.status===401||error?.status===403")){
  throw new Error('Rejected tokens are not handled during bootstrap');
}
if(!source.includes('showSessionRestoreFailure(error)')){
  throw new Error('Missing safe session recovery screen');
}
if(boot.includes("window.__MYHABBIT_APP_READY__ || app?.innerHTML.trim()")){
  throw new Error('Boot watchdog may hide the splash before session readiness');
}
if(!boot.includes('window.__MYHABBIT_APP_BOOTSTRAPPING__')){
  throw new Error('Boot watchdog does not recognize an in-progress session bootstrap');
}
console.log('PASS: authenticated first paint is gated behind real-session restoration; demo seed cannot flash as the user profile.');
