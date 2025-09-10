import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../apis/userApi";
import { QUERY_KEYS } from "../../../shared/utils/constants";
import { message, Modal } from 'antd';
import type { ApiError } from "../../../shared/types/common";

export const useBulkDeleteUsers = () => {
    const queryClient = useQueryClient();

    const bulkDeleteMutation = useMutation({
        mutationFn: (userIds: number[]) => userApi.bulkDeleteUsers(userIds),
        onSuccess: (_, userIds) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.ONLINE });
            message.success(`${userIds.length}人のユーザーを削除しました`);
        },
        onError: (error: ApiError) => {
            message.error(error.message || 'ユーザーの一括削除に失敗しました');
        }
    });

    // 一括削除前の確認
    const confirmBulkDelete = (userIds: number[], count: number) => {
        Modal.confirm({
            title: 'ユーザー一括削除の確認',
            content: `選択された${count}人のユーザーを削除してもよろしいですか?この操作は元に戻せません`,
            okText: '削除',
            okType: 'danger',
            cancelText: 'キャンセル',
            onOk: () => bulkDeleteMutation.mutate(userIds),
        });
    };

    return {
        bulkDeleteUsers: bulkDeleteMutation.mutate,
        confirmBulkDelete,
        isPending: bulkDeleteMutation.isPending,
    };
}