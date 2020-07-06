function fillColoredCircleFromPixels(x, y, radius, densLevel, color) {
  var i;
  var currentRadius;
  for (i = 0; i < densLevel; i++) {
    currentRadius = i * (radius / densLevel);
    fillCircle(x, y, currentRadius, 80, color);
  }
}

function fillCircleFromPixels(x, y, radius, densLevel, color) {
  var i;
  var deg;
  for (i = 0; i < densLevel; i++) {
    deg = i * ((Math.PI * 2) / densLevel);
    fillPixel(x + radius * Math.cos(deg), y + radius * Math.sin(deg), color);
  }
}
function fillRectangleFromPixels(x, y, width, height, color, screenState) {
  var i;
  for (i = 0; i < width; i += 2) {
    var j;
    for (j = 0; j < height; j++) {
      if (!screenState) {
        fillPixel(x + i, y + j, color);
      } else {
        screenState.fillPixel(x + i, y + j, color);
      }
    }
  }
}
