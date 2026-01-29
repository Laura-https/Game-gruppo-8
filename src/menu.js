const CANVAS_W = 1280;
const CANVAS_H = 720;

let tavola_menu;
function preload(s) {
  tavola_menu = PP.assets.image.load(s, "assets/tavole/schermata_inizio.png");

}


function create(s) {
PP.assets.image.add(s, tavola_menu, 0, 0, 0, 0);
    //------variabili globali per il game state qui-----
    PP.game_state.set_variable("HP", 3);
    PP.game_state.set_variable("INVULNERABLE", false);
    PP.game_state.set_variable("fiala", 0);
    PP.game_state.set_variable("DEAD", false);

    PP.game_state.set_variable("pulita_s1", false);
    PP.game_state.set_variable("pulita_s2", false);
    PP.game_state.set_variable("pulita_s3", false);
    
    // Questa scena di game over contiene solamente
    // il testo centrato.

    PP.shapes.text_styled_add(s, 
                PP.game.config.canvas_width / 2,
                PP.game.config.canvas_height / 2,
                "Main Menu",
                100,
                "PNAlphabetSoup",
                "normal",
                "0xFFFFFF",
                null,
                0.5,
                0.5);

  PP.shapes.text_styled_add(s, 
                PP.game.config.canvas_width / 2,
                PP.game.config.canvas_height / 5 * 4,
                "Premi spazio per iniziare o C per i crediti ",
                50,
                "PNAlphabetSoup",
                "normal",
                "0xFFFFFF",
                null,
                0.5,
                0.5);

  
}

function update(s) {
  if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
    PP.scenes.start("scene1");
  }

}

function destroy(s) {

}

PP.scenes.add("main_menu", preload, create, update, destroy);