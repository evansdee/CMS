import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCount, updateCourseCount } from "../../../service/apiCourseCounter";

export function useCount(){
    const {data,isLoading} = useQuery({
        queryKey:['count'],
        queryFn: getCount
    })

    return {data,isLoading}
}

export function useUpdateCourseCount() {
  const queryClient = useQueryClient();
  const {
    mutate:updateCount,
    data,
    isPending: isCounting,
  } = useMutation({
    mutationFn: updateCourseCount,
    onSuccess: () =>queryClient.invalidateQueries({ queryKey: ["count"] }),
  })

  return { data,
    updateCount,
    isCounting, };
}


