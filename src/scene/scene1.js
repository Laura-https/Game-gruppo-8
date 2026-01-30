let img_background;
let img_terreno;
let img_troncone;
let troncone;
let floor;

let ss_frog;
let player;

const BTN_HOME_W = 74;
const BTN_HOME_H = 67;
let ss_btn_home;

let HUD;
let fiala;
let ss_HUD_vita;
let ss_HUD_fiala;

let schifo_img;
let schifo_tutorial;
let schifo_liv1;

let gufetto_img;
let gufetto;

let bosco1_img, bosco2_img, bosco3_img;
let boschi = [];   
 
let img_cambio_albero;
let cambio_albero1, cambio_albero2;



// Salto: contatore e stato tasto(serve per doppio salto)
let jumpCount = 0;
const MAX_JUMPS = 1;
let prevSpaceDown = false;

const CANVAS_W = 1280;
const CANVAS_H = 720;
const WORLD_WIDTH = 9974;
const WORLD_HEIGHT = 2584;
const FLOOR_Y = 2584;

const startX_s1 = 300;
const startY_s1 = 2190;

const PLATFORM_TOLERANCE_Y = 10;

let curr_anim = "idle";


const FLOOR_SEGMENTS = [
  { x: 0, y: 1635, w: 227, h: 568 },
  { x: 9977, y: 1342, w: 1, h: 600 },
  { x: 9980, y: 0, w: 1, h: WORLD_HEIGHT },
  { x: 0, y: 2193, w: 1647, h: 404 },
  { x: 1640, y: 1993, w: 1768, h: 316 },
  { x: 2983, y: 1650, w: 534, h: 362 },
  { x: 3402, y: 1755, w: 286, h: 232 },
  { x: 3464, y: 1970, w: 508, h: 219 },
  { x: 3623, y: 2128, w: 1245, h: 431 },
  { x: 4860, y: 1860, w: 1504, h: 701 },
  { x: 6347, y: 2090, w: 563, h: 474 },
  { x: 6890, y: 2261, w: 1207, h: 304 },
  { x: 8083, y: 2175, w: 950, h: 402 },
  { x: 8888, y: 2333, w: 431, h: 125 },
  { x: 8888, y: 2458, w: 1089, h: 125 },
  { x: 9065, y: 1799, w: 909, h: 125 },
  { x: 9556, y: 1896, w: 421, h: 125 },
  { x: 1100, y: 2119, w: 210, h: 83 },
  { x: 1871, y: 1874, w: 210, h: 128 },
  { x: 2758, y: 1865, w: 210, h: 128 },
  { x: 5584, y: 1702, w: 183, h: 158 },
  { x: 7595, y: 2110, w: 140, h: 150 },
  { x: 8672, y: 2038, w: 147, h: 136 },
];

function preload(s) {
  console.log("preload scene1");
  ss_btn_home = PP.assets.sprite.load_spritesheet(
      s, "assets/icone/home_icona.png", BTN_HOME_W, BTN_HOME_H);
  img_background = PP.assets.image.load(s, "assets/background scene/background_bosco.png");
  img_troncone = PP.assets.image.load(s, "assets/background scene/tronco separazione scena.png");
  img_cambio_albero = PP.assets.image.load(s, "assets/cambio_albero.png");
  //img_background = PP.assets.image.load(s, "assets/background scene/sfondo_foresta.png");
  //img_terreno = PP.assets.image.load(s, "assets/background scene/terreno_foresta.png");
  preload_testo_tutorial(s);
  preload_dialogogufo(s);
  preload_dialoghi_NPC1(s);
  // Spritesheet rana

  //ss_frog = PP.assets.sprite.load_spritesheet(s, "assets/spritesheet.png", 2160, 1527);
  // 8 frame → 每帧 640x706
  ss_frog = PP.assets.sprite.load_spritesheet(
    s, "assets/spritesheet.png", 122, 152);

  ss_HUD_vita = PP.assets.sprite.load_spritesheet(s, "assets/HUD_vita.png", 400, 110);
  ss_HUD_fiala = PP.assets.sprite.load_spritesheet(s, "assets/HUD_fiala.png", 400, 110);

  preload_platforms_s1(s);
  preload_enemy(s);
  
  

  schifo_img = PP.assets.sprite.load_spritesheet(s, "assets/sprite_schifo.png", 102.6, 95); //----inquinamento da raccogliere

  gufetto_img = PP.assets.sprite.load_spritesheet(
  s,
  "assets/spritesheet_gufetto.png",  // 改成你的路径
  122,                    // 改成每帧宽
  177                     // 改成每帧高
  );


  bosco1_img = PP.assets.sprite.load_spritesheet(s, "assets/spritesheet_npcbosco1.png", 122, 212);
  bosco2_img = PP.assets.sprite.load_spritesheet(s, "assets/spritesheet_npcbosco2.png", 122, 232);
  bosco3_img = PP.assets.sprite.load_spritesheet(s, "assets/spritesheet_npcbosco3.png", 122, 182);
}



