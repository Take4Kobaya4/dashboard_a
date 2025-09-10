import { api, initializeCSRF } from "../../../shared/apis/apiClient";
import type { ApiResponse } from "../../../shared/types/common";
import { API_ENDPOINTS } from "../../../shared/utils/constants";
import type { AuthUser, LoginData, RegisterData } from "../types/auth";

export const authApi = {
    async login(data: LoginData): Promise<AuthUser> {
        await initializeCSRF();
        const res = await api.post<ApiResponse<AuthUser>>(
            API_ENDPOINTS.AUTH.LOGIN,
            data
        );
        return res.data.data;
    },

    async register(data: RegisterData): Promise<AuthUser> {
        await initializeCSRF();
        const res = await api.post<ApiResponse<AuthUser>>(
            API_ENDPOINTS.AUTH.REGISTER,
            data
        );
        return res.data.data;
    },

    async logout(): Promise<void> {
        await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    },

    async getMe(): Promise<AuthUser> {
        const res = await api.get<ApiResponse<AuthUser>>(
            API_ENDPOINTS.AUTH.ME
        );
        return res.data.data;
    }
}