var ReactDOM = require('react-dom');
var Game = require('./game.jsx');

var img = 'images/kitty.jpg';

ReactDOM.render(<Game img={img} />, document.getElementById("app"));
