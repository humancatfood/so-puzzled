'use strict';

var React = require('react');

module.exports = React.createClass({

  componentDidMount: function () {

    console.log("componentDidMount", this.refs.img);

  },

  render: function() {

    return (
      <div>
        <h2>Running</h2>
        <img src={this.props.img} ref="img" />
      </div>
    );

  }
});
