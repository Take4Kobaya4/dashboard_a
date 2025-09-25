import { useQuery } from "@tanstack/react-query"
import { userApi } from "../apis/userApi";


export const useUserQuery = (id: number) => {
    return useQuery({
        queryKey: ['users', id],
        queryFn: () => userApi.getUserById({ id }),
        enabled: !!id,
    });
}