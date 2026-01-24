let img_background;
let ss_frog;
let player;
let floor;

let GUI;
let fiala;
let ss_GUI_vita;
let ss_GUI_fiala;

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
  { x: 9977, y: 0, w: 1, h: WORLD_HEIGHT },
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
  img_background = PP.assets.image.load(s, "assets/background_bosco.png");

  ss_frog = PP.assets.sprite.load_spritesheet(s, "assets/spritesheet.png", 122, 152);

  ss_GUI_vita = PP.assets.sprite.load_spritesheet(s, "assets/GUI_vita.png", 400, 110);
  ss_GUI_fiala = PP.assets.sprite.load_spritesheet(s, "assets/GUI_fiala.png", 400, 110);

  preload_platforms_s1(s);
  preload_enemy(s);
}

function create(s) {
  // ✅ 新增：每次进 scene1 初始化 HP / 无敌 / 死亡锁
  PP.game_state.set_variable("HP", 3);
  PP.game_state.set_variable("INVULNERABLE", false);
  PP.game_state.set_variable("DEAD", false);

  PP.assets.tilesprite.add(s, img_background, -700, -400, 11374, 3264, 0, 0);

  player = PP.assets.sprite.add(s, ss_frog, startX_s1, startY_s1, 0.5, 1);

  GUI = PP.assets.sprite.add(s, ss_GUI_vita, 200, 70, 0.5, 0.5);
  fiala = PP.assets.sprite.add(s, ss_GUI_fiala, 200, 70, 0.5, 0.5);

  GUI.tile_geometry.scroll_factor_x = 0;
  GUI.tile_geometry.scroll_factor_y = 0;
  fiala.tile_geometry.scroll_factor_x = 0;
  fiala.tile_geometry.scroll_factor_y = 0;
  PP.layers.set_z_index(fiala, 3);
  PP.layers.set_z_index(GUI, 2);

  PP.physics.add(s, player, PP.physics.type.DYNAMIC);

  hitbox_player(player);

  floor = PP.shapes.rectangle_add(s, WORLD_WIDTH / 2, FLOOR_Y, WORLD_WIDTH, 1, "0x000000", 0);
  PP.physics.add(s, floor, PP.physics.type.STATIC);

  PP.physics.add_collider_f(s, player, floor, function (s, player, floor) {
    player.is_on_platform = true;
    jumpCount = 0;
  });

  // ✅ 地块（player + enemy 的 collider）
  create_enemy(s, floor, player);
  create_floor_segments(s, player, enemy);

  window.FLOOR_Y = FLOOR_Y;
  window.FLOOR_SEGMENTS = FLOOR_SEGMENTS;

  create_platforms_s1(s, player);

  configure_player_animations(player);
  configure_GUI_vita_animations(GUI);
  update_GUI_vita(GUI);

  PP.camera.start_follow(s, player, 0, 120);
}

function update(s) {
  // ✅ 新增：死亡后停止 scene1 的更新，避免卡死
  if (PP.game_state.get_variable("DEAD")) return;

  manage_player_update(s, player);
  update_enemy(s);
  update_GUI_vita(GUI);
}

function destroy(s) {
  player = null;
  enemy = null;
  enemy_head = null;
  enemy_player = null;
  PP.game_state.set_variable("HP", 3);
  PP.game_state.set_variable("DEAD", false);
  PP.game_state.set_variable("INVULNERABLE", false);
}

function create_floor_segments(s, player, enemyRef) {
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

    PP.physics.add(s, block, PP.physics.type.STATIC);

    PP.physics.add_collider(s, player, block);

    if (enemyRef) {
      PP.physics.add_collider(s, enemyRef, block);
    }
  });
}

PP.scenes.add("scene1", preload, create, update, destroy);
