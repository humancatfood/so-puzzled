import styled from 'styled-components'

export const StageWrapper = styled.div`
  boxShadow: ${({ isHighlighted }: { isHighlighted: boolean }) =>
    isHighlighted ? '0px 0px 16px green inset' : 'none'},
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 50px;
  padding-bottom: 20px;
`
