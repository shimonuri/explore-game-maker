"use strict";

const gameEngine = new GameEngine();
let mainRec = new Rectangle(150, 200, 10, 10, gameEngine);

function mainLoop() {
  updatePlayerSpeed(mainRec);
  gameEngine.clear();
  mainRec.draw();
  generateMines();
}

function generateMines(amount) {
  const x = Math.random() * gameEngine.getScreenWidth();
  const y = Math.random() * gameEngine.getScreenHeight();
  fillCircleFromPixels(x, y, 50, 1000, 200, 0, 0, 255, gameEngine);
}

function updatePlayerSpeed(player) {
  let vx = 0;
  let vy = 0;
  if (gameEngine.isKeyHeld("ArrowRight")) {
    vx += 5;
  }
  if (gameEngine.isKeyHeld("ArrowLeft")) {
    vx += -5;
  }
  if (gameEngine.isKeyHeld("ArrowUp")) {
    vy += 5;
  }
  if (gameEngine.isKeyHeld("ArrowDown")) {
    vy += -5;
  }
  player.setSpeed(vx, vy);
}

gameEngine.startMainLoop(mainLoop);
