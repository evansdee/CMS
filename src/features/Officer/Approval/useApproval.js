import { format } from "date-fns";
import { useCourse, useUpdateCourseCount } from "../Enrollment/useCourse";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import { useUpdateAllStatus } from "./useUpdateAllStatus";

export function useApproval() {
  const { data: enrollment, isLoading, error } = useGetEnrollment();
  
  const activeEnrollment = enrollment?.filter((ele) => !ele.status);
  
  const { updateCount } = useUpdateCourseCount();
  const { data: countList } = useCourse();
  const { mutate, isPending, isError } = useUpdateAllStatus();

  async function handleSubmitAll() {
    if (isError) {
      console.error("An error occurred. Unable to proceed with submission.");
      return; // Exit the function if there is an error
    }
    const updatedEnrollments = [];
    const updatedCounts = {}; // Object to keep track of updated counts locally

    // First, process each enrollment to update counts locally and create certificate numbers
    for (const ele of activeEnrollment) {
      const { codeAlt, courseCode,courseName } = ele;

      // Find the corresponding count object
      const count = countList.find(
        (item) => item.courseName === courseName
      );

      if (!count) {
        console.error(
          `Count not found for courseCode: ${courseCode} and codeAlt: ${codeAlt}`
        );
        continue; // Skip this enrollment if the count is not found
      }

      // Create a unique key for the count object
      const countKey = `${codeAlt}-${courseCode}`;

      // If this course has already been processed, increment the count locally
      if (updatedCounts[countKey]) {
        updatedCounts[countKey].count += 1;
      } else {
        // Otherwise, start with the existing count
        updatedCounts[countKey] = { ...count };
      }

      // Generate the certificate number using the updated local count
      const certificateNo = `JINSR/${courseCode}/${
        updatedCounts[countKey].count
      }/${format(new Date(), "yyyy")}`;

      // Update the enrollment object with the new status and certificate number
      const newData = {
        ...ele,
        status: true,
        certificateNo,
      };

      // Add the updated enrollment to the array
      updatedEnrollments.push(newData);
    }

    // Now, update all counts in the database
    for (const key in updatedCounts) {
      const count = updatedCounts[key];
      await updateCount({
        item: { ...count,count:count.count+1},
        countId: count.courseName,
      });
    }

    mutate(updatedEnrollments);
  }

  return {
    handleSubmitAll,
    isPending,
    isLoading,
    error,
    isError,
    activeEnrollment,
  };
}
