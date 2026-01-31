

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
let nuvoletta_gufo;
let nuvoletta_gufo_img;

function preload_dialogogufo(s) {
    dialogogufo_img = PP.assets.image.load(s, "assets/dialoghi/dialogo_gufo.png");
    nuvoletta_gufo_img = PP.assets.image.load(s, "assets/dialoghi/nuvoletta.png");
}

function create_dialogogufo(s) {
    dialogogufo = PP.assets.image.add(s, dialogogufo_img, 640, 575, 0.5, 0.5);
    dialogogufo.visibility.hidden = true;
    dialogogufo.tile_geometry.scroll_factor_x = 0;
    dialogogufo.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogogufo, 10);

    nuvoletta_gufo = PP.assets.image.add(s, nuvoletta_gufo_img, 6088, 1700, 0.5, 0.5);
    nuvoletta_gufo.visibility.hidden = false;
    PP.layers.set_z_index(nuvoletta_gufo, 10);

}

function update_dialogogufo(s, player) {
    const premutoP = PP.interactive.kb.is_key_down(s, PP.key_codes.P);
    const premutoENTER = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);

    // Se ENTER è premuto mentre il dialogo è visibile, chiudilo
    if (premutoENTER && !dialogogufo.visibility.hidden) {
        dialogogufo.visibility.hidden = true;
        nuvoletta_gufo.visibility.hidden = false;
        player_can_move = true;
    }
    // Se il player è nella zona e preme P, mostra il dialogo
    else if (player.geometry.x > 5850 && player.geometry.x < 6250 && player.geometry.y > 1630 && player.geometry.y < 1880 && premutoP) {
        dialogogufo.visibility.hidden = false;
        nuvoletta_gufo.visibility.hidden = true;
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

let nuvoletta_NPC1;
let nuvoletta_NPC1_img;

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
    nuvoletta_NPC1_img = PP.assets.image.load(s, "assets/dialoghi/nuvoletta.png");
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

    nuvoletta_NPC1 = PP.assets.image.add(s, nuvoletta_NPC1_img, 8218, 1966, 0.5, 0.5);
    nuvoletta_NPC1.visibility.hidden = false;
    PP.layers.set_z_index(nuvoletta_NPC1, 10);
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

    //console.log("Dialogo stato:", dialogo_stato, "Player X:", player.geometry.x.toFixed(2), "Y:", player.geometry.y.toFixed(2));

    // Stato 0: nessun dialogo attivo, aspetta che il player prema P nella zona
    if (dialogo_stato1 === 0 && !dialogo_NPC1_completato) {
        if (player.geometry.x > 8158 && player.geometry.x < 8608 && player.geometry.y > 2080 && player.geometry.y < 2195 && pPressed) {
            console.log("Avvio dialogo rana1");
            dialogorana1.visibility.hidden = false;
            nuvoletta_NPC1.visibility.hidden = true;
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
        nuvoletta_NPC1.visibility.hidden = true;
        dialogo_NPC1_completato = true; // Marca il dialogo come completato
        dialogo_stato1 = 0;
    }
}


let dialogo_talpa1;
let dialogo_talpa1_img;
let dialogo_talpa2;
let dialogo_talpa2_img;
let nuvoletta_talpa;
let nuvoletta_talpa_img;


let dialogo_statoT = 0; // 0 = nessun dialogo, 1 = secondo dialogo talpa
let prevENTER_talpa = false;
let prevP_talpa = false;




function preload_dialogo_talpa(s) {
    dialogo_talpa1_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_talpa1.png");
    dialogo_talpa2_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_talpa2.png");
    nuvoletta_talpa_img = PP.assets.image.load(s, "assets/dialoghi/nuvoletta.png");
}
function create_dialogo_talpa(s) {
    dialogo_talpa1 = PP.assets.image.add(s, dialogo_talpa1_img, 640, 360, 0.5, 0.5);
    dialogo_talpa1.visibility.hidden = true;
    dialogo_talpa1.tile_geometry.scroll_factor_x = 0;
    dialogo_talpa1.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogo_talpa1, 10);

    dialogo_talpa2 = PP.assets.image.add(s, dialogo_talpa2_img, 640, 360, 0.5, 0.5);
    dialogo_talpa2.visibility.hidden = true;
    dialogo_talpa2.tile_geometry.scroll_factor_x = 0;
    dialogo_talpa2.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dialogo_talpa2, 10);

    nuvoletta_talpa = PP.assets.image.add(s, nuvoletta_talpa_img, 351, 800, 0.5, 0.5);
    nuvoletta_talpa.visibility.hidden = false;
    PP.layers.set_z_index(nuvoletta_talpa, 10);

}
function update_dialogo_talpa(s, player) {

    const premutoENTER = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    const premutoP = PP.interactive.kb.is_key_down(s, PP.key_codes.P);

    const enterPressed = premutoENTER && !prevENTER_talpa;
    const pPressed = premutoP && !prevP_talpa;

    prevENTER_talpa = premutoENTER;
    prevP_talpa = premutoP;

    // Stato 0: nessun dialogo attivo, aspetta che il player prema P nella zona
    if (dialogo_statoT === 0) {
        if (player.geometry.x > 240 && player.geometry.x < 570 && player.geometry.y > 912 && player.geometry.y < 2195 && pPressed) {
            console.log("Avvio dialogo rana1");
            dialogo_talpa1.visibility.hidden = false;
            nuvoletta_talpa.visibility.hidden = true;
            player_can_move = false;
            dialogo_statoT = 1;
        }

    }
    else if (dialogo_statoT === 1 && enterPressed) {
        console.log("Passa a NPC1");
        dialogo_talpa1.visibility.hidden = true;
        dialogo_talpa2.visibility.hidden = false;
        dialogo_statoT = 2;
    }
    else if (dialogo_statoT === 2 && enterPressed) {
        console.log("Chiudi dialogo");
        dialogo_talpa2.visibility.hidden = true;
        player_can_move = true;
        nuvoletta_talpa.visibility.hidden = false;
        dialogo_statoT = 0;
    }
}

