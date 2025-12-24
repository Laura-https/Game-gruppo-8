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
const WORLD_WIDTH     = 3840; 
const WORLD_HEIGHT    = 1440;

const FLOOR_Y         = 1325;  // altezza del pavimento  (posizione Y dei “piedi” della rana)
const PLAYER_SPEED    = 250;
const JUMP_INIT_SPEED = 550;

const PLATFORM_TOLERANCE_Y = 10; // Aumentata leggermente la tolleranza

let curr_anim = "idle";


// ====== Configurazione Terreno Irregolare (Verdi) ======

const FLOOR_SEGMENTS = [
  { x: -1, y:0, w: 1, h: WORLD_HEIGHT }, //barriera che impedisce di tornare indietro
  { x: 0, y: 443, w: 412, h: 278 },
  { x: 120, y: 1015, w: 510, h: 70 },
  { x: 0, y: 713, w: 120, h: 617 },
  { x: 0, y: 0, w: WORLD_WIDTH, h: 10 }, //soffitto per non uscire fuori dallo schermo (posizionato al bordo superiore)
  { x: 1630, y: 125, w: 95, h: 650 },
  { x: 1313, y: 1011, w: 725, h: 90 },
  { x: 1913, y: 713, w: 140, h: 40, },  //questa va tolta
];

// ======================== SCENA ========================

function preload(s) {
  console.log("preload scene3");
  img_background = PP.assets.image.load(s, "assets/background_miniera.png");
  
  ss_frog = PP.assets.sprite.load_spritesheet(
    s,  "assets/spritesheet.png", 122,152);
  
  preload_platforms_s3(s);


}

function create(s) {
  // Sfondo: usa le dimensioni del mondo così l'immagine copre tutta l'area
  PP.assets.tilesprite.add(s, img_background, 0, 0, WORLD_WIDTH, WORLD_HEIGHT, 0, 0);
 // ---------- Rana ----------
  const startX = 1313;     
  const startY = 1000;    //--------------------spown point rana

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
  window.FLOOR_Y = FLOOR_Y;
  window.FLOOR_SEGMENTS = FLOOR_SEGMENTS;

  // ---------- Piattaforme scena 3 ----------
  create_platforms_s3(s, player);

  // ---------- Animazioni ----------
  configure_player_animations(player);

  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 220);
}

function update(s) {
  manage_player_update(s, player);
  update_platforms_s3(s);
  // Reset flag impostata da collisione in modo che valga solo per il frame corrente
  //player.is_on_platform = false;
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

PP.scenes.add("scene3", preload, create, update, destroy);