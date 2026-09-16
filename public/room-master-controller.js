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
      activeLevel:1,
      sources:Object.fromEntries(SLOTS.map(s=>[s,1])),
      layouts:clone(CFG.defaults)
    };
  }
  function load(){
    try{
      const raw=localStorage.getItem(CFG.storageKey);
      const parsed=raw?JSON.parse(raw):null;
      const d=defaultState();
      if(!parsed)return d;
      d.activeLevel=Math.min(4,Math.max(1,Number(parsed.activeLevel)||1));
      d.sources={...d.sources,...(parsed.sources||{})};
      d.layouts={...d.layouts,...(parsed.layouts||{})};
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
    if(!state.layouts[n])state.layouts[n]=clone(CFG.defaults[n]||CFG.defaults[1]);
    return state.layouts[n];
  }

  function inferStage(el){
    const m=[1,2,3,4].find(n=>el.classList.contains('renovation-stage-'+n));
    return m||1;
  }

  function ensureStateForRoom(el){
    if(!localStorage.getItem(CFG.storageKey)){
      const stage=inferStage(el);
      state.activeLevel=stage;
      SLOTS.forEach(s=>state.sources[s]=stage);
      save();
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
      bindTripleTap(companion);
    }

    bindObjectEvents(el);
    render();
  }

  function render(){
    const el=room(); if(!el)return;
    const lvl=String(state.activeLevel);
    const level=CFG.levels[lvl]||CFG.levels[1];
    const layout=currentLayout();
    const bg=el.querySelector('[data-room-master-bg]');
    if(bg)bg.src=encodeURI(level.background);

    SLOTS.forEach(slot=>{
      const img=el.querySelector(`[data-room-master-object="${slot}"]`);
      if(!img)return;
      const srcLevel=String(state.sources[slot]||state.activeLevel);
      const src=CFG.levels[srcLevel]?.assets?.[slot]||level.assets[slot];
      img.src=encodeURI(src);
      applyBox(img,layout[slot],slot);
      img.classList.toggle('is-selected',editorOpen&&selected===slot);
    });

    const teddy=el.querySelector('.room-master-teddy');
    if(teddy){
      applyBox(teddy,layout.teddy,'teddy');
      teddy.classList.toggle('is-selected',editorOpen&&selected==='teddy');
    }
    el.classList.toggle('room-master-editing',editorOpen);
    syncEditor();
  }

  function applyBox(el,b={},slot){
    const x=pct(b.x,0,95), y=pct(b.y,0,95), w=pct(b.w,5,80);
    el.style.left=x+'%';
    el.style.top=y+'%';
    el.style.width=w+'%';
    el.style.zIndex=String(b.z||10);
    if(slot==='teddy'){
      el.style.right='auto';
      el.style.bottom='auto';
      el.style.transform='none';
    }
  }

  function bindTripleTap(teddy){
    if(teddy.dataset.roomMasterTripleBound)return;
    teddy.dataset.roomMasterTripleBound='1';
    teddy.addEventListener('pointerup',ev=>{
      const now=Date.now();
      tapTimes=tapTimes.filter(t=>now-t<850);
      tapTimes.push(now);
      if(tapTimes.length>=3){
        tapTimes=[];
        ev.preventDefault();
        ev.stopPropagation();
        toggleEditor();
        navigator.vibrate?.(35);
      }
    },true);
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
    render();
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

  function toggleEditor(force){
    editorOpen=typeof force==='boolean'?force:!editorOpen;
    if(editorOpen)ensureEditor();
    else document.querySelector('.room-master-editor')?.remove();
    render();
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
      <div class="room-master-levels">
        ${[1,2,3,4].map(n=>`<button type="button" data-rm-level="${n}">${n} · ${CFG.levels[n].title}</button>`).join('')}
      </div>
      <div class="room-master-select-row">
        <label>Обʼєкт<select data-rm-slot>
          ${[...SLOTS,'teddy'].map(s=>`<option value="${s}">${CFG.labels[s]}</option>`).join('')}
        </select></label>
        <label>Ассет<select data-rm-source>
          <option value="1">1 · Cozy</option><option value="2">2 · Warm</option>
          <option value="3">3 · Hi-tech</option><option value="4">4 · Gothic</option>
        </select></label>
      </div>
      <label class="room-master-range">Розмір <span data-rm-size-value></span>
        <input data-rm-size type="range" min="6" max="55" step=".5">
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
        <button type="button" data-rm-export>Export JSON</button>
      </div>
      <p>Перетягуй вибраний предмет пальцем прямо по кімнаті. Тройний тап по Тедику закриває/відкриває цей режим.</p>`;
    document.body.appendChild(panel);

    panel.querySelector('[data-rm-close]').onclick=()=>toggleEditor(false);
    panel.querySelectorAll('[data-rm-level]').forEach(b=>b.onclick=()=>setLevel(Number(b.dataset.rmLevel)));
    panel.querySelector('[data-rm-slot]').onchange=e=>{selected=e.target.value;render();};
    panel.querySelector('[data-rm-source]').onchange=e=>{
      if(selected==='teddy')return;
      state.sources[selected]=Number(e.target.value);
      save();render();
    };
    panel.querySelector('[data-rm-size]').oninput=e=>{
      currentLayout()[selected].w=Number(e.target.value);
      save();render();
    };
    panel.querySelectorAll('[data-rm-nudge]').forEach(b=>b.onclick=()=>nudge(b.dataset.rmNudge));
    panel.querySelector('[data-rm-reset-one]').onclick=resetOne;
    panel.querySelector('[data-rm-reset-level]').onclick=resetLevel;
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
      src.value=String(selected==='teddy'?state.activeLevel:(state.sources[selected]||state.activeLevel));
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
    currentLayout()[selected]=clone(CFG.defaults[n][selected]||CFG.defaults[1][selected]);
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

  document.addEventListener('DOMContentLoaded',()=>{watch();mount();});
  if(document.readyState!=='loading'){watch();mount();}
})();