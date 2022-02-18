import styled from 'styled-components'

export const Image = styled.img(
  ({ show, hint }: { show: boolean; hint: boolean }) => ({
    maxWidth: '100%',
    maxHeight: '60vh',
    opacity: show ? 1 : hint ? 0.2 : 0,
  }),
)
