let img_enemy;
let enemy;
let enemy_head;
let enemy_player;

const ENEMY_W = 120;
const ENEMY_H = 180;

const HEAD_W = 50;
const HEAD_H = 18;
const HEAD_OFFSET_Y = 0;

let vulnerable = true;

function preload_enemy(s) {
  img_enemy = PP.assets.sprite.load_spritesheet(
    s,
    "assets/camminata_enemy.png",
    ENEMY_W,
    ENEMY_H
  );
}

function set_vulnerable() {
  vulnerable = true;
  PP.game_state.set_variable("INVULNERABLE", false);
}

function take_damage(s, enemyBody, player) {
  // ✅ 新增：死亡锁，死亡后任何碰撞都不再处理（防止第三次卡死）
  if (PP.game_state.get_variable("DEAD")) return;

  const hp0 = PP.game_state.get_variable("HP");
  if (typeof hp0 !== "number") PP.game_state.set_variable("HP", 3);

  if (PP.game_state.get_variable("INVULNERABLE")) return;
  if (!vulnerable) return;

  vulnerable = false;
  PP.game_state.set_variable("INVULNERABLE", true);

  PP.game_state.set_variable("HP", PP.game_state.get_variable("HP") - 1);
  const hp = PP.game_state.get_variable("HP");
  console.log("HP =", hp);

  if (hp <= 0) {
    // ✅ 最关键：只触发一次死亡
    PP.game_state.set_variable("DEAD", true);

    // 清头顶框，避免 update 继续重建 overlap
    if (enemy_head) {
      PP.assets.destroy(enemy_head);
      enemy_head = null;
    }

    // 清敌人本体
    if (enemy) {
      PP.assets.destroy(enemy);
      enemy = null;
    }

    // 停玩家，避免继续 overlap
    PP.physics.set_velocity_x(player, 0);
    PP.physics.set_velocity_y(player, 0);
    if (player.body) player.body.enable = false;

    PP.scenes.start("game_over");
    return;
  }

  PP.timers.add_timer(s, 2000, set_vulnerable, false);
}

function collision_enemy_head(s, a, b) {
  // ✅ 死亡锁：如果已经死了，不处理
  if (PP.game_state.get_variable("DEAD")) return;

  if (!enemy || !enemy_head) return;

  const player = (a === enemy_head) ? b : a;
  PP.physics.set_velocity_y(player, -400);

  PP.assets.destroy(enemy_head);
  PP.assets.destroy(enemy);

  enemy_head = null;
  enemy = null;

  set_vulnerable();

  console.log("enemy killed!");
}

function spawn_enemy_head(s) {
  if (!enemy) return;

  const headX = enemy.geometry.x;
  const headY = enemy.geometry.y - ENEMY_H - (HEAD_H / 2) - HEAD_OFFSET_Y;

  if (enemy_head) {
    PP.assets.destroy(enemy_head);
    enemy_head = null;
  }

  enemy_head = PP.shapes.rectangle_add(s, headX, headY, HEAD_W, HEAD_H, "0x0000ff", 0.3);
  PP.physics.add(s, enemy_head, PP.physics.type.STATIC);

  PP.physics.add_overlap_f(s, enemy_player, enemy_head, collision_enemy_head);
}

function create_enemy(s, floor, player) {
  if (enemy) return;

  // ✅ 确保 flags 有值
  if (typeof PP.game_state.get_variable("HP") !== "number") PP.game_state.set_variable("HP", 3);
  if (typeof PP.game_state.get_variable("DEAD") !== "boolean") PP.game_state.set_variable("DEAD", false);
  PP.game_state.set_variable("INVULNERABLE", false);
  vulnerable = true;

  enemy_player = player;

  enemy = PP.assets.sprite.add(s, img_enemy, 1000, 400, 0.5, 1);
  PP.physics.add(s, enemy, PP.physics.type.DYNAMIC);
  PP.physics.add_collider(s, enemy, floor);

  PP.physics.add_overlap_f(s, enemy, player, take_damage);

  spawn_enemy_head(s);

  PP.physics.set_velocity_x(enemy, 100);
  PP.assets.sprite.animation_add_list(enemy, "walk", [0, 1, 2, 3, 4, 5, 6], 10, -1);
  PP.assets.sprite.animation_play(enemy, "walk");
}

function update_enemy(s) {
  if (!enemy) return;
  if (PP.game_state.get_variable("DEAD")) return; // ✅ 死亡后不更新敌人

  spawn_enemy_head(s);

  if (enemy.geometry.x >= 1000) {
    PP.physics.set_velocity_x(enemy, -100);
    enemy.geometry.flip_x = true;
  } else if (enemy.geometry.x <= 600) {
    PP.physics.set_velocity_x(enemy, 100);
    enemy.geometry.flip_x = false;
  }
}
