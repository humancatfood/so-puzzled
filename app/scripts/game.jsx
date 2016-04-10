'use strict';

var React = require('react');

module.exports = React.createClass({

  states: {
    START: require('./game-state-start.jsx'),
    RUNNING: require('./game-state-running.jsx'),
    FINISHED: require('./game-state-finished.jsx')
  },

  getInitialState: function() {
    return {
      currentGameState: this.states.RUNNING
    };
  },

  render: function() {

    return (
      <div>
        <this.state.currentGameState img={this.props.img} />
      </div>
    );

  }

});
