import styled, { css } from "styled-components";
import {useEffect} from 'react'
import Flex from "./Flex";
import Heading from "./Heading";
import Logout from "../features/authentication/Logout";
import DarkMode from "./DarkMode";
import { useUser } from "../features/authentication/useUser";
import { useView } from "../hook/useView";
import ButtonIcon from "./ButtonIcon";
import Sidebar from "./Sidebar";
import { useMenuToggle } from "../hook/useMenuToggle";
import { FaAnchorCircleCheck } from "react-icons/fa6";
import { BiSolidShip } from "react-icons/bi";

const StyledNav = styled.nav`
  background-color: var(--color-grey-0);
  padding: ${prop=>prop.view  ? "1em 3em" : "1.5em 1em"};
`;

const MenuIcon = styled.div`
  p {
    color: var(--color-grey-700);
    opacity: 0.6;
    font-size: 0.9em;
  }
`;
const Side = styled.div`
border: 2px solid var(--color-grey-300);
height: 100dvh;
width: 50dvw;
  position: fixed;
  top: 0;
  right: -150%;
  background-color: var(--color-grey-0);

  z-index: 99;
  transition: right .8s;
  ${(prop) =>
    prop.check &&
    css`
      right: 0;
    `};
`;

export default function Nav() {
  const { user } = useUser();
  const { isView } = useView();
  const { isSideToggle, setIsSideToggle } = useMenuToggle();

  useEffect(()=>{
      if(isView) setIsSideToggle(false)
  },[isView,setIsSideToggle])

  return (
    <>
      <StyledNav view={isView}>
        <Flex justify="space-between" align="center">
          {isView ? (
            <Heading as="h2">Certificate Management System</Heading>
          ) : (
            <ButtonIcon onClick={()=>setIsSideToggle(p=>!p)}>
             {isSideToggle ? <FaAnchorCircleCheck/>: <BiSolidShip />}
            </ButtonIcon>
          )}

          <MenuIcon>
            <Flex align="center" gap=".5em">
              <p>{user?.user_metadata.role}</p>
              <DarkMode />
              <Logout />
            </Flex>
          </MenuIcon>
        </Flex>
      </StyledNav>
      {/* {isSideToggle && view < 768 && ( */}
        <Side check={isSideToggle}>
          <Sidebar close={setIsSideToggle}/>
        </Side>
      {/* )} */}
    </>
  );
}
