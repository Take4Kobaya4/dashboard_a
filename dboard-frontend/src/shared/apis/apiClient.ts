import axios, { type AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

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
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // headersオブジェクトが存在することを保証する
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401){
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const setAxiosAuthentication = (token: string) => {
    localStorage.setItem('token', token);
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
};

export const removeAxiosAuthentication = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.Authorization;
};
