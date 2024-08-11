/* eslint-disable react/prop-types */

import Table from "../../../ui/Table";
import { format } from "date-fns";
import { parseDateInclude } from "../../../helper/helper";
import ButtonIcon from "../../../ui/ButtonIcon";
import { CiViewList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Td from "../../../ui/TableRow";


export default function StudentRow({ student }) {
  const navigate = useNavigate();
  const { id, firstName, middleName, lastName, dob, gsm, enrollDate } = student;

  console.log(dob)
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
          <ButtonIcon onClick={() => navigate(`/dashboard/student/${id}`)}>
            <CiViewList />
          </ButtonIcon>
        </Td>
      </Table.Row>
    </>
  );
}