function create(s) {
  // ✅ 新增：每次进 scene1 初始化 HP / 无敌 / 死亡锁

  // --- BOTTONE HOME ---
  let btn_home = PP.assets.sprite.add(s, ss_btn_home, 1210, 70, 0.5, 0.5);
  btn_home.ph_obj.setFrame(0);
  btn_home.tile_geometry.scroll_factor_x = 0;
  btn_home.tile_geometry.scroll_factor_y = 0;
  PP.layers.set_z_index(btn_home, 5);
  
  PP.interactive.mouse.add(btn_home, "pointerover", () => {
      btn_home.ph_obj.setFrame(1);
  });
  PP.interactive.mouse.add(btn_home, "pointerout", () => {
      btn_home.ph_obj.setFrame(0);
  });
  PP.interactive.mouse.add(btn_home, "pointerdown", () => PP.scenes.start("main_menu"));

  PP.assets.tilesprite.add(s, img_background, -690, -385, 11374, 3264, 0, 0);
  create_testo_tutorial(s);
  create_dialogogufo(s);
  create_dialoghi_NPC1(s);
  //PP.assets.tilesprite.add(s, img_terreno, -700, -400, 11374, 3264, 0, 0);
  troncone = PP.assets.image.add(s, img_troncone, 3050, 334, 0, 0);
  PP.layers.set_z_index(troncone, 2);
  cambio_albero1 = PP.assets.image.add(s, img_cambio_albero, 9950, 1550, 0.5, 0);
  PP.layers.set_z_index(cambio_albero1, 1);
  cambio_albero2 = PP.assets.image.add(s, img_cambio_albero, 9950, 2500, 0.5, 1);
  PP.layers.set_z_index(cambio_albero2, 1);
  player = PP.assets.sprite.add(s, ss_frog, startX_s1, startY_s1, 0.5, 1);





  HUD = PP.assets.sprite.add(s, ss_HUD_vita, 200, 70, 0.5, 0.5);
  fiala = PP.assets.sprite.add(s, ss_HUD_fiala, 200, 70, 0.5, 0.5);

  HUD.tile_geometry.scroll_factor_x = 0;
  HUD.tile_geometry.scroll_factor_y = 0;
  fiala.tile_geometry.scroll_factor_x = 0;
  fiala.tile_geometry.scroll_factor_y = 0;
  PP.layers.set_z_index(fiala, 4);
  PP.layers.set_z_index(HUD, 3);

  PP.physics.add(s, player, PP.physics.type.DYNAMIC);

  hitbox_player(player);

  

  // ---------- Pavimento unico (Base) ----------
  floor = PP.shapes.rectangle_add(s, WORLD_WIDTH / 2, FLOOR_Y, WORLD_WIDTH, 1, "0x000000", 0);
  PP.physics.add(s, floor, PP.physics.type.STATIC);

  PP.physics.add_collider_f(s, player, floor, function (s, player, floor) {
    player.is_on_platform = true;
    jumpCount = 0;

  
  });

  // ✅ 地块（player + enemy 的 collider）
create_enemy(s, floor, player);
create_floor_segments(s, player);
create_platforms_s1(s, player);


window.FLOOR_Y = FLOOR_Y;
window.FLOOR_SEGMENTS = FLOOR_SEGMENTS;


  
  // ---------- Animazioni ----------
  configure_player_animations(player);
  configure_HUD_vita_animations(HUD);
  configure_HUD_fiala_animations(fiala);
  update_HUD_vita(HUD);
  update_HUD_fiala(fiala);

  PP.camera.start_follow(s, player, 0, 120);

 //------schifo di questa scena-----
   schifo_tutorial = PP.assets.sprite.add(s, schifo_img, 2172, 1495, 0.5, 0.5);
    PP.physics.add(s, schifo_tutorial, PP.physics.type.STATIC);
  schifo_liv1 = PP.assets.sprite.add(s, schifo_img, 8737, 460, 0.5, 0.5);
    PP.physics.add(s, schifo_liv1, PP.physics.type.STATIC);

    
    PP.assets.sprite.animation_add(schifo_liv1, "idle", 0, 17, 10, -1);
    PP.assets.sprite.animation_play(schifo_liv1, "idle");

    PP.assets.sprite.animation_add(schifo_tutorial, "idle", 0, 17, 10, -1);
    PP.assets.sprite.animation_play(schifo_tutorial, "idle");


    // ------ gufetto di questa scena ------
gufetto = PP.assets.sprite.add(s, gufetto_img, 6205, 1785, 0.5, 0.5);
PP.physics.add(s, gufetto, PP.physics.type.STATIC);

// idle anim (改帧范围/帧率)
PP.assets.sprite.animation_add(gufetto, "idle", 0, 39, 10, -1);
PP.assets.sprite.animation_play(gufetto, "idle");

const boscoData = [
  { id: "bosco1", sheet: bosco1_img, x: 8383, y: 2191 },
  { id: "bosco2", sheet: bosco2_img, x: 8519, y: 2191 },
  { id: "bosco3", sheet: bosco3_img, x: 8252, y: 2195 },
];

boscoData.forEach(cfg => {
  const npc = PP.assets.sprite.add(s, cfg.sheet, cfg.x, cfg.y, 0.5, 1);
  PP.physics.add(s, npc, PP.physics.type.STATIC);

  // 10 frames => 0..9
  PP.assets.sprite.animation_add(npc, "idle", 0, 9, 10, -1);
  PP.assets.sprite.animation_play(npc, "idle");

  npc.npc_id = cfg.id;
  npc.talked = false;
  boschi.push(npc);
});


  // ------elemento reset HP e fiala dopo tutorial-----
  const resetElement = PP.shapes.rectangle_add(s, 3267, 1321, 1, 500, "0xFF0000", 0);
  PP.physics.add(s, resetElement, PP.physics.type.STATIC);
  //resetElement.physics.body.setCollideWorldBounds(false);

  PP.physics.add_overlap_f(s, player, resetElement, function (s, player, resetElement) {
    PP.game_state.set_variable("HP", 3);
    PP.game_state.set_variable("fiala", 0);
  });
}

