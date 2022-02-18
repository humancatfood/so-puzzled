import { ComponentProps, PropsWithChildren } from 'react'
import styled from 'styled-components'

const Table = styled.table({
  position: 'absolute',
  top: 0,
  left: 0,
})

export const GameGrid = (
  props: PropsWithChildren<ComponentProps<typeof Table>>,
) => (
  <Table {...props}>
    <tbody>{props.children}</tbody>
  </Table>
)

export const GridRow = styled.tr({})

export const GridCol = styled.td({
  position: 'relative',
  border: '1px solid rgba(0, 0, 0, 0.4)',
  borderSpacing: 0,
})