let s3_dialogorana1;
let s3_dialogorana1_img;
let s3_dialogorana_scelta;
let s3_dialogorana_scelta_img;
let s3_dialogoNPC1;
let s3_dialogoNPC1_img;
let s3_dialogoNPC2a;
let s3_dialogoNPC2a_img;
let s3_dialogoNPC2b;
let s3_dialogoNPC2b_img;

let nuvoletta_NPC3;
let nuvoletta_NPC3_img;

// Variabili di stato per il dialogo
let dialogo_stato3 = 0; // 0 = nessun dialogo, 1 = rana1, 2 = NPC1, 3 = scelta, 4 = risposta finale
let dialogo_NPC3_completato = false; // Traccia se il dialogo è stato già completato
let prevENTER3 = false; // Per rilevare il cambio di stato del tasto ENTER
let prevP3 = false; // Per rilevare il cambio di stato del tasto P
let prevONE3 = false; // Per rilevare il cambio di stato del tasto 1
let prevTWO3 = false; // Per rilevare il cambio di stato del tasto 2
function preload_dialoghi_NPC3(s) {
    dialogorana1_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_miniera1.png");
    dialogorana_scelta_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_miniera3.png");
    dialogoNPC1_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_miniera2.png");
    dialogoNPC2a_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_miniera4.png");
    dialogoNPC2b_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_miniera4b.png");
    nuvoletta_NPC3_img = PP.assets.image.load(s, "assets/dialoghi/nuvoletta.png");
}

function create_dialoghi_NPC3(s) {
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

    nuvoletta_NPC3 = PP.assets.image.add(s, nuvoletta_NPC3_img, 1535, 900, 0.5, 0.5);
    nuvoletta_NPC3.visibility.hidden = false;
    PP.layers.set_z_index(nuvoletta_NPC3, 10);
}

