import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../apis/userApi";
import { QUERY_KEYS } from "../../../shared/utils/constants";
import { message, Modal } from "antd";
import type { ApiError } from "../../../shared/types/common";


export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => userApi.deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.ONLINE });
            message.success('ユーザーを削除しました');
        },
        onError: (error: ApiError) => {
            message.error(error.message || 'ユーザーの削除に失敗しました');
        },
    });

    // 削除前に確認
    const confirmDelete = (id: number, userName: string) => {
        Modal.confirm({
            title: 'ユーザー削除の確認',
            content: `${userName}を削除してもよろしいですか?この操作は元に戻せません`,
            okText: '削除',
            okType: 'danger',
            cancelText: 'キャンセル',
            onOk: () => deleteMutation.mutate(id),
        });
    }

    return {
        deleteUser: deleteMutation.mutate,
        confirmDelete,
        isPending: deleteMutation.isPending,
    };
}