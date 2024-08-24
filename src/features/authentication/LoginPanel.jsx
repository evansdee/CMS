import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 5%;
  left: 5%;
  gap: 1em;
  z-index: 2;
`;
const StyledNav = styled(NavLink)`
  text-decoration: none;
  color: var(--color-grey-100);
  background-color: var(--color-grey-800);
  padding: 10px;
  border-radius: 4px;

  &:hover{
    background-color: var(--color-grey-50);
color: var(--color-grey-800);
  }

  &:active {
    /* color: white; */
    background-color: var(--color-icon);
  }

`;

export default function LoginPanel({ email, pass }) {
  return (
    <Main>
      <StyledNav
        onClick={() => {
          email("certificateofficer@joemarineng.com");
          pass("12345678");
        }}
        activeClassName="active"
      >
        Log in as Certificate Officer
      </StyledNav>
      <StyledNav
        onClick={() => {
          email("certificateadmin@joemarineng.com");
          pass("12345678");
        }}
        activeClassName="active"
      >
        Log in as Certificate Admin
      </StyledNav>
      <StyledNav
        onClick={() => {
          email("akpos@joemarineng.com");
          pass("12345678");
        }}
      >
        Log in as Ceo
      </StyledNav>
      <StyledNav
        onClick={() => {
          email("oyinpreye@joemarineng.com");
          pass("12345678");
        }}
      >
        Log in as Executive Director
      </StyledNav>
    </Main>
  );
}
