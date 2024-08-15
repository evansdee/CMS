import styled from "styled-components";
import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useView } from "../hook/useView";
import { Outlet } from "react-router-dom";
import CertificateOperations from "../features/Officer/Certificate/CertificateOpertion";

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

  const { isView } = useView();

  return (
    <StyledContainer>
      <Row type={!isView ? "vertical" : "horizontal"}>
        <Heading as={isView ? "h2" : "h3"}>Certificate Marvel 🤯🖨</Heading>
        <CertificateOperations/>
      </Row>
      <Main>
        <Outlet/>
      </Main>
    </StyledContainer>
  );
}
