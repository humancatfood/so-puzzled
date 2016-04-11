module.exports = function setupGrid ($img) {
  'use strict';

  var gridW = 4,
      gridH = 3,
      imgW = $img.width(),
      imgH = $img.height();

  // TODO: do something more clever here to make the pieces more square
  return {
    width: gridW,
    height: gridH,
    image: {
      width: imgW,
      height: imgH
    },
    pieces: {
      width: imgW / gridW,
      height: imgH / gridH
    }
  };

};
