
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditSession } from "../../../service/apiSession";

export function useEditSession() {
  const queryClient = useQueryClient();

  const { mutate: editSession, isPending: isEditing,isError } = useMutation({
    mutationFn: ({ newSession, id }) => createEditSession(newSession, id),
    onSuccess: (data) => {
      toast.success(`${data?.courseName} Session successfully edited`);
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editSession,isError };
}
