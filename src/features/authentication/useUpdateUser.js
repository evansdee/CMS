

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../service/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate ,isLoading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success(" successfully ");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {mutate ,isLoading };
}
