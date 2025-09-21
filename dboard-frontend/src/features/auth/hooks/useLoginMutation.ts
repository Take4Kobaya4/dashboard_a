import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authApi } from "../apis/authApi";
import { setAxiosAuthentication } from "../../../shared/apis/apiClient";


export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) =>
            authApi.login({ email, password }),
        onSuccess: (data) => {
            setAxiosAuthentication(data.token);
            queryClient.setQueryData(['auth'], data.user);
        }
    });
}