let player;
const FLOOR_Y         = 720;  // altezza del pavimento (posizione Y dei “piedi” della rana)
const PLAYER_SPEED    = 250;
const JUMP_INIT_SPEED = 550;
const PLATFORM_TOLERANCE_Y = 10;

let curr_anim = "idle"; // Questa variabile contiene l'animazione corrente

const PLATFORM_CONFIG = [
  { x: 1400, w: 300, h: 40, topOffset: 140 },
  { x: 2100, w: 300, h: 40, topOffset: 200 },
  { x: 2800, w: 350, h: 40, topOffset: 260 },
];
const FLOOR_SEGMENTS = [
  { x: 200, y: 600, w: 250, h: 50 },  
  { x: 450, y: 550, w: 320, h: 300 }, 
  { x: 800, y: 500, w: 300, h: 850 },  
  { x: 72, y: 596, w: 145, h: 247 },
  { x: 588, y: 658, w: 886, h: 123 },

];


function configure_player_animations(player) {

  // idle：单帧
  PP.assets.sprite.animation_add(player, "idle", 0, 0, 1, 0);

  // walk：播放全部 8 帧
  PP.assets.sprite.animation_add(player, "walk", 0, 7, 10, -1);

  PP.assets.sprite.animation_play(player, "idle");
  curr_anim = "idle";
}

  //questo controlla quando il player tocca la terra
  function is_player_on_ground(player) {
  
  // 1) Pavimento principale
  if (player.geometry.y >= FLOOR_Y - 1) return true;

  // 2) Piattaforme volanti (Marroni)
  for (let i = 0; i < PLATFORM_CONFIG.length; i++) {
    const cfg = PLATFORM_CONFIG[i];
    const topY = FLOOR_Y - cfg.topOffset;
    if (Math.abs(player.geometry.y - topY) < PLATFORM_TOLERANCE_Y) {
      // Controllo se siamo dentro la larghezza della piattaforma
      // (semplificato, controlla solo Y per ora come prima, ma è meglio aggiungere X se serve precisione)
      return true;
    }
  }

  // 3) Terreno irregolare (Verdi) - AGGIUNTO QUESTO PEZZO
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

  return false;
}


function manage_player_update(s, player) {
  // Movimento X
  let vx = 0;
  if (PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
    vx = PLAYER_SPEED;
    player.geometry.flip_x = false;
  } else if (PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
    vx = -PLAYER_SPEED;
    player.geometry.flip_x = true;
  }
  PP.physics.set_velocity_x(player, vx);

  // Check se è a terra (pavimento o piattaforme o blocchi verdi)
  const on_ground = is_player_on_ground(player);

  // Salto
  if (on_ground && PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
    PP.physics.set_velocity_y(player, -JUMP_INIT_SPEED);
  }

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
    // Logica per specchiare il giocatore:
    if (PP.physics.get_velocity_x(player) < 0) {
        player.geometry.flip_x = true;
    }
    else if (PP.physics.get_velocity_x(player) > 0) {
        player.geometry.flip_x = false;
    }




