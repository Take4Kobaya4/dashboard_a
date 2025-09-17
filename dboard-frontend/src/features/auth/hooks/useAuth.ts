import { useCallback } from "react";
import { useGetCurrentUser } from "./useGetCurrentUser";
import type { AuthType } from "../types/auth";
import { useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const { data: authData } = useGetCurrentUser();
    const user = authData; // `authData`自体がユーザーオブジェクトであると仮定します。
    // 代わりに、useEffect内でauthApi.getCurrentUser()を呼び出して認証状態を初期化します。
    const isAuth = !!authData; // 認証状態は`authData`が存在するかどうかで判断します。

    // 認証状態の更新(ログイン)
    const login = useCallback(
        (user: AuthType, token: string) => {
            queryClient.setQueryData(['auth'], { user, token });
        },
        [queryClient]
    );

    // 認証状態の解除(ログアウト)
    const logout = useCallback(() => {
        queryClient.setQueryData(['auth'], null);
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
