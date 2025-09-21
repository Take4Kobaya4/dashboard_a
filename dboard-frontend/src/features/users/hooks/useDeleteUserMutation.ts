import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../apis/userApi";

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => userApi.deleteUser(id),
        onSuccess: (_, deletedId) => {
            // usersのクエリを無効化
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['online-users'] });
            // 削除されたユーザーのキャッシュを削除
            queryClient.removeQueries({ queryKey: ['users', deletedId] });
        }
    });
}