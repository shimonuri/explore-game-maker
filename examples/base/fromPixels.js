function fillRectangleFromPixels(x, y, width, height, r, g, b, a, gameEngine) {
  locations = [];
  var i;
  for (i = 0; i < width / 2; i += 1) {
    var j;
    for (j = 0; j < height / 2; j++) {
      locations.push([x + i, y + j]);
      locations.push([x - i, y + j]);
    }
    for (j = 0; j < height / 2; j++) {
      locations.push([x + i, y - j]);
      locations.push([x - i, y - j]);
    }
  }
  gameEngine.fillPixels(locations, r, g, b, a);
}
