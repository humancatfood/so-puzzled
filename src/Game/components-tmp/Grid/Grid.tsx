import { times } from '../../../utils'
import { useConfig } from '../../Config'
import { Slot } from '../Slot'
import { GameGrid, GridCol, GridRow } from './Grid.styled'

export function Grid() {
  const { numCols, numRows } = useConfig()
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
