const BTN_HOME_W = 74;
const BTN_HOME_H = 67;
const BTN_RESTART_W = 65;
const BTN_RESTART_H = 63;

// Assets (Risorse)
let img_vittoria_bg;
let ss_btn_home;
let ss_btn_restart;

// Objects (Oggetti)
let background_sprite;
let btn_home;
let btn_restart;

function preload(s) {
    // Caricamento dello sfondo (加载背景)
    img_vittoria_bg = PP.assets.image.load(s, "assets/tavole/vittoria.png"); 
    
    // Caricamento degli SpriteSheet (加载 SpriteSheet)
    ss_btn_home = PP.assets.sprite.load_spritesheet(
        s, "assets/icone/home_icona.png", 74, 67); 

    ss_btn_restart = PP.assets.sprite.load_spritesheet(
        s, "assets/icone/iconaagain.png", 65, 63);
}

function create(s) {
    background_sprite = PP.assets.image.add(s, img_vittoria_bg, 0, 0, 0, 0);

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
}

function update(s) {
}

function destroy(s) {
}

PP.scenes.add("vittoria", preload, create, update, destroy);