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

export const PieceCanvas = styled.canvas(
  ({ margin }: PropsWithChildren<{ margin: number }>) => ({
    opacity: 0.5,
    transform: `translate(${-margin}px, ${-margin}px)`,
  }),
)