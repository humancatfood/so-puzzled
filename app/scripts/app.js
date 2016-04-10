var React = require('react');
var ReactDOM = require('react-dom');

var Game = require('./game.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div className="jumbotron">
        <h1>So Puzzled</h1>
        <Game img="images/kitty.jpg" />
      </div>
    );
  }
});


ReactDOM.render(<App />, document.getElementById("app"));

