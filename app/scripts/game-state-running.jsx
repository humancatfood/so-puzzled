(function ($) {
  'use strict';

  var React = require('react');
  var GameGrid = require('./grid.jsx');
  var GameLogic = require('./logic.js');

  module.exports = React.createClass({

    getInitialState: function () {
      return {
        grid: null
      };
    },

    componentDidMount: function () {

      var that = this;

      $(this.refs.img).load(function () {

        setTimeout (function () {

          that.setState({
            showGrid: true
          });

        }, 2000);

      });

    },

    setupGameLogic: function (grid) {

      var logic = new GameLogic(
        $(grid),
        $(this.refs.stage),
        $(this.refs.img)
      );

      logic.start();

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

}(window.jQuery));
