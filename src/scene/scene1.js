let img_background;  
let ss_frog;         
let player;          
let floor; 

let GUI;
let fiala;
let ss_GUI_vita;
let ss_GUI_fiala;
// Salto: contatore e stato tasto(serve per doppio salto)
let jumpCount = 0;
const MAX_JUMPS = 1;
let prevSpaceDown = false;
          

// ====== Costanti di configurazione ======
const CANVAS_W        = 1280;
const CANVAS_H        = 720;
const WORLD_WIDTH     = 9974; 
const WORLD_HEIGHT    = 2584; 
const FLOOR_Y         = 2584;  // altezza del pavimento  (posizione Y dei “piedi” della rana)



const PLATFORM_TOLERANCE_Y = 10; // Aumentata leggermente la tolleranza

let curr_anim = "idle";



// ====== Configurazione Terreno Irregolare (Verdi) ======

const FLOOR_SEGMENTS = [
  { x: 0, y: 1635, w:227, h: 568 },
  { x: 0, y: 2193, w: 1647, h: 404 },
  { x: 1640, y: 1993, w: 1768, h: 316 },
  { x: 2983, y: 1600, w: 441, h:402},
  { x: 3347, y: 1759, w: 205, h: 212 },
  { x: 3705, y: 2196, w: 158, h: 212},
  { x: 3423, y: 1911, w: 206, h: 212},
  { x: 3533, y: 2070, w: 206, h: 212},

  { x: 3784, y: 2351, w: 555, h: 212},
  { x: 4324, y: 2128, w: 474, h: 432},
  { x: 4800, y: 1860, w: 1564, h: 701},
  { x: 6347, y: 2090, w: 563, h: 474},
  { x: 6890, y: 2261, w: 1998, h: 304 },
  { x: 8083, y: 2175, w: 804, h: 125 },
  { x: 8888, y: 2333, w: 431, h: 125 },
  { x: 8888, y: 2458, w: 1089, h: 125 },
  { x: 9065, y: 1799, w: 909, h: 125 },
  { x: 9556, y: 1896, w: 421, h: 125},
 //ceppi 
  { x:1098, y: 2074, w: 210, h: 128},
  { x: 1871 , y: 1874, w: 210, h: 128 },
  { x: 2758 , y: 1865, w: 210, h: 128 },
  { x: 5584, y: 1702, w: 183, h: 158 },
  { x: 7595, y: 2110, w: 140, h: 150},
  { x: 8672, y: 2038, w: 147, h: 136},

];

// ======================== SCENA ========================

function preload(s) {
  console.log("preload scene1");
  img_background = PP.assets.image.load(s, "assets/background_bosco.png");
  
  // Spritesheet rana

  //ss_frog = PP.assets.sprite.load_spritesheet(s, "assets/spritesheet.png", 2160, 1527);
  // 8 frame → 每帧 640x706
  ss_frog = PP.assets.sprite.load_spritesheet(
    s, "assets/spritesheet.png", 122,152 );

  // Spritesheet GUI
  ss_GUI_vita = PP.assets.sprite.load_spritesheet(s, "assets/GUI_vita.png", 400, 110);
  ss_GUI_fiala = PP.assets.sprite.load_spritesheet(s, "assets/GUI_fiala.png", 400, 110);

  preload_platforms_s1(s);
  preload_enemy(s);
}

function create(s) {

  // Sfondo
  PP.assets.tilesprite.add(s, img_background, 0, 0, WORLD_WIDTH, WORLD_HEIGHT, 0, 0);

  // ---------- Rana ----------
  const startX = 300;     //--------------------spown point rana
  const startY = 2190; 

  player = PP.assets.sprite.add(s, ss_frog, startX, startY, 0.5, 1);
  
 // ---------- GUI ----------
  GUI = PP.assets.sprite.add(s, ss_GUI_vita, 200, 70, 0.5, 0.5);
  fiala = PP.assets.sprite.add(s, ss_GUI_fiala, 200, 70, 0.5, 0.5);


  PP.physics.add(s, player, PP.physics.type.DYNAMIC);

  // ---------- Pavimento unico (Base) ----------
  floor = PP.shapes.rectangle_add(s, WORLD_WIDTH / 2, FLOOR_Y, WORLD_WIDTH, 1, "0x000000", 0);
  PP.physics.add(s, floor, PP.physics.type.STATIC);
  // Collider per il pavimento: imposta la flag e resetta il contatore dei salti
  PP.physics.add_collider_f(s, player, floor, function(s, player, floor) {
    player.is_on_platform = true;
    jumpCount = 0;
  });


  
  create_enemy(s, floor, player);          // 先创建 enemy
  create_floor_segments(s, player, enemy); // 再创建地块并给 enemy 加 collider


  // Rendo disponibili le informazioni del terreno alla logica in player.js
  window.FLOOR_Y = FLOOR_Y;
  window.FLOOR_SEGMENTS = FLOOR_SEGMENTS;


  create_enemy(s, floor, player);          // 先创建 enemy
  create_floor_segments(s, player, enemy); // 再创建地块并给 enemy 加 collider


  // ---------- Animazioni ----------
  configure_player_animations(player);

  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 220);
}

function update(s) {
  manage_player_update(s, player);
  
  update_enemy(s);
}

function destroy(s) { }



function create_floor_segments(s, player, enemy) {
  FLOOR_SEGMENTS.forEach(seg => {
    const centerX = seg.x + seg.w / 2;
    const centerY = seg.y + seg.h / 2;

    const block = PP.shapes.rectangle_add(
      s,
      centerX,
      centerY,
      seg.w,
      seg.h,
      "0x00ff00",
      0.5
    );

    PP.physics.add(s, block, PP.physics.type.STATIC);

    // player 可以站
    PP.physics.add_collider(s, player, block);

    // ✅ enemy 也可以站（关键）
    if (enemy) {
      PP.physics.add_collider(s, enemy, block);
    }
  });
}



PP.scenes.add("scene1", preload, create, update, destroy);