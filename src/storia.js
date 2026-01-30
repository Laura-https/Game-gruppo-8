const BTN_HOME_W = 74;
const BTN_HOME_H = 67;

let tavola1, tavola2, tavola3;
let tavola_attiva;
let numero_tavola = 0;
let tavole = [];
let timer_lettura_tavola = false;

// Pulsanti
let p_avanti, p_indietro, p_gotohome;
let pulsante_avanti, pulsante_indietro, pulsante_gotohome;

function preload(s) {
    // Carica tavole (storia.png, storia2.png, storia3.png, etc.)
    tavola1 = PP.assets.image.load(s, "assets/tavole/storia.png");
    tavola2 = PP.assets.image.load(s, "assets/tavole/storia2.png");
    tavola3 = PP.assets.image.load(s, "assets/tavole/storia3.png");
    tavole = [tavola1, tavola2, tavola3];

    // Carica immagini pulsanti
    p_avanti = PP.assets.image.load(s, "assets/icone/avanti.png");
    p_indietro = PP.assets.image.load(s, "assets/icone/indietro.png");
    p_gotohome = PP.assets.sprite.load_spritesheet(
        s, "assets/icone/home_icona.png", BTN_HOME_W, BTN_HOME_H);
}

function seleziona_tavole(s) {
    // Distruggi tavola precedente
    if (tavola_attiva) PP.assets.destroy(tavola_attiva);

    // Aggiungi nuova tavola
    tavola_attiva = PP.assets.image.add(s, tavole[numero_tavola], 0, 0, 0, 0);

    // Distruggi tutti i pulsanti attivi
    if (pulsante_avanti) PP.assets.destroy(pulsante_avanti);
    if (pulsante_indietro) PP.assets.destroy(pulsante_indietro);
    if (pulsante_gotohome) PP.assets.destroy(pulsante_gotohome);

    // Se siamo all'ultima tavola
    if (numero_tavola === tavole.length - 1) {
        pulsante_indietro = PP.assets.image.add(s, p_indietro, 70, 360, 0.5, 0.5);
        pulsante_gotohome = PP.assets.sprite.add(s, p_gotohome, 70, 70, 0.5, 0.5);
        pulsante_gotohome.ph_obj.setFrame(0);

        PP.interactive.mouse.add(pulsante_indietro, "pointerdown", () => tavola_prima(s));
        PP.interactive.mouse.add(pulsante_gotohome, "pointerover", () => {
            pulsante_gotohome.ph_obj.setFrame(1);
        });
        PP.interactive.mouse.add(pulsante_gotohome, "pointerout", () => {
            pulsante_gotohome.ph_obj.setFrame(0);
        });
        PP.interactive.mouse.add(pulsante_gotohome, "pointerdown", () => PP.scenes.start("main_menu"));

    } else {
        // Pulsanti normali
        pulsante_avanti = PP.assets.image.add(s, p_avanti, 1210, 360, 0.5, 0.5);
        pulsante_gotohome = PP.assets.sprite.add(s, p_gotohome, 70, 70, 0.5, 0.5);
        pulsante_gotohome.ph_obj.setFrame(0);

        PP.interactive.mouse.add(pulsante_gotohome, "pointerover", () => {
            pulsante_gotohome.ph_obj.setFrame(1);
        });
        PP.interactive.mouse.add(pulsante_gotohome, "pointerout", () => {
            pulsante_gotohome.ph_obj.setFrame(0);
        });
        PP.interactive.mouse.add(pulsante_gotohome, "pointerdown", () => PP.scenes.start("main_menu"));

        // Aggiungi pulsante indietro solo se NON siamo alla prima tavola
        if (numero_tavola > 0) {
            pulsante_indietro = PP.assets.image.add(s, p_indietro, 70, 360, 0.5, 0.5);
            PP.interactive.mouse.add(pulsante_indietro, "pointerdown", () => tavola_prima(s));
        }

        // Click per avanti
        PP.interactive.mouse.add(pulsante_avanti, "pointerdown", () => tavola_dopo(s));
    }
}

function tavola_dopo(s) {
    if (timer_lettura_tavola) return;
    if (numero_tavola >= tavole.length - 1) {
        PP.scenes.start("main_menu");
        return;
    }

    numero_tavola++;
    seleziona_tavole(s);

    timer_lettura_tavola = true;
    PP.timers.add_timer(s, 800, () => {
        timer_lettura_tavola = false;
    }, false);
}

function tavola_prima(s) {
    if (timer_lettura_tavola) return;
    if (numero_tavola <= 0) return;

    numero_tavola--;
    seleziona_tavole(s);

    timer_lettura_tavola = true;
    PP.timers.add_timer(s, 800, () => {
        timer_lettura_tavola = false;
    }, false);
}

function create(s) {
    numero_tavola = 0;
    tavola_attiva = null;
    seleziona_tavole(s);
}

function update(s) {
    // Usa frecce sinistra/destra per navigare
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
        tavola_prima(s);
    }
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
        tavola_dopo(s);
    }

    // ESC per tornare al menu
    if (PP.interactive.kb.is_key_down(s, PP.key_codes.ESC)) {
        PP.scenes.start("main_menu");
    }
}

function destroy(s) { }

PP.scenes.add("storia", preload, create, update, destroy);