//piattaforme scena 3

let plat_right1;
let plat_right2;
let plat_right3;
let plat_right4;
let plat_right5;
let plat_right6;
let plat_right7;
let plat_right8;
let plat_right9;
let plat_right10;
let plat_right11;


let plat_left1;
let plat_left2;
let plat_left3;
let plat_left4;
let plat_left5;
let plat_left6;
let plat_left7;
let plat_left8;
let plat_left9;
let plat_left10;
let plat_left11;
let plat_left12;
let plat_left13;




function preload_platforms_s1(s) {
    // Load dell'immagine della piattaforma 
    img_right = PP.assets.image.load(s, "assets/platforms/ramo_right.png");
    img_left = PP.assets.image.load(s, "assets/platforms/ramo_left.png");
}

function collision_platform(s, player, platform) {

    if (player.geometry.x >= platform.geometry.x &&
        player.geometry.x <= platform.geometry.x + platform.geometry.display_width) {
        player.is_on_platform = true;
        jumpCount = 0;
    }
}



function create_platforms_s1(s, player) {

    // Piattaforme verso destra
    plat_right1 = PP.assets.image.add(s, img_right, 2395, 1729, 0, 0);
    PP.physics.add(s, plat_right1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right1, collision_platform);
    add_enemy_collider_to_platform(s, plat_right1);

    plat_right2 = PP.assets.image.add(s, img_right, 4151, 1912, 0, 0);
    PP.physics.add(s, plat_right2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right2, collision_platform);
    add_enemy_collider_to_platform(s, plat_right2);

    plat_right3 = PP.assets.image.add(s, img_right, 4768, 1625, 0, 0);
    PP.physics.add(s, plat_right3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right3, collision_platform);
    add_enemy_collider_to_platform(s, plat_right3);

    plat_right4 = PP.assets.image.add(s, img_right, 6592, 1691, 0, 0);
    PP.physics.add(s, plat_right4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right4, collision_platform);
    add_enemy_collider_to_platform(s, plat_right4);

    plat_right5 = PP.assets.image.add(s, img_right, 6973, 1541, 0, 0);
    PP.physics.add(s, plat_right5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right5, collision_platform);
    add_enemy_collider_to_platform(s, plat_right5);

    plat_right6 = PP.assets.image.add(s, img_right, 6995, 1056, 0, 0);
    PP.physics.add(s, plat_right6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right6, collision_platform);
    add_enemy_collider_to_platform(s, plat_right6);

    plat_right7 = PP.assets.image.add(s, img_right, 7493, 478, 0, 0);
    PP.physics.add(s, plat_right7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right7, collision_platform);
    add_enemy_collider_to_platform(s, plat_right7);

    plat_right8 = PP.assets.image.add(s, img_right, 7489, 1267, 0, 0);
    PP.physics.add(s, plat_right8, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right8, collision_platform);
    add_enemy_collider_to_platform(s, plat_right8);

    plat_right9 = PP.assets.image.add(s, img_right, 7996, 1606, 0, 0);
    PP.physics.add(s, plat_right9, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right9, collision_platform);
    add_enemy_collider_to_platform(s, plat_right9);

    plat_right10 = PP.assets.image.add(s, img_right, 8637, 543, 0, 0);
    PP.physics.add(s, plat_right10, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right10, collision_platform);
    add_enemy_collider_to_platform(s, plat_right10);

    plat_right11 = PP.assets.image.add(s, img_right, 8629, 1493, 0, 0);
    PP.physics.add(s, plat_right11, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_right11, collision_platform);
    add_enemy_collider_to_platform(s, plat_right11);

    // Piattaforme verso sinistra

    plat_left1 = PP.assets.image.add(s, img_left, 2127, 1550, 0, 0);
    PP.physics.add(s, plat_left1, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left1, collision_platform);
    add_enemy_collider_to_platform(s, plat_left1);

    plat_left2 = PP.assets.image.add(s, img_left, 3841, 1697, 0, 0);
    PP.physics.add(s, plat_left2, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left2, collision_platform);
    add_enemy_collider_to_platform(s, plat_left2);

    plat_left3 = PP.assets.image.add(s, img_left, 4454, 1749, 0, 0);
    PP.physics.add(s, plat_left3, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left3, collision_platform);
    add_enemy_collider_to_platform(s, plat_left3);

    plat_left4 = PP.assets.image.add(s, img_left, 6304, 1428, 0, 0);
    PP.physics.add(s, plat_left4, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left4, collision_platform);
    add_enemy_collider_to_platform(s, plat_left4);

    plat_left5 = PP.assets.image.add(s, img_left, 6726, 478, 0, 0);
    PP.physics.add(s, plat_left5, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left5, collision_platform);
    add_enemy_collider_to_platform(s, plat_left5);

    plat_left6 = PP.assets.image.add(s, img_left, 6704, 875, 0, 0);
    PP.physics.add(s, plat_left6, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left6, collision_platform);
    add_enemy_collider_to_platform(s, plat_left6);

    plat_left7 = PP.assets.image.add(s, img_left, 7177, 696, 0, 0);
    PP.physics.add(s, plat_left7, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left7, collision_platform);
    add_enemy_collider_to_platform(s, plat_left7);

    plat_left8 = PP.assets.image.add(s, img_left, 7175, 1924, 0, 0);
    PP.physics.add(s, plat_left8, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left8, collision_platform);
    add_enemy_collider_to_platform(s, plat_left8);

    plat_left9 = PP.assets.image.add(s, img_left, 7700, 598, 0, 0);
    PP.physics.add(s, plat_left9, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left9, collision_platform);
    add_enemy_collider_to_platform(s, plat_left9);

    plat_left10 = PP.assets.image.add(s, img_left, 7689, 1380, 0, 0);
    PP.physics.add(s, plat_left10, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left10, collision_platform);
    add_enemy_collider_to_platform(s, plat_left10);

    plat_left11 = PP.assets.image.add(s, img_left, 7713, 1787, 0, 0);
    PP.physics.add(s, plat_left11, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left11, collision_platform);
    add_enemy_collider_to_platform(s, plat_left11);

    plat_left12 = PP.assets.image.add(s, img_left, 8319, 1829, 0, 0);
    PP.physics.add(s, plat_left12, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left12, collision_platform);
    add_enemy_collider_to_platform(s, plat_left12);

    plat_left13 = PP.assets.image.add(s, img_left, 8308, 663, 0, 0);
    PP.physics.add(s, plat_left13, PP.physics.type.STATIC);
    PP.physics.add_collider_f(s, player, plat_left13, collision_platform);
    add_enemy_collider_to_platform(s, plat_left13);

}

// Funzione helper per aggiungere collisione nemici alle piattaforme
function add_enemy_collider_to_platform(s, platform) {
    if (typeof enemies_list !== 'undefined') {
        enemies_list.forEach(enemy => {
            if (enemy) {
                PP.physics.add_collider(s, enemy, platform);
            }
        });
    }
}

function update_platforms_s2(s) { }