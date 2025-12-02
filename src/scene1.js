

let img_map;        // 背景
let ss_frog;        // 青蛙 spritesheet
let player;         // 青蛙精灵
let floor;          // 整体地板 collider
let platforms = []; // 平台 collider 们

const WORLD_WIDTH     = 4480; // 背景宽
const CANVAS_W        = 1280;
const CANVAS_H        = 720;

const FLOOR_Y         = 650;  // 地板高度（青蛙“脚”的 y）
const PLAYER_SPEED    = 250;
const JUMP_INIT_SPEED = 550;

let curr_anim = "idle";

// ====== 在这里配置“凸起平台”的大致位置 ======
// x: 平台中心的 x 坐标（按背景像素算）
// w: 平台宽度
// h: 平台的“厚度”（高度）
// topOffset: 平台顶部比地板高多少像素（往上）
const PLATFORM_CONFIG = [
  { x: 700,  w: 300, h: 40, topOffset: 80 },
  { x: 1400, w: 300, h: 40, topOffset: 140 },
  { x: 2100, w: 300, h: 40, topOffset: 200 },
  { x: 2800, w: 350, h: 40, topOffset: 260 },
];

function preload(s) {
  console.log("preload scene1");

  img_map = PP.assets.image.load(s, "assets/sfondotutorial.png");

  // 整张 12960 x 1527，一行 6 帧 → 单帧 2160 x 1527
  ss_frog = PP.assets.sprite.load_spritesheet(
    s,
    "assets/spritesheet.png",
    2160,
    1527
  );
}

function create(s) {
  console.log("create scene1");

  // ---------- 背景贴到底部 ----------
  const mapH    = 1080;
  const offsetY = CANVAS_H - mapH; // -360，让地面贴到底
  PP.assets.image.add(s, img_map, 0, offsetY, 0, 0);

  // ---------- 青蛙 ----------
  const startX = 200;      // 从左边一点起步
  const startY = FLOOR_Y;  // 脚在地板上

  // pivot_y = 1：脚做锚点
  player = PP.assets.sprite.add(s, ss_frog, startX, startY, 0.5, 1);
  player.geometry.scale_x = 0.2;
  player.geometry.scale_y = 0.2;

  // 动态刚体
  PP.physics.add(s, player, PP.physics.type.DYNAMIC);

  // ---------- 一整条地板 ----------
  floor = PP.shapes.rectangle_add(
    s,
    WORLD_WIDTH / 2, // 地板中心 x
    FLOOR_Y,         // 地板中心 y
    WORLD_WIDTH,     // 宽 4480
    1,               // 高度 1 像素即可
    "0x000000",
    0                // 透明
  );
  PP.physics.add(s, floor, PP.physics.type.STATIC);
  PP.physics.add_collider(s, player, floor);

  // ---------- 凸起平台 colliders ----------
  create_platform_colliders(s);

  // ---------- 动画 ----------
  PP.assets.sprite.animation_add(player, "idle", 0, 0, 1, 0);   // 站立
  PP.assets.sprite.animation_add(player, "walk", 0, 5, 10, -1); // 跑步

  PP.assets.sprite.animation_play(player, "idle");
  curr_anim = "idle";

  // ---------- 摄像机跟随 ----------
  // 和老师类似，让摄像机跟着 player
  PP.camera.start_follow(s, player, 0, 220);
}

function update(s) {
  const dt = s.game.loop.delta / 1000;

  // ---------- 左右移动 ----------
  let vx = 0;

  if (PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
    vx = PLAYER_SPEED;
    player.geometry.flip_x = false;
  } else if (PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
    vx = -PLAYER_SPEED;
    player.geometry.flip_x = true;
  }

  PP.physics.set_velocity_x(player, vx);

  // ---------- 判断是否“站在东西上” ----------
  let on_ground = false;

  // 1) 站在地板上
  if (player.geometry.y >= FLOOR_Y - 1) {
    on_ground = true;
  } else {
    // 2) 站在某个平台顶上（脚的 y 接近平台的 topY）
    for (let i = 0; i < PLATFORM_CONFIG.length; i++) {
      const cfg   = PLATFORM_CONFIG[i];
      const topY  = FLOOR_Y - cfg.topOffset;
      if (Math.abs(player.geometry.y - topY) < 5) {
        on_ground = true;
        break;
      }
    }
  }

  // ---------- 跳跃（只在 on_ground 时允许） ----------
  if (
    on_ground &&
    PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)
  ) {
    PP.physics.set_velocity_y(player, -JUMP_INIT_SPEED);
  }

  // ---------- 动画 ----------
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

// ================= 平台 collider 创建 =================

function create_platform_colliders(s) {
  platforms = [];

  PLATFORM_CONFIG.forEach(cfg => {
    const topY    = FLOOR_Y - cfg.topOffset; // 平台顶部的 y
    const centerY = topY + cfg.h / 2;        // 矩形中心 y

    const rect = PP.shapes.rectangle_add(
      s,
      cfg.x,      // 中心 x
      centerY,    // 中心 y
      cfg.w,      // 宽
      cfg.h,      // 高
      "0xff0000", // 先用红色
      0.3         // 先半透明方便对齐，调好后可以改成 0
    );

    PP.physics.add(s, rect, PP.physics.type.STATIC);
    PP.physics.add_collider(s, player, rect);

    platforms.push(rect);
  });
}

PP.scenes.add("scene1", preload, create, update, destroy);
