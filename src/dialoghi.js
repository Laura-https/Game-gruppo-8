

let tutorial_tasti;
let tutorial_nemici;
let tutorial_sostanza;
let tutorial_HUD;
let tutorial_tastoR;

let tutorial_tasti_img;
let tutorial_nemici_img;
let tutorial_sostanza_img;
let tutorial_HUD_img;
let tutorial_tastoR_img;



function preload_testo_tutorial(s) {
    tutorial_tasti_img = PP.assets.image.load(s, "assets/dialoghi/tutorial_tasti.png");
    tutorial_nemici_img = PP.assets.image.load(s, "assets/dialoghi/tutorial_nemici.png");
    tutorial_sostanza_img = PP.assets.image.load(s, "assets/dialoghi/tutorial_sostanza.png");
    tutorial_HUD_img = PP.assets.image.load(s, "assets/dialoghi/tutorial_HUD.png");
    tutorial_tastoR_img = PP.assets.image.load(s, "assets/dialoghi/tutorial_tastoR.png");
}

function create_testo_tutorial(s) {
    tutorial_tasti = PP.assets.image.add(s, tutorial_tasti_img, -136, 1900, 0, 0);
    tutorial_nemici = PP.assets.image.add(s, tutorial_nemici_img, 1196, 1892, 0, 0);
    tutorial_sostanza = PP.assets.image.add(s, tutorial_sostanza_img, 1907, 1642, 0, 0);
    tutorial_HUD = PP.assets.image.add(s, tutorial_HUD_img, 450, 50, 0, 0);
    tutorial_HUD.visibility.hidden = true;
    tutorial_HUD.tile_geometry.scroll_factor_x = 0;
    tutorial_HUD.tile_geometry.scroll_factor_y = 0;
    tutorial_tastoR = PP.assets.image.add(s, tutorial_tastoR_img, 1943, 1437, 0, 0);
    tutorial_tastoR.visibility.hidden = true;

}


// Nella funzione update della scena
function update_testo_tutorial(s, player) {
    const schifo_coll = PP.game_state.get_variable("schifo_tutorial_collected") === true;
    
    // Log coordinate player
    //console.log("Player X:", player.geometry.x.toFixed(2), "Player Y:", player.geometry.y.toFixed(2));

    if (player.geometry.x > 2125 && player.geometry.x < 2387 && player.geometry.y > 1350 && player.geometry.y < 1630 && !schifo_coll) {
        tutorial_tastoR.visibility.hidden = false;
    } else {
        tutorial_tastoR.visibility.hidden = true;
    }
    if (player.geometry.x > 2125 && player.geometry.x < 2387 && player.geometry.y > 1350 && player.geometry.y < 1630 && schifo_coll) {
        tutorial_HUD.visibility.hidden = false;
    } else {
        tutorial_HUD.visibility.hidden = true;
    }
}
let dialogogufo;
let dialogogufo_img;

function preload_dialogogufo(s) {
    dialogogufo_img = PP.assets.image.load(s, "assets/dialoghi/dialogo_gufo.png");
}

function create_dialogogufo(s) {
    dialogogufo = PP.assets.image.add(s, dialogogufo_img, 640, 575, 0.5, 0.5);
    dialogogufo.visibility.hidden = true;
    dialogogufo.tile_geometry.scroll_factor_x = 0;
    dialogogufo.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogogufo, 10);
}
function update_dialogogufo(s, player) {
    const premutoP = PP.interactive.kb.is_key_down(s, PP.key_codes.P);
    const premutoENTER = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);

    // Se ENTER è premuto mentre il dialogo è visibile, chiudilo
    if (premutoENTER && !dialogogufo.visibility.hidden) {
        dialogogufo.visibility.hidden = true;
        player_can_move = true;
    }
    // Se il player è nella zona e preme P, mostra il dialogo
    else if (player.geometry.x > 5850 && player.geometry.x < 6250 && player.geometry.y > 1630 && player.geometry.y < 1880 && premutoP) {
        dialogogufo.visibility.hidden = false;
        player_can_move = false;
    }
}

let dialogorana1;
let dialogorana1_img;
let dialogorana_scelta;
let dialogorana_scelta_img;
let dialogoNPC1;
let dialogoNPC1_img;
let dialogoNPC2a;
let dialogoNPC2a_img;
let dialogoNPC2b;
let dialogoNPC2b_img;

// Variabili di stato per il dialogo
let dialogo_stato1 = 0; // 0 = nessun dialogo, 1 = rana1, 2 = NPC1, 3 = scelta, 4 = risposta finale
let dialogo_NPC1_completato = false; // Traccia se il dialogo è stato già completato
let prevENTER = false; // Per rilevare il cambio di stato del tasto ENTER
let prevP = false; // Per rilevare il cambio di stato del tasto P
let prevONE = false; // Per rilevare il cambio di stato del tasto 1
let prevTWO = false; // Per rilevare il cambio di stato del tasto 2
function preload_dialoghi_NPC1(s) {
    dialogorana1_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_foresta1.png");
    dialogorana_scelta_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_foresta3.png");
    dialogoNPC1_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_foresta2.png");
    dialogoNPC2a_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_foresta4.png");
    dialogoNPC2b_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_foresta4b.png");
}

