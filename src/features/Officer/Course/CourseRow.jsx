/* eslint-disable react/prop-types */
import {} from "react";
import Table from "../../../ui/Table-v1";
import styled from "styled-components";
import { formatToNaira } from "../../../helper/helper";

const GridCell = styled.div`
  /* padding: 0 0.5rem; */

  &:not(:first-child) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &:nth-child(5n + 1) {
    padding: 0.5em;
  }
`;

export default function CourseRow({ course }) {
  const { courseName, courseCode, codeAlt, newAmount, renewAmount } = course;
  return (
    <Table.Row>
      <GridCell>{courseName}</GridCell>
      <GridCell>{`${courseCode}/${codeAlt}`}</GridCell>
      <GridCell>{formatToNaira(newAmount)}</GridCell>
      <GridCell>{formatToNaira(renewAmount)}</GridCell>
      {/* <GridCell>{}</GridCell> */}
    </Table.Row>
  );
}
