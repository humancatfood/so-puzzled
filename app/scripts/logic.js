(function ($) {
  'use strict';


  function GameLogic($grid, $stage, $img) {

    this.$grid = $grid;
    this.$stage = $stage;
    this.$img = $img;

  }


  GameLogic.prototype.start = function () {

    this.$img.addClass('invisible');

    var that = this;

    this.$grid.find('.piece-positioner').each(function () {
      var $piecePositioner = $(this);
      var $piece = $piecePositioner.find('.piece-wrapper');

      setTimeout(function () {
        that.scramblePiece($piece);
        $piece.addClass('scramble');
      }, 500);

      $piece.draggable({
        stack: '.piece-wrapper',
        snap: '.piece-positioner',
        snapMode: 'inner',
        snapTolerance: Math.max($piece.width(), $piece.height()) / 4,
        containment: that.$stage,
        start: function () {
          $piece.removeClass('animated');
        },
        stop: function () {
          $piece.addClass('animated');
        }
      });

      $piecePositioner.droppable({
        tolerance: "intersect",
         drop: function( event, ui ) {
           var $this = $(this);
           var $piece = $(ui.draggable);

           $piece.offset($this.offset());

           var $currentPiece = $this.data('currentPiece');
           if ($currentPiece && $currentPiece.data('id') !== $piece.data('id'))
           {
             that.scramblePiece($currentPiece);
           }

           if ($piece.data('id') === $this.data('id'))
           {
             $this
               .addClass('done')
               .droppable('destroy');

             $piece
               .draggable('destroy');
           }

           $this.data('currentPiece', $piece);
           $piece.removeClass('scramble');

           console.log(that.isFinished());

         },
         out: function (event, ui) {
           var $piece = $(ui.draggable);
           var $currentPiece = $(this).data('currentPiece');

           if ($currentPiece && $currentPiece.data('id') === $piece.data('id'))
           {
             $(this).data('currentPiece', null);
             $piece.addClass('scramble');
           }
         }
      });

    });

    $(window).resize(function () {

      that.$grid.find('.piece-positioner').each(function () {
        var $piecePositioner = $(this);
        var $piece = $piecePositioner.data('current-piece');
        if ($piece)
        {
          $piece
            .removeClass('animated')
            .offset($piecePositioner.offset())
            .addClass('animated');
        }

        that.scramblePiece($piecePositioner.find('.piece-wrapper.scramble'));

      });

    });

  };


  GameLogic.prototype.isFinished = function () {
    var allCorrectlyPlaced;
    $('.piece-positioner').each(function () {

      allCorrectlyPlaced = $(this).data('currentPiece') && $(this).data('currentPiece').data('id') === $(this).data('id');
      return !!allCorrectlyPlaced;

    });

    return !!allCorrectlyPlaced;
  };


  GameLogic.prototype.scramblePiece = function ($piece) {

    var pieceWidth = $piece.width();
    var pieceHeight = $piece.height();

    $piece.offset({
      top: this.$stage.height() - (pieceHeight+ Math.random() * pieceHeight * 2),
      left: pieceWidth + Math.random() * (this.$stage.width() - pieceWidth * 2)
    });

  };


  module.exports = GameLogic;

}(window.jQuery));




