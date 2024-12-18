/* eslint-disable react/prop-types */
import { BsPrinter } from "react-icons/bs";
import ButtonIcon from "../../../ui/ButtonIcon";
import Table from "../../../ui/Table";
import Td from "../../../ui/TableRow";
import { MdOutlinePrint, MdOutlinePrintDisabled } from "react-icons/md";
import { useState } from "react";

export default function CertificateRow({ cert }) {
  const { id, fullName, courseName, enrollDate, certificateNo, printStatus } = cert;

  // This will store the reference to the print window/tab
  const [printWindow, setPrintWindow] = useState(null);

  function handlePrint() {
    const url = `/certificateprint/${id}`;

    // Check if the print window is already open
    if (printWindow && !printWindow.closed) {
      // If the window is open, just update the URL
      printWindow.location.href = window.location.origin + url;
    } else {
      // If the window is not open, open a new tab but use a specific window name
      const newWindow = window.open(window.location.origin + url, 'printWindow');
      setPrintWindow(newWindow); // Save the reference to the new window
    }
  }

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
