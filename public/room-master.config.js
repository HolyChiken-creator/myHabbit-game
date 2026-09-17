(function(){
  'use strict';
  const A='/assets/room-master/';
  const assetSet=n=>({window:A+`level-${n}/window.webp`,armchair:A+`level-${n}/${n===4?'armchair-perspective.png':'armchair.webp'}`,table:A+`level-${n}/table.webp`,bookshelf:A+`level-${n}/${n===1?'bookshelf-perspective.png':'bookshelf.webp'}`,fireplace:A+`level-${n}/${n===3?'fireplace-perspective.png':'fireplace.webp'}`,rug:A+`level-${n}/rug.webp`,plant:A+`level-${n}/plant.webp`,painting:A+`level-${n}/painting.png`,lamp:A+`level-${n}/lamp.png`,clock:A+`level-${n}/clock.png`});
  window.ROOM_MASTER_CONFIG={
    version:'12.22.3',
    storageKey:'myhabbit:teddy-room-master:v4',
    slots:['window','armchair','table','bookshelf','fireplace','rug','plant','painting','lamp','clock'],
    labels:{window:'Вікно',armchair:'Крісло',table:'Столик',bookshelf:'Книжкова шафа',fireplace:'Камін',rug:'Килим',plant:'Рослина',painting:'Картина',lamp:'Торшер',clock:'Годинник',teddy:'Тедик'},
    levels:{
      0:{id:0,title:'Step 0',background:A+'level-0/background.webp',assets:assetSet(0)},
      1:{id:1,title:'Cozy',background:A+'level-1/background.webp',assets:assetSet(1)},
      2:{id:2,title:'Warm',background:A+'level-2/background.webp',assets:assetSet(2)},
      3:{id:3,title:'Hi-tech',background:A+'level-3/background-perspective.png',assets:assetSet(3)},
      4:{id:4,title:'Gothic',background:A+'level-4/background.webp',assets:assetSet(4)}
    },
    defaults:{
  "0": {
    "window": {
      "x": 38,
      "y": 7,
      "w": 24,
      "h": 63,
      "z": 5
    },
    "bookshelf": {
      "x": 5,
      "y": 20,
      "w": 22,
      "h": 58,
      "z": 7
    },
    "armchair": {
      "x": 4,
      "y": 58,
      "w": 20,
      "h": 39,
      "z": 10
    },
    "fireplace": {
      "x": 72,
      "y": 14,
      "w": 25,
      "h": 69,
      "z": 8
    },
    "table": {
      "x": 57,
      "y": 51,
      "w": 11,
      "h": 37,
      "z": 11
    },
    "plant": {
      "x": 26,
      "y": 61,
      "w": 10,
      "h": 21,
      "z": 12
    },
    "rug": {
      "x": 34,
      "y": 73,
      "w": 32,
      "h": 39,
      "z": 4
    },
    "painting": {
      "x": 26,
      "y": 14,
      "w": 11,
      "h": 25,
      "z": 6
    },
    "lamp": {
      "x": 65,
      "y": 44,
      "w": 9,
      "h": 43,
      "z": 9
    },
    "clock": {
      "x": 65,
      "y": 13,
      "w": 6,
      "h": 17,
      "z": 6
    },
    "teddy": {
      "x": 42,
      "y": 40,
      "w": 18,
      "z": 20
    }
  },
  "1": {
    "window": {
      "x": 38,
      "y": 7,
      "w": 24,
      "h": 63,
      "z": 5
    },
    "bookshelf": {
      "x": 5,
      "y": 20,
      "w": 22,
      "h": 58,
      "z": 7
    },
    "armchair": {
      "x": 4,
      "y": 58,
      "w": 20,
      "h": 39,
      "z": 10
    },
    "fireplace": {
      "x": 72,
      "y": 14,
      "w": 25,
      "h": 69,
      "z": 8
    },
    "table": {
      "x": 57,
      "y": 51,
      "w": 11,
      "h": 37,
      "z": 11
    },
    "plant": {
      "x": 26,
      "y": 61,
      "w": 10,
      "h": 21,
      "z": 12
    },
    "rug": {
      "x": 34,
      "y": 73,
      "w": 32,
      "h": 39,
      "z": 4
    },
    "painting": {
      "x": 26,
      "y": 14,
      "w": 11,
      "h": 25,
      "z": 6
    },
    "lamp": {
      "x": 65,
      "y": 44,
      "w": 9,
      "h": 43,
      "z": 9
    },
    "clock": {
      "x": 65,
      "y": 13,
      "w": 6,
      "h": 17,
      "z": 6
    },
    "teddy": {
      "x": 42,
      "y": 40,
      "w": 18,
      "z": 20
    }
  },
  "2": {
    "window": {
      "x": 38,
      "y": 7,
      "w": 24,
      "h": 63,
      "z": 5
    },
    "bookshelf": {
      "x": 5,
      "y": 20,
      "w": 22,
      "h": 58,
      "z": 7
    },
    "armchair": {
      "x": 4,
      "y": 58,
      "w": 20,
      "h": 39,
      "z": 10
    },
    "fireplace": {
      "x": 72,
      "y": 14,
      "w": 25,
      "h": 69,
      "z": 8
    },
    "table": {
      "x": 57,
      "y": 51,
      "w": 11,
      "h": 37,
      "z": 11
    },
    "plant": {
      "x": 26,
      "y": 61,
      "w": 10,
      "h": 21,
      "z": 12
    },
    "rug": {
      "x": 34,
      "y": 73,
      "w": 32,
      "h": 39,
      "z": 4
    },
    "painting": {
      "x": 26,
      "y": 14,
      "w": 11,
      "h": 25,
      "z": 6
    },
    "lamp": {
      "x": 65,
      "y": 44,
      "w": 9,
      "h": 43,
      "z": 9
    },
    "clock": {
      "x": 65,
      "y": 13,
      "w": 6,
      "h": 17,
      "z": 6
    },
    "teddy": {
      "x": 42,
      "y": 40,
      "w": 18,
      "z": 20
    }
  },
  "3": {
    "window": {
      "x": 38,
      "y": 7,
      "w": 24,
      "h": 63,
      "z": 5
    },
    "bookshelf": {
      "x": 5,
      "y": 20,
      "w": 22,
      "h": 58,
      "z": 7
    },
    "armchair": {
      "x": 4,
      "y": 58,
      "w": 20,
      "h": 39,
      "z": 10
    },
    "fireplace": {
      "x": 72,
      "y": 14,
      "w": 25,
      "h": 69,
      "z": 8
    },
    "table": {
      "x": 57,
      "y": 51,
      "w": 11,
      "h": 37,
      "z": 11
    },
    "plant": {
      "x": 26,
      "y": 61,
      "w": 10,
      "h": 21,
      "z": 12
    },
    "rug": {
      "x": 34,
      "y": 73,
      "w": 32,
      "h": 39,
      "z": 4
    },
    "painting": {
      "x": 26,
      "y": 14,
      "w": 11,
      "h": 25,
      "z": 6
    },
    "lamp": {
      "x": 65,
      "y": 44,
      "w": 9,
      "h": 43,
      "z": 9
    },
    "clock": {
      "x": 65,
      "y": 13,
      "w": 6,
      "h": 17,
      "z": 6
    },
    "teddy": {
      "x": 42,
      "y": 40,
      "w": 18,
      "z": 20
    }
  },
  "4": {
    "window": {
      "x": 38,
      "y": 7,
      "w": 24,
      "h": 63,
      "z": 5
    },
    "bookshelf": {
      "x": 5,
      "y": 20,
      "w": 22,
      "h": 58,
      "z": 7
    },
    "armchair": {
      "x": 4,
      "y": 58,
      "w": 20,
      "h": 39,
      "z": 10
    },
    "fireplace": {
      "x": 72,
      "y": 14,
      "w": 25,
      "h": 69,
      "z": 8
    },
    "table": {
      "x": 57,
      "y": 51,
      "w": 11,
      "h": 37,
      "z": 11
    },
    "plant": {
      "x": 26,
      "y": 61,
      "w": 10,
      "h": 21,
      "z": 12
    },
    "rug": {
      "x": 34,
      "y": 73,
      "w": 32,
      "h": 39,
      "z": 4
    },
    "painting": {
      "x": 26,
      "y": 14,
      "w": 11,
      "h": 25,
      "z": 6
    },
    "lamp": {
      "x": 65,
      "y": 44,
      "w": 9,
      "h": 43,
      "z": 9
    },
    "clock": {
      "x": 65,
      "y": 13,
      "w": 6,
      "h": 17,
      "z": 6
    },
    "teddy": {
      "x": 42,
      "y": 40,
      "w": 18,
      "z": 20
    }
  }
}
  };
})();
