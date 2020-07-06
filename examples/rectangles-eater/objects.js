class Rectangle {
  constructor(x, y, height, width, color) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.height = height;
    this.width = width;
    this.color = color;
    this.points = {};
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
    fillRectangle(this.x, this.y, this.width, this.height, this.color);
  }
}
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ScreenState {
  constructor() {
    this.screen = {};
  }
  fillPixel(x, y, color) {
    this.screen[[x, y]] = color;
  }
  getDiff(otherScreen) {
    let diff = new ScreenState();
    for (const [screenLocation, color] of Object.entries(otherScreen.screen)) {
      if (screenLocation in this.screen) {
        if (color !== this.screen[screenLocation]) {
          diff.screen[screenLocation] = color;
        }
      } else {
        diff.screen[screenLocation] = color;
      }
    }
    // for (const screenLocation of Object.keys(this.screen)) {
    //   if (!(screenLocation in otherScreen.screen)) {
    //     diff.screen[screenLocation] = "black";
    //   }
    // }
    return diff;
  }
}
