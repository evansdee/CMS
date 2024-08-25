import toast from "react-hot-toast";
import { useGetEnrollment } from "../Officer/Enrollment/useEnrollment";
import { useUpdateAllSignature } from "./useUpdateAllSignature";


export function useSignature(){
    const { data, isLoading } = useGetEnrollment();
    const { mutate, isPending,isError } = useUpdateAllSignature();

    const activeSignature = data?.filter(
      (ele) => ele.isSignature === null && ele.status
    );
  
    // console.log(activeSignature);
  
    function handleAllSignature(arr, value) {
      if (isError) {
        console.error("An error occurred. Unable to proceed with submission.");
        return; // Exit the function if there is an error
      }
      mutate(
        { objects: arr, value },
        {
          onSuccess: () => {
            toast.success(
              `${value ? "Signature Approved Successfully" : "No Signature"}`
            );
          },
        }
      );
    }

    return {activeSignature,handleAllSignature,isPending,isLoading}
}