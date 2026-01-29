const BTN_HOME_W = 119; // Esempio: larghezza di un frame
const BTN_HOME_H = 100;  // Esempio: altezza di un frame

const BTN_RESTART_W = 70; // Esempio: larghezza di un frame
const BTN_RESTART_H = 86; // Esempio: altezza di un frame


// Assets
let img_gameover_bg;
let ss_btn_home;    // ss = spritesheet
let ss_btn_restart;

// Objects
let background_sprite;
let btn_home;
let btn_restart;



function preload(s) {
    img_gameover_bg = PP.assets.image.load(s, "assets/tavole/game_over.png"); 
    
    ss_btn_home = PP.assets.sprite.load_spritesheet(
        s, "assets/icone/home_icona.png", 119, 100); 

    // 方式 A (调试用): 当作普通图片加载
    ss_btn_restart = PP.assets.image.load(s, "assets/icone/iconaagain.png");
}

function create(s) {
    background_sprite = PP.assets.image.add(s, img_gameover_bg, 0, 0, 0, 0);

    // --- BOTTONE HOME ---
    btn_home = PP.assets.sprite.add(s, ss_btn_home, 140, 65, 0.5, 0.5);
    PP.assets.sprite.set_frame(btn_home, 0);
    PP.interactive.mouse.add(btn_home, "pointerover", () => PP.assets.sprite.set_frame(btn_home, 1));
    PP.interactive.mouse.add(btn_home, "pointerout", () => PP.assets.sprite.set_frame(btn_home, 0));
    PP.interactive.mouse.add(btn_home, "pointerdown", () => PP.scenes.start("home"));

    // --- BOTTONE RESTART ---
    btn_restart = PP.assets.image.add(s, ss_btn_restart, 14, 10, 0.5, 0.5);
    // 这里不用 set_frame，也不用 pointerover/out 切换帧
    PP.interactive.mouse.add(btn_restart, "pointerdown", () => {
        console.log("Restart clicked!");
        PP.scenes.start("scene1");
    });

    // --- RESET ---
    PP.game_state.set_variable("HP", 3);
    PP.game_state.set_variable("DEAD", false);
    PP.game_state.set_variable("INVULNERABLE", false);
}

function update(s) {
}

function destroy(s) {
}

PP.scenes.add("game_over", preload, create, update, destroy);