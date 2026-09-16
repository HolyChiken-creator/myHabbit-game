(function(){
  'use strict';
  const A='/assets/room-master/';
  const assetSet=n=>({window:A+`level-${n}/window.webp`,armchair:A+`level-${n}/armchair.webp`,table:A+`level-${n}/table.webp`,bookshelf:A+`level-${n}/bookshelf.webp`,fireplace:A+`level-${n}/fireplace.webp`,rug:A+`level-${n}/rug.webp`,plant:A+`level-${n}/plant.webp`});
  window.ROOM_MASTER_CONFIG={
    version:'12.20.0',
    storageKey:'myhabbit:teddy-room-master:v3',
    slots:['window','armchair','table','bookshelf','fireplace','rug','plant'],
    labels:{window:'Вікно',armchair:'Крісло',table:'Столик',bookshelf:'Книжкова шафа',fireplace:'Камін',rug:'Килим',plant:'Рослина',teddy:'Тедик'},
    levels:{
      0:{id:0,title:'Step 0',background:A+'level-0/background.webp',assets:assetSet(0)},
      1:{id:1,title:'Cozy',background:A+'level-1/background.webp',assets:assetSet(1)},
      2:{id:2,title:'Warm',background:A+'level-2/background.webp',assets:assetSet(2)},
      3:{id:3,title:'Hi-tech',background:A+'level-3/background.webp',assets:assetSet(3)},
      4:{id:4,title:'Gothic',background:A+'level-4/background.webp',assets:assetSet(4)}
    },
    defaults:{
      0:{window:{x:3,y:9,w:22,z:5},armchair:{x:5,y:56,w:20,z:10},table:{x:24,y:62,w:10,z:11},bookshelf:{x:70,y:15,w:17,z:7},fireplace:{x:77,y:45,w:16,z:8},rug:{x:35,y:71,w:30,z:4},plant:{x:88,y:71,w:9,z:12},teddy:{x:41,y:39,w:18,z:20}},
      1:{window:{x:4,y:8,w:24,z:5},armchair:{x:5,y:53,w:22,z:10},table:{x:24,y:59,w:11,z:11},bookshelf:{x:69,y:13,w:19,z:7},fireplace:{x:76,y:43,w:17,z:8},rug:{x:34,y:69,w:32,z:4},plant:{x:87,y:69,w:10,z:12},teddy:{x:41,y:38,w:18,z:20}},
      2:{window:{x:4,y:8,w:24,z:5},armchair:{x:5,y:53,w:22,z:10},table:{x:24,y:59,w:11,z:11},bookshelf:{x:69,y:12,w:19,z:7},fireplace:{x:76,y:42,w:17,z:8},rug:{x:34,y:68,w:32,z:4},plant:{x:87,y:68,w:10,z:12},teddy:{x:41,y:38,w:18,z:20}},
      3:{window:{x:4,y:8,w:23,z:5},armchair:{x:5,y:54,w:21,z:10},table:{x:24,y:60,w:11,z:11},bookshelf:{x:69,y:13,w:19,z:7},fireplace:{x:76,y:44,w:17,z:8},rug:{x:34,y:69,w:32,z:4},plant:{x:87,y:69,w:10,z:12},teddy:{x:41,y:38,w:18,z:20}},
      4:{window:{x:3,y:7,w:25,z:5},armchair:{x:4,y:53,w:22,z:10},table:{x:24,y:59,w:11,z:11},bookshelf:{x:68,y:11,w:20,z:7},fireplace:{x:76,y:42,w:18,z:8},rug:{x:33,y:68,w:34,z:4},plant:{x:86,y:68,w:11,z:12},teddy:{x:41,y:38,w:18,z:20}}
    }
  };
})();
