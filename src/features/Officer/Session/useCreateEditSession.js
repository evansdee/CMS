import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditSession } from "../../../service/apiSession";
import toast from "react-hot-toast";

export function useCreateEditSession() {
  const queryClient = useQueryClient();

  const { mutate, isPending ,error} = useMutation({
    mutationFn: createEditSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success("Session Uploaded Successfully");
    },
  });

  return { mutate, isPending, error};
}
