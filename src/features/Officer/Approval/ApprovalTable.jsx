import { useLocalEnrollments } from "../../../hook/EnrollmentsContext";
import { useEffect } from "react";
import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import EnrollmentRow from "./ApprovalRow";
import { useCount, useUpdateCourseCount } from "../Enrollment/useCourseCount";
import { format } from "date-fns";
import { useUpdateAllStatus } from "./useUpdateAllStatus";
import BottomButtonAll from "../../../ui/BottomButtonAll";

export default function EnrollmentTable() {
  const { data: enrollment, isLoading } = useGetEnrollment();
  const { data:enroll, setData } = useLocalEnrollments();
  const { updateCount } = useUpdateCourseCount();
  const { data: countList } = useCount();
  const {mutate,isPending} = useUpdateAllStatus()


  
  useEffect(() => {
    if (enrollment?.length > 0) setData([...enrollment]);
    else setData([])
  }, [setData, enrollment]); 
  
  
  const activeEnrollment = enroll.filter(ele=>(!ele.status))
  if (isLoading || isPending) return <Spinner />;

  async function handleSubmitAll() {
    const updatePromises = activeEnrollment.map(async (ele) => {
      const { codeAlt, courseCode } = ele;
      const count = countList?.find((item) => item.codeAlt === codeAlt);
  
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
        countId: count.codeAlt,
      });
  
      // Return newData for further processing if needed
      return newData;
    });
  
    // Wait for all update operations to complete
    const results = await Promise.all(updatePromises);
  
    // Do something with the results if needed
    mutate(results)
    console.log(results);
    setData([])
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
