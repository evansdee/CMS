import styled from "styled-components";
import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useView } from "../hook/useView";
import { Outlet } from "react-router-dom";
import CertificateOperations from "../features/Officer/Certificate/CertificateOpertion";
import CertificateFilterOperations from "../features/Officer/Certificate/CertificateFilterOperations";

const StyledContainer = styled.div`
  padding: 0 2em;
  margin: 1.5em 0;
`;

const Main = styled.div`
  /* overflow-x: auto;
  scrollbar-width:none; */
  overflow-x: auto; /* Keep the horizontal scrollbar visible */
  overflow-y: hidden; /* Hide the vertical scrollbar */
  margin: 1em 0 0;

 &::-webkit-scrollbar {
  width: 0; /* Hides the vertical scrollbar */
  display: none; /* Optional: Hide scrollbar space */
}
`;
export default function StudentPage() {

  const { isView } = useView();
  const [activeBtn, setActive] = useState(true);


  return (
    <StyledContainer>
      <Row type={!isView ? "vertical" : "horizontal"}>
        <Heading as={isView ? "h2" : "h3"}>Certificate Marvel 🤯🖨</Heading>
        <CertificateFilterOperations active={activeBtn}/>
        <CertificateOperations activeBtn={activeBtn} setActive={setActive}/>
      </Row>
      <Main>
        <Outlet/>
      </Main>
    </StyledContainer>
  );
}
