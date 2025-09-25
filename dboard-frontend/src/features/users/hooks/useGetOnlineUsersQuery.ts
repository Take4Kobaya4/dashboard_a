import { useQuery } from "@tanstack/react-query"
import { userApi } from "../apis/userApi";

export const useGetOnlineUsersQuery = () => {
    return useQuery({
        queryKey: ['online-users'],
        queryFn: () => userApi.getOnlineUsers(),
        refetchInterval: 30000,
        staleTime: 1000 * 15,
    });
}