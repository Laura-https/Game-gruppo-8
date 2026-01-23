let img_background;  
let ss_frog;         
let player;          
let floor; 
let ss_GUI_vita;
let ss_GUI_fiala;
let GUI;
let fiala;
// Salto: contatore e stato tasto(serve per doppio salto)
let jumpCount = 0;
const MAX_JUMPS = 1;
let prevSpaceDown = false;
          

// ====== Costanti di configurazione ======
const CANVAS_W        = 1280;
const CANVAS_H        = 720;
const WORLD_WIDTH     = 3840; 
const WORLD_HEIGHT    = 1440;
const FLOOR_Y         = 2000;  // altezza del pavimento  (posizione Y dei “piedi” della rana), poi va abbassato

 const startX_s3 = 100;     
 const startY_s3 = 350;    //--------------------spown point rana

const PLATFORM_TOLERANCE_Y = 10; // Aumentata leggermente la tolleranza

let curr_anim = "idle";


// ====== Configurazione Terreno Irregolare (Verdi) ======

const FLOOR_SEGMENTS = [
  { x: -1, y:0, w: 1, h: WORLD_HEIGHT }, //barriera che impedisce di tornare indietro
  { x: 3841, y:0, w: 1, h: WORLD_HEIGHT }, //barriera che impedisce di andare avanti
  { x: 0, y: 443, w: 412, h: 278 },
  { x: 120, y: 1015, w: 510, h: 70 },
  { x: 0, y: 713, w: 120, h: 617 },
  { x: 0, y: 0, w: WORLD_WIDTH, h: 10 }, //soffitto per non uscire fuori dallo schermo (posizionato al bordo superiore)
  { x: 1630, y: 125, w: 95, h: 650 },
  { x: 1415, y: 1107, w: 617, h: 103}, //-
  { x: 1299, y: 1211, w: 733, h: 144 },  
  { x: 1435, y: 0, w: 390, h: 472},
  { x: 1535, y: 472, w: 95, h: 182},
  { x: 1724, y: 473, w: 53, h: 108},
  { x: 0, y: 0, w: 274, h: 205},
  { x: 1160, y: 1325, w: 867, h: 115},   // qui
  { x: 3355, y: 0, w: 485, h: 547},
  { x: 3445, y: 548, w: 395, h: 80},
  { x: 3562, y: 628, w: 275, h: 75},
  { x: 3397, y: 995, w: 443, h: 168},
  { x: 3265, y: 1162, w: 575, h: 162},
  { x: 3040, y: 1325, w: 800, h: 114},
  { x: 0, y: 1085, w: 355, h: 358},
  { x: 2326, y: 354, w: 500, h: 35}, //piattaforma sospesa
  { x: 275, y: 1440, w: 1009, h: 144},
  { x: 1897, y: 1440, w: 1276, h: 35},
];

// ======================== SCENA ========================

function preload(s) {
  
  img_background = PP.assets.image.load(s, "assets/background_miniera.png");
  
  ss_frog = PP.assets.sprite.load_spritesheet(
    s,  "assets/spritesheet.png", 122,152);
  
  preload_platforms_s3(s);

 // Spritesheet GUI
  ss_GUI_vita = PP.assets.sprite.load_spritesheet(s, "assets/GUI_vita.png", 400, 110);
  ss_GUI_fiala = PP.assets.sprite.load_spritesheet(s, "assets/GUI_fiala.png", 400, 110);
}

function create(s) {
  // Sfondo: usa le dimensioni del mondo così l'immagine copre tutta l'area
  PP.assets.tilesprite.add(s, img_background, -700, -400, 5240, 2245, 0, 0);

   // ---------- GUI ----------
  GUI = PP.assets.sprite.add(s, ss_GUI_vita, 200, 70, 0.5, 0.5);
  fiala = PP.assets.sprite.add(s, ss_GUI_fiala, 200, 70, 0.5, 0.5);

  GUI.tile_geometry.scroll_factor_x = 0;
  GUI.tile_geometry.scroll_factor_y = 0;
  fiala.tile_geometry.scroll_factor_x = 0;
  fiala.tile_geometry.scroll_factor_y = 0;
  PP.layers.set_z_index(fiala, 3);
  PP.layers.set_z_index(GUI, 2);

 // ---------- Rana ----------
 

  player = PP.assets.sprite.add(s, ss_frog, startX, startY, 0.5, 1);
  
  PP.physics.add(s, player, PP.physics.type.DYNAMIC); //player e la sua hitbox
  hitbox_player(player);

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
  window.FLOOR_Y = FLOOR_Y;
  

  // ---------- Piattaforme scena 3 ----------
  create_platforms_s3(s, player);

  // ---------- Animazioni ----------
  configure_player_animations(player);
  configure_GUI_vita_animations(GUI);
  update_GUI_vita(GUI);

  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 120);
}

function update(s) {
  manage_player_update(s, player);
  update_platforms_s3(s);
  update_GUI_vita(GUI);
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
      0.0          // Invisibile, impostare a 0.5 se vuoi il debug
    );

    PP.physics.add(s, block, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, block);
  });
}

PP.scenes.add("scene3", preload, create, update, destroy);