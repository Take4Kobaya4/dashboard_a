import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../apis/userApi";

export const useDeleteUsersMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: number[]) => userApi.bulkDeleteUsers(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['online-users'] });
        },
    });
}