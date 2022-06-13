import styled from 'styled-components'

export const GameGrid = styled.div({
  display: 'table',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
})

export const GridRow = styled.div({
  display: 'table-row',
})

export const GridCol = styled.div({
  display: 'table-cell',
  position: 'relative',
  border: '1px solid rgba(0, 0, 0, 0.4)',
  borderSpacing: 0,
})

export const GridWrapper = styled.div({
  display: 'inline-block',
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})
