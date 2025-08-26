import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 10000, // タイムアウトを10秒に設定
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// トークンを取得する関数
export const getAuthToken = (): string | null => {
    return localStorage.getItem('auth_token');
};

// トークンを保存する関数
export const setAuthToken = (token: string): void => {
    localStorage.setItem('auth_token', token);
    // トークン保存後にAPIクライアントのヘッダーも即座に更新
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// トークンを削除する関数
export const removeAuthToken = (): void => {
    localStorage.removeItem('auth_token');
};

// リクエストインターセプターでトークンを自動付与
apiClient.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// CSRFクッキーの取得
export const getCsrfCookie = async () => {
    await apiClient.get('/sanctum/csrf-cookie');
};


