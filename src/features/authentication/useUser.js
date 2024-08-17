import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../service/apiAuth";
import { getSession } from "../../service/apiSession";
import { getCountry } from "../../service/apiCountryState";
import { getCourse } from "../../service/apiCourse";

export function useUser() {
  const queryClient = useQueryClient();
  const { isLoading, data: user,error } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  queryClient.prefetchQuery({ queryKey: ["session"], queryFn: getSession });
  queryClient.prefetchQuery({ queryKey: ["course"], queryFn: getCourse });
  queryClient.prefetchQuery({ queryKey: ["country"], queryFn: getCountry });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated",error };
}
