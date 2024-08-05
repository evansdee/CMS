import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditEnrollment } from "../../../service/apiEnrollment";
import toast from "react-hot-toast";

export function useUpdateEnrollment() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ newEnrollment, id }) =>
      createEditEnrollment(newEnrollment, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
      toast.success(`${data.fullName} has been Approved 😎`);
    },
    onError: () => toast.error("failed to approve"),
  });

  return { mutate, isPending };
}
