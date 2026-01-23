//piattaforme scena 3

let big_plat1;
let big_plat2;
let big_plat3;
let big_plat4;
let big_plat5;

let moving_plat1;
let moving_plat2;
let moving_plat3;
let moving_plat4;

let vel_plat = 90; //-----velocità piattaforme mobili


function preload_platforms_s3(s) {
    // Load dell'immagine della piattaforma

    img_big_plat = PP.assets.image.load(s, "assets/platforms/big_plat_3.png");
    img_moving_plat = PP.assets.image.load(s, "assets/platforms/moving_plat_3.png");
}

function collision_platform(s, player, platform) {

    if (player.geometry.x >= platform.geometry.x &&
        player.geometry.x <= platform.geometry.x + platform.geometry.display_width) {
        player.is_on_platform = true;
        jumpCount = 0;
    }
}



function create_platforms_s3(s, player) {

    // Piattaforma fissa
    big_plat1 = PP.assets.image.add(s, img_big_plat, 975, 235, 0, 0);
    PP.physics.add(s, big_plat1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat1, collision_platform);

    big_plat2 = PP.assets.image.add(s, img_big_plat, 920, 780, 0, 0);
    PP.physics.add(s, big_plat2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat2, collision_platform);

    big_plat3 = PP.assets.image.add(s, img_big_plat, 2224, 780, 0, 0);
    PP.physics.add(s, big_plat3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat3, collision_platform);

    big_plat4 = PP.assets.image.add(s, img_big_plat, 1825, 540, 0, 0);
    PP.physics.add(s, big_plat4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat4, collision_platform);

    big_plat5 = PP.assets.image.add(s, img_big_plat, 2800, 960, 0, 0);
    PP.physics.add(s, big_plat5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat5, collision_platform);


    // Piattaforme mobili verticali
    moving_plat1 = PP.assets.image.add(s, img_moving_plat, 630, 413, 0, 0);
    PP.physics.add(s, moving_plat1, PP.physics.type.DYNAMIC);
    PP.physics.set_immovable(moving_plat1, true);
    PP.physics.set_allow_gravity(moving_plat1, false);
    PP.physics.add_collider_f(s, player, moving_plat1, collision_platform);
    PP.physics.set_velocity_y(moving_plat1, vel_plat);

    moving_plat3 = PP.assets.image.add(s, img_moving_plat, 3059, 354, 0, 0);
    PP.physics.add(s, moving_plat3, PP.physics.type.DYNAMIC);
    PP.physics.set_immovable(moving_plat3, true);
    PP.physics.set_allow_gravity(moving_plat3, false);
    PP.physics.add_collider_f(s, player, moving_plat3, collision_platform);
    PP.physics.set_velocity_y(moving_plat3, vel_plat);

    // Piattaforme mobili orizzontali
    moving_plat2 = PP.assets.image.add(s, img_moving_plat, 100, 1246, 0, 0);
    PP.physics.add(s, moving_plat2, PP.physics.type.DYNAMIC);
    PP.physics.set_immovable(moving_plat2, true);
    PP.physics.set_allow_gravity(moving_plat2, false);
    PP.physics.add_collider_f(s, player, moving_plat2, collision_platform);
    PP.physics.set_velocity_x(moving_plat2, vel_plat);

    moving_plat4 = PP.assets.image.add(s, img_moving_plat, 2033, 1246, 0, 0);
    PP.physics.add(s, moving_plat4, PP.physics.type.DYNAMIC);
    PP.physics.set_immovable(moving_plat4, true);
    PP.physics.set_allow_gravity(moving_plat4, false);
    PP.physics.add_collider_f(s, player, moving_plat4, collision_platform);
    PP.physics.set_velocity_x(moving_plat4, vel_plat);



}

function update_platforms_s3(s) {   
    //piattaforma mobile 1
    let MIN1_Y = 413;
    let MAX1_Y = 975;

    if (moving_plat1.geometry.y >= MAX1_Y) {
        PP.physics.set_velocity_y(moving_plat1, -vel_plat);
    }
    else if (moving_plat1.geometry.y <= MIN1_Y) {
        PP.physics.set_velocity_y(moving_plat1, vel_plat);
    }
    //piattaforma mobile 3
    let MIN3_Y = 354;
    let MAX3_Y = 960;

    if (moving_plat3.geometry.y >= MAX3_Y) {
        PP.physics.set_velocity_y(moving_plat3, -vel_plat);
    }
    else if (moving_plat3.geometry.y <= MIN3_Y) {
        PP.physics.set_velocity_y(moving_plat3, vel_plat);
    }
    //piattaforma mobile 2
    let MIN2_X = 100;
    let MAX2_X = 913;

    if (moving_plat2.geometry.x >= MAX2_X) {
        PP.physics.set_velocity_x(moving_plat2, -vel_plat);
    }
    else if (moving_plat2.geometry.x <= MIN2_X) {
        PP.physics.set_velocity_x(moving_plat2, vel_plat);
    }

    //piattaforma mobile 4
    let MIN4_X = 2033;
    let MAX4_X = 2793;

    if (moving_plat4.geometry.x >= MAX4_X) {
        PP.physics.set_velocity_x(moving_plat4, -vel_plat);
    }
    else if (moving_plat4.geometry.x <= MIN4_X) {
        PP.physics.set_velocity_x(moving_plat4, vel_plat);
    }


}
