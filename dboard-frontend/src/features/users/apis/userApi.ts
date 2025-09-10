import { apiClient } from "../../../shared/apis/apiClient"
import type { CreateUserData, UpdateUserData, User } from "../types/user"


export const userApi = {
    // ユーザー一覧取得
    getUsers: async (search?: string): Promise<User[]> => {
        const res = await apiClient.get('/users', {
            params: search ? { search } : {},
        });
        return res.data;
    },

    // ユーザー詳細取得
    getUser: async (id: number): Promise<User> => {
        const res = await apiClient.get(`/users/${id}`);
        return res.data;
    },

    // ユーザー作成
    createUser: async (data: CreateUserData): Promise<User> => {
        const res = await apiClient.post('/users', data);
        return res.data;
    },

    // ユーザー更新
    updateUser: async (id: number, data: UpdateUserData): Promise<User> => {
        const res = await apiClient.put(`/users/${id}`, data);
        return res.data;
    },

    // ユーザー削除
    deleteUser: async (id: number): Promise<void> => {
        await apiClient.delete(`/users/${id}`);
    },

    // ログインユーザー一覧表示
    getOnlineUsers: async (): Promise<User[]> => {
        const res = await apiClient.get('/online-users');
        return res.data;
    },

    // オンラインユーザーの複数一括削除
    deleteOnlineUsers: async (ids: number[]): Promise<void> => {
        await apiClient.post('/bulk-delete', { data: { ids} });
    }
}

