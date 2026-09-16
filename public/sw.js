const VERSION='12.3.0',CACHE='myhabbit-game-'+VERSION;
const CORE=['/index.html','/boot.js?v='+VERSION,'/app.js?v='+VERSION,'/game-rules.js','/game-content.js','/styles.css?v='+VERSION,'/home.css?v='+VERSION,'/room.svg','/manifest.webmanifest?v='+VERSION,'/icons/icon-192.png','/icons/icon-512.png'];
async function broadcast(data){for(const c of await self.clients.matchAll({type:'window',includeUncontrolled:true}))c.postMessage(data);}
async function cacheCore(){
  const cache=await caches.open(CACHE),failures=[];let completed=0;
  for(const url of CORE){try{const response=await fetch(url,{cache:'reload'});if(!response.ok)throw Error(url);await cache.put(url,response);completed++;}catch{failures.push(url);}await broadcast({type:'OFFLINE_PRELOAD_PROGRESS',completed,total:CORE.length,percent:Math.round(completed/CORE.length*100)});}
  if(failures.length){await cache.delete('/offline-ready');await broadcast({type:'OFFLINE_PRELOAD_FAILED',completed,total:CORE.length,missing:failures});return false;}
  await cache.put('/offline-ready',new Response(JSON.stringify({version:VERSION,completedAt:Date.now()})));await broadcast({type:'OFFLINE_PRELOAD_COMPLETE',completed,total:CORE.length,percent:100});return true;
}
self.addEventListener('install',event=>event.waitUntil((async()=>{if(!await cacheCore())throw Error('Core resources incomplete');await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{await self.clients.claim();await broadcast({type:'APP_CACHE_UPDATED',version:VERSION});/* Previous caches remain available until a later maintenance release. */})()));
self.addEventListener('message',event=>{const type=event.data?.type;if(type==='SKIP_WAITING')event.waitUntil(self.skipWaiting());if(['REFRESH_APP_CACHE','PRELOAD_ALL'].includes(type))event.waitUntil(cacheCore());if(type==='GET_OFFLINE_STATUS')event.waitUntil((async()=>{const cache=await caches.open(CACHE),entry=await cache.match('/offline-ready'),status=entry?await entry.json():null;event.source?.postMessage({type:'OFFLINE_STATUS',ready:status?.version===VERSION,status});})());});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/')||url.pathname.startsWith('/owner-console'))return;
  event.respondWith((async()=>{const cache=await caches.open(CACHE),navigation=request.mode==='navigate',key=navigation?'/index.html':request;
    // Keep one complete application version together, including ESM imports.
    if(navigation||['script','style'].includes(request.destination)||url.pathname==='/manifest.webmanifest'){const cached=await cache.match(key);if(cached)return cached;}
    try{const response=await fetch(request);if(response.ok)await cache.put(key,response.clone());return response;}catch{const cached=await cache.match(key);return cached||new Response('Ресурс поки недоступний офлайн',{status:503,headers:{'content-type':'text/plain; charset=utf-8'}});}
  })());
});
