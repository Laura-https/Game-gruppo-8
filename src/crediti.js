const CANVAS_W = 1280;
const CANVAS_H = 720;
let tavola_crediti;

function preload(s) {
  tavola_crediti = PP.assets.image.load(s, "assets/tavole/crediti.png");
}

function create(s) {
PP.assets.image.add(s, tavola_crediti, 0, 0, 0, 0);
}

function update(s) {
  if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
    PP.scenes.start("menu");
  }
   }



function destroy(s) {

}

PP.scenes.add("crediti", preload, create, update, destroy);