function create_dialoghi_NPC1(s) {
    dialogorana1 = PP.assets.image.add(s, dialogorana1_img, 640, 360, 0.5, 0.5);
    dialogorana1.visibility.hidden = true;
    dialogorana1.tile_geometry.scroll_factor_x = 0;
    dialogorana1.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogorana1, 10);

    dialogorana_scelta = PP.assets.image.add(s, dialogorana_scelta_img, 640, 360, 0.5, 0.5);
    dialogorana_scelta.visibility.hidden = true;
    dialogorana_scelta.tile_geometry.scroll_factor_x = 0;
    dialogorana_scelta.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogorana_scelta, 10);

    dialogoNPC1 = PP.assets.image.add(s, dialogoNPC1_img, 640, 360, 0.5, 0.5);
    dialogoNPC1.visibility.hidden = true;
    dialogoNPC1.tile_geometry.scroll_factor_x = 0;
    dialogoNPC1.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogoNPC1, 10);

    dialogoNPC2a = PP.assets.image.add(s, dialogoNPC2a_img, 640, 360, 0.5, 0.5);
    dialogoNPC2a.visibility.hidden = true;
    dialogoNPC2a.tile_geometry.scroll_factor_x = 0;
    dialogoNPC2a.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogoNPC2a, 10);

    dialogoNPC2b = PP.assets.image.add(s, dialogoNPC2b_img, 640, 360, 0.5, 0.5);
    dialogoNPC2b.visibility.hidden = true;
    dialogoNPC2b.tile_geometry.scroll_factor_x = 0;
    dialogoNPC2b.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogoNPC2b, 10);
}


function update_dialoghi_NPC1(s, player) {
    const premutoENTER = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    const premutoP = PP.interactive.kb.is_key_down(s, PP.key_codes.P);
    const sceltaA = PP.interactive.kb.is_key_down(s, PP.key_codes.ONE);
    const sceltaB = PP.interactive.kb.is_key_down(s, PP.key_codes.TWO);

    // Rileva il cambio di stato (da non premuto a premuto)
    const enterPressed = premutoENTER && !prevENTER;
    const pPressed = premutoP && !prevP;
    const onePressed = sceltaA && !prevONE;
    const twoPressed = sceltaB && !prevTWO;

    // Salva lo stato precedente dei tasti
    prevENTER = premutoENTER;
    prevP = premutoP;
    prevONE = sceltaA;
    prevTWO = sceltaB;

    c//onsole.log("Dialogo stato:", dialogo_stato, "Player X:", player.geometry.x.toFixed(2), "Y:", player.geometry.y.toFixed(2));

    // Stato 0: nessun dialogo attivo, aspetta che il player prema P nella zona
    if (dialogo_stato1 === 0 && !dialogo_NPC1_completato) {
        if (player.geometry.x > 8158 && player.geometry.x < 8608 && player.geometry.y > 2080 && player.geometry.y < 2195 && pPressed) {
            console.log("Avvio dialogo rana1");
            dialogorana1.visibility.hidden = false;
            //qui ci andrà la visibility hidden della nuvoletta "parla"
            player_can_move = false;
            dialogo_stato1 = 1;
        }
    }
    // Stato 1: dialogo rana1 visibile, aspetta ENTER
    else if (dialogo_stato1 === 1 && enterPressed) {
        console.log("Passa a NPC1");
        dialogorana1.visibility.hidden = true;
        dialogoNPC1.visibility.hidden = false;
        dialogo_stato1 = 2;
    }
    // Stato 2: dialogo NPC1 visibile, aspetta ENTER
    else if (dialogo_stato1 === 2 && enterPressed) {
        console.log("Passa a scelta");
        dialogoNPC1.visibility.hidden = true;
        dialogorana_scelta.visibility.hidden = false;
        dialogo_stato1 = 3;
    }
    // Stato 3: scelta visibile, aspetta 1 o 2
    else if (dialogo_stato1 === 3) {
        if (onePressed) {
            console.log("Scelta A");
            dialogorana_scelta.visibility.hidden = true;
            PP.game_state.set_variable("pulita_s1", true);
            dialogoNPC2a.visibility.hidden = false;
            dialogo_stato1 = 4;
        } else if (twoPressed) {
            console.log("Scelta B");
            dialogorana_scelta.visibility.hidden = true;
            dialogoNPC2b.visibility.hidden = false;
            dialogo_stato1 = 4;
        }
    }
    // Stato 4: risposta finale visibile, aspetta ENTER per chiudere
    else if (dialogo_stato1 === 4 && enterPressed) {
        console.log("Chiudi dialogo");
        dialogoNPC2a.visibility.hidden = true;
        dialogoNPC2b.visibility.hidden = true;
        player_can_move = true;
        dialogo_NPC1_completato = true; // Marca il dialogo come completato
        dialogo_stato1 = 0;
    }
}
