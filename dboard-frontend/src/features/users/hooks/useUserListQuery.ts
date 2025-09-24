import { useQuery } from "@tanstack/react-query"
import { userApi } from "../apis/userApi";


export const useUserListQuery = (params?: { page?: number; search?: string; }) => {
    return useQuery({
        queryKey: ['users', params],
        queryFn: () => userApi.getUsers,
    });
}