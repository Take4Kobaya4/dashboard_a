import { apiClient, getCsrfCookie, setAuthToken, removeAuthToken } from "../../../shared/apis/apiClient";
import type { User } from "../../users/types/user";
import type { LoginData, RegisterData } from "../types/auth";


export const authApi = {
    // ログイン
    login: async (data: LoginData): Promise<User> => {
        await getCsrfCookie();
        const response = await apiClient.post('/api/login', data);
        // トークンを保存
        if (response.data.token) {
            setAuthToken(response.data.token);
            // トークン保存後にAPIクライアントのヘッダーを即座に更新
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data.user;
    },

    // 会員登録
    register: async (data: RegisterData): Promise<User> => {
        await getCsrfCookie();
        const response = await apiClient.post('/api/register', data);
        // トークンを保存
        if (response.data.token) {
            setAuthToken(response.data.token);
            // トークン保存後にAPIクライアントのヘッダーを即座に更新
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data.user;
    },

    // ログアウト
    logout: async (): Promise<void> => {
        await apiClient.post('/api/logout');
        // トークンを削除
        removeAuthToken();
    },

    // ユーザー情報の取得
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get('/api/me');
        return response.data;
    },
}
