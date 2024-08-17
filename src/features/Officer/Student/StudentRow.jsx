/* eslint-disable react/prop-types */

import Table from "../../../ui/Table";
import { format } from "date-fns";
import { parseDateInclude } from "../../../helper/helper";
import ButtonIcon from "../../../ui/ButtonIcon";
import { CiViewList } from "react-icons/ci";
import Td from "../../../ui/TableRow";
import Modal from "../../../ui/Modal";
import Student from "./Student";

export default function StudentRow({ student, setSearch }) {
  const { firstName, middleName, lastName, dob, gsm, enrollDate } = student;

  // console.log(dob);
  return (
    <>
      <Table.Row>
        <Td>{lastName}</Td>
        <Td>{firstName}</Td>
        <Td>{middleName || "-"}</Td>
        <Td>{format(dob, "dd MMMM yyyy")}</Td>

        <Td>{gsm}</Td>
        <Td>{parseDateInclude(enrollDate)}</Td>
        <Td>
          <Modal>
            <Modal.Open opens="studentEdit">
              <ButtonIcon onClick={()=>setSearch("")}>
                <CiViewList />
              </ButtonIcon>
            </Modal.Open>

            <Modal.Window name="studentEdit">
              <Student studentToEdit={student} />
            </Modal.Window>
          </Modal>
        </Td>
      </Table.Row>
    </>
  );
}
