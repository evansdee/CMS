import {} from "react";
import Table from "../../../ui/Table";
import { useLocalEnroll } from "../../../hook/EnrollmentListContext";
import EnrollmentRow from "./EnrollmentRow";
import { useAddAllEnrollment, useGetEnrollment } from "./useEnrollment";
import Button from "../../../ui/Button";
import { filterDataFromOneDayAgo } from "../../../helper/helper";

export default function EnrollmentList() {
  const { data: enrollment, isLoading } = useGetEnrollment();

  const { enrollArr, setEnroll } = useLocalEnroll();
  const { mutate } = useAddAllEnrollment();

  if (isLoading) return <p>...loading</p>;
  const filteredData = filterDataFromOneDayAgo(enrollment);
  let data =
    enrollArr.length > 0
      ? enrollArr
      : filteredData.filter((ele) => ele.status === true );

  console.log(enrollArr);
  return (
    <div>
      <Table column="1fr 1fr repeat(5, 0.5fr)">
        <Table.Header
          data={[
            "Student",
            "Course",
            "Enrollment Date",
            "Bank",
            "Amount",
            "status",
            "action",
          ]}
        />
        <Table.Body
          data={data}
          render={(enroll) => <EnrollmentRow key={enroll.id} enroll={enroll} />}
        />
      </Table>
      {enrollArr.length > 1 && (
        <Button
          onClick={() => {
            mutate(enrollArr);
            setEnroll([]);
          }}
        >
          lol
        </Button>
      )}
    </div>
  );
}
