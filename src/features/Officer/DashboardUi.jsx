import styled from "styled-components";
import Nav from "../../ui/Nav";
import Sidebar from "../../ui/Sidebar";
import { Outlet } from "react-router-dom";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: 18rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  /* padding: 4rem 4.8rem 6.4rem; */
  overflow-y: scroll;
  position: relative;
`;
export default function DashboardUi() {
  return (
    <StyledDashboard>
      <Nav />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledDashboard>
  );
}
