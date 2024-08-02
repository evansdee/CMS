import styled from "styled-components";
import Flex from "./Flex";
import Heading from "./Heading";
import Logout from "../features/authentication/Logout";
import DarkMode from "./DarkMode";
import { useUser } from "../features/authentication/useUser";

const StyledNav = styled.nav`
  background-color: var(--color-grey-0);
  padding: 1em 3em;
`;

const MenuIcon = styled.div`
p{
  color: var(--color-grey-700);
  opacity: .6;
  font-size: .9em;
}
`;

export default function Nav() {
  const { user } = useUser();
  return (
    <StyledNav>
      <Flex justify="space-between" align="center">
        <Heading as="h2">Certificate Management System</Heading>

        <MenuIcon>
          <Flex align="center" gap=".5em">
            <p>{user?.email}</p>
            <DarkMode />
            <Logout />
          </Flex>
        </MenuIcon>
      </Flex>
    </StyledNav>
  );
}
