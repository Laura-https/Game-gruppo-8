/*const BTN_HOME_W = 119; // Esempio: larghezza di un frame
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
*/
const BTN_HOME_W = 74;
const BTN_HOME_H = 67;
const BTN_RESTART_W = 65;
const BTN_RESTART_H = 63;

// Assets (Risorse)
let img_gameover_bg;
let ss_btn_home;
let ss_btn_restart;

// Objects (Oggetti)
let background_sprite;
let btn_home;
let btn_restart;

function preload(s) {
    // Caricamento dello sfondo (加载背景)
    img_gameover_bg = PP.assets.image.load(s, "assets/tavole/game_over.png"); 
    
    // Caricamento degli SpriteSheet (加载 SpriteSheet)
    ss_btn_home = PP.assets.sprite.load_spritesheet(
        s, "assets/icone/home_icona.png", 74, 67); 

    ss_btn_restart = PP.assets.sprite.load_spritesheet(
        s, "assets/icone/iconaagain.png", 65, 63);
}

function create(s) {
    background_sprite = PP.assets.image.add(s, img_gameover_bg, 0, 0, 0, 0);

    // --- BOTTONE HOME ---
    btn_home = PP.assets.sprite.add(s, ss_btn_home, 70, 65, 0.5, 0.5);
    // Imposta il frame iniziale (设置初始帧)
    btn_home.ph_obj.setFrame(0);

    // Evento: Mouse sopra (鼠标移入)
    PP.interactive.mouse.add(btn_home, "pointerover", () => {
        btn_home.ph_obj.setFrame(1);
    });
    
    // Evento: Mouse esce (鼠标移出)
    PP.interactive.mouse.add(btn_home, "pointerout", () => {
        btn_home.ph_obj.setFrame(0);
    });
    
    // Evento: Click (点击 - Torna al menu)
    PP.interactive.mouse.add(btn_home, "pointerdown", () => PP.scenes.start("main_menu"));


    // --- BOTTONE RESTART ---
    btn_restart = PP.assets.sprite.add(s, ss_btn_restart, 170, 65, 0.5, 0.5);
    btn_restart.ph_obj.setFrame(0);

    // Evento: Mouse sopra
    PP.interactive.mouse.add(btn_restart, "pointerover", () => {
        btn_restart.ph_obj.setFrame(1);
    });
    
    // Evento: Mouse esce
    PP.interactive.mouse.add(btn_restart, "pointerout", () => {
        btn_restart.ph_obj.setFrame(0);
    });
    
    // Evento: Click (Ricomincia il livello)
    PP.interactive.mouse.add(btn_restart, "pointerdown", () => {
        console.log("Restart clicked!");
        PP.scenes.start("scene1");
    });

    // --- RESET VARIABILI (重置变量) ---
    PP.game_state.set_variable("HP", 3);
    PP.game_state.set_variable("DEAD", false);
    PP.game_state.set_variable("INVULNERABLE", false);
    PP.game_state.set_variable("fiala", 0);
}

function update(s) {
}

function destroy(s) {
}

PP.scenes.add("game_over", preload, create, update, destroy);