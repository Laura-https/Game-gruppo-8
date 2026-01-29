//piattaforme scena 3

let big_plat1;
let big_plat2;
let big_plat3;
let big_plat4;
let big_plat5;
let big_plat6;
let big_plat7;
let big_plat8;

let moving_plat1;
let moving_plat2;
let moving_plat3;
let moving_plat4;

let vel_plat = 90; //-----velocità piattaforme mobili

let img_big_plat;
let img_moving_plat;

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

    big_plat2 = PP.assets.image.add(s, img_big_plat, 912, 620, 0, 0);
    PP.physics.add(s, big_plat2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat2, collision_platform);

    big_plat3 = PP.assets.image.add(s, img_big_plat, 1053, 957, 0, 0);
    PP.physics.add(s, big_plat3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat3, collision_platform);

    big_plat4 = PP.assets.image.add(s, img_big_plat, 1856, 462, 0, 0);
    PP.physics.add(s, big_plat4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat4, collision_platform);

    big_plat5 = PP.assets.image.add(s, img_big_plat, 2148, 621, 0, 0);
    PP.physics.add(s, big_plat5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat5, collision_platform);

    big_plat6 = PP.assets.image.add(s, img_big_plat, 2165, 984, 0, 0);
    PP.physics.add(s, big_plat6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat6, collision_platform);

    big_plat7 = PP.assets.image.add(s, img_big_plat, 2556, 795, 0, 0);
    PP.physics.add(s, big_plat7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat7, collision_platform);

    big_plat8 = PP.assets.image.add(s, img_big_plat, 2805, 612, 0, 0);
    PP.physics.add(s, big_plat8, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, big_plat8, collision_platform);


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
    let MIN3_Y = 389;
    let MAX3_Y = 942;

    if (moving_plat3.geometry.y >= MAX3_Y) {
        PP.physics.set_velocity_y(moving_plat3, -vel_plat);
    }
    else if (moving_plat3.geometry.y <= MIN3_Y) {
        PP.physics.set_velocity_y(moving_plat3, vel_plat);
    }
    //piattaforma mobile 2
    let MIN2_X = 434;
    let MAX2_X = 843;

    if (moving_plat2.geometry.x >= MAX2_X) {
        PP.physics.set_velocity_x(moving_plat2, -vel_plat);
    }
    else if (moving_plat2.geometry.x <= MIN2_X) {
        PP.physics.set_velocity_x(moving_plat2, vel_plat);
    }

    //piattaforma mobile 4
    let MIN4_X = 2113;
    let MAX4_X = 2712;

    if (moving_plat4.geometry.x >= MAX4_X) {
        PP.physics.set_velocity_x(moving_plat4, -vel_plat);
    }
    else if (moving_plat4.geometry.x <= MIN4_X) {
        PP.physics.set_velocity_x(moving_plat4, vel_plat);
    }


}


//---------spuntoni scena 3

let img_spikeR;
let img_spikeL;
let img_spike_up1;
let img_spike_up2;
let img_spike_down1;
let img_spike_down2;

let spikeR_1;   
let spikeR_2;
let spikeR_3;
let spikeL_1;
let spikeL_2;
let spikeL_3;
let spikeL_4;
let spikeL_5;
let spikeL_6;
let spike_up;
let spike_down1_1;
let spike_down1_2;
let spike_down1_3;
let spike_down1_4;
let spike_down2_1;
let spike_down2_2;
let spike_down2_3;
let spike_down2_4;
let spike_down2_5;


function preload_spikes_s3(s) {
    // Load dell'immagine degli spuntoni
    img_spikeR = PP.assets.image.load(s, "assets/spikes/diamanti_R.png");
    img_spikeL = PP.assets.image.load(s, "assets/spikes/diamanti_L.png");
    img_spike_up1 = PP.assets.image.load(s, "assets/spikes/diamanti_up1.png");
    img_spike_up2 = PP.assets.image.load(s, "assets/spikes/diamanti_up2.png");
    img_spike_down1 = PP.assets.image.load(s, "assets/spikes/diamanti_Down1.png");
    img_spike_down2 = PP.assets.image.load(s, "assets/spikes/diamanti_Down2.png");
}

