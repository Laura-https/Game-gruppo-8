let img_enemy;
let enemy;
let enemy_head;
let enemy_player;

const ENEMY_W = 120;
const ENEMY_H = 180;

const HEAD_W = 50;
const HEAD_H = 18;
const HEAD_OFFSET_Y = 0;

// Flag locale per gestire l'invulnerabilità del nemico
let vulnerable = true;

function preload_enemy(s) {
  // Carica lo spritesheet del nemico
  img_enemy = PP.assets.sprite.load_spritesheet(
    s,
    "assets/camminata_enemy.png",
    ENEMY_W,
    ENEMY_H
  );
}

// Ripristina la possibilità di subire danni
function set_vulnerable() {
  vulnerable = true;
  PP.game_state.set_variable("INVULNERABLE", false);
}

// Gestione del danno quando il player tocca il corpo del nemico
// enemy.js

function take_damage(s, enemyBody, player) {
  // Se il player è già morto, ignora tutto
  if (PP.game_state.get_variable("DEAD")) return;

  // Assicura che HP sia inizializzato
  const hp0 = PP.game_state.get_variable("HP");
  if (typeof hp0 !== "number") PP.game_state.set_variable("HP", 3);

  // 1. 先检查是否无敌，如果是，直接返回
  if (PP.game_state.get_variable("INVULNERABLE")) return;
  if (!vulnerable) return;

  // 2. 这里的顺序是关键！
  // 以前你在这里把 INVULNERABLE 设为了 true，导致后面那行 player_take_damage 认为玩家已经无敌了，从而不执行。
  
  // 这里的 vulnerable 是敌人自己的本地冷却，可以设为 false
  vulnerable = false; 

  // 🔴 关键修改：不要在这里设置 "INVULNERABLE" = true
  // 让 player_take_damage 里面去设置它，否则 player_take_damage 会直接 return。

  // 3. 调用 player.js 里的扣血逻辑 (变红 + 扣HP + 开启无敌)
  if (typeof player_take_damage === 'function') {
      player_take_damage(s, player, 1);
  }

  // 4. 处理死亡后的清理工作
  // player_take_damage 已经减过血了，这里只需要读取结果
  if (PP.game_state.get_variable("HP") <= 0) {
    PP.game_state.set_variable("DEAD", true);
    if (enemy_head) {
      PP.assets.destroy(enemy_head);
      enemy_head = null;
    }
    if (enemy) {
      PP.assets.destroy(enemy);
      enemy = null;
    }
    PP.physics.set_velocity_x(player, 0);
    PP.physics.set_velocity_y(player, 0);
    if (player.body) player.body.enable = false;
    if (player.ph_obj && player.ph_obj.body) player.ph_obj.body.enable = false;
  }

  // Dopo 2 secondi il player può subire di nuovo danni (resetta il flag locale del nemico)
  PP.timers.add_timer(s, 2000, set_vulnerable, false);
}

// Gestione collisione con la testa del nemico (il player salta sopra)
function collision_enemy_head(s, a, b) {
  // Se il player è già morto, ignora
  if (PP.game_state.get_variable("DEAD")) return;
  if (!enemy || !enemy_head) return;

  const player = (a === enemy_head) ? b : a;

  // Rimbalzo del player verso l'alto
  PP.physics.set_velocity_y(player, -400);

  // Distrugge hitbox testa e nemico
  PP.assets.destroy(enemy_head);
  enemy_head = null;

  PP.assets.destroy(enemy);
  enemy = null;

  // Ripristina vulnerabilità per sicurezza
  set_vulnerable();

  console.log("enemy killed!");
}

// Crea la hitbox della testa UNA SOLA VOLTA e aggiorna solo la posizione
function ensure_enemy_head(s) {
  if (!enemy) return;

  const headX = enemy.geometry.x;
  const headY = enemy.geometry.y - ENEMY_H - (HEAD_H / 2) - HEAD_OFFSET_Y;

  // Rimuove la vecchia hitbox se esiste
  if (enemy_head) {
    PP.assets.destroy(enemy_head);
    enemy_head = null;
  }

  // Crea la hitbox sopra il nemico
  enemy_head = PP.shapes.rectangle_add(
    s,
    headX,
    headY,
    HEAD_W,
    HEAD_H,
    "0x0000ff",
    0.0 // 0.0 Invisibile
  );

  // Aggiunge la fisica statica
  PP.physics.add(s, enemy_head, PP.physics.type.STATIC);

  // Gestisce la collisione con il player
  PP.physics.add_overlap_f(s, enemy_player, enemy_head, collision_enemy_head);
}
// Crea il nemico nella scena
function create_enemy(s, floor, player) {
  // Evita di creare più nemici per errore
  if (enemy) return;

  // Inizializza variabili globali di stato
  if (typeof PP.game_state.get_variable("HP") !== "number") {
    PP.game_state.set_variable("HP", 3);
  }
  if (typeof PP.game_state.get_variable("DEAD") !== "boolean") {
    PP.game_state.set_variable("DEAD", false);
  }

  PP.game_state.set_variable("INVULNERABLE", false);
  vulnerable = true;

  enemy_player = player;

  // Crea sprite del nemico
  enemy = PP.assets.sprite.add(s, img_enemy, 1400, 1200, 0.5, 1);
  PP.physics.add(s, enemy, PP.physics.type.DYNAMIC);

  // Collisione con il pavimento
  PP.physics.add_collider(s, enemy, floor);

  // Overlap con il player per infliggere danno
  PP.physics.add_overlap_f(s, enemy, player, take_damage);

  // Crea la hitbox della testa
  ensure_enemy_head(s);

  // Movimento iniziale
  PP.physics.set_velocity_x(enemy, 100);

  // Animazione di camminata
  PP.assets.sprite.animation_add_list(
    enemy,
    "walk",
    [0, 1, 2, 3, 4, 5, 6],
    10,
    -1
  );
  PP.assets.sprite.animation_play(enemy, "walk");
}

// Update del nemico (chiamato ogni frame)
function update_enemy(s) {
  if (!enemy) return;
  if (PP.game_state.get_variable("DEAD")) return;

  // Aggiorna posizione hitbox testa
  ensure_enemy_head(s);
  let min_enemy1 = 1392;
  let max_enemy1 = 1580;
  // Movimento avanti/indietro tra due limiti
  if (enemy.geometry.x >= max_enemy1) {
    PP.physics.set_velocity_x(enemy, -100);
    enemy.geometry.flip_x = true;
  } else if (enemy.geometry.x <= min_enemy1) {
    PP.physics.set_velocity_x(enemy, 100);
    enemy.geometry.flip_x = false;
  }
}
