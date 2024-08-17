import styled from "styled-components";
import Heading from "../../../ui/Heading";
import SessionTable from "./SessionTable";
import Modal from "../../../ui/Modal";
import ButtonIcon from "../../../ui/ButtonIcon";
import { MdMoreTime } from "react-icons/md";
import CreateSessionForm from "./CreateSessionForm";

const StyledSessionTab = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  /* padding: 1.5em; */
`;

export const Bottom = styled.div`
  position: absolute;
  right: 5%;
  bottom: 5%;
`;
export default function SessionTab() {
  return (
    <StyledSessionTab>
      <Heading as="h3" bg="var(--color-grey-100)" pad="1rem">
        Enrollment Session
      </Heading>

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

      <SessionTable />
    </StyledSessionTab>
  );
}
