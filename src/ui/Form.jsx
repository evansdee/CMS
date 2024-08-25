import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      /* padding: 2.4rem 2rem; */
      width: 60rem;
    `}
  
  overflow: hidden;
  font-size: 1.4rem;

  /* Mobile-specific styles */
  @media (max-width: 768px) {
    ${(props) =>
      props.type === "regular" &&
      css`
        padding: 1.6rem 2rem;
        width: 100%;
        border-radius: var(--border-radius-sm);
      `}

    ${(props) =>
      props.type === "modal" &&
      css`
        width: 100%;
        padding: 1.6rem 1.2rem;
      `}
    
    font-size: 1.2rem;
  }
`;


Form.defaultProps = {
  type: "regular",
};

export default Form;
