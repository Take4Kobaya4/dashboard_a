import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../shared/utils/constants';
import { userApi } from '../apis/userApi';

export const useUser = (id: number) => {
    return useQuery({
        queryKey: [...QUERY_KEYS.USERS.DETAIL, id],
        queryFn: () => userApi.getUser(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,  // 5分
    });
}