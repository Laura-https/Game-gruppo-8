let img_background;
let floor;
let img_copertura;
let copertura;

let ss_frog;
let player;

let HUD;
let fiala;
let ss_HUD_vita;
let ss_HUD_fiala;

let schifo_img;
let schifo_liv2;

let scarico_img;
let scarico1;
let scarico2;
let scarico3;
let scarico4;
let spwscarico= -343;

let img_acqua1;
let img_acqua2;
let img_acqua3;
let img_acqua4;
let acqua1;
let acqua2;
let acqua3;
let acqua4;
// Salto: contatore e stato tasto(serve per doppio salto)
let jumpCount = 0;
const MAX_JUMPS = 1;
let prevSpaceDown = false;

// ====== Costanti di configurazione ======
const CANVAS_W = 1280;
const CANVAS_H = 720;
const WORLD_WIDTH = 6740;
const WORLD_HEIGHT = 1036;

const startX_s2 = 100; // 100;     
const startY_s2 = 880; //880;    //--------------------spown point rana

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
  { x: 2923, y: 887, w: 1460, h: 88 },
  { x: 4317, y: 695, w: 1515, h: 304 },
  { x: 6326, y: 435, w: 422, h: 407 },
  { x: 5737, y: 992, w: 692, h: 448 },
  //inizio barriere fabbrica//
  { x: 3015, y: 163, w: 1600, h: 107 },
  { x: 4530, y: -166, w: 75, h: 339 }, // cambio
  { x: 4600, y: 278, w: 339, h: 74 },
  { x: 4600, y: 346, w: 620, h: 42 },
  { x: 5310, y: 623, w: 505, h: 74 },
  { x: 5412, y: 551, w: 407, h: 74 },
  { x: 5512, y: 480, w: 309, h: 74 },
  { x: 5611, y: 408, w: 218, h: 74 },
  { x: 5711, y: 337, w: 297, h: 74 },
  { x: 2956, y: -260, w: 3030, h: 107 },// tetto fabbrica

]

const ACQUA_SEGMENTS = [   //configurazione acqua putrida
  { x: 427, y: 928, w: 823, h: 40 },
  { x: 1566, y: 803, w: 1058, h: 40 },
  { x: 2984, y: 777, w: 1337, h: 50 },
  { x: 5833, y: 720, w: 490, h: 266 },
];

function preload(s) {
  img_background = PP.assets.image.load(s, "assets/background scene/background_fiume.png"); 
  img_copertura = PP.assets.image.load(s, "assets/background scene/copertura_s2.png");   // impostare nuovo background
  ss_frog = PP.assets.sprite.load_spritesheet(s, "assets/spritesheet.png", 122, 152);

  // Spritesheet HUD
  ss_HUD_vita = PP.assets.sprite.load_spritesheet(s, "assets/HUD_vita.png", 400, 110);
  ss_HUD_fiala = PP.assets.sprite.load_spritesheet(s, "assets/HUD_fiala.png", 400, 110);

  preload_platforms_s2(s);
  

  schifo_img = PP.assets.sprite.load_spritesheet(s, "assets/sprite_schifo.png", 102.6, 95); //----inquinamento da raccogliere
  scarico_img = PP.assets.sprite.load_spritesheet(s, "assets/cascatanuova.png", 70,505);  
  
  img_acqua1 = PP.assets.image.load(s, "assets/primo_piano/acquafiume1.png");
  img_acqua2 = PP.assets.image.load(s, "assets/primo_piano/acquafiume2.png");
  img_acqua3 = PP.assets.image.load(s, "assets/primo_piano/acquafiume3.png");
  img_acqua4 = PP.assets.image.load(s, "assets/primo_piano/acquafiume4.png");
}


