let ss_frog;
let player;
let floor;
let FLOOR_Y;

// `PLATFORM_CONFIG`, `FLOOR_SEGMENTS` and `FLOOR_Y` are defined per-scene (e.g. in scene1/scene3)

const PLAYER_SPEED = 250;
const JUMP_INIT_SPEED = 450;
const PLATFORM_TOLERANCE_Y = 10;

// Salto: contatore e stato tasto(serve per doppio salto)
let jumpCount = 0;
const MAX_JUMPS = 1;
let prevSpaceDown = false;

let curr_anim = "idle";

// Tracciamento caduta
let fall_start_y = null;
const soglia_fall_damage = -650;

// Costanti hitbox: larghezza 102, altezza 152, offset sx/dx 20/10
const HITBOX_WIDTH = 65;
const HITBOX_HEIGHT = 147;
const HITBOX_OFFSET_X_RIGHT = 35;  // quando facing right (flip_x = false)
const HITBOX_OFFSET_X_LEFT = 20;    // quando facing left (flip_x = true) - stesso valore per simmetria
const HITBOX_OFFSET_Y = 0;

function hitbox_player(player) {
PP.physics.set_collision_rectangle(player, HITBOX_WIDTH, HITBOX_HEIGHT, 50, 0);
}
// Aggiorna l'offset della hitbox in base alla direzione (flip_x)
function update_hitbox_flip(player) {
  const offset_x = player.geometry.flip_x ? HITBOX_OFFSET_X_LEFT : HITBOX_OFFSET_X_RIGHT;
  PP.physics.set_collision_rectangle(player, HITBOX_WIDTH, HITBOX_HEIGHT, offset_x, HITBOX_OFFSET_Y);
}

// ======= Animazioni rana (scene1 -> player.js) =======
function configure_player_animations(player) {
  // idle / stop
  PP.assets.sprite.animation_add(player, "idle", 0, 0, 10, 0);

  // walk / run（不连续帧）
  PP.assets.sprite.animation_add_list(
    player,
    "walk",
    [1, 2, 3, 5, 6, 7, 8],
    10,
    -1
  );

  // jump up（上升）
  PP.assets.sprite.animation_add_list(
    player,
    "jump_up",
    [11, 12, 13, 14],
    10,
    1
  );

  // jump down（下降）
  PP.assets.sprite.animation_add_list(
    player,
    "jump_down",
    [4, 9, 15],
    10,
    -1
  );

  PP.assets.sprite.animation_play(player, "idle");
  curr_anim = "idle";
}

function manage_player_update(s, player) {
  if (!player) return;
  if (player.body && player.body.enable === false) return;
  if (player.ph_obj && player.ph_obj.body && player.ph_obj.body.enable === false) return;

  // Movimento X
  let vx = 0;
  if (PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
    PP.physics.set_velocity_x(player, PLAYER_SPEED);
    vx = PLAYER_SPEED;
    player.geometry.flip_x = false;
    update_hitbox_flip(player);
  } else if (PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
    vx = -PLAYER_SPEED;
    PP.physics.set_velocity_x(player, -PLAYER_SPEED);
    player.geometry.flip_x = true;
    update_hitbox_flip(player);
  } else {
    // Se non e' premuto alcun tasto...
    PP.physics.set_velocity_x(player, 0);

  
  }

  // Reset della flag impostata dalle callback di collisione in precedenti frame

  // Check se è a terra (pavimento o piattaforme o blocchi verdi)
  const on_ground = is_player_on_ground(player);

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

  // Reset contatore quando tocca terra
  if (on_ground == true) {
    jumpCount = 0;
    
    // Controlla danno da caduta
    if (fall_start_y !== null) {
      const fall_distance = fall_start_y - player.geometry.y;
      console.log("Fall distance:", fall_distance, "Threshold:", soglia_fall_damage);
      fall_start_y = null; // Reset immediatamente per evitare danno doppio
      if (fall_distance <= soglia_fall_damage) {
        console.log("FALL DAMAGE TRIGGERED!");
        // Applica danno da caduta
        if (!PP.game_state.get_variable("INVULNERABLE")) {
          PP.game_state.set_variable("INVULNERABLE", true);
          const currentHP = PP.game_state.get_variable("HP") || 3;
          PP.game_state.set_variable("HP", currentHP - 1);
          console.log("HP after fall:", PP.game_state.get_variable("HP"));
          
          if (PP.game_state.get_variable("HP") <= 0) {
            PP.scenes.start("game_over");
          }
          
          // 2 secondi di invulnerabilità
          PP.timers.add_timer(s, 2000, function() {
            PP.game_state.set_variable("INVULNERABLE", false);
          }, false);
        }
      }
    }
  }
  
  // Traccia inizio caduta
  const vy = PP.physics.get_velocity_y(player);
  if (vy > 0 && fall_start_y === null && !on_ground) {
    fall_start_y = player.geometry.y;
  }

  // ======= 动画切换（idle / walk / jump_up / jump_down） =======
  let next_anim = curr_anim;

  // 地面：idle / walk
  

  // 空中：按 vy 切 jump（优先级更高）
  if (vy < 0) next_anim = "jump_up";
  else if (vy > 0) next_anim = "jump_down";

  if (on_ground) {
    next_anim = Math.abs(vx) > 1 ? "walk" : "idle";
    
  }
console.log(on_ground);
  if (next_anim !== curr_anim) {
    PP.assets.sprite.animation_play(player, next_anim);
    curr_anim = next_anim;
  }
}

// funzione di controllo se il player sta sul suolo o su una piattaforma
function is_player_on_ground(player) {
  // 0) Se il corpo fisico segnala contatto verso il basso (phaser: blocked/touching), è sicuramente a terra
  if (
    player.ph_obj &&
    player.ph_obj.body &&
   ((player.ph_obj.body.blocked && player.ph_obj.body.blocked.down) ||
    (player.ph_obj.body.touching && player.ph_obj.body.touching.down))
  ) {
    return true;
  }

  // 1) Pavimento principale (con una piccola tolleranza)
  if (typeof FLOOR_Y !== "undefined" && player.geometry.y >= FLOOR_Y - 1) {
    return true;
  }


  // 3) Flag impostata dai collider (compatibilità con callback)
  // Se è true ma NON c'è contatto fisico, resettala: significa che il player ha lasciato la piattaforma
  if (player.is_on_platform === true) {
    if (
      !(player.ph_obj &&
      player.ph_obj.body &&
      ((player.ph_obj.body.blocked && player.ph_obj.body.blocked.down) ||
        (player.ph_obj.body.touching && player.ph_obj.body.touching.down)))
    ) {
      // nessun contatto fisico -> resettare la flag
      player.is_on_platform = false;
    } else {
      return true;
    }
  }

  // 4) Terreno irregolare (Verdi)
  if (Array.isArray(FLOOR_SEGMENTS) && FLOOR_SEGMENTS.length > 0) {
    for (let i = 0; i < FLOOR_SEGMENTS.length; i++) {
      const seg = FLOOR_SEGMENTS[i];
      if (Math.abs(player.geometry.y - seg.y) < PLATFORM_TOLERANCE_Y) {
        if (player.geometry.x >= seg.x && player.geometry.x <= seg.x + seg.w) {
          return true;
        }
      }
    }
  }
  player.is_on_platform = false;
  return false;
}
