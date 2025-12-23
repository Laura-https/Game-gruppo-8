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
  PP.physics.add_collider(s, player, floor);

  // ---------- Collider piattaforme marroni ----------
  //create_platform_colliders(s);

  // ---------- Collider terreno verde (FIXED) ----------
  create_floor_segments(s, player);

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
  player.is_on_platform = false;
}

function destroy(s) { }

// ================= Funzioni di supporto =================
//funzioni player da qui  
function manage_player_update(s, player) {  // questa funzione la possiamo mettere nel suo file separato
  // Movimento X
  let vx = 0;
  if (PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
    vx = PLAYER_SPEED;
    player.geometry.flip_x = false;
  } else if (PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
    vx = -PLAYER_SPEED;
    player.geometry.flip_x = true;
  }
  PP.physics.set_velocity_x(player, vx);

  // Check se è a terra (pavimento o piattaforme o blocchi verdi)
  const on_ground = is_player_on_ground(player);  // dove sta questa funzione?

  // Reset contatore quando tocca terra
  if (on_ground == true) {
    jumpCount = 0;
  }

  // Salto: solo al momento della pressione (edge detect) e massimo `MAX_JUMPS`
  const spaceDown = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);
  if (spaceDown && !prevSpaceDown) {
    // Se è a terra o ha ancora salti rimanenti
    if (on_ground || jumpCount < MAX_JUMPS) {
      PP.physics.set_velocity_y(player, -JUMP_INIT_SPEED);
      jumpCount++;
    }
  }
  prevSpaceDown = spaceDown;

  // Animazioni
  const moving_on_ground = on_ground && Math.abs(vx) > 1;
  if (moving_on_ground && curr_anim !== "walk") {
    PP.assets.sprite.animation_play(player, "walk");
    curr_anim = "walk";
  } else if (!moving_on_ground && on_ground && curr_anim !== "idle") {
    PP.assets.sprite.animation_play(player, "idle");
    curr_anim = "idle";
  }
}
// *** FUNZIONE FIXATA: Ora controlla anche i blocchi verdi ***
function is_player_on_ground(player) {

  // Se il callback di collisione ha impostato la flag, consideriamo il player a terra
  if (player.is_on_platform) return true;
  
  // 1) Pavimento principale
  if (player.geometry.y >= FLOOR_Y - 1) return true; 


 

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
//a qui



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