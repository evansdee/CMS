import {} from "react";
import Table from "../../../ui/Table";
import { useLocalEnroll } from "../../../hook/EnrollmentListContext";
import EnrollmentRow from "./EnrollmentRow";
import { useGetEnrollment } from "./useEnrollment";

export default function EnrollmentList() {
  const { data: enrollment, isLoading } = useGetEnrollment();

  const { enrollArr } = useLocalEnroll();
  if (isLoading) return <p>...loading</p>;

//   console.log(enrollment.find(ele=>(ele.status)))
//   console.log(enrollment?.find((ele) => ele.status).status === "FALSE")
  
  let data =
    enrollArr.length > 0 
    // && enrollment.find((ele) => ele.status).status === "FALSE"
      ? enrollArr
      : enrollment.filter(ele=>(ele.status === true));
  console.log(data);
  return (
    <div>
      <Table column="1fr  1fr repeat(5, 0.5fr)">
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
    </div>
  );
}
