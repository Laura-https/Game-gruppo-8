// Configurazione del canvas di gioco, della gravità, ecc.
const config = {
  canvas_width: 1280,          // dimensione schermo 1280x720
  canvas_height: 720,
  canvas_id: "game_area",
  background_color: 0x000000,  // colore dello sfondo
  debug_mode: false,
  gravity_value: 800           //gravità
};

async function boot() {
  await document.fonts.load('16px PNAlphabetSoup');
  Phaser.GameObjects.Text.DEFAULT_FONT_FAMILY = 'PNAlphabetSoup';
  PP.game.create(config);
}

boot();

