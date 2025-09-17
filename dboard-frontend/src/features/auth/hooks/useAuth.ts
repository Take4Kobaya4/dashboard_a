import { useCallback } from "react";
import { useGetCurrentUser } from "./useGetCurrentUser";
import type { AuthType } from "../types/auth";
import { useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const { data: user } = useGetCurrentUser();

    const isAuth = !!user;

    // 認証状態の更新(ログイン)
    const login = useCallback(
        (user: AuthType, token: string) => {
            queryClient.setQueryData(['auth'], { user, token });
        },
        [queryClient]
    );

    // 認証状態の解除(ログアウト)
    const logout = useCallback(() => {
        // authのクエリキーを削除
        queryClient.setQueryData(['auth'], null);
        // usersとauthのクエリキーを無効化
        queryClient.invalidateQueries({ queryKey: ['auth'] });
        queryClient.invalidateQueries({ queryKey: ['users'] });
    }, [queryClient]);

    return {
        user,
        isAuth,
        login,
        logout,
    };
}
