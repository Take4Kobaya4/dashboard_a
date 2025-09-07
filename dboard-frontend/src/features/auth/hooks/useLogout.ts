import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../apis/authApi";
import { message } from "antd";
import { ROUTES } from "../../../shared/utils/constants";
import type { ApiError } from "../../../shared/types/common";


export const useLogout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            logout();
            queryClient.clear();
            message.success('ログアウトしました');
            navigate(ROUTES.LOGIN);
        },
        onError: (error: ApiError) => {
            // エラーが発生してもログアウト処理を実行
            logout();
            queryClient.clear();
            navigate(ROUTES.LOGIN);
            message.error(error.message || 'ログアウトに失敗しました');
        },
    });
}