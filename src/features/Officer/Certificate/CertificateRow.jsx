/* eslint-disable react/prop-types */
import { BsPrinter } from "react-icons/bs";
import ButtonIcon from "../../../ui/ButtonIcon";
import Table from "../../../ui/Table";
import Td from "../../../ui/TableRow";
import { useNavigate } from "react-router-dom";

export default function CertificateRow({ cert }) {
  const navigate = useNavigate();
  const { id, fullName, courseName, enrollDate, certificateNo, status } = cert;

  return (
    <>
      <Table.Row>
        <Td>{fullName}</Td>
        <Td>{courseName}</Td>
        <Td>{certificateNo}</Td>
        <Td>{enrollDate}</Td>
        <Td>-</Td>

        <Td>
          <ButtonIcon onClick={() => navigate(`/dashboard/certificate/${id}`)}>
            <BsPrinter />
          </ButtonIcon>
        </Td>
      </Table.Row>
    </>
  );
}
