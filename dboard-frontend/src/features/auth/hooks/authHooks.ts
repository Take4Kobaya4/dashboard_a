import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginData, RegisterData } from "../types/auth";
import { authApi } from "../apis/authApi";
import type { User } from "../../users/types/user";


export const useLogin = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (data: LoginData) => {
            const result = await authApi.login(data);
            return result;
        },
        onSuccess: () => {
            // ログイン成功後、少し遅延を設けてからクエリを無効化
            setTimeout(() => {
                qc.invalidateQueries({ queryKey: ['auth']});
            }, 50);
        },
    });
}

export const useRegister = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (data: RegisterData) => {
            await authApi.register(data);
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['auth']}),
    });
}

export const useLogout = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            await authApi.logout();
        },
        onSuccess: () => {
            // ログアウト成功後、認証関連のクエリをクリア
            qc.removeQueries({ queryKey: ['auth'] });
            // ローカルストレージのトークンも削除（念のため）
            localStorage.removeItem('auth_token');
        },
    });
}

export const useFetchMe = () => {
    return useQuery<User>({
        queryKey: ['auth'],
        queryFn: () => authApi.getCurrentUser(),
        retry: false,
    });
}
