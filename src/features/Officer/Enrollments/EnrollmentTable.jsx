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
    else setData([])
  }, [setData, enrollment]); 
  
  
  const activeEnrollment = data.filter(ele=>(!ele.status))
  if (isLoading) return <Spinner />;
  console.log(activeEnrollment);
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
        <Table.Body data={activeEnrollment} 
         render={(enroll) => <EnrollmentRow key={enroll.id} enroll={enroll} />}
        />
      </Table>
    </>
  );
}
