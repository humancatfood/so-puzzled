import { PropsWithChildren } from 'react'
import styled from 'styled-components'

export const PieceWrapper = styled.div({
  position: 'absolute',
  maxWidth: '100%',
  maxHeight: '100%',
  ':hover': {
    'z-index': '1',
  },
})

export const Draglayer = styled.div({
  position: 'fixed',
  'pointer-events': 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
})

export const PieceCanvas = styled.canvas(
  ({ margin }: PropsWithChildren<{ margin: number }>) => ({
    'pointer-events': 'none',
    transform: `translate(${-margin}px, ${-margin}px)`,
  }),
)
