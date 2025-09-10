import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import type { UpdateUserData } from "../types/user";
import { userApi } from "../apis/userApi";
import { QUERY_KEYS, ROUTES } from "../../../shared/utils/constants";
import { message } from "antd";
import type { ApiError } from "../../../shared/types/common";


export const useUpdateUser = (id: number) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateUserData) => userApi.updateUser(id, data),
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST });
            queryClient.setQueryData([...QUERY_KEYS.USERS.DETAIL, id], user);
            message.success('ユーザーを更新しました');
            navigate(ROUTES.USERS);
        },
        onError: (error: ApiError) => {
            message.error(error.message || 'ユーザーの更新に失敗しました');
        },
    });
}