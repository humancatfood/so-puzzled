const $ = window.jQuery

// This class encapsulates the game's logic and the interactions with jQueryUI.
// TODO: split those things up.
function GameLogic(grid, stage, img) {

  this.$grid = $(grid);
  this.$stage = $(stage);
  this.$img = $(img);

  // this callbacks object, the 'GameLogic.prototype.events', and the 'setCallback' method
  // create a super simple pub/sub functionality
  this.callbacks = {};

}


// an enum
GameLogic.prototype.events = {
  FINISHED: 0
};


// When the start method is called ..
GameLogic.prototype.start = function () {

  // .. we hide the base-image ..
  this.$img.addClass('transparent');

  var that = this;

  // .. then iterate over the grid's cells and for each cell ..
  this.$grid.find('.piece-positioner').each(function () {
    var $piecePositioner = $(this);
    // .. we find the contained piece.
    var $piece = $piecePositioner.find('.piece-wrapper');

    // Each piece gets scrambled it (after a short random delay, so the pieces don't all do the same thing)
    setTimeout(function () {
      that.scramblePiece($piece);
      // (the class 'scramble' tells us that the piece should be scrambled again when the window resizes)
      $piece.addClass('scramble');
    }, 1000);

    // We make the piece draggable
    $piece.draggable({
      stack: '.piece-wrapper',    // this makes the currently dragged piece pop to the front of the z-buffer
      snap: '.piece-positioner',  // this makes it snap to the grid-cells
      snapMode: 'inner',
      snapTolerance: Math.max($piece.width(), $piece.height()) / 4, // kinda random snap-tolerance, found by trial-and-error
      containment: that.$stage,   // the pieces should be constrained to the stage div
      start: function () {
        // we don't want the piece to have a transition while we drag it!
        $piece.removeClass('animated');
      },
      stop: function () {
        $piece.addClass('animated');
      }
    });

    // The grid cell becomes a droppable target
    $piecePositioner.droppable({
      tolerance: "intersect",
        drop: function( event, ui ) {
          // when a piece is dropped in a cell ..
          var $this = $(this);
          var $piece = $(ui.draggable);

          // .. we first give it the same offset as the cell, to make sure it sits flush inside
          $piece.offset($this.offset());

          // then we check if there's already a piece in the cell (dropped pieces get stored in the
          // cell's data-attribute) and it's not the same one as the dropped one.
          var $currentPiece = $this.data('currentPiece');
          if ($currentPiece && $currentPiece.data('id') !== $piece.data('id'))
          {
            // if that's the case, scramble the old one
            that.scramblePiece($currentPiece);
          }

          // either way, we set the dropped one as the currentPiece ..
          $this.data('currentPiece', $piece);
          // .. and remove the 'scramble' class, so the piece doesn't get moved around if the window resizes
          $piece.removeClass('scramble');

          // if the piece has the same id as the cell, meaning it' in the right position, ..
          if ($piece.data('id') === $this.data('id'))
          {
            $this
              .addClass('done')        // .. we add the class 'done' to it, which removes the cell's border ..
              .droppable('destroy');   // .. and remove the drag/drop functionality

            $piece
              .draggable('destroy');
          }

          // last we check if the puzzle is solved
          if (that.isFinished())
          {
            // if that's the case and there's a callback subscribed for this ..
            var callback = that.callbacks[that.events.FINISHED];
            if (callback)
            {
              // we call it
              callback(that);
            }

          }

        },
        out: function (event, ui) {
          // when we move a piece out of a cell ..
          var $piece = $(ui.draggable);
          var $currentPiece = $(this).data('currentPiece');

          // .. we check whether it just happened to be sitting there, or whether it was dropped here on purpose.
          if ($currentPiece && $currentPiece.data('id') === $piece.data('id'))
          {
            // in the later case, we unset the droppable's current piece ..
            $(this).data('currentPiece', null);
            // .. and re-add the 'scramble' class
            $piece.addClass('scramble');
          }
        }
    });

  });

  // lastly we listen to the window resizing
  $(window).resize(function () {

    // if the window resizes, we go through all the grid cells
    that.$grid.find('.piece-positioner').each(function () {
      var $piecePositioner = $(this);

      // if they have a current piece attached ..
      var $piece = $piecePositioner.data('current-piece');
      if ($piece)
      {
        // .. we give it the same new offset as the cell
        $piece
          .removeClass('animated')
          .offset($piecePositioner.offset())
          .addClass('animated');
      }

      // alse we check on the cell's actual piece (as opposed to iterating over the
      // pieces in a separate loop) and if it has the scramble class, we scramble it.
      $piecePositioner.find('.piece-wrapper.scramble').each(function (i, piece) {
        that.scramblePiece($(piece));
      });

    });

  });

};


// Check if the puzzle is solved
GameLogic.prototype.isFinished = function () {
  var allCorrectlyPlaced;

  // iterate over each cell ..
  $('.piece-positioner').each(function () {

    // and check whether the attached piece has the same data-attribute id as the cell
    allCorrectlyPlaced = $(this).data('currentPiece') && $(this).data('currentPiece').data('id') === $(this).data('id');

    // if that's not the case, we return the overall result, which is now false, which gives us a nice early-out
    return !!allCorrectlyPlaced;

  });

  return !!allCorrectlyPlaced;
};


// scramblePiece moves a piece to a random position somewhere in the viewport (represented by the stage)
GameLogic.prototype.scramblePiece = function ($piece) {

  var pieceRect = $piece[0].getBoundingClientRect();
  var stageRect = this.$stage[0].getBoundingClientRect();
  var imgRect = this.$img[0].getBoundingClientRect();

  var rnd = Math.random;
  var top, left;

  // if the stage is wider that the base-image plus 1 1/2 piece-widths on either side, we put the piece on the
  // sides.
  if (stageRect.width > (imgRect.width + pieceRect.width * 3))
  {
    // top position is somewhere along the height of the stage
    top = rnd() * (stageRect.height - pieceRect.height);

    // left position is either ..
    if (rnd() > 0.5)
    {
      // .. between the left window boundary and the base-image's left edge, or ..
      left = imgRect.right + rnd() * (stageRect.right - imgRect.right - pieceRect.width);
    }
    else
    {
      // .. between the base-image's right edge and the right window boundary
      left = stageRect.left + rnd() * (imgRect.left - stageRect.left - pieceRect.width);
    }
  }
  else
  {
    // if there's no space on the sides, we put the piece somewhere below the base-image (the
    // base-image has a max-height of 60vh to ensure that there's always enough space below it)
    left = stageRect.left + rnd() * (stageRect.right - pieceRect.width);
    top = imgRect.bottom + rnd() * (stageRect.bottom - imgRect.bottom - pieceRect.height);
  }

  $piece.offset({
    top: top,
    left: left
  });

};


// Toggle the help on or off.
GameLogic.prototype.toggleHelp = function (toggle) {

  if (toggle)
  {
    // help means the base-image is semi-transparent, so we can se where the pieces should go
    this.$img.addClass('semi-transparent');
  }
  else
  {
    this.$img.removeClass('semi-transparent');
  }

};


// attache a callback. Currently only used for the FINISH event
GameLogic.prototype.setCallback = function (event, callback) {
  this.callbacks[event] = callback;
};


export default GameLogic;
