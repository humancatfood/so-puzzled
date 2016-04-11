(function ($) {
  'use strict';

  var React = require('react');
  var calculateGrid = require('./utils/calculate-grid.js');

  module.exports = React.createClass({

    getInitialState: function () {
      return {
        display: null
      };
    },

    componentDidMount: function () {

      var $img = $(this.refs.img);
      var $stage = $(this.refs.stage)
      var that = this;

      $img.load(function () {

        setTimeout (function () {

          var grid = calculateGrid($img);
          var display = [];
          var src = $img.attr('src');
          var row, pieceStyle ;
          var id = 0;

          var positionerStyle = {
            width: grid.pieces.width,
            height: grid.pieces.height
          };

          for (var y = 0; y < grid.height; y += 1)
          {
            row = [];
            for (var x = 0; x < grid.width; x += 1)
            {
              pieceStyle = {
                position: 'absolute',
                width: grid.image.width,
                height: grid.image.height,
                left: x * grid.pieces.width * -1,
                top: y * grid.pieces.height * -1
              };
              id += 1;

              row.push((
                <td className="piece-positioner" data-id={id} style={positionerStyle}>
                  <div className="piece-wrapper" data-id={id} >
                    <img src={src} className="piece" style={pieceStyle} />
                  </div>
                </td>
              ));
            }

            display.push((
              <tr>
                {row}
              </tr>
            ))
          }


          that.setState({
            display: display
          });


          $img.addClass('invisible');

          $('.piece-wrapper').each(function () {

            $(this)
              .offset({
                top: $stage.height() - (grid.pieces.height + Math.random() * grid.pieces.height * 2),
                left: grid.pieces.width + Math.random() * ($stage.width() - grid.pieces.width * 2)
              });
          });

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
        <table className="game-grid">
          <tbody>
            {this.state.display}
          </tbody>
        </table>
      );
    },

    renderStage: function () {
      return (
        <div ref="stage" className="stage"></div>
      );
    },

    render: function() {

      return (
        <div className="game-wrapper">

          {this.renderStage()}
          {this.renderBaseImg()}
          {this.renderGrid()}

        </div>
      );

    }
  });

}(window.jQuery));
