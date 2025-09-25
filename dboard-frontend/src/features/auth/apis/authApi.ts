import { apiClient } from "../../../shared/apis/apiClient"
import { API_ENDPOINTS } from "../../../shared/constants/navigation";
import type { AuthResponse, AuthUser } from "../types/auth";
import axios from "axios";

export const authApi = {
    login: async(data: { email: string, password: string }): Promise<AuthResponse> => {
        await axios.get('/sanctum/csrf-cookie');
        const response = await apiClient.post(
            API_ENDPOINTS.AUTH.LOGIN,
            data
        );
        return response.data;
    },

    register: async(data: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }): Promise<AuthResponse> => {
        await axios.get('/sanctum/csrf-cookie');
        const response = await apiClient.post(
            API_ENDPOINTS.AUTH.REGISTER,
            data
        );
        return response.data;
    },

    logout: async(): Promise<void> => {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    },

    getCurrentUser: async(): Promise<AuthUser> => {
        const response = await apiClient.get(API_ENDPOINTS.AUTH.GET_CURRENT_USER);
        return response.data;
    }
}