function create(s) {
  PP.assets.tilesprite.add(s, img_background, -700, -670, 8058, 2510, 0, 0); //  ------sfondo
  copertura = PP.assets.image.add(s, img_copertura, -698, -670, 0, 0); //  ------copertura
  PP.layers.set_z_index(copertura, 2);

  player = PP.assets.sprite.add(s, ss_frog, startX_s2, startY_s2, 0.5, 1);

  PP.physics.add(s, player, PP.physics.type.DYNAMIC); //player e la sua hitbox
  hitbox_player(player);

  acqua1 = PP.assets.image.add(s, img_acqua1, 429.5, 887, 0, 0);
  PP.layers.set_z_index(acqua1, 2 );
  acqua1.visibility.alpha = 0.3;
  acqua2 = PP.assets.image.add(s, img_acqua2, 1553, 769, 0, 0);
  PP.layers.set_z_index(acqua2, 2 );
  acqua2.visibility.alpha = 0.3;
  acqua3 = PP.assets.image.add(s, img_acqua3, 2979, 734, 0, 0);
  PP.layers.set_z_index(acqua3, 2 );
  acqua3.visibility.alpha = 0.3;
  acqua4 = PP.assets.image.add(s, img_acqua4, 5832, 720, 0, 0);
  PP.layers.set_z_index(acqua4, 2 );
  acqua4.visibility.alpha = 0.3;


  //----------scarico fabbrica---------------------------------------------------------
  
  scarico1 = PP.assets.sprite.add(s, scarico_img, 3076, spwscarico, 0, 0);
   PP.physics.add(s, scarico1, PP.physics.type.DYNAMIC);
    PP.physics.set_velocity_y(scarico1, 1);
  PP.assets.sprite.animation_add(scarico1, "idle", 0, 4, 10, -1);
    PP.assets.sprite.animation_play(scarico1, "idle");

  scarico2 = PP.assets.sprite.add(s, scarico_img, 3441, spwscarico, 0, 0);
   PP.physics.add(s, scarico2, PP.physics.type.DYNAMIC);
    PP.physics.set_velocity_y(scarico2, 2);
   PP.assets.sprite.animation_add(scarico2, "idle", 0, 4, 10, -1);
    PP.assets.sprite.animation_play(scarico2, "idle");

  scarico3 = PP.assets.sprite.add(s, scarico_img, 3806, spwscarico, 0, 0);
  PP.physics.add(s, scarico3, PP.physics.type.DYNAMIC);
  PP.physics.set_velocity_y(scarico3, 1);
  PP.assets.sprite.animation_add(scarico3, "idle", 0, 4, 10, -1);
    PP.assets.sprite.animation_play(scarico3, "idle");
  scarico4 = PP.assets.sprite.add(s, scarico_img, 4153, spwscarico, 0, 0);
  PP.physics.add(s, scarico4, PP.physics.type.DYNAMIC);
  PP.physics.set_velocity_y(scarico4, 2);
  PP.assets.sprite.animation_add(scarico4, "idle", 0, 3, 10, -1);
    PP.assets.sprite.animation_play(scarico4, "idle");
  PP.physics.add_overlap_f(s, player, scarico1, collision_scarico);
  PP.physics.add_overlap_f(s, player, scarico2, collision_scarico);
  PP.physics.add_overlap_f(s, player, scarico3, collision_scarico);
  PP.physics.add_overlap_f(s, player, scarico4, collision_scarico);
  
  


  // ---------- HUD ----------
  HUD = PP.assets.sprite.add(s, ss_HUD_vita, 200, 70, 0.5, 0.5);
  fiala = PP.assets.sprite.add(s, ss_HUD_fiala, 200, 70, 0.5, 0.5);

  HUD.tile_geometry.scroll_factor_x = 0;
  HUD.tile_geometry.scroll_factor_y = 0;
  fiala.tile_geometry.scroll_factor_x = 0;
  fiala.tile_geometry.scroll_factor_y = 0;
  PP.layers.set_z_index(fiala, 4);
  PP.layers.set_z_index(HUD, 3);

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
  // ---------- Blocchi acqua putrida ----------
  create_acquaPutrida(s, player); 
  
  window.ACQUA_SEGMENTS = ACQUA_SEGMENTS;

  // ---------- Piattaforme scena 2----------
  create_platforms_s2(s, player);

  // ---------- Animazioni ----------
  configure_player_animations(player);
  configure_HUD_vita_animations(HUD);
  configure_HUD_fiala_animations(fiala);
  update_HUD_vita(HUD);
  update_HUD_fiala(fiala);

  // ---------- Telecamera ----------
  PP.camera.start_follow(s, player, 0, 120);

  schifo_liv2 = PP.assets.sprite.add(s, schifo_img, 4750, 200, 0.5, 0.5);
    PP.physics.add(s, schifo_liv2, PP.physics.type.STATIC);
   PP.assets.sprite.animation_add(schifo_liv2, "idle", 0, 17, 10, -1);
    PP.assets.sprite.animation_play(schifo_liv2, "idle");

  
  
}

