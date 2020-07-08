"use strict";

const gameEngine = new GameEngine();
let mainRec = new Rectangle(150, 200, 10, 10, gameEngine);
let mines = generateMines(1);

function mainLoop() {
  updatePlayerSpeed(mainRec);
  gameEngine.clear();
  mainRec.draw();
  for (const mine of mines) {
    if (mainRec.isCollides(mine)) {
      gameEngine.playSound("coin", "../../assets/sounds");
      mainRec.setSpeed(-mainRec.vx, -mainRec.vy);
    }
    mine.draw();
  }
}

function generateMines(amount) {
  const mines = [];
  for (let i = 0; i < amount; i += 1) {
    const x = Math.random() * gameEngine.getScreenWidth();
    const y = Math.random() * gameEngine.getScreenHeight();
    mines.push(new Ball(x, y, 50, gameEngine, [200, 0, 0, 255]));
  }
  return mines;
}

function updatePlayerSpeed(player) {
  let ax = 0;
  let ay = 0;
  let factor = 0.1;
  if (gameEngine.isKeyHeld(" ")) {
    if (!gameEngine.isSoundPlaying("donk")) {
      gameEngine.playSound("donk", "../../assets/sounds");
    }
    if (player.vx > 0) {
      ax = -0.5;
    } else {
      ax = +0.5;
    }
    if (player.vy > 0) {
      ay = -0.5;
    } else {
      ay = +0.5;
    }
    player.setAcceleration(ax, ay);
    return;
  }
  if (gameEngine.isKeyHeld("ArrowRight")) {
    ax += factor;
  }
  if (gameEngine.isKeyHeld("ArrowLeft")) {
    ax += -factor;
  }
  if (gameEngine.isKeyHeld("ArrowUp")) {
    ay += factor;
  }
  if (gameEngine.isKeyHeld("ArrowDown")) {
    ay += -factor;
  }
  player.setAcceleration(ax, ay);
}

gameEngine.startMainLoop(mainLoop);
