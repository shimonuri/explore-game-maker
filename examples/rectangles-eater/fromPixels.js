function fillRectangleFromPixels(x, y, width, height, r, g, b, a) {
  locations = [];
  var i;
  for (i = 0; i < width; i += 1) {
    var j;
    for (j = 0; j < height; j++) {
      const xPos = x + i;
      const yPos = getScreenHeight() - (y + j);
      locations.push([xPos, yPos]);
    }
  }
  fillPixels(locations, r, g, b, a);
}
