let HUD;
let fiala;
let ss_HUD_vita;
let ss_HUD_fiala;



// Configura le animazioni della vita
function configure_HUD_vita_animations(hudSprite) {
  //  3 HP
  PP.assets.sprite.animation_add(hudSprite, "vita_3", 0, 0, 10, 0);
  
  //  2 HP
  PP.assets.sprite.animation_add(hudSprite, "vita_2", 1, 1, 10, 0);
  
  //  1 HP
  PP.assets.sprite.animation_add(hudSprite, "vita_1", 2, 2, 10, 0);
  
  //  0 HP
  PP.assets.sprite.animation_add(hudSprite, "vita_0", 3, 3, 10, 0);
}

// Aggiorna il frame della vita in base agli HP attuali
function update_HUD_vita(hudSprite) {
  const currentHP = PP.game_state.get_variable("HP") || 3; // Default a 3 se non inizializzato
  
  switch(currentHP) {
    case 3:
      PP.assets.sprite.animation_play(hudSprite, "vita_3");
      break;
    case 2:
      PP.assets.sprite.animation_play(hudSprite, "vita_2");
      break;
    case 1:
      PP.assets.sprite.animation_play(hudSprite, "vita_1");
      break;
    case 0:
    default:
      PP.assets.sprite.animation_play(hudSprite, "vita_0");
      break;
  }
}

function configure_HUD_fiala_animations(hudSprite) {
  //  3 HP
  PP.assets.sprite.animation_add(hudSprite, "fiala_0", 0, 0, 10, 0);
  
  //  2 HP
  PP.assets.sprite.animation_add(hudSprite, "fiala_1", 1, 1, 10, 0);
  
  //  1 HP
  PP.assets.sprite.animation_add(hudSprite, "fiala_2", 2, 2, 10, 0);

  //  0 HP
  PP.assets.sprite.animation_add(hudSprite, "fiala_3", 3, 3, 10, 0);
}

function update_HUD_fiala(hudSprite) {
  const currentFIALA = PP.game_state.get_variable("fiala") || 0; // Default a 0 se non inizializzato

  switch(currentFIALA) {
    case 3:
      PP.assets.sprite.animation_play(hudSprite, "fiala_3");
      break;
    case 2:
      PP.assets.sprite.animation_play(hudSprite, "fiala_2");
      break;
    case 1:
      PP.assets.sprite.animation_play(hudSprite, "fiala_1");
      break;
    case 0:
    default:
      PP.assets.sprite.animation_play(hudSprite, "fiala_0");
      break;
  }
}