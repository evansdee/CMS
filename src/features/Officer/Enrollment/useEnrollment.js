import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditEnrollment, getCertificate, getEnrollment, updateAllEnrollmentData } from "../../../service/apiEnrollment";

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


export function useCertificate(id){
  const {data,isLoading,error} = useQuery({
    queryKey:['certificate',id],
    queryFn:()=>getCertificate(id)

  })

  return {data,isLoading,error}
}
