function preload(s) {

}

function increase_coins() {
  PP.game_state.set_variable("coins", PP.game_state.get_variable("coins") + 1);
}

function create(s) {

    PP.game_state.set_variable("coins", 0);
    PP.game_state.set_variable("HP", 3);
    
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
                "Press Spacebar to Begin",
                50,
                "PNAlphabetSoup",
                "normal",
                "0xFFFFFF",
                null,
                0.5,
                0.5);

  let incr_coins_txt = PP.shapes.text_add(s, 50, 50, "Increase coins","PNAlphabetSoup","normal",
                "0xFFFFFF",
                null,
                0.5,
                0.5);
  PP.interactive.mouse.add(incr_coins_txt, "pointerdown", increase_coins);
}

function update(s) {
  if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
    PP.scenes.start("scene1");
  }
  
  if(PP.interactive.kb.is_key_down(s, PP.key_codes.A)) {
    let i = PP.game_state.get_variable("coins");
    PP.game_state.set_variable("coins", i + 1);

  }

}

function destroy(s) {

}

PP.scenes.add("main_menu", preload, create, update, destroy);