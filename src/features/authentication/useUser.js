import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../service/apiAuth";
import { getSession } from "../../service/apiSession";
import { getCount } from "../../service/apiCourseCounter";

export function useUser() {
  const queryClient = useQueryClient();
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  queryClient.prefetchQuery({ queryKey: ["session"], queryFn: getSession });
  queryClient.prefetchQuery({ queryKey: ["count"], queryFn: getCount });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
