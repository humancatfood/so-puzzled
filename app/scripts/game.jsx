(function () {
  'use strict';

  var React = require('react');
  var GameStateStart = require('./game-state-start.jsx');
  var GameStateRunning = require('./game-state-running.jsx');

  // The Game-object. In a larger application should probably be split up more, with
  // React JUST providing the presentation layer and the logic factored into it's own
  // object, but for a small project like this it's just too convenient.
  module.exports = React.createClass({

    // called by React to set up the initial state
    getInitialState: function() {
      return {
        // the first state that we see in the game, the start-state, with an explanation
        // how to play, etc.
        // TODO: pass the on-start callback more elegantly, or use Flux!
        currentGameState: (<GameStateStart onStart={this.start} />)
      };
    },

    // changes to the game state that actually runs the game.
    start: function () {
      this.setState({
        currentGameState: (<GameStateRunning img={this.props.img} />)
      });
    },

    // Render the game
    render: function() {

      return this.state.currentGameState;

    }

  });

}());
