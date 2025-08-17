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

// リクエストインターセプターの設定
apiClient.interceptors.request.use(async (config) => {
    // CSRF Cookieを取得
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await axios.get(`http://localhost/sanctum/csrf-cookie`, {
            withCredentials: true,
        });
    }
    return config;
});

