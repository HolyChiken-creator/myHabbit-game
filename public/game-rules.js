import { GAME_VERSION, DAILY_QUEST_TEMPLATES, cosmeticDefaults, LEVEL_REWARDS, defaultStickerCollections, defaultStickerBoxes, FAMILY_STYLE_LEVELS, QUEST_MILESTONE_ACHIEVEMENTS, QUEST_LIBRARY, ACHIEVEMENT_LIBRARY } from './game-content.js';

export { GAME_VERSION };
export const skillKeys=['home','care','health','growth','finance','family','relationship','sport','mind','reading','cinema','creativity','discipline'];
export const num=(v,min=0,max=1000000000)=>Math.max(min,Math.min(max,Number.isFinite(Number(v))?Number(v):min));
const copy=v=>JSON.parse(JSON.stringify(v));
const unique=values=>[...new Set(values||[])];
const fail=message=>{throw new Error(message);};
export const dayAt=(now=Date.now())=>new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Kyiv',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(now)).reduce((a,p)=>(a[p.type]=p.value,a),{});
export function gameDay(now=Date.now()){const p=dayAt(now);return `${p.year}-${p.month}-${p.day}`;}
const templateKey=t=>String(t[0]).toLowerCase().replace(/[^a-zа-яіїєґ0-9]+/gi,'-').replace(/^-|-$/g,'');
export function periodFor(q,day=gameDay()){
  if(q.dailyDay)return q.dailyDay;
  if(q.repeatType==='daily')return day;
  if(q.repeatType==='weekly'){const d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()-((d.getUTCDay()+6)%7));return d.toISOString().slice(0,10);}
  return 'once';
}
export const completionKey=(q,day)=>`${q.id}:${periodFor(q,day)}`;
export function questStatus(s,u,q,day=gameDay()){
  const done=Boolean(u.questCompletions?.[completionKey(q,day)]);
  const progress=q.progress?.[periodFor(q,day)]||{joined:[],finished:[]};
  let reason='';
  if(q.status==='paused'||q.active===false)reason='Завдання на паузі';
  else if(q.dailyDay&&q.dailyDay!==day)reason='Інший день';
  else if(num(q.unlockLevel,1)>u.level)reason=`Потрібен рівень ${q.unlockLevel}`;
  else if(q.prerequisiteId&&!Object.keys(u.questCompletions||{}).some(k=>k.startsWith(q.prerequisiteId+':')))reason='Спочатку завершіть попередній квест';
  else if(q.type==='limited'&&num(q.stock,0)<=0&&!done)reason='Завдання вже виконано';
  else if(['coop','pair'].includes(q.type)&&!progress.joined.includes(u.id)&&progress.joined.length>=num(q.participants,2,25))reason='Усі місця зайняті';
  return {done,reason,joined:progress.joined.includes(u.id),waiting:progress.finished.includes(u.id),progress};
}
export function dailyQuests(s,day=gameDay()){
  const enabled=DAILY_QUEST_TEMPLATES.filter(t=>s.questTemplateSettings?.[templateKey(t)]?.enabled!==false);
  const seed=Number(day.replaceAll('-',''));
  const rotate=arr=>arr.map((_,i)=>arr[(i+seed)%arr.length]);
  const selected=[...rotate(enabled.filter(t=>t[7])).slice(0,16),...rotate(enabled.filter(t=>!t[7])).slice(0,9)];
  const existing=new Map((s.quests||[]).filter(q=>q.dailyDay===day).map(q=>[q.templateKey,q]));
  return selected.map(t=>{const key=templateKey(t),o=s.questTemplateSettings?.[key]||{},old=existing.get(key);return {
    ...old,id:old?.id||`daily-${day}-${key}`,templateKey:key,dailyDay:day,source:'daily',title:o.title||t[0],icon:o.icon||t[1],description:o.description||t[2],skill:o.skill||t[3],difficulty:o.difficulty||t[4],rewardCoins:num(o.rewardCoins??t[5]),rewardXp:num(o.rewardXp??t[6]),skillXp:Math.max(8,Math.round(num(o.rewardXp??t[6])/4)),type:o.type||'personal',participants:['coop','pair'].includes(o.type)?2:1,stock:(o.type==='limited'?num(old?.stock??1):undefined),status:'active',claimedBy:old?.claimedBy||[],progress:old?.progress||{},recurring:Boolean(t[7]),prerequisiteId:o.prerequisiteId||'',stage:o.stage||'',metrics:/^Прочитати 10/.test(t[0])?{pagesRead:10}:{}
  };});
}
function catalogQuest(q){const skills=q.rewards?.skills||{},skill=Object.keys(skills)[0]||q.category||'discipline';const pages=/Прочитай (\d+) сторінок/.exec(q.title||'');return {...q,catalog:true,source:'catalog',icon:({reading:'📖',sport:'💪',home:'🏠',health:'🌿',cinema:'🎬'})[q.category]||'✨',claimedBy:[],status:'active',participants:['pair','coop'].includes(q.type)?2:1,rewardCoins:num(q.rewards?.coins),rewardXp:num(q.rewards?.xp),skill,skillXp:num(skills[skill]),skillRewards:skills,metrics:pages?{pagesRead:Number(pages[1])}:q.category==='cinema'&&/фільм/i.test(q.title)?{filmsWatched:1}:{},stock:q.type==='limited'?1:undefined};}
export function xpRequired(level){const fixed=[0,1500,1800,2150,2550,3000,3500,4050,4650,5300];level=Math.trunc(num(level,1,1000));if(level<fixed.length)return fixed[level];let need=5300;for(let n=10;n<=level;n++)need=Math.min(1000000000,Math.round((need*1.105+140)/50)*50);return need;}
export function grantXp(u,amount){amount=Math.trunc(num(amount));u.totalXpEarned=num(u.totalXpEarned)+amount;u.xp=num(u.xp)+amount;while(u.level<1000&&u.xp>=xpRequired(u.level)){u.xp-=xpRequired(u.level);u.level++;u.coins=num(u.coins)+50;}return amount;}
function userDefaults(u){
  u.level=Math.trunc(num(u.level,1,1000));u.xp=num(u.xp);u.coins=num(u.coins);u.skills=u.skills||{};u.skillXp=u.skillXp||{};
  for(const key of skillKeys){u.skills[key]=num(u.skills[key]);u.skillXp[key]=num(u.skillXp[key]??u.skills[key]*100);}
  for(const key of ['achievements','inventory','claimedLevelRewards','activity','activeFeatures','receivedGifts','stickerUnlockHistory','purchaseHistory','fulfilledPacks'])u[key]=Array.isArray(u[key])?u[key]:[];
  for(const key of ['stats','questCompletions','achievementProgress','stickerInventory','equipped'])u[key]=u[key]&&typeof u[key]==='object'?u[key]:{};
  u.achievements=unique(u.achievements);u.stickerDust=num(u.stickerDust);if(u.totalXpEarned==null){let total=u.xp;for(let level=1;level<u.level;level++)total+=xpRequired(level);u.totalXpEarned=total;}u.streak=num(u.streak);u.bestStreak=Math.max(num(u.bestStreak),u.streak);
}
export function normalizeGame(s,now=Date.now()){
  s.meta=s.meta||{};s.family=s.family||{};s.users=s.users||[];s.quests=s.quests||[];s.shop=s.shop||[];s.history=s.history||[];s.questTemplateSettings=s.questTemplateSettings||{};
  s.users.forEach(userDefaults);
  if(!s.meta.perUserQuestsMigrated){
    for(const q of s.quests){if(q.status==='done'){for(const u of s.users){const event=s.history.find(e=>e.userId===u.id&&e.kind==='quest_completed'&&e.title===q.title);if(event||!s.history.some(e=>e.kind==='quest_completed'&&e.title===q.title))u.questCompletions[completionKey(q)]=event?.createdAt||now;}q.status='active';}q.progress=q.progress||{};if(q.claimedBy?.length&&!q.progress[periodFor(q)])q.progress[periodFor(q)]={joined:[...q.claimedBy],finished:[]};}
    s.meta.perUserQuestsMigrated=true;
  }
  const day=gameDay(now);for(const u of s.users){if(u.lastHabitDay&&Date.parse(day)-Date.parse(u.lastHabitDay)>86400000)u.streak=0;}s.quests=[...s.quests.filter(q=>!q.dailyDay),...dailyQuests(s,day)];
  // Definition updates never overwrite per-user completion records.
  for(const q of QUEST_LIBRARY){const fresh={...catalogQuest(q),...(s.questOverrides?.[q.id]||{})},old=s.quests.find(x=>x.id===q.id);fresh.catalog=true;fresh.source='catalog';if(old)Object.assign(old,fresh,{progress:old.progress||{},claimedBy:old.claimedBy||[]});else s.quests.push(fresh);}
  s.cosmeticsCatalog=copy(cosmeticDefaults).filter(i=>i.kind!=='stickerPack'||['cozy-cats','bunny-notes'].includes(i.asset));
  s.levelRewards=copy(LEVEL_REWARDS);s.stickerCollections=defaultStickerCollections();s.stickerBoxes=defaultStickerBoxes();
  s.achievements=s.achievements||[];
  const definitions=[...ACHIEVEMENT_LIBRARY.map(a=>({...a,icon:'🏆',target:num(a.condition?.value,1),catalog:true})),...QUEST_MILESTONE_ACHIEVEMENTS];
  for(const a of definitions){const old=s.achievements.find(x=>x.id===a.id);if(old)Object.assign(old,copy(a));else s.achievements.push(copy(a));}
  const milestoneKeys=new Set();
  for(const a of [...s.achievements].sort((a,b)=>Number(Boolean(a.catalog))-Number(Boolean(b.catalog)))){if(!a.condition?.type||a.active===false||a.archived)continue;const key=achievementKey(a);if(milestoneKeys.has(key)){a.active=false;a.archived=true;}else milestoneKeys.add(key);}
  const known=new Set(s.achievements.map(a=>a.id));for(const u of s.users)for(const id of u.achievements)if(!known.has(id)){s.achievements.push({id,title:'Збережена нагорода',description:'Нагорода з попередньої версії',icon:'🏅',target:1,archived:true});known.add(id);}
  // Keep the room already earned before switching to the new XP curve.
  if(s.family.progressBaseLevel==null){s.family.progressBaseLevel=num(s.family.level,1);s.family.progressBaseXp=num(s.family.xp);}
  s.family.level=Math.max(num(s.family.level,1),s.family.progressBaseLevel+Math.floor(Math.max(0,num(s.family.xp)-s.family.progressBaseXp)/1000));
  s.profileStickers=s.profileStickers||[];s.giftHistory=s.giftHistory||[];
  // Purchased packs in old saves were sometimes not unpacked. Fulfil each once.
  for(const u of s.users)for(const id of u.inventory){const item=s.cosmeticsCatalog.find(i=>i.id===id);if(item?.kind==='stickerPack')fulfilPack(s,u,item);}
  s.meta.version=GAME_VERSION;
  return s;
}
function grantSkills(u,rewards){for(const [key,value] of Object.entries(rewards||{})){if(!skillKeys.includes(key))continue;u.skillXp[key]=num(u.skillXp[key])+num(value);u.skills[key]=Math.floor(u.skillXp[key]/100);}}
function grantReward(s,u,reward){u.coins+=num(reward?.coins);u.stats.coinsEarned=num(u.stats.coinsEarned)+num(reward?.coins);grantXp(u,reward?.xp);grantSkills(u,reward?.skillXp||reward?.skills);if(reward?.item)grantItem(s,u,reward.item);}
function fulfilPack(s,u,item){if(u.fulfilledPacks.includes(item.id))return;const collection=s.stickerCollections.find(c=>c.id===({'cozy-cats':'cozy-cats','bunny-notes':'bunny-love'})[item.asset]);if(!collection)return;for(const st of collection.stickers.slice(0,5))u.stickerInventory[st.id]=num(u.stickerInventory[st.id])+1;u.fulfilledPacks.push(item.id);}
function grantItem(s,u,id){const item=s.cosmeticsCatalog.find(i=>i.id===id);if(!item)fail('Цей предмет поки недоступний');u.inventory=unique([...u.inventory,id]);if(item.kind==='stickerPack')fulfilPack(s,u,item);}
function metric(u,type){if(type==='creativeQuestsCompleted')return num(u.stats.creativeQuestsCompleted)+num(u.stats.creativityQuestsCompleted);if(type==='levelReached')return u.level;if(type==='streakDays')return u.bestStreak;if(type==='totalXp'||type==='xpEarned')return Math.max(0,num(u.totalXpEarned)-num(u.achievementRewardXp));if(type==='coinsEarned')return Math.max(0,num(u.stats.coinsEarned)-num(u.achievementRewardCoins));return num(u.stats[type]);}
const achievementKey=a=>a.condition?.type?`${a.condition.type}:${num(a.condition.value??a.target,1)}`:a.id;
function achievementReward(s,u,reward){const before=num(u.totalXpEarned);grantReward(s,u,reward);u.achievementRewardXp=num(u.achievementRewardXp)+num(u.totalXpEarned)-before;u.achievementRewardCoins=num(u.achievementRewardCoins)+num(reward?.coins);}
export function evaluateGameAchievements(s,u){
  userDefaults(u);
  // A milestone is paid once even when the old catalog contains several IDs for it.
  const paid=new Set(s.achievements.filter(a=>u.achievements.includes(a.id)).map(achievementKey));
  const values=new Map(s.achievements.filter(a=>a.condition?.type).map(a=>[a.condition.type,metric(u,a.condition.type)]));
  const definitions=[...s.achievements].sort((a,b)=>Number(Boolean(a.catalog))-Number(Boolean(b.catalog)));
  for(const a of definitions){if(!a.condition?.type||a.condition.type==='hiddenCondition'||a.active===false||a.archived)continue;const value=values.get(a.condition.type);u.achievementProgress[a.id]=value;const key=achievementKey(a);if(value>=num(a.condition.value??a.target,1)&&!paid.has(key)){paid.add(key);u.achievements.push(a.id);achievementReward(s,u,a.reward||{xp:a.rewardXp});}}
  const invited=s.users.filter(member=>member.invitedBy===u.id),count=num(u.stats.invitedUsers||u.referrals?.length);
  const referralXp=invited.reduce((sum,member)=>sum+num(member.totalXpEarned),0),best=invited.reduce((n,member)=>Math.max(n,num(member.bestStreak)),0),gifts=(s.giftHistory||[]).filter(g=>invited.some(m=>m.id===g.fromId)&&invited.some(m=>m.id===g.toId)).length;
  for(const [id,value,target] of [['ref_first_friend',count,1],['ref_better_together',count,3],['ref_family_grows',count,5],['ref_big_family',count,10],['ref_home_for_all',count,20],['myth_infinity',referralXp,1000000],['myth_time_keeper',best,365],['myth_heart_myhabbit',gifts,500]]){u.achievementProgress[id]=value;if(value>=target&&!u.achievements.includes(id))u.achievements.push(id);}
  for(const c of s.stickerCollections){const pct=Math.floor(c.stickers.filter(st=>num(u.stickerInventory[st.id])>0).length/c.stickers.length*100);for(const [target,xp] of [[50,150],[100,500]]){const id=`collection_${c.id}_${target}`;u.achievementProgress[id]=pct;if(!s.achievements.some(a=>a.id===id))s.achievements.push({id,title:`${c.title}: ${target}%`,description:`Зібрати ${target}% колекції`,target,icon:'🏆'});if(pct>=target&&!u.achievements.includes(id)){u.achievements.push(id);achievementReward(s,u,{xp});}}}
}
function questReward(s,u,q,now,day){
  const key=completionKey(q,day);if(u.questCompletions[key])return;
  u.questCompletions[key]=now;grantReward(s,u,{coins:q.rewardCoins,xp:q.rewardXp,skills:q.skillRewards||{[q.skill]:q.skillXp}});
  u.stats.questsCompleted=num(u.stats.questsCompleted)+1;const category=q.category||q.skill||'discipline';u.stats[`${category}QuestsCompleted`]=num(u.stats[`${category}QuestsCompleted`])+1;
  for(const [key,value] of Object.entries(q.metrics||{}))u.stats[key]=num(u.stats[key])+num(value);
  if(q.rarity==='legendary')u.stats.legendaryQuestsCompleted=num(u.stats.legendaryQuestsCompleted)+1;
  if(day>String(u.lastHabitDay||'')){const yesterday=new Date(day+'T12:00:00Z');yesterday.setUTCDate(yesterday.getUTCDate()-1);u.streak=u.lastHabitDay===yesterday.toISOString().slice(0,10)?u.streak+1:1;u.lastHabitDay=day;u.bestStreak=Math.max(u.bestStreak,u.streak);}
  s.family.xp=num(s.family.xp)+num(q.rewardXp);s.family.coins=num(s.family.coins)+Math.round(num(q.rewardCoins)*.2);
  u.activity.unshift(`Виконано: ${q.title}`);
  s.history.unshift({eventId:`quest:${u.id}:${key}`,kind:'quest_completed',userId:u.id,familyId:s.family.id,title:q.title,category,xp:num(q.rewardXp),coins:num(q.rewardCoins),createdAt:now,confirmed:true,icon:q.icon,text:`${u.name} виконав(ла) «${q.title}»`,time:day});
}
function spend(u,amount){amount=num(amount);if(u.coins<amount)fail('Недостатньо монет');u.coins-=amount;}
function seasonActive(season,now){const day=gameDay(now),md=Number(day.slice(5).replace('-',''));if(season==='always')return true;if(season==='christmas')return md>=1201||md<=107;if(season==='halloween')return md>=1015&&md<=1102;if(season==='easter'){const y=Number(day.slice(0,4)),a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),date=Date.UTC(y,Math.floor((h+l-7*m+114)/31)-1,(h+l-7*m+114)%31+1),today=Date.parse(day+'T00:00:00Z');return today>=date-14*864e5&&today<date+8*864e5;}return false;}
export function applyGameAction(s,userId,op,now=Date.now(),random=Math.random){
  normalizeGame(s,now);const u=s.users.find(u=>u.id===userId);if(!u)fail('Профіль не знайдено');const day=gameDay(now);const affected=new Set([u]);let message='Збережено',detail={};
  if(op.type==='quest-claim'||op.type==='quest-complete'){
    const actionDay=op.day||day;if(!/^\d{4}-\d{2}-\d{2}$/.test(actionDay)||actionDay>day||Date.parse(day)-Date.parse(actionDay)>31*864e5)fail('Завдання за цю дату недоступне');
    let q=s.quests.find(q=>q.id===op.questId);if(!q&&String(op.questId).startsWith('daily-')){q=dailyQuests(s,actionDay).find(q=>q.id===op.questId);if(q)s.quests.push(q);}
    if(!q)fail('Квест не знайдено');const st=questStatus(s,u,q,actionDay);if(st.done)return {message:'Нагороду вже отримано'};if(st.reason)fail(st.reason);
    q.progress=q.progress||{};const p=q.progress[periodFor(q,actionDay)]||{joined:[],finished:[]};q.progress[periodFor(q,actionDay)]=p;
    if(op.type==='quest-claim'){p.joined=unique([...p.joined,userId]);message='Квест додано до ваших справ';}
    else {if(!p.joined.includes(userId))fail('Спочатку візьміть завдання');p.finished=unique([...p.finished,userId]);if(['pair','coop'].includes(q.type)&&p.finished.length<num(q.participants,2,25)){message='Вашу частину виконано. Чекаємо команду';}else {const recipients=['pair','coop'].includes(q.type)?p.finished:[userId];for(const id of recipients){const member=s.users.find(u=>u.id===id);if(member){questReward(s,member,q,now,actionDay);affected.add(member);}}if(q.type==='limited')q.stock=Math.max(0,num(q.stock)-1);message=`+${num(q.rewardCoins)} 🪙 · +${num(q.rewardXp)} XP`;}}
    q.claimedBy=p.joined;
  }else if(op.type==='shop-buy'){
    const item=s.shop.find(i=>i.id===op.itemId);if(!item||num(item.stock)<=0)fail('Товар закінчився');const price=num(item.price);let purchased=false;
    if(item.type==='collective'){const remaining=Math.max(0,price-num(item.fund));const amount=Math.min(u.coins,remaining,Math.max(1,Math.ceil(remaining/4)));if(remaining>0&&amount<=0)fail('Недостатньо монет');spend(u,amount);item.fund=num(item.fund)+amount;if(item.fund>=price){purchased=true;item.fund=0;}message=purchased?'Спільну ціль досягнуто!':`Внесено ${amount} монет`;}
    else {spend(u,price);purchased=true;message='Нагороду придбано';}
    if(purchased){item.stock=num(item.stock)-1;const order={id:op.id,sourceItemId:item.id,title:item.title,description:item.description,icon:item.icon,ownerId:u.id,startedAt:now,status:'available',kind:item.rewardKind||'permanent'};if(order.kind==='timed'){order.durationDays=num(item.durationDays,1,30);order.expiresAt=now+order.durationDays*864e5;}u.activeFeatures.push(order);u.purchaseHistory.push(copy(order));u.stats.purchasesCompleted=num(u.stats.purchasesCompleted)+1;s.history.unshift({eventId:op.id,userId:u.id,kind:'purchase',createdAt:now,icon:item.icon,text:`${u.name} придбав(ла) «${item.title}»`,time:day});}
  }else if(op.type==='cosmetic-buy'){
    const item=s.cosmeticsCatalog.find(i=>i.id===op.itemId);if(!item)fail('Предмет недоступний');if(!u.inventory.includes(item.id)){spend(u,item.price);grantItem(s,u,item.id);u.stats.purchasesCompleted=num(u.stats.purchasesCompleted)+1;}message='Предмет у колекції';
  }else if(op.type==='level-rewards'){
    const rewards=s.levelRewards.filter(r=>u.level>=r.level&&!u.claimedLevelRewards.includes(r.level));if(!rewards.length)return {message:'Нових подарунків поки немає'};for(const r of rewards){grantReward(s,u,r);u.claimedLevelRewards.push(r.level);}message='Подарунки рівня отримано';
  }else if(op.type==='sticker-box'){
    const box=s.stickerBoxes.find(b=>b.id===op.boxId),collection=s.stickerCollections.find(c=>c.id===box?.collectionId);if(!collection||!seasonActive(collection.season,now))fail('Сезонний бокс недоступний');spend(u,box.price);
    const weights={common:67,uncommon:40,rare:25,epic:8,legendary:2,mythic:1},total=collection.stickers.reduce((n,st)=>n+weights[st.rarity],0);let roll=random()*total;const sticker=collection.stickers.find(st=>(roll-=weights[st.rarity])<0)||collection.stickers[0];const isNew=!num(u.stickerInventory[sticker.id]);u.stickerInventory[sticker.id]=num(u.stickerInventory[sticker.id])+1;if(!isNew)u.stickerDust+=10;else {u.stickerUnlockHistory.push({stickerId:sticker.id,collectionId:collection.id,openedAt:now});grantXp(u,({common:3,uncommon:5,rare:10,epic:20,legendary:50,mythic:100})[sticker.rarity]);}u.stats.boxesOpened=num(u.stats.boxesOpened)+1;detail={sticker,collection,isNew,dust:isNew?0:10,box};message=isNew?'Новий стікер!':'Дублікат · +10 пилу';
  }else if(op.type==='dust-exchange'){
    const collection=s.stickerCollections.find(c=>c.id===op.collectionId);if(!collection||!seasonActive(collection.season,now))fail('Колекція недоступна');const sticker=collection.stickers.find(st=>!num(u.stickerInventory[st.id]));if(!sticker)fail('Колекція вже повна');if(u.stickerDust<100)fail('Потрібно 100 пилу');u.stickerDust-=100;u.stickerInventory[sticker.id]=1;u.stickerUnlockHistory.push({stickerId:sticker.id,collectionId:collection.id,openedAt:now});detail={sticker,collection,isNew:true,dust:0};message='Новий стікер за 100 пилу';
  }else if(op.type==='family-contribute'){
    const amount=Math.floor(num(op.amount));if(!amount)fail('Вкажіть суму');spend(u,amount);const fp=s.family.styleProgress||(s.family.styleProgress={level:1,contributions:{},unlockedThemes:['classic'],activeTheme:'classic'});fp.contributions=fp.contributions||{};fp.contributions[u.id]=num(fp.contributions[u.id])+amount;s.family.coins=num(s.family.coins)+amount;const members=s.users.filter(u=>!u.hiddenFromFamily);for(const level of FAMILY_STYLE_LEVELS){if(Object.values(fp.contributions).reduce((n,v)=>n+num(v),0)>=level.goal&&members.every(m=>num(fp.contributions[m.id])>=level.minEach)){fp.level=Math.max(num(fp.level,1),level.level);fp.unlockedThemes=unique([...(fp.unlockedThemes||['classic']),level.theme]);}}message='Внесок збережено';
  }else if(op.type==='profile-sticker'){
    if(!s.users.some(m=>m.id===op.to)||!num(u.stickerInventory[op.stickerId]))fail('Стікер або профіль недоступний');s.profileStickers=s.profileStickers.filter(st=>now-st.createdAt<7*864e5);if(s.profileStickers.filter(st=>st.to===op.to).length>=10)fail('На профілі вже 10 стікерів');spend(u,50);s.profileStickers.push({id:op.id,from:u.id,to:op.to,icon:op.stickerId,note:String(op.note||'').slice(0,120),createdAt:now});u.stats.stickersGiven=num(u.stats.stickersGiven)+1;message='Теплий слід залишено';
  }else if(op.type==='gift'){
    const to=s.users.find(m=>m.id===op.to);if(!to||to.id===u.id)fail('Оберіть іншого учасника');let title='',icon='🎁';
    if(op.kind==='sticker'){if(!num(u.stickerInventory[op.itemId]))fail('Немає цього стікера');u.stickerInventory[op.itemId]--;to.stickerInventory[op.itemId]=num(to.stickerInventory[op.itemId])+1;title='Стікер';}
    else if(op.kind==='cosmetic'){if(!u.inventory.includes(op.itemId)||to.inventory.includes(op.itemId))fail('Предмет недоступний для передачі');const item=s.cosmeticsCatalog.find(i=>i.id===op.itemId);if(!item||item.kind==='stickerPack')fail('Пакети не передаються');u.inventory=u.inventory.filter(id=>id!==item.id);for(const key of Object.keys(u.equipped))if(u.equipped[key]===item.id||u.equipped[key]===item.asset)u.equipped[key]=null;grantItem(s,to,item.id);title=item.title;}
    else if(op.kind==='feature'){const i=u.activeFeatures.findIndex(f=>f.id===op.itemId);if(i<0)fail('Нагорода недоступна');const f=u.activeFeatures[i];if(f.expiresAt&&f.expiresAt<=now)fail('Час дії завершився');u.activeFeatures.splice(i,1);to.activeFeatures.push({...f,ownerId:to.id,giftedById:u.id,giftedByName:u.name});title=f.title;icon=f.icon;}
    else fail('Невідомий тип подарунка');const gift={id:op.id,fromId:u.id,toId:to.id,fromName:u.name,toName:to.name,title,icon,note:String(op.note||'').slice(0,120),createdAt:now};s.giftHistory.push(gift);to.receivedGifts.push(gift);affected.add(to);message='Подарунок передано';
  }else if(op.type==='coin-transfer'){
    const to=s.users.find(member=>member.id===op.to),amount=Math.floor(num(op.amount));if(!to||to.id===u.id||!amount)fail('Вкажіть учасника та суму');spend(u,amount);to.coins+=amount;s.history.unshift({eventId:op.id,userId:u.id,kind:'coin_transfer',createdAt:now,icon:'🪙',text:u.name+' передав(ла) '+to.name+' '+amount+' монет',time:day});message='Монети передано';
  }else if(op.type==='admin-transfer'){
    if(!['owner','admin'].includes(u.role))fail('Недостатньо прав');const to=s.users.find(member=>member.id===op.to);if(!to||to.id===u.id)fail('Оберіть іншого учасника');for(const member of s.users)if(['owner','admin'].includes(member.role))member.role='member';to.role='owner';message='Права адміністратора передано';
  }else if(op.type==='match3-start'){
    const p=ensureMatch3(u,day);if(p.playedToday>=25)fail('Денний ліміт вичерпано');if(!p.session)p.session=createMatch3(p.level,Math.floor(random()*4294967296)||1);detail={session:copy(p.session)};message='Рівень розпочато';
  }else if(op.type==='match3-finish'){
    const p=ensureMatch3(u,day);if(!p.session||p.playedToday>=25)fail('Сесію гри не знайдено');const session=copy(p.session);if(!Array.isArray(op.moves)||op.moves.length>session.cfg.moves)fail('Некоректні ходи');for(const pair of op.moves){if(!Array.isArray(pair)||pair.length!==2||!applyMatch3Move(session,...pair))fail('Некоректний хід');}if(session.score<session.cfg.goal)fail('Мету ще не досягнуто');const mult=session.cfg.boss==='grand'?3:session.cfg.boss==='boss'?2.2:session.cfg.boss==='mini'?1.6:1;const coins=Math.round((1+Math.min(2,Math.floor(p.level/25)))*mult),xp=Math.round((6+Math.min(10,Math.floor(p.level/10)))*mult);grantReward(s,u,{coins,xp});p.level++;p.playedToday++;p.totalCompleted++;p.session=null;u.stats.match3Completed=p.totalCompleted;message=`Рівень пройдено · +${coins} 🪙 · +${xp} XP`;
  }else fail('Невідома дія');
  for(const member of affected)evaluateGameAchievements(s,member);normalizeGame(s,now);return {message,...detail};
}
export function ensureMatch3(u,day=gameDay()){const p=u.match3||{};u.match3={...p,level:Math.floor(num(p.level,1)),totalCompleted:num(p.totalCompleted),playedToday:p.day===day?num(p.playedToday):0,day,session:p.day===day?p.session||null:null};return u.match3;}
export function match3Config(level){const boss=level%50===0?'grand':level%25===0?'boss':level%10===0?'mini':null,tier=Math.min(12,Math.floor((level-1)/10));return {level,boss,size:level>=50?8:7,moves:Math.max(18,26-Math.floor(tier/2)+(boss?4:0)),goal:18+tier*3+(boss==='grand'?28:boss==='boss'?18:boss?10:0),colors:Math.min(6,5+Math.floor(level/30))};}
function rng(rt){let n=rt.seed|0;n^=n<<13;n^=n>>>17;n^=n<<5;rt.seed=n>>>0;return rt.seed/4294967296;}
export function matches(board,size){const found=new Set();for(let r=0;r<size;r++)for(let c=0;c<size;c++){const i=r*size+c,v=board[i];if(v==null)continue;if(c+2<size&&board[i+1]===v&&board[i+2]===v){let n=c;while(n<size&&board[r*size+n]===v)found.add(r*size+n++);}if(r+2<size&&board[i+size]===v&&board[i+2*size]===v){let n=r;while(n<size&&board[n*size+c]===v)found.add(n++*size+c);}}return [...found];}
function canMove(board,size){for(let i=0;i<board.length;i++)for(const j of [i%size<size-1?i+1:-1,i+size<board.length?i+size:-1]){if(j<0)continue;[board[i],board[j]]=[board[j],board[i]];const ok=matches(board,size).length>0;[board[i],board[j]]=[board[j],board[i]];if(ok)return true;}return false;}
function generate(rt){const {size,colors}=rt.cfg;for(let attempt=0;attempt<100;attempt++){const b=[];for(let r=0;r<size;r++)for(let c=0;c<size;c++){const choices=Array.from({length:colors},(_,i)=>i).filter(v=>!(c>=2&&b[b.length-1]===v&&b[b.length-2]===v)&&!(r>=2&&b[b.length-size]===v&&b[b.length-size*2]===v));b.push(choices[Math.floor(rng(rt)*choices.length)]);}if(canMove(b,size))return b;}fail('Не вдалося підготувати поле');}
export function createMatch3(level,seed){const rt={cfg:match3Config(level),seed:seed>>>0||1,score:0,moves:match3Config(level).moves,moveLog:[],selected:null};rt.board=generate(rt);return rt;}
export function applyMatch3Move(rt,a,b,onFrame){
  const {size,colors}=rt.cfg;if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>=rt.board.length||b>=rt.board.length||rt.moves<=0||rt.score>=rt.cfg.goal||Math.abs(Math.floor(a/size)-Math.floor(b/size))+Math.abs(a%size-b%size)!==1)return false;
  [rt.board[a],rt.board[b]]=[rt.board[b],rt.board[a]];if(!matches(rt.board,size).length){[rt.board[a],rt.board[b]]=[rt.board[b],rt.board[a]];return false;}rt.moves--;rt.moveLog.push([a,b]);rt.combo=0;
  for(let cascade=0;cascade<100;cascade++){const hit=matches(rt.board,size);if(!hit.length)break;rt.combo++;rt.score+=hit.length;onFrame?.({kind:'clear',board:[...rt.board],hit,combo:rt.combo,score:rt.score});const drops=[];hit.forEach(i=>rt.board[i]=null);for(let c=0;c<size;c++){const kept=[],from=[];for(let r=size-1;r>=0;r--)if(rt.board[r*size+c]!=null){kept.push(rt.board[r*size+c]);from.push(r);}for(let r=size-1,k=0;r>=0;r--,k++){rt.board[r*size+c]=k<kept.length?kept[k]:Math.floor(rng(rt)*colors);drops[r*size+c]=r-(k<from.length?from[k]:-(k-from.length+1));}}onFrame?.({kind:'drop',board:[...rt.board],drops,combo:rt.combo,score:rt.score});}
  if(matches(rt.board,size).length||!canMove(rt.board,size)){rt.board=generate(rt);onFrame?.({kind:'shuffle',board:[...rt.board]});}return true;
}
