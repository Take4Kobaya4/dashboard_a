import axios, { type AxiosError, type AxiosResponse } from 'axios';
import type { ApiError } from '../types/common';

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: `${BASE_API_URL}/api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

export const initializeCSRF = async () => {
    try {
        await axios.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('CSRF cookie initialization failed',error);
    }
}

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'An error occurred',
            errors: error.response?.data?.errors,
        };

        return Promise.reject(apiError);
    }
);
