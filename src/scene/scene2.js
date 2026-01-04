let img_background;  
let ss_frog;         
let player;          
let floor; 
// Salto: contatore e stato tasto(serve per doppio salto)
let jumpCount = 0;
const MAX_JUMPS = 1;
let prevSpaceDown = false;

// ====== Costanti di configurazione ======
const CANVAS_W        = 1280;
const CANVAS_H        = 720;
const WORLD_WIDTH     = 6740; 
const WORLD_HEIGHT    = 1036;

const FLOOR_Y         = 1100;  // altezza del pavimento  (posizione Y dei “piedi” della rana), poi va abbassato
const PLATFORM_TOLERANCE_Y = 10; // Aumentata leggermente la tolleranza

let curr_anim = "idle";

// ====== Configurazione Terreno Irregolare (Verdi) ======

const FLOOR_SEGMENTS = [
  { x: -1, y:0, w: 1, h: WORLD_HEIGHT }, //barriera che impedisce di tornare indietro
  { x: 6741, y:0, w: 1, h: WORLD_HEIGHT },
  { x: 0, y:881, w: 430, h: 113 },
  { x: 1240, y:792, w: 589, h: 201 },
  { x: 1426, y: 759, w: 403, h: 46 }, 
  { x: 1829, y:846, w: 981, h: 113 },
  { x: 2642, y:665, w: 255, h: 295 },
  { x: 2897, y:813, w: 1460, h: 140 },
  { x: 4317, y:695, w: 1413, h: 133 },
  { x: 5720, y:745, w: 282, h: 247 },
  { x: 6332, y:633, w: 320, h: 407 },
]

function preload(s) {
 img_background = PP.assets.image.load(s, "assets/background_fiume.png");   // impostare nuovo background
  ss_frog = PP.assets.sprite.load_spritesheet(
    s,  "assets/spritesheet.png", 122,152);
  //preload_platforms_s2(s);
}

function create(s) {
  PP.assets.tilesprite.add(s, img_background, 0, 0, WORLD_WIDTH, WORLD_HEIGHT, 0, 0); //  ------sfondo
  const startX = 100;     
  const startY = 880;    //--------------------spown point rana

  player = PP.assets.sprite.add(s, ss_frog, startX, startY, 0.5, 1);
  
  PP.physics.add(s, player, PP.physics.type.DYNAMIC);

  // ---------- Pavimento unico (Base) ----------
  floor = PP.shapes.rectangle_add(s, WORLD_WIDTH / 2, FLOOR_Y, WORLD_WIDTH, 1, "0x000000", 0);
  PP.physics.add(s, floor, PP.physics.type.STATIC);
  // Collider per il pavimento: imposta la flag e resetta il contatore dei salti
  PP.physics.add_collider_f(s, player, floor, function(s, player, floor) {
    player.is_on_platform = true;
    // reset del contatore dei salti (variabile globale usata in player.js)
    jumpCount = 0;
  });

  // ---------- Collider terreno verde (FIXED) ----------
  create_floor_segments(s, player);

  // Rendo disponibili le informazioni del terreno alla logica in player.js
  window.FLOOR_SEGMENTS = FLOOR_SEGMENTS;

  // ---------- Piattaforme scena 2----------
 // create_platforms_s2(s, player);

  // ---------- Animazioni ----------
  configure_player_animations(player);

  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 220);
}

function update(s) {
  manage_player_update(s, player);
  //update_platforms_s2(s);
}

function destroy(s) { }

function create_floor_segments(s, player) {   //questo serve qui
  FLOOR_SEGMENTS.forEach(seg => {
    // Conversione coordinate: da Top-Left a Centro
    const centerX = seg.x + seg.w / 2;
    const centerY = seg.y + seg.h / 2;

    const block = PP.shapes.rectangle_add(
      s,
      centerX,
      centerY,
      seg.w,
      seg.h,
      "0x00ff00", // Verde -- questo poi va messo invisibile
      0.5           // Invisibile, impostare a 0.5 se vuoi il debug
    );

    PP.physics.add(s, block, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, block);
  });
}


PP.scenes.add("scene2", preload, create, update, destroy);