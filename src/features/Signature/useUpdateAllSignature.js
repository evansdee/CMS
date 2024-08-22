import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateAllEnrollmentSignature } from "../../service/apiEnrollment";

export function useUpdateAllSignature() {
  const queryClient = useQueryClient();
  const { mutate, isPending,error } = useMutation({
    mutationFn: ({objects,value})=>updateAllEnrollmentSignature(objects,value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
      // toast.success(`All students has been approved successfully`);
    },
    onError: () => toast.error("failed to approve all"),
  });

  return { mutate, isPending,error };
}
