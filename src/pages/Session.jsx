import styled from "styled-components";
import { MdMoreTime } from "react-icons/md";
import Row from "../ui/Row";
import { useView } from "../hook/useView";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import ButtonIcon from "../ui/ButtonIcon";
import CreateSessionForm from "../features/Officer/Session/CreateSessionForm";
import SessionTable from "../features/Officer/Session/SessionTable";

const StyledSessionTab = styled.div`
  padding: 0 2em;
  margin: 1.5em 0;
`;

const Main = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  margin: 1em 0 0;
`;
export const Bottom = styled.div`
 
`;
export default function Session() {
  const { isView } = useView();

  return (
    <StyledSessionTab>
      <Row type={!isView ? "vertical" : "horizontal"}>
        <Heading as="h3">Enrollment Session</Heading>

        <Modal>
          <Modal.Open opens="ses">
            <Bottom>
              <ButtonIcon>
                <MdMoreTime />
              </ButtonIcon>
            </Bottom>
          </Modal.Open>
          <Modal.Window name="ses">
            <CreateSessionForm />
          </Modal.Window>
        </Modal>
      </Row>

      <Main>
        <SessionTable />
      </Main>
    </StyledSessionTab>
  );
}
