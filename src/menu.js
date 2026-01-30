const CANVAS_W = 1280;
const CANVAS_H = 720;

const BTN_GIOCA_W = 70;
const BTN_GIOCA_H = 64;
const BTN_CREDITI_W = 74;
const BTN_CREDITI_H = 67;
const BTN_STORIA_W = 68;
const BTN_STORIA_H = 65;

let tavola_menu;
let ss_btn_gioca;
let ss_btn_crediti;
let ss_btn_storia;

function preload(s) {
  tavola_menu = PP.assets.image.load(s, "assets/tavole/schermata_inizio.png");
  
  // Caricamento degli SpriteSheet per i bottoni
  ss_btn_gioca = PP.assets.sprite.load_spritesheet(
      s, "assets/icone/gioca.png", BTN_GIOCA_W, BTN_GIOCA_H);
  
  ss_btn_crediti = PP.assets.sprite.load_spritesheet(
      s, "assets/icone/crediti.png", BTN_CREDITI_W, BTN_CREDITI_H);
  
  ss_btn_storia = PP.assets.sprite.load_spritesheet(
      s, "assets/icone/storia.png", BTN_STORIA_W, BTN_STORIA_H);
}


function create(s) {
PP.assets.image.add(s, tavola_menu, 0, 0, 0, 0);
    
    // --- BOTTONE GIOCA ---
    let btn_gioca = PP.assets.sprite.add(s, ss_btn_gioca, 200, 400, 0.5, 0.5);
    btn_gioca.ph_obj.setFrame(0);
    
    PP.interactive.mouse.add(btn_gioca, "pointerover", () => {
        btn_gioca.ph_obj.setFrame(1);
    });
    
    PP.interactive.mouse.add(btn_gioca, "pointerout", () => {
        btn_gioca.ph_obj.setFrame(0);
    });
    
    PP.interactive.mouse.add(btn_gioca, "pointerdown", () => PP.scenes.start("scene1"));


    // --- BOTTONE CREDITI ---
    let btn_crediti = PP.assets.sprite.add(s, ss_btn_crediti, 640, 400, 0.5, 0.5);
    btn_crediti.ph_obj.setFrame(0);
    
    PP.interactive.mouse.add(btn_crediti, "pointerover", () => {
        btn_crediti.ph_obj.setFrame(1);
    });
    
    PP.interactive.mouse.add(btn_crediti, "pointerout", () => {
        btn_crediti.ph_obj.setFrame(0);
    });
    
    PP.interactive.mouse.add(btn_crediti, "pointerdown", () => PP.scenes.start("crediti"));


    // --- BOTTONE STORIA ---
    let btn_storia = PP.assets.sprite.add(s, ss_btn_storia, 1080, 400, 0.5, 0.5);
    btn_storia.ph_obj.setFrame(0);
    
    PP.interactive.mouse.add(btn_storia, "pointerover", () => {
        btn_storia.ph_obj.setFrame(1);
    });
    
    PP.interactive.mouse.add(btn_storia, "pointerout", () => {
        btn_storia.ph_obj.setFrame(0);
    });
    
    PP.interactive.mouse.add(btn_storia, "pointerdown", () => {
        PP.scenes.start("storia");
    });

    
    //------variabili globali per il game state qui-----
    PP.game_state.set_variable("HP", 3);
    PP.game_state.set_variable("INVULNERABLE", false);
    PP.game_state.set_variable("fiala", 0);
    PP.game_state.set_variable("DEAD", false);

    PP.game_state.set_variable("pulita_s1", false);
    PP.game_state.set_variable("pulita_s2", false);
    PP.game_state.set_variable("pulita_s3", false);
    PP.game_state.set_variable("tuttoPulito", false);
}

function update(s) {
  
}

function destroy(s) {

}

PP.scenes.add("main_menu", preload, create, update, destroy);