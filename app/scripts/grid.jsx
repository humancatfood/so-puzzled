(function ($) {
  'use strict';

  var React = require('react');

  /** The grid where the puzzle pieces are placed.
   *  The application flow is set up so that this grid is created & rendered
   *  AFTER the base-image is loaded and displayed. The image's is described in
   *  the css to maintain EXACTLY the shape we need to set up the game around it,
   *  therefore you will find a LOT of references to the image's dimensions here!
   */
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

      // TODO: make this callback somehow more elegant
      this.props.onLoad && this.props.onLoad(this.refs.table);

      // After the component is rendered, we keep track of the window's resize events.
      // If one is fired, we rely on the image being resized correctly (via css) so we
      // can use it to update the state.
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

      // props.pieceSize is passed to this component as a desired size for the pieces in pixel.

      // Here we calculate how many rows and columns we can make from those sizes ..
      var gridWidth = Math.round(imgWidth / this.props.pieceSize);
      var gridHeight = Math.round(imgHeight / this.props.pieceSize);

      // .. and set the ACTUAL pieceSize so the pieces will fit into such a grid
      var pieceWidth = imgWidth / gridWidth;
      var pieceHeight = imgHeight / gridHeight;

      // an id to give to the grid-cells and their pieces to make it easier to check if a piece
      // has been placed correctly
      var runningID = 0;

      // the cells should be the same dimensiona as the pieces
      var cellStyle = {
        width: pieceWidth,
        height: pieceHeight
      };

      // Here we create the grid
      var grid = [];
      for (var y = 0; y < gridHeight; y += 1)
      {
        var row = [];

        for (var x = 0; x < gridWidth; x += 1)
        {

          // Each piece contains an <img> element that is negatively offset by the same distance as
          // the piece is from the image's origin.
          var pieceStyle = {
            width: imgWidth,
            height: imgHeight,
            left: x * pieceWidth * -1,
            top: y * pieceHeight * -1
          };
          runningID += 1;

          // The 'animated' class gives the piece a css-transition when it is scrambled.
          // This allows us to quickly turn the transition off when we want to move the
          // piece around manually.
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
