# Game Maker

## Introduction

"Game Maker" is a simple game engine.
It is meant to be used as a infrastructure for building games for educational/fun purposes.

## Prerequisites for working with the game engine

- Background in HL programming
- Basic understanding of high-school level math/physics.
- **Optional:** HTML/Javascript

## API

**Fill**

```
// positions is a an array of [x,y] pairs
fillPixels(positions, red, green, blue, alpha)
// x, y in the center of the rectangle
fillRectangle(x, y, width, height, color)
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
```

**Sound**

```
// soundName is the name of the wav file inside assets/sounds without the .wav
playSound(soundName)
pauseSound(soundName)
isSoundPlaying(soundName)
```

**Loop**

```
// the data will be passed to the loopFunction
startMainLoop(loopFunction, data);
stopMainLoop();
getPeriod();
```

**User Input**

```
// signature: callback(x, y)
callOnClick(callback)
getMouseX()
getMouseY()
isKeyHeld(keyName)
```

### See Also

The game engine was based on: www.spellenmaken.com, made by @adeshar00 .
