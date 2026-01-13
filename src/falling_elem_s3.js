//elementi che cadono della scena 3
// NEMICI—-----------


let img_monnezza;
let monnezza;
let HP=3;


let vulnerable = true;


function preload_monnezza(s) {
    // Carico l'immagine come spritesheets
    img_monnezza =PP.assets.image.load(s, "assets/monnezza.png");
}


//questa roba serve a prendere danno
function set_vulnerable() {
    vulnerable = true;
}
function take_damage(s, p1, p2) {
    if (vulnerable){
        vulnerable = false;
        PP.game_state.set_variable("HP", PP.game_state.get_variable("HP") - 1);
        if (PP.game_state.get_variable("HP") <= 0) {
            PP.scenes.start("game_over");
        }
        PP.timers.add_timer(s,2000, set_vulnerable,false); //timer --non prendi danno per mezzo secondo
    }
}


function create_monnezza(s, floor, player) {
    monnezza = PP.assets.sprite.add(s, img_monnezza, 800, 500, 0.5, 1);
    PP.physics.add(s, monnezza, PP.physics.type.DYNAMIC);
    PP.physics.add_collider(s, monnezza, floor);


    PP.physics.add_overlap_f(s, monnezza, player, take_damage);

    // Velocità iniziale del nemico (verso dx)
    PP.physics.set_velocity_y(monnezza, 100);
    // Aggiungo le animazioni walk dx/sx
    //PP.assets.sprite.animation_add(enemy, "walk_left", 0, 3, 10, -1);
   // PP.assets.sprite.animation_add(enemy, "walk_right", 12, 15, 10, -1);


    // Iniziamo andando a destra
    //PP.assets.sprite.animation_play(enemy, "walk_right");


}


function update_enemy(s) {
    if(enemy.geometry.x >= 1000) {
        // Hit right boundary
        PP.physics.set_velocity_x(enemy, -100);
        PP.assets.sprite.animation_play(enemy, "walk_left");
    }
    else if (enemy.geometry.x <= 600) {
        // Hit left boundary
        PP.physics.set_velocity_x(enemy, 100);
        PP.assets.sprite.animation_play(enemy, "walk_right");
    }
}




function preload_mushrooms(s) {
    // Load delle immagini del funghetto
    img_mushroom_1   = PP.assets.image.load(s, "assets/images/mushroom_1.png");
    img_mushroom_2   = PP.assets.image.load(s, "assets/images/mushroom_2.png");
}











function collision_mushroom(s, player, mushroom) {
    // In caso di collisione distruggo il funghetto
    let i = PP.game_state.get_variable("mushrooms");
    PP.game_state.set_variable("mushrooms", i + 1);


    mushroom_x = mushroom.geometry.x;
    mushroom_y = mushroom.geometry.y;
    p = player;


    PP.assets.destroy(mushroom);
    console.log(PP.game_state.get_variable("mushrooms"));
    PP.timers.add_timer(s, 500, create_mushroom, false);
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
        let mushroom = PP.assets.image.add(s, mush_img, 300+200*i, 580, 0, 0);
        PP.physics.add(s, mushroom, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, mushroom, collision_mushroom);
    }




}


function update_mushrooms(s) {
    // Nothing to do...
}


//funghetti
let img_mushroom_1;
let img_mushroom_2;


function preload_mushrooms(s) {
    // Load delle immagini del funghetto
    img_mushroom_1   = PP.assets.image.load(s, "assets/images/mushroom_1.png");
    img_mushroom_2   = PP.assets.image.load(s, "assets/images/mushroom_2.png");
}


let mushroom_x;
let mushroom_y;


let p;


function create_mushroom(s) {
    let mush_img;
    // Scelgo casualmnte (con una probabilita' del 50%)
    // quale immagine del funghetto utilizzare
    if(Math.random() < 0.5) {
        mush_img = img_mushroom_1;
    } else {
        mush_img = img_mushroom_2;
    }
    let mushroom = PP.assets.image.add(s, mush_img, mushroom_x, mushroom_y, 0, 0);
    PP.physics.add(s, mushroom, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(s, p, mushroom, collision_mushroom);
}


function collision_mushroom(s, player, mushroom) {
    // In caso di collisione distruggo il funghetto
    let i = PP.game_state.get_variable("mushrooms");
    PP.game_state.set_variable("mushrooms", i + 1);


    mushroom_x = mushroom.geometry.x;
    mushroom_y = mushroom.geometry.y;
    p = player;


    PP.assets.destroy(mushroom);
    console.log(PP.game_state.get_variable("mushrooms"));
    PP.timers.add_timer(s, 500, create_mushroom, false);
}




