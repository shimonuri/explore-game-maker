"use strict";

/*
 * Spellen Maken Helper Library  Version 0.00
 *
 *
 * TODO clean this up, and maybe move it to the doc page
 * Talk about how this is written:
 * Readability for folks who are new coders or unfamiliar with JavaScript the highest priority
 * NOT written for performance, or to be elegant or as an example of good coding practice
 * This is written so that what the code is doing is as transparent as possible, so it's
 *  easy to edit or replace with one's own code.
 *
 * Input uses KeyboardEvent.key values, meaning that key position will depend on players
 *  keyboard layout, and that holding SHIFT will result in different values.  I went this
 *  way because I believe it's the simplest to grasp (even though it's not robust). If
 *  you don't like this behavior, you'll probably want to use KeyboardEvent.code instead
 *
 * Document how keyCatcher and keyState work.  keyCatcher is NOT unset when a keyup event
 *  happens, so that if a player just TAPS a key really quick and the keyup happens before
 *  the next mainLoop, isKeyHeld still returns true for that key.  Instead, keyState is
 *  used to track both keyups and downs, and at the end of each mainLoop call the keyCatcher
 *  is purged and then updated with the values of keyState.
 *
 * Note that initMainLoop can take user data, in case they want to avoid using global
 *  variables.  Give example
 */

// Function "prototypes".  These are all defined in the anonymous function below
// TODO comment each of these like in a .h file; put them in the order that they're likely to be called in
var initCanvas; // need to call, etc.  returns canv if direct drawing desired
var startMainLoop;
var stopMainLoop;
var hlGetPeriod;
var clear;
var fillPixels;
var fillRectangle;
var getMouseX; // returns last mouse x coordinate, in canvas coordinates
var getMouseY;
var isKeyHeld; // takes KeyboardEvent.key value as arg; link to mdn doco
var getScreenWidth;
var getScreenHeight;

(function () {
  // Variables
  var canvInitialized = false; // to warn if called more than once
  var keyCatcher = {};
  var keyState = {};
  var lastMouseX = 0; // last caught X coordinate of the mouse
  var lastMouseY = 0; // last caught Y coordinate of the mouse
  var afReq; // last animation frame request
  var afPeriod; // the frequency with which the game loop is being executed

  function warn(warningText) {
    /*
		Prints warnings.  Ufises an intrusive "alert" by default;
		if you find this annoying, feel free to delete the alert
		and use the console line instead (just remember to keep
		an eye on your console when debugging).
		*/
    // TODO have a bool passed to init canvas that converts alert -> console?

    alert("HL warning: " + warningText);
    //console.log("Warning: "+warningText);
  }

  function error(errorText) {
    /*
		Prints errors.  Uses an intrusive "alert" by default;
		if you find this annoying, feel free to delete the alert
		and use the console line instead (just remember to keep
		an eye on your console when debugging).
		*/

    alert("HL error: " + errorText);
    //console.log("Error: "+errorText);
  }

  // Define all canvas-requiring functions to emit an error if they're called
  //  before initCanvas has been called
  clear = function () {
    warn("Calls to clear won't do anything until initCanvas has been called");
  };
  fillPixels = function () {
    warn(
      "Calls to fillPixels won't do anything until initCanvas has been called"
    );
  };
  fillRectangle = function () {
    warn(
      "Calls to fillRectangle won't do anything until initCanvas has been called"
    );
  };
  getMouseX = function () {
    warn(
      "Calls to getMouseX won't do anything until initCanvas has been called"
    );
  };
  getMouseY = function () {
    warn(
      "Calls to getMouseY won't do anything until initCanvas has been called"
    );
  };

  // Define initCanvas & canvas requiring functions

  initCanvas = function () {
    /* Injects a canvas into the html body
     * Defines Draw functions
     */

    // Emit warning if initCanvas has already been called
    if (canvInitialized) {
      warn(
        "initCanvas has been called more than once.  This will result in unusable canvases littering the page."
      );
    }
    canvInitialized = true;

    var canv = document.getElementById("game"); // creates a canvas DOM element
    var canvasWidth = canv.width;
    var canvasHeight = canv.height;
    clear = function (color = "black") {
      if (typeof color !== "string") {
        error('the "color" argument for "clear" has to be a string');
        return;
      }

      canv.getContext("2d").clearRect(0, 0, canvasWidth, canvasHeight);
      canv.style.backgroundColor = color;
    };

    fillPixels = function (locations, r, g, b, a) {
      for (const c of [r, g, b, a]) {
        if (typeof c !== "number") {
          console.log("r, g, b, a arguments for fillPixels must be numbers");
        }
      }
      var ctx = canv.getContext("2d");
      var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      var data = imageData.data;
      for (const [x, y] of locations) {
        const index = (y * canvasWidth + x) * 4;
        data[index] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = a;
      }
      ctx.putImageData(imageData, 0, 0, 0, 0, canvasWidth, canvasHeight);
    };

    fillRectangle = function (x, y, width, height, color) {
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
      ctx.fillRect(x - width / 2, canvasHeight - height / 2 - y, width, height);
      ctx.fillStyle = "#f0f"; // To make color errors more obvious
    };

    // Update lastMouseX/Y coordinates on mousemove events

    canv.addEventListener("mousemove", function (e) {
      var cr = canv.getBoundingClientRect();
      lastMouseX = e.clientX - cr.x;
      lastMouseY = canvasHeight - (e.clientY - cr.y);
    });

    // Getter functions

    getScreenHeight = function () {
      return canvasHeight;
    };

    getScreenWidth = function () {
      return canvasHeight;
    };

    getMouseX = function () {
      if (afReq == null) {
        warn(
          "getMouseX only works when a game loop has been started by startMainLoop."
        );
        return false;
      }
      return lastMouseX;
    };

    getMouseY = function () {
      if (afReq == null) {
        warn(
          "getMouseY only works when a game loop has been started by startMainLoop."
        );
        return false;
      }

      return lastMouseY;
    };

    // Set background color to default
    clear();

    return canv;
  };

  // Game loop functions

  startMainLoop = function (loopFunction, period = 0.016, data = null) {
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
  };

  stopMainLoop = function () {
    if (afReq == null) {
      warn("stopMainLoop has been called when no loop is currently executing.");
      return;
    }

    cancelAnimationFrame(afReq);
    afReq = null;
  };

  hlGetPeriod = function () {
    if (afReq == null) {
      warn(
        "hlGetPeriod has been called when no loop is currently executing; returning 0."
      );
      return 0;
    }

    return afPeriod;
  };

  // Keyboard handling

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

  isKeyHeld = function (key) {
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
  };
})();

initCanvas();
