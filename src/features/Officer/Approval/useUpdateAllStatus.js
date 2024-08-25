import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateAllEnrollmentStatus } from "../../../service/apiEnrollment";

export function useUpdateAllStatus() {
  const queryClient = useQueryClient();
  const { mutate, isPending ,isError} = useMutation({
    mutationFn: updateAllEnrollmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
      toast.success(`All students has been approved successfully`);
    },
    onError: () => toast.error("failed to approve all"),
  });

  return { mutate, isPending,isError };
}
