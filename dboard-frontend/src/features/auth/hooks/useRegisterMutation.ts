import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authApi } from "../apis/authApi";
import { setAxiosAuthentication } from "../../../shared/apis/apiClient";

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
        }) => authApi.register({ name, email, password, password_confirmation }),
        onSuccess: (data) => {
            setAxiosAuthentication(data.token);
            queryClient.setQueryData(['auth'], data.user);
        }
    });
}
