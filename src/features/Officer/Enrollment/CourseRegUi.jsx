/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Label from "../../../ui/Label";
import Select from "../../../ui/Select";
import Form from "./Form";
import Heading from "../../../ui/Heading";

const Work = styled.div`
  grid-row: auto;
  align-self: flex-end;
`;

export default function CourseRegUi({
  register,
  activeSession,
  getValues,
  bnk,
  errors,
}) {
  return (
    <>
      <div>
        <Form.FormMultipleRow>
          <Label label="Course" error={errors?.courseName?.message}>
            <Select {...register("courseName",{required:'No Course Selected'})}>
              <option value="">Select Course</option>
              {activeSession?.map((ele) => (
                <option key={ele.id} value={ele.courseName}>
                  {ele.courseName}
                </option>
              ))}
            </Select>
          </Label>
          <Label label="Course Renewal">
            <Input type="checkbox" {...register("isRenewal")} />
            <Input type="hidden" {...register("courseCode")} />
          </Label>
          <Label label="Bank">
            <Select {...register("bank")}>
              <option value="">Select Bank</option>
              {["AMJU bank", "Zenith Bank"]?.map((ele) => (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              ))}
            </Select>
          </Label>
          <Label label="Amount">
            <Input value="0000000000" readOnly />
          </Label>
        </Form.FormMultipleRow>
      </div>

      {getValues().courseName && bnk && (
        <TableComponent getValues={getValues} bnk={bnk} />
      )}
    </>
  );
}

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  text-align: center;
  margin: 1em 0;
  /* padding: 10px; */
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(-n + 3) {
    background-color: var(--color-grey-200); /* Example styling */
    padding: 10px;
  }
  &:nth-child(n + 4) {
    font-size: 0.9em;
  }
`;

const TableComponent = ({ getValues, bnk }) => {
  const data = ["Course Name", "Bank", "Amount"];
  return (
    <>
      <Heading as="h2">Selected Course</Heading>

      <Table>
        {data.map((ele) => (
          <Cell key={ele}>
            <Heading as="h3">{ele}</Heading>
          </Cell>
        ))}

        <Cell>{getValues().courseName}</Cell>
        <Cell>{bnk}</Cell>
        <Cell>0000</Cell>
      </Table>
    </>
  );
};
