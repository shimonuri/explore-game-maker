"use strict";

class GameEngine {
  constructor() {
    this.canv = document.getElementById("game"); // creates a canvas DOM element
    this.canvasWidth = this.canv.width;
    this.canvasHeight = this.canv.height;
    this.canv.addEventListener("mousemove", function (e) {
      var cr = canv.getBoundingClientRect();
      this.lastMouseX = e.clientX - cr.x;
      this.lastMouseY = canvasHeight - (e.clientY - cr.y);
    });

    window.addEventListener("keydown", function (e) {
      // TODO figure out how to bind shifted keys together;
      //  atm key down -> shift down -> key up -> shift up results in "stuck" key
      keyCatcher[e.key] = true;
      keyState[e.key] = true;
    });

    window.addEventListener("keyup", function (e) {
      keyState[e.key] = false;
    });

    window.addEventListener("blur", function () {
      keyCatcher = {};
      keyState = {};
    });
  }
  fillPixels(locations, r, g, b, a) {
    for (const c of [r, g, b, a]) {
      if (typeof c !== "number") {
        console.log("r, g, b, a arguments for fillPixels must be numbers");
      }
    }
    var ctx = this.canv.getContext("2d");
    var imageData = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
    var data = imageData.data;
    for (const [x, y] of locations) {
      const index = (y * this.canvasWidth + x) * 4;
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

    var ctx = canv.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(
      x - width / 2,
      this.canvasHeight - height / 2 - y,
      width,
      height
    );
    ctx.fillStyle = "#f0f"; // To make color errors more obvious
  }
  clear(color = "black") {
    if (typeof color !== "string") {
      error('the "color" argument for "clear" has to be a string');
      return;
    }

    this.canv
      .getContext("2d")
      .clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.canv.style.backgroundColor = color;
  }

  startMainLoop(loopFunction, period = 0.016, data = null) {
    /*
     * TODO rewrite or scratch all comments in here
     * This function ensures that the main loop runs at a fixed rate
     *
     * Rate is determined by the period argument (defaults to ~60 fps)
     * Note the the "prevTime" variable stores the time when the last
     *  update should have happened ideally; it does NOT store the time
     *  for when loopFunction executed last.
     * The "maxLag" constant determines how much "slack" to allow between
     *  prevTime and the current time.  Since this is written to allow for
     *  both physics and rendering updates to happen in the main loop, this
     *  is CURRENTLY (1.9) limited to under two frames worth of time, so it
     *  doesn't waste time rendering multiple frames consecutively.
     *  TODO maybe put this below next to maxLag
     *  TODO maybe if lag is 2+ frames big, set some variable which is
     *  checked in draw calls, so can catch up with physics without
     *  drawing unnecessarily?
     */

    if (typeof loopFunction !== "function") {
      error(
        'the "loopFunction" argument for "startMainLoop" has to be a function'
      );
      return;
    }
    if (typeof period !== "number") {
      error('the "period" argument for "startMainLoop" has to be a number');
      return;
    }
    if (typeof data !== "object") {
      error('the "data" argument for "startMainLoop" has to be a object');
      return;
    }

    if (afReq != null) {
      warn(
        "startMainLoop has already been called; call stopMainLoop to stop the current loop."
      );
      return;
    }

    afPeriod = period;
    const maxLag = 1.9 * period; // maximum amount of lag that will be compensated for, in seconds
    var prevTime; // time when the last update is considered to have happened

    function onFrame(currTime) {
      afReq = window.requestAnimationFrame(onFrame);

      // Adjust prevTime so lag never exceeds maxLag
      if (currTime - prevTime >= 1000 * maxLag)
        prevTime = currTime - 1000 * maxLag;

      // Execute mainLoop until LAG IS LESS THAN PERIOD TODO
      while (currTime - prevTime >= 1000 * period) {
        // TODO double check that keyboard event handling is never multithreaded
        //  and that it's impossible for keystroke to get lost between key check
        //  in the loopFunction and the keyCatcher purge below
        loopFunction(data);
        prevTime += 1000 * period;
        keyCatcher = {};
        for (var k in keyState) if (keyState[k]) keyCatcher[k] = true;
      }
    }
    prevTime = performance.now() - period;
    onFrame();
  }
  stopMainLoop() {
    if (afReq == null) {
      warn("stopMainLoop has been called when no loop is currently executing.");
      return;
    }

    cancelAnimationFrame(afReq);
    afReq = null;
  }

  getPeriod() {
    if (afReq == null) {
      warn(
        "getPeriod has been called when no loop is currently executing; returning 0."
      );
      return 0;
    }

    return afPeriod;
  }
  getScreenHeight() {
    return this.canvasHeight;
  }

  getScreenWidth() {
    return this.canvasHeight;
  }

  getMouseX() {
    if (afReq == null) {
      warn(
        "getMouseX only works when a game loop has been started by startMainLoop."
      );
      return false;
    }
    return this.lastMouseX;
  }

  getMouseY() {
    if (afReq == null) {
      warn(
        "getMouseY only works when a game loop has been started by startMainLoop."
      );
      return false;
    }

    return this.lastMouseY;
  }

  isKeyHeld(key) {
    if (typeof key !== "string") {
      error('the "key" argument for "isKeyHeld" has to be a string');
      return;
    }

    if (afReq == null) {
      warn(
        "isKeyHeld only works when a game loop has been started by startMainLoop."
      );
      return false;
    }

    return key in keyCatcher;
  }
}
