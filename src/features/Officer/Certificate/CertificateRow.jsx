/* eslint-disable react/prop-types */
import { BsPrinter } from "react-icons/bs";
import ButtonIcon from "../../../ui/ButtonIcon";
import Table from "../../../ui/Table";
import Td from "../../../ui/TableRow";
import { useNavigate } from "react-router-dom";
import { MdOutlinePrint, MdOutlinePrintDisabled } from "react-icons/md";

export default function CertificateRow({ cert }) {
  const navigate = useNavigate();

  function handlePrint() {
    const url = `/certificateprint/${id}`;

    window.open(window.location.origin + url, "_blank");
  }
  const { id, fullName, courseName, enrollDate, certificateNo, printStatus } =
    cert;

  return (
    <>
      <Table.Row>
        <Td>{fullName}</Td>
        <Td>{courseName}</Td>
        <Td>{certificateNo}</Td>
        <Td>{enrollDate}</Td>
        <Td
          style={{
            color: `${
              printStatus ? "var(--color-green-700)" : "var(--color-red-700)"
            }`,
          }}
        >
          {printStatus ? <MdOutlinePrint /> : <MdOutlinePrintDisabled />}
        </Td>

        <Td>
          <ButtonIcon onClick={handlePrint}>
            <BsPrinter />
          </ButtonIcon>
        </Td>
      </Table.Row>
    </>
  );
}
