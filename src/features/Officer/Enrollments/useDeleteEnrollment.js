import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEnrollment } from "../../../service/apiEnrollment";
import toast from "react-hot-toast";

export function useDeleteEnrollment() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });

      toast.success("Deleted Successfully");
    },
  });

  return mutate;
}
