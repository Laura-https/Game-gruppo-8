function preload(s) {

}

function create(s) {

    // Questa scena di game over contiene solamente
    // il testo centrato.

    PP.shapes.text_styled_add(s, 
                PP.game.config.canvas_width / 2,
                PP.game.config.canvas_height / 2,
                "Game Over",
                100,
                "PNAlphabetSoup",
                "normal",
                "0xFFFFFF",
                null,
                0.5,
                0.5);

    // 彻底重置全局状态，避免下次进入卡住
    PP.game_state.set_variable("HP", 3);
    PP.game_state.set_variable("DEAD", false);
    PP.game_state.set_variable("INVULNERABLE", false);

}

function update(s) {

}

function destroy(s) {

}

PP.scenes.add("game_over", preload, create, update, destroy);