module.exports = function calculateGrid ($img) {
  'use strict';

  var gridW = 8,
      gridH = 6,
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
