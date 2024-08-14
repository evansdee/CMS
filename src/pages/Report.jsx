import ReportForm from "../features/Officer/Report/ReportForm";
import ReportList from "../features/Officer/Report/ReportList";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 0 2em;
  margin: 1.5em 0;
`;

const Main = styled.div`
  overflow-x: auto;
  scrollbar-width:none;
  margin: 1em 0 0;
`;
export default function Report() {
  return (
    <StyledContainer>
      <ReportForm />
      <Main>

      <ReportList />
      </Main>
    </StyledContainer>
  );
}
