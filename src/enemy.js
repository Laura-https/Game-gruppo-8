let img_enemy;
let enemy;
let enemy_head;
let enemy_player;   // 保存 player 引用，方便每次重建 headbox 时重新绑 overlap

let vulnerable = true;

const ENEMY_SIZE = 72;
const HEAD_W = 50;
const HEAD_H = 18;
const HEAD_OFFSET_Y = 0; // 往上抬就填正数，比如 6

function preload_enemy(s) {
  img_enemy = PP.assets.sprite.load_spritesheet(s, "assets/enemy.png", 72, 72);
}

function set_vulnerable() {
  vulnerable = true;
}

function take_damage(s, enemyBody, player) {
  // If a global INVULNERABLE flag is set, ignore damage
  if (PP.game_state.get_variable("INVULNERABLE")) return;

  // Mark invulnerable immediately to prevent multiple hits
  PP.game_state.set_variable("INVULNERABLE", true);

  // Decrement HP
  PP.game_state.set_variable("HP", PP.game_state.get_variable("HP") - 1);

  if (PP.game_state.get_variable("HP") <= 0) {
    PP.scenes.start("game_over");
  }

  // After 2 seconds, clear invulnerability
  PP.timers.add_timer(s, 2000, function() {
    PP.game_state.set_variable("INVULNERABLE", false);
    // restore legacy flag for compatibility
    vulnerable = true;
  }, false);

  // Keep legacy flag false while invulnerable
  vulnerable = false;
}

//  踩到头顶 hitbox：消灭 enemy
function collision_enemy_head(s, a, b) {
  if (!enemy || !enemy_head) return;

  const headbox = (a === enemy_head) ? a : b;

  // 先别反弹，避免误触发镜头飞天（等一切对了再加）
const player = (a === enemy_head) ? b : a;
PP.physics.set_velocity_y(player, -400);

  PP.assets.destroy(headbox);
  PP.assets.destroy(enemy);

  enemy_head = null;
  enemy = null;

  console.log("enemy killed!");
}

// 创建/重建 headbox（mushrooms 同思路：创建一个静态物体 + overlap）
function spawn_enemy_head(s) {
  if (!enemy) return;

  const headX = enemy.geometry.x;
  const headY = enemy.geometry.y - ENEMY_SIZE - (HEAD_H / 2) - HEAD_OFFSET_Y;

  // 先把旧的销毁（关键：把天上的蓝色框清掉）
  if (enemy_head) {
    PP.assets.destroy(enemy_head);
    enemy_head = null;
  }

  enemy_head = PP.shapes.rectangle_add(s, headX, headY, HEAD_W, HEAD_H, "0x0000ff", 0.3);
  PP.physics.add(s, enemy_head, PP.physics.type.STATIC);

  // 重新绑定 overlap
  PP.physics.add_overlap_f(s, enemy_player, enemy_head, collision_enemy_head);
}

function create_enemy(s, floor, player) {
  vulnerable = true;
  enemy_player = player;

  enemy = PP.assets.sprite.add(s, img_enemy, 1000, 800, 0.5, 1);
  PP.physics.add(s, enemy, PP.physics.type.DYNAMIC);
  PP.physics.add_collider(s, enemy, floor);

  // 身体碰到扣血
  PP.physics.add_overlap_f(s, enemy, player, take_damage);

  // 第一次生成 headbox（正确位置）
  spawn_enemy_head(s);

  // 移动+动画
  PP.physics.set_velocity_x(enemy, 100);
  PP.assets.sprite.animation_add(enemy, "walk_left", 0, 3, 10, -1);
  PP.assets.sprite.animation_add(enemy, "walk_right", 12, 15, 10, -1);
  PP.assets.sprite.animation_play(enemy, "walk_right");
}

function update_enemy(s) {
  if (!enemy) return;

  //  每帧重建 headbox（确保蓝色物理框永远贴头顶）
  spawn_enemy_head(s);

  if (enemy.geometry.x >= 1000) {
    PP.physics.set_velocity_x(enemy, -100);
    PP.assets.sprite.animation_play(enemy, "walk_left");
  } else if (enemy.geometry.x <= 600) {
    PP.physics.set_velocity_x(enemy, 100);
    PP.assets.sprite.animation_play(enemy, "walk_right");
  }
}
