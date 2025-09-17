import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../shared/constants/navigation";
import { authApi } from "../apis/authApi";


export const useGetCurrentUser = () => {

    return useQuery({
        queryKey: QUERY_KEYS.AUTH.USER,
        queryFn: authApi.getCurrentUser,
        enabled: false,
        staleTime: 1000 * 60 * 30,
    });
}