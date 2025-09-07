import { useQuery } from "@tanstack/react-query";
import type { UserFilters } from "../types/user";
import { QUERY_KEYS } from "../../../shared/utils/constants";
import { userApi } from "../apis/userApi";


export const useUsers = (filters?: UserFilters) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.USERS.LIST, filters],
        queryFn: () => userApi.getUsers(filters),
    });
}