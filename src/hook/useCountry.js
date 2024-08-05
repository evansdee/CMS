import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCountry, upDateState } from "../service/apiCountryState";

export function useCountry() {
  const { data, isLoading } = useQuery({
    queryKey: ["country"],
    queryFn: getCountry,
  });

  const country = data?.map((country) => country.name.common).sort();

  return { country };
}

export function useStateApi() {
  const queryClient = useQueryClient();
  const {
    mutate,
    data,
    isPending: isLoading,
  } = useMutation({
    mutationFn: upDateState,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["state"] }),
  });

  return { mutate, data, isLoading };
}
