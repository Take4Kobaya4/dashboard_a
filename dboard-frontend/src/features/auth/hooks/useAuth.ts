import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react";
import { removeAxiosAuthentication, setAxiosAuthentication } from "../../../shared/apis/apiClient";
import type { AuthResponse, AuthUser } from "../types/auth";
import { authApi } from "../apis/authApi";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const token = localStorage.getItem('token');

    // useGetCurrentUserのロジックをここに統合
    const { data: user, isLoading } = useQuery<AuthUser | null>({
        queryKey: ['auth'],
        queryFn: authApi.getCurrentUser,
        // トークンが存在する場合のみ、このクエリを有効にする
        enabled: !!token,
        staleTime: 1000 * 60 * 30, // 30分間はキャッシュを新鮮なものとして扱う
        retry: false, // 認証エラー(401など)でリトライしない
    });

    const isAuth = !!user;

    const login = useCallback(
        (authResponse: AuthResponse) => {
            setAxiosAuthentication(authResponse.token);
            queryClient.setQueryData(['auth'], authResponse.user);
        }, [queryClient]
    );
    
    const logout = useCallback(async () => {
        await authApi.logout();
        removeAxiosAuthentication();
        queryClient.setQueryData(['auth'], null);
        // ログアウト時に他の関連キャッシュもクリアする場合
        // queryClient.removeQueries();
    }, [queryClient]);

    return { user, isAuth, isLoading, login, logout };
}