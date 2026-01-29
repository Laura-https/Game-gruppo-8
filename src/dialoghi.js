

let tutorial_tasti;
let tutorial_nemici;
let tutorial_sostanza;
let tutorial_HUD;
let tutorial_tastoR;

let tutorial_tasti_img;
let tutorial_nemici_img;
let tutorial_sostanza_img;
let tutorial_HUD_img;
let tutorial_tastoR_img;



function preload_testo_tutorial(s) {
  tutorial_tasti_img = PP.assets.image.load(s, "assets/dialoghi/tutorial_tasti.png");
  tutorial_nemici_img = PP.assets.image.load(s, "assets/dialoghi/tutorial_nemici.png");
  tutorial_sostanza_img = PP.assets.image.load(s, "assets/dialoghi/tutorial_sostanza.png");
  tutorial_HUD_img = PP.assets.image.load(s, "assets/dialoghi/tutorial_HUD.png");
  tutorial_tastoR_img = PP.assets.image.load(s, "assets/dialoghi/tutorial_tastoR.png");
}

function create_testo_tutorial(s) {
  tutorial_tasti = PP.assets.image.add(s, tutorial_tasti_img, -136, 1900, 0, 0);
  tutorial_nemici = PP.assets.image.add(s, tutorial_nemici_img, 1196, 1892, 0, 0);
  tutorial_sostanza = PP.assets.image.add(s, tutorial_sostanza_img, 1907, 1642, 0, 0);
  tutorial_HUD = PP.assets.image.add(s, tutorial_HUD_img, 450, 50, 0, 0);
  tutorial_HUD.visibility.hidden = true;  
    tutorial_HUD.tile_geometry.scroll_factor_x = 0;
    tutorial_HUD.tile_geometry.scroll_factor_y = 0;
  tutorial_tastoR = PP.assets.image.add(s, tutorial_tastoR_img, 1943, 1437, 0, 0);
  tutorial_tastoR.visibility.hidden = true;  

 }


// Nella funzione update della scena
function update_testo_tutorial(s, player) {
  const schifo_coll = PP.game_state.get_variable("schifo_tutorial_collected") === true;
  
  if (player.geometry.x > 2125 && player.geometry.x < 2387 && player.geometry.y > 1350 && player.geometry.y < 1630 && !schifo_coll) {
    tutorial_tastoR.visibility.hidden = false;
  } else {
    tutorial_tastoR.visibility.hidden = true;
  }
if (player.geometry.x > 2125 && player.geometry.x < 2387 && player.geometry.y > 1350 && player.geometry.y < 1630 && schifo_coll ){ 
    tutorial_HUD.visibility.hidden = false;  
    } else {
    tutorial_HUD.visibility.hidden = true;
  }
}
let dialogogufo;
let dialogogufo_img;

function preload_dialogogufo(s) {
    dialogogufo_img = PP.assets.image.load(s, "assets/dialoghi/dialogo_gufo.png");
}

function create_dialogogufo(s) {
  dialogogufo = PP.assets.image.add(s, dialogogufo_img, 640, 575, 0.5, 0.5);
  dialogogufo.visibility.hidden = true;  
  dialogogufo.tile_geometry.scroll_factor_x = 0;
  dialogogufo.tile_geometry.scroll_factor_y = 0;
  PP.layers.set_z_index(dialogogufo, 10);
 }
function update_dialogogufo(s, player) {
const premutoP = PP.interactive.kb.is_key_down(s, PP.key_codes.P);
const premutoENTER = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);

  // Se ENTER è premuto mentre il dialogo è visibile, chiudilo
  if (premutoENTER && !dialogogufo.visibility.hidden) {
    dialogogufo.visibility.hidden = true;
    player_can_move = true;
  }
  // Se il player è nella zona e preme P, mostra il dialogo
  else if (player.geometry.x > 5850 && player.geometry.x < 6250 && player.geometry.y > 1630 && player.geometry.y < 1880 && premutoP) {
    dialogogufo.visibility.hidden = false;
    player_can_move = false;
  }
  }