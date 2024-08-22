import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSession } from "../../../service/apiSession";
import toast from "react-hot-toast";

export function useDeleteSession() {
  const queryClient = useQueryClient();

  const { mutate, isPending,error } = useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("Deleted Successfully");
    },
    onError: () => toast.error("Failed to delete"),
  });

  return { mutate, isPending,error };
}
