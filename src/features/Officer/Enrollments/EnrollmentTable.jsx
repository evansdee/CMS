import { useLocalEnrollments } from "../../../hook/EnrollmentsContext";
import { useEffect } from "react";
import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import EnrollmentRow from "./EnrollmentRow";

export default function EnrollmentTable() {
  const { data: enrollment, isLoading } = useGetEnrollment();
  const { data, setData } = useLocalEnrollments();

  useEffect(() => {
    if (enrollment?.length > 0) setData([...enrollment]);
  }, [setData, enrollment]);

  console.log(data);
  if (isLoading) return <Spinner />;
  return (
    <>
      <Table column="1fr  1fr repeat(3, 0.5fr)">
      <Table.Header
          data={[
            "Student",
            "Course",
            "Enrollment Date",
            "status",
            "action",
          ]}
        />
        <Table.Body data={data} 
         render={(enroll) => <EnrollmentRow key={enroll.id} enroll={enroll} />}
        />
      </Table>
    </>
  );
}
