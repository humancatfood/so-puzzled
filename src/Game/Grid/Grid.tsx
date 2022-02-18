import { ReactElement } from 'react'
import { times } from '../../utils'
import { GameGrid, GridCol, GridRow } from './Grid.styled'

type GridProps = {
  width: number
  height: number
  pieceSizeRatio: number
  renderSlot: (x: number, y: number) => ReactElement
}

export function Grid({ width, height, pieceSizeRatio, renderSlot }: GridProps) {
  if (!width || !height) {
    return null
  }

  const desiredPieceSize = Math.min(width, height) / pieceSizeRatio

  // Here we calculate how many rows and columns we can make from those sizes ..
  const numCols = Math.round(width / desiredPieceSize)
  const numRows = Math.round(height / desiredPieceSize)

  // .. and set the ACTUAL pieceSize so the pieces will fit into such a grid
  const pieceWidth = width / numCols
  const pieceHeight = height / numRows

  return (
    <GameGrid>
      {times(numRows, y => (
        <GridRow key={y}>
          {times(numCols, x => (
            <GridCol
              key={x}
              style={{
                width: pieceWidth,
                height: pieceHeight,
              }}
            >
              {renderSlot(x, y)}
            </GridCol>
          ))}
        </GridRow>
      ))}
    </GameGrid>
  )
}
