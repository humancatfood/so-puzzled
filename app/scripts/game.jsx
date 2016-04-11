'use strict';

var React = require('react');
var GameStateStart = require('./game-state-start.jsx');
var GameStateRunning = require('./game-state-running.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      currentGameState: (<GameStateStart onStart={this.start} />)
    };
  },

  toggleHelp: function () {
    this.setState({
      help: !this.state.help
    });
  },

  start: function () {
    this.setState({
      currentGameState: (<GameStateRunning img={this.props.img} />)
    });
  },

  render: function() {

    return this.state.currentGameState;

  }

});
