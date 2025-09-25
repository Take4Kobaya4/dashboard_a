import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi } from "../apis/userApi";


export const useCreateUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userData: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
        }) => userApi.createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });
}