import styled from "styled-components";

import Nav from "../../ui/Nav";
import Sidebar from "../../ui/Sidebar";
import { Outlet } from "react-router-dom";
import { useView } from "../../hook/useView";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: ${prop=>!prop.view ? "":'18rem 1fr'};
  grid-template-rows:auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  /* padding: 4rem 4.8rem 6.4rem; */
  overflow-y: scroll;
  scrollbar-width: none;
  position: relative;
`;
export default function DashboardUi() {

  const {isView} = useView()
  return (
    <StyledDashboard view={isView}>
      <Nav />

      {isView && <Sidebar />}
      <Main>
        <Outlet />
      </Main>
    </StyledDashboard>
  );
}
