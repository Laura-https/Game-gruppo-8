let img_enemy;
let enemy_player;
let enemies_list = []; 

const ENEMY_W = 120;
const ENEMY_H = 180;
const HEAD_W = 80; 
const HEAD_H = 20;

function preload_enemy(s) {
  img_enemy = PP.assets.sprite.load_spritesheet(s, "assets/camminata_enemy.png", ENEMY_W, ENEMY_H);
}

function create_single_enemy(s, floor, player, posX, posY, minX, maxX) {
  // Con pivot (0.5, 1)
  let e = PP.assets.sprite.add(s, img_enemy, posX, posY, 0.5, 1);
  PP.physics.add(s, e, PP.physics.type.DYNAMIC);
  PP.physics.add_collider(s, e, floor);
  
  e.minX = minX;
  e.maxX = maxX;
  e.head = null; 
  
  
  PP.assets.sprite.animation_add_list(e, "walk", [0, 1, 2, 3, 4, 5, 6], 10, -1);
  PP.assets.sprite.animation_play(e, "walk");
  PP.physics.set_velocity_x(e, 100);
  //PP.physics.set_velocity_y(e, 0);

  PP.physics.add_overlap_f(s, e, player, (s, eBody, pBody) => {
    if (typeof player_take_damage === 'function') {
        player_take_damage(s, pBody, 1);
    }
  });

  enemies_list.push(e);
}

function create_enemy(s, floor, player) {
  enemy_player = player;
  enemies_list = []; 

  // --- Aggiungi qui i tuoi boscaioli ---
  // create_single_enemy(scena, pavimento, player, X_iniziale, Y_piedi, limite_SX, limite_DX)
create_single_enemy(s, floor, player, 1392, 2193, 1392, 1580); 
//create_single_enemy(s, floor, player, 2185, 1993, 2185, 2419);  secondo tut che possiamo togliere
create_single_enemy(s, floor, player, 5400, 1850, 5080, 5500); 
create_single_enemy(s, floor, player, 6464, 2090, 6464, 6815); 
create_single_enemy(s, floor, player, 7022, 2261, 7020, 7306); 
//create_single_enemy(s, floor, player, 7829, 2175, 7800, 7990); 

}

function update_enemy(s) {
  enemies_list.forEach((e, index) => {
    if (!e || !e.ph_obj) return;

    // Calcolo posizione TESTA
    const headX = e.geometry.x;
    const headY = e.geometry.y - ENEMY_H; 

    if (!e.head) {
      // Usiamo STATIC per la testa per evitare conflitti di velocità, 
      // la muoveremo manualmente in modo compatibile
      e.head = PP.shapes.rectangle_add(s, headX, headY, HEAD_W, HEAD_H, "0x0000ff", 0); 
      PP.physics.add(s, e.head, PP.physics.type.STATIC);
      
      PP.physics.add_overlap_f(s, enemy_player, e.head, (s, p, h) => {
        if (PP.game_state.get_variable("DEAD")) return;
        
        PP.physics.set_velocity_y(p, -450); // Rimbalzo
        PP.assets.destroy(e.head);
        PP.assets.destroy(e);
        enemies_list[index] = null;
        console.log("Boscaiolo eliminato!");
      });
    } else {
      // SOLUZIONE ERRORE: Muoviamo la geometria e aggiorniamo il corpo fisico separatamente
      e.head.geometry.x = headX;
      e.head.geometry.y = headY;
      
      // Questo comando aggiorna la posizione della hitbox fisica in PoliPhaser/Phaser
      if(e.head.ph_obj && e.head.ph_obj.body) {
          e.head.ph_obj.body.x = headX - (HEAD_W / 2);
          e.head.ph_obj.body.y = headY - (HEAD_H / 2);
      }
    }

    // Movimento Patrol con clamp per evitare che escano dai limiti
    if (e.geometry.x >= e.maxX) {
      e.geometry.x = e.maxX; // Forza la posizione dentro il limite
      PP.physics.set_velocity_x(e, -100);
      e.geometry.flip_x = true;
    } else if (e.geometry.x <= e.minX) {
      e.geometry.x = e.minX; // Forza la posizione dentro il limite
      PP.physics.set_velocity_x(e, 100);
      e.geometry.flip_x = false;
    }
  });
  
  enemies_list = enemies_list.filter(e => e !== null);
}


