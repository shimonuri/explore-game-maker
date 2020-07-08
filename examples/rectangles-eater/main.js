"use strict";

const gameEngine = new GameEngine();
let recs = [new Rectangle(400, 300, 10, 10, gameEngine)];
let mainRec = new Rectangle(150, 200, 10, 10, gameEngine);

function mainLoop() {
  updatePlayerSpeed(mainRec);
  gameEngine.clear();
  mainRec.draw();
  var newRecs = [];

  // handling collisions
  for (const rec of recs) {
    if (!mainRec.isCollides(rec)) {
      rec.draw();
      newRecs.push(rec);
    } else {
      gameEngine.playSound("plus", "../../assets/sounds");
      mainRec.color = [
        [0, 200, 10, 200],
        [200, 0, 0, 200],
        [100, 100, 100, 200],
        [200, 200, 10, 200],
      ][Math.round(Math.random() * 3)];
      mainRec.increaseSize(5, 5);

      for (const i in [1, 2]) {
        const newRec = new Rectangle(
          Math.round(Math.random() * gameEngine.getScreenWidth()),
          Math.round(Math.random() * gameEngine.getScreenHeight()),
          20,
          20,
          gameEngine
        );
        newRec.draw();
        newRecs.push(newRec);
      }
    }
  }
  recs = newRecs;
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