function update_dialoghi_NPC3(s, player) {
    const premutoENTER = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    const premutoP = PP.interactive.kb.is_key_down(s, PP.key_codes.P);
    const sceltaA = PP.interactive.kb.is_key_down(s, PP.key_codes.ONE);
    const sceltaB = PP.interactive.kb.is_key_down(s, PP.key_codes.TWO);

    // Rileva il cambio di stato (da non premuto a premuto)
    const enterPressed = premutoENTER && !prevENTER3;
    const pPressed = premutoP && !prevP3;
    const onePressed = sceltaA && !prevONE3;
    const twoPressed = sceltaB && !prevTWO3;

    // Salva lo stato precedente dei tasti
    prevENTER3 = premutoENTER;
    prevP3 = premutoP;
    prevONE3 = sceltaA;
    prevTWO3 = sceltaB;

    //console.log("Dialogo stato:", dialogo_stato, "Player X:", player.geometry.x.toFixed(2), "Y:", player.geometry.y.toFixed(2));

    // Stato 0: nessun dialogo attivo, aspetta che il player prema P nella zona
    if (dialogo_stato3 === 0 && !dialogo_NPC3_completato) {
        if (player.geometry.x > 1535 && player.geometry.x < 1856 && player.geometry.y > 1000 && player.geometry.y < 1135 && pPressed) {
            console.log("Avvio dialogo rana1");
            dialogorana1.visibility.hidden = false;
            nuvoletta_NPC3.visibility.hidden = true;
            //qui ci andrà la visibility hidden della nuvoletta "parla"
            player_can_move = false;
            dialogo_stato3 = 1;
        }
    }
    // Stato 1: dialogo rana1 visibile, aspetta ENTER
    else if (dialogo_stato3 === 1 && enterPressed) {
        console.log("Passa a NPC1");
        dialogorana1.visibility.hidden = true;
        dialogoNPC1.visibility.hidden = false;
        dialogo_stato3 = 2;
    }
    // Stato 2: dialogo NPC1 visibile, aspetta ENTER
    else if (dialogo_stato3 === 2 && enterPressed) {
        console.log("Passa a scelta");
        dialogoNPC1.visibility.hidden = true;
        dialogorana_scelta.visibility.hidden = false;
        dialogo_stato3 = 3;
    }
    // Stato 3: scelta visibile, aspetta 1 o 2
    else if (dialogo_stato3 === 3) {
        if (onePressed) {
            console.log("Scelta A");
            dialogorana_scelta.visibility.hidden = true;
            PP.game_state.set_variable("pulita_s3", true); //--------variabile gico pulito
            dialogoNPC2a.visibility.hidden = false;
            dialogo_stato3 = 4;
        } else if (twoPressed) {
            console.log("Scelta B");
            dialogorana_scelta.visibility.hidden = true;
            dialogoNPC2b.visibility.hidden = false;
            dialogo_stato3 = 4;
        }
    }
    // Stato 4: risposta finale visibile, aspetta ENTER per chiudere
    else if (dialogo_stato3 === 4 && enterPressed) {
        console.log("Chiudi dialogo");
        dialogoNPC2a.visibility.hidden = true;
        dialogoNPC2b.visibility.hidden = true;
        nuvoletta_NPC3.visibility.hidden = true;
        player_can_move = true;
        dialogo_NPC3_completato = true; // Marca il dialogo come completato
        dialogo_stato3 = 0;
    }
}


let s2_dialogorana1;
let s2_dialogorana1_img;
let s2_dialogorana_scelta;
let s2_dialogorana_scelta_img;
let s2_dialogoNPC1;
let s2_dialogoNPC1_img;
let s2_dialogoNPC2a;
let s2_dialogoNPC2a_img;
let s2_dialogoNPC2b;
let s2_dialogoNPC2b_img;

let nuvoletta_NPC2;
let nuvoletta_NPC2_img;
// Variabili di stato per il dialogo
let dialogo_stato2 = 0; // 0 = nessun dialogo, 1 = rana1, 2 = NPC1, 3 = scelta, 4 = risposta finale
let dialogo_NPC2_completato = false; // Traccia se il dialogo è stato già completato
let prevENTER2 = false; // Per rilevare il cambio di stato del tasto ENTER
let prevP2 = false; // Per rilevare il cambio di stato del tasto P
let prevONE2 = false; // Per rilevare il cambio di stato del tasto 1
let prevTWO2 = false; // Per rilevare il cambio di stato del tasto 2
function preload_dialoghi_NPC2(s) {
    dialogorana1_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_stagno1.png");
    dialogorana_scelta_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_stagno3.png");
    dialogoNPC1_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_stagno2.png");
    dialogoNPC2a_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_stagno4.png");
    dialogoNPC2b_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_stagno4b.png");
    nuvoletta_NPC2_img = PP.assets.image.load(s, "assets/dialoghi/nuvoletta.png");
}

function create_dialoghi_NPC2(s) {
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

    nuvoletta_NPC2 = PP.assets.image.add(s, nuvoletta_NPC2_img, 4736, 457, 0.5, 0.5);
    nuvoletta_NPC2.visibility.hidden = false;
    PP.layers.set_z_index(nuvoletta_NPC2, 10);
}

