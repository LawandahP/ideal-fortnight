import styled from 'styled-components'


export const TwoGrid = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr;
  grid-gap: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`