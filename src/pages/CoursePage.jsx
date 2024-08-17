import styled from "styled-components";
import { useState } from "react";
import Modal from "../ui/Modal";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useView } from "../hook/useView";
import CourseList from "../features/Officer/Course/CourseList";
import Button from "../ui/Button";
import { FaBookMedical } from "react-icons/fa6";
import Flex from "../ui/Flex";
import AddCourse from "../features/Officer/Course/AddCourse";

const StyledContainer = styled.div`
  padding: 0 2em;
  margin: 1.5em 0;
`;

const Main = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  margin: 1em 0 0;
`;
export default function CoursePage() {
  const { isView } = useView();

  return (
    <StyledContainer>
      <Row type={!isView ? "vertical" : "horizontal"}>
        <Heading as={isView ? "h2" : "h3"}>Courses e.g.g. EDH</Heading>
        <Modal>
          <Modal.Open opens="course">
            <Button>
              <Flex align="center" gap='.5em'>
                <FaBookMedical />
                <span>Add Course</span>
              </Flex>
            </Button>
          </Modal.Open>
          <Modal.Window name="course">
            <AddCourse/>
          </Modal.Window>
        </Modal>
      </Row>
      <Main>
        <CourseList />
      </Main>
    </StyledContainer>
  );
}
