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

- fillPixels(locations, red, green, blue, alpha)
- fillRectangle(x, y, width, height, color)
- clear()
- getScreenWidth()
- getScreenHeight()

**Sound**

```
 # sound name is the name of the wav file inside assets/sounds without the .wav
playSound(soundName)
pauseSound(soundName)
```

**Loop**

- startMainLoop(loopFunction, data);
- stopMainLoop();
- getPeriod();

**User Input**

- getMouseX()
- getMouseY()
- isKeyHeld(keyName)

### See Also

The exercise is based on: www.spellenmaken.com
