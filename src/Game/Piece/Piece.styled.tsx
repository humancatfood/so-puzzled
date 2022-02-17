import styled from 'styled-components'

export const PieceWrapper = styled.div({
  position: 'absolute',
  maxWidth: '100%',
  maxHeight: '100%',
  overflow: 'hidden',
  ':hover': {
    'z-index': '1',
  },
})
