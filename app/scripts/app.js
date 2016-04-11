(function () {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');
  var Game = require('./game.jsx');

  // Kittycat :)
  var img = 'images/kitty.jpg';

  // render the game
  ReactDOM.render(<Game img={img} />, document.getElementById("app"));

}());
