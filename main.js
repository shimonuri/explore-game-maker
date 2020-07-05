"use strict";

initCanvas(600, 358);
var x = 150;
var y = 200;
const MOVING_SHAPE_WIDTH = 100;
const MOVING_SHAPE_HEIGHT = 50;
const STATIC_SHAPE_WIDTH = 200;
const STATIC_SHAPE_HEIGHT = 50;
const STATIC_SHAPE_X = 200;
const STATE_SHAPE_Y = 100;

function isCollides(x, y) {
  let xCollides = false;
  if (
    x < STATIC_SHAPE_X + STATIC_SHAPE_WIDTH &&
    x > STATIC_SHAPE_X - STATIC_SHAPE_WIDTH
  ) {
    xCollides = true;
  }
  let yCollides = false;
  if (
    y < STATE_SHAPE_Y + STATIC_SHAPE_HEIGHT &&
    y > STATE_SHAPE_Y - STATIC_SHAPE_HEIGHT
  ) {
    yCollides = true;
  }

  return xCollides && yCollides;
}

function mainLoop() {
  let vx = 0;
  let vy = 0;
  if (hlKeyHeld("ArrowRight")) {
    vx += 10;
  }
  if (hlKeyHeld("ArrowLeft")) {
    vx += -10;
  }
  if (hlKeyHeld("ArrowUp")) {
    vy += 10;
  }
  if (hlKeyHeld("ArrowDown")) {
    vy += -10;
  }

  hlClear();
  x += vx;
  y += vy;
  const color = isCollides(x, y) ? "lime" : "orange";
  fillRectangle(x, y, STATIC_SHAPE_WIDTH, STATIC_SHAPE_HEIGHT, color);
  add_falling_balls();
}

let ballX = 400;
let ballY = 400;
function add_falling_balls() {
  fillCircle(ballX, ballY, 10, 1000, "green");

  ballY -= 2;
}

function fillCircle(x, y, radius, dens_level, color) {
  var i;
  var deg;
  console.log(dens_level);
  for (i = 0; i < dens_level; i++) {
    deg = i * ((Math.PI * 2) / dens_level);
    fillPixel(x + radius * Math.cos(deg), y + radius * Math.sin(deg), color);
  }
}
function fillRectangle(x, y, width, height, color) {
  var i;
  for (i = 0; i < width; i++) {
    var j;
    for (j = 0; j < height; j++) {
      fillPixel(x + i, y + j, color);
    }
  }
}

hlStartMainLoop(mainLoop);