function update(s) {
  manage_player_update(s, player);
  update_platforms_s2(s);
  update_HUD_vita(HUD);
  update_HUD_fiala(fiala);

 if(scarico1.geometry.y >= 1300) {
        scarico1.geometry.y = spwscarico;
        PP.physics.set_velocity_y(scarico1, 1);
        //console.log("Scarico resettato");
    }
 if(scarico2.geometry.y >= 1300 ) {
        scarico2.geometry.y = spwscarico;
        PP.physics.set_velocity_y(scarico2, 2);
        //console.log("Scarico resettato");
    }
 if(scarico3.geometry.y >= 1300) {
        scarico3.geometry.y = spwscarico;
        PP.physics.set_velocity_y(scarico3, 1);
        //console.log("Scarico resettato");
    }
  if(scarico4.geometry.y >= 1300) {
        scarico4.geometry.y = spwscarico;
        PP.physics.set_velocity_y(scarico4, 2);
        //console.log("Scarico resettato");
    }
  // Raccolta schifo con tasto R
  const rKeyDown = PP.interactive.kb.is_key_down(s, PP.key_codes.R);
  //console.log("R pressed:", rKeyDown, "prevRDown:", player.prevRDown);
  if (rKeyDown) {
  
    const collectRange = 120;
    // Verifica schifo_liv2
    if (schifo_liv2 && !schifo_liv2.collected) {
      const distLiv2 = Math.hypot(
        player.geometry.x - schifo_liv2.geometry.x,
        player.geometry.y - schifo_liv2.geometry.y
      );
      console.log("Distanza schifo_liv2:", distLiv2);
      if (distLiv2 < collectRange) {
        schifo_liv2.collected = true;
        PP.assets.destroy(schifo_liv2);
        PP.game_state.set_variable("pulita_s2", true); //------strumentopolo misterioso che ci servirà più tardi
        const currentFiala = PP.game_state.get_variable("fiala") || 0;
        PP.game_state.set_variable("fiala", currentFiala + 1);
        console.log("Raccolto schifo_liv2! Fiala:", currentFiala + 1);
      }
    }
  }
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


    // passaggio tra scene
    if (seg.x === 6741) {
      // Passaggio da scene2 a scene3
      PP.physics.add_collider_f(s, player, block, function(s, player, block) {
        console.log("Passaggio a scene3");
        PP.scenes.start("scene3");
      });
    } else if (seg.x === -1) {
      
      // Passaggio da scene2 a scene1
      PP.physics.add_collider_f(s, player, block, function(s, player, block) {
        console.log("Passaggio a scene1");
        PP.scenes.start("scene1");
      });
    } else {
      PP.physics.add_collider(s, player, block);
    }
  });
}
function create_acquaPutrida(s, player) {   //funzione per i blocchi d'acqua
  ACQUA_SEGMENTS.forEach(seg => {
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
    PP.physics.add_overlap_f(s, player, block, function (s, player, block) {
      // Controllo che INVULNERABLE sia false per prendere danno
      const isInvulnerable = PP.game_state.get_variable("INVULNERABLE") || false;
      if (!isInvulnerable) {
        const currentHP = PP.game_state.get_variable("HP") || 3;
        if (currentHP > 0) {
          PP.game_state.set_variable("HP", currentHP - 1);
          // Imposta INVULNERABLE a true
          PP.game_state.set_variable("INVULNERABLE", true);
          // Timer di 2 secondi dopo il quale INVULNERABLE torna a false
          setTimeout(() => {
            PP.game_state.set_variable("INVULNERABLE", false);
          }, 2000);
          
          if (PP.game_state.get_variable("HP") <= 0) {
            setTimeout(() => {
              PP.scenes.start("game_over");
            }, 1000);
          }
        }
      }
    });
  });
}
function collision_scarico(s, player, scarico) {
    // Controllo che INVULNERABLE sia false per prendere danno
    const isInvulnerable = PP.game_state.get_variable("INVULNERABLE") || false;
    if (!isInvulnerable) {
        const currentHP = PP.game_state.get_variable("HP") || 3;
        if (currentHP > 0) {
            PP.game_state.set_variable("HP", currentHP - 1);
            // Imposta INVULNERABLE a true
            PP.game_state.set_variable("INVULNERABLE", true);
            // Timer di 2 secondi dopo il quale INVULNERABLE torna a false
            setTimeout(() => {
                PP.game_state.set_variable("INVULNERABLE", false);
            }, 2000);
            
            // Se HP raggiunge zero, avvia la scena game_over dopo 1 secondo
            const newHP = PP.game_state.get_variable("HP");
            if (newHP <= 0) {
                setTimeout(() => {
                    PP.scenes.start("game_over");
                }, 1000);
            }
        }
    }
}

PP.scenes.add("scene2", preload, create, update, destroy);