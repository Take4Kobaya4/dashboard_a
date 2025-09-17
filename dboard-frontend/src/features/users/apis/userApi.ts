import { type ApiResponse, type PaginatedResponse } from "../../../shared/types/common";
import { apiClient } from "../../../shared/apis/apiClient";
import { API_ENDPOINTS } from "../../../shared/constants/navigation";
import type { User } from "../types/user";

export const userApi = {
    // ユーザー一覧を取得
    getUsers: async (params?: string): Promise<PaginatedResponse<User>> => {
        const response = await apiClient.get<PaginatedResponse<User>>(
            `${API_ENDPOINTS.USERS.LIST}${params ? `?${params}` : ''}`
        );
        return response.data;
    },

    // ユーザー詳細を取得
    getUserById: async (id: number): Promise<User> => {
        const response = await apiClient.get<ApiResponse<User>>(
            API_ENDPOINTS.USERS.SHOW(id)
        );
        return response.data.data;
    },

    // ユーザー作成
    createUser: async(userData: { name: string; email: string; password: string; password_confirmation: string } ): Promise<User> => {
        const response = await apiClient.post<ApiResponse<User>>(
            API_ENDPOINTS.USERS.CREATE,
            userData
        );
        return response.data.data;
    },

    // ユーザー更新(編集)
    updateUser: async(id: number, userData: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }) : Promise<User> => {
        const response = await apiClient.put<ApiResponse<User>>(
            API_ENDPOINTS.USERS.UPDATE(id),
            userData
        );
        return response.data.data;
    },

    // ユーザー削除
    deleteUser: async(id: number): Promise<void> => {
        await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
    },

    // オンラインユーザー一覧取得
    getOnlineUsers: async(): Promise<User[]> => {
        const response = await apiClient.get<ApiResponse<User[]>>(
            API_ENDPOINTS.USERS.ONLINE
        );
        return response.data.data;
    },

    // 複数ユーザーを一括削除
    bulkDeleteUsers: async(userIds: number[]): Promise<void> => {
        await apiClient.post(
            API_ENDPOINTS.USERS.BULK_DELETE,
            { user_ids: userIds }
        );
    }
}