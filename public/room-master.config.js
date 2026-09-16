(function(){
  'use strict';
  const A='/assets/';
  window.ROOM_MASTER_CONFIG={
    version:'1.0.0',
    storageKey:'myhabbit:teddy-room-master:v1',
    slots:['window','armchair','table','bookshelf','fireplace','rug','plant'],
    labels:{
      window:'Вікно',armchair:'Крісло',table:'Столик',bookshelf:'Книжкова шафа',
      fireplace:'Камін',rug:'Килим',plant:'Рослина',teddy:'Тедик'
    },
    levels:{
      1:{
        id:1,title:'Cozy',
        background:A+'step one cozy background/бекграунд_затишний.png',
        assets:{
          window:A+'step one cozy collection/вікно_затишне.png',
          armchair:A+'step one cozy collection/крісло_затишне.png',
          table:A+'step one cozy collection/столик_затишний.png',
          bookshelf:A+'step one cozy collection/книжкова_шафа_затишна.png',
          fireplace:A+'step one cozy collection/камін_затишний.png',
          rug:A+'step one cozy collection/килим_затишний.png',
          plant:A+'step one cozy collection/рослина_затишна.png'
        }
      },
      2:{
        id:2,title:'Warm',
        background:A+'step two warm background/бекграунд_теплий.png',
        assets:{
          window:A+'step two warm collection/вікно_тепле.png',
          armchair:A+'step two warm collection/крісло_тепле.png',
          table:A+'step two warm collection/столик_теплий.png',
          bookshelf:A+'step two warm collection/книжкова_шафа_тепла.png',
          fireplace:A+'step two warm collection/камін_теплий.png',
          rug:A+'step two warm collection/килим_теплий.png',
          plant:A+'step two warm collection/рослина_тепла.png'
        }
      },
      3:{
        id:3,title:'Hi-tech',
        background:A+'step three hi-tech background/бекграунд_хайтек.png',
        assets:{
          window:A+'step three hi-tech collection/вікно_хайтек.png',
          armchair:A+'step three hi-tech collection/крісло_хайтек.png',
          table:A+'step three hi-tech collection/столик_хайтек.png',
          bookshelf:A+'step three hi-tech collection/книжкова_шафа_хайтек.png',
          fireplace:A+'step three hi-tech collection/камін_хайтек.png',
          rug:A+'step three hi-tech collection/килим_хайтек.png',
          plant:A+'step three hi-tech collection/рослина_хайтек.png'
        }
      },
      4:{
        id:4,title:'Gothic',
        background:A+'step four gothic background/бекграунд_готичний.png',
        assets:{
          window:A+'step four gothic collection/вікно_готичне.png',
          armchair:A+'step four gothic collection/крісло_готичне.png',
          table:A+'step four gothic collection/столик_готичний.png',
          bookshelf:A+'step four gothic collection/книжкова_шафа_готична.png',
          fireplace:A+'step four gothic collection/камін_готичний.png',
          rug:A+'step four gothic collection/килим_готичний.png',
          plant:A+'step four gothic collection/рослина_готична.png'
        }
      }
    },
    defaults:{
      1:{
        window:{x:4,y:8,w:26,z:5}, armchair:{x:5,y:54,w:23,z:10},
        table:{x:23,y:59,w:13,z:11}, bookshelf:{x:67,y:13,w:20,z:7},
        fireplace:{x:80,y:42,w:18,z:8}, rug:{x:31,y:68,w:38,z:4},
        plant:{x:87,y:67,w:10,z:12}, teddy:{x:39,y:34,w:22,z:20}
      },
      2:{
        window:{x:4,y:7,w:26,z:5}, armchair:{x:5,y:53,w:23,z:10},
        table:{x:24,y:58,w:13,z:11}, bookshelf:{x:66,y:12,w:21,z:7},
        fireplace:{x:80,y:41,w:18,z:8}, rug:{x:30,y:67,w:40,z:4},
        plant:{x:87,y:66,w:10,z:12}, teddy:{x:39,y:34,w:22,z:20}
      },
      3:{
        window:{x:4,y:8,w:25,z:5}, armchair:{x:6,y:54,w:22,z:10},
        table:{x:24,y:59,w:13,z:11}, bookshelf:{x:67,y:13,w:20,z:7},
        fireplace:{x:80,y:42,w:18,z:8}, rug:{x:30,y:68,w:40,z:4},
        plant:{x:87,y:67,w:10,z:12}, teddy:{x:39,y:34,w:22,z:20}
      },
      4:{
        window:{x:3,y:5,w:28,z:5}, armchair:{x:4,y:53,w:24,z:10},
        table:{x:23,y:58,w:14,z:11}, bookshelf:{x:66,y:9,w:22,z:7},
        fireplace:{x:79,y:39,w:19,z:8}, rug:{x:29,y:67,w:42,z:4},
        plant:{x:86,y:65,w:11,z:12}, teddy:{x:39,y:34,w:22,z:20}
      }
    }
  };
})();