//piattaforme scena 3

let big_plat1;
let moving_plat1;


function preload_platforms_s3(s) {
    // Load dell'immagine della piattaforma
    
    img_big_plat    = PP.assets.image.load(s, "assets/platforms/big_plat_3.png");
    img_moving_plat = PP.assets.image.load(s, "assets/platforms/moving_plat_3.png");
}

function collision_platform(s, player, platform) {
   
   if( player.geometry.x >= platform.geometry.x &&
        player.geometry.x <= platform.geometry.x + platform.geometry.display_width) {
            player.is_on_platform = true;
           jumpCount = -1; //------mettere -1 se no non salta due volte
       } 
}



function create_platforms_s3(s, player) {

    // Piattaforma fissa
    big_plat1 = PP.assets.image.add(s, img_big_plat, 1156, 517, 0, 0);
    PP.physics.add(s, big_plat1, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, big_plat1, collision_platform);

    // Piattaforma mobile
    moving_plat1 = PP.assets.image.add(s, img_moving_plat, 630, 413, 0, 0);
    PP.physics.add(s, moving_plat1, PP.physics.type.DYNAMIC); 
    PP.physics.set_immovable(moving_plat1, true);
    PP.physics.set_allow_gravity(moving_plat1, false);    
    PP.physics.add_collider_f(s, player, moving_plat1, collision_platform);
    PP.physics.set_velocity_y(moving_plat1, 100);

    

}

function update_platforms_s3(s) {   //piattaforme mobili

    let MIN1_Y = 413;
    let MAX1_Y = 975;

    if(moving_plat1.geometry.y >= MAX1_Y) {
        PP.physics.set_velocity_y(moving_plat1, -100);
    }
    else if(moving_plat1.geometry.y <= MIN1_Y) {
        PP.physics.set_velocity_y(moving_plat1, 100);
    }


}
