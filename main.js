"use strict";

let rec1 = new Rectangle(400, 300, 20, 20, "yellow");
let mainRec = new Rectangle(150, 200, 40, 40, "green");
let currentScreenState = new ScreenState();
let isFirst = true;
function mainLoop() {
  let newScreenState = new ScreenState();
  let vx = 0;
  let vy = 0;
  if (hlKeyHeld("ArrowRight")) {
    vx += 5;
  }
  if (hlKeyHeld("ArrowLeft")) {
    vx += -5;
  }
  if (hlKeyHeld("ArrowUp")) {
    vy += 5;
  }
  if (hlKeyHeld("ArrowDown")) {
    vy += -5;
  }
  if (!vy && !vx) return;
  // clear();
  mainRec.setSpeed(vx, vy);
  mainRec.draw(newScreenState, isFirst);
  if (!mainRec.isCollides(rec1)) {
    rec1.draw(newScreenState, isFirst);
  } else {
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
    mainRec.height += 100;
    mainRec.width += 100;
    rec1.draw(newScreenState, true);
  }
  const diffState = currentScreenState.getDiff(newScreenState);
  paintScreenState(diffState);
  currentScreenState = newScreenState;
  isFirst = false;
}

let ballX = 400;
let ballY = 400;
function add_falling_balls() {
  fillColoredCircle(ballX, ballY, 20, 40, "green");
  ballY -= 2;
}

hlStartMainLoop(mainLoop);
