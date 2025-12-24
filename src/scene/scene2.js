let img_map;        // sfondo
let ss_frog;        // spritesheet della rana
let player;         // personaggio rana
let floor;          // collider del pavimento principale
let platforms = []; // collider delle piattaforme rialzate
// Salto: contatore e stato tasto
let jumpCount = 0;
const MAX_JUMPS = 1;
let prevSpaceDown = false;

const WORLD_WIDTH     = 4480; // larghezza dello sfondo
const CANVAS_W        = 1280;
const CANVAS_H        = 720;

const FLOOR_Y         = 720;  // altezza del pavimento (posizione Y dei “piedi” della rana)
const PLAYER_SPEED    = 250;
const JUMP_INIT_SPEED = 550;

const PLATFORM_TOLERANCE_Y = 10; // Aumentata leggermente la tolleranza

let curr_anim = "idle";

// ====== Configurazione delle piattaforme rialzate ======
// x: coordinata X centrale della piattaforma (in pixel dello sfondo)
// w: larghezza della piattaforma
// h: spessore (altezza) della piattaforma
// topOffset: quanto è più alta la parte superiore della piattaforma rispetto al pavimento
const PLATFORM_CONFIG = [
  { x: 700,  w: 300, h: 40, topOffset: 80 },
  { x: 1400, w: 300, h: 40, topOffset: 140 },
  { x: 2100, w: 300, h: 40, topOffset: 200 },
  { x: 2800, w: 350, h: 40, topOffset: 260 },
];

function preload(s) {
  console.log("preload scene1");

  img_map = PP.assets.image.load(s, "assets/sfondotutorial.png");

  // Qui c'è il player
 ss_frog = PP.assets.sprite.load_spritesheet(
    s, 
    "assets/spritesheet.png", 
    122,
    152
  );
}

function create(s) {
  console.log("create scene1");

  // ---------- Sfondo posizionato alla base ----------
  const mapH    = 1080;
  const offsetY = CANVAS_H - mapH; // -360, per far combaciare il terreno col fondo
  PP.assets.image.add(s, img_map, 0, offsetY, 0, 0);

  // ---------- Rana ----------
  const startX = 200;      // leggermente a sinistra come posizione iniziale
  const startY = FLOOR_Y;  // i piedi poggiano sul pavimento

  // pivot_y = 1: l’ancoraggio è sui piedi
  player = PP.assets.sprite.add(s, ss_frog, startX, startY, 0.5, 1);
  // Corpo dinamico
  PP.physics.add(s, player, PP.physics.type.DYNAMIC);

  // ---------- Pavimento unico ----------
  floor = PP.shapes.rectangle_add(
    s,
    WORLD_WIDTH / 2, // coordinata X centrale del pavimento
    FLOOR_Y,         // coordinata Y del pavimento
    WORLD_WIDTH,     // larghezza 4480
    1,               // altezza di 1 pixel è sufficiente
    "0x000000",
    0                // trasparente
  );
  PP.physics.add(s, floor, PP.physics.type.STATIC);
  // Collider per il pavimento: imposta la flag e resetta il contatore dei salti
  PP.physics.add_collider_f(s, player, floor, function(s, player, floor) {
    player.is_on_platform = true;
    jumpCount = 0;
  });

  // ---------- Collider delle piattaforme rialzate ----------
  create_platform_colliders(s);

  // Rendo disponibili le informazioni del terreno alla logica condivisa
  window.FLOOR_Y = FLOOR_Y;
  window.FLOOR_SEGMENTS = FLOOR_SEGMENTS;

  // ---------- Animazioni ----------
  configure_player_animations(player);

  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 220);

}
function update(s) {
  const dt = s.game.loop.delta / 1000;

  // ---------- Movimento orizzontale ----------
  let vx = 0;

  if (PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
    vx = PLAYER_SPEED;
    player.geometry.flip_x = false;
  } else if (PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
    vx = -PLAYER_SPEED;
    player.geometry.flip_x = true;
  }

  PP.physics.set_velocity_x(player, vx);

  // ---------- Controllo: la rana “è appoggiata” su qualcosa? ----------
  let on_ground = false;

  // 1) Appoggiata sul pavimento
  if (player.geometry.y >= FLOOR_Y - 1) {
    on_ground = true;
  } else {
    // 2) Appoggiata su una piattaforma (i piedi vicino alla Y del top della piattaforma)
    for (let i = 0; i < PLATFORM_CONFIG.length; i++) {
      const cfg   = PLATFORM_CONFIG[i];
      const topY  = FLOOR_Y - cfg.topOffset;
      if (Math.abs(player.geometry.y - topY) < 5) {
        on_ground = true;
        break;
      }
    }
  }

  // ---------- Salto (solo se è appoggiata) ----------
  // reset contatore quando tocca terra
  if (on_ground) {
    jumpCount = 0;
  }

  // salto con edge-detect e massimo di salti
  const spaceDown = PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE);
  if (spaceDown && !prevSpaceDown) {
    if (on_ground || jumpCount < MAX_JUMPS) {
      PP.physics.set_velocity_y(player, -JUMP_INIT_SPEED);
      jumpCount++;
    }
  }
  prevSpaceDown = spaceDown;

  // ---------- Animazioni ----------
  const moving_on_ground = on_ground && Math.abs(vx) > 1;

  if (moving_on_ground && curr_anim !== "walk") {
    PP.assets.sprite.animation_play(player, "walk");
    curr_anim = "walk";
  } else if (!moving_on_ground && on_ground && curr_anim !== "idle") {
    PP.assets.sprite.animation_play(player, "idle");
    curr_anim = "idle";
  }
}

function destroy(s) {}

// ================= Creazione dei collider delle piattaforme =================
function manage_player_update(s, player) {
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
  const on_ground = is_player_on_ground(player);

  // Reset contatore quando tocca terra
  if (on_ground) {
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
  if (Array.isArray(FLOOR_SEGMENTS) && FLOOR_SEGMENTS.length > 0) {
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
  }

  return false;
}
function create_platform_colliders(s) {
  platforms = [];

  PLATFORM_CONFIG.forEach(cfg => {
    const topY    = FLOOR_Y - cfg.topOffset; // Y della parte superiore della piattaforma
    const centerY = topY + cfg.h / 2;        // Y del centro del rettangolo

    const rect = PP.shapes.rectangle_add(
      s,
      cfg.x,      // X del centro
      centerY,    // Y del centro
      cfg.w,      // larghezza
      cfg.h,      // altezza
      "0xff0000", // rosso per vedere meglio
      0.3         // semitrasparente per allineamento, poi si può mettere 0
    );

    PP.physics.add(s, rect, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, rect);

    platforms.push(rect);
  });
}


PP.scenes.add("scene2", preload, create, update, destroy);