function fillRectangleFromPixels(x, y, width, height, r, g, b, a, gameEngine) {
  let positions = [];
  var i;
  for (i = 0; i < width / 2; i += 1) {
    var j;
    for (j = 0; j < height / 2; j++) {
      positions.push([x + i, y + j]);
      positions.push([x - i, y + j]);
    }
    for (j = 0; j < height / 2; j++) {
      positions.push([x + i, y - j]);
      positions.push([x - i, y - j]);
    }
  }
  gameEngine.fillPixels(positions, r, g, b, a);
}

function fillCircleFromPixels(x, y, radius, densLevel, r, g, b, a, gameEngine) {
  let positions = [];
  for (let i = 0; i < densLevel; i += 1) {
    const deg = (i / densLevel) * (2 * Math.PI);
    const xPos = x + radius * Math.cos(deg);
    const yPos = y + radius * Math.sin(deg);
    positions.push([xPos, yPos]);
  }
  gameEngine.fillPixels(positions, r, g, b, a);
}
