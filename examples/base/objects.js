class Rectangle {
  constructor(x, y, height, width, gameEngine, color = [255, 0, 100, 255]) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.height = height;
    this.width = width;
    this.color = color;
    this.gameEngine = gameEngine;
  }
  setSpeed(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }
  isCollides(obj) {
    const left1 = this.x - this.width / 2;
    const left2 = obj.x - obj.width / 2;
    const right1 = this.x + this.width / 2;
    const right2 = obj.x + obj.width / 2;
    const top1 = this.y - this.height / 2;
    const top2 = obj.y - obj.height / 2;
    const bottom1 = this.y + this.height / 2;
    const bottom2 = obj.y + obj.height / 2;
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
    this.x += this.vx;
    this.y += this.vy;
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
    // this.gameEngine.fillRectangle(
    //   this.x,
    //   this.y,
    //   this.width,
    //   this.height,
    //   this.color
    // );
  }
}
