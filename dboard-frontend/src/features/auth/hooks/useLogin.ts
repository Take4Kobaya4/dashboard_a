import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { LoginData } from "../types/auth";
import { authApi } from "../apis/authApi";
import { QUERY_KEYS, ROUTES } from "../../../shared/utils/constants";
import { message } from "antd";
import type { ApiError } from "../../../shared/types/common";



export const useLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginData) => authApi.login(data),
        onSuccess: (user) => {
            login(user);
            queryClient.setQueryData(QUERY_KEYS.AUTH.ME, user);
            message.success('ログインしました');
            navigate(ROUTES.USERS);
        },
        onError: (error: ApiError) => {
            message.error(error.message || 'ログインに失敗しました');
        },
    });
}