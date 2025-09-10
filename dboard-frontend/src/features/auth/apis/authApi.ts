import { apiClient } from "../../../shared/apis/apiClient";
import type { User } from "../../users/types/user";
import type { LoginData, RegisterData } from "../types/auth";


export const authApi = {
    // ログイン
    login: async (data: LoginData): Promise<User> => {
        const response = await apiClient.post('/login', data);
        return response.data;
    },

    // 会員登録
    register: async (data: RegisterData): Promise<User> => {
        const response = await apiClient.post('/register', data);
        return response.data;
    },

    // ログアウト
    logout: async (): Promise<void> => {
        await apiClient.post('/logout');
    },

    // ユーザー情報の取得
    getMe: async (): Promise<User> => {
        const response = await apiClient.get('/me');
        return response.data;
    },
}
