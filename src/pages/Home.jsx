import styled from "styled-components";
import { useGetEnrollment } from "../features/Officer/Enrollment/useEnrollment";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import DashboardOperations from "../features/Dashboard/DashboardOperations";
import DashboardLayout from "../features/Dashboard/DashboardLayout";
import { useView } from "../hook/useView";

const StyledContainer = styled.div`
  padding: 0 2em;
  margin: 1.5em 0;
`;

export default function Home() {
 

  const {isView} = useView()
  return (
    <StyledContainer>
      <Row type={!isView ? 'vertical' : 'horizontal'}>
        <Heading as="h3">Dasboard</Heading>
        <DashboardOperations/>
      </Row>
      <DashboardLayout/>
    </StyledContainer>
  );
}
