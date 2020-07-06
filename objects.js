class Rectangle {
  constructor(x, y, height, width, color) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.height = height;
    this.width = width;
    this.color = color;
  }
  setSpeed(vx, vy) {
    this.vx = vx;
    this.vy = vy;
  }
  isCollides(obj, stop) {
    if (!stop) {
      if (obj.isCollides(this, true)) return true;
    }
    var i;
    var j;
    for (i = 0; i < this.width; i += 1) {
      const x = this.x + i;
      if (obj.isInside(x, this.y + this.height)) return true;
      if (obj.isInside(x, this.y)) return true;
    }
    for (i = 0; i < this.height; i += 1) {
      const y = this.y + i;
      if (obj.isInside(this.x, y)) return true;
      if (obj.isInside(this.x + this.width, y)) return true;
    }
    return false;
  }
  isInside(x, y) {
    const xCollides = x < this.x + this.width && x > this.x;
    const yCollides = y < this.y + this.height && y > this.y;
    return xCollides && yCollides;
  }
  draw(screenState, isFirst) {
    if (isFirst) {
      fillRectangle(
        this.x,
        this.y,
        this.width,
        this.height,
        this.color,
        screenState
      );
    } else {
      this.x += this.vx;
      this.y += this.vy;
      fillRectangle(
        this.x,
        this.y,
        Math.abs(this.vx),
        this.height,
        this.color,
        screenState
      );
      fillRectangle(
        this.x,
        this.y,
        this.width,
        Math.abs(this.vy),
        this.color,
        screenState
      );
    }
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
    for (const screenLocation of Object.keys(this.screen)) {
      if (!screenLocation in otherScreen.screen) {
        diff.screen[screenLocation] = "black";
      }
    }
    return diff;
  }
}
