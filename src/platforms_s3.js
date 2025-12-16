//piattaforme scena 3
let small_plat;
let big_plat;
let moving_plat;

function preload_platforms_s3(s) {
    // Load dell'immagine della piattaforma
    small_plat  = PP.assets.image.load(s, "assets/platforms/small_plat_3.png");
    big_plat    = PP.assets.image.load(s, "assets/platforms/big_plat_3.png");
    moving_plat = PP.assets.image.load(s, "assets/platforms/moving_plat_3.png");
}

function collision_platform_s3(s, player, platform) {
    // Funzione di collisione con le piattaforme.
    // Qui devo verificare che il giocatore si trovi sopra
    // la piattaforma e in quel caso aggiorno la variabile che
    // abilita il salto (v. player.js)
    if( player.geometry.x >= platform.geometry.x &&
        player.geometry.x <= platform.geometry.x + platform.geometry.display_width) {
            player.is_on_platform = true;
            // Quando la rana è sulla piattaforma resettiamo il contatore dei salti
            // così può saltare di nuovo come succede con le piattaforme fisse
            jumpCount = 0;
    }
}

function create_platforms_s3(s, player) {

    // Piattaforma fissa
    let platform = PP.assets.image.add(s, small_plat, 1156, 517, 0, 0);
    PP.physics.add(s, platform, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform, collision_platform_s3);

    // Piattaforma mobile
    moving_plat = PP.assets.image.add(s, moving_plat, 630, 413, 0, 0);
    PP.physics.add(s, moving_plat, PP.physics.type.DYNAMIC); 
    PP.physics.set_immovable(moving_plat, true);
    PP.physics.set_allow_gravity(moving_plat, false);    
    PP.physics.add_collider_f(s, player, moving_plat, collision_platform_s3);
    PP.physics.set_velocity_y(moving_plat, 100);

    // Riduco i collision boundaries in modo che
    // l'erba non causi un "innalzamento" del giocatore
    //PP.physics.set_collision_rectangle(platform, 400, 68, 0, 21);

}

function update_platforms_s3(s) {

    // Aggiorno la velocita' della piattaforma mobile nel
    // caso in cui si trovi al limite superiore o al limite inferiore
    // scelto (es. 400 - 650)

    const MIN_Y = 413;
    const MAX_Y = 975;

    if(moving_plat.geometry.y >= MAX_Y) {
        PP.physics.set_velocity_y(moving_plat, -100);
    }
    else if(moving_plat.geometry.y <= MIN_Y) {
        PP.physics.set_velocity_y(moving_plat, 100);
    }


}
