import styled, { css } from "styled-components";
import Logo from "./Logo";
import SideBarList from "./SideBarList";
import FakeData from "../FakeData";
import { useUser } from "../features/authentication/useUser";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-300);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 3.2rem;
 
  width: ${prop=>prop.isView ? '60%' : ""};
  
`;

function Sidebar({ close, isView }) {
  const { user } = useUser();

  return (
    <StyledSidebar isView={isView}>
      <Logo />
      <SideBarList close={close} />
      {user?.user_metadata.role === "office"  && <FakeData />}
    </StyledSidebar>
  );
}

export default Sidebar;
