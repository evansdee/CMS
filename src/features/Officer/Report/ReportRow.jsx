/* eslint-disable react/prop-types */
import Table from "../../../ui/Table";
import Td from "../../../ui/TableRow";

export default function ReportRow({ student,index }) {
  const {
    firstName,
    middleName,
    lastName,
    dob,
    courseName,
    enrollDate,
    means,
    meansId,
    country,
    certificateNo,
  } = student;
  return (
    <Table.Row>
      <Td>{index+1}</Td>
      <Td>{firstName}</Td>
      <Td>{middleName}</Td>
      <Td>{lastName}</Td>
      <Td>{dob}</Td>
      <Td>{country}</Td>
      <Td>{courseName}</Td>
      <Td>{certificateNo}</Td>
      <Td>{enrollDate}</Td>
      <Td>{means}</Td>
      <Td>{meansId || "Nil"}</Td>
    </Table.Row>
  );
}
