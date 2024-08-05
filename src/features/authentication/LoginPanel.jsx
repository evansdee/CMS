import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 5%;
  left: 5%;
  gap: 1em;
`;
const StyledNav = styled(NavLink)`

  text-decoration: none;
  color: #fff;
  background-color: var(--color-grey-800);
  padding: 10px 20px;
  border-radius: 4px;

  &:active {
    color: white;
    background-color: #007bff;
  }
  .active{
    color: red;
  }


  /* &:active {
    color: green;
  } */
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
      <StyledNav  onClick={() => {
          email("akpos@joemarineng.com");
          pass("12345678");
        }}>Log in as Oga</StyledNav>
      <StyledNav
      onClick={() => {
        email("oyinpreye@joemarineng.com");
        pass("12345678");
      }}
      >Log in as Madam</StyledNav>
    </Main>
  );
}

