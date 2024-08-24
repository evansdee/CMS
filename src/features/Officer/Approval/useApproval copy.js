import { format } from "date-fns";
import { useCourse, useUpdateCourseCount } from "../Enrollment/useCourse";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import { useUpdateAllStatus } from "./useUpdateAllStatus";


export function useApproval(){
    const { data: enrollment, isLoading,error } = useGetEnrollment();
 
    const {mutate,isPending,error:studentError} = useUpdateAllStatus()
    
    
    const activeEnrollment = enrollment?.filter(ele=>(!ele.status))
    const { updateCount } = useUpdateCourseCount();
    const { data: countList } = useCourse();
    
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

    return {handleSubmitAll,isPending,isLoading,error,studentError,activeEnrollment}
}