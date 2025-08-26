import { apiClient } from "../../../shared/apis/apiClient"
import type { CreateUserData, UpdateUserData, User } from "../types/user"


export const userApi = {
    // ユーザー一覧取得
    getUsers: async (page: number, per_page: number, search?: string): Promise<User[]> => {
        const res = await apiClient.get('/api/users?page=' + page + '&per_page=' + per_page + '&search=' + (search || ''), {
            params: search ? { search } : {},
        }, );
        return res.data.data;
    },

    // ユーザー詳細取得
    getUser: async (id: number): Promise<User> => {
        const res = await apiClient.get(`/api/users/${id}`);
        return res.data.user;
    },

    // ユーザー作成
    createUser: async (data: CreateUserData): Promise<User> => {
        const res = await apiClient.post('/api/users', data);
        return res.data.user;
    },

    // ユーザー更新
    updateUser: async (id: number, data: UpdateUserData): Promise<User> => {
        const res = await apiClient.put(`/api/users/${id}`, data);
        return res.data.user;
    },

    // ユーザー削除
    deleteUser: async (id: number): Promise<void> => {
        await apiClient.delete(`/api/users/${id}`);
    },

    // ログインユーザー一覧表示
    getOnlineUsers: async (): Promise<User[]> => {
        const res = await apiClient.get('/api/online-users');
        return res.data.onlineUsers;
    },

    // オンラインユーザーの複数一括削除
    deleteOnlineUsers: async (ids: number[]): Promise<void> => {
        await apiClient.post('/api/bulk-delete', { data: { ids} });
    }
}

