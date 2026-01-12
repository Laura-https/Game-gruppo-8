let img_background;  
let ss_frog;         
let player;          
let floor;     

let txt_score;
let txt_HP

// ====== Costanti di configurazione ======
const CANVAS_W        = 1280;
const CANVAS_H        = 720;
const WORLD_WIDTH     = CANVAS_W * 4; 

const FLOOR_Y         = 710;  // altezza del pavimento (posizione Y dei “piedi” della rana)
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
  { x: 450, y: 450, w: 310, h: 300 }, 
  
  { x: 72, y: 496, w: 145, h: 247 },
  

];

// ======================== SCENA ========================

function preload(s) {
  console.log("preload scene1");
  img_background = PP.assets.image.load(s, "assets/background.png");
  
  // Spritesheet rana
ss_frog = PP.assets.sprite.load_spritesheet(
    s, 
    "assets/spritesheet.png",  
    122,
    152
);

preload_enemy(s);


}

function create(s) {
  console.log("create scene1");

  // Sfondo
  PP.assets.tilesprite.add(s, img_background, 0, 0, 10000, 1430, 0, 0);

  // ---------- Rana ----------
  const startX = 1000;     
  const startY = 1000; 

  player = PP.assets.sprite.add(s, ss_frog, startX, startY, 0.5, 1);
 

  PP.physics.add(s, player, PP.physics.type.DYNAMIC);

  // ---------- Pavimento unico (Base) ----------
  floor = PP.shapes.rectangle_add(s, 640, 1168, 10000, 1, "0x000000", 0);
  PP.physics.add(s, floor, PP.physics.type.STATIC);
  PP.physics.add_collider(s, player, floor);

  // ---------- Collider piattaforme marroni ----------
  create_platform_colliders(s);

  // ---------- Collider terreno verde (FIXED) ----------
  create_floor_segments(s, player);

  // ---------- Animazioni ----------
  configure_player_animations(s,player);



  create_enemy(s, floor, player);




  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 180);

}

function update(s) {
  manage_player_update(s, player);

  update_enemy(s);
  
   
}

function destroy(s) { }

// ================= Funzioni di supporto =================

function configure_player_animations(s,player) {

  // idle / stop
  PP.assets.sprite.animation_add(player, "idle", 0, 0, 10, 0);

  // walk / run（不连续帧）
  PP.assets.sprite.animation_add_list(
    player,
    "walk",
    [1,2,3,5,6,7,8],
    10,
    -1
  );

  // jump up（上升）
  PP.assets.sprite.animation_add_list(
    player,
    "jump_up",
    [11,12,13,14],
    10,
    1
  );

  // jump down（下降）
  PP.assets.sprite.animation_add_list(
    player,
    "jump_down",
    [4,9,15],
    10,
    -1
  );

  PP.assets.sprite.animation_play(player, "idle");
  curr_anim = "idle";
}



function manage_player_update(s, player) {

  let next_anim = curr_anim;

  // Movimento orizzontale
  let vx = 0;
  if (PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
    vx = PLAYER_SPEED;
    player.geometry.flip_x = false;
  }
  else if (PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
    vx = -PLAYER_SPEED;
    player.geometry.flip_x = true;
  }
  PP.physics.set_velocity_x(player, vx);

  // Check se è a terra
  const on_ground = is_player_on_ground(player);

  // Salto
  if (on_ground && PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
    PP.physics.set_velocity_y(player, -JUMP_INIT_SPEED);
  }

  // Animazioni di base (a terra)
  if (on_ground) {
    if (Math.abs(vx) > 1) next_anim = "walk";
    else next_anim = "idle";
  }

  // Animazioni di salto (priorità più alta)
  const vy = PP.physics.get_velocity_y(player);
  if (vy < 0) {
    next_anim = "jump_up";
  }
  else if (vy > 0) {
    next_anim = "jump_down";
  }

  // Applico l'animazione solo se cambia
  if (next_anim !== curr_anim) {
    PP.assets.sprite.animation_play(player, next_anim);
    curr_anim = next_anim;
  }
}


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