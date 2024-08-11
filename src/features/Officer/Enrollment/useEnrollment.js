import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditEnrollment, getEnrollment, getStudent, updateAllEnrollmentData } from "../../../service/apiEnrollment";

export function useAddEnrollment() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createEditEnrollment,
    onSuccess: (data) => {
      toast.success(`${data?.firstName} has been enrolled successfully`);
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {  mutate, isPending };
}


export function useGetEnrollment(){
const {data,isLoading} = useQuery({
  queryKey:['enrollment'],
  queryFn:getEnrollment,
})

return {data,isLoading}

}

export function useAddAllEnrollment(){
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateAllEnrollmentData,
    onSuccess: () => {
      toast.success(`All Enrollmeent Added Successfully`);
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {  mutate, isPending };
}

export function useStudent(id){
  const {data,isLoading} = useQuery({
    queryKey:['student',id],
    queryFn:()=>getStudent(id),
  })
  
  return {data,isLoading}
}