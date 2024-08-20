import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table-v1";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import EnrollmentRow from "./ApprovalRow";
import { useCourse, useUpdateCourseCount } from "../Enrollment/useCourse";
import { format } from "date-fns";
import { useUpdateAllStatus } from "./useUpdateAllStatus";
import BottomButtonAll from "../../../ui/BottomButtonAll";
import toast from "react-hot-toast";

export default function EnrollmentTable() {
  const { data: enrollment, isLoading } = useGetEnrollment();
  const { updateCount } = useUpdateCourseCount();
  const { data: countList } = useCourse();
  const {mutate,isPending} = useUpdateAllStatus()
  
  
  const activeEnrollment = enrollment?.filter(ele=>(!ele.status))
  if (isLoading || isPending) return <Spinner />;

  async function handleSubmitAll() {
    const updatePromises = activeEnrollment.map(async (ele) => {
      const { codeAlt, courseCode } = ele;
      const count = countList?.find((item) => item.codeAlt === codeAlt && item.courseCode === courseCode);
  // console.log(count.courseCode)
      const newData = {
        ...ele, 
        status: true,
        certificateNo: `JINSR/${courseCode}/${codeAlt}/${count?.count}/${format(
          new Date(),
          "yyyy"
        )}`,
      };
  
      // Perform the update operation for count
      await updateCount({
        item: { ...count, count: count.count + 1 },
        countId: count.courseName,
      });
  
      // Return newData for further processing if needed
      return newData;
    });
  
    // Wait for all update operations to complete
    const results = await Promise.all(updatePromises);
  
    // Do something with the results if needed
    mutate(results)
    // console.log(results);
  }
  

    
  //   const newData = activeEnrollment.map(ele=>{
  //     const {codeAlt,courseCode} = ele
  //   const count = countList?.filter((ele) => ele.codeAlt === codeAlt)[0];

  //   return {
  //     ...ele,
  //     status: true,
  //     certificateNo: `JINSR/${courseCode}/${codeAlt}/${count?.count}/${format(
  //       new Date(),
  //       "yyyy"
  //     )}`,
  //   }
  //   updateCount({
  //     item: { ...count, count: count.count + 1 },
  //     countId: count.codeAlt,
  //   });
  //   })
  // }
  // console.log(activeEnrollment);
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
      {activeEnrollment.length > 1 &&<BottomButtonAll onClick={handleSubmitAll}>Approve all</BottomButtonAll>}
    </>
  );
}
