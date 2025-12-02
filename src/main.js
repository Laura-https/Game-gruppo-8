// 配置游戏画布和重力等
const config = {
  canvas_width: 1280,          // 先用 1280x720 就够了
  canvas_height: 720,
  canvas_id: "game_area",
  background_color: 0x000000,  // 黑色背景
  debug_mode: true,
  gravity_value: 800           // 先不加重力，之后再玩物理
};

// 创建游戏
PP.game.create(config);