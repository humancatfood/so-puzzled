(function ($) {
  'use strict';

  var React = require('react');

  module.exports = React.createClass({

    getInitialState: function () {
      var $img = this.props.$img;

      return {
        imgSrc: $img.attr('src'),
        imgWidth: $img.width(),
        imgHeight: $img.height()
      };

    },

    componentDidMount: function () {

      this.props.onLoad && this.props.onLoad(this.refs.table);

      var that = this;
      $(window).resize(function () {
        that.setState({
          imgWidth: that.props.$img.width(),
          imgHeight: that.props.$img.height()
        })
      });

    },

    render: function () {

      var imgSrc = this.state.imgSrc;
      var imgWidth = this.state.imgWidth;
      var imgHeight = this.state.imgHeight;

      var gridWidth = Math.round(imgWidth / this.props.pieceSize);
      var gridHeight = Math.round(imgHeight / this.props.pieceSize);

      var pieceWidth = imgWidth / gridWidth;
      var pieceHeight = imgHeight / gridHeight;

      var runningID = 0;

      var cellStyle = {
        width: pieceWidth,
        height: pieceHeight
      };

      var grid = [];
      for (var y = 0; y < gridHeight; y += 1)
      {
        var row = [];

        for (var x = 0; x < gridWidth; x += 1)
        {
          var pieceStyle = {
            width: imgWidth,
            height: imgHeight,
            left: x * pieceWidth * -1,
            top: y * pieceHeight * -1
          };
          runningID += 1;

          row.push((
            <td className="piece-positioner" data-id={runningID} style={cellStyle}>
              <div className="piece-wrapper animated" data-id={runningID} >
                <img src={imgSrc} className="piece" style={pieceStyle} />
              </div>
            </td>
          ));

        }

        grid.push((
          <tr>
            {row}
          </tr>
        ))
      }

      return (
        <table ref="table" className="game-grid">
          <tbody>
            {grid}
          </tbody>
        </table>
      );
    }

  });


}(window.jQuery));
