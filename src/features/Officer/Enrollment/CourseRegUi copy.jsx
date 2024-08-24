import styled from "styled-components";
import Input from "../../../ui/Input";
import Label from "../../../ui/Label";
import Select from "../../../ui/Select";
import Heading from "../../../ui/Heading";
import Form from "./Form";
import { formatToNaira } from "../../../helper/helper";

export default function CourseRegUi({
  register,
  activeSession,
  getValues,
  bnk,
  errors,
  watch
}) {

  const isRen = watch('isRenewal')
  const reamount = watch("renewAmount")
  // const neamount = watch("newAmount")

  // const amount = isRen ? reamount : neamount

  // console.log(amount)
  return (
    <>
      <div>
        <Form.FormMultipleRow>
          <Label label="Course" error={errors?.courseName?.message}>
            <Select
              {...register("courseName", { required: "No Course Selected" })}
            >
              <option value="">Select Course</option>
              {activeSession?.map((ele) => (
                <option key={ele.id} value={ele.courseName}>
                  {ele.courseName}
                </option>
              ))}
            </Select>
          </Label>
          {/* {reamount !== "0" && ( */}
            <Label label="Course Renewal">
              <Input type="checkbox" {...register("isRenewal")} />
            </Label>
          {/* )} */}
          <Label label="Bank" error={errors?.bank?.message}>
            <Select {...register("bank", { required: "Field required" })}>
              <option value="">Select Bank</option>
              {["AMJU bank", "Zenith Bank"]?.map((ele) => (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              ))}
            </Select>
          </Label>
        </Form.FormMultipleRow>
      </div>

      {getValues().courseName && bnk && (
        <TableComponent getValues={getValues} bnk={bnk} isRen={isRen}/>
      )}
    </>
  );
}

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  text-align: center;
  margin: 1em 0;
  /* padding: 10px; */

  @media (max-width: 768px) {
    /* grid-template-columns: 1fr; Stack columns on mobile devices */
    gap: 5px; /* Reduce gap for mobile devices */
  }
`;

// Table cell
const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* &:nth-child(-n + 3) {
    background-color: var(--color-grey-200); /* Example styling */
    padding: 5px;

    @media (max-width: 768px) {
      padding: 8px; /* Adjust padding for mobile */
    }
  } */

  &:nth-child(n + 4) {
    font-size: 0.9em;

    @media (max-width: 768px) {
      font-size: 0.8em; /* Adjust font size for mobile */
    }
  }
`;

const TableComponent = ({ getValues, bnk,isRen }) => {

  const data = ["Course Name", "Bank"];
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
       
      </Table>
    </>
  );
};
