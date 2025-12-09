let img_map;        // sfondo
let ss_frog;        // spritesheet della rana
let player;         // personaggio rana
let floor;          // collider del pavimento principale
let platforms = []; // collider delle piattaforme rialzate

const WORLD_WIDTH     = 4480; // larghezza dello sfondo
const CANVAS_W        = 1280;
const CANVAS_H        = 720;

const FLOOR_Y         = 650;  // altezza del pavimento (posizione Y dei “piedi” della rana)
const PLAYER_SPEED    = 250;
const JUMP_INIT_SPEED = 550;

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

  // Spritesheet intero 12960 x 1527, una riga con 6 frame → ogni frame è 2160 x 1527
  ss_frog = PP.assets.sprite.load_spritesheet(
    s,
    "assets/spritesheet.png",
    2160,
    1527
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
  player.geometry.scale_x = 0.2;
  player.geometry.scale_y = 0.2;

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
  PP.physics.add_collider(s, player, floor);

  // ---------- Collider delle piattaforme rialzate ----------
  create_platform_colliders(s);

  // ---------- Animazioni ----------
  PP.assets.sprite.animation_add(player, "idle", 0, 0, 1, 0);   // fermo
  PP.assets.sprite.animation_add(player, "walk", 0, 5, 10, -1); // camminata

  PP.assets.sprite.animation_play(player, "idle");
  curr_anim = "idle";

  // ---------- Telecamera che segue il personaggio ----------
  // Come mostrato dal professore: la camera segue il player
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
  if (
    on_ground &&
    PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)
  ) {
    PP.physics.set_velocity_y(player, -JUMP_INIT_SPEED);
  }

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