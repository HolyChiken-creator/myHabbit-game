import { GAME_VERSION, DAILY_QUEST_TEMPLATES, cosmeticDefaults, LEVEL_REWARDS, defaultStickerCollections, defaultStickerBoxes, FAMILY_STYLE_LEVELS, QUEST_MILESTONE_ACHIEVEMENTS, QUEST_LIBRARY, ACHIEVEMENT_LIBRARY } from './game-content.js';

export { GAME_VERSION };
export const skillKeys=['home','care','health','growth','finance','family','relationship','sport','mind','reading','cinema','creativity','discipline'];
export const ROOM_THEME_PACKS=[
  {level:0,id:'room-zero',title:'Занедбана кімната',subtitle:'Стартовий стан',price:0,icon:'🧹',theme:'zero'},
  {level:1,id:'room-cozy',title:'Cozy',subtitle:'Перший затишний стиль',price:0,icon:'🪴',theme:'cozy'},
  {level:2,id:'room-warm',title:'Warm',subtitle:'Теплий стиль',price:0,icon:'🛋️',theme:'warm'},
  {level:3,id:'room-hitech',title:'Hi-tech',subtitle:'М’який технологічний стиль',price:0,icon:'✨',theme:'hitech'},
  {level:4,id:'room-gothic',title:'Gothic',subtitle:'Готичний стиль',price:0,icon:'🕯️',theme:'gothic'}
];
export function roomThemePack(level){return ROOM_THEME_PACKS.find(x=>x.level===Math.trunc(num(level)))||ROOM_THEME_PACKS[0];}
export const ROOM_DECOR_CATALOG=[
  {id:'background-zero',slot:'background',title:'Занедбаний фон',price:0,icon:'🏚️',theme:'zero',tier:0},
  {id:'background-cozy',slot:'background',title:'Затишний фон',price:24,icon:'🏡',theme:'cozy',tier:1},
  {id:'background-warm',slot:'background',title:'Теплий фон',price:48,icon:'🌤️',theme:'warm',tier:2},
  {id:'background-hitech',slot:'background',title:'Hi-tech фон',price:84,icon:'✨',theme:'hitech',tier:3},
  {id:'background-gothic',slot:'background',title:'Готичний фон',price:132,icon:'🌙',theme:'gothic',tier:4},

  {id:'window-zero',slot:'window',title:'Занедбане вікно',price:0,icon:'🪟',theme:'zero',tier:0},
  {id:'window-cozy',slot:'window',title:'Затишне вікно',price:24,icon:'🪟',theme:'cozy',tier:1},
  {id:'window-warm',slot:'window',title:'Тепле вікно',price:54,icon:'🎀',theme:'warm',tier:2},
  {id:'window-hitech',slot:'window',title:'Hi-tech вікно',price:90,icon:'💡',theme:'hitech',tier:3},
  {id:'window-gothic',slot:'window',title:'Готичне вікно',price:144,icon:'🌙',theme:'gothic',tier:4},

  {id:'armchair-zero',slot:'armchair',title:'Занедбане крісло',price:0,icon:'🪑',theme:'zero',tier:0},
  {id:'armchair-cozy',slot:'armchair',title:'Затишне крісло',price:30,icon:'🛋️',theme:'cozy',tier:1},
  {id:'armchair-warm',slot:'armchair',title:'Тепле крісло',price:60,icon:'🛋️',theme:'warm',tier:2},
  {id:'armchair-hitech',slot:'armchair',title:'Hi-tech крісло',price:102,icon:'✨',theme:'hitech',tier:3},
  {id:'armchair-gothic',slot:'armchair',title:'Готичне крісло',price:156,icon:'🕯️',theme:'gothic',tier:4},

  {id:'table-zero',slot:'table',title:'Занедбаний столик',price:0,icon:'🪵',theme:'zero',tier:0},
  {id:'table-cozy',slot:'table',title:'Затишний столик',price:18,icon:'☕',theme:'cozy',tier:1},
  {id:'table-warm',slot:'table',title:'Теплий столик',price:42,icon:'☕',theme:'warm',tier:2},
  {id:'table-hitech',slot:'table',title:'Hi-tech столик',price:72,icon:'✨',theme:'hitech',tier:3},
  {id:'table-gothic',slot:'table',title:'Готичний столик',price:108,icon:'🕯️',theme:'gothic',tier:4},

  {id:'bookshelf-zero',slot:'bookshelf',title:'Занедбана книжкова шафа',price:0,icon:'📚',theme:'zero',tier:0},
  {id:'bookshelf-cozy',slot:'bookshelf',title:'Затишна книжкова шафа',price:24,icon:'📚',theme:'cozy',tier:1},
  {id:'bookshelf-warm',slot:'bookshelf',title:'Тепла книжкова шафа',price:54,icon:'📚',theme:'warm',tier:2},
  {id:'bookshelf-hitech',slot:'bookshelf',title:'Hi-tech книжкова шафа',price:96,icon:'✨',theme:'hitech',tier:3},
  {id:'bookshelf-gothic',slot:'bookshelf',title:'Готична книжкова шафа',price:144,icon:'📚',theme:'gothic',tier:4},

  {id:'fireplace-zero',slot:'fireplace',title:'Занедбаний камін',price:0,icon:'▫️',theme:'zero',tier:0},
  {id:'fireplace-cozy',slot:'fireplace',title:'Затишний камін',price:30,icon:'🔥',theme:'cozy',tier:1},
  {id:'fireplace-warm',slot:'fireplace',title:'Теплий камін',price:66,icon:'🔥',theme:'warm',tier:2},
  {id:'fireplace-hitech',slot:'fireplace',title:'Hi-tech камін',price:108,icon:'✨',theme:'hitech',tier:3},
  {id:'fireplace-gothic',slot:'fireplace',title:'Готичний камін',price:168,icon:'🕯️',theme:'gothic',tier:4},

  {id:'rug-zero',slot:'rug',title:'Занедбаний килим',price:0,icon:'▫️',theme:'zero',tier:0},
  {id:'rug-cozy',slot:'rug',title:'Затишний килим',price:18,icon:'🧶',theme:'cozy',tier:1},
  {id:'rug-warm',slot:'rug',title:'Теплий килим',price:36,icon:'🧶',theme:'warm',tier:2},
  {id:'rug-hitech',slot:'rug',title:'Hi-tech килим',price:60,icon:'✨',theme:'hitech',tier:3},
  {id:'rug-gothic',slot:'rug',title:'Готичний килим',price:96,icon:'🌙',theme:'gothic',tier:4},

  {id:'plant-zero',slot:'plant',title:'Занедбана рослина',price:0,icon:'🥀',theme:'zero',tier:0},
  {id:'plant-cozy',slot:'plant',title:'Затишна рослина',price:12,icon:'🪴',theme:'cozy',tier:1},
  {id:'plant-warm',slot:'plant',title:'Тепла рослина',price:30,icon:'🌿',theme:'warm',tier:2},
  {id:'plant-hitech',slot:'plant',title:'Hi-tech рослина',price:54,icon:'✨',theme:'hitech',tier:3},
  {id:'plant-gothic',slot:'plant',title:'Готична рослина',price:84,icon:'🥀',theme:'gothic',tier:4},
  {id:'painting-zero',slot:'painting',title:'Занедбана картина',price:0,icon:'🖼️',theme:'zero',tier:0},
  {id:'painting-cozy',slot:'painting',title:'Cozy · Картина',price:24,icon:'🖼️',theme:'cozy',tier:1},
  {id:'painting-warm',slot:'painting',title:'Warm · Картина',price:54,icon:'🖼️',theme:'warm',tier:2},
  {id:'painting-hitech',slot:'painting',title:'Hi-tech · Картина',price:96,icon:'🖼️',theme:'hitech',tier:3},
  {id:'painting-gothic',slot:'painting',title:'Gothic · Картина',price:156,icon:'🖼️',theme:'gothic',tier:4},
  {id:'lamp-zero',slot:'lamp',title:'Занедбаний торшер',price:0,icon:'💡',theme:'zero',tier:0},
  {id:'lamp-cozy',slot:'lamp',title:'Cozy · Торшер',price:30,icon:'💡',theme:'cozy',tier:1},
  {id:'lamp-warm',slot:'lamp',title:'Warm · Торшер',price:66,icon:'💡',theme:'warm',tier:2},
  {id:'lamp-hitech',slot:'lamp',title:'Hi-tech · Торшер',price:108,icon:'💡',theme:'hitech',tier:3},
  {id:'lamp-gothic',slot:'lamp',title:'Gothic · Торшер',price:168,icon:'💡',theme:'gothic',tier:4},
  {id:'clock-zero',slot:'clock',title:'Занедбаний годинник',price:0,icon:'🕰️',theme:'zero',tier:0},
  {id:'clock-cozy',slot:'clock',title:'Cozy · Годинник',price:18,icon:'🕰️',theme:'cozy',tier:1},
  {id:'clock-warm',slot:'clock',title:'Warm · Годинник',price:42,icon:'🕰️',theme:'warm',tier:2},
  {id:'clock-hitech',slot:'clock',title:'Hi-tech · Годинник',price:78,icon:'🕰️',theme:'hitech',tier:3},
  {id:'clock-gothic',slot:'clock',title:'Gothic · Годинник',price:132,icon:'🕰️',theme:'gothic',tier:4}
];
for(const slot of ["window", "armchair", "table", "bookshelf", "fireplace", "rug", "plant", "painting", "lamp", "clock"])ROOM_DECOR_CATALOG.push({id:slot+'-empty',slot,title:'Порожньо',price:0,icon:'∅',theme:'empty',tier:0,empty:true});
export function roomDecorPrerequisite(item){
  if(!item||num(item.tier)<=1)return null;
  return ROOM_DECOR_CATALOG.find(x=>x.slot===item.slot&&num(x.tier)===num(item.tier)-1)||null;
}
export const num=(v,min=0,max=1000000000)=>Math.max(min,Math.min(max,Number.isFinite(Number(v))?Number(v):min));
export function questDiamondReward(q={}){const difficulty={easy:1,normal:2,hard:3}[q.difficulty||'normal']||2;const team=['pair','coop'].includes(q.type)?1:0;const limited=q.type==='limited'?1:0;return Math.max(1,difficulty+team+limited);}
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
    ...old,id:old?.id||`daily-${day}-${key}`,templateKey:key,dailyDay:day,source:'daily',title:o.title||t[0],icon:o.icon||t[1],description:o.description||t[2],skill:o.skill||t[3],difficulty:o.difficulty||t[4],rewardCoins:num(o.rewardCoins??t[5]),rewardXp:num(o.rewardXp??t[6]),rewardDiamonds:num(o.rewardDiamonds??questDiamondReward({difficulty:o.difficulty||t[4],type:o.type||'personal'})),skillXp:Math.max(8,Math.round(num(o.rewardXp??t[6])/4)),type:o.type||'personal',participants:['coop','pair'].includes(o.type)?2:1,stock:(o.type==='limited'?num(old?.stock??1):undefined),status:'active',claimedBy:old?.claimedBy||[],progress:old?.progress||{},recurring:Boolean(t[7]),prerequisiteId:o.prerequisiteId||'',stage:o.stage||'',metrics:/^Прочитати 10/.test(t[0])?{pagesRead:10}:{}
  };});
}
function catalogQuest(q){const skills=q.rewards?.skills||{},skill=Object.keys(skills)[0]||q.category||'discipline';const pages=/Прочитай (\d+) сторінок/.exec(q.title||'');return {...q,catalog:true,source:'catalog',icon:({reading:'📖',sport:'💪',home:'🏠',health:'🌿',cinema:'🎬'})[q.category]||'✨',claimedBy:[],status:'active',participants:['pair','coop'].includes(q.type)?2:1,rewardCoins:num(q.rewards?.coins),rewardXp:num(q.rewards?.xp),rewardDiamonds:num(q.rewards?.diamonds??questDiamondReward(q)),skill,skillXp:num(skills[skill]),skillRewards:skills,metrics:pages?{pagesRead:Number(pages[1])}:q.category==='cinema'&&/фільм/i.test(q.title)?{filmsWatched:1}:{},stock:q.type==='limited'?1:undefined};}
export function xpRequired(level){const fixed=[0,1500,1800,2150,2550,3000,3500,4050,4650,5300];level=Math.trunc(num(level,1,1000));if(level<fixed.length)return fixed[level];let need=5300;for(let n=10;n<=level;n++)need=Math.min(1000000000,Math.round((need*1.105+140)/50)*50);return need;}
export function grantXp(u,amount){amount=Math.trunc(num(amount));u.totalXpEarned=num(u.totalXpEarned)+amount;u.xp=num(u.xp)+amount;while(u.level<1000&&u.xp>=xpRequired(u.level)){u.xp-=xpRequired(u.level);u.level++;u.coins=num(u.coins)+50;u.diamonds=num(u.diamonds)+2;u.stats=u.stats||{};u.stats.diamondsEarned=num(u.stats.diamondsEarned)+2;}return amount;}
function userDefaults(u){
  u.level=Math.trunc(num(u.level,1,1000));u.xp=num(u.xp);u.coins=num(u.coins);u.skills=u.skills||{};u.skillXp=u.skillXp||{};
  if(u.diamonds==null)u.diamonds=8;else u.diamonds=Math.trunc(num(u.diamonds));
  for(const key of skillKeys){u.skills[key]=num(u.skills[key]);u.skillXp[key]=num(u.skillXp[key]??u.skills[key]*100);}
  for(const key of ['achievements','inventory','claimedLevelRewards','activity','activeFeatures','receivedGifts','stickerUnlockHistory','purchaseHistory','fulfilledPacks','roomDecorOwned'])u[key]=Array.isArray(u[key])?u[key]:[];
  for(const key of ['stats','questCompletions','achievementProgress','stickerInventory','equipped','roomDecor'])u[key]=u[key]&&typeof u[key]==='object'?u[key]:{};
  const defaults={background:'background-zero',window:'window-zero',armchair:'armchair-zero',table:'table-zero',bookshelf:'bookshelf-zero',fireplace:'fireplace-zero',rug:'rug-zero',plant:'plant-zero',painting:'painting-zero',lamp:'lamp-zero',clock:'clock-zero'};
  if(!u.roomAssetShopV1){
    // New room model: every furniture/background slot starts at Step 0 and upgrades independently.
    u.roomDecor={...defaults};
    u.roomDecorOwned=Object.values(defaults);
    u.roomAssetShopV1=true;
  }
  for(const [slot,id] of Object.entries(defaults)){if(!u.roomDecor[slot]||!ROOM_DECOR_CATALOG.some(x=>x.id===u.roomDecor[slot]&&x.slot===slot))u.roomDecor[slot]=id;if(!u.roomDecorOwned.includes(id))u.roomDecorOwned.push(id);}
  u.roomDecorOwned.push(...ROOM_DECOR_CATALOG.filter(item=>item.empty).map(item=>item.id));
  u.roomDecorOwned=unique(u.roomDecorOwned.filter(id=>ROOM_DECOR_CATALOG.some(item=>item.id===id)));
  u.roomThemeOwned=[0];u.roomThemeLevel=0;
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
  for(const q of s.quests)if(q.rewardDiamonds==null)q.rewardDiamonds=questDiamondReward(q);
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
  for(const q of s.quests){if(q.rewardDiamonds==null)q.rewardDiamonds=questDiamondReward(q);else q.rewardDiamonds=Math.trunc(num(q.rewardDiamonds));}
  s.meta.version=GAME_VERSION;
  return s;
}
function grantSkills(u,rewards){for(const [key,value] of Object.entries(rewards||{})){if(!skillKeys.includes(key))continue;u.skillXp[key]=num(u.skillXp[key])+num(value);u.skills[key]=Math.floor(u.skillXp[key]/100);}}
function grantReward(s,u,reward){u.coins+=num(reward?.coins);u.stats.coinsEarned=num(u.stats.coinsEarned)+num(reward?.coins);const diamonds=Math.trunc(num(reward?.diamonds));if(diamonds){u.diamonds=num(u.diamonds)+diamonds;u.stats.diamondsEarned=num(u.stats.diamondsEarned)+diamonds;}grantXp(u,reward?.xp);grantSkills(u,reward?.skillXp||reward?.skills);if(reward?.item)grantItem(s,u,reward.item);}
function fulfilPack(s,u,item){if(u.fulfilledPacks.includes(item.id))return;const collection=s.stickerCollections.find(c=>c.id===({'cozy-cats':'cozy-cats','bunny-notes':'bunny-love'})[item.asset]);if(!collection)return;for(const st of collection.stickers.slice(0,5))u.stickerInventory[st.id]=num(u.stickerInventory[st.id])+1;u.fulfilledPacks.push(item.id);}
function grantItem(s,u,id){const item=s.cosmeticsCatalog.find(i=>i.id===id);if(!item)fail('Цей предмет поки недоступний');u.inventory=unique([...u.inventory,id]);if(item.kind==='stickerPack')fulfilPack(s,u,item);}
function metric(u,type){if(type==='creativeQuestsCompleted')return num(u.stats.creativeQuestsCompleted)+num(u.stats.creativityQuestsCompleted);if(type==='levelReached')return u.level;if(type==='streakDays')return u.bestStreak;if(type==='totalXp'||type==='xpEarned')return Math.max(0,num(u.totalXpEarned)-num(u.achievementRewardXp));if(type==='coinsEarned')return Math.max(0,num(u.stats.coinsEarned)-num(u.achievementRewardCoins));return num(u.stats[type]);}
export const achievementKey=a=>a.condition?.type&&a.condition.type!=='hiddenCondition'?`${({totalXp:'xpEarned',creativityQuestsCompleted:'creativeQuestsCompleted'})[a.condition.type]||a.condition.type}:${num(a.condition.value??a.target,1)}`:a.id;
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
  u.questCompletions[key]=now;const diamonds=Math.trunc(num(q.rewardDiamonds??questDiamondReward(q)));grantReward(s,u,{coins:q.rewardCoins,xp:q.rewardXp,diamonds,skills:q.skillRewards||{[q.skill]:q.skillXp}});
  u.stats.questsCompleted=num(u.stats.questsCompleted)+1;const category=q.category||q.skill||'discipline';u.stats[`${category}QuestsCompleted`]=num(u.stats[`${category}QuestsCompleted`])+1;
  for(const [key,value] of Object.entries(q.metrics||{}))u.stats[key]=num(u.stats[key])+num(value);
  if(q.rarity==='legendary')u.stats.legendaryQuestsCompleted=num(u.stats.legendaryQuestsCompleted)+1;
  if(day>String(u.lastHabitDay||'')){const yesterday=new Date(day+'T12:00:00Z');yesterday.setUTCDate(yesterday.getUTCDate()-1);u.streak=u.lastHabitDay===yesterday.toISOString().slice(0,10)?u.streak+1:1;u.lastHabitDay=day;u.bestStreak=Math.max(u.bestStreak,u.streak);if(u.streak>0&&u.streak%7===0){grantReward(s,u,{diamonds:5});u.activity.unshift(`Серія ${u.streak} днів · +5 💎`);}}
  s.family.xp=num(s.family.xp)+num(q.rewardXp);s.family.coins=num(s.family.coins)+Math.round(num(q.rewardCoins)*.2);
  u.activity.unshift(`Виконано: ${q.title}`);
  s.history.unshift({eventId:`quest:${u.id}:${key}`,kind:'quest_completed',userId:u.id,familyId:s.family.id,title:q.title,category,xp:num(q.rewardXp),coins:num(q.rewardCoins),diamonds:num(q.rewardDiamonds??questDiamondReward(q)),createdAt:now,confirmed:true,icon:q.icon,text:`${u.name} виконав(ла) «${q.title}»`,time:day});
}
function spend(u,amount){amount=num(amount);if(u.coins<amount)fail('Недостатньо монет');u.coins-=amount;}
function seasonActive(season,now,testing=false){const day=gameDay(now),md=Number(day.slice(5).replace('-',''));if(season==='always'||testing)return true;if(season==='christmas')return md>=1201||md<=107;if(season==='halloween')return md>=1015&&md<=1102;if(season==='easter'){const y=Number(day.slice(0,4)),a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),date=Date.UTC(y,Math.floor((h+l-7*m+114)/31)-1,(h+l-7*m+114)%31+1),today=Date.parse(day+'T00:00:00Z');return today>=date-14*864e5&&today<date+8*864e5;}return false;}
export function applyGameAction(s,userId,op,now=Date.now(),random=Math.random,context={}){
  normalizeGame(s,now);const u=s.users.find(u=>u.id===userId);if(!u)fail('Профіль не знайдено');const day=gameDay(now);const affected=new Set([u]);let message='Збережено',detail={};
  if(op.type==='quest-claim'||op.type==='quest-complete'){
    const actionDay=op.day||day;if(!/^\d{4}-\d{2}-\d{2}$/.test(actionDay)||actionDay>day||Date.parse(day)-Date.parse(actionDay)>31*864e5)fail('Завдання за цю дату недоступне');
    let q=s.quests.find(q=>q.id===op.questId);if(!q&&String(op.questId).startsWith('daily-')){q=dailyQuests(s,actionDay).find(q=>q.id===op.questId);if(q)s.quests.push(q);}
    if(!q)fail('Квест не знайдено');const st=questStatus(s,u,q,actionDay);if(st.done)return {message:'Нагороду вже отримано'};if(st.reason)fail(st.reason);
    q.progress=q.progress||{};const p=q.progress[periodFor(q,actionDay)]||{joined:[],finished:[]};q.progress[periodFor(q,actionDay)]=p;
    if(op.type==='quest-claim'){p.joined=unique([...p.joined,userId]);message='Квест додано до ваших справ';}
    else {if(!p.joined.includes(userId))fail('Спочатку візьміть завдання');p.finished=unique([...p.finished,userId]);if(['pair','coop'].includes(q.type)&&p.finished.length<num(q.participants,2,25)){message='Вашу частину виконано. Чекаємо команду';}else {const recipients=['pair','coop'].includes(q.type)?p.finished:[userId];for(const id of recipients){const member=s.users.find(u=>u.id===id);if(member){questReward(s,member,q,now,actionDay);affected.add(member);}}if(q.type==='limited')q.stock=Math.max(0,num(q.stock)-1);message=`+${num(q.rewardCoins)} 🪙 · +${num(q.rewardDiamonds??questDiamondReward(q))} 💎 · +${num(q.rewardXp)} XP`;}}
    q.claimedBy=p.joined;
  }else if(op.type==='shop-buy'){
    const item=s.shop.find(i=>i.id===op.itemId);if(!item||num(item.stock)<=0)fail('Товар закінчився');const price=num(item.price);let purchased=false;
    if(item.type==='collective'){const remaining=Math.max(0,price-num(item.fund));const amount=Math.min(u.coins,remaining,Math.max(1,Math.ceil(remaining/4)));if(remaining>0&&amount<=0)fail('Недостатньо монет');spend(u,amount);item.fund=num(item.fund)+amount;if(item.fund>=price){purchased=true;item.fund=0;}message=purchased?'Спільну ціль досягнуто!':`Внесено ${amount} монет`;}
    else {spend(u,price);purchased=true;message='Нагороду придбано';}
    if(purchased){item.stock=num(item.stock)-1;const order={id:op.id,sourceItemId:item.id,title:item.title,description:item.description,icon:item.icon,ownerId:u.id,startedAt:now,status:'available',kind:item.rewardKind||'permanent'};if(order.kind==='timed'){order.durationDays=num(item.durationDays,1,30);order.expiresAt=now+order.durationDays*864e5;}u.activeFeatures.push(order);u.purchaseHistory.push(copy(order));u.stats.purchasesCompleted=num(u.stats.purchasesCompleted)+1;s.history.unshift({eventId:op.id,userId:u.id,kind:'purchase',createdAt:now,icon:item.icon,text:`${u.name} придбав(ла) «${item.title}»`,time:day});}
  }else if(op.type==='cosmetic-buy'){
    const item=s.cosmeticsCatalog.find(i=>i.id===op.itemId);if(!item)fail('Предмет недоступний');if(!u.inventory.includes(item.id)){spend(u,item.price);grantItem(s,u,item.id);u.stats.purchasesCompleted=num(u.stats.purchasesCompleted)+1;}message='Предмет у колекції';
  }else if(op.type==='room-theme-buy'||op.type==='room-theme-equip'){
    const level=Math.trunc(num(op.level,0,4)),pack=ROOM_THEME_PACKS.find(x=>x.level===level);if(!pack)fail('Рівень кімнати недоступний');
    u.roomThemeOwned=Array.isArray(u.roomThemeOwned)?unique(u.roomThemeOwned.map(x=>Math.trunc(num(x,0,4)))):[0];if(!u.roomThemeOwned.includes(0))u.roomThemeOwned.unshift(0);
    if(op.type==='room-theme-buy'&&!u.roomThemeOwned.includes(level)){
      const previous=Math.max(0,level-1);if(level>0&&!u.roomThemeOwned.includes(previous))fail(`Спочатку відкрийте рівень ${previous}`);
      const price=Math.trunc(num(pack.price));if(u.diamonds<price)fail('Недостатньо діамантів');u.diamonds-=price;u.roomThemeOwned.push(level);u.roomThemeOwned=unique(u.roomThemeOwned);u.stats.roomThemePurchased=num(u.stats.roomThemePurchased)+1;
    }
    if(!u.roomThemeOwned.includes(level))fail('Спочатку придбайте цей рівень кімнати');u.roomThemeLevel=level;message=op.type==='room-theme-buy'?'Новий рівень кімнати відкрито':'Рівень кімнати встановлено';detail={level,diamonds:u.diamonds};
  }else if(op.type==='room-decor-buy'||op.type==='room-decor-equip'){
    const item=ROOM_DECOR_CATALOG.find(i=>i.id===op.itemId);if(!item)fail('Елемент кімнати недоступний');
    if(op.type==='room-decor-buy'&&!u.roomDecorOwned.includes(item.id)){
      const prerequisite=roomDecorPrerequisite(item);
      if(prerequisite&&!u.roomDecorOwned.includes(prerequisite.id))fail(`Спочатку відкрийте «${prerequisite.title}»`);
      const price=Math.trunc(num(item.price));if(u.diamonds<price)fail('Недостатньо діамантів');u.diamonds-=price;u.roomDecorOwned.push(item.id);u.stats.roomDecorPurchased=num(u.stats.roomDecorPurchased)+1;
    }
    if(!u.roomDecorOwned.includes(item.id))fail('Спочатку відкрийте цей декор');u.roomDecor[item.slot]=item.id;message=op.type==='room-decor-buy'?'Покращення відкрито й встановлено':'Оформлення кімнати змінено';detail={itemId:item.id,slot:item.slot,diamonds:u.diamonds};
  }else if(op.type==='room-layout-save'){
    if(!['admin','owner'].includes(String(u.role||'')))fail('Лише адміністратор може зберігати розташування кімнати');
    const incoming=op.layout&&typeof op.layout==='object'?op.layout:{};
    const safe={};
    for(const [level,layout] of Object.entries(incoming).slice(0,5)){
      const n=Math.max(0,Math.min(4,Math.trunc(num(level,0,4))));
      safe[n]={};
      for(const slot of ['window','armchair','table','bookshelf','fireplace','rug','plant','painting','lamp','clock','teddy']){
        const b=layout?.[slot];if(!b||typeof b!=='object')continue;
        safe[n][slot]={x:num(b.x,0,95),y:num(b.y,0,95),w:num(b.w,5,80),z:Math.trunc(num(b.z,1,40)),...(Number.isFinite(b.h)?{h:num(b.h,3,95)}:{})};
      }
    }
    s.roomLayoutMaster=safe;s.roomLayoutVersion=2;message='Розташування кімнати збережено для всіх';detail={roomLayoutMaster:safe};
  }else if(op.type==='level-rewards'){
    const rewards=s.levelRewards.filter(r=>u.level>=r.level&&!u.claimedLevelRewards.includes(r.level));if(!rewards.length)return {message:'Нових подарунків поки немає'};for(const r of rewards){grantReward(s,u,r);u.claimedLevelRewards.push(r.level);}message='Подарунки рівня отримано';
  }else if(op.type==='sticker-box'){
    const box=s.stickerBoxes.find(b=>b.id===op.boxId),collection=s.stickerCollections.find(c=>c.id===box?.collectionId);if(!collection||!seasonActive(collection.season,now,Boolean(context?.seasonalStickerTesting)))fail('Сезонний бокс недоступний');spend(u,box.price);
    const weights={common:67,uncommon:40,rare:25,epic:8,legendary:2,mythic:1},total=collection.stickers.reduce((n,st)=>n+weights[st.rarity],0);let roll=random()*total;const sticker=collection.stickers.find(st=>(roll-=weights[st.rarity])<0)||collection.stickers[0];const isNew=!num(u.stickerInventory[sticker.id]);u.stickerInventory[sticker.id]=num(u.stickerInventory[sticker.id])+1;if(!isNew)u.stickerDust+=10;else {u.stickerUnlockHistory.push({stickerId:sticker.id,collectionId:collection.id,openedAt:now});grantXp(u,({common:3,uncommon:5,rare:10,epic:20,legendary:50,mythic:100})[sticker.rarity]);}u.stats.boxesOpened=num(u.stats.boxesOpened)+1;detail={sticker,collection,isNew,dust:isNew?0:10,box};message=isNew?'Новий стікер!':'Дублікат · +10 пилу';
  }else if(op.type==='dust-exchange'){
    const collection=s.stickerCollections.find(c=>c.id===op.collectionId);if(!collection||!seasonActive(collection.season,now,Boolean(context?.seasonalStickerTesting)))fail('Колекція недоступна');const sticker=collection.stickers.find(st=>!num(u.stickerInventory[st.id]));if(!sticker)fail('Колекція вже повна');if(u.stickerDust<100)fail('Потрібно 100 пилу');u.stickerDust-=100;u.stickerInventory[sticker.id]=1;u.stickerUnlockHistory.push({stickerId:sticker.id,collectionId:collection.id,openedAt:now});detail={sticker,collection,isNew:true,dust:0};message='Новий стікер за 100 пилу';
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
    const p=ensureMatch3(u,day);if(!p.session||p.playedToday>=25)fail('Сесію гри не знайдено');const session=copy(p.session);if(!Array.isArray(op.moves)||op.moves.length>session.cfg.moves+8)fail('Некоректні ходи');for(const command of op.moves){if(!applyMatch3Command(session,command))fail('Некоректний хід');}if(session.score<session.cfg.goal)fail('Мету ще не досягнуто');const mult=session.cfg.boss==='grand'?3:session.cfg.boss==='boss'?2.2:session.cfg.boss==='mini'?1.6:1;const coins=Math.round((2+Math.min(4,Math.floor(p.level/20)))*mult),xp=Math.round((8+Math.min(16,Math.floor(p.level/8)))*mult),diamonds=session.cfg.boss==='grand'?8:session.cfg.boss==='boss'?5:session.cfg.boss==='mini'?3:1;grantReward(s,u,{coins,xp,diamonds});p.level++;p.playedToday++;p.totalCompleted++;p.session=null;u.stats.match3Completed=p.totalCompleted;message=`Рівень пройдено · +${coins} 🪙 · +${xp} XP · +${diamonds} 💎`;
  }else fail('Невідома дія');
  for(const member of affected)evaluateGameAchievements(s,member);normalizeGame(s,now);return {message,...detail};
}
export function ensureMatch3(u,day=gameDay()){const p=u.match3||{},validSession=p.session?.cfg?.schema===4;p.session=validSession?p.session:null;u.match3={...p,level:Math.floor(num(p.level,1)),totalCompleted:num(p.totalCompleted),playedToday:p.day===day?num(p.playedToday):0,day,session:p.day===day?p.session||null:null};return u.match3;}
export function match3Config(level){
  level=Math.max(1,Math.trunc(num(level,1)));const boss=level%50===0?'grand':level%25===0?'boss':level%10===0?'mini':null,tier=Math.min(20,Math.floor((level-1)/5)),cycle=(level-1)%6;
  const size=[6,7,6,7,8,7][cycle],theme=['garden','berry','moon','ember'][Math.floor((level-1)/3)%4],difficulty=boss?'boss':tier>=8?'expert':tier>=3?'focus':'cozy';
  const moves=Math.max(14,27-Math.floor(tier*.7)+(boss?5:0)),goal=Math.round(12+tier*1.2+Math.floor(size/2)+(boss==='grand'?12:boss==='boss'?8:boss?5:0));
  return {schema:4,target:2,level,boss,size,moves,goal,colors:Math.min(6,4+Math.floor((level+7)/15)),theme,difficulty,boosters:{hammer:1,shuffle:1,fire:level>=3?1:0}};
}
function rng(rt){let n=rt.seed|0;n^=n<<13;n^=n>>>17;n^=n<<5;rt.seed=n>>>0;return rt.seed/4294967296;}
export function matches(board,size){const found=new Set();for(let r=0;r<size;r++)for(let c=0;c<size;c++){const i=r*size+c,v=board[i];if(v==null)continue;if(c+2<size&&board[i+1]===v&&board[i+2]===v){let n=c;while(n<size&&board[r*size+n]===v)found.add(r*size+n++);}if(r+2<size&&board[i+size]===v&&board[i+2*size]===v){let n=r;while(n<size&&board[n*size+c]===v)found.add(n++*size+c);}}return [...found];}
function canMove(board,size){for(let i=0;i<board.length;i++)for(const j of [i%size<size-1?i+1:-1,i+size<board.length?i+size:-1]){if(j<0)continue;[board[i],board[j]]=[board[j],board[i]];const ok=matches(board,size).length>0;[board[i],board[j]]=[board[j],board[i]];if(ok)return true;}return false;}
function generate(rt){const {size,colors}=rt.cfg;for(let attempt=0;attempt<100;attempt++){const b=[];for(let r=0;r<size;r++)for(let c=0;c<size;c++){const choices=Array.from({length:colors},(_,i)=>i).filter(v=>!(c>=2&&b[b.length-1]===v&&b[b.length-2]===v)&&!(r>=2&&b[b.length-size]===v&&b[b.length-size*2]===v));b.push(choices[Math.floor(rng(rt)*choices.length)]);}if(canMove(b,size))return b;}fail('Не вдалося підготувати поле');}
function refill(rt,hit,onFrame,kind='drop'){
  const {size,colors}=rt.cfg,drops=[];hit.forEach(i=>rt.board[i]=null);
  for(let c=0;c<size;c++){const kept=[],from=[];for(let r=size-1;r>=0;r--)if(rt.board[r*size+c]!=null){kept.push(rt.board[r*size+c]);from.push(r);}for(let r=size-1,k=0;r>=0;r--,k++){rt.board[r*size+c]=k<kept.length?kept[k]:Math.floor(rng(rt)*colors);drops[r*size+c]=r-(k<from.length?from[k]:-(k-from.length+1));}}
  onFrame?.({kind,board:[...rt.board],drops,combo:rt.combo||1,score:rt.score});
}
export function createMatch3(level,seed){const cfg=match3Config(level),rt={cfg,seed:seed>>>0||1,score:0,moves:cfg.moves,moveLog:[],selected:null,boosters:{...cfg.boosters}};rt.board=generate(rt);return rt;}
export function applyMatch3Move(rt,a,b,onFrame){
  const {size}=rt.cfg;if(!Number.isInteger(a)||!Number.isInteger(b)||a<0||b<0||a>=rt.board.length||b>=rt.board.length||rt.moves<=0||rt.score>=rt.cfg.goal||Math.abs(Math.floor(a/size)-Math.floor(b/size))+Math.abs(a%size-b%size)!==1)return false;
  [rt.board[a],rt.board[b]]=[rt.board[b],rt.board[a]];if(!matches(rt.board,size).length){[rt.board[a],rt.board[b]]=[rt.board[b],rt.board[a]];return false;}rt.moves--;rt.moveLog.push([a,b]);rt.combo=0;
  for(let cascade=0;cascade<100;cascade++){const hit=matches(rt.board,size);if(!hit.length)break;rt.combo++;rt.score+=hit.filter(i=>rt.board[i]===rt.cfg.target).length;onFrame?.({kind:'clear',board:[...rt.board],hit,combo:rt.combo,score:rt.score});refill(rt,hit,onFrame);}
  if(matches(rt.board,size).length||!canMove(rt.board,size)){rt.board=generate(rt);onFrame?.({kind:'shuffle',board:[...rt.board]});}return true;
}
export function applyMatch3Booster(rt,kind,index,onFrame){
  if(!rt?.boosters||!['hammer','shuffle','fire'].includes(kind)||num(rt.boosters[kind])<=0||rt.score>=rt.cfg.goal)return false;
  if(kind==='hammer'){
    if(!Number.isInteger(index)||index<0||index>=rt.board.length)return false;rt.boosters.hammer--;rt.moveLog.push({type:'booster',kind,index});rt.combo=1;rt.score+=Number(rt.board[index]===rt.cfg.target);onFrame?.({kind:'hammer',board:[...rt.board],hit:[index],combo:1,score:rt.score});refill(rt,[index],onFrame);return true;
  }
  if(kind==='shuffle'){rt.boosters.shuffle--;rt.moveLog.push({type:'booster',kind});rt.board=generate(rt);onFrame?.({kind:'shuffle',board:[...rt.board]});return true;}
  rt.boosters.fire--;rt.moveLog.push({type:'booster',kind});const hit=rt.board.map((_,i)=>i),bonus=hit.filter(i=>rt.board[i]===rt.cfg.target).length;rt.combo=1;rt.score+=bonus;onFrame?.({kind:'fire',board:[...rt.board],hit,combo:1,score:rt.score});rt.board=generate(rt);onFrame?.({kind:'rebirth',board:[...rt.board]});return true;
}
export function applyMatch3Command(rt,command,onFrame){
  if(Array.isArray(command)&&command.length===2)return applyMatch3Move(rt,command[0],command[1],onFrame);
  if(command&&command.type==='booster')return applyMatch3Booster(rt,command.kind,command.index,onFrame);
  return false;
}
