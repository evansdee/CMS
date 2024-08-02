import { useQuery } from "@tanstack/react-query";
import { getSession } from "../../../service/apiSession";




export function useSession(){
    const {data,isLoading} = useQuery({
        queryKey:['session'],
        queryFn:getSession,
        
    })

    return {data,isLoading}
}