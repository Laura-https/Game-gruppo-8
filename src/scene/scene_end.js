let img_background;  
let ss_frog;         
let player;          
let floor; 

let sprite_viandante_img;
let viandante;
let sprite_falena;
let falena;

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

let startX_s4 = 1050;     
let startY_s4 = 2108;    //--------------------spown point rana

let curr_anim = "idle";

// ====== Configurazione Terreno Irregolare (Verdi) ======

const FLOOR_SEGMENTS = [
  { x: 599, y: 385, w: 1, h: 900 },//barriera alla scena 2
  { x: 599, y: 1632, w: 1, h: 500 }, //barriera alla scena 3
  { x: 4500, y:0, w: 1, h: WORLD_HEIGHT }, // barriera che impedisce di andare avanti
  { x:0, y: 1290, w: 1756, h:73  },
  { x:0, y:1364, w: 897, h: 270 },

  { x:0 , y:2129, w: 1465, h: 527 },
  { x: 1227, y:2046, w: 452, h: 267 },
  { x: 1498, y:1847, w: 382, h: 600 },
  { x: 1740, y:1743, w: 404, h: 667},
  { x:1960 , y:1580, w: 245, h: 441 },
  { x: 2175, y:1381, w: 3115, h: 1309 },

  // Segmenti dedicati ai passaggi di scena
  { x: 600, y: 360, w: 1, h: 900, exit_to: "scene2" },
  { x: 600, y: 1900, w: 1, h: 500, exit_to: "scene3" },

]

function preload(s) {
 img_background = PP.assets.image.load(s, "assets/background scene/scena_end.png");   // impostare nuovo background
 
 ss_frog = PP.assets.sprite.load_spritesheet(s,  "assets/spritesheet.png", 122,152);
 sprite_viandante_img = PP.assets.sprite.load_spritesheet(s, "assets/spritesheet_viandante.png", 182,182);
 sprite_falena= PP.assets.sprite.load_spritesheet(s, "assets/spritesheet_falena.png", 122,132);

 ss_HUD_vita = PP.assets.sprite.load_spritesheet(s, "assets/HUD_vita.png", 400, 110);
 ss_HUD_fiala = PP.assets.sprite.load_spritesheet(s, "assets/HUD_fiala.png", 400, 110);

 preload_dialogo_viandante(s);
 preload_falena_dialoghi(s);
 
}

function create(s) {
  // Leggi la scena precedente e imposta le coordinate di spawn
  let scena_precedente = PP.game_state.get_variable("prev_scena");
  if (scena_precedente === 2) {
    startX_s4 = 1091;     
    startY_s4 = 1250;    
  }
  else if (scena_precedente === 3) {
    startX_s4 = 1050;     
    startY_s4 = 2108;
  }

  PP.assets.tilesprite.add(s, img_background, 0, 0, WORLD_WIDTH, WORLD_HEIGHT, 0, 0); //  ------sfondo
 
  
    viandante = PP.assets.sprite.add(s, sprite_viandante_img, 3840, 1386, 0.5, 1);
    PP.physics.add(s, viandante, PP.physics.type.STATIC);
    PP.layers.set_z_index(viandante, 2);
   PP.assets.sprite.animation_add(viandante, "idle", 0, 7, 5, -1);
    PP.assets.sprite.animation_play(viandante, "idle");

    falena = PP.assets.sprite.add(s, sprite_falena, 2832, 1372, 0.5, 1);
    PP.physics.add(s, falena, PP.physics.type.DYNAMIC);
    PP.layers.set_z_index(falena, 2);
   PP.assets.sprite.animation_add(falena, "idle", 0, 10, 15, -1);
    PP.assets.sprite.animation_play(falena, "idle");

  create_dialogo_viandante(s);
  create_falena_dialoghi(s);
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
  create_floor_segments(s, player, viandante, falena);

  // Rendo disponibili le informazioni del terreno alla logica in player.js
  window.FLOOR_SEGMENTS = FLOOR_SEGMENTS;
  
  // ---------- Animazioni ----------
  configure_player_animations(player);

  configure_HUD_vita_animations(HUD);
  configure_HUD_fiala_animations(fiala);
  update_HUD_vita(HUD);
  update_HUD_fiala(fiala);
  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 120);
}

function update(s) {
  console.log("Player X:", player.geometry.x.toFixed(2), "Y:", player.geometry.y.toFixed(2));
  
  // Controlla se tutte le scene sono pulite
  const pulita_s1 = PP.game_state.get_variable("pulita_s1") === true;
  const pulita_s2 = PP.game_state.get_variable("pulita_s2") === true;
  const pulita_s3 = PP.game_state.get_variable("pulita_s3") === true;
  const tuttoPulito = pulita_s1 && pulita_s2 && pulita_s3;
  PP.game_state.set_variable("tuttoPulito", tuttoPulito);
  console.log("Tutto pulito:", tuttoPulito);
  
  // Se non tutto è pulito e il player supera x=2750, rimandalo indietro
  if (!tuttoPulito && player.geometry.x >= 2750) {
    player.geometry.x = 2750;
    PP.physics.set_velocity_x(player, 0);
  }
  
  // Se falena_via è true, imposta velocità Y della falena a -20
  const falena_via = PP.game_state.get_variable("falena_via") === true;
  if (falena_via && falena) {
    PP.physics.set_velocity_y(falena, -20);
  }
  
  manage_player_update(s, player);
  update_HUD_vita(HUD);
  update_HUD_fiala(fiala);
  update_dialogo_viandante(s, player);
  update_dialogo_falena(s, player);

}

function destroy(s) { }

function create_floor_segments(s, player, viandante, falena) {   //questo serve qui
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

    if (seg.exit_to) {
      PP.physics.add_collider_f(s, player, block, function(s, player, block) {
        console.log("Passaggio a", seg.exit_to);
        PP.scenes.start(seg.exit_to);
      });
      if (falena) {
        PP.physics.add_collider(s, falena, block);
      }
    } else {
      PP.physics.add_collider(s, player, block);
      if (viandante) {
        PP.physics.add_collider(s, viandante, block);
      }
      if (falena) {
        PP.physics.add_collider(s, falena, block);
      }
    }
  });

  }


PP.scenes.add("scene_end", preload, create, update, destroy);