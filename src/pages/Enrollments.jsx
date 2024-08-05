import styled from "styled-components";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import EnrollmentTable from "../features/Officer/Enrollments/EnrollmentTable";


const StyledContainer = styled.div`
  padding: 0 2em;
  margin: 1em 0;

`;

const Main = styled.div`
    height: 70dvh;
    overflow-y: scroll;
    scrollbar-width: none;
    margin: 1.5em 0;
`
export default function Enrollment() {

  return (
    <StyledContainer>
      <Row type="horizontal">
        <Heading as="h3">Enrollment Baby😁</Heading>
      </Row>
      <Main>
        <EnrollmentTable/>
      </Main>
    </StyledContainer>
  );
}
