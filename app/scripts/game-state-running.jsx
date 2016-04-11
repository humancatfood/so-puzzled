(function ($) {
  'use strict';

  var React = require('react');
  var GameGrid = require('./grid.jsx');
  var GameLogic = require('./logic.js');


  // The game state where the actual fun happens.
  module.exports = React.createClass({

    getInitialState: function () {
      return {
        // the state.grid is the initialised later, when the image has loaded.
        grid: null
      };
    },


    componentDidMount: function () {

      var that = this;

      // the component did mount, but the image might not have loaded completely yet, therefore
      // we attach this onLoad function.
      $(this.refs.img).load(function () {

        // The image has loaded (yay!). Now we set a short timeout of 2s so the player
        // has some time to memorize the image ..
        setTimeout (function () {

          // .. then we tell the component to show the grid (this will trigger a re-render)
          that.setState({
            showGrid: true
          });

        }, 2000);

      });

    },


    // Sets up the game logic (duh). This is called after the game-grid component has fully rendered.
    setupGameLogic: function (grid) {

      // Create a new instance of GameLogic, passing it the components it
      // requires (via their refs), ..
      var logic = new GameLogic(
        $(grid),
        $(this.refs.stage),
        $(this.refs.img)
      );

      // .. make it start, ..
      logic.start();

      // .. listen to when it finishes, ..
      logic.setCallback(logic.events.FINISHED, function () {
        window.alert('You did it!! (reload the window to play again)');
      });

      // .. and finally put it on the state (this causes a re-render with the need-help-button activated)
      this.setState({
        logic: logic
      });

    },


    // renders the "menu", ie the title-bar with the toggle-button to show the image
    renderMenu: function () {
      var logic = this.state.logic;
      var that = this;

      // while
      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-brand">
              So Puzzled!
            </div>
            <label className="navbar-text pull-right" htmlFor="help">
              <input id="help" type="checkbox" ref="help"
                     /*
                        While the game logic is not initialised yet, this button stays disabled.
                     */
                     disabled={!logic}

                     /**
                        Callback function that calls the game logic's toggleHelp method.
                        Kinda wish I had written this in ES6 now and could use arrow functions.
                     */
                     onChange={function () {
                       // TODO: keep track of the 'checked' state somehow better
                       logic.toggleHelp(!!that.refs.help.checked);
                     }}/>&nbsp;Need Help?

            </label>
          </div>
        </nav>
      );

    },


    // This renders the image below the grid
    renderBaseImg: function () {
      return (
        <img src={this.props.img}
             className="base-img"
             ref="img" />
      );
    },


    // This renders the GameGrid component
    renderGrid: function () {
      if (this.state.showGrid)
      {
        // The GameGrid component requires
        // - the image that we want to puzzle,
        // - the desired size for the puzzle-pieces, and
        // - this.setupGameLogic, as a callback method for when the grid is ready 
        //
        // TODO: pass this callback somehow more elegantly or use Flux.
        return (
          <GameGrid ref="grid" $img={$(this.refs.img)} pieceSize={120} onLoad={this.setupGameLogic} />
        );
      }
      else
      {
        return null;
      }
    },


    // renderStage renders a fixed-positioned <div> that spans the whole screen and serves as
    // a boundary for the scrambled puzzle-pieces and a reference to the visible area.
    // Not strictly necessary but on pages with a lot of moving parts I like to have an abstract
    // element like this to keep track of the viewport for me.
    renderStage: function () {
      return (
        <div ref="stage" className="container stage"></div>
      );
    },


    // The main render function. The more interesting bits are rendered in smaller functions
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
