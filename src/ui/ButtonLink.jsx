
/* eslint-disable react/prop-types */
import { Link,NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const btnStyle = css`
  background: ${(prop) => prop.bg || "transparent"};
  border: none;
  display: table;
  outline: none;
  padding: ${(prop) => prop.pad || "0.5em"};
  border-radius: ${(prop) => prop.round || "0"};
  color: ${(prop) => prop.color || 'var(--color-grey-900)'};
  font-size: ${(prop) => (prop.font ? `${prop.font}em` : "1.5rem")};
  margin: ${(prop) => (prop.m ? `${prop.m} auto` : "")};
  /* margin:${(prop) => `${prop.m} auto` || ""}; */
  ${(prop) =>
    prop.to &&
    css`
      text-decoration: none;
    `}

  ${(prop) => prop.extra || ""}
`;

const StyledButton = styled.button`
  ${btnStyle}
`;

const StyledLink = styled(NavLink)`

  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1rem 2.4rem 1rem 1rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-200);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-icon);
    transition: all 0.3s;
  }
  &:hover svg
 {
    color: var(--color-grey-300);
 }
`;

const StyledAnchor = styled.a`
  ${btnStyle};
  text-decoration: none;

`;

export default function ButtonLink({ children, to, href, ...props }) {
  // export default function Button({ children, to, onClick, bg, font, color,m }) {
  if (to)
    return (
      <StyledLink to={to} {...props}>
        {/* <StyledLink to={to} bg={bg} font={font} color={color} m={m} onClick={onClick}> */}
        {children}
      </StyledLink>
    );

  if (href) return <StyledAnchor href={href} {...props}>{children}</StyledAnchor>;

  return (
    <StyledButton {...props}>
      {/* <StyledButton onClick={onClick} bg={bg} font={font} color={color}m={m} > */}
      {children}
    </StyledButton>
  );
}
