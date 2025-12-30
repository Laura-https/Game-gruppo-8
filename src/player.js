
let ss_frog;
let player;
let floor;

// `PLATFORM_CONFIG`, `FLOOR_SEGMENTS` and `FLOOR_Y` are defined per-scene (e.g. in scene1/scene3)

const PLAYER_SPEED = 250;
const JUMP_INIT_SPEED = 370;
const PLATFORM_TOLERANCE_Y = 10; // Aumentata leggermente la tolleranza
// Salto: contatore e stato tasto(serve per doppio salto)
let jumpCount = 0;
const MAX_JUMPS = 1;
let prevSpaceDown = false;

let curr_anim = "idle";

//funzioni player incollate
function configure_player_animations(player) {

  // idle：单帧
  PP.assets.sprite.animation_add(player, "idle", 0, 0, 1, 0);

  // walk：播放全部 8 帧
  PP.assets.sprite.animation_add(player, "walk", 1, 7, 10, -1);

  PP.assets.sprite.animation_play(player, "idle");
  curr_anim = "idle";
}

function manage_player_update(s, player) {  // questa funzione la possiamo mettere nel suo file separato
  // Movimento X
  let vx = 0;
  if (PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
    PP.physics.set_velocity_x(player, PLAYER_SPEED);
    vx = PLAYER_SPEED;
    player.geometry.flip_x = false;
  } else if (PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
    vx = - PLAYER_SPEED;
    PP.physics.set_velocity_x(player, -PLAYER_SPEED);
    player.geometry.flip_x = true;
  }
  else {
    // Se non e' premuto alcun tasto...
    PP.physics.set_velocity_x(player, 0);
    next_anim = "idle";
  }

  // Reset della flag impostata dalle callback di collisione in precedenti frame
  // Viene re-impostata a true solo se durante questo frame si verifica una collisione
  player.is_on_platform = false;

  // Check se è a terra (pavimento o piattaforme o blocchi verdi)
  const on_ground = is_player_on_ground(player);

  // Reset contatore quando tocca terra
  if (on_ground == true) {
    jumpCount = 0;
  }

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

  // Animazioni
  const moving_on_ground = on_ground && Math.abs(vx) > 1;
  if (moving_on_ground && curr_anim !== "walk") {
    PP.assets.sprite.animation_play(player, "walk");
    curr_anim = "walk";
  } else if (!moving_on_ground && on_ground && curr_anim !== "idle") {
    PP.assets.sprite.animation_play(player, "idle");
    curr_anim = "idle";
  }
}

// funzione di controllo se il player sta sul suolo o su una piattaforma
function is_player_on_ground(player) {

  

  // 2) Piattaforme
  if (player.is_on_platform === true) {
    return true;
  }

  // 3) Terreno irregolare (Verdi) - AGGIUNTO QUESTO PEZZO
  if (Array.isArray(FLOOR_SEGMENTS) && FLOOR_SEGMENTS.length > 0) {
    for (let i = 0; i < FLOOR_SEGMENTS.length; i++) {
      const seg = FLOOR_SEGMENTS[i];
      // seg.y è la parte superiore del blocco verde
      if (Math.abs(player.geometry.y - seg.y) < PLATFORM_TOLERANCE_Y) {
        // Controllo extra: siamo anche sopra il blocco orizzontalmente?
        if (player.geometry.x >= seg.x && player.geometry.x <= (seg.x + seg.w)) {
          return true;
        }
      }
    }
  }
  
}





