"use strict";

let rec1 = new Rectangle(400, 300, 20, 20, "yellow");
let mainRec = new Rectangle(150, 200, 100, 200, "green");
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
  if (!vy && !vx) return;
  clear();
  mainRec.setSpeed(vx, vy);
  mainRec.draw();

  if (!mainRec.isCollides(rec1)) {
    rec1.draw();
  } else {
    console.log("collides");
    rec1 = new Rectangle(
      Math.round(Math.random() * 400),
      Math.round(Math.random() * 400),
      20,
      20,
      "yellow"
    );
    mainRec.color = ["green", "red", "pink", "orange"][
      Math.round(Math.random() * 3)
    ];
    mainRec.increaseSize(5, 5);
    rec1.draw();
  }
}

let ballX = 400;
let ballY = 400;
function add_falling_balls() {
  fillColoredCircle(ballX, ballY, 20, 40, "green");
  ballY -= 2;
}

startMainLoop(mainLoop);
