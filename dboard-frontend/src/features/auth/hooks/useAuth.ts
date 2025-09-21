import { useQueryClient } from "@tanstack/react-query"
import { useGetCurrentUser } from "./useGetCurrentUser";
import { useCallback } from "react";
import { removeAxiosAuthentication, setAxiosAuthentication } from "../../../shared/apis/apiClient";
import type { AuthResponse } from "../types/auth";


export const useAuth = () => {
    const queryClient = useQueryClient();
    const { data: authData, isLoading } = useGetCurrentUser();

    const user = authData || null;
    // プロパティ 'user' は型 'AuthUser' に存在しないため、authData自体で認証状態を判断
    const isAuth = !!authData;

    const login = useCallback(
        (user: AuthResponse, token: string) => {
            // ローカルストレージにトークンを保存
            setAxiosAuthentication(token);
            // クエリキャッシュにユーザー情報を保存
            queryClient.setQueryData(['auth'], { user, token });
        }, [queryClient]
    );

    const logout = useCallback(() => {
        removeAxiosAuthentication();
        // クエリキャッシュからユーザー情報を削除
        queryClient.setQueryData(['auth'], null);
        // クエリキャッシュを無効化
        queryClient.invalidateQueries({ queryKey: ['auth'] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
    }, [queryClient]);

    return { user, isAuth, isLoading, login, logout };
}