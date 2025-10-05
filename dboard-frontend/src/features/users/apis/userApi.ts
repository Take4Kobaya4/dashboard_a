
import { apiClient } from "../../../shared/apis/apiClient";
import { API_ENDPOINTS } from "../../../shared/constants/navigation";
import type { CreateUserData, UpdateUserData, User } from "../types/user";

export const userApi = {
    // ユーザー一覧を取得
    getUsers: async (): Promise<User[]> => {
        const response = await apiClient.get(
            `${API_ENDPOINTS.USERS.LIST}`
        );
        return response.data.data;
    },

    // ユーザー詳細を取得
    getUserById: async (id: number): Promise<User> => {
        const response = await apiClient.get(
            API_ENDPOINTS.USERS.SHOW(id)
        );
        return response.data.user;
    },

    // ユーザー作成
    createUser: async(data: CreateUserData ): Promise<User> => {
        const response = await apiClient.post(
            API_ENDPOINTS.USERS.CREATE,
            data
        );
        return response.data.data;
    },

    // ユーザー更新(編集)
    updateUser: async(id: number, data: UpdateUserData) : Promise<User> => {
        const response = await apiClient.put(
            API_ENDPOINTS.USERS.UPDATE(id),
            data
        );
        return response.data.data;
    },

    // ユーザー削除
    deleteUser: async(id: number): Promise<void> => {
        await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
    },

    // オンラインユーザー一覧取得
    getOnlineUsers: async(): Promise<User[]> => {
        const response = await apiClient.get(
            API_ENDPOINTS.USERS.ONLINE
        );
        return response.data.onlineUsers;
    },

    // 複数ユーザーを一括削除
    bulkDeleteUsers: async(ids: number[]): Promise<void> => {
        await apiClient.post(
            API_ENDPOINTS.USERS.BULK_DELETE,
            { ids }
        );
    }
}