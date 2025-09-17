import { apiClient } from "../../../shared/apis/apiClient";
import { API_ENDPOINTS } from "../../../shared/constants/navigation";
import type { ApiResponse } from "../../../shared/types/common";
import type { User } from "../../users/types/user";

export const authApi = {
    // ログイン
    login: async(email: string, password: string):Promise<User> => {
        const response = await apiClient.post<ApiResponse<User>>(
            API_ENDPOINTS.AUTH.LOGIN,
            { email, password }
        );
        return response.data.data;
    },

    // 会員登録
    register: async(
        name: string,
        email: string,
        password: string,
        password_confirmation: string
    ) :Promise<User> => {
        const response = await apiClient.post<ApiResponse<User>>(
            API_ENDPOINTS.AUTH.REGISTER,
            { name, email, password, password_confirmation }
        );
        return response.data.data;
    },

    // ログアウト
    logout: async(): Promise<void> => {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    },

    // ログインユーザー情報取得
    getCurrentUser: async(): Promise<User> => {
        const response = await apiClient.get<ApiResponse<User>>(
            API_ENDPOINTS.AUTH.GET_CURRENT_USER
        );
        return response.data.data;
    }
}
