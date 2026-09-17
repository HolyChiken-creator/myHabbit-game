(function(){
  'use strict';
  const CFG=window.ROOM_MASTER_CONFIG;
  if(!CFG)return;

  const SLOTS=CFG.slots;
  let state=load();
  let editorOpen=false;
  let selected='armchair';
  let root=null;
  let tapTimes=[];
  let drag=null;
  let observer=null;

  function clone(v){return JSON.parse(JSON.stringify(v));}
  function defaultState(){
    return {
      activeLevel:0,
      sources:Object.fromEntries(SLOTS.map(s=>[s,0])),
      layouts:clone(CFG.defaults)
    };
  }
  function load(){
    try{
      const raw=localStorage.getItem(CFG.storageKey);
      const parsed=raw?JSON.parse(raw):null;
      const d=defaultState();
      if(!parsed)return d;
      d.activeLevel=Math.min(4,Math.max(0,Number(parsed.activeLevel)||0));
      d.sources={...d.sources,...(parsed.sources||{})};
      for(const n of Object.keys(d.layouts))d.layouts[n]={...d.layouts[n],...(parsed.layouts?.[n]||{})};
      return d;
    }catch{return defaultState();}
  }
  function save(){
    try{localStorage.setItem(CFG.storageKey,JSON.stringify(state));}catch{}
  }
  function pct(n,min=0,max=100){return Math.min(max,Math.max(min,Number(n)||0));}
  function room(){return document.querySelector('.renovation-room');}
  function currentLayout(){
    const n=String(state.activeLevel);
    if(!state.layouts[n])state.layouts[n]=clone(CFG.defaults[n]||CFG.defaults[0]);
    return state.layouts[n];
  }

  function inferStage(el){
    const raw=Number(el?.dataset?.roomThemeLevel);
    if(Number.isFinite(raw))return Math.min(4,Math.max(0,Math.trunc(raw)));
    const m=[0,1,2,3,4].find(n=>el?.classList?.contains('room-theme-level-'+n));
    return Number.isFinite(m)?m:0;
  }
  function isAdminRoom(el){return el?.dataset?.roomAdmin==='true';}

  function serverLayouts(el){
    try{if(el?.dataset?.roomLayoutVersion!=='2')return {};return JSON.parse(el?.dataset?.roomLayout||'{}')||{};}catch{return {};}
  }
  function hiddenSlot(el,slot){return (el?.dataset?.roomHidden||'').split(',').includes(slot);}
  function sourceFor(el,slot){
    const raw=Number(el?.dataset?.['roomSource'+slot[0].toUpperCase()+slot.slice(1)]);
    return Number.isFinite(raw)?Math.max(0,Math.min(4,Math.trunc(raw))):0;
  }
  function ensureStateForRoom(el){
    if(!editorOpen){
      const remote=serverLayouts(el);
      if(Object.keys(remote).length)Object.keys(remote).forEach(n=>state.layouts[n]={...CFG.defaults[n],...remote[n]});
      const stage=inferStage(el);state.activeLevel=stage;
      SLOTS.forEach(s=>state.sources[s]=sourceFor(el,s));
    }
  }

  function mount(){
    const el=room();
    if(!el)return;
    if(el===root && el.querySelector('.room-master-layer')){
      render();
      return;
    }
    root=el;
    ensureStateForRoom(el);
    el.classList.add('room-master-enabled');

    const layer=document.createElement('div');
    layer.className='room-master-layer';
    layer.innerHTML=[
      '<img class="room-master-bg" data-room-master-bg alt="">',
      ...SLOTS.map(s=>`<img class="room-master-object room-master-${s}" data-room-master-object="${s}" alt="">`)
    ].join('');
    el.prepend(layer);

    const companion=el.querySelector('.room-companion');
    if(companion){
      companion.classList.add('room-master-teddy');
      companion.dataset.roomMasterObject='teddy';
    }

    actor={mode:'idle',started:Date.now()};
    bindTeddy(companion);
    bindObjectEvents(el);
    render();
  }

  function render(){
    const el=room(); if(!el)return;
    if(!editorOpen){
      const remote=serverLayouts(el);
      if(Object.keys(remote).length)Object.keys(remote).forEach(n=>state.layouts[n]={...CFG.defaults[n],...remote[n]});
    }
    const runtimeLevel=editorOpen?String(state.activeLevel):String(sourceFor(el,'background'));
    const bgLevel=editorOpen?String(state.activeLevel):String(sourceFor(el,'background'));
    const bg=el.querySelector('[data-room-master-bg]');
    if(bg){bg.onerror=()=>bg.classList.add('asset-load-error');bg.onload=()=>bg.classList.remove('asset-load-error');bg.src=(CFG.levels[bgLevel]||CFG.levels[0]).background;}

    SLOTS.forEach(slot=>{
      const img=el.querySelector(`[data-room-master-object="${slot}"]`);if(!img)return;
      const sourceLevel=editorOpen?String(state.sources[slot]??state.activeLevel):String(sourceFor(el,slot));
      const level=CFG.levels[sourceLevel]||CFG.levels[0];
      const layout=(state.layouts[runtimeLevel]||CFG.defaults[runtimeLevel]||CFG.defaults[0]);
      img.onerror=()=>img.classList.add('asset-load-error');img.onload=()=>img.classList.remove('asset-load-error');
      img.src=level.assets[slot];img.hidden=!editorOpen&&hiddenSlot(el,slot);applyBox(img,layout[slot]||CFG.defaults[runtimeLevel][slot],slot);
      img.classList.toggle('is-selected',editorOpen&&selected===slot);
    });

    const teddy=el.querySelector('.room-master-teddy');
    if(teddy){
      const tl=(state.layouts[runtimeLevel]||CFG.defaults[runtimeLevel]||CFG.defaults[0]).teddy;
      applyBox(teddy,tl,'teddy');applyActivity(el,teddy);teddy.classList.toggle('is-selected',editorOpen&&selected==='teddy');
    }
    el.classList.toggle('room-master-editing',editorOpen);syncEditor();
  }


  let actor={mode:'idle',started:Date.now()};
  const activities={
    armchair:{pose:'sit',prop:'',uk:['Оце крісло! Влаштуюся зручніше.','Мій улюблений куточок для відпочинку.'],en:['What a chair! Time to get comfortable.','My favourite place to rest.']},
    table:{pose:'sip',prop:'☕',uk:['Час для чаю за моїм столиком.','Тепер є де поставити какао!'],en:['Time for tea at my table.','A place for my cocoa!']},
    bookshelf:{pose:'read',prop:'📖',uk:['Обираю наступну історію.','Стільки книжок — вечір буде чудовим!'],en:['Choosing my next story.','So many books for a lovely evening!']},
    fireplace:{pose:'warm',prop:'',uk:['Погрію лапки біля вогню.','Тепер удома ще затишніше.'],en:['Warming my paws by the fire.','Home feels even cozier.']},
    plant:{pose:'water',prop:'🚿',uk:['Трохи води для мого зеленого друга.','Рости великою, красуне!'],en:['A little water for my green friend.','Grow tall, little beauty!']},
    rug:{pose:'sit',prop:'',uk:['Який м’який килим!','Тут можна просто посидіти й помріяти.'],en:['Such a soft rug!','A place to sit and daydream.']},
    window:{pose:'admire',prop:'',uk:['Звідси такий гарний краєвид.','Сонечко завітало в гості!'],en:['What a lovely view.','Sunshine came to visit!']},
    painting:{pose:'admire',prop:'',uk:['Ця картина надихає мене!','Маленька галерея просто вдома.'],en:['This painting inspires me!','My own little gallery.']},
    lamp:{pose:'warm',prop:'',uk:['М’яке світло для тихого вечора.','Тепер читати ще приємніше.'],en:['Soft light for a quiet evening.','Reading feels even nicer now.']},
    clock:{pose:'admire',prop:'',uk:['Тік-так… час на маленьку перемогу!','З таким годинником не забуду про відпочинок.'],en:['Tick-tock… time for a small victory!','A reminder to take a little rest.']},
    background:{pose:'cheer',prop:'✨',uk:['Ого! Наче зовсім новий дім!','Яка зміна! Хочеться обійняти всю кімнату.'],en:['Wow! It feels like a new home!','What a change! I love this room.']}
  };
  function bindTeddy(teddy){
    if(!teddy)return;
    const activate=()=>{
      if(editorOpen||room()?.dataset.roomPreview==='true'||actor.mode==='walk')return;
      actor={mode:'walk',started:Date.now(),home:{x:parseFloat(teddy.style.left)||42,y:parseFloat(teddy.style.top)||40,w:parseFloat(teddy.style.width)||18}};
      applyActivity(room(),teddy);
    };
    teddy.addEventListener('click',activate);
    teddy.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();activate();}});
  }
  function applyActivity(el,teddy){
    if(!el||!teddy)return;
    if(editorOpen||el.dataset.roomPreview==='true'){
      actor={mode:'idle',started:Date.now()};teddy.dataset.activity='idle';return;
    }
    const now=Date.now(),age=now-actor.started;
    let pose='idle',caption='',english='';
    if(actor.mode==='walk'){
      const h=actor.home,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
      const right=Math.min(95-h.w,h.x+12),left=Math.max(1,h.x-12);
      const points=[h.x,right,left,h.x],segment=Math.min(2,Math.floor(age/1800));
      const t=Math.min(1,(age-segment*1800)/1800);
      const x=reduced?h.x:points[segment]+(points[segment+1]-points[segment])*t;
      applyBox(teddy,{...h,x,z:20},'teddy');
      pose=age<5400?'walk':'think';caption=age<5400?'Трохи розімну лапки.':'Хм… яку історію почитати?';english=age<5400?'Time to stretch my legs.':'Hmm… which story should I read?';
      teddy.dataset.facing=segment===1?'left':'right';
      if(age>=5400)applyBox(teddy,{...h,z:20},'teddy');
      if(age>=8500){actor={mode:'idle',started:now};pose='idle';}
    }else if(actor.mode==='reaction'&&age<6500){
      const a=activities[actor.slot];pose=a.pose==='sit'?'sit':a.pose;
      caption=a.uk[actor.variant%a.uk.length];english=a.en[actor.variant%a.en.length];
    }else{
      if(actor.mode==='reaction')actor={mode:'idle',started:now};
      const idle=now-actor.started;
      pose=idle>=20000?'read':idle>=18000?'sit':'idle';
      if(pose==='sit'){caption='Влаштуюся зручніше…';english='Getting comfortable…';}
      if(pose==='read'){caption='Ще одну сторінку…';english='Just one more page…';}
    }
    teddy.dataset.activity=pose;
    teddy.classList.toggle('room-new-joy',actor.mode==='reaction');
    const text=document.documentElement.lang?.startsWith('en')?english:caption;
    const c=teddy.querySelector('.companion-caption');if(c&&c.textContent!==text)c.textContent=text;
    teddy.setAttribute('aria-label',document.documentElement.lang?.startsWith('en')?'Teddy':'Тедик');
    const prop=teddy.querySelector('.companion-prop');if(prop&&prop.textContent)prop.textContent='';
  }
  setInterval(()=>{const el=room();if(el&&!document.hidden)applyActivity(el,el.querySelector('.room-master-teddy'));},120);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)actor={mode:'idle',started:Date.now()};});
  window.addEventListener('teddy-room-upgraded',e=>{
    if(!activities[e.detail?.slot])return;
    requestAnimationFrame(()=>{mount();actor={mode:'reaction',slot:e.detail.slot,variant:Math.max(0,(e.detail.tier||1)-1),started:Date.now()};const el=room();if(el)applyActivity(el,el.querySelector('.room-master-teddy'));});
  });

  function applyBox(el,b={},slot){
    const x=pct(b.x,0,95), y=pct(b.y,0,95), w=pct(b.w,5,80);
    el.style.left=x+'%';
    el.style.top=y+'%';
    el.style.width=w+'%';
    if(slot!=='teddy'){el.style.height=Number.isFinite(b.h)?pct(b.h,3,95)+'%':'auto';el.style.objectPosition='center bottom';}
    el.style.zIndex=String(b.z||10);
    if(slot==='teddy'){
      el.style.right='auto';
      el.style.bottom='auto';
      el.style.transform='none';
    }
  }

  let tripleDelegateBound=false;
  let triplePointerId=null;
  let tripleStart=null;

  function registerTripleStart(ev){
    const target=ev?.target?.closest?.('.site-version-trigger');
    if(!target)return;
    triplePointerId=ev.pointerId ?? null;
    tripleStart={x:ev.clientX ?? ev.touches?.[0]?.clientX ?? 0,y:ev.clientY ?? ev.touches?.[0]?.clientY ?? 0,time:Date.now()};
  }

  function registerTripleEnd(ev){
    const target=ev?.target?.closest?.('.site-version-trigger');
    if(!target)return;

    const now=Date.now();
    const x=ev.clientX ?? ev.changedTouches?.[0]?.clientX ?? 0;
    const y=ev.clientY ?? ev.changedTouches?.[0]?.clientY ?? 0;

    if(tripleStart){
      const dx=x-tripleStart.x,dy=y-tripleStart.y;
      const moved=Math.hypot(dx,dy);
      const held=now-tripleStart.time;
      if(moved>24 || held>650){tripleStart=null;tapTimes=[];return;}
    }

    tapTimes=tapTimes.filter(t=>now-t<1500);
    tapTimes.push(now);
    tripleStart=null;

    if(tapTimes.length>=3){
      tapTimes=[];
      ev?.preventDefault?.();
      ev?.stopPropagation?.();
      if(room()){
        toggleEditor();
        navigator.vibrate?.(35);
      }
    }
  }

  function ensureTripleTapDelegate(){
    if(tripleDelegateBound)return;
    tripleDelegateBound=true;

    // IMPORTANT: use exactly one input event family.
    // iPhone Safari emits both PointerEvents and TouchEvents for the same physical tap.
    // Listening to both made the editor open and close again during the same 3-tap gesture.
    if(window.PointerEvent){
      document.addEventListener('pointerdown',registerTripleStart,{capture:true,passive:true});
      document.addEventListener('pointerup',registerTripleEnd,{capture:true,passive:false});
    }else{
      document.addEventListener('touchstart',registerTripleStart,{capture:true,passive:true});
      document.addEventListener('touchend',registerTripleEnd,{capture:true,passive:false});
    }
  }

  function bindTripleTap(teddy){
    if(!teddy)return;
    teddy.dataset.roomMasterTripleBound='1';
    ensureTripleTapDelegate();
  }

  function bindObjectEvents(el){
    el.querySelectorAll('[data-room-master-object]').forEach(node=>{
      if(node.dataset.roomMasterDragBound)return;
      node.dataset.roomMasterDragBound='1';
      node.addEventListener('pointerdown',onPointerDown);
    });
  }

  function onPointerDown(ev){
    if(!editorOpen)return;
    const node=ev.currentTarget;
    const slot=node.dataset.roomMasterObject;
    if(!slot)return;
    selected=slot;
    const box=root.getBoundingClientRect();
    const l=currentLayout()[slot];
    drag={slot,node,box,startX:ev.clientX,startY:ev.clientY,x:l.x,y:l.y};
    node.setPointerCapture?.(ev.pointerId);
    node.addEventListener('pointermove',onPointerMove);
    node.addEventListener('pointerup',onPointerUp,{once:true});
    node.addEventListener('pointercancel',onPointerUp,{once:true});
    node.classList.add('is-selected');
    syncEditor();
    ev.preventDefault();
  }
  function onPointerMove(ev){
    if(!drag)return;
    const dx=(ev.clientX-drag.startX)/drag.box.width*100;
    const dy=(ev.clientY-drag.startY)/drag.box.height*100;
    const l=currentLayout()[drag.slot];
    l.x=pct(drag.x+dx,0,92);
    l.y=pct(drag.y+dy,0,90);
    applyBox(drag.node,l,drag.slot);
    syncEditor();
  }
  function onPointerUp(ev){
    if(!drag)return;
    drag.node.removeEventListener('pointermove',onPointerMove);
    drag=null;
    save();
    render();
  }

  async function persistGlobal(){
    try{
      const result=await window.myHabbitSaveRoomLayout?.(state.layouts);
      return Boolean(result);
    }catch{return false;}
  }

  function toggleEditor(force){
    const next=typeof force==='boolean'?force:!editorOpen;
    if(next&&!editorOpen){
      const stage=sourceFor(room(),'background');
      state.activeLevel=stage;
      SLOTS.forEach(slot=>{if(!CFG.levels[state.sources[slot]])state.sources[slot]=stage;});
    }
    editorOpen=next;
    if(editorOpen)ensureEditor();
    else document.querySelector('.room-master-editor')?.remove();
    save();render();
  }

  function ensureEditor(){
    let panel=document.querySelector('.room-master-editor');
    if(panel)return panel;
    panel=document.createElement('section');
    panel.className='room-master-editor';
    panel.innerHTML=`
      <div class="room-master-editor-head">
        <div><small>ROOM MASTER</small><strong>Розстановка кімнати</strong></div>
        <button type="button" data-rm-close>×</button>
      </div>
      <div class="room-master-level-nav"><button type="button" data-rm-scroll="-1" aria-label="Попередні стилі">‹</button><div class="room-master-levels">
        ${[0,1,2,3,4].map(n=>`<button type="button" data-rm-level="${n}">${n} · ${CFG.levels[n].title}</button>`).join('')}
      </div>
      <button type="button" data-rm-scroll="1" aria-label="Наступні стилі">›</button></div>
      <div class="room-master-select-row">
        <label>Обʼєкт<select data-rm-slot>
          ${[...SLOTS,'teddy'].map(s=>`<option value="${s}">${CFG.labels[s]}</option>`).join('')}
        </select></label>
        <label>Ассет<select data-rm-source>
          <option value="0">0 · Step 0</option><option value="1">1 · Cozy</option><option value="2">2 · Warm</option>
          <option value="3">3 · Hi-tech</option><option value="4">4 · Gothic</option>
        </select></label>
      </div>
      <label class="room-master-range">Розмір <span data-rm-size-value></span>
        <input data-rm-size type="range" min="5" max="80" step=".5">
      </label>
      <div class="room-master-nudge">
        <button type="button" data-rm-nudge="up">↑</button>
        <button type="button" data-rm-nudge="left">←</button>
        <button type="button" data-rm-nudge="right">→</button>
        <button type="button" data-rm-nudge="down">↓</button>
      </div>
      <div class="room-master-actions">
        <button type="button" data-rm-reset-one>Скинути предмет</button>
        <button type="button" data-rm-reset-level>Скинути рівень</button>
        <button type="button" data-rm-save-global>Зберегти для всіх</button>
        <button type="button" data-rm-export>Export JSON</button>
      </div>
      <p>Перетягуй предмети пальцем. Розстановка не оновлює сторінку під час редагування. Збереження для всіх — окремою кнопкою.</p>`;
    document.body.appendChild(panel);

    const levels=panel.querySelector('.room-master-levels');
    panel.querySelectorAll('[data-rm-scroll]').forEach(b=>b.onclick=()=>levels.scrollBy({left:Number(b.dataset.rmScroll)*180,behavior:'smooth'}));
    levels.addEventListener('wheel',e=>{if(levels.scrollWidth<=levels.clientWidth)return;e.preventDefault();levels.scrollLeft+=e.deltaY||e.deltaX;},{passive:false});
    panel.querySelector('[data-rm-close]').onclick=()=>toggleEditor(false);
    panel.querySelectorAll('[data-rm-level]').forEach(b=>b.onclick=()=>setLevel(Number(b.dataset.rmLevel)));
    panel.querySelector('[data-rm-slot]').onchange=e=>{selected=e.target.value;render();};
    panel.querySelector('[data-rm-source]').onchange=e=>{
      if(selected==='teddy')return;
      state.sources[selected]=Number(e.target.value);
      save();render();
    };
    const sizeInput=panel.querySelector('[data-rm-size]');
    sizeInput.oninput=e=>{
      const l=currentLayout()[selected];if(!l)return;
      const next=Number(e.target.value);if(Number.isFinite(l.h))l.h=pct(l.h*next/l.w,3,95);l.w=next;
      const node=selected==='teddy'?room()?.querySelector('.room-master-teddy'):room()?.querySelector(`[data-room-master-object="${selected}"]`);
      if(node)applyBox(node,l,selected);
      const value=panel.querySelector('[data-rm-size-value]');
      if(value)value.textContent=Math.round(l.w*10)/10+'%';
    };
    sizeInput.onchange=()=>save();
    panel.querySelectorAll('[data-rm-nudge]').forEach(b=>b.onclick=()=>nudge(b.dataset.rmNudge));
    panel.querySelector('[data-rm-reset-one]').onclick=resetOne;
    panel.querySelector('[data-rm-reset-level]').onclick=resetLevel;
    panel.querySelector('[data-rm-save-global]').onclick=async()=>{
      const ok=await persistGlobal();
      toast(ok?'Розташування збережено для всіх':'Не вдалося зберегти для всіх');
    };
    panel.querySelector('[data-rm-export]').onclick=exportJSON;
    return panel;
  }

  function syncEditor(){
    if(!editorOpen)return;
    const p=ensureEditor();
    p.querySelectorAll('[data-rm-level]').forEach(b=>b.classList.toggle('active',Number(b.dataset.rmLevel)===state.activeLevel));
    const slot=p.querySelector('[data-rm-slot]');
    if(slot)slot.value=selected;
    const src=p.querySelector('[data-rm-source]');
    if(src){
      src.disabled=selected==='teddy';
      src.value=String(selected==='teddy'?state.activeLevel:(state.sources[selected]??state.activeLevel));
    }
    const range=p.querySelector('[data-rm-size]');
    const value=currentLayout()[selected]?.w||20;
    if(range)range.value=String(value);
    const label=p.querySelector('[data-rm-size-value]');
    if(label)label.textContent=Math.round(value*10)/10+'%';
  }

  function setLevel(n){
    state.activeLevel=n;
    save();render();
  }
  function nudge(dir){
    const l=currentLayout()[selected]; if(!l)return;
    const step=.7;
    if(dir==='left')l.x=pct(l.x-step,0,92);
    if(dir==='right')l.x=pct(l.x+step,0,92);
    if(dir==='up')l.y=pct(l.y-step,0,90);
    if(dir==='down')l.y=pct(l.y+step,0,90);
    save();render();
  }
  function resetOne(){
    const n=String(state.activeLevel);
    currentLayout()[selected]=clone(CFG.defaults[n][selected]||CFG.defaults[0][selected]);
    save();render();
  }
  function resetLevel(){
    const n=String(state.activeLevel);
    state.layouts[n]=clone(CFG.defaults[n]);
    SLOTS.forEach(s=>state.sources[s]=state.activeLevel);
    save();render();
  }
  function exportJSON(){
    const payload=JSON.stringify({version:CFG.version,exportedAt:new Date().toISOString(),roomMaster:state},null,2);
    if(navigator.clipboard?.writeText){
      navigator.clipboard.writeText(payload).then(()=>toast('JSON скопійовано'));
    }else{
      const blob=new Blob([payload],{type:'application/json'});
      const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='teddy-room-layout.json';a.click();URL.revokeObjectURL(a.href);
    }
  }
  function toast(msg){
    let t=document.querySelector('.room-master-toast');
    if(!t){t=document.createElement('div');t.className='room-master-toast';document.body.appendChild(t);}
    t.textContent=msg;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1200);
  }

  function watch(){
    if(observer)return;
    observer=new MutationObserver(()=>{requestAnimationFrame(mount);});
    observer.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
  }

  window.TeddyRoomMaster={
    open:()=>toggleEditor(true),
    close:()=>toggleEditor(false),
    getState:()=>clone(state),
    setLevel,
    reset:()=>{state=defaultState();save();render();}
  };

  document.addEventListener('DOMContentLoaded',()=>{ensureTripleTapDelegate();watch();mount();});
  if(document.readyState!=='loading'){ensureTripleTapDelegate();watch();mount();}
})();