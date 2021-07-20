import { ReactElement } from 'react'

type GridProps = {
  width: number
  height: number
  pieceSizeRatio: number
  renderSlot: (x: number, y: number) => ReactElement
}

function Grid({ width, height, pieceSizeRatio, renderSlot }: GridProps) {
  const desiredPieceSize = Math.min(width, height) / pieceSizeRatio

  // Here we calculate how many rows and columns we can make from those sizes ..
  const gridWidth = Math.round(width / desiredPieceSize)
  const gridHeight = Math.round(height / desiredPieceSize)

  // .. and set the ACTUAL pieceSize so the pieces will fit into such a grid
  const pieceWidth = width / gridWidth
  const pieceHeight = height / gridHeight

  return (
    <table className="game-grid">
      <tbody>
        {Array(gridHeight)
          .fill(0)
          .map((_, y) => (
            <tr key={y}>
              {Array(gridWidth)
                .fill(0)
                .map((_, x) => {
                  return (
                    <td
                      key={x}
                      className="piece-positioner"
                      style={{
                        width: pieceWidth,
                        height: pieceHeight,
                      }}
                    >
                      {renderSlot(x, y)}
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
  return <Grid {...props} />
}
