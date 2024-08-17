import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditEnrollment } from "../../../service/apiEnrollment";
import toast from "react-hot-toast";

export function useUpdateEnrollment() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ newEnrollment, id }) =>
      createEditEnrollment(newEnrollment, id),
    onSuccess: (data) => {
      toast.success(`${data.fullName} has been Approved Successfully`)
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },

    onError: () => toast.error("failed to approve"),
  });

  return { mutate, isPending };
}
