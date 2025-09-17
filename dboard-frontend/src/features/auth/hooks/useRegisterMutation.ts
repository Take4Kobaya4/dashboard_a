import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authApi } from "../apis/authApi";

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            name,
            email,
            password,
            password_confirmation,
        }: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
        }) => authApi.register(name, email, password, password_confirmation),
        onSuccess: (data) => {
            queryClient.setQueryData(['auth'], data);
            queryClient.invalidateQueries({ queryKey: ['auth'] });
        }
    });
}
