import toast from "react-hot-toast";
import { useGetEnrollment } from "../Officer/Enrollment/useEnrollment";
import { useUpdateAllSignature } from "./useUpdateAllSignature";


export function useSignature(){
    const { data, isLoading } = useGetEnrollment();
    const { mutate, isPending } = useUpdateAllSignature();

    const activeSignature = data?.filter(
      (ele) => ele.isSignature === null && ele.status
    );
  
    // console.log(activeSignature);
  
    function handleAllSignature(arr, value) {
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