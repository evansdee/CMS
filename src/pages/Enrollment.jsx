import styled from "styled-components";
import CreateEnrollmentForm from "../features/Officer/Enrollment/CreateEnrollmentForm";
import EnrollmentTableOperation from "../features/Officer/Enrollment/EnrollmentTableOperation";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useSearchParams } from "react-router-dom";
import EnrollmentList from "../features/Officer/Enrollment/EnrollmentList";
import { useView } from "../hook/useView";
import BottomButtonAll from "../ui/BottomButtonAll";
import {
  useAddAllEnrollment,
  useGetEnrollment,
} from "../features/Officer/Enrollment/useEnrollment";
import { useLocalEnroll } from "../hook/EnrollmentListContext";
import EnrollmentExistList from "../features/Officer/Enrollment/EnrollmentExistList";

const StyledContainer = styled.div`
  padding: 0 2em;
  margin: 1.5em 0;
`;

const Main = styled.div`
  height: 70dvh;
  overflow-y: scroll;
  scrollbar-width: none;
  margin: 1em 0 0;
`;
export default function Enrollment() {
  const [searchParams] = useSearchParams();

  const value = searchParams.get("enrollment") || "list";
  const { data: enrollment } = useGetEnrollment();

  const { enrollArr, setEnroll } = useLocalEnroll();

  const { isView } = useView();
  function handleEnroll() {
    mutate(
      enrollArr.map((ele) => {
        const { lid, ...allEle } = ele;
        return allEle;
      })
    );
    setEnroll([]);
  }
  const { mutate, isPending } = useAddAllEnrollment();


  return (
    <StyledContainer>
      <Row type={!isView ? "vertical" : "horizontal"}>
        <Heading as={isView ? "h2" : "h3"}>Enrollment Baby😁</Heading>
        {enrollArr.length > 1 &&  value=== "list" && (
          <BottomButtonAll onClick={handleEnroll}>Enroll All</BottomButtonAll>
        )}
        <EnrollmentTableOperation />
      </Row>
      <Main>
        {value === "form" && <CreateEnrollmentForm />}
        {value === "list" && (
          <EnrollmentList
            enrollArr={enrollArr}
            isPending={isPending}
            enrollment={enrollment}
          />
        )}
        {value === 'exist' && <EnrollmentExistList data={enrollment}/>} 
      </Main>
    </StyledContainer>
  );
}
