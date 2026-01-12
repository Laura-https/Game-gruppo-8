let img_mushroom_1;
let img_mushroom_2;

function preload_mushrooms(s) {
    // Load delle immagini del funghetto
    img_mushroom_1   = PP.assets.image.load(s, "assets/mushroom_1.png");
    img_mushroom_2   = PP.assets.image.load(s, "assets/mushroom_2.png");
}

function collision_mushroom(s, player, mushroom) {
    // In caso di collisione procedo come segue:

    // 1) distruggo il funghetto
    PP.assets.destroy(mushroom);

    // 2) aumento di 10 lo score
    let prev_score = PP.game_state.get_variable("score");
    PP.game_state.set_variable("score", prev_score+10);
}

function create_mushrooms(s, player) {

    // Creazione di 10 funghetti
    for (let i=0; i<10; i++) {

        let mush_img;
        // Scelgo casualmnte (con una probabilita' del 50%)
        // quale immagine del funghetto utilizzare
        if(Math.random() < 0.5) {
            mush_img = img_mushroom_1;
        } else {
            mush_img = img_mushroom_2;
        }
        
        // Ora creo il singolo funghetto, lo aggiungo alla fisica e imposto la funzione
        // di collisione
        let mushroom = PP.assets.image.add(s, mush_img, 300+200*i, 700, 0, 0);
        PP.physics.add(s, mushroom, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, mushroom, collision_mushroom);
    }


}

function update_mushrooms(s) {
    // Nothing to do...
}
