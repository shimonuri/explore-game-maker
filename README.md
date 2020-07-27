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
// positions is a an array of [x,y] pairs
// x, y in the center of the rectangle
fillPixels(positions, red, green, blue, alpha)
  // fill pixels with coordinates 0,0 and 0,1 in red color
  > gameEngine.fillPixels([[0,0], [0, 1]], 255, 0, 0 , 255)
clear()
getScreenWidth()
getScreenHeight()
// returns ScreenPixels object with getPixel(x, y) API.
getScreenPixels()
```

**Text**

```
// htmlParahraph to write. use <b></b> or <br/> for bold/new line
writeParagraph(htmlParagraph)
  > gameEngine.writeParagraph("<br>hello</br> world")
```

**Sound**

```
// soundName is the name of the wav file inside assets/sounds without the .wav
playSound(soundName)
  > gameEngine.playSound("badBoing");
pauseSound(soundName)
  > gameEngine.pauseSound("badDoing"); // will pause badDoing 
isSoundPlaying(soundName)
```

**Loop**

// loopFunction signature: loopFunction( )
// the data will be passed to the loopFunction
startMainLoop(loopFunction, data);
```
> function loopFunction() {
  gameEngine.clear();
}
> gameEngine.startMainLoop(loopFunction)
```
stopMainLoop();

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
callOnClick(callback)
  
/*
  reutrns current X and Y coordinates
*/
getMouseX()
getMouseY()

/*
  returns whether a key is clilcked (true or false)
  see https://keycode.info/ to get keys names (event.key). for example:
  
  isKeyHeld(" ") // returns true if space is clicked
  isKeyHeld("ArrowRight") // returns true if arrow right is clicked
*/
isKeyHeld(keyName)

```

### See Also

The game engine was based on: www.spellenmaken.com, made by @adeshar00 .
