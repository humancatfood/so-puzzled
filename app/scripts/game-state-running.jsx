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

      logic.setCallback(logic.events.FINISHED, function () {
        window.alert('You did it!! (reload the window to play again)');
      });

      this.setState({
        logic: logic
      });

    },

    renderMenu: function () {
      var logic = this.state.logic;
      var that = this;

      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-brand">
              So Puzzled!
            </div>
            <label className="navbar-text pull-right" htmlFor="help">
              <input id="help" type="checkbox" ref="help"
                     disabled={!logic}
                     onChange={toggleHelp}/>&nbsp;Need Help?
            </label>
          </div>
        </nav>
      );

      function toggleHelp ()
      {
        logic && logic.toggleHelp(!!that.refs.help.checked);
      }
    },

    renderBaseImg: function () {
      return (
        <img src={this.props.img}
             className="base-img"
             ref="img"   />
      );
    },

    renderGrid: function () {
      if (this.state.showGrid)
      {
        return (
          <GameGrid ref="grid" $img={$(this.refs.img)} pieceSize={120} onLoad={this.setupGameLogic} />
        );
      }
      else
      {
        return null;
      }
    },

    renderStage: function () {
      return (
        <div ref="stage" className="container stage"></div>
      );
    },

    render: function() {

      return (
        <div>

          {this.renderMenu()}
          <div className="game-wrapper">
            {this.renderStage()}
            <div className="grid-wrapper">
              {this.renderBaseImg()}
              {this.renderGrid()}
            </div>
          </div>

        </div>
      );

    }

  });

}(window.jQuery));
