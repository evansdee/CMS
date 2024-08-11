import styled from "styled-components";
import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useView } from "../hook/useView";
import StudentSearch from "../features/Officer/Student/StudentSearch";
import StudentList from "../features/Officer/Student/StudentList";

const StyledContainer = styled.div`
  padding: 0 2em;
  margin: 1.5em 0;
`;

const Main = styled.div`
  overflow-x: auto;
  scrollbar-width:none;
  margin: 1em 0 0;
`;
export default function StudentPage() {
  const [search, setSearch] = useState("");

  const { isView } = useView();

  return (
    <StyledContainer>
      <Row type={!isView ? "vertical" : "horizontal"}>
        <Heading as={isView ? "h2" : "h3"}>Student 👨‍🎓</Heading>
        <StudentSearch search={search} setSearch={setSearch} />
      </Row>
      <Main>
        <StudentList search={search} />
      </Main>
    </StyledContainer>
  );
}
