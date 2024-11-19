import Input from "../../../ui/Input";
import Label from "../../../ui/Label";
import Select from "../../../ui/Select";
import Heading from "../../../ui/Heading";
import Form from "./Form";
import Table from "../../../ui/Table";
import Td from "../../../ui/TableRow";

export default function CourseRegUi({
  register,
  activeSession,
  getValues,
  bnk,
  errors,
  watch,
}) {
  const isRen = watch("isRenewal");
  const reamount = watch("renewAmount");
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
            <Select {...register("bank")}>
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
        <TableComponent getValues={getValues} bnk={bnk} isRen={isRen} />
      )}
    </>
  );
}

const TableComponent = ({ getValues, bnk, isRen }) => {
  const data = ["Course Name", "Bank"];
  return (
    <div className='table'>
      <br />
      <Heading as="h2">Selected Course</Heading>

      <Table>
        <Table.Header data={data} />
        <Table.Body
          data={[getValues().courseName, bnk]}
          render={(ele, i) => (
            // <Table.Row key={i}>
              <Td key={i}>{ele}</Td>
            // </Table.Row>
          )}
        />
      </Table>
      <br />
    </div>
  );
};
