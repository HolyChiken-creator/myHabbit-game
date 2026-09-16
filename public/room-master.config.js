(function(){
  'use strict';
  const A='/assets/room-master/';
  window.ROOM_MASTER_CONFIG={
    version:'12.19.0',
    storageKey:'myhabbit:teddy-room-master:v2',
    slots:['window','armchair','table','bookshelf','fireplace','rug','plant'],
    labels:{window:'Вікно',armchair:'Крісло',table:'Столик',bookshelf:'Книжкова шафа',fireplace:'Камін',rug:'Килим',plant:'Рослина',teddy:'Тедик'},
    levels:{
      1:{id:1,title:'Cozy',background:A+'level-1/background.webp',assets:{window:A+'level-1/window.webp',armchair:A+'level-1/armchair.webp',table:A+'level-1/table.webp',bookshelf:A+'level-1/bookshelf.webp',fireplace:A+'level-1/fireplace.webp',rug:A+'level-1/rug.webp',plant:A+'level-1/plant.webp'}},
      2:{id:2,title:'Warm',background:A+'level-2/background.webp',assets:{window:A+'level-2/window.webp',armchair:A+'level-2/armchair.webp',table:A+'level-2/table.webp',bookshelf:A+'level-2/bookshelf.webp',fireplace:A+'level-2/fireplace.webp',rug:A+'level-2/rug.webp',plant:A+'level-2/plant.webp'}},
      3:{id:3,title:'Hi-tech',background:A+'level-3/background.webp',assets:{window:A+'level-3/window.webp',armchair:A+'level-3/armchair.webp',table:A+'level-3/table.webp',bookshelf:A+'level-3/bookshelf.webp',fireplace:A+'level-3/fireplace.webp',rug:A+'level-3/rug.webp',plant:A+'level-3/plant.webp'}},
      4:{id:4,title:'Gothic',background:A+'level-4/background.webp',assets:{window:A+'level-4/window.webp',armchair:A+'level-4/armchair.webp',table:A+'level-4/table.webp',bookshelf:A+'level-4/bookshelf.webp',fireplace:A+'level-4/fireplace.webp',rug:A+'level-4/rug.webp',plant:A+'level-4/plant.webp'}}
    },
    defaults:{
      1:{window:{x:4,y:8,w:24,z:5},armchair:{x:5,y:53,w:22,z:10},table:{x:24,y:59,w:11,z:11},bookshelf:{x:69,y:13,w:19,z:7},fireplace:{x:76,y:43,w:17,z:8},rug:{x:34,y:69,w:32,z:4},plant:{x:87,y:69,w:10,z:12},teddy:{x:41,y:38,w:18,z:20}},
      2:{window:{x:4,y:8,w:24,z:5},armchair:{x:5,y:53,w:22,z:10},table:{x:24,y:59,w:11,z:11},bookshelf:{x:69,y:12,w:19,z:7},fireplace:{x:76,y:42,w:17,z:8},rug:{x:34,y:68,w:32,z:4},plant:{x:87,y:68,w:10,z:12},teddy:{x:41,y:38,w:18,z:20}},
      3:{window:{x:4,y:8,w:23,z:5},armchair:{x:5,y:54,w:21,z:10},table:{x:24,y:60,w:11,z:11},bookshelf:{x:69,y:13,w:19,z:7},fireplace:{x:76,y:44,w:17,z:8},rug:{x:34,y:69,w:32,z:4},plant:{x:87,y:69,w:10,z:12},teddy:{x:41,y:38,w:18,z:20}},
      4:{window:{x:3,y:7,w:25,z:5},armchair:{x:4,y:53,w:22,z:10},table:{x:24,y:59,w:11,z:11},bookshelf:{x:68,y:11,w:20,z:7},fireplace:{x:76,y:42,w:18,z:8},rug:{x:33,y:68,w:34,z:4},plant:{x:86,y:68,w:11,z:12},teddy:{x:41,y:38,w:18,z:20}}
    }
  };
})();
