import styled from "styled-components";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import EnrollmentTable from "../features/Officer/Approval/ApprovalTable";
import { useView } from "../hook/useView";


const StyledContainer = styled.div`
  padding: 0 2em;
  margin: 1em 0;

`;

const Main = styled.div`
    /* height: 70dvh; */
    overflow-y: scroll;
    scrollbar-width: none;
    margin: 1.5em 0;
`
export default function Approval() {
  const {isView} = useView()

  return (
    <StyledContainer>
      <Row type={!isView ? 'vertical' : 'horizontal'}>
        <Heading as={isView ? 'h2' : 'h3'}>Approval ✔</Heading>
      </Row>
      <Main>
        <EnrollmentTable/>
      </Main>
    </StyledContainer>
  );
}
