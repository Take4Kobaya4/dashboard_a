import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import type { CreateUserData } from "../types/user";
import { userApi } from "../apis/userApi";
import { QUERY_KEYS, ROUTES } from "../../../shared/utils/constants";
import { message } from "antd";
import type { ApiError } from "../../../shared/types/common";


export const useCreateUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateUserData) => userApi.createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST });
            message.success('ユーザーを作成しました');
            navigate(ROUTES.USERS);
        },
        onError: (error: ApiError) => {
            message.error(error.message || 'ユーザーの作成に失敗しました');
        },
    });
}