import styled from "styled-components";
import CreateEnrollmentForm from "../features/Officer/Enrollment/CreateEnrollmentForm";
import EnrollmentTableOperation from "../features/Officer/Enrollment/EnrollmentTableOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useSearchParams } from "react-router-dom";
import EnrollmentList from "../features/Officer/Enrollment/EnrollmentList";
import Button from "../ui/Button";
import { useAddAllEnrollment } from "../features/Officer/Enrollment/useEnrollment";

const StyledContainer = styled.div`
  padding: 0 2em;
  margin: 1.5em 0;

`;

const Main = styled.div`
    height: 70dvh;
    overflow-y: scroll;
    scrollbar-width: none;
    margin: 1.5em 0;
`
export default function Enrollment() {
  const [searchParams] = useSearchParams();

  const value = searchParams.get("enrollment") ||'list';

  return (
    <StyledContainer>
      <Row type="horizontal">
        <Heading as="h2">Enrollment Baby😁</Heading>
        <EnrollmentTableOperation />
      </Row>
      <Main>
        {value === "form" && <CreateEnrollmentForm />}
        {value === "list" && <EnrollmentList />}
      </Main>
    </StyledContainer>
  );
}
