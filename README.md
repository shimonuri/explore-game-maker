# Game Maker

## Introduction

"Game Maker" is a simple game engine.
It is meant to be used as a infrastructure for building games for educational/fun purposes.

## Prerequisites for working with the game engine

- Background in HL programming
- Basic understanding of high-school level math/physics.
- **Optional:** HTML/Javascript

## API

**Color**

```
/*
  fill an array of pixels with RGBA colors.
  positions is an array of coordinates(x, y). for example:

  gameEngine.fillPixels([[0,0], [0, 1]], 255, 0, 0 , 255);
*/
fillPixels(positions, red, green, blue, alpha);

/*
  clear the screen from pixels
*/
clear();

/*
  get screen diminisons 
*/
getScreenWidth();
getScreenHeight();

/*
  return ScreenPixels object. use ScreenPixels.getPixel(x, y)
  to get RGBA status of the screen
*/
getScreenPixels();
```

**Text**

```
/*
  write an htmlParahraph to write. 
  use <b></b> or <br/> for bold/new line. for example:
  gameEngine.writeParagraph("<br>hello</br> world")
*/
writeParagraph(htmlParagraph);
```

**Sound**

```
/*
  plays a sound from assets/sounds. 
  note: soundName is the name of the wav file inside assets/sounds without the .wav. for example:

  gameEngine.playSound("badBoing");
*/
playSound(soundName);

/*
  pause a running sound. for example:

  gameEngine.pauseSound("badDoing");
*/
pauseSound(soundName);

/*
  whether a sound is currently being played.
*/
isSoundPlaying(soundName);
```

**Loop**

```
/*
  runs the loopFunction to update screen.
  the data will be passed to the loopFunction. for example:

  function loopFunction() {
    gameEngine.clear();
  }
  gameEngine.startMainLoop(loopFunction);
*/
startMainLoop(loopFunction, data);

stopMainLoop();

```

**User Input**

```
/*
  the function gets a callback and invokes it with coordinates
  when mouse is clicked. for example:

  function callback(x, y) {
    console.log(`y coordinate ${y}, x coordinate ${y}`);
  }
  gameEngine.callOnClick(callback);
*/
callOnClick(callback);
  
/*
  reutrns current X and Y coordinates
*/
getMouseX();
getMouseY();

/*
  returns whether a key is clilcked (true or false)
  see https://keycode.info/ to get keys names (event.key). for example:
  
  isKeyHeld(" ") // returns true if space is clicked
  isKeyHeld("ArrowRight") // returns true if arrow right is clicked
*/
isKeyHeld(keyName);

```

### See Also

The game engine was based on: www.spellenmaken.com, made by @adeshar00 .
