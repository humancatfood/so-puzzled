(function ($) {
  'use strict';

  var React = require('react');
  var calculateGrid = require('./utils/calculate-grid.js');

  module.exports = React.createClass({

    getInitialState: function () {
      return {
        msg: '',
        display: null
      };
    },

    componentDidMount: function () {

      var $img = $(this.refs.img);
      var that = this;

      $img.load(function () {

        that.setState({
          msg: 'memorize this image:'
        });


        setTimeout (function () {

          var grid = calculateGrid($img);
          var display = [];
          var src = $img.attr('src');

          for (var i = 0, l = grid.width * grid.height; i < l; i += 1)
          {
            var positionerStyle = {
              width: grid.pieces.width,
              height: grid.pieces.height
            };

            var pieceStyle = {
              position: 'absolute',
              left: i * grid.pieces.width * -1
            };

            display.push((
               <div className="piece-positioner" data-id={i} style={positionerStyle}>
                 <div className="piece-wrapper" data-id={i}>
                   <img src={src} className="piece" />
                 </div>
               </div>
            ));
          }


          that.setState({
            msg: '',
            display: display
          });


          $img.addClass('invisible');

        }, 500);


      });

    },

    renderBaseImg: function () {
      return (
        <img src={this.props.img}
             className="base-img"
             ref="img"
             width="100%" height="100%" />
      );
    },

    renderGrid: function () {
      return (
        <div className="game-grid">
          {this.state.display}
        </div>
      );
    },

    render: function() {

      return (
        <div className="game-wrapper">

          {this.renderBaseImg()}
          {this.renderGrid()}

        </div>
      );

    }
  });

}(window.jQuery));
