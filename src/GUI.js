let GUI;
let fiala;
let ss_GUI_vita;
let ss_GUI_fiala;



// Configura le animazioni della vita
function configure_GUI_vita_animations(guiSprite) {
  //  3 HP
  PP.assets.sprite.animation_add(guiSprite, "vita_3", 0, 0, 10, 0);
  
  //  2 HP
  PP.assets.sprite.animation_add(guiSprite, "vita_2", 1, 1, 10, 0);
  
  //  1 HP
  PP.assets.sprite.animation_add(guiSprite, "vita_1", 2, 2, 10, 0);
  
  //  0 HP
  PP.assets.sprite.animation_add(guiSprite, "vita_0", 3, 3, 10, 0);
}

// Aggiorna il frame della vita in base agli HP attuali
function update_GUI_vita(guiSprite) {
  const currentHP = PP.game_state.get_variable("HP") || 3; // Default a 3 se non inizializzato
  
  switch(currentHP) {
    case 3:
      PP.assets.sprite.animation_play(guiSprite, "vita_3");
      break;
    case 2:
      PP.assets.sprite.animation_play(guiSprite, "vita_2");
      break;
    case 1:
      PP.assets.sprite.animation_play(guiSprite, "vita_1");
      break;
    case 0:
    default:
      PP.assets.sprite.animation_play(guiSprite, "vita_0");
      break;
  }
}
