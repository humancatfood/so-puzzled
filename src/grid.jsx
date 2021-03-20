import React, { useEffect, useRef, useState } from 'react'



/** The grid where the puzzle pieces are placed.
 *  The application flow is set up so that this grid is created & rendered
 *  AFTER the base-image is loaded and displayed. The image's is described in
 *  the css to maintain EXACTLY the shape we need to set up the game around it,
 *  therefore you will find a LOT of references to the image's dimensions here!
 */
export default function Grid({imgSrc, $img, onLoad, pieceSizeRatio}) {

  const [state, setState] = useState({
    imgWidth: $img.width,
    imgHeight: $img.height,
  })

  const tableRef = useRef()

  useEffect(() => {
    // TODO: make this callback somehow more elegant
    onLoad(tableRef.current);
  }, [onLoad])

  useEffect(() => {
    // After the component is rendered, we keep track of the window's resize events.
    // If one is fired, we rely on the image being resized correctly (via css) so we
    // can use it to update the state.
    const onResize = () => setState(state => ({
      ...state,
      imgWidth: $img.width,
      imgHeight: $img.height
    }))

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)

  }, [$img.width, $img.height])

  const {imgWidth,imgHeight} = state

  // the desired piece-size is set to be roughly 1 / pieceSizeRatio of the shorter side of the image.
  const desiredPieceSize = Math.min(imgWidth, imgHeight) / pieceSizeRatio;

  // Here we calculate how many rows and columns we can make from those sizes ..
  const gridWidth = Math.round(imgWidth / desiredPieceSize);
  const gridHeight = Math.round(imgHeight / desiredPieceSize);

  // .. and set the ACTUAL pieceSize so the pieces will fit into such a grid
  const pieceWidth = imgWidth / gridWidth;
  const pieceHeight = imgHeight / gridHeight;

  // an id to give to the grid-cells and their pieces to make it easier to check if a piece
  // has been placed correctly
  let runningID = 0;

  // the cells should be the same dimensiona as the pieces
  const cellStyle = {
    width: pieceWidth,
    height: pieceHeight
  };

  // Here we create the grid
  const grid = [];
  for (let y = 0; y < gridHeight; y += 1)
  {
    const row = [];

    for (let x = 0; x < gridWidth; x += 1)
    {

      // Each piece contains an <img> element that is negatively offset by the same distance as
      // the piece is from the image's origin.
      const pieceStyle = {
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
        <td key={x} className="piece-positioner" data-id={runningID} style={cellStyle}>
          <div className="piece-wrapper animated" data-id={runningID} >
            <img alt={`piece #${runningID}`} src={imgSrc} className="piece" style={pieceStyle} />
          </div>
        </td>
      ));

    }

    grid.push((
      <tr key={y}>
        {row}
      </tr>
    ))
  }

  return (
    <table ref={tableRef} className="game-grid">
      <tbody>
        {grid}
      </tbody>
    </table>
  );

}
