import styled from 'styled-components'

export const SlotWrapper = styled.div((props: { isHighlighted: boolean }) => ({
  display: 'block',
  height: '100%',
  outline: props.isHighlighted ? '3px solid rebeccapurple' : 'none',
}))
