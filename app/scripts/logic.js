(function ($) {
  'use strict';


  function GameLogic($grid, $stage, $img) {

    this.$grid = $grid;
    this.$stage = $stage;
    this.$img = $img;

    this.callbacks = {};

  }

  GameLogic.prototype.events = {
    FINISHED: 0
  };

  GameLogic.prototype.start = function () {

    this.$img.addClass('transparent');

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

           if (that.isFinished())
           {
             var callback = that.callbacks[that.events.FINISHED];
             if (callback)
             {
               callback(that);
             }

           }

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

        $piecePositioner.find('.piece-wrapper.scramble').each(function (i, piece) {
          that.scramblePiece($(piece));
        });

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

    var pieceRect = $piece[0].getBoundingClientRect();
    var stageRect = this.$stage[0].getBoundingClientRect();
    var imgRect = this.$img[0].getBoundingClientRect();

    var rnd = Math.random;
    var top, left;

    if (stageRect.width > (imgRect.width + pieceRect.width * 3))
    {
      top = rnd() * (stageRect.height - pieceRect.height);

      if (rnd() > 0.5)
      {
        left = imgRect.right + rnd() * (stageRect.right - imgRect.right - pieceRect.width);
      }
      else
      {
        left = stageRect.left + rnd() * (imgRect.left - stageRect.left - pieceRect.width);
      }
    }
    else
    {
      left = stageRect.left + rnd() * (stageRect.right - pieceRect.width);
      top = imgRect.bottom + rnd() * (stageRect.bottom - imgRect.bottom - pieceRect.height);
    }

    $piece.offset({
      top: top,
      left: left
    });

  };


  GameLogic.prototype.toggleHelp = function (toggle) {

    if (toggle)
    {
      this.$img.addClass('semi-transparent');
    }
    else
    {
      this.$img.removeClass('semi-transparent');
    }

  };


  GameLogic.prototype.setCallback = function (event, callback) {
    this.callbacks[event] = callback;
  };


  module.exports = GameLogic;

}(window.jQuery));




