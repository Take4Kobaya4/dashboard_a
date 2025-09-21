import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authApi } from "../apis/authApi";


export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: { email: string, password: string }) => 
            authApi.login({ email, password }),
        onSuccess: (data) => {
            queryClient.setQueryData(['auth'], data);
            queryClient.invalidateQueries({ queryKey: ['auth'] });
        }
    });
}