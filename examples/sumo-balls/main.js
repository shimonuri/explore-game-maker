"use strict";

const gameEngine = new GameEngine();
let mainRec = new Rectangle(650, 300, 40, 40, gameEngine);
let oponentRec = new Rectangle(150, 300, 40, 40, gameEngine, [0, 255, 0, 255]);
let mines = [];

function mainLoop() {
  updatePlayerSpeed(mainRec);
  updateOponentSpeed(oponentRec);
  gameEngine.clear();
  mainRec.draw();
  oponentRec.draw();
  for (const mine of mines) {
    if (mainRec.isCollides(mine)) {
      gameEngine.playSound("coin", "../../assets/sounds");
      mainRec.setSpeed(-mainRec.vx, -mainRec.vy);
    }
    if (oponentRec.isCollides(mine)) {
      gameEngine.playSound("coin", "../../assets/sounds");
      oponentRec.setSpeed(-oponentRec.vx, -oponentRec.vy);
    }
    mine.draw();
  }
  if (mainRec.isCollides(oponentRec)) {
    gameEngine.playSound("laserShot", "../../assets/sounds");
    const originalMainVx = mainRec.vx;
    const originalMainVy = mainRec.vy;
    mainRec.setSpeed(oponentRec.vx, oponentRec.vy);
    oponentRec.setSpeed(originalMainVx, originalMainVy);
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
function updateOponentSpeed(player) {
  let ax = 0;
  let ay = 0;
  let factor = 0.1;
  if (gameEngine.isKeyHeld("q")) {
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
  if (gameEngine.isKeyHeld("d")) {
    ax += factor;
  }
  if (gameEngine.isKeyHeld("a")) {
    ax += -factor;
  }
  if (gameEngine.isKeyHeld("w")) {
    ay += factor;
  }
  if (gameEngine.isKeyHeld("s")) {
    ay += -factor;
  }
  player.setAcceleration(ax, ay);
}
function updatePlayerSpeed(player) {
  let ax = 0;
  let ay = 0;
  let factor = 0.1;
  if (gameEngine.isKeyHeld("ShiftRight")) {
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

gameEngine.callOnClick(function callback(x, y) {
  gameEngine.playSound("hammer", "../../assets/sounds");
  mines.push(new Ball(x, y, 50, gameEngine, [200, 0, 0, 255]));
});
gameEngine.startMainLoop(mainLoop);
