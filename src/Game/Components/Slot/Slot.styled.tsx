import styled, { CSSProperties } from 'styled-components'

export const SlotWrapper = styled.div((props: { isHighlighted: boolean }) => ({
  outline: props.isHighlighted ? '3px solid rebeccapurple' : 'none', // TODO: make this show just the corners, so we get an outline without cutting across the noses and holes
  position: 'absolute' as CSSProperties['position'],
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
}))
