import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../shared/utils/constants";
import { userApi } from "../apis/userApi";


export const useOnlineUsers = () => {
    return useQuery({
        queryKey: QUERY_KEYS.USERS.ONLINE,
        queryFn: () => userApi.getOnlineUsers(),
        refetchInterval: 30 * 1000, // 30秒毎に更新
        staleTime: 15 * 1000, // 15秒
    });
}