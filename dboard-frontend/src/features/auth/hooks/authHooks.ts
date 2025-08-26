import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginData, RegisterData } from "../types/auth";
import { authApi } from "../apis/authApi";
import type { User } from "../../users/types/user";


export const useLogin = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (data: LoginData) => {
            await authApi.login(data);
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['auth']}),
    });
}

export const useRegister = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (data: RegisterData) => {
            await authApi.register(data);
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['auth']}),
    });
}

export const useLogout = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            await authApi.logout();
        },
        onSuccess: () => qc.invalidateQueries({ queryKey: ['auth']}),
    });
}

export const useFetchMe = () => {
    return useQuery<User>({
        queryKey: ['auth'],
        queryFn: () => authApi.getCurrentUser(),
        retry: false,
    });
}
