import { useQuery } from "@tanstack/react-query"
import { userApi } from "../apis/userApi";


export const useUserListQuery = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => userApi.getUsers(),
    });
}