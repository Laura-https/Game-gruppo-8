let img_background;
let ss_frog;
let player;
let floor;
// Salto: contatore e stato tasto(serve per doppio salto)
let jumpCount = 0;
const MAX_JUMPS = 1;
let prevSpaceDown = false;

// ====== Costanti di configurazione ======
const CANVAS_W = 1280;
const CANVAS_H = 720;
const WORLD_WIDTH = 6740;
const WORLD_HEIGHT = 1036;

const FLOOR_Y = 1100;  // altezza del pavimento  (posizione Y dei “piedi” della rana), poi va abbassato
const PLATFORM_TOLERANCE_Y = 10; // Aumentata leggermente la tolleranza

let curr_anim = "idle";

// ====== Configurazione Terreno Irregolare (Verdi) ======

const FLOOR_SEGMENTS = [
  { x: -1, y: 0, w: 1, h: WORLD_HEIGHT }, //barriera che impedisce di tornare indietro
  { x: 6741, y: 0, w: 1, h: WORLD_HEIGHT }, // barriera che impedisce di andare avanti
  { x: 0, y: 881, w: 430, h: 113 },
  { x: 412, y: 980, w: 873, h: 113 },
  { x: 1240, y: 750, w: 312, h: 246 },
  { x: 1536, y: 883, w: 1138, h: 172 },
  { x: 2642, y: 665, w: 338, h: 356 },
  { x: 2911, y: 944, w: 1460, h: 88 },
  { x: 4317, y: 695, w: 1515, h: 304 },
  { x: 6332, y: 633, w: 422, h: 407 },
  { x: 5737, y: 992, w: 692, h: 448 },
  //inizio barriere fabbrica//
  { x: 3020, y: 184, w: 1600, h: 107 },
  { x: 4600, y: 207, w: 238, h: 74 },
  { x: 4600, y: 278, w: 339, h: 74 },
  { x: 4600, y: 346, w: 620, h: 42 },
  { x: 5310, y: 623, w: 505, h: 74 },
  { x: 5412, y: 551, w: 407, h: 74 },
  { x: 5512, y: 480, w: 309, h: 74 },
  { x: 5611, y: 408, w: 218, h: 74 },
  { x: 5711, y: 337, w: 297, h: 74 },
  { x: 2956, y: -260, w: 3030, h: 107 },// tetto fabbrica

]

function preload(s) {
  img_background = PP.assets.image.load(s, "assets/background_fiume.png");   // impostare nuovo background
  ss_frog = PP.assets.sprite.load_spritesheet(
    s, "assets/spritesheet.png", 122, 152);

  // Spritesheet GUI
  ss_GUI_vita = PP.assets.sprite.load_spritesheet(s, "assets/GUI_vita.png", 400, 110);
  ss_GUI_fiala = PP.assets.sprite.load_spritesheet(s, "assets/GUI_fiala.png", 400, 110);

  preload_platforms_s2(s);
}

function create(s) {
  PP.assets.tilesprite.add(s, img_background, -700, -670, 8058, 2510, 0, 0); //  ------sfondo
  const startX = 3020; // 100;     
  const startY = 160; //880;    //--------------------spown point rana

  player = PP.assets.sprite.add(s, ss_frog, startX, startY, 0.5, 1);

  PP.physics.add(s, player, PP.physics.type.DYNAMIC);

  // ---------- GUI ----------
  GUI = PP.assets.sprite.add(s, ss_GUI_vita, 200, 70, 0.5, 0.5);
  fiala = PP.assets.sprite.add(s, ss_GUI_fiala, 200, 70, 0.5, 0.5);

  GUI.tile_geometry.scroll_factor_x = 0;
  GUI.tile_geometry.scroll_factor_y = 0;
  fiala.tile_geometry.scroll_factor_x = 0;
  fiala.tile_geometry.scroll_factor_y = 0;

  // ---------- Pavimento unico (Base) ----------
  floor = PP.shapes.rectangle_add(s, WORLD_WIDTH / 2, FLOOR_Y, WORLD_WIDTH, 1, "0x000000", 0);
  PP.physics.add(s, floor, PP.physics.type.STATIC);
  // Collider per il pavimento: imposta la flag e resetta il contatore dei salti
  PP.physics.add_collider_f(s, player, floor, function (s, player, floor) {
    player.is_on_platform = true;
    // reset del contatore dei salti (variabile globale usata in player.js)
    jumpCount = 0;
  });

  // ---------- Collider terreno verde (FIXED) ----------
  create_floor_segments(s, player);

  // Rendo disponibili le informazioni del terreno alla logica in player.js
  window.FLOOR_SEGMENTS = FLOOR_SEGMENTS;
  window.FLOOR_Y = FLOOR_Y;

  // ---------- Piattaforme scena 2----------
  create_platforms_s2(s, player);

  // ---------- Animazioni ----------
  configure_player_animations(player);

  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 220);
}

function update(s) {
  manage_player_update(s, player);
  update_platforms_s2(s);
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
      "0x00ff00",
      0         // Invisibile, impostare a 0.5 se vuoi il debug
    );

    PP.physics.add(s, block, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, block);
  });
}


PP.scenes.add("scene2", preload, create, update, destroy);