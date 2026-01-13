//piattaforme scena 3

let plat_lili1;
let plat_lili2;

let moving_lili1;
let moving_lili2;
let moving_lili3;
let vel_lili=80; // variabile che gestisce la velocità di tutte le piattaforme mobili


function preload_platforms_s2(s) {
    // Load dell'immagine della piattaforma 
    img_lili    = PP.assets.image.load(s, "assets/platforms/lilipad_2.png");
    
}

function collision_platform(s, player, platform) {
   
   if( player.geometry.x >= platform.geometry.x &&
        player.geometry.x <= platform.geometry.x + platform.geometry.display_width) {
            player.is_on_platform = true;
           jumpCount = -1; //------mettere -1 se no non salta due volte
       } 
}



function create_platforms_s2(s, player) {

    // Piattaforma fissa
   plat_lili1 = PP.assets.image.add(s, img_lili, 3290, 727, 0, 0);
   PP.physics.add(s, plat_lili1, PP.physics.type.STATIC); 
   PP.physics.add_collider_f(s, player, plat_lili1, collision_platform);

   plat_lili2 = PP.assets.image.add(s, img_lili, 3805, 727, 0, 0);
   PP.physics.add(s, plat_lili2, PP.physics.type.STATIC); 
   PP.physics.add_collider_f(s, player, plat_lili2, collision_platform);

    // Piattaforma mobile
    moving_lili1 = PP.assets.image.add(s, img_lili, 511, 885, 0, 0);
    PP.physics.add(s, moving_lili1, PP.physics.type.DYNAMIC); 
    PP.physics.set_immovable(moving_lili1, true);
    PP.physics.set_allow_gravity(moving_lili1, false);    
    PP.physics.add_collider_f(s, player, moving_lili1, collision_platform);
    PP.physics.set_velocity_x(moving_lili1, vel_lili);

     moving_lili2 = PP.assets.image.add(s, img_lili, 1892, 762, 0, 0);
    PP.physics.add(s, moving_lili2, PP.physics.type.DYNAMIC); 
    PP.physics.set_immovable(moving_lili2, true);
    PP.physics.set_allow_gravity(moving_lili2, false);    
    PP.physics.add_collider_f(s, player, moving_lili2, collision_platform);
    PP.physics.set_velocity_x(moving_lili2, vel_lili);

     moving_lili3 = PP.assets.image.add(s, img_lili, 2095, 762, 0, 0);
    PP.physics.add(s, moving_lili3, PP.physics.type.DYNAMIC); 
    PP.physics.set_immovable(moving_lili3, true);
    PP.physics.set_allow_gravity(moving_lili3, false);    
    PP.physics.add_collider_f(s, player, moving_lili3, collision_platform);
    PP.physics.set_velocity_x(moving_lili3, vel_lili);


    

}

function update_platforms_s2(s) {   //piattaforme mobili
 //lili 1
    let MIN1_X = 511;
    let MAX1_X = 1000;

    if(moving_lili1.geometry.x >= MAX1_X) {
        PP.physics.set_velocity_x(moving_lili1, -vel_lili);
    }
    else if(moving_lili1.geometry.x <= MIN1_X) {
        PP.physics.set_velocity_x(moving_lili1, vel_lili);
    }
//lili 2
    let MIN2_X = 1568;
    let MAX2_X = 1892;

    if(moving_lili2.geometry.x >= MAX2_X) {
        PP.physics.set_velocity_x(moving_lili2, -vel_lili);
    }
    else if(moving_lili2.geometry.x <= MIN2_X) {
        PP.physics.set_velocity_x(moving_lili2, vel_lili);
    }
//lili 3
    let MIN3_X = 2095;
    let MAX3_X = 2437;

    if(moving_lili3.geometry.x >= MAX3_X) {
        PP.physics.set_velocity_x(moving_lili3, -vel_lili);
    }
    else if(moving_lili3.geometry.x <= MIN3_X) {
        PP.physics.set_velocity_x(moving_lili3, vel_lili);
    }

}