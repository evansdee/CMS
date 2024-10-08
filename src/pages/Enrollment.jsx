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
  /* height: 70dvh; */
  overflow-y: hidden;
  overflow-x: auto;
  /* scrollbar-width: none; */
  margin: 1em 0 0;

  &::-webkit-scrollbar {
  width: 0; /* Hides the vertical scrollbar */
  display: none; /* Optional: Hide scrollbar space */
}
`;
// const Main = styled.div`
//   /* height: 70dvh; */
//   overflow-y: auto; /* Allows vertical scrolling */
//   overflow-x: auto; /* Allows horizontal scrolling */
//   margin: 1em 0 0;

//   /* Hide vertical scrollbar */
//   scrollbar-width: none; /* For Firefox */
//   -ms-overflow-style: none; /* For Internet Explorer and Edge */

//   &::-webkit-scrollbar {
//     width: 0; /* Hides the vertical scrollbar in Chrome, Safari, and Opera */
//     display: none; /* Hides scrollbar space */
//   }

//   /* Show horizontal scrollbar */
//   &::-webkit-scrollbar:horizontal {
//     height: 8px; /* Set the height for horizontal scrollbar */
//     display: block; /* Ensures it displays */
//   }

 
// `;

export default function Enrollment() {
  const [searchParams] = useSearchParams();

  const value = searchParams.get("enrollment") || "list";
  const { data: enrollment } = useGetEnrollment();

  const { enrollArr, setEnroll } = useLocalEnroll();

  const { mutate, isPending, isError } = useAddAllEnrollment();
  const { isView } = useView();

  function handleEnroll() {
    if (isError) return null;
    mutate(
      enrollArr.map((ele) => {
        // eslint-disable-next-line no-unused-vars
        const { lid, ...allEle } = ele;
        return allEle;
      }),
      {
        onSuccess: () => {
          setEnroll([]);
        },
      }
    );
  }

  return (
    <StyledContainer>
      <Row type={!isView ? "vertical" : "horizontal"}>
        <Heading as={isView ? "h2" : "h3"}>Enrollment Baby😁</Heading>
        {enrollArr.length > 1 && value === "list" && (
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
        {value === "exist" && <EnrollmentExistList data={enrollment} />}
      </Main>
    </StyledContainer>
  );
}