function update_dialoghi_NPC2(s, player) {
    const premutoENTER = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    const premutoP = PP.interactive.kb.is_key_down(s, PP.key_codes.P);
    const sceltaA = PP.interactive.kb.is_key_down(s, PP.key_codes.ONE);
    const sceltaB = PP.interactive.kb.is_key_down(s, PP.key_codes.TWO);

    // Rileva il cambio di stato (da non premuto a premuto)
    const enterPressed = premutoENTER && !prevENTER2;
    const pPressed = premutoP && !prevP2;
    const onePressed = sceltaA && !prevONE2;
    const twoPressed = sceltaB && !prevTWO2;

    // Salva lo stato precedente dei tasti
    prevENTER2 = premutoENTER;
    prevP2 = premutoP;
    prevONE2 = sceltaA;
    prevTWO2 = sceltaB;

    console.log("Dialogo stato2:", dialogo_stato2, "Player X:", player.geometry.x.toFixed(2), "Y:", player.geometry.y.toFixed(2));

    // Stato 0: nessun dialogo attivo, aspetta che il player prema P nella zona
    if (dialogo_stato2 === 0 && !dialogo_NPC2_completato) {
        if (player.geometry.x > 4600 && player.geometry.x < 5120 && player.geometry.y > 600 && player.geometry.y < 710 && pPressed) {
            console.log("Avvio dialogo rana1");
            dialogorana1.visibility.hidden = false;
            //qui ci andrà la visibility hidden della nuvoletta "parla"
            nuvoletta_NPC2.visibility.hidden = true;
            player_can_move = false;
            dialogo_stato2 = 1;
        }
    }
    // Stato 1: dialogo rana1 visibile, aspetta ENTER
    else if (dialogo_stato2 === 1 && enterPressed) {

        dialogorana1.visibility.hidden = true;
        dialogoNPC1.visibility.hidden = false;
        dialogo_stato2 = 2;
    }
    // Stato 2: dialogo NPC1 visibile, aspetta ENTER
    else if (dialogo_stato2 === 2 && enterPressed) {
        console.log("Passa a scelta");
        dialogoNPC1.visibility.hidden = true;
        dialogorana_scelta.visibility.hidden = false;
        dialogo_stato2 = 3;
    }
    // Stato 3: scelta visibile, aspetta 1 o 2
    else if (dialogo_stato2 === 3) {
        if (onePressed) {
            console.log("Scelta A");
            dialogorana_scelta.visibility.hidden = true;
            PP.game_state.set_variable("pulita_s2", true); //--------variabile gico pulito
            dialogoNPC2a.visibility.hidden = false;
            dialogo_stato2 = 4;
        } else if (twoPressed) {
            console.log("Scelta B");
            dialogorana_scelta.visibility.hidden = true;
            dialogoNPC2b.visibility.hidden = false;
            dialogo_stato2 = 4;
        }
    }
    // Stato 4: risposta finale visibile, aspetta ENTER per chiudere
    else if (dialogo_stato2 === 4 && enterPressed) {
        console.log("Chiudi dialogo");
        dialogoNPC2a.visibility.hidden = true;
        dialogoNPC2b.visibility.hidden = true;
        player_can_move = true;
        nuvoletta_NPC2.visibility.hidden = true;
        dialogo_NPC2_completato = true; // Marca il dialogo come completato
        dialogo_stato2 = 0;
    }
}

let dial_viandante1;
let dial_viandante1_img;
let dial_viandante2;
let dial_viandante2_img;
let dial_viandante3;
let dial_viandante3_img;

let dialogo_statoViandante = 0; // 0 = nessun dialogo, 1 = primo dialogo, 2 = secondo dialogo, 3 = terzo dialogo
let prevENTER_viand = false;
let prevP_viand = false;
let nuvoletta_viand;
let nuvoletta_viand_img;


function preload_dialogo_viandante(s) {
    dial_viandante1_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_end1.png");
    dial_viandante2_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_end2.png");
    dial_viandante3_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_end3.png");
    nuvoletta_viand_img = PP.assets.image.load(s, "assets/dialoghi/nuvoletta.png");
}
function create_dialogo_viandante(s) {
    dial_viandante1 = PP.assets.image.add(s, dial_viandante1_img, 640, 360, 0.5, 0.5);
    dial_viandante1.visibility.hidden = true;
    dial_viandante1.tile_geometry.scroll_factor_x = 0;
    dial_viandante1.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dial_viandante1, 10);
    dial_viandante2 = PP.assets.image.add(s, dial_viandante2_img, 640, 360, 0.5, 0.5);
    dial_viandante2.visibility.hidden = true;
    dial_viandante2.tile_geometry.scroll_factor_x = 0;
    dial_viandante2.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dial_viandante2, 10);
    dial_viandante3 = PP.assets.image.add(s, dial_viandante3_img, 640, 360, 0.5, 0.5);
    dial_viandante3.visibility.hidden = true;
    dial_viandante3.tile_geometry.scroll_factor_x = 0;
    dial_viandante3.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(dial_viandante3, 10);

    nuvoletta_viand = PP.assets.image.add(s, nuvoletta_viand_img, 3760, 1180, 0.5, 0.5);
    nuvoletta_viand.visibility.hidden = false;
    PP.layers.set_z_index(nuvoletta_viand, 9);
}

