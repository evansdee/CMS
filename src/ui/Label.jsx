import styled from "styled-components";

const StyledLabel = styled.label`
/* width: 100%; */
span{

}
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
export default function Label({ children, label,error }) {
  return (
    <StyledLabel>
      {label || ""}
      <br />
      {children}
      {error && <Error>{error}</Error>}
    </StyledLabel>
  );
}
