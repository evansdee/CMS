import {} from "react";
import { useCourse } from "../Enrollment/useCourse";
import CourseRow from "./CourseRow";
import Table from "../../../ui/Table-v1";

export default function CourseList() {
  const { data } = useCourse();

  const approved = data?.filter(ele=>(ele.isApproved))
  const courses = approved.sort((a, b) => {
    if (a.courseName.toLowerCase() < b.courseName.toLowerCase()) return -1;
    if (a.courseName.toLowerCase() > b.courseName.toLowerCase()) return 1;
    return 0;
  });

  return (
    <>
      <Table column="1fr repeat(3, 0.25fr)">
        <Table.Header
          data={["Course Title", "Course Code", "Fee", "Renewal Fee"]}
        />
        <Table.Body
          data={courses}
          render={(course) => <CourseRow key={course.id} course={course} />}
        />
      </Table>
    </>
  );
}
