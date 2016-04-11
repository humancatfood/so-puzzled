(function ($) {
  'use strict';

  var React = require('react');
  var GameGrid = require('./grid.jsx');

  module.exports = React.createClass({

    getInitialState: function () {
      return {
        grid: null
      };
    },

    componentDidMount: function () {

      var $img = $(this.refs.img);
      var $stage = $(this.refs.stage)
      var that = this;

      $img.load(function () {

        setTimeout (function () {

          that.setState({
            showGrid: true
          });

          $img.addClass('invisible');

        }, 500);


      });

    },

    setupGameLogic: function () {
      console.log("setupGameLogic");

    },

    renderBaseImg: function () {
      return (
        <img src={this.props.img}
             className="base-img"
             ref="img"
             width="100%" height="100%" />
      );
    },

    renderGrid: function () {
      if (this.state.showGrid)
      {
        console.log("render");
        return (
          <GameGrid ref="grid" $img={$(this.refs.img)} width={4} height={3} onLoad={this.setupGameLogic} />
        );
      }
      else
      {
        return null;
      }
    },

    renderStage: function () {
      return (
        <div ref="stage" className="stage"></div>
      );
    },

    render: function() {

      return (
        <div className="game-wrapper">

          {this.renderStage()}
          {this.renderBaseImg()}
          {this.renderGrid()}

        </div>
      );

    }

  });


  function checkIfDone()
  {
    var allCorrectlyPlaced;
    $('.piece-positioner').each(function () {

      allCorrectlyPlaced = $(this).data('currentPiece') && $(this).data('currentPiece').data('id') === $(this).data('id');
      return !!allCorrectlyPlaced;

    });

    return !!allCorrectlyPlaced;
  }

}(window.jQuery));
