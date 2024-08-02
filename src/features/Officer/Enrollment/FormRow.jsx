import styled from "styled-components"

const StyledFormRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    margin: 1em 0;
    gap: 1.5em;
`
export default function FormRow({children}) {
  return (
    <StyledFormRow>
        {children}
    </StyledFormRow>
  )
}
