function fillRectangleFromPixels(x, y, width, height, r, g, b, a, gameEngine) {
  locations = [];
  var i;
  for (i = 0; i < width; i += 1) {
    var j;
    for (j = 0; j < height; j++) {
      const xPos = x + i;
      const yPos = gameEngine.getScreenHeight() - (y + j);
      locations.push([xPos, yPos]);
    }
  }
  gameEngine.fillPixels(locations, r, g, b, a);
}
