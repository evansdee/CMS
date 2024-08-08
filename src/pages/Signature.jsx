import styled from "styled-components";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useView } from "../hook/useView";
import SignatureTable from "../features/Signature/SignatureTable";


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
export default function Signature() {
  const {isView} = useView()

  return (
    <StyledContainer>
      <Row type={!isView ? 'vertical' : 'horizontal'}>
        <Heading as={isView ? 'h2' : 'h3'}>Available Certificates</Heading>
      </Row>
      <Main>
        <SignatureTable/>
      </Main>
    </StyledContainer>
  );
}
