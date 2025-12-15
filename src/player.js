
let ss_frog;         
let player;          
let floor; 

let PLATFORM_CONFIG;
let FLOOR_SEGMENTS;
let FLOOR_Y;

//funzioni player incollate
function configure_player_animations(player) {

  // idle：单帧
  PP.assets.sprite.animation_add(player, "idle", 0, 0, 1, 0);

  // walk：播放全部 8 帧
  PP.assets.sprite.animation_add(player, "walk", 1, 7, 10, -1);

  PP.assets.sprite.animation_play(player, "idle");
  curr_anim = "idle";
}




