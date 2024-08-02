import styled from "styled-components";

const StyledLabel = styled.label``;

export default function Label({ children, label }) {
  return (
    <StyledLabel>
      {label || ""}
      <br />
      {children}
    </StyledLabel>
  );
}
