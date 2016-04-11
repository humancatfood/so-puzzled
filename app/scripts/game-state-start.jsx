(function () {
  'use strict';

  var React = require('react');

  // The first game state. It just shows an introduction and a button that the player can click
  // when they're ready.
  module.exports = React.createClass({

    render: function() {

      return (
        <div>
          <header className="page-header">
            <h1>So Puzzled!! <br /> <small>A little puzzle game for practice, written in React and jQueryUI</small></h1>
          </header>

          <section className="jumbotron text-center">

            <h2>How to play:</h2>

            <ol className="text-left inline-block">
              <li>Click the <strong className="">Start</strong> button</li>
              <li>Memorize the image</li>
              <li>Piece the image back together</li>
              <li>.. profit?</li>
            </ol>

            <p>
              <button type="button" className="btn btn-success btn-lg" onClick={this.props.onStart}>Start Puzzling</button>
            </p>

          </section>
        </div>
      );
    }

  })

}());
