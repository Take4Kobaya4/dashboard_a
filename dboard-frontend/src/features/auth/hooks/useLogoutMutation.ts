import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authApi } from "../apis/authApi";


export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            // ログアウト成功時にキャッシュをクリア
            queryClient.setQueryData(['auth'], null);
            // 'auth'と'users'に関連する全てのクエリを無効化して再フェッチを促す
            queryClient.invalidateQueries({ queryKey: ['auth'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
}