import { times } from '../../../utils'
import { Slot } from '../Slot'
import { GameGrid, GridCol, GridRow } from './Grid.styled'

type GridProps = {
  numCols: number
  numRows: number
}

export function Grid({ numRows, numCols }: GridProps) {
  return (
    <GameGrid>
      {times(numRows, y => (
        <GridRow key={y}>
          {times(numCols, x => (
            <GridCol key={x}>
              <Slot x={x} y={y} />
            </GridCol>
          ))}
        </GridRow>
      ))}
    </GameGrid>
  )
}
