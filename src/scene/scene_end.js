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
const WORLD_WIDTH     = 5310; 
const WORLD_HEIGHT    = 2723;

//const FLOOR_Y         = 1100;  // altezza del pavimento  (posizione Y dei “piedi” della rana), poi va abbassato
const PLATFORM_TOLERANCE_Y = 10; // Aumentata leggermente la tolleranza

const startX_s4 = 1050;     
const startY_s4 = 2108;    //--------------------spown point rana

let curr_anim = "idle";

// ====== Configurazione Terreno Irregolare (Verdi) ======

const FLOOR_SEGMENTS = [
  { x: 600, y:0, w: 1, h: WORLD_HEIGHT }, //barriera che impedisce di tornare indietro
  { x: 4500, y:0, w: 1, h: WORLD_HEIGHT }, // barriera che impedisce di andare avanti
  { x:0, y: 1290, w: 1756, h:73  },
  { x:0, y:1364, w: 897, h: 270 },

  { x:0 , y:2129, w: 1465, h: 527 },
  { x: 1227, y:2046, w: 452, h: 267 },
  { x: 1498, y:1847, w: 382, h: 600 },
  { x: 1740, y:1743, w: 404, h: 667},
  { x:1960 , y:1580, w: 245, h: 441 },
  { x: 2175, y:1381, w: 3115, h: 1309 },

]

function preload(s) {
 img_background = PP.assets.image.load(s, "assets/background scene/scena_end.png");   // impostare nuovo background
 
 ss_frog = PP.assets.sprite.load_spritesheet(s,  "assets/spritesheet.png", 122,152);

 ss_HUD_vita = PP.assets.sprite.load_spritesheet(s, "assets/HUD_vita.png", 400, 110);
 ss_HUD_fiala = PP.assets.sprite.load_spritesheet(s, "assets/HUD_fiala.png", 400, 110);
 
}

function create(s) {
  PP.assets.tilesprite.add(s, img_background, 0, 0, WORLD_WIDTH, WORLD_HEIGHT, 0, 0); //  ------sfondo
  
  player = PP.assets.sprite.add(s, ss_frog, startX_s4, startY_s4, 0.5, 1);
  PP.physics.add(s, player, PP.physics.type.DYNAMIC);
  hitbox_player(player);

   // ---------- HUD ----------
  HUD = PP.assets.sprite.add(s, ss_HUD_vita, 200, 70, 0.5, 0.5);
  fiala = PP.assets.sprite.add(s, ss_HUD_fiala, 200, 70, 0.5, 0.5);

  HUD.tile_geometry.scroll_factor_x = 0;
  HUD.tile_geometry.scroll_factor_y = 0;
  fiala.tile_geometry.scroll_factor_x = 0;
  fiala.tile_geometry.scroll_factor_y = 0;
  PP.layers.set_z_index(fiala, 4);
  PP.layers.set_z_index(HUD, 3);


  // ---------- Collider terreno verde (FIXED) ----------
  create_floor_segments(s, player);

  // Rendo disponibili le informazioni del terreno alla logica in player.js
  window.FLOOR_SEGMENTS = FLOOR_SEGMENTS;
  
  // ---------- Animazioni ----------
  configure_player_animations(player);

  configure_HUD_vita_animations(HUD);
  configure_HUD_fiala_animations(fiala);
  update_HUD_vita(HUD);
  update_HUD_fiala(fiala);
  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 220);
}

function update(s) {
  manage_player_update(s, player);
  update_HUD_vita(HUD);
  update_HUD_fiala(fiala);

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


PP.scenes.add("scene_end", preload, create, update, destroy);