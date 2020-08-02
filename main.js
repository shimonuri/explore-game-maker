"use strict";

// initializing the game engine
const gameEngine = new GameEngine();

/**
 * Run a single loop of the game.
 * @param {object}   data    the game state.
 */
function mainLoop(data) {
  console.log("hello");
}

gameEngine.startMainLoop(mainLoop, {});
