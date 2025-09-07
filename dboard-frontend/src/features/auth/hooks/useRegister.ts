import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useMutation } from '@tanstack/react-query';
import type { RegisterData } from '../types/auth';
import { authApi } from '../apis/authApi';
import { message } from 'antd';
import { ROUTES } from '../../../shared/utils/constants';
import type { ApiError } from '../../../shared/types/common';

export const useRegister = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    return useMutation({
        mutationFn: (data: RegisterData) => authApi.register(data),
        onSuccess: (user) => {
            login(user);
            message.success('会員登録が完了しました');
            navigate(ROUTES.USERS);
        },
        onError: (error: ApiError) => {
            message.error(error.message || '会員登録に失敗しました');
        },
    });
}