function update(s) {
   if (PP.game_state.get_variable("pulita_s1")) {
    console.log("✓ Scena 1 completata!");
  }
  else {
    console.log("✗ Scena 1 non completata.");
  }
  
  // ✅ 新增：死亡后停止 scene1 的更新，避免卡死
  if (PP.game_state.get_variable("DEAD")) return;

  manage_player_update(s, player);
  update_enemy(s);
  update_HUD_vita(HUD);
  update_HUD_fiala(fiala);
  update_testo_tutorial(s, player);
  update_dialogogufo(s, player);
  update_dialoghi_NPC1(s, player);
  

  // Raccolta schifo con tasto R
  const rKeyDown = PP.interactive.kb.is_key_down(s, PP.key_codes.R);
  //console.log("R pressed:", rKeyDown, "prevRDown:", player.prevRDown);
  if (rKeyDown) {
    console.log("Tentativo di raccolta!");
    const collectRange = 150;
    
    // Verifica schifo_tutorial
    if (schifo_tutorial && !schifo_tutorial.collected) {
      const distTutorial = Math.hypot(
        player.geometry.x - schifo_tutorial.geometry.x,
        player.geometry.y - schifo_tutorial.geometry.y
      );
      console.log("Distanza schifo_tutorial:", distTutorial);
      if (distTutorial < collectRange) {
        schifo_tutorial.collected = true;
        PP.game_state.set_variable("schifo_tutorial_collected", true);
        PP.assets.destroy(schifo_tutorial);
        
        const currentFiala = PP.game_state.get_variable("fiala") || 0;
        PP.game_state.set_variable("fiala", currentFiala + 1);
        console.log("Raccolto schifo_tutorial! Fiala:", currentFiala + 1);
      }
    }
    // Verifica schifo_liv1
    if (schifo_liv1 && !schifo_liv1.collected) {
      const distLiv1 = Math.hypot(
        player.geometry.x - schifo_liv1.geometry.x,
        player.geometry.y - schifo_liv1.geometry.y
      );
      console.log("Distanza schifo_liv1:", distLiv1);
      if (distLiv1 < collectRange) {
        schifo_liv1.collected = true;
        PP.assets.destroy(schifo_liv1);
        PP.game_state.set_variable("pulita_s1", true); //------strumentopolo misterioso che ci servirà più tardi
        const currentFiala = PP.game_state.get_variable("fiala") || 0;
        PP.game_state.set_variable("fiala", currentFiala + 1);
        console.log("Raccolto schifo_liv1! Fiala:", currentFiala + 1);
      }
    }
  }
  
}

function destroy(s) { }



function create_floor_segments(s, player) {
  FLOOR_SEGMENTS.forEach(seg => {
    const centerX = seg.x + seg.w / 2;
    const centerY = seg.y + seg.h / 2;

    const block = PP.shapes.rectangle_add(
      s,
      centerX,
      centerY,
      seg.w,
      seg.h,
      "0x00ff00",
      0.0
    );
// passaggio scena1 scena2/scena3
    PP.physics.add(s, block, PP.physics.type.STATIC);
//scena2
    if (seg.x === 9977) {
      PP.physics.add_collider_f(s, player, block, function(s, player, block) {
        console.log("Passaggio a scene2");
        PP.scenes.start("scene2");
      });
      //scena3
    } else if (seg.x === 9980 && seg.y === 0) {
      PP.physics.add_collider_f(s, player, block, function(s, player, block) {
        console.log("Passaggio a scene3");
        PP.scenes.start("scene3");
      });
    } else {
      PP.physics.add_collider(s, player, block);
    }

    // ✅ 给所有敌人加 collider（关键）
    if (typeof enemies_list !== "undefined") {
      enemies_list.forEach(e => {
        if (e) PP.physics.add_collider(s, e, block);
      });
    }
  });
}



PP.scenes.add("scene1", preload, create, update, destroy);
