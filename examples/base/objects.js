class Rectangle {
  constructor(x, y, height, width, gameEngine, color = [255, 0, 100, 255]) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.height = height;
    this.width = width;
    this.color = color;
    this.gameEngine = gameEngine;
  }
  setSpeed(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }
  setAcceleration(ax, ay) {
    this.ax = ax;
    this.ay = ay;
  }
  isCollides(obj) {
    if (obj instanceof Rectangle) {
      return this.isCollidesWithRectangle(obj);
    }
    if (obj instanceof Ball) {
      return this.isCollidesWithBall(obj);
    }
  }
  getBorder() {
    const positions = [];
    const left = this.x - this.width / 2;
    const right = this.x + this.width / 2;
    const top = this.y + this.height / 2;
    const bottom = this.y - this.height / 2;
    for (let i = 0; i < this.height; i += 1) {
      positions.push([left, bottom + i]);
      positions.push([right, bottom + i]);
    }
    for (let i = 0; i < this.height; i += 1) {
      positions.push([left + i, bottom]);
      positions.push([left + i, top]);
    }
    return positions;
  }
  isCollidesWithBall(ball) {
    for (const [x, y] of this.getBorder()) {
      if (ball.isCollides(x, y)) return true;
    }
    return false;
  }
  isCollidesWithRectangle(otherRectangle) {
    const left1 = this.x - this.width / 2;
    const left2 = otherRectangle.x - otherRectangle.width / 2;
    const right1 = this.x + this.width / 2;
    const right2 = otherRectangle.x + otherRectangle.width / 2;
    const top1 = this.y - this.height / 2;
    const top2 = otherRectangle.y - otherRectangle.height / 2;
    const bottom1 = this.y + this.height / 2;
    const bottom2 = otherRectangle.y + otherRectangle.height / 2;
    return !(
      top1 > bottom2 ||
      top2 > bottom1 ||
      right1 < left2 ||
      right2 < left1
    );
  }
  increaseSize(width, height) {
    this.width += width;
    this.height += height;
  }
  draw() {
    this.x += this.vx + this.ax ** 2 / 2;
    this.y += this.vy + this.ay ** 2 / 2;
    this.vx += this.ax;
    this.vy += this.ay;
    fillRectangleFromPixels(
      this.x,
      this.y,
      this.width,
      this.height,
      this.color[0],
      this.color[1],
      this.color[2],
      this.color[3],
      gameEngine
    );
  }
}

class Ball {
  constructor(x, y, radius, gameEngine, color = [255, 100, 0, 255]) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.gameEngine = gameEngine;
    this.color = color;
  }
  isCollides(x, y) {
    const distance = Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
    return distance <= this.radius;
  }
  draw() {
    fillCircleFromPixels(
      this.x,
      this.y,
      this.radius,
      200,
      this.color[0],
      this.color[1],
      this.color[2],
      this.color[3],
      gameEngine
    );
  }
}
