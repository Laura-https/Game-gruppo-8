let img_background;  
let ss_frog;         
let player;          
let floor;           

// ====== Costanti di configurazione ======
const CANVAS_W        = 1280;
const CANVAS_H        = 720;
const WORLD_WIDTH     = CANVAS_W * 4; 

const FLOOR_Y         = 540;  // altezza del pavimento (posizione Y dei “piedi” della rana)
const PLAYER_SPEED    = 250;
const JUMP_INIT_SPEED = 550;

const PLATFORM_TOLERANCE_Y = 10; // Aumentata leggermente la tolleranza

let curr_anim = "idle";

// ====== Configurazione delle piattaforme rialzate (Marroni) ======
const PLATFORM_CONFIG = [
  { x: 1400, w: 300, h: 40, topOffset: 140 },
  { x: 2100, w: 300, h: 40, topOffset: 200 },
  { x: 2800, w: 350, h: 40, topOffset: 260 },
];

// ====== Configurazione Terreno Irregolare (Verdi) ======

const FLOOR_SEGMENTS = [
  { x: 200, y: 600, w: 250, h: 50 },  
  { x: 450, y: 550, w: 320, h: 300 }, 
  { x: 800, y: 500, w: 300, h: 850 },  
  { x: 72, y: 596, w: 145, h: 247 },
  { x: 588, y: 658, w: 886, h: 123 },

];

// ======================== SCENA ========================

function preload(s) {
  console.log("preload scene1");
  img_background = PP.assets.image.load(s, "assets/background.png");
  
  // Spritesheet rana

  //ss_frog = PP.assets.sprite.load_spritesheet(s, "assets/spritesheet.png", 2160, 1527);
  // 8 frame → 每帧 640x706
ss_frog = PP.assets.sprite.load_spritesheet(
    s, 
    "assets/spritesheet.png",  // 换成你的新图路径
    122,
    152
);


}

function create(s) {
  console.log("create scene1");

 
  

  // Sfondo
  PP.assets.tilesprite.add(s, img_background, 0, 0, 10000, 800, 0, 0);

  // ---------- Rana ----------
  const startX = 300;     
  const startY = 300; 

  player = PP.assets.sprite.add(s, ss_frog, startX, startY, 0.5, 1);
  //player.geometry.scale_x = 0.5;
  //player.geometry.scale_y = 0.5;

  PP.physics.add(s, player, PP.physics.type.DYNAMIC);

  // ---------- Pavimento unico (Base) ----------
  floor = PP.shapes.rectangle_add(s, WORLD_WIDTH / 2, FLOOR_Y, WORLD_WIDTH, 1, "0x000000", 0);
  PP.physics.add(s, floor, PP.physics.type.STATIC);
  PP.physics.add_collider(s, player, floor);

  // ---------- Collider piattaforme marroni ----------
  create_platform_colliders(s);

  // ---------- Collider terreno verde (FIXED) ----------
  create_floor_segments(s, player);

  // ---------- Animazioni ----------
  configure_player_animations(player);

  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 220);
}

function update(s) {
  manage_player_update(s, player);
}

function destroy(s) { 

}

// ================= Funzioni di supporto =================





// *** FUNZIONE FIXATA: Ora controlla anche i blocchi verdi ***
function is_player_on_ground(player) {
  
  // 1) Pavimento principale
  if (player.geometry.y >= FLOOR_Y - 1) return true;

  // 2) Piattaforme volanti (Marroni)
  for (let i = 0; i < PLATFORM_CONFIG.length; i++) {
    const cfg = PLATFORM_CONFIG[i];
    const topY = FLOOR_Y - cfg.topOffset;
    if (Math.abs(player.geometry.y - topY) < PLATFORM_TOLERANCE_Y) {
      // Controllo se siamo dentro la larghezza della piattaforma
      // (semplificato, controlla solo Y per ora come prima, ma è meglio aggiungere X se serve precisione)
      return true;
    }
  }

  // 3) Terreno irregolare (Verdi) - AGGIUNTO QUESTO PEZZO
  for (let i = 0; i < FLOOR_SEGMENTS.length; i++) {
    const seg = FLOOR_SEGMENTS[i];
    // seg.y è la parte superiore del blocco verde
    if (Math.abs(player.geometry.y - seg.y) < PLATFORM_TOLERANCE_Y) {
        // Controllo extra: siamo anche sopra il blocco orizzontalmente?
        if (player.geometry.x >= seg.x && player.geometry.x <= (seg.x + seg.w)) {
            return true;
        }
    }
  }

  return false;
}

function create_platform_colliders(s) {
  PLATFORM_CONFIG.forEach(cfg => {
    const topY    = FLOOR_Y - cfg.topOffset; 
    const centerY = topY + cfg.h / 2;       

    const rect = PP.shapes.rectangle_add(s, cfg.x, centerY, cfg.w, cfg.h, "0xff0000", 0); // reso invisibile (alpha 0)
    PP.physics.add(s, rect, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, rect);
  });
}

function create_floor_segments(s, player) {
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
      "0x00ff00", // Verde
      0.5         // Semitrasparente per debug
    );

    PP.physics.add(s, block, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, block);
  });
}

PP.scenes.add("scene1", preload, create, update, destroy);