function update_dialogo_viandante(s, player) {

    const premutoENTER = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    const premutoP = PP.interactive.kb.is_key_down(s, PP.key_codes.P);


    // Rileva il cambio di stato (da non premuto a premuto)
    const enterPressed = premutoENTER && !prevENTER_viand;
    const pPressed = premutoP && !prevP_viand;


    // Salva lo stato precedente dei tasti
    prevENTER_viand = premutoENTER;
    prevP_viand = premutoP;


    console.log("Viandante - Player X:", player.geometry.x.toFixed(2), "Y:", player.geometry.y.toFixed(2), "Stato:", dialogo_statoViandante, "P pressed:", pPressed, "P down:", premutoP, "prevP:", prevP_viand);

    // Stato 0: nessun dialogo attivo, aspetta che il player prema P nella zona
    if (dialogo_statoViandante === 0) {
        if (player.geometry.x > 3397 && player.geometry.x < 3948 && player.geometry.y > 1200 && player.geometry.y <= 1386 && pPressed) {
            console.log("Avvio dialogo viandante");
            dial_viandante1.visibility.hidden = false;
            nuvoletta_viand.visibility.hidden = true;
            player_can_move = false;
            dialogo_statoViandante = 1;
            // Reset prevP per assicurare che non rimanga bloccato
            prevP_viand = true;
        }

    }
    else if (dialogo_statoViandante === 1 && enterPressed) {
        console.log("Passa a NPC1");
        dial_viandante1.visibility.hidden = true;
        dial_viandante2.visibility.hidden = false;
        dialogo_statoViandante = 2;

    }
    else if (dialogo_statoViandante === 2 && enterPressed) {
        console.log("Passa a NPC1");
        dial_viandante2.visibility.hidden = true;
        dial_viandante3.visibility.hidden = false;
        dialogo_statoViandante = 3;
    }
    else if (dialogo_statoViandante === 3 && enterPressed) {
        console.log("Chiudi dialogo");
        dial_viandante3.visibility.hidden = true;
        player_can_move = true;
        nuvoletta_viand.visibility.hidden = false;
        dialogo_statoViandante = 4;
        PP.scenes.start("vittoria");
    }
    else if (dialogo_statoViandante === 4 && enterPressed) {
        PP.scenes.start("vittoria");
    }
}






let falena1;
let falena1_img;
let falena2a;
let falena2a_img;
let falena2b;
let falena2b_img;
let falena3;
let falena3_img;

let nuvoletta_falena;
let nuvoletta_falena_img;

function preload_falena_dialoghi(s) {
    falena1_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_falena.png");
    falena2a_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_falena2.png");
    falena2b_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_falena2b.png");
    falena3_img = PP.assets.image.load(s, "assets/dialoghi/DIALOGHI SISTEMATI_falena3.png");
    nuvoletta_falena_img = PP.assets.image.load(s, "assets/dialoghi/nuvoletta.png");
}

function create_falena_dialoghi(s) {
    falena1 = PP.assets.image.add(s, falena1_img, 640, 360, 0.5, 0.5);
    falena1.visibility.hidden = true;
    falena1.tile_geometry.scroll_factor_x = 0;
    falena1.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(falena1, 10);
    falena2a = PP.assets.image.add(s, falena2a_img, 640, 360, 0.5, 0.5);
    falena2a.visibility.hidden = true;
    falena2a.tile_geometry.scroll_factor_x = 0;
    falena2a.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(falena2a, 10);
    falena2b = PP.assets.image.add(s, falena2b_img, 640, 360, 0.5, 0.5);
    falena2b.visibility.hidden = true;
    falena2b.tile_geometry.scroll_factor_x = 0;
    falena2b.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(falena2b, 10);
    falena3 = PP.assets.image.add(s, falena3_img, 640, 360, 0.5, 0.5);
    falena3.visibility.hidden = true;
    falena3.tile_geometry.scroll_factor_x = 0;
    falena3.tile_geometry.scroll_factor_y = 0;
    PP.layers.set_z_index(falena3, 10);

    nuvoletta_falena = PP.assets.image.add(s, nuvoletta_falena_img, 2682, 1268, 0.5, 1);
    nuvoletta_falena.visibility.hidden = false;
    PP.layers.set_z_index(nuvoletta_falena, 9);
}
let dialogo_statofalena = 0;

