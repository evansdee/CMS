import styled, { css } from "styled-components";

const variations = {
  primary: css`
    &:hover {
      background-color: var(--color-grey-300);
    }
    & svg {
      width: 2.2rem;
      height: 2.2rem;
      color: var(--color-icon);
    }
  `,

  danger: css`
    &:hover {
      background-color: var(--color-red-100);
    }
    & svg {
      width: 2.2rem;
      height: 2.2rem;
      color: var(--color-red-700);

      /* color: var(--color-red-700); */
    }
  `,
};

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  ${(props) => variations[props.variation]}
`;
ButtonIcon.defaultProps = {
  variation: "primary",
};

export default ButtonIcon;