function create_spikes_s3(s, player) {
    // Spuntoni a destra
    spikeR_1 = PP.assets.image.add(s, img_spikeR, 1384, 120, 0, 0);
    PP.physics.add(s, spikeR_1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spikeR_1, damage_player);

    spikeR_2= PP.assets.image.add(s, img_spikeR, 3304, 286, 0, 0);
    PP.physics.add(s, spikeR_2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spikeR_2, damage_player);

    spikeR_3 = PP.assets.image.add(s, img_spikeR, 3397, 548, 0, 0);
    PP.physics.add(s, spikeR_3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spikeR_3, damage_player);
    // Spuntoni a sinistra

    spikeL_1 = PP.assets.image.add(s, img_spikeL, 276, 144, 0, 0);
    PP.physics.add(s, spikeL_1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spikeL_1, damage_player);

    spikeL_3 = PP.assets.image.add(s, img_spikeL, 120, 772, 0, 0);
    PP.physics.add(s, spikeL_3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spikeL_3, damage_player);

    spikeL_4 = PP.assets.image.add(s, img_spikeL, 120, 872, 0, 0);
    PP.physics.add(s, spikeL_4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spikeL_4, damage_player);

    spikeL_5 = PP.assets.image.add(s, img_spikeL, 1825, 198, 0, 0);
    PP.physics.add(s, spikeL_5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spikeL_5, damage_player);

    spikeL_6 = PP.assets.image.add(s, img_spikeL, 1725, 590, 0, 0);
    PP.physics.add(s, spikeL_6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spikeL_6, damage_player);

    // spuntoni all'insù
    spike_up = PP.assets.image.add(s, img_spike_up1, 136, 964, 0, 0);
    PP.physics.add(s, spike_up, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spike_up, damage_player);

    // spuntoni all'ingiù
    spike_down1_1= PP.assets.image.add(s, img_spike_down1, 650, 9, 0, 0);
    PP.physics.add(s, spike_down1_1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spike_down1_1, damage_player);

     spike_down1_2 = PP.assets.image.add(s, img_spike_down1, 1546, 655, 0, 0);
    PP.physics.add(s, spike_down1_2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spike_down1_2, damage_player);

     spike_down1_3 = PP.assets.image.add(s, img_spike_down1, 1683, 770, 0, 0);
    PP.physics.add(s, spike_down1_3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spike_down1_3, damage_player);

     spike_down1_4= PP.assets.image.add(s, img_spike_down1, 2604, 440, 0, 0);
    PP.physics.add(s, spike_down1_4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spike_down1_4, damage_player);


    spike_down2_1= PP.assets.image.add(s, img_spike_down2, 491, 9, 0, 0);
    PP.physics.add(s, spike_down2_1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spike_down2_1, damage_player);

    spike_down2_2= PP.assets.image.add(s, img_spike_down2, 595, 9, 0, 0);
    PP.physics.add(s, spike_down2_2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spike_down2_2, damage_player);

    spike_down2_3= PP.assets.image.add(s, img_spike_down2, 1626, 770, 0, 0);
    PP.physics.add(s, spike_down2_3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spike_down2_3, damage_player);

    spike_down2_4= PP.assets.image.add(s, img_spike_down2, 2539, 440, 0, 0);
    PP.physics.add(s, spike_down2_4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spike_down2_4, damage_player);

    spike_down2_5= PP.assets.image.add(s, img_spike_down2, 3662, 702, 0, 0);
    PP.physics.add(s, spike_down2_5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, spike_down2_5, damage_player);
}

function damage_player(s, player, spike) {
    const isInvulnerable = PP.game_state.get_variable("INVULNERABLE") || false;
    if (!isInvulnerable) {
        const currentHP = PP.game_state.get_variable("HP") || 3;
        if (currentHP > 0) {
            PP.game_state.set_variable("HP", currentHP - 1);
            // Imposta INVULNERABLE a true
            PP.game_state.set_variable("INVULNERABLE", true);
            // Timer di 2 secondi dopo il quale INVULNERABLE torna a false
            setTimeout(() => {
                PP.game_state.set_variable("INVULNERABLE", false);
            }, 2000);

            if (PP.game_state.get_variable("HP") <= 0) {
                setTimeout(() => {
                    PP.scenes.start("game_over");
                }, 1000);

            }
        }
    }
}
