import { useEffect, useMemo, useRef } from 'react'

import Piece from './Piece'

type GridProps = {
  imgSrc: string
  width: number,
  height: number,
  onLoad: (grid: HTMLTableElement|null) => void
  pieceSizeRatio: number
}


/** The grid where the puzzle pieces are placed.
 *  The application flow is set up so that this grid is created & rendered
 *  AFTER the base-image is loaded and displayed. The image's is described in
 *  the css to maintain EXACTLY the shape we need to set up the game around it,
 *  therefore you will find a LOT of references to the image's dimensions here!
 */
function Grid({ imgSrc, width, height, onLoad, pieceSizeRatio }: GridProps) {

  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    // TODO: make this callback somehow more elegant
    if (tableRef.current && width && height) {
      onLoad(tableRef.current)
    }
  }, [onLoad, width, height])

  const desiredPieceSize = Math.min(width, height) / pieceSizeRatio

  // Here we calculate how many rows and columns we can make from those sizes ..
  const gridWidth = Math.round(width / desiredPieceSize)
  const gridHeight = Math.round(height / desiredPieceSize)

  // .. and set the ACTUAL pieceSize so the pieces will fit into such a grid
  const pieceWidth = width / gridWidth
  const pieceHeight = height / gridHeight

  const img = useMemo(() => {
    const img = new Image(width, height)
    img.src = imgSrc
    return img
  }, [width, height, imgSrc])

  return (
    <table ref={tableRef} className="game-grid">
      <tbody>
        {Array(gridHeight).fill(0).map((_, y) => (
          <tr key={y}>
            {Array(gridWidth).fill(0).map((_, x) => {
              const id = `${x},${y}`
              return (
                <td
                  key={x}
                  className="piece-positioner"
                  data-id={id} style={{
                    width: pieceWidth,
                    height: pieceHeight,
                  }}
                >
                  <Piece
                    id={id}
                    pieceWidth={pieceWidth}
                    pieceHeight={pieceHeight}
                    width={width}
                    height={height}
                    left={x * pieceWidth * -1}
                    top={y * pieceHeight * -1}
                    img={img}
                  />
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )

}


export default function ConditionalGrid(props: GridProps) {
  if (!props.width || !props.height) {
    return null
  }
  return (
    <Grid
      {...props}
    />
  )
}
