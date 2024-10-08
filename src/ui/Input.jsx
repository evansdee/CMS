import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  /* outline: none; */
  padding: 0.6rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 100%;
  &[type=checkbox]{
    width: .5em;
    height: .5em;
    /* padding: 3em; */
    font-size: 3em;
    accent-color: var(--color-icon);
  }

`;

export default Input;
