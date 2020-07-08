"use strict";

const gameEngine = new GameEngine();
let recs = [new Rectangle(400, 300, 10, 10, "yellow", gameEngine)];
let mainRec = new Rectangle(150, 200, 10, 10, "green", gameEngine);
function mainLoop() {
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
  gameEngine.clear();
  mainRec.setSpeed(vx, vy);
  mainRec.draw();
  var newRecs = [];
  for (const rec of recs) {
    if (!mainRec.isCollides(rec)) {
      rec.draw();
      newRecs.push(rec);
    } else {
      gameEngine.playSound("donk", "../../assets/sounds");
      mainRec.color = ["green", "red", "pink", "orange"][
        Math.round(Math.random() * 3)
      ];
      mainRec.increaseSize(5, 5);

      for (const i in [1]) {
        const newRec = new Rectangle(
          Math.round(Math.random() * 500),
          Math.round(Math.random() * 500),
          20,
          20,
          "yellow",
          gameEngine
        );
        newRec.draw();
        newRecs.push(newRec);
      }
    }
  }
  recs = newRecs;
}

let ballX = 400;
let ballY = 400;
function add_falling_balls() {
  fillColoredCircle(ballX, ballY, 20, 40, "green");
  ballY -= 2;
}
// fillRectangle(0, 0, 2000, 1000, "red");
fillRectangleFromPixels(200, 200, 55, 55, 255, 0, 0, 200, gameEngine);

gameEngine.startMainLoop(mainLoop);
