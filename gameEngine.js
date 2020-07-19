"use strict";

class GameEngine {
  constructor() {
    this.canv = document.getElementById("game"); // creates a canvas DOM element
    this.canvasWidth = this.canv.width;
    this.canvasHeight = this.canv.height;
    this.keyCatcher = {};
    this.keyState = {};
    this.afPeriod = null;
    this.afReq = null;
    this.clickCallback = null;
    const self = this;
    this.canv.addEventListener("mousemove", function (e) {
      var cr = self.canv.getBoundingClientRect();
      self.lastMouseX = e.clientX - cr.x;
      self.lastMouseY = self.canvasHeight - (e.clientY - cr.y);
    });

    this.canv.addEventListener("click", function (e) {
      if (!self.clickCallback) return;
      self.clickCallback(self.lastMouseX, self.lastMouseY);
    });
    window.addEventListener("keydown", function (e) {
      // TODO figure out how to bind shifted keys together;
      //  atm key down -> shift down -> key up -> shift up results in "stuck" key
      self.keyCatcher[e.key] = true;
      self.keyState[e.key] = true;
    });

    window.addEventListener("keyup", function (e) {
      self.keyState[e.key] = false;
    });

    window.addEventListener("blur", function () {
      self.keyCatcher = {};
      self.keyState = {};
    });
  }
  fillPixels(positions, r, g, b, a) {
    for (const c of [r, g, b, a]) {
      if (typeof c !== "number") {
        console.log("r, g, b, a arguments for fillPixels must be numbers");
      }
    }
    var ctx = this.canv.getContext("2d");
    var imageData = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    var data = imageData.data;
    for (let [x, y] of positions) {
      y = this.canvasHeight - Math.round(y);
      const index = (y * this.canvasWidth + Math.round(x)) * 4;
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = a;
    }
    ctx.putImageData(
      imageData,
      0,
      0,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
  }
  /*
   */
  fillRectangle(x, y, width, height, color) {
    // y, x are in the center of the rectangle
    if (typeof x !== "number") {
      console.log('the "x" argument for "fillRectangle" has to be a number');
      return;
    }
    if (typeof y !== "number") {
      console.log('the "y" argument for "fillRectangle" has to be a number');
      return;
    }
    if (typeof width !== "number") {
      console.log('the "y" argument for "fillRectangle" has to be a number');
      return;
    }
    if (typeof height !== "number") {
      console.log('the "y" argument for "fillRectangle" has to be a number');
      return;
    }
    if (typeof color !== "string") {
      console.log(
        'the "color" argument for "fillRectangle" has to be a string'
      );
      return;
    }

    var ctx = this.canv.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(
      x - width / 2,
      this.canvasHeight - height / 2 - y,
      width,
      height
    );
    ctx.fillStyle = "#f0f"; // To make color console.logs more obvious
  }
  clear(color = "black") {
    if (typeof color !== "string") {
      console.log('the "color" argument for "clear" has to be a string');
      return;
    }

    this.canv
      .getContext("2d")
      .clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.canv.style.backgroundColor = color;
  }

  startMainLoop(loopFunction, data = null) {
    if (typeof loopFunction !== "function") {
      console.log(
        'the "loopFunction" argument for "startMainLoop" has to be a function'
      );
      return;
    }
    if (typeof data !== "object") {
      console.log('the "data" argument for "startMainLoop" has to be a object');
      return;
    }

    if (this.afReq != null) {
      console.log(
        "startMainLoop has already been called; call stopMainLoop to stop the current loop."
      );
      return;
    }

    this.afPeriod = 0.016;
    const self = this;
    function updateFrame(currTime) {
      self.afReq = window.requestAnimationFrame(updateFrame);
      loopFunction(data);

      // update keyCatcher only after loopFunction finished
      self.keyCatcher = {};
      for (var k in self.keyState)
        if (self.keyState[k]) self.keyCatcher[k] = true;
    }
    // Execute mainLoop until LAG IS LESS THAN PERIOD TODO
    this.afReq = window.requestAnimationFrame(updateFrame);
  }

  stopMainLoop() {
    if (this.afReq == null) {
      console.log(
        "stopMainLoop has been called when no loop is currently executing."
      );
      return;
    }

    cancelAnimationFrame(this.afReq);
    this.afReq = null;
  }

  getPeriod() {
    if (this.afReq == null) {
      console.log(
        "getPeriod has been called when no loop is currently executing; returning 0."
      );
      return 0;
    }

    return this.afPeriod;
  }
  getScreenHeight() {
    return this.canvasHeight;
  }

  getScreenWidth() {
    return this.canvasWidth;
  }

  callOnClick(callback) {
    if (typeof callback != "function") {
      console.log("callOnClick callback must be a function");
      return;
    }
    this.clickCallback = callback;
  }
  getMouseX() {
    if (this.afReq == null) {
      console.log(
        "getMouseX only works when a game loop has been started by startMainLoop."
      );
      return false;
    }
    return this.lastMouseX;
  }

  getMouseY() {
    if (this.afReq == null) {
      console.log(
        "getMouseY only works when a game loop has been started by startMainLoop."
      );
      return false;
    }

    return this.lastMouseY;
  }

  isKeyHeld(key) {
    if (typeof key !== "string") {
      console.log('the "key" argument for "isKeyHeld" has to be a string');
      return;
    }

    if (this.afReq == null) {
      console.log(
        "isKeyHeld only works when a game loop has been started by startMainLoop."
      );
      return false;
    }

    return key in this.keyCatcher;
  }
  playSound(soundName, assetPath = "assets/sounds") {
    const soundElementId = `__${soundName}__`;
    let sound = document.getElementById(soundElementId);
    if (!sound) {
      sound = document.createElement("audio");
      sound.setAttribute("id", soundElementId);
      const source = document.createElement("source");
      source.setAttribute("src", `${assetPath}/${soundName}.wav`);
      sound.appendChild(source);
      document.getElementsByTagName("head")[0].appendChild(sound);
    }
    sound.currentTime = 0;
    sound.play();
  }
  pauseSound(soundName) {
    const soundElementId = `__${soundName}__`;
    let sound = document.getElementById(soundElementId);
    if (!sound) {
      console.log(`Sound ${soundName} was not found.`);
      return;
    }
    sound.pause();
  }
  isSoundPlaying(soundName) {
    const soundElementId = `__${soundName}__`;
    let sound = document.getElementById(soundElementId);

    if (!sound) {
      console.log(`Sound ${soundName} was not found.`);
      return;
    }
    return !sound.paused;
  }
  getScreenPixels() {
    var ctx = this.canv.getContext("2d");
    return new ScreenPixels(
      ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data,
      this.canvasWidth,
      this.canvasHeight
    );
  }
  writeParagraph(htmlParagraph) {
    const paragraphObjectName = "paragraph"
    const paragraph = document.getElementById(paragraphObjectName);
    paragraph.innerHTML = htmlParagraph;
  }
}

class ScreenPixels {
  constructor(data, width, height) {
    this.data = data;
    this.height = height;
    this.width = width;
  }
  getPixel(x, y) {
    y = this.height - y;
    const index = (y * this.width + x) * 4;
    return this.data.slice(index, index + 4);
  }
}
