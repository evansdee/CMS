import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../service/apiAuth";
import { getSession } from "../../service/apiSession";
import { getCount } from "../../service/apiCourseCounter";
import { getCountry } from "../../service/apiCountryState";

export function useUser() {
  const queryClient = useQueryClient();
  const { isLoading, data: user,error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  queryClient.prefetchQuery({ queryKey: ["session"], queryFn: getSession });
  queryClient.prefetchQuery({ queryKey: ["count"], queryFn: getCount });
  queryClient.prefetchQuery({ queryKey: ["country"], queryFn: getCountry });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated",error };
}
