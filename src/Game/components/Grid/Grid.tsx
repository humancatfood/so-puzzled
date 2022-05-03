import { ReactElement } from 'react'
import { times } from '../../../utils'
import { GameGrid, GridCol, GridRow } from './Grid.styled'

type GridProps = {
  numCols: number
  numRows: number
  renderSlot: (x: number, y: number) => ReactElement
}

export function Grid({ numRows, numCols, renderSlot }: GridProps) {
  return (
    <GameGrid>
      {times(numRows, y => (
        <GridRow key={y}>
          {times(numCols, x => (
            <GridCol key={x}>{renderSlot(x, y)}</GridCol>
          ))}
        </GridRow>
      ))}
    </GameGrid>
  )
}
