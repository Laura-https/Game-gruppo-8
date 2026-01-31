const CANVAS_W = 1280;
const CANVAS_H = 720;

const BTN_HOME_W = 74;
const BTN_HOME_H = 67;
let ss_btn_home;
let tavola_crediti;

function preload(s) {
  ss_btn_home = PP.assets.sprite.load_spritesheet(
      s, "assets/icone/home_icona.png", BTN_HOME_W, BTN_HOME_H);
  tavola_crediti = PP.assets.image.load(s, "assets/tavole/crediti.png");
}

function create(s) {
let tavola = PP.assets.image.add(s, tavola_crediti, 630, 360, 0.5, 0.5);
  tavola.geometry.scale_x = 1.02;
  tavola.geometry.scale_y = 1.02;

  // --- BOTTONE HOME ---
  let btn_home = PP.assets.sprite.add(s, ss_btn_home, 70, 70, 0.5, 0.5);
  btn_home.ph_obj.setFrame(0);
  
  PP.interactive.mouse.add(btn_home, "pointerover", () => {
      btn_home.ph_obj.setFrame(1);
  });
  PP.interactive.mouse.add(btn_home, "pointerout", () => {
      btn_home.ph_obj.setFrame(0);
  });
  PP.interactive.mouse.add(btn_home, "pointerdown", () => PP.scenes.start("main_menu"));
}

function update(s) {
  if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
    PP.scenes.start("menu");
  }
   }



function destroy(s) {

}

PP.scenes.add("crediti", preload, create, update, destroy);