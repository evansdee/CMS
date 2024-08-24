import {} from "react";
import Table from "../../../ui/Table";
import Td from "../../../ui/TableRow";
import Modal from "../../../ui/Modal";
import ButtonIcon from "../../../ui/ButtonIcon";
import CreateEnrollmentExist from "./CreateEnrollmentExist";
import { FaEdit } from "react-icons/fa";

export default function EnrollmentExistRow({ exist }) {
  const { fullName, courseName, dob } = exist;

  return (
    <Table.Row>
      <Td>{fullName}</Td>
      <Td>{courseName}</Td>
      <Td>{dob}</Td>

      <Td>
        <Modal>
            <Modal.Open opens="exist">
                <ButtonIcon>
                    <FaEdit/>
                </ButtonIcon>
            </Modal.Open>

            <Modal.Window name="exist">
                <CreateEnrollmentExist exist={exist}/>
            </Modal.Window>
        </Modal>
      </Td>
    </Table.Row>
  );
}
