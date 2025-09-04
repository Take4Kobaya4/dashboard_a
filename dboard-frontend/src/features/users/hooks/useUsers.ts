import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../apis/userApi";
import type { CreateUserData, UpdateUserData } from "../types/user";


// 一覧
export const useUsers = (page: number = 1, per_page: number = 10, search?: string) => {
    return useQuery({
        queryKey: ['users', page, per_page, search],
        queryFn: () => userApi.getUsers(page, per_page, search),
    });
}

// 詳細
export const useUser = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => userApi.getUser(id),
        enabled: !!id,
    });
}

// ユーザー新規作成
export const useCreateUser = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateUserData) => userApi.createUser(data),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['users']}),
    });
}

// ユーザー更新
export const useUpdateUser = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({id, data}: {id: number, data: UpdateUserData}) => userApi.updateUser(id, data),
        onSuccess: (data, variables) => {
            // setQueryDataは、指定されたクエリキーに対してキャッシュされたデータを更新します（usersのクエリキーのデータ更新）
            qc.setQueryData(['users', variables.id], data);
            // invalidateQueriesは、指定されたクエリキーに関連するすべてのクエリを無効化します。（usersのクエリを無効化）
            // 次回のクエリ実行時に、新しいデータを取得します。更新されたuserのデータが再度取得されて、キャッシュが最新の状態になります。
            qc.invalidateQueries({ queryKey: ['users']});
        }
    });
};

export const useDeleteUser = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => userApi.deleteUser(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['users']});
        }
    });
}

export const useOnlineUsers = (page: number = 1, per_page: number = 10, search?: string) => {
    return useQuery({
        queryKey: ['online-users', page, per_page, search],
        queryFn: () => userApi.getOnlineUsers(),
    });
}

export const useDeleteOnlineUsers = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (ids: number[]) => userApi.deleteOnlineUsers(ids),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['online-users']});
        },
    });
}