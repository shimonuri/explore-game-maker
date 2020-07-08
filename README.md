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
// positions is a an array of [x,y] arrays
fillPixels(positions, red, green, blue, alpha)
// x, y in the center of the rectangle
fillRectangle(x, y, width, height, color)
clear()
getScreenWidth()
getScreenHeight()
```

**Sound**

```
// soundName is the name of the wav file inside assets/sounds without the .wav
playSound(soundName)
pauseSound(soundName)
```

**Loop**

```
startMainLoop(loopFunction, data);
stopMainLoop();
getPeriod();
```

**User Input**

```
getMouseX()
getMouseY()
isKeyHeld(keyName)
```

### See Also

The exercise is based on: www.spellenmaken.com