function update_dialogo_falena(s, player) {
    // Leggi il valore aggiornato di tuttoPulito ad ogni frame
    const tuttoPulito = PP.game_state.get_variable("tuttoPulito");

    const premutoENTER = PP.interactive.kb.is_key_down(s, PP.key_codes.ENTER);
    const premutoP = PP.interactive.kb.is_key_down(s, PP.key_codes.P);
    const sceltaA = PP.interactive.kb.is_key_down(s, PP.key_codes.ONE);
    const sceltaB = PP.interactive.kb.is_key_down(s, PP.key_codes.TWO);

    // Rileva il cambio di stato (da non premuto a premuto)
    const enterPressed = premutoENTER && !prevENTER_falena;
    const pPressed = premutoP && !prevP_falena;
    const onePressed = sceltaA && !prevONE_falena;
    const twoPressed = sceltaB && !prevTWO_falena;


    // Salva lo stato precedente dei tasti
    prevENTER_falena = premutoENTER;
    prevP_falena = premutoP;
    prevONE_falena = sceltaA;
    prevTWO_falena = sceltaB;


    // Stato 0: nessun dialogo attivo, aspetta che il player prema P nella zona
    if (dialogo_statofalena === 0) {
        if (player.geometry.x > 2573 && player.geometry.x <= 2750 && player.geometry.y > 1197 && player.geometry.y <= 1386 && pPressed) {
            console.log("Avvio dialogo falena");
            falena1.visibility.hidden = false;
            nuvoletta_falena.visibility.hidden = true;
            player_can_move = false;
            dialogo_statofalena = 1;
            // Reset prevP per assicurare che non rimanga bloccato
            prevP_falena = true;
        }

    }
    else if (dialogo_statofalena === 1 && enterPressed && tuttoPulito) {
        console.log("tutto pulito");
        falena1.visibility.hidden = true;
        falena2a.visibility.hidden = false;
        dialogo_statofalena = 2;
    }
    else if (dialogo_statofalena === 2 && enterPressed ) {
    console.log("schifo");
    falena2a.visibility.hidden = true;
    falena3.visibility.hidden = false; //png con la scelta
    dialogo_statofalena = 3;
}
    else if (dialogo_statofalena === 1 && enterPressed && !tuttoPulito) {
        console.log("schifo");
        falena1.visibility.hidden = true;
        falena2b.visibility.hidden = false; //paerte che ti dice di tornare indietro
        dialogo_statofalena = 4;
    }
    else if (dialogo_statofalena === 3) { //si chiude dialogo
        if (onePressed) {
            console.log("Scelta A"); //continuo a esplorare
            falena3.visibility.hidden = true;
            player_can_move = true;
            nuvoletta_falena.visibility.hidden = false;
            dialogo_statofalena = 0;


        } else if (twoPressed) {
            console.log("Scelta B"); //vado avanti
            falena3.visibility.hidden = true;
            player_can_move = true;
            nuvoletta_falena.visibility.hidden = true;
            dialogo_statofalena = 0;
            PP.game_state.set_variable("via_falena", true);
        }
    }
    else if (dialogo_statofalena === 4 && enterPressed) { //fine dialogo

        falena2b.visibility.hidden = true;
        player_can_move = true;
        nuvoletta_falena.visibility.hidden = false;
        dialogo_statofalena = 0;

    }
   /* else if (dialogo_statofalena === 2 && enterPressed) {
        console.log("Passa a NPC1");
        falena2a.visibility.hidden = true;
        falena3.visibility.hidden = false;
        dialogo_statofalena = 3;
    }
    else if (dialogo_statofalena === 3 && enterPressed) {
        console.log("Chiudi dialogo");
        falena3.visibility.hidden = true;
        player_can_move = true;
        nuvoletta_falena.visibility.hidden = false;
        dialogo_statofalena = 0;

    }
*/

}
