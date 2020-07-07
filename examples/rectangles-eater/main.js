"use strict";

let recs = [new Rectangle(400, 300, 5, 5, "yellow")];
let mainRec = new Rectangle(150, 200, 5, 5, "green");
function mainLoop() {
  let vx = 0;
  let vy = 0;
  if (isKeyHeld("ArrowRight")) {
    vx += 5;
  }
  if (isKeyHeld("ArrowLeft")) {
    vx += -5;
  }
  if (isKeyHeld("ArrowUp")) {
    vy += 5;
  }
  if (isKeyHeld("ArrowDown")) {
    vy += -5;
  }
  clear();
  mainRec.setSpeed(vx, vy);
  mainRec.draw();
  var newRecs = [];
  for (const rec of recs) {
    if (!mainRec.isCollides(rec)) {
      rec.draw();
      newRecs.push(rec);
    } else {
      mainRec.color = ["green", "red", "pink", "orange"][
        Math.round(Math.random() * 3)
      ];
      mainRec.increaseSize(5, 5);

      for (const i in [1, 2]) {
        const newRec = new Rectangle(
          Math.round(Math.random() * 500),
          Math.round(Math.random() * 500),
          20,
          20,
          "yellow"
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
fillRectangleFromPixels(200, 200, 55, 55, "red");
console.log("finished");
// startMainLoop(mainLoop);
