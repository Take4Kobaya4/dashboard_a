import { api } from "../../../shared/apis/apiClient";
import type { ApiResponse, PaginatedResponse } from "../../../shared/types/common";
import { API_ENDPOINTS } from "../../../shared/utils/constants";
import type { CreateUserData, UpdateUserData, User, UserFilters } from "../types/user";


export const userApi = {
    // ユーザー一覧
    async getUsers(filters?: UserFilters): Promise<PaginatedResponse<User>> {
        const params = new URLSearchParams();
        // 検索欄に入力された文字列をparamsに追加
        if(filters?.search) params.append('search', filters.search);
        // オンライン状態をparamsに追加
        if(filters?.is_online !== undefined) params.append('is_online', filters.is_online.toString());
        // パージングをparamsに追加
        if(filters?.page) params.append('page', filters.page.toString());
        if(filters?.per_page) params.append('per_page', filters.per_page.toString());
        const res = await api.get<PaginatedResponse<User>>(
            `${API_ENDPOINTS.USERS.LIST}?${params.toString()}`
        );
        return res.data;
    },
    
    // ユーザー詳細を取得
    async getUser(id: number): Promise<User> {
        const res = await api.get<ApiResponse<User>>(
            API_ENDPOINTS.USERS.SHOW.replace('{id}', id.toString())
        );
        return res.data.data;
    },

    // ユーザー新規作成
    async createUser(data: CreateUserData): Promise<User> {
        const res = await api.post<ApiResponse<User>>(
            API_ENDPOINTS.USERS.CREATE,
            data
        );
        return res.data.data;
    },

    // ユーザー更新
    async updateUser(id: number, data: UpdateUserData): Promise<User> {
        const res = await api.put<ApiResponse<User>>(
            API_ENDPOINTS.USERS.UPDATE.replace('{id}', id.toString()),
            data
        );
        return res.data.data;
    },

    // ユーザー削除
    async deleteUser(id: number): Promise<void> {
        await api.delete(
            API_ENDPOINTS.USERS.DELETE.replace('{id}', id.toString())
        );
    },

    // オンラインユーザー一覧表示
    async getOnlineUsers(): Promise<User[]> {
        const res = await api.get<ApiResponse<User[]>>(API_ENDPOINTS.USERS.ONLINE);
        return res.data.data;
    },

    // オンラインユーザーの一括削除
    async bulkDeleteUsers(userIds: number[]): Promise<void> {
        await api.post(API_ENDPOINTS.USERS.BULK_DELETE, { user_ids: userIds });
    },
}